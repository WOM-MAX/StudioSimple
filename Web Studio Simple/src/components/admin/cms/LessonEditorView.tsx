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
  AlertCircle,
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
  Maximize2,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import {
  OACatalogItem,
  LessonData as GeneratorLessonData,
  SlidePrompt,
  GuidedItem,
  QuizQuestion,
  RecoveryItem,
  generateOAPackage,
  GeneratedOAPackage,
  buildHookPromptText,
  buildExplicativoPromptText
} from '../../../lib/lesson-generator';
import { exportOAPackageToDocx } from '../../../lib/docx-export';
import { adaptGeneratorLessonToPlayer } from '../../../lib/lesson-adapter';
import {
  saveCustomLessonData,
  resetCustomLessonData,
  isLessonCustomized,
  getInjectedPackage,
  getInjectedPackageAsync,
  initializeInjectedLessons
} from '../../../lib/lesson-repository';

interface LessonEditorViewProps {
  catalog?: OACatalogItem[];
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

const STEP_TABS = [
  { step: 1, label: '1. Preparación', icon: GraduationCap, color: '#12A1A4' },
  { step: 2, label: '2. Ruta y Situación', icon: Compass, color: '#EE751C' },
  { step: 3, label: '3. Video Motivacional', icon: Film, color: '#8B5CF6' },
  { step: 4, label: '4. Conversación Guiada', icon: MessageSquare, color: '#3B82F6' },
  { step: 5, label: '5. Video Explicativo', icon: Lightbulb, color: '#F59E0B' },
  { step: 6, label: '6. Práctica Conjunta', icon: FileText, color: '#10B981' },
  { step: 7, label: '7. Miniquiz y Recuperación', icon: CheckSquare, color: '#EC4899' },
  { step: 8, label: '8. Cierre y Metacognición', icon: Sparkles, color: '#6366F1' }
];

export const LessonEditorView: React.FC<LessonEditorViewProps> = ({ catalog: propCatalog }) => {
  const { setViewMode, setActiveSynchronizedLesson } = useApp();

  const [localCatalog, setLocalCatalog] = useState<OACatalogItem[]>(propCatalog || []);
  const [selectedGrade, setSelectedGrade] = useState<string>('7° Básico');
  const [selectedSubject, setSelectedSubject] = useState<string>('Matemática');
  const [selectedOAId, setSelectedOAId] = useState<string>('');
  const [selectedLessonNum, setSelectedLessonNum] = useState<number>(1);
  const [activeStepTab, setActiveStepTab] = useState<number>(1);

  const [lessonData, setLessonData] = useState<GeneratorLessonData | null>(null);
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

  // Cargar o generar los datos de la lección activa
  const loadLesson = useCallback(() => {
    if (!currentOA) return;

    // 1. Intentar cargar del repositorio (injected/custom)
    const pkg = getInjectedPackage(selectedGrade, selectedSubject, currentOA.oa);
    const customized = isLessonCustomized(selectedGrade, selectedSubject, currentOA.oa, selectedLessonNum);
    setIsCustom(customized);

    if (pkg) {
      const foundLesson = pkg.lessons.find((l) => l.num === selectedLessonNum);
      if (foundLesson) {
        setLessonData(JSON.parse(JSON.stringify(foundLesson)));
        return;
      }
    }

    // 2. Fallback: Generar dinámicamente con generateOAPackage
    const generatedPkg = generateOAPackage(currentOA, totalLessons);
    const targetLesson =
      generatedPkg.lessons.find((l) => l.num === selectedLessonNum) || generatedPkg.lessons[0];

    if (targetLesson) {
      setLessonData(JSON.parse(JSON.stringify(targetLesson)));
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

  // Guardar cambios en el almacenamiento persistente
  const handleSaveLesson = () => {
    if (!lessonData || !currentOA) return;

    saveCustomLessonData(
      selectedGrade,
      selectedSubject,
      currentOA.oa,
      currentOA.id,
      lessonData,
      totalLessons
    );

    setIsCustom(true);
    setSaveStatus('Lección guardada con éxito en almacenamiento persistente.');
    setTimeout(() => setSaveStatus(null), 3500);
  };

  // Restablecer a versión oficial canónica
  const handleResetLesson = () => {
    if (!currentOA) return;
    if (window.confirm('¿Deseas descartar todas las modificaciones y volver a la versión de fábrica?')) {
      resetCustomLessonData(selectedGrade, selectedSubject, currentOA.oa, selectedLessonNum);
      setIsCustom(false);
      loadLesson();
      setSaveStatus('Lección restablecida a su versión canónica original.');
      setTimeout(() => setSaveStatus(null), 3500);
    }
  };

  // Probar la lección en vivo en el aula sincronizada
  const handleTestInLivePlayer = () => {
    if (!lessonData || !currentOA) return;

    // Asegurar que el cambio esté guardado para que los componentes sincronizados lo lean
    saveCustomLessonData(
      selectedGrade,
      selectedSubject,
      currentOA.oa,
      currentOA.id,
      lessonData,
      totalLessons
    );

    const playerAdapted = adaptGeneratorLessonToPlayer(
      lessonData,
      {
        curso: selectedGrade,
        asignatura: selectedSubject,
        oa: currentOA.oa,
        titulo: currentOA.descripcion
      },
      totalLessons
    );

    setActiveSynchronizedLesson(playerAdapted);
    setViewMode('lesson');
  };

  // Generar y descargar DOCX asegurando la inclusión de las lecciones canónicas del OA
  const handleDownloadDocx = async () => {
    if (!lessonData || !currentOA) return;
    setIsExportingDocx(true);

    try {
      // 1. Obtener paquete canónico real (con soporte inyectado o customizado)
      const basePkg = await getInjectedPackageAsync(selectedGrade, selectedSubject, currentOA.oa);
      let fullLessons: GeneratorLessonData[] = [];

      if (basePkg && basePkg.lessons && basePkg.lessons.length > 0) {
        fullLessons = basePkg.lessons.map((l) =>
          l.num === selectedLessonNum ? lessonData : l
        );
        if (!fullLessons.some((l) => l.num === selectedLessonNum)) {
          fullLessons.push(lessonData);
          fullLessons.sort((a, b) => a.num - b.num);
        }
      } else {
        const genPkg = generateOAPackage(currentOA, totalLessons);
        fullLessons = genPkg.lessons.map((l) =>
          l.num === selectedLessonNum ? lessonData : l
        );
      }

      const fullPkg: GeneratedOAPackage = {
        oa: currentOA,
        totalLessons: Math.max(totalLessons, fullLessons.length),
        lessons: fullLessons
      };

      const blob = await exportOAPackageToDocx(fullPkg);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Plan_Maestro_${currentOA.curso.replace(/[\s°]/g, '')}_${currentOA.id}_${fullLessons.length}Lecciones.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error al exportar DOCX:', err);
      alert('Error al generar el archivo DOCX.');
    } finally {
      setIsExportingDocx(false);
    }
  };

  // Exportar JSON de la lección
  const handleExportJson = () => {
    if (!lessonData || !currentOA) return;
    const jsonStr = JSON.stringify(lessonData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Leccion_${currentOA.id}_Clase${selectedLessonNum}.json`;
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
        lessonData.title,
        lessonData.paso2_hook?.slides || []
      );
    } else {
      text = buildExplicativoPromptText(
        selectedSubject,
        currentOA.oa,
        selectedLessonNum,
        lessonData.title,
        lessonData.paso4_explicativo?.slides || []
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

  return (
    <div className="space-y-6 pb-20 font-sans text-slate-900">
      {/* 1. CABECERA PRINCIPAL Y ACCIONES GLOBALES */}
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
              Personaliza los 8 pasos pedagógicos, preguntas socráticas, slides de video y retroalimentaciones formativas en tiempo real.
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

        {/* 2. SELECTOR JERÁRQUICO (Curso -> Asignatura -> OA -> Clase) */}
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

      {/* 3. BARRA DE PASOS PEDAGÓGICOS (STEPPER / TABS DE LOS 8 PASOS) */}
      <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-thin">
        {STEP_TABS.map((tab) => {
          const isActive = activeStepTab === tab.step;
          const Icon = tab.icon;
          return (
            <button
              key={tab.step}
              type="button"
              onClick={() => setActiveStepTab(tab.step)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-extrabold shrink-0 flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-white border-2 text-slate-900 shadow-sm'
                  : 'bg-white/80 border border-slate-200 text-slate-500 hover:bg-white hover:text-slate-800'
              }`}
              style={{ borderColor: isActive ? tab.color : undefined }}
            >
              <span
                className="w-5 h-5 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: tab.color }}
              >
                <Icon size={12} />
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. CONTENIDO DEL PASO ACTIVO */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm space-y-6">
        {/* ===================== PASO 1: PREPARACIÓN Y METADATOS ===================== */}
        {activeStepTab === 1 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                <GraduationCap className="text-[#12A1A4]" size={18} />
                <span>Paso 1: Metadatos y Preparación del Mentor</span>
              </h2>
              <p className="text-xs text-slate-500">
                Información de inicio, foco curricular del día y recomendaciones para el apoderado.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Título de la Clase
                </label>
                <input
                  type="text"
                  value={lessonData.title}
                  onChange={(e) =>
                    setLessonData({ ...lessonData, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-hidden focus:border-[#EE751C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Duración Estimada
                </label>
                <input
                  type="text"
                  value={lessonData.duracion}
                  onChange={(e) =>
                    setLessonData({ ...lessonData, duracion: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-[#EE751C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Foco Didáctico (La ruta de hoy)
              </label>
              <textarea
                rows={2}
                value={lessonData.focoDidactico}
                onChange={(e) =>
                  setLessonData({ ...lessonData, focoDidactico: e.target.value })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-[#EE751C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Objetivo para el Adulto / Mentor
              </label>
              <textarea
                rows={2}
                value={lessonData.objetivoAdulto}
                onChange={(e) =>
                  setLessonData({ ...lessonData, objetivoAdulto: e.target.value })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-[#EE751C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Clima Emocional y Acogida
              </label>
              <textarea
                rows={2}
                value={lessonData.climaEmocional}
                onChange={(e) =>
                  setLessonData({ ...lessonData, climaEmocional: e.target.value })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-[#EE751C]"
              />
            </div>
          </div>
        )}

        {/* ===================== PASO 2: RUTA Y SITUACIÓN INICIAL ===================== */}
        {activeStepTab === 2 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                <Compass className="text-[#EE751C]" size={18} />
                <span>Paso 2: Ruta y Situación Inicial de Exploración</span>
              </h2>
              <p className="text-xs text-slate-500">
                Pregunta socrática inicial, diálogo oral y opciones de retroalimentación formativa.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Diálogo Inicial (DILE al estudiante)
              </label>
              <textarea
                rows={3}
                value={lessonData.situacionIntro.dialogo}
                onChange={(e) =>
                  setLessonData({
                    ...lessonData,
                    situacionIntro: {
                      ...lessonData.situacionIntro,
                      dialogo: e.target.value
                    }
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-[#EE751C]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pregunta Detonante Socrática
                </label>
                <textarea
                  rows={2}
                  value={lessonData.situacionIntro.pregunta}
                  onChange={(e) =>
                    setLessonData({
                      ...lessonData,
                      situacionIntro: {
                        ...lessonData.situacionIntro,
                        pregunta: e.target.value
                      }
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:outline-hidden focus:border-[#EE751C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Respuesta Esperada
                </label>
                <textarea
                  rows={2}
                  value={lessonData.situacionIntro.respEsperada}
                  onChange={(e) =>
                    setLessonData({
                      ...lessonData,
                      situacionIntro: {
                        ...lessonData.situacionIntro,
                        respEsperada: e.target.value
                      }
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-[#EE751C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pista Socrática para el Mentor
              </label>
              <input
                type="text"
                value={lessonData.situacionIntro.pistaSocratica}
                onChange={(e) =>
                  setLessonData({
                    ...lessonData,
                    situacionIntro: {
                      ...lessonData.situacionIntro,
                      pistaSocratica: e.target.value
                    }
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden focus:border-[#EE751C]"
              />
            </div>

            {/* Opciones de Retroalimentación de la Situación */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Opciones de Respuesta Formativa (Mentor)
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const currentOpts = lessonData.situacionIntro.options || [];
                    const newOpt = {
                      label: 'Nueva alternativa observada',
                      kind: 'needs_support' as const,
                      feedbackText: 'Explícale con calma...'
                    };
                    setLessonData({
                      ...lessonData,
                      situacionIntro: {
                        ...lessonData.situacionIntro,
                        options: [...currentOpts, newOpt]
                      }
                    });
                  }}
                  className="text-xs font-bold text-[#EE751C] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Añadir Opción</span>
                </button>
              </div>

              {(lessonData.situacionIntro.options || []).map((opt: { label: string; kind: 'correct' | 'needs_support' | 'no_answer' | 'other'; feedbackText: string }, idx: number) => (
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
                          const updated = [...(lessonData.situacionIntro.options || [])];
                          updated[idx] = { ...updated[idx], kind: e.target.value as any };
                          setLessonData({
                            ...lessonData,
                            situacionIntro: {
                              ...lessonData.situacionIntro,
                              options: updated
                            }
                          });
                        }}
                        className="px-2 py-1 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700"
                      >
                        <option value="correct">Acierto (correct)</option>
                        <option value="needs_support">Requiere Apoyo (needs_support)</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = (lessonData.situacionIntro.options || []).filter(
                            (_: unknown, i: number) => i !== idx
                          );
                          setLessonData({
                            ...lessonData,
                            situacionIntro: {
                              ...lessonData.situacionIntro,
                              options: updated
                            }
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
                      const updated = [...(lessonData.situacionIntro.options || [])];
                      updated[idx] = { ...updated[idx], label: e.target.value };
                      setLessonData({
                        ...lessonData,
                        situacionIntro: {
                          ...lessonData.situacionIntro,
                          options: updated
                        }
                      });
                    }}
                    placeholder="Etiqueta visible para el mentor..."
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                  />

                  <input
                    type="text"
                    value={opt.feedbackText}
                    onChange={(e) => {
                      const updated = [...(lessonData.situacionIntro.options || [])];
                      updated[idx] = { ...updated[idx], feedbackText: e.target.value };
                      setLessonData({
                        ...lessonData,
                        situacionIntro: {
                          ...lessonData.situacionIntro,
                          options: updated
                        }
                      });
                    }}
                    placeholder="Feedback DILE para leer en voz alta..."
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-600"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== PASO 3: VIDEO MOTIVACIONAL (CLOUDFLARE + 7 SLIDES) ===================== */}
        {activeStepTab === 3 && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                  <Film className="text-[#8B5CF6]" size={18} />
                  <span>Paso 3: Video Motivacional</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Enlace de video en Cloudflare (R2 o Stream), reproductor en vivo y ficha técnica de las 7 diapositivas anime.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCopyPrompt('hook')}
                className="px-3.5 py-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copyFeedback === 'hook' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copyFeedback === 'hook' ? '¡Prompt Copiado!' : 'Copiar Prompt ChatGPT Work'}</span>
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

                {lessonData.paso2_hook?.videoUrl ? (
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
                          const cur = lessonData.paso2_hook?.videoUrl || '';
                          if (!cur.startsWith(base)) {
                            setLessonData({
                              ...lessonData,
                              paso2_hook: {
                                ...lessonData.paso2_hook,
                                videoUrl: `${base}${cur.replace(/^https?:\/\/[^/]+\//, '')}`
                              }
                            });
                          }
                        }}
                        className="text-[10px] font-black text-purple-700 hover:underline px-1.5 py-0.5 rounded-md bg-purple-100 cursor-pointer"
                        title="Insertar prefijo del bucket público Cloudflare R2"
                      >
                        + Base R2
                      </button>
                      {lessonData.paso2_hook?.videoUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setLessonData({
                              ...lessonData,
                              paso2_hook: { ...lessonData.paso2_hook, videoUrl: '' }
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
                    value={lessonData.paso2_hook?.videoUrl || ''}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        paso2_hook: {
                          ...lessonData.paso2_hook,
                          videoUrl: e.target.value
                        }
                      })
                    }
                    placeholder="https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/video.mp4"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono bg-white text-slate-800 focus:outline-hidden focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    URL de Portada / Póster (Opcional)
                  </label>
                  <input
                    type="text"
                    value={(lessonData.paso2_hook as any)?.posterUrl || ''}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        paso2_hook: {
                          ...lessonData.paso2_hook,
                          posterUrl: e.target.value
                        }
                      })
                    }
                    placeholder="https://... o /visuals/desafio-submarino.png"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono bg-white text-slate-800 focus:outline-hidden focus:border-purple-600"
                  />
                </div>
              </div>

              {/* REPRODUCTOR EN VIVO DE PRUEBA */}
              {lessonData.paso2_hook?.videoUrl ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                    <span>Previsualización en tiempo real del video:</span>
                    <a
                      href={lessonData.paso2_hook.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-700 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <ExternalLink size={12} />
                      <span>Abrir archivo en pestaña nueva</span>
                    </a>
                  </div>
                  <div className="rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-lg aspect-video max-h-80 flex items-center justify-center">
                    <video
                      key={lessonData.paso2_hook.videoUrl}
                      src={lessonData.paso2_hook.videoUrl}
                      poster={(lessonData.paso2_hook as any)?.posterUrl || lessonData.paso2_hook.slides?.[0]?.imageUrl}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain"
                    />
                  </div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Título Descriptivo del Video
                  </label>
                  <input
                    type="text"
                    value={lessonData.paso2_hook?.titulo || ''}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        paso2_hook: {
                          ...lessonData.paso2_hook,
                          titulo: e.target.value
                        }
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:outline-hidden focus:border-purple-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      DILE antes del video
                    </label>
                    <input
                      type="text"
                      value={lessonData.paso2_hook?.dileAntes || ''}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          paso2_hook: {
                            ...lessonData.paso2_hook,
                            dileAntes: e.target.value
                          }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      DILE después del video
                    </label>
                    <input
                      type="text"
                      value={lessonData.paso2_hook?.dileDespues || ''}
                      onChange={(e) =>
                        setLessonData({
                          ...lessonData,
                          paso2_hook: {
                            ...lessonData.paso2_hook,
                            dileDespues: e.target.value
                          }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECCIÓN DE VERIFICACIÓN: LAS 7 DIAPOSITIVAS ANIME */}
            <div className="space-y-4 pt-2">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-2">
                  <Layers size={15} className="text-purple-600" />
                  <span>Ficha Técnica y Verificación de Guion (7 Diapositivas Anime)</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Usa esta ficha para contrastar si las escenas del video subido a Cloudflare corresponden al guion y personajes oficiales.
                </p>
              </div>

              {(lessonData.paso2_hook?.slides || []).map((slide, sIdx) => (
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

                  {/* Campo de Imagen Generada */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-extrabold text-slate-700 flex items-center gap-1.5">
                        <ImageIcon size={13} className="text-purple-600" />
                        <span>Imagen Generada de la Lámina (Cloudflare R2 o Ruta Local)</span>
                      </label>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...(lessonData.paso2_hook.slides || [])];
                            updated[sIdx].imageUrl = '/visuals/desafio-submarino.png';
                            setLessonData({
                              ...lessonData,
                              paso2_hook: { ...lessonData.paso2_hook, slides: updated }
                            });
                          }}
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-700 cursor-pointer"
                        >
                          desafio-submarino.png
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...(lessonData.paso2_hook.slides || [])];
                            updated[sIdx].imageUrl = '/visuals/submarino-20.png';
                            setLessonData({
                              ...lessonData,
                              paso2_hook: { ...lessonData.paso2_hook, slides: updated }
                            });
                          }}
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-700 cursor-pointer"
                        >
                          submarino-20.png
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={slide.imageUrl || ''}
                        onChange={(e) => {
                          const updated = [...(lessonData.paso2_hook.slides || [])];
                          updated[sIdx].imageUrl = e.target.value;
                          setLessonData({
                            ...lessonData,
                            paso2_hook: { ...lessonData.paso2_hook, slides: updated }
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
                          const updated = [...(lessonData.paso2_hook.slides || [])];
                          updated[sIdx].overlayText = e.target.value;
                          setLessonData({
                            ...lessonData,
                            paso2_hook: { ...lessonData.paso2_hook, slides: updated }
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
                          const updated = [...(lessonData.paso2_hook.slides || [])];
                          updated[sIdx].speakerNotes = e.target.value;
                          setLessonData({
                            ...lessonData,
                            paso2_hook: { ...lessonData.paso2_hook, slides: updated }
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
                        const updated = [...(lessonData.paso2_hook.slides || [])];
                        updated[sIdx].visualPrompt = e.target.value;
                        setLessonData({
                          ...lessonData,
                          paso2_hook: { ...lessonData.paso2_hook, slides: updated }
                        });
                      }}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-600 font-mono text-[11px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== PASO 4: CONVERSACIÓN GUIADA ===================== */}
        {activeStepTab === 4 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                  <MessageSquare className="text-[#3B82F6]" size={18} />
                  <span>Paso 4: Conversación Guiada y Exploración Socrática</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Preguntas orientadas a comprobar la comprensión del video y elicitar deducciones.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const currentList = lessonData.paso3_recorrido || [];
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
                    paso3_recorrido: [...currentList, newItem]
                  });
                }}
                className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} />
                <span>Añadir Pregunta</span>
              </button>
            </div>

            <div className="space-y-4">
              {(lessonData.paso3_recorrido || []).map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-700 uppercase">
                      Ítem {idx + 1}: {item.context}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (lessonData.paso3_recorrido || []).filter((_, i) => i !== idx);
                        setLessonData({ ...lessonData, paso3_recorrido: updated });
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
                          const updated = [...(lessonData.paso3_recorrido || [])];
                          updated[idx].context = e.target.value;
                          setLessonData({ ...lessonData, paso3_recorrido: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        Pregunta Socrática
                      </label>
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e) => {
                          const updated = [...(lessonData.paso3_recorrido || [])];
                          updated[idx].question = e.target.value;
                          setLessonData({ ...lessonData, paso3_recorrido: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                      Respuesta Esperada
                    </label>
                    <input
                      type="text"
                      value={item.expected}
                      onChange={(e) => {
                        const updated = [...(lessonData.paso3_recorrido || [])];
                        updated[idx].expected = e.target.value;
                        setLessonData({ ...lessonData, paso3_recorrido: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        DILE si acierta
                      </label>
                      <input
                        type="text"
                        value={item.success}
                        onChange={(e) => {
                          const updated = [...(lessonData.paso3_recorrido || [])];
                          updated[idx].success = e.target.value;
                          setLessonData({ ...lessonData, paso3_recorrido: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-emerald-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        DILE si necesita apoyo
                      </label>
                      <input
                        type="text"
                        value={item.support}
                        onChange={(e) => {
                          const updated = [...(lessonData.paso3_recorrido || [])];
                          updated[idx].support = e.target.value;
                          setLessonData({ ...lessonData, paso3_recorrido: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-amber-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        Texto de Revelación (Mentor)
                      </label>
                      <input
                        type="text"
                        value={item.reveal}
                        onChange={(e) => {
                          const updated = [...(lessonData.paso3_recorrido || [])];
                          updated[idx].reveal = e.target.value;
                          setLessonData({ ...lessonData, paso3_recorrido: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        Texto Revelado al Estudiante
                      </label>
                      <input
                        type="text"
                        value={item.studentReveal}
                        onChange={(e) => {
                          const updated = [...(lessonData.paso3_recorrido || [])];
                          updated[idx].studentReveal = e.target.value;
                          setLessonData({ ...lessonData, paso3_recorrido: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-600 font-bold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== PASO 5: VIDEO EXPLICATIVO E IDEA CLAVE ===================== */}
        {activeStepTab === 5 && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                  <Lightbulb className="text-[#F59E0B]" size={18} />
                  <span>Paso 5: Video Explicativo e Idea Clave</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Video de formalización conceptual en Cloudflare (Stream / R2), reproductor en vivo e idea clave disciplinar.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCopyPrompt('explicativo')}
                className="px-3.5 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copyFeedback === 'explicativo' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copyFeedback === 'explicativo' ? '¡Prompt Copiado!' : 'Copiar Prompt ChatGPT Work'}</span>
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

                {lessonData.paso4_explicativo?.videoUrl ? (
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
                          const cur = lessonData.paso4_explicativo?.videoUrl || '';
                          if (!cur.startsWith(base)) {
                            setLessonData({
                              ...lessonData,
                              paso4_explicativo: {
                                ...lessonData.paso4_explicativo,
                                videoUrl: `${base}${cur.replace(/^https?:\/\/[^/]+\//, '')}`
                              }
                            });
                          }
                        }}
                        className="text-[10px] font-black text-amber-800 hover:underline px-1.5 py-0.5 rounded-md bg-amber-100 cursor-pointer"
                        title="Insertar prefijo del bucket público Cloudflare R2"
                      >
                        + Base R2
                      </button>
                      {lessonData.paso4_explicativo?.videoUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setLessonData({
                              ...lessonData,
                              paso4_explicativo: { ...lessonData.paso4_explicativo, videoUrl: '' }
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
                    value={lessonData.paso4_explicativo?.videoUrl || ''}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        paso4_explicativo: {
                          ...lessonData.paso4_explicativo,
                          videoUrl: e.target.value
                        }
                      })
                    }
                    placeholder="https://pub-8f9429cd99194355a2cf0bc7c5794833.r2.dev/video.mp4"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono bg-white text-slate-800 focus:outline-hidden focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    URL de Portada / Póster (Opcional)
                  </label>
                  <input
                    type="text"
                    value={(lessonData.paso4_explicativo as any)?.posterUrl || ''}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        paso4_explicativo: {
                          ...lessonData.paso4_explicativo,
                          posterUrl: e.target.value
                        }
                      })
                    }
                    placeholder="https://... o /visuals/cero-referencia.png"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono bg-white text-slate-800 focus:outline-hidden focus:border-amber-600"
                  />
                </div>
              </div>

              {/* REPRODUCTOR EN VIVO DE PRUEBA */}
              {lessonData.paso4_explicativo?.videoUrl ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                    <span>Previsualización en tiempo real del video explicativo:</span>
                    <a
                      href={lessonData.paso4_explicativo.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-800 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <ExternalLink size={12} />
                      <span>Abrir archivo en pestaña nueva</span>
                    </a>
                  </div>
                  <div className="rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-lg aspect-video max-h-80 flex items-center justify-center">
                    <video
                      key={lessonData.paso4_explicativo.videoUrl}
                      src={lessonData.paso4_explicativo.videoUrl}
                      poster={(lessonData.paso4_explicativo as any)?.posterUrl || lessonData.paso4_explicativo.slides?.[0]?.imageUrl}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl border-2 border-dashed border-amber-200 bg-white/70 flex flex-col items-center justify-center text-center">
                  <Video size={28} className="text-amber-500 mb-2" />
                  <p className="text-xs font-bold text-slate-700">Sin video explicativo asignado</p>
                  <p className="text-[11px] text-slate-500 max-w-sm mt-0.5">
                    Pega la URL de Cloudflare Stream o Cloudflare R2 arriba para verificar de inmediato la reproducción en este visor.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Idea Clave Disciplinar (Concepto Central a Fijar)
                </label>
                <textarea
                  rows={2}
                  value={lessonData.paso4_explicativo?.ideaClave || ''}
                  onChange={(e) =>
                    setLessonData({
                      ...lessonData,
                      paso4_explicativo: {
                        ...lessonData.paso4_explicativo,
                        ideaClave: e.target.value
                      }
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300 text-xs font-bold text-amber-950 bg-amber-50/70"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Título de la Formalización
                  </label>
                  <input
                    type="text"
                    value={lessonData.paso4_explicativo?.titulo || ''}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        paso4_explicativo: {
                          ...lessonData.paso4_explicativo,
                          titulo: e.target.value
                        }
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    DILE antes de la explicación
                  </label>
                  <input
                    type="text"
                    value={lessonData.paso4_explicativo?.dileAntes || ''}
                    onChange={(e) =>
                      setLessonData({
                        ...lessonData,
                        paso4_explicativo: {
                          ...lessonData.paso4_explicativo,
                          dileAntes: e.target.value
                        }
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  />
                </div>
              </div>
            </div>

            {/* SECCIÓN DE VERIFICACIÓN: LAS 7 DIAPOSITIVAS EXPLICATIVAS */}
            <div className="space-y-4 pt-2">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-2">
                  <Layers size={15} className="text-amber-600" />
                  <span>Ficha Técnica y Verificación de Guion de Formalización (7 Diapositivas)</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Verifica que el video formalice la regla paso a paso según el principio pedagógico de un cambio mental por diapositiva.
                </p>
              </div>

              {(lessonData.paso4_explicativo?.slides || []).map((slide, sIdx) => (
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

                  {/* Campo de Imagen Generada */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-extrabold text-slate-700 flex items-center gap-1.5">
                        <ImageIcon size={13} className="text-amber-600" />
                        <span>Imagen Generada de la Lámina (Cloudflare R2 o Ruta Local)</span>
                      </label>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...(lessonData.paso4_explicativo.slides || [])];
                            updated[sIdx].imageUrl = '/visuals/cero-referencia.png';
                            setLessonData({
                              ...lessonData,
                              paso4_explicativo: { ...lessonData.paso4_explicativo, slides: updated }
                            });
                          }}
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-800 cursor-pointer"
                        >
                          cero-referencia.png
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...(lessonData.paso4_explicativo.slides || [])];
                            updated[sIdx].imageUrl = '/visuals/posicion-movimiento.png';
                            setLessonData({
                              ...lessonData,
                              paso4_explicativo: { ...lessonData.paso4_explicativo, slides: updated }
                            });
                          }}
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-800 cursor-pointer"
                        >
                          posicion-movimiento.png
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={slide.imageUrl || ''}
                        onChange={(e) => {
                          const updated = [...(lessonData.paso4_explicativo.slides || [])];
                          updated[sIdx].imageUrl = e.target.value;
                          setLessonData({
                            ...lessonData,
                            paso4_explicativo: { ...lessonData.paso4_explicativo, slides: updated }
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
                          const updated = [...(lessonData.paso4_explicativo.slides || [])];
                          updated[sIdx].overlayText = e.target.value;
                          setLessonData({
                            ...lessonData,
                            paso4_explicativo: { ...lessonData.paso4_explicativo, slides: updated }
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
                          const updated = [...(lessonData.paso4_explicativo.slides || [])];
                          updated[sIdx].speakerNotes = e.target.value;
                          setLessonData({
                            ...lessonData,
                            paso4_explicativo: { ...lessonData.paso4_explicativo, slides: updated }
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
                        const updated = [...(lessonData.paso4_explicativo.slides || [])];
                        updated[sIdx].visualPrompt = e.target.value;
                        setLessonData({
                          ...lessonData,
                          paso4_explicativo: { ...lessonData.paso4_explicativo, slides: updated }
                        });
                      }}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-600 font-mono text-[11px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== PASO 6: PRÁCTICA CONJUNTA ===================== */}
        {activeStepTab === 6 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                  <FileText className="text-[#10B981]" size={18} />
                  <span>Paso 6: Práctica Conjunta y Cuaderno Físico</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Ejercicios de aplicación guiada con revelación paso a paso para resolver en cuaderno.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const currentList = lessonData.paso5_practica || [];
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
                    paso5_practica: [...currentList, newItem]
                  });
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} />
                <span>Añadir Ejercicio</span>
              </button>
            </div>

            <div className="space-y-4">
              {(lessonData.paso5_practica || []).map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-700 uppercase">
                      Ejercicio {idx + 1}: {item.context}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (lessonData.paso5_practica || []).filter((_, i) => i !== idx);
                        setLessonData({ ...lessonData, paso5_practica: updated });
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
                          const updated = [...(lessonData.paso5_practica || [])];
                          updated[idx].context = e.target.value;
                          setLessonData({ ...lessonData, paso5_practica: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        Enunciado / Pregunta
                      </label>
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e) => {
                          const updated = [...(lessonData.paso5_practica || [])];
                          updated[idx].question = e.target.value;
                          setLessonData({ ...lessonData, paso5_practica: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                      Respuesta Esperada
                    </label>
                    <input
                      type="text"
                      value={item.expected}
                      onChange={(e) => {
                        const updated = [...(lessonData.paso5_practica || [])];
                        updated[idx].expected = e.target.value;
                        setLessonData({ ...lessonData, paso5_practica: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        DILE si acierta
                      </label>
                      <input
                        type="text"
                        value={item.success}
                        onChange={(e) => {
                          const updated = [...(lessonData.paso5_practica || [])];
                          updated[idx].success = e.target.value;
                          setLessonData({ ...lessonData, paso5_practica: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-emerald-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        DILE si requiere apoyo
                      </label>
                      <input
                        type="text"
                        value={item.support}
                        onChange={(e) => {
                          const updated = [...(lessonData.paso5_practica || [])];
                          updated[idx].support = e.target.value;
                          setLessonData({ ...lessonData, paso5_practica: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-amber-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        Revelación para el Mentor
                      </label>
                      <input
                        type="text"
                        value={item.reveal}
                        onChange={(e) => {
                          const updated = [...(lessonData.paso5_practica || [])];
                          updated[idx].reveal = e.target.value;
                          setLessonData({ ...lessonData, paso5_practica: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        Revelación en Pantalla del Estudiante
                      </label>
                      <input
                        type="text"
                        value={item.studentReveal}
                        onChange={(e) => {
                          const updated = [...(lessonData.paso5_practica || [])];
                          updated[idx].studentReveal = e.target.value;
                          setLessonData({ ...lessonData, paso5_practica: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-600 font-bold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== PASO 7: MINIQUIZ Y RECUPERACIÓN ===================== */}
        {activeStepTab === 7 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                <CheckSquare className="text-[#EC4899]" size={18} />
                <span>Paso 7: Evaluación Formativa (Miniquiz) y Bucle de Recuperación</span>
              </h2>
              <p className="text-xs text-slate-500">
                Preguntas de selección múltiple con feedback correctivo inmediato y refuerzo psicométrico.
              </p>
            </div>

            {/* SECCIÓN A: MINIQUIZ */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                  A. Preguntas del Miniquiz
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const currentQuiz = lessonData.paso7_miniquiz || [];
                    const newQ: QuizQuestion = {
                      q: '¿Cuál es la afirmación correcta?',
                      options: ['Alternativa A', 'Alternativa B', 'Alternativa C'],
                      correct: 'Alternativa A',
                      fixExplain: 'Revisa el concepto con tu mentor para aclarar.'
                    };
                    setLessonData({
                      ...lessonData,
                      paso7_miniquiz: [...currentQuiz, newQ]
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Añadir Pregunta</span>
                </button>
              </div>

              {(lessonData.paso7_miniquiz || []).map((qItem, qIdx) => (
                <div
                  key={qIdx}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-pink-700 uppercase">
                      Pregunta {qIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (lessonData.paso7_miniquiz || []).filter((_, i) => i !== qIdx);
                        setLessonData({ ...lessonData, paso7_miniquiz: updated });
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-md cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                      Enunciado de la Pregunta
                    </label>
                    <input
                      type="text"
                      value={qItem.q}
                      onChange={(e) => {
                        const updated = [...(lessonData.paso7_miniquiz || [])];
                        updated[qIdx].q = e.target.value;
                        setLessonData({ ...lessonData, paso7_miniquiz: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                    />
                  </div>

                  {/* Opciones */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-600">
                      Alternativas (Escribe cada una y marca la correcta)
                    </label>
                    {qItem.options.map((opt, oIdx) => {
                      const isCorrect = opt === qItem.correct;
                      return (
                        <div key={oIdx} className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(lessonData.paso7_miniquiz || [])];
                              updated[qIdx].correct = opt;
                              setLessonData({ ...lessonData, paso7_miniquiz: updated });
                            }}
                            className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 transition-colors ${
                              isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                            }`}
                            title="Marcar como correcta"
                          >
                            {isCorrect ? '✓' : ''}
                          </button>
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => {
                              const updated = [...(lessonData.paso7_miniquiz || [])];
                              const oldVal = updated[qIdx].options[oIdx];
                              updated[qIdx].options[oIdx] = e.target.value;
                              if (updated[qIdx].correct === oldVal) {
                                updated[qIdx].correct = e.target.value;
                              }
                              setLessonData({ ...lessonData, paso7_miniquiz: updated });
                            }}
                            className={`flex-1 px-3 py-1 rounded-xl border text-xs bg-white ${
                              isCorrect ? 'border-emerald-500 font-bold bg-emerald-50/30' : 'border-slate-300'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                      Explicación Formativa (En caso de error)
                    </label>
                    <input
                      type="text"
                      value={qItem.fixExplain}
                      onChange={(e) => {
                        const updated = [...(lessonData.paso7_miniquiz || [])];
                        updated[qIdx].fixExplain = e.target.value;
                        setLessonData({ ...lessonData, paso7_miniquiz: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-600 font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* SECCIÓN B: RECUPERACIÓN */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                  B. Bucle de Recuperación Pedagógica
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const currentRec = lessonData.paso7b_recuperacion || [];
                    const newR: RecoveryItem = {
                      title: `Refuerzo ${currentRec.length + 1}`,
                      explain: 'Revisemos esta idea paso a paso con un ejemplo claro.',
                      q: 'Pregunta de comprobación rápida:',
                      options: ['Opción 1', 'Opción 2'],
                      correct: 'Opción 1',
                      correctText: '¡Eso es! Has afianzado el concepto.',
                      fixText: 'Observa nuevamente la regla central con tu mentor.'
                    };
                    setLessonData({
                      ...lessonData,
                      paso7b_recuperacion: [...currentRec, newR]
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Añadir Ítem de Recuperación</span>
                </button>
              </div>

              {(lessonData.paso7b_recuperacion || []).map((rItem, rIdx) => (
                <div
                  key={rIdx}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-purple-700 uppercase">
                      Ítem de Recuperación {rIdx + 1}: {rItem.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (lessonData.paso7b_recuperacion || []).filter((_, i) => i !== rIdx);
                        setLessonData({ ...lessonData, paso7b_recuperacion: updated });
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
                          const updated = [...(lessonData.paso7b_recuperacion || [])];
                          updated[rIdx].title = e.target.value;
                          setLessonData({ ...lessonData, paso7b_recuperacion: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-0.5">
                        Pregunta de Refuerzo
                      </label>
                      <input
                        type="text"
                        value={rItem.q}
                        onChange={(e) => {
                          const updated = [...(lessonData.paso7b_recuperacion || [])];
                          updated[rIdx].q = e.target.value;
                          setLessonData({ ...lessonData, paso7b_recuperacion: updated });
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
                        const updated = [...(lessonData.paso7b_recuperacion || [])];
                        updated[rIdx].explain = e.target.value;
                        setLessonData({ ...lessonData, paso7b_recuperacion: updated });
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
                          const updated = [...(lessonData.paso7b_recuperacion || [])];
                          updated[rIdx].correct = e.target.value;
                          setLessonData({ ...lessonData, paso7b_recuperacion: updated });
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
                          const updated = [...(lessonData.paso7b_recuperacion || [])];
                          updated[rIdx].fixText = e.target.value;
                          setLessonData({ ...lessonData, paso7b_recuperacion: updated });
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

        {/* ===================== PASO 8: CIERRE Y METAGOGNICIÓN ===================== */}
        {activeStepTab === 8 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-black uppercase text-slate-900 flex items-center gap-2">
                <Sparkles className="text-[#6366F1]" size={18} />
                <span>Paso 8: Cierre, Resumen y Metacognición</span>
              </h2>
              <p className="text-xs text-slate-500">
                Síntesis conceptual de la jornada, preguntas de autorreflexión y mensaje de celebración final.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Idea Clave de Cierre
              </label>
              <textarea
                rows={2}
                value={lessonData.paso6_resumen?.ideaClave || ''}
                onChange={(e) =>
                  setLessonData({
                    ...lessonData,
                    paso6_resumen: {
                      ...lessonData.paso6_resumen,
                      ideaClave: e.target.value
                    }
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-indigo-50/40 text-indigo-950"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Párrafo de Síntesis General
              </label>
              <textarea
                rows={3}
                value={lessonData.paso6_resumen?.sintesis || ''}
                onChange={(e) =>
                  setLessonData({
                    ...lessonData,
                    paso6_resumen: {
                      ...lessonData.paso6_resumen,
                      sintesis: e.target.value
                    }
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-700"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pregunta de Síntesis
                </label>
                <input
                  type="text"
                  value={lessonData.paso8_cierre?.preguntaSintesis || ''}
                  onChange={(e) =>
                    setLessonData({
                      ...lessonData,
                      paso8_cierre: {
                        ...lessonData.paso8_cierre,
                        preguntaSintesis: e.target.value
                      }
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Reflexión Metacognitiva
                </label>
                <input
                  type="text"
                  value={lessonData.paso8_cierre?.metacognicion || ''}
                  onChange={(e) =>
                    setLessonData({
                      ...lessonData,
                      paso8_cierre: {
                        ...lessonData.paso8_cierre,
                        metacognicion: e.target.value
                      }
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Celebración y Reconocimiento de Esfuerzo
              </label>
              <textarea
                rows={2}
                value={lessonData.paso8_cierre?.celebracion || ''}
                onChange={(e) =>
                  setLessonData({
                    ...lessonData,
                    paso8_cierre: {
                      ...lessonData.paso8_cierre,
                      celebracion: e.target.value
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
  );
};
