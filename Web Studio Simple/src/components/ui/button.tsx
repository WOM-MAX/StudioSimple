import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'teal' | 'outline' | 'ghost' | 'secondary' | 'subtle';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', disabled, ...props }, ref) => {
    const variantStyles: Record<string, string> = {
      default: 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.99] shadow-xs dark:bg-slate-100 dark:text-slate-900',
      teal: 'bg-[#12A1A4] text-white hover:bg-[#0E8284] active:scale-[0.99] shadow-xs',
      outline: 'border border-slate-200/80 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.99] dark:border-slate-800 dark:bg-[#10223D] dark:text-slate-200',
      ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
      secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100',
      subtle: 'bg-slate-50 border border-slate-200/60 text-slate-400 cursor-not-allowed dark:bg-slate-900 dark:border-slate-800 dark:text-slate-600'
    };

    const sizeStyles: Record<string, string> = {
      default: 'h-10 px-4 py-2 text-xs font-bold rounded-lg',
      sm: 'h-8 px-3 text-[11px] font-semibold rounded-md',
      lg: 'h-11 px-6 text-sm font-bold rounded-xl',
      icon: 'h-9 w-9 p-0 rounded-lg flex items-center justify-center'
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#12A1A4] disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          variantStyles[variant] || variantStyles.default,
          sizeStyles[size] || sizeStyles.default,
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
