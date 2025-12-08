/**
 * Token Dependency Chain Builder
 * 
 * Provides utilities for building, analyzing, and visualizing
 * token dependency chains across all layers.
 */

import {
  ParsedToken,
  TokenWithChain,
  ReferenceChain,
  TokenLayer,
  TOKEN_LAYER_INFO,
} from '../types';
import {
  parseAllTokens,
  groupTokensByLayer,
} from './parser';
import {
  buildReferenceChain,
  getReferencingTokens,
  buildReferencePath,
  enrichTokenWithChain,
} from './resolver';

// =============================================================================
// CHAIN NODE TYPES (for visualization)
// =============================================================================

/** A node in the visual chain diagram */
export interface ChainNode {
  /** Unique identifier */
  id: string;
  /** Token data */
  token: ParsedToken;
  /** Layer for styling */
  layer: TokenLayer;
  /** Display label */
  label: string;
  /** Resolved value */
  resolvedValue: string | number;
  /** Position in chain (0 = start/Greenshift, higher = closer to primitive) */
  depth: number;
  /** CSS color for the layer */
  color: string;
}

/** A connection between chain nodes */
export interface ChainEdge {
  /** Source node ID */
  from: string;
  /** Target node ID */
  to: string;
  /** Edge label (optional) */
  label?: string;
}

/** Complete chain graph for visualization */
export interface ChainGraph {
  /** All nodes in the graph */
  nodes: ChainNode[];
  /** All edges connecting nodes */
  edges: ChainEdge[];
  /** The starting token */
  source: ParsedToken;
  /** Final resolved value */
  resolvedValue: string | number;
  /** Maximum depth of the chain */
  maxDepth: number;
}

// =============================================================================
// CHAIN GRAPH BUILDING
// =============================================================================

/** Create a node ID from a token */
function createNodeId(token: ParsedToken): string {
  return `${token.collection}.${token.mode}.${token.path}`.replace(/\./g, '-');
}

/** Build a chain graph from a token */
export function buildChainGraph(token: ParsedToken): ChainGraph {
  const chain = buildReferenceChain(token);
  const nodes: ChainNode[] = [];
  const edges: ChainEdge[] = [];
  
  for (let i = 0; i < chain.steps.length; i++) {
    const step = chain.steps[i];
    const nodeId = createNodeId(step.token);
    
    nodes.push({
      id: nodeId,
      token: step.token,
      layer: step.token.layer,
      label: step.token.name,
      resolvedValue: step.isFinal ? step.token.value : chain.resolvedValue,
      depth: step.depth,
      color: TOKEN_LAYER_INFO[step.token.layer].color,
    });
    
    // Create edge to next node
    if (i < chain.steps.length - 1) {
      const nextStep = chain.steps[i + 1];
      edges.push({
        from: nodeId,
        to: createNodeId(nextStep.token),
        label: 'references',
      });
    }
  }
  
  return {
    nodes,
    edges,
    source: token,
    resolvedValue: chain.resolvedValue,
    maxDepth: chain.depth,
  };
}

/** Build a reverse chain graph (what references this token) */
export function buildReverseChainGraph(token: ParsedToken, maxDepth: number = 3): ChainGraph {
  const nodes: ChainNode[] = [];
  const edges: ChainEdge[] = [];
  const visited = new Set<string>();
  
  // Add the source token
  const sourceId = createNodeId(token);
  nodes.push({
    id: sourceId,
    token,
    layer: token.layer,
    label: token.name,
    resolvedValue: token.value,
    depth: 0,
    color: TOKEN_LAYER_INFO[token.layer].color,
  });
  visited.add(sourceId);
  
  // BFS to find all tokens that reference this one
  const queue: Array<{ token: ParsedToken; depth: number }> = [{ token, depth: 0 }];
  
  while (queue.length > 0) {
    const { token: currentToken, depth } = queue.shift()!;
    
    if (depth >= maxDepth) continue;
    
    const referencers = getReferencingTokens(currentToken);
    const currentId = createNodeId(currentToken);
    
    for (const referencer of referencers) {
      const referencerId = createNodeId(referencer);
      
      if (!visited.has(referencerId)) {
        visited.add(referencerId);
        
        nodes.push({
          id: referencerId,
          token: referencer,
          layer: referencer.layer,
          label: referencer.name,
          resolvedValue: token.value, // They all resolve to the same value
          depth: depth + 1,
          color: TOKEN_LAYER_INFO[referencer.layer].color,
        });
        
        edges.push({
          from: referencerId,
          to: currentId,
          label: 'references',
        });
        
        queue.push({ token: referencer, depth: depth + 1 });
      }
    }
  }
  
  return {
    nodes,
    edges,
    source: token,
    resolvedValue: token.value,
    maxDepth: Math.max(...nodes.map(n => n.depth), 0),
  };
}

// =============================================================================
// CHAIN ANALYSIS
// =============================================================================

/** Analyze the dependency structure of all tokens */
export interface DependencyAnalysis {
  /** Total number of tokens */
  totalTokens: number;
  /** Number of primitive tokens (no references) */
  primitiveTokens: number;
  /** Number of tokens with references */
  referencingTokens: number;
  /** Average chain depth */
  averageChainDepth: number;
  /** Maximum chain depth */
  maxChainDepth: number;
  /** Tokens by layer count */
  tokensByLayer: Record<TokenLayer, number>;
  /** Most referenced tokens (primitives that are most used) */
  mostReferenced: Array<{ token: ParsedToken; referenceCount: number }>;
}

/** Analyze all token dependencies */
export function analyzeDependencies(): DependencyAnalysis {
  const allTokens = parseAllTokens();
  const byLayer = groupTokensByLayer(allTokens);
  
  // Count tokens by type
  const primitiveTokens = allTokens.filter(t => !t.reference);
  const referencingTokens = allTokens.filter(t => t.reference);
  
  // Calculate chain depths
  let totalDepth = 0;
  let maxDepth = 0;
  
  for (const token of referencingTokens) {
    const chain = buildReferenceChain(token);
    totalDepth += chain.depth;
    maxDepth = Math.max(maxDepth, chain.depth);
  }
  
  const averageDepth = referencingTokens.length > 0 
    ? totalDepth / referencingTokens.length 
    : 0;
  
  // Find most referenced tokens
  const referenceCounts = new Map<string, { token: ParsedToken; count: number }>();
  
  for (const token of primitiveTokens) {
    const ref = buildReferencePath(token);
    referenceCounts.set(ref, { token, count: 0 });
  }
  
  for (const token of allTokens) {
    if (token.reference) {
      const entry = referenceCounts.get(token.reference);
      if (entry) {
        entry.count++;
      }
    }
  }
  
  const mostReferenced = Array.from(referenceCounts.values())
    .filter(entry => entry.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
    .map(entry => ({ token: entry.token, referenceCount: entry.count }));
  
  return {
    totalTokens: allTokens.length,
    primitiveTokens: primitiveTokens.length,
    referencingTokens: referencingTokens.length,
    averageChainDepth: Math.round(averageDepth * 100) / 100,
    maxChainDepth: maxDepth,
    tokensByLayer: {
      [TokenLayer.Primitives]: byLayer[TokenLayer.Primitives].length,
      [TokenLayer.Typography]: byLayer[TokenLayer.Typography].length,
      [TokenLayer.Semantic]: byLayer[TokenLayer.Semantic].length,
      [TokenLayer.Components]: byLayer[TokenLayer.Components].length,
      [TokenLayer.Greenshift]: byLayer[TokenLayer.Greenshift].length,
    },
    mostReferenced,
  };
}

// =============================================================================
// CHAIN FORMATTING
// =============================================================================

/** Format a chain as a readable string */
export function formatChainAsString(chain: ReferenceChain): string {
  return chain.steps
    .map(step => {
      const layerName = TOKEN_LAYER_INFO[step.token.layer].displayName;
      return `[${layerName}] ${step.token.name}`;
    })
    .join(' → ');
}

/** Format a chain as markdown */
export function formatChainAsMarkdown(chain: ReferenceChain): string {
  const lines = chain.steps.map((step, index) => {
    const indent = '  '.repeat(index);
    const arrow = index > 0 ? '↳ ' : '';
    const layerName = TOKEN_LAYER_INFO[step.token.layer].displayName;
    const value = step.isFinal ? ` = \`${step.token.value}\`` : '';
    return `${indent}${arrow}**${layerName}**: ${step.token.name}${value}`;
  });
  
  return lines.join('\n');
}

/** Format a chain for console logging */
export function logChain(token: ParsedToken): void {
  const chain = buildReferenceChain(token);
  
  console.group(`Token Chain: ${token.name}`);
  console.log('Resolved Value:', chain.resolvedValue);
  console.log('Chain Depth:', chain.depth);
  console.log('---');
  
  for (const step of chain.steps) {
    const layerInfo = TOKEN_LAYER_INFO[step.token.layer];
    console.log(
      `%c[${layerInfo.displayName}]%c ${step.token.path}`,
      `color: ${layerInfo.color}; font-weight: bold`,
      'color: inherit'
    );
    if (step.isFinal) {
      console.log(`  → ${step.token.value}`);
    }
  }
  
  console.groupEnd();
}

// =============================================================================
// BATCH OPERATIONS
// =============================================================================

/** Get all chains for tokens in a specific layer */
export function getChainsForLayer(layer: TokenLayer): TokenWithChain[] {
  const allTokens = parseAllTokens();
  const layerTokens = allTokens.filter(t => t.layer === layer);
  return layerTokens.map(enrichTokenWithChain);
}

/** Get all token chains that resolve to a specific primitive */
export function getChainsToValue(value: string | number): ReferenceChain[] {
  const allTokens = parseAllTokens();
  const chains: ReferenceChain[] = [];
  
  for (const token of allTokens) {
    const chain = buildReferenceChain(token);
    if (chain.resolvedValue === value) {
      chains.push(chain);
    }
  }
  
  return chains;
}

/** Get unique primitive values and their usage */
export function getPrimitiveUsage(): Map<string | number, ParsedToken[]> {
  const allTokens = parseAllTokens();
  const usage = new Map<string | number, ParsedToken[]>();
  
  for (const token of allTokens) {
    const chain = buildReferenceChain(token);
    const value = chain.resolvedValue;
    
    if (!usage.has(value)) {
      usage.set(value, []);
    }
    usage.get(value)!.push(token);
  }
  
  return usage;
}

// =============================================================================
// LAYER FLOW UTILITIES
// =============================================================================

/** Get the typical flow direction for layers */
export const LAYER_FLOW_ORDER: TokenLayer[] = [
  TokenLayer.Greenshift,
  TokenLayer.Components,
  TokenLayer.Semantic,
  TokenLayer.Typography,
  TokenLayer.Primitives,
];

/** Check if a chain follows the expected layer flow */
export function isValidLayerFlow(chain: ReferenceChain): boolean {
  const layers = chain.steps.map(s => s.token.layer);
  
  for (let i = 0; i < layers.length - 1; i++) {
    const currentIndex = LAYER_FLOW_ORDER.indexOf(layers[i]);
    const nextIndex = LAYER_FLOW_ORDER.indexOf(layers[i + 1]);
    
    // Next layer should be at same level or deeper (higher index)
    if (nextIndex < currentIndex) {
      return false;
    }
  }
  
  return true;
}

/** Get chains that skip layers (for debugging/validation) */
export function getChainsWithSkippedLayers(): ReferenceChain[] {
  const allTokens = parseAllTokens();
  const problematic: ReferenceChain[] = [];
  
  for (const token of allTokens) {
    if (!token.reference) continue;
    
    const chain = buildReferenceChain(token);
    if (!isValidLayerFlow(chain)) {
      problematic.push(chain);
    }
  }
  
  return problematic;
}

// =============================================================================
// EXPORT CHAIN DATA
// =============================================================================

/** Export all chains as JSON for external tools */
export function exportAllChains(): Array<{
  token: ParsedToken;
  chain: string[];
  resolvedValue: string | number;
  depth: number;
}> {
  const allTokens = parseAllTokens();
  
  return allTokens.map(token => {
    const chain = buildReferenceChain(token);
    return {
      token: {
        ...token,
        // Remove circular references for JSON serialization
        referenceChain: undefined,
        referencedBy: undefined,
      } as ParsedToken,
      chain: chain.steps.map(s => s.token.path),
      resolvedValue: chain.resolvedValue,
      depth: chain.depth,
    };
  });
}
