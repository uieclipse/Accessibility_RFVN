/**
 * Accessible Menu Component - Configurable Vanilla JavaScript
 * Feature flags enable/disable specific accessibility features
 * Zero dependencies, works in any HTML/JavaScript project
 */

const DEFAULT_FEATURES = {
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

const DEFAULT_SETTINGS = {
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

class AccessibilityMenuConfigurable {
  constructor(options = {}) {
    this.position = options.position || 'top-right';
    this.showReset = options.showReset !== false;
    this.features = { ...DEFAULT_FEATURES, ...options.features };
    this.storageKey = options.storageKey || 'a11y-settings';
    this.onSettingsChange = options.onSettingsChange || null;

    this.isOpen = false;
    this.settings = this.loadSettings();
  }

  init() {
    this.createStyles();
    this.createButton();
    this.applySettings(this.settings);
    this.attachKeyboardShortcut();
  }

  loadSettings() {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  }

  saveSettings() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
    if (this.onSettingsChange) {
      this.onSettingsChange(this.settings);
    }
  }

  createStyles() {
    const styleId = 'a11y-menu-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      [data-a11y-menu-button] {
        position: fixed;
        min-width: 44px;
        min-height: 44px;
        padding: 0.75rem;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        font-weight: bold;
      }

      [data-a11y-menu-button]:hover {
        background: #1d4ed8;
      }

      [data-a11y-menu-panel] {
        position: absolute;
        width: 320px;
        background: white;
        border: 2px solid #2563eb;
        border-radius: 8px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        padding: 1.5rem;
        z-index: 9998;
        max-height: 80vh;
        overflow-y: auto;
      }

      [data-a11y-menu-panel] h2 {
        margin: 0 0 1.5rem 0;
        font-size: 1.25rem;
        font-weight: bold;
      }

      [data-a11y-menu-panel] .a11y-setting-group {
        margin-bottom: 1.5rem;
      }

      [data-a11y-menu-panel] label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }

      [data-a11y-menu-panel] select,
      [data-a11y-menu-panel] input[type="range"] {
        width: 100%;
        padding: 0.5rem;
        border-radius: 4px;
        border: 1px solid #ccc;
        min-height: 44px;
        box-sizing: border-box;
      }

      [data-a11y-menu-panel] input[type="checkbox"] {
        width: 18px;
        height: 18px;
        margin-right: 0.75rem;
        cursor: pointer;
      }

      [data-a11y-menu-panel] .a11y-checkbox-label {
        display: flex;
        align-items: center;
        margin-bottom: 0.75rem;
        cursor: pointer;
        min-height: 44px;
      }

      [data-a11y-menu-panel] button {
        width: 100%;
        padding: 0.75rem;
        background: #ef4444;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        min-height: 44px;
      }

      [data-a11y-menu-panel] button:hover {
        background: #dc2626;
      }

      [data-a11y-contrast="dark"] {
        background-color: #000 !important;
        color: #fff !important;
      }
      [data-a11y-contrast="dark"] a {
        color: #87ceeb !important;
      }

      [data-a11y-contrast="light"] {
        background-color: #fff !important;
        color: #000 !important;
      }
      [data-a11y-contrast="light"] a {
        color: #0066cc !important;
      }

      [data-a11y-saturation="low"] {
        filter: saturate(50%) !important;
      }
      [data-a11y-saturation="monochrome"] {
        filter: grayscale(100%) !important;
      }

      .a11y-value-display {
        font-size: 0.875rem;
        color: #666;
        margin-left: 0.5rem;
      }
    `;
    document.head.appendChild(style);
  }

  createButton() {
    const positionMap = {
      'top-left': { top: '1rem', left: '1rem' },
      'top-right': { top: '1rem', right: '1rem' },
      'bottom-left': { bottom: '1rem', left: '1rem' },
      'bottom-right': { bottom: '1rem', right: '1rem' },
    };

    const position = positionMap[this.position] || positionMap['top-right'];

    const button = document.createElement('button');
    button.setAttribute('data-a11y-menu-button', '');
    button.setAttribute('aria-label', 'Open accessibility menu');
    button.setAttribute('aria-expanded', 'false');
    button.textContent = '♿';
    button.title = 'Accessibility Menu (Alt+A)';

    Object.assign(button.style, position);
    button.addEventListener('click', () => this.toggleMenu());

    document.body.appendChild(button);
    this.button = button;
  }

  toggleMenu() {
    this.isOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu() {
    this.isOpen = true;
    this.button.setAttribute('aria-expanded', 'true');
    this.button.setAttribute('aria-label', 'Close accessibility menu');
    this.createPanel();
  }

  closeMenu() {
    this.isOpen = false;
    this.button.setAttribute('aria-expanded', 'false');
    this.button.setAttribute('aria-label', 'Open accessibility menu');
    const panel = document.querySelector('[data-a11y-menu-panel]');
    if (panel) panel.remove();
  }

  createPanel() {
    let panel = document.querySelector('[data-a11y-menu-panel]');
    if (panel) return;

    const positionMap = {
      'top-left': { top: '60px', left: '0', right: 'auto', bottom: 'auto' },
      'top-right': { top: '60px', right: '0', left: 'auto', bottom: 'auto' },
      'bottom-left': { bottom: '60px', left: '0', right: 'auto', top: 'auto' },
      'bottom-right': { bottom: '60px', right: '0', left: 'auto', top: 'auto' },
    };

    const position = positionMap[this.position] || positionMap['top-right'];

    panel = document.createElement('div');
    panel.setAttribute('data-a11y-menu-panel', '');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Accessibility settings');

    Object.assign(panel.style, position);

    // Title
    const title = document.createElement('h2');
    title.textContent = 'Accessibility Settings';
    panel.appendChild(title);

    // Contrast
    if (this.features.contrast) {
      const group = this.createSelectGroup('Contrast', 'contrast', [
        { value: 'normal', label: 'Normal' },
        { value: 'dark', label: 'Dark Contrast' },
        { value: 'light', label: 'Light Contrast' },
      ]);
      panel.appendChild(group);
    }

    // Saturation
    if (this.features.saturation) {
      const group = this.createSelectGroup('Saturation', 'saturation', [
        { value: 'high', label: 'High Saturation' },
        { value: 'normal', label: 'Normal' },
        { value: 'low', label: 'Low Saturation' },
        { value: 'monochrome', label: 'Monochrome' },
      ]);
      panel.appendChild(group);
    }

    // Font
    if (this.features.font) {
      const group = this.createSelectGroup('Font', 'font', [
        { value: 'standard', label: 'Standard Font' },
        { value: 'readable', label: 'Readable Font' },
      ]);
      panel.appendChild(group);
    }

    // Text Size
    if (this.features.textSize) {
      const group = this.createRangeGroup('Text Size', 'textSize', 100, 150, 1);
      panel.appendChild(group);
    }

    // Text Spacing
    if (this.features.textSpacing) {
      const group = this.createRangeGroup('Text Spacing', 'textSpacing', 0, 3, 1);
      panel.appendChild(group);
    }

    // Line Height
    if (this.features.lineHeight) {
      const group = this.createRangeGroup('Line Height', 'lineHeight', 1, 2, 0.1);
      panel.appendChild(group);
    }

    // Letter Spacing
    if (this.features.letterSpacing) {
      const group = this.createRangeGroup('Letter Spacing', 'letterSpacing', 0, 2, 0.1);
      panel.appendChild(group);
    }

    // Toggles
    const toggleGroup = document.createElement('div');
    toggleGroup.className = 'a11y-setting-group';

    const toggles = [
      { key: 'cursorSize', label: 'Bigger Cursor', value: 'big', compare: 'big' },
      { key: 'highlightLinks', label: 'Highlight Links & Titles', value: true, compare: true },
      { key: 'stopAnimations', label: 'Stop Animations', value: true, compare: true },
      { key: 'hideImages', label: 'Hide Images', value: true, compare: true },
      { key: 'readingMask', label: 'Reading Mask', value: true, compare: true },
    ];

    toggles.forEach((toggle) => {
      if (!this.features[toggle.key]) return;

      const label = document.createElement('label');
      label.className = 'a11y-checkbox-label';

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = toggle.key === 'cursorSize'
        ? this.settings[toggle.key] === toggle.compare
        : this.settings[toggle.key] === toggle.compare;

      input.addEventListener('change', (e) => {
        if (toggle.key === 'cursorSize') {
          this.settings[toggle.key] = e.target.checked ? 'big' : 'normal';
        } else {
          this.settings[toggle.key] = e.target.checked;
        }
        this.saveSettings();
        this.applySettings(this.settings);
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(toggle.label));
      toggleGroup.appendChild(label);
    });

    if (toggleGroup.children.length > 0) {
      panel.appendChild(toggleGroup);
    }

    // Reset button
    if (this.showReset) {
      const resetBtn = document.createElement('button');
      resetBtn.textContent = 'Reset All Settings';
      resetBtn.setAttribute('aria-label', 'Reset all accessibility settings');
      resetBtn.addEventListener('click', () => this.resetSettings());
      panel.appendChild(resetBtn);
    }

    const buttonContainer = document.querySelector('[data-a11y-menu-button]');
    buttonContainer.parentNode.insertBefore(panel, buttonContainer.nextSibling);
  }

  createSelectGroup(label, key, options) {
    const group = document.createElement('div');
    group.className = 'a11y-setting-group';

    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    group.appendChild(labelEl);

    const select = document.createElement('select');
    select.value = this.settings[key];

    options.forEach((option) => {
      const opt = document.createElement('option');
      opt.value = option.value;
      opt.textContent = option.label;
      select.appendChild(opt);
    });

    select.addEventListener('change', (e) => {
      this.settings[key] = e.target.value;
      this.saveSettings();
      this.applySettings(this.settings);
    });

    group.appendChild(select);
    return group;
  }

  createRangeGroup(label, key, min, max, step) {
    const group = document.createElement('div');
    group.className = 'a11y-setting-group';

    const labelContainer = document.createElement('div');
    labelContainer.style.display = 'flex';
    labelContainer.style.justifyContent = 'space-between';
    labelContainer.style.alignItems = 'center';

    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    labelEl.style.marginBottom = '0';

    const valueDisplay = document.createElement('span');
    valueDisplay.className = 'a11y-value-display';
    valueDisplay.textContent = this.settings[key];

    labelContainer.appendChild(labelEl);
    labelContainer.appendChild(valueDisplay);
    group.appendChild(labelContainer);

    const input = document.createElement('input');
    input.type = 'range';
    input.min = min;
    input.max = max;
    input.step = step;
    input.value = this.settings[key];

    input.addEventListener('change', (e) => {
      const value = step % 1 === 0 ? parseInt(e.target.value) : parseFloat(e.target.value);
      this.settings[key] = value;
      valueDisplay.textContent = value;
      this.saveSettings();
      this.applySettings(this.settings);
    });

    group.appendChild(input);
    return group;
  }

  applySettings(settings) {
    const root = document.documentElement;

    // Contrast
    if (this.features.contrast) {
      root.setAttribute('data-a11y-contrast', settings.contrast);
    }

    // Saturation
    if (this.features.saturation) {
      root.setAttribute('data-a11y-saturation', settings.saturation);
    }

    // Font
    if (this.features.font) {
      root.style.fontFamily = settings.font === 'readable' ? 'Arial, sans-serif' : '';
    }

    // Text size
    if (this.features.textSize) {
      root.style.fontSize = `${settings.textSize}%`;
    }

    // Text spacing
    if (this.features.textSpacing) {
      root.style.wordSpacing = `${settings.textSpacing * 0.5}rem`;
    }

    // Line height
    if (this.features.lineHeight) {
      root.style.lineHeight = `${settings.lineHeight}`;
    }

    // Letter spacing
    if (this.features.letterSpacing) {
      root.style.letterSpacing = `${settings.letterSpacing * 0.1}rem`;
    }

    // Cursor
    if (this.features.cursorSize) {
      document.body.style.cursor = settings.cursorSize === 'big'
        ? 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI0IiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+") 16 16, auto'
        : 'auto';
    }

    // Highlight links
    if (this.features.highlightLinks) {
      this.toggleStyle('a11y-highlight-links-style', settings.highlightLinks, `
        a { outline: 3px solid #FFD700 !important; outline-offset: 2px !important; }
        h1, h2, h3, h4, h5, h6 { outline: 2px solid #87CEEB !important; outline-offset: 2px !important; }
      `);
    }

    // Stop animations
    if (this.features.stopAnimations) {
      this.toggleStyle('a11y-stop-animations-style', settings.stopAnimations, `
        * { animation: none !important; transition: none !important; }
      `);
    }

    // Hide images
    if (this.features.hideImages) {
      this.toggleStyle('a11y-hide-images-style', settings.hideImages, `
        img { display: none !important; }
        picture { display: none !important; }
      `);
    }

    // Reading mask
    if (this.features.readingMask) {
      if (settings.readingMask) {
        document.body.style.position = 'relative';
        let mask = document.getElementById('a11y-reading-mask');
        if (!mask) {
          mask = document.createElement('div');
          mask.id = 'a11y-reading-mask';
          document.body.appendChild(mask);
        }
        mask.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.7) 100%);
          pointer-events: none;
          z-index: 9998;
        `;
      } else {
        const mask = document.getElementById('a11y-reading-mask');
        if (mask) mask.remove();
      }
    }
  }

  toggleStyle(id, enabled, css) {
    const existing = document.getElementById(id);
    if (enabled) {
      if (!existing) {
        const style = document.createElement('style');
        style.id = id;
        style.textContent = css;
        document.head.appendChild(style);
      }
    } else {
      if (existing) existing.remove();
    }
  }

  resetSettings() {
    this.settings = { ...DEFAULT_SETTINGS };
    this.saveSettings();
    this.applySettings(this.settings);
    // Refresh panel
    this.closeMenu();
    this.openMenu();
  }

  attachKeyboardShortcut() {
    document.addEventListener('keydown', (e) => {
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        this.toggleMenu();
      }
    });
  }
}

// Auto-initialize if script has data-init attribute
if (document.currentScript && document.currentScript.hasAttribute('data-init')) {
  const menu = new AccessibilityMenuConfigurable({
    position: document.currentScript.getAttribute('data-position') || 'top-right',
    showReset: document.currentScript.getAttribute('data-show-reset') !== 'false',
    features: JSON.parse(document.currentScript.getAttribute('data-features') || JSON.stringify(DEFAULT_FEATURES)),
  });
  document.addEventListener('DOMContentLoaded', () => menu.init());
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AccessibilityMenuConfigurable;
}
