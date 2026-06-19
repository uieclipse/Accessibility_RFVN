# How to Use A11y Toolkit in Your Projects

## Installation

```bash
npm install @a11y-toolkit/core
# or
yarn add @a11y-toolkit/core
# or
pnpm add @a11y-toolkit/core
```

---

## React Projects

### 1. Initialize in App Root

```tsx
// src/main.tsx or src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeAccessibility } from '@a11y-toolkit/core';
import App from './App';

// Set global accessibility level (WCAG AA recommended for most businesses)
initializeAccessibility({
  wcagLevel: 'AA',
  enableLogging: true,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 2. Basic Navigation Setup

```tsx
// src/components/Header.tsx
import { AccessibleNav } from '@a11y-toolkit/core/react';

export default function Header() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header>
      <AccessibleNav
        items={navItems}
        ariaLabel="Main navigation"
        skipLinkId="main-content"
      />
    </header>
  );
}
```

### 3. Form with Accessible Inputs

```tsx
// src/components/SignupForm.tsx
import { useState } from 'react';
import { AccessibleInput, AccessibleButton } from '@a11y-toolkit/core/react';

export default function SignupForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
  };

  return (
    <form onSubmit={handleSubmit}>
      <AccessibleInput
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        helperText="We'll never share your email"
        required
      />

      <AccessibleInput
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        error={errors.password}
        required
      />

      <AccessibleButton label="Sign Up" onClick={handleSubmit} />
    </form>
  );
}
```

### 4. Tabs Component

```tsx
// src/components/ProductTabs.tsx
import { AccessibleTabs } from '@a11y-toolkit/core/react';

export default function ProductTabs() {
  return (
    <AccessibleTabs
      tabs={[
        {
          id: 'features',
          label: 'Features',
          content: <div>Feature list here</div>,
        },
        {
          id: 'pricing',
          label: 'Pricing',
          content: <div>Pricing table here</div>,
        },
        {
          id: 'reviews',
          label: 'Reviews',
          content: <div>Customer reviews here</div>,
        },
      ]}
      defaultTabId="features"
      onChange={(tabId) => console.log('Active tab:', tabId)}
    />
  );
}
```

### 5. Modal Dialog

```tsx
// src/components/ConfirmDialog.tsx
import { useState } from 'react';
import { AccessibleModal, AccessibleButton } from '@a11y-toolkit/core/react';

export default function ConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    console.log('User confirmed');
    setIsOpen(false);
  };

  return (
    <>
      <AccessibleButton 
        label="Delete Item" 
        onClick={() => setIsOpen(true)} 
      />

      <AccessibleModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Delete Confirmation"
        ariaLabel="Confirm deletion"
      >
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
          <AccessibleButton label="Delete" onClick={handleConfirm} />
          <AccessibleButton 
            label="Cancel" 
            onClick={() => setIsOpen(false)} 
          />
        </div>
      </AccessibleModal>
    </>
  );
}
```

### 6. Using Accessibility Config Hook

```tsx
// src/components/Settings.tsx
import { useA11yConfig } from '@a11y-toolkit/core/react';

export default function Settings() {
  const { wcagLevel, setWCAGLevel } = useA11yConfig();

  return (
    <div>
      <h2>Accessibility Settings</h2>
      
      <fieldset>
        <legend>WCAG Compliance Level</legend>
        
        <label>
          <input
            type="radio"
            name="wcag"
            value="A"
            checked={wcagLevel === 'A'}
            onChange={(e) => setWCAGLevel(e.target.value as any)}
          />
          Level A (Minimum)
        </label>

        <label>
          <input
            type="radio"
            name="wcag"
            value="AA"
            checked={wcagLevel === 'AA'}
            onChange={(e) => setWCAGLevel(e.target.value as any)}
          />
          Level AA (Recommended)
        </label>

        <label>
          <input
            type="radio"
            name="wcag"
            value="AAA"
            checked={wcagLevel === 'AAA'}
            onChange={(e) => setWCAGLevel(e.target.value as any)}
          />
          Level AAA (Enhanced)
        </label>
      </fieldset>

      <p>Current level: <strong>WCAG {wcagLevel}</strong></p>
    </div>
  );
}
```

---

## Non-React / Vanilla JavaScript Projects

### 1. Basic HTML Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Accessible Website</title>
</head>
<body>
  <div id="app">
    <!-- Your content -->
  </div>

  <script type="module">
    import {
      initializeAccessibility,
      getContrastRatio,
      KEYS,
      announceToScreenReader,
    } from '@a11y-toolkit/core';

    // Initialize
    initializeAccessibility({ wcagLevel: 'AA', enableLogging: true });
  </script>
</body>
</html>
```

### 2. Navigation with Keyboard Support

```html
<!-- HTML -->
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none"><a href="/" role="menuitem">Home</a></li>
    <li role="none"><a href="/about" role="menuitem">About</a></li>
    <li role="none"><a href="/contact" role="menuitem">Contact</a></li>
  </ul>
</nav>

<!-- JavaScript -->
<script type="module">
  import { KEYS, isArrowKey } from '@a11y-toolkit/core';

  const nav = document.querySelector('nav');
  const menuItems = nav.querySelectorAll('[role="menuitem"]');
  let focusedIndex = 0;

  menuItems.forEach((item, index) => {
    item.addEventListener('keydown', (e) => {
      if (e.key === KEYS.ARROW_RIGHT) {
        e.preventDefault();
        focusedIndex = (index + 1) % menuItems.length;
        menuItems[focusedIndex].focus();
      } else if (e.key === KEYS.ARROW_LEFT) {
        e.preventDefault();
        focusedIndex = (index - 1 + menuItems.length) % menuItems.length;
        menuItems[focusedIndex].focus();
      }
    });
  });
</script>
```

### 3. Color Contrast Checking

```javascript
import { checkContrast, getContrastRatio } from '@a11y-toolkit/core';

// Check if colors meet WCAG AA standard (4.5:1 for normal text)
const result = checkContrast('#333333', '#FFFFFF');

if (result.AA) {
  console.log('✓ Meets WCAG AA contrast ratio');
} else {
  console.log('✗ Does not meet WCAG AA');
  console.log(`Current ratio: ${result.ratio}:1`);
  console.log(`Required: 4.5:1`);
}
```

### 4. Form Validation with ARIA

```javascript
import {
  setAriaLabel,
  markElementAsInvalid,
  announceToScreenReader,
} from '@a11y-toolkit/core';

const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValid) {
    markElementAsInvalid(emailInput, true, 'Invalid email format');
    announceToScreenReader('Email format is invalid', 'assertive');
  } else {
    markElementAsInvalid(emailInput, false);
    announceToScreenReader('Email is valid', 'polite');
  }
});
```

### 5. Modal Dialog with Focus Trap

```javascript
import { trapFocus, isEscapeKey } from '@a11y-toolkit/core';

const modal = document.getElementById('myModal');
const closeBtn = document.getElementById('closeBtn');

modal.addEventListener('keydown', (e) => {
  // Trap focus within modal
  trapFocus(modal, e);

  // Close on ESC key
  if (isEscapeKey(e)) {
    modal.style.display = 'none';
  }
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});
```

### 6. Screen Reader Announcements

```javascript
import { announceToScreenReader } from '@a11y-toolkit/core';

// After successful form submission
document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Submit form...
  
  announceToScreenReader('Form submitted successfully', 'assertive');
});

// When loading data
const loadData = async () => {
  announceToScreenReader('Loading data...', 'polite');
  
  const data = await fetch('/api/data').then(r => r.json());
  
  announceToScreenReader(`Loaded ${data.length} items`, 'assertive');
};
```

---

## Framework-Specific Examples

### Next.js

```typescript
// app/layout.tsx
import { initializeAccessibility } from '@a11y-toolkit/core';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    initializeAccessibility({ wcagLevel: 'AA' });
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Vue.js

```vue
<template>
  <div>
    <AccessibleNav 
      :items="navItems"
      ariaLabel="Main navigation"
    />
  </div>
</template>

<script setup>
import { AccessibleNav } from '@a11y-toolkit/core/react'; // Via wrapper or Vue adapter
import { initializeAccessibility } from '@a11y-toolkit/core';
import { onMounted } from 'vue';

onMounted(() => {
  initializeAccessibility({ wcagLevel: 'AA' });
});

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
];
</script>
```

### Svelte

```svelte
<script>
  import { initializeAccessibility } from '@a11y-toolkit/core';
  import { onMount } from 'svelte';

  onMount(() => {
    initializeAccessibility({ wcagLevel: 'AA' });
  });

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ];
</script>

<nav aria-label="Main navigation">
  <ul>
    {#each navItems as item}
      <li><a href={item.href}>{item.label}</a></li>
    {/each}
  </ul>
</nav>
```

---

## Configuration Per Project

### Default (WCAG AA)
```typescript
initializeAccessibility({ wcagLevel: 'AA' });
```

### Strict (WCAG AAA)
```typescript
initializeAccessibility({ 
  wcagLevel: 'AAA',
  customRules: {
    colorContrast: 7,
    clickableSize: 48,
  }
});
```

### Basic (WCAG A)
```typescript
initializeAccessibility({ wcagLevel: 'A' });
```

### With Logging (Debug)
```typescript
initializeAccessibility({
  wcagLevel: 'AA',
  enableLogging: true, // Logs config changes
});
```

---

## Testing Accessibility

```javascript
import { checkContrast, KEYS, getFocusableElements } from '@a11y-toolkit/core';

// Test 1: Check all text colors meet WCAG AA
const textElements = document.querySelectorAll('p, span, a');
textElements.forEach(el => {
  const color = window.getComputedStyle(el).color;
  const bgColor = window.getComputedStyle(el).backgroundColor;
  const result = checkContrast(color, bgColor);
  
  if (!result.AA) {
    console.warn(`Low contrast on ${el.textContent}:`, result.ratio);
  }
});

// Test 2: Check keyboard navigation works
const focusable = getFocusableElements(document.body);
console.log(`Found ${focusable.length} focusable elements`);

// Test 3: Verify form labels
document.querySelectorAll('input').forEach(input => {
  const label = document.querySelector(`label[for="${input.id}"]`);
  if (!label && !input.getAttribute('aria-label')) {
    console.warn('Input missing accessible label:', input);
  }
});
```

---

## Best Practices

✅ **Always initialize at app start**
```typescript
initializeAccessibility({ wcagLevel: 'AA' });
```

✅ **Use semantic HTML**
```html
<nav>Navigation</nav>
<main>Main content</main>
<button>Action</button>
<label for="input">Input</label>
```

✅ **Include skip links**
```html
<a href="#main-content" style="position: absolute; left: -10000px;">
  Skip to main content
</a>
```

✅ **Test with real assistive tech**
- Screen readers: NVDA (free), JAWS, VoiceOver
- Keyboard: Remove mouse and navigate
- Tools: axe DevTools, WAVE

✅ **Check color contrast regularly**
```javascript
checkContrast(foreground, background);
```

---

## Support & Documentation

- **Full API Docs:** See README.md
- **Examples:** Check `examples/` folder
- **Issues:** Report bugs on GitHub
- **WCAG Reference:** https://www.w3.org/WAI/WCAG21/quickref/
