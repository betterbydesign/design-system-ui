/**
 * GET /api/tokens/greenshift
 * 
 * Returns Greenshift/WordPress mapping tokens
 * Query params:
 *   - mode: 'Light' | 'Dark' (default: 'Light')
 *   - resolve: 'true' | 'false' (default: 'true') - whether to resolve references
 *   - category: 'Preset' | 'Custom' | 'Style' - filter by category
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  parseGreenshift,
  resolveAllTokens,
  getTokenStats,
  TokenApiResponse,
  TokenLayer,
  TokenType,
} from '@/lib/tokens';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const mode = (searchParams.get('mode') as 'Light' | 'Dark') || 'Light';
    const shouldResolve = searchParams.get('resolve') !== 'false';
    const categoryFilter = searchParams.get('category');
    
    let tokens = parseGreenshift(mode);
    
    // Filter by category if specified
    if (categoryFilter) {
      tokens = tokens.filter(t => t.path.startsWith(categoryFilter));
    }
    
    if (shouldResolve) {
      tokens = resolveAllTokens(tokens);
    }
    
    const stats = getTokenStats(tokens);
    const types = [...new Set(tokens.map(t => t.type))] as TokenType[];
    
    const response: TokenApiResponse = {
      collection: 'Greenshift',
      mode,
      tokens,
      metadata: {
        count: tokens.length,
        types,
        modes: ['Light', 'Dark'],
        lastUpdated: new Date().toISOString(),
        layer: TokenLayer.Greenshift,
      },
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching Greenshift tokens:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Greenshift tokens' },
      { status: 500 }
    );
  }
}
