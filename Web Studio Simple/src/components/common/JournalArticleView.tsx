import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  User,
  Share2,
  CheckCircle2,
  Newspaper,
  ArrowRight
} from 'lucide-react';
import { JournalArticle } from '../../types/cmsExtras';
import { loadJournalArticles } from '../../data/initialCmsExtrasData';

interface JournalArticleViewProps {
  article: JournalArticle;
  onBack: () => void;
  onNavigateToPricing?: () => void;
  onSelectRelated?: (article: JournalArticle) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  MINEDUC: 'bg-teal-50 text-[#12A1A4] border-teal-200',
  Homeschooling: 'bg-amber-50 text-amber-700 border-amber-200',
  'Cuaderno y Método': 'bg-orange-50 text-orange-700 border-orange-200',
  Neurodiversidad: 'bg-purple-50 text-purple-700 border-purple-200',
  Orientación: 'bg-blue-50 text-blue-700 border-blue-200'
};

export const JournalArticleView: React.FC<JournalArticleViewProps> = ({
  article,
  onBack,
  onSelectRelated
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const allArticles = loadJournalArticles();

  // Calcular tiempo de lectura estimado
  const words = (article.contenido || '').trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(words / 180));

  // Artículos relacionados (excluyendo el actual)
  const relatedArticles = allArticles
    .filter((a) => a.activo && a.id !== article.id)
    .slice(0, 3);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const badgeColor =
    CATEGORY_COLORS[article.categoria] ||
    'bg-teal-50 text-[#12A1A4] border-teal-200';

  const shareText = encodeURIComponent(
    `Te recomiendo leer: "${article.titulo}"`
  );
  const currentUrl = encodeURIComponent(window.location.href);

  return (
    <div className="bg-white text-slate-900 w-full min-h-screen pt-24 md:pt-32 pb-24 font-sans selection:bg-[#12A1A4]/20 selection:text-slate-900">
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* 1. Botón de retorno simple y discreto */}
        <div className="mb-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#12A1A4] hover:text-[#0e8284] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Volver a noticias</span>
          </button>
        </div>

        {/* 2. Cabecera Editorial con el Título Arriba */}
        <header className="mb-10 text-center">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest border ${badgeColor}`}
            >
              {article.categoria}
            </span>
            <span className="text-sm font-semibold text-slate-500">
              {article.fecha}
            </span>
            <span className="text-sm font-semibold text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{readTime} min de lectura</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight md:leading-[1.15]">
            {article.titulo}
          </h1>

          {article.extracto && (
            <p className="mx-auto mt-5 text-base sm:text-xl leading-relaxed text-slate-600 font-normal max-w-2xl">
              {article.extracto}
            </p>
          )}
        </header>

        {/* 3. Imagen de Portada Panorámica */}
        {article.imagenPortadaUrl ? (
          <div className="mb-12 overflow-hidden rounded-3xl shadow-xl border border-slate-100 bg-slate-50">
            <img
              src={article.imagenPortadaUrl}
              alt={article.titulo}
              className="w-full max-h-[560px] object-cover object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/journal-default.webp';
              }}
            />
          </div>
        ) : (
          <div className="mb-12 flex items-center justify-center rounded-3xl bg-slate-50 border border-slate-100 py-20">
            <Newspaper className="w-16 h-16 text-slate-300" />
          </div>
        )}

        {/* 4. Cuerpo de la Noticia: Letra Grande, Nítida, Alto Contraste y Sin Distractores */}
        <div className="mb-16">
          <div className="text-base sm:text-lg md:text-xl text-slate-800 leading-relaxed font-normal space-y-6 whitespace-pre-line">
            {article.contenido}
          </div>
        </div>

        {/* 5. Pie de Noticia: Autor y Compartir (Únicamente al terminar de leer) */}
        <div className="border-t border-slate-200 pt-8 mb-20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200">
              <User className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">
                {article.autor || 'Equipo Pedagógico EstudioSimple'}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Publicado el {article.fecha}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartir:</span>
            </span>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${shareText}%20${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#25D366] hover:text-white transition-colors"
              title="Compartir en WhatsApp"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#1877F2] hover:text-white transition-colors"
              title="Compartir en Facebook"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>

            {/* Copiar Enlace */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex h-9 px-3 items-center gap-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-xs font-bold cursor-pointer"
              title="Copiar enlace"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copiado</span>
                </>
              ) : (
                <span>Copiar Enlace</span>
              )}
            </button>
          </div>
        </div>

        {/* 6. Artículos Relacionados ("Te podría interesar") */}
        {relatedArticles.length > 0 && (
          <div className="bg-slate-50 py-12 px-6 sm:px-8 rounded-3xl border border-slate-100">
            <h3 className="mb-6 text-xl font-black text-slate-900 text-center">
              Te podría interesar
            </h3>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedArticles.map((rel) => {
                const relBadge =
                  CATEGORY_COLORS[rel.categoria] ||
                  'bg-teal-50 text-[#12A1A4] border-teal-200';

                return (
                  <div
                    key={rel.id}
                    onClick={() => {
                      if (onSelectRelated) {
                        onSelectRelated(rel);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="group block overflow-hidden rounded-2xl bg-white shadow-xs border border-slate-200 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                      {rel.imagenPortadaUrl ? (
                        <img
                          src={rel.imagenPortadaUrl}
                          alt={rel.titulo}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/journal-default.webp';
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-teal-50">
                          <Newspaper className="w-8 h-8 text-[#12A1A4]/40" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase border ${relBadge}`}
                          >
                            {rel.categoria}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {rel.fecha}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-sm text-slate-900 line-clamp-2 leading-tight group-hover:text-[#12A1A4] transition-colors">
                          {rel.titulo}
                        </h4>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#12A1A4]">
                        <span>Leer más</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
