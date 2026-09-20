import React from 'react';

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
  bgColor
}) => {
  return (
    <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</p>
          <p className="mt-2 text-3xl sm:text-4xl font-black tracking-tight" style={{ color }}>
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-400 font-medium">{subtitle}</p>
          )}
        </div>
        <div
          className="rounded-xl p-3 flex items-center justify-center shrink-0 shadow-sm"
          style={{ backgroundColor: bgColor, color }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};
