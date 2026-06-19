import React, { useState, useEffect } from 'react';

// Feature flag configuration type
export interface A11yFeatureFlags {
  contrast?: boolean;
  saturation?: boolean;
  font?: boolean;
  textSize?: boolean;
  textSpacing?: boolean;
  lineHeight?: boolean;
  letterSpacing?: boolean;
  cursorSize?: boolean;
  highlightLinks?: boolean;
  stopAnimations?: boolean;
  hideImages?: boolean;
  readingMask?: boolean;
}

// Default: all features enabled
export const DEFAULT_FEATURES: A11yFeatureFlags = {
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

interface AccessibilitySettings {
  contrast: 'normal' | 'dark' | 'light';
  saturation: 'high' | 'normal' | 'low' | 'monochrome';
  font: 'standard' | 'readable';
  textSize: number;
  textSpacing: number;
  lineHeight: number;
  letterSpacing: number;
  cursorSize: 'normal' | 'big';
  highlightLinks: boolean;
  stopAnimations: boolean;
  hideImages: boolean;
  readingMask: boolean;
}

interface AccessibilityMenuProps {
  features?: A11yFeatureFlags;
  onSettingsChange?: (settings: AccessibilitySettings) => void;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showReset?: boolean;
  storageKey?: string;
}

const defaultSettings: AccessibilitySettings = {
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

export const AccessibilityMenuConfigurable: React.FC<AccessibilityMenuProps> = ({
  features = DEFAULT_FEATURES,
  onSettingsChange,
  position = 'top-right',
  showReset = true,
  storageKey = 'a11y-settings',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(settings));
    onSettingsChange?.(settings);
    applySettings(settings);
  }, [settings, onSettingsChange, storageKey]);

  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;

    // Contrast
    if (features.contrast) {
      root.setAttribute('data-a11y-contrast', newSettings.contrast);
    }

    // Saturation
    if (features.saturation) {
      root.setAttribute('data-a11y-saturation', newSettings.saturation);
    }

    // Font
    if (features.font) {
      if (newSettings.font === 'readable') {
        root.style.fontFamily = 'Arial, sans-serif';
      } else {
        root.style.fontFamily = '';
      }
    }

    // Text size
    if (features.textSize) {
      root.style.fontSize = `${newSettings.textSize}%`;
    }

    // Text spacing
    if (features.textSpacing) {
      root.style.wordSpacing = `${newSettings.textSpacing * 0.5}rem`;
    }

    // Line height
    if (features.lineHeight) {
      root.style.lineHeight = `${newSettings.lineHeight}`;
    }

    // Letter spacing
    if (features.letterSpacing) {
      root.style.letterSpacing = `${newSettings.letterSpacing * 0.1}rem`;
    }

    // Cursor
    if (features.cursorSize) {
      if (newSettings.cursorSize === 'big') {
        document.body.style.cursor = 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI0IiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+") 16 16, auto';
      } else {
        document.body.style.cursor = 'auto';
      }
    }

    // Highlight links
    if (features.highlightLinks) {
      if (newSettings.highlightLinks) {
        const style = document.getElementById('a11y-highlight-links-style') || document.createElement('style');
        style.id = 'a11y-highlight-links-style';
        style.textContent = `
          a { outline: 3px solid #FFD700 !important; outline-offset: 2px !important; }
          h1, h2, h3, h4, h5, h6 { outline: 2px solid #87CEEB !important; outline-offset: 2px !important; }
        `;
        if (!document.getElementById('a11y-highlight-links-style')) {
          document.head.appendChild(style);
        }
      } else {
        const style = document.getElementById('a11y-highlight-links-style');
        if (style) style.remove();
      }
    }

    // Stop animations
    if (features.stopAnimations) {
      if (newSettings.stopAnimations) {
        const style = document.getElementById('a11y-stop-animations-style') || document.createElement('style');
        style.id = 'a11y-stop-animations-style';
        style.textContent = `* { animation: none !important; transition: none !important; }`;
        if (!document.getElementById('a11y-stop-animations-style')) {
          document.head.appendChild(style);
        }
      } else {
        const style = document.getElementById('a11y-stop-animations-style');
        if (style) style.remove();
      }
    }

    // Hide images
    if (features.hideImages) {
      if (newSettings.hideImages) {
        const style = document.getElementById('a11y-hide-images-style') || document.createElement('style');
        style.id = 'a11y-hide-images-style';
        style.textContent = `img { display: none !important; } picture { display: none !important; }`;
        if (!document.getElementById('a11y-hide-images-style')) {
          document.head.appendChild(style);
        }
      } else {
        const style = document.getElementById('a11y-hide-images-style');
        if (style) style.remove();
      }
    }

    // Reading mask
    if (features.readingMask) {
      if (newSettings.readingMask) {
        document.body.style.position = 'relative';
        let mask = document.getElementById('a11y-reading-mask') as HTMLDivElement;
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
  };

  const handleReset = () => {
    setSettings(defaultSettings);
  };

  const handleSettingChange = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const positionClasses: Record<string, { top?: string; bottom?: string; left?: string; right?: string }> = {
    'top-left': { top: '1rem', left: '1rem' },
    'top-right': { top: '1rem', right: '1rem' },
    'bottom-left': { bottom: '1rem', left: '1rem' },
    'bottom-right': { bottom: '1rem', right: '1rem' },
  };

  return (
    <div style={{ position: 'fixed', ...positionClasses[position], zIndex: 50 }}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close accessibility menu' : 'Open accessibility menu'}
        aria-expanded={isOpen}
        title="Accessibility Menu (Alt+A)"
        style={{
          minWidth: '44px',
          minHeight: '44px',
          padding: '0.75rem',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
          zIndex: 9999,
        }}
      >
        ♿
      </button>

      {/* Menu Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Accessibility settings"
          style={{
            position: 'absolute',
            top: position.includes('top') ? '60px' : 'auto',
            bottom: position.includes('bottom') ? '60px' : 'auto',
            left: position.includes('left') ? '0' : 'auto',
            right: position.includes('right') ? '0' : 'auto',
            width: '320px',
            background: 'white',
            border: '2px solid #2563eb',
            borderRadius: '8px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            padding: '1.5rem',
            zIndex: 9998,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: 'bold' }}>
            Accessibility Settings
          </h2>

          {/* Contrast */}
          {features.contrast && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Contrast
              </label>
              <select
                value={settings.contrast}
                onChange={(e) => handleSettingChange('contrast', e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  minHeight: '44px',
                }}
              >
                <option value="normal">Normal</option>
                <option value="dark">Dark Contrast</option>
                <option value="light">Light Contrast</option>
              </select>
            </div>
          )}

          {/* Saturation */}
          {features.saturation && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Saturation
              </label>
              <select
                value={settings.saturation}
                onChange={(e) => handleSettingChange('saturation', e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  minHeight: '44px',
                }}
              >
                <option value="high">High Saturation</option>
                <option value="normal">Normal</option>
                <option value="low">Low Saturation</option>
                <option value="monochrome">Monochrome</option>
              </select>
            </div>
          )}

          {/* Font */}
          {features.font && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Font
              </label>
              <select
                value={settings.font}
                onChange={(e) => handleSettingChange('font', e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  minHeight: '44px',
                }}
              >
                <option value="standard">Standard Font</option>
                <option value="readable">Readable Font</option>
              </select>
            </div>
          )}

          {/* Text Size */}
          {features.textSize && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Text Size: {settings.textSize}%
              </label>
              <input
                type="range"
                min="100"
                max="150"
                value={settings.textSize}
                onChange={(e) => handleSettingChange('textSize', parseInt(e.target.value))}
                style={{ width: '100%', minHeight: '44px' }}
                aria-label="Text size adjustment"
              />
            </div>
          )}

          {/* Text Spacing */}
          {features.textSpacing && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Text Spacing: {settings.textSpacing}
              </label>
              <input
                type="range"
                min="0"
                max="3"
                value={settings.textSpacing}
                onChange={(e) => handleSettingChange('textSpacing', parseInt(e.target.value))}
                style={{ width: '100%', minHeight: '44px' }}
                aria-label="Text spacing adjustment"
              />
            </div>
          )}

          {/* Line Height */}
          {features.lineHeight && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Line Height: {settings.lineHeight.toFixed(1)}
              </label>
              <input
                type="range"
                min="1"
                max="2"
                step="0.1"
                value={settings.lineHeight}
                onChange={(e) => handleSettingChange('lineHeight', parseFloat(e.target.value))}
                style={{ width: '100%', minHeight: '44px' }}
                aria-label="Line height adjustment"
              />
            </div>
          )}

          {/* Letter Spacing */}
          {features.letterSpacing && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Letter Spacing: {settings.letterSpacing.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={settings.letterSpacing}
                onChange={(e) => handleSettingChange('letterSpacing', parseFloat(e.target.value))}
                style={{ width: '100%', minHeight: '44px' }}
                aria-label="Letter spacing adjustment"
              />
            </div>
          )}

          {/* Toggles */}
          <div style={{ marginBottom: '1.5rem' }}>
            {[
              {
                key: 'cursorSize',
                label: 'Bigger Cursor',
                feature: 'cursorSize',
                value: 'big',
                compare: 'big',
              },
              {
                key: 'highlightLinks',
                label: 'Highlight Links & Titles',
                feature: 'highlightLinks',
                value: true,
                compare: true,
              },
              {
                key: 'stopAnimations',
                label: 'Stop Animations',
                feature: 'stopAnimations',
                value: true,
                compare: true,
              },
              { key: 'hideImages', label: 'Hide Images', feature: 'hideImages', value: true, compare: true },
              {
                key: 'readingMask',
                label: 'Reading Mask',
                feature: 'readingMask',
                value: true,
                compare: true,
              },
            ].map((item) => {
              if (!features[item.feature as keyof A11yFeatureFlags]) return null;
              return (
                <label
                  key={item.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '0.75rem',
                    cursor: 'pointer',
                    minHeight: '44px',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={
                      item.key === 'cursorSize'
                        ? (settings as any)[item.key] === item.compare
                        : (settings as any)[item.key] === item.compare
                    }
                    onChange={(e) => {
                      if (item.key === 'cursorSize') {
                        handleSettingChange('cursorSize', e.target.checked ? 'big' : 'normal');
                      } else {
                        handleSettingChange(item.key as any, e.target.checked);
                      }
                    }}
                    style={{
                      width: '18px',
                      height: '18px',
                      marginRight: '0.75rem',
                      cursor: 'pointer',
                    }}
                  />
                  {item.label}
                </label>
              );
            })}
          </div>

          {/* Reset Button */}
          {showReset && (
            <button
              onClick={handleReset}
              aria-label="Reset all accessibility settings"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                minHeight: '44px',
              }}
            >
              Reset All Settings
            </button>
          )}
        </div>
      )}

      {/* CSS for Contrast and Saturation */}
      <style>{`
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
      `}</style>
    </div>
  );
};

export default AccessibilityMenuConfigurable;
