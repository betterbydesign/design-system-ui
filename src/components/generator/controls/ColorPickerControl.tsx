'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { 
  ColorFamily, 
  Shade, 
  SHADES,
  BRAND_COLOR_FAMILIES,
  colorPalettes,
  getColor,
  getColorFamilyDisplayName,
} from '@/lib/generator/colorPalettes';
import { TokenVariableInfo } from './TokenVariableInfo';

interface ColorPickerControlProps {
  /** Label for the color picker */
  label: string;
  /** CSS variable name associated with this color */
  cssVariable: string;
  /** Currently selected color family */
  family: ColorFamily;
  /** Currently selected shade */
  shade: Shade;
  /** Callback when family changes */
  onFamilyChange: (family: ColorFamily) => void;
  /** Callback when shade changes */
  onShadeChange: (shade: Shade) => void;
  /** List of available color families */
  availableFamilies?: ColorFamily[];
}

/**
 * ColorPickerControl
 * 
 * Select primitive color family and shade for a semantic token.
 * Displays dropdown for family, shade swatches, and CSS variable info.
 */
export function ColorPickerControl({
  label,
  cssVariable,
  family,
  shade,
  onFamilyChange,
  onShadeChange,
  availableFamilies = BRAND_COLOR_FAMILIES,
}: ColorPickerControlProps) {
  const currentColor = getColor(family, shade);
  
  return (
    <div className="space-y-3">
      {/* Header with label and preview */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-md shadow-inner border border-white/10"
            style={{ backgroundColor: currentColor }}
          />
          <span className="text-xs text-gray-500 font-mono">{currentColor}</span>
        </div>
      </div>
      
      {/* Family Dropdown */}
      <div className="relative">
        <select 
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-white"
          value={family}
          onChange={(e) => onFamilyChange(e.target.value as ColorFamily)}
        >
          {availableFamilies.map((f) => (
            <option key={f} value={f}>
              {getColorFamilyDisplayName(f)}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
      
      {/* Shade Selector */}
      <div className="space-y-2">
        {/* Shade labels */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>50</span>
          <span>500</span>
          <span>950</span>
        </div>
        
        {/* Shade swatches */}
        <div className="flex gap-1">
          {SHADES.map((s) => {
            const isSelected = s === shade;
            const swatchColor = colorPalettes[family][s];
            
            return (
              <button
                key={s}
                className={`
                  flex-1 h-8 rounded transition-all duration-150
                  ${isSelected 
                    ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-gray-900 z-10' 
                    : 'hover:scale-105'
                  }
                `}
                style={{ backgroundColor: swatchColor }}
                onClick={() => onShadeChange(s)}
                title={`${s}`}
              />
            );
          })}
        </div>
        
        {/* Selected shade indicator */}
        <div className="text-center text-xs text-gray-400">
          Shade: <span className="font-medium text-emerald-400">{shade}</span>
        </div>
      </div>
      
      {/* CSS Variable Info */}
      <TokenVariableInfo 
        label="CSS Variable:"
        variables={[cssVariable]}
        variant="single"
      />
    </div>
  );
}
