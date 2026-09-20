import React, { useState, useRef, useId } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  Film,
  CheckCircle2,
  AlertCircle,
  X,
  Link as LinkIcon,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { getCloudinaryConfig } from '../../data/initialCmsExtrasData';

interface CloudinaryImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  helperText?: string;
  compact?: boolean;
  resourceType?: 'image' | 'video' | 'auto';
  recommendedDimensions?: string;
  accept?: string;
  maxSizeMB?: number;
}

export const CloudinaryImageUploader: React.FC<CloudinaryImageUploaderProps> = ({
  label,
  value,
  onChange,
  folder,
  helperText,
  compact = false,
  resourceType = 'image',
  recommendedDimensions,
  accept,
  maxSizeMB
}) => {
  const inputId = useId();
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cloudinaryConfig = getCloudinaryConfig();
  const isCloudinaryReady =
    Boolean(cloudinaryConfig.enabled) &&
    Boolean(cloudinaryConfig.cloudName?.trim()) &&
    Boolean(cloudinaryConfig.uploadPreset?.trim());

  const effectiveMaxSizeMB = maxSizeMB || (resourceType === 'video' ? 60 : 10);
  const effectiveAccept =
    accept ||
    (resourceType === 'video'
      ? 'video/mp4,video/webm,video/ogg,video/quicktime'
      : resourceType === 'auto'
      ? 'image/*,video/*'
      : 'image/png,image/jpeg,image/webp,image/gif,image/svg+xml');

  const isVideoUrl = (url: string) => {
    return (
      url.includes('/video/upload/') ||
      Boolean(url.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i)) ||
      resourceType === 'video'
    );
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (resourceType === 'image' && !file.type.startsWith('image/')) {
      setErrorMessage('El archivo seleccionado debe ser una imagen válida (PNG, JPG, WebP, etc.).');
      return;
    }

    if (resourceType === 'video' && !file.type.startsWith('video/')) {
      setErrorMessage('El archivo seleccionado debe ser un video válido (MP4, WebM, etc.).');
      return;
    }

    if (
      resourceType === 'auto' &&
      !file.type.startsWith('image/') &&
      !file.type.startsWith('video/')
    ) {
      setErrorMessage('El archivo seleccionado debe ser una imagen o video válido.');
      return;
    }

    if (file.size > effectiveMaxSizeMB * 1024 * 1024) {
      setErrorMessage(`El archivo supera el tamaño máximo permitido de ${effectiveMaxSizeMB} MB.`);
      return;
    }

    if (!isCloudinaryReady) {
      setErrorMessage(
        'Cloudinary no está configurado. Ve a Configuración General > Integraciones para ingresar tu Cloud Name y Upload Preset, o usa la pestaña "URL Directa".'
      );
      return;
    }

    setUploading(true);
    setProgress(15);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset.trim());

    const targetFolder = folder || cloudinaryConfig.folder || 'estudiosimple';
    if (targetFolder.trim()) {
      formData.append('folder', targetFolder.trim());
    }

    if (cloudinaryConfig.apiKey?.trim()) {
      formData.append('api_key', cloudinaryConfig.apiKey.trim());
    }

    try {
      const uploadEndpointType = resourceType === 'video' ? 'video' : resourceType === 'auto' ? 'auto' : 'image';
      const endpoint = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName.trim()}/${uploadEndpointType}/upload`;

      const xhr = new XMLHttpRequest();
      xhr.open('POST', endpoint);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 90);
          setProgress(Math.max(15, percent));
        }
      };

      xhr.onload = () => {
        setUploading(false);
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            if (data.secure_url) {
              setProgress(100);
              onChange(data.secure_url);
            } else {
              setErrorMessage('Cloudinary respondió sin una URL de archivo válida.');
            }
          } catch {
            setErrorMessage('Error al procesar la respuesta del servidor de Cloudinary.');
          }
        } else {
          try {
            const errData = JSON.parse(xhr.responseText);
            setErrorMessage(errData?.error?.message || `Error de subida (Código HTTP ${xhr.status}). Verifica tus credenciales.`);
          } catch {
            setErrorMessage(`Error de comunicación con Cloudinary (Código HTTP ${xhr.status}).`);
          }
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        setErrorMessage('Fallo en la conexión de red hacia Cloudinary. Revisa tu conexión a internet.');
      };

      xhr.send(formData);
    } catch (err: any) {
      setUploading(false);
      setErrorMessage(err?.message || 'Ocurrió un error inesperado al iniciar la carga.');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-1 text-[11px]">
          <button
            type="button"
            onClick={() => {
              setMode('upload');
              if (mode === 'upload' && !uploading) {
                fileInputRef.current?.click();
              }
            }}
            className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1 ${
              mode === 'upload'
                ? 'bg-[#12A1A4] text-white'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Subir Archivo</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
              mode === 'url'
                ? 'bg-[#12A1A4] text-white'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            URL Directa
          </button>
        </div>
      </div>

      {/* Medidas recomendadas destacadas */}
      {recommendedDimensions && (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50/90 border border-teal-200/80 text-[11px] font-bold text-[#12A1A4]">
          <span className="material-symbols-outlined text-xs">aspect_ratio</span>
          <span>Dimensiones sugeridas: {recommendedDimensions}</span>
        </div>
      )}

      {helperText && (
        <p className="text-[11px] text-slate-500 leading-tight">{helperText}</p>
      )}

      {/* Previsualización actual */}
      {value && (
        <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 bg-slate-50">
          <div className="w-16 h-16 rounded-lg bg-slate-900 overflow-hidden shrink-0 border border-slate-300 relative group">
            {isVideoUrl(value) ? (
              <video
                src={value}
                className="w-full h-full object-cover"
                muted
                playsInline
              />
            ) : (
              <img
                src={value}
                alt="Previsualización"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-emerald-700 text-xs font-bold mb-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isVideoUrl(value) ? 'Video vinculado' : 'Imagen vinculada'}</span>
            </div>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-slate-500 hover:text-[#12A1A4] truncate block max-w-full"
              title={value}
            >
              {value}
            </a>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            title="Quitar archivo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modo 1: Carga por Archivo Drag & Drop */}
      {mode === 'upload' && (
        <div>
          <input
            id={inputId}
            ref={fileInputRef}
            type="file"
            accept={effectiveAccept}
            onChange={handleFileChange}
            onClick={(e) => {
              (e.target as HTMLInputElement).value = '';
            }}
            className="sr-only"
          />

          <label
            htmlFor={inputId}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative block rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-[#12A1A4] bg-teal-50/70 scale-[1.01]'
                : 'border-slate-300 bg-white hover:border-[#12A1A4]/60 hover:bg-slate-50/60'
            } ${uploading ? 'pointer-events-none opacity-80' : ''}`}
          >
            {uploading ? (
              <div className="space-y-2 py-2">
                <div className="w-8 h-8 mx-auto text-[#12A1A4] animate-spin flex items-center justify-center">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-700">Subiendo a Cloudinary...</p>
                <div className="w-full max-w-xs mx-auto bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#12A1A4] h-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400">{progress}% completado</span>
              </div>
            ) : (
              <div className="space-y-2.5 py-1 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#12A1A4] flex items-center justify-center shadow-xs">
                  {resourceType === 'video' ? (
                    <Film className="w-6 h-6" />
                  ) : (
                    <UploadCloud className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#12A1A4] hover:bg-[#0e8284] text-white text-xs font-black shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] active:scale-95 my-1">
                    <UploadCloud className="w-4 h-4" />
                    <span>Seleccionar archivo del equipo</span>
                  </span>
                  <p className="text-xs text-slate-600 font-semibold mt-1.5">
                    o arrastra y suelta tu archivo aquí dentro
                  </p>
                </div>
                <p className="text-[11px] text-slate-400">
                  {resourceType === 'video'
                    ? `Formatos MP4, WebM (hasta ${effectiveMaxSizeMB} MB)`
                    : `Formatos PNG, JPG, WebP o GIF (hasta ${effectiveMaxSizeMB} MB)`}
                </p>
              </div>
            )}
          </label>
        </div>
      )}

      {/* Modo 2: URL Directa */}
      {mode === 'url' && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <LinkIcon className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://res.cloudinary.com/... o enlace externo"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-mono text-slate-800 bg-white focus:outline-none focus:border-[#12A1A4]"
            />
          </div>
          {value && (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-[#12A1A4] hover:bg-slate-50"
              title="Abrir en pestaña nueva"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      )}

      {/* Mensaje de Error si ocurre */}
      {errorMessage && (
        <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-in fade-in duration-150">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
          <span className="leading-tight">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
