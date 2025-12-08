'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export interface SpacingValue {
  /** Scale key (e.g., "0", "1", "2", "4", "8") */
  key: string;
  /** CSS variable name */
  cssVariable: string;
  /** Value in rem */
  rem: string;
  /** Value in pixels (calculated) */
  pixels: number;
  /** Display label (optional override) */
  label?: string;
}

export interface SpacingVisualProps {
  /** Spacing value data */
  spacing: SpacingValue;
  /** Maximum width for the visual bar (in pixels) */
  maxBarWidth?: number;
  /** Maximum pixel value for scaling (for consistent bar widths) */
  maxPixels?: number;
  /** Show the visual bar */
  showBar?: boolean;
  /** Show copy button */
  showCopy?: boolean;
  /** Orientation of the bar */
  orientation?: 'horizontal' | 'vertical';
  /** Color variant for the bar */
  variant?: 'brand' | 'neutral' | 'semantic';
  /** Click handler */
  onClick?: (spacing: SpacingValue) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * SpacingVisual - Visual representation of a spacing token
 * 
 * Displays a spacing value with:
 * - Visual bar showing relative size
 * - Scale key (e.g., "4", "8")
 * - Rem and pixel values
 * - Copy functionality
 */
export function SpacingVisual({
  spacing,
  maxBarWidth = 256,
  maxPixels = 256,
  showBar = true,
  showCopy = true,
  orientation = 'horizontal',
  variant = 'brand',
  onClick,
  className = '',
}: SpacingVisualProps) {
  const [copied, setCopied] = useState<'variable' | 'rem' | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate bar width based on pixel value
  const barWidth = Math.min((spacing.pixels / maxPixels) * maxBarWidth, maxBarWidth);
  const minBarWidth = spacing.pixels > 0 ? 4 : 0; // Minimum visible width
  const actualBarWidth = Math.max(barWidth, minBarWidth);

  // Color variants
  const barColors = {
    brand: 'var(--color-brand)',
    neutral: 'var(--color-muted)',
    semantic: 'var(--color-secondary)',
  };

  const handleCopy = async (value: string, type: 'variable' | 'rem') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (orientation === 'vertical') {
    return (
      <div
        className={`spacing-visual spacing-visual--vertical ${className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--spacing-2)',
          cursor: onClick ? 'pointer' : 'default',
        }}
        onClick={onClick ? () => onClick(spacing) : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Vertical Bar */}
        {showBar && (
          <div
            style={{
              width: 32,
              height: actualBarWidth,
              backgroundColor: barColors[variant],
              borderRadius: 'var(--radius-sm)',
              opacity: isHovered ? 1 : 0.8,
              transition: 'all var(--duration-150) var(--ease-out)',
            }}
          />
        )}

        {/* Labels */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: 'var(--font-size-label)',
              fontWeight: 600,
              color: 'var(--color-foreground)',
            }}
          >
            {spacing.label || spacing.key}
          </div>
          <div
            style={{
              fontSize: 'var(--font-size-caption)',
              fontFamily: 'ui-monospace, monospace',
              color: 'var(--color-muted)',
            }}
          >
            {spacing.pixels}px
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`spacing-visual spacing-visual--horizontal group ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '60px 1fr 80px 80px auto',
        alignItems: 'center',
        gap: 'var(--spacing-4)',
        padding: 'var(--spacing-2-5) var(--spacing-4)',
        backgroundColor: 'var(--color-card)',
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius-lg)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all var(--duration-150) var(--ease-out)',
      }}
      onClick={onClick ? () => onClick(spacing) : undefined}
      onMouseEnter={(e) => {
        setIsHovered(true);
        if (onClick) {
          e.currentTarget.style.borderColor = 'var(--color-brand)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        e.currentTarget.style.borderColor = 'var(--color-card-border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Scale Key */}
      <div
        style={{
          fontSize: 'var(--font-size-body)',
          fontWeight: 600,
          color: 'var(--color-foreground)',
        }}
      >
        {spacing.label || spacing.key}
      </div>

      {/* Visual Bar */}
      {showBar && (
        <div
          style={{
            position: 'relative',
            height: 24,
            backgroundColor: 'var(--color-background)',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: actualBarWidth,
              backgroundColor: barColors[variant],
              borderRadius: 'var(--radius-sm)',
              opacity: isHovered ? 1 : 0.8,
              transition: 'all var(--duration-200) var(--ease-out)',
            }}
          />
          {/* Show actual width marker for small values */}
          {spacing.pixels > 0 && spacing.pixels < 4 && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: actualBarWidth + 4,
                transform: 'translateY(-50%)',
                fontSize: 'var(--font-size-caption)',
                color: 'var(--color-muted)',
              }}
            >
              ←
            </div>
          )}
        </div>
      )}

      {/* Rem Value */}
      <div
        style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: 'var(--font-size-label)',
          color: 'var(--color-foreground)',
          textAlign: 'right',
        }}
      >
        {spacing.rem}
      </div>

      {/* Pixel Value */}
      <div
        style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: 'var(--font-size-label)',
          color: 'var(--color-muted)',
          textAlign: 'right',
        }}
      >
        {spacing.pixels}px
      </div>

      {/* Copy Actions */}
      {showCopy && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-1)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity var(--duration-150) var(--ease-out)',
          }}
        >
          {/* Copy CSS Variable */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy(`var(${spacing.cssVariable})`, 'variable');
            }}
            title={`Copy var(${spacing.cssVariable})`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: copied === 'variable' ? 'var(--color-success)' : 'var(--color-background)',
              color: copied === 'variable' ? 'white' : 'var(--color-muted)',
              cursor: 'pointer',
              transition: 'all var(--duration-100) var(--ease-out)',
            }}
          >
            {copied === 'variable' ? <Check size={14} /> : <Copy size={14} />}
          </button>

          {/* Copy Rem Value */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy(spacing.rem, 'rem');
            }}
            title={`Copy ${spacing.rem}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: copied === 'rem' ? 'var(--color-success)' : 'var(--color-background)',
              color: copied === 'rem' ? 'white' : 'var(--color-muted)',
              cursor: 'pointer',
              transition: 'all var(--duration-100) var(--ease-out)',
            }}
          >
            {copied === 'rem' ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}

export interface SpacingScaleProps {
  /** Array of spacing values */
  spacings: SpacingValue[];
  /** View mode */
  viewMode?: 'horizontal' | 'vertical' | 'grid';
  /** Color variant */
  variant?: 'brand' | 'neutral' | 'semantic';
  /** Maximum pixels for bar scaling */
  maxPixels?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * SpacingScale - Display a complete spacing scale
 */
export function SpacingScale({
  spacings,
  viewMode = 'horizontal',
  variant = 'brand',
  maxPixels,
  className = '',
}: SpacingScaleProps) {
  // Calculate max pixels from data if not provided
  const calculatedMax = maxPixels || Math.max(...spacings.map(s => s.pixels), 256);

  if (viewMode === 'grid') {
    return (
      <div
        className={`spacing-scale spacing-scale--grid ${className}`}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
          gap: 'var(--spacing-4)',
        }}
      >
        {spacings.map(spacing => (
          <SpacingVisual
            key={spacing.key}
            spacing={spacing}
            orientation="vertical"
            variant={variant}
            maxPixels={calculatedMax}
            maxBarWidth={64}
            showCopy={false}
          />
        ))}
      </div>
    );
  }

  if (viewMode === 'vertical') {
    return (
      <div
        className={`spacing-scale spacing-scale--vertical ${className}`}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 'var(--spacing-2)',
          padding: 'var(--spacing-4)',
          backgroundColor: 'var(--color-card)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-card-border)',
        }}
      >
        {spacings.map(spacing => (
          <SpacingVisual
            key={spacing.key}
            spacing={spacing}
            orientation="vertical"
            variant={variant}
            maxPixels={calculatedMax}
            maxBarWidth={128}
            showCopy={false}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`spacing-scale spacing-scale--horizontal ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-2)',
      }}
    >
      {spacings.map(spacing => (
        <SpacingVisual
          key={spacing.key}
          spacing={spacing}
          orientation="horizontal"
          variant={variant}
          maxPixels={calculatedMax}
        />
      ))}
    </div>
  );
}

export default SpacingVisual;
