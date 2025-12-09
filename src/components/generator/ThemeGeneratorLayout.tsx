'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ThemeGeneratorProvider } from '@/contexts/ThemeGeneratorContext';

interface ThemeGeneratorLayoutProps {
  header: React.ReactNode;
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}

/**
 * ThemeGeneratorLayout
 * 
 * Three-panel layout component for the theme generator.
 * - Left panel: Token controls (320px fixed)
 * - Center panel: Live preview (flex: 1)
 * - Right panel: Token inspector (288px fixed)
 * 
 * All panels scroll together as a single unit (no interior scrollbars).
 */
export function ThemeGeneratorLayout({
  header,
  leftPanel,
  centerPanel,
  rightPanel,
}: ThemeGeneratorLayoutProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  
  return (
    <ThemeGeneratorProvider>
      <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
        {/* Header - sticky at top */}
        {header}
        
        {/* Main Content - Three Panel Layout, scrolls as one unit */}
        <div className="flex flex-1">
          {/* Left Panel - Token Controls */}
          <aside 
            className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col"
            style={{ minWidth: '320px', maxWidth: '320px' }}
          >
            {/* Back to Dashboard - Full width link */}
            <Link 
              href="/"
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors border-b border-gray-800 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to dashboard</span>
            </Link>
            
            <div className="p-4 border-b border-gray-800">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Token Controls
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {leftPanel}
            </div>
          </aside>
          
          {/* Center Panel - Live Preview */}
          <main className="flex-1 flex flex-col bg-gray-950">
            {centerPanel}
          </main>
          
          {/* Right Panel - Inspector */}
          <aside 
            className="w-72 bg-gray-900 border-l border-gray-800 flex flex-col"
            style={{ minWidth: '288px', maxWidth: '288px' }}
          >
            {rightPanel}
          </aside>
        </div>
      </div>
    </ThemeGeneratorProvider>
  );
}

/**
 * Wrapper component that provides the preview ref to children
 */
export function ThemeGeneratorLayoutWithRef({
  header,
  leftPanel,
  centerPanel,
  rightPanel,
}: ThemeGeneratorLayoutProps) {
  return (
    <ThemeGeneratorLayout
      header={header}
      leftPanel={leftPanel}
      centerPanel={centerPanel}
      rightPanel={rightPanel}
    />
  );
}
