'use client';

import React from 'react';
import { MousePointer2 } from 'lucide-react';
import { useThemeGenerator } from '@/contexts/ThemeGeneratorContext';
import { TokenChainVisualizer, TokenChainNode, ResolvedValuePanel } from './TokenChainVisualizer';
import { AffectedTokensList, AffectedToken } from './AffectedTokensList';

/** Element metadata including display info and what CSS property is being inspected */
interface ElementMetadata {
  displayName: string;
  propertyLabel: string;
  chain: TokenChainNode[];
  affected: AffectedToken[];
  /** CSS variable name used to resolve the color, or 'brand' / 'secondary' / 'neutral' for computed values */
  colorSource: 'brand' | 'brand-light' | 'brand-dark' | 'secondary' | 'secondary-light' | 'muted' | 'foreground' | 'surface' | 'border';
}

/** Mock data for token chains based on selected element */
const ELEMENT_TOKEN_CHAINS: Record<string, ElementMetadata> = {
  'button-primary': {
    displayName: 'Button Primary',
    propertyLabel: 'Background color',
    colorSource: 'brand',
    chain: [
      { layer: 'component', label: 'Component', name: 'Button.Background.Default' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Brand.Default', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Emerald.400' },
    ],
    affected: [
      { id: 'outline-border', name: 'Outline Button Border' },
      { id: 'link-hover', name: 'Link Hover Color' },
      { id: 'focus-ring', name: 'Focus Ring' },
      { id: 'input-focus', name: 'Input Focus Border' },
      { id: 'badge-brand', name: 'Badge Background (Brand)' },
    ],
  },
  'button-outline': {
    displayName: 'Button Outline',
    propertyLabel: 'Border & text color',
    colorSource: 'brand',
    chain: [
      { layer: 'component', label: 'Component', name: 'Button.Border.Outline' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Brand.Default', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Emerald.400' },
    ],
    affected: [
      { id: 'primary-bg', name: 'Primary Button Background' },
      { id: 'link-color', name: 'Link Color' },
    ],
  },
  'badge': {
    displayName: 'Badge',
    propertyLabel: 'Background color',
    colorSource: 'brand-light',
    chain: [
      { layer: 'component', label: 'Component', name: 'Badge.Background' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Brand.Light', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Emerald.100' },
    ],
    affected: [
      { id: 'highlight-bg', name: 'Highlight Background' },
      { id: 'tag-bg', name: 'Tag Background' },
    ],
  },
  'nav-link': {
    displayName: 'Nav Link',
    propertyLabel: 'Text color',
    colorSource: 'muted',
    chain: [
      { layer: 'component', label: 'Component', name: 'Nav.Link.Default' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Text.Muted', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.500' },
    ],
    affected: [
      { id: 'body-text', name: 'Body Text (Muted)' },
      { id: 'placeholder', name: 'Input Placeholder' },
      { id: 'caption', name: 'Caption Text' },
    ],
  },
  'footer-link': {
    displayName: 'Footer Link',
    propertyLabel: 'Text color',
    colorSource: 'muted',
    chain: [
      { layer: 'component', label: 'Component', name: 'Footer.Link.Default' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Text.Muted', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.500' },
    ],
    affected: [
      { id: 'nav-link', name: 'Navigation Links' },
      { id: 'subtitle', name: 'Subtitle Text' },
    ],
  },
  'text-muted': {
    displayName: 'Body Text',
    propertyLabel: 'Text color',
    colorSource: 'muted',
    chain: [
      { layer: 'component', label: 'Component', name: 'Text.Body.Muted' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Text.Muted', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.500' },
    ],
    affected: [
      { id: 'nav-link', name: 'Navigation Links' },
      { id: 'footer-text', name: 'Footer Text' },
      { id: 'description', name: 'Card Descriptions' },
    ],
  },
  'card': {
    displayName: 'Card',
    propertyLabel: 'Background color',
    colorSource: 'surface',
    chain: [
      { layer: 'component', label: 'Component', name: 'Card.Background' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Surface', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.White' },
    ],
    affected: [
      { id: 'modal-bg', name: 'Modal Background' },
      { id: 'dropdown-bg', name: 'Dropdown Background' },
      { id: 'input-bg', name: 'Input Background' },
    ],
  },
  'text-heading': {
    displayName: 'Heading',
    propertyLabel: 'Text color',
    colorSource: 'foreground',
    chain: [
      { layer: 'component', label: 'Component', name: 'Text.Heading' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Foreground', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.900' },
    ],
    affected: [
      { id: 'text-body', name: 'Body Text' },
      { id: 'label', name: 'Form Labels' },
    ],
  },
  'input': {
    displayName: 'Input Field',
    propertyLabel: 'Border color',
    colorSource: 'border',
    chain: [
      { layer: 'component', label: 'Component', name: 'Input.Border.Default' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Border', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Gray.200' },
    ],
    affected: [
      { id: 'card-border', name: 'Card Border' },
      { id: 'divider', name: 'Dividers' },
    ],
  },
  'logo': {
    displayName: 'Logo',
    propertyLabel: 'Background color',
    colorSource: 'brand',
    chain: [
      { layer: 'component', label: 'Component', name: 'Logo.Background' },
      { layer: 'semantic', label: 'Semantic', name: 'Color.Brand.Default', sublabel: 'Light mode' },
      { layer: 'primitive', label: 'Primitive', name: 'Color.Emerald.400' },
    ],
    affected: [
      { id: 'primary-btn', name: 'Primary Button' },
      { id: 'accent', name: 'Accent Elements' },
    ],
  },
};

/**
 * TokenInspector
 * 
 * Right panel component that displays:
 * - Selected element info
 * - Resolved value (moved here for prominence)
 * - Token chain visualization
 * - Affected components list
 */
export function TokenInspector() {
  const { state, brandHex, secondaryHex } = useThemeGenerator();
  
  // Get chain data based on selected element
  const selectedData = state.selectedElement 
    ? ELEMENT_TOKEN_CHAINS[state.selectedElement] 
    : ELEMENT_TOKEN_CHAINS['button-primary']; // Default to button
  
  // Color mapping based on neutral scale
  const neutralColors: Record<string, string> = {
    gray: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827' },
    slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a' },
    zinc: { 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b' },
    neutral: { 50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3', 500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717' },
    stone: { 50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917' },
  }[state.neutralScale] as Record<string, string>;
  
  // Brand light color (shade 100)
  const brandLightHex = (() => {
    const family = state.brandColor.family;
    // Use the colorPalettes to get shade 100
    const palettes: Record<string, Record<number, string>> = {
      emerald: { 100: '#d1fae5', 400: '#34d399', 700: '#047857' },
      blue: { 100: '#dbeafe', 400: '#60a5fa', 700: '#1d4ed8' },
      violet: { 100: '#ede9fe', 400: '#a78bfa', 700: '#6d28d9' },
      red: { 100: '#fee2e2', 400: '#f87171', 700: '#b91c1c' },
      orange: { 100: '#ffedd5', 400: '#fb923c', 700: '#c2410c' },
      teal: { 100: '#ccfbf1', 400: '#2dd4bf', 700: '#0f766e' },
      cyan: { 100: '#cffafe', 400: '#22d3ee', 700: '#0e7490' },
      green: { 100: '#dcfce7', 400: '#4ade80', 700: '#15803d' },
      indigo: { 100: '#e0e7ff', 400: '#818cf8', 700: '#4338ca' },
      pink: { 100: '#fce7f3', 400: '#f472b6', 700: '#be185d' },
      rose: { 100: '#ffe4e6', 400: '#fb7185', 700: '#be123c' },
      amber: { 100: '#fef3c7', 400: '#fbbf24', 700: '#b45309' },
      yellow: { 100: '#fef9c3', 400: '#facc15', 700: '#a16207' },
      lime: { 100: '#ecfccb', 400: '#a3e635', 700: '#4d7c0f' },
      purple: { 100: '#f3e8ff', 400: '#c084fc', 700: '#7e22ce' },
      fuchsia: { 100: '#fae8ff', 400: '#e879f9', 700: '#a21caf' },
      sky: { 100: '#e0f2fe', 400: '#38bdf8', 700: '#0369a1' },
    };
    return palettes[family]?.[100] || '#d1fae5';
  })();
  
  // Resolve the actual color based on the colorSource
  const resolvedColor = (() => {
    if (!selectedData) return brandHex;
    switch (selectedData.colorSource) {
      case 'brand': return brandHex;
      case 'brand-light': return brandLightHex;
      case 'brand-dark': return brandHex; // Would need to compute darker shade
      case 'secondary': return secondaryHex;
      case 'secondary-light': return '#ede9fe'; // Would need proper lookup
      case 'muted': return neutralColors[500] || '#6b7280';
      case 'foreground': return neutralColors[900] || '#111827';
      case 'surface': return '#ffffff';
      case 'border': return neutralColors[200] || '#e5e7eb';
      default: return brandHex;
    }
  })();
  
  // Update the primitive name based on current theme settings
  const chain = selectedData?.chain.map((node) => {
    if (node.layer === 'primitive') {
      // Update primitive name based on what color source is being used
      if (selectedData.colorSource === 'brand') {
        return {
          ...node,
          name: `Color.${state.brandColor.family.charAt(0).toUpperCase() + state.brandColor.family.slice(1)}.${state.brandColor.shade}`,
        };
      } else if (selectedData.colorSource === 'brand-light') {
        return {
          ...node,
          name: `Color.${state.brandColor.family.charAt(0).toUpperCase() + state.brandColor.family.slice(1)}.100`,
        };
      } else if (selectedData.colorSource === 'muted') {
        return {
          ...node,
          name: `Color.${state.neutralScale.charAt(0).toUpperCase() + state.neutralScale.slice(1)}.500`,
        };
      } else if (selectedData.colorSource === 'foreground') {
        return {
          ...node,
          name: `Color.${state.neutralScale.charAt(0).toUpperCase() + state.neutralScale.slice(1)}.900`,
        };
      } else if (selectedData.colorSource === 'border') {
        return {
          ...node,
          name: `Color.${state.neutralScale.charAt(0).toUpperCase() + state.neutralScale.slice(1)}.200`,
        };
      }
    }
    return node;
  }) || [];
  
  // Convert hex to RGB for display
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '';
    return `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`;
  };
  
  // Use element metadata for display
  const elementName = selectedData?.displayName || 'Button Primary';
  const propertyLabel = selectedData?.propertyLabel || 'Background color';
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Token Inspector
        </h2>
        <div className="flex items-center gap-1.5 mt-1.5">
          <MousePointer2 className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-xs text-gray-500">Click to inspect token</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {/* Selected Element */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700/50">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Selected Element</div>
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: resolvedColor }}
            >
              <MousePointer2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-white">{elementName}</div>
              <div className="text-xs text-gray-500">{propertyLabel}</div>
            </div>
          </div>
        </div>
        
        {/* Resolved Value - Moved here for prominence */}
        <ResolvedValuePanel
          resolvedValue={resolvedColor}
          resolvedRgb={hexToRgb(resolvedColor)}
        />
        
        {/* Token Chain */}
        <TokenChainVisualizer
          chain={chain}
          resolvedValue={resolvedColor}
          resolvedRgb={hexToRgb(resolvedColor)}
        />
        
        {/* Affected Tokens */}
        <AffectedTokensList
          tokens={selectedData?.affected || []}
          onTokenClick={(token) => console.log('Token clicked:', token)}
        />
      </div>
    </div>
  );
}
