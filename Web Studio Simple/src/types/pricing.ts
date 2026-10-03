export interface PricingPlan {
  id: 'monthly' | 'full' | 'trial';
  nombre: string;
  subtitulo: string;
  precioNormal: number;
  precioOferta: number;
  enOferta: boolean;
  etiquetaOferta?: string;
  duracionTexto: string;
  caracteristicas: string[];
  activo: boolean;
}

export type TipoDescuentoCupon = 'precio_fijo' | 'porcentaje' | 'monto_fijo';

export interface DiscountCoupon {
  id: string;
  codigo: string;
  descripcion: string;
  tipo: TipoDescuentoCupon;
  valor: number; // Si tipo es 'precio_fijo', el total a pagar queda en este monto (ej: 1000). Si 'porcentaje', ej: 50%. Si 'monto_fijo', ej: 10000.
  planAplicable?: 'all' | 'monthly' | 'full';
  activo: boolean;
  usosMaximos?: number;
  usosActuales: number;
  fechaExpiracion?: string;
}

export interface PaymentGatewayConfig {
  provider: 'simulated' | 'mercadopago';
  mercadoPagoPublicKey?: string;
  mercadoPagoAccessToken?: string;
  modoSandbox: boolean;
}

export interface PricingConfig {
  planes: PricingPlan[];
  cupones: DiscountCoupon[];
  pasarela: PaymentGatewayConfig;
  ultimaActualizacion?: string;
}

export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'diners' | 'redcompra' | 'generic';

export interface CardFormData {
  cardNumber: string;
  cardholderName: string;
  cardExpiry: string;
  cardCvv: string;
  cardType: 'debito' | 'credito';
  installments: number;
}

export interface CardValidationResult {
  isValid: boolean;
  errors: {
    cardNumber?: string;
    cardholderName?: string;
    cardExpiry?: string;
    cardCvv?: string;
  };
}

