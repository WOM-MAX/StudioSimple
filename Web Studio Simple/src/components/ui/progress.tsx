import React from 'react';
import { cn } from '../../lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  indicatorClassName?: string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, indicatorClassName, ...props }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
      <div
        ref={ref}
        className={cn('relative h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800', className)}
        {...props}
      >
        <div
          className={cn('h-full bg-[#12A1A4] transition-all duration-300 ease-in-out', indicatorClassName)}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = 'Progress';
