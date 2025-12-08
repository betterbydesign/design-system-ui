'use client';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { 
  ChevronRight, 
  Copy, 
  Box,
  MousePointer2,
  CreditCard,
  TextCursor,
  ArrowRight,
  ChevronDown,
  Hash,
  Sparkles,
} from 'lucide-react';
import { TokenLayer, TOKEN_LAYER_INFO } from '@/lib/types';
import { TokenCopyButton } from '@/components/tokens/TokenCopyButton';

// =============================================================================
// TYPES
// =============================================================================

interface ComponentToken {
  name: string;
  property: string;
  cssVariable: string;
  semanticRef?: string;
  primitiveRef?: string;
  resolvedValue: string;
  type: 'color' | 'number' | 'string';
  description?: string;
}

interface ComponentVariant {
  id: string;
  name: string;
  description: string;
  tokens: ComponentToken[];
}

interface ComponentSection {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  variants: ComponentVariant[];
  preview?: React.ReactNode;
}

// =============================================================================
// DATA - Button Component Tokens
// =============================================================================

const BUTTON_TOKENS: ComponentSection = {
  id: 'button',
  name: 'Button',
  description: 'Interactive button component tokens for primary, secondary, and outline variants',
  icon: <MousePointer2 size={20} />,
  iconColor: '#f59e0b', // Keeping icon color for identification but will use standard colors for UI
  variants: [
    {
      id: 'button-default',
      name: 'Default (Primary)',
      description: 'Primary call-to-action button with brand colors',
      tokens: [
        { 
          name: 'Background', 
          property: 'Background.Default', 
          cssVariable: '--component-button-background-default', 
          semanticRef: 'Color.Brand.Default', 
          primitiveRef: 'Emerald.400', 
          resolvedValue: '#34d399', 
          type: 'color',
          description: 'Button background color'
        },
        { 
          name: 'Background Hover', 
          property: 'Background.Hover', 
          cssVariable: '--component-button-background-hover', 
          semanticRef: 'Color.Brand.Hover', 
          primitiveRef: 'Emerald.500', 
          resolvedValue: '#10b981', 
          type: 'color',
          description: 'Button hover state'
        },
        { 
          name: 'Text', 
          property: 'Text', 
          cssVariable: '--component-button-text', 
          semanticRef: 'Color.Text.OnBrand', 
          primitiveRef: 'Base.White', 
          resolvedValue: '#ffffff', 
          type: 'color',
          description: 'Button text color'
        },
        { 
          name: 'Border Radius', 
          property: 'Radius', 
          cssVariable: '--component-button-radius', 
          semanticRef: 'Radius.Button', 
          primitiveRef: 'Radius.lg', 
          resolvedValue: '0.5rem', 
          type: 'number',
          description: 'Button corner radius'
        },
        { 
          name: 'Padding X', 
          property: 'PaddingX', 
          cssVariable: '--component-button-padding-x', 
          primitiveRef: 'Spacing.5', 
          resolvedValue: '1.25rem', 
          type: 'number',
          description: 'Horizontal padding'
        },
        { 
          name: 'Padding Y', 
          property: 'PaddingY', 
          cssVariable: '--component-button-padding-y', 
          primitiveRef: 'Spacing.2-5', 
          resolvedValue: '0.625rem', 
          type: 'number',
          description: 'Vertical padding'
        },
      ],
    },
    {
      id: 'button-sizes',
      name: 'Size Variants',
      description: 'Button height tokens for different sizes',
      tokens: [
        { 
          name: 'Height (Small)', 
          property: 'Height.sm', 
          cssVariable: '--component-button-height-sm', 
          primitiveRef: 'Size.10', 
          resolvedValue: '2.5rem', 
          type: 'number',
          description: '40px button height'
        },
        { 
          name: 'Height (Medium)', 
          property: 'Height.md', 
          cssVariable: '--component-button-height-md', 
          primitiveRef: 'Size.12', 
          resolvedValue: '3rem', 
          type: 'number',
          description: '48px button height'
        },
        { 
          name: 'Height (Large)', 
          property: 'Height.lg', 
          cssVariable: '--component-button-height-lg', 
          primitiveRef: 'Size.14', 
          resolvedValue: '3.5rem', 
          type: 'number',
          description: '56px button height'
        },
      ],
    },
    {
      id: 'button-secondary',
      name: 'Secondary',
      description: 'Secondary button variant for less prominent actions',
      tokens: [
        { 
          name: 'Background', 
          property: 'Secondary.Background', 
          cssVariable: '--component-button-secondary-background', 
          semanticRef: 'Color.Secondary.Default', 
          primitiveRef: 'Violet.900', 
          resolvedValue: '#4c1d95', 
          type: 'color',
          description: 'Secondary button background'
        },
        { 
          name: 'Background Hover', 
          property: 'Secondary.BackgroundHover', 
          cssVariable: '--component-button-secondary-background-hover', 
          semanticRef: 'Color.Secondary.Hover', 
          primitiveRef: 'Violet.950', 
          resolvedValue: '#2e1065', 
          type: 'color',
          description: 'Secondary button hover state'
        },
        { 
          name: 'Text', 
          property: 'Secondary.Text', 
          cssVariable: '--component-button-secondary-text', 
          semanticRef: 'Color.Text.OnSecondary', 
          primitiveRef: 'Base.White', 
          resolvedValue: '#ffffff', 
          type: 'color',
          description: 'Secondary button text'
        },
      ],
    },
    {
      id: 'button-outline',
      name: 'Outline',
      description: 'Outline button variant for tertiary actions',
      tokens: [
        { 
          name: 'Background', 
          property: 'Outline.Background', 
          cssVariable: '--component-button-outline-background', 
          primitiveRef: 'Base.Transparent', 
          resolvedValue: 'transparent', 
          type: 'color',
          description: 'Transparent background'
        },
        { 
          name: 'Border', 
          property: 'Outline.Border', 
          cssVariable: '--component-button-outline-border', 
          semanticRef: 'Color.Brand.Default', 
          primitiveRef: 'Emerald.400', 
          resolvedValue: '#34d399', 
          type: 'color',
          description: 'Outline border color'
        },
        { 
          name: 'Text', 
          property: 'Outline.Text', 
          cssVariable: '--component-button-outline-text', 
          semanticRef: 'Color.Brand.Default', 
          primitiveRef: 'Emerald.400', 
          resolvedValue: '#34d399', 
          type: 'color',
          description: 'Outline button text'
        },
        { 
          name: 'Hover Background', 
          property: 'Outline.HoverBackground', 
          cssVariable: '--component-button-outline-hover-background', 
          semanticRef: 'Color.Brand.Light', 
          primitiveRef: 'Emerald.100', 
          resolvedValue: '#d1fae5', 
          type: 'color',
          description: 'Hover background color'
        },
      ],
    },
  ],
};

// =============================================================================
// DATA - Card Component Tokens
// =============================================================================

const CARD_TOKENS: ComponentSection = {
  id: 'card',
  name: 'Card',
  description: 'Container component tokens for elevated content sections',
  icon: <CreditCard size={20} />,
  iconColor: '#3b82f6',
  variants: [
    {
      id: 'card-default',
      name: 'Default',
      description: 'Standard card component styling',
      tokens: [
        { 
          name: 'Background', 
          property: 'Background', 
          cssVariable: '--component-card-background', 
          semanticRef: 'Color.Card.Background', 
          primitiveRef: 'Base.White', 
          resolvedValue: '#ffffff', 
          type: 'color',
          description: 'Card background color'
        },
        { 
          name: 'Border', 
          property: 'Border', 
          cssVariable: '--component-card-border', 
          semanticRef: 'Color.Card.Border', 
          primitiveRef: 'Gray.200', 
          resolvedValue: '#e5e7eb', 
          type: 'color',
          description: 'Card border color'
        },
        { 
          name: 'Text', 
          property: 'Text', 
          cssVariable: '--component-card-text', 
          semanticRef: 'Color.Text.Foreground', 
          primitiveRef: 'Gray.900', 
          resolvedValue: '#111827', 
          type: 'color',
          description: 'Card text color'
        },
        { 
          name: 'Border Radius', 
          property: 'Radius', 
          cssVariable: '--component-card-radius', 
          semanticRef: 'Radius.Card', 
          primitiveRef: 'Radius.xl', 
          resolvedValue: '0.75rem', 
          type: 'number',
          description: 'Card corner radius'
        },
        { 
          name: 'Padding', 
          property: 'Padding', 
          cssVariable: '--component-card-padding', 
          primitiveRef: 'Spacing.6', 
          resolvedValue: '1.5rem', 
          type: 'number',
          description: 'Card internal padding'
        },
      ],
    },
  ],
};

// =============================================================================
// DATA - Input Component Tokens
// =============================================================================

const INPUT_TOKENS: ComponentSection = {
  id: 'input',
  name: 'Input',
  description: 'Form input component tokens for text fields and user input',
  icon: <TextCursor size={20} />,
  iconColor: '#10b981',
  variants: [
    {
      id: 'input-default',
      name: 'Default',
      description: 'Standard input field styling',
      tokens: [
        { 
          name: 'Background', 
          property: 'Background', 
          cssVariable: '--component-input-background', 
          semanticRef: 'Color.Surface', 
          primitiveRef: 'Base.White', 
          resolvedValue: '#ffffff', 
          type: 'color',
          description: 'Input background color'
        },
        { 
          name: 'Border Default', 
          property: 'Border.Default', 
          cssVariable: '--component-input-border-default', 
          semanticRef: 'Color.Border.Default', 
          primitiveRef: 'Gray.200', 
          resolvedValue: '#e5e7eb', 
          type: 'color',
          description: 'Default border color'
        },
        { 
          name: 'Border Focus', 
          property: 'Border.Focus', 
          cssVariable: '--component-input-border-focus', 
          semanticRef: 'Color.Brand.Default', 
          primitiveRef: 'Emerald.400', 
          resolvedValue: '#34d399', 
          type: 'color',
          description: 'Focus state border'
        },
        { 
          name: 'Border Radius', 
          property: 'Radius', 
          cssVariable: '--component-input-radius', 
          semanticRef: 'Radius.Input', 
          primitiveRef: 'Radius.md', 
          resolvedValue: '0.375rem', 
          type: 'number',
          description: 'Input corner radius'
        },
        { 
          name: 'Text', 
          property: 'Text', 
          cssVariable: '--component-input-text', 
          semanticRef: 'Color.Text.Foreground', 
          primitiveRef: 'Gray.900', 
          resolvedValue: '#111827', 
          type: 'color',
          description: 'Input text color'
        },
        { 
          name: 'Placeholder', 
          property: 'Placeholder', 
          cssVariable: '--component-input-placeholder', 
          semanticRef: 'Color.Text.Muted', 
          primitiveRef: 'Gray.500', 
          resolvedValue: '#6b7280', 
          type: 'color',
          description: 'Placeholder text color'
        },
        { 
          name: 'Padding X', 
          property: 'PaddingX', 
          cssVariable: '--component-input-padding-x', 
          primitiveRef: 'Spacing.3', 
          resolvedValue: '0.75rem', 
          type: 'number',
          description: 'Horizontal padding'
        },
        { 
          name: 'Padding Y', 
          property: 'PaddingY', 
          cssVariable: '--component-input-padding-y', 
          primitiveRef: 'Spacing.2', 
          resolvedValue: '0.5rem', 
          type: 'number',
          description: 'Vertical padding'
        },
        { 
          name: 'Height', 
          property: 'Height', 
          cssVariable: '--component-input-height', 
          primitiveRef: 'Size.10', 
          resolvedValue: '2.5rem', 
          type: 'number',
          description: 'Input height'
        },
      ],
    },
  ],
};

const ALL_COMPONENTS: ComponentSection[] = [BUTTON_TOKENS, CARD_TOKENS, INPUT_TOKENS];

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

function ReferenceChain({ token }: { token: ComponentToken }) {
  // Flow: Value → Primitive → Semantic → Component
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)', flexWrap: 'wrap' }}>
      {/* Raw Value */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-1)',
          padding: '2px 6px',
          backgroundColor: 'var(--color-background)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <span style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-foreground)' }}>
          {token.resolvedValue}
        </span>
      </div>

      {/* Primitive Layer */}
      {token.primitiveRef && (
        <>
          <ArrowRight size={10} style={{ color: 'var(--color-muted)' }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-1)',
              padding: '2px 6px',
              backgroundColor: 'rgba(68, 75, 140, 0.08)',
              border: '1px solid rgba(68, 75, 140, 0.15)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <Hash size={10} style={{ color: 'var(--color-secondary)' }} />
            <span style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-secondary)', fontWeight: 500 }}>
              {token.primitiveRef}
            </span>
          </div>
        </>
      )}
      
      {/* Semantic Layer (if exists) */}
      {token.semanticRef && (
        <>
          <ArrowRight size={10} style={{ color: 'var(--color-muted)' }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-1)',
              padding: '2px 6px',
              backgroundColor: 'rgba(42, 175, 184, 0.08)',
              border: '1px solid rgba(42, 175, 184, 0.2)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <Sparkles size={10} style={{ color: 'var(--color-brand)' }} />
            <span style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-brand)', fontWeight: 500 }}>
              {token.semanticRef}
            </span>
          </div>
        </>
      )}

      {/* Component Layer */}
      <ArrowRight size={10} style={{ color: 'var(--color-muted)' }} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-1)',
          padding: '2px 6px',
          backgroundColor: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <Box size={10} style={{ color: '#f59e0b' }} />
        <span style={{ fontSize: 'var(--font-size-caption)', fontWeight: 500, color: '#f59e0b' }}>
          Component
        </span>
      </div>
    </div>
  );
}

function ColorPreview({ hex }: { hex: string }) {
  if (hex === 'transparent') {
    return (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 'var(--radius-md)',
          border: '2px dashed var(--color-border)',
          backgroundColor: 'transparent',
          backgroundImage: 'linear-gradient(45deg, #e5e7eb 25%, transparent 25%, transparent 75%, #e5e7eb 75%, #e5e7eb), linear-gradient(45deg, #e5e7eb 25%, transparent 25%, transparent 75%, #e5e7eb 75%, #e5e7eb)',
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0, 4px 4px',
          flexShrink: 0,
        }}
      />
    );
  }
  
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

function TokenRow({ token }: { token: ComponentToken }) {
  return (
    <div
      className="token-row"
      style={{
        display: 'grid',
        gridTemplateColumns: token.type === 'color' ? '48px 2fr 1.5fr' : '2fr 1.5fr',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
          <span style={{ fontSize: 'var(--font-size-body-small)', fontWeight: 600, color: 'var(--color-foreground)' }}>
            {token.name}
          </span>
          <span
            style={{
              fontSize: 'var(--font-size-caption)',
              fontFamily: 'ui-monospace, monospace',
              color: token.type === 'color' ? '#f59e0b' : '#3b82f6',
              backgroundColor: token.type === 'color' ? '#f59e0b15' : '#3b82f615',
              padding: '1px 4px',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {token.type}
          </span>
        </div>
        
        {/* CSS Variable as Copy Button */}
        <div>
          <TokenCopyButton 
            value={`var(${token.cssVariable})`} 
            displayValue={token.cssVariable}
            variant="primary" 
          />
        </div>
      </div>
      
      {/* Reference Chain */}
      <div>
        <ReferenceChain token={token} />
      </div>
    </div>
  );
}

function VariantSection({ variant, componentColor }: { variant: ComponentVariant; componentColor: string }) {
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
      {/* Variant Header */}
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
              backgroundColor: componentColor,
            }}
          />
          <span style={{ fontSize: 'var(--font-size-body-small)', fontWeight: 600, color: 'var(--color-foreground)' }}>
            {variant.name}
          </span>
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-muted)' }}>
            {variant.tokens.length} tokens
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
          {variant.description && (
            <p
              style={{
                fontSize: 'var(--font-size-body-small)',
                color: 'var(--color-muted)',
                padding: 'var(--spacing-3) var(--spacing-4)',
                borderBottom: '1px solid var(--color-card-border)',
                margin: 0,
              }}
            >
              {variant.description}
            </p>
          )}
          <div>
            {variant.tokens.map((token) => (
              <TokenRow key={token.cssVariable} token={token} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ComponentPreview({ component }: { component: ComponentSection }) {
  if (component.id === 'button') {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)', padding: 'var(--spacing-4)' }}>
        {/* Primary Button */}
        <button
          style={{
            padding: '0.625rem 1.25rem',
            backgroundColor: '#34d399',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Primary
        </button>
        {/* Secondary Button */}
        <button
          style={{
            padding: '0.625rem 1.25rem',
            backgroundColor: '#4c1d95',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Secondary
        </button>
        {/* Outline Button */}
        <button
          style={{
            padding: '0.625rem 1.25rem',
            backgroundColor: 'transparent',
            color: '#34d399',
            border: '2px solid #34d399',
            borderRadius: '0.5rem',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Outline
        </button>
      </div>
    );
  }
  
  if (component.id === 'card') {
    return (
      <div style={{ padding: 'var(--spacing-4)' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            maxWidth: 280,
          }}
        >
          <h4 style={{ margin: '0 0 0.5rem', color: '#111827', fontSize: '1rem', fontWeight: 600 }}>Card Title</h4>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
            This is a preview of the card component with its applied tokens.
          </p>
        </div>
      </div>
    );
  }
  
  if (component.id === 'input') {
    return (
      <div style={{ padding: 'var(--spacing-4)', maxWidth: 300 }}>
        <input
          type="text"
          placeholder="Enter your email..."
          style={{
            width: '100%',
            height: '2.5rem',
            padding: '0.5rem 0.75rem',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            color: '#111827',
            fontSize: '0.875rem',
          }}
        />
      </div>
    );
  }
  
  return null;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function ComponentTokensPage() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  
  // Count totals
  const totalTokens = ALL_COMPONENTS.reduce(
    (acc, comp) => acc + comp.variants.reduce((vAcc, v) => vAcc + v.tokens.length, 0),
    0
  );
  const totalVariants = ALL_COMPONENTS.reduce((acc, comp) => acc + comp.variants.length, 0);

  return (
    <div style={{ maxWidth: 'var(--layout-6xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
          <Link
            href="/tokens"
            style={{
              fontSize: 'var(--font-size-label)',
              color: 'var(--color-muted)',
              textDecoration: 'none',
            }}
          >
            Tokens
          </Link>
          <ChevronRight size={14} style={{ color: 'var(--color-muted)' }} />
          <span style={{ fontSize: 'var(--font-size-label)', color: 'var(--color-foreground)', fontWeight: 500 }}>
            Components
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
          {/* Layer badge */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'rgba(var(--color-brand-rgb), 0.1)',
              border: '1px solid rgba(var(--color-brand-rgb), 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'var(--color-brand)',
            }}
          >
            <Box size={28} />
          </div>

          <div>
            <h1
              style={{
                fontSize: 'var(--font-size-h2)',
                fontWeight: 700,
                color: 'var(--color-foreground)',
                marginBottom: 'var(--spacing-2)',
              }}
            >
              Component Tokens
            </h1>
            <p
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-muted)',
                lineHeight: 'var(--line-height-relaxed)',
                maxWidth: '65ch',
              }}
            >
              Ready-to-use design tokens for UI components. These tokens reference semantic tokens 
              which in turn reference primitives, creating a flexible and maintainable styling system.
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
          { label: 'Components', value: ALL_COMPONENTS.length.toString() },
          { label: 'Variants', value: totalVariants.toString() },
          { label: 'Total Tokens', value: totalTokens.toString() },
          { label: 'Layer', value: '4 of 5' },
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

      {/* Reference Chain Example */}
      <div
        style={{
          backgroundColor: 'rgba(245, 158, 11, 0.05)',
          border: '1px solid rgba(245, 158, 11, 0.15)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-5)',
          marginBottom: 'var(--spacing-8)',
        }}
      >
        <h3
          style={{
            fontSize: 'var(--font-size-body)',
            fontWeight: 600,
            color: '#f59e0b',
            marginBottom: 'var(--spacing-2)',
          }}
        >
          Token Reference Chain
        </h3>
        <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-foreground)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--spacing-3)' }}>
          Component tokens sit at layer 4 of the token architecture. Values flow from primitives through 
          semantic tokens to components, ensuring design consistency and easy theming.
        </p>
        {/* Flow: Value → Primitive → Semantic → Component */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', flexWrap: 'wrap' }}>
          {/* Value */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)', padding: 'var(--spacing-1) var(--spacing-2)', backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-foreground)' }}>#34d399</span>
          </div>
          <ArrowRight size={14} style={{ color: 'var(--color-muted)' }} />
          {/* Primitive */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)', padding: 'var(--spacing-1) var(--spacing-2)', backgroundColor: 'rgba(68, 75, 140, 0.08)', border: '1px solid rgba(68, 75, 140, 0.15)', borderRadius: 'var(--radius-md)' }}>
            <Hash size={12} style={{ color: 'var(--color-secondary)' }} />
            <span style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-secondary)', fontWeight: 500 }}>Emerald.400</span>
          </div>
          <ArrowRight size={14} style={{ color: 'var(--color-muted)' }} />
          {/* Semantic */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)', padding: 'var(--spacing-1) var(--spacing-2)', backgroundColor: 'rgba(42, 175, 184, 0.08)', border: '1px solid rgba(42, 175, 184, 0.2)', borderRadius: 'var(--radius-md)' }}>
            <Sparkles size={12} style={{ color: 'var(--color-brand)' }} />
            <span style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-brand)', fontWeight: 500 }}>Color.Brand.Default</span>
          </div>
          <ArrowRight size={14} style={{ color: 'var(--color-muted)' }} />
          {/* Component */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)', padding: 'var(--spacing-1) var(--spacing-2)', backgroundColor: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: 'var(--radius-md)' }}>
            <Box size={12} style={{ color: '#f59e0b' }} />
            <span style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: '#f59e0b', fontWeight: 500 }}>Button.Background</span>
          </div>
        </div>
      </div>

      {/* Component Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-10)' }}>
        {ALL_COMPONENTS.map((component) => (
          <section key={component.id}>
            {/* Component Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-6)' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: component.iconColor,
                  flexShrink: 0,
                }}
              >
                {component.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-1)' }}>
                  {component.name}
                </h2>
                <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)', margin: 0 }}>
                  {component.description}
                </p>
              </div>
            </div>

            {/* Live Preview */}
            <div
              style={{
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-card-border)',
                borderRadius: 'var(--radius-xl)',
                marginBottom: 'var(--spacing-4)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: 'var(--spacing-2) var(--spacing-4)',
                  borderBottom: '1px solid var(--color-card-border)',
                  backgroundColor: 'var(--color-card)',
                }}
              >
                <span style={{ fontSize: 'var(--font-size-caption)', fontWeight: 500, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Preview
                </span>
              </div>
              <ComponentPreview component={component} />
            </div>

            {/* Variants */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
              {component.variants.map((variant) => (
                <VariantSection 
                  key={variant.id} 
                  variant={variant} 
                  componentColor={component.iconColor}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Architecture Note */}
      <div
        style={{
          backgroundColor: 'rgba(245, 158, 11, 0.05)',
          border: '1px solid rgba(245, 158, 11, 0.15)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-5)',
          marginTop: 'var(--spacing-10)',
        }}
      >
        <h3
          style={{
            fontSize: 'var(--font-size-body)',
            fontWeight: 600,
            color: '#f59e0b',
            marginBottom: 'var(--spacing-2)',
          }}
        >
          Why Component Tokens?
        </h3>
        <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-foreground)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--spacing-3)' }}>
          Component tokens provide a concrete API for styling UI components. Instead of applying 
          semantic tokens directly, components use their own tokens like 
          <TokenCopyButton value="--component-button-background" variant="muted" />. 
          This allows for component-specific customization while maintaining the overall design system.
        </p>
        <ul style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)', paddingLeft: 'var(--spacing-4)', margin: 0, listStyleType: 'disc' }}>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>Override button colors without affecting cards or inputs</li>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>Maintain consistent token naming across components</li>
          <li style={{ marginBottom: 'var(--spacing-1)' }}>Enable component-level theming and customization</li>
          <li>Support variant-specific styling (primary, secondary, outline)</li>
        </ul>
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
