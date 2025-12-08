'use client';

import { useState } from 'react';
import { Copy, Check, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { ParsedToken, TokenLayer, TOKEN_LAYER_INFO, isTokenReference } from '@/lib/types';

export interface ColorSwatchProps {
  /** Color hex value */
  color: string;
  /** Shade name (e.g., "400", "500") */
  shade: string;
  /** Color family name (e.g., "Emerald", "Blue") */
  familyName?: string;
  /** CSS variable name */
  cssVariable?: string;
  /** Token layer */
  layer?: TokenLayer;
  /** Reference to source token (if semantic/component) */
  reference?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Shape variant */
  shape?: 'square' | 'rounded' | 'circle';
  /** Show shade label */
  showLabel?: boolean;
  /** Show hex value */
  showHex?: boolean;
  /** Show copy button on hover */
  showCopy?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Determine if a color is "light" (needs dark text for contrast)
 */
function isLightColor(hex: string): boolean {
  // Remove # if present
  const color = hex.replace('#', '');
  
  // Parse RGB
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);
  
  // Calculate relative luminance (simplified)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.6;
}

/**
 * ColorSwatch - A single color swatch with metadata display
 * 
 * Used to display individual colors from palettes with support for:
 * - Copy to clipboard (hex or CSS variable)
 * - Reference indicators for semantic tokens
 * - Multiple sizes and shapes
 * - Automatic text contrast
 */
export function ColorSwatch({
  color,
  shade,
  familyName,
  cssVariable,
  layer,
  reference,
  size = 'md',
  shape = 'rounded',
  showLabel = true,
  showHex = true,
  showCopy = true,
  onClick,
  className = '',
}: ColorSwatchProps) {
  const [copied, setCopied] = useState<'hex' | 'variable' | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isLight = isLightColor(color);
  const textColor = isLight ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)';
  const mutedColor = isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.6)';
  const layerInfo = layer ? TOKEN_LAYER_INFO[layer] : null;

  // Size configurations
  const sizeConfig = {
    sm: { width: 48, height: 48, labelSize: 'var(--font-size-caption)', hexSize: 'var(--font-size-caption)' },
    md: { width: 64, height: 64, labelSize: 'var(--font-size-label)', hexSize: 'var(--font-size-caption)' },
    lg: { width: 80, height: 80, labelSize: 'var(--font-size-body-small)', hexSize: 'var(--font-size-label)' },
    xl: { width: 96, height: 96, labelSize: 'var(--font-size-body)', hexSize: 'var(--font-size-body-small)' },
  };

  // Shape configurations
  const shapeConfig = {
    square: 'var(--radius-none)',
    rounded: 'var(--radius-lg)',
    circle: 'var(--radius-full)',
  };

  const config = sizeConfig[size];
  const borderRadius = shapeConfig[shape];

  const handleCopy = async (value: string, type: 'hex' | 'variable') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      className={`color-swatch group ${className}`}
      style={{
        position: 'relative',
        width: config.width,
        cursor: onClick ? 'pointer' : 'default',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Main Swatch */}
      <div
        className="color-swatch__color"
        style={{
          width: config.width,
          height: config.height,
          backgroundColor: color,
          borderRadius,
          border: '1px solid rgba(0,0,0,0.08)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          transition: 'all var(--duration-150) var(--ease-out)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          boxShadow: isHovered ? 'var(--shadow-md)' : 'none',
        }}
      >
        {/* Label (shade or name) */}
        {showLabel && (
          <span
            style={{
              fontSize: config.labelSize,
              fontWeight: 600,
              color: textColor,
              transition: 'opacity var(--duration-150) var(--ease-out)',
              opacity: isHovered && showCopy ? 0 : 1,
            }}
          >
            {shade}
          </span>
        )}

        {/* Hex Value */}
        {showHex && (
          <span
            style={{
              fontSize: config.hexSize,
              fontFamily: 'ui-monospace, monospace',
              color: mutedColor,
              textTransform: 'uppercase',
              transition: 'opacity var(--duration-150) var(--ease-out)',
              opacity: isHovered && showCopy ? 0 : 1,
            }}
          >
            {color.slice(1, 7)}
          </span>
        )}

        {/* Reference Indicator */}
        {reference && (
          <div
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              width: 16,
              height: 16,
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title={`References: ${reference}`}
          >
            <LinkIcon size={10} style={{ color: layerInfo?.color || 'var(--color-muted)' }} />
          </div>
        )}

        {/* Copy Overlay */}
        {showCopy && (
          <div
            className="color-swatch__copy-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--spacing-1)',
              backgroundColor: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(2px)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity var(--duration-150) var(--ease-out)',
              borderRadius,
            }}
          >
            {/* Copy Hex */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(color, 'hex');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-1)',
                padding: 'var(--spacing-1) var(--spacing-2)',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: copied === 'hex' ? 'var(--color-success)' : 'rgba(255,255,255,0.95)',
                color: copied === 'hex' ? 'white' : 'var(--color-foreground)',
                fontSize: 'var(--font-size-caption)',
                fontFamily: 'ui-monospace, monospace',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all var(--duration-100) var(--ease-out)',
              }}
            >
              {copied === 'hex' ? <Check size={12} /> : <Copy size={12} />}
              {color.toUpperCase()}
            </button>

            {/* Copy CSS Variable */}
            {cssVariable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(`var(${cssVariable})`, 'variable');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-1)',
                  padding: 'var(--spacing-1) var(--spacing-2)',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: copied === 'variable' ? 'var(--color-success)' : 'rgba(255,255,255,0.95)',
                  color: copied === 'variable' ? 'white' : 'var(--color-foreground)',
                  fontSize: 'var(--font-size-caption)',
                  fontFamily: 'ui-monospace, monospace',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all var(--duration-100) var(--ease-out)',
                  maxWidth: config.width - 8,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={cssVariable}
              >
                {copied === 'variable' ? <Check size={12} /> : <Copy size={12} />}
                var
              </button>
            )}
          </div>
        )}
      </div>

      {/* Family Name (optional, shown below swatch) */}
      {familyName && (
        <div
          style={{
            marginTop: 'var(--spacing-1)',
            textAlign: 'center',
            fontSize: 'var(--font-size-caption)',
            color: 'var(--color-muted)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {familyName}
        </div>
      )}
    </div>
  );
}

export default ColorSwatch;
