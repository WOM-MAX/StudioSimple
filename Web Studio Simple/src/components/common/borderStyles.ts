import React from 'react';
import type { ModoBordeTarjeta } from '../../types/cmsExtras';

export function getBorderStyles(
  modo: ModoBordeTarjeta = 'completo',
  color?: string,
  grosor: string = '2px',
  bordeBase: string = '1px solid rgba(0, 0, 0, 0.06)'
): React.CSSProperties {
  if (!color) return {};

  const w = grosor.includes('px') ? grosor : `${grosor}px`;

  switch (modo) {
    case 'superior':
      return {
        borderTop: `${w} solid ${color}`,
        borderRight: bordeBase,
        borderBottom: bordeBase,
        borderLeft: bordeBase
      };
    case 'inferior':
      return {
        borderTop: bordeBase,
        borderRight: bordeBase,
        borderBottom: `${w} solid ${color}`,
        borderLeft: bordeBase
      };
    case 'lateral-izquierdo':
      return {
        borderTop: bordeBase,
        borderRight: bordeBase,
        borderBottom: bordeBase,
        borderLeft: `${w} solid ${color}`
      };
    case 'laterales':
      return {
        borderTop: bordeBase,
        borderRight: `${w} solid ${color}`,
        borderBottom: bordeBase,
        borderLeft: `${w} solid ${color}`
      };
    case 'superior-inferior':
      return {
        borderTop: `${w} solid ${color}`,
        borderRight: bordeBase,
        borderBottom: `${w} solid ${color}`,
        borderLeft: bordeBase
      };
    case 'completo':
    default:
      return {
        border: `${w} solid ${color}`
      };
  }
}
