# Installation & Setup Guide

## 1. Install the Package

```bash
npm install @a11y-toolkit/core
# or
yarn add @a11y-toolkit/core
# or
pnpm add @a11y-toolkit/core
```

## 2. Import in Your Project

### React App

```tsx
import {
  initializeAccessibility,
  AccessibleNav,
  AccessibleButton,
  AccessibleInput,
  AccessibleModal,
  AccessibleTabs,
  useA11yConfig,
} from '@a11y-toolkit/core';

// At the root of your app
initializeAccessibility({ wcagLevel: 'AA' });
```

### Vanilla JavaScript

```javascript
import {
  initializeAccessibility,
  checkContrast,
  KEYS,
  announceToScreenReader,
} from '@a11y-toolkit/core';

initializeAccessibility({ wcagLevel: 'AA' });
```

## 3. Project-Specific Setup

### Create React App (CRA)

```bash
npm install @a11y-toolkit/core
```

Update `src/index.tsx`:
```tsx
import { initializeAccessibility } from '@a11y-toolkit/core';

initializeAccessibility({ wcagLevel: 'AA' });
```

### Next.js

```bash
npm install @a11y-toolkit/core
```

Create `app/accessibility-provider.tsx`:
```tsx
'use client';
import { useEffect } from 'react';
import { initializeAccessibility } from '@a11y-toolkit/core';

export function AccessibilityProvider() {
  useEffect(() => {
    initializeAccessibility({ wcagLevel: 'AA' });
  }, []);

  return null;
}
```

Use in `app/layout.tsx`:
```tsx
import { AccessibilityProvider } from './accessibility-provider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AccessibilityProvider />
        {children}
      </body>
    </html>
  );
}
```

### Vite

```bash
npm install @a11y-toolkit/core
```

Update `src/main.tsx`:
```tsx
import { initializeAccessibility } from '@a11y-toolkit/core';
import App from './App.tsx';

initializeAccessibility({ wcagLevel: 'AA' });
```

### Vue.js

```bash
npm install @a11y-toolkit/core
```

Create `src/plugins/accessibility.ts`:
```typescript
import { App } from 'vue';
import { initializeAccessibility } from '@a11y-toolkit/core';

export default {
  install(app: App) {
    initializeAccessibility({ wcagLevel: 'AA' });
  },
};
```

Use in `src/main.ts`:
```typescript
import { createApp } from 'vue';
import accessibilityPlugin from './plugins/accessibility';
import App from './App.vue';

createApp(App).use(accessibilityPlugin).mount('#app');
```

### Svelte

```bash
npm install @a11y-toolkit/core
```

Create `src/lib/accessibility.ts`:
```typescript
import { initializeAccessibility } from '@a11y-toolkit/core';

export function setupAccessibility(level: 'A' | 'AA' | 'AAA' = 'AA') {
  initializeAccessibility({ wcagLevel: level });
}
```

Use in `src/routes/+page.svelte`:
```svelte
<script>
  import { setupAccessibility } from '$lib/accessibility';
  import { onMount } from 'svelte';

  onMount(() => {
    setupAccessibility('AA');
  });
</script>
```

### Angular

```bash
npm install @a11y-toolkit/core
```

Create `src/app/accessibility.service.ts`:
```typescript
import { Injectable } from '@angular/core';
import { initializeAccessibility } from '@a11y-toolkit/core';

@Injectable({ providedIn: 'root' })
export class AccessibilityService {
  constructor() {
    initializeAccessibility({ wcagLevel: 'AA' });
  }
}
```

Use in `src/main.ts`:
```typescript
import { AccessibilityService } from './app/accessibility.service';

// Inject in your root component
```

### Webpack Project

```bash
npm install @a11y-toolkit/core
```

In your entry file:
```javascript
import { initializeAccessibility } from '@a11y-toolkit/core';

initializeAccessibility({ wcagLevel: 'AA' });

// Rest of your app
```

## 4. Configuration

### Default Configuration
```typescript
initializeAccessibility({
  wcagLevel: 'AA',          // Recommended for most businesses
  enableLogging: false,      // Set to true for debugging
  locale: 'en',              // Language code
});
```

### Custom Configuration
```typescript
initializeAccessibility({
  wcagLevel: 'AAA',          // Stricter compliance
  enableLogging: true,
  customRules: {
    colorContrast: 7,        // 7:1 instead of 4.5:1
    clickableSize: 48,       // 48px instead of 44px
  },
});
```

### Per-Component Configuration
```tsx
import { useA11yConfig } from '@a11y-toolkit/core';

function MyComponent() {
  const { wcagLevel, setWCAGLevel } = useA11yConfig();
  
  return (
    <button onClick={() => setWCAGLevel('AAA')}>
      Switch to AAA
    </button>
  );
}
```

## 5. Test Your Setup

### React App
```tsx
import { AccessibleNav } from '@a11y-toolkit/core';

export default function App() {
  return (
    <AccessibleNav
      items={[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
      ]}
      ariaLabel="Main navigation"
    />
  );
}
```

### Vanilla JS
```html
<script type="module">
  import { checkContrast } from '@a11y-toolkit/core';
  
  const result = checkContrast('#000000', '#FFFFFF');
  console.log(`Contrast: ${result.ratio}:1 - WCAG AA: ${result.AA}`);
</script>
```

## 6. TypeScript Support

The package includes full TypeScript definitions:

```typescript
import {
  AccessibleNavProps,
  AccessibleButtonProps,
  AccessibleInputProps,
  WCAGLevel,
  AccessibilityConfig,
} from '@a11y-toolkit/core';

const navProps: AccessibleNavProps = {
  items: [
    { label: 'Home', href: '/' },
  ],
  ariaLabel: 'Main navigation',
};
```

## 7. ESM & CommonJS Support

The package works with both module systems:

```javascript
// ESM
import { AccessibleButton } from '@a11y-toolkit/core/react';

// CommonJS
const { AccessibleButton } = require('@a11y-toolkit/core/react');
```

## 8. Troubleshooting

### Components not importing?
```tsx
// Make sure you import from the correct entry point
import { AccessibleNav } from '@a11y-toolkit/core/react'; // ✓ Correct
import { AccessibleNav } from '@a11y-toolkit/core';      // ✓ Also works
```

### React version compatibility?
The package supports React 16.8+ (hooks required).

```json
{
  "peerDependencies": {
    "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
  }
}
```

### Not seeing accessibility improvements?
1. Check that `initializeAccessibility` is called at app root
2. Enable logging to debug:
   ```typescript
   initializeAccessibility({ enableLogging: true });
   ```
3. Test with screen reader (NVDA, JAWS, VoiceOver)
4. Use keyboard-only navigation (no mouse)

## 9. Next Steps

- Read [USAGE_GUIDE.md](./USAGE_GUIDE.md) for detailed examples
- Check [README.md](./README.md) for API documentation
- Review examples in `examples/` folder
- Test with accessibility tools (axe, WAVE, Lighthouse)

## 10. Support

- **GitHub Issues:** Report bugs or feature requests
- **Documentation:** Full API docs in README.md
- **Examples:** See `examples/` folder for working code
- **WCAG Reference:** https://www.w3.org/WAI/WCAG21/quickref/

---

**Your journey to accessible web starts here! 🌐♿**
