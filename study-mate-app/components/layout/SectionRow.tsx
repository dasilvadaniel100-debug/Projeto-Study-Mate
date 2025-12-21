import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SectionRowProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onViewAll?: () => void;
}

export default function SectionRow({ title, subtitle, children, onViewAll }: SectionRowProps) {
  return (
    <div className="mb-10 pl-6 md:pl-12 group animate-fade-in-up">
      <div className="flex justify-between items-end mb-4 pr-12">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h3>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 uppercase tracking-wider transition-colors"
          >
            Ver Tudo <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="flex gap-5 overflow-x-auto overflow-y-hidden pb-8 pt-2 no-scrollbar scroll-smooth pr-12">
        {children}
      </div>
    </div>
  );
}
