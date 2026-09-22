import {
  SiteConfig,
  JournalArticle,
  DescargaResource,
  PopupBanner,
  CalendarioEvento,
  MensajeContacto,
  GaleriaItem
} from '../types/cmsExtras';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  header: {
    logoUrl: '/logos/Logo_cabecera.png',
    planesButtonText: 'Planes y Precios',
    loginButtonText: 'Iniciar Sesión',
    showWhatsAppQuick: true,
    activeLinkColor: '#12A1A4',
    activeLinkStyle: 'underline',
    menuFontSize: 'sm'
  },
  cintaNoticias: {
    activo: true,
    etiquetaPrincipal: 'MINEDUC AL DÍA',
    velocidad: 'normal',
    colorFondo: '#0B254D',
    colorTexto: '#FFFFFF',
    colorEtiqueta: '#12A1A4',
    mostrarIconoLive: true,
    noticias: [
      { etiqueta: 'URGENTE', texto: 'Inscripciones abiertas para la primera oportunidad de Exámenes Libres 2026 ante colegios sede.' },
      { etiqueta: 'DECRETOS', texto: 'Validez legal certificada bajo Decreto Exento N° 2272 y Decreto 67 del Ministerio de Educación.' },
      { etiqueta: 'TEMARIOS', texto: 'Nuevos temarios consolidados disponibles para descarga gratuita de 3° a 8° Básico.' },
      { etiqueta: 'MÉTODO', texto: 'Estudio guiado de 30 minutos diarios combinando pantalla interactiva y cuaderno análogo.' }
    ]
  },
  footer: {
    logoUrl: '/logos/Logo con todo.png',
    missionText: 'Plataforma pedagógica especializada en la preparación integral de exámenes libres MINEDUC para estudiantes de 3º a 8º Básico. Método paso a paso para aprender en familia.',
    decretoText: 'Proceso de Validación de Estudios normado formalmente por el Decreto Exento N° 2272 y Decreto 67 del Ministerio de Educación de Chile.',
    whatsAppNumber: '+56 9 8765 4321',
    whatsAppLabel: 'WhatsApp Apoderados',
    emailContacto: 'contacto@estudiosimple.cl',
    instagramUrl: 'https://instagram.com/estudiosimple.cl',
    youtubeUrl: 'https://youtube.com/@estudiosimple',
    facebookUrl: 'https://facebook.com/estudiosimple',
    redesSociales: [
      {
        id: 'red-instagram',
        red: 'instagram',
        etiqueta: 'Instagram Oficial',
        url: 'https://instagram.com/estudiosimple.cl',
        activo: true
      },
      {
        id: 'red-youtube',
        red: 'youtube',
        etiqueta: 'Canal Educativo YouTube',
        url: 'https://youtube.com/@estudiosimple',
        activo: true
      },
      {
        id: 'red-facebook',
        red: 'facebook',
        etiqueta: 'Página Facebook',
        url: 'https://facebook.com/estudiosimple',
        activo: false
      },
      {
        id: 'red-whatsapp',
        red: 'whatsapp',
        etiqueta: 'Comunidad de WhatsApp',
        url: '',
        activo: false
      }
    ],
    copyrightText: '© 2026 EstudioSimple EdTech SpA. Todos los derechos reservados.',
    footerBgColor: '#123A72',
    footerTextColor: '#BFDBFE',
    footerHeadingsColor: '#123A72',
    bentoCardBgColor: '#FFFFFF',
    bentoCardTextColor: '#334155'
  },
  contacto: {
    horarioAtencion: 'Lunes a Viernes: 09:00 a 18:00 hrs',
    telefonoFijo: '+56 2 2987 6543',
    ciudad: 'Santiago, Chile'
  },
  cloudinary: {
    cloudName: 'cpn5zq3g',
    apiKey: '979383715734283',
    uploadPreset: 'estudiosimple',
    folder: 'estudiosimple',
    enabled: true
  },
  estilosGlobales: {
    colorBordeEtiquetas: '#12A1A4',
    colorBordeComentarios: '#F8AD22',
    modoBordeComentarios: 'completo',
    grosorBordeComentarios: '2px',
    colorBordeFaq: '#EE751C',
    modoBordeFaq: 'completo',
    grosorBordeFaq: '1.5px',
    colorAcentoFaq: '#57d6f3',
    colorEstrellas: '#F8AD22'
  }
};

export const INITIAL_JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    titulo: 'Guía Completa para Inscribir Exámenes Libres en el MINEDUC 2026',
    slug: 'guia-inscripcion-examenes-libres-mineduc-2026',
    extracto: 'Revisa los plazos oficiales, documentos requeridos y pasos para inscribir a tu hijo ante las oficinas de Ayuda Mineduc sin filas ni rechazos.',
    contenido: 'La validación de estudios para menores de edad en Chile es un derecho respaldado por la normativa ministerial vigente. Para formalizar la inscripción en colegios sede, el apoderado debe presentar certificado de nacimiento, último certificado de estudios aprobado y completar la solicitud en el portal oficial...',
    categoria: 'MINEDUC',
    autor: 'Equipo Pedagógico EstudioSimple',
    fecha: '2026-09-10',
    imagenPortadaUrl: '/images/journal-mineduc.webp',
    activo: true,
    destacado: true
  },
  {
    id: 'art-2',
    titulo: 'El Método Pantalla y Papel: Por Qué el Cuaderno Físico Previene la Fatiga Escolar',
    slug: 'metodo-pantalla-y-papel-beneficios-neuroaprendizaje',
    extracto: 'Cómo estructurar sesiones de 30 minutos combinando cápsulas digitales interactivas con escritura a mano para potenciar la retención cognitiva.',
    contenido: 'La sobrecarga de pantallas es uno de los mayores desafíos del homeschool moderno. Nuestro enfoque didáctico divide la sesión en una cápsula ágil de 15 minutos en pantalla seguida inmediatamente por la réplica del ejercicio en el cuaderno físico del alumno...',
    categoria: 'Cuaderno y Método',
    autor: 'Dirección Académica',
    fecha: '2026-09-12',
    imagenPortadaUrl: '/images/journal-cuaderno.webp',
    activo: true,
    destacado: false
  },
  {
    id: 'art-3',
    titulo: 'Neurodivergencia y Homeschooling: Reduciendo la Ansiedad ante las Evaluaciones',
    slug: 'neurodivergencia-homeschooling-ansiedad-evaluaciones',
    extracto: 'Estrategias concretas para estudiantes con TDAH y TEA que abandonaron el aula tradicional por saturación sensorial.',
    contenido: 'Muchos estudiantes llegan al homeschooling tras experimentar trauma escolar y fobia a las pruebas formales. Al trabajar con ensayos formativos breves de 3 a 4 preguntas y sin presión de tiempo, el estudiante recupera la confianza...',
    categoria: 'Neurodiversidad',
    autor: 'Psicología y Aprendizaje',
    fecha: '2026-09-15',
    imagenPortadaUrl: '/images/journal-neuro.webp',
    activo: true,
    destacado: false
  }
];

export const INITIAL_DESCARGAS: DescargaResource[] = [
  {
    id: 'desc-1',
    titulo: 'Plantilla Imprimible para Cuaderno de Matemáticas (3° a 8° Básico)',
    descripcion: 'Formato guiado con recuadros de paso a paso, recta numérica punteada y tablas para resolución de problemas.',
    categoria: 'Plantillas de Cuaderno',
    archivoUrl: '/recursos/Plantilla_Cuaderno_Matematica_EstudioSimple.pdf',
    formato: 'PDF',
    tamanoMb: 1.4,
    descargasCount: 428,
    activo: true
  },
  {
    id: 'desc-2',
    titulo: 'Temarios Oficiales de Exámenes Libres MINEDUC (7° y 8° Básico)',
    descripcion: 'Compilado consolidado con los 79 OAs evaluables en las 5 asignaturas troncales con decretos vigentes.',
    categoria: 'Temarios Oficiales PDF',
    archivoUrl: '/recursos/Temarios_Oficiales_EELL_7B_8B_MINEDUC.pdf',
    formato: 'PDF',
    tamanoMb: 3.2,
    descargasCount: 912,
    activo: true
  },
  {
    id: 'desc-3',
    titulo: 'Decreto Exento N° 2272 y Decreto 67 de Evaluación Escolar',
    descripcion: 'Texto legal íntegro para respaldo formal de la validez del año académico ante comisiones examinadoras.',
    categoria: 'Normativa y Decretos',
    archivoUrl: '/recursos/Decretos_2272_y_67_MINEDUC_Chile.pdf',
    formato: 'PDF',
    tamanoMb: 0.8,
    descargasCount: 265,
    activo: true
  }
];

export const INITIAL_POPUPS: PopupBanner[] = [
  {
    id: 'pop-1',
    titulo: 'Inscripción Exámenes Libres MINEDUC 2026',
    mensaje: 'Recuerda que el plazo para formalizar la inscripción en colegios sede para la 1ª oportunidad de evaluación vence pronto.',
    ctaText: 'Ver Calendario Oficial',
    ctaUrl: '#eventos',
    fechaInicio: '2026-03-01',
    fechaFin: '2026-11-30',
    activo: false,
    tipoAlerta: 'informativo',
    posicion: 'centro-modal',
    estiloImagen: 'encabezado',
    tamanoTitulo: 'md',
    colorFondo: '#FFFFFF',
    colorTexto: '#0F172A',
    colorBoton: '#12A1A4',
    frecuencia: 'una_vez',
    prioridad: 5
  }
];

export const INITIAL_EVENTOS: CalendarioEvento[] = [
  {
    id: 'evt-1',
    titulo: 'Apertura de Inscripciones Exámenes Libres (Colegios Sede MINEDUC)',
    fecha: '2026-03-15',
    tipo: 'Inscripción MINEDUC',
    modalidad: 'Presencial',
    lugarOEnlace: 'Oficinas Provinciales de Educación (Ayuda Mineduc)',
    descripcion: 'Inicio formal de recepción de antecedentes para convalidación de estudios de 3° a 8° básico.',
    activo: true
  },
  {
    id: 'evt-2',
    titulo: 'Primera Oportunidad de Rendición de Exámenes Libres',
    fecha: '2026-06-20',
    tipo: 'Examen 1ª Oportunidad',
    modalidad: 'Presencial',
    lugarOEnlace: 'Colegio Examinador Asignado en tu Comuna',
    descripcion: 'Evaluación presencial escrita de las 5 asignaturas oficiales ante comisión docente.',
    activo: true
  },
  {
    id: 'evt-3',
    titulo: 'Taller Online: Cómo Mediar la Sesión de Estudio en el Hogar',
    fecha: '2026-04-10',
    tipo: 'Taller para Padres',
    modalidad: 'Online',
    lugarOEnlace: 'Sala Virtual de Zoom para Mentores',
    descripcion: 'Estrategias prácticas para padres trabajadores: acompañamiento de 30 minutos sin conflictos.',
    activo: true
  }
];

export const INITIAL_MENSAJES: MensajeContacto[] = [
  {
    id: 'msg-1',
    nombre: 'Carolina Rojas',
    email: 'crojas@ejemplo.cl',
    telefono: '+56 9 9123 4567',
    cursoInteres: '7° Básico',
    mensaje: 'Hola, mi hijo cursa 7° básico y nos cambiamos a exámenes libres este mes. ¿La plataforma cubre el temario completo de matemáticas y ciencias para el examen de octubre?',
    fecha: '2026-09-17 18:40',
    leido: false,
    respondido: false
  },
  {
    id: 'msg-2',
    nombre: 'Gonzalo Morales',
    email: 'gmorales@ejemplo.cl',
    telefono: '+56 9 7654 3210',
    cursoInteres: '5° Básico',
    mensaje: 'Buenas tardes. Me gustaría saber si las plantillas del cuaderno se pueden descargar para imprimir en casa o si envían material físico por encomienda.',
    fecha: '2026-09-18 10:15',
    leido: true,
    respondido: true
  }
];

export const INITIAL_GALERIA: GaleriaItem[] = [
  {
    id: 'gal-1',
    titulo: 'Cuaderno de Alumno: Recta Numérica en Z (7° Básico)',
    descripcion: 'Registro real de la Clase 1 de Matemática con el punto de referencia y ascensor.',
    categoria: 'Cuadernos de Estudiantes',
    imagenUrl: '/images/cuaderno_muestra_1.webp',
    fecha: '2026-09-14',
    activo: true
  },
  {
    id: 'gal-2',
    titulo: 'Infografía Visual: La Célula y sus Organelos (Ciencias 7° Básico)',
    descripcion: 'Esquema visual a color para síntesis del cuaderno escolar.',
    categoria: 'Infografías del Método',
    imagenUrl: '/images/infografia_celula.webp',
    fecha: '2026-09-15',
    activo: true
  }
];

// Helper functions con persistencia en localStorage
export function loadSiteConfig(): SiteConfig {
  try {
    const saved = localStorage.getItem('estudiosimple_site_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...INITIAL_SITE_CONFIG,
        ...parsed,
        header: {
          ...INITIAL_SITE_CONFIG.header,
          ...(parsed.header || {}),
          activeLinkColor: parsed.header?.activeLinkColor || INITIAL_SITE_CONFIG.header.activeLinkColor,
          activeLinkStyle: parsed.header?.activeLinkStyle || INITIAL_SITE_CONFIG.header.activeLinkStyle,
          menuFontSize: parsed.header?.menuFontSize || INITIAL_SITE_CONFIG.header.menuFontSize
        },
        cintaNoticias: {
          ...INITIAL_SITE_CONFIG.cintaNoticias,
          ...(parsed.cintaNoticias || {})
        },
        footer: {
          ...INITIAL_SITE_CONFIG.footer,
          ...(parsed.footer || {}),
          redesSociales:
            parsed.footer?.redesSociales && parsed.footer.redesSociales.length > 0
              ? parsed.footer.redesSociales
              : INITIAL_SITE_CONFIG.footer.redesSociales,
          footerHeadingsColor: parsed.footer?.footerHeadingsColor || INITIAL_SITE_CONFIG.footer.footerHeadingsColor,
          bentoCardBgColor: parsed.footer?.bentoCardBgColor || INITIAL_SITE_CONFIG.footer.bentoCardBgColor,
          bentoCardTextColor: parsed.footer?.bentoCardTextColor || INITIAL_SITE_CONFIG.footer.bentoCardTextColor
        },
        contacto: { ...INITIAL_SITE_CONFIG.contacto, ...(parsed.contacto || {}) },
        cloudinary: {
          ...INITIAL_SITE_CONFIG.cloudinary,
          ...(parsed.cloudinary || {}),
          cloudName: parsed.cloudinary?.cloudName?.trim() || 'cpn5zq3g',
          uploadPreset: parsed.cloudinary?.uploadPreset?.trim() || 'estudiosimple',
          apiKey: parsed.cloudinary?.apiKey?.trim() || '979383715734283',
          folder: parsed.cloudinary?.folder?.trim() || 'estudiosimple',
          enabled: parsed.cloudinary?.uploadPreset?.trim() ? Boolean(parsed.cloudinary.enabled) : true
        },
        estilosGlobales: {
          ...INITIAL_SITE_CONFIG.estilosGlobales,
          ...(parsed.estilosGlobales || {})
        }
      };
    }
  } catch (e) {
    console.error('Error al cargar SiteConfig:', e);
  }
  return INITIAL_SITE_CONFIG;
}

export function getCloudinaryConfig() {
  const cfg = loadSiteConfig();
  return cfg.cloudinary || INITIAL_SITE_CONFIG.cloudinary!;
}

export function saveSiteConfig(config: SiteConfig): void {
  try {
    localStorage.setItem('estudiosimple_site_config', JSON.stringify(config));
  } catch (e) {
    console.error('Error al guardar SiteConfig:', e);
  }
}

export function loadJournalArticles(): JournalArticle[] {
  try {
    const saved = localStorage.getItem('estudiosimple_journal_articles');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error al cargar Journal:', e);
  }
  return INITIAL_JOURNAL_ARTICLES;
}

export function saveJournalArticles(items: JournalArticle[]): void {
  try {
    localStorage.setItem('estudiosimple_journal_articles', JSON.stringify(items));
  } catch (e) {
    console.error('Error al guardar Journal:', e);
  }
}

export function loadDescargas(): DescargaResource[] {
  try {
    const saved = localStorage.getItem('estudiosimple_descargas');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error al cargar Descargas:', e);
  }
  return INITIAL_DESCARGAS;
}

export function saveDescargas(items: DescargaResource[]): void {
  try {
    localStorage.setItem('estudiosimple_descargas', JSON.stringify(items));
  } catch (e) {
    console.error('Error al guardar Descargas:', e);
  }
}

export function loadPopups(): PopupBanner[] {
  try {
    const saved = localStorage.getItem('estudiosimple_popups');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.map((p: any) => ({
          posicion: 'centro-modal',
          estiloImagen: 'encabezado',
          tamanoTitulo: 'md',
          colorFondo: '#FFFFFF',
          colorTexto: '#0F172A',
          colorBoton: '#12A1A4',
          frecuencia: 'una_vez',
          prioridad: 5,
          ...p
        }));
      }
    }
  } catch (e) {
    console.error('Error al cargar Popups:', e);
  }
  return INITIAL_POPUPS;
}

export function savePopups(items: PopupBanner[]): void {
  try {
    localStorage.setItem('estudiosimple_popups', JSON.stringify(items));
  } catch (e) {
    console.error('Error al guardar Popups:', e);
  }
}

export function loadEventos(): CalendarioEvento[] {
  try {
    const saved = localStorage.getItem('estudiosimple_eventos');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error al cargar Eventos:', e);
  }
  return INITIAL_EVENTOS;
}

export function saveEventos(items: CalendarioEvento[]): void {
  try {
    localStorage.setItem('estudiosimple_eventos', JSON.stringify(items));
  } catch (e) {
    console.error('Error al guardar Eventos:', e);
  }
}

export function loadMensajes(): MensajeContacto[] {
  try {
    const saved = localStorage.getItem('estudiosimple_mensajes');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error al cargar Mensajes:', e);
  }
  return INITIAL_MENSAJES;
}

export function saveMensajes(items: MensajeContacto[]): void {
  try {
    localStorage.setItem('estudiosimple_mensajes', JSON.stringify(items));
  } catch (e) {
    console.error('Error al guardar Mensajes:', e);
  }
}

export function addMensajeContacto(msg: Omit<MensajeContacto, 'id' | 'fecha' | 'leido' | 'respondido'>): MensajeContacto[] {
  const current = loadMensajes();
  const newMsg: MensajeContacto = {
    ...msg,
    id: `msg-${Date.now()}`,
    fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
    leido: false,
    respondido: false
  };
  const updated = [newMsg, ...current];
  saveMensajes(updated);
  return updated;
}

export function loadGaleria(): GaleriaItem[] {
  try {
    const saved = localStorage.getItem('estudiosimple_galeria');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error al cargar Galería:', e);
  }
  return INITIAL_GALERIA;
}

export function saveGaleria(items: GaleriaItem[]): void {
  try {
    localStorage.setItem('estudiosimple_galeria', JSON.stringify(items));
  } catch (e) {
    console.error('Error al guardar Galería:', e);
  }
}
