/**
 * Token Utilities - Main Export
 * 
 * Re-exports all token parsing, resolving, and chain utilities.
 */

// Types
export * from '../types';

// Parser utilities
export {
  TOKEN_DATA,
  getTokenLayer,
  getCollectionName,
  pathToCssVariable,
  pathToDisplayName,
  parseCollection,
  parsePrimitives,
  parseTypography,
  parseSemantic,
  parseComponents,
  parseGreenshift,
  parseAllTokens,
  groupTokensByCategory,
  groupTokensByLayer,
  groupTokensByType,
  parseColorPalettes,
  parseSpacingTokens,
  parseRadiusTokens,
  createTokenLookup,
  findTokenByReference,
  getTokensReferencingToken,
  getTokenStats,
} from './parser';

// Resolver utilities
export {
  parseReference,
  buildReferencePath,
  clearTokenCache,
  findToken,
  resolveReference,
  resolveTokenValue,
  resolveAllTokens,
  buildReferenceChain,
  getReferencingTokens,
  enrichTokenWithChain,
  enrichTokensWithChains,
  getDependencies,
  getDependents,
  wouldAffect,
  resolveToCSS,
  getPrimitiveSource,
  formatResolvedValue,
} from './resolver';

// Chain utilities
export {
  buildChainGraph,
  buildReverseChainGraph,
  analyzeDependencies,
  formatChainAsString,
  formatChainAsMarkdown,
  logChain,
  getChainsForLayer,
  getChainsToValue,
  getPrimitiveUsage,
  LAYER_FLOW_ORDER,
  isValidLayerFlow,
  getChainsWithSkippedLayers,
  exportAllChains,
} from './chains';

// Re-export types for convenience
export type {
  ParsedReference,
} from './resolver';

export type {
  ChainNode,
  ChainEdge,
  ChainGraph,
  DependencyAnalysis,
} from './chains';
