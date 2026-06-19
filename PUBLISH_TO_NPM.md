# 📦 Publish to NPM - Step-by-Step Guide

**Complete instructions to publish the Accessibility Toolkit to npm.**

---

## ✅ Pre-Publish Checklist

Before publishing, verify:

```bash
# 1. Check package.json
cat package.json

# 2. Verify build works
npm run build

# 3. Check for dist folder
ls -la dist/

# 4. Verify tests pass (if any)
npm test

# 5. Check no errors
npm run type-check
```

---

## 🎯 Step 1: Create NPM Account

### Option A: Online (Recommended)

1. Go to: https://www.npmjs.com/
2. Click **"Sign Up"** (top right)
3. Enter:
   - **Username** (choose carefully - can't change easily)
   - **Email** (must be valid)
   - **Password** (strong password)
4. Click **"Sign Up"**
5. **Verify email** (check inbox)

✅ Account created!

### Option B: Command Line

```bash
npm adduser
# Enter:
# - Username
# - Password
# - Email
```

---

## 🎯 Step 2: Update package.json

Edit `package.json` to add:

```json
{
  "name": "@a11y-toolkit/core",
  "version": "1.0.0",
  "description": "Enterprise-ready accessibility toolkit for building WCAG-compliant UIs",
  "author": {
    "name": " Name",
    "email": "sa.email@example.com",
    "url": "https://github.com/yourusername"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/Accessibility-.git"
  },
  "homepage": "https://github.com/yourusername/Accessibility-#readme",
  "bugs": {
    "url": "https://github.com/yourusername/Accessibility-/issues"
  },
  "license": "MIT",
  "keywords": [
    "accessibility",
    "a11y",
    "wcag",
    "aria",
    "react",
    "component"
  ],
  "files": [
    "dist"
  ]
}
```

---

## 🎯 Step 3: Login to NPM

```bash
npm login
```

You'll be asked:
```
Username: yourusername
Password: ••••••••
Email: your.email@example.com
```

✅ Logged in!

### Verify login:

```bash
npm whoami
# Shows: yourusername
```

---

## 🎯 Step 4: Build the Package

```bash
npm run build
```

This creates the `dist/` folder with:
```
dist/
├── index.js          # Main file
├── index.esm.js      # ES module
├── index.d.ts        # TypeScript types
├── react/
│   ├── index.js
│   ├── index.esm.js
│   └── index.d.ts
├── utils/
│   ├── index.js
│   ├── index.esm.js
│   └── index.d.ts
└── config/
    ├── index.js
    ├── index.esm.js
    └── index.d.ts
```

✅ Build complete!

---

## 🎯 Step 5: Create .npmignore (Optional)

Create `.npmignore` to exclude files:

```
# Don't include in npm package
src/
examples/
docs/
.github/
*.test.ts
*.test.tsx
coverage/
.git
.gitignore
README.md
tsconfig.json
rollup.config.js
```

Or just use `files` in package.json (already set):
```json
{
  "files": ["dist"]
}
```

---

## 🎯 Step 6: Publish Package

### For Scoped Package (Recommended)

```bash
npm publish --access public
```

This publishes as: `@a11y-toolkit/core`

### For Unscoped Package

First, change name in package.json:
```json
{
  "name": "a11y-toolkit-core"
}
```

Then publish:
```bash
npm publish
```

---

## ✅ Step 7: Verify Publication

### Check on NPM Website

1. Go to: https://www.npmjs.com/
2. Search for: `@a11y-toolkit/core`
3. Should see your package with:
   - ✅ Correct version
   - ✅ Your name as author
   - ✅ Description
   - ✅ Download count

### Check in Terminal

```bash
npm view @a11y-toolkit/core

# Shows:
# @a11y-toolkit/core@1.0.0
# Enterprise-ready accessibility toolkit...
# 
# repository: { type: 'git', url: 'https://github.com/...' }
# keywords: [ 'accessibility', 'a11y', 'wcag', 'aria', 'react' ]
# author: Your Name <your.email@example.com>
# license: MIT
```

### Test Installation

```bash
# In a different folder
cd /tmp
npm install @a11y-toolkit/core
# Shows: added 1 package

# Verify it installed
ls node_modules/@a11y-toolkit/
# Shows: core/
```

✅ **Published and working!**

---

## 🎉 Success Message

You should see:

```
npm notice
npm notice 📦  @a11y-toolkit/core@1.0.0
npm notice === Tarball Contents ===
npm notice 1.2kB dist/index.d.ts
npm notice 12kB dist/index.js
npm notice 8.4kB dist/index.esm.js
npm notice === Tarball Details ===
npm notice name:          @a11y-toolkit/core
npm notice version:       1.0.0
npm notice filename:      a11y-toolkit-core-1.0.0.tgz
npm notice package size:  4.2kB
npm notice unpacked size: 25.6kB
npm notice shasum:        abc123...
npm notice integrity:     sha512-xyz...
npm notice total files:   12
npm notice
npm notice Publishing to https://registry.npmjs.org/
+ @a11y-toolkit/core@1.0.0
```

---

## 📝 Common Publishing Errors & Solutions

### Error: "403 You do not have permission"

**Cause:** Not logged in or no permission

**Solution:**
```bash
npm logout
npm login
npm publish --access public
```

### Error: "Package name already exists"

**Cause:** Name is taken

**Solution:**
Use different name:
```json
{
  "name": "@yourusername/a11y-toolkit"
}
```

### Error: "dist folder not found"

**Cause:** Need to build first

**Solution:**
```bash
npm run build
npm publish --access public
```

### Error: "Invalid package.json"

**Cause:** Syntax error in package.json

**Solution:**
```bash
npm ls
# Shows where error is
# Fix the JSON syntax
```

---

## 🔄 Publishing Updates (Later)

### Update Version

When you make changes:

```bash
# Patch (bug fix): 1.0.0 → 1.0.1
npm version patch

# Minor (new feature): 1.0.0 → 1.1.0
npm version minor

# Major (breaking change): 1.0.0 → 2.0.0
npm version major
```

### Build & Republish

```bash
npm run build
npm publish
```

---

## 📊 Package Page

Your npm package page will show:

```
Package: @a11y-toolkit/core
Version: 1.0.0
License: MIT
Downloads: [Count increases over time]
Repository: [Link to GitHub]
Author: Your Name
Description: Enterprise-ready accessibility toolkit...
```

Users can now:
```bash
npm install @a11y-toolkit/core
```

---

## 🎯 Users Installing Your Package

### React Project

```bash
npm install @a11y-toolkit/core
```

```jsx
import { AccessibilityMenuConfigurable } from '@a11y-toolkit/core/react';

<AccessibilityMenuConfigurable />
```

### Vanilla JavaScript

```bash
npm install @a11y-toolkit/core
```

```javascript
import { AccessibilityMenuConfigurable } from '@a11y-toolkit/core';

const menu = new AccessibilityMenuConfigurable();
menu.init();
```

---

## 📦 Managing Your Package

### View Package Info

```bash
npm view @a11y-toolkit/core
npm view @a11y-toolkit/core versions
npm view @a11y-toolkit/core maintainers
```

### Update Maintainers

```bash
npm owner add username @a11y-toolkit/core
npm owner rm username @a11y-toolkit/core
```

### Deprecate Old Versions

```bash
npm deprecate @a11y-toolkit/core@1.0.0 "Use 1.1.0 instead"
```

### Unpublish (Use with caution!)

```bash
npm unpublish @a11y-toolkit/core@1.0.0
```

---

## 🚀 Post-Publication Checklist

After publishing:

```
✅ Package appears on npmjs.com
✅ Installation works (npm install)
✅ Can import in projects
✅ No console errors
✅ All features work
✅ TypeScript types load
✅ Documentation is clear
✅ Homepage link works
✅ Repository link works
✅ Issues/bugs link works
✅ Author information correct
✅ License correct
```

---

## 📣 Share Your Package

### NPM Registry
- Link: https://www.npmjs.com/package/@a11y-toolkit/core

### GitHub
- Add to repository description
- Create releases with changelog

### Social Media
- Twitter: "Just published @a11y-toolkit/core to npm! 🎉"
- Dev.to: Write blog post
- Reddit: Share on r/javascript

### Package Lists
- Add to "Awesome" lists
- Include in accessibility resources
- Share in accessibility communities

---

## 🎓 Full Workflow Example

```bash
# 1. Create npm account at npmjs.com

# 2. Login
npm login

# 3. Update package.json with your info

# 4. Build project
npm run build

# 5. Publish
npm publish --access public

# 6. Verify on npmjs.com

# 7. Test installation
cd /tmp
npm install @a11y-toolkit/core

# 8. Share with world! 🎉
```

---

## 💡 Tips for Success

### 1. Good Package Name
✅ `@a11y-toolkit/core` - Clear, namespaced  
❌ `accessibility` - Too generic  
❌ `a11y-menu` - Not descriptive enough  

### 2. Clear Description
✅ "Enterprise-ready accessibility toolkit with 12 features"  
❌ "Accessibility stuff"  

### 3. Good Keywords
```json
{
  "keywords": [
    "accessibility",
    "a11y",
    "wcag",
    "aria",
    "react",
    "component",
    "menu"
  ]
}
```

### 4. Complete README
- Clear installation
- Usage examples
- Feature list
- API reference
- License

### 5. Proper License
```json
{
  "license": "MIT"
}
```

---

## 🌟 What Happens After Publication

### Users Can Install
```bash
npm install @a11y-toolkit/core
```

### Package Gets Downloads
- First install: 1 user
- First week: Maybe 10-50 users
- First month: Hopefully 100+
- Keep growing!

### You Get Recognition
- Open source contributor
- Portfolio project
- Community appreciation
- Possible job opportunities

### Maintenance Required
- Fix bugs
- Add features
- Update dependencies
- Respond to issues

---

## 🎯 Next Steps After Publishing

1. **Create GitHub Releases**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   # Create release on GitHub
   ```

2. **Write Blog Post**
   - Why you built it
   - How to use it
   - Share on Dev.to

3. **Create Documentation Site**
   - Deploy to GitHub Pages
   - Show examples
   - Feature showcase

4. **Engage Community**
   - Respond to issues
   - Accept pull requests
   - Provide support

5. **Keep Updating**
   - Add features
   - Fix bugs
   - Stay active

---

## 🎉 Congratulations!

You've published a real npm package!

✨ **Your package is now available to:**
- ✅ Millions of developers
- ✅ Any project in the world
- ✅ Any framework/platform
- ✅ Anyone who needs accessibility

**You've made the web more accessible!** ♿🌍

---

## 📞 NPM Resources

- **NPM Docs:** https://docs.npmjs.com/
- **Publishing Guide:** https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
- **Package.json Reference:** https://docs.npmjs.com/cli/v8/configuring-npm/package-json
- **Semantic Versioning:** https://semver.org/

---

## 🚀 You're Now an Open Source Publisher!

**Welcome to the community!** 🎊

Your toolkit is helping developers everywhere build accessible websites.

**Thank you for contributing to web accessibility!** ♿✨
