import { PricingConfig, PricingPlan, DiscountCoupon, PaymentGatewayConfig } from '../types/pricing';
import { recordAuditLog } from './admin-repository';

const LOCAL_STORAGE_PRICING_KEY = 'estudiosimple_pricing_config';

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  planes: [
    {
      id: 'monthly',
      nombre: 'Plan Mensual',
      subtitulo: 'Renovación mensual cancelable cuando quieras sin penalización',
      precioNormal: 29990,
      precioOferta: 1000,
      enOferta: true,
      etiquetaOferta: 'Oferta Prueba $1.000 CLP',
      duracionTexto: '/ mes',
      caracteristicas: [
        'Acceso a las 5 asignaturas oficiales',
        'Lecciones de 30 min y cuaderno guiado',
        'Panel de seguimiento del apoderado',
        'Diálogo socrático para guiar sin ser profesor',
        'Soporte pedagógico vía WhatsApp y correo'
      ],
      activo: true
    },
    {
      id: 'full',
      nombre: 'Anual Exámenes Libres',
      subtitulo: 'Acompañamiento completo durante todo el año escolar oficial',
      precioNormal: 199900,
      precioOferta: 99900,
      enOferta: true,
      etiquetaOferta: 'Oferta Lanzamiento 50% DCTO',
      duracionTexto: '/ año',
      caracteristicas: [
        'Todo lo incluido en el Plan Mensual',
        'Simulacros de examen formal tipo MINEDUC',
        'Cuadernillos imprimibles de ejercitación física',
        'Garantía de actualización curricular 2026',
        'Informes periódicos de avance para apoderados'
      ],
      activo: true
    },
    {
      id: 'trial',
      nombre: 'Prueba 7 Días',
      subtitulo: 'Sin tarjeta de crédito ni cobros automáticos',
      precioNormal: 0,
      precioOferta: 0,
      enOferta: false,
      etiquetaOferta: 'Sin Compromiso',
      duracionTexto: '/ 7 días',
      caracteristicas: [
        'Acceso libre a lecciones modelo de 5 asignaturas',
        'Exploración del cuaderno físico de trabajo',
        'Visualización del panel de apoderado',
        'Sin cobros automáticos posteriores'
      ],
      activo: true
    }
  ],
  cupones: [
    {
      id: 'coupon-test-01',
      codigo: 'TEST1000',
      descripcion: 'Cupón de prueba para test de cobro a $1.000 CLP',
      tipo: 'precio_fijo',
      valor: 1000,
      planAplicable: 'all',
      activo: true,
      usosMaximos: 200,
      usosActuales: 0
    },
    {
      id: 'coupon-home-02',
      codigo: 'HOMESCHOOL50',
      descripcion: '50% de descuento para familias de educación libre',
      tipo: 'porcentaje',
      valor: 50,
      planAplicable: 'full',
      activo: true,
      usosMaximos: 100,
      usosActuales: 0
    }
  ],
  pasarela: {
    provider: 'mercadopago',
    mercadoPagoPublicKey: 'APP_USR-d44f14cd-7e1c-4bd8-a138-e78e1bcbcd44',
    mercadoPagoAccessToken: '',
    modoSandbox: false
  },
  ultimaActualizacion: new Date().toISOString()
};

let cachedPricingConfig: PricingConfig | null = null;

export function loadPricingConfig(forceRefresh = false): PricingConfig {
  if (typeof window === 'undefined') {
    return DEFAULT_PRICING_CONFIG;
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PRICING_KEY);
    if (raw && !forceRefresh) {
      const parsed = JSON.parse(raw);
      const monthlyPlan = parsed?.planes?.find((p: any) => p.id === 'monthly');
      // Si la versión en caché local tiene la oferta inactiva, o la pasarela esta en simulated, migrar a mercadopago
      if (!monthlyPlan || monthlyPlan.enOferta !== true || monthlyPlan.precioOferta !== 1000 || parsed?.pasarela?.provider === 'simulated') {
        cachedPricingConfig = {
          ...parsed,
          planes: DEFAULT_PRICING_CONFIG.planes,
          pasarela: {
            ...DEFAULT_PRICING_CONFIG.pasarela,
            ...(parsed?.pasarela || {}),
            provider: 'mercadopago',
            mercadoPagoPublicKey: 'APP_USR-d44f14cd-7e1c-4bd8-a138-e78e1bcbcd44'
          }
        };
        localStorage.setItem(LOCAL_STORAGE_PRICING_KEY, JSON.stringify(cachedPricingConfig));
      } else {
        cachedPricingConfig = parsed;
      }
    } else {
      cachedPricingConfig = { ...DEFAULT_PRICING_CONFIG };
      localStorage.setItem(LOCAL_STORAGE_PRICING_KEY, JSON.stringify(cachedPricingConfig));
    }
  } catch (err) {
    console.error('Error al cargar configuracion de precios:', err);
    cachedPricingConfig = { ...DEFAULT_PRICING_CONFIG };
  }

  // Sincronizar siempre en segundo plano con el servidor
  if (typeof fetch === 'function') {
    fetch('/api/pricing/config')
      .then((res) => {
        if (!res.ok) return null;
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (data && data.success && data.data) {
          const serverConfig = data.data;
          const serverStr = JSON.stringify(serverConfig);
          const currentStr = localStorage.getItem(LOCAL_STORAGE_PRICING_KEY);
          if (serverStr !== currentStr) {
            cachedPricingConfig = serverConfig;
            try {
              localStorage.setItem(LOCAL_STORAGE_PRICING_KEY, serverStr);
            } catch {}
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('pricing-config-updated', { detail: serverConfig }));
            }
          }
        }
      })
      .catch(() => {});
  }

  return cachedPricingConfig || DEFAULT_PRICING_CONFIG;
}

export function savePricingConfig(config: PricingConfig, actorName = 'Administrador'): void {
  const updated: PricingConfig = {
    ...config,
    ultimaActualizacion: new Date().toISOString()
  };
  cachedPricingConfig = updated;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_PRICING_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('pricing-config-updated', { detail: updated }));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error('Error al guardar configuracion de precios:', err);
    }
  }

  if (typeof window !== 'undefined' && typeof fetch === 'function') {
    fetch('/api/pricing/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    }).catch(() => {});
  }

  recordAuditLog({
    actorId: 'admin-pricing',
    actorName,
    actorRole: 'admin',
    action: 'UPDATE_SITE_CONFIG',
    target: 'Planes y Suscripciones',
    details: 'Actualizacion de precios, ofertas o cupones en la configuracion del sistema'
  });
}

export function updatePlanPricing(
  planId: 'monthly' | 'full' | 'trial',
  updates: {
    precioNormal?: number;
    precioOferta?: number;
    enOferta?: boolean;
    etiquetaOferta?: string;
    activo?: boolean;
  },
  actorName = 'Administrador'
): PricingConfig {
  const config = loadPricingConfig();
  const planes = config.planes.map((p) => {
    if (p.id === planId) {
      return {
        ...p,
        ...updates
      };
    }
    return p;
  });

  const updatedConfig: PricingConfig = {
    ...config,
    planes
  };

  savePricingConfig(updatedConfig, actorName);
  return updatedConfig;
}

export function validateCoupon(
  code: string,
  planId: 'monthly' | 'full' | 'trial',
  basePrice: number
): {
  valid: boolean;
  finalPrice: number;
  discountAmount: number;
  coupon?: DiscountCoupon;
  message?: string;
} {
  const cleanCode = (code || '').trim().toUpperCase();
  if (!cleanCode) {
    return { valid: false, finalPrice: basePrice, discountAmount: 0, message: 'Ingresa un código de cupón.' };
  }

  const config = loadPricingConfig();
  const coupon = config.cupones.find((c) => c.codigo.toUpperCase() === cleanCode);

  if (!coupon) {
    return { valid: false, finalPrice: basePrice, discountAmount: 0, message: 'El código de cupón no existe.' };
  }

  if (!coupon.activo) {
    return { valid: false, finalPrice: basePrice, discountAmount: 0, message: 'Este cupón se encuentra inactivo.' };
  }

  if (coupon.usosMaximos && coupon.usosActuales >= coupon.usosMaximos) {
    return { valid: false, finalPrice: basePrice, discountAmount: 0, message: 'Este cupón ha alcanzado el límite máximo de usos.' };
  }

  if (coupon.planAplicable && coupon.planAplicable !== 'all' && coupon.planAplicable !== planId) {
    return {
      valid: false,
      finalPrice: basePrice,
      discountAmount: 0,
      message: `Este cupón solo es válido para el ${coupon.planAplicable === 'full' ? 'Plan Anual' : 'Plan Mensual'}.`
    };
  }

  let finalPrice = basePrice;
  let discountAmount = 0;

  if (coupon.tipo === 'precio_fijo') {
    finalPrice = coupon.valor;
    discountAmount = Math.max(0, basePrice - finalPrice);
  } else if (coupon.tipo === 'porcentaje') {
    discountAmount = Math.round((basePrice * coupon.valor) / 100);
    finalPrice = Math.max(0, basePrice - discountAmount);
  } else if (coupon.tipo === 'monto_fijo') {
    discountAmount = coupon.valor;
    finalPrice = Math.max(0, basePrice - discountAmount);
  }

  return {
    valid: true,
    finalPrice,
    discountAmount,
    coupon,
    message: `Cupón aplicado: ${coupon.descripcion} (Total: $${finalPrice.toLocaleString('es-CL')} CLP)`
  };
}

export function createCoupon(
  couponData: Omit<DiscountCoupon, 'id' | 'usosActuales'>,
  actorName = 'Administrador'
): DiscountCoupon {
  const config = loadPricingConfig();
  const newCoupon: DiscountCoupon = {
    id: `coupon-${Date.now().toString(36)}`,
    ...couponData,
    codigo: couponData.codigo.trim().toUpperCase(),
    usosActuales: 0
  };

  const updatedConfig: PricingConfig = {
    ...config,
    cupones: [newCoupon, ...config.cupones]
  };

  savePricingConfig(updatedConfig, actorName);
  return newCoupon;
}

export function toggleCouponStatus(couponId: string, actorName = 'Administrador'): PricingConfig {
  const config = loadPricingConfig();
  const cupones = config.cupones.map((c) => {
    if (c.id === couponId) {
      return { ...c, activo: !c.activo };
    }
    return c;
  });

  const updatedConfig: PricingConfig = {
    ...config,
    cupones
  };

  savePricingConfig(updatedConfig, actorName);
  return updatedConfig;
}

export function updatePaymentGateway(
  gateway: PaymentGatewayConfig,
  actorName = 'Administrador'
): PricingConfig {
  const config = loadPricingConfig();
  const updatedConfig: PricingConfig = {
    ...config,
    pasarela: { ...config.pasarela, ...gateway }
  };

  savePricingConfig(updatedConfig, actorName);
  return updatedConfig;
}
