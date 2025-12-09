'use client';

import React from 'react';
import { 
  NeutralFamily, 
  NEUTRAL_FAMILIES,
  colorPalettes,
  getColorFamilyDisplayName,
} from '@/lib/generator/colorPalettes';
import { TokenVariableInfo } from './TokenVariableInfo';

interface NeutralScaleControlProps {
  /** Currently selected neutral family */
  selected: NeutralFamily;
  /** Callback when family changes */
  onChange: (family: NeutralFamily) => void;
}

/** CSS variables affected by neutral scale changes */
const AFFECTED_VARIABLES = [
  '--color-background',
  '--color-background-alt',
  '--color-foreground',
  '--color-muted',
  '--color-border',
  '--color-border-strong',
];

/**
 * NeutralScaleControl
 * 
 * Select the gray/neutral color family for backgrounds and text.
 * Displays visual swatches for each neutral family option.
 */
export function NeutralScaleControl({
  selected,
  onChange,
}: NeutralScaleControlProps) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Neutral Scale</label>
        <span className="text-xs text-gray-500">Background & Text</span>
      </div>
      
      {/* Family options grid */}
      <div className="grid grid-cols-5 gap-2">
        {NEUTRAL_FAMILIES.map((family) => {
          const isSelected = family === selected;
          const swatchColor = colorPalettes[family][500];
          
          return (
            <button
              key={family}
              className={`
                group flex flex-col items-center gap-1 p-2 rounded-lg transition-colors
                ${isSelected 
                  ? 'bg-gray-700 border-2 border-emerald-500/50' 
                  : 'hover:bg-gray-700 border-2 border-transparent hover:border-gray-600'
                }
              `}
              onClick={() => onChange(family)}
            >
              <div 
                className="w-8 h-8 rounded-md ring-2 ring-white/10"
                style={{ backgroundColor: swatchColor }}
              />
              <span className={`text-xs ${isSelected ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-300'}`}>
                {getColorFamilyDisplayName(family)}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Affected variables */}
      <TokenVariableInfo 
        label="Affects:"
        variables={AFFECTED_VARIABLES}
        variant="list"
      />
    </div>
  );
}
