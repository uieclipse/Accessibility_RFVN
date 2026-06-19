# 📦 Using as NPM Package - Complete Guide

**How to publish the Accessibility Toolkit to npm and use it in projects.**

---

## 🎯 What is an NPM Package?

### Simple Explanation

**Without npm:**
```
├─ Your Project/
└─ Copy component file manually
   └─ Have to maintain 2 copies
```

**With npm:**
```
├─ Your Project/
└─ npm install @a11y-toolkit/core
   └─ Automatic updates
   └─ Shared across projects
```

---

## 📋 Option 1: Publish Your Own Package

### Step 1: Create NPM Account

1. Go to: https://www.npmjs.com/
2. Click "Sign Up"
3. Create account with email/password
4. Verify email

### Step 2: Update package.json

Edit `package.json`:

```json
{
  "name": "@yourusername/accessibility-toolkit",
  "version": "1.0.0",
  "description": "Complete web accessibility toolkit with 12 features",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./react": {
      "import": "./dist/react/index.js",
      "types": "./dist/react/index.d.ts"
    }
  },
  "files": [
    "dist"
  ],
  "keywords": [
    "accessibility",
    "wcag",
    "a11y",
    "menu",
    "component"
  ],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/Accessibility-.git"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

### Step 3: Build the Package

```bash
# Build for production
npm run build

# You'll see: dist/ folder created
```

### Step 4: Login to NPM

```bash
npm login

# Enter:
# - Username
# - Password
# - Email
```

### Step 5: Publish Package

```bash
npm publish --access public

# Shows:
# + @yourusername/accessibility-toolkit@1.0.0
```

✅ **Published!** Now available on npm

---

## 📦 Option 2: Use the Published Package

### For React Projects

**Step 1: Install**
```bash
npm install @a11y-toolkit/core
```

**Step 2: Use in Your App**
```jsx
import AccessibilityMenuConfigurable from '@a11y-toolkit/core/react';

export default function App() {
  return (
    <>
      <AccessibilityMenuConfigurable />
      {/* Your app */}
    </>
  );
}
```

### For Vanilla JavaScript

**Step 1: Install**
```bash
npm install @a11y-toolkit/core
```

**Step 2: Use in HTML**
```html
<script src="node_modules/@a11y-toolkit/core/dist/menu.js"></script>
<script>
  new AccessibilityMenuConfigurable().init();
</script>
```

### For Next.js

**Step 1: Install**
```bash
npm install @a11y-toolkit/core
```

**Step 2: Use in Layout**
```tsx
// app/layout.tsx
import AccessibilityMenuConfigurable from '@a11y-toolkit/core/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AccessibilityMenuConfigurable position="top-right" />
        {children}
      </body>
    </html>
  );
}
```

### For Vue.js

**Step 1: Install**
```bash
npm install @a11y-toolkit/core
```

**Step 2: Use as Plugin**
```javascript
// main.js
import { createApp } from 'vue';
import AccessibilityMenu from '@a11y-toolkit/core/vue';
import App from './App.vue';

const app = createApp(App);
app.component('AccessibilityMenu', AccessibilityMenu);
app.mount('#app');
```

**Step 3: Use in Template**
```vue
<template>
  <div>
    <AccessibilityMenu />
    <!-- Your app -->
  </div>
</template>
```

---

## 🔄 Version Updates

### When You Update Package

```bash
# 1. Make changes to src/
# 2. Update version in package.json
{
  "version": "1.1.0"  ← Changed from 1.0.0
}

# 3. Build
npm run build

# 4. Publish
npm publish

# 5. Users can update:
npm update @a11y-toolkit/core
```

---

## 📊 Package Structure

```
@a11y-toolkit/core/
├── dist/
│   ├── index.js              ← Main export
│   ├── index.d.ts            ← TypeScript types
│   ├── react/
│   │   ├── index.js
│   │   └── index.d.ts
│   ├── utils/
│   │   ├── contrast.js
│   │   ├── keyboard.js
│   │   └── aria.js
│   └── config/
│       ├── index.js
│       └── types.d.ts
├── package.json
└── README.md
```

---

## 🎯 Package.json Exports

```json
{
  "exports": {
    ".": "./dist/index.js",           // Main entry
    "./react": "./dist/react/index.js", // React components
    "./utils": "./dist/utils/index.js", // Utilities
    "./config": "./dist/config/index.js" // Config
  }
}
```

**Usage:**
```javascript
// Main
import { AccessibleButton } from '@a11y-toolkit/core';

// React
import AccessibilityMenu from '@a11y-toolkit/core/react';

// Utils
import { checkContrast } from '@a11y-toolkit/core/utils';

// Config
import { initializeAccessibility } from '@a11y-toolkit/core/config';
```

---

## 📚 Types & TypeScript

### Built-in Types

Package includes TypeScript definitions:

```typescript
// component.tsx
import { 
  AccessibilityMenuProps,
  AccessibilitySettings,
  WCAGLevel 
} from '@a11y-toolkit/core/react';

const props: AccessibilityMenuProps = {
  position: 'top-right',
  showReset: true,
  features: {
    contrast: true,
    textSize: true
  }
};
```

### Type Checking

```bash
# Check types
npm run type-check
```

---

## 🚀 Distribution Channels

### NPM Registry
```bash
npm publish
# Available at: https://www.npmjs.com/package/@yourusername/accessibility-toolkit
```

### GitHub Releases
```bash
gh release create v1.0.0 --title "Version 1.0.0"
gh release upload v1.0.0 dist/*
```

### CDN (for Vanilla JS)

```html
<!-- From unpkg CDN -->
<script src="https://unpkg.com/@a11y-toolkit/core@1.0.0/dist/menu.min.js"></script>

<!-- From jsDelivr CDN -->
<script src="https://cdn.jsdelivr.net/npm/@a11y-toolkit/core@1.0.0/dist/menu.min.js"></script>
```

---

## 📦 Installing from Different Sources

### From NPM Registry
```bash
npm install @a11y-toolkit/core
```

### From GitHub
```bash
npm install github:yourusername/Accessibility-
npm install github:yourusername/Accessibility-#v1.0.0
```

### From Local (Development)
```bash
npm install ../path/to/Accessibility-
```

### From Tarball
```bash
npm install ./accessibility-toolkit-1.0.0.tgz
```

---

## 🔐 Publishing Best Practices

### 1. Update Version Correctly

```json
{
  "version": "1.0.0"
}
```

**Version Format:** MAJOR.MINOR.PATCH
- **1**.0.0 = Major (breaking changes)
- 1.**0**.0 = Minor (new features)
- 1.0.**0** = Patch (bug fixes)

### 2. Create Semantic Release

```bash
# Patch (1.0.0 → 1.0.1)
npm version patch
npm publish

# Minor (1.0.0 → 1.1.0)
npm version minor
npm publish

# Major (1.0.0 → 2.0.0)
npm version major
npm publish
```

### 3. Use GitHub Actions for CI/CD

Create `.github/workflows/publish.yml`:

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

### 4. Document Your Package

Create comprehensive README.md:

```markdown
# @a11y-toolkit/core

Complete web accessibility toolkit with 12 features.

## Installation

\`\`\`bash
npm install @a11y-toolkit/core
\`\`\`

## Usage

### React
\`\`\`jsx
import AccessibilityMenu from '@a11y-toolkit/core/react';

<AccessibilityMenu />
\`\`\`

### Vanilla JavaScript
\`\`\`javascript
import { AccessibilityMenuConfigurable } from '@a11y-toolkit/core';

const menu = new AccessibilityMenuConfigurable();
menu.init();
\`\`\`

## Features
- 12 accessibility features
- Framework agnostic
- TypeScript support
- Zero dependencies (Vanilla JS)
- WCAG 2.1 compliant

## License
MIT
```

---

## 🎯 Popular Package Examples

### Similar Packages

```bash
# Material Design
npm install @mui/material

# React Bootstrap
npm install react-bootstrap

# Tailwind CSS
npm install tailwindcss

# Your accessibility package
npm install @a11y-toolkit/core
```

---

## 📊 NPM Package Stats

Once published, you get:

```
Downloads per week
Version history
Dependency graph
License info
Repository link
Documentation link
```

---

## 🔄 Workflow: From Local to NPM

```
1. Develop locally
   └─ npm run dev

2. Test locally
   └─ npm test

3. Build for production
   └─ npm run build

4. Push to GitHub
   └─ git push

5. Create GitHub Release
   └─ npm version major/minor/patch

6. Publish to npm
   └─ npm publish

7. Users install
   └─ npm install @yourusername/accessibility-toolkit

8. Users use in projects
   └─ import from package

9. Get feedback
   └─ Update and repeat from step 1
```

---

## 💡 Benefits of NPM Package

| Benefit | Explanation |
|---------|-------------|
| **Versioning** | Easy to manage versions |
| **Dependencies** | Automatically installed |
| **Updates** | Users can update easily |
| **Sharing** | Anyone can use globally |
| **Maintenance** | One source of truth |
| **Distribution** | Reach thousands of developers |

---

## 🚀 Making Your Package Popular

### 1. Great Documentation
- README.md with examples
- API reference
- Integration guides
- Troubleshooting

### 2. Good Examples
- React example
- Vue example
- Angular example
- Vanilla JS example

### 3. Active Maintenance
- Fix bugs quickly
- Add requested features
- Update dependencies
- Respond to issues

### 4. Community
- GitHub discussions
- Issues template
- Contribution guide
- Code of conduct

### 5. Marketing
- Write blog posts
- Share on Twitter/Dev.to
- Add to awesome lists
- Create demo site

---

## 🎓 Example: Complete Setup

### 1. Update package.json
```json
{
  "name": "@yourusername/a11y-toolkit",
  "version": "1.0.0",
  "description": "Accessibility toolkit",
  "main": "dist/index.js",
  "exports": {
    ".": "./dist/index.js",
    "./react": "./dist/react/index.js"
  }
}
```

### 2. Build
```bash
npm run build
```

### 3. Login
```bash
npm login
```

### 4. Publish
```bash
npm publish --access public
```

### 5. Users Install
```bash
npm install @yourusername/a11y-toolkit
```

### 6. Users Use
```jsx
import { AccessibilityMenu } from '@yourusername/a11y-toolkit/react';

<AccessibilityMenu />
```

---

## ✅ NPM Package Checklist

```
Publishing:
☐ Updated package.json
☐ Built project (npm run build)
☐ Tests passing
☐ README.md complete
☐ Licensed (MIT recommended)
☐ npm account created
☐ npm login successful
☐ Published package (npm publish)

After Publishing:
☐ Package appears on npmjs.com
☐ Installation instructions work
☐ Examples work
☐ Types correct
☐ No console errors
☐ Mobile works
☐ All features functional

Maintenance:
☐ Monitor downloads
☐ Respond to issues
☐ Accept pull requests
☐ Keep dependencies updated
☐ Release new versions
☐ Update documentation
```

---

## 🌟 Your Package Name Matters

```bash
# Good names:
npm install @yourusername/accessibility-toolkit
npm install @yourusername/a11y-core
npm install web-accessibility-menu

# Package name rules:
- Must be lowercase
- Can contain hyphens
- Can't contain spaces
- Must be unique on npm
- Scoped with @ recommended
```

---

## 📞 Getting Help

### NPM Documentation
- https://docs.npmjs.com/

### Publishing Guide
- https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry

### Semantic Versioning
- https://semver.org/

---

## 🎉 Success!

Once published:

✅ Anyone can install with `npm install`  
✅ Automatic updates available  
✅ Used across thousands of projects  
✅ Open source contribution  
✅ Portfolio project  
✅ Help the community  

---

## 🚀 Next Steps

1. **Publish to npm** (1 hour)
   ```bash
   npm publish --access public
   ```

2. **Share package** (optional)
   - Add to GitHub profile
   - Share on Twitter
   - Post on Dev.to
   - Add to awesome lists

3. **Maintain package** (ongoing)
   - Fix bugs
   - Add features
   - Update docs
   - Help users

4. **Grow community** (long-term)
   - More examples
   - Better docs
   - Community feedback
   - Become popular!

---

**Your accessibility toolkit is ready for the world!** 🌍♿

**Publish it and help developers everywhere!** 🚀
