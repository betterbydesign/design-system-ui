'use client';

import React from 'react';
import { Palette } from 'lucide-react';
import { useThemeGenerator } from '@/contexts/ThemeGeneratorContext';
import { CollapsibleSection } from './CollapsibleSection';
import { ColorPickerControl } from './ColorPickerControl';
import { NeutralScaleControl } from './NeutralScaleControl';

/**
 * ColorsSection
 * 
 * Collapsible section containing all color-related controls:
 * - Brand color picker
 * - Secondary color picker
 * - Accent color picker
 * - Neutral scale selector
 */
export function ColorsSection() {
  const {
    state,
    setBrandColor,
    setBrandShade,
    setSecondaryColor,
    setSecondaryShade,
    setAccentColor,
    setAccentShade,
    setNeutralScale,
  } = useThemeGenerator();
  
  return (
    <CollapsibleSection
      id="colors"
      title="Colors"
      icon={<Palette />}
    >
      {/* Brand Color */}
      <ColorPickerControl
        label="Brand Color"
        cssVariable="--color-brand"
        family={state.brandColor.family}
        shade={state.brandColor.shade}
        onFamilyChange={(family) => setBrandColor(family)}
        onShadeChange={(shade) => setBrandShade(shade)}
      />
      
      <hr className="border-gray-700" />
      
      {/* Secondary Color */}
      <ColorPickerControl
        label="Secondary Color"
        cssVariable="--color-secondary"
        family={state.secondaryColor.family}
        shade={state.secondaryColor.shade}
        onFamilyChange={(family) => setSecondaryColor(family)}
        onShadeChange={(shade) => setSecondaryShade(shade)}
      />
      
      <hr className="border-gray-700" />
      
      {/* Accent Color */}
      <ColorPickerControl
        label="Accent Color"
        cssVariable="--color-accent"
        family={state.accentColor.family}
        shade={state.accentColor.shade}
        onFamilyChange={(family) => setAccentColor(family)}
        onShadeChange={(shade) => setAccentShade(shade)}
      />
      
      <hr className="border-gray-700" />
      
      {/* Neutral Scale */}
      <NeutralScaleControl
        selected={state.neutralScale}
        onChange={setNeutralScale}
      />
    </CollapsibleSection>
  );
}
