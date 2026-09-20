import { CmsPage, CmsSection } from '../types/cms';

export const INITIAL_CMS_PAGES: CmsPage[] = [
  {
    id: 'page-inicio',
    titulo: 'Página de Inicio',
    slug: '/',
    activo: true,
    mostrarEnMenu: true,
    ordenMenu: 1,
    seoTitle: 'EstudioSimple · Homeschooling Oficial para Exámenes Libres MINEDUC',
    seoDescription: 'Plataforma educativa mobile-first para estudiantes de 3° a 8° básico en Chile. Guiones pedagógicos, articulación pantalla-cuaderno y ensayos tipo MINEDUC.',
    ultimaModificacion: '2026-09-18',
    secciones: [
      {
        id: 'sec-cinta',
        tipoBloque: 'CINTA_NOTICIAS',
        orden: 0,
        activo: true,
        titulo: 'Cinta Informativa de Exámenes Libres',
        subtitulo: 'Avisos oficiales y fechas ministeriales en tiempo real',
        configuracion: {
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
        }
      },
      {
        id: 'sec-hero',
        tipoBloque: 'HERO',
        orden: 1,
        activo: true,
        titulo: 'Aprende lo Esencial, Valídalo en tu Cuaderno.',
        subtitulo: 'La plataforma de homeschooling diseñada para estructurar el aprendizaje de 3° a 8° básico y aprobar los Exámenes Libres del MINEDUC sin sobrecarga cognitiva.',
        configuracion: {
          badgeText: 'Temarios Oficiales MINEDUC 2026',
          ctaText: 'Ver Planes y Precios',
          ctaSecondaryText: 'Explorar Cursos',
          highlightWord: 'Valídalo'
        }
      },
      {
        id: 'sec-metodo',
        tipoBloque: 'METODO',
        orden: 1,
        activo: true,
        titulo: 'El Método EstudioSimple en 8 Pasos',
        subtitulo: 'Una arquitectura pedagógica esencial que conecta la pantalla digital con el cuaderno físico del estudiante.',
        configuracion: {
          totalPasos: 8,
          destacado: 'Puente entre pantalla y papel'
        }
      },
      {
        id: 'sec-simulador',
        tipoBloque: 'SIMULADOR',
        orden: 2,
        activo: true,
        titulo: 'Simulador de Exámenes Libres MINEDUC',
        subtitulo: 'Instrumentos formales con 4 alternativas, estándares psicométricos y retroalimentación formativa inmediata.',
        configuracion: {
          alternativasPorPregunta: 4,
          umbralAprobacion: '60%'
        }
      },
      {
        id: 'sec-pricing',
        tipoBloque: 'PRICING',
        orden: 3,
        activo: true,
        titulo: 'Planes Familiares Transparentes',
        subtitulo: 'Acceso total a todos los cursos y temarios oficiales. Sin matrículas abusivas ni permanencia forzada.',
        configuracion: {
          planDestacado: 'Anual Homeschooler'
        }
      },
      {
        id: 'sec-testimonios',
        tipoBloque: 'TESTIMONIOS',
        orden: 4,
        activo: true,
        titulo: 'Lo que Dicen las Familias',
        subtitulo: 'Padres, madres y educadores en Santiago y regiones que transformaron su rutina de homeschool.',
        configuracion: {
          estrellas: 5,
          totalTestimonios: 4,
          diseno: 'grilla',
          colorEstrellas: '#F8AD22',
          testimonios: [
            {
              nombre: 'Claudia M.',
              rol: 'Mamá de Lucas (5º Básico · Santiago Centro)',
              cita: 'Cuando Lucas quedó sin cupo en el colegio por el SAE y venía afectado por la convivencia del aula, decidimos dar el paso al homeschooling con temor de no saber qué enseñar. EstudioSimple nos dio una rutina clara: cápsulas breves y ejercicios directos al cuaderno. Rindió sus exámenes libres en noviembre con promedio 6.5 sin lágrimas ni peleas familiares.',
              estrellas: 5,
              badge: 'Homeschooling 1er año · Caso SAE'
            },
            {
              nombre: 'Rodrigo T.',
              rol: 'Papá de Sofía (7º Básico · Ñuñoa)',
              cita: 'En el colegio tradicional, Sofía colapsaba con las pruebas de 40 preguntas y el ruido constante de la sala. Con EstudioSimple estudia a su propio ritmo: 15 minutos en pantalla, escribe en su cuaderno y después practica con ensayos tipo evaluación formal. Los ensayos formativos le quitaron la fobia a las pruebas del MINEDUC.',
              estrellas: 5,
              badge: 'Neurodiversidad · TDAH & Ritmo Propio'
            },
            {
              nombre: 'Marcela V.',
              rol: 'Mamá trabajadora de Tomás (3º Básico · Maipú)',
              cita: 'Trabajo todo el día y no soy profesora; no tenía tiempo de armar guías ni buscar temarios en internet hasta la noche. La plataforma me entrega el paso a paso exacto para guiar a Tomás en media hora diaria. Verlo escribir en su cuaderno con entusiasmo y saber que cumple al 100% con los temarios oficiales no tiene precio.',
              estrellas: 5,
              badge: 'Padres Trabajadores · Puente Pantalla-Cuaderno'
            },
            {
              nombre: 'Fernando S.',
              rol: 'Papá de Matías (6º Básico · La Florida)',
              cita: 'La prueba en el colegio examinador asignado era nuestro gran temor. Matías practicó con los ensayos de la plataforma durante dos meses y el día del examen reconoció de inmediato el formato formal de las preguntas. Aprobó todas las materias con notas sobresalientes y ya está matriculado para su próximo nivel escolar.',
              estrellas: 5,
              badge: 'Aprobado MINEDUC · Promoción Escolar 2025'
            }
          ]
        }
      },
      {
        id: 'sec-faq',
        tipoBloque: 'FAQ',
        orden: 5,
        activo: true,
        titulo: 'Preguntas Frecuentes',
        subtitulo: 'Respuestas directas sobre el respaldo legal, la metodología y el estudio en el hogar.',
        configuracion: {
          items: [
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
            }
          ]
        }
      },
      {
        id: 'sec-home-journal',
        tipoBloque: 'JOURNAL',
        orden: 6,
        activo: true,
        titulo: 'Journal Pedagógico · Últimas Novedades',
        subtitulo: 'Guías para padres, novedades de fechas MINEDUC y artículos del método de estudio.',
        configuracion: {
          categoriaFiltro: 'todas',
          limiteArticulos: 3,
          mostrarSoloDestacados: false,
          mostrarFiltros: false
        }
      },
      {
        id: 'sec-home-eventos',
        tipoBloque: 'EVENTOS',
        orden: 7,
        activo: true,
        titulo: 'Calendario Oficial y Fechas Clave MINEDUC',
        subtitulo: 'Convocatorias de inscripción, períodos de exámenes libres y talleres de acompañamiento pedagógico.',
        configuracion: {
          diseno: 'grilla',
          limite: 3,
          soloVigentes: false,
          tipoFiltro: 'todos'
        }
      }
    ]
  },
  {
    id: 'page-planes',
    titulo: 'Planes y Precios',
    slug: '/planes',
    activo: true,
    mostrarEnMenu: true,
    ordenMenu: 2,
    seoTitle: 'Planes y Suscripción Familiar · EstudioSimple',
    seoDescription: 'Conoce los planes y valores para la preparación de Exámenes Libres en Chile con EstudioSimple.',
    ultimaModificacion: '2026-09-18',
    secciones: [
      {
        id: 'sec-planes-hero',
        tipoBloque: 'HERO',
        orden: 0,
        activo: true,
        titulo: 'Inversión Clara en el Futuro Escolar de tu Hijo',
        subtitulo: 'Menos del costo de un tutor particular semanal, con todo el currículum evaluado por el MINEDUC cubierto lección a lección.',
        configuracion: {
          badgeText: 'Planes 2026',
          ctaText: 'Comenzar Ahora'
        }
      },
      {
        id: 'sec-planes-pricing',
        tipoBloque: 'PRICING',
        orden: 1,
        activo: true,
        titulo: 'Elige el Plan Ideal para tu Hogar',
        subtitulo: 'Todos los planes incluyen generador de guiones, cuaderno de ejercicios y acceso al aula interactiva.',
        configuracion: {}
      },
      {
        id: 'sec-planes-faq',
        tipoBloque: 'FAQ',
        orden: 2,
        activo: true,
        titulo: 'Dudas Frecuentes sobre la Suscripción',
        subtitulo: 'Claridad total antes de contratar tu plan familiar.',
        configuracion: {
          items: [
            {
              pregunta: '¿Puedo cancelar mi plan en cualquier momento?',
              respuesta: 'Sí, la suscripción mensual se puede pausar o cancelar en cualquier momento sin multas ni contratos forzados.'
            },
            {
              pregunta: '¿Incluye todas las asignaturas evaluadas por el MINEDUC?',
              respuesta: 'Sí, todos nuestros planes incluyen acceso integral a Matemática, Lenguaje, Ciencias Naturales, Historia y Ciencias Sociales, e Inglés.'
            },
            {
              pregunta: '¿Cómo funciona el acompañamiento para apoderados?',
              respuesta: 'Cada lección incluye guiones de mediación directa de 2 minutos para que cualquier apoderado pueda guiar a su hijo con éxito, sin requerir formación pedagógica previa.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'page-cursos',
    titulo: 'Catálogo de Clases',
    slug: '/cursos',
    activo: true,
    mostrarEnMenu: true,
    ordenMenu: 3,
    seoTitle: 'EstudioSimple · Catálogo Curricular y Clases 3° a 8° Básico',
    seoDescription: 'Explora los objetivos de aprendizaje MINEDUC y el aula interactiva de 30 minutos.',
    ultimaModificacion: '2026-09-18',
    secciones: []
  },
  {
    id: 'page-blog',
    titulo: 'Blog de Noticias',
    slug: '/blog',
    activo: true,
    mostrarEnMenu: true,
    ordenMenu: 4,
    seoTitle: 'Blog & Orientación Homeschooling · EstudioSimple',
    seoDescription: 'Guías oficiales sobre exámenes libres MINEDUC, neurodiversidad y el método de pantalla y papel.',
    ultimaModificacion: '2026-09-18',
    secciones: [
      {
        id: 'sec-blog-hero',
        tipoBloque: 'HERO',
        orden: 0,
        activo: true,
        titulo: 'Orientación y Novedades para Familias Homeschoolers',
        subtitulo: 'Artículos, guías oficiales de exámenes libres MINEDUC y estrategias didácticas para aprender sin sobrecarga.',
        configuracion: {
          badgeText: 'Journal Oficial 2026',
          ctaText: 'Explorar Artículos'
        }
      },
      {
        id: 'sec-blog-journal',
        tipoBloque: 'JOURNAL',
        orden: 1,
        activo: true,
        titulo: 'Artículos y Guías Pedagógicas',
        subtitulo: 'Contenido redactado por mentores y especialistas en validación de estudios.',
        configuracion: {
          categoriaFiltro: 'todas',
          limiteArticulos: 0,
          mostrarSoloDestacados: false,
          mostrarFiltros: true
        }
      }
    ]
  }
];

const STORAGE_KEY = 'estudiosimple_cms_pages_v1';

export function loadCmsPages(): CmsPage[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      let parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        let changed = false;

        // 1. Deduplicar páginas por id único y por slug único
        const seenIds = new Set<string>();
        const seenSlugs = new Set<string>();
        const deduplicated = parsed.filter((p: CmsPage) => {
          const cleanSlug = (p.slug || '').trim().toLowerCase();
          if (seenIds.has(p.id) || (cleanSlug && seenSlugs.has(cleanSlug))) return false;
          seenIds.add(p.id);
          if (cleanSlug) seenSlugs.add(cleanSlug);
          return true;
        });
        if (deduplicated.length !== parsed.length) {
          parsed = deduplicated;
          changed = true;
        }



        const home = parsed.find((p: CmsPage) => p.slug === '/');

        // 3. Garantizar que la página de inicio tenga el bloque JOURNAL
        if (home && !home.secciones.some((s: any) => s.tipoBloque === 'JOURNAL')) {
          const defaultJournal = INITIAL_CMS_PAGES[0].secciones.find((s) => s.tipoBloque === 'JOURNAL');
          if (defaultJournal) {
            home.secciones.push(defaultJournal);
            changed = true;
          }
        }

        // 3.1 Garantizar que la página de inicio tenga el bloque EVENTOS
        if (home && !home.secciones.some((s: any) => s.tipoBloque === 'EVENTOS')) {
          const defaultEventos = INITIAL_CMS_PAGES[0].secciones.find((s) => s.tipoBloque === 'EVENTOS');
          if (defaultEventos) {
            home.secciones.push(defaultEventos);
            changed = true;
          }
        }

        // 4. Garantizar que la página de Catálogo de Clases esté presente en el menú
        if (!parsed.some((p: CmsPage) => p.slug === '/cursos' || p.slug === '/clases')) {
          const cursosDefault = INITIAL_CMS_PAGES.find((p) => p.slug === '/cursos');
          if (cursosDefault) {
            parsed.splice(1, 0, cursosDefault);
            changed = true;
          }
        }

        // 4. Si el usuario creó o renombró su página a "Blog de Noticias" (o similar con "noticias"),
        // purgar automáticamente la página duplicada "Blog Pedagógico" que fue re-insertada
        const noticiasPage = parsed.find(
          (p: CmsPage) =>
            p.titulo.trim().toLowerCase() === 'blog de noticias' ||
            p.titulo.trim().toLowerCase().includes('noticias')
        );

        if (noticiasPage) {
          const countBefore = parsed.length;
          parsed = parsed.filter(
            (p: CmsPage) => p.id === noticiasPage.id || p.titulo !== 'Blog Pedagógico'
          );
          if (parsed.length !== countBefore) {
            changed = true;
          }
        }

        // Renombrar cualquier página con slug /blog que se llame Blog Pedagógico a Blog de Noticias
        const blogPage = parsed.find((p: CmsPage) => p.slug === '/blog' || p.id === 'page-blog');
        if (blogPage && blogPage.titulo === 'Blog Pedagógico') {
          blogPage.titulo = 'Blog de Noticias';
          changed = true;
        }

        // 5. Auto-reparar sec-faq en inicio si no tiene items para que sean inmediatamente editables en el CMS
        const homeFaq = home?.secciones.find((s: any) => s.id === 'sec-faq' || s.tipoBloque === 'FAQ');
        if (homeFaq && (!homeFaq.configuracion?.items || homeFaq.configuracion.items.length === 0)) {
          const defaultFaq = INITIAL_CMS_PAGES[0].secciones.find((s) => s.id === 'sec-faq');
          if (defaultFaq?.configuracion?.items) {
            homeFaq.configuracion = {
              ...(homeFaq.configuracion || {}),
              items: defaultFaq.configuracion.items
            };
            changed = true;
          }
        }

        // 6. Auto-reparar sec-testimonios en inicio si no tiene testimonios para que sean inmediatamente editables
        const homeTestimonios = home?.secciones.find((s: any) => s.id === 'sec-testimonios' || s.tipoBloque === 'TESTIMONIOS');
        if (homeTestimonios && (!homeTestimonios.configuracion?.testimonios || homeTestimonios.configuracion.testimonios.length === 0)) {
          const defaultTest = INITIAL_CMS_PAGES[0].secciones.find((s) => s.id === 'sec-testimonios');
          if (defaultTest?.configuracion?.testimonios) {
            homeTestimonios.configuracion = {
              ...(homeTestimonios.configuracion || {}),
              testimonios: defaultTest.configuracion.testimonios
            };
            changed = true;
          }
        }

        // Asegurar que todas las páginas tengan asignado ordenMenu y vengan ordenadas
        parsed.forEach((p: CmsPage, i: number) => {
          if (p.ordenMenu === undefined || p.ordenMenu === null) {
            p.ordenMenu = i + 1;
            changed = true;
          }
        });

        parsed.sort((a: CmsPage, b: CmsPage) => (a.ordenMenu || 0) - (b.ordenMenu || 0));

        if (changed) {
          saveCmsPages(parsed);
        }

        return parsed;
      }
    }
  } catch (e) {
    console.error('Error al cargar páginas CMS desde localStorage:', e);
  }
  return INITIAL_CMS_PAGES;
}

export function saveCmsPages(pages: CmsPage[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  } catch (e) {
    console.error('Error al guardar páginas CMS en localStorage:', e);
  }
}

export function getCmsPage(slug: string): CmsPage | undefined {
  const pages = loadCmsPages();
  return pages.find((p) => p.slug === slug);
}

export function updateCmsPage(updatedPage: CmsPage): CmsPage[] {
  const pages = loadCmsPages();
  const index = pages.findIndex((p) => p.id === updatedPage.id);
  let newPages: CmsPage[];
  const pageWithDate: CmsPage = {
    ...updatedPage,
    ultimaModificacion: new Date().toISOString().split('T')[0]
  };

  if (index >= 0) {
    newPages = [...pages];
    newPages[index] = pageWithDate;
  } else {
    newPages = [...pages, pageWithDate];
  }

  // Ordenar por ordenMenu
  newPages.sort((a, b) => (a.ordenMenu || 0) - (b.ordenMenu || 0));
  saveCmsPages(newPages);
  return newPages;
}

export function createCmsPage(titulo: string, slug: string, mostrarEnMenu: boolean): CmsPage[] {
  const pages = loadCmsPages();
  const cleanSlug = slug.startsWith('/') ? slug : `/${slug}`;
  const newPage: CmsPage = {
    id: `page-${Date.now()}`,
    titulo: titulo.trim(),
    slug: cleanSlug.trim(),
    activo: true,
    mostrarEnMenu,
    ordenMenu: pages.length + 1,
    seoTitle: `${titulo.trim()} · EstudioSimple`,
    seoDescription: `Página oficial de ${titulo.trim()} en EstudioSimple.`,
    ultimaModificacion: new Date().toISOString().split('T')[0],
    secciones: [
      {
        id: `sec-${Date.now()}-hero`,
        tipoBloque: 'HERO',
        orden: 0,
        activo: true,
        titulo: titulo.trim(),
        subtitulo: 'Subtítulo introductorio editable desde el panel CMS.',
        configuracion: {
          badgeText: 'Nueva Página',
          ctaText: 'Explorar'
        }
      },
      {
        id: `sec-${Date.now()}-content`,
        tipoBloque: 'RICHTEXT',
        orden: 1,
        activo: true,
        titulo: 'Contenido Principal',
        subtitulo: 'Detalle de la sección de texto.',
        configuracion: {
          cuerpoTexto: 'Escribe aquí la información relevante para esta nueva página.'
        }
      }
    ]
  };

  const updated = [...pages, newPage];
  saveCmsPages(updated);
  return updated;
}

export function deleteCmsPage(id: string): CmsPage[] {
  const pages = loadCmsPages();
  // Proteger la página de inicio para que no se elimine
  const filtered = pages.filter((p) => p.id !== id || p.slug === '/');
  saveCmsPages(filtered);
  return filtered;
}

export function reorderCmsPages(orderedPages: CmsPage[]): CmsPage[] {
  const updated = orderedPages.map((page, index) => ({
    ...page,
    ordenMenu: index + 1,
    ultimaModificacion: new Date().toISOString().split('T')[0]
  }));
  saveCmsPages(updated);
  return updated;
}

