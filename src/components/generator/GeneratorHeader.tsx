'use client';

import React, { useState } from 'react';
import { Palette, RotateCcw, Download } from 'lucide-react';
import { useThemeGenerator } from '@/contexts/ThemeGeneratorContext';
import { ExportModal } from './export/ExportModal';

/**
 * GeneratorHeader
 * 
 * Top header bar for the theme generator with logo, beta badge, and action buttons.
 */
export function GeneratorHeader() {
  const { resetTheme } = useThemeGenerator();
  const [showExportModal, setShowExportModal] = useState(false);
  
  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left side - Logo and title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {/* Logo - simplified without background */}
              <Palette className="w-5 h-5 text-gray-400" />
              <span className="font-semibold text-lg text-white">Theme Generator</span>
            </div>
            
            {/* Beta badge - purple/violet to distinguish from green actions */}
            <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 font-medium">
              Beta
            </span>
          </div>
          
          {/* Right side - Actions */}
          <div className="flex items-center gap-3">
            <button 
              className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              onClick={resetTheme}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            
            <button 
              className="px-4 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center gap-2"
              onClick={() => setShowExportModal(true)}
            >
              <Download className="w-4 h-4" />
              Export Theme
            </button>
          </div>
        </div>
      </header>
      
      {/* Export Modal */}
      {showExportModal && (
        <ExportModal onClose={() => setShowExportModal(false)} />
      )}
    </>
  );
}
