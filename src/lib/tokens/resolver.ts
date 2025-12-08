/**
 * Token Reference Resolver
 * 
 * Resolves token references to their final primitive values.
 * Handles nested references and circular reference detection.
 */

import {
  ParsedToken,
  TokenWithChain,
  ReferenceChain,
  ReferenceChainStep,
  isTokenReference,
} from '../types';
import {
  parseAllTokens,
  createTokenLookup,
} from './parser';

// =============================================================================
// REFERENCE PARSING
// =============================================================================

/** Parse a token reference string into its components */
export interface ParsedReference {
  /** Full reference string without braces */
  fullPath: string;
  /** Collection name */
  collection: string;
  /** Mode name */
  mode: string;
  /** Token path within the mode */
  tokenPath: string;
}

/** Parse a reference string like {Collection.modes.Mode.Path.To.Token} */
export function parseReference(reference: string): ParsedReference | null {
  // Remove braces
  const match = reference.match(/^\{(.+)\}$/);
  if (!match) return null;
  
  const fullPath = match[1];
  
  // Parse the path: Collection.modes.Mode.Path.To.Token
  // or: Collection.Mode.Path.To.Token (shorthand)
  const parts = fullPath.split('.');
  
  if (parts.length < 3) return null;
  
  let collection: string;
  let mode: string;
  let tokenPath: string;
  
  if (parts[1] === 'modes') {
    // Full format: Collection.modes.Mode.Path.To.Token
    collection = parts[0];
    mode = parts[2];
    tokenPath = parts.slice(3).join('.');
  } else {
    // Shorthand: Collection.Mode.Path.To.Token
    collection = parts[0];
    mode = parts[1];
    tokenPath = parts.slice(2).join('.');
  }
  
  return {
    fullPath,
    collection,
    mode,
    tokenPath,
  };
}

/** Build the full reference path for a token */
export function buildReferencePath(token: ParsedToken): string {
  return `{${token.collection}.modes.${token.mode}.${token.path}}`;
}

// =============================================================================
// TOKEN LOOKUP
// =============================================================================

/** Cached token lookup map */
let tokenLookupCache: Map<string, ParsedToken> | null = null;
let allTokensCache: ParsedToken[] | null = null;

/** Get or create the token lookup cache */
function getTokenLookup(): Map<string, ParsedToken> {
  if (!tokenLookupCache) {
    allTokensCache = parseAllTokens();
    tokenLookupCache = createTokenLookup(allTokensCache);
  }
  return tokenLookupCache;
}

/** Get all cached tokens */
function getAllTokens(): ParsedToken[] {
  if (!allTokensCache) {
    getTokenLookup(); // This will populate the cache
  }
  return allTokensCache!;
}

/** Clear the token cache (useful for testing or reloading) */
export function clearTokenCache(): void {
  tokenLookupCache = null;
  allTokensCache = null;
}

/** Find a token by its reference string */
export function findToken(reference: string): ParsedToken | undefined {
  const parsed = parseReference(reference);
  if (!parsed) return undefined;
  
  const lookup = getTokenLookup();
  
  // Try full path format
  const fullPath = `${parsed.collection}.modes.${parsed.mode}.${parsed.tokenPath}`;
  let token = lookup.get(fullPath);
  
  if (!token) {
    // Try shorthand format
    const shortPath = `${parsed.collection}.${parsed.mode}.${parsed.tokenPath}`;
    token = lookup.get(shortPath);
  }
  
  return token;
}

// =============================================================================
// REFERENCE RESOLUTION
// =============================================================================

/** Maximum depth for reference resolution (prevent infinite loops) */
const MAX_RESOLUTION_DEPTH = 10;

/** 
 * Resolve a token reference to its final value
 * Returns the resolved value and the chain of tokens traversed
 */
export function resolveReference(
  reference: string,
  depth: number = 0,
  visited: Set<string> = new Set()
): { value: string | number; chain: ParsedToken[] } | null {
  // Check for circular references
  if (visited.has(reference)) {
    console.warn(`Circular reference detected: ${reference}`);
    return null;
  }
  
  // Check max depth
  if (depth > MAX_RESOLUTION_DEPTH) {
    console.warn(`Max resolution depth exceeded for: ${reference}`);
    return null;
  }
  
  const token = findToken(reference);
  if (!token) {
    console.warn(`Token not found for reference: ${reference}`);
    return null;
  }
  
  visited.add(reference);
  
  // If this token has a reference, resolve it recursively
  if (token.reference) {
    const resolved = resolveReference(token.reference, depth + 1, visited);
    if (resolved) {
      return {
        value: resolved.value,
        chain: [token, ...resolved.chain],
      };
    }
    return null;
  }
  
  // This is a primitive value
  return {
    value: token.value,
    chain: [token],
  };
}

/**
 * Resolve a single token's value
 * Returns the final resolved value
 */
export function resolveTokenValue(token: ParsedToken): string | number {
  if (!token.reference) {
    return token.value;
  }
  
  const resolved = resolveReference(token.reference);
  return resolved ? resolved.value : token.value;
}

/**
 * Resolve all references in an array of tokens
 * Returns new tokens with resolved values
 */
export function resolveAllTokens(tokens: ParsedToken[]): ParsedToken[] {
  return tokens.map(token => ({
    ...token,
    value: resolveTokenValue(token),
  }));
}

// =============================================================================
// REFERENCE CHAIN BUILDING
// =============================================================================

/**
 * Build a complete reference chain for a token
 */
export function buildReferenceChain(token: ParsedToken): ReferenceChain {
  const steps: ReferenceChainStep[] = [];
  let currentToken = token;
  let depth = 0;
  const visited = new Set<string>();
  
  while (currentToken) {
    const ref = buildReferencePath(currentToken);
    
    // Prevent infinite loops
    if (visited.has(ref)) {
      break;
    }
    visited.add(ref);
    
    const isFinal = !currentToken.reference;
    
    steps.push({
      token: currentToken,
      depth,
      isFinal,
    });
    
    if (currentToken.reference) {
      const nextToken = findToken(currentToken.reference);
      if (nextToken) {
        currentToken = nextToken;
        depth++;
      } else {
        break;
      }
    } else {
      break;
    }
    
    // Safety limit
    if (depth > MAX_RESOLUTION_DEPTH) {
      break;
    }
  }
  
  const finalStep = steps[steps.length - 1];
  
  return {
    source: token,
    steps,
    resolvedValue: finalStep?.token.value ?? token.value,
    depth: steps.length - 1,
  };
}

/**
 * Get tokens that reference a specific token (reverse lookup)
 */
export function getReferencingTokens(token: ParsedToken): ParsedToken[] {
  const targetRef = buildReferencePath(token);
  const allTokens = getAllTokens();
  
  return allTokens.filter(t => t.reference === targetRef);
}

/**
 * Create a TokenWithChain from a ParsedToken
 */
export function enrichTokenWithChain(token: ParsedToken): TokenWithChain {
  const chain = buildReferenceChain(token);
  const referencedBy = getReferencingTokens(token);
  
  return {
    ...token,
    value: chain.resolvedValue,
    referenceChain: chain.steps.map(s => s.token),
    referencedBy,
  };
}

/**
 * Enrich multiple tokens with their reference chains
 */
export function enrichTokensWithChains(tokens: ParsedToken[]): TokenWithChain[] {
  return tokens.map(enrichTokenWithChain);
}

// =============================================================================
// DEPENDENCY ANALYSIS
// =============================================================================

/**
 * Get all tokens that a given token depends on (directly or indirectly)
 */
export function getDependencies(token: ParsedToken): ParsedToken[] {
  const chain = buildReferenceChain(token);
  // Exclude the source token itself
  return chain.steps.slice(1).map(s => s.token);
}

/**
 * Get all tokens that depend on a given token (directly or indirectly)
 */
export function getDependents(token: ParsedToken): ParsedToken[] {
  const dependents: ParsedToken[] = [];
  const visited = new Set<string>();
  const queue = [token];
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    const ref = buildReferencePath(current);
    
    if (visited.has(ref)) continue;
    visited.add(ref);
    
    const referencers = getReferencingTokens(current);
    for (const referencer of referencers) {
      if (!visited.has(buildReferencePath(referencer))) {
        dependents.push(referencer);
        queue.push(referencer);
      }
    }
  }
  
  return dependents;
}

/**
 * Check if changing a token would affect another token
 */
export function wouldAffect(sourceToken: ParsedToken, targetToken: ParsedToken): boolean {
  const dependents = getDependents(sourceToken);
  const targetRef = buildReferencePath(targetToken);
  return dependents.some(d => buildReferencePath(d) === targetRef);
}

// =============================================================================
// RESOLUTION UTILITIES
// =============================================================================

/**
 * Resolve a CSS variable value from a reference
 */
export function resolveToCSS(reference: string): string | null {
  const resolved = resolveReference(reference);
  if (!resolved) return null;
  
  const value = resolved.value;
  
  // Format based on type
  if (typeof value === 'number') {
    // Check if it looks like a pixel value
    const token = resolved.chain[resolved.chain.length - 1];
    if (token.path.includes('Spacing') || token.path.includes('Size') || 
        token.path.includes('Radius') || token.path.includes('Layout')) {
      return `${value}px`;
    }
    if (token.path.includes('Duration')) {
      return `${value}ms`;
    }
    if (token.path.includes('FontWeight')) {
      return String(value);
    }
    if (token.path.includes('LineHeight')) {
      return String(value);
    }
    return String(value);
  }
  
  return value;
}

/**
 * Get the primitive source for any token
 */
export function getPrimitiveSource(token: ParsedToken): ParsedToken | null {
  const chain = buildReferenceChain(token);
  const finalStep = chain.steps[chain.steps.length - 1];
  return finalStep?.token ?? null;
}

/**
 * Format a resolved value for display
 */
export function formatResolvedValue(value: string | number, type: string): string {
  if (typeof value === 'number') {
    if (type === 'color') return String(value);
    return `${value}`;
  }
  return value;
}
