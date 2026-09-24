/**
 * Validador y formateador oficial de RUN / RUT chileno mediante algoritmo Módulo 11.
 */

/**
 * Limpia el RUN eliminando puntos, espacios y guiones, retornando solo números y K mayúscula.
 */
export function cleanRut(rut: string): string {
  if (!rut || typeof rut !== 'string') return '';
  return rut.replace(/[^0-9kK]/g, '').toUpperCase();
}

/**
 * Valida un RUN/RUT chileno mediante el algoritmo Módulo 11.
 * Retorna true únicamente si el largo es correcto y el dígito verificador coincide exactamente.
 */
export function validateRut(rut: string): boolean {
  const clean = cleanRut(rut);
  if (clean.length < 8 || clean.length > 9) return false;

  const cuerpo = clean.slice(0, -1);
  const dv = clean.slice(-1);

  // El cuerpo debe contener únicamente dígitos numéricos
  if (!/^\d+$/.test(cuerpo)) return false;

  // Cálculo de ponderación de la serie 2, 3, 4, 5, 6, 7 de derecha a izquierda
  let suma = 0;
  let factor = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * factor;
    factor = factor < 7 ? factor + 1 : 2;
  }

  const resto = suma % 11;
  const dvCalculado = 11 - resto;

  let dvEsperado = '';
  if (dvCalculado === 11) {
    dvEsperado = '0';
  } else if (dvCalculado === 10) {
    dvEsperado = 'K';
  } else {
    dvEsperado = dvCalculado.toString();
  }

  return dv === dvEsperado;
}

/**
 * Formatea un RUN completo con puntos y guion: XX.XXX.XXX-X
 */
export function formatRut(rut: string): string {
  const clean = cleanRut(rut);
  if (!clean) return '';
  if (clean.length === 1) return clean;

  const cuerpo = clean.slice(0, -1);
  const dv = clean.slice(-1);

  let formattedCuerpo = '';
  let count = 0;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    formattedCuerpo = cuerpo.charAt(i) + formattedCuerpo;
    count++;
    if (count % 3 === 0 && i !== 0) {
      formattedCuerpo = '.' + formattedCuerpo;
    }
  }

  return `${formattedCuerpo}-${dv}`;
}

/**
 * Formateador dinámico para campos de texto mientras el usuario escribe.
 * Permite ingresar caracteres progresivamente sin bloquear la entrada del usuario.
 */
export function formatRutOnInput(value: string): string {
  const clean = cleanRut(value);
  if (clean.length <= 1) return clean;

  const cuerpo = clean.slice(0, -1);
  const dv = clean.slice(-1);

  let formatted = '';
  let count = 0;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    formatted = cuerpo.charAt(i) + formatted;
    count++;
    if (count % 3 === 0 && i !== 0) {
      formatted = '.' + formatted;
    }
  }

  return `${formatted}-${dv}`;
}
