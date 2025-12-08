/**
 * GET /api/tokens/semantic
 * 
 * Returns semantic tokens (role-based: Brand, Background, Text, Status, etc.)
 * Query params:
 *   - mode: 'Light' | 'Dark' (default: 'Light')
 *   - resolve: 'true' | 'false' (default: 'true') - whether to resolve references
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  parseSemantic,
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
    
    let tokens = parseSemantic(mode);
    
    if (shouldResolve) {
      tokens = resolveAllTokens(tokens);
    }
    
    const stats = getTokenStats(tokens);
    const types = [...new Set(tokens.map(t => t.type))] as TokenType[];
    
    const response: TokenApiResponse = {
      collection: 'Semantic',
      mode,
      tokens,
      metadata: {
        count: tokens.length,
        types,
        modes: ['Light', 'Dark'],
        lastUpdated: new Date().toISOString(),
        layer: TokenLayer.Semantic,
      },
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching semantic tokens:', error);
    return NextResponse.json(
      { error: 'Failed to fetch semantic tokens' },
      { status: 500 }
    );
  }
}
