import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  BookOpen,
  BookOpenCheck,
  Sparkles,
  Save,
  RotateCcw,
  Download,
  FileCode,
  Check,
  CheckCircle2,
  Eye,
  Plus,
  Trash2,
  Copy,
  Layers,
  Film,
  HelpCircle,
  Lightbulb,
  GraduationCap,
  MessageSquare,
  FileText,
  Clock,
  Compass,
  CheckSquare,
  Video,
  ExternalLink,
  ImageIcon,
  ArrowDown,
  Info
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import {
  LessonData,
  GuidedItem,
  QuizQuestion,
  RecoveryItem
} from '../../../types/lesson';
import {
  OACatalogItem,
  generateOAPackage,
  buildHookPromptText,
  buildExplicativoPromptText
} from '../../../lib/lesson-generator';
import { exportSingleLessonToDocx } from '../../../lib/docx-export';
import { adaptGeneratorLessonToPlayer, adaptPlayerLessonToGenerator } from '../../../lib/lesson-adapter';
import {
  saveCustomLessonData,
  resetCustomLessonData,
  isLessonCustomized,
  getInjectedPackage,
  initializeInjectedLessons,
  findInjectedLesson,
  saveCustomPlayerLesson,
  resetCustomPlayerLesson,
  isPlayerLessonCustomized
} from '../../../lib/lesson-repository';
import { downloadLessonPromptFile } from '../../../lib/prompt-export';

interface LessonEditorViewProps {
  catalog?: OACatalogItem[];
}

export type EditorStepId =
  | 'prep'
  | 'paso1_inicio'
  | 'paso2_hook'
  | 'paso3_recorrido'
  | 'paso4_explicativo'
  | 'paso5_practica'
  | 'paso6_resumen'
  | 'paso7_miniquiz'
  | 'paso8_cierre';

interface SidebarStepItem {
  id: EditorStepId;
  stepNumber: string;
  name: string;
  badgeLabel: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  tone: string;
}

const ALL_GRADE_LEVELS = [
  '3° Básico',
  '4° Básico',
  '5° Básico',
  '6° Básico',
  '7° Básico',
  '8° Básico'
];

const ALL_SUBJECTS = [
  'Matemática',
  'Lengua y Literatura',
  'Ciencias Naturales',
  'Historia, Geografía y Ciencias Sociales',
  'Inglés'
];

const SIDEBAR_STEPS: SidebarStepItem[] = [
  { id: 'prep', stepNumber: 'Pre', name: 'Antes de comenzar', badgeLabel: 'Preparación', icon: GraduationCap, tone: '#12A1A4' },
  { id: 'paso1_inicio', stepNumber: '1', name: 'Inicio', badgeLabel: 'Ruta y Situación', icon: Compass, tone: '#EE751C' },
  { id: 'paso2_hook', stepNumber: '2', name: 'Video Motivacional', badgeLabel: 'Desafío', icon: Film, tone: '#8B5CF6' },
  { id: 'paso3_recorrido', stepNumber: '3', name: 'Recorrido', badgeLabel: 'Preguntas Guiadas', icon: MessageSquare, tone: '#3B82F6' },
  { id: 'paso4_explicativo', stepNumber: '4', name: 'Video Explicativo', badgeLabel: 'Idea Clave', icon: Lightbulb, tone: '#F59E0B' },
  { id: 'paso5_practica', stepNumber: '5', name: 'Práctica', badgeLabel: 'Cuaderno Físico', icon: FileText, tone: '#10B981' },
  { id: 'paso6_resumen', stepNumber: '6', name: 'Resumen', badgeLabel: 'Estrategia', icon: BookOpen, tone: '#0EA5E9' },
  { id: 'paso7_miniquiz', stepNumber: '7', name: 'Miniquiz y REVISAR', badgeLabel: 'Evaluación Formativa', icon: CheckSquare, tone: '#EC4899' },
  { id: 'paso8_cierre', stepNumber: '8', name: 'Cierre', badgeLabel: 'Metacognición', icon: Sparkles, tone: '#6366F1' }
];

export const LessonEditorView: React.FC<LessonEditorViewProps> = ({ catalog: propCatalog }) => {
  const { setViewMode, setActiveSynchronizedLesson } = useApp();

  const [localCatalog, setLocalCatalog] = useState<OACatalogItem[]>(propCatalog || []);
  const [selectedGrade, setSelectedGrade] = useState<string>('7° Básico');
  const [selectedSubject, setSelectedSubject] = useState<string>('Matemática');
  const [selectedOAId, setSelectedOAId] = useState<string>('');
  const [selectedLessonNum, setSelectedLessonNum] = useState<number>(1);
  const [activeStepId, setActiveStepId] = useState<EditorStepId>('prep');

  // Estado nativo LessonData: única fuente de verdad isomórfica con el aula interactiva
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [isExportingDocx, setIsExportingDocx] = useState<boolean>(false);

  // Cargar catálogo si no vino por props
  useEffect(() => {
    if (!propCatalog || propCatalog.length === 0) {
      fetch('/data/curriculum_catalog.json')
        .then((res) => (res.ok ? res.json() : []))
        .then((data: OACatalogItem[]) => setLocalCatalog(data))
        .catch((err) => console.error('Error cargando catalogo en LessonEditorView:', err));
    } else {
      setLocalCatalog(propCatalog);
    }
  }, [propCatalog]);

  // Filtrar OAs disponibles para el curso y asignatura seleccionados
  const availableOAs = useMemo(() => {
    return localCatalog.filter(
      (c) => c.curso === selectedGrade && c.asignatura === selectedSubject
    );
  }, [localCatalog, selectedGrade, selectedSubject]);

  // OA actualmente activo
  const currentOA: OACatalogItem | null = useMemo(() => {
    if (availableOAs.length === 0) return null;
    return availableOAs.find((c) => c.id === selectedOAId) || availableOAs[0];
  }, [availableOAs, selectedOAId]);

  // Actualizar selectedOAId si cambia la lista
  useEffect(() => {
    if (availableOAs.length > 0 && (!selectedOAId || !availableOAs.some((o) => o.id === selectedOAId))) {
      setSelectedOAId(availableOAs[0].id);
    }
  }, [availableOAs, selectedOAId]);

  const totalLessons = currentOA?.leccionesSugeridas || 5;

  const defaultReminders = useMemo(
    () => [
      'Sigue el orden indicado.',
      'Lee en voz alta únicamente los recuadros DILE y PREGÚNTALE.',
      'No leas los recuadros SOLO PARA TI ni AYUDA DE LECTURA.',
      'Haz cada pregunta y espera la respuesta antes de seleccionar una opción.',
      'Considera correcta una respuesta si expresa la idea matemática, aunque use palabras distintas.',
      'Si el estudiante necesita apoyo, usa únicamente la ayuda que aparecerá.',
      'Si propone otra explicación o no está de acuerdo, escúchalo completo y valora su razonamiento antes de guiarlo.'
    ],
    []
  );

  // Cargar lección nativa directamente sin conversiones degradantes
  const loadLesson = useCallback(() => {
    if (!currentOA) return;

    // 1. Cargar directamente desde findInjectedLesson (revisa localStorage unificado, fábrica canónica curada)
    const playerLesson = findInjectedLesson(selectedGrade, selectedSubject, currentOA.oa, selectedLessonNum);
    const customized = isPlayerLessonCustomized(selectedGrade, selectedSubject, currentOA.oa, selectedLessonNum) ||
                       isLessonCustomized(selectedGrade, selectedSubject, currentOA.oa, selectedLessonNum);
    setIsCustom(customized);

    if (playerLesson) {
      const cloned: LessonData = JSON.parse(JSON.stringify(playerLesson));

      // Asegurar inicialización de los 4 bloques canónicos si estuviesen incompletos
      if (!cloned.route.blocks || cloned.route.blocks.length < 4) {
        cloned.route.blocks = [
          { id: 'b1', number: '01', title: 'Números', subtitle: 'Enteros, fracciones y decimales', color: 'navy' },
          { id: 'b2', number: '02', title: 'Álgebra', subtitle: 'Patrones, relaciones y ecuaciones', color: 'orange' },
          { id: 'b3', number: '03', title: 'Geometría', subtitle: 'Formas, medidas y transformaciones', color: 'yellow' },
          { id: 'b4', number: '04', title: 'Datos y azar', subtitle: 'Información, gráficos y probabilidades', color: 'teal' }
        ];
      }

      // Asegurar inicialización de las 3 tarjetas de foco de la clase de hoy
      if (!cloned.route.keyQuestions || cloned.route.keyQuestions.length < 3) {
        cloned.route.keyQuestions = [
          { label: 'Ubicación en la recta', sub: 'El cero al centro y signos opuestos' },
          { label: 'Criterio de orden', sub: 'Mayor hacia la derecha' },
          { label: 'Comparar negativos', sub: 'Distancia relativa al cero' }
        ];
      }

      // Asegurar etapa reference (Comprendamos la respuesta)
      if (!cloned.reference) {
        cloned.reference = {
          dilePrompt: cloned.situation?.dilePrompt || 'En la recta numérica el número cero actúa como punto de referencia central.',
          question: 'Dime con tus palabras: ¿qué número divide la recta numérica entre positivos y negativos?',
          expectedAnswer: 'El número cero',
          socraticHint: 'Es el valor que separa las cantidades positivas de las negativas.',
          feedbackSuccess: '¡Exacto! El cero es el origen y punto de referencia central.',
          feedbackSupport: 'Observa el centro de la recta: el cero divide positivos y negativos.'
        };
      }

      // Asegurar puntos de foco del video motivacional
      if (!cloned.hook.focusPoints || cloned.hook.focusPoints.length === 0) {
        cloned.hook.focusPoints = [
          'Dónde se ubica el número cero en la recta.',
          'Hacia qué lado se ordenan los números positivos y negativos.',
          'Qué regla define qué número es mayor que otro.'
        ];
      }

      // Asegurar preguntas de comprobación post-video explicativo
      if (!cloned.postQuestions || cloned.postQuestions.length === 0) {
        cloned.postQuestions = cloned.preQuestions && cloned.preQuestions.length >= 2
          ? JSON.parse(JSON.stringify(cloned.preQuestions.slice(0, 2)))
          : [
              {
                context: 'Regla de la derecha',
                question: 'Si un número A se encuentra a la derecha de un número B en la recta numérica, ¿cuál de los dos es mayor?',
                expected: 'El número A es mayor porque está a la derecha.',
                success: '¡Excelente! En la recta numérica, el número que está más a la derecha siempre es el mayor.',
                support: 'Hacia la derecha los valores aumentan. ¿Cuál es mayor?',
                reveal: 'El número A es mayor porque está situado más hacia la derecha.',
                studentReveal: 'El número A es mayor.'
              },
              {
                context: 'Comparación de negativos',
                question: 'Al comparar −5 y −2, ¿cuál de los dos números es mayor y por qué?',
                expected: 'El −2 es mayor porque está más a la derecha en la recta numérica.',
                success: '¡Exacto! El −2 está más a la derecha y por tanto es mayor.',
                support: 'Ubícalos mentalmente en la recta: ¿cuál está más cerca del cero?',
                reveal: 'El −2 es mayor que el −5 porque se encuentra más hacia la derecha.',
                studentReveal: 'El −2 es mayor porque está más a la derecha.'
              }
            ];
      }

      // Asegurar estrategia para pensar
      if (!cloned.strategy) {
        cloned.strategy = {
          title: 'Cómo ordenar números enteros en 3 pasos',
          dileIntro: 'Cuando tengas que comparar o ordenar números enteros, puedes seguir esta estrategia de tres pasos:',
          steps: [
            { number: 1, title: 'Ubica', desc: 'Sitúa cada número en la recta numérica tomando el cero como centro.' },
            { number: 2, title: 'Compara', desc: 'Observa cuál de los números se encuentra ubicado más hacia la derecha.' },
            { number: 3, title: 'Concluye', desc: 'El número que está a la derecha siempre es el mayor, sin importar sus signos.' }
          ]
        };
      }

      // Asegurar ideas de síntesis
      if (!cloned.summaryIdeas || cloned.summaryIdeas.length === 0) {
        cloned.summaryIdeas = [
          ['1 · El cero como origen', 'En la recta numérica, el cero se ubica en el centro y actúa como punto de referencia que separa positivos de negativos.'],
          ['2 · Orientación de los signos', 'Los números positivos se ordenan a la derecha aumentando su valor, y los negativos a la izquierda alejándose del cero.'],
          ['3 · Criterio de orden universal', 'Todo número ubicado a la derecha de otro en la recta numérica es mayor que él.']
        ];
      }

      setLessonData(cloned);
      return;
    }

    // 2. Fallback: Paquete inyectado o generado dinámicamente
    const pkg = getInjectedPackage(selectedGrade, selectedSubject, currentOA.oa);
    if (pkg) {
      const foundLesson = pkg.lessons.find((l) => l.num === selectedLessonNum);
      if (foundLesson) {
        const adapted = adaptGeneratorLessonToPlayer(
          foundLesson,
          { curso: selectedGrade, asignatura: selectedSubject, oa: currentOA.oa, titulo: currentOA.descripcion },
          totalLessons
        );
        setLessonData(JSON.parse(JSON.stringify(adapted)));
        return;
      }
    }

    const generatedPkg = generateOAPackage(currentOA, totalLessons);
    const targetLesson =
      generatedPkg.lessons.find((l) => l.num === selectedLessonNum) || generatedPkg.lessons[0];

    if (targetLesson) {
      const adapted = adaptGeneratorLessonToPlayer(
        targetLesson,
        { curso: selectedGrade, asignatura: selectedSubject, oa: currentOA.oa, titulo: currentOA.descripcion },
        totalLessons
      );
      setLessonData(JSON.parse(JSON.stringify(adapted)));
    }
  }, [currentOA, selectedGrade, selectedSubject, selectedLessonNum, totalLessons]);

  useEffect(() => {
    initializeInjectedLessons()
      .then(() => {
        loadLesson();
      })
      .catch((err) => {
        console.error('Error inicializando repositorio inyectado:', err);
        loadLesson();
      });
  }, [loadLesson]);

  // Guardar cambios directamente en el almacenamiento unificado de aula
  const handleSaveLesson = () => {
    if (!lessonData || !currentOA) return;

    saveCustomPlayerLesson(
      selectedGrade,
      selectedSubject,
      currentOA.oa,
      selectedLessonNum,
      lessonData
    );

    // Sincronizar en paralelo paquete para compatibilidad retroactiva
    try {
      const genLesson = adaptPlayerLessonToGenerator(lessonData);
      saveCustomLessonData(
        selectedGrade,
        selectedSubject,
        currentOA.oa,
        currentOA.id,
        genLesson,
        totalLessons
      );
    } catch (e) {
      console.warn('Error sincronizando paquete generator:', e);
    }

    setIsCustom(true);
    setSaveStatus('Lección guardada con éxito en almacenamiento persistente.');
    setTimeout(() => setSaveStatus(null), 3500);
  };

  // Restablecer a versión oficial canónica
  const handleResetLesson = () => {
    if (!currentOA) return;
    if (window.confirm('¿Deseas descartar todas las modificaciones y volver a la versión de fábrica?')) {
      resetCustomPlayerLesson(selectedGrade, selectedSubject, currentOA.oa, selectedLessonNum);
      resetCustomLessonData(selectedGrade, selectedSubject, currentOA.oa, selectedLessonNum);
      setIsCustom(false);
      loadLesson();
      setSaveStatus('Lección restablecida a su versión canónica original.');
      setTimeout(() => setSaveStatus(null), 3500);
    }
  };

  // Probar la lección en vivo en el aula sincronizada con paso directo de LessonData
  const handleTestInLivePlayer = () => {
    if (!lessonData || !currentOA) return;
    handleSaveLesson();
    setActiveSynchronizedLesson(lessonData);
    setViewMode('lesson');
  };

  // Descargar solo el prompt en archivo .txt
  const handleDownloadPrompt = () => {
    if (!lessonData || !currentOA) return;
    downloadLessonPromptFile(lessonData);
  };

  // Generar y descargar DOCX en formato Cuadernillo Doble
  const handleDownloadDocx = async () => {
    if (!lessonData || !currentOA) return;
    setIsExportingDocx(true);

    try {
      const blob = await exportSingleLessonToDocx(lessonData);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `StudioSimple_Cuadernillo_${currentOA.asignatura.replace(/[\s,]/g, '_')}_${currentOA.curso.replace(/[\s°]/g, '')}_${currentOA.oa}_Clase0${selectedLessonNum}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error al exportar DOCX:', err);
      alert('Hubo un error al generar el archivo DOCX.');
    } finally {
      setIsExportingDocx(false);
    }
  };

  // Exportar JSON nativo de la lección
  const handleExportJson = () => {
    if (!lessonData || !currentOA) return;
    const jsonStr = JSON.stringify(lessonData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Leccion_${currentOA.id}_Clase0${selectedLessonNum}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copiar Prompts de ChatGPT Work al portapapeles
  const handleCopyPrompt = async (type: 'hook' | 'explicativo') => {
    if (!lessonData || !currentOA) return;

    let text = '';
    if (type === 'hook') {
      text = buildHookPromptText(
        selectedSubject,
        currentOA.oa,
        selectedLessonNum,
        lessonData.metadata.lessonTitle,
        lessonData.hook.slides || []
      );
    } else {
      text = buildExplicativoPromptText(
        selectedSubject,
        currentOA.oa,
        selectedLessonNum,
        lessonData.metadata.lessonTitle,
        lessonData.formalization.slides || []
      );
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(type);
      setTimeout(() => setCopyFeedback(null), 3000);
    } catch {
      alert('No se pudo copiar al portapapeles.');
    }
  };

  if (!lessonData || !currentOA) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <Clock className="w-8 h-8 text-[#12A1A4] mx-auto animate-spin" />
        <p className="text-sm font-bold text-slate-700">Cargando editor de lección...</p>
      </div>
    );
  }

  const activeStepMeta = SIDEBAR_STEPS.find((s) => s.id === activeStepId) || SIDEBAR_STEPS[0];

  return (
    <div className="space-y-6 pb-20 font-sans text-slate-900">
      {/* 1. CABECERA PRINCIPAL Y SELECTORES JERÁRQUICOS */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#EE751C]/15 text-[#EE751C] flex items-center justify-center font-bold">
                <BookOpenCheck size={18} />
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                Editor Canónico de Lecciones
              </h1>
              {isCustom ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-50 text-amber-800 border border-amber-300">
                  Modificada por Mentor
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-teal-50 text-[#12A1A4] border border-teal-200">
                  Canónica Oficial
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Personaliza los 8 pasos pedagógicos con isomorfismo total del aula interactiva y el generador DOCX.
            </p>
          </div>

          {/* Botones de Acción Rápida */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSaveLesson}
              className="px-4 py-2.5 rounded-xl bg-[#EE751C] hover:bg-[#d96512] text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#EE751C]/20 transition-all cursor-pointer"
            >
              <Save size={15} />
              <span>Guardar Cambios</span>
            </button>

            <button
              type="button"
              onClick={handleTestInLivePlayer}
              className="px-4 py-2.5 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-[#12A1A4]/20 transition-all cursor-pointer"
            >
              <Eye size={15} />
              <span>Probar en Aula</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPrompt}
              className="px-3.5 py-2.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              title="Descargar Guion y Prompts de Video Anime 16:9 en archivo .txt"
            >
              <FileText size={14} />
              <span>Descargar Prompt (.txt)</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadDocx}
              disabled={isExportingDocx}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <Download size={14} />
              <span>{isExportingDocx ? 'Generando...' : 'Descargar DOCX'}</span>
            </button>

            <button
              type="button"
              onClick={handleExportJson}
              className="px-3 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Exportar archivo JSON"
            >
              <FileCode size={14} />
              <span>JSON</span>
            </button>

            {isCustom && (
              <button
                type="button"
                onClick={handleResetLesson}
                className="px-3 py-2.5 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Descartar personalizaciones y restaurar lección de fábrica"
              >
                <RotateCcw size={14} />
                <span>Restablecer</span>
              </button>
            )}
          </div>
        </div>

        {/* Notificación de Guardado */}
        {saveStatus && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>{saveStatus}</span>
          </div>
        )}

        {/* Selector Jerárquico */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-1">
          {/* Nivel / Curso */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
              1. Nivel / Curso
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-[#EE751C]"
            >
              {ALL_GRADE_LEVELS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Asignatura */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
              2. Asignatura Troncal
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-[#EE751C]"
            >
              {ALL_SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Objetivo de Aprendizaje */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
              3. Objetivo (OA Oficial)
            </label>
            <select
              value={currentOA.id}
              onChange={(e) => setSelectedOAId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-[#EE751C]"
            >
              {availableOAs.map((oa) => (
                <option key={oa.id} value={oa.id}>
                  {oa.oa} - {oa.descripcion.slice(0, 45)}...
                </option>
              ))}
            </select>
          </div>

          {/* Selector de Clase */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">
              4. Clase / Lección
            </label>
            <div className="flex gap-1">
              {Array.from({ length: totalLessons }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setSelectedLessonNum(num)}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    selectedLessonNum === num
                      ? 'bg-[#1C3257] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen del OA Seleccionado */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">{currentOA.oa}:</span>
            <span className="text-slate-600">{currentOA.descripcion}</span>
          </div>
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-500">
            Eje: {currentOA.eje}
          </span>
        </div>
      </div>

      {/* 2. ÁREA DE TRABAJO ISOMÓRFICA */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* BARRA LATERAL CANÓNICA DEL AULA */}
        <aside className="w-full lg:w-64 bg-[#1c3257] text-white p-5 rounded-3xl shadow-lg border border-slate-800 shrink-0 flex flex-col justify-between select-none">
          <div>
            {/* Cabecera de la Marca */}
            <div className="mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-[#f8ad22] flex items-center justify-center font-bold text-xs text-[#1c3257]">
                  ES
                </div>
                <span className="font-extrabold text-sm tracking-tight text-white">EstudioSimple</span>
              </div>
              <p className="text-[#b8c8dd] text-[10px] uppercase font-bold tracking-widest">
                {selectedSubject} : {currentOA.oa}
              </p>
              <h2 className="text-white text-base font-bold leading-tight mt-1">
                Clase {selectedLessonNum}
              </h2>
              <p className="text-[#9ab1ce] text-xs mt-1 leading-snug line-clamp-2">
                {lessonData.metadata.lessonTitle}
              </p>
            </div>

            {/* Cuadro de Progreso de la Sesión */}
            <div className="bg-white/10 rounded-2xl px-3.5 py-2.5 mb-4 border border-white/10">
              <span className="text-[#f8ad22] text-[10px] font-bold uppercase tracking-wider block">
                Progreso de la sesión
              </span>
              <p className="text-white text-xs font-semibold mt-0.5">
                {activeStepId === 'prep'
                  ? 'Preparación del Mentor'
                  : `Etapa ${SIDEBAR_STEPS.findIndex((s) => s.id === activeStepId)} de 8 · ${activeStepMeta.badgeLabel}`}
              </p>
            </div>

            {/* Lista de Pasos */}
            <nav className="space-y-1.5" aria-label="Pasos de la lección">
              {SIDEBAR_STEPS.map((step) => {
                const Icon = step.icon;
                const isActive = activeStepId === step.id;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStepId(step.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/15 text-white font-bold shadow-xs border border-white/20'
                        : 'text-[#9ab1ce] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                        isActive ? 'bg-[#EE751C] text-white shadow-xs' : 'bg-white/10 text-[#9ab1ce]'
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs truncate block">{step.name}</span>
                      <span className="text-[10px] text-[#718299] truncate block">
                        {step.badgeLabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Pie de Barra Lateral */}
          <div className="mt-8 pt-4 border-t border-white/10 text-center">
            <span className="text-[10px] text-[#718299] block">Duración estimada</span>
            <span className="text-xs font-bold text-white block mt-0.5">
              ~{lessonData.metadata.durationMinutes || 30} minutos
            </span>
          </div>
        </aside>

        {/* CANVAS EDITABLE PRINCIPAL */}
        <div className="flex-1 w-full bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
          {/* ===================== PASO PRE: ANTES DE COMENZAR ===================== */}
          {activeStepId === 'prep' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-50 text-[#12A1A4] border border-teal-200">
                  Pre-etapa Canónica
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 mt-2 flex items-center gap-2">
                  <GraduationCap className="text-[#12A1A4]" size={20} />
                  <span>Antes de comenzar (Preparación del Mentor)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Encuadre inicial privado para el mentor: objetivos, itinerario secuencial, recordatorios y clima emocional.
                </p>
              </div>

              {/* Metadatos Generales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Título de la Clase (metadata.lessonTitle)
                  </label>
                  <input
                    type="text"
                    value={lessonData.metadata.lessonTitle}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        metadata: { ...lessonData.metadata, lessonTitle: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-hidden focus:border-[#EE751C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Duración Estimada en Minutos (metadata.durationMinutes)
                  </label>
                  <input
                    type="number"
                    value={lessonData.metadata.durationMinutes || 30}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        metadata: { ...lessonData.metadata, durationMinutes: parseInt(e.target.value, 10) || 30 }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-[#EE751C]"
                  />
                </div>
              </div>

              {/* TARJETAS DE ENCUADRE DEL AULA */}
              <div className="space-y-4 pt-2">
                {/* 1. TU OBJETIVO */}
                <div className="w-full bg-white border-l-4 border-l-[#38a169] p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
                  <strong className="text-[#38a169] text-xs uppercase tracking-wider font-bold block">
                    TU OBJETIVO (Objetivo para el Adulto / Mentor)
                  </strong>
                  <p className="text-[11px] text-slate-500">
                    Propósito pedagógico clave que el mentor debe propiciar durante la interacción.
                  </p>
                  <textarea
                    rows={3}
                    value={lessonData.prep.adultObjective}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        prep: { ...lessonData.prep, adultObjective: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-[#38a169]"
                  />
                </div>

                <div className="flex justify-center text-slate-400">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* 2. RUTA DE HOY */}
                <div className="w-full bg-white border-l-4 border-l-[#dd6b20] p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-[#dd6b20] text-xs uppercase tracking-wider font-bold block">
                      RUTA DE HOY (Itinerario Secuencial del Día)
                    </strong>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      Tarjeta Independiente de Encuadre
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Secuencia visible en la tarjeta "Ruta de hoy" en la etapa previa. Diferenciada del Foco Didáctico de la clase.
                  </p>
                  <textarea
                    rows={2}
                    value={lessonData.prep.routeToday || 'Introducción → conexión inicial → situación problema → conversación guiada → explicación formal → práctica guiada → resumen → miniquiz → cierre.'}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        prep: { ...lessonData.prep, routeToday: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-[#dd6b20]"
                  />
                </div>

                <div className="flex justify-center text-slate-400">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* 3. RECORDATORIOS DEL MENTOR */}
                <div className="w-full bg-white border-l-4 border-l-[#12a1a4] p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-[#12a1a4] text-xs uppercase tracking-wider font-bold block">
                        RECORDATORIOS METODOLÓGICOS DEL MENTOR (Lista ¡RECUERDA!)
                      </strong>
                      <p className="text-[11px] text-slate-500">
                        Normas directas de acompañamiento en voz alta para evitar sobrecarga y lecturas innecesarias.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setLessonData({
                          ...lessonData,
                          prep: { ...lessonData.prep, reminders: defaultReminders }
                        });
                      }}
                      className="text-[11px] font-bold text-teal-700 hover:underline px-2 py-1 rounded-md bg-teal-50 border border-teal-200"
                    >
                      Restablecer Oficiales
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(lessonData.prep.reminders || defaultReminders).map((rem, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 w-4 text-right">
                          {rIdx + 1}.
                        </span>
                        <input
                          type="text"
                          value={rem}
                          onChange={(e) => {
                            const updated = [...(lessonData.prep.reminders || defaultReminders)];
                            updated[rIdx] = e.target.value;
                            setLessonData({
                              ...lessonData,
                              prep: { ...lessonData.prep, reminders: updated }
                            });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-[#12a1a4]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (lessonData.prep.reminders || defaultReminders).filter((_, i) => i !== rIdx);
                            setLessonData({
                              ...lessonData,
                              prep: { ...lessonData.prep, reminders: updated }
                            });
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const current = lessonData.prep.reminders || defaultReminders;
                        setLessonData({
                          ...lessonData,
                          prep: { ...lessonData.prep, reminders: [...current, 'Nuevo recordatorio metodológico...'] }
                        });
                      }}
                      className="text-xs font-bold text-[#12A1A4] hover:underline flex items-center gap-1 mt-2 cursor-pointer"
                    >
                      <Plus size={13} />
                      <span>Añadir Recordatorio</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-center text-slate-400">
                  <ArrowDown className="w-4 h-4" />
                </div>

                {/* 4. CLIMA EMOCIONAL */}
                <div className="w-full bg-white border-l-4 border-l-[#d69e2e] p-5 rounded-2xl shadow-sm border border-slate-200 space-y-2">
                  <strong className="text-[#b7791f] text-xs uppercase tracking-wider font-bold block">
                    CLIMA EMOCIONAL Y ACOGIDA DEL MENTOR (prep.emotionalTip)
                  </strong>
                  <p className="text-[11px] text-slate-500">
                    Recomendación socioemocional para garantizar un entorno de aprendizaje seguro y libre de presión.
                  </p>
                  <textarea
                    rows={2}
                    value={lessonData.prep.emotionalTip || ''}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        prep: { ...lessonData.prep, emotionalTip: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-[#d69e2e]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ===================== PASO 1: INICIO (4 SUB-ETAPAS ISOMÓRFICAS) ===================== */}
          {activeStepId === 'paso1_inicio' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-50 text-[#EE751C] border border-orange-200">
                  Etapa 1 de 8
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 mt-2 flex items-center gap-2">
                  <Compass className="text-[#EE751C]" size={20} />
                  <span>Paso 1: Inicio (Ruta de la Asignatura, La Clase de Hoy y Situación Inicial)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Desglosado en las 4 pantallas secuenciales del aula interactiva para garantizar isomorfismo pedagógico absoluto y evitar colisiones conceptuales.
                </p>
              </div>

              {/* SUB-ETAPA 1: NUESTRA RUTA DE LA ASIGNATURA (routeOverview) */}
              <div className="bg-white border-l-4 border-l-[#1c3257] rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs tracking-wider uppercase text-[#1c3257] block">
                    SUB-ETAPA 1: NUESTRA RUTA DE LA ASIGNATURA (Pantalla 1 del Aula - routeOverview)
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    Apertura Curricular
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Texto que el mentor lee en voz alta al abrir la clase para situar al estudiante en los 4 grandes bloques de la disciplina.
                </p>

                <div>
                  <label className="block text-[11px] font-bold text-[#1c3257] uppercase mb-1">
                    DILE AL ESTUDIANTE: Apertura de la Ruta (route.dileIntro)
                  </label>
                  <textarea
                    rows={2}
                    value={lessonData.route.dileIntro}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        route: { ...lessonData.route, dileIntro: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-[#1c3257]"
                  />
                </div>

                {/* Los 4 Bloques Temáticos de la Asignatura */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      Los 4 Bloques Temáticos de la Asignatura (route.blocks - Pantalla Alumno)
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      Editables directamente para cada disciplina
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {(lessonData.route.blocks || []).map((block, bIdx) => (
                      <div
                        key={block.id || bIdx}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2 shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={block.number}
                            onChange={(e) => {
                              const updated = [...(lessonData.route.blocks || [])];
                              updated[bIdx] = { ...updated[bIdx], number: e.target.value };
                              setLessonData({
                                ...lessonData,
                                route: { ...lessonData.route, blocks: updated }
                              });
                            }}
                            className="w-12 px-1.5 py-0.5 rounded-md border border-slate-300 text-[10px] font-black uppercase text-slate-700 bg-white"
                          />
                          <span className="text-[9px] font-bold uppercase text-slate-400">
                            Bloque {bIdx + 1}
                          </span>
                        </div>

                        <div>
                          <label className="block text-[9px] font-black uppercase text-slate-500 mb-0.5">
                            Título del Bloque
                          </label>
                          <input
                            type="text"
                            value={block.title}
                            onChange={(e) => {
                              const updated = [...(lessonData.route.blocks || [])];
                              updated[bIdx] = { ...updated[bIdx], title: e.target.value };
                              setLessonData({
                                ...lessonData,
                                route: { ...lessonData.route, blocks: updated }
                              });
                            }}
                            className="w-full px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-black uppercase text-slate-500 mb-0.5">
                            Subtítulo / Contenidos
                          </label>
                          <input
                            type="text"
                            value={block.subtitle}
                            onChange={(e) => {
                              const updated = [...(lessonData.route.blocks || [])];
                              updated[bIdx] = { ...updated[bIdx], subtitle: e.target.value };
                              setLessonData({
                                ...lessonData,
                                route: { ...lessonData.route, blocks: updated }
                              });
                            }}
                            className="w-full px-2 py-1 rounded-lg border border-slate-300 text-[11px] text-slate-600 bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SUB-ETAPA 2: LA CLASE DE HOY (routeToday) */}
              <div className="bg-white border-l-4 border-l-[#ee751c] rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs tracking-wider uppercase text-[#ee751c] block">
                    SUB-ETAPA 2: LA CLASE DE HOY (Pantalla 2 del Aula - routeToday)
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-orange-50 text-[#ee751c] border border-orange-200">
                    Foco Didáctico y 3 Tarjetas
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  El mentor lee el foco en voz alta mientras el estudiante visualiza las 3 tarjetas de foco en su pantalla.
                </p>

                {/* DILE: Foco Didáctico */}
                <div>
                  <label className="block text-[11px] font-bold text-[#ee751c] uppercase mb-1">
                    DILE AL ESTUDIANTE: FOCO DIDÁCTICO DISCIPLINAR (route.dileObjective)
                  </label>
                  <textarea
                    rows={3}
                    value={lessonData.route.dileObjective}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        route: { ...lessonData.route, dileObjective: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-[#ee751c]"
                  />
                </div>

                {/* Las 3 Tarjetas de Foco */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <strong className="text-xs uppercase tracking-wider text-slate-700 block">
                        3 TARJETAS DE FOCO (Pantalla del Alumno - route.keyQuestions)
                      </strong>
                      <p className="text-[11px] text-slate-500">
                        Los tres conceptos o metas que el estudiante lee y examina visualmente en su pantalla.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {(lessonData.route.keyQuestions || []).map((kq, kqIdx) => (
                      <div
                        key={kqIdx}
                        className="p-3.5 rounded-2xl border-2 border-orange-200 bg-orange-50/40 space-y-2 shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-md bg-orange-100 text-[#ee751c] text-[10px] font-extrabold uppercase">
                            Tarjeta {kqIdx + 1}
                          </span>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 mb-0.5">
                            Título de la Tarjeta
                          </label>
                          <input
                            type="text"
                            value={kq.label}
                            onChange={(e) => {
                              const updated = [...(lessonData.route.keyQuestions || [])];
                              updated[kqIdx] = { ...updated[kqIdx], label: e.target.value };
                              setLessonData({
                                ...lessonData,
                                route: { ...lessonData.route, keyQuestions: updated }
                              });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-black text-slate-800 bg-white focus:outline-hidden focus:border-[#ee751c]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 mb-0.5">
                            Subtítulo / Idea Clave
                          </label>
                          <input
                            type="text"
                            value={kq.sub}
                            onChange={(e) => {
                              const updated = [...(lessonData.route.keyQuestions || [])];
                              updated[kqIdx] = { ...updated[kqIdx], sub: e.target.value };
                              setLessonData({
                                ...lessonData,
                                route: { ...lessonData.route, keyQuestions: updated }
                              });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-[11px] text-slate-600 bg-white focus:outline-hidden focus:border-[#ee751c]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SUB-ETAPA 3: SITUACIÓN INICIAL DE EXPLORACIÓN (situation / thermo) */}
              <div className="bg-white border-l-4 border-l-[#10b981] rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs tracking-wider uppercase text-[#10b981] block">
                    SUB-ETAPA 3: SITUACIÓN INICIAL DE EXPLORACIÓN (Pantalla 3 del Aula - situation / thermo)
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Situación Detonante
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Desafío socrático inicial que activa la intuición del estudiante en la escala o gráfico antes de formalizar.
                </p>

                {/* DILE de la Situación Inicial */}
                <div>
                  <label className="block text-[11px] font-bold text-[#10b981] uppercase mb-1">
                    DILE AL ESTUDIANTE: SITUACIÓN INICIAL DETONANTE (situation.dilePrompt)
                  </label>
                  <textarea
                    rows={3}
                    value={lessonData.situation.dilePrompt}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        situation: { ...lessonData.situation, dilePrompt: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-[#10b981]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#e8edf3] border border-[#d2dbe5] rounded-2xl p-4 shadow-sm space-y-1.5">
                    <span className="text-[#687589] text-xs font-bold uppercase tracking-wider block">
                      Respuesta Esperada a la Situación (situation.expectedAnswer)
                    </span>
                    <input
                      type="text"
                      value={lessonData.situation.expectedAnswer}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          situation: { ...lessonData.situation, expectedAnswer: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-[#1c3257] bg-white focus:outline-hidden"
                    />
                  </div>

                  <div className="bg-[#fff7db] border border-[#f0d372] text-[#5a4704] rounded-2xl p-4 flex items-start gap-3 text-xs">
                    <Info className="w-5 h-5 text-[#956b00] shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <strong className="text-[#956b00] block text-xs uppercase tracking-wider">
                        Solo para ti (Pista Socrática del Mentor - situation.socraticHint)
                      </strong>
                      <input
                        type="text"
                        value={lessonData.situation.socraticHint}
                        onChange={(e) =>
                          setLessonData({
                            ...lessonData,
                            situation: { ...lessonData.situation, socraticHint: e.target.value }
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl border border-[#f0d372] text-xs bg-white text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Clima Emocional de la Situación */}
                <div className="bg-emerald-50/60 border border-emerald-200 text-emerald-950 rounded-2xl p-4 flex items-start gap-3 text-xs">
                  <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <strong className="text-emerald-800 block text-xs uppercase tracking-wider">
                      Clima Emocional / Recomendación al Mentor (situation.emotionalTip)
                    </strong>
                    <input
                      type="text"
                      value={lessonData.situation.emotionalTip}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          situation: { ...lessonData.situation, emotionalTip: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl border border-emerald-300 text-xs bg-white text-slate-800 font-medium"
                    />
                  </div>
                </div>

                {/* Opciones de Retroalimentación de la Situación */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Opciones de Respuesta Formativa del Mentor (situation.options)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const currentOpts = lessonData.situation.options || [];
                        const newOpt = {
                          label: 'Nueva alternativa observada',
                          kind: 'needs_support' as const,
                          feedbackText: 'Explícale con calma...'
                        };
                        setLessonData({
                          ...lessonData,
                          situation: {
                            ...lessonData.situation,
                            options: [...currentOpts, newOpt]
                          }
                        });
                      }}
                      className="text-xs font-bold text-[#10b981] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Añadir Opción</span>
                    </button>
                  </div>

                  {(lessonData.situation.options || []).map((opt, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-extrabold uppercase text-slate-500">
                          Opción {idx + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <select
                            value={opt.kind}
                            onChange={(e) => {
                              const updated = [...(lessonData.situation.options || [])];
                              updated[idx] = { ...updated[idx], kind: e.target.value as any };
                              setLessonData({
                                ...lessonData,
                                situation: { ...lessonData.situation, options: updated }
                              });
                            }}
                            className="px-2 py-1 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700"
                          >
                            <option value="correct">Acierto (correct)</option>
                            <option value="needs_support">Requiere Apoyo (needs_support)</option>
                            <option value="no_answer">Sin Respuesta / Duda (no_answer)</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => {
                              const updated = (lessonData.situation.options || []).filter((_, i) => i !== idx);
                              setLessonData({
                                ...lessonData,
                                situation: { ...lessonData.situation, options: updated }
                              });
                            }}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded-md cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={opt.label}
                        onChange={(e) => {
                          const updated = [...(lessonData.situation.options || [])];
                          updated[idx] = { ...updated[idx], label: e.target.value };
                          setLessonData({
                            ...lessonData,
                            situation: { ...lessonData.situation, options: updated }
                          });
                        }}
                        placeholder="Lo que respondió o manifestó el estudiante..."
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                      />

                      <textarea
                        rows={2}
                        value={opt.feedbackText}
                        onChange={(e) => {
                          const updated = [...(lessonData.situation.options || [])];
                          updated[idx] = { ...updated[idx], feedbackText: e.target.value };
                          setLessonData({
                            ...lessonData,
                            situation: { ...lessonData.situation, options: updated }
                          });
                        }}
                        placeholder="Retroalimentación formativa inmediata..."
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* SUB-ETAPA 4: COMPRENDAMOS LA RESPUESTA (reference / thermoMeaning) */}
              <div className="bg-white border-l-4 border-l-[#12a1a4] rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs tracking-wider uppercase text-[#12a1a4] block">
                    SUB-ETAPA 4: COMPRENDAMOS LA RESPUESTA (Pantalla 4 del Aula - reference / thermoMeaning)
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-teal-50 text-[#12a1a4] border border-teal-200">
                    Comprensión y Punto de Referencia
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Pantalla donde el mentor formaliza el significado del punto de referencia central y le hace una pregunta específica al estudiante.
                </p>

                {/* DILE de formalización del punto de referencia */}
                <div>
                  <label className="block text-[11px] font-bold text-[#12a1a4] uppercase mb-1">
                    DILE AL ESTUDIANTE: FORMALIZACIÓN DEL PUNTO DE REFERENCIA (reference.dilePrompt)
                  </label>
                  <textarea
                    rows={2}
                    value={lessonData.reference.dilePrompt}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        reference: { ...lessonData.reference, dilePrompt: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-[#12a1a4]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-l-4 border-l-[#12a1a4] rounded-2xl p-4 shadow-sm border border-slate-200 space-y-1.5">
                    <span className="font-bold text-xs tracking-wider uppercase text-[#12a1a4] block">
                      PREGÚNTALE AL ESTUDIANTE (reference.question)
                    </span>
                    <textarea
                      rows={2}
                      value={lessonData.reference.question}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          reference: { ...lessonData.reference, question: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-hidden focus:border-[#12a1a4]"
                    />
                  </div>

                  <div className="bg-[#e8edf3] border border-[#d2dbe5] rounded-2xl p-4 shadow-sm space-y-1.5">
                    <span className="text-[#687589] text-xs font-bold uppercase tracking-wider block">
                      Respuesta Esperada a la Pregunta (reference.expectedAnswer)
                    </span>
                    <textarea
                      rows={2}
                      value={lessonData.reference.expectedAnswer}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          reference: { ...lessonData.reference, expectedAnswer: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-[#1c3257] bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Pista Socrática */}
                <div className="bg-[#fff7db] border border-[#f0d372] text-[#5a4704] rounded-2xl p-4 flex items-start gap-3 text-xs">
                  <Info className="w-5 h-5 text-[#956b00] shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <strong className="text-[#956b00] block text-xs uppercase tracking-wider">
                      Solo para ti (Pista Socrática - reference.socraticHint)
                    </strong>
                    <input
                      type="text"
                      value={lessonData.reference.socraticHint}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          reference: { ...lessonData.reference, socraticHint: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl border border-[#f0d372] text-xs bg-white text-slate-800"
                    />
                  </div>
                </div>

                {/* Retroalimentaciones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-l-4 border-l-[#4a964e] rounded-xl p-3 border border-slate-200">
                    <label className="block text-[11px] font-bold text-[#4a964e] uppercase mb-1">
                      DILE si acierta (reference.feedbackSuccess)
                    </label>
                    <textarea
                      rows={2}
                      value={lessonData.reference.feedbackSuccess}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          reference: { ...lessonData.reference, feedbackSuccess: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800"
                    />
                  </div>

                  <div className="bg-white border-l-4 border-l-[#d97706] rounded-xl p-3 border border-slate-200">
                    <label className="block text-[11px] font-bold text-[#d97706] uppercase mb-1">
                      DILE si necesita apoyo (reference.feedbackSupport)
                    </label>
                    <textarea
                      rows={2}
                      value={lessonData.reference.feedbackSupport}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          reference: { ...lessonData.reference, feedbackSupport: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== PASO 2: VIDEO MOTIVACIONAL ===================== */}
          {activeStepId === 'paso2_hook' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                    Etapa 2 de 8
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 mt-2 flex items-center gap-2">
                    <Film className="text-[#8B5CF6]" size={20} />
                    <span>Paso 2: Video Motivacional (Desafío Audiovisual)</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Enlace de video en Cloudflare (Stream / R2), 3 puntos de foco del estudiante, reproductor y ficha técnica de 7 láminas.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyPrompt('hook')}
                  className="px-3.5 py-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copyFeedback === 'hook' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{copyFeedback === 'hook' ? 'Prompt Copiado!' : 'Copiar Prompt ChatGPT Work'}</span>
                </button>
              </div>

              {/* TARJETA DESTACADA: VIDEO OFICIAL EN CLOUDFLARE */}
              <div className="p-5 rounded-2xl border-2 border-purple-200 bg-purple-50/40 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm">
                      <Video size={16} />
                    </span>
                    <div>
                      <h3 className="text-xs font-black uppercase text-slate-900">
                        Video Motivacional Oficial (Cloudflare Stream / R2)
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Recurso audiovisual principal que reproducirá el estudiante en el aula interactiva.
                      </p>
                    </div>
                  </div>

                  {lessonData.hook.videoSrc ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      <span>Video Conectado y Reproducible</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-[11px] font-bold">
                      Sin Video Vinculado
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">
                        URL de Video en Cloudflare (.mp4 o streaming)
                      </label>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            const base = 'https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/';
                            const cur = lessonData.hook.videoSrc || '';
                            if (!cur.startsWith(base)) {
                              setLessonData({
                                ...lessonData,
                                hook: {
                                  ...lessonData.hook,
                                  videoSrc: `${base}${cur.replace(/^https?:\/\/[^/]+\//, '')}`
                                }
                              });
                            }
                          }}
                          className="text-[10px] font-black text-purple-700 hover:underline px-1.5 py-0.5 rounded-md bg-purple-100 cursor-pointer"
                          title="Insertar prefijo del bucket público Cloudflare R2"
                        >
                          + Base R2
                        </button>
                        {lessonData.hook.videoSrc && (
                          <button
                            type="button"
                            onClick={() => {
                              setLessonData({
                                ...lessonData,
                                hook: { ...lessonData.hook, videoSrc: '' }
                              });
                            }}
                            className="text-[10px] font-bold text-rose-600 hover:underline cursor-pointer"
                          >
                            Limpiar
                          </button>
                        )}
                      </div>
                    </div>
                    <input
                      type="text"
                      value={lessonData.hook.videoSrc || ''}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          hook: {
                            ...lessonData.hook,
                            videoSrc: e.target.value
                          }
                        })
                      }
                      placeholder="https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white focus:outline-hidden focus:border-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Título del Video
                    </label>
                    <input
                      type="text"
                      value={lessonData.hook.title || lessonData.hook.titulo || ''}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          hook: {
                            ...lessonData.hook,
                            title: e.target.value,
                            titulo: e.target.value
                          }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                    />
                  </div>
                </div>

                {/* Reproductor de Video en Vivo */}
                {lessonData.hook.videoSrc ? (
                  <div className="rounded-2xl overflow-hidden border border-purple-200 bg-black aspect-video max-h-72 flex items-center justify-center shadow-inner">
                    <video
                      src={lessonData.hook.videoSrc}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl border-2 border-dashed border-purple-200 bg-white/70 flex flex-col items-center justify-center text-center">
                    <Video size={28} className="text-purple-400 mb-2" />
                    <p className="text-xs font-bold text-slate-700">Sin video motivacional asignado</p>
                    <p className="text-[11px] text-slate-500 max-w-sm mt-0.5">
                      Pega la URL de Cloudflare Stream o Cloudflare R2 arriba para verificar de inmediato la reproducción en este visor.
                    </p>
                  </div>
                )}

                {/* PUNTOS DE FOCO DEL ALUMNO (Mientras observas, fíjate en...) */}
                <div className="bg-white border-l-4 border-l-[#8B5CF6] rounded-xl p-4 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-[#8B5CF6] text-xs uppercase tracking-wider font-bold block">
                        3 PUNTOS DE FOCO VISUAL DEL ALUMNO (hook.focusPoints)
                      </strong>
                      <p className="text-[11px] text-slate-500">
                        Los 3 elementos clave que el estudiante ve en su pantalla antes de iniciar la reproducción: "Mientras observas, fíjate en..."
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {(lessonData.hook.focusPoints || []).map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold flex items-center justify-center shrink-0">
                          {pIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={pt}
                          onChange={(e) => {
                            const updated = [...(lessonData.hook.focusPoints || [])];
                            updated[pIdx] = e.target.value;
                            setLessonData({
                              ...lessonData,
                              hook: { ...lessonData.hook, focusPoints: updated }
                            });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (lessonData.hook.focusPoints || []).filter((_, i) => i !== pIdx);
                            setLessonData({
                              ...lessonData,
                              hook: { ...lessonData.hook, focusPoints: updated }
                            });
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-md cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const current = lessonData.hook.focusPoints || [];
                        setLessonData({
                          ...lessonData,
                          hook: { ...lessonData.hook, focusPoints: [...current, 'Nuevo punto de observación...'] }
                        });
                      }}
                      className="text-xs font-bold text-[#8B5CF6] hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                    >
                      <Plus size={13} />
                      <span>Añadir Punto de Foco</span>
                    </button>
                  </div>
                </div>

                {/* DILE Antes, Instrucción y DILE Después */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="bg-white border-l-4 border-l-[#ee751c] rounded-xl p-3.5 border border-slate-200">
                    <label className="block text-[11px] font-bold text-[#ee751c] uppercase tracking-wider mb-1">
                      DILE antes de reproducir el video
                    </label>
                    <textarea
                      rows={2}
                      value={lessonData.hook.dileIntro || ''}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          hook: { ...lessonData.hook, dileIntro: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800"
                    />
                  </div>

                  <div className="bg-white border-l-4 border-l-[#8B5CF6] rounded-xl p-3.5 border border-slate-200">
                    <label className="block text-[11px] font-bold text-[#8B5CF6] uppercase tracking-wider mb-1">
                      INSTRUCCIÓN AL ESTUDIANTE (hazInstruction)
                    </label>
                    <textarea
                      rows={2}
                      value={lessonData.hook.hazInstruction || ''}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          hook: { ...lessonData.hook, hazInstruction: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800"
                    />
                  </div>

                  <div className="bg-white border-l-4 border-l-[#12a1a4] rounded-xl p-3.5 border border-slate-200">
                    <label className="block text-[11px] font-bold text-[#12a1a4] uppercase tracking-wider mb-1">
                      DILE después del video
                    </label>
                    <textarea
                      rows={2}
                      value={lessonData.hook.dileAfterVideo || ''}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          hook: { ...lessonData.hook, dileAfterVideo: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Ficha Técnica de las 7 Diapositivas */}
              <div className="space-y-4 pt-2">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-2">
                    <Layers size={15} className="text-purple-600" />
                    <span>Ficha Técnica y Verificación de Guion (7 Diapositivas Anime)</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Contrasta si las escenas del video en Cloudflare corresponden al guion y personajes oficiales.
                  </p>
                </div>

                {(lessonData.hook.slides || []).map((slide, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/80 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-purple-700 uppercase">
                        Slide {slide.slideNumber}: {slide.tituloMomento}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {slide.duracionSeg} seg aprox.
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-extrabold text-slate-700 flex items-center gap-1.5">
                          <ImageIcon size={13} className="text-purple-600" />
                          <span>Imagen de la Lámina</span>
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={slide.imageUrl || ''}
                          onChange={(e) => {
                            const updated = [...(lessonData.hook.slides || [])];
                            updated[sIdx].imageUrl = e.target.value;
                            setLessonData({
                              ...lessonData,
                              hook: { ...lessonData.hook, slides: updated }
                            });
                          }}
                          placeholder="https://pub-...r2.dev/slide1.png o /visuals/..."
                          className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono bg-slate-50 focus:bg-white"
                        />
                        {slide.imageUrl && (
                          <a
                            href={slide.imageUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-purple-700 hover:text-purple-900 p-1.5 rounded-lg border border-purple-200 bg-purple-50 flex items-center gap-1 text-[11px] font-bold shrink-0"
                            title="Ver imagen completa"
                          >
                            <ExternalLink size={13} />
                            <span>Ver</span>
                          </a>
                        )}
                      </div>

                      {slide.imageUrl && (
                        <div className="pt-1 flex items-center gap-3">
                          <img
                            src={slide.imageUrl}
                            alt={`Slide ${slide.slideNumber}`}
                            className="w-28 h-16 object-cover rounded-lg border border-slate-200 shadow-xs"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <span className="text-[10px] text-slate-500 italic">
                            Vista previa de la lámina vinculada a este momento.
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                          Overlay en Pantalla
                        </label>
                        <input
                          type="text"
                          value={slide.overlayText}
                          onChange={(e) => {
                            const updated = [...(lessonData.hook.slides || [])];
                            updated[sIdx].overlayText = e.target.value;
                            setLessonData({
                              ...lessonData,
                              hook: { ...lessonData.hook, slides: updated }
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                          Locución Oral (Notas al Orador TTS)
                        </label>
                        <input
                          type="text"
                          value={slide.speakerNotes}
                          onChange={(e) => {
                            const updated = [...(lessonData.hook.slides || [])];
                            updated[sIdx].speakerNotes = e.target.value;
                            setLessonData({
                              ...lessonData,
                              hook: { ...lessonData.hook, slides: updated }
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        Prompt de Imagen Anime Widescreen 16:9
                      </label>
                      <textarea
                        rows={2}
                        value={slide.visualPrompt}
                        onChange={(e) => {
                          const updated = [...(lessonData.hook.slides || [])];
                          updated[sIdx].visualPrompt = e.target.value;
                          setLessonData({
                            ...lessonData,
                            hook: { ...lessonData.hook, slides: updated }
                          });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== PASO 3: RECORRIDO Y CONVERSACIÓN SOCRÁTICA ===================== */}
          {activeStepId === 'paso3_recorrido' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-[#3B82F6] border border-blue-200">
                    Etapa 3 de 8
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 mt-2 flex items-center gap-2">
                    <MessageSquare className="text-[#3B82F6]" size={20} />
                    <span>Paso 3: Recorrido y Conversación Socrática Guiada</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Contexto de apertura y preguntas socráticas para elicitar deducciones inmediatas del video.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const currentList = lessonData.preQuestions || [];
                    const newItem: GuidedItem = {
                      context: `Momento ${currentList.length + 1}`,
                      question: '¿Qué observas en la situación?',
                      expected: 'Identificar el elemento principal.',
                      success: '¡Excelente deducción!',
                      support: 'Observa con atención el detalle...',
                      reveal: 'La respuesta exacta es...',
                      studentReveal: 'Respuesta clave...'
                    };
                    setLessonData({
                      ...lessonData,
                      preQuestions: [...currentList, newItem]
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Añadir Pregunta</span>
                </button>
              </div>

              {/* Contexto de Apertura de la Conversación Socrática */}
              <div className="bg-white border-l-4 border-l-[#3B82F6] rounded-2xl p-5 shadow-sm border border-slate-200 space-y-2">
                <span className="font-bold text-xs tracking-wider uppercase text-[#3B82F6] block">
                  DILE AL ESTUDIANTE: CONTEXTO DE APERTURA SOCRÁTICO (conversationContext)
                </span>
                <p className="text-[11px] text-slate-500">
                  Encuadre inicial que el mentor lee al abrir la conversación guiada previa a las preguntas.
                </p>
                <textarea
                  rows={2}
                  value={lessonData.conversationContext || ''}
                  onChange={(e) =>
                    setLessonData({
                      ...lessonData,
                      conversationContext: e.target.value
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-[#3B82F6]"
                />
              </div>

              <div className="space-y-5">
                {(lessonData.preQuestions || []).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-blue-700 uppercase">
                        Pregunta Guiada {idx + 1}: {item.context}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (lessonData.preQuestions || []).filter((_, i) => i !== idx);
                          setLessonData({ ...lessonData, preQuestions: updated });
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-md cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                          Momento / Contexto
                        </label>
                        <input
                          type="text"
                          value={item.context}
                          onChange={(e) => {
                            const updated = [...(lessonData.preQuestions || [])];
                            updated[idx].context = e.target.value;
                            setLessonData({ ...lessonData, preQuestions: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                        />
                      </div>

                      <div className="bg-white border-l-4 border-l-[#12a1a4] rounded-xl p-3 border border-slate-200">
                        <label className="block text-[11px] font-bold text-[#12a1a4] uppercase mb-0.5">
                          PREGÚNTALE AL ESTUDIANTE
                        </label>
                        <input
                          type="text"
                          value={item.question}
                          onChange={(e) => {
                            const updated = [...(lessonData.preQuestions || [])];
                            updated[idx].question = e.target.value;
                            setLessonData({ ...lessonData, preQuestions: updated });
                          }}
                          className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-[#e8edf3] border border-[#d2dbe5] rounded-xl p-3">
                        <label className="block text-[#687589] font-bold uppercase text-[11px] mb-0.5">
                          Respuesta esperada
                        </label>
                        <input
                          type="text"
                          value={item.expected}
                          onChange={(e) => {
                            const updated = [...(lessonData.preQuestions || [])];
                            updated[idx].expected = e.target.value;
                            setLessonData({ ...lessonData, preQuestions: updated });
                          }}
                          className="w-full px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold text-[#1c3257] bg-white"
                        />
                      </div>

                      <div className="bg-[#fff7db] border border-[#f0d372] rounded-xl p-3">
                        <label className="block text-[#956b00] font-bold uppercase text-[11px] mb-0.5">
                          Pista socrática (si necesita apoyo)
                        </label>
                        <input
                          type="text"
                          value={item.support}
                          onChange={(e) => {
                            const updated = [...(lessonData.preQuestions || [])];
                            updated[idx].support = e.target.value;
                            setLessonData({ ...lessonData, preQuestions: updated });
                          }}
                          className="w-full px-2 py-1 rounded-lg border border-[#f0d372] text-xs bg-white text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-white border-l-4 border-l-[#4a964e] rounded-xl p-3 border border-slate-200">
                        <label className="block text-[11px] font-bold text-[#4a964e] uppercase mb-0.5">
                          DILE si acierta
                        </label>
                        <input
                          type="text"
                          value={item.success}
                          onChange={(e) => {
                            const updated = [...(lessonData.preQuestions || [])];
                            updated[idx].success = e.target.value;
                            setLessonData({ ...lessonData, preQuestions: updated });
                          }}
                          className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs"
                        />
                      </div>

                      <div className="bg-white border-l-4 border-l-[#3b82f6] rounded-xl p-3 border border-slate-200">
                        <label className="block text-[11px] font-bold text-[#3b82f6] uppercase mb-0.5">
                          Texto revelado al estudiante
                        </label>
                        <input
                          type="text"
                          value={item.studentReveal}
                          onChange={(e) => {
                            const updated = [...(lessonData.preQuestions || [])];
                            updated[idx].studentReveal = e.target.value;
                            setLessonData({ ...lessonData, preQuestions: updated });
                          }}
                          className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs font-semibold"
                        />
                      </div>

                      <div className="bg-white border-l-4 border-l-slate-400 rounded-xl p-3 border border-slate-200">
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-0.5">
                          Texto revelado al mentor
                        </label>
                        <input
                          type="text"
                          value={item.reveal}
                          onChange={(e) => {
                            const updated = [...(lessonData.preQuestions || [])];
                            updated[idx].reveal = e.target.value;
                            setLessonData({ ...lessonData, preQuestions: updated });
                          }}
                          className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== PASO 4: VIDEO EXPLICATIVO E IDEA CLAVE ===================== */}
          {activeStepId === 'paso4_explicativo' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                    Etapa 4 de 8
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 mt-2 flex items-center gap-2">
                    <Lightbulb className="text-[#F59E0B]" size={20} />
                    <span>Paso 4: Video Explicativo, Idea Clave y Comprobación</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Formalización disciplinar, ficha técnica de 7 láminas, síntesis de cierre y las 2 preguntas de "Comprobemos lo aprendido".
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyPrompt('explicativo')}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copyFeedback === 'explicativo' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{copyFeedback === 'explicativo' ? 'Prompt Copiado!' : 'Copiar Prompt ChatGPT Work'}</span>
                </button>
              </div>

              {/* TARJETA DESTACADA: VIDEO OFICIAL EN CLOUDFLARE */}
              <div className="p-5 rounded-2xl border-2 border-amber-200 bg-amber-50/40 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-sm">
                      <Video size={16} />
                    </span>
                    <div>
                      <h3 className="text-xs font-black uppercase text-slate-900">
                        Video Explicativo Oficial (Cloudflare Stream / R2)
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Cápsula audiovisual de formalización que modela el concepto y la regla visible para el estudiante.
                      </p>
                    </div>
                  </div>

                  {lessonData.formalization.videoSrc ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      <span>Video Conectado y Reproducible</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-[11px] font-bold">
                      Sin Video Vinculado
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">
                        URL de Video en Cloudflare (.mp4 o streaming)
                      </label>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            const base = 'https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/';
                            const cur = lessonData.formalization.videoSrc || '';
                            if (!cur.startsWith(base)) {
                              setLessonData({
                                ...lessonData,
                                formalization: {
                                  ...lessonData.formalization,
                                  videoSrc: `${base}${cur.replace(/^https?:\/\/[^/]+\//, '')}`
                                }
                              });
                            }
                          }}
                          className="text-[10px] font-black text-amber-800 hover:underline px-1.5 py-0.5 rounded-md bg-amber-100 cursor-pointer"
                          title="Insertar prefijo del bucket público Cloudflare R2"
                        >
                          + Base R2
                        </button>
                        {lessonData.formalization.videoSrc && (
                          <button
                            type="button"
                            onClick={() => {
                              setLessonData({
                                ...lessonData,
                                formalization: { ...lessonData.formalization, videoSrc: '' }
                              });
                            }}
                            className="text-[10px] font-bold text-rose-600 hover:underline cursor-pointer"
                          >
                            Limpiar
                          </button>
                        )}
                      </div>
                    </div>
                    <input
                      type="text"
                      value={lessonData.formalization.videoSrc || ''}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          formalization: {
                            ...lessonData.formalization,
                            videoSrc: e.target.value
                          }
                        })
                      }
                      placeholder="https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white focus:outline-hidden focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Idea Clave Disciplinar (formalization.ideaClave)
                    </label>
                    <textarea
                      rows={2}
                      value={lessonData.formalization.ideaClave || lessonData.formalization.summary || ''}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          formalization: {
                            ...lessonData.formalization,
                            ideaClave: e.target.value,
                            summary: e.target.value
                          }
                        })
                      }
                      className="w-full px-3.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-900"
                    />
                  </div>
                </div>

                {/* Reproductor de Video en Vivo */}
                {lessonData.formalization.videoSrc ? (
                  <div className="rounded-2xl overflow-hidden border border-amber-200 bg-black aspect-video max-h-72 flex items-center justify-center shadow-inner">
                    <video
                      src={lessonData.formalization.videoSrc}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl border-2 border-dashed border-amber-200 bg-white/70 flex flex-col items-center justify-center text-center">
                    <Video size={28} className="text-amber-400 mb-2" />
                    <p className="text-xs font-bold text-slate-700">Sin video explicativo asignado</p>
                    <p className="text-[11px] text-slate-500 max-w-sm mt-0.5">
                      Pega la URL de Cloudflare Stream o Cloudflare R2 arriba para verificar de inmediato la reproducción en este visor.
                    </p>
                  </div>
                )}

                {/* DILE Antes e Instrucción */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      DILE antes de la explicación (formalization.dileIntro)
                    </label>
                    <input
                      type="text"
                      value={lessonData.formalization.dileIntro || ''}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          formalization: {
                            ...lessonData.formalization,
                            dileIntro: e.target.value
                          }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Instrucción al Estudiante (formalization.hazInstruction)
                    </label>
                    <input
                      type="text"
                      value={lessonData.formalization.hazInstruction || ''}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          formalization: {
                            ...lessonData.formalization,
                            hazInstruction: e.target.value
                          }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-700"
                    />
                  </div>
                </div>

                {/* TEXTO DE CIERRE EXPLICATIVO DEL VIDEO (summaryText) */}
                <div className="bg-white border-l-4 border-l-[#F59E0B] rounded-xl p-4 border border-slate-200 space-y-1.5">
                  <strong className="text-[#F59E0B] text-xs uppercase tracking-wider font-bold block">
                    DILE AL ESTUDIANTE: CIERRE EXPLICATIVO DEL VIDEO (summaryText)
                  </strong>
                  <p className="text-[11px] text-slate-500">
                    Párrafo de síntesis que el mentor lee al terminar el video para consolidar la regla antes de las preguntas de comprobación.
                  </p>
                  <textarea
                    rows={2}
                    value={lessonData.summaryText || ''}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        summaryText: e.target.value
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800"
                  />
                </div>
              </div>

              {/* SECCIÓN COMPROBEMOS LO APRENDIDO (postQuestions) */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <h3 className="text-xs font-black uppercase text-amber-800 tracking-wider flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-amber-600" />
                      <span>Comprobemos lo aprendido (2 Preguntas Guiadas Post-Video - postQuestions)</span>
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Preguntas de comprobación inmediata que el mentor formula al terminar el video explicativo.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const currentList = lessonData.postQuestions || [];
                      const newItem: GuidedItem = {
                        context: `Comprobación ${currentList.length + 1}`,
                        question: '¿Qué regla fundamental observamos en la explicación?',
                        expected: 'Explicar la regla formal.',
                        success: '¡Excelente comprobación!',
                        support: 'Recuerda el criterio modelado en el video.',
                        reveal: 'La regla formal aplicada.',
                        studentReveal: 'Regla clave comprobada.'
                      };
                      setLessonData({
                        ...lessonData,
                        postQuestions: [...currentList, newItem]
                      });
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Añadir Pregunta</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {(lessonData.postQuestions || []).map((pItem, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-amber-800 uppercase">
                          Pregunta de Comprobación {pIdx + 1}: {pItem.context}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (lessonData.postQuestions || []).filter((_, i) => i !== pIdx);
                            setLessonData({ ...lessonData, postQuestions: updated });
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-md cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                            Contexto / Enfoque
                          </label>
                          <input
                            type="text"
                            value={pItem.context}
                            onChange={(e) => {
                              const updated = [...(lessonData.postQuestions || [])];
                              updated[pIdx].context = e.target.value;
                              setLessonData({ ...lessonData, postQuestions: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                          />
                        </div>

                        <div className="bg-white border-l-4 border-l-[#12a1a4] rounded-xl p-3 border border-slate-200">
                          <label className="block text-[11px] font-bold text-[#12a1a4] uppercase mb-0.5">
                            PREGÚNTALE AL ESTUDIANTE
                          </label>
                          <input
                            type="text"
                            value={pItem.question}
                            onChange={(e) => {
                              const updated = [...(lessonData.postQuestions || [])];
                              updated[pIdx].question = e.target.value;
                              setLessonData({ ...lessonData, postQuestions: updated });
                            }}
                            className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs font-bold"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-[#e8edf3] border border-[#d2dbe5] rounded-xl p-3">
                          <label className="block text-[#687589] font-bold uppercase text-[11px] mb-0.5">
                            Respuesta esperada
                          </label>
                          <input
                            type="text"
                            value={pItem.expected}
                            onChange={(e) => {
                              const updated = [...(lessonData.postQuestions || [])];
                              updated[pIdx].expected = e.target.value;
                              setLessonData({ ...lessonData, postQuestions: updated });
                            }}
                            className="w-full px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold text-[#1c3257] bg-white"
                          />
                        </div>

                        <div className="bg-[#fff7db] border border-[#f0d372] rounded-xl p-3">
                          <label className="block text-[#956b00] font-bold uppercase text-[11px] mb-0.5">
                            Pista socrática
                          </label>
                          <input
                            type="text"
                            value={pItem.support}
                            onChange={(e) => {
                              const updated = [...(lessonData.postQuestions || [])];
                              updated[pIdx].support = e.target.value;
                              setLessonData({ ...lessonData, postQuestions: updated });
                            }}
                            className="w-full px-2 py-1 rounded-lg border border-[#f0d372] text-xs bg-white text-slate-800"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-white border-l-4 border-l-[#4a964e] rounded-xl p-3 border border-slate-200">
                          <label className="block text-[11px] font-bold text-[#4a964e] uppercase mb-0.5">
                            DILE si acierta
                          </label>
                          <input
                            type="text"
                            value={pItem.success}
                            onChange={(e) => {
                              const updated = [...(lessonData.postQuestions || [])];
                              updated[pIdx].success = e.target.value;
                              setLessonData({ ...lessonData, postQuestions: updated });
                            }}
                            className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs"
                          />
                        </div>

                        <div className="bg-white border-l-4 border-l-[#3b82f6] rounded-xl p-3 border border-slate-200">
                          <label className="block text-[11px] font-bold text-[#3b82f6] uppercase mb-0.5">
                            Texto revelado al estudiante
                          </label>
                          <input
                            type="text"
                            value={pItem.studentReveal}
                            onChange={(e) => {
                              const updated = [...(lessonData.postQuestions || [])];
                              updated[pIdx].studentReveal = e.target.value;
                              setLessonData({ ...lessonData, postQuestions: updated });
                            }}
                            className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs font-semibold"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ficha Técnica de 7 Diapositivas Explicativas */}
              <div className="space-y-4 pt-2">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-2">
                    <Layers size={15} className="text-amber-600" />
                    <span>Ficha Técnica y Guion de Formalización (7 Diapositivas Anime)</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Verifica que el video formalice la regla paso a paso según el principio de un cambio mental por lámina.
                  </p>
                </div>

                {(lessonData.formalization.slides || []).map((slide, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/80 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-800 uppercase">
                        Slide {slide.slideNumber}: {slide.tituloMomento}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {slide.duracionSeg} seg aprox.
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-extrabold text-slate-700 flex items-center gap-1.5">
                          <ImageIcon size={13} className="text-amber-600" />
                          <span>Imagen de la Lámina</span>
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={slide.imageUrl || ''}
                          onChange={(e) => {
                            const updated = [...(lessonData.formalization.slides || [])];
                            updated[sIdx].imageUrl = e.target.value;
                            setLessonData({
                              ...lessonData,
                              formalization: { ...lessonData.formalization, slides: updated }
                            });
                          }}
                          placeholder="https://pub-...r2.dev/slide1.png o /visuals/..."
                          className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono bg-slate-50 focus:bg-white"
                        />
                        {slide.imageUrl && (
                          <a
                            href={slide.imageUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-amber-800 hover:text-amber-950 p-1.5 rounded-lg border border-amber-200 bg-amber-50 flex items-center gap-1 text-[11px] font-bold shrink-0"
                            title="Ver imagen completa"
                          >
                            <ExternalLink size={13} />
                            <span>Ver</span>
                          </a>
                        )}
                      </div>

                      {slide.imageUrl && (
                        <div className="pt-1 flex items-center gap-3">
                          <img
                            src={slide.imageUrl}
                            alt={`Slide ${slide.slideNumber}`}
                            className="w-28 h-16 object-cover rounded-lg border border-slate-200 shadow-xs"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <span className="text-[10px] text-slate-500 italic">
                            Vista previa de la lámina vinculada a este momento.
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                          Overlay en Pantalla
                        </label>
                        <input
                          type="text"
                          value={slide.overlayText}
                          onChange={(e) => {
                            const updated = [...(lessonData.formalization.slides || [])];
                            updated[sIdx].overlayText = e.target.value;
                            setLessonData({
                              ...lessonData,
                              formalization: { ...lessonData.formalization, slides: updated }
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                          Locución Oral (Notas al Orador TTS)
                        </label>
                        <input
                          type="text"
                          value={slide.speakerNotes}
                          onChange={(e) => {
                            const updated = [...(lessonData.formalization.slides || [])];
                            updated[sIdx].speakerNotes = e.target.value;
                            setLessonData({
                              ...lessonData,
                              formalization: { ...lessonData.formalization, slides: updated }
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        Prompt de Imagen Anime Widescreen 16:9
                      </label>
                      <textarea
                        rows={2}
                        value={slide.visualPrompt}
                        onChange={(e) => {
                          const updated = [...(lessonData.formalization.slides || [])];
                          updated[sIdx].visualPrompt = e.target.value;
                          setLessonData({
                            ...lessonData,
                            formalization: { ...lessonData.formalization, slides: updated }
                          });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700 font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== PASO 5: PRÁCTICA, RAZONAMIENTO Y DESAFÍO ===================== */}
          {activeStepId === 'paso5_practica' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Etapa 5 de 8
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 mt-2 flex items-center gap-2">
                    <FileText className="text-[#10B981]" size={20} />
                    <span>Paso 5: Práctica, Razonamiento Comparativo y Desafío Breve</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ejercicios en cuaderno físico, comparación de dos situaciones y módulo de profundización.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const currentList = lessonData.practice || [];
                    const newItem: GuidedItem = {
                      context: `Ejercicio ${currentList.length + 1}`,
                      question: 'Aplica el procedimiento visto en...',
                      expected: 'Resultado exacto.',
                      success: '¡Excelente desarrollo!',
                      support: 'Recuerda el punto de partida...',
                      reveal: 'El procedimiento es...',
                      studentReveal: 'Resultado en cuaderno...'
                    };
                    setLessonData({
                      ...lessonData,
                      practice: [...currentList, newItem]
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Añadir Ejercicio</span>
                </button>
              </div>

              {/* 1. Ejercicios Guiados en Cuaderno */}
              <div className="space-y-5">
                {(lessonData.practice || []).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-emerald-700 uppercase">
                        Ejercicio {idx + 1}: {item.context}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (lessonData.practice || []).filter((_, i) => i !== idx);
                          setLessonData({ ...lessonData, practice: updated });
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-md cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                          Contexto del Ejercicio
                        </label>
                        <input
                          type="text"
                          value={item.context}
                          onChange={(e) => {
                            const updated = [...(lessonData.practice || [])];
                            updated[idx].context = e.target.value;
                            setLessonData({ ...lessonData, practice: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                        />
                      </div>

                      <div className="bg-white border-l-4 border-l-[#12a1a4] rounded-xl p-3 border border-slate-200">
                        <label className="block text-[11px] font-bold text-[#12a1a4] uppercase mb-0.5">
                          PREGÚNTALE / ENUNCIADO PARA EL CUADERNO
                        </label>
                        <input
                          type="text"
                          value={item.question}
                          onChange={(e) => {
                            const updated = [...(lessonData.practice || [])];
                            updated[idx].question = e.target.value;
                            setLessonData({ ...lessonData, practice: updated });
                          }}
                          className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs font-bold"
                        />
                      </div>
                    </div>

                    <div className="bg-[#e8edf3] border border-[#d2dbe5] rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
                      <span className="text-[#687589] font-bold uppercase tracking-wider text-[11px]">
                        Respuesta esperada en cuaderno
                      </span>
                      <input
                        type="text"
                        value={item.expected}
                        onChange={(e) => {
                          const updated = [...(lessonData.practice || [])];
                          updated[idx].expected = e.target.value;
                          setLessonData({ ...lessonData, practice: updated });
                        }}
                        className="flex-1 max-w-md px-3 py-1 rounded-lg border border-slate-300 text-xs font-bold text-[#1c3257] bg-white text-right"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white border-l-4 border-l-[#4a964e] rounded-xl p-3 border border-slate-200">
                        <label className="block text-[11px] font-bold text-[#4a964e] uppercase mb-0.5">
                          DILE si acierta
                        </label>
                        <input
                          type="text"
                          value={item.success}
                          onChange={(e) => {
                            const updated = [...(lessonData.practice || [])];
                            updated[idx].success = e.target.value;
                            setLessonData({ ...lessonData, practice: updated });
                          }}
                          className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs"
                        />
                      </div>

                      <div className="bg-white border-l-4 border-l-[#d97706] rounded-xl p-3 border border-slate-200">
                        <label className="block text-[11px] font-bold text-[#d97706] uppercase mb-0.5">
                          Pista socrática de modelado
                        </label>
                        <input
                          type="text"
                          value={item.support}
                          onChange={(e) => {
                            const updated = [...(lessonData.practice || [])];
                            updated[idx].support = e.target.value;
                            setLessonData({ ...lessonData, practice: updated });
                          }}
                          className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. MÓDULO RAZONAMIENTO: COMPAREMOS DOS SITUACIONES */}
              {lessonData.reasoning && (
                <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 space-y-4 pt-4">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                    <div>
                      <strong className="text-xs uppercase tracking-wider text-emerald-900 block font-black">
                        MÓDULO DE RAZONAMIENTO: COMPAREMOS DOS SITUACIONES (lessonData.reasoning)
                      </strong>
                      <p className="text-[11px] text-emerald-700">
                        Fase reflexiva guiada que compara dos casos para profundizar la comprensión antes del resumen.
                      </p>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      Aula Sincronizada
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                        Título del Módulo
                      </label>
                      <input
                        type="text"
                        value={lessonData.reasoning.title || ''}
                        onChange={(e) =>
                          setLessonData({
                            ...lessonData,
                            reasoning: { ...lessonData.reasoning!, title: e.target.value }
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                        DILE de Apertura
                      </label>
                      <input
                        type="text"
                        value={lessonData.reasoning.dileIntro || ''}
                        onChange={(e) =>
                          setLessonData({
                            ...lessonData,
                            reasoning: { ...lessonData.reasoning!, dileIntro: e.target.value }
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#1c3257] uppercase mb-0.5">
                      PREGÚNTALE AL ESTUDIANTE: PREGUNTA REFLEXIVA DE COMPARACIÓN
                    </label>
                    <textarea
                      rows={2}
                      value={lessonData.reasoning.question}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          reasoning: { ...lessonData.reasoning!, question: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-emerald-800 uppercase mb-0.5">
                      Respuesta Esperada / Criterio de Comparación
                    </label>
                    <textarea
                      rows={2}
                      value={lessonData.reasoning.expectedAnswer}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          reasoning: { ...lessonData.reasoning!, expectedAnswer: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-[#1c3257] bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                      <span className="text-[10px] font-extrabold uppercase text-slate-500">Contexto 1</span>
                      <input
                        type="text"
                        value={lessonData.reasoning.context1?.label || ''}
                        onChange={(e) =>
                          setLessonData({
                            ...lessonData,
                            reasoning: {
                              ...lessonData.reasoning!,
                              context1: { ...lessonData.reasoning!.context1, label: e.target.value }
                            }
                          })
                        }
                        placeholder="Etiqueta (ej. POSITIVOS)"
                        className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={lessonData.reasoning.context1?.value || ''}
                        onChange={(e) =>
                          setLessonData({
                            ...lessonData,
                            reasoning: {
                              ...lessonData.reasoning!,
                              context1: { ...lessonData.reasoning!.context1, value: e.target.value }
                            }
                          })
                        }
                        placeholder="Valor / Expresión (ej. 5 > 2)"
                        className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs font-mono font-bold text-emerald-700"
                      />
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                      <span className="text-[10px] font-extrabold uppercase text-slate-500">Contexto 2</span>
                      <input
                        type="text"
                        value={lessonData.reasoning.context2?.label || ''}
                        onChange={(e) =>
                          setLessonData({
                            ...lessonData,
                            reasoning: {
                              ...lessonData.reasoning!,
                              context2: { ...lessonData.reasoning!.context2, label: e.target.value }
                            }
                          })
                        }
                        placeholder="Etiqueta (ej. NEGATIVOS)"
                        className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={lessonData.reasoning.context2?.value || ''}
                        onChange={(e) =>
                          setLessonData({
                            ...lessonData,
                            reasoning: {
                              ...lessonData.reasoning!,
                              context2: { ...lessonData.reasoning!.context2, value: e.target.value }
                            }
                          })
                        }
                        placeholder="Valor / Expresión (ej. −2 > −5)"
                        className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs font-mono font-bold text-orange-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white border-l-4 border-l-[#4a964e] rounded-xl p-3 border border-slate-200">
                      <label className="block text-[11px] font-bold text-[#4a964e] uppercase mb-0.5">
                        DILE si explica correctamente
                      </label>
                      <input
                        type="text"
                        value={lessonData.reasoning.successFeedback}
                        onChange={(e) =>
                          setLessonData({
                            ...lessonData,
                            reasoning: { ...lessonData.reasoning!, successFeedback: e.target.value }
                          })
                        }
                        className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs"
                      />
                    </div>

                    <div className="bg-white border-l-4 border-l-[#d97706] rounded-xl p-3 border border-slate-200">
                      <label className="block text-[11px] font-bold text-[#d97706] uppercase mb-0.5">
                        DILE si necesita apoyo
                      </label>
                      <input
                        type="text"
                        value={lessonData.reasoning.supportFeedback}
                        onChange={(e) =>
                          setLessonData({
                            ...lessonData,
                            reasoning: { ...lessonData.reasoning!, supportFeedback: e.target.value }
                          })
                        }
                        className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs"
                      />
                    </div>

                    <div className="bg-white border-l-4 border-l-slate-400 rounded-xl p-3 border border-slate-200">
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-0.5">
                        Texto de Revelación
                      </label>
                      <input
                        type="text"
                        value={lessonData.reasoning.revealText}
                        onChange={(e) =>
                          setLessonData({
                            ...lessonData,
                            reasoning: { ...lessonData.reasoning!, revealText: e.target.value }
                          })
                        }
                        className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 3. MÓDULO DESAFÍO BREVE */}
              {lessonData.challenge && (
                <div className="p-5 rounded-2xl border-2 border-indigo-200 bg-indigo-50/30 space-y-4 pt-4">
                  <div className="flex items-center justify-between border-b border-indigo-200 pb-2">
                    <div>
                      <strong className="text-xs uppercase tracking-wider text-indigo-900 block font-black">
                        MÓDULO DE PROFUNDIZACIÓN: DESAFÍO BREVE (lessonData.challenge)
                      </strong>
                      <p className="text-[11px] text-indigo-700">
                        Aparece cuando el estudiante resuelve la comparación sin apoyo para desafiar su razonamiento.
                      </p>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                      Profundización Opcional
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                      Título del Desafío
                    </label>
                    <input
                      type="text"
                      value={lessonData.challenge.title || ''}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          challenge: { ...lessonData.challenge!, title: e.target.value }
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-indigo-950 uppercase mb-0.5">
                      PREGÚNTALE AL ESTUDIANTE: SITUACIÓN DE DESAFÍO
                    </label>
                    <textarea
                      rows={2}
                      value={lessonData.challenge.question}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          challenge: { ...lessonData.challenge!, question: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-0.5">
                      Explicación / Respuesta Esperada
                    </label>
                    <textarea
                      rows={2}
                      value={lessonData.challenge.expectedAnswer}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          challenge: { ...lessonData.challenge!, expectedAnswer: e.target.value }
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white border-l-4 border-l-[#4a964e] rounded-xl p-3 border border-slate-200">
                      <label className="block text-[11px] font-bold text-[#4a964e] uppercase mb-0.5">
                        DILE si explica correctamente
                      </label>
                      <input
                        type="text"
                        value={lessonData.challenge.successFeedback}
                        onChange={(e) =>
                          setLessonData({
                            ...lessonData,
                            challenge: { ...lessonData.challenge!, successFeedback: e.target.value }
                          })
                        }
                        className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs"
                      />
                    </div>

                    <div className="bg-white border-l-4 border-l-[#d97706] rounded-xl p-3 border border-slate-200">
                      <label className="block text-[11px] font-bold text-[#d97706] uppercase mb-0.5">
                        DILE si necesita apoyo
                      </label>
                      <input
                        type="text"
                        value={lessonData.challenge.supportFeedback}
                        onChange={(e) =>
                          setLessonData({
                            ...lessonData,
                            challenge: { ...lessonData.challenge!, supportFeedback: e.target.value }
                          })
                        }
                        className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================== PASO 6: RESUMEN Y ESTRATEGIA PARA PENSAR ===================== */}
          {activeStepId === 'paso6_resumen' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
                  Etapa 6 de 8
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 mt-2 flex items-center gap-2">
                  <BookOpen className="text-sky-600" size={20} />
                  <span>Paso 6: Resumen, Estrategia para Pensar y 3 Ideas Clave</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Método de 3 pasos para analizar y las 3 ideas estructuradas de síntesis previas a la evaluación formativa.
                </p>
              </div>

              {/* 1. MÓDULO ESTRATEGIA PARA PENSAR */}
              {lessonData.strategy && (
                <div className="bg-white border-l-4 border-l-[#0EA5E9] rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-[#0EA5E9] text-xs uppercase tracking-wider font-bold block">
                        ESTRATEGIA PARA PENSAR (3 Pasos Metodológicos - lessonData.strategy)
                      </strong>
                      <p className="text-[11px] text-slate-500">
                        Algoritmo reflexivo que el estudiante aprende para resolver situaciones de esta lección.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                        Título de la Estrategia
                      </label>
                      <input
                        type="text"
                        value={lessonData.strategy.title || ''}
                        onChange={(e) =>
                          setLessonData({
                            ...lessonData,
                            strategy: { ...lessonData.strategy!, title: e.target.value }
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                        DILE al Estudiante (strategy.dileIntro)
                      </label>
                      <input
                        type="text"
                        value={lessonData.strategy.dileIntro || ''}
                        onChange={(e) =>
                          setLessonData({
                            ...lessonData,
                            strategy: { ...lessonData.strategy!, dileIntro: e.target.value }
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium"
                      />
                    </div>
                  </div>

                  {/* Los 3 Pasos de la Estrategia */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    {(lessonData.strategy.steps || []).map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-2xl border border-sky-200 bg-sky-50/50 space-y-2 shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 text-[10px] font-extrabold uppercase">
                            Paso {step.number || sIdx + 1}
                          </span>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 mb-0.5">
                            Verbo / Título del Paso
                          </label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => {
                              const updated = [...(lessonData.strategy!.steps || [])];
                              updated[sIdx] = { ...updated[sIdx], title: e.target.value };
                              setLessonData({
                                ...lessonData,
                                strategy: { ...lessonData.strategy!, steps: updated }
                              });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-black text-slate-800 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 mb-0.5">
                            Descripción de la Acción
                          </label>
                          <textarea
                            rows={3}
                            value={step.desc}
                            onChange={(e) => {
                              const updated = [...(lessonData.strategy!.steps || [])];
                              updated[sIdx] = { ...updated[sIdx], desc: e.target.value };
                              setLessonData({
                                ...lessonData,
                                strategy: { ...lessonData.strategy!, steps: updated }
                              });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-[11px] text-slate-700 bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. MÓDULO 3 IDEAS CLAVE ESTRUCTURADAS (summaryIdeas) */}
              <div className="bg-white border-l-4 border-l-[#12a1a4] rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-[#12a1a4] text-xs uppercase tracking-wider font-bold block">
                      3 IDEAS CLAVE ESTRUCTURADAS (Recordemos lo aprendido - lessonData.summaryIdeas)
                    </strong>
                    <p className="text-[11px] text-slate-500">
                      Las 3 ideas clave que el mentor muestra secuencialmente en la etapa "Recordemos lo aprendido".
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {(lessonData.summaryIdeas || []).map(([ideaTitle, ideaDesc], iIdx) => (
                    <div
                      key={iIdx}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase text-[#12a1a4]">
                          Idea Clave {iIdx + 1}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-500 mb-0.5">
                            Título / Encabezado
                          </label>
                          <input
                            type="text"
                            value={ideaTitle}
                            onChange={(e) => {
                              const updated = [...(lessonData.summaryIdeas || [])];
                              updated[iIdx] = [e.target.value, updated[iIdx][1]];
                              setLessonData({
                                ...lessonData,
                                summaryIdeas: updated
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-[10px] font-black uppercase text-slate-500 mb-0.5">
                            Texto / Explicación Oral
                          </label>
                          <textarea
                            rows={2}
                            value={ideaDesc}
                            onChange={(e) => {
                              const updated = [...(lessonData.summaryIdeas || [])];
                              updated[iIdx] = [updated[iIdx][0], e.target.value];
                              setLessonData({
                                ...lessonData,
                                summaryIdeas: updated
                              });
                            }}
                            className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-800"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================== PASO 7: MINIQUIZ, FASE REVISAR Y RECUPERACIÓN ===================== */}
          {activeStepId === 'paso7_miniquiz' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-pink-50 text-pink-700 border border-pink-200">
                  Etapa 7 de 8
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 mt-2 flex items-center gap-2">
                  <CheckSquare className="text-[#EC4899]" size={20} />
                  <span>Paso 7: Evaluación Formativa (Miniquiz), Fase REVISAR y Recuperación</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Preguntas de selección múltiple, diálogo del mentor en la fase REVISAR y explicación formativa para el estudiante.
                </p>
              </div>

              {/* Miniquiz de 3 Preguntas */}
              <div className="space-y-5">
                {(lessonData.mini || []).map((qItem, qIdx) => (
                  <div
                    key={qIdx}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-pink-700 uppercase">
                        Pregunta Formativa {qIdx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (lessonData.mini || []).filter((_, i) => i !== qIdx);
                          setLessonData({ ...lessonData, mini: updated });
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-md cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Enunciado de la Pregunta
                      </label>
                      <textarea
                        rows={2}
                        value={qItem.q}
                        onChange={(e) => {
                          const updated = [...(lessonData.mini || [])];
                          updated[qIdx].q = e.target.value;
                          setLessonData({ ...lessonData, mini: updated });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                      />
                    </div>

                    {/* Alternativas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {(qItem.options || []).map((opt, oIdx) => (
                        <div key={oIdx} className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                              opt === qItem.correct
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => {
                              const updated = [...(lessonData.mini || [])];
                              const newOpts = [...updated[qIdx].options];
                              newOpts[oIdx] = e.target.value;
                              updated[qIdx].options = newOpts;
                              setLessonData({ ...lessonData, mini: updated });
                            }}
                            className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(lessonData.mini || [])];
                              updated[qIdx].correct = opt;
                              setLessonData({ ...lessonData, mini: updated });
                            }}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                              opt === qItem.correct
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                          >
                            {opt === qItem.correct ? 'Correcta' : 'Marcar'}
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Fase REVISAR */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="bg-white border-l-4 border-l-[#12a1a4] rounded-xl p-3 border border-slate-200">
                        <label className="block text-[11px] font-bold text-[#12a1a4] uppercase mb-0.5">
                          FASE REVISAR: DILE del Mentor
                        </label>
                        <textarea
                          rows={2}
                          value={qItem.dileReview || ''}
                          onChange={(e) => {
                            const updated = [...(lessonData.mini || [])];
                            updated[qIdx].dileReview = e.target.value;
                            setLessonData({ ...lessonData, mini: updated });
                          }}
                          placeholder="Pídele que señale por qué eligió esta respuesta..."
                          className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs"
                        />
                      </div>

                      <div className="bg-white border-l-4 border-l-[#ee751c] rounded-xl p-3 border border-slate-200">
                        <label className="block text-[11px] font-bold text-[#ee751c] uppercase mb-0.5">
                          FASE REVISAR: Explicación Formativa (Estudiante)
                        </label>
                        <textarea
                          rows={2}
                          value={qItem.fixExplain || ''}
                          onChange={(e) => {
                            const updated = [...(lessonData.mini || [])];
                            updated[qIdx].fixExplain = e.target.value;
                            setLessonData({ ...lessonData, mini: updated });
                          }}
                          placeholder="Revisa la regla: cualquier número a la derecha..."
                          className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Módulo de Recuperación Formativa (Paso 7b) */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-black uppercase text-pink-800 tracking-wider flex items-center gap-2">
                      <HelpCircle size={15} className="text-pink-600" />
                      <span>Módulo de Recuperación Formativa (Paso 7b)</span>
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Preguntas de reintento formativo para estudiantes que obtuvieron menos de 2 aciertos en el quiz.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const current = lessonData.recovery || [];
                      const newItem: RecoveryItem = {
                        title: `Refuerzo ${current.length + 1}`,
                        explain: 'Revisemos esta idea paso a paso antes de responder.',
                        q: '¿Cuál es el orden correcto?',
                        options: ['Opción A', 'Opción B'],
                        correct: 'Opción A',
                        correctText: '¡Eso es! Respuesta correcta.',
                        fixText: 'La respuesta correcta es Opción A.'
                      };
                      setLessonData({
                        ...lessonData,
                        recovery: [...current, newItem]
                      });
                    }}
                    className="px-3 py-1.5 rounded-xl bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Añadir Refuerzo</span>
                  </button>
                </div>

                {(lessonData.recovery || []).map((rItem, rIdx) => (
                  <div
                    key={rIdx}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-pink-700 uppercase">
                        {rItem.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (lessonData.recovery || []).filter((_, i) => i !== rIdx);
                          setLessonData({ ...lessonData, recovery: updated });
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-md cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                          Título del Refuerzo
                        </label>
                        <input
                          type="text"
                          value={rItem.title}
                          onChange={(e) => {
                            const updated = [...(lessonData.recovery || [])];
                            updated[rIdx].title = e.target.value;
                            setLessonData({ ...lessonData, recovery: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                          Pregunta de Recuperación
                        </label>
                        <input
                          type="text"
                          value={rItem.q}
                          onChange={(e) => {
                            const updated = [...(lessonData.recovery || [])];
                            updated[rIdx].q = e.target.value;
                            setLessonData({ ...lessonData, recovery: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        Explicación Previa
                      </label>
                      <textarea
                        rows={2}
                        value={rItem.explain}
                        onChange={(e) => {
                          const updated = [...(lessonData.recovery || [])];
                          updated[rIdx].explain = e.target.value;
                          setLessonData({ ...lessonData, recovery: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                          Respuesta Correcta
                        </label>
                        <input
                          type="text"
                          value={rItem.correct}
                          onChange={(e) => {
                            const updated = [...(lessonData.recovery || [])];
                            updated[rIdx].correct = e.target.value;
                            setLessonData({ ...lessonData, recovery: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-emerald-700 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                          Texto de Refuerzo
                        </label>
                        <input
                          type="text"
                          value={rItem.fixText}
                          onChange={(e) => {
                            const updated = [...(lessonData.recovery || [])];
                            updated[rIdx].fixText = e.target.value;
                            setLessonData({ ...lessonData, recovery: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-amber-800"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== PASO 8: CIERRE Y METACOGNICIÓN ===================== */}
          {activeStepId === 'paso8_cierre' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Etapa 8 de 8
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 mt-2 flex items-center gap-2">
                  <Sparkles className="text-[#6366F1]" size={20} />
                  <span>Paso 8: Cierre, Metacognición y Reconocimiento</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pregunta de autorreflexión final, consolidación metacognitiva y celebración del esfuerzo.
                </p>
              </div>

              {/* Pregunta de Síntesis / Próxima Clase */}
              <div className="bg-white border-l-4 border-l-[#12a1a4] rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1.5">
                <span className="font-bold text-xs tracking-wider uppercase text-[#12a1a4] block">
                  VISTA PREVIA DE LA PRÓXIMA CLASE / PREGUNTA DE SÍNTESIS
                </span>
                <input
                  type="text"
                  value={lessonData.closure?.nextClassPreview || ''}
                  onChange={(e) =>
                    setLessonData({
                      ...lessonData,
                      closure: {
                        ...lessonData.closure,
                        nextClassPreview: e.target.value
                      }
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              {/* Reflexión Metacognitiva y Celebración */}
              <div className="bg-white border-l-4 border-l-[#4a964e] rounded-2xl p-5 shadow-sm border border-slate-200 space-y-1.5">
                <span className="font-bold text-xs tracking-wider uppercase text-[#4a964e] block">
                  CELEBRACIÓN Y RECONOCIMIENTO DEL ESFUERZO (closure.congratulations)
                </span>
                <textarea
                  rows={3}
                  value={lessonData.closure?.congratulations || ''}
                  onChange={(e) =>
                    setLessonData({
                      ...lessonData,
                      closure: {
                        ...lessonData.closure,
                        congratulations: e.target.value
                      }
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-emerald-800 bg-emerald-50/50"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
