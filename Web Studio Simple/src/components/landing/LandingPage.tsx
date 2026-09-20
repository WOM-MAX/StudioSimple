import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Palette, Play, Sparkles, BookOpen, Shield, User, Lock, LogIn, LogOut, 
  CheckCircle2, ArrowRight, Star, Instagram, Youtube, Facebook, 
  MessageCircle, Send, Linkedin, Globe, ExternalLink 
} from 'lucide-react';
import { BrandColorOption } from '../../types';
import { HeroScrollScrubber } from './HeroScrollScrubber';
import { loadCmsPages } from '../../data/initialCmsData';
import { loadSiteConfig, loadPopups, addMensajeContacto } from '../../data/initialCmsExtrasData';
import { SiteConfig, PopupBanner, JournalArticle, TipoRedSocial, RedSocialItem } from '../../types/cmsExtras';
import { CintaNoticiasBlock } from '../common/CintaNoticiasBlock';
import { JournalBlock } from '../common/JournalBlock';
import { EventosBlock } from '../common/EventosBlock';
import { JournalArticleView } from '../common/JournalArticleView';
import { CmsBlockRenderer } from '../common/CmsBlockRenderer';
import { PublicHeader } from '../common/PublicHeader';
import { PopupWrapper } from '../common/PopupWrapper';
import { getBorderStyles } from '../common/borderStyles';
import { CmsPage } from '../../types/cms';

const TESTIMONIALS = [
  {
    id: 1,
    badge: 'Homeschooling 1er año · Caso SAE',
    badgeColor: 'bg-[#12A1A4]/15 text-[#57d6f3] border-[#12A1A4]/30',
    text: 'Cuando Lucas quedó sin cupo en el colegio por el SAE y venía afectado por la convivencia del aula, decidimos dar el paso al homeschooling con temor de no saber qué enseñar. EstudioSimple nos dio una rutina clara: cápsulas breves y ejercicios directos al cuaderno. Rindió sus exámenes libres en noviembre con promedio 6.5 sin lágrimas ni peleas familiares.',
    name: 'Claudia M.',
    role: 'Mamá de Lucas (5º Básico · Santiago Centro)',
    initials: 'CM',
    avatarBg: 'bg-[#12A1A4]/20 text-[#57d6f3] border-[#12A1A4]/40',
  },
  {
    id: 2,
    badge: 'Neurodiversidad · TDAH & Ritmo Propio',
    badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    text: 'En el colegio tradicional, Sofía colapsaba con las pruebas de 40 preguntas y el ruido constante de la sala. Con EstudioSimple estudia a su propio ritmo: 15 minutos en pantalla, escribe en su cuaderno y después practica con ensayos tipo evaluación formal. Los ensayos formativos le quitaron la fobia a las pruebas del MINEDUC.',
    name: 'Rodrigo T.',
    role: 'Papá de Sofía (7º Básico · Ñuñoa)',
    initials: 'RT',
    avatarBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  {
    id: 3,
    badge: 'Padres Trabajadores · Puente Pantalla-Cuaderno',
    badgeColor: 'bg-[#EE751C]/15 text-[#EE751C] border-[#EE751C]/30',
    text: 'Trabajo todo el día y no soy profesora; no tenía tiempo de armar guías ni buscar temarios en internet hasta la noche. La plataforma me entrega el paso a paso exacto para guiar a Tomás en media hora diaria. Verlo escribir en su cuaderno con entusiasmo y saber que cumple al 100% con los temarios oficiales no tiene precio.',
    name: 'Marcela V.',
    role: 'Mamá trabajadora de Tomás (3º Básico · Maipú)',
    initials: 'MV',
    avatarBg: 'bg-[#EE751C]/20 text-[#EE751C] border-[#EE751C]/40',
  },
  {
    id: 4,
    badge: 'Aprobado MINEDUC · Promoción Escolar 2025',
    badgeColor: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
    text: 'La prueba en el colegio examinador asignado era nuestro gran temor. Matías practicó con los ensayos de la plataforma durante dos meses y el día del examen reconoció de inmediato el formato formal de las preguntas. Aprobó todas las materias con notas sobresalientes y ya está matriculado para su próximo nivel escolar.',
    name: 'Fernando S.',
    role: 'Papá de Matías (6º Básico · La Florida)',
    initials: 'FS',
    avatarBg: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
  },
];

const DEFAULT_FAQ_ITEMS = [
  {
    pregunta: '¿Cómo asegura EstudioSimple que mi hijo valide su curso ante el MINEDUC?',
    respuesta: 'El proceso de Validación de Estudios por Exámenes Libres está normado formalmente por el Decreto Exento N° 2272 y el Decreto 67 del Ministerio de Educación de Chile.\n\nEstudioSimple cubre el 100% de las Bases Curriculares oficiales para 3° a 8° Básico en las 5 asignaturas evaluadas. Tu hijo no estudia contenidos al azar: domina con exactitud los Objetivos de Aprendizaje (OA) priorizados que exigen las comisiones examinadoras de los colegios sede asignados.'
  },
  {
    pregunta: 'No soy profesor ni dispongo de muchas horas al día. ¿Puedo guiar a mi hijo?',
    respuesta: 'Absolutamente. La plataforma fue creada para padres y madres que trabajan y carecen de tiempo o formación docente para diseñar clases desde cero.\n\nCada sesión cuenta con mediación pedagógica dual: una guía resolutiva directa para el apoderado que explica en 2 minutos cómo orientar la lección y qué respuesta esperar. Todo el proceso toma entre 20 y 30 minutos diarios, eliminando la necesidad de preparar material nocturno.'
  },
  {
    pregunta: '¿Por qué el método exige usar un cuaderno físico si es una plataforma web?',
    respuesta: 'Porque la sobrecarga cognitiva de pasar horas frente a una pantalla reduce la retención y genera fatiga visual. Nuestro principio rector es Pantalla y Papel.\n\nEl estudiante consume una cápsula didáctica breve de 15 minutos y traslada de inmediato la resolución manual a su cuaderno escolar análogo. Este puente físico consolida el neuroaprendizaje, entrena la motricidad fina y prepara la caligrafía del estudiante para el examen presencial escrito ante la comisión examinadora.'
  },
  {
    pregunta: '¿Es apto para niños con TDAH, TEA o estrés escolar tradicional?',
    respuesta: 'Es uno de los focos prioritarios de nuestra arquitectura. Eliminamos estímulos ruidosos, elementos distractores y sistemas de tiempo punitivos que causan ansiedad.\n\nLos contenidos aplican el enfoque CPA (Concreto-Pictórico-Abstracto), permitiendo que cada estudiante avance a su propio ritmo. Esto ayuda a descomprimir el estrés del aula masiva y devolverle la curiosidad y la confianza en sus capacidades.'
  },
  {
    pregunta: '¿Cómo prepara la plataforma al estudiante para el día de la prueba en el colegio?',
    respuesta: 'A través de nuestra Fase 2: Práctica y Ensayos. Cada unidad de aprendizaje culmina con simulacros formales de 4 alternativas estructurados con el formato formal de la evaluación docente chilena.\n\nEsto asegura que el estudiante se familiarice con la estructura del instrumento real, llegando a la fecha del examen en el colegio sede con serenidad, destreza y sin ansiedad frente al papel.'
  },
  {
    pregunta: '¿Qué asignaturas incluye y para qué cursos está disponible el programa?',
    respuesta: 'EstudioSimple cubre de forma integral desde 3º Básico hasta 8º Básico.\n\nLa membresía otorga acceso simultáneo a las 5 asignaturas oficiales evaluadas por el MINEDUC: Matemáticas, Lenguaje y Comunicación, Ciencias Naturales, Historia, Geografía y Ciencias Sociales, e Idioma Extranjero (Inglés). Al ingresar desde los primeros niveles, acompañamos la trayectoria educativa de tu hijo por hasta 6 años lectivos continuos.'
  }
];

const renderSocialIcon = (red: TipoRedSocial) => {
  switch (red) {
    case 'instagram':
      return <Instagram className="w-4 h-4 text-pink-600" />;
    case 'youtube':
      return <Youtube className="w-4 h-4 text-red-600" />;
    case 'facebook':
      return <Facebook className="w-4 h-4 text-blue-600" />;
    case 'tiktok':
      return (
        <svg className="w-4 h-4 fill-black dark:fill-white shrink-0" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      );
    case 'whatsapp':
      return <MessageCircle className="w-4 h-4 text-emerald-600" />;
    case 'telegram':
      return <Send className="w-4 h-4 text-sky-500" />;
    case 'linkedin':
      return <Linkedin className="w-4 h-4 text-blue-700" />;
    case 'x':
      return (
        <svg className="w-4 h-4 fill-slate-800 dark:fill-slate-200 shrink-0" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'sitio_web':
      return <Globe className="w-4 h-4 text-[#12A1A4]" />;
    default:
      return <ExternalLink className="w-4 h-4 text-slate-500" />;
  }
};

export const LandingPage: React.FC = () => {
  const { setViewMode, headerFooterColor, authSession, logout } = useApp();
  
  const [activeTab, setActiveTab] = useState<'tab-1' | 'tab-2' | 'tab-3' | 'tab-4'>('tab-1');
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => loadSiteConfig());
  const [popups, setPopups] = useState<PopupBanner[]>(() => loadPopups());
  const [cmsPages, setCmsPages] = useState<CmsPage[]>(() => loadCmsPages());
  const [currentSlug, setCurrentSlug] = useState<string>(() => {
    try {
      const target = sessionStorage.getItem('estudio_simple_target_slug');
      if (target) {
        sessionStorage.removeItem('estudio_simple_target_slug');
        return target;
      }
    } catch {
      // fallback
    }
    return '/';
  });
  const [selectedJournalArticle, setSelectedJournalArticle] = useState<JournalArticle | null>(null);
  const [dismissedPopupId, setDismissedPopupId] = useState<string | null>(() => {
    try {
      return localStorage.getItem('estudiosimple_dismissed_popup') || sessionStorage.getItem('estudiosimple_dismissed_popup');
    } catch {
      return null;
    }
  });

  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    cursoInteres: '7° Básico',
    mensaje: ''
  });
  const [contactSuccess, setContactSuccess] = useState(false);

  useEffect(() => {
    const refreshData = () => {
      setSiteConfig(loadSiteConfig());
      setPopups(loadPopups());
      setCmsPages(loadCmsPages());
    };
    refreshData();
    window.addEventListener('storage', refreshData);
    return () => window.removeEventListener('storage', refreshData);
  }, []);

  const activePopup = useMemo(() => {
    const today = new Date().toISOString().substring(0, 10);
    const eligible = popups.filter((p) => {
      if (!p.activo) return false;
      if (p.id === dismissedPopupId) return false;
      if (p.fechaInicio && p.fechaInicio > today) return false;
      if (p.fechaFin && p.fechaFin < today) return false;
      const freq = p.frecuencia || 'una_vez';
      if (freq === 'una_vez') {
        const seen = localStorage.getItem(`popup_seen_${p.id}`) || localStorage.getItem(`popup_read_${p.id}`);
        if (seen) return false;
      } else if (freq === 'una_vez_por_dia') {
        const seenDate = localStorage.getItem(`popup_seen_${p.id}`) || localStorage.getItem(`popup_read_${p.id}`);
        if (seenDate === today) return false;
      }
      return true;
    });
    eligible.sort((a, b) => (b.prioridad ?? 5) - (a.prioridad ?? 5));
    return eligible[0] || null;
  }, [popups, dismissedPopupId]);

  const handleDismissPopup = (idOrPopup: string | PopupBanner) => {
    const p = typeof idOrPopup === 'string' ? popups.find(x => x.id === idOrPopup) : idOrPopup;
    const id = typeof idOrPopup === 'string' ? idOrPopup : idOrPopup.id;
    setDismissedPopupId(id);
    const today = new Date().toISOString().substring(0, 10);
    const freq = p?.frecuencia || 'una_vez';
    try {
      if (freq === 'una_vez') {
        localStorage.setItem(`popup_seen_${id}`, 'true');
        localStorage.setItem(`popup_read_${id}`, 'true');
      } else if (freq === 'una_vez_por_dia') {
        localStorage.setItem(`popup_seen_${id}`, today);
        localStorage.setItem(`popup_read_${id}`, today);
      }
      sessionStorage.setItem('estudiosimple_dismissed_popup', id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.nombre.trim() || !contactForm.email.trim() || !contactForm.mensaje.trim()) {
      return;
    }
    addMensajeContacto({
      nombre: contactForm.nombre.trim(),
      email: contactForm.email.trim(),
      telefono: contactForm.telefono.trim(),
      cursoInteres: contactForm.cursoInteres,
      mensaje: contactForm.mensaje.trim()
    });
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setShowContactModal(false);
      setContactForm({
        nombre: '',
        email: '',
        telefono: '',
        cursoInteres: '7° Básico',
        mensaje: ''
      });
    }, 2200);
  };

  const isAuthenticated = authSession?.isAuthenticated === true;

  const homePage = useMemo(() => {
    return cmsPages.find((p) => p.slug === '/');
  }, [cmsPages]);

  const menuPages = useMemo(() => {
    return cmsPages
      .filter((p) => p.activo && p.mostrarEnMenu)
      .sort((a, b) => a.ordenMenu - b.ordenMenu);
  }, [cmsPages]);

  const currentPage = useMemo(() => {
    return cmsPages.find((p) => p.slug === currentSlug) || homePage;
  }, [cmsPages, currentSlug, homePage]);

  const activeCintaSection = useMemo(() => {
    const page = currentSlug === '/' ? homePage : currentPage;
    if (!page) return null;
    return page.secciones.find((s) => s.tipoBloque === 'CINTA_NOTICIAS');
  }, [currentSlug, homePage, currentPage]);

  const showCinta = useMemo(() => {
    if (siteConfig.cintaNoticias?.activo === false) return false;
    if (activeCintaSection) {
      return activeCintaSection.activo;
    }
    return false;
  }, [siteConfig.cintaNoticias, activeCintaSection]);

  const isSectionActive = (type: string) => {
    if (!homePage) return true;
    const sec = homePage.secciones.find((s) => s.tipoBloque === type);
    return sec ? sec.activo : true;
  };

  const homeTestimoniosSection = useMemo(() => {
    return homePage?.secciones.find((s) => s.tipoBloque === 'TESTIMONIOS');
  }, [homePage]);

  const homeFaqSection = useMemo(() => {
    return homePage?.secciones.find((s) => s.tipoBloque === 'FAQ' || s.tipoBloque === 'ACORDEON');
  }, [homePage]);

  const dynamicTestimonios = useMemo(() => {
    const list = homeTestimoniosSection?.configuracion?.testimonios;
    if (list && Array.isArray(list) && list.length > 0) {
      return list.map((item: any, idx: number) => ({
        id: idx + 1,
        badge: item.badge || 'Comunidad Homeschooling',
        badgeColor: item.badgeColor || 'bg-[#12A1A4]/15 text-[#57d6f3] border-[#12A1A4]/30',
        text: item.cita || item.text || '',
        name: item.nombre || item.name || 'Familia de EstudioSimple',
        role: item.rol || item.role || 'Comunidad Oficial',
        initials: (item.nombre || item.name || 'ES').substring(0, 2).toUpperCase(),
        avatarBg: 'bg-[#12A1A4]/20 text-[#57d6f3] border-[#12A1A4]/40',
        fotoUrl: item.fotoUrl,
        estrellas: item.estrellas || 5
      }));
    }
    return TESTIMONIALS;
  }, [homeTestimoniosSection]);

  const dynamicFaqItems = useMemo(() => {
    const items = homeFaqSection?.configuracion?.items;
    if (items && Array.isArray(items) && items.length > 0) {
      return items;
    }
    return null;
  }, [homeFaqSection]);

  const goToPricing = () => {
    setViewMode('pricing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const comentariosBorderStyles = getBorderStyles(
    siteConfig.estilosGlobales?.modoBordeComentarios || 'completo',
    siteConfig.estilosGlobales?.colorBordeComentarios || 'rgba(255,255,255,0.1)',
    siteConfig.estilosGlobales?.grosorBordeComentarios || '1.5px',
    '1px solid rgba(255,255,255,0.08)'
  );

  const faqBorderStyles = getBorderStyles(
    siteConfig.estilosGlobales?.modoBordeFaq || 'completo',
    siteConfig.estilosGlobales?.colorBordeFaq || 'rgba(255,255,255,0.1)',
    siteConfig.estilosGlobales?.grosorBordeFaq || '1.5px',
    '1px solid rgba(255,255,255,0.08)'
  );

  const pilaresBorderStyles = getBorderStyles(
    siteConfig.estilosGlobales?.modoBordeComentarios || 'completo',
    siteConfig.estilosGlobales?.colorBordeEtiquetas || 'rgba(255,255,255,0.1)',
    siteConfig.estilosGlobales?.grosorBordeComentarios || '1.5px',
    '1px solid rgba(255,255,255,0.1)'
  );

  return (
    <div className="min-h-screen font-body-md selection:bg-[#12A1A4]/30 transition-colors duration-300" style={{ backgroundColor: 'var(--canvas-bg)', color: 'var(--canvas-text)', fontFamily: '"Arial Rounded MT Bold", "Arial Rounded", sans-serif' }}>
      
      {/* 1. TOP NAVBAR INSTITUCIONAL COMPARTIDO */}
      <PublicHeader
        siteConfig={siteConfig}
        menuPages={menuPages}
        currentSlug={currentSlug}
        isJournalArticleOpen={!!selectedJournalArticle}
        onNavigatePage={(slug) => {
          setSelectedJournalArticle(null);
          setCurrentSlug(slug);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigatePricing={goToPricing}
      />

      {/* CINTA DE NOTICIAS TICKER (CMS) */}
      {showCinta && (
        <div className="pt-[84px] md:pt-[108px] lg:pt-[124px] w-full relative z-40">
          <CintaNoticiasBlock configuracion={{ ...(siteConfig.cintaNoticias || {}), ...(activeCintaSection?.configuracion || {}) }} />
        </div>
      )}

      <main className="pt-0">
        {selectedJournalArticle ? (
          <JournalArticleView
            article={selectedJournalArticle}
            onBack={() => {
              setSelectedJournalArticle(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToPricing={goToPricing}
            onSelectRelated={(art) => {
              setSelectedJournalArticle(art);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : currentSlug === '/' ? (
          <>
            {/* 2. HERO INTERACTIVO CON SCROLL SCRUBBING */}
            <section id="home">
              <HeroScrollScrubber />
            </section>

        {/* 3. SECTION: ¿CÓMO LOGRAMOS EL ÉXITO ACADÉMICO? */}
        <section id="exito" className="px-4 md:px-12 max-w-7xl mx-auto py-20 md:py-24">
          <div className="text-center mb-12 space-y-3">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
              style={{
                border: `1.5px solid ${siteConfig.estilosGlobales?.colorBordeEtiquetas || '#18AFCB'}`,
                backgroundColor: `${siteConfig.estilosGlobales?.colorBordeEtiquetas || '#18AFCB'}20`,
                color: siteConfig.estilosGlobales?.colorBordeEtiquetas || '#57d6f3'
              }}
            >
              <span className="material-symbols-outlined text-sm">school</span>
              <span>Metodología Paso a Paso</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              ¿Cómo logramos el éxito académico?
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto font-normal">
              Cuatro pilares estructurales para validar el año escolar con autonomía y serenidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div
              className="bg-[#16325C] rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/10"
              style={pilaresBorderStyles}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#123a72] flex items-center justify-center mb-6 shadow-lg">
                <span className="material-symbols-outlined text-white text-3xl">grid_view</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1. Bloques Independientes</h3>
              <p className="text-white/70 text-base leading-relaxed">
                Sesiones modulares de 30 minutos sin libros densos. Un formato paso a paso, visual y sin estrés para tu hijo.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="bg-[#16325C] rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/10"
              style={pilaresBorderStyles}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#18AFCB] flex items-center justify-center mb-6 shadow-lg">
                <span className="material-symbols-outlined text-white text-3xl">menu_book</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">2. Temario MINEDUC</h3>
              <p className="text-white/70 text-base leading-relaxed">
                Ruta exacta de 3° a 8° Básico con el temario oficial del MINEDUC. Contenido directo, organizado y sin relleno.
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="bg-[#16325C] rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/10"
              style={pilaresBorderStyles}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#f27a00] flex items-center justify-center mb-6 shadow-lg">
                <span className="material-symbols-outlined text-white text-3xl">gavel</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3. Respaldo Legal</h3>
              <p className="text-white/70 text-base leading-relaxed">
                Nuestro sistema cumple estrictamente con los Decretos 2272 y 67 para certificar legalmente el año escolar.
              </p>
            </div>

            {/* Card 4 */}
            <div
              className="bg-[#16325C] rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/10"
              style={pilaresBorderStyles}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#F8AD22] flex items-center justify-center mb-6 shadow-lg">
                <span className="material-symbols-outlined text-[#0A192F] text-3xl">fact_check</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">4. Evaluación</h3>
              <p className="text-white/70 text-base leading-relaxed">
                Simulacros de examen idénticos a los oficiales para garantizar que lleguen con total seguridad.
              </p>
            </div>

          </div>
        </section>

        {/* 4. METHOD TABS SECTION (FUNDADO EN EL PLAN MAESTRO) */}
        {isSectionActive('METODO') && (
        <section className="px-4 md:px-12 max-w-5xl mx-auto py-20 md:py-24" id="method">
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12A1A4]/15 text-[#57d6f3] border border-[#12A1A4]/30 text-xs font-semibold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">psychology</span>
              <span>Pedagogía Esencial sin Sobrecarga Cognitiva</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Nuestro Método
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto font-normal">
              El puente exacto entre la cápsula digital interactiva y el cuaderno físico de tu hijo.
            </p>
          </div>

          <div className="bg-[#16325C] rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 border border-white/10">
            
            {/* Tab Navigation Bar */}
            <div className="flex flex-wrap sm:flex-nowrap border-b border-white/10 min-h-[60px] relative bg-[#10223D]">
              <button 
                type="button"
                onClick={() => setActiveTab('tab-1')}
                className={`tab-btn flex-1 py-4 px-3 sm:px-6 text-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeTab === 'tab-1' ? 'bg-[#1D4ED8] text-white opacity-100 shadow-xl border-b-4 border-white' : 'text-white/70 opacity-80 hover:text-white hover:bg-white/5'
                }`}
              >
                1. Pantalla y Papel
              </button>

              <button 
                type="button"
                onClick={() => setActiveTab('tab-2')}
                className={`tab-btn flex-1 py-4 px-3 sm:px-6 text-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeTab === 'tab-2' ? 'bg-[#12A1A4] text-white opacity-100 shadow-xl border-b-4 border-white' : 'text-white/70 opacity-80 hover:text-white hover:bg-white/5'
                }`}
              >
                2. Mediación Dual
              </button>

              <button 
                type="button"
                onClick={() => setActiveTab('tab-3')}
                className={`tab-btn flex-1 py-4 px-3 sm:px-6 text-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeTab === 'tab-3' ? 'bg-[#F8AD22] text-[#0A192F] opacity-100 shadow-xl border-b-4 border-[#0A192F]' : 'text-white/70 opacity-80 hover:text-white hover:bg-white/5'
                }`}
              >
                3. Neurodiversidad
              </button>

              <button 
                type="button"
                onClick={() => setActiveTab('tab-4')}
                className={`tab-btn flex-1 py-4 px-3 sm:px-6 text-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeTab === 'tab-4' ? 'bg-[#EE751C] text-white opacity-100 shadow-xl border-b-4 border-white' : 'text-white/70 opacity-80 hover:text-white hover:bg-white/5'
                }`}
              >
                4. Rigor MINEDUC
              </button>
            </div>

            {/* Tab Contents */}
            <div className="relative p-8 md:p-12 min-h-[320px]">
              {activeTab === 'tab-1' && (
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D4ED8]/20 text-[#60A5FA] border border-[#1D4ED8]/40 text-xs font-black uppercase tracking-wider">
                      Fase 1: Puente Pantalla - Papel
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white">La Pantalla Modela, el Cuaderno Físico Consolida</h3>
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                      Microaprendizaje de 30 minutos al día. Tu hijo no pasa horas pasivo frente a un monitor: la pantalla entrega una explicación didáctica breve y de inmediato el estudiante replica y resuelve el ejercicio en su <span className="text-[#F8AD22] font-bold">cuaderno físico</span>, fijando neurológicamente el aprendizaje motriz y evitando la fatiga de pantallas infinitas.
                    </p>
                  </div>
                  <div className="shrink-0 p-8 bg-[#1D4ED8]/10 rounded-3xl border border-[#1D4ED8]/30 shadow-2xl md:ml-6 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[100px] md:text-[130px] text-[#60A5FA] leading-none">edit_note</span>
                  </div>
                </div>
              )}

              {activeTab === 'tab-2' && (
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12A1A4]/20 text-[#12A1A4] border border-[#12A1A4]/40 text-xs font-black uppercase tracking-wider">
                      Acompañamiento sin Estrés
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white">El Apoderado como Mentor con Diálogo Socrático</h3>
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                      Diseñado para madres y padres que trabajan y carecen de formación pedagógica. Mientras el estudiante practica con autonomía, el portal del apoderado le entrega <span className="text-[#12A1A4] font-bold">preguntas clave, resolución de errores comunes e indicadores de logro</span>, permitiendo guiar con seguridad, sin frustraciones ni discusiones familiares.
                    </p>
                  </div>
                  <div className="shrink-0 p-8 bg-[#12A1A4]/10 rounded-3xl border border-[#12A1A4]/30 shadow-2xl md:ml-6 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[100px] md:text-[130px] text-[#12A1A4] leading-none">record_voice_over</span>
                  </div>
                </div>
              )}

              {activeTab === 'tab-3' && (
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8AD22]/20 text-[#F8AD22] border border-[#F8AD22]/40 text-xs font-black uppercase tracking-wider">
                      Descompresión Escolar y TEA / TDAH
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white">Ritmo Respetuoso para Neurodiversidad</h3>
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                      Sin cronómetros angustiantes ni gamificación punitiva. Desarrollado con pausas sensoriales y lenguaje directo para estudiantes que salieron del aula tradicional por <span className="text-[#F8AD22] font-bold">ansiedad, bullying escolar o desajuste con el SAE</span>, devolviéndoles la autoestima y la curiosidad natural por aprender.
                    </p>
                  </div>
                  <div className="shrink-0 p-8 bg-[#F8AD22]/10 rounded-3xl border border-[#F8AD22]/30 shadow-2xl md:ml-6 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[100px] md:text-[130px] text-[#F8AD22] leading-none">self_improvement</span>
                  </div>
                </div>
              )}

              {activeTab === 'tab-4' && (
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EE751C]/20 text-[#EE751C] border border-[#EE751C]/40 text-xs font-black uppercase tracking-wider">
                      Fase 2: Certificación Legal Oficial
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white">Ensayos con Estándar Formal de Exámenes Libres</h3>
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                      Una vez asimilado el concepto en el cuaderno, se habilita el módulo de práctica. Los estudiantes se enfrentan a <span className="text-[#EE751C] font-bold">ensayos estructurados con estándares docentes del MINEDUC (Decretos 2272 y 67)</span>, garantizando que el estudiante valide con serenidad su año escolar ante la comisión examinadora.
                    </p>
                  </div>
                  <div className="shrink-0 p-8 bg-[#EE751C]/10 rounded-3xl border border-[#EE751C]/30 shadow-2xl md:ml-6 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[100px] md:text-[130px] text-[#EE751C] leading-none">fact_check</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>
        )}

        {/* 5. TESTIMONIALS SECTION */}
        {isSectionActive('TESTIMONIOS') && (
        <section id="testimonios" className="px-4 md:px-12 max-w-7xl mx-auto py-20 md:py-24">
          <div className="text-center mb-12 space-y-3">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
              style={{
                border: `1.5px solid ${siteConfig.estilosGlobales?.colorBordeEtiquetas || '#F8AD22'}`,
                backgroundColor: `${siteConfig.estilosGlobales?.colorBordeEtiquetas || '#F8AD22'}20`,
                color: siteConfig.estilosGlobales?.colorBordeEtiquetas || '#F8AD22'
              }}
            >
              <span className="material-symbols-outlined text-sm">family_restroom</span>
              <span>Comunidad Homeschooling · Historias Reales</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              {homeTestimoniosSection?.titulo || 'Lo que dicen las familias'}
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto font-normal">
              {homeTestimoniosSection?.subtitulo || 'Experiencias de aprendizaje en el hogar y validación formal de exámenes libres.'}
            </p>
          </div>

          {/* Grid Horizontal de los Testimonios Dinámicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {dynamicTestimonios.map((t: any, idx: number) => (
              <div 
                key={t.id || idx}
                className="bg-[#12284D]/75 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group"
                style={comentariosBorderStyles}
              >
                <div>
                  {/* Badge de Caso Estratégico */}
                  <div className="mb-3">
                    <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full border ${t.badgeColor || 'bg-[#12A1A4]/15 text-[#57d6f3] border-[#12A1A4]/30'} leading-tight`}>
                      {t.badge}
                    </span>
                  </div>

                  {/* 5 Estrellas Doradas con Relleno Sólido */}
                  <div className="flex items-center gap-1 mb-3.5" style={{ color: homeTestimoniosSection?.configuracion?.colorEstrellas || siteConfig.estilosGlobales?.colorEstrellas || '#F8AD22' }}>
                    {[...Array(t.estrellas || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current shrink-0" />
                    ))}
                  </div>

                  {/* Cuerpo del Testimonio con tipografía fina y legible */}
                  <p className="text-slate-200 text-xs sm:text-sm font-normal leading-relaxed mb-5">
                    "{t.text}"
                  </p>
                </div>

                {/* Pie de Autor Verificado */}
                <div className="pt-3.5 border-t border-white/10 flex items-center gap-3">
                  {t.fotoUrl ? (
                    <img src={t.fotoUrl} alt={t.name} className="w-9 h-9 rounded-xl object-cover shrink-0 border border-white/20" />
                  ) : (
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 border ${t.avatarBg || 'bg-[#12A1A4]/20 text-[#57d6f3] border-[#12A1A4]/40'}`}>
                      {t.initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-semibold text-xs sm:text-sm text-white flex items-center gap-1">
                      <span className="truncate">{t.name}</span>
                      <span className="material-symbols-outlined text-xs text-emerald-400 shrink-0" title="Familia Verificada">verified</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate font-normal">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        )}

        {/* 6. FAQ ACCORDION SECTION */}
        {isSectionActive('FAQ') && (
        <section id="faq" className="px-4 sm:px-6 md:px-8 max-w-5xl mx-auto py-20 md:py-24">
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12A1A4]/15 text-[#57d6f3] border border-[#12A1A4]/30 text-xs font-semibold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">help</span>
              <span>Resolución de Dudas Frecuentes</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              {homeFaqSection?.titulo || 'Preguntas Frecuentes'}
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto font-normal">
              {homeFaqSection?.subtitulo || 'Respuestas directas sobre el respaldo legal, la metodología y el estudio en el hogar.'}
            </p>
          </div>

          <div className="space-y-4">
            {(dynamicFaqItems || DEFAULT_FAQ_ITEMS).map((item: any, idx: number) => (
              <div 
                key={idx}
                className="bg-[#16325C] rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:border-white/20"
                style={faqBorderStyles}
              >
                <details className="group">
                  <summary className="font-bold text-white text-base md:text-lg p-5 md:p-6 cursor-pointer flex justify-between items-center outline-none transition-colors gap-4 select-none list-none hover:bg-white/5">
                    <span className="text-left">{item.pregunta}</span>
                    <span 
                      className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-xl shrink-0"
                      style={{ color: homeFaqSection?.configuracion?.colorIcono || siteConfig.estilosGlobales?.colorAcentoFaq || '#57d6f3' }}
                    >expand_more</span>
                  </summary>
                  <div className="px-6 pb-6 text-slate-200 text-sm md:text-base font-normal leading-relaxed border-t border-white/5 pt-4 whitespace-pre-line space-y-2">
                    <p>{item.respuesta}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>
        )}

        {/* 7. BANNER FINAL HACIA PLANES Y PRECIOS */}
        <section className="px-4 md:px-12 max-w-7xl mx-auto py-16">
          <div className="bg-[#16325C] border border-[#abc7ff]/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden transition-all duration-300 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10 leading-tight max-w-3xl mx-auto">
              ¿Listo para transformar la educación de tus hijos con EstudioSimple?
            </h3>
            <p className="text-gray-300 max-w-xl mx-auto mb-6 text-sm md:text-base">
              Únete a las familias que ya estudian con temarios oficiales MINEDUC sin estrés y con total respaldo curricular y legal.
            </p>
            <div className="relative z-10 flex justify-center mt-2">
              <button 
                type="button"
                onClick={goToPricing}
                className="bg-[#EE751C] hover:bg-[#D66512] text-white px-8 py-4 rounded-2xl font-bold text-base shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Ver Planes y Precios Oficiales</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* JOURNAL / BLOG PEDAGÓGICO EN INICIO */}
        {isSectionActive('JOURNAL') && (
          <JournalBlock
            titulo={homePage?.secciones.find((s) => s.tipoBloque === 'JOURNAL')?.titulo || 'Journal Pedagógico · Últimas Novedades'}
            subtitulo={homePage?.secciones.find((s) => s.tipoBloque === 'JOURNAL')?.subtitulo || 'Guías para padres, novedades de fechas MINEDUC y artículos del método de estudio.'}
            configuracion={homePage?.secciones.find((s) => s.tipoBloque === 'JOURNAL')?.configuracion}
            onNavigateToPricing={goToPricing}
            onSelectArticle={(article) => {
              setSelectedJournalArticle(article);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* EVENTOS Y CALENDARIO OFICIAL MINEDUC EN INICIO */}
        {isSectionActive('EVENTOS') && (
          <EventosBlock
            titulo={homePage?.secciones.find((s) => s.tipoBloque === 'EVENTOS')?.titulo || 'Calendario Oficial y Fechas Clave MINEDUC'}
            subtitulo={homePage?.secciones.find((s) => s.tipoBloque === 'EVENTOS')?.subtitulo || 'Convocatorias de inscripción, períodos de exámenes libres y talleres de acompañamiento pedagógico.'}
            configuracion={homePage?.secciones.find((s) => s.tipoBloque === 'EVENTOS')?.configuracion}
          />
        )}

        {/* Secciones adicionales personalizadas añadidas a la página de inicio desde el constructor CMS */}
        {homePage?.secciones
          .filter(
            (s) =>
              s.activo &&
              !['CINTA_NOTICIAS', 'HERO', 'METODO', 'SIMULADOR', 'PRICING', 'TESTIMONIOS', 'FAQ', 'JOURNAL', 'EVENTOS'].includes(s.tipoBloque)
          )
          .map((sec) => (
            <div key={sec.id} className="max-w-7xl mx-auto px-4 md:px-12 py-8">
              <CmsBlockRenderer
                section={sec}
                onNavigateToPricing={goToPricing}
                onOpenContactModal={() => setShowContactModal(true)}
                onSelectJournalArticle={(article) => {
                  setSelectedJournalArticle(article);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          ))}
          </>
        ) : (
          <div 
            className={showCinta ? "min-h-[75vh] transition-colors duration-300" : "pt-[84px] md:pt-[108px] lg:pt-[124px] min-h-[75vh] transition-colors duration-300"}
            style={{
              backgroundColor: currentPage?.colorFondo || undefined,
              color: currentPage?.colorTexto === 'dark' ? '#0F172A' : currentPage?.colorTexto === 'light' ? '#F8FAFC' : undefined
            }}
          >
            {/* Secciones de la Página Actual (Renderizador Universal de Bloques Limpio) */}
            {currentPage && currentPage.secciones.filter((s) => s.activo && s.tipoBloque !== 'CINTA_NOTICIAS').map((sec) => (
              <div
                key={sec.id}
                className={
                  sec.tipoBloque === 'HERO' || sec.tipoBloque === 'PAGE_HEADER' || sec.tipoBloque === 'JOURNAL' || sec.tipoBloque === 'EVENTOS'
                    ? ''
                    : 'max-w-7xl mx-auto px-4 md:px-12'
                }
              >
                <CmsBlockRenderer
                  section={sec}
                  onNavigateToPricing={goToPricing}
                  onOpenContactModal={() => setShowContactModal(true)}
                  onSelectJournalArticle={(article) => {
                    setSelectedJournalArticle(article);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 8. FOOTER INSTITUCIONAL DE 2 CAPAS: MARCO AMARILLO BENTO -> SUB-FOOTER AZUL INSTITUCIONAL */}
      <footer className="border-t border-slate-200 relative w-full shadow-2xl transition-colors duration-300">
        
        {/* CAPA 1: CUERPO PRINCIPAL (MARCO CÁLIDO INSTITUCIONAL CON ISLA BENTO BLANCA) */}
        <div 
          className="transition-colors duration-300 py-12 md:py-16 px-4 md:px-12"
          style={{ backgroundColor: 'var(--hf-bg)' }}
        >
          <div 
            className="max-w-7xl mx-auto rounded-3xl p-8 md:p-12 shadow-2xl border border-black/10 transition-colors duration-300"
            style={{ 
              backgroundColor: siteConfig.footer?.bentoCardBgColor || '#FFFFFF',
              color: siteConfig.footer?.footerTextColor || '#1E293B'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
              
              {/* Columna 1: Marca y Misión (4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                <div 
                  className="inline-block cursor-pointer" 
                  onClick={() => { setViewMode('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  title="EstudioSimple"
                >
                  <img 
                    alt="Estudio Simple Logo" 
                    className="h-36 md:h-44 w-auto object-contain" 
                    src={siteConfig.footer?.logoUrl || '/logos/Logo con todo.png'}
                  />
                </div>
                <p className="text-sm opacity-90 leading-relaxed font-medium max-w-sm">
                  {siteConfig.footer?.missionText || 'Plataforma pedagógica especializada en la preparación integral de exámenes libres MINEDUC para estudiantes de 3º a 8º Básico. Método paso a paso para aprender en familia.'}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Temarios Oficiales MINEDUC 2026</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-[#123A72] border border-blue-200 text-xs font-bold">
                    <span className="material-symbols-outlined text-sm text-[#123A72]">verified</span>
                    <span>Decretos 2272 y 67</span>
                  </div>
                </div>
              </div>

              {/* Columna 2: Plataforma y Navegación (2 cols) */}
              <div className="lg:col-span-2">
                <h4 
                  className="font-extrabold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5"
                  style={{ color: siteConfig.footer?.footerHeadingsColor || '#123A72' }}
                >
                  <span className="material-symbols-outlined text-sm text-[#12A1A4]">navigation</span>
                  <span>Plataforma</span>
                </h4>
                <ul className="space-y-3 text-sm font-medium">
                  <li>
                    <button 
                      onClick={() => { setViewMode('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                      className="opacity-80 hover:opacity-100 hover:underline transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base opacity-70">home</span>
                      <span>Inicio & Método</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setViewMode('login')} 
                      className="opacity-80 hover:opacity-100 hover:underline transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base opacity-70">laptop_mac</span>
                      <span>Salón Virtual</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={goToPricing} 
                      className="text-[#EE751C] hover:text-[#D66512] hover:underline transition-colors font-bold cursor-pointer flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base text-[#EE751C]">sell</span>
                      <span>Planes y Precios</span>
                    </button>
                  </li>
                  <li>
                    <a 
                      href="#faq" 
                      className="opacity-80 hover:opacity-100 hover:underline transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base opacity-70">help_outline</span>
                      <span>Preguntas Frecuentes</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Columna 3: Asignaturas Evaluadas MINEDUC (3 cols) */}
              <div className="lg:col-span-3">
                <h4 
                  className="font-extrabold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5"
                  style={{ color: siteConfig.footer?.footerHeadingsColor || '#123A72' }}
                >
                  <span className="material-symbols-outlined text-sm text-[#EE751C]">menu_book</span>
                  <span>Temarios Evaluados</span>
                </h4>
                <ul className="space-y-2.5 text-sm opacity-85 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F8AD22] shrink-0"></span>
                    <span>Matemáticas (3° a 8° Básico)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#18AFCB] shrink-0"></span>
                    <span>Lenguaje y Comunicación</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                    <span>Ciencias Naturales</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#EE751C] shrink-0"></span>
                    <span>Historia, Geografía y Cs. Sociales</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#123A72] shrink-0"></span>
                    <span>Idioma Extranjero: Inglés</span>
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-black/10 text-[11px] opacity-60 font-medium">
                  Bases Curriculares Oficiales MINEDUC
                </div>
              </div>

              {/* Columna 4: Familias y Soporte (3 cols) */}
              <div className="lg:col-span-3 space-y-3">
                <h4 
                  className="font-extrabold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5"
                  style={{ color: siteConfig.footer?.footerHeadingsColor || '#123A72' }}
                >
                  <span className="material-symbols-outlined text-sm text-emerald-600">forum</span>
                  <span>Familias y Soporte</span>
                </h4>
                
                {/* Botón WhatsApp Destacado */}
                <a 
                  href={`https://wa.me/${(siteConfig.footer?.whatsAppNumber || '+56987654321').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-4 py-2.5 flex items-center justify-between text-xs font-bold shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    <span>{siteConfig.footer?.whatsAppLabel || 'WhatsApp Apoderados'}</span>
                  </div>
                  <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full">{siteConfig.footer?.whatsAppNumber || '+56 9 8765 4321'}</span>
                </a>

                {/* Botón Abrir Formulario de Contacto */}
                <button
                  type="button"
                  onClick={() => setShowContactModal(true)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl px-4 py-2.5 flex items-center justify-center gap-2 text-xs font-bold transition-all border border-slate-200 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm text-[#12A1A4]">mail</span>
                  <span>Enviar Consulta Pedagógica</span>
                </button>

                {/* Enlaces con Iconos Profesionales y Redes Sociales Dinámicas */}
                <ul className="space-y-2.5 text-sm opacity-85 font-medium pt-1">
                  {siteConfig.footer?.emailContacto && (
                    <li>
                      <a href={`mailto:${siteConfig.footer.emailContacto}`} className="hover:opacity-100 hover:underline transition-all flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-base text-[#12A1A4]">alternate_email</span>
                        <span className="truncate">{siteConfig.footer.emailContacto}</span>
                      </a>
                    </li>
                  )}
                  {siteConfig.footer?.redesSociales && siteConfig.footer.redesSociales.length > 0 ? (
                    siteConfig.footer.redesSociales.filter((r) => r.activo).map((redItem) => (
                      <li key={redItem.id}>
                        <a 
                          href={redItem.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:opacity-100 hover:underline transition-all flex items-center gap-2.5"
                        >
                          <span className="shrink-0">{renderSocialIcon(redItem.red)}</span>
                          <span className="truncate">{redItem.etiqueta}</span>
                        </a>
                      </li>
                    ))
                  ) : (
                    <>
                      {siteConfig.footer?.instagramUrl && (
                        <li>
                          <a href={siteConfig.footer.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:underline transition-all flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-base text-[#EE751C]">photo_camera</span>
                            <span>Instagram Oficial</span>
                          </a>
                        </li>
                      )}
                      {siteConfig.footer?.youtubeUrl && (
                        <li>
                          <a href={siteConfig.footer.youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:underline transition-all flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-base text-red-600">smart_display</span>
                            <span>Canal Educativo YouTube</span>
                          </a>
                        </li>
                      )}
                    </>
                  )}
                </ul>

                {siteConfig.contacto?.horarioAtencion && (
                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <p className="font-semibold text-slate-600">{siteConfig.contacto.horarioAtencion}</p>
                    {siteConfig.contacto.ciudad && <p>{siteConfig.contacto.ciudad}</p>}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* CAPA 2: SUB-FOOTER DE COPYRIGHT EN AZUL CLARO INSTITUCIONAL (#123A72) */}
        <div className="text-white py-10 px-4 md:px-12 border-t border-black/15" style={{ backgroundColor: siteConfig.footer?.footerBgColor || '#123A72' }}>
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Nivel Superior: Cápsula de Acreditación Ministerial MINEDUC */}
            <div className="bg-[#0B254D]/75 border border-white/10 rounded-2xl p-4 md:px-6 md:py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
                  <span className="material-symbols-outlined text-lg">verified_user</span>
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 block">
                    MINEDUC · República de Chile
                  </span>
                  <span className="text-xs text-blue-100/90 font-medium">
                    Validación y Certificación Oficial bajo Decretos N° 2272 y N° 67
                  </span>
                </div>
              </div>
              <p className="text-xs text-blue-100/80 leading-relaxed text-center md:text-right max-w-xl font-normal">
                {siteConfig.footer?.decretoText || 'Preparación integral para rendir y validar asignaturas escolares con respaldo curricular formal ante comisiones examinadoras.'}
              </p>
            </div>

            {/* Nivel Inferior: Barra Equilibrada y Simétrica de 3 Secciones */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs pt-2">
              {/* Sección Izquierda: Copyright */}
              <div className="text-blue-200/80 font-medium text-center md:text-left">
                {siteConfig.footer?.copyrightText || '(c) 2026 EstudioSimple Chile · Plataforma Pedagógica Familiar'}
              </div>

              {/* Sección Central: Enlaces Principales con Separador */}
              <div className="flex items-center gap-3 text-blue-100 font-medium">
                <button 
                  type="button" 
                  onClick={() => {
                    setViewMode('courses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Cursos y Niveles
                </button>
                <span className="text-blue-300/40 select-none">·</span>
                <button 
                  type="button" 
                  onClick={goToPricing} 
                  className="hover:text-white hover:underline transition-colors cursor-pointer font-bold text-amber-300"
                >
                  Planes y Precios
                </button>
                <span className="text-blue-300/40 select-none">·</span>
                <button 
                  type="button" 
                  onClick={() => {
                    setSelectedJournalArticle(null);
                    setCurrentSlug('/blog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Blog &amp; Guías
                </button>
                <span className="text-blue-300/40 select-none">·</span>
                <a 
                  href="#faq" 
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Preguntas Frecuentes
                </a>
              </div>

              {/* Sección Derecha: Acceso de Gestión en Píldora */}
              <div>
                <button 
                  type="button" 
                  onClick={() => setViewMode('admin')} 
                  className="bg-white/10 hover:bg-white/20 border border-white/15 px-3.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 text-blue-100 hover:text-white transition-all shadow-xs cursor-pointer" 
                  title="Acceso de Gestión"
                >
                  <Lock className="w-3.5 h-3.5 stroke-[2]" />
                  <span>Gestión</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </footer>

      {/* POPUP / AVISO EMERGENTE ACTIVO (MOTOR MULTI-POSICIÓN Y ESTILOS) */}
      <PopupWrapper popup={activePopup} onDismiss={handleDismissPopup} />

      {/* MODAL DE CONTACTO / CONSULTA DIRECTA DE APODERADOS */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 text-slate-800">
            <button
              type="button"
              onClick={() => setShowContactModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              title="Cerrar"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#12A1A4]/15 text-[#12A1A4] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">contact_support</span>
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Contacto con Mentores Pedagógicos</h2>
                <p className="text-xs text-slate-500">¿Tienes dudas sobre los temarios MINEDUC o la inscripción escolar?</p>
              </div>
            </div>

            {contactSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2 my-4">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">check</span>
                </div>
                <h3 className="text-sm font-extrabold text-emerald-900">Mensaje Enviado Exitosamente</h3>
                <p className="text-xs text-emerald-700">
                  Hemos recibido tu consulta en la bandeja de atención. Un docente mentor se pondrá en contacto contigo a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3.5 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.nombre}
                    onChange={(e) => setContactForm({ ...contactForm, nombre: e.target.value })}
                    placeholder="Ej: Patricia Morales"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#12A1A4]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="ejemplo@correo.cl"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#12A1A4]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono / WhatsApp</label>
                    <input
                      type="tel"
                      value={contactForm.telefono}
                      onChange={(e) => setContactForm({ ...contactForm, telefono: e.target.value })}
                      placeholder="+56 9 1234 5678"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#12A1A4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Curso o Nivel de Interés</label>
                  <select
                    value={contactForm.cursoInteres}
                    onChange={(e) => setContactForm({ ...contactForm, cursoInteres: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-[#12A1A4]"
                  >
                    <option value="3° Básico">3° Básico</option>
                    <option value="4° Básico">4° Básico</option>
                    <option value="5° Básico">5° Básico</option>
                    <option value="6° Básico">6° Básico</option>
                    <option value="7° Básico">7° Básico</option>
                    <option value="8° Básico">8° Básico</option>
                    <option value="Orientación General">Orientación General Homeschooling</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mensaje o Consulta Pedagógica *</label>
                  <textarea
                    required
                    rows={3}
                    value={contactForm.mensaje}
                    onChange={(e) => setContactForm({ ...contactForm, mensaje: e.target.value })}
                    placeholder="Cuéntanos tus consultas respecto al temario, validación de estudios o fechas..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#12A1A4]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-[#12A1A4] hover:bg-[#0E8082] text-white rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Enviar Mensaje</span>
                    <span className="material-symbols-outlined text-sm">send</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
