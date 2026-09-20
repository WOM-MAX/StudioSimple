import React, { useState } from 'react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  pdfUrl?: string;
  bookSubject?: string;
  grade?: string;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  grade = '7° Básico',
}) => {
  const [selectedSubjectTab, setSelectedSubjectTab] = useState<'Historia' | 'Matemáticas' | 'Lenguaje' | 'Ciencias' | 'Inglés'>('Historia');
  const [viewMode, setViewMode] = useState<'pdf' | 'interactive'>('pdf');
  const [currentPage, setCurrentPage] = useState<number>(12);

  if (!isOpen) return null;

  const MINEDUC_BOOKS = {
    Historia: {
      name: 'Historia, Geografía y Ciencias Sociales • 7° Básico',
      edition: 'Edición Oficial MINEDUC 2026',
      pdfUrl: 'https://www.curriculumnacional.cl/614/articles-145558_recurso_pdf.pdf',
      totalPages: 312,
      chapters: [
        { page: 12, title: 'Capítulo 1: El proceso de sedentarización humana en el Neolítico (OA 01)' },
        { page: 50, title: 'Capítulo 2: El surgimiento de las primeras civilizaciones (OA 02)' },
        { page: 100, title: 'Capítulo 3: El legado del mundo clásico grecorromano (OA 03)' },
        { page: 168, title: 'Capítulo 4: La Edad Media y el encuentro entre dos mundos (OA 04)' },
      ]
    },
    Matemáticas: {
      name: 'Matemática • 7° Básico',
      edition: 'Edición Oficial MINEDUC 2026',
      pdfUrl: 'https://www.curriculumnacional.cl/614/articles-145554_recurso_pdf.pdf',
      totalPages: 280,
      chapters: [
        { page: 8, title: 'Capítulo 1: Números Enteros y operaciones en Z (OA 01)' },
        { page: 44, title: 'Capítulo 2: Razones, proporciones y porcentaje (OA 02)' },
        { page: 90, title: 'Capítulo 3: Álgebra y expresiones algebraicas (OA 03)' },
      ]
    },
    Lenguaje: {
      name: 'Lengua y Literatura • 7° Básico',
      edition: 'Edición Oficial MINEDUC 2026',
      pdfUrl: 'https://www.curriculumnacional.cl/614/articles-145548_recurso_pdf.pdf',
      totalPages: 260,
      chapters: [
        { page: 10, title: 'Capítulo 1: Comprensión de textos narrativos e inferencias (OA 01)' },
        { page: 58, title: 'Capítulo 2: Análisis de textos argumentativos (OA 02)' },
      ]
    },
    Ciencias: {
      name: 'Ciencias Naturales • 7° Básico',
      edition: 'Edición Oficial MINEDUC 2026',
      pdfUrl: 'https://www.curriculumnacional.cl/614/articles-145562_recurso_pdf.pdf',
      totalPages: 295,
      chapters: [
        { page: 14, title: 'Capítulo 1: La célula como unidad estructural de la vida (OA 01)' },
        { page: 62, title: 'Capítulo 2: Sistemas del cuerpo humano (OA 02)' },
      ]
    },
    Inglés: {
      name: 'English • 7th Grade Student Book',
      edition: 'Edición Oficial MINEDUC 2026',
      pdfUrl: 'https://www.curriculumnacional.cl/614/articles-145570_recurso_pdf.pdf',
      totalPages: 190,
      chapters: [
        { page: 6, title: 'Unit 1: Daily Life and Feelings (OA 01)' },
      ]
    }
  };

  const currentBook = MINEDUC_BOOKS[selectedSubjectTab];
  const activePdfSrc = `${currentBook.pdfUrl}#page=${currentPage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-6xl h-[92vh] bg-[#0A192F] border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header Superior del Visor MINEDUC */}
        <div className="flex flex-wrap items-center justify-between px-6 py-3 border-b border-white/10 bg-[#1C3257]/90 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#F8AD22]/20 text-[#F8AD22] border border-[#F8AD22]/40">
              <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase text-[#18AFCB] tracking-wider">{grade} • Documento Oficial MINEDUC</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">✓ Lector PDF Nativo Activo</span>
              </div>
              <h2 className="text-base font-black text-white">{currentBook.name}</h2>
            </div>
          </div>

          {/* Selector de Asignaturas */}
          <div className="flex items-center gap-1.5 bg-black/30 p-1.5 rounded-2xl border border-white/10">
            {(['Historia', 'Matemáticas', 'Lenguaje', 'Ciencias', 'Inglés'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setSelectedSubjectTab(tab);
                  setCurrentPage(tab === 'Historia' ? 12 : tab === 'Matemáticas' ? 8 : 10);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSubjectTab === tab
                    ? 'bg-[#18AFCB] text-white shadow-md font-black scale-105'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Botón de Cerrar */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/10"
            title="Cerrar Visor PDF"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Toolbar de Navegación por Capítulos y Modo de Vista */}
        <div className="flex flex-wrap items-center justify-between px-6 py-2 bg-black/40 border-b border-white/10 text-xs gap-2">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-[10px] font-black uppercase text-[#F8AD22]">Capítulos:</span>
            {currentBook.chapters.map((chap, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(chap.page)}
                className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all border whitespace-nowrap ${
                  currentPage === chap.page
                    ? 'bg-[#F8AD22] text-[#0A192F] border-[#F8AD22] font-black'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/15'
                }`}
              >
                Pág. {chap.page} • {chap.title.split(':')[0]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={currentBook.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#F8AD22] hover:bg-[#e09a1e] text-[#0A192F] font-black text-xs transition-all flex items-center gap-1.5 shadow-md"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              <span>Abrir PDF en Pestaña Nueva</span>
            </a>
          </div>
        </div>

        {/* Cuerpos del Visor: IFRAME PDF NATIVO REAL DEL MINEDUC */}
        <div className="flex-1 bg-slate-950 p-2 relative overflow-hidden flex flex-col">
          <iframe
            src={activePdfSrc}
            className="w-full h-full rounded-2xl border border-white/15 shadow-2xl bg-white"
            title={currentBook.name}
          />
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-2.5 border-t border-white/10 bg-[#1C3257]/90 flex items-center justify-between text-xs text-white/70">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-[#F8AD22]">verified</span>
            <span>Documentos PDF Oficiales del Ministerio de Educación de Chile (CurriculumNacional.cl)</span>
          </span>
          <span className="font-mono text-[10px] text-white/50">Lector de PDF Oficial Integrado</span>
        </div>

      </div>
    </div>
  );
};
