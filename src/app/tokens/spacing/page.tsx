'use client';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { Copy, ChevronRight, Ruler, Hash, Sparkles } from 'lucide-react';

// Complete spacing data from 01-Primitives.json
interface SpacingValue {
  key: string;
  cssVariable: string;
  rem: string;
  pixels: number;
  label?: string;
}

const SPACING_TOKENS: SpacingValue[] = [
  { key: '0', cssVariable: '--spacing-0', rem: '0rem', pixels: 0 },
  { key: 'px', cssVariable: '--spacing-px', rem: '0.0625rem', pixels: 1, label: 'px' },
  { key: '0.5', cssVariable: '--spacing-0-5', rem: '0.125rem', pixels: 2 },
  { key: '1', cssVariable: '--spacing-1', rem: '0.25rem', pixels: 4 },
  { key: '1.5', cssVariable: '--spacing-1-5', rem: '0.375rem', pixels: 6 },
  { key: '2', cssVariable: '--spacing-2', rem: '0.5rem', pixels: 8 },
  { key: '2.5', cssVariable: '--spacing-2-5', rem: '0.625rem', pixels: 10 },
  { key: '3', cssVariable: '--spacing-3', rem: '0.75rem', pixels: 12 },
  { key: '3.5', cssVariable: '--spacing-3-5', rem: '0.875rem', pixels: 14 },
  { key: '4', cssVariable: '--spacing-4', rem: '1rem', pixels: 16 },
  { key: '5', cssVariable: '--spacing-5', rem: '1.25rem', pixels: 20 },
  { key: '6', cssVariable: '--spacing-6', rem: '1.5rem', pixels: 24 },
  { key: '7', cssVariable: '--spacing-7', rem: '1.75rem', pixels: 28 },
  { key: '8', cssVariable: '--spacing-8', rem: '2rem', pixels: 32 },
  { key: '9', cssVariable: '--spacing-9', rem: '2.25rem', pixels: 36 },
  { key: '10', cssVariable: '--spacing-10', rem: '2.5rem', pixels: 40 },
  { key: '11', cssVariable: '--spacing-11', rem: '2.75rem', pixels: 44 },
  { key: '12', cssVariable: '--spacing-12', rem: '3rem', pixels: 48 },
  { key: '14', cssVariable: '--spacing-14', rem: '3.5rem', pixels: 56 },
  { key: '16', cssVariable: '--spacing-16', rem: '4rem', pixels: 64 },
  { key: '20', cssVariable: '--spacing-20', rem: '5rem', pixels: 80 },
  { key: '24', cssVariable: '--spacing-24', rem: '6rem', pixels: 96 },
  { key: '28', cssVariable: '--spacing-28', rem: '7rem', pixels: 112 },
  { key: '32', cssVariable: '--spacing-32', rem: '8rem', pixels: 128 },
  { key: '36', cssVariable: '--spacing-36', rem: '9rem', pixels: 144 },
  { key: '40', cssVariable: '--spacing-40', rem: '10rem', pixels: 160 },
  { key: '44', cssVariable: '--spacing-44', rem: '11rem', pixels: 176 },
  { key: '48', cssVariable: '--spacing-48', rem: '12rem', pixels: 192 },
  { key: '52', cssVariable: '--spacing-52', rem: '13rem', pixels: 208 },
  { key: '56', cssVariable: '--spacing-56', rem: '14rem', pixels: 224 },
  { key: '60', cssVariable: '--spacing-60', rem: '15rem', pixels: 240 },
  { key: '64', cssVariable: '--spacing-64', rem: '16rem', pixels: 256 },
];

// Layout sizes
const LAYOUT_TOKENS = [
  { key: 'xs', label: 'XS', cssVariable: '--layout-xs', rem: '20rem', pixels: 320, use: 'Mobile width' },
  { key: 'sm', label: 'SM', cssVariable: '--layout-sm', rem: '24rem', pixels: 384, use: 'Small container' },
  { key: 'md', label: 'MD', cssVariable: '--layout-md', rem: '28rem', pixels: 448, use: 'Medium container' },
  { key: 'lg', label: 'LG', cssVariable: '--layout-lg', rem: '32rem', pixels: 512, use: 'Large container' },
  { key: 'xl', label: 'XL', cssVariable: '--layout-xl', rem: '36rem', pixels: 576, use: 'Extra large' },
  { key: '2xl', label: '2XL', cssVariable: '--layout-2xl', rem: '42rem', pixels: 672, use: 'Prose width' },
  { key: '3xl', label: '3XL', cssVariable: '--layout-3xl', rem: '48rem', pixels: 768, use: 'Tablet width' },
  { key: '4xl', label: '4XL', cssVariable: '--layout-4xl', rem: '56rem', pixels: 896, use: 'Medium desktop' },
  { key: '5xl', label: '5XL', cssVariable: '--layout-5xl', rem: '64rem', pixels: 1024, use: 'Default content' },
  { key: '6xl', label: '6XL', cssVariable: '--layout-6xl', rem: '72rem', pixels: 1152, use: 'Wide content' },
  { key: '7xl', label: '7XL', cssVariable: '--layout-7xl', rem: '80rem', pixels: 1280, use: 'Max content' },
];

// Radius values
interface RadiusValue {
  key: string;
  cssVariable: string;
  value: string;
  pixels: number;
  label?: string;
}

const RADIUS_TOKENS: RadiusValue[] = [
  { key: 'none', cssVariable: '--radius-none', value: '0px', pixels: 0 },
  { key: 'sm', cssVariable: '--radius-sm', value: '2px', pixels: 2 },
  { key: 'md', cssVariable: '--radius-md', value: '4px', pixels: 4 },
  { key: 'lg', cssVariable: '--radius-lg', value: '6px', pixels: 6 },
  { key: 'xl', cssVariable: '--radius-xl', value: '8px', pixels: 8 },
  { key: '2xl', cssVariable: '--radius-2xl', value: '12px', pixels: 12 },
  { key: '3xl', cssVariable: '--radius-3xl', value: '16px', pixels: 16 },
  { key: '4xl', cssVariable: '--radius-4xl', value: '24px', pixels: 24 },
  { key: 'full', cssVariable: '--radius-full', value: '9999px', pixels: 9999, label: 'Full' },
];

// Duration tokens
const DURATION_TOKENS = [
  { key: '75', cssVariable: '--duration-75', value: '75ms', use: 'Micro interactions' },
  { key: '100', cssVariable: '--duration-100', value: '100ms', use: 'Quick feedback' },
  { key: '150', cssVariable: '--duration-150', value: '150ms', use: 'Default transitions' },
  { key: '200', cssVariable: '--duration-200', value: '200ms', use: 'Standard animations' },
  { key: '300', cssVariable: '--duration-300', value: '300ms', use: 'Smooth transitions' },
  { key: '500', cssVariable: '--duration-500', value: '500ms', use: 'Emphasis animations' },
  { key: '700', cssVariable: '--duration-700', value: '700ms', use: 'Complex animations' },
  { key: '1000', cssVariable: '--duration-1000', value: '1000ms', use: 'Long animations' },
];

// Line heights
const LINE_HEIGHT_TOKENS = [
  { key: 'none', cssVariable: '--line-height-none', value: '1', description: 'Text only, no extra space' },
  { key: 'tight', cssVariable: '--line-height-tight', value: '1.25', description: 'Headings, compact text' },
  { key: 'snug', cssVariable: '--line-height-snug', value: '1.375', description: 'Slightly compact' },
  { key: 'normal', cssVariable: '--line-height-normal', value: '1.5', description: 'Body text default' },
  { key: 'relaxed', cssVariable: '--line-height-relaxed', value: '1.625', description: 'Comfortable reading' },
  { key: 'loose', cssVariable: '--line-height-loose', value: '2', description: 'Maximum readability' },
];

// Font weights
const FONT_WEIGHT_TOKENS = [
  { key: 'thin', cssVariable: '--font-weight-thin', value: '100' },
  { key: 'extralight', cssVariable: '--font-weight-extralight', value: '200' },
  { key: 'light', cssVariable: '--font-weight-light', value: '300' },
  { key: 'normal', cssVariable: '--font-weight-normal', value: '400' },
  { key: 'medium', cssVariable: '--font-weight-medium', value: '500' },
  { key: 'semibold', cssVariable: '--font-weight-semibold', value: '600' },
  { key: 'bold', cssVariable: '--font-weight-bold', value: '700' },
  { key: 'extrabold', cssVariable: '--font-weight-extrabold', value: '800' },
  { key: 'black', cssVariable: '--font-weight-black', value: '900' },
];

// Consistent copy button style
function CopyButton({ value, size = 'sm' }: { value: string; size?: 'sm' | 'md' }) {
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

export default function SpacingPage() {
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
            Spacing & Layout
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'rgba(139, 92, 246, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Ruler size={28} style={{ color: '#8b5cf6' }} />
          </div>

          <div>
            <h1 style={{ fontSize: 'var(--font-size-h2)', fontWeight: 700, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-2)' }}>
              Spacing & Layout
            </h1>
            <p style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-muted)', lineHeight: 'var(--line-height-relaxed)', maxWidth: '65ch' }}>
              A comprehensive spacing system built on a 4px/8px grid for consistent layouts across all breakpoints.
              Includes spacing scale, layout widths, border radius, durations, and typography metrics.
            </p>
          </div>
        </div>
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
          { label: 'Spacing Values', value: '31', color: '#8b5cf6' },
          { label: 'Layout Sizes', value: '11', color: '#10b981' },
          { label: 'Radius Values', value: '9', color: '#f59e0b' },
          { label: 'Duration Values', value: '8', color: '#3b82f6' },
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

      {/* Spacing Scale - Table Only */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <div style={{ marginBottom: 'var(--spacing-4)' }}>
          <h2 style={{ fontSize: 'var(--font-size-h5)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-1)' }}>
            Spacing Scale
          </h2>
          <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)' }}>
            31 spacing values from 0px to 256px
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--color-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-card-border)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 80px 80px 1fr 40px', gap: 'var(--spacing-3)', padding: 'var(--spacing-3) var(--spacing-4)', backgroundColor: 'var(--color-background)', borderBottom: '1px solid var(--color-card-border)', fontSize: 'var(--font-size-caption)', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <div>Token</div>
            <div>CSS Variable</div>
            <div>REM</div>
            <div>Pixels</div>
            <div>Visual</div>
            <div></div>
          </div>
          {SPACING_TOKENS.map((token, index) => (
            <div
              key={token.key}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 80px 80px 1fr 40px',
                gap: 'var(--spacing-3)',
                padding: 'var(--spacing-2-5) var(--spacing-4)',
                borderBottom: index < SPACING_TOKENS.length - 1 ? '1px solid var(--color-card-border)' : 'none',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: 'var(--font-size-label)', fontWeight: 600, color: 'var(--color-foreground)' }}>
                {token.label || token.key}
              </div>
              <div style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-brand)' }}>
                {token.cssVariable}
              </div>
              <div style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-muted)' }}>
                {token.rem}
              </div>
              <div style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-foreground)' }}>
                {token.pixels}px
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: Math.min(token.pixels, 256), height: 16, backgroundColor: 'var(--color-brand)', borderRadius: 'var(--radius-sm)', minWidth: token.pixels > 0 ? 2 : 0 }} />
              </div>
              <div>
                <CopyButton value={`var(${token.cssVariable})`} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Layout Sizes */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{ fontSize: 'var(--font-size-h5)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-1)' }}>
          Layout Sizes
        </h2>
        <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)', marginBottom: 'var(--spacing-4)' }}>
          Container and max-width values for responsive layouts
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LAYOUT_TOKENS.map((token) => (
            <div key={token.key} style={{ backgroundColor: 'var(--color-card)', borderRadius: 'var(--radius-xl)', padding: 'var(--spacing-4)', border: '1px solid var(--color-card-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-2)' }}>
                <span style={{ fontSize: 'var(--font-size-body)', fontWeight: 600, color: 'var(--color-foreground)' }}>{token.label}</span>
                <span style={{ fontSize: 'var(--font-size-label)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-muted)' }}>{token.pixels}px</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
                <span style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-brand)', flex: 1 }}>{token.cssVariable}</span>
                <CopyButton value={`var(${token.cssVariable})`} size="sm" />
              </div>
              <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-muted)' }}>{token.use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Border Radius */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{ fontSize: 'var(--font-size-h5)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-1)' }}>
          Border Radius
        </h2>
        <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)', marginBottom: 'var(--spacing-4)' }}>
          9 radius values for consistent corner rounding
        </p>
        <div style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-card-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-card-border)' }}>
                  <th style={{ padding: 'var(--spacing-3) var(--spacing-4)', textAlign: 'left', fontSize: 'var(--font-size-caption)', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preview</th>
                  <th style={{ padding: 'var(--spacing-3) var(--spacing-4)', textAlign: 'left', fontSize: 'var(--font-size-caption)', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Token</th>
                  <th style={{ padding: 'var(--spacing-3) var(--spacing-4)', textAlign: 'left', fontSize: 'var(--font-size-caption)', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CSS Variable</th>
                  <th style={{ padding: 'var(--spacing-3) var(--spacing-4)', textAlign: 'left', fontSize: 'var(--font-size-caption)', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Value</th>
                  <th style={{ padding: 'var(--spacing-3) var(--spacing-4)', textAlign: 'center', fontSize: 'var(--font-size-caption)', fontWeight: 600, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Copy</th>
                </tr>
              </thead>
              <tbody>
                {RADIUS_TOKENS.map((token, index) => (
                  <tr key={token.key} style={{ borderBottom: index < RADIUS_TOKENS.length - 1 ? '1px solid var(--color-card-border)' : 'none' }}>
                    <td style={{ padding: 'var(--spacing-3) var(--spacing-4)' }}>
                      <div style={{ width: 40, height: 40, backgroundColor: 'var(--color-brand)', borderRadius: token.key === 'full' ? '9999px' : `${token.pixels}px`, opacity: 0.9 }} />
                    </td>
                    <td style={{ padding: 'var(--spacing-3) var(--spacing-4)', fontSize: 'var(--font-size-body-small)', fontWeight: 500, color: 'var(--color-foreground)' }}>
                      {token.label || token.key}
                    </td>
                    <td style={{ padding: 'var(--spacing-3) var(--spacing-4)', fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-brand)' }}>
                      {token.cssVariable}
                    </td>
                    <td style={{ padding: 'var(--spacing-3) var(--spacing-4)', fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-foreground)' }}>
                      {token.value}
                    </td>
                    <td style={{ padding: 'var(--spacing-3) var(--spacing-4)', textAlign: 'center' }}>
                      <CopyButton value={`var(${token.cssVariable})`} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Duration / Animation */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{ fontSize: 'var(--font-size-h5)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-1)' }}>
          Duration / Animation
        </h2>
        <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)', marginBottom: 'var(--spacing-4)' }}>
          8 timing values for transitions and animations
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DURATION_TOKENS.map((token) => (
            <div key={token.key} style={{ backgroundColor: 'var(--color-card)', borderRadius: 'var(--radius-xl)', padding: 'var(--spacing-4)', border: '1px solid var(--color-card-border)' }}>
              <div style={{ fontSize: 'var(--font-size-h5)', fontWeight: 700, color: 'var(--color-brand)', marginBottom: 'var(--spacing-1)' }}>{token.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
                <span style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-muted)', flex: 1 }}>{token.cssVariable}</span>
                <CopyButton value={`var(${token.cssVariable})`} size="sm" />
              </div>
              <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-muted)' }}>{token.use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Line Heights */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{ fontSize: 'var(--font-size-h5)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-1)' }}>
          Line Heights
        </h2>
        <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)', marginBottom: 'var(--spacing-4)' }}>
          6 line height multipliers for typography
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {LINE_HEIGHT_TOKENS.map((token) => (
            <div key={token.key} style={{ backgroundColor: 'var(--color-card)', borderRadius: 'var(--radius-xl)', padding: 'var(--spacing-4)', border: '1px solid var(--color-card-border)' }}>
              <div style={{ fontSize: 'var(--font-size-h5)', fontWeight: 700, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-1)' }}>{token.value}</div>
              <div style={{ fontSize: 'var(--font-size-label)', fontWeight: 500, color: 'var(--color-brand)', marginBottom: 'var(--spacing-2)', textTransform: 'capitalize' }}>{token.key}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
                <span style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-muted)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{token.cssVariable}</span>
                <CopyButton value={`var(${token.cssVariable})`} size="sm" />
              </div>
              <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-muted)' }}>{token.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Font Weights */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{ fontSize: 'var(--font-size-h5)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-1)' }}>
          Font Weights
        </h2>
        <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)', marginBottom: 'var(--spacing-4)' }}>
          9 font weight values from thin (100) to black (900)
        </p>
        <div style={{ backgroundColor: 'var(--color-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-card-border)', overflow: 'hidden' }}>
          {FONT_WEIGHT_TOKENS.map((token, index) => (
            <div
              key={token.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-4)',
                padding: 'var(--spacing-3) var(--spacing-4)',
                borderBottom: index < FONT_WEIGHT_TOKENS.length - 1 ? '1px solid var(--color-card-border)' : 'none',
              }}
            >
              <span style={{ width: 80, fontSize: 'var(--font-size-label)', fontWeight: 600, color: 'var(--color-foreground)', textTransform: 'capitalize' }}>{token.key}</span>
              <span style={{ width: 40, fontSize: 'var(--font-size-label)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-muted)' }}>{token.value}</span>
              <span style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-brand)', flex: 1 }}>{token.cssVariable}</span>
              <span style={{ fontSize: 'var(--font-size-body)', fontWeight: parseInt(token.value), color: 'var(--color-foreground)', marginRight: 'var(--spacing-4)' }}>
                The quick brown fox
              </span>
              <CopyButton value={`var(${token.cssVariable})`} size="sm" />
            </div>
          ))}
        </div>
      </section>

      {/* 8px Grid Info */}
      <div style={{ backgroundColor: 'var(--color-card)', borderRadius: 'var(--radius-xl)', padding: 'var(--spacing-6)', border: '1px solid var(--color-card-border)' }}>
        <h3 style={{ fontSize: 'var(--font-size-h6)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-4)' }}>
          8px Grid System
        </h3>
        <p style={{ fontSize: 'var(--font-size-body-small)', color: 'var(--color-muted)', marginBottom: 'var(--spacing-4)' }}>
          All spacing values are multiples of 4px, with 8px as the base unit. This ensures visual consistency and alignment across all elements.
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--spacing-1)', padding: 'var(--spacing-4)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--radius-lg)' }}>
          {[4, 8, 12, 16, 24, 32, 48, 64].map((px) => (
            <div key={px} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              <div style={{ width: 32, height: px, backgroundColor: 'var(--color-brand)', borderRadius: 'var(--radius-sm)' }} />
              <span style={{ fontSize: 'var(--font-size-caption)', fontFamily: 'ui-monospace, monospace', color: 'var(--color-muted)' }}>{px}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Pages */}
      <div style={{ marginTop: 'var(--spacing-8)' }}>
        <h3 style={{ fontSize: 'var(--font-size-body)', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: 'var(--spacing-4)' }}>
          Related Pages
        </h3>
        <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap' }}>
          <Link
            href="/tokens/primitives"
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
            Primitives Overview
          </Link>
          <Link
            href="/tokens/typography"
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
            Typography
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
            Semantic Tokens
          </Link>
        </div>
      </div>
    </div>
  );
}
