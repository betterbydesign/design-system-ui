'use client';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { 
  ChevronRight, 
  Copy, 
  Palette, 
  Square, 
  Layout,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Hash,
} from 'lucide-react';
import { TokenLayer, TOKEN_LAYER_INFO } from '@/lib/types';
import { TokenCopyButton } from '@/components/tokens/TokenCopyButton';

// =============================================================================
// TYPES
// =============================================================================

interface SemanticColorToken {
  name: string;
  cssVariable: string;
  reference: string;
  resolvedHex: string;
  description?: string;
}

interface SemanticColorGroup {
  id: string;
  name: string;
  description: string;
  tokens: SemanticColorToken[];
  icon?: React.ReactNode;
}

interface SemanticRadiusToken {
  name: string;
  cssVariable: string;
  reference: string;
  resolvedValue: string;
  pixels: number;
}

interface SemanticLayoutToken {
  name: string;
  cssVariable: string;
  reference: string | null;
  resolvedValue: string;
  pixels: number;
}

// =============================================================================
// DATA - Semantic Color Tokens (Light Mode)
// =============================================================================

const SEMANTIC_COLORS: SemanticColorGroup[] = [
  {
    id: 'brand',
    name: 'Brand',
    description: 'Primary brand colors for CTAs, links, and key interactive elements',
    icon: <Sparkles size={20} />,
    tokens: [
      { name: 'Default', cssVariable: '--semantic-color-brand-default', reference: 'Emerald.400', resolvedHex: '#34d399', description: 'Primary brand color' },
      { name: 'Hover', cssVariable: '--semantic-color-brand-hover', reference: 'Emerald.500', resolvedHex: '#10b981', description: 'Hover state' },
      { name: 'Light', cssVariable: '--semantic-color-brand-light', reference: 'Emerald.100', resolvedHex: '#d1fae5', description: 'Light variant for backgrounds' },
      { name: 'Dark', cssVariable: '--semantic-color-brand-dark', reference: 'Emerald.700', resolvedHex: '#047857', description: 'Dark variant for text' },
    ],
  },
  {
    id: 'secondary',
    name: 'Secondary',
    description: 'Supporting color for secondary actions and accents',
    icon: <Palette size={20} />,
    tokens: [
      { name: 'Default', cssVariable: '--semantic-color-secondary-default', reference: 'Violet.900', resolvedHex: '#4c1d95', description: 'Secondary color' },
      { name: 'Hover', cssVariable: '--semantic-color-secondary-hover', reference: 'Violet.950', resolvedHex: '#2e1065', description: 'Hover state' },
      { name: 'Light', cssVariable: '--semantic-color-secondary-light', reference: 'Violet.100', resolvedHex: '#ede9fe', description: 'Light variant' },
    ],
  },
  {
    id: 'background',
    name: 'Background',
    description: 'Page and section background colors',
    tokens: [
      { name: 'Default', cssVariable: '--semantic-color-background-default', reference: 'Gray.50', resolvedHex: '#f9fafb', description: 'Main page background' },
      { name: 'Alt', cssVariable: '--semantic-color-background-alt', reference: 'Gray.100', resolvedHex: '#f3f4f6', description: 'Alternate/section background' },
    ],
  },
  {
    id: 'surface',
    name: 'Surface',
    description: 'Elevated surface color (white)',
    tokens: [
      { name: 'Default', cssVariable: '--semantic-color-surface', reference: 'Base.White', resolvedHex: '#ffffff', description: 'Card and modal surfaces' },
    ],
  },
  {
    id: 'text',
    name: 'Text',
    description: 'Typography color roles',
    tokens: [
      { name: 'Foreground', cssVariable: '--semantic-color-text-foreground', reference: 'Gray.900', resolvedHex: '#111827', description: 'Primary text' },
      { name: 'Muted', cssVariable: '--semantic-color-text-muted', reference: 'Gray.500', resolvedHex: '#6b7280', description: 'Secondary text' },
      { name: 'Subtle', cssVariable: '--semantic-color-text-subtle', reference: 'Gray.400', resolvedHex: '#9ca3af', description: 'Tertiary text' },
      { name: 'On Brand', cssVariable: '--semantic-color-text-onbrand', reference: 'Base.White', resolvedHex: '#ffffff', description: 'Text on brand color' },
      { name: 'On Secondary', cssVariable: '--semantic-color-text-onsecondary', reference: 'Base.White', resolvedHex: '#ffffff', description: 'Text on secondary' },
    ],
  },
  {
    id: 'card',
    name: 'Card',
    description: 'Card component colors',
    tokens: [
      { name: 'Background', cssVariable: '--semantic-color-card-background', reference: 'Base.White', resolvedHex: '#ffffff', description: 'Card background' },
      { name: 'Border', cssVariable: '--semantic-color-card-border', reference: 'Gray.200', resolvedHex: '#e5e7eb', description: 'Card border' },
    ],
  },
  {
    id: 'border',
    name: 'Border',
    description: 'General border colors',
    tokens: [
      { name: 'Default', cssVariable: '--semantic-color-border-default', reference: 'Gray.200', resolvedHex: '#e5e7eb', description: 'Default borders' },
      { name: 'Strong', cssVariable: '--semantic-color-border-strong', reference: 'Gray.300', resolvedHex: '#d1d5db', description: 'Emphasized borders' },
    ],
  },
  {
    id: 'status',
    name: 'Status',
    description: 'Feedback and status indication colors',
    tokens: [
      { name: 'Success', cssVariable: '--semantic-color-status-success', reference: 'Green.500', resolvedHex: '#22c55e', description: 'Success state' },
      { name: 'Success Light', cssVariable: '--semantic-color-status-successlight', reference: 'Green.100', resolvedHex: '#dcfce7', description: 'Success background' },
      { name: 'Warning', cssVariable: '--semantic-color-status-warning', reference: 'Amber.500', resolvedHex: '#f59e0b', description: 'Warning state' },
      { name: 'Warning Light', cssVariable: '--semantic-color-status-warninglight', reference: 'Amber.100', resolvedHex: '#fef3c7', description: 'Warning background' },
      { name: 'Error', cssVariable: '--semantic-color-status-error', reference: 'Red.500', resolvedHex: '#ef4444', description: 'Error state' },
      { name: 'Error Light', cssVariable: '--semantic-color-status-errorlight', reference: 'Red.100', resolvedHex: '#fee2e2', description: 'Error background' },
      { name: 'Info', cssVariable: '--semantic-color-status-info', reference: 'Blue.500', resolvedHex: '#3b82f6', description: 'Info state' },
      { name: 'Info Light', cssVariable: '--semantic-color-status-infolight', reference: 'Blue.100', resolvedHex: '#dbeafe', description: 'Info background' },
    ],
  },
  {
    id: 'base',
    name: 'Base',
    description: 'Base neutral color for contrast',
    tokens: [
      { name: 'Default', cssVariable: '--semantic-color-base', reference: 'Slate.950', resolvedHex: '#020617', description: 'Dark base color' },
    ],
  },
];

// =============================================================================
// DATA - Semantic Radius Tokens
// =============================================================================

const SEMANTIC_RADIUS: SemanticRadiusToken[] = [
  { name: 'Button', cssVariable: '--semantic-radius-button', reference: 'lg', resolvedValue: '0.5rem', pixels: 8 },
  { name: 'Card', cssVariable: '--semantic-radius-card', reference: 'xl', resolvedValue: '0.75rem', pixels: 12 },
  { name: 'Input', cssVariable: '--semantic-radius-input', reference: 'md', resolvedValue: '0.375rem', pixels: 6 },
  { name: 'Badge', cssVariable: '--semantic-radius-badge', reference: 'full', resolvedValue: '9999px', pixels: 9999 },
  { name: 'Modal', cssVariable: '--semantic-radius-modal', reference: '2xl', resolvedValue: '1rem', pixels: 16 },
];

// =============================================================================
// DATA - Semantic Layout Tokens
// =============================================================================

const SEMANTIC_LAYOUT: SemanticLayoutToken[] = [
  { name: 'Content Width', cssVariable: '--semantic-layout-contentwidth', reference: '5xl', resolvedValue: '64rem', pixels: 1024 },
  { name: 'Wide Width', cssVariable: '--semantic-layout-widewidth', reference: null, resolvedValue: '90rem', pixels: 1440 },
  { name: 'Prose Width', cssVariable: '--semantic-layout-prosewidth', reference: '2xl', resolvedValue: '42rem', pixels: 672 },
];

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

function ColorSwatchToken({ token }: { token: SemanticColorToken }) {
  // Determine if color is light for text contrast
  const isLightColor = (hex: string): boolean => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  return (
    <div
      className="color-swatch-token"
      style={{
        backgroundColor: 'var(--color-card)',
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        transition: 'all var(--duration-150) var(--ease-out)',
      }}
    >
      {/* Color Preview - no buttons inside */}
      <div
        style={{
          height: 64,
          backgroundColor: token.resolvedHex,
          display: 'flex',
          alignItems: 'flex-end',
          padding: 'var(--spacing-2)',
          borderBottom: token.resolvedHex === '#ffffff' ? '1px solid var(--color-card-border)' : 'none',
        }}
      >
        <span
          style={{
            fontSize: 'var(--font-size-caption)',
            fontFamily: 'ui-monospace, monospace',
            color: isLightColor(token.resolvedHex) ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)',
          }}
        >
          {token.resolvedHex.toUpperCase()}
        </span>
      </div>

      {/* Token Info */}
      <div style={{ padding: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-2)' }}>
          <span style={{ fontSize: 'var(--font-size-label)', fontWeight: 600, color: 'var(--color-foreground)' }}>
            {token.name}
          </span>
        </div>

        {/* CSS Variable */}
        <div style={{ marginBottom: 'var(--spacing-3)' }}>
          <TokenCopyButton value={`var(${token.cssVariable})`} displayValue={token.cssVariable} variant="primary" />
        </div>

        {/* Reference Chain: Value → Primitive → Semantic */}
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
              {token.resolvedHex}
            </span>
          </div>
          <ArrowRight size={10} style={{ color: 'var(--color-muted)' }} />
          {/* Primitive */}
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
              {token.reference}
            </span>
          </div>
          <ArrowRight size={10} style={{ color: 'var(--color-muted)' }} />
          {/* Semantic */}
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
            <span style={{ fontSize: 'var(--font-size-caption)', fontWeight: 500, color: 'var(--color-brand)' }}>
              Semantic
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusIcon({ type }: { type: string }) {
  switch (type) {
    case 'Success':
    case 'Success Light':
      return <CheckCircle size={16} style={{ color: '#22c55e' }} />;
    case 'Warning':
    case 'Warning Light':
      return <AlertCircle size={16} style={{ color: '#f59e0b' }} />;
    case 'Error':
    case 'Error Light':
      return <XCircle size={16} style={{ color: '#ef4444' }} />;
    case 'Info':
    case 'Info Light':
      return <Info size={16} style={{ color: '#3b82f6' }} />;
    default:
      return null;
  }
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function SemanticTokensPage() {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(SEMANTIC_COLORS.map(g => g.id)));

  const toggleGroup = (id: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedGroups(newExpanded);
  };

  // Count totals
  const totalColorTokens = SEMANTIC_COLORS.reduce((acc, group) => acc + group.tokens.length, 0);
  const totalRadiusTokens = SEMANTIC_RADIUS.length;
  const totalLayoutTokens = SEMANTIC_LAYOUT.length;

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
            Semantic
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
            <Sparkles size={28} />
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
              Semantic Tokens
            </h1>
            <p
              style={{
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-muted)',
                lineHeight: 'var(--line-height-relaxed)',
                maxWidth: '65ch',
              }}
            >
              Role-based tokens that define the meaning and purpose of design decisions. These tokens 
              reference primitives and adapt for Light/Dark modes, providing a consistent vocabulary 
              across the design system.
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
          { label: 'Color Tokens', value: totalColorTokens.toString() },
          { label: 'Color Roles', value: SEMANTIC_COLORS.length.toString() },
          { label: 'Radius Tokens', value: totalRadiusTokens.toString() },
          { label: 'Layout Tokens', value: totalLayoutTokens.toString() },
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

      {/* Color Tokens Section */}
      <section style={{ marginBottom: 'var(--spacing-10)' }}>
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
            <Palette size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 'var(--line-height-tight)' }}>
              Color Roles
            </h2>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
              {totalColorTokens} tokens across {SEMANTIC_COLORS.length} categories
            </p>
          </div>
        </div>

        {/* Color Groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
          {SEMANTIC_COLORS.map((group) => (
            <div
              key={group.id}
              style={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-card-border)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
              }}
            >
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-3)',
                  padding: 'var(--spacing-4) var(--spacing-5)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {group.id === 'status' ? (
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <CheckCircle size={16} style={{ color: '#22c55e' }} />
                    <AlertCircle size={16} style={{ color: '#f59e0b' }} />
                  </div>
                ) : (
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: group.tokens[0]?.resolvedHex || '#e5e7eb',
                      border: '2px solid rgba(0,0,0,0.1)',
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 'var(--font-size-body)', fontWeight: 600, color: 'var(--color-foreground)' }}>
                    {group.name}
                  </span>
                  <span
                    style={{
                      marginLeft: 'var(--spacing-2)',
                      fontSize: 'var(--font-size-caption)',
                      color: 'var(--color-muted)',
                    }}
                  >
                    {group.tokens.length} tokens
                  </span>
                </div>
                <ChevronRight
                  size={18}
                  style={{
                    color: 'var(--color-muted)',
                    transform: expandedGroups.has(group.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform var(--duration-150) var(--ease-out)',
                  }}
                />
              </button>

              {/* Group Content */}
              {expandedGroups.has(group.id) && (
                <div style={{ padding: '0 var(--spacing-5) var(--spacing-5)' }}>
                  <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)', marginBottom: 'var(--spacing-4)' }}>
                    {group.description}
                  </p>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: 'var(--spacing-3)',
                    }}
                  >
                    {group.tokens.map((token) => (
                      <ColorSwatchToken key={token.cssVariable} token={token} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Radius Tokens Section */}
      <section style={{ marginBottom: 'var(--spacing-10)' }}>
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
            <Square size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 'var(--line-height-tight)' }}>
              Radius Roles
            </h2>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
              Component-specific border radius tokens
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-card-border)' }}>
                  <th style={{ padding: 'var(--spacing-3) var(--spacing-4)', textAlign: 'left', fontSize: 'var(--font-size-caption)', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Preview
                  </th>
                  <th style={{ padding: 'var(--spacing-3) var(--spacing-4)', textAlign: 'left', fontSize: 'var(--font-size-caption)', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Role
                  </th>
                  <th style={{ padding: 'var(--spacing-3) var(--spacing-4)', textAlign: 'left', fontSize: 'var(--font-size-caption)', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    CSS Variable
                  </th>
                  <th style={{ padding: 'var(--spacing-3) var(--spacing-4)', textAlign: 'left', fontSize: 'var(--font-size-caption)', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Reference
                  </th>
                  <th style={{ padding: 'var(--spacing-3) var(--spacing-4)', textAlign: 'left', fontSize: 'var(--font-size-caption)', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Value
                  </th>
                  <th style={{ padding: 'var(--spacing-3) var(--spacing-4)', textAlign: 'center', fontSize: 'var(--font-size-caption)', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Copy
                  </th>
                </tr>
              </thead>
              <tbody>
                {SEMANTIC_RADIUS.map((token, index) => (
                  <tr
                    key={token.cssVariable}
                    style={{
                      borderBottom: index < SEMANTIC_RADIUS.length - 1 ? '1px solid var(--color-card-border)' : 'none',
                    }}
                  >
                    <td style={{ padding: 'var(--spacing-3) var(--spacing-4)' }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'var(--color-brand)',
                          borderRadius: token.name === 'Badge' ? '9999px' : `${token.pixels}px`,
                          opacity: 0.9,
                        }}
                      />
                    </td>
                    <td style={{ padding: 'var(--spacing-3) var(--spacing-4)', fontSize: 'var(--font-size-body-small)', fontWeight: 500, color: 'var(--color-foreground)' }}>
                      {token.name}
                    </td>
                    <td style={{ padding: 'var(--spacing-3) var(--spacing-4)', fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-muted)' }}>
                      {token.cssVariable}
                    </td>
                    <td style={{ padding: 'var(--spacing-3) var(--spacing-4)' }}>
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'rgba(68, 75, 140, 0.08)',
                          color: 'var(--color-secondary)',
                          fontSize: 'var(--font-size-caption)',
                          fontFamily: 'ui-monospace, monospace',
                        }}
                      >
                        radius.{token.reference}
                      </span>
                    </td>
                    <td style={{ padding: 'var(--spacing-3) var(--spacing-4)', fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-foreground)' }}>
                      {token.resolvedValue}
                    </td>
                    <td style={{ padding: 'var(--spacing-3) var(--spacing-4)', textAlign: 'center' }}>
                      <TokenCopyButton value={`var(${token.cssVariable})`} variant="primary" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Layout Tokens Section */}
      <section style={{ marginBottom: 'var(--spacing-10)' }}>
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
            <Layout size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 600, color: 'var(--color-foreground)', lineHeight: 'var(--line-height-tight)' }}>
              Layout Widths
            </h2>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
              Content container width constraints
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--spacing-4)',
          }}
        >
          {SEMANTIC_LAYOUT.map((token) => (
            <div
              key={token.cssVariable}
              style={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-card-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--spacing-5)',
              }}
            >
              {/* Visual Width Bar */}
              <div
                style={{
                  height: 8,
                  backgroundColor: 'var(--color-background)',
                  borderRadius: 'var(--radius-full)',
                  marginBottom: 'var(--spacing-4)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min((token.pixels / 1440) * 100, 100)}%`,
                    backgroundColor: 'var(--color-brand)',
                    borderRadius: 'var(--radius-full)',
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-2)' }}>
                <span style={{ fontSize: 'var(--font-size-body)', fontWeight: 600, color: 'var(--color-foreground)' }}>
                  {token.name}
                </span>
                <span style={{ fontSize: 'var(--font-size-body-small)', fontWeight: 500, color: 'var(--color-brand)' }}>
                  {token.pixels}px
                </span>
              </div>

              <div style={{ marginBottom: 'var(--spacing-2)' }}>
                <TokenCopyButton value={`var(${token.cssVariable})`} displayValue={token.cssVariable} variant="primary" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                {token.reference ? (
                  <>
                    <span
                      style={{
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(42, 175, 184, 0.08)',
                        color: 'var(--color-brand)',
                        fontSize: 'var(--font-size-caption)',
                        fontWeight: 500,
                      }}
                    >
                      SEM
                    </span>
                    <ArrowRight size={10} style={{ color: 'var(--color-muted)' }} />
                    <span
                      style={{
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(68, 75, 140, 0.08)',
                        color: 'var(--color-secondary)',
                        fontSize: 'var(--font-size-caption)',
                        fontWeight: 500,
                      }}
                    >
                      layout.{token.reference}
                    </span>
                  </>
                ) : (
                  <span
                    style={{
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(42, 175, 184, 0.08)',
                      color: 'var(--color-brand)',
                      fontSize: 'var(--font-size-caption)',
                      fontWeight: 500,
                    }}
                  >
                    Direct Value
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Note */}
      <div
        style={{
          backgroundColor: 'rgba(68, 75, 140, 0.05)',
          border: '1px solid rgba(68, 75, 140, 0.15)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-5)',
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
          About Semantic Tokens
        </h3>
        <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-foreground)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--spacing-3)' }}>
          Semantic tokens provide meaning to design decisions. Instead of using raw colors like 
          <TokenCopyButton value="--primitives-color-emerald-400" variant="muted" />, 
          use semantic tokens like 
          <TokenCopyButton value="--color-brand" variant="muted" /> 
          to express intent and enable easy theme switching.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', fontSize: 'var(--font-size-caption)', color: 'var(--color-muted)' }}>
          <span style={{ fontFamily: 'ui-monospace, monospace', backgroundColor: 'var(--color-background)', padding: '2px 6px', borderRadius: '4px' }}>
            --color-brand
          </span>
          <ArrowRight size={12} />
          <span style={{ fontFamily: 'ui-monospace, monospace', backgroundColor: 'var(--color-background)', padding: '2px 6px', borderRadius: '4px' }}>
            --primitives-color-emerald-400
          </span>
          <ArrowRight size={12} />
          <span style={{ fontFamily: 'ui-monospace, monospace', backgroundColor: 'var(--color-background)', padding: '2px 6px', borderRadius: '4px' }}>
            #34d399
          </span>
        </div>
      </div>

      {/* Hover styles */}
      <style jsx global>{`
        .color-swatch-token:hover {
          border-color: var(--color-brand) !important;
          box-shadow: var(--shadow-md) !important;
        }
      `}</style>
    </div>
  );
}
