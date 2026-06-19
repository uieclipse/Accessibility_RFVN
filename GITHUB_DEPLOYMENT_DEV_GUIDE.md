# Accessibility Toolkit: GitHub Deployment & Development Guide

Complete guide to deploy on GitHub and understand the project structure.

---

## 🚀 GitHub Deployment Options

### Option 1: GitHub Pages (Free, Static Sites)

**Best for:** React apps, documentation sites, demos

```bash
# Step 1: Add to package.json
{
  "homepage": "https://yourusername.github.io/Accessibility-",
  "scripts": {
    "deploy": "npm run build && gh-pages -d build"
  }
}
```

```bash
# Step 2: Install gh-pages
npm install --save-dev gh-pages

# Step 3: Deploy
npm run deploy
```

**GitHub Actions Workflow** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

### Option 2: GitHub Releases (Package Distribution)

**Best for:** Sharing compiled code, distributing to NPM

```bash
# Step 1: Build the project
npm run build

# Step 2: Create a release
gh release create v1.0.0 --title "Version 1.0.0" --notes "Initial release"

# Step 3: Upload build files
gh release upload v1.0.0 dist/accessibility-menu.min.js
```

**In GitHub UI:**
1. Go to Releases → Create new release
2. Tag: `v1.0.0`
3. Upload files (`.js`, `.tsx`, minified versions)
4. Publish

---

### Option 3: NPM Registry (For Libraries)

**Best for:** Publishing the full toolkit as a package

```bash
# Create .npmrc
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc

# In package.json, set version
{
  "name": "@yourusername/accessibility-toolkit",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}

# Build and publish
npm run build
npm publish --access public
```

**GitHub Actions for NPM** (`.github/workflows/publish.yml`):
```yaml
name: Publish to NPM

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - run: npm install
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

### Option 4: Vercel/Netlify (Full-Stack Apps)

**Best for:** Next.js, dynamic sites

**Vercel:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

---

## 📂 Project Structure Overview

```
Accessibility-/
│
├── src/                          # Source code
│   ├── config/                   # Configuration system
│   │   ├── types.ts             # TypeScript interfaces
│   │   ├── wcag-profiles.ts      # WCAG A/AA/AAA definitions
│   │   └── index.ts             # Config manager
│   │
│   ├── react/                    # React components
│   │   ├── components/
│   │   │   ├── AccessibleNav.tsx      # Navigation component
│   │   │   ├── AccessibleButton.tsx   # Button component
│   │   │   ├── AccessibleInput.tsx    # Form input component
│   │   │   ├── AccessibleModal.tsx    # Modal dialog component
│   │   │   └── AccessibleTabs.tsx     # Tabs component
│   │   ├── hooks/
│   │   │   └── useA11yConfig.ts  # React hook for config
│   │   └── index.ts              # Exports
│   │
│   ├── utils/                    # Vanilla JS utilities
│   │   ├── contrast.ts           # Color contrast checker
│   │   ├── keyboard.ts           # Keyboard event handling
│   │   ├── aria.ts               # ARIA attribute helpers
│   │   └── index.ts              # Exports
│   │
│   └── index.ts                  # Main export
│
├── examples/                      # Standalone components
│   ├── AccessibilityMenuConfigurable.tsx    # React configurable
│   ├── accessibility-menu-configurable.js   # Vanilla JS configurable
│   ├── AccessibilityMenu.tsx                # React (all features)
│   ├── accessibility-menu.js                # Vanilla JS (all features)
│   ├── AccessibilityMenuExample.tsx         # React demo page
│   ├── react-app-example.tsx                # React dashboard demo
│   └── vanilla-js-example.html              # Vanilla JS demo page
│
├── docs/                         # Documentation
│   ├── DOWNLOAD_QUICKSTART.md
│   ├── REACT_VS_NONREACT_GUIDE.md
│   ├── ACCESSIBILITY_MENU_SETUP.md
│   ├── INSTALLATION_GUIDE.md
│   ├── USAGE_GUIDE.md
│   ├── TESTING_ACCESSIBILITY.md
│   ├── README.md
│   └── QUICK_START.md
│
├── package.json                  # NPM metadata
├── tsconfig.json                 # TypeScript config
└── .gitignore                    # Git ignore rules
```

---

## 🎯 Understanding All Features

### Configuration System (WCAG Levels)

The project supports 3 WCAG compliance levels:

**Level A** (Basic)
- 3:1 color contrast
- 44px clickable size
- Basic keyboard support

**Level AA** (Recommended)
- 4.5:1 color contrast
- 44px clickable size
- Full keyboard navigation
- ARIA labels

**Level AAA** (Strict)
- 7:1 color contrast
- 48px clickable size
- Enhanced keyboard support
- Detailed ARIA descriptions

```typescript
// Set WCAG level
initializeAccessibility({ wcagLevel: 'AA' });
```

---

### 5 Component Categories

#### 1. Navigation Component
```tsx
<AccessibleNav
  items={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' }
  ]}
  ariaLabel="Main navigation"
/>
```
Features: Arrow key navigation, skip links, focus management

#### 2. Button Component
```tsx
<AccessibleButton
  label="Click me"
  onClick={() => {}}
  ariaLabel="Custom button"
/>
```
Features: 44x44px minimum, ARIA labels, loading state

#### 3. Form Input Component
```tsx
<AccessibleInput
  label="Email"
  type="email"
  required={true}
  error="Invalid email"
/>
```
Features: Associated labels, error messages, aria-invalid

#### 4. Modal Component
```tsx
<AccessibleModal
  isOpen={true}
  title="Confirm Action"
  onClose={() => {}}
>
  <p>Are you sure?</p>
</AccessibleModal>
```
Features: Focus trapping, ESC key support, return focus

#### 5. Tabs Component
```tsx
<AccessibleTabs
  tabs={[
    { label: 'Tab 1', content: <p>Content 1</p> },
    { label: 'Tab 2', content: <p>Content 2</p> }
  ]}
/>
```
Features: Arrow key navigation, ARIA controls, semantic HTML

---

### 4 Utility Categories

#### 1. Contrast Utilities
```typescript
import { checkContrast } from '@a11y-toolkit/core';

const result = checkContrast('#000000', '#FFFFFF');
console.log(result);
// { ratio: 21:1, AA: true, AAA: true, AAALargeText: true }
```

#### 2. Keyboard Utilities
```typescript
import { KEYS, trapFocus } from '@a11y-toolkit/core';

if (event.key === KEYS.ESCAPE) {
  closeModal();
}

trapFocus(modalElement);
```

#### 3. ARIA Utilities
```typescript
import { announceToScreenReader, setAriaLabel } from '@a11y-toolkit/core';

announceToScreenReader('Item added to cart', 'polite');
setAriaLabel(button, 'Close dialog');
```

#### 4. Custom Rules
```typescript
initializeAccessibility({
  customRules: {
    colorContrast: 7,      // 7:1 instead of 4.5:1
    clickableSize: 48,     // 48px instead of 44px
  }
});
```

---

## 12 Accessibility Menu Features

### 1. Contrast Control
```
Normal → Dark (dark background, light text)
      → Light (light background, dark text)
```

### 2. Saturation Adjustment
```
High → Normal → Low → Monochrome (grayscale)
```

### 3. Font Selection
```
Standard → Readable (Arial, easier to read)
```

### 4. Text Size
```
100% → 150% (up to 50% larger text)
```

### 5. Text Spacing
```
0 → 3 (increase word spacing)
```

### 6. Line Height
```
1.0 → 2.0 (more space between lines)
```

### 7. Letter Spacing
```
0 → 2.0 (wider spacing between letters)
```

### 8. Bigger Cursor
```
Normal → Big (enlarged cursor pointer)
```

### 9. Highlight Links
```
Off → On (outline links and headings)
```

### 10. Stop Animations
```
Off → On (disable all animations/transitions)
```

### 11. Hide Images
```
Off → On (remove all images from page)
```

### 12. Reading Mask
```
Off → On (darken areas above/below current reading line)
```

---

## 💻 How to Use (Development Guide)

### 1. Install Dependencies
```bash
git clone https://github.com/yourusername/Accessibility-.git
cd Accessibility-
npm install
```

### 2. Build the Project
```bash
# Build once
npm run build

# Watch mode (rebuild on file changes)
npm run dev
```

### 3. Run Tests
```bash
npm test
```

### 4. Run Examples
```bash
# React examples
npm run example:react

# Vanilla JS examples  
npm run example:vanilla
```

### 5. Type Check
```bash
npm run type-check
```

---

## 🤝 Contributing & Development

### Setup Development Environment

```bash
# Clone the repo
git clone https://github.com/yourusername/Accessibility-.git
cd Accessibility-

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/your-feature-name

# Make your changes

# Run tests
npm test

# Build
npm run build

# Commit
git add .
git commit -m "Add feature description"

# Push
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Adding a New Component

**File: `src/react/components/MyComponent.tsx`**
```tsx
import React from 'react';

interface MyComponentProps {
  label: string;
  onChange?: (value: string) => void;
  ariaLabel?: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  label,
  onChange,
  ariaLabel
}) => {
  return (
    <div role="region" aria-label={ariaLabel}>
      <label>{label}</label>
      {/* Your component code */}
    </div>
  );
};

export default MyComponent;
```

**Export in `src/react/index.ts`:**
```typescript
export { MyComponent } from './components/MyComponent';
```

### Adding a New Utility

**File: `src/utils/myUtility.ts`**
```typescript
export function myFunction(input: string): string {
  // Your utility logic
  return result;
}
```

**Export in `src/utils/index.ts`:**
```typescript
export { myFunction } from './myUtility';
```

---

## 📊 Project Stats

| Metric | Value |
|--------|-------|
| **Components** | 5 React components |
| **Utilities** | 10+ utility functions |
| **Features** | 12 accessibility options |
| **Documentation** | 8 comprehensive guides |
| **Examples** | 5 working demos |
| **Size** | ~5-6KB gzipped |
| **Dependencies** | React only (React version) |
| **WCAG Levels** | A, AA, AAA support |
| **Browser Support** | Modern browsers (ES2020) |
| **TypeScript** | Full support |

---

## 🧪 Testing Guide

### Manual Testing Checklist

```
☐ Keyboard Navigation
  ☐ Tab through all controls
  ☐ Arrow keys in menus
  ☐ Enter/Space to activate
  ☐ Escape to close

☐ Screen Reader
  ☐ Test with NVDA (Windows)
  ☐ Test with JAWS (Windows)
  ☐ Test with VoiceOver (Mac)
  ☐ All labels announced

☐ Visual
  ☐ Color contrast 4.5:1+
  ☐ Focus visible
  ☐ Responsive layout
  ☐ Mobile touch targets 44x44px

☐ Automated
  ☐ axe DevTools
  ☐ WAVE extension
  ☐ Lighthouse audit
```

### Automated Testing

```bash
# Run unit tests
npm test

# Generate coverage
npm test -- --coverage

# Check accessibility
npm run a11y:check
```

---

## 🔄 Workflow for Contributing

### 1. Fork & Clone
```bash
git clone https://github.com/yourusername/Accessibility-.git
cd Accessibility-
```

### 2. Create Feature Branch
```bash
git checkout -b feature/add-new-feature
```

### 3. Make Changes
- Edit files in `src/`
- Add tests if needed
- Update documentation

### 4. Test
```bash
npm run build
npm test
npm run type-check
```

### 5. Commit & Push
```bash
git commit -m "feat: add new feature"
git push origin feature/add-new-feature
```

### 6. Create Pull Request
- Go to GitHub
- Click "New Pull Request"
- Add description
- Request review

### 7. Address Feedback
- Make requested changes
- Push new commits
- GitHub auto-updates PR

### 8. Merge
- Maintainer merges when approved
- Your code is now in main!

---

## 📚 Documentation Structure

```
README.md                       Main entry point
QUICK_START.md                  5-minute setup
INSTALLATION_GUIDE.md           Framework setup
USAGE_GUIDE.md                  Detailed examples
ACCESSIBILITY_MENU_SETUP.md     Feature flags
REACT_VS_NONREACT_GUIDE.md      Choose your version
TESTING_ACCESSIBILITY.md        How to test
DOWNLOAD_QUICKSTART.md          Downloaded package guide
```

---

## 🎓 Learning Path

### Beginner
1. Read `README.md`
2. Read `QUICK_START.md`
3. Try one example
4. Deploy to GitHub Pages

### Intermediate
1. Read `USAGE_GUIDE.md`
2. Read `ACCESSIBILITY_MENU_SETUP.md`
3. Build custom component
4. Create pull request

### Advanced
1. Read source code in `src/`
2. Add new component
3. Write tests
4. Update documentation
5. Become a maintainer

---

## 🚀 Quick Commands Reference

```bash
npm install              # Install dependencies
npm run dev             # Development watch mode
npm run build           # Build for production
npm test                # Run tests
npm run type-check      # TypeScript check
npm run build:examples  # Build examples
npm run deploy          # Deploy to GitHub Pages
npm publish             # Publish to NPM
```

---

## 🔗 Related Resources

- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **MDN ARIA**: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
- **WebAIM**: https://webaim.org/
- **Accessibility Insights**: https://accessibilityinsights.io/

---

## 📞 Getting Help

1. **Read Documentation** - Check the guides
2. **Look at Examples** - See working code
3. **Search Issues** - Someone may have solved it
4. **Open an Issue** - Ask the community
5. **Discussion Forums** - Get help from maintainers

---

## ✨ Project Vision

Make web accessibility simple:
- ✅ Easy to use (copy & paste)
- ✅ Framework agnostic (React or Vanilla JS)
- ✅ Well documented (8 guides)
- ✅ Tested (manual + automated)
- ✅ Production ready (used in real projects)
- ✅ Continuously improving (community-driven)

**Help us make the web accessible to everyone! ♿**
