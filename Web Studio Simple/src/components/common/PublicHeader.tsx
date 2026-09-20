import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, LogIn, LogOut, Lock } from 'lucide-react';
import { SiteConfig } from '../../types/cmsExtras';
import { CmsPage } from '../../types/cms';

interface PublicHeaderProps {
  siteConfig: SiteConfig;
  menuPages: CmsPage[];
  currentSlug: string;
  onNavigatePage: (slug: string) => void;
  onNavigatePricing: () => void;
  isJournalArticleOpen?: boolean;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({
  siteConfig,
  menuPages,
  currentSlug,
  onNavigatePage,
  onNavigatePricing,
  isJournalArticleOpen = false,
}) => {
  const { setViewMode, authSession, logout } = useApp();
  const isAuthenticated = authSession?.isAuthenticated === true;

  const activeColor = siteConfig.header?.activeLinkColor || '#12A1A4';
  const activeStyle = siteConfig.header?.activeLinkStyle || 'underline';
  const fontClass = siteConfig.header?.menuFontSize === 'lg'
    ? 'text-sm sm:text-base md:text-lg'
    : siteConfig.header?.menuFontSize === 'base'
    ? 'text-xs sm:text-base'
    : 'text-xs sm:text-sm';
  const inactiveTextColor = siteConfig.header?.headerTextColor || '#123A72';

  const getLinkClasses = (isActive: boolean) => {
    const base = `transition-all cursor-pointer font-bold ${fontClass}`;
    if (isActive) {
      if (activeStyle === 'pill') {
        return `${base} font-extrabold px-3 py-1 rounded-full border shadow-xs`;
      }
      if (activeStyle === 'bold') {
        return `${base} font-black`;
      }
      return `${base} font-extrabold underline underline-offset-4 decoration-2`;
    }
    return `${base} opacity-85 hover:opacity-100 hover:underline`;
  };

  const getLinkStyle = (isActive: boolean): React.CSSProperties => {
    if (isActive) {
      if (activeStyle === 'pill') {
        return {
          color: activeColor,
          backgroundColor: `${activeColor}18`,
          borderColor: `${activeColor}40`,
        };
      }
      return {
        color: activeColor,
        textDecorationColor: activeColor,
      };
    }
    return {
      color: inactiveTextColor,
    };
  };

  const deduplicatedPages = React.useMemo(() => {
    const seen = new Set<string>();
    return menuPages.filter((p) => {
      const key = p.slug.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [menuPages]);

  return (
    <header 
      className="fixed top-0 w-full z-50 border-b border-black/10 shadow-md transition-all duration-300 backdrop-blur-md" 
      style={{ backgroundColor: siteConfig.header?.headerBgColor || 'var(--hf-bg)', color: 'var(--hf-text)' }}
    >
      <div className="flex justify-between items-center px-4 md:px-12 max-w-7xl mx-auto py-3 md:py-4">
        {/* Contenedor del Logotipo Oficial con Placa Blanca */}
        <div 
          className="flex items-center shrink-0 cursor-pointer bg-white hover:bg-white/95 rounded-xl px-4 md:px-5 py-1 md:py-1.5 shadow-sm border border-black/10 hover:shadow-md transition-all duration-300" 
          onClick={() => onNavigatePage('/')}
          title="EstudioSimple"
        >
          <img 
            alt="Estudio Simple Logo" 
            className="h-14 md:h-16 lg:h-20 w-auto object-contain" 
            src={siteConfig.header?.logoUrl || '/logos/Logo_cabecera.png'}
          />
        </div>

        {/* Enlaces de Navegación y Acciones */}
        <div className="flex items-center gap-3 sm:gap-6">
          {deduplicatedPages.map((p) => {
            if (p.slug === '/') {
              const isActive = currentSlug === '/' && !isJournalArticleOpen;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onNavigatePage('/')}
                  className={getLinkClasses(isActive)}
                  style={getLinkStyle(isActive)}
                >
                  Inicio
                </button>
              );
            }
            if (p.slug === '/planes') {
              const isActive = currentSlug === '/planes' && !isJournalArticleOpen;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={onNavigatePricing}
                  className={getLinkClasses(isActive)}
                  style={getLinkStyle(isActive)}
                >
                  {siteConfig.header?.planesButtonText || p.titulo}
                </button>
              );
            }
            if (p.slug === '/cursos' || p.slug === '/clases') {
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    if (!isAuthenticated) {
                      setViewMode('login');
                    } else {
                      setViewMode('courses');
                    }
                  }}
                  className={getLinkClasses(false)}
                  style={getLinkStyle(false)}
                >
                  {p.titulo}
                </button>
              );
            }
            const isActive = currentSlug === p.slug && !isJournalArticleOpen;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onNavigatePage(p.slug)}
                className={getLinkClasses(isActive)}
                style={getLinkStyle(isActive)}
              >
                {p.titulo}
              </button>
            );
          })}

          {isAuthenticated ? (
            <>
              <button
                onClick={() => {
                  if (authSession?.role === 'admin') {
                    setViewMode('admin');
                  } else if (authSession?.role === 'parent') {
                    setViewMode('parent');
                  } else {
                    setViewMode('student');
                  }
                }}
                className="font-bold text-xs bg-black/15 hover:bg-black/25 px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
              >
                <User className="w-4 h-4" />
                <span>
                  {authSession?.role === 'admin' 
                    ? 'Panel Admin' 
                    : authSession?.role === 'parent' 
                    ? 'Panel Apoderado' 
                    : 'Mi Aula'}
                </span>
              </button>
              <button
                onClick={logout}
                className="font-bold text-xs text-red-600 bg-red-100/80 hover:bg-red-200/90 dark:bg-red-950/50 dark:text-red-300 px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1"
                title="Cerrar Sesión"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setViewMode('login')}
              className="font-bold text-xs sm:text-sm bg-[#123A72] hover:bg-[#0E2D59] text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <LogIn className="w-4 h-4 text-white" />
              <span>{siteConfig.header?.loginButtonText || 'Iniciar Sesión'}</span>
            </button>
          )}

          {/* Acceso Directo al Portal de Administración (Candado) */}
          <button
            onClick={() => setViewMode('admin')}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all opacity-60 hover:opacity-100 hover:bg-black/10 text-current"
            title="Portal de Administración"
            aria-label="Portal de Administración"
          >
            <Lock className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>
    </header>
  );
};
