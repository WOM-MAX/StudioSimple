import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Sparkles, Shield, ArrowRight, HelpCircle, Lock, LogIn, User, LogOut } from 'lucide-react';
import { PublicHeader } from '../common/PublicHeader';
import { loadSiteConfig } from '../../data/initialCmsExtrasData';
import { loadCmsPages } from '../../data/initialCmsData';
import { SiteConfig } from '../../types/cmsExtras';
import { CmsPage } from '../../types/cms';

export const PricingPage: React.FC = () => {
  const { setViewMode, headerFooterColor, authSession, logout } = useApp();
  const isAuthenticated = authSession?.isAuthenticated === true;

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => loadSiteConfig());
  const [cmsPages, setCmsPages] = useState<CmsPage[]>(() => loadCmsPages());
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const refresh = () => {
      setSiteConfig(loadSiteConfig());
      setCmsPages(loadCmsPages());
    };
    refresh();
    window.addEventListener('storage', refresh);
    return () => window.removeEventListener('storage', refresh);
  }, []);

  const menuPages = useMemo(() => {
    return cmsPages
      .filter((p) => p.activo && p.mostrarEnMenu)
      .sort((a, b) => a.ordenMenu - b.ordenMenu);
  }, [cmsPages]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSelectPlan = (plan: 'monthly' | 'full' | 'trial') => {
    localStorage.setItem('estudio_simple_selected_plan', plan);
    setViewMode('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqs = [
    {
      q: '¿Cómo funciona la Prueba Gratuita de 7 Días?',
      a: 'La prueba de 7 días no requiere tarjeta de crédito. Al registrarte obtienes acceso inmediato a lecciones modelo completas de las 5 asignaturas oficiales con la vista dual de estudiante y apoderado para comprobar la metodología antes de decidir.',
    },
    {
      q: '¿Los contenidos corresponden al temario oficial MINEDUC 2026?',
      a: 'Sí. Cada lección, cápsula y ensayo está rigurosamente alineado con las Bases Curriculares vigentes y los Temarios Oficiales de Exámenes Libres del Ministerio de Educación para estudiantes de 3º a 8º Básico.',
    },
    {
      q: '¿Puedo cancelar el Plan Mensual en cualquier momento?',
      a: 'Por supuesto. No tenemos contratos forzados ni cláusulas de permanencia. Puedes pausar o cancelar tu suscripción con un solo clic desde tu panel de apoderado en cualquier momento.',
    },
    {
      q: '¿Por qué el Plan Anual es el más recomendado?',
      a: 'El Plan Anual acompaña a la familia durante todo el ciclo lectivo con un ahorro superior al 44% respecto al pago mensual. Además, incluye los cuadernillos de ejercitación física imprimibles y los simulacros de examen formal tipo MINEDUC.',
    },
    {
      q: '¿Qué respaldo legal tienen los exámenes libres en Chile?',
      a: 'El proceso de Validación de Estudios por Exámenes Libres está normado por el Decreto Exento Nº 2272 y el Decreto 67 del MINEDUC. EstudioSimple prepara a los estudiantes específicamente para rendir con éxito estas evaluaciones en los colegios examinadores asignados.',
    },
  ];

  return (
    <div
      className="min-h-screen font-body-md selection:bg-[#12A1A4]/30 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--canvas-bg)',
        color: 'var(--canvas-text)',
        fontFamily: '"Arial Rounded MT Bold", "Arial Rounded", sans-serif',
      }}
    >
      {/* 1. TOP NAVBAR INSTITUCIONAL OFICIAL COMPARTIDO */}
      <PublicHeader
        siteConfig={siteConfig}
        menuPages={menuPages}
        currentSlug="/planes"
        onNavigatePage={(slug) => {
          sessionStorage.setItem('estudio_simple_target_slug', slug);
          setViewMode('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigatePricing={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 2. HERO PRINCIPAL DE PLANES */}
      <main className="pt-32 md:pt-40 pb-24 px-4 md:px-12 max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12A1A4]/20 border border-[#12A1A4]/40 text-[#12A1A4] text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Inversión Transparente sin Costos Ocultos</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
            Planes Adaptados a Tu Familia
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Preparación integral para Exámenes Libres de 3° a 8° Básico con temario oficial MINEDUC, lecciones de 30 minutos y puente con cuaderno físico.
          </p>
        </div>

        {/* 3. GRILLA DE 3 TARJETAS DE PLANES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          
          {/* Tarjeta 1: Plan Mensual */}
          <div className="bg-[#16325C] rounded-3xl p-8 border border-white/10 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-xl shadow-lg">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#57d6f3] mb-2">Flexibilidad Total</div>
              <h2 className="text-2xl font-bold text-white mb-2">Plan Mensual</h2>
              <p className="text-sm text-gray-300 mb-6">Ideal para avanzar mes a mes a tu propio ritmo con tranquilidad.</p>
              
              <div className="text-4xl font-black text-white mb-1">
                $29.990 <span className="text-sm font-normal text-gray-300">/ mes</span>
              </div>
              <div className="text-xs text-gray-400 mb-6">Renovación mensual cancelable cuando quieras sin penalización</div>

              <ul className="space-y-3.5 text-sm text-gray-200 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#12A1A4] shrink-0" />
                  <span>Acceso a las 5 asignaturas oficiales</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#12A1A4] shrink-0" />
                  <span>Lecciones de 30 min y cuaderno guiado</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#12A1A4] shrink-0" />
                  <span>Panel de seguimiento del apoderado</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#12A1A4] shrink-0" />
                  <span>Diálogo socrático para guiar sin ser profesor</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#12A1A4] shrink-0" />
                  <span>Soporte pedagógico vía WhatsApp y correo</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => handleSelectPlan('monthly')}
              className="w-full mt-8 py-4 px-4 rounded-2xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02]"
            >
              <span>Seleccionar Plan Mensual</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tarjeta 2: Anual Exámenes Libres (Destacado) */}
          <div className="bg-[#10223D] rounded-3xl p-8 border-2 border-[#F8AD22] shadow-2xl relative flex flex-col justify-between transition-all duration-300 hover:scale-[1.03]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F8AD22] text-[#0A192F] font-black text-xs px-5 py-1 rounded-full uppercase tracking-wider shadow-md">
              Más Recomendado
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F8AD22] mb-2">Preparación Integral</div>
              <h2 className="text-2xl font-bold text-white mb-2">Anual Exámenes Libres</h2>
              <p className="text-sm text-gray-300 mb-6">Acompañamiento completo durante todo el año escolar oficial.</p>
              
              <div className="text-4xl font-black text-white mb-1">
                $199.900 <span className="text-sm font-normal text-gray-300">/ año</span>
              </div>
              <div className="text-xs text-[#F8AD22] font-semibold mb-6">Ahorras más del 44% en comparación al pago mensual</div>

              <ul className="space-y-3.5 text-sm text-gray-200 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2.5 font-semibold text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#F8AD22] shrink-0" />
                  <span>Todo lo incluido en el Plan Mensual</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F8AD22] shrink-0" />
                  <span>Simulacros de examen formal tipo MINEDUC</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F8AD22] shrink-0" />
                  <span>Cuadernillos imprimibles de ejercitación física</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F8AD22] shrink-0" />
                  <span>Garantía de actualización curricular 2026</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F8AD22] shrink-0" />
                  <span>Informes periódicos de avance para apoderados</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => handleSelectPlan('full')}
              className="w-full mt-8 py-4 px-4 rounded-2xl font-bold text-sm bg-[#EE751C] hover:bg-[#D66512] text-white shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span>Comenzar Plan Anual</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tarjeta 3: Prueba 7 Días */}
          <div className="bg-[#16325C] rounded-3xl p-8 border border-white/10 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-xl shadow-lg">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#12A1A4] mb-2">Sin Compromiso</div>
              <h2 className="text-2xl font-bold text-white mb-2">Prueba 7 Días</h2>
              <p className="text-sm text-gray-300 mb-6">Comprueba cómo tu hijo aprende con autonomía y tranquilidad.</p>
              
              <div className="text-4xl font-black text-white mb-1">
                $0 <span className="text-sm font-normal text-gray-300">/ 7 días</span>
              </div>
              <div className="text-xs text-gray-400 mb-6">Sin tarjeta de crédito ni cobros automáticos</div>

              <ul className="space-y-3.5 text-sm text-gray-200 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#12A1A4] shrink-0" />
                  <span>Acceso a 3 lecciones modelo completas</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#12A1A4] shrink-0" />
                  <span>Vista dual sincronizada (estudiante y apoderado)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#12A1A4] shrink-0" />
                  <span>Ejercicios prácticos en cuaderno físico</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#12A1A4] shrink-0" />
                  <span>Sin cobros posteriores sin tu autorización</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => handleSelectPlan('trial')}
              className="w-full mt-8 py-4 px-4 rounded-2xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02]"
            >
              <span>Probar Gratis 7 Días</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* 4. TABLA COMPARATIVA DE ASIGNATURAS Y COBERTURA */}
        <section className="mb-24 bg-[#16325C] rounded-3xl p-8 md:p-12 border border-white/10 shadow-xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
              Cobertura Curricular Oficial (3º a 8º Básico)
            </h2>
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
              Todos los planes incluyen las 5 asignaturas oficiales requeridas por el MINEDUC para certificar el año escolar.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-200">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-4 font-bold">Asignatura Oficial</th>
                  <th className="py-4 px-4 font-bold">Ejes Curriculares Clave</th>
                  <th className="py-4 px-4 font-bold text-center whitespace-nowrap">Nivel Cubierto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-2 whitespace-nowrap">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#18AFCB]"></span>
                    <span>Matemáticas</span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">Números y operaciones, álgebra, geometría, medición y probabilidades.</td>
                  <td className="py-4 px-4 text-center font-semibold text-[#57d6f3] whitespace-nowrap">3º a 8º Básico</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-2 whitespace-nowrap">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EE751C]"></span>
                    <span>Lengua y Literatura</span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">Comprensión lectora, redacción guiada, vocabulario contextual y ortografía.</td>
                  <td className="py-4 px-4 text-center font-semibold text-[#57d6f3] whitespace-nowrap">3º a 8º Básico</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-2 whitespace-nowrap">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4A964E]"></span>
                    <span>Ciencias Naturales</span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">Biología, cuerpo humano, ecología, física elemental y materia.</td>
                  <td className="py-4 px-4 text-center font-semibold text-[#57d6f3] whitespace-nowrap">3º a 8º Básico</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-2 whitespace-nowrap">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F8AD22]"></span>
                    <span>Historia y Ciencias Sociales</span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">Historia de Chile, geografía nacional, formación ciudadana e historia universal.</td>
                  <td className="py-4 px-4 text-center font-semibold text-[#57d6f3] whitespace-nowrap">3º a 8º Básico</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-2 whitespace-nowrap">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
                    <span>Inglés EFL</span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">Comprensión lectora y auditiva, vocabulario funcional y gramática aplicada.</td>
                  <td className="py-4 px-4 text-center font-semibold text-[#57d6f3] whitespace-nowrap">3º a 8º Básico</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. SELLO DE RESPALDO Y CONFIANZA */}
        <section className="mb-24 bg-[#10223D] border-2 border-[#12A1A4]/40 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#12A1A4]/20 border border-[#12A1A4]/40 text-[#12A1A4] flex items-center justify-center mx-auto shadow-inner">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Respaldo Legal y Curricular MINEDUC
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Nuestro programa cumple con los estándares establecidos en los Decretos Exentos Nº 2272 y Nº 67 del Ministerio de Educación de Chile para procesos de Validación de Estudios. Tu inversión cuenta con soporte continuo para que el apoderado se sienta acompañado en cada etapa del año.
            </p>
          </div>
        </section>

        {/* 6. PREGUNTAS FRECUENTES SOBRE PLANES */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Preguntas Frecuentes sobre Suscripciones</h2>
            <p className="text-gray-300 text-sm">Todo lo que necesitas saber antes de comenzar.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-[#16325C] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left p-6 font-bold text-white text-base md:text-lg flex justify-between items-center hover:bg-white/5 transition-all"
                >
                  <span>{faq.q}</span>
                  <span className={`material-symbols-outlined text-[#57d6f3] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-300 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 7. FOOTER INSTITUCIONAL DE 2 CAPAS: MARCO AMARILLO BENTO -> SUB-FOOTER AZUL INSTITUCIONAL */}
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
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
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

                {/* Enlaces con Iconos Profesionales */}
                <ul className="space-y-2.5 text-sm opacity-85 font-medium pt-1">
                  {siteConfig.footer?.emailContacto && (
                    <li>
                      <a href={`mailto:${siteConfig.footer.emailContacto}`} className="hover:opacity-100 hover:underline transition-all flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-base text-[#12A1A4]">alternate_email</span>
                        <span className="truncate">{siteConfig.footer.emailContacto}</span>
                      </a>
                    </li>
                  )}
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
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* CAPA 2: SUB-FOOTER DE COPYRIGHT EN AZUL INSTITUCIONAL (#123A72) */}
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
                Preparación integral para rendir y validar asignaturas escolares con respaldo curricular formal ante comisiones examinadoras.
              </p>
            </div>

            {/* Nivel Inferior: Barra Equilibrada y Simétrica de 3 Secciones */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs pt-2">
              {/* Sección Izquierda: Copyright */}
              <div className="text-blue-200/80 font-medium text-center md:text-left">
                (c) 2026 EstudioSimple Chile · Plataforma Pedagógica Familiar
              </div>

              {/* Sección Central: Enlaces Principales con Separador */}
              <div className="flex items-center gap-3 text-blue-100 font-medium">
                <button 
                  type="button" 
                  onClick={() => {
                    setViewMode('landing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Inicio
                </button>
                <span className="text-blue-300/40 select-none">·</span>
                <button 
                  type="button" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                  className="hover:text-white hover:underline transition-colors cursor-pointer font-bold text-amber-300"
                >
                  Planes y Precios
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
    </div>
  );
};
