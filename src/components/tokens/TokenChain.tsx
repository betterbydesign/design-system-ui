'use client';

import { ArrowRight, Hash, Sparkles, Component as ComponentIcon, Globe } from 'lucide-react';

/**
 * TokenChain - Consistent token reference chain display
 * 
 * Flow: Raw Value → Primitive → Semantic → Component (left to right)
 * Style: Chip with icon and colored border (matching architecture boxes)
 */

export type TokenLayerType = 'value' | 'primitive' | 'semantic' | 'component' | 'greenshift';

export interface TokenChainNode {
  layer: TokenLayerType;
  value: string;
}

interface TokenChainProps {
  chain: TokenChainNode[];
  size?: 'sm' | 'md';
}

const LAYER_CONFIG: Record<TokenLayerType, { color: string; icon: React.ElementType; label: string }> = {
  value: { color: '#64748b', icon: Hash, label: 'VAL' },
  primitive: { color: '#3b82f6', icon: Hash, label: 'PRM' },
  semantic: { color: '#10b981', icon: Sparkles, label: 'SEM' },
  component: { color: '#f59e0b', icon: ComponentIcon, label: 'CMP' },
  greenshift: { color: '#06b6d4', icon: Globe, label: 'GS' },
};

export function TokenChain({ chain, size = 'md' }: TokenChainProps) {
  const padding = size === 'sm' ? 'var(--spacing-1) var(--spacing-2)' : 'var(--spacing-1-5) var(--spacing-2-5)';
  const fontSize = size === 'sm' ? 'var(--font-size-caption)' : 'var(--font-size-label)';
  const iconSize = size === 'sm' ? 12 : 14;
  const arrowSize = size === 'sm' ? 10 : 12;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', flexWrap: 'wrap' }}>
      {chain.map((node, index) => {
        const config = LAYER_CONFIG[node.layer];
        const Icon = config.icon;
        
        return (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-1-5)',
                padding,
                backgroundColor: `${config.color}10`,
                border: `1px solid ${config.color}30`,
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <Icon size={iconSize} style={{ color: config.color }} />
              <span
                style={{
                  fontSize,
                  fontFamily: 'ui-monospace, monospace',
                  fontWeight: 500,
                  color: config.color,
                }}
              >
                {node.value}
              </span>
            </div>
            
            {index < chain.length - 1 && (
              <ArrowRight size={arrowSize} style={{ color: 'var(--color-muted)' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Simple inline chain for use in color swatches and compact spaces
 */
interface TokenChainInlineProps {
  primitive: string;
  semantic?: string;
  component?: string;
  size?: 'sm' | 'md';
}

export function TokenChainInline({ primitive, semantic, component, size = 'sm' }: TokenChainInlineProps) {
  const nodes: TokenChainNode[] = [];
  
  // Build chain from raw value up
  nodes.push({ layer: 'primitive', value: primitive });
  if (semantic) nodes.push({ layer: 'semantic', value: semantic });
  if (component) nodes.push({ layer: 'component', value: component });
  
  return <TokenChain chain={nodes} size={size} />;
}

export default TokenChain;
