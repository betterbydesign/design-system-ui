# Altitude Design System UI - Project Agent

> **Last Updated:** December 8, 2025  
> **Status:** Phase 1 Complete - Ready for Phase 2  
> **Current Phase:** Phase 2.1 - Token Flow Diagram Component

---

## 📋 Project Overview

Update the Altitude Design System documentation app to reflect the new 5-layer token architecture and provide interactive tools for exploring token relationships.

### Token Architecture Layers
```
┌─────────────────────────────────────────────────────────────┐
│  05-Greenshift (Framework Adapter)                          │
│  WordPress/Greenshift CSS custom properties                 │
├─────────────────────────────────────────────────────────────┤
│  04-Components                                              │
│  Button, Card, Input component tokens                       │
├─────────────────────────────────────────────────────────────┤
│  03-Semantic                                                │
│  Role-based tokens: Brand, Background, Text, Status         │
├─────────────────────────────────────────────────────────────┤
│  02-Typography                                              │
│  Type scales: Major Second (1.125) / Major Third (1.25)     │
├─────────────────────────────────────────────────────────────┤
│  01-Primitives                                              │
│  Raw values: Colors, Spacing, Radius, etc.                  │
└─────────────────────────────────────────────────────────────┘
```

### Source Token Files
Located in `/tokens/`:
- `01-Primitives.json` - 22 color families, spacing, radius, etc.
- `02a-Typography-MajorSecond.json` - Conservative type scale
- `02b-Typography-MajorThird.json` - Expressive type scale
- `03-Semantic.json` - Light/Dark mode semantic tokens
- `04-Components.json` - Button, Card, Input tokens
- `05-Greenshift.json` - WordPress variable mapping

---

## 🎯 Priority Order

1. **Documentation & Updates** - Update existing pages, add new token documentation
2. **Node Relationship Viewer** - Interactive horizontal flow diagram
3. **Export/Import API Themer** - Full playground with live updates and API endpoints

---

## 🎨 Design Decisions

| Decision | Choice | Notes |
|----------|--------|-------|
| Node Flow Style | Horizontal flow diagram | Left-to-right: Greenshift → Semantic → Primitives |
| Greenshift Section | Secondary "Framework Adapters" section | Not prominently featured |
| Dark Mode Display | Skip for now | Focus on Light mode first |
| Token Explorer | Full playground with live updates | Most value for users |
| Data Strategy | API endpoints | Future-proof for CMS integration |

---

## 📁 Target File Structure

```
src/
├── app/
│   ├── api/
│   │   └── tokens/
│   │       ├── route.ts              (GET all tokens)
│   │       ├── primitives/route.ts
│   │       ├── semantic/route.ts
│   │       ├── components/route.ts
│   │       ├── typography/route.ts
│   │       ├── greenshift/route.ts
│   │       └── export/route.ts       (Export theme as CSS/JSON)
│   ├── tokens/
│   │   ├── primitives/
│   │   │   ├── page.tsx              (Primitives overview)
│   │   │   └── colors/page.tsx       (22 color palettes)
│   │   ├── semantic/page.tsx         (Semantic tokens)
│   │   ├── components/page.tsx       (Component tokens)  
│   │   ├── colors/page.tsx           (UPDATE existing)
│   │   ├── typography/page.tsx       (UPDATE existing)
│   │   └── spacing/page.tsx          (UPDATE existing)
│   ├── frameworks/
│   │   └── greenshift/page.tsx       (WordPress mapping)
│   ├── tools/
│   │   ├── explorer/page.tsx         (Token playground)
│   │   └── relationships/page.tsx    (Node flow viewer)
│   ├── preview/page.tsx              (UPDATE existing)
│   └── page.tsx                      (UPDATE home)
├── components/
│   ├── tokens/
│   │   ├── TokenChip.tsx
│   │   ├── ColorSwatch.tsx
│   │   ├── ColorPaletteGrid.tsx
│   │   ├── SpacingVisual.tsx
│   │   ├── RadiusCurveIcon.tsx
│   │   └── TokenReferenceChain.tsx
│   ├── TokenFlowDiagram.tsx
│   ├── TokenSearch.tsx
│   └── Sidebar.tsx                   (UPDATE)
├── lib/
│   ├── tokens/
│   │   ├── parser.ts                 (Parse JSON tokens)
│   │   ├── resolver.ts               (Resolve references)
│   │   ├── chains.ts                 (Build dependency chains)
│   │   └── export.ts                 (Export utilities)
│   └── types.ts                      (TypeScript interfaces)
└── data/
    └── tokens/                       (Cached/imported token data)
```

---

## ✅ Todo List

### Phase 1: Documentation & Updates
> **Goal:** Update all existing pages with new token data and add comprehensive documentation

#### 1.1 Data Layer Setup
- [x] Create TypeScript interfaces for token structure (`lib/types.ts`)
- [x] Create token parser utility (`lib/tokens/parser.ts`)
- [x] Create reference resolver utility (`lib/tokens/resolver.ts`)
- [x] Create dependency chain builder (`lib/tokens/chains.ts`)
- [x] Set up API route for primitives (`api/tokens/primitives/route.ts`)
- [x] Set up API route for semantic tokens (`api/tokens/semantic/route.ts`)
- [x] Set up API route for component tokens (`api/tokens/components/route.ts`)
- [x] Set up API route for typography (`api/tokens/typography/route.ts`)
- [x] Set up API route for greenshift (`api/tokens/greenshift/route.ts`)
- [x] Set up main API route (`api/tokens/route.ts`)
- [x] Set up export API route (`api/tokens/export/route.ts`)

#### 1.2 Reusable Components
- [x] Create `TokenChip` component (color swatch + metadata)
- [x] Create `ColorSwatch` component (enhanced with references)
- [x] Create `ColorPaletteGrid` component (22 × 11 grid)
- [x] Create `SpacingVisual` component (visual bar + value)
- [x] Create `RadiusCurveIcon` component (corner curve visualization)
- [x] Create `TokenReferenceChain` component (inline reference display)

#### 1.3 Primitives Documentation
- [x] Create Primitives overview page (`tokens/primitives/page.tsx`)
- [x] Create full color palettes page (`tokens/primitives/colors/page.tsx`)
  - Display all 22 color families (Slate through Rose + Base)
  - 11 shades per family (50-950)
  - Copy-to-clipboard for CSS variables and hex values
- [x] Update spacing page with new primitive data (includes radius, duration, line-heights, font-weights)
- [x] Add radius documentation to primitives
- [x] Add duration/animation tokens documentation
- [x] Add font weights and line heights documentation

#### 1.4 Semantic Tokens Documentation
- [x] Create Semantic tokens page (`tokens/semantic/page.tsx`)
  - Color roles: Brand, Secondary, Background, Surface, Text, Card, Border, Status
  - Radius roles: Button, Card, Input, Badge, Modal
  - Layout: ContentWidth, WideWidth, ProseWidth
  - Show reference to primitive source

#### 1.5 Component Tokens Documentation
- [x] Create Component tokens page (`tokens/components/page.tsx`)
  - Button tokens (all variants)
  - Card tokens
  - Input tokens
  - Show reference chain to semantic → primitives

#### 1.6 Greenshift/WordPress Documentation
- [x] Create Greenshift page (`frameworks/greenshift/page.tsx`)
  - Preset color mappings
  - Custom properties (Button, Card, Input, Badge, Modal)
  - Style global settings
  - Copy-ready CSS code blocks

#### 1.7 Update Existing Pages
- [x] Update Colors page with semantic + primitive organization
- [x] Update Typography page with scale comparison (Major Second vs Major Third)
- [x] Update Spacing page with primitive spacing scale
- [x] Update Home page with accurate token counts
- [x] Update Sidebar navigation with new structure

---

### Phase 2: Node Relationship Viewer
> **Goal:** Interactive horizontal flow diagram showing token reference chains

#### 2.1 Flow Diagram Component
- [ ] Create `TokenFlowDiagram` component
- [ ] Implement horizontal layout (Greenshift → Semantic → Primitives → Value)
- [ ] Add node styling for each layer type
- [ ] Add connecting lines/arrows between nodes
- [ ] Add hover states showing full chain
- [ ] Add click interaction to expand/focus nodes

#### 2.2 Relationships Page
- [ ] Create Relationships page (`tools/relationships/page.tsx`)
- [ ] Add token selector (search/dropdown)
- [ ] Display selected token's full dependency chain
- [ ] Show "used by" references (reverse lookup)
- [ ] Add layer filter (show specific layers only)

#### 2.3 Integration
- [ ] Add "View Relationships" button to token chips
- [ ] Link from documentation pages to relationship viewer
- [ ] Add mini relationship preview on hover

---

### Phase 3: Export/Import API Themer
> **Goal:** Full playground with live preview, value editing, and theme export

#### 3.1 Token Playground
- [ ] Create Token Explorer page (`tools/explorer/page.tsx`)
- [ ] Implement searchable/filterable token list
- [ ] Add token type filters (color, number, string)
- [ ] Add layer filters (Primitive, Semantic, Component, Greenshift)
- [ ] Implement live value editing
- [ ] Show real-time preview updates

#### 3.2 Theme Preview Updates
- [ ] Update Preview page to use API data
- [ ] Add token variable names on component hover
- [ ] Implement "swap primitive reference" functionality
- [ ] Add theme state management
- [ ] Show active token overrides

#### 3.3 Export API
- [ ] Create export API route (`api/tokens/export/route.ts`)
- [ ] Support CSS variables export format
- [ ] Support JSON export format
- [ ] Support Figma-compatible JSON export
- [ ] Support WordPress theme.json export
- [ ] Add export UI with format selector

#### 3.4 Import/Save Themes
- [ ] Create import functionality for custom themes
- [ ] Add theme presets (default, custom variations)
- [ ] Implement theme saving (localStorage initially)
- [ ] Add "Share Theme" URL generation

---

## 🔧 Technical Notes

### Token Reference Format
Tokens reference each other using this path format:
```
{CollectionName.modes.ModeName.Group.Subgroup.Variable}
```

Example chain:
```
Greenshift.Light.Preset.Color.brand
  → {Semantic.modes.Light.Color.Brand.Default}
    → {Primitives.modes.Default.Color.Emerald.400}
      → #34d399
```

### API Response Format
```typescript
interface TokenResponse {
  collection: string;
  mode?: string;
  tokens: Token[];
  metadata: {
    count: number;
    types: string[];
    lastUpdated: string;
  };
}

interface Token {
  path: string;           // "Color.Emerald.400"
  name: string;           // "Emerald 400"
  value: string | number; // "#34d399" or 24
  type: string;           // "color" | "number"
  cssVariable: string;    // "--primitives-color-emerald-400"
  reference?: string;     // "{Primitives.modes.Default.Color.Emerald.400}"
  wpVariable?: string;    // "--wp--preset--color--brand"
}
```

### CSS Variable Naming Convention
- Primitives: `--primitives-{group}-{name}-{shade}`
- Semantic: `--semantic-{category}-{role}`
- Components: `--component-{component}-{property}`
- Greenshift: `--wp--{preset|custom|style}--{path}`

---

## 📝 Session Notes

### Session 1 - December 8, 2025
- Reviewed all token JSON files and documentation
- Analyzed current app structure
- Created comprehensive plan
- User approved with preferences:
  - Horizontal node flow diagram
  - Greenshift as secondary section
  - Skip dark mode for now
  - Full playground with live updates
  - API-based data fetching
- Priority: Documentation → Relationships → Export/Import

### Session 2 - December 8, 2025
- **Completed Phase 1.1 Data Layer Setup:**
  - Created comprehensive TypeScript interfaces (`lib/types.ts`)
  - Built token parser utility (`lib/tokens/parser.ts`) with support for all 5 layers
  - Implemented reference resolver (`lib/tokens/resolver.ts`) for resolving token chains
  - Created dependency chain builder (`lib/tokens/chains.ts`) for relationship visualization
  - Set up all API routes:
    - `/api/tokens` - All tokens
    - `/api/tokens/primitives` - Raw values
    - `/api/tokens/semantic` - Role-based tokens (Light/Dark modes)
    - `/api/tokens/components` - Component tokens
    - `/api/tokens/typography` - Type scales
    - `/api/tokens/greenshift` - WordPress mapping
    - `/api/tokens/export` - Export in CSS/JSON/Figma/WordPress formats
  - Created index file for easy imports

### Session 3 - December 8, 2025
- **Completed Phase 1.2 Reusable Components:**
  - `TokenChip` - displays tokens with color swatches and metadata
  - `ColorSwatch` - enhanced color display with copy functionality
  - `ColorPaletteGrid` - full 22×11 color grid with filtering
  - `SpacingVisual` and `SpacingScale` - visual spacing representations
  - `RadiusCurveIcon` and `RadiusScale` - border radius visualizations
  - `TokenReferenceChain` - inline token reference display
- **Completed Phase 1.3 Primitives Documentation:**
  - Created Primitives overview page (`/tokens/primitives`)
  - Created full color palettes page (`/tokens/primitives/colors`) with all 22 families
  - Updated spacing page with radius, duration, line-heights, font-weights
  - Updated Sidebar with new Foundations/Primitives section
- **Next up:** Phase 1.4 - Semantic Tokens Documentation

### Session 4 - December 8, 2025
- **Completed Phase 1.4 Semantic Tokens Documentation:**
  - Created Semantic tokens page (`/tokens/semantic`)
  - Documented all 9 color role categories:
    - Brand (Default, Hover, Light, Dark)
    - Secondary (Default, Hover, Light)
    - Background (Default, Alt)
    - Surface
    - Text (Foreground, Muted, Subtle, OnBrand, OnSecondary)
    - Card (Background, Border)
    - Border (Default, Strong)
    - Status (Success, Warning, Error, Info with Light variants)
    - Base
  - Documented 5 radius roles: Button, Card, Input, Badge, Modal
  - Documented 3 layout tokens: ContentWidth, WideWidth, ProseWidth
  - Added reference chain display showing Semantic → Primitive mapping
  - Updated Sidebar navigation with Semantic Overview link
- **Next up:** Phase 1.7 - Update Existing Pages

### Session 5 - December 8, 2025
- **Completed Phase 1.5 Component Tokens Documentation:**
  - Created Component tokens page (`/tokens/components`)
  - Documented Button tokens:
    - Default (Primary) variant: Background, Hover, Text, Radius, Padding
    - Size variants: sm, md, lg heights
    - Secondary variant: Background, Hover, Text
    - Outline variant: Background, Border, Text, Hover
  - Documented Card tokens: Background, Border, Text, Radius, Padding
  - Documented Input tokens: Background, Borders, Radius, Padding, Height, Text, Placeholder
  - Added reference chain visualization (Component → Semantic → Primitive)
  - Added live component previews for each component type
  - Added expandable variant sections with token details
  - Updated Sidebar navigation with "Component Tokens" section

### Session 6 - December 8, 2025
- **Completed Phase 1.6 Greenshift/WordPress Documentation:**
  - Created Greenshift/WordPress page (`/frameworks/greenshift`)
  - Documented all 24 Preset Color mappings across 8 categories:
    - Brand colors (brand, brand-hover, brand-light, brand-dark)
    - Secondary colors (secondary, secondary-hover, secondary-light)
    - Background & Surface (background, background-alt, surface)
    - Card colors (card-base, card-border, card-text)
    - Text colors (muted, subtle, text-on-brand, text-on-secondary)
    - Border colors (border, border-strong)
    - Status colors (success, warning, error, info)
    - Base color
  - Documented 14 Custom Properties for components:
    - Button (background, hover, text, radius, spacing)
    - Card (radius, spacing)
    - Input (background, border, radius, spacing)
    - Badge (radius)
    - Modal (radius)
  - Documented 2 Style Global settings (content-size, wide-size)
  - Added 3 copy-ready CSS code blocks
  - Added reference chain visualization (Greenshift → Semantic → Primitive)
  - Added Framework Adapter explanation
  - Updated Sidebar with "Frameworks" section
### Session 7 - December 8, 2025
- **Completed Phase 1.7 - Update Existing Pages:**
  - Updated Colors page (`/tokens/colors`) with:
    - Two-layer architecture explanation (Semantic → Primitive)
    - Link to primitive color palettes page
    - Expandable semantic color groups
    - Quick stats section
    - Reference chain visualization
    - Related pages links
  - Updated Typography page (`/tokens/typography`) with:
    - Consistent header with icon and breadcrumbs
    - Quick stats section
    - Improved scale comparison UI with clickable cards
    - Better organization and visual hierarchy
    - Related pages links
  - Updated Spacing page (`/tokens/spacing`) with:
    - Consistent header with icon and breadcrumbs
    - Quick stats section (31 spacing, 11 layout, 9 radius, 8 duration)
    - Related pages links
  - Updated Home page (`/page.tsx`) with:
    - Accurate token counts (245 colors, 22 type sizes, 31 spacing)
    - 5-layer architecture visualization
    - Updated feature cards for new structure
    - Better organization of navigation cards
  - Updated Sidebar (`/components/Sidebar.tsx`) with:
    - Final navigation structure
    - Proper active state detection
    - Children navigation support
    - Consistent iconography
- **Phase 1 Complete!** Ready to start Phase 2: Node Relationship Viewer

---

## 🚀 Getting Started (Next Session)

1. **Start Phase 2** - Node Relationship Viewer
2. Create `TokenFlowDiagram` component
3. Implement horizontal layout (Greenshift → Semantic → Primitives → Value)
4. Add node styling for each layer type
5. Create Relationships page (`tools/relationships/page.tsx`)

---

## 📊 Progress Tracker

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1: Documentation | ✅ Complete | 28/28 tasks |
| Phase 2: Relationships | ⚪ Pending | 0/9 tasks |
| Phase 3: Export/Import | ⚪ Pending | 0/12 tasks |

**Total Progress:** 28/49 tasks (57%)

---

## 🔗 Quick Links

- Token Files: `/tokens/`
- Current App: `http://localhost:3000`
- Figma Import Guide: `/tokens/IMPORT-GUIDE.md`
- CSS Reference: `/tokens/css-variables-reference.md`
