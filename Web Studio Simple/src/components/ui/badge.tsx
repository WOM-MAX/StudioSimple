import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'teal' | 'amber' | 'emerald' | 'subtle';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  ...props
}) => {
  const variantStyles: Record<string, string> = {
    default: 'bg-slate-900 text-white border-transparent dark:bg-slate-50 dark:text-slate-900',
    secondary: 'bg-slate-100 text-slate-800 border-slate-200/70 dark:bg-slate-800 dark:text-slate-200',
    outline: 'border border-slate-200/80 text-slate-700 bg-transparent dark:border-slate-800 dark:text-slate-300',
    teal: 'bg-teal-50/70 text-[#0E8284] border border-teal-200/70 dark:bg-teal-950/40 dark:text-[#57d6f3] dark:border-teal-800/60',
    amber: 'bg-amber-50/80 text-amber-800 border border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60',
    emerald: 'bg-emerald-50/80 text-emerald-700 border border-emerald-200/70 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60',
    subtle: 'bg-slate-50 border border-slate-200/60 text-slate-500 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors',
        variantStyles[variant] || variantStyles.default,
        className
      )}
      {...props}
    />
  );
};
