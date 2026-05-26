import React from 'react';
import { motion } from 'motion/react';

interface MetricCardProps {
  id: string;
  title: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  icon?: React.ReactNode;
  color?: 'emerald' | 'blue' | 'purple' | 'amber' | 'neutral';
}

export default function MetricCard({
  id,
  title,
  value,
  subtext,
  trend,
  icon,
  color = 'neutral'
}: MetricCardProps) {
  const borderColors = {
    emerald: 'border-emerald-100 dark:border-emerald-950/40 hover:border-emerald-200',
    blue: 'border-blue-100 dark:border-blue-950/40 hover:border-blue-200',
    purple: 'border-purple-100 dark:border-purple-950/40 hover:border-purple-200',
    amber: 'border-amber-100 dark:border-amber-950/40 hover:border-amber-200',
    neutral: 'border-slate-100 dark:border-slate-800 hover:border-slate-200'
  };

  const badgeBg = {
    emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/45 dark:text-emerald-400',
    blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/45 dark:text-blue-400',
    purple: 'bg-purple-50 text-purple-700 dark:bg-purple-950/45 dark:text-purple-400',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/45 dark:text-amber-400',
    neutral: 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
  };

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-6 bg-white dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border ${borderColors[color]} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-display">
            {title}
          </span>
          <h3 className="text-3xl font-bold font-display text-slate-800 dark:text-slate-100 mt-2">
            {value}
          </h3>
        </div>
        {icon && (
          <div className={`p-2.5 rounded-xl ${badgeBg[color]} flex items-center justify-center`}>
            {icon}
          </div>
        )}
      </div>

      {(subtext || trend) && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/80 text-xs">
          {trend && (
            <span
              className={`font-semibold px-2 py-0.5 rounded-full ${
                trend.positive
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400'
              }`}
            >
              {trend.value}
            </span>
          )}
          {subtext && <span className="text-slate-500 dark:text-slate-400">{subtext}</span>}
        </div>
      )}
    </motion.div>
  );
}
