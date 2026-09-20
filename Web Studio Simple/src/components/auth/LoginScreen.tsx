import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Shield } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { setViewMode, loginAsStudent, loginAsParent, headerFooterColor } = useApp();
  const [activeTab, setActiveTab] = useState<'student' | 'parent'>('student');
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (pin.length !== 6) {
      setError('El PIN debe tener 6 digitos.');
      return;
    }
    const result = loginAsStudent(pin);
    if (!result.success && result.error) {
      setError(result.error);
    }
  };

  const handleParentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Completa todos los campos.');
      return;
    }
    const result = loginAsParent(email, password);
    if (!result.success && result.error) {
      setError(result.error);
    }
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 6) {
      setPin(prev => prev + digit);
      setError('');
    }
  };

  const handlePinDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--canvas-bg)',
        color: 'var(--canvas-text)',
        fontFamily: '"Arial Rounded MT Bold", "Arial Rounded", sans-serif',
      }}
    >
      {/* Logo and Back */}
      <div className="mb-8 text-center">
        <div className="cursor-pointer mb-4" onClick={() => setViewMode('landing')} title="Volver al Inicio">
          <img
            alt="Estudio Simple Logo"
            className="h-16 md:h-20 w-auto object-contain mx-auto drop-shadow-md"
            src="/logos/Logo largo blanco.png"
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white mb-1">Iniciar Sesion</h1>
        <p className="text-sm text-white/60">Selecciona tu tipo de cuenta para ingresar</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md">
        {/* Tab Selector */}
        <div className="flex rounded-2xl bg-white/5 border border-white/10 p-1 mb-6">
          <button
            onClick={() => { setActiveTab('student'); setError(''); }}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'student'
                ? 'bg-[#F8AD22] text-[#0A192F] shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <span>Soy Estudiante</span>
          </button>
          <button
            onClick={() => { setActiveTab('parent'); setError(''); }}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'parent'
                ? 'bg-[#12A1A4] text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span>Soy Apoderado</span>
          </button>
        </div>

        {/* Login Form Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-2xl">
          
          {/* Student Tab: PIN Entry */}
          {activeTab === 'student' && (
            <form onSubmit={handleStudentLogin} className="space-y-6">
              <div className="text-center mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F8AD22]/20 text-[#F8AD22] flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">Hola, Estudiante</h2>
                <p className="text-xs text-white/60">Ingresa tu PIN de 6 digitos para entrar a tu salon de clases</p>
              </div>

              {/* PIN Display */}
              <div className="flex justify-center gap-2 mb-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-11 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                      pin[i]
                        ? 'border-[#F8AD22] bg-[#F8AD22]/10 text-[#F8AD22]'
                        : i === pin.length
                        ? 'border-[#F8AD22]/50 bg-white/5 animate-pulse'
                        : 'border-white/20 bg-white/5 text-white/30'
                    }`}
                  >
                    {pin[i] ? '●' : ''}
                  </div>
                ))}
              </div>

              {/* Numeric Keypad */}
              <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(digit => (
                  <button
                    key={digit}
                    type="button"
                    onClick={() => handlePinInput(digit)}
                    className="h-14 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xl font-bold transition-all hover:scale-105 active:scale-95 border border-white/10"
                  >
                    {digit}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handlePinDelete}
                  className="h-14 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-bold transition-all hover:scale-105 active:scale-95 border border-red-500/20 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">backspace</span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePinInput('0')}
                  className="h-14 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xl font-bold transition-all hover:scale-105 active:scale-95 border border-white/10"
                >
                  0
                </button>
                <button
                  type="submit"
                  disabled={pin.length !== 6}
                  className={`h-14 rounded-xl text-sm font-bold transition-all flex items-center justify-center border ${
                    pin.length === 6
                      ? 'bg-[#F8AD22] hover:bg-[#e09a1e] text-[#0A192F] border-[#F8AD22] hover:scale-105 active:scale-95 shadow-lg'
                      : 'bg-white/5 text-white/30 border-white/10 cursor-not-allowed'
                  }`}
                >
                  <span className="material-symbols-outlined">login</span>
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="text-center text-red-400 text-xs font-bold bg-red-500/10 border border-red-500/20 rounded-xl py-2 px-4">
                  {error}
                </div>
              )}

              <p className="text-center text-[10px] text-white/40 mt-4">
                Si no tienes tu PIN, pidelo a tu apoderado/a desde su panel
              </p>
            </form>
          )}

          {/* Parent Tab: Email + Password */}
          {activeTab === 'parent' && (
            <form onSubmit={handleParentLogin} className="space-y-5">
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">🛡️</div>
                <h2 className="text-xl font-bold text-white mb-1">Portal del Apoderado</h2>
                <p className="text-xs text-white/60">Ingresa con tu correo y contrasena para monitorear el progreso</p>
              </div>

              <div>
                <label className="block text-xs text-white/70 font-semibold mb-1.5">Correo Electronico</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="tu@correo.cl"
                    className="w-full rounded-xl px-4 py-3 pl-10 text-sm bg-white/10 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#12A1A4] focus:ring-1 focus:ring-[#12A1A4] transition-all"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-3 text-white/40 text-lg">mail</span>
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/70 font-semibold mb-1.5">Contrasena</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Tu contrasena"
                    className="w-full rounded-xl px-4 py-3 pl-10 pr-10 text-sm bg-white/10 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#12A1A4] focus:ring-1 focus:ring-[#12A1A4] transition-all"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-3 text-white/40 text-lg">lock</span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-white/40 hover:text-white/70 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="text-center text-red-400 text-xs font-bold bg-red-500/10 border border-red-500/20 rounded-xl py-2 px-4">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#12A1A4] hover:bg-[#0e8b8e] text-white font-bold text-sm shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">login</span>
                <span>Iniciar Sesion</span>
              </button>

              <p className="text-center text-[10px] text-white/40">
                Si aun no tienes cuenta, registrate desde la seccion de precios
              </p>
            </form>
          )}
        </div>


        {/* Back to landing */}
        <button
          onClick={() => setViewMode('landing')}
          className="mt-6 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 font-bold text-sm transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span>Volver al Inicio</span>
        </button>
      </div>
    </div>
  );
};
