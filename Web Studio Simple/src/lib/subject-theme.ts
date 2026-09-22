export interface SubjectTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  glowColor: string;
  accentGradient: string;
  borderColor: string;
  buttonGradient: string;
  lightCardBg: string;
}

export function getSubjectTheme(subjectName: string): SubjectTheme {
  const norm = (subjectName || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  // 1. Lengua y Literatura (Naranja Calido / Ambar)
  if (norm.includes('leng') || norm.includes('liter')) {
    return {
      id: 'len',
      name: 'Lengua y Literatura',
      primary: '#EE751C',
      secondary: '#F59E0B',
      badgeBg: 'bg-orange-50',
      badgeText: 'text-[#C2540A]',
      badgeBorder: 'border-orange-200',
      glowColor: 'bg-orange-400/20',
      accentGradient: 'from-[#EE751C] to-[#F59E0B]',
      borderColor: 'border-orange-200/90',
      buttonGradient: 'from-[#EE751C] to-[#E55B00]',
      lightCardBg: 'bg-orange-50/40'
    };
  }

  // 2. Ciencias Naturales (Verde Esmeralda / Aqua Vital)
  if (norm.includes('cien') || norm.includes('nat')) {
    return {
      id: 'cie',
      name: 'Ciencias Naturales',
      primary: '#10B981',
      secondary: '#12A1A4',
      badgeBg: 'bg-emerald-50',
      badgeText: 'text-[#047857]',
      badgeBorder: 'border-emerald-200',
      glowColor: 'bg-emerald-400/20',
      accentGradient: 'from-[#10B981] to-[#12A1A4]',
      borderColor: 'border-emerald-200/90',
      buttonGradient: 'from-[#10B981] to-[#059669]',
      lightCardBg: 'bg-emerald-50/40'
    };
  }

  // 3. Historia y Geografia (Purpura Imperial / Amatista)
  if (norm.includes('hist') || norm.includes('geog') || norm.includes('soc')) {
    return {
      id: 'his',
      name: 'Historia y Geografía',
      primary: '#8C52FF',
      secondary: '#6366F1',
      badgeBg: 'bg-purple-50',
      badgeText: 'text-[#6D28D9]',
      badgeBorder: 'border-purple-200',
      glowColor: 'bg-purple-400/20',
      accentGradient: 'from-[#8C52FF] to-[#6366F1]',
      borderColor: 'border-purple-200/90',
      buttonGradient: 'from-[#8C52FF] to-[#7C3AED]',
      lightCardBg: 'bg-purple-50/40'
    };
  }

  // 4. Idioma Extranjero Ingles (Verde Menta / Lima Fresco)
  if (norm.includes('ing') || norm.includes('eng')) {
    return {
      id: 'ing',
      name: 'Inglés',
      primary: '#4A964E',
      secondary: '#22C55E',
      badgeBg: 'bg-green-50',
      badgeText: 'text-[#2D6A4F]',
      badgeBorder: 'border-green-200',
      glowColor: 'bg-green-400/20',
      accentGradient: 'from-[#4A964E] to-[#22C55E]',
      borderColor: 'border-green-200/90',
      buttonGradient: 'from-[#4A964E] to-[#2D6A4F]',
      lightCardBg: 'bg-green-50/40'
    };
  }

  // 5. Matematica (Por defecto: Turquesa Neocian y Naranja Coral)
  return {
    id: 'mat',
    name: 'Matemática',
    primary: '#12A1A4',
    secondary: '#EE751C',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-[#0E8284]',
    badgeBorder: 'border-teal-200',
    glowColor: 'bg-teal-400/20',
    accentGradient: 'from-[#12A1A4] to-[#0E8284]',
    borderColor: 'border-teal-200/90',
    buttonGradient: 'from-[#12A1A4] to-[#0E8284]',
    lightCardBg: 'bg-teal-50/40'
  };
}
