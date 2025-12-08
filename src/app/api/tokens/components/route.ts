/**
 * GET /api/tokens/components
 * 
 * Returns component tokens (Button, Card, Input, etc.)
 * Query params:
 *   - resolve: 'true' | 'false' (default: 'true') - whether to resolve references
 *   - component: 'Button' | 'Card' | 'Input' - filter by component
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  parseComponents,
  resolveAllTokens,
  getTokenStats,
  TokenApiResponse,
  TokenLayer,
  TokenType,
} from '@/lib/tokens';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const shouldResolve = searchParams.get('resolve') !== 'false';
    const componentFilter = searchParams.get('component');
    
    let tokens = parseComponents();
    
    // Filter by component if specified
    if (componentFilter) {
      tokens = tokens.filter(t => t.path.startsWith(componentFilter));
    }
    
    if (shouldResolve) {
      tokens = resolveAllTokens(tokens);
    }
    
    const stats = getTokenStats(tokens);
    const types = [...new Set(tokens.map(t => t.type))] as TokenType[];
    
    const response: TokenApiResponse = {
      collection: 'Components',
      mode: 'Default',
      tokens,
      metadata: {
        count: tokens.length,
        types,
        modes: ['Default'],
        lastUpdated: new Date().toISOString(),
        layer: TokenLayer.Components,
      },
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching component tokens:', error);
    return NextResponse.json(
      { error: 'Failed to fetch component tokens' },
      { status: 500 }
    );
  }
}
