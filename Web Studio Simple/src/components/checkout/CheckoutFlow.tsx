import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CheckoutFlow: React.FC = () => {
  const { setViewMode, headerFooterColor } = useApp();
  
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'full' | 'trial'>(() => {
    const saved = localStorage.getItem('estudio_simple_selected_plan');
    if (saved === 'full' || saved === 'trial' || saved === 'monthly') return saved;
    return 'full';
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('5° Básico');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen font-body-lg selection:bg-tertiary/30 transition-colors duration-300" style={{ backgroundColor: 'var(--canvas-bg)', color: 'var(--canvas-text)', fontFamily: '"Arial Rounded MT Bold", "Arial Rounded", sans-serif' }}>
      
      {/* 1. TOP NAVBAR: DISTRACTION-FREE SECURE CHECKOUT WITH OFFICIAL BRANDING */}
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
            <h1 className="text-3xl md:text-5xl font-black text-white mb-1">Completar Registro</h1>
            <p className="text-sm text-white/70">Activa tu cuenta familiar con temarios oficiales MINEDUC.</p>
          </div>

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
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#F8AD22]">Plan Seleccionado</span>
                      {selectedPlan === 'full' && (
                        <span className="bg-[#EE751C] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Ahorra 44%</span>
                      )}
                    </div>
                    <div className="text-lg md:text-xl font-black text-white">
                      {selectedPlan === 'monthly' ? 'Plan Mensual' : selectedPlan === 'full' ? 'Anual Exámenes Libres' : 'Prueba 7 Días'}
                      <span className="text-sm font-semibold text-gray-300 ml-2">
                        ({selectedPlan === 'monthly' ? '$29.990 CLP / mes' : selectedPlan === 'full' ? '$199.900 CLP / año' : '$0 CLP'})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <label className="text-xs text-white/60 font-semibold hidden sm:inline">Cambiar plan:</label>
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value as any)}
                    className="bg-[#16325C] hover:bg-[#1A3B6E] border border-white/20 text-white text-xs font-bold rounded-xl px-3 py-2 outline-hidden cursor-pointer"
                  >
                    <option value="full" className="bg-[#0A192F] text-white">Anual ($199.900 CLP)</option>
                    <option value="monthly" className="bg-[#0A192F] text-white">Mensual ($29.990 CLP)</option>
                    <option value="trial" className="bg-[#0A192F] text-white">Prueba ($0 CLP)</option>
                  </select>
                </div>
              </div>

              {/* STEP 1: DATOS DE LA CUENTA */}
              <section className="bento-card p-6 md:p-8 rounded-2xl space-y-4">
                <h2 className="text-xl font-bold text-[#57d6f3] flex items-center gap-3">
                  <span className="bg-[#123a72] text-[#85a6e4] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                  <span>Datos de la Cuenta</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1">Nombre del Padre/Madre</label>
                    <input 
                      type="text" 
                      value={firstName} 
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="Ej. Constanza"
                      className="input-field w-full rounded-lg px-4 py-3 text-xs" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1">Apellido</label>
                    <input 
                      type="text" 
                      value={lastName} 
                      onChange={e => setLastName(e.target.value)}
                      placeholder="Ej. González"
                      className="input-field w-full rounded-lg px-4 py-3 text-xs" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-white/70 font-semibold mb-1">Correo Electrónico</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                      placeholder="correo@ejemplo.cl"
                      className="input-field w-full rounded-lg px-4 py-3 text-xs" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1">Curso del Estudiante</label>
                    <select 
                      value={grade}
                      onChange={e => setGrade(e.target.value)}
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
                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1">Contraseña</label>
                    <input 
                      type="password" 
                      defaultValue="••••••••" 
                      className="input-field w-full rounded-lg px-4 py-3 text-xs" 
                    />
                  </div>
                </div>
              </section>

              {/* STEP 2: MÉTODO DE PAGO */}
              <section className="bento-card p-6 md:p-8 rounded-2xl space-y-4">
                <h2 className="text-xl font-bold text-[#57d6f3] flex items-center gap-3">
                  <span className="bg-[#123a72] text-[#85a6e4] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                  <span>Método de Pago</span>
                </h2>

                {/* Simulated Credit Card Preview */}
                <div className="bg-gradient-to-br from-[#123a72] to-[#272a2c] rounded-2xl p-6 border border-white/10 relative overflow-hidden shadow-xl">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#57d6f3]/20 rounded-full blur-2xl"></div>
                  <div className="flex justify-between items-center mb-6 relative z-10">
                    <span className="material-symbols-outlined text-white text-3xl">contactless</span>
                    <div className="flex gap-2">
                      <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                      <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="font-mono text-xl text-white tracking-widest mb-6 relative z-10 opacity-90">
                    {cardNumber}
                  </div>
                  <div className="flex justify-between text-white/70 text-xs uppercase relative z-10 font-bold">
                    <div>
                      <span className="block opacity-60 text-[9px]">Titular de la Tarjeta</span>
                      {firstName.toUpperCase()} {lastName.toUpperCase()}
                    </div>
                    <div>
                      <span className="block opacity-60 text-[9px]">Expira</span>
                      12/26
                    </div>
                  </div>
                </div>

                {/* Card Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="md:col-span-2">
                    <label className="block text-xs text-white/70 font-semibold mb-1">Número de Tarjeta</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={cardNumber} 
                        onChange={e => setCardNumber(e.target.value)}
                        className="input-field w-full rounded-lg pl-4 pr-10 py-3 text-xs font-mono" 
                      />
                      <span className="material-symbols-outlined absolute right-3 top-3 text-white/50">credit_card</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1">Fecha de Expiración</label>
                    <input type="text" defaultValue="12/26" className="input-field w-full rounded-lg px-4 py-3 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 font-semibold mb-1">CVC</label>
                    <input type="text" defaultValue="123" className="input-field w-full rounded-lg px-4 py-3 text-xs" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-xl bg-[#f27a00] hover:bg-[#e06f00] text-white font-bold text-base shadow-xl transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {isProcessing ? 'Procesando Pago Seguro...' : 'Completar Compra y Comenzar'}
                </button>
              </section>

            </form>
          ) : (
            <div className="bento-card p-8 rounded-3xl text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500 flex items-center justify-center mx-auto text-3xl">
                ✓
              </div>
              <h2 className="text-3xl font-bold text-white">¡Suscripción Completada!</h2>
              <p className="text-sm text-white/70">
                Bienvenida/o {firstName} {lastName}. El perfil para {grade} ha sido activado correctamente.
              </p>
              
              {/* Claves Generadas */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left max-w-md mx-auto space-y-3">
                <div className="text-xs font-bold text-[#F8AD22] uppercase tracking-wider">Credenciales Generadas</div>
                <div className="flex justify-between items-center text-xs text-white/80 border-b border-white/10 pb-2">
                  <span>Cuenta Apoderado:</span>
                  <span className="font-mono font-bold text-emerald-400">{email}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-white/80">
                  <span>PIN para Estudiante:</span>
                  <span className="font-mono font-bold text-[#F8AD22] text-base">123456</span>
                </div>
                <p className="text-[10px] text-white/40 pt-1">
                  * Guarda este PIN para que tu hijo/a pueda ingresar al Salón de Clases Virtual.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => setViewMode('login')}
                  className="px-8 py-3.5 rounded-xl bg-[#12A1A4] text-white font-bold text-sm shadow-lg hover:scale-105 transition-all"
                >
                  Ir al Login
                </button>
                <button
                  onClick={() => setViewMode('parent')}
                  className="px-8 py-3.5 rounded-xl bg-[#f27a00] text-white font-bold text-sm shadow-lg hover:scale-105 transition-all"
                >
                  Ir al Panel de Apoderado
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
                  <span>Plan Seleccionado:</span>
                  <span className="font-bold text-white">
                    {selectedPlan === 'monthly' 
                      ? 'Plan Mensual' 
                      : selectedPlan === 'full' 
                      ? 'Anual Exámenes Libres' 
                      : 'Prueba 7 Días'}
                  </span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Curso:</span>
                  <span className="font-bold text-[#57d6f3]">{grade}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-base font-bold text-white">
                  <span>Total Hoy:</span>
                  <span className="text-[#f27a00] font-black">
                    {selectedPlan === 'trial' ? '$0 CLP' : selectedPlan === 'monthly' ? '$29.990 CLP' : '$199.900 CLP'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/70 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>Garantía de Satisfacción</span>
                </div>
                <p>Cancela en cualquier momento con 1 solo clic desde tu portal sin preguntas.</p>
              </div>
            </div>

          </div>
        </div>

      </main>

    </div>
  );
};
