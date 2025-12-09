'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import {
  ColorFamily,
  NeutralFamily,
  Shade,
  DEFAULT_BRAND_COLOR,
  DEFAULT_SECONDARY_COLOR,
  DEFAULT_ACCENT_COLOR,
  DEFAULT_NEUTRAL_SCALE,
  getColor,
} from '@/lib/generator/colorPalettes';
import {
  RadiusPreset,
  RadiusValues,
  TypeScale,
  RADIUS_PRESETS,
  injectThemeVariables,
  clearThemeVariables,
  ThemeColors,
} from '@/lib/generator/cssInjector';

// =============================================================================
// TYPES
// =============================================================================

export type PreviewMode = 'light' | 'dark';
export type PreviewDevice = 'desktop' | 'tablet' | 'mobile';

export interface ColorConfig {
  family: ColorFamily;
  shade: Shade;
}

export interface ThemeGeneratorState {
  // Colors
  brandColor: ColorConfig;
  secondaryColor: ColorConfig;
  accentColor: ColorConfig;
  neutralScale: NeutralFamily;
  
  // Radius
  radiusPreset: RadiusPreset;
  radiusValues: RadiusValues;
  
  // Typography
  typeScale: TypeScale;
  baseFontSize: number;
  
  // Preview
  previewMode: PreviewMode;
  previewDevice: PreviewDevice;
  
  // Inspector
  selectedElement: string | null;
  
  // UI State
  expandedSections: string[];
}

// =============================================================================
// ACTIONS
// =============================================================================

type ThemeGeneratorAction =
  | { type: 'SET_BRAND_COLOR'; payload: Partial<ColorConfig> }
  | { type: 'SET_SECONDARY_COLOR'; payload: Partial<ColorConfig> }
  | { type: 'SET_ACCENT_COLOR'; payload: Partial<ColorConfig> }
  | { type: 'SET_NEUTRAL_SCALE'; payload: NeutralFamily }
  | { type: 'SET_RADIUS_PRESET'; payload: RadiusPreset }
  | { type: 'SET_RADIUS_VALUE'; payload: { key: keyof RadiusValues; value: number } }
  | { type: 'SET_TYPE_SCALE'; payload: TypeScale }
  | { type: 'SET_BASE_FONT_SIZE'; payload: number }
  | { type: 'SET_PREVIEW_MODE'; payload: PreviewMode }
  | { type: 'SET_PREVIEW_DEVICE'; payload: PreviewDevice }
  | { type: 'SET_SELECTED_ELEMENT'; payload: string | null }
  | { type: 'TOGGLE_SECTION'; payload: string }
  | { type: 'RESET_THEME' }
  | { type: 'LOAD_THEME'; payload: Partial<ThemeGeneratorState> };

// =============================================================================
// INITIAL STATE
// =============================================================================

const initialState: ThemeGeneratorState = {
  brandColor: DEFAULT_BRAND_COLOR,
  secondaryColor: DEFAULT_SECONDARY_COLOR,
  accentColor: DEFAULT_ACCENT_COLOR,
  neutralScale: DEFAULT_NEUTRAL_SCALE,
  radiusPreset: 'default',
  radiusValues: RADIUS_PRESETS.default,
  typeScale: 'ms',
  baseFontSize: 16,
  previewMode: 'light',
  previewDevice: 'desktop',
  selectedElement: null,
  expandedSections: ['colors', 'radius'],
};

// =============================================================================
// REDUCER
// =============================================================================

function themeGeneratorReducer(
  state: ThemeGeneratorState,
  action: ThemeGeneratorAction
): ThemeGeneratorState {
  switch (action.type) {
    case 'SET_BRAND_COLOR':
      return {
        ...state,
        brandColor: { ...state.brandColor, ...action.payload },
      };
    
    case 'SET_SECONDARY_COLOR':
      return {
        ...state,
        secondaryColor: { ...state.secondaryColor, ...action.payload },
      };
    
    case 'SET_ACCENT_COLOR':
      return {
        ...state,
        accentColor: { ...state.accentColor, ...action.payload },
      };
    
    case 'SET_NEUTRAL_SCALE':
      return {
        ...state,
        neutralScale: action.payload,
      };
    
    case 'SET_RADIUS_PRESET':
      return {
        ...state,
        radiusPreset: action.payload,
        radiusValues: RADIUS_PRESETS[action.payload],
      };
    
    case 'SET_RADIUS_VALUE':
      return {
        ...state,
        radiusPreset: 'default', // Reset to default when manually adjusting
        radiusValues: {
          ...state.radiusValues,
          [action.payload.key]: action.payload.value,
        },
      };
    
    case 'SET_TYPE_SCALE':
      return {
        ...state,
        typeScale: action.payload,
      };
    
    case 'SET_BASE_FONT_SIZE':
      return {
        ...state,
        baseFontSize: action.payload,
      };
    
    case 'SET_PREVIEW_MODE':
      return {
        ...state,
        previewMode: action.payload,
      };
    
    case 'SET_PREVIEW_DEVICE':
      return {
        ...state,
        previewDevice: action.payload,
      };
    
    case 'SET_SELECTED_ELEMENT':
      return {
        ...state,
        selectedElement: action.payload,
      };
    
    case 'TOGGLE_SECTION': {
      const isExpanded = state.expandedSections.includes(action.payload);
      return {
        ...state,
        expandedSections: isExpanded
          ? state.expandedSections.filter(s => s !== action.payload)
          : [...state.expandedSections, action.payload],
      };
    }
    
    case 'RESET_THEME':
      return { ...initialState, expandedSections: state.expandedSections };
    
    case 'LOAD_THEME':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
}

// =============================================================================
// CONTEXT
// =============================================================================

interface ThemeGeneratorContextValue {
  state: ThemeGeneratorState;
  dispatch: React.Dispatch<ThemeGeneratorAction>;
  
  // Computed values
  brandHex: string;
  secondaryHex: string;
  accentHex: string;
  
  // Helper functions
  setBrandColor: (family: ColorFamily, shade?: Shade) => void;
  setBrandShade: (shade: Shade) => void;
  setSecondaryColor: (family: ColorFamily, shade?: Shade) => void;
  setSecondaryShade: (shade: Shade) => void;
  setAccentColor: (family: ColorFamily, shade?: Shade) => void;
  setAccentShade: (shade: Shade) => void;
  setNeutralScale: (family: NeutralFamily) => void;
  setRadiusPreset: (preset: RadiusPreset) => void;
  setRadiusValue: (key: keyof RadiusValues, value: number) => void;
  setTypeScale: (scale: TypeScale) => void;
  setBaseFontSize: (size: number) => void;
  setPreviewMode: (mode: PreviewMode) => void;
  setPreviewDevice: (device: PreviewDevice) => void;
  setSelectedElement: (element: string | null) => void;
  toggleSection: (section: string) => void;
  isSectionExpanded: (section: string) => boolean;
  resetTheme: () => void;
}

const ThemeGeneratorContext = createContext<ThemeGeneratorContextValue | null>(null);

// =============================================================================
// PROVIDER
// =============================================================================

interface ThemeGeneratorProviderProps {
  children: React.ReactNode;
  previewRef?: React.RefObject<HTMLElement>;
}

export function ThemeGeneratorProvider({ children, previewRef }: ThemeGeneratorProviderProps) {
  const [state, dispatch] = useReducer(themeGeneratorReducer, initialState);
  
  // Computed hex values
  const brandHex = getColor(state.brandColor.family, state.brandColor.shade);
  const secondaryHex = getColor(state.secondaryColor.family, state.secondaryColor.shade);
  const accentHex = getColor(state.accentColor.family, state.accentColor.shade);
  
  // Inject CSS variables whenever state changes
  useEffect(() => {
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
      targetElement: previewRef?.current || undefined,
    });
  }, [
    state.brandColor,
    state.secondaryColor,
    state.accentColor,
    state.neutralScale,
    state.radiusValues,
    state.typeScale,
    state.baseFontSize,
    previewRef,
  ]);
  
  // Helper functions
  const setBrandColor = useCallback((family: ColorFamily, shade?: Shade) => {
    dispatch({ type: 'SET_BRAND_COLOR', payload: { family, ...(shade && { shade }) } });
  }, []);
  
  const setBrandShade = useCallback((shade: Shade) => {
    dispatch({ type: 'SET_BRAND_COLOR', payload: { shade } });
  }, []);
  
  const setSecondaryColor = useCallback((family: ColorFamily, shade?: Shade) => {
    dispatch({ type: 'SET_SECONDARY_COLOR', payload: { family, ...(shade && { shade }) } });
  }, []);
  
  const setSecondaryShade = useCallback((shade: Shade) => {
    dispatch({ type: 'SET_SECONDARY_COLOR', payload: { shade } });
  }, []);
  
  const setAccentColor = useCallback((family: ColorFamily, shade?: Shade) => {
    dispatch({ type: 'SET_ACCENT_COLOR', payload: { family, ...(shade && { shade }) } });
  }, []);
  
  const setAccentShade = useCallback((shade: Shade) => {
    dispatch({ type: 'SET_ACCENT_COLOR', payload: { shade } });
  }, []);
  
  const setNeutralScale = useCallback((family: NeutralFamily) => {
    dispatch({ type: 'SET_NEUTRAL_SCALE', payload: family });
  }, []);
  
  const setRadiusPreset = useCallback((preset: RadiusPreset) => {
    dispatch({ type: 'SET_RADIUS_PRESET', payload: preset });
  }, []);
  
  const setRadiusValue = useCallback((key: keyof RadiusValues, value: number) => {
    dispatch({ type: 'SET_RADIUS_VALUE', payload: { key, value } });
  }, []);
  
  const setTypeScale = useCallback((scale: TypeScale) => {
    dispatch({ type: 'SET_TYPE_SCALE', payload: scale });
  }, []);
  
  const setBaseFontSize = useCallback((size: number) => {
    dispatch({ type: 'SET_BASE_FONT_SIZE', payload: size });
  }, []);
  
  const setPreviewMode = useCallback((mode: PreviewMode) => {
    dispatch({ type: 'SET_PREVIEW_MODE', payload: mode });
  }, []);
  
  const setPreviewDevice = useCallback((device: PreviewDevice) => {
    dispatch({ type: 'SET_PREVIEW_DEVICE', payload: device });
  }, []);
  
  const setSelectedElement = useCallback((element: string | null) => {
    dispatch({ type: 'SET_SELECTED_ELEMENT', payload: element });
  }, []);
  
  const toggleSection = useCallback((section: string) => {
    dispatch({ type: 'TOGGLE_SECTION', payload: section });
  }, []);
  
  const isSectionExpanded = useCallback((section: string) => {
    return state.expandedSections.includes(section);
  }, [state.expandedSections]);
  
  const resetTheme = useCallback(() => {
    dispatch({ type: 'RESET_THEME' });
  }, []);
  
  const value: ThemeGeneratorContextValue = {
    state,
    dispatch,
    brandHex,
    secondaryHex,
    accentHex,
    setBrandColor,
    setBrandShade,
    setSecondaryColor,
    setSecondaryShade,
    setAccentColor,
    setAccentShade,
    setNeutralScale,
    setRadiusPreset,
    setRadiusValue,
    setTypeScale,
    setBaseFontSize,
    setPreviewMode,
    setPreviewDevice,
    setSelectedElement,
    toggleSection,
    isSectionExpanded,
    resetTheme,
  };
  
  return (
    <ThemeGeneratorContext.Provider value={value}>
      {children}
    </ThemeGeneratorContext.Provider>
  );
}

// =============================================================================
// HOOK
// =============================================================================

export function useThemeGenerator(): ThemeGeneratorContextValue {
  const context = useContext(ThemeGeneratorContext);
  if (!context) {
    throw new Error('useThemeGenerator must be used within a ThemeGeneratorProvider');
  }
  return context;
}

// Re-export types for convenience
export type { ColorFamily, NeutralFamily, Shade, RadiusPreset, RadiusValues, TypeScale };
export { RADIUS_PRESETS, SHADES, COLOR_FAMILIES, NEUTRAL_FAMILIES, BRAND_COLOR_FAMILIES } from '@/lib/generator/colorPalettes';
