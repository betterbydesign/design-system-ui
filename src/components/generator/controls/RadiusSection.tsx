'use client';

import React from 'react';
import { Square } from 'lucide-react';
import { useThemeGenerator, RadiusPreset, RadiusValues } from '@/contexts/ThemeGeneratorContext';
import { CollapsibleSection } from './CollapsibleSection';
import { TokenVariableInfoInline } from './TokenVariableInfo';

/** Radius preset configurations with display info */
const RADIUS_PRESET_INFO: { id: RadiusPreset; label: string; preview: string }[] = [
  { id: 'sharp', label: 'Sharp', preview: 'rounded-none' },
  { id: 'default', label: 'Default', preview: 'rounded-md' },
  { id: 'rounded', label: 'Rounded', preview: 'rounded-xl' },
  { id: 'pill', label: 'Pill', preview: 'rounded-full' },
];

/** Radius value slider configuration */
const RADIUS_SLIDERS: { key: keyof RadiusValues; label: string; cssVar: string; max: number }[] = [
  { key: 'button', label: 'Button', cssVar: '--radius-button', max: 24 },
  { key: 'card', label: 'Card', cssVar: '--radius-card', max: 24 },
  { key: 'input', label: 'Input', cssVar: '--radius-input', max: 24 },
];

/**
 * RadiusSection
 * 
 * Collapsible section containing radius controls:
 * - Preset buttons (Sharp, Default, Rounded, Pill)
 * - Fine-tune sliders for individual components
 * - Live preview of radius values
 */
export function RadiusSection() {
  const {
    state,
    setRadiusPreset,
    setRadiusValue,
  } = useThemeGenerator();
  
  return (
    <CollapsibleSection
      id="radius"
      title="Radius"
      icon={<Square />}
    >
      {/* Preset buttons */}
      <div className="space-y-2">
        <label className="text-xs text-gray-400 uppercase tracking-wider">Preset</label>
        <div className="grid grid-cols-4 gap-2">
          {RADIUS_PRESET_INFO.map(({ id, label, preview }) => {
            const isSelected = state.radiusPreset === id;
            
            return (
              <button
                key={id}
                className={`
                  flex flex-col items-center gap-2 p-3 rounded-lg transition-colors
                  ${isSelected 
                    ? 'bg-gray-700 border-2 border-emerald-500/50' 
                    : 'hover:bg-gray-700 border border-gray-700'
                  }
                `}
                onClick={() => setRadiusPreset(id)}
              >
                <div className={`w-10 h-10 bg-gray-600 ${preview}`} />
                <span className={`text-xs ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Fine-tune sliders */}
      <div className="space-y-3">
        <label className="text-xs text-gray-400 uppercase tracking-wider">Fine-tune</label>
        
        {RADIUS_SLIDERS.map(({ key, label, cssVar, max }) => (
          <div key={key} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">{label}</span>
              <span className="text-xs font-mono text-emerald-400">
                {state.radiusValues[key]}px
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max={max} 
              value={state.radiusValues[key]}
              onChange={(e) => setRadiusValue(key, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <TokenVariableInfoInline variable={cssVar} />
          </div>
        ))}
      </div>
      
      {/* Radius Preview */}
      <div className="bg-gray-900 rounded-lg p-4 space-y-3">
        <span className="text-xs text-gray-500">Preview</span>
        <div className="flex items-center gap-3">
          <button 
            className="px-4 py-2 text-sm bg-emerald-500 text-white"
            style={{ borderRadius: `${state.radiusValues.button}px` }}
          >
            Button
          </button>
          <div 
            className="flex-1 h-10 bg-gray-800 border border-gray-700"
            style={{ borderRadius: `${state.radiusValues.card}px` }}
          />
          <input 
            type="text" 
            placeholder="Input" 
            readOnly
            className="px-3 py-2 text-sm bg-gray-800 border border-gray-700 w-24 text-gray-300"
            style={{ borderRadius: `${state.radiusValues.input}px` }}
          />
        </div>
      </div>
    </CollapsibleSection>
  );
}
