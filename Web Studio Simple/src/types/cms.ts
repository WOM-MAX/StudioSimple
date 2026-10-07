import type { ModoBordeTarjeta } from './cmsExtras';

export type CmsBlockType =
  // Bloques Genéricos Limpios (Colegio Acrópolis)
  | 'PAGE_HEADER'
  | 'HERO'
  | 'IMAGEN_TEXTO'
  | 'TEXTO'
  | 'RICHTEXT'
  | 'TARJETAS'
  | 'DESCARGAS_LIST'
  | 'LINEA_TIEMPO'
  | 'ACORDEON'
  | 'FAQ'
  | 'CTA_BOTONES'
  | 'CTA'
  | 'TESTIMONIOS'
  | 'GALERIA_MINI'
  | 'EQUIPO'
  | 'VIDEO'
  | 'ESTADISTICAS'
  | 'CONTACTO_INFO'
  | 'ALERTA'
  | 'CINTA_NOTICIAS'
  | 'ESPACIADOR'
  // Secciones del Sistema (EstudioSimple)
  | 'HERO_SYSTEM'
  | 'PILARES'
  | 'METODO'
  | 'SIMULADOR'
  | 'PRICING'
  | 'JOURNAL'
  | 'EVENTOS';

export interface PilarItem {
  numero?: string | number;
  titulo: string;
  descripcion: string;
  icono: string;
  colorIcono?: string;
}

export interface PilaresConfig {
  badgeText?: string;
  colorBordeEtiqueta?: string;
  pilares?: PilarItem[];
  colorFondo?: string;
  colorTexto?: ModoColorTexto | string;
  colorBorde?: string;
  modoBorde?: ModoBordeTarjeta;
  grosorBorde?: string;
}

export interface MetodoTabItem {
  id: string;
  numeroTab: string;
  colorTab?: string;
  badge: string;
  badgeColor?: string;
  titulo: string;
  descripcion: string;
  destacado?: string;
  icono: string;
}

export interface MetodoConfig {
  badgeText?: string;
  totalPasos?: number;
  tabs?: MetodoTabItem[];
  colorFondo?: string;
  colorTexto?: ModoColorTexto | string;
  colorBorde?: string;
  modoBorde?: ModoBordeTarjeta;
  grosorBorde?: string;
}

export interface PricingSectionConfig {
  badgeText?: string;
  bulletsMensual?: string[];
  bulletsAnual?: string[];
  bulletsPrueba?: string[];
  bannerTitulo?: string;
  bannerDescripcion?: string;
  bannerBotonTexto?: string;
  colorFondo?: string;
  colorTexto?: ModoColorTexto | string;
  colorBorde?: string;
  modoBorde?: ModoBordeTarjeta;
  grosorBorde?: string;
}

export interface HeroScrubberConfig {
  badgeText?: string;
  ctaText?: string;
  ctaSecondaryText?: string;
  highlightWord?: string;
  fase1Badge?: string;
  fase1Titulo?: string;
  fase1Subtitulo?: string;
  fase2Badge?: string;
  fase2Titulo?: string;
  fase2Subtitulo?: string;
  fase3Badge?: string;
  fase3Titulo?: string;
  fase3Subtitulo?: string;
  colorFondo?: string;
  colorTexto?: ModoColorTexto | string;
}

export interface NoticiaItem {
  texto: string;
  etiqueta?: string;
}

export type ModoColorTexto = 'auto' | 'claro' | 'oscuro';

export interface CintaNoticiasConfig {
  noticias?: NoticiaItem[];
  velocidad?: 'lenta' | 'normal' | 'rapida';
  modoVisual?: 'doble' | 'solo_marquesina' | 'solo_titular';
  colorFondo?: string;
  colorTexto?: string;
  colorFondoMarquesina?: string;
  colorTextoMarquesina?: string;
  colorEtiqueta?: string;
  etiquetaPrincipal?: string;
  mostrarIconoLive?: boolean;
  altura?: 'compacta' | 'normal' | 'amplia';
  alineacion?: 'centrado' | 'izquierda';
  colorBorde?: string;
  modoBorde?: ModoBordeTarjeta;
  grosorBorde?: string;
}

export interface EventosConfig {
  diseno?: 'grilla' | 'slider' | 'lista';
  limite?: number;
  soloVigentes?: boolean;
  tipoFiltro?: string;
  colorFondo?: string;
  colorTexto?: ModoColorTexto | string;
  colorBorde?: string;
  modoBorde?: ModoBordeTarjeta;
  grosorBorde?: string;
}

export interface GaleriaImagenItem {
  url: string;
  titulo?: string;
  pieFoto?: string;
  categoria?: string;
}

export interface GaleriaConfig {
  diseno?: 'grilla' | 'masonry' | 'slider';
  limite?: number;
  categoriaFiltro?: string;
  origenDatos?: 'global' | 'manual';
  imagenes?: GaleriaImagenItem[];
  colorFondo?: string;
  colorTexto?: ModoColorTexto | string;
  colorBorde?: string;
  modoBorde?: ModoBordeTarjeta;
  grosorBorde?: string;
}

export interface TestimonioItem {
  nombre: string;
  rol?: string;
  cita: string;
  estrellas?: number;
  fotoUrl?: string;
  badge?: string;
  badgeColor?: string;
  initials?: string;
}

export interface TestimoniosConfig {
  diseno?: 'grilla' | 'slider' | 'destacado';
  usarTestimoniosOficiales?: boolean;
  testimonios?: TestimonioItem[];
  colorFondo?: string;
  colorTexto?: ModoColorTexto | string;
  colorBordeTarjeta?: string;
  colorBorde?: string;
  modoBorde?: ModoBordeTarjeta;
  grosorBorde?: string;
  colorEstrellas?: string;
  colorBadge?: string;
}

export interface AcordeonItem {
  pregunta: string;
  respuesta: string;
}

export interface AcordeonConfig {
  items?: AcordeonItem[];
  colorFondo?: string;
  colorTexto?: ModoColorTexto | string;
  colorBorde?: string;
  modoBorde?: ModoBordeTarjeta;
  grosorBorde?: string;
  colorIcono?: string;
  colorBordeActivo?: string;
}

export interface LineaTiempoPaso {
  numero?: number;
  titulo: string;
  descripcion: string;
  badge?: string;
}

export interface LineaTiempoConfig {
  pasos?: LineaTiempoPaso[];
  colorFondo?: string;
  colorTexto?: ModoColorTexto | string;
  orientacion?: 'vertical' | 'horizontal';
  colorBorde?: string;
  modoBorde?: ModoBordeTarjeta;
  grosorBorde?: string;
}

export interface CtaBotonesConfig {
  botonPrincipalTexto?: string;
  botonPrincipalUrl?: string;
  botonSecundarioTexto?: string;
  botonSecundarioUrl?: string;
  estiloFondo?: 'azul' | 'gradiente' | 'claro';
  colorFondo?: string;
  colorTexto?: ModoColorTexto | string;
  colorBorde?: string;
  modoBorde?: ModoBordeTarjeta;
  grosorBorde?: string;
}

export interface EstadisticaItem {
  cifra: string;
  etiqueta: string;
  icono?: string;
}

export interface EstadisticasConfig {
  metricas?: EstadisticaItem[];
  colorFondo?: string;
  colorTexto?: ModoColorTexto | string;
  colorBorde?: string;
  modoBorde?: ModoBordeTarjeta;
  grosorBorde?: string;
}

export interface EquipoMiembro {
  nombre: string;
  cargo: string;
  bio?: string;
  fotoUrl?: string;
  especialidad?: string;
}

export interface EquipoConfig {
  miembros?: EquipoMiembro[];
  colorFondo?: string;
  colorTexto?: ModoColorTexto | string;
  colorBorde?: string;
  modoBorde?: ModoBordeTarjeta;
  grosorBorde?: string;
}

export interface ContactoInfoConfig {
  email?: string;
  whatsApp?: string;
  horario?: string;
  ciudad?: string;
  mostrarFormularioBoton?: boolean;
  colorFondo?: string;
  colorTexto?: ModoColorTexto | string;
  colorBorde?: string;
  modoBorde?: ModoBordeTarjeta;
  grosorBorde?: string;
}

export interface CmsSection {
  id: string;
  tipoBloque: CmsBlockType;
  orden: number;
  activo: boolean;
  titulo: string;
  subtitulo?: string;
  configuracion: Record<string, any>;
}

export interface CmsPage {
  id: string;
  titulo: string;
  slug: string;
  activo: boolean;
  mostrarEnMenu: boolean;
  ordenMenu: number;
  colorFondo?: string;
  colorTexto?: string;
  seoTitle?: string;
  seoDescription?: string;
  secciones: CmsSection[];
  ultimaModificacion?: string;
}
