'use client';

import React from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';

export interface TokenChainNode {
  layer: 'component' | 'semantic' | 'primitive';
  label: string;
  name: string;
  sublabel?: string;
}

interface TokenChainVisualizerProps {
  /** Chain of tokens from component to primitive */
  chain: TokenChainNode[];
  /** Final resolved value */
  resolvedValue: string;
  /** RGB representation of resolved value */
  resolvedRgb?: string;
}

/** Layer styling configuration */
const LAYER_STYLES = {
  component: {
    borderColor: 'border-l-emerald-500',
    labelColor: 'text-emerald-400',
  },
  semantic: {
    borderColor: 'border-l-violet-500',
    labelColor: 'text-violet-400',
  },
  primitive: {
    borderColor: 'border-l-blue-500',
    labelColor: 'text-blue-400',
  },
};

/**
 * TokenChainVisualizer
 * 
 * Visual representation of a token's reference chain from
 * primitive value through semantic to component layer.
 * 
 * Uses a clean horizontal design with arrow connectors between layers.
 */
export function TokenChainVisualizer({
  chain,
  resolvedValue,
  resolvedRgb,
}: TokenChainVisualizerProps) {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resolvedValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  // Reverse the chain so it goes from primitive to component (left to right)
  const reversedChain = [...chain].reverse();
  
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700/50">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">Token Chain</div>
      
      <div className="flex items-center gap-2 flex-wrap">
        {/* Chain nodes - horizontal left to right */}
        {reversedChain.map((node, index) => {
          const styles = LAYER_STYLES[node.layer];
          const isLast = index === reversedChain.length - 1;
          const isFirst = index === 0;
          
          return (
            <React.Fragment key={`${node.layer}-${index}`}>
              {/* Token Card */}
              <div 
                className={`
                  group relative rounded-lg px-3 py-2 border-l-4 
                  bg-gradient-to-r from-gray-850 to-gray-800/80
                  hover:from-gray-800 hover:to-gray-700/80 
                  transition-colors cursor-pointer
                  ${styles.borderColor}
                `}
              >
                <div className="flex items-center gap-2">
                  {isFirst && (
                    <div 
                      className="w-4 h-4 rounded border border-gray-600 flex-shrink-0"
                      style={{ backgroundColor: resolvedValue }}
                    />
                  )}
                  <div>
                    <div className={`text-[10px] uppercase tracking-wider font-medium ${styles.labelColor}`}>
                      {node.label}
                    </div>
                    <div className="font-mono text-xs text-white">
                      {node.name}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Arrow Connector */}
              {!isLast && (
                <ArrowRight className="w-4 h-4 text-gray-600 flex-shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

interface ResolvedValuePanelProps {
  /** Final resolved value */
  resolvedValue: string;
  /** RGB representation of resolved value */
  resolvedRgb?: string;
}

/**
 * ResolvedValuePanel
 * 
 * Displays the final resolved color value with copy functionality.
 * Separated from TokenChainVisualizer for flexible positioning.
 */
export function ResolvedValuePanel({
  resolvedValue,
  resolvedRgb,
}: ResolvedValuePanelProps) {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resolvedValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700/50">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
        Resolved Value
      </div>
      <div className="flex items-center gap-4">
        <div 
          className="w-14 h-14 rounded-xl shadow-lg ring-1 ring-white/10"
          style={{ backgroundColor: resolvedValue }}
        />
        <div className="flex-1">
          <div className="font-mono text-base text-white">{resolvedValue}</div>
          {resolvedRgb && (
            <div className="text-xs text-gray-500 mt-0.5">{resolvedRgb}</div>
          )}
        </div>
      </div>
      <button 
        className="mt-4 w-full px-3 py-2 text-sm text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2"
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Copy Value
          </>
        )}
      </button>
    </div>
  );
}
