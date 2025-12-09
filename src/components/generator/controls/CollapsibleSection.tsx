'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useThemeGenerator } from '@/contexts/ThemeGeneratorContext';

interface CollapsibleSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

/**
 * CollapsibleSection
 * 
 * Collapsible container for grouping related token controls.
 * Features animated expand/collapse with clean, simple styling.
 */
export function CollapsibleSection({
  id,
  title,
  icon,
  children,
}: CollapsibleSectionProps) {
  const { toggleSection, isSectionExpanded } = useThemeGenerator();
  const isExpanded = isSectionExpanded(id);
  
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700/50">
      {/* Header - clickable */}
      <button 
        className="w-full flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors"
        onClick={() => toggleSection(id)}
      >
        <div className="flex items-center gap-3">
          {/* Simple white icon - no background */}
          <span className="text-white [&>svg]:w-5 [&>svg]:h-5">
            {icon}
          </span>
          <span className="font-medium text-white">{title}</span>
        </div>
        
        {/* Chevron */}
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
            isExpanded ? '' : '-rotate-90'
          }`}
        />
      </button>
      
      {/* Content panel */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
