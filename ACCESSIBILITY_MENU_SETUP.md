# Standalone Accessibility Menu Setup Guide

Complete guide to integrate the accessibility menu in any project with feature flag configuration.

## Quick Start

### React Project

```tsx
import React from 'react';
import AccessibilityMenu from './examples/AccessibilityMenu';

function App() {
  return (
    <div>
      <AccessibilityMenu 
        position="top-right"
        showReset={true}
        onSettingsChange={(settings) => {
          console.log('Settings changed:', settings);
        }}
      />
      {/* Your app content */}
    </div>
  );
}

export default App;
```

### Vanilla JavaScript / HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Website</title>
</head>
<body>
  <script src="accessibility-menu.js"></script>
  <script>
    const menu = new AccessibilityMenu({
      position: 'top-right',
      showReset: true
    });
    menu.init();
  </script>

  <!-- Your page content -->
</body>
</html>
```

---

## Feature Flag Configuration

### Create a Config File

Create `a11y-config.ts` (or `.js` for vanilla):

```typescript
// a11y-config.ts
export const A11Y_FEATURES = {
  // Visual adjustments
  contrast: true,
  saturation: true,
  font: true,
  textSize: true,
  textSpacing: true,
  lineHeight: true,
  letterSpacing: true,
  
  // Content features
  cursorSize: true,
  highlightLinks: true,
  stopAnimations: true,
  hideImages: true,
  readingMask: true,
};

export type A11yFeatureFlags = typeof A11Y_FEATURES;
```

### React Component with Feature Flags

```tsx
import React, { useState, useEffect } from 'react';
import { A11Y_FEATURES, A11yFeatureFlags } from './a11y-config';

interface AccessibilitySettings {
  contrast: 'normal' | 'dark' | 'light';
  saturation: 'high' | 'normal' | 'low' | 'monochrome';
  font: 'standard' | 'readable';
  textSize: number;
  textSpacing: number;
  lineHeight: number;
  letterSpacing: number;
  cursorSize: 'normal' | 'big';
  highlightLinks: boolean;
  stopAnimations: boolean;
  hideImages: boolean;
  readingMask: boolean;
}

interface AccessibilityMenuProps {
  features?: Partial<A11yFeatureFlags>;
  onSettingsChange?: (settings: Partial<AccessibilitySettings>) => void;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showReset?: boolean;
}

export const AccessibilityMenuConfigurable: React.FC<AccessibilityMenuProps> = ({
  features = A11Y_FEATURES,
  onSettingsChange,
  position = 'top-right',
  showReset = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('a11y-settings');
    return saved ? JSON.parse(saved) : getDefaultSettings();
  });

  function getDefaultSettings(): AccessibilitySettings {
    return {
      contrast: 'normal',
      saturation: 'normal',
      font: 'standard',
      textSize: 100,
      textSpacing: 0,
      lineHeight: 1,
      letterSpacing: 0,
      cursorSize: 'normal',
      highlightLinks: false,
      stopAnimations: false,
      hideImages: false,
      readingMask: false,
    };
  }

  useEffect(() => {
    localStorage.setItem('a11y-settings', JSON.stringify(settings));
    onSettingsChange?.(settings);
    applySettings(settings);
  }, [settings, onSettingsChange]);

  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;

    if (features.contrast) {
      root.setAttribute('data-a11y-contrast', newSettings.contrast);
    }

    if (features.saturation) {
      root.setAttribute('data-a11y-saturation', newSettings.saturation);
    }

    if (features.font && newSettings.font === 'readable') {
      root.style.fontFamily = 'Arial, sans-serif';
    }

    if (features.textSize) {
      root.style.fontSize = `${newSettings.textSize}%`;
    }

    if (features.textSpacing) {
      root.style.wordSpacing = `${newSettings.textSpacing * 0.5}rem`;
    }

    if (features.lineHeight) {
      root.style.lineHeight = `${newSettings.lineHeight}`;
    }

    if (features.letterSpacing) {
      root.style.letterSpacing = `${newSettings.letterSpacing * 0.1}rem`;
    }

    if (features.cursorSize && newSettings.cursorSize === 'big') {
      document.body.style.cursor = 'url("data:image/svg+xml;base64,...") 16 16, auto';
    }

    if (features.highlightLinks && newSettings.highlightLinks) {
      applyHighlightLinks();
    }

    if (features.stopAnimations && newSettings.stopAnimations) {
      applyStopAnimations();
    }

    if (features.hideImages && newSettings.hideImages) {
      applyHideImages();
    }

    if (features.readingMask && newSettings.readingMask) {
      applyReadingMask();
    }
  };

  const applyHighlightLinks = () => {
    // Apply highlight styles
  };

  const applyStopAnimations = () => {
    // Apply animation stop styles
  };

  const applyHideImages = () => {
    // Apply hide images styles
  };

  const applyReadingMask = () => {
    // Apply reading mask overlay
  };

  const handleSettingChange = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setSettings(getDefaultSettings());
  };

  return (
    <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 50 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close accessibility menu' : 'Open accessibility menu'}
        aria-expanded={isOpen}
        style={{
          minWidth: '44px',
          minHeight: '44px',
          padding: '0.75rem',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '1.25rem',
        }}
      >
        ♿
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Accessibility settings"
          style={{
            position: 'absolute',
            top: '60px',
            right: '0',
            width: '320px',
            background: 'white',
            border: '2px solid #2563eb',
            borderRadius: '8px',
            padding: '1.5rem',
            zIndex: 9998,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: 'bold' }}>
            Accessibility Settings
          </h2>

          {/* Contrast Control */}
          {features.contrast && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Contrast
              </label>
              <select
                value={settings.contrast}
                onChange={(e) => handleSettingChange('contrast', e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  minHeight: '44px',
                }}
              >
                <option value="normal">Normal</option>
                <option value="dark">Dark Contrast</option>
                <option value="light">Light Contrast</option>
              </select>
            </div>
          )}

          {/* Text Size Control */}
          {features.textSize && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Text Size: {settings.textSize}%
              </label>
              <input
                type="range"
                min="100"
                max="150"
                value={settings.textSize}
                onChange={(e) => handleSettingChange('textSize', parseInt(e.target.value))}
                style={{ width: '100%', height: '8px', minHeight: '44px' }}
              />
            </div>
          )}

          {/* Add more controls based on enabled features */}

          {showReset && (
            <button
              onClick={handleReset}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                minHeight: '44px',
              }}
            >
              Reset All Settings
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AccessibilityMenuConfigurable;
```

### Usage with Custom Features

```tsx
import AccessibilityMenu from './AccessibilityMenu';

// Only show contrast and text size controls
<AccessibilityMenu
  features={{
    contrast: true,
    textSize: true,
    saturation: false,
    highlightLinks: false,
    stopAnimations: false,
    hideImages: false,
    readingMask: false,
    // ... other features disabled
  }}
/>
```

---

## Environment-Based Configuration

### Development (all features)
```typescript
const features = process.env.NODE_ENV === 'development' 
  ? A11Y_FEATURES  // All features enabled
  : {
      // Production: only essential features
      contrast: true,
      textSize: true,
      font: true,
      highlightLinks: false,
      stopAnimations: false,
      hideImages: false,
      readingMask: false,
    };
```

### Feature Rollout by User Role

```typescript
const getUserFeatures = (userRole: 'admin' | 'user') => {
  const baseFeatures = {
    contrast: true,
    textSize: true,
    font: true,
  };

  if (userRole === 'admin') {
    return { ...baseFeatures, hideImages: true, readingMask: true };
  }

  return baseFeatures;
};
```

---

## Vanilla JavaScript with Feature Flags

```javascript
// a11y-config.js
const A11Y_FEATURES = {
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
};

// Initialize with specific features
const menu = new AccessibilityMenu({
  position: 'top-right',
  showReset: true,
  features: {
    contrast: true,
    textSize: true,
    highlightLinks: false,  // Disabled
    stopAnimations: false,  // Disabled
  }
});

menu.init();
```

---

## Integration Examples

### Next.js

```tsx
// app/layout.tsx
import AccessibilityMenu from '@/components/AccessibilityMenu';
import { A11Y_FEATURES } from '@/config/a11y-config';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AccessibilityMenu 
          features={A11Y_FEATURES}
          position="top-right"
        />
        {children}
      </body>
    </html>
  );
}
```

### Vue.js

```vue
<template>
  <div id="app">
    <AccessibilityMenu 
      :features="features"
      position="top-right"
      @settings-change="onSettingsChange"
    />
    <router-view />
  </div>
</template>

<script setup>
import AccessibilityMenu from '@/components/AccessibilityMenu.vue';
import { A11Y_FEATURES } from '@/config/a11y-config';

const features = A11Y_FEATURES;

const onSettingsChange = (settings) => {
  console.log('A11y settings updated:', settings);
};
</script>
```

### Angular

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { A11Y_FEATURES } from './config/a11y-config';

@Component({
  selector: 'app-root',
  template: `
    <app-accessibility-menu 
      [features]="features"
      position="top-right"
      (settingsChange)="onSettingsChange($event)"
    ></app-accessibility-menu>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  features = A11Y_FEATURES;

  onSettingsChange(settings: any) {
    console.log('A11y settings updated:', settings);
  }
}
```

---

## Feature Reference

| Feature | Type | Description |
|---------|------|-------------|
| `contrast` | Boolean | Dark/Light/Normal contrast modes |
| `saturation` | Boolean | Color saturation adjustment |
| `font` | Boolean | Standard/Readable font selection |
| `textSize` | Boolean | Text size scaling (100-150%) |
| `textSpacing` | Boolean | Word spacing adjustment |
| `lineHeight` | Boolean | Line height adjustment |
| `letterSpacing` | Boolean | Letter spacing adjustment |
| `cursorSize` | Boolean | Bigger cursor option |
| `highlightLinks` | Boolean | Highlight links and headings |
| `stopAnimations` | Boolean | Disable animations/transitions |
| `hideImages` | Boolean | Hide all images |
| `readingMask` | Boolean | Highlight current reading area |

---

## Next Steps

1. Copy the menu files to your project:
   - React: Copy `examples/AccessibilityMenu.tsx`
   - Vanilla JS: Copy `examples/accessibility-menu.js`

2. Create `a11y-config.ts` with your feature flags

3. Import and use in your main layout/app component

4. Customize features as needed for your users

5. Test with keyboard navigation and screen readers
