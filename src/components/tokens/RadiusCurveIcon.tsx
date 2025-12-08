'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export interface RadiusValue {
  /** Scale key (e.g., "sm", "md", "lg", "full") */
  key: string;
  /** CSS variable name */
  cssVariable: string;
  /** Value in rem or pixels */
  value: string;
  /** Value in pixels (for visualization) */
  pixels: number;
  /** Display label (optional override) */
  label?: string;
}

export interface RadiusCurveIconProps {
  /** Radius value data */
  radius: RadiusValue;
  /** Size of the icon */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Show the value label below */
  showLabel?: boolean;
  /** Show copy button on hover */
  showCopy?: boolean;
  /** Color variant */
  variant?: 'brand' | 'neutral' | 'filled';
  /** Which corner to visualize */
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'all';
  /** Click handler */
  onClick?: (radius: RadiusValue) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * RadiusCurveIcon - Visual representation of a border radius value
 * 
 * Displays a corner curve icon that accurately represents the radius value,
 * with labels and copy functionality.
 */
export function RadiusCurveIcon({
  radius,
  size = 'md',
  showLabel = true,
  showCopy = true,
  variant = 'brand',
  corner = 'top-left',
  onClick,
  className = '',
}: RadiusCurveIconProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Size configurations
  const sizeConfig = {
    sm: { box: 32, stroke: 2, labelSize: 'var(--font-size-caption)' },
    md: { box: 48, stroke: 2, labelSize: 'var(--font-size-label)' },
    lg: { box: 64, stroke: 3, labelSize: 'var(--font-size-body-small)' },
    xl: { box: 80, stroke: 3, labelSize: 'var(--font-size-body)' },
  };

  // Color configurations
  const colorConfig = {
    brand: {
      stroke: 'var(--color-brand)',
      fill: 'transparent',
      background: 'var(--color-background)',
    },
    neutral: {
      stroke: 'var(--color-foreground)',
      fill: 'transparent',
      background: 'var(--color-background)',
    },
    filled: {
      stroke: 'var(--color-brand)',
      fill: 'var(--color-brand)',
      background: 'transparent',
    },
  };

  const config = sizeConfig[size];
  const colors = colorConfig[variant];

  // Calculate the visual radius (capped at half the box size)
  const visualRadius = radius.key === 'full' 
    ? config.box / 2 
    : Math.min(radius.pixels, config.box / 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`var(${radius.cssVariable})`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Generate SVG path for the corner
  const generateCornerPath = () => {
    const r = visualRadius;
    const s = config.box;
    
    if (corner === 'all') {
      // Full rounded square
      return `M ${r} 0 
              L ${s - r} 0 
              Q ${s} 0 ${s} ${r} 
              L ${s} ${s - r} 
              Q ${s} ${s} ${s - r} ${s} 
              L ${r} ${s} 
              Q 0 ${s} 0 ${s - r} 
              L 0 ${r} 
              Q 0 0 ${r} 0 Z`;
    }

    // Single corner paths
    switch (corner) {
      case 'top-left':
        return `M ${r} 0 L ${s} 0 L ${s} ${s} L 0 ${s} L 0 ${r} Q 0 0 ${r} 0 Z`;
      case 'top-right':
        return `M 0 0 L ${s - r} 0 Q ${s} 0 ${s} ${r} L ${s} ${s} L 0 ${s} L 0 0 Z`;
      case 'bottom-left':
        return `M 0 0 L ${s} 0 L ${s} ${s} L ${r} ${s} Q 0 ${s} 0 ${s - r} L 0 0 Z`;
      case 'bottom-right':
        return `M 0 0 L ${s} 0 L ${s} ${s - r} Q ${s} ${s} ${s - r} ${s} L 0 ${s} L 0 0 Z`;
      default:
        return '';
    }
  };

  return (
    <div
      className={`radius-curve-icon ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--spacing-2)',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick ? () => onClick(radius) : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SVG Icon */}
      <div
        style={{
          position: 'relative',
          width: config.box,
          height: config.box,
        }}
      >
        <svg
          width={config.box}
          height={config.box}
          viewBox={`0 0 ${config.box} ${config.box}`}
          style={{
            transition: 'all var(--duration-150) var(--ease-out)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          {/* Background shape */}
          <path
            d={generateCornerPath()}
            fill={colors.background}
            stroke={colors.stroke}
            strokeWidth={config.stroke}
            style={{
              opacity: isHovered ? 1 : 0.8,
              transition: 'opacity var(--duration-150) var(--ease-out)',
            }}
          />
          
          {/* Highlight the curved corner */}
          {corner !== 'all' && (
            <path
              d={(() => {
                const r = visualRadius;
                const s = config.box;
                switch (corner) {
                  case 'top-left':
                    return `M ${r} 0 Q 0 0 0 ${r}`;
                  case 'top-right':
                    return `M ${s - r} 0 Q ${s} 0 ${s} ${r}`;
                  case 'bottom-left':
                    return `M 0 ${s - r} Q 0 ${s} ${r} ${s}`;
                  case 'bottom-right':
                    return `M ${s} ${s - r} Q ${s} ${s} ${s - r} ${s}`;
                  default:
                    return '';
                }
              })()}
              fill="none"
              stroke={colors.stroke}
              strokeWidth={config.stroke + 1}
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Copy Button Overlay */}
        {showCopy && isHovered && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 28,
              height: 28,
              borderRadius: 'var(--radius-full)',
              border: 'none',
              backgroundColor: copied ? 'var(--color-success)' : 'rgba(255,255,255,0.95)',
              color: copied ? 'white' : 'var(--color-foreground)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-md)',
              transition: 'all var(--duration-100) var(--ease-out)',
            }}
            title={`Copy var(${radius.cssVariable})`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        )}
      </div>

      {/* Labels */}
      {showLabel && (
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: config.labelSize,
              fontWeight: 600,
              color: 'var(--color-foreground)',
            }}
          >
            {radius.label || radius.key}
          </div>
          <div
            style={{
              fontSize: 'var(--font-size-caption)',
              fontFamily: 'ui-monospace, monospace',
              color: 'var(--color-muted)',
            }}
          >
            {radius.value}
          </div>
        </div>
      )}
    </div>
  );
}

export interface RadiusScaleProps {
  /** Array of radius values */
  radii: RadiusValue[];
  /** Size of the icons */
  iconSize?: 'sm' | 'md' | 'lg' | 'xl';
  /** Color variant */
  variant?: 'brand' | 'neutral' | 'filled';
  /** Additional CSS classes */
  className?: string;
}

/**
 * RadiusScale - Display a complete border radius scale
 */
export function RadiusScale({
  radii,
  iconSize = 'md',
  variant = 'brand',
  className = '',
}: RadiusScaleProps) {
  return (
    <div
      className={`radius-scale ${className}`}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--spacing-6)',
        padding: 'var(--spacing-4)',
        backgroundColor: 'var(--color-card)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-card-border)',
      }}
    >
      {radii.map(radius => (
        <RadiusCurveIcon
          key={radius.key}
          radius={radius}
          size={iconSize}
          variant={variant}
          corner="all"
        />
      ))}
    </div>
  );
}

export interface RadiusComparisonProps {
  /** Radius value to compare */
  radius: RadiusValue;
  /** Size of the comparison boxes */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

/**
 * RadiusComparison - Shows all four corners with the same radius
 * Useful for demonstrating how a radius looks on different corners
 */
export function RadiusComparison({
  radius,
  size = 'md',
  className = '',
}: RadiusComparisonProps) {
  const sizeConfig = {
    sm: 48,
    md: 64,
    lg: 80,
  };

  const boxSize = sizeConfig[size];
  const visualRadius = radius.key === 'full' ? boxSize / 2 : Math.min(radius.pixels, boxSize / 2);

  return (
    <div
      className={`radius-comparison ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--spacing-3)',
      }}
    >
      <div
        style={{
          width: boxSize,
          height: boxSize,
          backgroundColor: 'var(--color-brand)',
          borderRadius: visualRadius,
          opacity: 0.8,
        }}
      />
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: 'var(--font-size-label)',
            fontWeight: 600,
            color: 'var(--color-foreground)',
          }}
        >
          {radius.label || radius.key}
        </div>
        <div
          style={{
            fontSize: 'var(--font-size-caption)',
            fontFamily: 'ui-monospace, monospace',
            color: 'var(--color-muted)',
          }}
        >
          {radius.value}
        </div>
      </div>
    </div>
  );
}

export default RadiusCurveIcon;
