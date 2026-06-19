# 📥 Download & Setup Guide

**Complete instructions to download and set up the @a11y-toolkit/core package.**

---

## 🎯 Quick Links

- **NPM Package:** https://www.npmjs.com/package/@a11y-toolkit/core
- **GitHub Repository:** https://github.com/uieclipse/Accessibility-
- **Documentation:** See links below
- **Issues:** https://github.com/uieclipse/Accessibility-/issues

---

## ⚡ Fastest Setup (30 seconds)

### Option A: NPM (Recommended)

```bash
npm install @a11y-toolkit/core
```

Then add to your app:

```tsx
import { AccessibilityMenu } from '@a11y-toolkit/core';

<AccessibilityMenu position="top-right" />
```

**Done!** ✅ Users now have 12 accessibility features.

### Option B: CDN (Vanilla JS)

```html
<script src="https://unpkg.com/@a11y-toolkit/core"></script>
<script>
  new AccessibilityMenu().init();
</script>
```

---

## 📦 Installation Methods

### 1. NPM (Node Package Manager)

```bash
# npm
npm install @a11y-toolkit/core

# yarn
yarn add @a11y-toolkit/core

# pnpm
pnpm add @a11y-toolkit/core
```

**Best for:** React, Vue, Angular, Next.js, any Node.js project

### 2. GitHub Repository

```bash
# Clone full repository
git clone https://github.com/uieclipse/Accessibility-.git

# Navigate to project
cd Accessibility-

# Install dependencies
npm install

# Build locally
npm run build

# Run locally (dev server)
npm run dev
```

**Best for:** Development, customization, contributing

### 3. CDN (Vanilla JS)

```html
<!-- For standalone usage -->
<script src="https://unpkg.com/@a11y-toolkit/core/dist/index.js"></script>

<!-- Or with jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@a11y-toolkit/core/dist/index.js"></script>
```

**Best for:** Simple websites, no build process

### 4. GitHub Package Registry

```bash
# If published to GitHub Packages
npm install @uieclipse/accessibility-core
```

---

## 🛠️ Framework-Specific Setup

### React

```bash
npm install @a11y-toolkit/core
```

```tsx
import { AccessibilityMenu } from '@a11y-toolkit/core';

export default function App() {
  return (
    <>
      <AccessibilityMenu position="top-right" />
      {/* Your app */}
    </>
  );
}
```

### Next.js

```bash
npm install @a11y-toolkit/core
```

```tsx
// app/layout.tsx
import { AccessibilityMenu } from '@a11y-toolkit/core';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AccessibilityMenu position="top-right" />
        {children}
      </body>
    </html>
  );
}
```

### Vue.js

```bash
npm install @a11y-toolkit/core
```

```vue
<template>
  <div>
    <AccessibilityMenu position="top-right" />
    <!-- Your app -->
  </div>
</template>

<script setup>
import { AccessibilityMenu } from '@a11y-toolkit/core';
</script>
```

### Angular

```bash
npm install @a11y-toolkit/core
```

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <accessibility-menu [position]="'top-right'"></accessibility-menu>
  `,
})
export class AppComponent {}
```

### Vanilla JS (No Build Tool)

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Accessible Site</title>
</head>
<body>
  <script src="https://unpkg.com/@a11y-toolkit/core"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      new AccessibilityMenu().init();
    });
  </script>
  
  <h1>My Website</h1>
  <!-- Your content -->
</body>
</html>
```

---

## 📋 What Gets Downloaded

### NPM Package (@a11y-toolkit/core)

```
@a11y-toolkit/core/
├── dist/                          # Built files
│   ├── index.js                  # Main export (CommonJS)
│   ├── index.esm.js              # ES Module
│   ├── index.d.ts                # TypeScript types
│   ├── react/                    # React components
│   │   ├── index.js
│   │   ├── index.esm.js
│   │   └── index.d.ts
│   ├── utils/                    # Utility functions
│   │   ├── index.js
│   │   ├── index.esm.js
│   │   └── index.d.ts
│   └── config/                   # Config exports
│       ├── index.js
│       ├── index.esm.js
│       └── index.d.ts
├── package.json                  # Package info
├── README.md                      # This file
└── LICENSE                        # MIT License
```

### GitHub Repository

```
Accessibility-/
├── src/                          # Source code
│   ├── react/
│   │   ├── components/          # React components
│   │   ├── config/              # Configuration
│   │   └── hooks/               # React hooks
│   ├── utils/                   # Utilities
│   └── config/                  # WCAG profiles
├── examples/                     # Example files
├── dist/                         # Built files
├── docs/                         # Documentation
├── package.json
├── tsconfig.json
└── README.md
```

---

## ✅ Verify Installation

### Check NPM Installation

```bash
# Verify package is installed
npm list @a11y-toolkit/core

# Should show:
# @a11y-toolkit/core@1.0.1
```

### Check TypeScript Types

```typescript
import { AccessibilityMenu, AccessibilityStatusReporter } from '@a11y-toolkit/core';
import { auditPage } from '@a11y-toolkit/core/utils';

// Types should auto-complete in your IDE
```

### Test in Browser Console

```javascript
// In browser DevTools
import('@a11y-toolkit/core').then(({ auditPage }) => {
  const report = auditPage();
  console.log(`Score: ${report.scoreAA}/100`);
});
```

---

## 🚀 After Installation

### 1. Add Menu to Your App (2 minutes)

```tsx
<AccessibilityMenu position="top-right" />
```

### 2. Add Status Reporter for Developers (optional)

```tsx
{process.env.NODE_ENV === 'development' && (
  <AccessibilityStatusReporter position="bottom-right" />
)}
```

### 3. Scan for Issues (optional)

```typescript
import { auditPage } from '@a11y-toolkit/core/utils';

const report = auditPage();
console.log(`WCAG AA Score: ${report.scoreAA}/100`);
```

### 4. Customize (optional)

```tsx
<AccessibilityMenu
  position="bottom-right"
  colors={{ buttonBackground: '#ff6b6b' }}
  features={{ textSize: true, contrast: true }}
/>
```

---

## 📚 Documentation After Download

After installing, read these guides (in order):

1. **[Quick Start](./QUICK_START.md)** (5 min)
   - Basic setup and usage

2. **[Configuration Guide](./ACCESSIBILITY_MENU_CONFIG.md)** (10 min)
   - 40+ customization options
   - Colors, labels, positions, features

3. **[Monitoring & Auditing](./ACCESSIBILITY_MONITORING.md)** (15 min)
   - Scan for issues
   - Real-time monitoring
   - Status reporter component

4. **[Usage Guide](./USAGE_GUIDE.md)** (20 min)
   - Complete API reference
   - All components and utilities

5. **[Framework Integration](./REACT_VS_NONREACT_GUIDE.md)** (10 min)
   - React, Vue, Angular, etc.

---

## 🔄 Staying Updated

### Check for Updates

```bash
# Check for available updates
npm outdated @a11y-toolkit/core

# Update to latest
npm update @a11y-toolkit/core

# Update to specific version
npm install @a11y-toolkit/core@1.1.0
```

### Version History

- **v1.0.1** - Latest (AccessibilityMenu + Auditor + StatusReporter)
- **v1.0.0** - Initial release

---

## 🐛 Troubleshooting

### Problem: Module not found

**Solution:**
```bash
# Reinstall
rm -rf node_modules package-lock.json
npm install
```

### Problem: TypeScript errors

**Solution:**
```bash
# Update TypeScript
npm install -D typescript@latest

# Rebuild types
npm run build
```

### Problem: Styles not loading

**Solution:**
- The toolkit uses inline styles (no CSS file needed)
- If you see unstyled menu, check z-index and parent styling

### Problem: Menu not appearing

**Solution:**
- Check z-index value
- Verify position is correct: top-left, top-right, bottom-left, bottom-right
- Check browser console for errors (F12)

---

## 💡 Tips

### 1. Import Only What You Need

```typescript
// Import just what you need
import { AccessibilityMenu } from '@a11y-toolkit/core';
import { auditPage } from '@a11y-toolkit/core/utils';
```

### 2. Use TypeScript for Best Experience

TypeScript provides:
- ✅ Auto-completion in IDE
- ✅ Type checking
- ✅ Better error messages

```typescript
import type { AccessibilityMenuConfig } from '@a11y-toolkit/core';

const config: AccessibilityMenuConfig = {
  position: 'top-right',
  // TypeScript will catch typos!
};
```

### 3. Lazy Load for Performance

```tsx
import { lazy, Suspense } from 'react';

const A11yMenu = lazy(() => 
  import('@a11y-toolkit/core').then(m => ({
    default: m.AccessibilityMenu
  }))
);

<Suspense fallback={null}>
  <A11yMenu position="top-right" />
</Suspense>
```

### 4. Monitor Bundle Size

```bash
# Check bundle size impact
npm install -D bundlesize

# The toolkit is ~25KB minified + gzipped
```

---

## 🎯 Common Setup Patterns

### Pattern 1: Global Accessibility Menu

Add to your root layout/app component:

```tsx
// App.tsx or layout.tsx
<AccessibilityMenu position="top-right" />
```

### Pattern 2: Developer Dashboard

```tsx
{process.env.NODE_ENV === 'development' && (
  <AccessibilityStatusReporter 
    position="bottom-right"
    auditInterval={5000}
  />
)}
```

### Pattern 3: Accessibility Service

```typescript
import { A11yMonitor } from '@a11y-toolkit/core/utils';

class AccessibilityService {
  constructor() {
    this.monitor = new A11yMonitor();
    this.monitor.subscribe(report => this.onAuditComplete(report));
    this.monitor.start(10000);
  }

  onAuditComplete(report) {
    // Send to backend, update UI, etc.
  }
}
```

### Pattern 4: Framework Integration

```tsx
// Create a wrapper component for your framework
const AccessibilityWrapper = ({ children }) => (
  <>
    <AccessibilityMenu position="top-right" />
    {children}
  </>
);
```

---

## 📊 Package Contents Summary

| Item | What It Does |
|------|-------------|
| **AccessibilityMenu** | 12 user features (text size, contrast, etc.) |
| **AccessibilityAuditor** | Scans DOM for WCAG issues |
| **A11yMonitor** | Real-time monitoring with subscriptions |
| **StatusReporter** | Visual badge/panel for developers |
| **React Components** | Pre-built accessible UI components |
| **Utilities** | Keyboard nav, ARIA, contrast helpers |
| **Types** | Full TypeScript support |

---

## ✨ You're All Set!

After installation and setup, you have:

✅ User-facing accessibility menu (12 features)  
✅ WCAG compliance scanner (0-100 score)  
✅ Real-time monitoring system  
✅ Pre-built accessible components  
✅ Utility functions and helpers  
✅ Full TypeScript support  
✅ localStorage persistence  
✅ Extensive documentation  

---

## 📖 Next Steps

1. **Read** [Quick Start](./QUICK_START.md)
2. **Add menu** to your app
3. **Customize** with [Configuration](./ACCESSIBILITY_MENU_CONFIG.md)
4. **Monitor** with [Auditor](./ACCESSIBILITY_MONITORING.md)
5. **Integrate** with your backend

---

## 🆘 Need Help?

- 📖 Check [documentation](./QUICK_START.md)
- 🐛 [Report issues](https://github.com/uieclipse/Accessibility-/issues)
- 💬 [Start discussion](https://github.com/uieclipse/Accessibility-/discussions)
- 🌐 Visit [npm package page](https://www.npmjs.com/package/@a11y-toolkit/core)

---

**Ready to make your website accessible!** ♿🚀
