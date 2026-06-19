# 🎛️ AccessibilityMenu - Complete Configuration Guide

**Complete guide to configuring the AccessibilityMenu component with 40+ options.**

---

## ⚡ Quick Start

### Minimal Setup (Default Config)

```tsx
import { AccessibilityMenu } from '@a11y-toolkit/core';

export default function App() {
  return <AccessibilityMenu />;
}
```

### Customized Setup

```tsx
import { AccessibilityMenu } from '@a11y-toolkit/core';

export default function App() {
  return (
    <AccessibilityMenu
      position="bottom-right"
      theme="dark"
      showReset={true}
      onSettingsChange={(settings) => console.log('Settings:', settings)}
      colors={{
        buttonBackground: '#ff6b6b',
        buttonText: '#ffffff',
      }}
    />
  );
}
```

---

## 📋 Configuration Options

### Layout & Positioning

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'top-right'` | Where menu button appears on screen |
| `buttonPosition` | `'fixed' \| 'absolute'` | `'fixed'` | Button positioning (fixed = stays in viewport, absolute = moves with scroll) |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Menu panel size |
| `zIndex` | `number` | `50` | CSS z-index for menu container |
| `buttonZIndex` | `number` | `9999` | CSS z-index for button (should be higher than zIndex) |

**Example:**
```tsx
<AccessibilityMenu
  position="bottom-left"
  buttonPosition="fixed"
  size="large"
  zIndex={100}
  buttonZIndex={10000}
/>
```

---

### Button Styling

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `buttonLabel` | `string` | `'♿'` | Text/emoji shown on button |
| `buttonStyle` | `'circle' \| 'square' \| 'rounded'` | `'circle'` | Button shape |
| `showKeyboardHint` | `boolean` | `true` | Show "Ctrl+A" hint in button title |

**Example:**
```tsx
<AccessibilityMenu
  buttonLabel="A11y"
  buttonStyle="rounded"
  showKeyboardHint={true}
/>
```

---

### Color Customization

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `buttonBackground` | `string` | `'#2563eb'` | Button background color |
| `buttonText` | `string` | `'#ffffff'` | Button text/icon color |
| `buttonHover` | `string` | `'#1d4ed8'` | Button hover background color |
| `panelBackground` | `string` | `'#ffffff'` | Menu panel background |
| `panelBorder` | `string` | `'#2563eb'` | Menu panel border color |
| `panelText` | `string` | `'#000000'` | Menu panel text color |
| `resetButtonBackground` | `string` | `'#f3f4f6'` | Reset button background |
| `resetButtonHover` | `string` | `'#e5e7eb'` | Reset button hover color |

**Example:**
```tsx
<AccessibilityMenu
  colors={{
    buttonBackground: '#ff6b6b',
    buttonText: '#ffffff',
    panelBackground: '#1a1a1a',
    panelText: '#ffffff',
    panelBorder: '#ff6b6b',
    buttonHover: '#ff5252',
  }}
/>
```

---

### Label Customization

All 28 labels can be customized for different languages/terminology:

```tsx
<AccessibilityMenu
  labels={{
    menuTitle: 'Accessibility Options',
    contrast: 'Color Contrast',
    saturation: 'Color Saturation',
    font: 'Font Style',
    textSize: 'Text Size',
    textSpacing: 'Word Spacing',
    lineHeight: 'Line Height',
    letterSpacing: 'Letter Spacing',
    cursorSize: 'Cursor Size',
    highlightLinks: 'Highlight All Links',
    stopAnimations: 'Disable Animations',
    hideImages: 'Hide All Images',
    readingMask: 'Reading Focus Mask',
    reset: 'Reset All',
    normalContrast: 'Normal Colors',
    darkContrast: 'Dark Mode',
    lightContrast: 'Light Mode',
    normalSaturation: 'Normal Colors',
    highSaturation: 'High Saturation',
    lowSaturation: 'Low Saturation',
    monochromeMode: 'Grayscale',
    standardFont: 'Standard Font',
    dyslexiaFont: 'Dyslexia-Friendly',
    normalCursor: 'Normal',
    bigCursor: 'Large',
  }}
/>
```

---

### Feature Flags (Enable/Disable Features)

Control which accessibility features are shown:

```tsx
<AccessibilityMenu
  features={{
    contrast: true,        // Color contrast modes
    saturation: true,      // Color saturation levels
    font: true,            // Font selection
    textSize: true,        // Text size adjustment
    textSpacing: true,     // Word spacing
    lineHeight: true,      // Line height adjustment
    letterSpacing: true,   // Letter spacing adjustment
    cursorSize: true,      // Cursor size option
    highlightLinks: true,  // Link highlighting
    stopAnimations: true,  // Animation disable
    hideImages: true,      // Image hiding
    readingMask: true,     // Reading focus mask
  }}
/>
```

**Example - Minimal Features:**
```tsx
<AccessibilityMenu
  features={{
    contrast: true,
    textSize: true,
    font: true,
    // All others disabled
  }}
/>
```

---

### Menu Behavior

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `showReset` | `boolean` | `true` | Show reset button |
| `closeOnEscape` | `boolean` | `true` | Close menu on Escape key |
| `closeOnClickOutside` | `boolean` | `true` | Close menu when clicking outside |
| `autoSave` | `boolean` | `true` | Auto-save settings to localStorage |
| `storageKey` | `string` | `'a11y-settings'` | localStorage key for saving settings |
| `enableAnimation` | `boolean` | `true` | Enable smooth animations |
| `animationDuration` | `number` | `300` | Animation duration in ms |

**Example:**
```tsx
<AccessibilityMenu
  showReset={true}
  closeOnEscape={true}
  closeOnClickOutside={true}
  autoSave={true}
  storageKey="my-app-a11y-settings"
  enableAnimation={true}
  animationDuration={400}
/>
```

---

### Theme & Styling

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Menu theme (auto = follows system) |

**Example:**
```tsx
<AccessibilityMenu theme="dark" />
```

---

### Text Size Range

Control min/max/step for text size slider:

```tsx
<AccessibilityMenu
  textSizeMin={80}      // Minimum: 80%
  textSizeMax={150}     // Maximum: 150%
  textSizeStep={10}     // Step: 10%
/>
```

---

### Text Spacing Range

Control word spacing slider:

```tsx
<AccessibilityMenu
  spacingMin={0}
  spacingMax={10}
  spacingStep={1}
/>
```

---

### Line Height Range

Control line height slider:

```tsx
<AccessibilityMenu
  lineHeightMin={1}     // Minimum: 1.0
  lineHeightMax={2}     // Maximum: 2.0
  lineHeightStep={0.1}  // Step: 0.1
/>
```

---

### Letter Spacing Range

Control letter spacing slider:

```tsx
<AccessibilityMenu
  letterSpacingMin={0}
  letterSpacingMax={10}
  letterSpacingStep={1}
/>
```

---

### Callbacks & Events

| Option | Type | Description |
|--------|------|-------------|
| `onSettingsChange` | `(settings: AccessibilitySettings) => void` | Fired when user changes any setting |
| `onOpen` | `() => void` | Fired when menu opens |
| `onClose` | `() => void` | Fired when menu closes |
| `onReset` | `() => void` | Fired when user clicks reset |

**Example:**
```tsx
<AccessibilityMenu
  onSettingsChange={(settings) => {
    console.log('User updated settings:', settings);
    // Sync to backend, analytics, etc.
  }}
  onOpen={() => console.log('Menu opened')}
  onClose={() => console.log('Menu closed')}
  onReset={() => console.log('User reset all settings')}
/>
```

---

### Accessibility (ARIA)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ariaLabel` | `string` | `'Accessibility menu'` | ARIA label for menu |
| `ariaDescribedBy` | `string` | `'a11y-menu-description'` | ARIA describedBy element ID |
| `role` | `string` | `'dialog'` | ARIA role for menu |

**Example:**
```tsx
<AccessibilityMenu
  ariaLabel="Accessibility options"
  role="dialog"
/>
```

---

### Debug & Logging

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `debug` | `boolean` | `false` | Enable debug logging |
| `enableLogging` | `boolean` | `false` | Log config initialization |

**Example:**
```tsx
<AccessibilityMenu
  debug={true}
  enableLogging={true}
/>
```

---

## 🎯 Complete Configuration Example

```tsx
import { AccessibilityMenu } from '@a11y-toolkit/core';

export default function App() {
  return (
    <AccessibilityMenu
      // Layout
      position="bottom-right"
      buttonPosition="fixed"
      size="medium"
      
      // Button
      buttonLabel="♿"
      buttonStyle="circle"
      showKeyboardHint={true}
      
      // Colors
      colors={{
        buttonBackground: '#2563eb',
        buttonText: '#ffffff',
        buttonHover: '#1d4ed8',
        panelBackground: '#ffffff',
        panelBorder: '#2563eb',
        panelText: '#000000',
        resetButtonBackground: '#f3f4f6',
        resetButtonHover: '#e5e7eb',
      }}
      
      // Features
      features={{
        contrast: true,
        saturation: true,
        font: true,
        textSize: true,
        textSpacing: true,
        lineHeight: true,
        letterSpacing: true,
        cursorSize: true,
        highlightLinks: true,
        stopAnimations: true,
        hideImages: true,
        readingMask: true,
      }}
      
      // Behavior
      showReset={true}
      closeOnEscape={true}
      closeOnClickOutside={true}
      autoSave={true}
      storageKey="a11y-settings"
      enableAnimation={true}
      animationDuration={300}
      
      // Ranges
      textSizeMin={80}
      textSizeMax={150}
      textSizeStep={10}
      spacingMin={0}
      spacingMax={10}
      spacingStep={1}
      lineHeightMin={1}
      lineHeightMax={2}
      lineHeightStep={0.1}
      letterSpacingMin={0}
      letterSpacingMax={10}
      letterSpacingStep={1}
      
      // Callbacks
      onSettingsChange={(settings) => {
        console.log('Settings:', settings);
      }}
      onOpen={() => console.log('Opened')}
      onClose={() => console.log('Closed')}
      onReset={() => console.log('Reset')}
      
      // Accessibility
      ariaLabel="Accessibility menu"
      role="dialog"
      
      // Debug
      debug={false}
      enableLogging={false}
    />
  );
}
```

---

## 🎨 Dark Theme Example

```tsx
<AccessibilityMenu
  theme="dark"
  colors={{
    buttonBackground: '#1f2937',
    buttonText: '#ffffff',
    panelBackground: '#111827',
    panelBorder: '#4f46e5',
    panelText: '#ffffff',
    buttonHover: '#374151',
    resetButtonBackground: '#374151',
    resetButtonHover: '#4b5563',
  }}
/>
```

---

## 🌐 Multi-Language Example

```tsx
<AccessibilityMenu
  labels={{
    menuTitle: 'Opciones de Accesibilidad',
    contrast: 'Contraste',
    saturation: 'Saturación',
    font: 'Fuente',
    textSize: 'Tamaño de Texto',
    textSpacing: 'Espaciado de Palabras',
    lineHeight: 'Altura de Línea',
    letterSpacing: 'Espaciado de Letras',
    cursorSize: 'Tamaño del Cursor',
    highlightLinks: 'Resaltar Enlaces',
    stopAnimations: 'Detener Animaciones',
    hideImages: 'Ocultar Imágenes',
    readingMask: 'Máscara de Lectura',
    reset: 'Reiniciar',
    // ... rest of labels in Spanish
  }}
/>
```

---

## 📊 Settings Object Structure

When settings change, the callback receives this object:

```typescript
interface AccessibilitySettings {
  contrast: 'normal' | 'dark' | 'light';
  saturation: 'high' | 'normal' | 'low' | 'monochrome';
  font: 'standard' | 'readable';
  textSize: number;              // 80-150
  textSpacing: number;           // 0-10
  lineHeight: number;            // 1-2
  letterSpacing: number;         // 0-10
  cursorSize: 'normal' | 'big';
  highlightLinks: boolean;
  stopAnimations: boolean;
  hideImages: boolean;
  readingMask: boolean;
}
```

**Example Usage:**
```tsx
<AccessibilityMenu
  onSettingsChange={(settings) => {
    if (settings.contrast === 'dark') {
      document.documentElement.classList.add('dark-mode');
    }
    
    if (settings.font === 'readable') {
      document.documentElement.style.fontFamily = 'Arial, sans-serif';
    }
    
    // Save to database
    fetch('/api/accessibility-settings', {
      method: 'POST',
      body: JSON.stringify(settings),
    });
  }}
/>
```

---

## ⌨️ Keyboard Shortcuts

- **Ctrl+A** - Toggle menu open/close
- **Escape** - Close menu (if `closeOnEscape={true}`)

---

## 💾 localStorage

Settings are automatically saved to localStorage under the key you specify:

```tsx
// Saves to localStorage['a11y-settings']
<AccessibilityMenu storageKey="a11y-settings" />

// Saves to localStorage['my-app-accessibility']
<AccessibilityMenu storageKey="my-app-accessibility" />
```

**Saved Format:**
```json
{
  "contrast": "normal",
  "saturation": "normal",
  "font": "standard",
  "textSize": 100,
  "textSpacing": 0,
  "lineHeight": 1,
  "letterSpacing": 0,
  "cursorSize": "normal",
  "highlightLinks": false,
  "stopAnimations": false,
  "hideImages": false,
  "readingMask": false
}
```

---

## 🚀 Advanced Configuration Patterns

### Conditional Features Based on Device

```tsx
const isMobile = window.innerWidth < 768;

<AccessibilityMenu
  features={{
    contrast: true,
    textSize: true,
    font: isMobile ? false : true, // Disable on mobile
    readingMask: isMobile ? true : false, // Enable on mobile
  }}
/>
```

### Sync Across Browser Tabs

```tsx
<AccessibilityMenu
  onSettingsChange={(settings) => {
    // Broadcast to other tabs
    const channel = new BroadcastChannel('a11y-settings');
    channel.postMessage(settings);
  }}
/>
```

### Analytics Tracking

```tsx
<AccessibilityMenu
  onSettingsChange={(settings) => {
    // Track which features users enable
    gtag('event', 'accessibility_setting_changed', {
      feature: Object.keys(settings),
      values: Object.values(settings),
    });
  }}
  onOpen={() => gtag('event', 'accessibility_menu_opened')}
  onClose={() => gtag('event', 'accessibility_menu_closed')}
/>
```

---

## ✅ Best Practices

1. **Always provide accessible labels** - Don't rely on icons alone
2. **Use high contrast colors** - At least 4.5:1 WCAG AA ratio
3. **Test on different devices** - Mobile, tablet, desktop
4. **Save user preferences** - Don't reset on page reload (autoSave=true)
5. **Provide reset option** - Users should be able to undo changes
6. **Handle all 12 features** - Or explicitly disable unwanted ones
7. **Add to global layout** - Make it available on every page
8. **Test keyboard navigation** - Escape key, tab order
9. **Use semantic HTML** - Proper form labels and roles
10. **Document custom labels** - If translating, keep all translations

---

## 📦 Type Exports

All types are exported from the package:

```typescript
import {
  AccessibilityMenu,
  AccessibilityMenuConfig,
  AccessibilityMenuProps,
  AccessibilitySettings,
  A11yFeatureFlags,
  AccessibilityMenuColors,
  AccessibilityMenuLabels,
  MenuPosition,
  MenuSize,
  MenuTheme,
  ButtonStyle,
  DEFAULT_FEATURES,
  DEFAULT_SETTINGS,
  DEFAULT_COLORS,
  DEFAULT_LABELS,
  mergeConfig,
} from '@a11y-toolkit/core';
```

---

## 🐛 Troubleshooting

### Settings Not Persisting

**Problem:** Settings reset on page reload  
**Solution:** Ensure `autoSave={true}` and check localStorage is enabled

### Button Not Visible

**Problem:** Can't see the accessibility button  
**Solution:** Check `zIndex` and `buttonZIndex` values, ensure parent elements aren't hiding it

### Styles Not Applying

**Problem:** Text size/contrast changes not working  
**Solution:** Ensure no conflicting CSS, check browser console for errors

### Custom Colors Not Working

**Problem:** Colors not changing from defaults  
**Solution:** Check color format (must be valid CSS color: `#fff`, `rgb()`, `hsl()`, etc.)

---

## 📚 See Also

- [AccessibilityMenu Component Guide](./ACCESSIBILITY_MENU_SETUP.md)
- [Quick Start](./QUICK_START.md)
- [React Integration](./REACT_VS_NONREACT_GUIDE.md)
- [API Reference](./README.md)

---

**Complete configuration options for maximum accessibility customization!** 🎉

