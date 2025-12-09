'use client';

import React, { useRef, useEffect } from 'react';
import { useThemeGenerator } from '@/contexts/ThemeGeneratorContext';
import { MockupWebsite } from './MockupWebsite';
import { injectThemeVariables, ThemeColors } from '@/lib/generator/cssInjector';

/**
 * PreviewFrame
 * 
 * Container for the live preview.
 * Injects theme CSS variables into the preview container.
 */
export function PreviewFrame() {
  const { state } = useThemeGenerator();
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Inject CSS variables into the preview container
  useEffect(() => {
    if (!previewRef.current) return;
    
    const colors: ThemeColors = {
      brandFamily: state.brandColor.family,
      brandShade: state.brandColor.shade,
      secondaryFamily: state.secondaryColor.family,
      secondaryShade: state.secondaryColor.shade,
      accentFamily: state.accentColor.family,
      accentShade: state.accentColor.shade,
      neutralFamily: state.neutralScale,
    };
    
    injectThemeVariables({
      colors,
      radiusValues: state.radiusValues,
      typeScale: state.typeScale,
      baseFontSize: state.baseFontSize,
      targetElement: previewRef.current,
    });
  }, [
    state.brandColor,
    state.secondaryColor,
    state.accentColor,
    state.neutralScale,
    state.radiusValues,
    state.typeScale,
    state.baseFontSize,
  ]);
  
  return (
    <div className="flex-1">
      {/* Preview content container */}
      <div 
        ref={previewRef}
        className="preview-content"
        style={{
          backgroundColor: 'var(--color-background)',
        }}
      >
        <MockupWebsite />
      </div>
    </div>
  );
}
