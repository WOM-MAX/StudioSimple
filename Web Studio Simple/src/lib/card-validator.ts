import { CardBrand, CardFormData, CardValidationResult } from '../types/pricing';

/**
 * Detecta la franquicia de la tarjeta segun rangos BIN oficiales
 */
export function detectCardBrand(cardNumber: string): CardBrand {
  const digits = cardNumber.replace(/\D/g, '');
  if (!digits) return 'generic';

  // Visa: empieza con 4
  if (/^4/.test(digits)) {
    return 'visa';
  }

  // Mastercard: 51-55 o 2221-2720
  if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)/.test(digits)) {
    return 'mastercard';
  }

  // American Express: 34 o 37
  if (/^3[47]/.test(digits)) {
    return 'amex';
  }

  // Diners Club: 300-305, 36, 38
  if (/^(30[0-5]|36|38)/.test(digits)) {
    return 'diners';
  }

  return 'generic';
}

/**
 * Formatea el numero de tarjeta con espacios cada 4 digitos (o 4-6-5 para AMEX)
 */
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  const brand = detectCardBrand(digits);

  if (brand === 'amex') {
    // Formato AMEX 4-6-5 (max 15 digitos)
    const limited = digits.slice(0, 15);
    const parts: string[] = [];
    if (limited.length > 0) parts.push(limited.slice(0, 4));
    if (limited.length > 4) parts.push(limited.slice(4, 10));
    if (limited.length > 10) parts.push(limited.slice(10, 15));
    return parts.join(' ');
  }

  // Estandar 16 digitos (o hasta 19) agrupados de a 4
  const limited = digits.slice(0, 16);
  const parts = limited.match(/.{1,4}/g);
  return parts ? parts.join(' ') : '';
}

/**
 * Formatea la fecha de expiracion con formato MM / AA
 */
export function formatExpiryDate(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) {
    return digits;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
}

/**
 * Valida la vigencia de la fecha de expiracion
 */
export function validateExpiryDate(value: string): { isValid: boolean; message?: string } {
  const clean = value.replace(/\s+/g, '');
  if (!clean.includes('/')) {
    return { isValid: false, message: 'Ingresa formato MM/AA' };
  }

  const parts = clean.split('/');
  const month = parseInt(parts[0], 10);
  const yearShort = parseInt(parts[1], 10);

  if (isNaN(month) || month < 1 || month > 12) {
    return { isValid: false, message: 'Mes invalido (01 a 12)' };
  }

  if (isNaN(yearShort) || parts[1].length < 2) {
    return { isValid: false, message: 'Ano incompleto' };
  }

  // Ano completo (20XX)
  const fullYear = 2000 + yearShort;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 1-indexed

  if (fullYear < currentYear || (fullYear === currentYear && month < currentMonth)) {
    return { isValid: false, message: 'Tarjeta vencida' };
  }

  if (fullYear > currentYear + 15) {
    return { isValid: false, message: 'Ano de vigencia fuera de rango' };
  }

  return { isValid: true };
}

/**
 * Valida el codigo de seguridad CVV/CVC segun franquicia
 */
export function validateCVV(cvv: string, brand: CardBrand): { isValid: boolean; message?: string } {
  const digits = cvv.replace(/\D/g, '');
  const requiredLength = brand === 'amex' ? 4 : 3;

  if (digits.length === 0) {
    return { isValid: false, message: 'Ingresa el CVV' };
  }

  if (digits.length !== requiredLength) {
    return { isValid: false, message: `Debe tener ${requiredLength} digitos` };
  }

  return { isValid: true };
}

/**
 * Algoritmo de Luhn para comprobacion de digito verificador
 */
export function validateLuhn(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let alternate = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }

  return sum % 10 === 0;
}

/**
 * Validador integral del formulario de tarjeta
 */
export function validateCardForm(data: CardFormData, enforceLuhn = true): CardValidationResult {
  const errors: CardValidationResult['errors'] = {};
  const digits = data.cardNumber.replace(/\D/g, '');
  const brand = detectCardBrand(digits);

  const minLength = brand === 'amex' ? 15 : 16;
  if (!digits) {
    errors.cardNumber = 'Ingresa el número de tu tarjeta.';
  } else if (digits.length < minLength) {
    errors.cardNumber = `El número debe tener al menos ${minLength} dígitos (ingresaste ${digits.length}).`;
  } else if (enforceLuhn && !validateLuhn(digits)) {
    errors.cardNumber = 'Número de tarjeta inválido. Revisa que no haya errores de tipeo.';
  }

  if (!data.cardholderName || data.cardholderName.trim().length < 3) {
    errors.cardholderName = 'Ingresa el nombre del titular tal como figura en el plástico.';
  }

  const expiryCheck = validateExpiryDate(data.cardExpiry);
  if (!expiryCheck.isValid) {
    errors.cardExpiry = expiryCheck.message || 'Fecha de expiracion invalida.';
  }

  const cvvCheck = validateCVV(data.cardCvv, brand);
  if (!cvvCheck.isValid) {
    errors.cardCvv = cvvCheck.message || 'Codigo CVV invalido.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
