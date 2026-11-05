export interface ResolvedVideoSource {
  rawUrl: string;
  cleanUrl: string;
  isEmbed: boolean;
  embedUrl: string | null;
  isDirectMedia: boolean;
  isValid: boolean;
  provider: 'youtube' | 'cloudflare_stream' | 'vimeo' | 'google_drive' | 'direct_media' | 'generic_embed' | 'none';
}

/**
 * Sanitiza y extrae las propiedades de reproduccion de cualquier URL de video,
 * transformando enlaces de visualizacion web (YouTube, Cloudflare Stream, Vimeo, Drive)
 * a sus URLs canónicas de incrustacion (embed) seguras y reproducibles.
 */
export function resolveVideoSource(rawUrl?: string): ResolvedVideoSource {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return {
      rawUrl: '',
      cleanUrl: '',
      isEmbed: false,
      embedUrl: null,
      isDirectMedia: false,
      isValid: false,
      provider: 'none'
    };
  }

  // 1. Limpieza rigurosa de espacios, saltos de linea y comillas accidentales
  let clean = rawUrl
    .trim()
    .replace(/^["']|["']$/g, '')
    .trim();

  if (!clean) {
    return {
      rawUrl,
      cleanUrl: '',
      isEmbed: false,
      embedUrl: null,
      isDirectMedia: false,
      isValid: false,
      provider: 'none'
    };
  }

  // 2. Deteccion de YouTube (watch, youtu.be, shorts, embed)
  const ytMatch =
    clean.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i) ||
    clean.match(/youtube\.com\/.*[?&]v=([a-zA-Z0-9_-]{11})/i);

  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return {
      rawUrl,
      cleanUrl: embedUrl,
      isEmbed: true,
      embedUrl,
      isDirectMedia: false,
      isValid: true,
      provider: 'youtube'
    };
  }

  // 3. Deteccion de Cloudflare Stream
  // Soporta:
  // - https://iframe.videodelivery.net/<id>
  // - https://videodelivery.net/<id>
  // - https://cloudflarestream.com/<id>/watch
  // - https://watch.cloudflarestream.com/<id>
  // - https://customer-<customer_code>.cloudflarestream.com/<id>/watch
  // - https://customer-<customer_code>.cloudflarestream.com/<id>/iframe
  const cfStreamMatch =
    clean.match(/(?:iframe\.videodelivery\.net|videodelivery\.net|cloudflarestream\.com|watch\.cloudflarestream\.com)\/([a-zA-Z0-9]{32,})/i) ||
    clean.match(/customer-[a-zA-Z0-9]+\.cloudflarestream\.com\/([a-zA-Z0-9]{32,})/i);

  if (cfStreamMatch && cfStreamMatch[1]) {
    const streamId = cfStreamMatch[1];
    const embedUrl = `https://iframe.videodelivery.net/${streamId}`;
    return {
      rawUrl,
      cleanUrl: embedUrl,
      isEmbed: true,
      embedUrl,
      isDirectMedia: false,
      isValid: true,
      provider: 'cloudflare_stream'
    };
  }

  // 4. Deteccion de Vimeo
  const vimeoMatch = clean.match(/(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)([0-9]+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    const vimeoId = vimeoMatch[1];
    const embedUrl = `https://player.vimeo.com/video/${vimeoId}`;
    return {
      rawUrl,
      cleanUrl: embedUrl,
      isEmbed: true,
      embedUrl,
      isDirectMedia: false,
      isValid: true,
      provider: 'vimeo'
    };
  }

  // 5. Deteccion de Google Drive
  const driveMatch = clean.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (driveMatch && driveMatch[1]) {
    const fileId = driveMatch[1];
    const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    return {
      rawUrl,
      cleanUrl: embedUrl,
      isEmbed: true,
      embedUrl,
      isDirectMedia: false,
      isValid: true,
      provider: 'google_drive'
    };
  }

  // 6. Deteccion de archivo multimedia directo (.mp4, .webm, .ogg, .mov, Cloudflare R2 pub-*.r2.dev)
  const isDirectFile =
    Boolean(clean.match(/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i)) ||
    clean.includes('.r2.dev/') ||
    clean.includes('r2.cloudflarestorage.com');

  if (isDirectFile) {
    return {
      rawUrl,
      cleanUrl: clean,
      isEmbed: false,
      embedUrl: null,
      isDirectMedia: true,
      isValid: true,
      provider: 'direct_media'
    };
  }

  // 7. Si contiene iframe o embed generico
  if (clean.includes('/embed/') || clean.includes('/iframe/')) {
    return {
      rawUrl,
      cleanUrl: clean,
      isEmbed: true,
      embedUrl: clean,
      isDirectMedia: false,
      isValid: true,
      provider: 'generic_embed'
    };
  }

  // 8. Por defecto para URLs HTTP validas
  return {
    rawUrl,
    cleanUrl: clean,
    isEmbed: false,
    embedUrl: null,
    isDirectMedia: true,
    isValid: clean.startsWith('http://') || clean.startsWith('https://'),
    provider: 'direct_media'
  };
}

/**
 * Devuelve la URL lista para incrustar en un iframe si el recurso es de transmision externa,
 * o null si debe reproducirse mediante una etiqueta HTML5 <video>.
 */
export function getVideoEmbedUrl(url?: string): string | null {
  const resolved = resolveVideoSource(url);
  return resolved.isEmbed ? resolved.embedUrl : null;
}

/**
 * Devuelve la URL limpia y normalizada sin espacios ni comillas accidentales.
 */
export function getCleanVideoUrl(url?: string): string {
  const resolved = resolveVideoSource(url);
  return resolved.cleanUrl;
}
