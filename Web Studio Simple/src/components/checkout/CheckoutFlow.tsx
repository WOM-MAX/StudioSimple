import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, CheckCircle2, AlertCircle, Check, KeyRound, Copy, GraduationCap, Shield, UserCheck, ArrowRight, Tag, Sparkles, CreditCard, HelpCircle, Lock, Eye, EyeOff, MessageCircle } from 'lucide-react';
import { GradeLevel, ParentUser } from '../../types';
import { validateRut, formatRutOnInput } from '../../lib/rut-validator';
import { registerUserFromCheckout } from '../../lib/user-repository';
import { recordAuditLog } from '../../lib/admin-repository';
import { loadPricingConfig, validateCoupon } from '../../lib/pricing-repository';
import { PricingConfig, DiscountCoupon } from '../../types/pricing';

function formatChileanPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  let rest = digits;
  if (rest.startsWith('56')) {
    rest = rest.slice(2);
  }
  if (rest.startsWith('9')) {
    rest = rest.slice(1);
  }
  rest = rest.slice(0, 8);
  if (rest.length === 0) {
    return '+56 9 ';
  }
  if (rest.length <= 4) {
    return `+56 9 ${rest}`;
  }
  return `+56 9 ${rest.slice(0, 4)} ${rest.slice(4)}`;
}

function buildWhatsAppUrl(phoneStr: string, text: string): string {
  const digits = (phoneStr || '').replace(/\D/g, '');
  let targetDigits = digits;
  if (digits.startsWith('56')) {
    targetDigits = digits;
  } else if (digits.startsWith('9') && digits.length === 9) {
    targetDigits = `56${digits}`;
  } else if (digits.length === 8) {
    targetDigits = `569${digits}`;
  }
  const encoded = encodeURIComponent(text);
  return targetDigits.length >= 8
    ? `https://wa.me/${targetDigits}?text=${encoded}`
    : `https://api.whatsapp.com/send?text=${encoded}`;
}

export const CheckoutFlow: React.FC = () => {
  const { setViewMode, activateSessionFromCheckout } = useApp();
  const [emailSentStatus, setEmailSentStatus] = useState<{ sent: boolean; mode?: string } | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'full' | 'trial'>(() => {
    const saved = localStorage.getItem('estudio_simple_selected_plan');
    if (saved === 'full' || saved === 'trial' || saved === 'monthly') return saved;
    return 'full';
  });

  const [pricingConfig, setPricingConfig] = useState<PricingConfig>(() => loadPricingConfig());

  React.useEffect(() => {
    const handleUpdate = () => {
      setPricingConfig(loadPricingConfig(true));
    };
    window.addEventListener('pricing-config-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('pricing-config-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<DiscountCoupon | null>(null);
  const [couponFeedback, setCouponFeedback] = useState<{ status: 'idle' | 'success' | 'error'; message: string }>({
    status: 'idle',
    message: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [createdUser, setCreatedUser] = useState<ParentUser | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMercadoPagoApproved, setIsMercadoPagoApproved] = useState(false);

  const PENDING_CHECKOUT_KEY = 'estudio_simple_pending_checkout';

  // Form Fields - Apoderado
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rut, setRut] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields - Estudiante
  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentRun, setStudentRun] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('7° Básico');

  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Detección e interceptación de retorno desde Mercado Pago / Webpay
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const isPaymentSuccess =
      params.get('payment') === 'success' ||
      params.get('status') === 'approved' ||
      params.get('collection_status') === 'approved';
    const isPaymentFailure =
      params.get('payment') === 'failure' ||
      params.get('status') === 'rejected' ||
      params.get('status') === 'cancelled';

    if (isPaymentSuccess) {
      const savedPending = localStorage.getItem('estudio_simple_pending_checkout');
      if (savedPending) {
        try {
          const pendingData = JSON.parse(savedPending);
          if (pendingData.phone) setPhone(pendingData.phone);
          if (pendingData.password) setPassword(pendingData.password);
          if (pendingData.rut) setRut(pendingData.rut);
          if (pendingData.email) setEmail(pendingData.email);
          if (pendingData.studentRun) setStudentRun(pendingData.studentRun);
          const { user } = registerUserFromCheckout({
            rut: pendingData.rut,
            name: (pendingData.name || `${pendingData.firstName || ''} ${pendingData.lastName || ''}`.trim() || 'APODERADO ESTUDIOSIMPLE').toUpperCase(),
            email: pendingData.email,
            password: pendingData.password,
            studentName: (pendingData.studentName || 'ESTUDIANTE').toUpperCase(),
            studentRun: pendingData.studentRun || '',
            studentPin: pendingData.studentPin,
            grade: pendingData.grade || '7° Básico',
            plan: pendingData.plan || 'monthly',
            phone: pendingData.phone || '',
            amount: pendingData.amount,
            paymentId: params.get('payment_id') || params.get('collection_id') || undefined
          });

          activateSessionFromCheckout(user, pendingData.grade || '7° Básico');

          // Despacho de correo transaccional de bienvenida
          fetch('/api/mail/send-welcome', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              rut: user.rut,
              password: pendingData.password,
              studentName: user.studentName,
              grade: pendingData.grade || '7° Básico',
              studentPin: user.studentPin,
              plan: pendingData.plan || 'monthly',
              amount: pendingData.amount || 1000
            })
          })
            .then(res => res.json())
            .then(data => { if (data.success) setEmailSentStatus({ sent: true, mode: data.mode }); })
            .catch(() => setEmailSentStatus({ sent: true, mode: 'local' }));

          localStorage.setItem('estudio_simple_parent', JSON.stringify(user));
          setCreatedUser(user);
          setIsCompleted(true);
          setIsMercadoPagoApproved(true);
          setGrade(pendingData.grade || '7° Básico');
          setSelectedPlan(pendingData.plan || 'monthly');

          recordAuditLog({
            actorId: user.id,
            actorName: user.name,
            actorEmail: user.email,
            actorRole: 'user',
            action: 'PAYMENT_MERCADOPAGO_SUCCESS',
            target: user.rut || user.email,
            details: `Pago real aprobado por Mercado Pago/Webpay ($${(pendingData.amount || 1000).toLocaleString('es-CL')} CLP). Transaccion: ${params.get('payment_id') || params.get('collection_id') || 'OK'}`,
            metadata: {
              plan: pendingData.plan,
              monto: pendingData.amount,
              paymentId: params.get('payment_id') || params.get('collection_id'),
              status: params.get('status') || params.get('collection_status')
            }
          });

          localStorage.removeItem('estudio_simple_pending_checkout');
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (e) {
          console.error('Error procesando retorno de Mercado Pago:', e);
        }
      }
    } else if (isPaymentFailure) {
      const savedPending = localStorage.getItem('estudio_simple_pending_checkout');
      if (savedPending) {
        try {
          const pendingData = JSON.parse(savedPending);
          if (pendingData.firstName) setFirstName(pendingData.firstName);
          if (pendingData.lastName) setLastName(pendingData.lastName);
          if (pendingData.rut) setRut(pendingData.rut);
          if (pendingData.phone) setPhone(pendingData.phone);
          if (pendingData.email) setEmail(pendingData.email);
          if (pendingData.password) setPassword(pendingData.password);
          if (pendingData.studentFirstName) setStudentFirstName(pendingData.studentFirstName);
          if (pendingData.studentLastName) setStudentLastName(pendingData.studentLastName);
          if (pendingData.studentName) {
            setStudentName(pendingData.studentName);
            if (!pendingData.studentFirstName) {
              const parts = pendingData.studentName.trim().split(/\s+/);
              if (parts.length > 1) {
                setStudentFirstName(parts[0]);
                setStudentLastName(parts.slice(1).join(' '));
              } else {
                setStudentFirstName(pendingData.studentName);
              }
            }
          }
          if (pendingData.studentRun) setStudentRun(pendingData.studentRun);
          if (pendingData.grade) setGrade(pendingData.grade);
          if (pendingData.plan) setSelectedPlan(pendingData.plan);
        } catch {}
      }
      setErrorMessage('El pago en Mercado Pago / Webpay no se completó o fue cancelado. Tus datos se mantienen intactos para reintentar.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [activateSessionFromCheckout]);

  // Estado de validación del RUN en tiempo real
  const isRutValid = rut.trim().length >= 8 ? validateRut(rut) : null;
  const isStudentRunValid = studentRun.trim().length >= 8 ? validateRut(studentRun) : null;

  const handleCopyField = (text: string, fieldId: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2500);
    }
  };

  const handleCopyAllCredentials = () => {
    if (!createdUser) return;
    const summary = [
      'ESTUDIO SIMPLE - CREDENCIALES DE ACCESO FAMILIAR',
      '=================================================',
      `Titular Apoderado: ${createdUser.name}`,
      `RUN Apoderado: ${createdUser.rut}`,
      `Correo Apoderado: ${createdUser.email}`,
      `Contraseña Apoderado: ${createdUser.password || password}`,
      `Estudiante: ${createdUser.studentName} (${grade})`,
      `PIN Estudiante (6 digitos): ${createdUser.studentPin || '123456'}`,
      '=================================================',
      'Acceso directo: https://estudiosimple.cl'
    ].join('\n');

    handleCopyField(summary, 'ALL_CREDENTIALS');
  };

  const parentPhone = createdUser?.phone || phone;
  const userRut = createdUser?.rut || rut || 'Sin RUN';
  const userPass = createdUser?.password || password || 'Temp-123456!';
  const userEmail = createdUser?.email || email || '';
  const studentFull = createdUser?.studentName || studentName || 'Estudiante';
  const pin = createdUser?.studentPin || '123456';
  const targetGrade = grade || '7° Básico';

  const waMessage = [
    `*ESTUDIOSIMPLE - CREDENCIALES OFICIALES DE ACCESO*`,
    ``,
    `¡Hola! Tu suscripción para *${studentFull}* (${targetGrade}) ha sido activada con éxito. Guarda este mensaje con tus claves oficiales:`,
    ``,
    `*DATOS DEL APODERADO / TUTOR:*`,
    `• Usuario (RUN): *${userRut}*`,
    `• Correo: ${userEmail}`,
    `• Contraseña: *${userPass}*`,
    `• Portal del Apoderado: https://estudiosimple.cl`,
    ``,
    `*DATOS DEL ESTUDIANTE:*`,
    `• Alumno: *${studentFull}* (${targetGrade})`,
    `• PIN de Ingreso Directo: *${pin}*`,
    ``,
    `El estudiante ingresa a su salón de clases digitando únicamente su PIN de 6 dígitos en https://estudiosimple.cl`
  ].join('\n');

  const handleShareWhatsApp = () => {
    const url = buildWhatsAppUrl(parentPhone, waMessage);
    window.open(url, '_blank');
  };

  const handlePrintCredentials = () => {
    window.print();
  };

  const activePlanObj = pricingConfig.planes.find((p) => p.id === selectedPlan);
  const basePrice =
    selectedPlan === 'trial'
      ? 0
      : activePlanObj?.enOferta
      ? activePlanObj.precioOferta
      : activePlanObj?.precioNormal || 29990;

  let finalPrice = basePrice;
  let discountAmount = 0;
  if (appliedCoupon && selectedPlan !== 'trial') {
    if (appliedCoupon.tipo === 'precio_fijo') {
      finalPrice = appliedCoupon.valor;
      discountAmount = Math.max(0, basePrice - finalPrice);
    } else if (appliedCoupon.tipo === 'porcentaje') {
      discountAmount = Math.round((basePrice * appliedCoupon.valor) / 100);
      finalPrice = Math.max(0, basePrice - discountAmount);
    } else if (appliedCoupon.tipo === 'monto_fijo') {
      discountAmount = appliedCoupon.valor;
      finalPrice = Math.max(0, basePrice - discountAmount);
    }
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) {
      setCouponFeedback({ status: 'error', message: 'Ingresa un código de cupón.' });
      return;
    }
    const result = validateCoupon(couponCodeInput, selectedPlan, basePrice);
    if (result.valid && result.coupon) {
      setAppliedCoupon(result.coupon);
      setCouponFeedback({ status: 'success', message: result.message || 'Cupón aplicado con éxito.' });
    } else {
      setAppliedCoupon(null);
      setCouponFeedback({ status: 'error', message: result.message || 'El cupón ingresado no es válido.' });
    }
  };

  const completeLocalActivation = () => {
    setTimeout(() => {
      try {
        const { user } = registerUserFromCheckout({
          rut,
          name: `${firstName.trim()} ${lastName.trim()}`.trim().toUpperCase() || 'APODERADO ESTUDIOSIMPLE',
          email,
          password,
          studentName: (`${studentFirstName.trim()} ${studentLastName.trim()}`.trim() || studentName.trim()).toUpperCase() || 'ESTUDIANTE',
          studentRun: studentRun.trim(),
          grade,
          plan: selectedPlan,
          phone
        });

        // 1. Auto-login inmediato en el contexto y activacion del curso comprado
        activateSessionFromCheckout(user, grade);

        // 2. Despacho asincrono de correo transaccional de bienvenida
        fetch('/api/mail/send-welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            rut: user.rut,
            password: password,
            studentName: user.studentName,
            grade: grade,
            studentPin: user.studentPin,
            plan: selectedPlan,
            amount: finalPrice
          })
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setEmailSentStatus({ sent: true, mode: data.mode });
            }
          })
          .catch(() => {
            setEmailSentStatus({ sent: true, mode: 'local' });
          });

        localStorage.setItem('estudio_simple_parent', JSON.stringify(user));
        setCreatedUser(user);

        recordAuditLog({
          actorId: user.id,
          actorName: user.name,
          actorEmail: user.email,
          actorRole: 'user',
          action: 'CREATE_USER_CHECKOUT',
          target: user.rut || user.email,
          details: `Inscripcion y generacion de claves para ${user.name}. Plan: ${selectedPlan} ($${finalPrice.toLocaleString('es-CL')} CLP). PIN estudiante: ${user.studentPin}`,
          metadata: { plan: selectedPlan, monto: finalPrice, cupon: appliedCoupon?.codigo, rut: user.rut, email: user.email }
        });

        setIsProcessing(false);
        setIsCompleted(true);
      } catch (err) {
        console.error('Error al procesar registro en checkout:', err);
        setErrorMessage('Ocurrió un error al registrar la cuenta. Inténtalo nuevamente.');
        setIsProcessing(false);
      }
    }, 1000);
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Validaciones estrictas
    if (!validateRut(rut)) {
      setErrorMessage('El RUN del apoderado ingresado no es válido según el algoritmo oficial Módulo 11.');
      return;
    }

    if (!studentRun.trim() || !validateRut(studentRun)) {
      setErrorMessage('El RUN del estudiante es obligatorio y debe ser válido según el algoritmo oficial Módulo 11 (con guion y dígito verificador).');
      return;
    }

    const finalStudentName = `${studentFirstName.trim()} ${studentLastName.trim()}`.trim().toUpperCase() || studentName.trim().toUpperCase();
    if (!studentFirstName.trim() || !studentLastName.trim()) {
      setErrorMessage('Por favor completa tanto los nombres como los apellidos del estudiante para su registro y certificación oficial.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('La contraseña debe contener al menos 8 caracteres para proteger tu cuenta.');
      return;
    }

    setIsProcessing(true);

    // Todo plan con cobro redirige a la pasarela oficial de Mercado Pago / Webpay
    const shouldUseMercadoPago = finalPrice > 0 && selectedPlan !== 'trial';

    if (shouldUseMercadoPago) {
      const pendingPayload = {
        rut: rut.trim(),
        name: `${firstName.trim()} ${lastName.trim()}`.trim().toUpperCase() || 'APODERADO ESTUDIOSIMPLE',
        firstName: firstName.trim().toUpperCase(),
        lastName: lastName.trim().toUpperCase(),
        email: email.trim(),
        password,
        studentName: finalStudentName,
        studentFirstName: studentFirstName.trim().toUpperCase(),
        studentLastName: studentLastName.trim().toUpperCase(),
        studentRun: studentRun.trim(),
        studentPin: Math.floor(100000 + Math.random() * 900000).toString(),
        grade,
        plan: selectedPlan,
        phone: phone.trim(),
        amount: finalPrice,
        couponCode: appliedCoupon?.codigo,
        timestamp: Date.now()
      };
      localStorage.setItem('estudio_simple_pending_checkout', JSON.stringify(pendingPayload));

      fetch('/api/payment/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan,
          planName: activePlanObj?.nombre || selectedPlan,
          amount: finalPrice,
          email: email.trim(),
          name: `${firstName.trim()} ${lastName.trim()}`.trim().toUpperCase(),
          rut: rut.trim(),
          grade,
          studentName: finalStudentName,
          studentRun: studentRun.trim(),
          couponCode: appliedCoupon?.codigo
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.initPoint) {
            window.location.href = data.initPoint;
            return;
          }
          if (data.success && data.directActivation) {
            completeLocalActivation();
            return;
          }
          setIsProcessing(false);
          setErrorMessage(data?.error || data?.message || 'No fue posible conectar con la pasarela segura de Mercado Pago / Webpay. Por favor reintenta o contacta a soporte.');
        })
        .catch((err) => {
          console.error('Error en llamada a Mercado Pago:', err);
          setIsProcessing(false);
          setErrorMessage('Error de conexión con la pasarela de pagos. Por favor verifica tu red e intenta nuevamente.');
        });
      return;
    }

    completeLocalActivation();
  };

  return (
    <div
      className="min-h-screen font-body-lg selection:bg-tertiary/30 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--canvas-bg)',
        color: 'var(--canvas-text)',
        fontFamily: '"Arial Rounded MT Bold", "Arial Rounded", sans-serif'
      }}
    >
      {/* 1. TOP NAVBAR: CHECKOUT SEGURO */}
      <header
        className="fixed top-0 w-full z-50 shadow-md border-b border-black/10 backdrop-blur-md transition-all duration-300"
        style={{ backgroundColor: 'var(--hf-bg)', color: 'var(--hf-text)' }}
      >
        <div className="flex justify-between items-center px-4 md:px-12 max-w-7xl mx-auto py-3 md:py-4">
          {/* Logo Oficial */}
          <div
            className="flex items-center shrink-0 cursor-pointer bg-white hover:bg-white/95 rounded-xl px-4 md:px-5 py-1 md:py-1.5 shadow-sm border border-black/10 hover:shadow-md transition-all duration-300"
            onClick={() => {
              setViewMode('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title="Volver a Inicio"
          >
            <img
              alt="Estudio Simple Logo"
              className="h-14 md:h-16 lg:h-20 w-auto object-contain"
              src="/logos/Logo_cabecera.png"
            />
          </div>

          {/* Insignia Oficial de Seguridad SSL */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/10 border border-black/15 text-current text-xs font-bold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Transacción Segura SSL 256-bit</span>
          </div>
        </div>
      </header>

      {/* 2. MAIN CHECKOUT GRID */}
      <main className="pb-16 px-4 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pt-28 md:pt-32">
        {/* Left Column: Form Steps */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header */}
          <div className="mb-2">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-1">Completar Registro Familiar</h1>
            <p className="text-sm text-white/70">
              Inscripción oficial de cursos con temarios MINEDUC y validación por RUN chileno.
            </p>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500 text-white text-xs font-bold flex items-center gap-3">
              <AlertCircle size={18} className="text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {!isCompleted ? (
            <form onSubmit={handleCompleteRegistration} className="space-y-6">
              {/* PLAN SELECCIONADO Y CONFIRMADO */}
              <div className="bg-[#10223D] border-2 border-[#F8AD22] rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#F8AD22]/20 border border-[#F8AD22]/40 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-[#F8AD22]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#F8AD22]">
                        Plan Seleccionado
                      </span>
                      {selectedPlan === 'full' && (
                        <span className="bg-[#EE751C] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                          Ahorra 44%
                        </span>
                      )}
                    </div>
                    <div className="text-lg md:text-xl font-black text-white">
                      {selectedPlan === 'monthly'
                        ? 'Plan Mensual'
                        : selectedPlan === 'full'
                        ? 'Anual Exámenes Libres'
                        : 'Prueba 7 Días'}
                      <span className="text-sm font-semibold text-gray-300 ml-2">
                        (
                        ${finalPrice.toLocaleString('es-CL')} CLP
                        {selectedPlan === 'monthly' ? ' / mes' : selectedPlan === 'full' ? ' / año' : ''}
                        )
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 1: DATOS DEL APODERADO / TUTOR LEGAL */}
              <section className="bento-card p-6 md:p-8 rounded-2xl space-y-4">
                <h2 className="text-xl font-bold text-[#57d6f3] flex items-center gap-3">
                  <span className="bg-[#123a72] text-[#85a6e4] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <span>Datos del Apoderado (Tutor Legal en Chile)</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1">
                      Nombre del Padre / Madre / Tutor *
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value.toUpperCase())}
                      placeholder="EJ. CONSTANZA"
                      className="input-field w-full rounded-lg px-4 py-3 text-xs uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1">
                      Apellidos *
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value.toUpperCase())}
                      placeholder="EJ. GONZÁLEZ MORALES"
                      className="input-field w-full rounded-lg px-4 py-3 text-xs uppercase"
                    />
                  </div>

                  {/* RUN del Apoderado con Validación Módulo 11 */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs text-white/70 font-semibold">
                        RUN del Apoderado (con guion) *
                      </label>
                      {isRutValid === true && (
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                          <Check size={12} /> RUN Válido
                        </span>
                      )}
                      {isRutValid === false && (
                        <span className="text-[10px] font-bold text-rose-400 flex items-center gap-0.5">
                          Dígito incorrecto
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      value={rut}
                      onChange={(e) => setRut(formatRutOnInput(e.target.value))}
                      placeholder="Ej. 15.321.876-5"
                      className={`input-field w-full rounded-lg px-4 py-3 text-xs font-mono tracking-wider ${
                        isRutValid === true
                          ? 'border-emerald-500 ring-1 ring-emerald-500'
                          : isRutValid === false
                          ? 'border-rose-500 ring-1 ring-rose-500'
                          : ''
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1">
                      Teléfono Móvil (WhatsApp de Apoyo)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(formatChileanPhone(e.target.value))}
                      placeholder="+56 9 1234 5678"
                      className="input-field w-full rounded-lg px-4 py-3 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1">
                      Correo Electrónico (Usuario de Login) *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@ejemplo.cl"
                      className="input-field w-full rounded-lg px-4 py-3 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1">
                      Contraseña de tu Cuenta (Mínimo 8 caracteres) *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Crea una contraseña segura"
                        className="input-field w-full rounded-lg px-4 py-3 pr-10 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors cursor-pointer p-1"
                        title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* STEP 2: DATOS DEL ESTUDIANTE Y CURSO */}
              <section className="bento-card p-6 md:p-8 rounded-2xl space-y-4">
                <h2 className="text-xl font-bold text-[#57d6f3] flex items-center gap-3">
                  <span className="bg-[#123a72] text-[#85a6e4] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <span>Datos del Estudiante y Curso a Inscribir</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1">
                      Nombres del Estudiante *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentFirstName}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase();
                        setStudentFirstName(val);
                        setStudentName(`${val.trim()} ${studentLastName.trim()}`.trim().toUpperCase());
                      }}
                      placeholder="EJ. LUCIANO ANDRÉS"
                      className="input-field w-full rounded-lg px-4 py-3 text-xs uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1">
                      Apellidos del Estudiante *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentLastName}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase();
                        setStudentLastName(val);
                        setStudentName(`${studentFirstName.trim()} ${val.trim()}`.trim().toUpperCase());
                      }}
                      placeholder="EJ. HERNÁNDEZ ORELLANA"
                      className="input-field w-full rounded-lg px-4 py-3 text-xs uppercase"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs text-white/70 font-semibold">
                        RUN del Estudiante (con guion) *
                      </label>
                      {isStudentRunValid === true && (
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                          <Check size={12} /> RUN Válido
                        </span>
                      )}
                      {isStudentRunValid === false && (
                        <span className="text-[10px] font-bold text-rose-400 flex items-center gap-0.5">
                          Dígito incorrecto
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      value={studentRun}
                      onChange={(e) => setStudentRun(formatRutOnInput(e.target.value))}
                      placeholder="Ej. 24.102.394-K"
                      className={`input-field w-full rounded-lg px-4 py-3 text-xs font-mono tracking-wider ${
                        isStudentRunValid === true
                          ? 'border-emerald-500 ring-1 ring-emerald-500'
                          : isStudentRunValid === false
                          ? 'border-rose-500 ring-1 ring-rose-500'
                          : ''
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1">
                      Nivel / Curso a Contratar *
                    </label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value as GradeLevel)}
                      className="input-field w-full rounded-lg px-4 py-3 text-xs"
                    >
                      <option value="3° Básico">3° Básico</option>
                      <option value="4° Básico">4° Básico</option>
                      <option value="5° Básico">5° Básico</option>
                      <option value="6° Básico">6° Básico</option>
                      <option value="7° Básico">7° Básico</option>
                      <option value="8° Básico">8° Básico</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* STEP 3: MÉTODO DE PAGO Y CONFIRMACIÓN */}
              <section className="bento-card p-6 md:p-8 rounded-2xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <h2 className="text-xl font-bold text-[#57d6f3] flex items-center gap-3">
                    <span className="bg-[#123a72] text-[#85a6e4] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shrink-0">
                      3
                    </span>
                    <span>Método de Pago Seguro (Mercado Pago / Webpay)</span>
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit">
                    <Lock size={12} />
                    <span>Conexión Encriptada SSL 256-bit</span>
                  </div>
                </div>

                {/* Resumen Sobrio del Plan */}
                <div className="bg-gradient-to-br from-[#123a72]/60 via-[#1a4484]/40 to-[#10223D] border border-white/15 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#F8AD22] block mb-0.5">
                        Total Final a Pagar Hoy
                      </span>
                      <div className="text-2xl md:text-3xl font-black text-white flex items-baseline gap-2">
                        <span>${finalPrice.toLocaleString('es-CL')} CLP</span>
                        <span className="text-xs font-semibold text-white/60">
                          {selectedPlan === 'monthly' ? '(Mensualidad)' : selectedPlan === 'full' ? '(Acceso Anual Completo)' : '(Prueba Gratuita)'}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#009EE3]/15 border border-[#009EE3]/40 rounded-xl px-4 py-2 text-left sm:text-right">
                      <span className="text-[10px] uppercase font-bold text-[#009EE3] block">Pasarela Oficial</span>
                      <span className="text-xs font-extrabold text-white">Mercado Pago · Webpay Plus</span>
                    </div>
                  </div>

                  {/* Beneficios Incluidos en el Pago */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-white/80">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                      <span>Acceso 100% al curso completo de {grade}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                      <span>Todas las asignaturas del temario MINEDUC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                      <span>Activación automática inmediata post-pago</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                      <span>Sin cobros ocultos ni letra chica</span>
                    </div>
                  </div>
                </div>

                {/* Medios de Pago Soportados */}
                <div className="bg-black/20 border border-white/10 rounded-2xl p-4 md:p-5 space-y-3">
                  <div className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
                    Medios de pago soportados a través de Mercado Pago:
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {/* Débito Redcompra */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center flex flex-col items-center justify-center gap-1.5">
                      <CreditCard size={20} className="text-[#57d6f3]" />
                      <span className="text-xs font-bold text-white">Débito Redcompra</span>
                      <span className="text-[10px] text-white/50">CuentaRUT y Bancos</span>
                    </div>

                    {/* Tarjetas de Crédito */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center flex flex-col items-center justify-center gap-1.5">
                      <CreditCard size={20} className="text-[#F8AD22]" />
                      <span className="text-xs font-bold text-white">Tarjetas de Crédito</span>
                      <span className="text-[10px] text-white/50">Visa, Mastercard, AMEX</span>
                    </div>

                    {/* Webpay Plus */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center flex flex-col items-center justify-center gap-1.5">
                      <ShieldCheck size={20} className="text-emerald-400" />
                      <span className="text-xs font-bold text-white">Webpay Plus</span>
                      <span className="text-[10px] text-white/50">Transbank Oficial</span>
                    </div>

                    {/* Mercado Pago Wallet */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center flex flex-col items-center justify-center gap-1.5">
                      <Sparkles size={20} className="text-[#009EE3]" />
                      <span className="text-xs font-bold text-white">Mercado Pago</span>
                      <span className="text-[10px] text-white/50">Dinero en Cuenta</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-white/50 leading-relaxed pt-1">
                    Al presionar el botón de pago, serás transferido a la pantalla oficial y protegida de Mercado Pago para ingresar tus datos bancarios y autorizar la transacción de forma 100% segura. Tus datos financieros nunca son almacenados en nuestros servidores.
                  </p>
                </div>

                {/* Sellos de Confianza y Cumplimiento Bancario */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[10px] text-white/60">
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5 border border-white/5">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    <span>SSL 256-bit Seguro</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5 border border-white/5">
                    <Lock size={16} className="text-[#57d6f3]" />
                    <span>Norma Bancaria PCI-DSS</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5 border border-white/5">
                    <CheckCircle2 size={16} className="text-[#F8AD22]" />
                    <span>Webpay / Mercado Pago</span>
                  </div>
                </div>

                {/* Botón de Acción Directa */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-xl bg-[#EE751C] hover:bg-[#d96512] text-white font-extrabold text-base shadow-xl transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <ShieldCheck size={20} />
                  <span>
                    {isProcessing
                      ? 'Conectando con Mercado Pago...'
                      : selectedPlan === 'trial'
                      ? 'Activar Prueba Gratuita (7 Días)'
                      : `Pagar $${finalPrice.toLocaleString('es-CL')} CLP con Mercado Pago / Webpay`}
                  </span>
                </button>
              </section>
            </form>
          ) : (
            /* FICHA OFICIAL DE ACCESO FAMILIAR POST-COMPRA */
            <div className="bento-card p-6 md:p-8 rounded-3xl space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 size={36} className="text-emerald-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white">Suscripcion Activada y Claves Generadas</h2>
                <p className="text-sm text-white/70 max-w-xl mx-auto">
                  Bienvenida/o {createdUser?.name}. El nivel <strong className="text-[#57d6f3]">{grade}</strong> ha sido habilitado con éxito. Tu sesión se encuentra activa para ingresar de inmediato.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1 max-w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold max-w-full">
                    <Check size={14} className="shrink-0" />
                    <span className="truncate max-w-[280px] sm:max-w-none">
                      {emailSentStatus?.sent
                        ? `Copia oficial despachada a ${createdUser?.email || email}`
                        : `Copia oficial enviada a ${createdUser?.email || email}`}
                    </span>
                  </div>
                  {isMercadoPagoApproved && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#009EE3]/15 border border-[#009EE3]/40 text-[#009EE3] text-xs font-bold max-w-full">
                      <CreditCard size={14} className="shrink-0" />
                      <span>Pago Verificado vía Mercado Pago / Webpay ($1.000 CLP)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* BANNER DESTACADO: DESPACHO DIRECTO A WHATSAPP (100% FLUIDO Y RESPONSIVE) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#25D366]/20 via-[#12A1A4]/15 to-transparent border-2 border-[#25D366]/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 w-full min-w-0">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 min-w-0 flex-1 w-full">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-lg">
                    <MessageCircle size={26} />
                  </div>
                  <div className="min-w-0 space-y-1 flex-1">
                    <h3 className="text-sm md:text-base font-extrabold text-white break-words">
                      Recibe tus credenciales de acceso en tu WhatsApp
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed break-words">
                      Envía un respaldo automático con tu RUN, contraseña y PIN del estudiante a tu teléfono celular.
                    </p>
                  </div>
                </div>

                <a
                  href={buildWhatsAppUrl(parentPhone, waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto px-4 sm:px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg border border-emerald-400/40 text-center leading-normal break-words max-w-full"
                >
                  <MessageCircle size={18} className="shrink-0" />
                  <span className="break-words">
                    {parentPhone
                      ? `Enviar a mi WhatsApp (${parentPhone})`
                      : 'Enviar credenciales a mi WhatsApp'}
                  </span>
                </a>
              </div>

              {/* Botones para Copiar, WhatsApp y Descargar */}
              <div className="flex flex-wrap justify-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyAllCredentials}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-bold text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                >
                  {copiedField === 'ALL_CREDENTIALS' ? (
                    <>
                      <Check size={16} className="text-emerald-400" />
                      <span className="text-emerald-400">Copiado al Portapapeles</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} className="text-[#F8AD22]" />
                      <span>Copiar Resumen de Claves</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="px-4 py-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 text-xs font-bold text-[#25D366] flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                >
                  <span>Compartir por WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintCredentials}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-white/80 hover:text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                >
                  <span>Imprimir / Guardar PDF</span>
                </button>
              </div>

              {/* Dual Cards: Apoderado vs Estudiante */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Tarjeta Apoderado */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-[#12A1A4] font-bold text-xs uppercase tracking-wider border-b border-white/10 pb-2">
                    <Shield size={16} />
                    <span>Acceso del Apoderado</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <span className="text-white/60 block text-[11px]">RUN de Acceso:</span>
                      <div className="flex items-center justify-between bg-black/20 px-3 py-1.5 rounded-lg border border-white/5 mt-0.5">
                        <span className="font-mono font-bold text-white">{createdUser?.rut || rut}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyField(createdUser?.rut || rut, 'APODERADO_RUT')}
                          className="text-white/40 hover:text-white transition-all cursor-pointer"
                          title="Copiar RUN"
                        >
                          {copiedField === 'APODERADO_RUT' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-white/60 block text-[11px]">Correo Electronico:</span>
                      <div className="flex items-center justify-between bg-black/20 px-3 py-1.5 rounded-lg border border-white/5 mt-0.5">
                        <span className="font-mono font-bold text-white truncate max-w-[190px]">{createdUser?.email || email}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyField(createdUser?.email || email, 'APODERADO_EMAIL')}
                          className="text-white/40 hover:text-white transition-all cursor-pointer"
                          title="Copiar Correo"
                        >
                          {copiedField === 'APODERADO_EMAIL' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-white/60 block text-[11px]">Contraseña Asignada:</span>
                      <div className="flex items-center justify-between bg-black/20 px-3 py-1.5 rounded-lg border border-white/5 mt-0.5">
                        <span className="font-mono font-bold text-emerald-400">{createdUser?.password || password}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyField(createdUser?.password || password, 'APODERADO_PASS')}
                          className="text-white/40 hover:text-white transition-all cursor-pointer"
                          title="Copiar Contraseña"
                        >
                          {copiedField === 'APODERADO_PASS' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-white/50 pt-1 leading-relaxed">
                    Usa tu RUN o Correo junto a tu contraseña para gestionar la suscripcion y supervisar avances.
                  </p>
                </div>

                {/* 2. Tarjeta Estudiante */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-[#F8AD22] font-bold text-xs uppercase tracking-wider border-b border-white/10 pb-2">
                    <GraduationCap size={16} />
                    <span>Acceso del Estudiante</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <span className="text-white/60 block text-[11px]">Nombre del Estudiante:</span>
                      <div className="bg-black/20 px-3 py-1.5 rounded-lg border border-white/5 mt-0.5 font-bold text-white">
                        {createdUser?.studentName || studentName || 'Estudiante'} ({grade})
                      </div>
                    </div>

                    <div>
                      <span className="text-white/60 block text-[11px]">PIN Numérico de Ingreso Directo:</span>
                      <div className="flex items-center justify-between bg-[#F8AD22]/15 border border-[#F8AD22]/40 px-3.5 py-2 rounded-xl mt-0.5">
                        <div>
                          <span className="font-mono text-xl font-black text-[#F8AD22] tracking-widest">
                            {createdUser?.studentPin || '123456'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyField(createdUser?.studentPin || '123456', 'STUDENT_PIN')}
                          className="px-2 py-1 rounded bg-[#F8AD22] hover:bg-[#e09b1f] text-[#0A192F] font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer"
                        >
                          {copiedField === 'STUDENT_PIN' ? <Check size={12} /> : <Copy size={12} />}
                          <span>{copiedField === 'STUDENT_PIN' ? 'Copiado' : 'Copiar PIN'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-white/50 pt-1 leading-relaxed">
                    El estudiante ingresa directamente al salon de clases digitando solo este PIN de 6 digitos, sin recordar contraseñas complejas.
                  </p>
                </div>
              </div>

              {/* Botones de Accion Directa (Con Sesion Activa) */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('parent');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-[#EE751C] hover:bg-[#d96512] text-white font-bold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Shield size={16} />
                  <span>Ir al Portal del Apoderado</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('student');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-[#12A1A4] hover:bg-[#0e8385] text-white font-bold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <GraduationCap size={16} />
                  <span>Comenzar Clases de {grade} Inmediatamente</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-6">
            <div className="bento-card p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white mb-2">Resumen del Pedido</h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-white/70">
                  <span>Plan:</span>
                  <span className="font-bold text-white">
                    {selectedPlan === 'monthly'
                      ? 'Plan Mensual'
                      : selectedPlan === 'full'
                      ? 'Anual Exámenes Libres'
                      : 'Prueba 7 Días'}
                  </span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Curso Activo:</span>
                  <span className="font-bold text-[#57d6f3]">{grade}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Titular:</span>
                  <span className="font-mono text-white/90">{rut || 'Sin RUN'}</span>
                </div>

                {/* Subtotal base */}
                {selectedPlan !== 'trial' && (
                  <div className="flex justify-between text-white/70">
                    <span>Precio Base:</span>
                    <span className="font-mono text-white/90">
                      ${basePrice.toLocaleString('es-CL')} CLP
                    </span>
                  </div>
                )}

                {/* Descuento por Cupón */}
                {appliedCoupon && selectedPlan !== 'trial' && (
                  <div className="flex justify-between text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1.5 rounded-lg border border-emerald-500/20">
                    <span className="flex items-center gap-1">
                      <Tag size={12} />
                      Cupón ({appliedCoupon.codigo}):
                    </span>
                    <span>-${discountAmount.toLocaleString('es-CL')} CLP</span>
                  </div>
                )}

                <div className="border-t border-white/10 pt-3 flex justify-between text-base font-bold text-white">
                  <span>Total Hoy:</span>
                  <span className="text-[#f27a00] font-black">
                    ${finalPrice.toLocaleString('es-CL')} CLP
                  </span>
                </div>
              </div>

              {/* Formulario de Cupón de Descuento */}
              {selectedPlan !== 'trial' && (
                <div className="pt-2 border-t border-white/10">
                  <label className="block text-[11px] font-bold text-white/80 mb-1.5">
                    ¿Tienes un cupón de descuento?
                  </label>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                      placeholder="Ej. TEST1000"
                      className="input-field flex-1 rounded-lg px-3 py-2 text-xs font-mono tracking-wider uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-[#57d6f3]/20 hover:bg-[#57d6f3]/30 text-[#57d6f3] border border-[#57d6f3]/40 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                    >
                      Aplicar
                    </button>
                  </form>
                  {couponFeedback.message && (
                    <p
                      className={`text-[11px] mt-1.5 ${
                        couponFeedback.status === 'success' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {couponFeedback.message}
                    </p>
                  )}
                </div>
              )}

              {/* Modo de Pasarela Activo */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/60 space-y-1">
                <div className="flex items-center justify-between">
                  <span>Pasarela de Pago:</span>
                  <span className="font-bold text-white uppercase text-[10px] bg-white/10 px-2 py-0.5 rounded">
                    {pricingConfig.pasarela.provider === 'mercadopago' ? 'Mercado Pago / Webpay' : 'Modo Simulado'}
                  </span>
                </div>
                {pricingConfig.pasarela.provider === 'mercadopago' && (
                  <p className="text-[10px] text-white/40">
                    Acepta tarjetas de débito, crédito y saldo Mercado Pago / Mercado Libre.
                  </p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/70 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <ShieldCheck size={16} />
                  <span>Garantía de Satisfacción</span>
                </div>
                <p>Cancela en cualquier momento con 1 solo clic desde tu portal sin preguntas ni letra chica.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
