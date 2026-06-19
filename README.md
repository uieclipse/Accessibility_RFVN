# ♿ accessibility-toolkit-a11y - Complete Web Accessibility Toolkit

**Enterprise-ready accessibility toolkit with 3 powerful systems: User-facing menu, WCAG compliance checker, and real-time accessibility monitoring.**

![npm version](https://img.shields.io/npm/v/accessibility-toolkit-a11y)
![License](https://img.shields.io/badge/license-MIT-green)
![WCAG 2.1](https://img.shields.io/badge/WCAG-2.1%20AAA-brightgreen)

> **Latest: v1.0.12** — All visual features now use `!important` CSS injection so they override any app styles. Added Invert Colors. Text To Speech reads content on hover. Profiles reset cleanly on switch. Source maps removed from package (fixes `source-map-loader` errors).

---

## 🎯 What's Included

### 1️⃣ **AccessibilityMenu** - 21 User Features
Accessible menu widget with contrast, saturation, invert colors, monochrome, text size, dyslexia font, ADHD mode, hover text-to-speech, 8 profile presets, and more. Just add it to your app!

### 2️⃣ **AccessibilityAuditor** - WCAG Scanning  
Scan your website for accessibility issues. Get score (0-100) and detailed reports.

### 3️⃣ **AccessibilityStatusReporter** - Visual Monitor
Show accessibility badge/panel to developers. Download reports as JSON.

### 4️⃣ **React Components** - Accessible UI
Pre-built components: Nav, Button, Input, Modal, Tabs (all WCAG compliant)

### 5️⃣ **Vanilla JS Utilities** - Helpers
Keyboard nav, ARIA labels, contrast checking, screen reader announcements

---

## 📦 Installation

```bash
# npm
npm install accessibility-toolkit-a11y

# yarn
yarn add accessibility-toolkit-a11y

# pnpm
pnpm add accessibility-toolkit-a11y
```

---

## 🚀 Quick Start (30 seconds)

### Add Accessibility Menu to Your App

```tsx
import { AccessibilityMenu } from 'accessibility-toolkit-a11y';

export default function App() {
  return (
    <>
      <AccessibilityMenu position="top-right" />
      {/* Your app content */}
    </>
  );
}
```

**Done!** Users can now:

- Adjust text size, spacing, line height, letter spacing
- Change contrast (dark/light) and saturation (high/low/monochrome)
- Enable dyslexia-friendly font
- Hide images, stop animations, highlight links & titles
- Enable Reading Mask, ADHD Mode, Text To Speech
- Apply profiles: Dyslexia, ADHD, Visual Impaired, Seizures, Screen Reader, and more
- Control widget size, position (left/right), and visibility

---

## 🔍 Scan for Issues (2 minutes)

```tsx
import { auditPage } from 'accessibility-toolkit-a11y/utils';

// Run one-time audit
const report = auditPage();

console.log(`WCAG AA Score: ${report.scoreAA}/100`);
console.log(`Errors: ${report.errors}, Warnings: ${report.warnings}`);

// Download report as JSON
const json = JSON.stringify(report, null, 2);
```

---

## 📊 Show Status Badge (Developer Dashboard)

```tsx
import { AccessibilityStatusReporter } from 'accessibility-toolkit-a11y';

<AccessibilityStatusReporter
  position="bottom-right"
  mode="badge"
  auditInterval={5000}
  enableDownload={true}
/>
```

Shows:
- 🎯 Circular badge with accessibility score
- 📈 Click to see issues
- 📥 Download audit report
- 🔄 Auto-audit every 5 seconds

---

## ⚙️ Full Configuration Example

```tsx
<AccessibilityMenu
  // ── Layout ──────────────────────────────────────────
  position="bottom-right"     // "top-left" | "top-right" | "bottom-left" | "bottom-right"
  size="medium"               // "small" | "medium" | "large"
  buttonStyle="circle"        // "circle" | "square" | "rounded"
  buttonPosition="fixed"      // "fixed" | "absolute"

  // ── Colors ──────────────────────────────────────────
  colors={{
    buttonBackground: '#2563eb',   // button + header background
    buttonText: '#ffffff',          // button + header icon/text color
    panelBackground: '#ffffff',     // panel background
    panelText: '#000000',           // panel text
    panelBorder: '#2563eb',         // active card highlight color
    buttonHover: '#1d4ed8',         // button hover color
    resetButtonBackground: '#f3f4f6',
    resetButtonHover: '#e5e7eb',
  }}

  // ── Features (enable/disable per feature) ───────────
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
    highlightTitles: true,
    stopAnimations: true,
    hideImages: true,
    readingMask: true,
    textToSpeech: true,
    adhdMode: true,
    monochrome: true,
    invertColors: true,
    darkMode: true,
    profiles: true,
    widgetSize: true,
    widgetPosition: true,
    widgetVisibility: true,
  }}

  // ── Labels (customise any text) ─────────────────────
  labels={{
    menuTitle: 'Accessibility',
    contrast: 'Contrast',
    font: 'Font',
    textSize: 'Text Size',
    darkMode: 'Dark Mode',
    // ... all 30+ labels customisable
  }}

  // ── Slider ranges ───────────────────────────────────
  textSizeMin={80}
  textSizeMax={150}
  textSizeStep={10}
  lineHeightMin={1}
  lineHeightMax={2.5}
  lineHeightStep={0.1}

  // ── Behaviour ───────────────────────────────────────
  autoSave={true}             // persist settings in localStorage
  closeOnEscape={true}        // Escape key closes panel
  closeOnClickOutside={true}  // click outside closes panel
  showReset={true}            // show "Reset all settings" link
  storageKey="a11y-settings"  // localStorage key

  // ── Callbacks ───────────────────────────────────────
  onSettingsChange={(settings) => console.log(settings)}
  onOpen={() => console.log('opened')}
  onClose={() => console.log('closed')}
  onReset={() => console.log('reset')}
/>
```

---

## 📋 Features Comparison

| Feature | AccessibilityMenu | Auditor | Components | Utilities |
|---------|-------------------|---------|-----------|-----------|
| **User Menu** | ✅ 12 options | - | - | - |
| **Scan Issues** | - | ✅ 15 checks | - | - |
| **WCAG Score** | - | ✅ 0-100 | - | - |
| **React UI** | - | - | ✅ 5 components | - |
| **Keyboard Nav** | ✅ | - | ✅ | ✅ |
| **ARIA Helpers** | - | - | ✅ | ✅ |
| **Contrast Check** | - | ✅ | - | ✅ |
| **Reports** | - | ✅ JSON | - | - |

---

## 🎨 21 Accessibility Features

Users can control:

| Feature | Options | Impact |
| ------- | ------- | ------ |
| **Text Size** | 80–150% + x1.5/x2/x2.5 presets | Vision impaired |
| **Text Spacing** | 0–10 + x1.5/x2/x2.5 presets | Dyslexia |
| **Line Height** | 1.0–2.5 + x1.5/x2/x2.5 presets | Reading comfort |
| **Letter Spacing** | 0–10 + x1.5/x2/x2.5 presets | Character visibility |
| **Contrast** | Normal / Dark / Light | Low vision |
| **Saturation** | Normal / High / Low | Color sensitivity |
| **Monochrome** | On / Off | Color blindness |
| **Invert Colors** | On / Off | Light sensitivity |
| **Font** | Standard / Dyslexia-friendly | Dyslexia |
| **Cursor** | Normal / Big | Motor impaired |
| **Highlight Links** | On / Off | Navigation clarity |
| **Highlight Titles** | On / Off | Page structure |
| **Stop Animations** | On / Off | Motion sickness, ADHD |
| **Hide Images** | On / Off | Focus, bandwidth |
| **Reading Mask** | On / Off | Focus on reading area |
| **Text To Speech** | On / Off | Reads hovered content aloud |
| **ADHD Mode** | On / Off | Reduces distraction, enhances focus |
| **Profiles** | 8 presets | One-click setup per disability type |
| **Widget Size** | Normal / Small | Preference |
| **Display** | Left / Right | Preference |
| **Visibility** | On / Off | Hide widget when not needed |

### 8 Profile Presets

| Profile | What it applies |
| ------- | --------------- |
| **Readable Fonts** | Dyslexia font, larger text, line height |
| **Screen Reader** | Larger text, highlight links & titles |
| **Motor Impaired** | Big cursor, larger text |
| **Dyslexia** | Dyslexia font, letter/line/word spacing |
| **Cognitive** | Readable font, stop animations, highlight links |
| **ADHD** | ADHD mode, stop animations, larger text |
| **Visual Impaired** | Dark contrast, large text, big cursor |
| **Seizures** | Stop animations, monochrome |

---

## 🔎 What Gets Audited

The AccessibilityAuditor checks:

✅ Image alt text  
✅ Link text clarity  
✅ Heading hierarchy  
✅ Form labels  
✅ Color contrast  
✅ Keyboard navigation  
✅ ARIA attributes  
✅ Focus indicators  
✅ Page language  
✅ Button labels  
✅ Skip links  
✅ Auto-playing content  
✅ And more...

**Returns:** 0-100 WCAG AA compliance score + detailed issues with fixes

---

## 💻 React Components

Pre-built, fully accessible components:

### AccessibleNav
```tsx
<AccessibleNav
  items={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ]}
  ariaLabel="Main navigation"
/>
```

### AccessibleButton
```tsx
<AccessibleButton
  label="Submit"
  onClick={handleSubmit}
  ariaLabel="Submit form"
/>
```

### AccessibleInput
```tsx
<AccessibleInput
  label="Email"
  type="email"
  required
  error={errors.email}
  ariaLabel="Email address"
/>
```

### AccessibleModal
```tsx
<AccessibleModal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm"
  ariaLabel="Confirmation dialog"
>
  <p>Are you sure?</p>
</AccessibleModal>
```

### AccessibleTabs
```tsx
<AccessibleTabs
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <div>Content</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content</div> },
  ]}
  defaultTabId="tab1"
/>
```

---

## 🛠️ Vanilla JS Utilities

For non-React projects:

```javascript
import { 
  getContrastRatio, 
  announceToScreenReader, 
  KEYS,
  trapFocus,
  setAriaLabel
} from 'accessibility-toolkit-a11y/utils';

// Check contrast
const { ratio, AA, AAA } = getContrastRatio('#000', '#fff');

// Announce to screen readers
announceToScreenReader('Form submitted!', 'polite');

// Keyboard constants
if (e.key === KEYS.ESCAPE) closeMenu();

// Focus trapping
trapFocus(modalElement, event);

// Set ARIA labels
setAriaLabel(button, 'Close menu');
```

---

## 📊 Real-time Monitoring

```typescript
import { A11yMonitor } from 'accessibility-toolkit-a11y/utils';

const monitor = new A11yMonitor();

// Subscribe to audit results
monitor.subscribe((report) => {
  console.log(`Current score: ${report.scoreAA}/100`);
  
  if (report.errors > 0) {
    alertTeam('Accessibility issues found');
  }
});

// Start monitoring (every 10 seconds)
monitor.start(10000);
```

---

## 🎯 Configuration Options

**40+ customizable options:**

- Position (4 options)
- Size (3 options)
- Button style (3 options)
- Colors (8 properties)
- Labels (28 customizable)
- Features (12 toggles)
- Behavior (7 options)
- Ranges (4 sliders with min/max)
- Callbacks (4 event handlers)
- Accessibility props (3 ARIA options)

[**See full configuration guide →**](./ACCESSIBILITY_MENU_CONFIG.md)

---

## 📖 Documentation

| Guide | Purpose |
|-------|---------|
| [Quick Start](./QUICK_START.md) | 5-minute setup |
| [Local Setup](./LOCAL_SETUP_GUIDE.md) | Run locally on Windows/Mac/Linux |
| [Configuration](./ACCESSIBILITY_MENU_CONFIG.md) | 40+ config options |
| [Monitoring](./ACCESSIBILITY_MONITORING.md) | Audit & real-time monitoring |
| [React Guide](./REACT_VS_NONREACT_GUIDE.md) | Framework integration |
| [Usage Guide](./USAGE_GUIDE.md) | Complete API reference |
| [Publishing](./PUBLISH_TO_NPM.md) | Publish your own version |

---

## 🏆 WCAG Compliance

- ✅ **Level A** - Basic accessibility
- ✅ **Level AA** - Recommended standard
- ✅ **Level AAA** - Enhanced accessibility

Supports feature flags for each level. Most organizations aim for **AA**.

---

## 📱 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile | iOS Safari, Chrome Mobile |

---

## 🔒 Features

- ✅ **Zero external dependencies** (Vanilla JS version)
- ✅ **TypeScript support** with full types
- ✅ **localStorage persistence** - settings auto-save
- ✅ **Keyboard shortcuts** (Ctrl+A to toggle menu)
- ✅ **Screen reader compatible** with ARIA
- ✅ **Mobile responsive** 
- ✅ **Dark/Light theme support**
- ✅ **Customizable colors & labels**
- ✅ **Callback hooks** for integrations
- ✅ **Real-time monitoring** with subscriptions

---

## 📥 Download & Setup

### From NPM
```bash
npm install accessibility-toolkit-a11y
```

### From CDN (Vanilla JS)
```html
<script src="https://unpkg.com/accessibility-toolkit-a11y"></script>
```

### From GitHub
```bash
npm install github:uieclipse/Accessibility-
```

### Local Development
```bash
git clone https://github.com/uieclipse/Accessibility-.git
cd Accessibility-
npm install
npm run build
```

---

## 💡 Use Cases

### 1. **Add User Menu** (5 minutes)
Give users accessibility controls without coding

### 2. **Scan Website** (2 minutes)
Get WCAG score and issues list

### 3. **Monitor Accessibility** (Real-time)
Track score changes as you build

### 4. **Build Accessible UI** (Components)
Pre-built components that follow WCAG

### 5. **Integrate Utilities** (Helpers)
Use contrast checker, ARIA helpers in your code

---

## 🚀 Common Tasks

### Make User Menu Appear
```tsx
<AccessibilityMenu position="top-right" />
```

### Check Site Accessibility
```typescript
const report = auditPage();
console.log(report.scoreAA); // 0-100
```

### Show Developer Badge
```tsx
<AccessibilityStatusReporter 
  position="bottom-right" 
  mode="badge" 
/>
```

### Build Accessible Navigation
```tsx
<AccessibleNav items={navItems} />
```

### Check Color Contrast
```typescript
const ratio = getContrastRatio('#fff', '#000');
console.log(ratio.AA); // true/false
```

---

## 📊 Example Dashboard

```tsx
import { AccessibilityMenu, AccessibilityStatusReporter } from 'accessibility-toolkit-a11y';

export default function App() {
  return (
    <>
      {/* For end users */}
      <AccessibilityMenu position="top-right" />
      
      {/* For developers (dev mode only) */}
      {process.env.NODE_ENV === 'development' && (
        <AccessibilityStatusReporter 
          position="bottom-right"
          mode="badge"
          auditInterval={5000}
        />
      )}
      
      {/* Your app */}
      <main>Your Website</main>
    </>
  );
}
```

---

## 📱 Flutter & Mobile Integration

This package runs in the **browser (web)**. To use it inside a Flutter or React Native app, embed your web app in a WebView.

### Flutter (webview_flutter)

**1. Add dependency to `pubspec.yaml`:**
```yaml
dependencies:
  webview_flutter: ^4.0.0
```

**2. Embed your React web app with the accessibility menu:**
```dart
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class AccessibleWebView extends StatefulWidget {
  const AccessibleWebView({super.key});

  @override
  State<AccessibleWebView> createState() => _AccessibleWebViewState();
}

class _AccessibleWebViewState extends State<AccessibleWebView> {
  late final WebViewController _controller;

  @override
  void initState() {
    super.initState();
    _controller = WebViewController()
      ..setJavaScriptEnabled(true)
      ..loadRequest(Uri.parse('https://your-react-app.com'));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Accessible App')),
      body: WebViewWidget(controller: _controller),
    );
  }
}
```

**3. Your React app just needs the menu:**
```tsx
// In your React web app (deployed to a URL)
import { AccessibilityMenu } from 'accessibility-toolkit-a11y';

export default function App() {
  return (
    <>
      <AccessibilityMenu position="top-right" />
      <main>Your content</main>
    </>
  );
}
```

The accessibility menu (contrast, font, TTS, dark mode, etc.) will work fully inside the Flutter WebView — including localStorage persistence and Web Speech API (on supported devices).

### React Native (react-native-webview)

```bash
npm install react-native-webview
```

```tsx
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <WebView
      source={{ uri: 'https://your-react-app.com' }}
      javaScriptEnabled={true}
      domStorageEnabled={true}  // enables localStorage
    />
  );
}
```

> **Platform support:** The accessibility features use browser APIs (`document`, `speechSynthesis`, `localStorage`). They work inside any WebView that has JavaScript enabled.

---

## 🐛 Troubleshooting

### Menu not showing?
- Check z-index and position CSS
- Verify no parent elements hiding it
- Check browser console for errors

### Audit returning errors?
- Ensure page is fully loaded before audit
- Check DOM is accessible
- No CORS issues

### Settings not saving?
- Enable autoSave={true}
- Check localStorage is enabled
- Verify storage key isn't in use

[**See full troubleshooting →**](./LOCAL_SETUP_GUIDE.md#troubleshooting)

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for changes
4. Submit a pull request

---

## 📄 License

MIT © 2026 Accessibility Toolkit Contributors

---

## 🔗 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)

---

## ❓ FAQ

**Q: Do I need React?**  
A: No! Works with vanilla JS, React, Vue, Angular, Next.js, etc.

**Q: What WCAG level should I aim for?**  
A: WCAG AA is the standard. Most organizations and governments require it.

**Q: Can I customize colors and labels?**  
A: Yes! 40+ configuration options including colors, labels, positions, sizes.

**Q: Does it have keyboard shortcuts?**  
A: Yes! Ctrl+A toggles the menu. Escape closes it.

**Q: Can I disable certain features?**  
A: Yes! Use feature flags to enable only what you need.

**Q: How does localStorage work?**  
A: User settings auto-save to localStorage. Settings persist across sessions.

**Q: Can I integrate with my backend?**  
A: Yes! Use callbacks like `onSettingsChange` to sync with your server.

**Q: Is it accessible itself?**  
A: Yes! The menu and all components follow WCAG AA standards.

---

## 📞 Support

- 📖 Read the [documentation](./QUICK_START.md)
- 🐛 [Report issues](https://github.com/uieclipse/Accessibility-/issues)
- 💬 [Start a discussion](https://github.com/uieclipse/Accessibility-/discussions)

---

**Making the web accessible for everyone!** ♿🌍

Built with ❤️ for accessibility.
