'use client';

import { useState } from 'react';
import { Copy, Check, Link } from 'lucide-react';
import { ParsedToken, TokenLayer, TOKEN_LAYER_INFO } from '@/lib/types';

export interface TokenChipProps {
  /** The token to display */
  token: ParsedToken;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show the CSS variable name */
  showVariable?: boolean;
  /** Show the resolved value */
  showValue?: boolean;
  /** Show the layer badge */
  showLayer?: boolean;
  /** Show copy button */
  showCopy?: boolean;
  /** Click handler - if provided, chip becomes interactive */
  onClick?: (token: ParsedToken) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * TokenChip - Displays a token with its value, color swatch (for colors), and metadata
 * 
 * This is the foundational component for displaying tokens throughout the design system UI.
 * It supports color swatches for color tokens, copy-to-clipboard, and layer badges.
 */
export function TokenChip({
  token,
  size = 'md',
  showVariable = true,
  showValue = true,
  showLayer = false,
  showCopy = true,
  onClick,
  className = '',
}: TokenChipProps) {
  const [copied, setCopied] = useState<'variable' | 'value' | null>(null);

  const isColor = token.type === 'color';
  const isInteractive = !!onClick;
  const layerInfo = TOKEN_LAYER_INFO[token.layer];

  // Size-based styles
  const sizeStyles = {
    sm: {
      padding: 'var(--spacing-1-5) var(--spacing-2)',
      fontSize: 'var(--font-size-caption)',
      swatchSize: '16px',
      gap: 'var(--spacing-1-5)',
    },
    md: {
      padding: 'var(--spacing-2) var(--spacing-3)',
      fontSize: 'var(--font-size-label)',
      swatchSize: '20px',
      gap: 'var(--spacing-2)',
    },
    lg: {
      padding: 'var(--spacing-2-5) var(--spacing-4)',
      fontSize: 'var(--font-size-body-small)',
      swatchSize: '24px',
      gap: 'var(--spacing-2-5)',
    },
  };

  const styles = sizeStyles[size];

  const handleCopy = async (value: string, type: 'variable' | 'value') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatValue = (value: string | number): string => {
    if (typeof value === 'number') {
      return value.toString();
    }
    // Truncate long strings
    if (value.length > 20) {
      return value.slice(0, 17) + '...';
    }
    return value;
  };

  return (
    <div
      className={`token-chip group ${isInteractive ? 'cursor-pointer' : ''} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: styles.gap,
        padding: styles.padding,
        backgroundColor: 'var(--color-card)',
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius-lg)',
        fontSize: styles.fontSize,
        transition: 'all var(--duration-150) var(--ease-out)',
        ...(isInteractive && {
          cursor: 'pointer',
        }),
      }}
      onClick={isInteractive ? () => onClick(token) : undefined}
      onMouseEnter={(e) => {
        if (isInteractive) {
          e.currentTarget.style.borderColor = 'var(--color-brand)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-card-border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Color Swatch (for color tokens only) */}
      {isColor && (
        <div
          className="token-chip__swatch"
          style={{
            width: styles.swatchSize,
            height: styles.swatchSize,
            borderRadius: 'var(--radius-sm)',
            backgroundColor: token.value as string,
            border: '1px solid rgba(0,0,0,0.1)',
            flexShrink: 0,
          }}
          title={token.value as string}
        />
      )}

      {/* Token Info */}
      <div className="token-chip__info" style={{ minWidth: 0, flex: 1 }}>
        {/* Token Name / CSS Variable */}
        {showVariable && (
          <div
            className="token-chip__variable"
            style={{
              fontFamily: 'ui-monospace, monospace',
              color: 'var(--color-foreground)',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={token.cssVariable}
          >
            {token.cssVariable}
          </div>
        )}

        {/* Resolved Value */}
        {showValue && (
          <div
            className="token-chip__value"
            style={{
              fontFamily: 'ui-monospace, monospace',
              color: 'var(--color-muted)',
              fontSize: size === 'sm' ? 'var(--font-size-caption)' : 'var(--font-size-label)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={String(token.value)}
          >
            {formatValue(token.value)}
          </div>
        )}
      </div>

      {/* Layer Badge */}
      {showLayer && (
        <span
          className="token-chip__layer"
          style={{
            padding: 'var(--spacing-0-5) var(--spacing-1-5)',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--font-size-caption)',
            fontWeight: 500,
            backgroundColor: `${layerInfo.color}20`,
            color: layerInfo.color,
            whiteSpace: 'nowrap',
          }}
        >
          {layerInfo.displayName}
        </span>
      )}

      {/* Reference Indicator */}
      {token.reference && (
        <Link
          className="token-chip__reference-icon"
          style={{
            width: 14,
            height: 14,
            color: 'var(--color-muted)',
            flexShrink: 0,
          }}
        />
      )}

      {/* Copy Buttons */}
      {showCopy && (
        <div
          className="token-chip__actions"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-1)',
            opacity: 0,
            transition: 'opacity var(--duration-150) var(--ease-out)',
          }}
        >
          {/* Copy Variable */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy(`var(${token.cssVariable})`, 'variable');
            }}
            title="Copy CSS variable"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 24,
              height: 24,
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: copied === 'variable' ? 'var(--color-success)' : 'transparent',
              color: copied === 'variable' ? 'white' : 'var(--color-muted)',
              cursor: 'pointer',
              transition: 'all var(--duration-150) var(--ease-out)',
            }}
            onMouseEnter={(e) => {
              if (copied !== 'variable') {
                e.currentTarget.style.backgroundColor = 'var(--color-background)';
              }
            }}
            onMouseLeave={(e) => {
              if (copied !== 'variable') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {copied === 'variable' ? <Check size={14} /> : <Copy size={14} />}
          </button>

          {/* Copy Value (for colors) */}
          {isColor && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(token.value as string, 'value');
              }}
              title="Copy hex value"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: copied === 'value' ? 'var(--color-success)' : 'transparent',
                color: copied === 'value' ? 'white' : 'var(--color-muted)',
                cursor: 'pointer',
                transition: 'all var(--duration-150) var(--ease-out)',
              }}
              onMouseEnter={(e) => {
                if (copied !== 'value') {
                  e.currentTarget.style.backgroundColor = 'var(--color-background)';
                }
              }}
              onMouseLeave={(e) => {
                if (copied !== 'value') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {copied === 'value' ? <Check size={14} /> : <Copy size={14} />}
            </button>
          )}
        </div>
      )}

      {/* CSS for hover state on copy buttons */}
      <style jsx>{`
        .token-chip:hover .token-chip__actions {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default TokenChip;
