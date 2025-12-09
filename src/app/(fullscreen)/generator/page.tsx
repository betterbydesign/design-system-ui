'use client';

import { ThemeGeneratorLayout } from '@/components/generator/ThemeGeneratorLayout';
import { GeneratorHeader } from '@/components/generator/GeneratorHeader';
import { ColorsSection } from '@/components/generator/controls/ColorsSection';
import { RadiusSection } from '@/components/generator/controls/RadiusSection';
import { TypographySection } from '@/components/generator/controls/TypographySection';
import { PreviewToolbar } from '@/components/generator/preview/PreviewToolbar';
import { PreviewFrame } from '@/components/generator/preview/PreviewFrame';
import { TokenInspector } from '@/components/generator/inspector/TokenInspector';

/**
 * Theme Generator Page
 * 
 * Interactive tool for creating, previewing, and exporting custom themes
 * using the design system's token architecture.
 */
export default function ThemeGeneratorPage() {
  return (
    <ThemeGeneratorLayout
      header={<GeneratorHeader />}
      leftPanel={
        <>
          <ColorsSection />
          <RadiusSection />
          <TypographySection />
        </>
      }
      centerPanel={
        <>
          <PreviewToolbar />
          <PreviewFrame />
        </>
      }
      rightPanel={<TokenInspector />}
    />
  );
}
