import { CintaNoticiasConfig } from './cms';

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  uploadPreset: string;
  folder?: string;
  enabled: boolean;
}

export type TipoRedSocial =
  | 'instagram'
  | 'youtube'
  | 'facebook'
  | 'tiktok'
  | 'whatsapp'
  | 'telegram'
  | 'linkedin'
  | 'x'
  | 'sitio_web'
  | 'otro';

export interface RedSocialItem {
  id: string;
  red: TipoRedSocial;
  etiqueta: string;
  url: string;
  activo: boolean;
}

export interface SiteConfig {
  header: {
    logoUrl: string;
    planesButtonText: string;
    loginButtonText: string;
    showWhatsAppQuick: boolean;
    headerBgColor?: string;
    headerTextColor?: string;
    activeLinkColor?: string;
    activeLinkStyle?: 'underline' | 'pill' | 'bold';
    menuFontSize?: 'sm' | 'base' | 'lg';
  };
  cintaNoticias?: CintaNoticiasConfig & { activo?: boolean };
  footer: {
    logoUrl: string;
    missionText: string;
    decretoText: string;
    whatsAppNumber: string;
    whatsAppLabel: string;
    emailContacto: string;
    instagramUrl: string;
    youtubeUrl: string;
    facebookUrl: string;
    redesSociales?: RedSocialItem[];
    copyrightText: string;
    footerBgColor?: string;
    footerTextColor?: string;
    footerHeadingsColor?: string;
    bentoCardBgColor?: string;
  };
  contacto: {
    horarioAtencion: string;
    telefonoFijo: string;
    ciudad: string;
  };
  cloudinary?: CloudinaryConfig;
  estilosGlobales?: EstilosGlobalesConfig;
}

export type ModoBordeTarjeta =
  | 'completo'
  | 'superior'
  | 'inferior'
  | 'lateral-izquierdo'
  | 'laterales'
  | 'superior-inferior';

export interface EstilosGlobalesConfig {
  colorBordeEtiquetas?: string;
  colorBordeComentarios?: string;
  modoBordeComentarios?: ModoBordeTarjeta;
  grosorBordeComentarios?: string;
  colorBordeFaq?: string;
  modoBordeFaq?: ModoBordeTarjeta;
  grosorBordeFaq?: string;
  colorAcentoFaq?: string;
  colorEstrellas?: string;
}

export interface JournalArticle {
  id: string;
  titulo: string;
  slug: string;
  extracto: string;
  contenido: string;
  categoria: 'MINEDUC' | 'Homeschooling' | 'Cuaderno y Método' | 'Neurodiversidad' | 'Orientación';
  autor: string;
  fecha: string;
  imagenPortadaUrl: string;
  activo: boolean;
  destacado: boolean;
}

export interface DescargaResource {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: 'Plantillas de Cuaderno' | 'Temarios Oficiales PDF' | 'Normativa y Decretos' | 'Guías Imprimibles';
  archivoUrl: string;
  formato: 'PDF' | 'DOCX' | 'ZIP';
  tamanoMb: number;
  descargasCount: number;
  activo: boolean;
}

export type PopupPosicion =
  | 'centro-modal'
  | 'inferior-derecha'
  | 'inferior-izquierda'
  | 'banner-superior'
  | 'banner-inferior';

export type PopupEstiloImagen =
  | 'encabezado'
  | 'fondo'
  | 'solo-imagen'
  | 'oculta';

export type PopupTamanoTitulo = 'sm' | 'md' | 'lg' | 'xl';

export type PopupFrecuencia = 'siempre' | 'una_vez' | 'una_vez_por_dia';

export type PopupTipoAlerta =
  | 'info'
  | 'urgente'
  | 'matricula'
  | 'evento'
  | 'informativo'
  | 'promocion'
  | 'alerta'
  | 'exito';

export interface PopupBanner {
  id: string;
  titulo: string;
  mensaje: string;
  contenido?: string;
  ctaText?: string;
  ctaUrl?: string;
  enlaceTexto?: string;
  enlaceUrl?: string;
  fechaInicio: string;
  fechaFin: string;
  activo: boolean;
  tipoAlerta: PopupTipoAlerta;
  imagenUrl?: string;
  posicion?: PopupPosicion;
  estiloImagen?: PopupEstiloImagen;
  tamanoTitulo?: PopupTamanoTitulo;
  colorFondo?: string;
  colorTexto?: string;
  colorBoton?: string;
  frecuencia?: PopupFrecuencia;
  prioridad?: number;
}

export interface CalendarioEvento {
  id: string;
  titulo: string;
  fecha: string;
  tipo: 'Inscripción MINEDUC' | 'Examen 1ª Oportunidad' | 'Examen 2ª Oportunidad' | 'Taller para Padres' | 'Entrega de Resultados';
  modalidad: 'Presencial' | 'Online';
  lugarOEnlace: string;
  descripcion: string;
  activo: boolean;
}

export interface MensajeContacto {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  cursoInteres: string;
  mensaje: string;
  fecha: string;
  leido: boolean;
  respondido: boolean;
}

export interface GaleriaItem {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: 'Cuadernos de Estudiantes' | 'Infografías del Método' | 'Material Didáctico' | 'Eventos';
  imagenUrl: string;
  fecha: string;
  activo: boolean;
}
