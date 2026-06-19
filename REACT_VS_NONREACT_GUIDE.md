# Accessibility Menu: React vs Non-React Projects

Complete guide to integrate the accessibility menu in both React and vanilla JavaScript projects.

---

## 🚀 Quick Start Comparison

| Aspect | React | Non-React (Vanilla JS) |
|--------|-------|----------------------|
| **File** | `AccessibilityMenuConfigurable.tsx` | `accessibility-menu-configurable.js` |
| **Setup** | Import component | Include script tag |
| **Dependencies** | React 16.8+ | None (0 dependencies) |
| **Installation** | Copy file to project | Copy file to project |
| **Lines of Code** | ~400 lines | ~500 lines |
| **Bundle Size** | ~5KB (gzipped) | ~6KB (gzipped) |

---

# REACT PROJECTS

## Installation

### Step 1: Copy the React Component

Copy `examples/AccessibilityMenuConfigurable.tsx` to your React project:

```bash
# Option A: Copy to your components folder
cp examples/AccessibilityMenuConfigurable.tsx src/components/

# Option B: Copy to your UI folder
cp examples/AccessibilityMenuConfigurable.tsx src/ui/
```

### Step 2: Import in Your App

**Option A: Global Import (Recommended)**

```tsx
// src/App.tsx
import React from 'react';
import AccessibilityMenuConfigurable from './components/AccessibilityMenuConfigurable';

export default function App() {
  return (
    <>
      <AccessibilityMenuConfigurable 
        position="top-right"
        showReset={true}
      />
      
      {/* Your app content */}
      <header>Welcome</header>
      <main>Your content here</main>
    </>
  );
}
```

**Option B: With Feature Flags**

```tsx
import React from 'react';
import AccessibilityMenuConfigurable, { 
  DEFAULT_FEATURES 
} from './components/AccessibilityMenuConfigurable';

export default function App() {
  const features = {
    ...DEFAULT_FEATURES,
    stopAnimations: false,  // Disable animation control
    hideImages: false,      // Disable image hiding
  };

  return (
    <>
      <AccessibilityMenuConfigurable 
        features={features}
        position="top-right"
        showReset={true}
        onSettingsChange={(settings) => {
          console.log('Accessibility settings updated:', settings);
          // Track in analytics, update UI, etc.
        }}
      />
      
      {/* Your app content */}
    </>
  );
}
```

---

## React Framework-Specific Examples

### Next.js (App Router)

```tsx
// app/layout.tsx
import AccessibilityMenu from '@/components/AccessibilityMenu';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AccessibilityMenu position="top-right" showReset={true} />
        {children}
      </body>
    </html>
  );
}
```

### Next.js (Pages Router)

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import AccessibilityMenu from '@/components/AccessibilityMenu';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AccessibilityMenu position="top-right" showReset={true} />
      <Component {...pageProps} />
    </>
  );
}
```

### Create React App (CRA)

```tsx
// src/App.tsx
import React from 'react';
import AccessibilityMenu from './components/AccessibilityMenu';
import './App.css';

function App() {
  return (
    <div className="App">
      <AccessibilityMenu />
      {/* Your app content */}
    </div>
  );
}

export default App;
```

### Vite + React

```tsx
// src/App.tsx
import AccessibilityMenu from './components/AccessibilityMenu';
import './App.css';

function App() {
  return (
    <>
      <AccessibilityMenu position="top-right" />
      {/* Your app content */}
    </>
  );
}

export default App;
```

### Remix

```tsx
// app/root.tsx
import { Meta, Links, Outlet, Scripts } from '@remix-run/react';
import AccessibilityMenu from './components/AccessibilityMenu';
import styles from './styles/app.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <AccessibilityMenu position="top-right" />
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
```

### Gatsby

```tsx
// src/components/layout.tsx
import React from 'react';
import AccessibilityMenu from './AccessibilityMenu';

export default function Layout({ children }) {
  return (
    <>
      <AccessibilityMenu position="top-right" />
      <main>{children}</main>
    </>
  );
}
```

### Expo (React Native Web)

```tsx
import { View } from 'react-native';
import AccessibilityMenu from './components/AccessibilityMenu';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AccessibilityMenu position="top-right" />
      {/* Your content */}
    </View>
  );
}
```

---

## React Configuration Examples

### Enable All Features (Default)

```tsx
import AccessibilityMenuConfigurable, { 
  DEFAULT_FEATURES 
} from './components/AccessibilityMenuConfigurable';

<AccessibilityMenuConfigurable 
  features={DEFAULT_FEATURES}
  position="top-right"
/>
```

### Essential Features Only

```tsx
<AccessibilityMenuConfigurable 
  features={{
    contrast: true,
    textSize: true,
    font: true,
    highlightLinks: true,
    // All others disabled
  }}
/>
```

### Production vs Development

```tsx
const features = process.env.NODE_ENV === 'development'
  ? DEFAULT_FEATURES  // All features
  : {
      contrast: true,
      textSize: true,
      font: true,
    };

<AccessibilityMenuConfigurable features={features} />
```

### With Settings Callback

```tsx
import { useState } from 'react';

export default function App() {
  const [a11ySettings, setA11ySettings] = useState(null);

  return (
    <AccessibilityMenuConfigurable
      onSettingsChange={(settings) => {
        console.log('Settings changed:', settings);
        setA11ySettings(settings);
        
        // Save to database
        fetch('/api/user/accessibility', {
          method: 'POST',
          body: JSON.stringify(settings),
        });
      }}
    />
  );
}
```

---

# NON-REACT PROJECTS (Vanilla JavaScript)

## Installation

### Step 1: Copy the JavaScript File

Copy `examples/accessibility-menu-configurable.js` to your project:

```bash
# Create a lib or vendor folder for third-party code
mkdir -p js/lib
cp examples/accessibility-menu-configurable.js js/lib/
```

### Step 2: Include in HTML

**Option A: Standard Script Tag**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
</head>
<body>
  <!-- Your page content -->
  <header>Welcome</header>
  <main>Your content here</main>

  <!-- Include the accessibility menu script at the end -->
  <script src="js/lib/accessibility-menu-configurable.js"></script>
  <script>
    // Initialize the menu
    const menu = new AccessibilityMenuConfigurable({
      position: 'top-right',
      showReset: true
    });
    menu.init();
  </script>
</body>
</html>
```

**Option B: Auto-Initialize (Simplest)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Website</title>
</head>
<body>
  <!-- Your page content -->
  
  <!-- Auto-initialize on page load -->
  <script 
    src="js/lib/accessibility-menu-configurable.js" 
    data-init="true"
    data-position="top-right"
  ></script>
</body>
</html>
```

---

## Non-React Framework Examples

### Plain HTML + JavaScript

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>Welcome to My Website</h1>
  <p>This website includes accessibility features.</p>

  <script src="js/lib/accessibility-menu-configurable.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const menu = new AccessibilityMenuConfigurable({
        position: 'top-right',
        showReset: true,
        onSettingsChange: (settings) => {
          console.log('User changed accessibility settings:', settings);
        }
      });
      menu.init();
    });
  </script>
</body>
</html>
```

### jQuery Project

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <h1>jQuery Site</h1>
  <p>Content here...</p>

  <script src="js/lib/accessibility-menu-configurable.js"></script>
  <script>
    $(document).ready(function() {
      const menu = new AccessibilityMenuConfigurable({
        position: 'top-right',
        features: {
          contrast: true,
          textSize: true,
          highlightLinks: true
        }
      });
      menu.init();
    });
  </script>
</body>
</html>
```

### PHP/WordPress

```php
<?php
// In your WordPress theme header.php
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  <?php wp_body_open(); ?>

  <script src="<?php echo get_template_directory_uri(); ?>/js/accessibility-menu-configurable.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const menu = new AccessibilityMenuConfigurable({
        position: 'top-right',
        showReset: true
      });
      menu.init();
    });
  </script>

  <?php wp_footer(); ?>
</body>
</html>
```

### Django

```django
{# base.html #}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{% block title %}{% endblock %}</title>
</head>
<body>
  {% block content %}{% endblock %}

  <script src="{% static 'js/accessibility-menu-configurable.js' %}"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const menu = new AccessibilityMenuConfigurable({
        position: 'top-right'
      });
      menu.init();
    });
  </script>
</body>
</html>
```

### Express/Node.js

```html
<!-- views/layout.html -->
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
  <link rel='stylesheet' href='/stylesheets/style.css' />
</head>
<body>
  <%- body %>

  <script src="/javascripts/accessibility-menu-configurable.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const menu = new AccessibilityMenuConfigurable({
        position: 'top-right'
      });
      menu.init();
    });
  </script>
</body>
</html>
```

---

## Non-React Configuration Examples

### Enable All Features

```javascript
const menu = new AccessibilityMenuConfigurable({
  position: 'top-right',
  showReset: true
  // features defaults to all enabled
});
menu.init();
```

### Custom Feature Flags

```javascript
const menu = new AccessibilityMenuConfigurable({
  position: 'top-right',
  features: {
    contrast: true,
    saturation: true,
    font: true,
    textSize: true,
    textSpacing: false,    // Disabled
    lineHeight: false,     // Disabled
    letterSpacing: false,  // Disabled
    cursorSize: true,
    highlightLinks: true,
    stopAnimations: true,
    hideImages: false,     // Disabled
    readingMask: true
  }
});
menu.init();
```

### With Settings Callback

```javascript
const menu = new AccessibilityMenuConfigurable({
  position: 'bottom-right',
  onSettingsChange: function(settings) {
    console.log('Accessibility settings changed:', settings);
    
    // Send to server
    fetch('/api/accessibility-preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings)
    });
  }
});
menu.init();
```

### Auto-Initialize with Data Attributes

```html
<script 
  src="accessibility-menu-configurable.js" 
  data-init="true"
  data-position="bottom-right"
  data-show-reset="true"
  data-features='{"contrast":true,"textSize":true,"highlightLinks":false}'
></script>
```

---

## JavaScript API Reference

### Constructor Options

```javascript
new AccessibilityMenuConfigurable({
  position: 'top-right',              // top-left, top-right, bottom-left, bottom-right
  showReset: true,                    // Show reset button
  storageKey: 'a11y-settings',        // localStorage key name
  onSettingsChange: function(settings) { },  // Callback when settings change
  features: {
    // All feature flags...
  }
});
```

### Methods

```javascript
// Initialize the menu
menu.init();

// Open the menu
menu.openMenu();

// Close the menu
menu.closeMenu();

// Toggle open/closed
menu.toggleMenu();

// Reset to defaults
menu.resetSettings();

// Get current settings
const currentSettings = menu.settings;

// Load settings from storage
const settings = menu.loadSettings();

// Save current settings
menu.saveSettings();

// Apply settings to page
menu.applySettings(newSettings);
```

### Properties

```javascript
// Check if menu is open
if (menu.isOpen) { }

// Access current settings
console.log(menu.settings.contrast);
console.log(menu.settings.textSize);

// Access features config
console.log(menu.features.highlightLinks);
```

---

# Comparison Chart

## Setup Complexity

| Task | React | Vanilla JS |
|------|-------|-----------|
| Copy file | 1 file | 1 file |
| Import/Include | `import` | `<script>` |
| Initialize | Auto (component) | Manual call |
| Configuration | Props | Constructor options |
| Feature flags | Props object | Options object |

## Browser Support

Both versions support:
- ✅ Chrome/Edge 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ iOS Safari 12+
- ✅ Android Browser 81+

## Performance

| Metric | React | Vanilla |
|--------|-------|---------|
| Initial Load | ~5KB gzip | ~6KB gzip |
| DOM Size | +1 element | +1 element |
| CSS Size | +2KB | +2KB |
| Memory | ~100KB | ~100KB |

---

# Integration Checklist

- [ ] Copy the appropriate file (React or Vanilla JS)
- [ ] Place in your project directory
- [ ] Import/include in your application
- [ ] Initialize with options
- [ ] Test menu opens/closes with ♿ button
- [ ] Test all enabled features
- [ ] Test localStorage persistence
- [ ] Test keyboard shortcut (Alt+A)
- [ ] Test on mobile devices
- [ ] Customize colors/position as needed

---

# Troubleshooting

### React: Component not displaying?
```tsx
// Check that you're importing correctly
import AccessibilityMenuConfigurable from './path/to/component';

// Make sure component is in JSX
<AccessibilityMenuConfigurable />
```

### Vanilla JS: Script errors?
```javascript
// Make sure script is loaded before calling
<script src="accessibility-menu-configurable.js"></script>
<script>
  // Wait for page to load
  document.addEventListener('DOMContentLoaded', function() {
    const menu = new AccessibilityMenuConfigurable();
    menu.init();
  });
</script>
```

### Storage not persisting?
```javascript
// Check localStorage is enabled
console.log(localStorage.getItem('a11y-settings'));

// Use custom storage key if needed
const menu = new AccessibilityMenuConfigurable({
  storageKey: 'my-custom-key'
});
```

### Features not applying?
```javascript
// Make sure features are enabled
const menu = new AccessibilityMenuConfigurable({
  features: { contrast: true, textSize: true }
});

// Check CSS is being applied to document root
console.log(document.documentElement.getAttribute('data-a11y-contrast'));
```

---

# Next Steps

1. **Choose your version**: React or Vanilla JS?
2. **Copy the file** to your project
3. **Follow the framework-specific examples** above
4. **Test all features** in your browser
5. **Customize** colors, position, and enabled features
6. **Deploy** and get accessibility feedback from users

Need help? Check the `ACCESSIBILITY_MENU_SETUP.md` file for more details!
