# Theme Generator & Previewer - Feature Plan

## Overview

The Theme Generator is an interactive tool that helps users:
1. **Learn** - Understand how design tokens cascade from primitives → semantics → components
2. **Explore** - Experiment with color palettes, radius scales, and typography
3. **Create** - Build custom themes for new website designs
4. **Export** - Generate Figma-compatible JSON for variable import

---

## Feature Goals

### 1. Educational Visualization
**Goal**: Help users build a mental model of the token system architecture.

- **Token Flow Diagram**: Visual representation showing how a hex value flows through layers
- **Cascade Highlighting**: When a semantic color is selected, highlight which components inherit from it
- **Reference Tracing**: Click any component to see its full token reference chain

### 2. Color Palette Builder
**Goal**: Enable users to create harmonious palettes using the primitive color library.

#### Semantic Color Mapping
For each semantic color slot (Brand, Secondary, Background, etc.):
- **Primitive Picker**: Dropdown to select base color group (Blue, Emerald, Violet, etc.)
- **Shade Slider**: Adjust between shades (50-950) with visual feedback
- **Color Preview**: Live swatch showing selected color with hex/CSS variable

#### Supported Semantic Slots
- `Brand` (Default, Hover, Light, Dark)
- `Secondary` (Default, Hover, Light)
- `Background` (Default, Alt)
- `Surface`
- `Text` (Foreground, Muted, Subtle)
- `Border` (Default, Strong)
- `Status` (Success, Warning, Error, Info)

### 3. Global Variable Controls
**Goal**: Adjust foundational design properties that affect all components.

#### Radius Scale
- **Base Radius Adjustment**: Slider to shift entire radius scale (sharper ↔ rounder)
- **Preview**: Show Button, Card, Input, Badge with current radius values
- **Presets**: Sharp (none/sm), Default (md/lg), Rounded (xl/2xl), Pill (full)

#### Typography Scale  
- **Scale Selector**: Major Second vs Major Third
- **Base Size**: Adjust root font size
- **Preview**: Type scale comparison with all sizes

### 4. Live Component Preview
**Goal**: Show real-time changes on mockup website components.

#### Preview Components
- **Hero Section**: Headline, body text, CTA buttons
- **Card Grid**: Feature cards with icons, titles, descriptions
- **Form Elements**: Inputs, selects, checkboxes, buttons
- **Navigation**: Header with logo, menu items, CTA
- **Footer**: Links, social icons, newsletter signup

#### Preview Controls
- **Mode Toggle**: Light / Dark mode preview
- **Device Frame**: Desktop / Tablet / Mobile viewport
- **Zoom**: Scale preview for better visibility

### 5. Export & Import
**Goal**: Enable theme portability between tools.

#### Export Formats
- **Figma JSON**: Compatible with Figma Variables Manager plugin
- **CSS Variables**: Custom properties for direct web use
- **Design Tokens JSON**: Standard W3C design tokens format

#### Import
- **Load Preset**: Built-in theme presets (Professional, Playful, Corporate, etc.)
- **Import JSON**: Upload previously exported theme
- **Reset**: Restore default Altitude theme values

---

## User Interface Layout

### Three-Column Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Header: Theme Generator                              [Export] [Reset]  │
├────────────────┬────────────────────────────────┬───────────────────────┤
│                │                                │                       │
│  TOKEN         │  LIVE PREVIEW                  │  INSPECTOR            │
│  CONTROLS      │                                │                       │
│                │  ┌────────────────────────┐    │  Token Chain:         │
│  ▼ Colors      │  │                        │    │  Button.Background    │
│    Brand       │  │   [Website Mockup]     │    │    ↓                  │
│    Secondary   │  │                        │    │  Semantic.Brand       │
│    Background  │  │                        │    │    ↓                  │
│    ...         │  │                        │    │  Primitive.Blue.500   │
│                │  │                        │    │    ↓                  │
│  ▼ Radius      │  └────────────────────────┘    │  #3b82f6              │
│    [Slider]    │                                │                       │
│                │  Mode: [Light] [Dark]          │  Updates:             │
│  ▼ Typography  │  Device: [Desktop][Mobile]    │  • Button Primary     │
│    [Scale]     │                                │  • Link Hover         │
│                │                                │  • Focus Ring         │
└────────────────┴────────────────────────────────┴───────────────────────┘
```

### Left Panel: Token Controls
- Collapsible sections for each token category
- Color selectors with primitive group + shade
- Sliders for numeric values
- Visual previews inline with controls

### Center Panel: Live Preview
- Responsive website mockup
- Real-time updates as tokens change
- Mode and device toggles
- Interactive - click elements to inspect

### Right Panel: Inspector
- Shows selected element's token chain
- Lists all components affected by current selection
- Displays resolved CSS values
- Copy individual values

---

## Technical Requirements

### State Management
- Theme state stored in React Context
- Changes update CSS custom properties in real-time
- Debounced updates for performance

### Token Resolution
- Parse token references (e.g., `{Primitives.modes.Default.Color.Blue.500}`)
- Build dependency graph for cascade visualization
- Calculate resolved values for preview

### Export Generation
- Generate Figma-compatible JSON structure
- Map internal tokens to WordPress variables (Greenshift layer)
- Validate output against Figma Variables schema

### Persistence
- LocalStorage for work-in-progress themes
- URL state for shareable theme configurations
- Named theme saves with export history

---

## UI Component Specifications

### Color Picker Control
```
┌─────────────────────────────────────────┐
│  Brand Color                       [●]  │
├─────────────────────────────────────────┤
│  Primitive: [Emerald        ▼]          │
│                                         │
│  [50][100][200][300][400][500]...       │
│           ↑ Selected: 400               │
│                                         │
│  Preview:  ████████  #34d399            │
│  CSS Var:  var(--color-brand)           │
└─────────────────────────────────────────┘
```

### Radius Control
```
┌─────────────────────────────────────────┐
│  Border Radius                          │
├─────────────────────────────────────────┤
│  Preset: [Sharp] [Default] [Rounded]    │
│                                         │
│  ○────────●────────○                    │
│  Sharp          Rounded                 │
│                                         │
│  Button: 6px   Card: 8px   Input: 4px   │
│  ┌──────┐ ┌────────┐ ┌──────────────┐   │
│  │Button│ │  Card  │ │  Input       │   │
│  └──────┘ └────────┘ └──────────────┘   │
└─────────────────────────────────────────┘
```

### Token Chain Inspector
```
┌─────────────────────────────────────────┐
│  📍 Button.Background.Default           │
├─────────────────────────────────────────┤
│                                         │
│  Component Layer                        │
│  └─ Button.Background.Default           │
│        │                                │
│        ▼                                │
│  Semantic Layer                         │
│  └─ Color.Brand.Default                 │
│        │                                │
│        ▼                                │
│  Primitive Layer                        │
│  └─ Color.Emerald.400                   │
│        │                                │
│        ▼                                │
│  Resolved Value                         │
│  └─ #34d399  ████                       │
│                                         │
│  ─────────────────────────────────────  │
│  Also uses this token:                  │
│  • Outline Button Border                │
│  • Link Hover Color                     │
│  • Focus Ring                           │
│  • Progress Bar Fill                    │
└─────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 1: Core Infrastructure
- [ ] Theme context and state management
- [ ] Token parsing and resolution engine
- [ ] CSS custom property injection
- [ ] Basic UI layout structure

### Phase 2: Color Controls
- [ ] Primitive color picker component
- [ ] Shade selector with visual scale
- [ ] Semantic color mapping panel
- [ ] Live preview updates

### Phase 3: Live Preview
- [ ] Website mockup components
- [ ] Light/Dark mode toggle
- [ ] Device viewport simulation
- [ ] Component click-to-inspect

### Phase 4: Additional Controls
- [ ] Radius scale adjustment
- [ ] Typography scale selection
- [ ] Spacing preview (optional)

### Phase 5: Export & Polish
- [ ] Figma JSON export
- [ ] CSS variables export
- [ ] Import/load functionality
- [ ] Theme presets
- [ ] URL state persistence

---

## Success Metrics

1. **Understanding**: Users can explain how changing Brand color affects buttons
2. **Exploration**: Users try 3+ color combinations before settling on a theme
3. **Completion**: Users successfully export a theme to Figma
4. **Return Usage**: Users come back to refine themes

---

## Appendix: Token Reference Map

### Semantic → Primitive (Default Light Mode)
| Semantic Token | Default Primitive Reference |
|----------------|----------------------------|
| Brand.Default | Emerald.400 |
| Brand.Hover | Emerald.500 |
| Brand.Light | Emerald.100 |
| Brand.Dark | Emerald.700 |
| Secondary.Default | Violet.900 |
| Secondary.Hover | Violet.950 |
| Secondary.Light | Violet.100 |
| Background.Default | Gray.50 |
| Background.Alt | Gray.100 |
| Surface | Base.White |
| Text.Foreground | Gray.900 |
| Text.Muted | Gray.500 |
| Text.Subtle | Gray.400 |

### Component → Semantic
| Component Token | Semantic Reference |
|-----------------|-------------------|
| Button.Background.Default | Brand.Default |
| Button.Background.Hover | Brand.Hover |
| Button.Text | Text.OnBrand |
| Card.Background | Card.Background |
| Card.Border | Card.Border |
| Input.Background | Surface |
| Input.Border.Default | Border.Default |
| Input.Border.Focus | Brand.Default |
