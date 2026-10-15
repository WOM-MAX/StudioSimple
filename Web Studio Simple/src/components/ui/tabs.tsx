import React from 'react';
import { cn } from '../../lib/utils';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange?: (value: string) => void;
}

const TabsContext = React.createContext<{
  value: string;
  onValueChange?: (value: string) => void;
}>({ value: '' });

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, className, children, ...props }) => (
  <TabsContext.Provider value={{ value, onValueChange }}>
    <div className={cn('w-full', className)} {...props}>
      {children}
    </div>
  </TabsContext.Provider>
);

export const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 border-b border-slate-200/80 bg-transparent text-slate-500 dark:border-slate-800 dark:text-slate-400',
        className
      )}
      {...props}
    />
  )
);
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    const isSelected = context.value === value;

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => context.onValueChange?.(value)}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap border-b-2 py-3 px-3 text-xs font-bold transition-all duration-150 cursor-pointer focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
          isSelected
            ? 'border-[#12A1A4] text-[#0E8284] dark:border-[#57d6f3] dark:text-[#57d6f3]'
            : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (context.value !== value) return null;

    return (
      <div ref={ref} className={cn('mt-4 focus-visible:outline-none', className)} {...props}>
        {children}
      </div>
    );
  }
);
TabsContent.displayName = 'TabsContent';
