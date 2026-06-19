# Quick Start Guide - A11y Toolkit

Get up and running with accessible UI components in **5 minutes**.

## 1. Install (30 seconds)

```bash
npm install @a11y-toolkit/core
```

## 2. Initialize Your App (1 minute)

### React
```tsx
import { initializeAccessibility } from '@a11y-toolkit/core';

// In your main.tsx or index.tsx
initializeAccessibility({ wcagLevel: 'AA' });
```

### Vanilla JS
```javascript
import { initializeAccessibility } from '@a11y-toolkit/core';

initializeAccessibility({ wcagLevel: 'AA' });
```

## 3. Use Your First Component (2 minutes)

### React Navigation
```tsx
import { AccessibleNav } from '@a11y-toolkit/core';

<AccessibleNav
  items={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ]}
  ariaLabel="Main navigation"
/>
```

### Form Input
```tsx
import { AccessibleInput } from '@a11y-toolkit/core';

<AccessibleInput
  label="Email"
  type="email"
  required
  error={formErrors.email}
/>
```

### Vanilla JS
```javascript
import { checkContrast } from '@a11y-toolkit/core';

const result = checkContrast('#333333', '#FFFFFF');
console.log(`Contrast: ${result.ratio}:1 - WCAG AA: ${result.AA}`);
```

## 4. Test It Works (1 minute)

```typescript
// Check keyboard navigation
import { KEYS } from '@a11y-toolkit/core';

document.addEventListener('keydown', (e) => {
  if (e.key === KEYS.ESCAPE) {
    closeModal();
  }
});
```

## 5. Deploy with Confidence! 🚀

---

## What You Get

✅ **5 React Components**
- Nav, Tabs, Form Inputs, Modals, Buttons
- All keyboard accessible
- WCAG AA/AAA compliant

✅ **Utility Functions**
- Color contrast checking
- Keyboard helpers
- ARIA utilities
- Screen reader announcements

✅ **Configuration**
- WCAG A/AA/AAA levels
- Feature flags
- Custom rules
- Per-component settings

✅ **Full Documentation**
- 1000+ lines of guides
- Real-world examples
- Framework-specific setup
- Testing instructions

---

## Common Use Cases

### Use Case 1: Building a Website
```tsx
import { AccessibleNav, AccessibleButton } from '@a11y-toolkit/core';

export default function Website() {
  return (
    <>
      <AccessibleNav
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Contact', href: '/contact' },
        ]}
        skipLinkId="main-content"
      />
      <main id="main-content">
        <AccessibleButton label="Get Started" />
      </main>
    </>
  );
}
```

### Use Case 2: Form with Validation
```tsx
import { AccessibleInput, AccessibleButton } from '@a11y-toolkit/core';
import { useState } from 'react';

export default function LoginForm() {
  const [errors, setErrors] = useState({});

  return (
    <form>
      <AccessibleInput
        label="Username"
        error={errors.username}
        required
      />
      <AccessibleInput
        label="Password"
        type="password"
        error={errors.password}
        required
      />
      <AccessibleButton label="Sign In" />
    </form>
  );
}
```

### Use Case 3: Modal Dialog
```tsx
import { AccessibleModal, AccessibleButton } from '@a11y-toolkit/core';
import { useState } from 'react';

export default function ConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AccessibleButton
        label="Delete"
        onClick={() => setIsOpen(true)}
      />
      <AccessibleModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Delete"
      >
        <p>Are you sure?</p>
        <AccessibleButton
          label="Delete"
          onClick={() => {
            // delete...
            setIsOpen(false);
          }}
        />
      </AccessibleModal>
    </>
  );
}
```

### Use Case 4: Tab Navigation
```tsx
import { AccessibleTabs } from '@a11y-toolkit/core';

export default function Pricing() {
  return (
    <AccessibleTabs
      tabs={[
        { id: 'basic', label: 'Basic', content: <div>$9/mo</div> },
        { id: 'pro', label: 'Pro', content: <div>$29/mo</div> },
        { id: 'enterprise', label: 'Enterprise', content: <div>Custom</div> },
      ]}
      defaultTabId="basic"
    />
  );
}
```

### Use Case 5: Color Contrast Check
```typescript
import { checkContrast } from '@a11y-toolkit/core';

// Before choosing colors
const result = checkContrast('#333333', '#FFFFFF');

if (!result.AA) {
  console.warn('Colors do not meet WCAG AA');
  console.warn(`Current ratio: ${result.ratio}:1`);
  console.warn('Required: 4.5:1');
}
```

---

## Keyboard Shortcuts Reference

| Key | Action |
|-----|--------|
| `Tab` | Move to next element |
| `Shift+Tab` | Move to previous element |
| `Enter` | Activate button/link |
| `Space` | Activate button, toggle checkbox |
| `Arrow Keys` | Navigate menus, select options |
| `Home` | Jump to first item |
| `End` | Jump to last item |
| `Escape` | Close modal/menu |

---

## Next Steps

1. **Read [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md)**
   - Framework-specific setup (Next.js, Vite, Vue, etc.)
   - TypeScript support
   - Troubleshooting

2. **Explore [USAGE_GUIDE.md](./USAGE_GUIDE.md)**
   - Detailed component examples
   - Vanilla JS patterns
   - Advanced configuration

3. **Review [TESTING_ACCESSIBILITY.md](./TESTING_ACCESSIBILITY.md)**
   - How to test your app
   - Screen reader testing
   - Automated testing
   - WCAG compliance

4. **Check [examples/](./examples/)**
   - React dashboard app
   - Vanilla HTML page
   - Real-world patterns

---

## Support

- 📖 **Documentation:** See README.md for full API
- 🐛 **Issues:** Report bugs on GitHub
- 💬 **Questions:** Check examples folder
- 🌐 **WCAG Ref:** https://www.w3.org/WAI/WCAG21/quickref/

---

## Checklists

### ✅ Before Launch
- [ ] Initialize A11y Toolkit
- [ ] Use semantic HTML
- [ ] Test with keyboard only (no mouse)
- [ ] Test with screen reader
- [ ] Check color contrast
- [ ] Add alt text to images
- [ ] Include skip links
- [ ] Test focus indicators visible

### ✅ Deployment
- [ ] Run accessibility audit (Lighthouse)
- [ ] axe DevTools check passed
- [ ] Form labels connected properly
- [ ] Error messages accessible
- [ ] Video has captions
- [ ] Page heading hierarchy correct

---

## Example: Complete Accessible Page

```tsx
import React, { useState } from 'react';
import {
  initializeAccessibility,
  AccessibleNav,
  AccessibleButton,
  AccessibleInput,
  AccessibleTabs,
} from '@a11y-toolkit/core';

initializeAccessibility({ wcagLevel: 'AA' });

export default function App() {
  const [name, setName] = useState('');

  return (
    <div>
      {/* Navigation */}
      <header>
        <h1>My Accessible App</h1>
        <AccessibleNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
          ]}
          skipLinkId="main"
        />
      </header>

      {/* Main Content */}
      <main id="main">
        <h2>Welcome</h2>

        {/* Form */}
        <AccessibleInput
          label="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Tabs */}
        <AccessibleTabs
          tabs={[
            { id: 'tab1', label: 'Tab 1', content: <p>Content 1</p> },
            { id: 'tab2', label: 'Tab 2', content: <p>Content 2</p> },
          ]}
        />

        {/* Button */}
        <AccessibleButton label="Submit" />
      </main>
    </div>
  );
}
```

Run this now and test with:
- 🖱️ **Keyboard only** (no mouse)
- 🔊 **Screen reader** (NVDA or VoiceOver)
- 🎨 **Color contrast** (DevTools > Lighthouse)

---

## Success! 🎉

You've built an accessible app that works for **everyone**:
- ♿ People with disabilities
- 🧑‍🦯 Blind and low vision users
- 🦻 Deaf and hard of hearing users
- 🧠 Cognitive disabilities
- 🕐 Elderly users
- 📱 Mobile users
- 🌐 International users

**Accessibility is inclusive design.** 💙
