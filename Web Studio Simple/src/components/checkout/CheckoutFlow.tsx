import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, CheckCircle2, AlertCircle, Check, KeyRound } from 'lucide-react';
import { GradeLevel, ParentUser } from '../../types';
import { validateRut, formatRutOnInput } from '../../lib/rut-validator';
import { registerUserFromCheckout } from '../../lib/user-repository';

export const CheckoutFlow: React.FC = () => {
  const { setViewMode } = useApp();

  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'full' | 'trial'>(() => {
    const saved = localStorage.getItem('estudio_simple_selected_plan');
    if (saved === 'full' || saved === 'trial' || saved === 'monthly') return saved;
    return 'full';
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [createdUser, setCreatedUser] = useState<ParentUser | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields - Apoderado
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rut, setRut] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form Fields - Estudiante
  const [studentName, setStudentName] = useState('');
  const [studentRun, setStudentRun] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('7° Básico');

  // Pago Simulado
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');

  // Estado de validación del RUN en tiempo real
  const isRutValid = rut.trim().length >= 8 ? validateRut(rut) : null;
  const isStudentRunValid = studentRun.trim().length >= 8 ? validateRut(studentRun) : null;

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Validaciones estrictas
    if (!validateRut(rut)) {
      setErrorMessage('El RUN del apoderado ingresado no es válido según el algoritmo oficial Módulo 11.');
      return;
    }

    if (studentRun.trim() && !validateRut(studentRun)) {
      setErrorMessage('El RUN del estudiante ingresado no es válido. Verifica el dígito verificador.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('La contraseña debe contener al menos 8 caracteres para proteger tu cuenta.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      try {
        const { user } = registerUserFromCheckout({
          rut,
          name: `${firstName.trim()} ${lastName.trim()}`.trim() || 'Apoderado EstudioSimple',
          email,
          password,
          studentName: studentName.trim() || 'Estudiante',
          studentRun: studentRun.trim(),
          grade,
          plan: selectedPlan,
          phone
        });

        // Actualizar sesión activa en localStorage
        localStorage.setItem('estudio_simple_parent', JSON.stringify(user));
        setCreatedUser(user);
        setIsProcessing(false);
        setIsCompleted(true);
      } catch (err) {
        console.error('Error al procesar registro en checkout:', err);
        setErrorMessage('Ocurrió un error al registrar la cuenta. Inténtalo nuevamente.');
        setIsProcessing(false);
      }
    }, 1200);
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
                        {selectedPlan === 'monthly'
                          ? '$29.990 CLP / mes'
                          : selectedPlan === 'full'
                          ? '$199.900 CLP / año'
                          : '$0 CLP'}
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
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Ej. Constanza"
                      className="input-field w-full rounded-lg px-4 py-3 text-xs"
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
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Ej. González Morales"
                      className="input-field w-full rounded-lg px-4 py-3 text-xs"
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
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+56 9 1234 5678"
                      className="input-field w-full rounded-lg px-4 py-3 text-xs"
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
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Crea una contraseña segura"
                      className="input-field w-full rounded-lg px-4 py-3 text-xs"
                    />
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1">
                      Nombre del Hijo/a (Estudiante) *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Ej. Mateo"
                      className="input-field w-full rounded-lg px-4 py-3 text-xs"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs text-white/70 font-semibold">
                        RUN o IPE del Alumno (Opcional)
                      </label>
                      {isStudentRunValid === true && (
                        <span className="text-[10px] font-bold text-emerald-400">Válido</span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={studentRun}
                      onChange={(e) => setStudentRun(formatRutOnInput(e.target.value))}
                      placeholder="Ej. 24.102.394-K"
                      className="input-field w-full rounded-lg px-4 py-3 text-xs font-mono"
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

              {/* STEP 3: MÉTODO DE PAGO */}
              <section className="bento-card p-6 md:p-8 rounded-2xl space-y-4">
                <h2 className="text-xl font-bold text-[#57d6f3] flex items-center gap-3">
                  <span className="bg-[#123a72] text-[#85a6e4] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  <span>Método de Pago Seguro (Webpay / Tarjeta)</span>
                </h2>

                {/* Simulated Credit Card Preview */}
                <div className="bg-gradient-to-br from-[#123a72] to-[#272a2c] rounded-2xl p-6 border border-white/10 relative overflow-hidden shadow-xl">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#57d6f3]/20 rounded-full blur-2xl" />
                  <div className="flex justify-between items-center mb-6 relative z-10">
                    <span className="text-white text-xs font-mono font-bold tracking-widest uppercase">
                      Transbank Webpay Plus
                    </span>
                    <div className="flex gap-2">
                      <div className="w-8 h-5 bg-white/20 rounded-xs" />
                      <div className="w-8 h-5 bg-white/20 rounded-xs" />
                    </div>
                  </div>
                  <div className="font-mono text-xl text-white tracking-widest mb-6 relative z-10 opacity-90">
                    {cardNumber}
                  </div>
                  <div className="flex justify-between text-white/70 text-xs uppercase relative z-10 font-bold">
                    <div>
                      <span className="block opacity-60 text-[9px]">Titular Registrado</span>
                      {firstName || 'NOMBRE'} {lastName || 'APELLIDO'} · {rut || 'RUN'}
                    </div>
                    <div>
                      <span className="block opacity-60 text-[9px]">Expira</span>
                      12/28
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="md:col-span-2">
                    <label className="block text-xs text-white/70 font-semibold mb-1">
                      Número de Tarjeta (Débito o Crédito)
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="input-field w-full rounded-lg px-4 py-3 text-xs font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-xl bg-[#EE751C] hover:bg-[#d96512] text-white font-extrabold text-base shadow-xl transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50"
                >
                  <ShieldCheck size={20} />
                  <span>
                    {isProcessing ? 'Procesando Pago Seguro...' : 'Pagar y Activar Suscripción Familiar'}
                  </span>
                </button>
              </section>
            </form>
          ) : (
            /* PANTALLA DE ÉXITO Y ENTREGA DE CREDENCIALES */
            <div className="bento-card p-8 rounded-3xl text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500 flex items-center justify-center mx-auto text-3xl font-black">
                ✓
              </div>
              <h2 className="text-3xl font-bold text-white">¡Suscripción Activada con Éxito!</h2>
              <p className="text-sm text-white/70">
                Bienvenida/o {createdUser?.name}. El nivel {grade} ha sido habilitado en tu cuenta familiar.
              </p>

              {/* Credenciales Generadas */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left max-w-md mx-auto space-y-3">
                <div className="text-xs font-bold text-[#F8AD22] uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound size={15} />
                  <span>Credenciales Familiares Asignadas</span>
                </div>

                <div className="flex justify-between items-center text-xs text-white/80 border-b border-white/10 pb-2">
                  <span>RUN Apoderado:</span>
                  <span className="font-mono font-bold text-white">{createdUser?.rut}</span>
                </div>

                <div className="flex justify-between items-center text-xs text-white/80 border-b border-white/10 pb-2">
                  <span>Correo de Acceso:</span>
                  <span className="font-mono font-bold text-emerald-400">{createdUser?.email}</span>
                </div>

                <div className="flex justify-between items-center text-xs text-white/80 border-b border-white/10 pb-2">
                  <span>Estudiante:</span>
                  <span className="font-bold text-white">
                    {createdUser?.studentName} ({grade})
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs text-white/80">
                  <span>PIN para Estudiante:</span>
                  <span className="font-mono font-extrabold text-[#F8AD22] text-lg">
                    {createdUser?.studentPin || '123456'}
                  </span>
                </div>

                <p className="text-[10px] text-white/50 pt-2">
                  * Tu hijo/a puede usar este PIN numérico de 6 dígitos para ingresar al salón de clases sin necesidad de contraseña.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setViewMode('parent')}
                  className="px-8 py-3.5 rounded-xl bg-[#EE751C] text-white font-black text-sm shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                  Ir al Panel de Apoderado
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('courses')}
                  className="px-8 py-3.5 rounded-xl bg-[#12A1A4] text-white font-bold text-sm shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                  Ver Clases de {grade}
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
                <div className="border-t border-white/10 pt-3 flex justify-between text-base font-bold text-white">
                  <span>Total Hoy:</span>
                  <span className="text-[#f27a00] font-black">
                    {selectedPlan === 'trial'
                      ? '$0 CLP'
                      : selectedPlan === 'monthly'
                      ? '$29.990 CLP'
                      : '$199.900 CLP'}
                  </span>
                </div>
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
