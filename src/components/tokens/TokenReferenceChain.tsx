'use client';

import { useState } from 'react';
import { ChevronRight, Copy, Check, ExternalLink } from 'lucide-react';
import { TokenLayer, TOKEN_LAYER_INFO } from '@/lib/types';

export interface TokenReferenceNode {
  /** Token layer */
  layer: TokenLayer;
  /** Display name */
  name: string;
  /** CSS variable */
  cssVariable: string;
  /** Value (resolved or reference) */
  value: string;
  /** Whether this is a reference to another token */
  isReference: boolean;
  /** Color hex (for color tokens) */
  color?: string;
}

export interface TokenReferenceChainProps {
  /** Array of nodes in the reference chain (from top layer to primitive) */
  chain: TokenReferenceNode[];
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Show layer badges */
  showLayers?: boolean;
  /** Show copy buttons */
  showCopy?: boolean;
  /** Interactive: clicking a node navigates to that token */
  onNodeClick?: (node: TokenReferenceNode, index: number) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * TokenReferenceChain - Displays the full reference chain from a token to its primitive value
 * 
 * Shows how tokens reference each other across layers:
 * Greenshift → Semantic → Primitives → Value
 */
export function TokenReferenceChain({
  chain,
  size = 'md',
  direction = 'horizontal',
  showLayers = true,
  showCopy = true,
  onNodeClick,
  className = '',
}: TokenReferenceChainProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Size configurations
  const sizeConfig = {
    sm: {
      fontSize: 'var(--font-size-caption)',
      padding: 'var(--spacing-1) var(--spacing-2)',
      gap: 'var(--spacing-1)',
      arrowSize: 12,
      swatchSize: 12,
    },
    md: {
      fontSize: 'var(--font-size-label)',
      padding: 'var(--spacing-1-5) var(--spacing-2-5)',
      gap: 'var(--spacing-2)',
      arrowSize: 14,
      swatchSize: 16,
    },
    lg: {
      fontSize: 'var(--font-size-body-small)',
      padding: 'var(--spacing-2) var(--spacing-3)',
      gap: 'var(--spacing-2-5)',
      arrowSize: 16,
      swatchSize: 20,
    },
  };

  const config = sizeConfig[size];

  const handleCopy = async (cssVariable: string, index: number) => {
    try {
      await navigator.clipboard.writeText(`var(${cssVariable})`);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      className={`token-reference-chain ${className}`}
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        alignItems: direction === 'horizontal' ? 'center' : 'flex-start',
        gap: config.gap,
        flexWrap: 'wrap',
      }}
    >
      {chain.map((node, index) => {
        const layerInfo = TOKEN_LAYER_INFO[node.layer];
        const isLast = index === chain.length - 1;
        const isInteractive = !!onNodeClick;

        return (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: config.gap,
            }}
          >
            {/* Node */}
            <div
              className="token-reference-chain__node group"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: config.gap,
                padding: config.padding,
                backgroundColor: 'var(--color-card)',
                border: `1px solid ${layerInfo.color}40`,
                borderRadius: 'var(--radius-lg)',
                fontSize: config.fontSize,
                cursor: isInteractive ? 'pointer' : 'default',
                transition: 'all var(--duration-150) var(--ease-out)',
              }}
              onClick={isInteractive ? () => onNodeClick(node, index) : undefined}
              onMouseEnter={(e) => {
                if (isInteractive) {
                  e.currentTarget.style.borderColor = layerInfo.color;
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${layerInfo.color}40`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${layerInfo.color}40`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Color Swatch (for color tokens) */}
              {node.color && (
                <div
                  style={{
                    width: config.swatchSize,
                    height: config.swatchSize,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: node.color,
                    border: '1px solid rgba(0,0,0,0.1)',
                    flexShrink: 0,
                  }}
                />
              )}

              {/* Layer Badge */}
              {showLayers && (
                <span
                  style={{
                    padding: 'var(--spacing-0-5) var(--spacing-1-5)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--font-size-caption)',
                    fontWeight: 600,
                    backgroundColor: `${layerInfo.color}20`,
                    color: layerInfo.color,
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}
                >
                  {layerInfo.shortName || layerInfo.displayName.slice(0, 3)}
                </span>
              )}

              {/* Token Name */}
              <span
                style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontWeight: 500,
                  color: 'var(--color-foreground)',
                  whiteSpace: 'nowrap',
                }}
                title={node.cssVariable}
              >
                {node.name}
              </span>

              {/* Value (only for last node / primitive) */}
              {isLast && !node.isReference && (
                <span
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    color: 'var(--color-muted)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {node.value}
                </span>
              )}

              {/* Copy Button */}
              {showCopy && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(node.cssVariable, index);
                  }}
                  title={`Copy var(${node.cssVariable})`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 20,
                    height: 20,
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    backgroundColor: copiedIndex === index ? 'var(--color-success)' : 'transparent',
                    color: copiedIndex === index ? 'white' : 'var(--color-muted)',
                    cursor: 'pointer',
                    opacity: 0,
                    transition: 'all var(--duration-100) var(--ease-out)',
                  }}
                  className="copy-btn"
                >
                  {copiedIndex === index ? <Check size={12} /> : <Copy size={12} />}
                </button>
              )}
            </div>

            {/* Arrow (except for last node) */}
            {!isLast && (
              <ChevronRight
                size={config.arrowSize}
                style={{
                  color: 'var(--color-muted)',
                  flexShrink: 0,
                  transform: direction === 'vertical' ? 'rotate(90deg)' : 'none',
                }}
              />
            )}
          </div>
        );
      })}

      {/* Hover styles for copy button */}
      <style jsx>{`
        .token-reference-chain__node:hover .copy-btn {
          opacity: 1;
        }
        .token-reference-chain__node:hover .copy-btn:hover {
          background-color: var(--color-background);
        }
      `}</style>
    </div>
  );
}

/**
 * Compact version for inline display
 */
export interface TokenReferenceInlineProps {
  /** Source token CSS variable */
  from: string;
  /** Source layer */
  fromLayer: TokenLayer;
  /** Target token CSS variable */
  to: string;
  /** Target layer */
  toLayer: TokenLayer;
  /** Final resolved value */
  resolvedValue?: string;
  /** Color (for color tokens) */
  color?: string;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Additional CSS classes */
  className?: string;
}

/**
 * TokenReferenceInline - Compact inline reference indicator
 * Shows "token → referenced-token → value" in a single line
 */
export function TokenReferenceInline({
  from,
  fromLayer,
  to,
  toLayer,
  resolvedValue,
  color,
  size = 'sm',
  className = '',
}: TokenReferenceInlineProps) {
  const [copied, setCopied] = useState(false);
  const fromLayerInfo = TOKEN_LAYER_INFO[fromLayer];
  const toLayerInfo = TOKEN_LAYER_INFO[toLayer];

  const fontSize = size === 'sm' ? 'var(--font-size-caption)' : 'var(--font-size-label)';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`var(${from})`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      className={`token-reference-inline ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--spacing-1)',
        fontSize,
        fontFamily: 'ui-monospace, monospace',
        color: 'var(--color-muted)',
      }}
    >
      {/* Color swatch */}
      {color && (
        <span
          style={{
            width: size === 'sm' ? 10 : 12,
            height: size === 'sm' ? 10 : 12,
            borderRadius: 'var(--radius-sm)',
            backgroundColor: color,
            border: '1px solid rgba(0,0,0,0.1)',
            flexShrink: 0,
          }}
        />
      )}

      {/* From variable */}
      <span style={{ color: fromLayerInfo.color }}>{from.split('--').pop()}</span>

      <ChevronRight size={10} style={{ opacity: 0.5 }} />

      {/* To variable */}
      <span style={{ color: toLayerInfo.color }}>{to.split('--').pop()}</span>

      {/* Resolved value */}
      {resolvedValue && (
        <>
          <ChevronRight size={10} style={{ opacity: 0.5 }} />
          <span>{resolvedValue}</span>
        </>
      )}

      {/* Copy button */}
      <button
        onClick={handleCopy}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 16,
          height: 16,
          borderRadius: 'var(--radius-sm)',
          border: 'none',
          backgroundColor: copied ? 'var(--color-success)' : 'transparent',
          color: copied ? 'white' : 'var(--color-muted)',
          cursor: 'pointer',
          marginLeft: 'var(--spacing-1)',
        }}
        title="Copy CSS variable"
      >
        {copied ? <Check size={10} /> : <Copy size={10} />}
      </button>
    </div>
  );
}

export default TokenReferenceChain;
