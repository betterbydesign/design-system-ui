# Theme Generator - Component & Functional Specifications

> **Version:** 1.0  
> **Created:** December 8, 2025  
> **Status:** Specification Complete - Ready for Development

This document defines the detailed component specifications, style constraints, and functional requirements for building the Theme Generator page. All components must follow these specs to ensure visual consistency.

---

## Table of Contents

1. [Layout Structure](#1-layout-structure)
2. [Component Specifications](#2-component-specifications)
3. [Token Display Standards](#3-token-display-standards)
4. [Style Constraints](#4-style-constraints)
5. [Interaction Patterns](#5-interaction-patterns)
6. [Data Flow](#6-data-flow)
7. [Todo List](#7-todo-list)

---

## 1. Layout Structure

### 1.1 Three-Panel Layout

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  HEADER BAR (sticky, 57px height)                                            │
│  Logo | Theme Generator | Beta Badge            Load Preset | Reset | Export │
├─────────────────┬────────────────────────────────────┬───────────────────────┤
│                 │                                    │                       │
│  LEFT PANEL     │  CENTER PANEL                      │  RIGHT PANEL          │
│  Token Controls │  Live Preview                      │  Token Inspector      │
│  (320px fixed)  │  (flex: 1)                         │  (288px fixed)        │
│                 │                                    │                       │
│  - Scrollable   │  - Preview toolbar                 │  - Selected element   │
│  - Collapsible  │  - Responsive mockup               │  - Token chain        │
│    sections     │  - Mode/device toggles             │  - Affected list      │
│                 │                                    │  - Quick export       │
│                 │                                    │                       │
└─────────────────┴────────────────────────────────────┴───────────────────────┘
```

### 1.2 Panel Specifications

| Panel | Width | Background | Border | Scrolling |
|-------|-------|------------|--------|-----------|
| Header | 100% | `--color-base` / `rgba(17,24,39,0.95)` | Bottom: 1px solid `--color-border` | None |
| Left | 320px | `--color-surface-dark` | Right: 1px solid `--color-border` | Y-axis |
| Center | flex: 1 | `--color-background` | None | Y-axis |
| Right | 288px | `--color-surface-dark` | Left: 1px solid `--color-border` | Y-axis |

---

## 2. Component Specifications

### 2.1 Control Section Panel

**Purpose:** Collapsible container for grouping related token controls.

```
┌─────────────────────────────────────────────────────┐
│ [Icon] Section Title                            [▼] │  ← Header (clickable)
├─────────────────────────────────────────────────────┤
│                                                     │
│  [Control content goes here]                        │  ← Panel content
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Style Spec:**

| Property | Value |
|----------|-------|
| Background | `rgba(31, 41, 55, 0.5)` |
| Border Radius | `--radius-xl` (12px) |
| Header Padding | `--spacing-4` (16px) |
| Content Padding | `0 --spacing-4 --spacing-4` |
| Header Icon Box | 32×32px, gradient bg, 8px radius |
| Header Font | 500 weight, `--color-foreground` |
| Chevron | 20×20px, `--color-muted`, rotates on collapse |
| Gap between sections | `--spacing-4` (16px) |

**Icon Gradients by Section:**

| Section | Gradient |
|---------|----------|
| Colors | `from-pink-500 via-purple-500 to-blue-500` |
| Radius | `from-amber-400 to-orange-500` |
| Typography | `from-blue-400 to-indigo-500` |
| Spacing | `from-emerald-400 to-teal-500` |

---

### 2.2 Color Picker Control

**Purpose:** Select primitive color family and shade for a semantic token.

**CRITICAL: Every color control MUST display its CSS variable.**

```
┌─────────────────────────────────────────────────────┐
│  Brand Color                           [●] #34d399  │  ← Label + Preview
├─────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────┐    │
│  │ Emerald                                  ▼  │    │  ← Primitive dropdown
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  50    100   200   300   400   500   600   700...   │  ← Shade labels
│  [  ] [  ] [  ] [  ] [●●] [  ] [  ] [  ] [  ] [  ]  │  ← Shade swatches
│                    Shade: 400                       │  ← Selected shade
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │ CSS Variable: --color-brand                 │    │  ← REQUIRED: Variable info
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

**Style Spec:**

| Element | Property | Value |
|---------|----------|-------|
| Label | Font Size | `--font-size-body-small` |
| Label | Font Weight | 500 |
| Label | Color | `--color-foreground` |
| Preview Swatch | Size | 24×24px |
| Preview Swatch | Border Radius | 6px |
| Hex Code | Font | Monospace, `--font-size-caption` |
| Hex Code | Color | `--color-muted` |
| Dropdown | Background | `--color-surface-dark` (`rgb(55, 65, 81)`) |
| Dropdown | Border | 1px solid `--color-border` |
| Dropdown | Border Radius | `--radius-lg` (8px) |
| Dropdown | Padding | `--spacing-3 --spacing-3` |
| Dropdown | Font Size | `--font-size-body-small` |
| Shade Swatch | Size | flex: 1, height 32px |
| Shade Swatch | Border Radius | 4px |
| Shade Swatch | Hover | scale(1.1), shadow |
| Shade Swatch (selected) | Transform | scale(1.15) |
| Shade Swatch (selected) | Shadow | `0 0 0 2px white, 0 0 0 4px var(--color-brand)` |
| Shade Label | Font | `--font-size-caption`, `--color-muted` |
| **Variable Info Box** | Background | `--color-surface-dark` (`rgb(31, 41, 55)`) |
| **Variable Info Box** | Border Radius | `--radius-lg` (8px) |
| **Variable Info Box** | Padding | `--spacing-2` |
| **Variable Info Box** | Font | `--font-size-caption` |
| **Variable Label** | Color | `--color-muted` |
| **Variable Value** | Font | Monospace |
| **Variable Value** | Color | `--color-brand` |

**State Data:**

```typescript
interface ColorPickerState {
  label: string;           // "Brand Color"
  semanticToken: string;   // "color-brand"
  cssVariable: string;     // "--color-brand"
  primitiveFamily: string; // "emerald"
  shade: number;           // 400
  hexValue: string;        // "#34d399"
}
```

---

### 2.3 Neutral Scale Control

**Purpose:** Select the gray/neutral color family for backgrounds and text.

**CRITICAL: MUST display CSS variables affected.**

```
┌─────────────────────────────────────────────────────┐
│  Neutral Scale                    Background & Text │  ← Label + Description
├─────────────────────────────────────────────────────┤
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────┐│
│  │ [swatch]│ │[swatch]│ │[swatch]│ │[swatch]│ │... ││  ← Family options
│  │ Slate  │ │ Gray ● │ │  Zinc  │ │Neutral │ │    ││
│  └────────┘ └────────┘ └────────┘ └────────┘ └────┘│
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │ Affects:                                    │    │  ← REQUIRED: Variables
│  │   --color-background                        │    │
│  │   --color-background-alt                    │    │
│  │   --color-text-foreground                   │    │
│  │   --color-text-muted                        │    │
│  │   --color-border                            │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

**Style Spec:**

| Element | Property | Value |
|---------|----------|-------|
| Option Button | Padding | `--spacing-2` |
| Option Button | Border Radius | `--radius-lg` |
| Option Button | Border (default) | transparent 2px |
| Option Button | Border (hover) | `--color-border` 2px |
| Option Button | Border (selected) | `var(--color-brand)` with 0.5 opacity, 2px |
| Option Button (selected) | Background | `--color-surface-dark` |
| Swatch | Size | 32×32px |
| Swatch | Border Radius | 6px |
| Swatch | Ring | 2px white with 10% opacity |
| Family Label | Font | `--font-size-caption` |
| Family Label (default) | Color | `--color-muted` |
| Family Label (selected) | Color | `--color-foreground` |
| **Affects Box** | Background | `--color-surface-dark` |
| **Affects Box** | Border Radius | `--radius-lg` |
| **Affects Box** | Padding | `--spacing-2` |
| **Variable List** | Font | Monospace, `--font-size-caption` |
| **Variable List** | Color | `--color-brand` |

---

### 2.4 Radius Control

**Purpose:** Select radius preset or fine-tune individual component radii.

**CRITICAL: Display CSS variables for each radius control.**

```
┌─────────────────────────────────────────────────────┐
│  PRESET                                             │  ← Section label
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│  │  [░░░░] │ │ [▓▓▓▓]● │ │ [████]  │ │  (●●)   │    │  ← Preset options
│  │  Sharp  │ │ Default │ │ Rounded │ │   Pill  │    │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘    │
│                                                     │
│  FINE-TUNE                                          │  ← Section label
│  Button                                        6px  │
│  ○═══════════●═══════════○                         │  ← Slider
│  CSS: --radius-button                              │  ← REQUIRED
│                                                     │
│  Card                                          8px  │
│  ○═══════════●═══════════○                         │
│  CSS: --radius-card                                │  ← REQUIRED
│                                                     │
│  Input                                         4px  │
│  ○═══════════●═══════════○                         │
│  CSS: --radius-input                               │  ← REQUIRED
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │ Preview                                     │    │
│  │ [Button]  [──Card──]  [Input_____]         │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

**Preset Button Spec:**

| Property | Value |
|----------|-------|
| Layout | Grid 4 columns, gap 8px |
| Padding | `--spacing-3` |
| Border Radius | `--radius-lg` |
| Border (default) | 1px solid `--color-border` |
| Border (selected) | 2px solid `var(--color-brand)` with 0.5 opacity |
| Background (selected) | `--color-surface-dark` |
| Preview Shape | 40×40px |
| Label | `--font-size-caption`, centered |

**Slider Control Spec:**

| Property | Value |
|----------|-------|
| Label | `--font-size-body-small`, `--color-foreground` |
| Value Display | Monospace, `--font-size-caption`, `--color-brand` |
| Track | Height 8px, `--color-border`, full radius |
| Thumb | Accent color: `--color-brand` |
| **CSS Variable Label** | Below slider |
| **CSS Variable Font** | `--font-size-caption`, `--color-muted` |
| **Variable Name** | Monospace, `--color-brand` |

---

### 2.5 Typography Scale Control

**Purpose:** Select type scale ratio and base font size.

```
┌─────────────────────────────────────────────────────┐
│  TYPE SCALE                                         │
│  ┌──────────────────────┐ ┌──────────────────────┐  │
│  │ Major Second       ● │ │ Major Third          │  │
│  │ 1.125 ratio • Compact│ │ 1.250 ratio • Express│  │
│  └──────────────────────┘ └──────────────────────┘  │
│                                                     │
│  Base Size                                    16px  │
│  ○═══════════●═══════════○                         │
│  CSS: --font-size-base                             │  ← REQUIRED
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │ Scale Preview                               │    │
│  │ Heading 1        (--font-size-h1--ms: 2.0rem)│    │
│  │ Heading 2        (--font-size-h2--ms: 1.8rem)│    │
│  │ Heading 3        (--font-size-h3--ms: 1.6rem)│    │
│  │ Body text        (--font-size-body: 1rem)   │    │
│  │ Caption          (--font-size-caption: 0.8) │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

**Scale Option Spec:**

| Property | Value |
|----------|-------|
| Layout | Grid 2 columns, gap 8px |
| Padding | `--spacing-3` |
| Border Radius | `--radius-lg` |
| Border (default) | 1px solid `--color-border` |
| Border (selected) | 2px solid `var(--color-brand)` with 0.5 opacity |
| Background (selected) | `--color-surface-dark` |
| Title | `--font-size-body-small`, 500 weight |
| Description | `--font-size-caption`, `--color-muted` |

---

### 2.6 Token Inspector Panel

**Purpose:** Display selected element's token chain and affected components.

```
┌─────────────────────────────────────────────────────┐
│  ● Button Primary                                   │  ← Selected element
│  ┌─────────────────────────────────────────────┐    │
│  │ Click an element in the preview to inspect  │    │  ← Hint (when empty)
│  └─────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────┤
│  TOKEN CHAIN                                        │  ← Section label
│                                                     │
│  ●─┬─ COMPONENT                                     │
│    │  Button.Background.Default                     │
│    │                                                │
│  ●─┼─ SEMANTIC                                      │
│    │  Color.Brand.Default                           │
│    │  Light mode                                    │
│    │                                                │
│  ●─┼─ PRIMITIVE                                     │
│    │  Color.Emerald.400                             │
│    │                                                │
│  ●─┴─ RESOLVED VALUE                                │
│       [████]  #34d399                               │
│               rgb(52, 211, 153)                     │
│       [Copy Value]                                  │
│                                                     │
├─────────────────────────────────────────────────────┤
│  ALSO USES THIS TOKEN                               │  ← Section label
│  ● Outline Button Border                            │
│  ● Link Hover Color                                 │
│  ● Focus Ring                                       │
│  ● Input Focus Border                               │
│  ● Badge Background (Brand)                         │
└─────────────────────────────────────────────────────┘
```

**Token Chain Node Spec:**

| Layer | Dot Color | Line Color | Label Color |
|-------|-----------|------------|-------------|
| Component | `--color-brand` | Gradient brand→secondary | `--color-brand` |
| Semantic | `var(--color-secondary)` | Gradient secondary→blue | `var(--color-secondary)` |
| Primitive | `#3b82f6` (Blue) | Solid blue | `#3b82f6` |
| Resolved | None | None | `--color-muted` |

**Node Box Spec:**

| Property | Value |
|----------|-------|
| Background | `rgba(31, 41, 55, 0.8)` |
| Border Radius | `--radius-lg` |
| Padding | `--spacing-3` |
| Label | Uppercase, `--font-size-caption`, tracking wider |
| Token Name | Monospace, `--font-size-body-small`, `--color-foreground` |
| Sublabel | `--font-size-caption`, `--color-muted` |

**Affected Components List Spec:**

| Property | Value |
|----------|-------|
| Item Background | `rgba(31, 41, 55, 0.5)` |
| Item Background (hover) | `--color-surface-dark` |
| Item Border Radius | `--radius-lg` |
| Item Padding | `--spacing-2 --spacing-3` |
| Dot | 8×8px, `--color-brand`, rounded full |
| Text | `--font-size-body-small`, `--color-foreground` |

---

## 3. Token Display Standards

### 3.1 CSS Variable Display Rules

**EVERY control that affects a CSS variable MUST display that variable.**

| Control Type | Display Location | Format |
|--------------|------------------|--------|
| Color Picker | Below shade selector | `CSS Variable: var(--{name})` |
| Neutral Scale | Below options | `Affects: var(--color-background), ...` |
| Radius Slider | Below each slider | `CSS: --radius-{component}` |
| Typography Scale | In preview | `(--font-size-{name}: {value})` |

### 3.2 Variable Display Component

Create a reusable `<TokenVariableInfo />` component:

```typescript
interface TokenVariableInfoProps {
  label?: string;           // "CSS Variable:" or "Affects:" or "CSS:"
  variables: string[];      // ["--color-brand", "--color-brand-hover"]
  variant?: 'single' | 'list';  // Display format
}
```

**Single Variant:**
```
CSS Variable: --color-brand
```

**List Variant:**
```
Affects:
  --color-background
  --color-background-alt
  --color-text-foreground
```

**Style:**
- Container: `--color-surface-dark` bg, `--radius-lg`, `--spacing-2` padding
- Label: `--font-size-caption`, `--color-muted`
- Variable: Monospace, `--color-brand`

---

## 4. Style Constraints

### 4.1 Color Usage (from styleguide.md)

| Purpose | Color | Token |
|---------|-------|-------|
| Interactive elements, key values | Teal | `var(--color-brand)` |
| Structural elements, icons | Deep Purple | `var(--color-secondary)` |
| Labels, descriptions | Gray | `var(--color-muted)` |
| Primary text | Near black | `var(--color-foreground)` |

### 4.2 Typography

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Panel title | `--font-size-body-small` | 600 | `--color-muted` (uppercase) |
| Section header | `--font-size-body` | 500 | `--color-foreground` |
| Control label | `--font-size-body-small` | 500 | `--color-foreground` |
| Value display | `--font-size-caption` | 400 | `--color-brand` (mono) |
| Help text | `--font-size-caption` | 400 | `--color-muted` |

### 4.3 Spacing

| Context | Value |
|---------|-------|
| Panel padding | `--spacing-4` |
| Section gap | `--spacing-4` |
| Control gap | `--spacing-3` |
| Inner element gap | `--spacing-2` |
| Grid gap | `--spacing-2` |

### 4.4 Border Radius

| Context | Value |
|---------|-------|
| Panel/Section | `--radius-xl` (12px) |
| Controls, Inputs | `--radius-lg` (8px) |
| Small elements | `--radius-md` (6px) |
| Swatches | 4px |

---

## 5. Interaction Patterns

### 5.1 Panel Collapse/Expand

- **Trigger:** Click entire header row
- **Animation:** `max-height` transition 300ms ease-out, `opacity` 200ms
- **Chevron:** Rotates 180° when collapsed
- **Default state:** Colors and Radius expanded, Typography collapsed

### 5.2 Color Swatch Selection

- **Hover:** `scale(1.1)`, subtle shadow
- **Selected:** `scale(1.15)`, ring: `0 0 0 2px white, 0 0 0 4px var(--color-brand)`
- **Click:** Immediate update, no animation needed

### 5.3 Slider Interaction

- **Drag:** Real-time preview updates
- **Debounce:** None needed for CSS variable updates
- **Value display:** Updates immediately with drag

### 5.4 Preview Element Inspection

- **Hover:** Subtle outline, cursor: pointer
- **Click:** 
  1. Highlight element in preview (pulse animation 1.5s)
  2. Update Inspector panel with token chain
  3. Scroll Inspector to top if needed
- **Clear:** Click empty area or different element

---

## 6. Data Flow

### 6.1 State Structure

```typescript
interface ThemeGeneratorState {
  // Colors
  brandColor: {
    family: ColorFamily;
    shade: Shade;
  };
  secondaryColor: {
    family: ColorFamily;
    shade: Shade;
  };
  neutralScale: NeutralFamily;
  
  // Radius
  radiusPreset: 'sharp' | 'default' | 'rounded' | 'pill';
  radiusValues: {
    button: number;
    card: number;
    input: number;
    badge: number;
  };
  
  // Typography
  typeScale: 'ms' | 'mt';
  baseFontSize: number;
  
  // Preview
  previewMode: 'light' | 'dark';
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  
  // Inspector
  selectedElement: string | null;
}
```

### 6.2 CSS Variable Updates

On any state change:
1. Calculate new resolved values
2. Update CSS custom properties via `document.documentElement.style.setProperty()`
3. Preview updates automatically via CSS variable inheritance

### 6.3 Token Resolution

```typescript
// Example: Brand color change
const newBrandColor = primitives.colors[family][shade];
document.documentElement.style.setProperty('--color-brand', newBrandColor);
document.documentElement.style.setProperty('--button-bg', 'var(--color-brand)');
// etc.
```

---

## 7. Todo List

### Phase 1: Core Infrastructure
- [ ] **1.1** Create `ThemeGeneratorContext` for state management
- [ ] **1.2** Create `useThemeGenerator` hook for accessing/updating state
- [ ] **1.3** Set up CSS variable injection system
- [ ] **1.4** Create base layout component with three-panel structure
- [ ] **1.5** Create header component with logo, actions

### Phase 2: Reusable Control Components
- [ ] **2.1** Create `CollapsibleSection` component
- [ ] **2.2** Create `TokenVariableInfo` component (CRITICAL for consistency)
- [ ] **2.3** Create `ColorPickerControl` component with variable display
- [ ] **2.4** Create `NeutralScaleControl` component with affected variables
- [ ] **2.5** Create `RadiusControl` component with presets and sliders
- [ ] **2.6** Create `TypographyControl` component with scale selector
- [ ] **2.7** Create `ShadeSelector` component (reusable for colors)

### Phase 3: Token Inspector
- [ ] **3.1** Create `TokenInspector` component
- [ ] **3.2** Create `TokenChainVisualizer` component
- [ ] **3.3** Create `AffectedTokensList` component
- [ ] **3.4** Implement element selection system in preview
- [ ] **3.5** Build token chain resolution logic

### Phase 4: Live Preview
- [ ] **4.1** Create `PreviewToolbar` component (mode/device toggles)
- [ ] **4.2** Create `PreviewFrame` component with responsive container
- [ ] **4.3** Build mockup website components:
  - [ ] Navigation bar
  - [ ] Hero section
  - [ ] Feature card grid
  - [ ] Contact form
  - [ ] Footer
- [ ] **4.4** Add click-to-inspect functionality
- [ ] **4.5** Add cascade highlight animation

### Phase 5: Export & Polish
- [ ] **5.1** Create export modal component
- [ ] **5.2** Implement Figma JSON export
- [ ] **5.3** Implement CSS variables export
- [ ] **5.4** Implement Design Tokens JSON export
- [ ] **5.5** Create preset loader component
- [ ] **5.6** Implement localStorage persistence
- [ ] **5.7** Add URL state for shareable themes
- [ ] **5.8** Final QA pass for consistency

---

## Appendix A: Component Prop Interfaces

```typescript
// CollapsibleSection
interface CollapsibleSectionProps {
  id: string;
  title: string;
  icon: React.ComponentType;
  iconGradient: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

// ColorPickerControl
interface ColorPickerControlProps {
  label: string;
  cssVariable: string;
  family: ColorFamily;
  shade: Shade;
  onFamilyChange: (family: ColorFamily) => void;
  onShadeChange: (shade: Shade) => void;
}

// NeutralScaleControl
interface NeutralScaleControlProps {
  selected: NeutralFamily;
  onChange: (family: NeutralFamily) => void;
  affectedVariables: string[];
}

// RadiusControl
interface RadiusControlProps {
  preset: RadiusPreset;
  values: RadiusValues;
  onPresetChange: (preset: RadiusPreset) => void;
  onValueChange: (key: keyof RadiusValues, value: number) => void;
}

// TokenVariableInfo
interface TokenVariableInfoProps {
  label?: string;
  variables: string[];
  variant?: 'single' | 'list';
}

// TokenChainVisualizer
interface TokenChainVisualizerProps {
  chain: TokenChainNode[];
  resolvedValue: string;
}
```

---

## Appendix B: File Structure

```
src/
├── app/
│   └── generator/
│       └── page.tsx                    # Main theme generator page
├── components/
│   └── generator/
│       ├── ThemeGeneratorLayout.tsx    # Three-panel layout
│       ├── GeneratorHeader.tsx         # Top header bar
│       ├── controls/
│       │   ├── CollapsibleSection.tsx
│       │   ├── TokenVariableInfo.tsx   # CRITICAL component
│       │   ├── ColorPickerControl.tsx
│       │   ├── NeutralScaleControl.tsx
│       │   ├── RadiusControl.tsx
│       │   ├── TypographyControl.tsx
│       │   └── ShadeSelector.tsx
│       ├── inspector/
│       │   ├── TokenInspector.tsx
│       │   ├── TokenChainVisualizer.tsx
│       │   └── AffectedTokensList.tsx
│       ├── preview/
│       │   ├── PreviewToolbar.tsx
│       │   ├── PreviewFrame.tsx
│       │   └── MockupWebsite.tsx
│       └── export/
│           ├── ExportModal.tsx
│           └── PresetLoader.tsx
├── contexts/
│   └── ThemeGeneratorContext.tsx
├── hooks/
│   └── useThemeGenerator.ts
└── lib/
    └── generator/
        ├── tokenResolver.ts
        ├── cssInjector.ts
        └── exporters/
            ├── figmaExporter.ts
            ├── cssExporter.ts
            └── jsonExporter.ts
```

---

*This specification should be referenced when building any Theme Generator component to ensure visual and functional consistency across the entire feature.*
