'use client';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { 
  Copy, 
  ChevronRight, 
  ArrowRight, 
  Palette,
  Sparkles,
  Hash,
  ExternalLink,
} from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

interface SemanticColorToken {
  name: string;
  cssVariable: string;
  primitiveRef: string;  // e.g., "Emerald.400"
  resolvedHex: string;
  description?: string;
}

interface ColorGroup {
  id: string;
  name: string;
  description: string;
  tokens: SemanticColorToken[];
}

// =============================================================================
// DATA - Semantic Colors (Light Mode)
// =============================================================================

const SEMANTIC_COLORS: ColorGroup[] = [
  {
    id: 'brand',
    name: 'Brand',
    description: 'Primary brand colors for CTAs, links, and key interactive elements',
    tokens: [
      { name: 'Default', cssVariable: '--color-brand', primitiveRef: 'Emerald.400', resolvedHex: '#34d399' },
      { name: 'Hover', cssVariable: '--color-brand-hover', primitiveRef: 'Emerald.500', resolvedHex: '#10b981' },
      { name: 'Light', cssVariable: '--color-brand-light', primitiveRef: 'Emerald.100', resolvedHex: '#d1fae5' },
      { name: 'Dark', cssVariable: '--color-brand-dark', primitiveRef: 'Emerald.700', resolvedHex: '#047857' },
    ],
  },
  {
    id: 'secondary',
    name: 'Secondary',
    description: 'Supporting color for secondary actions and accents',
    tokens: [
      { name: 'Default', cssVariable: '--color-secondary', primitiveRef: 'Violet.900', resolvedHex: '#4c1d95' },
      { name: 'Hover', cssVariable: '--color-secondary-hover', primitiveRef: 'Violet.950', resolvedHex: '#2e1065' },
      { name: 'Light', cssVariable: '--color-secondary-light', primitiveRef: 'Violet.100', resolvedHex: '#ede9fe' },
    ],
  },
  {
    id: 'background',
    name: 'Background',
    description: 'Page and section background colors',
    tokens: [
      { name: 'Default', cssVariable: '--color-background', primitiveRef: 'Gray.50', resolvedHex: '#f9fafb' },
      { name: 'Alt', cssVariable: '--color-background-alt', primitiveRef: 'Gray.100', resolvedHex: '#f3f4f6' },
    ],
  },
  {
    id: 'surface',
    name: 'Surface',
    description: 'Elevated surface color (white)',
    tokens: [
      { name: 'Default', cssVariable: '--color-surface', primitiveRef: 'Base.White', resolvedHex: '#ffffff' },
    ],
  },
  {
    id: 'text',
    name: 'Text',
    description: 'Typography color roles for different hierarchies',
    tokens: [
      { name: 'Foreground', cssVariable: '--color-foreground', primitiveRef: 'Gray.900', resolvedHex: '#111827' },
      { name: 'Muted', cssVariable: '--color-muted', primitiveRef: 'Gray.500', resolvedHex: '#6b7280' },
      { name: 'Subtle', cssVariable: '--color-subtle', primitiveRef: 'Gray.400', resolvedHex: '#9ca3af' },
      { name: 'On Brand', cssVariable: '--color-text-on-brand', primitiveRef: 'Base.White', resolvedHex: '#ffffff' },
      { name: 'On Secondary', cssVariable: '--color-text-on-secondary', primitiveRef: 'Base.White', resolvedHex: '#ffffff' },
    ],
  },
  {
    id: 'card',
    name: 'Card',
    description: 'Card component specific colors',
    tokens: [
      { name: 'Background', cssVariable: '--color-card', primitiveRef: 'Base.White', resolvedHex: '#ffffff' },
      { name: 'Border', cssVariable: '--color-card-border', primitiveRef: 'Gray.200', resolvedHex: '#e5e7eb' },
    ],
  },
  {
    id: 'border',
    name: 'Border',
    description: 'General border colors',
    tokens: [
      { name: 'Default', cssVariable: '--color-border', primitiveRef: 'Gray.200', resolvedHex: '#e5e7eb' },
      { name: 'Strong', cssVariable: '--color-border-strong', primitiveRef: 'Gray.300', resolvedHex: '#d1d5db' },
    ],
  },
  {
    id: 'status',
    name: 'Status',
    description: 'Feedback and state indication colors',
    tokens: [
      { name: 'Success', cssVariable: '--color-success', primitiveRef: 'Green.500', resolvedHex: '#22c55e' },
      { name: 'Success Light', cssVariable: '--color-success-light', primitiveRef: 'Green.100', resolvedHex: '#dcfce7' },
      { name: 'Warning', cssVariable: '--color-warning', primitiveRef: 'Amber.500', resolvedHex: '#f59e0b' },
      { name: 'Warning Light', cssVariable: '--color-warning-light', primitiveRef: 'Amber.100', resolvedHex: '#fef3c7' },
      { name: 'Error', cssVariable: '--color-error', primitiveRef: 'Red.500', resolvedHex: '#ef4444' },
      { name: 'Error Light', cssVariable: '--color-error-light', primitiveRef: 'Red.100', resolvedHex: '#fee2e2' },
      { name: 'Info', cssVariable: '--color-info', primitiveRef: 'Blue.500', resolvedHex: '#3b82f6' },
      { name: 'Info Light', cssVariable: '--color-info-light', primitiveRef: 'Blue.100', resolvedHex: '#dbeafe' },
    ],
  },
  {
    id: 'base',
    name: 'Base',
    description: 'Fundamental contrast color',
    tokens: [
      { name: 'Default', cssVariable: '--color-base', primitiveRef: 'Slate.950', resolvedHex: '#020617' },
    ],
  },
];

// Primitive color families preview
const PRIMITIVE_FAMILIES = [
  { name: 'Slate', color: '#64748b' },
  { name: 'Gray', color: '#6b7280' },
  { name: 'Zinc', color: '#71717a' },
  { name: 'Red', color: '#ef4444' },
  { name: 'Orange', color: '#f97316' },
  { name: 'Amber', color: '#f59e0b' },
  { name: 'Yellow', color: '#eab308' },
  { name: 'Lime', color: '#84cc16' },
  { name: 'Green', color: '#22c55e' },
  { name: 'Emerald', color: '#10b981' },
  { name: 'Teal', color: '#14b8a6' },
  { name: 'Cyan', color: '#06b6d4' },
  { name: 'Sky', color: '#0ea5e9' },
  { name: 'Blue', color: '#3b82f6' },
  { name: 'Indigo', color: '#6366f1' },
  { name: 'Violet', color: '#8b5cf6' },
  { name: 'Purple', color: '#a855f7' },
  { name: 'Fuchsia', color: '#d946ef' },
  { name: 'Pink', color: '#ec4899' },
  { name: 'Rose', color: '#f43f5e' },
];

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
  const buttonSize = size === 'sm' ? 24 : 28;

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
          border: '1px solid var(--color-card-border)',
          backgroundColor: 'var(--color-card)',
          color: 'var(--color-muted)',
          cursor: 'pointer',
          transition: 'all var(--duration-100) var(--ease-out)',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-brand)';
          e.currentTarget.style.color = 'var(--color-brand)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-card-border)';
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

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

/**
 * Token Chain - shows: Value → Primitive → Semantic
 * Using consistent chip style with icon and border
 */
function TokenChainDisplay({ primitiveRef, resolvedHex }: { primitiveRef: string; resolvedHex: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1-5)', flexWrap: 'wrap' }}>
      {/* Raw Value */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-1)',
          padding: 'var(--spacing-1) var(--spacing-2)',
          backgroundColor: 'var(--color-background)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <span style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-foreground)' }}>
          {resolvedHex}
        </span>
      </div>

      <ArrowRight size={10} style={{ color: 'var(--color-muted)' }} />

      {/* Primitive */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-1)',
          padding: 'var(--spacing-1) var(--spacing-2)',
          backgroundColor: '#3b82f610',
          border: '1px solid #3b82f630',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <Hash size={12} style={{ color: '#3b82f6' }} />
        <span style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: '#3b82f6', fontWeight: 500 }}>
          {primitiveRef}
        </span>
      </div>

      <ArrowRight size={10} style={{ color: 'var(--color-muted)' }} />

      {/* Semantic */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-1)',
          padding: 'var(--spacing-1) var(--spacing-2)',
          backgroundColor: '#10b98110',
          border: '1px solid #10b98130',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <Sparkles size={12} style={{ color: '#10b981' }} />
        <span style={{ fontSize: 'var(--font-size-caption)', fontWeight: 500, color: '#10b981' }}>
          Semantic
        </span>
      </div>
    </div>
  );
}

function ColorSwatchToken({ token }: { token: SemanticColorToken }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`var(${token.cssVariable})`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
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
      {/* Color Preview - no copy buttons inside */}
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
        {/* Header with name and copy button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-2)' }}>
          <span style={{ fontSize: 'var(--font-size-label)', fontWeight: 600, color: 'var(--color-foreground)' }}>
            {token.name}
          </span>
          <CopyButton value={`var(${token.cssVariable})`} size="sm" />
        </div>

        {/* CSS Variable */}
        <div
          style={{
            fontSize: 'var(--font-size-caption)',
            fontFamily: 'ui-monospace, monospace',
            color: 'var(--color-muted)',
            marginBottom: 'var(--spacing-3)',
            wordBreak: 'break-all',
          }}
        >
          {token.cssVariable}
        </div>

        {/* Reference Chain: Value → Primitive → Semantic */}
        <TokenChainDisplay primitiveRef={token.primitiveRef} resolvedHex={token.resolvedHex} />
      </div>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function ColorsPage() {
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

  const totalTokens = SEMANTIC_COLORS.reduce((acc, group) => acc + group.tokens.length, 0);

  return (
    <div style={{ maxWidth: 'var(--layout-6xl)' }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
          <Link href="/tokens" style={{ fontSize: 'var(--font-size-label)', color: 'var(--color-muted)', textDecoration: 'none' }}>
            Tokens
          </Link>
          <ChevronRight size={14} style={{ color: 'var(--color-muted)' }} />
          <span style={{ fontSize: 'var(--font-size-label)', color: 'var(--color-foreground)', fontWeight: 500 }}>
            Colors
          </span>
        </div>

        <h1 style={{ fontSize: 'var(--font-size-h2)', fontWeight: 700, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-2)' }}>
          Color System
        </h1>
        <p style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-muted)', lineHeight: 'var(--line-height-relaxed)', maxWidth: '65ch' }}>
          Our color system is built in two layers: <strong>Primitives</strong> (raw color values) and 
          <strong> Semantic</strong> tokens (role-based colors). Use semantic tokens in your designs for 
          consistent theming and easier maintenance.
        </p>
      </div>

      {/* Quick Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'var(--spacing-4)',
          marginBottom: 'var(--spacing-8)',
        }}
      >
        {[
          { label: 'Semantic Tokens', value: totalTokens.toString(), color: '#10b981' },
          { label: 'Color Roles', value: SEMANTIC_COLORS.length.toString(), color: '#8b5cf6' },
          { label: 'Primitive Families', value: '22', color: '#3b82f6' },
          { label: 'Total Primitives', value: '245', color: '#f59e0b' },
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
            <div style={{ fontSize: 'var(--font-size-h4)', fontWeight: 700, color: stat.color, marginBottom: 'var(--spacing-1)' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-muted)' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Overview - Token Chain Example */}
      <div
        style={{
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-card-border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-5)',
          marginBottom: 'var(--spacing-8)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-4)' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Palette size={20} style={{ color: '#8b5cf6' }} />
          </div>
          <div>
            <h3 style={{ fontSize: 'var(--font-size-body)', fontWeight: 600, color: 'var(--color-foreground)' }}>
              Two-Layer Architecture
            </h3>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
              Raw values flow through primitives to semantic tokens
            </p>
          </div>
        </div>

        {/* Chain: Value → Primitive → Semantic */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', flexWrap: 'wrap' }}>
          {/* Value */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              padding: 'var(--spacing-2) var(--spacing-3)',
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <span style={{ fontSize: 'var(--font-size-label)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-foreground)' }}>
              #34d399
            </span>
          </div>
          
          <ArrowRight size={16} style={{ color: 'var(--color-muted)' }} />
          
          {/* Primitive */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              padding: 'var(--spacing-2) var(--spacing-3)',
              backgroundColor: '#3b82f610',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #3b82f630',
            }}
          >
            <Hash size={16} style={{ color: '#3b82f6' }} />
            <span style={{ fontSize: 'var(--font-size-label)', fontWeight: 500, color: '#3b82f6' }}>
              Emerald.400
            </span>
          </div>
          
          <ArrowRight size={16} style={{ color: 'var(--color-muted)' }} />
          
          {/* Semantic */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              padding: 'var(--spacing-2) var(--spacing-3)',
              backgroundColor: '#10b98110',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #10b98130',
            }}
          >
            <Sparkles size={16} style={{ color: '#10b981' }} />
            <span style={{ fontSize: 'var(--font-size-label)', fontWeight: 500, color: '#10b981' }}>
              Color.Brand.Default
            </span>
          </div>
        </div>
      </div>

      {/* Primitives Link Card */}
      <Link href="/tokens/primitives/colors" style={{ textDecoration: 'none' }}>
        <div
          className="primitives-link-card"
          style={{
            backgroundColor: '#3b82f610',
            border: '1px solid #3b82f630',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-5)',
            marginBottom: 'var(--spacing-10)',
            cursor: 'pointer',
            transition: 'all var(--duration-150) var(--ease-out)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: '#3b82f620',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Hash size={24} style={{ color: '#3b82f6' }} />
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--font-size-lead)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-1)' }}>
                  Primitive Color Palettes
                </h3>
                <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
                  22 color families with 11 shades each (50-950) · 245 total colors
                </p>
              </div>
            </div>
            <ExternalLink size={20} style={{ color: '#3b82f6' }} />
          </div>

          {/* Color Family Preview */}
          <div style={{ display: 'flex', gap: 'var(--spacing-1)', marginTop: 'var(--spacing-4)', flexWrap: 'wrap' }}>
            {PRIMITIVE_FAMILIES.map((family) => (
              <div
                key={family.name}
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: family.color,
                  borderRadius: 'var(--radius-sm)',
                }}
                title={family.name}
              />
            ))}
          </div>
        </div>
      </Link>

      {/* Semantic Color Tokens Section */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-6)' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={20} style={{ color: '#10b981' }} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--font-size-h4)', fontWeight: 600, color: 'var(--color-foreground)' }}>
              Semantic Color Tokens
            </h2>
            <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
              {totalTokens} tokens across {SEMANTIC_COLORS.length} color roles
            </p>
          </div>
        </div>

        {/* Color Groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
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
                {/* Color preview dots */}
                <div style={{ display: 'flex', gap: 2 }}>
                  {group.tokens.slice(0, 4).map((token) => (
                    <div
                      key={token.cssVariable}
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: token.resolvedHex,
                        border: token.resolvedHex === '#ffffff' ? '1px solid var(--color-card-border)' : 'none',
                      }}
                    />
                  ))}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 'var(--font-size-body)', fontWeight: 600, color: 'var(--color-foreground)' }}>
                    {group.name}
                  </span>
                  <span style={{ marginLeft: 'var(--spacing-2)', fontSize: 'var(--font-size-caption)', color: 'var(--color-muted)' }}>
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
                      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
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

      {/* Usage Guide */}
      <div
        style={{
          backgroundColor: 'var(--color-card)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-6)',
          border: '1px solid var(--color-card-border)',
          marginTop: 'var(--spacing-10)',
        }}
      >
        <h3 style={{ fontSize: 'var(--font-size-h6)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-4)' }}>
          Usage Example
        </h3>
        <pre
          className="overflow-x-auto"
          style={{
            backgroundColor: 'var(--color-base)',
            color: '#e2e8f0',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-4)',
            fontSize: 'var(--font-size-caption)',
            fontFamily: 'ui-monospace, monospace',
            lineHeight: 'var(--line-height-relaxed)',
          }}
        >
{`/* Use semantic tokens for consistent theming */
.button-primary {
  background-color: var(--color-brand);
  color: var(--color-text-on-brand);
}

.button-primary:hover {
  background-color: var(--color-brand-hover);
}

.card {
  background-color: var(--color-card);
  border: 1px solid var(--color-card-border);
}`}
        </pre>
      </div>

      {/* Related Pages */}
      <div style={{ marginTop: 'var(--spacing-8)' }}>
        <h3 style={{ fontSize: 'var(--font-size-body)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-4)' }}>
          Related Pages
        </h3>
        <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap' }}>
          <Link
            href="/tokens/primitives/colors"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              padding: 'var(--spacing-2) var(--spacing-4)',
              backgroundColor: 'var(--color-background)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-label)',
              color: 'var(--color-foreground)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            <Hash size={14} />
            Primitive Colors
          </Link>
          <Link
            href="/tokens/semantic"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              padding: 'var(--spacing-2) var(--spacing-4)',
              backgroundColor: 'var(--color-background)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-label)',
              color: 'var(--color-foreground)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            <Sparkles size={14} />
            Semantic Overview
          </Link>
          <Link
            href="/tokens/components"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              padding: 'var(--spacing-2) var(--spacing-4)',
              backgroundColor: 'var(--color-background)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-label)',
              color: 'var(--color-foreground)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            <Palette size={14} />
            Component Tokens
          </Link>
        </div>
      </div>

      {/* Hover styles */}
      <style jsx global>{`
        .color-swatch-token:hover {
          border-color: var(--color-brand) !important;
          box-shadow: var(--shadow-md) !important;
        }
        .primitives-link-card:hover {
          border-color: #3b82f6 !important;
          background-color: #3b82f618 !important;
        }
      `}</style>
    </div>
  );
}
