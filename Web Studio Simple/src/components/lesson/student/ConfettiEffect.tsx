import React, { useEffect, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
  opacity: number;
  shape: 'circle' | 'square' | 'star';
}

const CONFETTI_COLORS = [
  '#F8AD22', '#EE751C', '#12A1A4', '#10B981',
  '#6366F1', '#EC4899', '#22C55E', '#3B82F6',
  '#F59E0B', '#8B5CF6'
];

interface ConfettiEffectProps {
  active: boolean;
  duration?: number;
  particleCount?: number;
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  active,
  duration = 2800,
  particleCount = 45
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const generateParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const shapes: Particle['shape'][] = ['circle', 'square', 'star'];
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        size: 6 + Math.random() * 8,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 360,
        velocityX: (Math.random() - 0.5) * 3,
        velocityY: 2 + Math.random() * 4,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 0.85 + Math.random() * 0.15,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }
    return newParticles;
  }, [particleCount]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    setParticles(generateParticles());

    const timer = setTimeout(() => {
      setParticles([]);
    }, duration);

    return () => clearTimeout(timer);
  }, [active, duration, generateParticles]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.shape !== 'star' ? p.color : 'transparent',
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'square' ? '2px' : '0',
            transform: `rotate(${p.rotation}deg)`,
            opacity: p.opacity,
            animationDuration: `${1.5 + Math.random() * 1.5}s`,
            animationDelay: `${Math.random() * 0.5}s`,
            ...(p.shape === 'star' ? {
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              backgroundColor: p.color
            } : {})
          }}
        />
      ))}

      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          60% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(85vh) rotate(720deg) scale(0.4);
            opacity: 0;
          }
        }
        .animate-confetti-fall {
          animation-name: confetti-fall;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};
