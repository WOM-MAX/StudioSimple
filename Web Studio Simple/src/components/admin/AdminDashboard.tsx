import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GradeLevel, BrandColorOption } from '../../types';
import { CmsPage } from '../../types/cms';
import {
  loadCmsPages,
  saveCmsPages,
  updateCmsPage,
  createCmsPage,
  deleteCmsPage
} from '../../data/initialCmsData';
import { MetricCard } from './cms/MetricCard';
import { PaginasTable } from './cms/PaginasTable';
import { PageEditor } from './cms/PageEditor';
import { ConfiguracionGeneralView } from './cms/ConfiguracionGeneralView';
import { JournalView } from './cms/JournalView';
import { DescargasView } from './cms/DescargasView';
import { PopupsView } from './cms/PopupsView';
import { EventosView } from './cms/EventosView';
import { MensajesView } from './cms/MensajesView';
import { GaleriaView } from './cms/GaleriaView';
import {
  LayoutDashboard,
  Files,
  BookOpen,
  Code,
  Users,
  Palette,
  Globe,
  LogOut,
  Menu,
  X,
  KeyRound,
  Shield,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Sparkles,
  Download,
  Copy,
  Check,
  GraduationCap,
  Layers,
  ArrowRight,
  FileText,
  Newspaper,
  FileDown,
  Bell,
  CalendarDays,
  Mail,
  Image as ImageIcon,
  Sliders,
  BarChart3,
  LayoutGrid,
  Search,
  Filter,
  RotateCcw,
  Eye,
  BookOpenCheck,
  Clock
} from 'lucide-react';
import {
  OACatalogItem,
  GeneratedOAPackage,
  generateOAPackage
} from '../../lib/lesson-generator';
import { exportOAPackageToDocx } from '../../lib/docx-export';

const TEXTBOOK_MAPPINGS: Record<string, { libro: string; unidad: string; leccion: string; paginas: string }> = {
  // 1. MATEMÁTICA
  '110-7-MAT-OA01': { libro: 'Matemática 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 1: "Números"', leccion: 'Lección 1: "Números enteros"', paginas: 'Páginas 6 a 25' },
  '110-7-MAT-OA03': { libro: 'Matemática 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 1: "Números"', leccion: 'Lección 2: "Fracciones y decimales"', paginas: 'Páginas 26 a 41' },
  '110-7-MAT-OA04': { libro: 'Matemática 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 1: "Números"', leccion: 'Lección 3: "Porcentajes"', paginas: 'Páginas 42 a 51' },
  '110-7-MAT-OA06': { libro: 'Matemática 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 2: "Álgebra y funciones"', leccion: 'Lección 4: "Lenguaje algebraico y ecuaciones"', paginas: 'Páginas 52 a 61' },
  '110-7-MAT-OA08': { libro: 'Matemática 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 2: "Álgebra y funciones"', leccion: 'Lección 5: "Proporcionalidad"', paginas: 'Páginas 62 a 75' },
  '110-7-MAT-OA11': { libro: 'Matemática 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 3: "Geometría"', leccion: 'Lección 6: "El círculo"', paginas: 'Páginas 76 a 84' },
  '110-7-MAT-OA14': { libro: 'Matemática 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 3: "Geometría"', leccion: 'Lección 7 y 8: "Plano cartesiano y vectores"', paginas: 'Páginas 85 a 115' },
  '110-7-MAT-OA16': { libro: 'Matemática 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 4: "Probabilidad y estadística"', leccion: 'Lección 9: "Estadística descriptiva"', paginas: 'Páginas 116 a 129' },
  '110-7-MAT-OA18': { libro: 'Matemática 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 4: "Probabilidad y estadística"', leccion: 'Lección 10: "Probabilidades y regla de Laplace"', paginas: 'Páginas 130 a 140' },

  // 2. LENGUA Y LITERATURA
  '110-7-LEN-OA03': { libro: 'Lengua y Literatura 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 1: "Héroes y heroínas"', leccion: 'Lección 1: "El viaje del héroe en la narrativa"', paginas: 'Páginas 14 a 45' },
  '110-7-LEN-OA04': { libro: 'Lengua y Literatura 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 2: "Voces de la poesía"', leccion: 'Lección 1 y 2: "Lenguaje poético y sentimientos"', paginas: 'Páginas 46 a 87' },
  '110-7-LEN-OA09': { libro: 'Lengua y Literatura 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 3: "Somos naturaleza y sociedad"', leccion: 'Lección 1: "Noticias, reportajes y medios"', paginas: 'Páginas 92 a 125' },
  '110-7-LEN-OA15': { libro: 'Lengua y Literatura 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 4: "¿Qué nos cuenta el mundo?"', leccion: 'Lección 2: "Producción escrita y revisión"', paginas: 'Páginas 138 a 170' },

  // 3. CIENCIAS NATURALES
  '110-7-CIE-OA01': { libro: 'Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 1: "Sexualidad y autocuidado"', leccion: 'Lección 1: "Dimensiones biológicas, afectivas y sociales"', paginas: 'Páginas 6 a 23' },
  '110-7-CIE-OA02': { libro: 'Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 1: "Sexualidad y autocuidado"', leccion: 'Lección 2: "Formación de un nuevo individuo"', paginas: 'Páginas 24 a 37' },
  '110-7-CIE-OA05': { libro: 'Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 2: "Microorganismos y barreras del cuerpo"', leccion: 'Lección 3: "Virus, bacterias y hongos"', paginas: 'Páginas 38 a 51' },
  '110-7-CIE-OA07': { libro: 'Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 2: "Fuerza y movimiento"', leccion: 'Lección 5: "Fuerzas y presión en fluidos"', paginas: 'Páginas 64 a 81' },
  '110-7-CIE-OA09': { libro: 'Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 3: "Dinámica de la Tierra"', leccion: 'Lección 6 y 7: "Placas tectónicas y relieve"', paginas: 'Páginas 82 a 111' },
  '110-7-CIE-OA13': { libro: 'Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 4: "Materia y sus transformaciones"', leccion: 'Lección 8: "Leyes de los gases ideales"', paginas: 'Páginas 112 a 137' },
  '110-7-CIE-OA14': { libro: 'Ciencias Naturales 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 4: "Materia y sus transformaciones"', leccion: 'Lección 9: "Sustancias puras, mezclas y separación"', paginas: 'Páginas 138 a 153' },

  // 4. HISTORIA, GEOGRAFÍA Y CIENCIAS SOCIALES
  '110-7-HIS-OA02': { libro: 'Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 1: "Primeras sociedades agrícolas y civilizaciones"', leccion: 'Lección 1: "El surgimiento de la agricultura"', paginas: 'Páginas 8 a 27' },
  '110-7-HIS-OA03': { libro: 'Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 1: "Primeras sociedades agrícolas y civilizaciones"', leccion: 'Lección 2: "Las primeras civilizaciones"', paginas: 'Páginas 28 a 45' },
  '110-7-HIS-OA06': { libro: 'Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 2: "La Antigüedad clásica"', leccion: 'Lección 1: "Grecia y la democracia ateniense"', paginas: 'Páginas 46 a 67' },
  '110-7-HIS-OA07': { libro: 'Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 2: "La Antigüedad clásica"', leccion: 'Lección 2: "Roma y el legado republicano"', paginas: 'Páginas 68 a 87' },
  '110-7-HIS-OA09': { libro: 'Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 3: "La Edad Media"', leccion: 'Lección 1: "La conformación de Europa"', paginas: 'Páginas 90 a 109' },
  '110-7-HIS-OA12': { libro: 'Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 3: "La Edad Media"', leccion: 'Lección 2: "Transformaciones en los últimos siglos medievales"', paginas: 'Páginas 110 a 127' },
  '110-7-HIS-OA13': { libro: 'Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 4: "Civilizaciones de América"', leccion: 'Lección 1: "Mayas y Aztecas en Mesoamérica"', paginas: 'Páginas 128 a 145' },
  '110-7-HIS-OA16': { libro: 'Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 4: "Civilizaciones de América"', leccion: 'Lección 2: "Mestizaje y herencia cultural viva"', paginas: 'Páginas 146 a 155' },
  '110-7-HIS-OA18': { libro: 'Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 5: "Formación ciudadana y derechos"', leccion: 'Lección 1: "El Estado de derecho y la república"', paginas: 'Páginas 156 a 163' },
  '110-7-HIS-OA19': { libro: 'Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 5: "Formación ciudadana y derechos"', leccion: 'Lección 2: "Pueblos originarios y convivencia"', paginas: 'Páginas 164 a 170' },
  '110-7-HIS-OA20': { libro: 'Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 5: "Formación ciudadana y derechos"', leccion: 'Lección 3: "Diálogo, mediación y acuerdos"', paginas: 'Páginas 171 a 178' },
  '110-7-HIS-OA21': { libro: 'Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 6: "Espacio geográfico y sustentabilidad"', leccion: 'Lección 1: "Relieve, clima y riesgos socionaturales"', paginas: 'Páginas 180 a 195' },
  '110-7-HIS-OA22': { libro: 'Historia, Geografía y C.S. 7° Básico (Texto del Estudiante MINEDUC)', unidad: 'Unidad 6: "Espacio geográfico y sustentabilidad"', leccion: 'Lección 2: "Huella ecológica y sustentabilidad"', paginas: 'Páginas 196 a 210' },

  // 5. INGLÉS
  '110-7-ING-OA09': { libro: "English 7th Grade (Student's Book MINEDUC)", unidad: 'Unit 1: "People and Places"', leccion: 'Lesson 1: "Reading adapted short stories"', paginas: 'Páginas 8 a 23' },
  '110-7-ING-OA10': { libro: "English 7th Grade (Student's Book MINEDUC)", unidad: 'Unit 2: "Communication and Technology"', leccion: 'Lesson 1: "Non-literary texts and articles"', paginas: 'Páginas 24 a 39' },
  '110-7-ING-OA13': { libro: "English 7th Grade (Student's Book MINEDUC)", unidad: 'Unit 3: "Daily Life and Routines"', leccion: 'Lesson 1: "Personal profiles and sentences"', paginas: 'Páginas 40 a 55' },
  '110-7-ING-OA16': { libro: "English 7th Grade (Student's Book MINEDUC)", unidad: 'Unit 4: "World of Wonders"', leccion: 'Lesson 1: "Present Simple and Modal verbs"', paginas: 'Páginas 56 a 72' }
};

const BRAND_COLORS: { id: BrandColorOption; hex: string; name: string; description: string }[] = [
  { id: 'yellow', hex: '#F8AD22', name: 'Amarillo Sol (Oficial)', description: 'Tono oficial cálido e institucional de EstudioSimple.' },
  { id: 'orange', hex: '#EE751C', name: 'Naranja Estudio', description: 'Color dinámico con alta energía visual.' },
  { id: 'turquoise', hex: '#12A1A4', name: 'Turquesa Mineduc', description: 'Alineado a la paleta institucional y formativa.' },
  { id: 'white', hex: '#FFFFFF', name: 'Blanco Puro', description: 'Estilo minimalista limpio de alto contraste.' },
  { id: 'ice-blue', hex: '#F0F4F8', name: 'Blanco Azulado', description: 'Aspecto suave y descansado para pantalla.' },
  { id: 'silver', hex: '#78909C', name: 'Plata / Acero', description: 'Acabado sobrio y profesional.' },
  { id: 'graphite', hex: '#263238', name: 'Grafito / Carbón', description: 'Modo oscuro de cabecera de máxima elegancia.' },
];

const ALL_GRADE_LEVELS: GradeLevel[] = [
  '3° Básico',
  '4° Básico',
  '5° Básico',
  '6° Básico',
  '7° Básico',
  '8° Básico'
];

type AdminModule =
  | 'dashboard'
  | 'paginas'
  | 'journal'
  | 'popups'
  | 'galeria'
  | 'mensajes'
  | 'descargas'
  | 'eventos'
  | 'generator'
  | 'catalog'
  | 'access'
  | 'configuracion'
  | 'brand';

interface SidebarGroup {
  name: string;
  accentColor: string;
  items: {
    id: AdminModule;
    label: string;
    icon: React.ComponentType<{ className?: string; size?: number | string }>;
  }[];
}

const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    name: 'Sitio Web & CMS',
    accentColor: '#12A1A4',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'paginas', label: 'PáginasWeb', icon: Files },
      { id: 'journal', label: 'Journal (Blog)', icon: Newspaper },
      { id: 'popups', label: 'Popups y Avisos', icon: Bell },
      { id: 'galeria', label: 'Galería Multimedia', icon: ImageIcon },
    ]
  },
  {
    name: 'Atención & Recursos',
    accentColor: '#EE751C',
    items: [
      { id: 'mensajes', label: 'Mensajes / Consultas', icon: Mail },
      { id: 'descargas', label: 'Descargas y Cuaderno', icon: FileDown },
      { id: 'eventos', label: 'Eventos MINEDUC', icon: CalendarDays },
    ]
  },
  {
    name: 'Motor Pedagógico',
    accentColor: '#38BDF8',
    items: [
      { id: 'generator', label: 'Generador DOCX', icon: BookOpen },
      { id: 'catalog', label: 'Catálogo EELL (227 OAs)', icon: Code },
      { id: 'access', label: 'Control Familiar', icon: Users },
    ]
  },
  {
    name: 'Sistema & Ajustes',
    accentColor: '#A78BFA',
    items: [
      { id: 'configuracion', label: 'Configuración General', icon: Sliders },
      { id: 'brand', label: 'Identidad y Colores', icon: Palette },
    ]
  }
];

const getSubjectBadgeStyle = (subject: string): string => {
  switch (subject) {
    case 'Matemática':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Lengua y Literatura':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Ciencias Naturales':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Historia, Geografía y Ciencias Sociales':
      return 'bg-amber-50 text-amber-800 border-amber-200';
    case 'Idioma Extranjero: Inglés':
      return 'bg-sky-50 text-sky-700 border-sky-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const AdminDashboard: React.FC = () => {
  const { setViewMode, parent, updateEnrolledGrades, headerFooterColor, setHeaderFooterColor } = useApp();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeModule, setActiveModule] = useState<AdminModule>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Estado del CMS de Páginas
  const [cmsPages, setCmsPages] = useState<CmsPage[]>(() => loadCmsPages());
  const [selectedPageForEdit, setSelectedPageForEdit] = useState<CmsPage | null>(null);

  // Estado del Generador y Catálogo
  const [catalog, setCatalog] = useState<OACatalogItem[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>('7° Básico');
  const [selectedSubject, setSelectedSubject] = useState('Matemática');
  const [selectedOAId, setSelectedOAId] = useState('');
  const [customLessonCount, setCustomLessonCount] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generatedSuccess, setGeneratedSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Filtros para el Catálogo Curricular (227 OAs)
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogGradeFilter, setCatalogGradeFilter] = useState('todos');
  const [catalogSubjectFilter, setCatalogSubjectFilter] = useState('todas');
  const [catalogEjeFilter, setCatalogEjeFilter] = useState('todos');
  const [catalogOnlyEELL, setCatalogOnlyEELL] = useState(false);
  const [selectedOAForModal, setSelectedOAForModal] = useState<OACatalogItem | null>(null);

  const catalogGradesList = useMemo(() => {
    return ['3° Básico', '4° Básico', '5° Básico', '6° Básico', '7° Básico', '8° Básico'];
  }, []);

  const catalogSubjectsList = useMemo(() => {
    const subjects = new Set<string>();
    catalog.forEach((item) => {
      if (item.asignatura) subjects.add(item.asignatura);
    });
    return Array.from(subjects);
  }, [catalog]);

  const catalogEjesList = useMemo(() => {
    const ejes = new Set<string>();
    catalog
      .filter((item) => catalogSubjectFilter === 'todas' || item.asignatura === catalogSubjectFilter)
      .forEach((item) => {
        if (item.eje) ejes.add(item.eje);
      });
    return Array.from(ejes);
  }, [catalog, catalogSubjectFilter]);

  const filteredCatalog = useMemo(() => {
    return catalog.filter((item) => {
      if (catalogGradeFilter !== 'todos' && item.curso !== catalogGradeFilter) {
        return false;
      }
      if (catalogSubjectFilter !== 'todas' && item.asignatura !== catalogSubjectFilter) {
        return false;
      }
      if (catalogEjeFilter !== 'todos' && item.eje !== catalogEjeFilter) {
        return false;
      }
      if (catalogOnlyEELL && !item.inTemarioEELL) {
        return false;
      }
      if (catalogSearch.trim()) {
        const q = catalogSearch.toLowerCase().trim();
        const inOa = item.oa.toLowerCase().includes(q);
        const inDesc = item.descripcion.toLowerCase().includes(q);
        const inAsig = item.asignatura.toLowerCase().includes(q);
        const inEje = (item.eje || '').toLowerCase().includes(q);
        const inKey = (item.conceptosClave || []).some((c) => c.toLowerCase().includes(q));
        const inInd = (item.indicadores || []).some((ind) => ind.toLowerCase().includes(q));
        if (!inOa && !inDesc && !inAsig && !inEje && !inKey && !inInd) {
          return false;
        }
      }
      return true;
    });
  }, [catalog, catalogGradeFilter, catalogSubjectFilter, catalogEjeFilter, catalogOnlyEELL, catalogSearch]);

  const hasActiveCatalogFilters =
    catalogSearch.trim() !== '' ||
    catalogGradeFilter !== 'todos' ||
    catalogSubjectFilter !== 'todas' ||
    catalogEjeFilter !== 'todos' ||
    catalogOnlyEELL;

  const resetCatalogFilters = () => {
    setCatalogSearch('');
    setCatalogGradeFilter('todos');
    setCatalogSubjectFilter('todas');
    setCatalogEjeFilter('todos');
    setCatalogOnlyEELL(false);
  };

  useEffect(() => {
    // Al entrar al portal se exige siempre autenticación por clave y se purga cualquier sesión residual
    sessionStorage.removeItem('estudiosimple_admin_auth');
  }, []);

  useEffect(() => {
    async function loadCatalog() {
      try {
        const res = await fetch('/data/curriculum_catalog.json');
        if (res.ok) {
          const data: OACatalogItem[] = await res.json();
          setCatalog(data);
        }
      } catch (err) {
        console.error('Error al cargar catálogo curricular:', err);
      }
    }
    loadCatalog();
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin' || passwordInput === 'admin123' || passwordInput === 'estudiosimple') {
      setIsAdminAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Contraseña incorrecta. Intenta nuevamente.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('estudiosimple_admin_auth');
    setViewMode('landing');
  };

  const toggleGradeForFamily = (grade: GradeLevel) => {
    const current = parent.enrolledGrades || ['7° Básico'];
    let updated: GradeLevel[];
    if (current.includes(grade)) {
      updated = current.filter((g) => g !== grade);
    } else {
      updated = [...current, grade];
    }
    updateEnrolledGrades(updated);
  };

  // Handlers para CMS de Páginas
  const handleTogglePageStatus = (id: string) => {
    const updated = cmsPages.map((p) => (p.id === id ? { ...p, activo: !p.activo } : p));
    setCmsPages(updated);
    saveCmsPages(updated);
  };

  const handleTogglePageMenu = (id: string) => {
    const updated = cmsPages.map((p) => (p.id === id ? { ...p, mostrarEnMenu: !p.mostrarEnMenu } : p));
    setCmsPages(updated);
    saveCmsPages(updated);
  };

  const handleCreatePage = (titulo: string, slug: string, mostrarEnMenu: boolean) => {
    const updated = createCmsPage(titulo, slug, mostrarEnMenu);
    setCmsPages(updated);
  };

  const handleDeletePage = (id: string) => {
    const updated = deleteCmsPage(id);
    setCmsPages(updated);
    if (selectedPageForEdit?.id === id) {
      setSelectedPageForEdit(null);
    }
  };

  const handleSaveCmsPage = (page: CmsPage) => {
    const updated = updateCmsPage(page);
    setCmsPages(updated);
    setSelectedPageForEdit(page);
  };

  const subjects = useMemo(() => {
    if (!catalog.length) return ['Matemática', 'Ciencias Naturales', 'Historia, Geografía y Ciencias Sociales', 'Lengua y Literatura', 'Inglés'];
    const filtered = catalog.filter((c) => c.curso === selectedGrade);
    const set = Array.from(new Set(filtered.map((c) => c.asignatura)));
    return set.length ? set : ['Matemática', 'Ciencias Naturales', 'Historia, Geografía y Ciencias Sociales', 'Lengua y Literatura', 'Inglés'];
  }, [catalog, selectedGrade]);

  const availableOAs = useMemo(() => {
    return catalog.filter((c) => c.curso === selectedGrade && c.asignatura === selectedSubject);
  }, [catalog, selectedGrade, selectedSubject]);

  const currentOA = useMemo(() => {
    return availableOAs.find((c) => c.id === selectedOAId) || availableOAs[0] || null;
  }, [availableOAs, selectedOAId]);

  useEffect(() => {
    if (availableOAs.length > 0 && (!selectedOAId || !availableOAs.some((oa) => oa.id === selectedOAId))) {
      setSelectedOAId(availableOAs[0].id);
    }
  }, [availableOAs, selectedOAId]);

  const currentBookRef = useMemo(() => {
    if (!currentOA) return null;
    return TEXTBOOK_MAPPINGS[currentOA.id] || {
      libro: `${currentOA.asignatura} ${currentOA.curso} (Texto Oficial MINEDUC)`,
      unidad: `Unidad Oficial (${currentOA.eje})`,
      leccion: `Objetivo ${currentOA.oa}`,
      paginas: 'Texto del Estudiante MINEDUC'
    };
  }, [currentOA]);

  const totalLessons = customLessonCount || (currentOA ? currentOA.leccionesSugeridas : 5);

  const currentPackage: GeneratedOAPackage | null = useMemo(() => {
    if (!currentOA) return null;
    return generateOAPackage(currentOA, totalLessons);
  }, [currentOA, totalLessons]);

  const handleGenerateDocx = async () => {
    if (!currentPackage) return;
    setGenerating(true);
    setGeneratedSuccess(false);

    try {
      const blob = await exportOAPackageToDocx(currentPackage);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Plan_Maestro_${currentPackage.oa.curso.replace(/[\s°]/g, '')}_${currentPackage.oa.id}_${currentPackage.totalLessons}Lecciones.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setGeneratedSuccess(true);
    } catch (err) {
      console.error('Error al generar DOCX:', err);
      alert('Error al generar el Plan Maestro.');
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyPrompts = async () => {
    if (!currentPackage) return;
    let allPrompts = `# Prompts ChatGPT Work: ${currentPackage.oa.asignatura} - ${currentPackage.oa.oa}\n\n`;
    currentPackage.lessons.forEach((l) => {
      allPrompts += `## Clase ${l.num}: ${l.title}\n\n`;
      allPrompts += `### Paso 2: Video Motivacional (7 Slides)\n${l.paso2_hook.fullPrompt}\n\n`;
      allPrompts += `### Paso 4: Video Explicativo (7 Slides)\n${l.paso4_explicativo.fullPrompt}\n\n`;
    });
    await navigator.clipboard.writeText(allPrompts);
    setCopiedKey('prompts');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // 1. PANTALLA DE LOGIN ADMIN
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 font-sans">
        <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#12A1A4] flex items-center justify-center mx-auto mb-4 text-white font-black text-xl shadow-lg">
            ES
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-2">Portal de Administración</h1>
          <p className="text-xs text-[#94A3B8] mb-6 leading-relaxed">
            Ingreso protegido para gestión del CMS de páginas, control curricular y generación de planes maestros.
          </p>

          {loginError && (
            <div className="bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] text-xs p-3 rounded-xl mb-4 font-bold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">
                Clave de Seguridad
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Ingresa la contraseña de administrador"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#0F172A] border border-[#334155] text-white text-xs focus:outline-none focus:border-[#12A1A4]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#12A1A4] hover:bg-[#0E8284] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Iniciar Sesión como Administrador</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#334155]">
            <button
              type="button"
              onClick={() => setViewMode('landing')}
              className="text-xs font-bold text-[#12A1A4] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la Landing Oficial</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. DASHBOARD CMS COMPLETO ESTILO COLEGIO ACRÓPOLIS CON 4 GRUPOS EJECUTIVOS
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      {/* Overlay Mobile para Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* BARRA LATERAL FIJA (SIDEBAR ESTILO COLEGIO ACRÓPOLIS) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-[#0D1527] border-r border-[#1E293B] transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo y Encabezado de la Sidebar */}
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#12A1A4] flex items-center justify-center font-black text-sm text-white shadow-md shadow-[#12A1A4]/30">
            ES
          </div>
          <div>
            <p className="text-sm font-black text-white tracking-tight">EstudioSimple</p>
            <p className="text-[11px] font-bold text-[#94A3B8]">Panel Admin · CMS</p>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-[#94A3B8] hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navegación Vertical Agrupada */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
          {SIDEBAR_GROUPS.map((group, groupIdx) => (
            <div key={group.name} className="space-y-1.5">
              {groupIdx > 0 && (
                <div className="pt-2 pb-1">
                  <div className="border-t border-white/10" />
                </div>
              )}

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 mb-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0 shadow-xs"
                  style={{ backgroundColor: group.accentColor }}
                />
                <span className="text-[10px] font-black uppercase text-slate-200 tracking-wider">
                  {group.name}
                </span>
              </div>

              {group.items.map((item) => {
                const isActive = activeModule === item.id && !selectedPageForEdit;
                const isPaginasActive = activeModule === 'paginas' && item.id === 'paginas';
                const highlight = isActive || isPaginasActive;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveModule(item.id);
                      setSelectedPageForEdit(null);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                      highlight
                        ? 'bg-[#12A1A4] text-white shadow-md shadow-[#12A1A4]/25'
                        : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Acciones Inferiores Fijas */}
        <div className="border-t border-white/10 px-3 py-4 space-y-2 shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('landing')}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2 text-xs font-bold text-[#94A3B8] transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
          >
            <Globe size={16} />
            <span>Ver Sitio Web</span>
          </button>

          <button
            type="button"
            onClick={handleAdminLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2 text-xs font-bold text-[#EF4444] bg-[#EF4444]/10 transition-colors hover:bg-[#EF4444] hover:text-white cursor-pointer"
          >
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL FLUIDO */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top Bar Mobile con Botón Hamburguesa */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden shadow-sm">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl p-2 text-slate-700 hover:bg-slate-100"
          >
            <Menu size={20} />
          </button>
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
            EstudioSimple Admin
          </span>
          <div className="w-8" />
        </div>

        {/* Lienzo del Módulo Activo */}
        <main className="flex-1 p-5 sm:p-8 max-w-7xl w-full mx-auto">
          {/* 1. MÓDULO DASHBOARD */}
          {activeModule === 'dashboard' && (
            <div className="space-y-8">
              {/* Encabezado Principal del Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      Sistema Conectado · Temarios 2026
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                    Panel de Control y Supervisión
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl">
                    Supervisa el currículum de los 227 OAs oficiales de Exámenes Libres, administra páginas públicas y gestiona los recursos de las familias.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewMode('landing')}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border border-slate-200 shadow-2xs"
                  >
                    <Globe size={15} />
                    <span>Ver Sitio Público</span>
                  </button>
                </div>
              </div>

              {/* SECCIÓN 1: MÉTRICAS CLAVE Y COBERTURA CURRICULAR */}
              <div className="bg-slate-50/70 p-6 rounded-3xl border border-slate-200/90 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#12A1A4]/15 text-[#12A1A4] flex items-center justify-center shadow-2xs">
                      <BarChart3 size={18} />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                        1. Cobertura Curricular y Estado del Sistema
                      </h2>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Alineación estricta con temarios oficiales MINEDUC para 3° a 8° básico
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block text-[10px] font-black uppercase text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                    6 Indicadores
                  </span>
                </div>

                {/* Grilla de MetricCards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-1">
                  <MetricCard
                    title="OAs Oficiales EELL"
                    value={catalog.length || 227}
                    subtitle="Temarios Oficiales 3° a 8° Básico"
                    icon={<BookOpen size={24} />}
                    color="#12A1A4"
                    bgColor="#E6F6F6"
                  />

                  <MetricCard
                    title="Cursos Cubiertos"
                    value={ALL_GRADE_LEVELS.length}
                    subtitle="Enseñanza Básica Completa"
                    icon={<GraduationCap size={24} />}
                    color="#3B82F6"
                    bgColor="#EFF6FF"
                  />

                  <MetricCard
                    title="Asignaturas Troncales"
                    value={5}
                    subtitle="Matemática, Lenguaje, Ciencias, Historia, Inglés"
                    icon={<Layers size={24} />}
                    color="#EE751C"
                    bgColor="#FFF4ED"
                  />

                  <MetricCard
                    title="Textos Escolares"
                    value="100%"
                    subtitle="Mapeados a Libros Oficiales MINEDUC"
                    icon={<CheckCircle2 size={24} />}
                    color="#10B981"
                    bgColor="#ECFDF5"
                  />

                  <MetricCard
                    title="Cursos Activos Familia"
                    value={(parent.enrolledGrades || []).length}
                    subtitle="Niveles Habilitados en Cuenta Demo"
                    icon={<Users size={24} />}
                    color="#8B5CF6"
                    bgColor="#F5F3FF"
                  />

                  <MetricCard
                    title="Páginas Web en CMS"
                    value={`${cmsPages.filter((p) => p.activo).length} de ${cmsPages.length}`}
                    subtitle="Páginas Públicas Publicadas"
                    icon={<Files size={24} />}
                    color="#F59E0B"
                    bgColor="#FEF3C7"
                  />
                </div>
              </div>

              {/* SECCIÓN 2: DISTRIBUCIÓN POR NIVEL ESCOLAR */}
              <div className="bg-slate-50/70 p-6 rounded-3xl border border-slate-200/90 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center shadow-2xs">
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                        2. Desglose de los 227 OAs Oficiales EELL
                      </h2>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Distribución de objetivos evaluables en comisiones examinadoras por cada nivel escolar
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
                  {[
                    { grade: '3° Básico', oas: 29, color: '#12A1A4' },
                    { grade: '4° Básico', oas: 32, color: '#10B981' },
                    { grade: '5° Básico', oas: 43, color: '#3B82F6' },
                    { grade: '6° Básico', oas: 44, color: '#8B5CF6' },
                    { grade: '7° Básico', oas: 39, color: '#EE751C' },
                    { grade: '8° Básico', oas: 40, color: '#F8AD22' }
                  ].map((g) => (
                    <div key={g.grade} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-1 hover:shadow-xs transition-shadow">
                      <p className="text-[11px] font-extrabold text-slate-500 uppercase">{g.grade}</p>
                      <p className="text-xl font-black text-slate-900" style={{ color: g.color }}>{g.oas}</p>
                      <p className="text-[10px] text-slate-400 font-bold">OAs Oficiales</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. MÓDULO PÁGINAS WEB (CMS) */}
          {activeModule === 'paginas' && (
            <div>
              {selectedPageForEdit ? (
                <PageEditor
                  page={selectedPageForEdit}
                  onBack={() => setSelectedPageForEdit(null)}
                  onSavePage={handleSaveCmsPage}
                />
              ) : (
                <PaginasTable
                  paginas={cmsPages}
                  onSelectPage={(page) => setSelectedPageForEdit(page)}
                  onToggleStatus={handleTogglePageStatus}
                  onToggleMenu={handleTogglePageMenu}
                  onCreatePage={handleCreatePage}
                  onDeletePage={handleDeletePage}
                  onSavePage={handleSaveCmsPage}
                  onReorderPages={(newPages) => setCmsPages(newPages)}
                />
              )}
            </div>
          )}

          {/* 3. MÓDULO JOURNAL */}
          {activeModule === 'journal' && <JournalView />}

          {/* 4. MÓDULO POPUPS */}
          {activeModule === 'popups' && <PopupsView />}

          {/* 5. MÓDULO GALERÍA */}
          {activeModule === 'galeria' && <GaleriaView />}

          {/* 6. MÓDULO MENSAJES Y CONSULTAS */}
          {activeModule === 'mensajes' && <MensajesView />}

          {/* 7. MÓDULO DESCARGAS */}
          {activeModule === 'descargas' && <DescargasView />}

          {/* 8. MÓDULO EVENTOS */}
          {activeModule === 'eventos' && <EventosView />}

          {/* 9. MÓDULO CONFIGURACIÓN GENERAL (HEADER / FOOTER) */}
          {activeModule === 'configuracion' && <ConfiguracionGeneralView />}

          {/* 10. MÓDULO GENERADOR DOCX */}
          {activeModule === 'generator' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h1 className="text-xl font-black text-slate-800 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#12A1A4]" />
                      <span>Generador de Planes Maestros Oficiales (3° a 8° Básico)</span>
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Flujo secuencial docente: selecciona el curso, la asignatura y el objetivo para generar el plan maestro formal.
                    </p>
                  </div>

                  <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                    Catálogo activo: <strong className="text-slate-800">{catalog.length} OAs oficiales</strong>
                  </div>
                </div>

                {/* PASO 1: SELECCIONAR CURSO */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#12A1A4] text-white text-[11px] font-black flex items-center justify-center">1</span>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Selecciona el Curso / Nivel:
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {ALL_GRADE_LEVELS.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => {
                          setSelectedGrade(g);
                          const gradeOAs = catalog.filter((c) => c.curso === g);
                          const gradeSubjects = Array.from(new Set(gradeOAs.map((c) => c.asignatura)));
                          const nextSubject = gradeSubjects.includes(selectedSubject) ? selectedSubject : (gradeSubjects[0] || 'Matemática');
                          setSelectedSubject(nextSubject);
                          const firstOA = gradeOAs.find((c) => c.asignatura === nextSubject);
                          if (firstOA) setSelectedOAId(firstOA.id);
                        }}
                        className={`py-2.5 px-3 rounded-xl text-xs font-extrabold border transition-all text-center cursor-pointer ${
                          selectedGrade === g
                            ? 'bg-[#12A1A4] border-[#12A1A4] text-white shadow-md'
                            : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PASO 2: SELECCIONAR ASIGNATURA */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#12A1A4] text-white text-[11px] font-black flex items-center justify-center">2</span>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Selecciona la Asignatura:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => {
                          setSelectedSubject(sub);
                          const firstOA = catalog.find((c) => c.curso === selectedGrade && c.asignatura === sub);
                          if (firstOA) setSelectedOAId(firstOA.id);
                        }}
                        className={`py-2 px-3.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          selectedSubject === sub
                            ? 'bg-[#12A1A4] border-[#12A1A4] text-white shadow-md'
                            : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PASO 3: SELECCIONAR OBJETIVO */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#12A1A4] text-white text-[11px] font-black flex items-center justify-center">3</span>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        Selecciona el Objetivo Oficial ({availableOAs.length} OAs disponibles):
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                    {availableOAs.map((oa) => (
                      <button
                        key={oa.id}
                        type="button"
                        onClick={() => setSelectedOAId(oa.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          currentOA?.id === oa.id
                            ? 'bg-teal-50/80 border-[#12A1A4] ring-1 ring-[#12A1A4] text-slate-900'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black text-[#12A1A4]">{oa.oa}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{oa.eje}</span>
                        </div>
                        <p className="text-xs font-medium text-slate-700 line-clamp-2">{oa.descripcion}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* PASO 4: TEXTO ESCOLAR */}
                {currentBookRef && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-[#12A1A4] uppercase tracking-wider mb-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Articulación con Texto Escolar Oficial MINEDUC</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Texto Oficial:</span>
                        <strong className="text-slate-800">{currentBookRef.libro}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Unidad:</span>
                        <strong className="text-slate-800">{currentBookRef.unidad}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Lección:</span>
                        <strong className="text-slate-800">{currentBookRef.leccion}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Páginas de Referencia:</span>
                        <strong className="text-[#12A1A4]">{currentBookRef.paginas}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* PASO 5: DESCARGA DOCX */}
                {currentPackage && (
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-slate-500 block">Plan Maestro Listo:</span>
                      <strong className="text-sm text-slate-800">
                        {currentPackage.oa.curso} · {currentPackage.oa.asignatura} ({currentPackage.oa.oa})
                      </strong>
                      <span className="text-xs text-slate-400 block">
                        {currentPackage.totalLessons} clases articuladas con cuaderno y guiones de video
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleCopyPrompts}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                      >
                        {copiedKey === 'prompts' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedKey === 'prompts' ? '¡Prompts Copiados!' : 'Copiar Prompts Video'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleGenerateDocx}
                        disabled={generating}
                        className="px-5 py-2.5 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-xs font-extrabold flex items-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
                      >
                        <Download className="w-4 h-4" />
                        <span>{generating ? 'Generando DOCX...' : 'Descargar Plan Maestro (.docx)'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 11. MÓDULO CATÁLOGO EELL (227 OAs) CON FILTROS AVANZADOS */}
          {activeModule === 'catalog' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-6">
                
                {/* Cabecera del Módulo */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h1 className="text-xl font-black text-slate-800 flex items-center gap-2">
                      <Code className="w-5 h-5 text-[#12A1A4]" />
                      <span>Catálogo Curricular Oficial de Exámenes Libres (227 OAs)</span>
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Explora la progresión de los temarios de Exámenes Libres del MINEDUC desde 3° hasta 8° básico con filtros por nivel, asignatura y búsqueda en tiempo real.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold px-3 py-1.5 rounded-xl bg-teal-50 text-[#12A1A4] border border-teal-200">
                      100% Temarios Oficiales
                    </span>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
                      {filteredCatalog.length} de {catalog.length} OAs
                    </span>
                  </div>
                </div>

                {/* Panel de Filtros Interactivos */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  
                  {/* Buscador de Texto Libre */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={catalogSearch}
                      onChange={(e) => setCatalogSearch(e.target.value)}
                      placeholder="Buscar por código OA (ej: OA 1), tema, concepto clave o descripción..."
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-hidden focus:border-[#12A1A4] focus:ring-1 focus:ring-[#12A1A4] shadow-2xs font-medium text-slate-800"
                    />
                    {catalogSearch && (
                      <button
                        type="button"
                        onClick={() => setCatalogSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
                        title="Limpiar búsqueda"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Filtro por Curso / Nivel Escolar */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Curso / Nivel Escolar
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => setCatalogGradeFilter('todos')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          catalogGradeFilter === 'todos'
                            ? 'bg-[#12A1A4] text-white shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Todos los Cursos ({catalog.length})
                      </button>
                      {catalogGradesList.map((g) => {
                        const count = catalog.filter((item) => item.curso === g).length;
                        const isSelected = catalogGradeFilter === g;
                        return (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setCatalogGradeFilter(g)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#12A1A4] text-white shadow-xs'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {g} ({count})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Filtro por Asignatura */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Asignatura Evaluada MINEDUC
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setCatalogSubjectFilter('todas');
                          setCatalogEjeFilter('todos');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          catalogSubjectFilter === 'todas'
                            ? 'bg-[#0B254D] text-white shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Todas las Asignaturas
                      </button>
                      {catalogSubjectsList.map((sub) => {
                        const isSelected = catalogSubjectFilter === sub;
                        const count = catalog.filter(
                          (item) =>
                            item.asignatura === sub &&
                            (catalogGradeFilter === 'todos' || item.curso === catalogGradeFilter)
                        ).length;
                        return (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => {
                              setCatalogSubjectFilter(sub);
                              setCatalogEjeFilter('todos');
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#0B254D] text-white shadow-xs ring-2 ring-[#12A1A4]'
                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {sub} ({count})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fila Complementaria: Eje Curricular + Switch Temarios EELL + Botón Reset */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
                    <div className="flex flex-wrap items-center gap-3">
                      {catalogEjesList.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-600">Eje Temático:</span>
                          <select
                            value={catalogEjeFilter}
                            onChange={(e) => setCatalogEjeFilter(e.target.value)}
                            className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white font-semibold text-slate-700 focus:outline-hidden focus:border-[#12A1A4]"
                          >
                            <option value="todos">Todos los Ejes ({catalogEjesList.length})</option>
                            {catalogEjesList.map((eje) => (
                              <option key={eje} value={eje}>
                                {eje}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <label className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer select-none hover:bg-slate-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={catalogOnlyEELL}
                          onChange={(e) => setCatalogOnlyEELL(e.target.checked)}
                          className="w-3.5 h-3.5 rounded text-[#12A1A4] focus:ring-[#12A1A4]"
                        />
                        <span>Solo Temarios Oficiales EELL</span>
                      </label>
                    </div>

                    {hasActiveCatalogFilters && (
                      <button
                        type="button"
                        onClick={resetCatalogFilters}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ml-auto"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restablecer Filtros</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Resumen de Resultados */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
                  <span>
                    Mostrando <strong className="text-slate-800">{filteredCatalog.length}</strong> de {catalog.length} Objetivos de Aprendizaje
                    {catalogGradeFilter !== 'todos' && ` en ${catalogGradeFilter}`}
                    {catalogSubjectFilter !== 'todas' && ` · ${catalogSubjectFilter}`}
                    {catalogEjeFilter !== 'todos' && ` · Eje: ${catalogEjeFilter}`}
                  </span>
                </div>

                {/* Grid de Tarjetas de OAs */}
                {filteredCatalog.length === 0 ? (
                  <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 space-y-3">
                    <Filter className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm font-bold text-slate-700">No se encontraron OAs con los filtros seleccionados</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Prueba seleccionando otro curso, otra asignatura o limpiando el texto del buscador.
                    </p>
                    <button
                      type="button"
                      onClick={resetCatalogFilters}
                      className="px-4 py-2 rounded-xl bg-[#12A1A4] text-white text-xs font-bold hover:bg-[#0e8284] cursor-pointer"
                    >
                      Ver Todos los 227 OAs
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCatalog.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedOAForModal(item)}
                        className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-[#12A1A4]/40 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group space-y-3"
                      >
                        <div className="space-y-2">
                          {/* Fila Superior: OA y Nivel */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-black text-[#12A1A4] group-hover:underline">
                              {item.oa}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {item.inTemarioEELL && (
                                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                                  EELL
                                </span>
                              )}
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                                {item.curso}
                              </span>
                            </div>
                          </div>

                          {/* Asignatura y Eje */}
                          <div>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border inline-block ${getSubjectBadgeStyle(item.asignatura)}`}>
                              {item.asignatura}
                            </span>
                            {item.eje && (
                              <span className="text-[11px] text-slate-400 block mt-1 font-medium truncate">
                                Eje: {item.eje}
                              </span>
                            )}
                          </div>

                          {/* Descripción */}
                          <p className="text-xs text-slate-700 line-clamp-3 leading-relaxed font-normal">
                            {item.descripcion}
                          </p>

                          {/* Conceptos Clave */}
                          {item.conceptosClave && item.conceptosClave.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {item.conceptosClave.slice(0, 3).map((c, i) => (
                                <span key={i} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                  #{c}
                                </span>
                              ))}
                              {item.conceptosClave.length > 3 && (
                                <span className="text-[10px] text-slate-400">
                                  +{item.conceptosClave.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Footer de Tarjeta */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{item.leccionesSugeridas || 5} lecciones</span>
                          </span>
                          <span className="text-[#12A1A4] font-bold text-xs flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Ver Ficha</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 12. MÓDULO CONTROL FAMILIAR */}
          {activeModule === 'access' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <h1 className="text-xl font-black text-slate-800 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#12A1A4]" />
                    <span>Control de Cursos Habilitados por Familia</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Activa o desactiva qué cursos tiene contratados la familia demo para validar el bloqueo en el Selector de Cursos.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-4">
                    <div>
                      <span className="text-xs font-bold text-[#12A1A4] block">Familia Registrada (Cuenta de Prueba)</span>
                      <strong className="text-sm text-slate-800">{parent.email}</strong>
                      <span className="text-xs text-slate-500 block">Estudiante: Carla · Nivel actual: 7° Básico</span>
                    </div>
                    <div className="text-xs text-right">
                      <span className="text-slate-400">Cursos Activos:</span>
                      <strong className="text-slate-800 block">{(parent.enrolledGrades || []).length} de 6 niveles</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {ALL_GRADE_LEVELS.map((g) => {
                      const isEnrolled = (parent.enrolledGrades || []).includes(g);
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => toggleGradeForFamily(g)}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            isEnrolled
                              ? 'bg-teal-50 border-[#12A1A4] text-slate-900 font-extrabold shadow-sm ring-1 ring-[#12A1A4]'
                              : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex justify-center mb-1">
                            {isEnrolled ? (
                              <CheckCircle2 className="w-4 h-4 text-[#12A1A4]" />
                            ) : (
                              <Lock className="w-4 h-4 text-slate-300" />
                            )}
                          </div>
                          <span className="text-xs block">{g}</span>
                          <span className="text-[10px] opacity-75 block">
                            {isEnrolled ? 'Comprado' : 'Bloqueado'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 13. MÓDULO IDENTIDAD Y MARCA */}
          {activeModule === 'brand' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <h1 className="text-xl font-black text-slate-800 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-[#12A1A4]" />
                    <span>Configuración de Apariencia y Colores Institucionales</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Personaliza el color de cabecera y pie de página de la aplicación web de EstudioSimple.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {BRAND_COLORS.map((item) => {
                    const isSelected = headerFooterColor === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setHeaderFooterColor(item.id)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#12A1A4] ring-2 ring-[#12A1A4]/30 shadow-md bg-white'
                            : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className="w-8 h-8 rounded-xl border border-black/10 shadow-sm"
                            style={{ backgroundColor: item.hex }}
                          />
                          <div>
                            <strong className="text-xs font-bold text-slate-800 block">{item.name}</strong>
                            <span className="text-[10px] font-mono text-slate-400">{item.hex}</span>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#12A1A4] ml-auto" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500">{item.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* MODAL DETALLE DE FICHA CURRICULAR OA */}
          {selectedOAForModal && (
            <div
              className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedOAForModal(null)}
            >
              <div
                className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full my-8 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Cabecera del Modal */}
                <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-black text-[#12A1A4] px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200">
                        {selectedOAForModal.oa}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                        {selectedOAForModal.curso}
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${getSubjectBadgeStyle(selectedOAForModal.asignatura)}`}>
                        {selectedOAForModal.asignatura}
                      </span>
                      {selectedOAForModal.inTemarioEELL && (
                        <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                          Temario Oficial EELL
                        </span>
                      )}
                    </div>
                    {selectedOAForModal.eje && (
                      <p className="text-xs text-slate-500 font-medium">
                        Eje Curricular: <strong className="text-slate-700">{selectedOAForModal.eje}</strong>
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedOAForModal(null)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                    aria-label="Cerrar modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Contenido Scrollable */}
                <div className="p-6 overflow-y-auto space-y-6 text-slate-700">
                  {/* Descripción Oficial */}
                  <div className="space-y-2">
                    <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Descripción Curricular Oficial (Bases MINEDUC)
                    </h2>
                    <p className="text-sm leading-relaxed font-normal bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-slate-800">
                      {selectedOAForModal.descripcion}
                    </p>
                  </div>

                  {/* Indicadores de Evaluación Oficiales */}
                  {selectedOAForModal.indicadores && selectedOAForModal.indicadores.length > 0 && (
                    <div className="space-y-2.5">
                      <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                        Indicadores de Evaluación Formativa
                      </h2>
                      <div className="space-y-2">
                        {selectedOAForModal.indicadores.map((ind, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 text-xs bg-white p-3 rounded-xl border border-slate-200/90 text-slate-700"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#12A1A4] shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{ind}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Alineación Canónica con Texto Escolar MINEDUC */}
                  {TEXTBOOK_MAPPINGS[selectedOAForModal.id] && (
                    <div className="space-y-2 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                        <BookOpenCheck className="w-4 h-4 text-emerald-600" />
                        <span>Alineación con Texto Oficial del Estudiante MINEDUC</span>
                      </div>
                      <div className="text-xs text-emerald-950 space-y-1 pl-6">
                        <p><strong>Libro:</strong> {TEXTBOOK_MAPPINGS[selectedOAForModal.id].libro}</p>
                        <p><strong>Unidad:</strong> {TEXTBOOK_MAPPINGS[selectedOAForModal.id].unidad}</p>
                        <p><strong>Lección:</strong> {TEXTBOOK_MAPPINGS[selectedOAForModal.id].leccion}</p>
                        <p><strong>Páginas:</strong> {TEXTBOOK_MAPPINGS[selectedOAForModal.id].paginas}</p>
                      </div>
                    </div>
                  )}

                  {/* Metadatos adicionales: Conceptos Clave y Carga Pedagógica */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedOAForModal.conceptosClave && selectedOAForModal.conceptosClave.length > 0 && (
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                          Conceptos Clave
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {selectedOAForModal.conceptosClave.map((c, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-medium px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200"
                            >
                              #{c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                        Carga Pedagógica Recomendada
                      </span>
                      <p className="text-xs text-slate-700 flex items-center gap-1.5 font-medium">
                        <Clock className="w-4 h-4 text-[#12A1A4]" />
                        <span>{selectedOAForModal.leccionesSugeridas || 5} lecciones estructuradas</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer del Modal */}
                <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedOAForModal(null)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    Cerrar Ficha
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGrade(selectedOAForModal.curso);
                      setSelectedSubject(selectedOAForModal.asignatura);
                      setSelectedOAId(selectedOAForModal.id);
                      setActiveModule('generator');
                      setSelectedOAForModal(null);
                    }}
                    className="px-5 py-2 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Cargar en Generador DOCX</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
