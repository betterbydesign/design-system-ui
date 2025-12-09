'use client';

import React from 'react';
import { Type } from 'lucide-react';
import { useThemeGenerator, TypeScale } from '@/contexts/ThemeGeneratorContext';
import { CollapsibleSection } from './CollapsibleSection';
import { TokenVariableInfoInline } from './TokenVariableInfo';

/** Type scale options */
const TYPE_SCALE_OPTIONS: { id: TypeScale; label: string; ratio: string; description: string }[] = [
  { id: 'ms', label: 'Major Second', ratio: '1.125', description: 'Compact' },
  { id: 'mt', label: 'Major Third', ratio: '1.250', description: 'Expressive' },
];

/**
 * TypographySection
 * 
 * Collapsible section containing typography controls:
 * - Type scale selector (Major Second vs Major Third)
 * - Base font size slider
 * - Scale preview showing heading hierarchy
 */
export function TypographySection() {
  const {
    state,
    setTypeScale,
    setBaseFontSize,
  } = useThemeGenerator();
  
  // Calculate preview sizes based on scale
  const scale = state.typeScale === 'ms' ? 1.125 : 1.25;
  const base = state.baseFontSize;
  const sizes = {
    h1: base * Math.pow(scale, 5),
    h2: base * Math.pow(scale, 4),
    h3: base * Math.pow(scale, 3),
    body: base,
    caption: base * Math.pow(scale, -1),
  };
  
  return (
    <CollapsibleSection
      id="typography"
      title="Typography"
      icon={<Type />}
    >
      {/* Type Scale Selector */}
      <div className="space-y-2">
        <label className="text-xs text-gray-400 uppercase tracking-wider">Type Scale</label>
        <div className="grid grid-cols-2 gap-2">
          {TYPE_SCALE_OPTIONS.map(({ id, label, ratio, description }) => {
            const isSelected = state.typeScale === id;
            
            return (
              <button
                key={id}
                className={`
                  p-3 rounded-lg text-left transition-colors
                  ${isSelected 
                    ? 'bg-gray-700 border-2 border-emerald-500/50' 
                    : 'border border-gray-700 hover:bg-gray-700'
                  }
                `}
                onClick={() => setTypeScale(id)}
              >
                <div className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                  {label}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {ratio} ratio • {description}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Base Size Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Base Size</span>
          <span className="text-xs font-mono text-emerald-400">{state.baseFontSize}px</span>
        </div>
        <input 
          type="range" 
          min="14" 
          max="20" 
          value={state.baseFontSize}
          onChange={(e) => setBaseFontSize(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <TokenVariableInfoInline variable="--font-size-base" />
      </div>
      
      {/* Scale Preview */}
      <div className="bg-gray-900 rounded-lg p-4 space-y-2">
        <span className="text-xs text-gray-500">Scale Preview</span>
        <div className="space-y-1">
          <div 
            className="font-bold text-white truncate"
            style={{ fontSize: `${sizes.h1}px`, lineHeight: 1.1 }}
          >
            Heading 1
          </div>
          <div 
            className="font-semibold text-white truncate"
            style={{ fontSize: `${sizes.h2}px`, lineHeight: 1.1 }}
          >
            Heading 2
          </div>
          <div 
            className="font-medium text-white truncate"
            style={{ fontSize: `${sizes.h3}px`, lineHeight: 1.25 }}
          >
            Heading 3
          </div>
          <div 
            className="text-gray-300"
            style={{ fontSize: `${sizes.body}px`, lineHeight: 1.5 }}
          >
            Body text paragraph
          </div>
          <div 
            className="text-gray-400"
            style={{ fontSize: `${sizes.caption}px`, lineHeight: 1.5 }}
          >
            Small / Caption
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}
