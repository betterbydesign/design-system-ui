'use client';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { 
  ChevronRight, 
  Copy, 
  Palette, 
  Box,
  Settings,
  Layout,
  ArrowRight,
  ChevronDown,
  Code,
  Zap,
  Globe,
} from 'lucide-react';
import { TokenLayer, TOKEN_LAYER_INFO } from '@/lib/types';

// =============================================================================
// TYPES
// =============================================================================

interface GreenshiftToken {
  name: string;
  wpVariable: string;
  semanticRef: string;
  primitiveRef?: string;
  resolvedValue: string;
  type: 'color' | 'number';
  description?: string;
}

interface GreenshiftGroup {
  id: string;
  name: string;
  description: string;
  tokens: GreenshiftToken[];
}

interface GreenshiftSection {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  groups: GreenshiftGroup[];
}

// =============================================================================
// DATA - Preset Colors
// =============================================================================

const PRESET_COLORS: GreenshiftSection = {
  id: 'preset',
  name: 'Preset Colors',
  description: 'WordPress color presets mapped to semantic tokens. These appear in the Gutenberg color picker.',
  icon: <Palette size={20} />,
  iconColor: '#6366f1',
  groups: [
    {
      id: 'brand',
      name: 'Brand Colors',
      description: 'Primary brand color palette',
      tokens: [
        { name: 'brand', wpVariable: '--wp--preset--color--brand', semanticRef: 'Color.Brand.Default', primitiveRef: 'Emerald.400', resolvedValue: '#34d399', type: 'color' },
        { name: 'brand-hover', wpVariable: '--wp--preset--color--brand-hover', semanticRef: 'Color.Brand.Hover', primitiveRef: 'Emerald.500', resolvedValue: '#10b981', type: 'color' },
        { name: 'brand-light', wpVariable: '--wp--preset--color--brand-light', semanticRef: 'Color.Brand.Light', primitiveRef: 'Emerald.100', resolvedValue: '#d1fae5', type: 'color' },
        { name: 'brand-dark', wpVariable: '--wp--preset--color--brand-dark', semanticRef: 'Color.Brand.Dark', primitiveRef: 'Emerald.700', resolvedValue: '#047857', type: 'color' },
      ],
    },
    {
      id: 'secondary',
      name: 'Secondary Colors',
      description: 'Supporting color palette',
      tokens: [
        { name: 'secondary', wpVariable: '--wp--preset--color--secondary', semanticRef: 'Color.Secondary.Default', primitiveRef: 'Violet.900', resolvedValue: '#4c1d95', type: 'color' },
        { name: 'secondary-hover', wpVariable: '--wp--preset--color--secondary-hover', semanticRef: 'Color.Secondary.Hover', primitiveRef: 'Violet.950', resolvedValue: '#2e1065', type: 'color' },
        { name: 'secondary-light', wpVariable: '--wp--preset--color--secondary-light', semanticRef: 'Color.Secondary.Light', primitiveRef: 'Violet.100', resolvedValue: '#ede9fe', type: 'color' },
      ],
    },
    {
      id: 'background',
      name: 'Background & Surface',
      description: 'Page and content backgrounds',
      tokens: [
        { name: 'background', wpVariable: '--wp--preset--color--background', semanticRef: 'Color.Background.Default', primitiveRef: 'Gray.50', resolvedValue: '#f9fafb', type: 'color' },
        { name: 'background-alt', wpVariable: '--wp--preset--color--background-alt', semanticRef: 'Color.Background.Alt', primitiveRef: 'Gray.100', resolvedValue: '#f3f4f6', type: 'color' },
        { name: 'surface', wpVariable: '--wp--preset--color--surface', semanticRef: 'Color.Surface', primitiveRef: 'Base.White', resolvedValue: '#ffffff', type: 'color' },
      ],
    },
    {
      id: 'card',
      name: 'Card Colors',
      description: 'Card component specific colors',
      tokens: [
        { name: 'card-base', wpVariable: '--wp--preset--color--card-base', semanticRef: 'Color.Card.Background', primitiveRef: 'Base.White', resolvedValue: '#ffffff', type: 'color' },
        { name: 'card-border', wpVariable: '--wp--preset--color--card-border', semanticRef: 'Color.Card.Border', primitiveRef: 'Gray.200', resolvedValue: '#e5e7eb', type: 'color' },
        { name: 'card-text', wpVariable: '--wp--preset--color--card-text', semanticRef: 'Color.Text.Foreground', primitiveRef: 'Gray.900', resolvedValue: '#111827', type: 'color' },
      ],
    },
    {
      id: 'text',
      name: 'Text Colors',
      description: 'Typography and contrast colors',
      tokens: [
        { name: 'muted', wpVariable: '--wp--preset--color--muted', semanticRef: 'Color.Text.Muted', primitiveRef: 'Gray.500', resolvedValue: '#6b7280', type: 'color' },
        { name: 'subtle', wpVariable: '--wp--preset--color--subtle', semanticRef: 'Color.Text.Subtle', primitiveRef: 'Gray.400', resolvedValue: '#9ca3af', type: 'color' },
        { name: 'text-on-brand', wpVariable: '--wp--preset--color--text-on-brand', semanticRef: 'Color.Text.OnBrand', primitiveRef: 'Base.White', resolvedValue: '#ffffff', type: 'color' },
        { name: 'text-on-secondary', wpVariable: '--wp--preset--color--text-on-secondary', semanticRef: 'Color.Text.OnSecondary', primitiveRef: 'Base.White', resolvedValue: '#ffffff', type: 'color' },
      ],
    },
    {
      id: 'border',
      name: 'Border Colors',
      description: 'Border and divider colors',
      tokens: [
        { name: 'border', wpVariable: '--wp--preset--color--border', semanticRef: 'Color.Border.Default', primitiveRef: 'Gray.200', resolvedValue: '#e5e7eb', type: 'color' },
        { name: 'border-strong', wpVariable: '--wp--preset--color--border-strong', semanticRef: 'Color.Border.Strong', primitiveRef: 'Gray.300', resolvedValue: '#d1d5db', type: 'color' },
      ],
    },
    {
      id: 'status',
      name: 'Status Colors',
      description: 'Feedback and status indication',
      tokens: [
        { name: 'success', wpVariable: '--wp--preset--color--success', semanticRef: 'Color.Status.Success', primitiveRef: 'Green.500', resolvedValue: '#22c55e', type: 'color' },
        { name: 'warning', wpVariable: '--wp--preset--color--warning', semanticRef: 'Color.Status.Warning', primitiveRef: 'Amber.500', resolvedValue: '#f59e0b', type: 'color' },
        { name: 'error', wpVariable: '--wp--preset--color--error', semanticRef: 'Color.Status.Error', primitiveRef: 'Red.500', resolvedValue: '#ef4444', type: 'color' },
        { name: 'info', wpVariable: '--wp--preset--color--info', semanticRef: 'Color.Status.Info', primitiveRef: 'Blue.500', resolvedValue: '#3b82f6', type: 'color' },
      ],
    },
    {
      id: 'base',
      name: 'Base',
      description: 'Base dark color',
      tokens: [
        { name: 'base', wpVariable: '--wp--preset--color--base', semanticRef: 'Color.Base', primitiveRef: 'Slate.950', resolvedValue: '#020617', type: 'color' },
      ],
    },
  ],
};

// =============================================================================
// DATA - Custom Properties (Components)
// =============================================================================

const CUSTOM_PROPERTIES: GreenshiftSection = {
  id: 'custom',
  name: 'Custom Properties',
  description: 'Component-specific custom properties for advanced styling in Greenshift blocks.',
  icon: <Box size={20} />,
  iconColor: '#f59e0b',
  groups: [
    {
      id: 'button',
      name: 'Button',
      description: 'Button component styling tokens',
      tokens: [
        { name: 'background', wpVariable: '--wp--custom--button--background', semanticRef: 'Components.Button.Background.Default', primitiveRef: 'Emerald.400', resolvedValue: '#34d399', type: 'color' },
        { name: 'background-hover', wpVariable: '--wp--custom--button--background-hover', semanticRef: 'Components.Button.Background.Hover', primitiveRef: 'Emerald.500', resolvedValue: '#10b981', type: 'color' },
        { name: 'text', wpVariable: '--wp--custom--button--text', semanticRef: 'Components.Button.Text', primitiveRef: 'Base.White', resolvedValue: '#ffffff', type: 'color' },
        { name: 'border-radius', wpVariable: '--wp--custom--button--border-radius', semanticRef: 'Radius.Button', primitiveRef: 'Radius.lg', resolvedValue: '0.5rem', type: 'number' },
        { name: 'spacing-horizontal', wpVariable: '--wp--custom--button--spacing--horizontal', semanticRef: 'Spacing.5', resolvedValue: '1.25rem', type: 'number' },
        { name: 'spacing-vertical', wpVariable: '--wp--custom--button--spacing--vertical', semanticRef: 'Spacing.2-5', resolvedValue: '0.625rem', type: 'number' },
      ],
    },
    {
      id: 'card',
      name: 'Card',
      description: 'Card component styling tokens',
      tokens: [
        { name: 'border-radius', wpVariable: '--wp--custom--card--border-radius', semanticRef: 'Radius.Card', primitiveRef: 'Radius.xl', resolvedValue: '0.75rem', type: 'number' },
        { name: 'spacing', wpVariable: '--wp--custom--card--spacing', semanticRef: 'Spacing.6', resolvedValue: '1.5rem', type: 'number' },
      ],
    },
    {
      id: 'input',
      name: 'Input',
      description: 'Form input styling tokens',
      tokens: [
        { name: 'background', wpVariable: '--wp--custom--input--background', semanticRef: 'Color.Surface', primitiveRef: 'Base.White', resolvedValue: '#ffffff', type: 'color' },
        { name: 'border', wpVariable: '--wp--custom--input--border', semanticRef: 'Color.Border.Default', primitiveRef: 'Gray.200', resolvedValue: '#e5e7eb', type: 'color' },
        { name: 'border-radius', wpVariable: '--wp--custom--input--border-radius', semanticRef: 'Radius.Input', primitiveRef: 'Radius.md', resolvedValue: '0.375rem', type: 'number' },
        { name: 'spacing-horizontal', wpVariable: '--wp--custom--input--spacing--horizontal', semanticRef: 'Spacing.3', resolvedValue: '0.75rem', type: 'number' },
        { name: 'spacing-vertical', wpVariable: '--wp--custom--input--spacing--vertical', semanticRef: 'Spacing.2', resolvedValue: '0.5rem', type: 'number' },
      ],
    },
    {
      id: 'badge',
      name: 'Badge',
      description: 'Badge component styling',
      tokens: [
        { name: 'border-radius', wpVariable: '--wp--custom--badge--border-radius', semanticRef: 'Radius.Badge', primitiveRef: 'Radius.full', resolvedValue: '9999px', type: 'number' },
      ],
    },
    {
      id: 'modal',
      name: 'Modal',
      description: 'Modal/dialog styling',
      tokens: [
        { name: 'border-radius', wpVariable: '--wp--custom--modal--border-radius', semanticRef: 'Radius.Modal', primitiveRef: 'Radius.2xl', resolvedValue: '1rem', type: 'number' },
      ],
    },
  ],
};

// =============================================================================
// DATA - Style Globals
// =============================================================================

const STYLE_GLOBALS: GreenshiftSection = {
  id: 'style',
  name: 'Style Globals',
  description: 'WordPress global styles for content width and layout constraints.',
  icon: <Layout size={20} />,
  iconColor: '#10b981',
  groups: [
    {
      id: 'global',
      name: 'Global Layout',
      description: 'Content and wide width settings',
      tokens: [
        { name: 'content-size', wpVariable: '--wp--style--global--content-size', semanticRef: 'Layout.ContentWidth', primitiveRef: 'Layout.5xl', resolvedValue: '64rem', type: 'number', description: '1024px content width' },
        { name: 'wide-size', wpVariable: '--wp--style--global--wide-size', semanticRef: 'Layout.WideWidth', resolvedValue: '90rem', type: 'number', description: '1440px wide width' },
      ],
    },
  ],
};

const ALL_SECTIONS: GreenshiftSection[] = [PRESET_COLORS, CUSTOM_PROPERTIES, STYLE_GLOBALS];

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

function CopyButton({ value, size = 'md' }: { value: string; size?: 'sm' | 'md' }) {
  const [copied, setCopied] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
      }
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setTooltipPos(null);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const iconSize = size === 'sm' ? 12 : 14;
  const buttonSize = size === 'sm' ? 20 : 24;

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleCopy}
        title={copied ? undefined : `Copy ${value}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: buttonSize,
          height: buttonSize,
          borderRadius: 'var(--radius-md)',
          border: 'none',
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-muted)',
          cursor: 'pointer',
          transition: 'all var(--duration-100) var(--ease-out)',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-card-border)';
          e.currentTarget.style.color = 'var(--color-brand)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-background)';
          e.currentTarget.style.color = 'var(--color-muted)';
        }}
      >
        <Copy size={iconSize} />
      </button>
      {copied && tooltipPos && typeof document !== 'undefined' && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: 'translate(-50%, -100%)',
            padding: '6px 10px',
            backgroundColor: '#1e293b',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 500,
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            zIndex: 9999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            pointerEvents: 'none',
            animation: 'tooltipFadeIn 0.15s ease-out',
          }}
        >
          Copied!
        </div>,
        document.body
      )}
    </>
  );
}

function ReferenceChain({ token }: { token: GreenshiftToken }) {
  const greenshiftLayerInfo = TOKEN_LAYER_INFO[TokenLayer.Greenshift];
  const semanticLayerInfo = TOKEN_LAYER_INFO[TokenLayer.Semantic];
  const primitivesLayerInfo = TOKEN_LAYER_INFO[TokenLayer.Primitives];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)', flexWrap: 'wrap' }}>
      {/* Raw Value - hex or number first */}
      <span
        style={{
          padding: '2px 6px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--color-background)',
          border: '1px solid var(--color-border)',
          fontSize: 'var(--font-size-caption)',
          fontFamily: 'ui-monospace, monospace',
          color: 'var(--color-foreground)',
        }}
      >
        {token.resolvedValue}
      </span>
      <ArrowRight size={10} style={{ color: 'var(--color-muted)' }} />

      {/* Primitive Layer (if exists) */}
      {token.primitiveRef && (
        <>
          <span
            style={{
              padding: '2px 6px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: `${primitivesLayerInfo.color}15`,
              color: primitivesLayerInfo.color,
              fontSize: 'var(--font-size-caption)',
              fontWeight: 500,
            }}
          >
            {token.primitiveRef}
          </span>
          <ArrowRight size={10} style={{ color: 'var(--color-muted)' }} />
        </>
      )}
      
      {/* Semantic Layer */}
      <span
        style={{
          padding: '2px 6px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: `${semanticLayerInfo.color}15`,
          color: semanticLayerInfo.color,
          fontSize: 'var(--font-size-caption)',
          fontWeight: 500,
        }}
      >
        {token.semanticRef}
      </span>
      
      {/* Greenshift Layer - framework output last */}
      <ArrowRight size={10} style={{ color: 'var(--color-muted)' }} />
      <span
        style={{
          padding: '2px 6px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: `${greenshiftLayerInfo.color}15`,
          color: greenshiftLayerInfo.color,
          fontSize: 'var(--font-size-caption)',
          fontWeight: 500,
        }}
      >
        GRS
      </span>
    </div>
  );
}

function ColorPreview({ hex }: { hex: string }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 'var(--radius-md)',
        backgroundColor: hex,
        border: hex === '#ffffff' ? '1px solid var(--color-border)' : '2px solid rgba(0,0,0,0.1)',
        flexShrink: 0,
      }}
    />
  );
}

function TokenRow({ token }: { token: GreenshiftToken }) {
  return (
    <div
      className="token-row"
      style={{
        display: 'grid',
        gridTemplateColumns: token.type === 'color' ? '48px 1fr 1fr auto' : '1fr 1fr auto',
        gap: 'var(--spacing-4)',
        alignItems: 'center',
        padding: 'var(--spacing-3) var(--spacing-4)',
        borderBottom: '1px solid var(--color-card-border)',
      }}
    >
      {/* Color Preview (only for color tokens) */}
      {token.type === 'color' && (
        <ColorPreview hex={token.resolvedValue} />
      )}
      
      {/* Token Info */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-1)' }}>
          <span style={{ fontSize: 'var(--font-size-body-small)', fontWeight: 600, color: 'var(--color-foreground)' }}>
            {token.name}
          </span>
        </div>
        <div
          style={{
            fontSize: 'var(--font-size-caption)',
            fontFamily: 'ui-monospace, monospace',
            color: 'var(--color-brand)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {token.wpVariable}
        </div>
      </div>
      
      {/* Reference Chain */}
      <div>
        <ReferenceChain token={token} />
      </div>
      
      {/* Copy Button */}
      <CopyButton value={`var(${token.wpVariable})`} size="sm" />
    </div>
  );
}

function GroupSection({ group, sectionColor }: { group: GreenshiftGroup; sectionColor: string }) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <div
      style={{
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        backgroundColor: 'var(--color-card)',
      }}
    >
      {/* Group Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--spacing-3) var(--spacing-4)',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          borderBottom: isExpanded ? '1px solid var(--color-card-border)' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 'var(--radius-full)',
              backgroundColor: sectionColor,
            }}
          />
          <span style={{ fontSize: 'var(--font-size-body-small)', fontWeight: 600, color: 'var(--color-foreground)' }}>
            {group.name}
          </span>
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-muted)' }}>
            {group.tokens.length} variables
          </span>
        </div>
        <ChevronDown 
          size={16} 
          style={{ 
            color: 'var(--color-muted)', 
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform var(--duration-150) var(--ease-out)',
          }} 
        />
      </button>
      
      {/* Token List */}
      {isExpanded && (
        <div>
          {group.description && (
            <p
              style={{
                fontSize: 'var(--font-size-body-small)',
                color: 'var(--color-muted)',
                padding: 'var(--spacing-3) var(--spacing-4)',
                borderBottom: '1px solid var(--color-card-border)',
                margin: 0,
              }}
            >
              {group.description}
            </p>
          )}
          <div>
            {group.tokens.map((token) => (
              <TokenRow key={token.wpVariable} token={token} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CSSCodeBlock({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
      }
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setTooltipPos(null);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--color-card)',
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--spacing-3) var(--spacing-4)',
          borderBottom: '1px solid var(--color-card-border)',
          backgroundColor: 'var(--color-background)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <Code size={16} style={{ color: 'var(--color-muted)' }} />
          <span style={{ fontSize: 'var(--font-size-body-small)', fontWeight: 500, color: 'var(--color-foreground)' }}>
            {title}
          </span>
        </div>
        <button
          ref={buttonRef}
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-1)',
            padding: 'var(--spacing-1) var(--spacing-2)',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            backgroundColor: 'transparent',
            color: 'var(--color-muted)',
            cursor: 'pointer',
            fontSize: 'var(--font-size-caption)',
            fontWeight: 500,
            transition: 'all var(--duration-100) var(--ease-out)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-brand)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-muted)';
          }}
        >
          <Copy size={12} />
          Copy
        </button>
        {copied && tooltipPos && typeof document !== 'undefined' && ReactDOM.createPortal(
          <div
            style={{
              position: 'fixed',
              left: tooltipPos.x,
              top: tooltipPos.y,
              transform: 'translate(-50%, -100%)',
              padding: '6px 10px',
              backgroundColor: '#1e293b',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 500,
              borderRadius: '6px',
              whiteSpace: 'nowrap',
              zIndex: 9999,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              pointerEvents: 'none',
              animation: 'tooltipFadeIn 0.15s ease-out',
            }}
          >
            Copied!
          </div>,
          document.body
        )}
      </div>
      <pre
        style={{
          margin: 0,
          padding: 'var(--spacing-4)',
          overflow: 'auto',
          fontSize: 'var(--font-size-caption)',
          fontFamily: 'ui-monospace, monospace',
          lineHeight: 'var(--line-height-relaxed)',
          color: 'var(--color-foreground)',
          backgroundColor: '#1e1e2e',
        }}
      >
        <code style={{ color: '#cdd6f4' }}>{code}</code>
      </pre>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function GreenshiftPage() {
  // Count totals
  const totalPresetColors = PRESET_COLORS.groups.reduce((acc, g) => acc + g.tokens.length, 0);
  const totalCustomProps = CUSTOM_PROPERTIES.groups.reduce((acc, g) => acc + g.tokens.length, 0);
  const totalStyleGlobals = STYLE_GLOBALS.groups.reduce((acc, g) => acc + g.tokens.length, 0);
  const totalVariables = totalPresetColors + totalCustomProps + totalStyleGlobals;

  // Generate CSS code for preset colors
  const presetColorsCSS = `:root {
  /* Brand Colors */
  --wp--preset--color--brand: #34d399;
  --wp--preset--color--brand-hover: #10b981;
  --wp--preset--color--brand-light: #d1fae5;
  --wp--preset--color--brand-dark: #047857;
  
  /* Secondary Colors */
  --wp--preset--color--secondary: #4c1d95;
  --wp--preset--color--secondary-hover: #2e1065;
  --wp--preset--color--secondary-light: #ede9fe;
  
  /* Background & Surface */
  --wp--preset--color--background: #f9fafb;
  --wp--preset--color--background-alt: #f3f4f6;
  --wp--preset--color--surface: #ffffff;
  
  /* Status Colors */
  --wp--preset--color--success: #22c55e;
  --wp--preset--color--warning: #f59e0b;
  --wp--preset--color--error: #ef4444;
  --wp--preset--color--info: #3b82f6;
}`;

  const customPropsCSS = `:root {
  /* Button Component */
  --wp--custom--button--background: #34d399;
  --wp--custom--button--background-hover: #10b981;
  --wp--custom--button--text: #ffffff;
  --wp--custom--button--border-radius: 0.5rem;
  --wp--custom--button--spacing--horizontal: 1.25rem;
  --wp--custom--button--spacing--vertical: 0.625rem;
  
  /* Card Component */
  --wp--custom--card--border-radius: 0.75rem;
  --wp--custom--card--spacing: 1.5rem;
  
  /* Input Component */
  --wp--custom--input--background: #ffffff;
  --wp--custom--input--border: #e5e7eb;
  --wp--custom--input--border-radius: 0.375rem;
}`;

  const globalStylesCSS = `:root {
  /* Global Layout */
  --wp--style--global--content-size: 64rem;
  --wp--style--global--wide-size: 90rem;
}`;

  return (
    <div style={{ maxWidth: 'var(--layout-6xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
          <Link
            href="/"
            style={{
              fontSize: 'var(--font-size-label)',
              color: 'var(--color-muted)',
              textDecoration: 'none',
            }}
          >
            Home
          </Link>
          <ChevronRight size={14} style={{ color: 'var(--color-muted)' }} />
          <span style={{ fontSize: 'var(--font-size-label)', color: 'var(--color-muted)' }}>
            Frameworks
          </span>
          <ChevronRight size={14} style={{ color: 'var(--color-muted)' }} />
          <span style={{ fontSize: 'var(--font-size-label)', color: 'var(--color-foreground)', fontWeight: 500 }}>
            Greenshift
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
          {/* H1 Page Icon Box - white bg, light thin border */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--color-card)',
              border: '1px solid rgba(68, 75, 140, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'var(--color-secondary)',
            }}
          >
            <Globe size={28} />
          </div>

          <div>
            <h1
              style={{
                fontSize: 'var(--font-size-h2)',
                fontWeight: 700,
                color: 'var(--color-foreground)',
                marginBottom: 'var(--spacing-2)',
                lineHeight: 'var(--line-height-tight)',
              }}
            >
              Greenshift / WordPress
            </h1>
            <p
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-muted)',
                lineHeight: 'var(--line-height-relaxed)',
                maxWidth: '65ch',
              }}
            >
              WordPress CSS custom properties mapped to the Altitude Design System. These variables 
              integrate seamlessly with Greenshift blocks and the WordPress block editor, appearing 
              in color pickers and style panels.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: 'var(--spacing-4)',
          marginBottom: 'var(--spacing-8)',
        }}
      >
        {[
          { label: 'Preset Colors', value: totalPresetColors.toString() },
          { label: 'Custom Props', value: totalCustomProps.toString() },
          { label: 'Style Globals', value: totalStyleGlobals.toString() },
          { label: 'Total Variables', value: totalVariables.toString() },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-card-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--spacing-4)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 'var(--font-size-h4)',
                fontWeight: 700,
                color: 'var(--color-brand)',
                marginBottom: 'var(--spacing-1)',
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Integration Info */}
      <div
        style={{
          backgroundColor: 'rgba(68, 75, 140, 0.05)',
          border: '1px solid rgba(68, 75, 140, 0.15)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-5)',
          marginBottom: 'var(--spacing-8)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-3)' }}>
          <Zap size={20} style={{ color: 'var(--color-secondary)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <h3
              style={{
                fontSize: 'var(--font-size-body)',
                fontWeight: 600,
                color: 'var(--color-secondary)',
                marginBottom: 'var(--spacing-2)',
              }}
            >
              Framework Adapter Layer
            </h3>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-foreground)', lineHeight: 'var(--line-height-relaxed)', margin: 0 }}>
              Greenshift tokens sit at layer 5 of the token architecture, bridging the Altitude Design System 
              with WordPress. They follow the <code style={{ backgroundColor: 'var(--color-background)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'ui-monospace, monospace', fontSize: '0.9em' }}>--wp--preset--</code>, 
              <code style={{ backgroundColor: 'var(--color-background)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'ui-monospace, monospace', fontSize: '0.9em' }}>--wp--custom--</code>, and 
              <code style={{ backgroundColor: 'var(--color-background)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'ui-monospace, monospace', fontSize: '0.9em' }}>--wp--style--</code> naming conventions.
            </p>
          </div>
        </div>
      </div>

      {/* Token Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-10)' }}>
        {ALL_SECTIONS.map((section) => (
          <section key={section.id}>
            {/* Section Header - H2 Icon Box */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'rgba(68, 75, 140, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-secondary)',
                  flexShrink: 0,
                }}
              >
                {section.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-1)', lineHeight: 'var(--line-height-tight)' }}>
                  {section.name}
                </h2>
                <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)', margin: 0 }}>
                  {section.description}
                </p>
              </div>
            </div>

            {/* Groups */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
              {section.groups.map((group) => (
                <GroupSection 
                  key={group.id} 
                  group={group} 
                  sectionColor={section.iconColor}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CSS Code Blocks */}
      <section style={{ marginTop: 'var(--spacing-10)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
          {/* H2 Icon Box - 48x48px, light purple bg, no border */}
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'rgba(68, 75, 140, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: 'var(--color-secondary)',
          }}>
            <Code size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-1)', lineHeight: 'var(--line-height-tight)' }}>
              Copy-Ready CSS
            </h2>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)', margin: 0 }}>
              Ready-to-use CSS variable declarations for your WordPress theme
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <CSSCodeBlock title="preset-colors.css" code={presetColorsCSS} />
          <CSSCodeBlock title="custom-properties.css" code={customPropsCSS} />
          <CSSCodeBlock title="global-styles.css" code={globalStylesCSS} />
        </div>
      </section>

      {/* Usage Note */}
      <div
        style={{
          backgroundColor: 'rgba(68, 75, 140, 0.05)',
          border: '1px solid rgba(68, 75, 140, 0.15)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-5)',
          marginTop: 'var(--spacing-10)',
        }}
      >
        <h3
          style={{
            fontSize: 'var(--font-size-body)',
            fontWeight: 600,
            color: 'var(--color-secondary)',
            marginBottom: 'var(--spacing-2)',
          }}
        >
          Usage in WordPress
        </h3>
        <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-foreground)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--spacing-3)' }}>
          These CSS custom properties can be used in your WordPress theme&apos;s <code style={{ backgroundColor: 'var(--color-background)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'ui-monospace, monospace', fontSize: '0.9em' }}>theme.json</code> file, 
          custom CSS, or directly in Greenshift blocks. Colors with the <code style={{ backgroundColor: 'var(--color-background)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'ui-monospace, monospace', fontSize: '0.9em' }}>--wp--preset--color--</code> prefix 
          will automatically appear in the Gutenberg color picker.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', fontSize: 'var(--font-size-caption)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-brand)' }} />
            <span style={{ color: 'var(--color-muted)' }}>
              <strong style={{ color: 'var(--color-foreground)' }}>Preset colors</strong> appear in the block editor color picker
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', fontSize: 'var(--font-size-caption)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-brand)' }} />
            <span style={{ color: 'var(--color-muted)' }}>
              <strong style={{ color: 'var(--color-foreground)' }}>Custom properties</strong> for component-specific styling
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', fontSize: 'var(--font-size-caption)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-brand)' }} />
            <span style={{ color: 'var(--color-muted)' }}>
              <strong style={{ color: 'var(--color-foreground)' }}>Style globals</strong> control layout constraints
            </span>
          </div>
        </div>
      </div>

      {/* Hover styles */}
      <style jsx global>{`
        .token-row:hover {
          background-color: var(--color-background) !important;
        }
        .token-row:last-child {
          border-bottom: none !important;
        }
      `}</style>
    </div>
  );
}
