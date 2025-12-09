'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeGenerator, PreviewMode } from '@/contexts/ThemeGeneratorContext';

/**
 * PreviewToolbar
 * 
 * Controls bar above the preview area with:
 * - Light/Dark mode toggle
 */
export function PreviewToolbar() {
  const {
    state,
    setPreviewMode,
  } = useThemeGenerator();
  
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-gray-900/50">
      <div className="flex items-center gap-4">
        {/* Mode Toggle */}
        <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
          <ModeButton 
            mode="light" 
            icon={<Sun className="w-4 h-4" />}
            label="Light"
            isActive={state.previewMode === 'light'}
            onClick={() => setPreviewMode('light')}
          />
          <ModeButton 
            mode="dark" 
            icon={<Moon className="w-4 h-4" />}
            label="Dark"
            isActive={state.previewMode === 'dark'}
            onClick={() => setPreviewMode('dark')}
          />
        </div>
      </div>
      
    </div>
  );
}

interface ModeButtonProps {
  mode: PreviewMode;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function ModeButton({ icon, label, isActive, onClick }: ModeButtonProps) {
  return (
    <button 
      className={`
        px-3 py-1.5 text-sm rounded-md flex items-center gap-1.5 transition-colors
        ${isActive 
          ? 'bg-gray-700 text-white' 
          : 'text-gray-400 hover:text-white'
        }
      `}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}
