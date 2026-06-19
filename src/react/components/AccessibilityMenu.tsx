import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  AccessibilityMenuConfig,
  AccessibilitySettings,
  A11yFeatureFlags,
  AccessibilityMenuColors,
  DEFAULT_FEATURES,
  DEFAULT_SETTINGS,
  mergeConfig,
  getStylesForSize,
  getButtonStyleClass,
} from '../config/accessibilityMenuConfig';

export type { AccessibilityMenuConfig, A11yFeatureFlags, AccessibilitySettings };
export { DEFAULT_FEATURES, DEFAULT_SETTINGS };

export interface AccessibilityMenuProps extends Partial<AccessibilityMenuConfig> {}

// ─── CSS helpers injected into <head> ────────────────────────────────────────

function injectStyle(id: string, css: string) {
  let el = document.getElementById(id) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement('style');
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = css;
}

function removeStyle(id: string) {
  document.getElementById(id)?.remove();
}

// ─── Profile presets ─────────────────────────────────────────────────────────

type Profile =
  | 'readableFonts'
  | 'screenReader'
  | 'motorImpaired'
  | 'dyslexia'
  | 'cognitive'
  | 'adhd'
  | 'visualImpaired'
  | 'seizures';

const PROFILES: Record<Profile, Partial<AccessibilitySettings>> = {
  readableFonts: { font: 'readable', textSize: 110, lineHeight: 1.5, letterSpacing: 1 },
  screenReader: { textSize: 110, highlightLinks: true, highlightTitles: true },
  motorImpaired: { cursorSize: 'big', textSize: 110 },
  dyslexia: { font: 'readable', letterSpacing: 2, lineHeight: 1.6, textSpacing: 2 },
  cognitive: { font: 'readable', textSize: 110, lineHeight: 1.6, stopAnimations: true, highlightLinks: true },
  adhd: { adhdMode: true, stopAnimations: true, textSize: 110 },
  visualImpaired: { contrast: 'dark', textSize: 130, cursorSize: 'big', highlightLinks: true },
  seizures: { stopAnimations: true, monochrome: true },
};

// ─── Apply settings to the DOM ───────────────────────────────────────────────

function applySettingsToDom(settings: AccessibilitySettings, features: A11yFeatureFlags, buttonZIndex: number) {
  if (typeof window === 'undefined') return;

  // ── Combine ALL filters into one rule so they don't overwrite each other ──
  const filters: string[] = [];
  if (features.contrast) {
    if (settings.contrast === 'dark') filters.push('contrast(1.6) brightness(0.85)');
    else if (settings.contrast === 'light') filters.push('contrast(0.75) brightness(1.3)');
  }
  if (features.saturation) {
    if (settings.saturation === 'high') filters.push('saturate(2.5)');
    else if (settings.saturation === 'low') filters.push('saturate(0.4)');
  }
  if (features.monochrome && settings.monochrome) filters.push('grayscale(1)');
  if (features.invertColors && settings.invertColors) filters.push('invert(1) hue-rotate(180deg)');

  // ── Dark mode ──
  if (features.darkMode) {
    if (settings.darkMode) {
      injectStyle(
        'a11y-darkmode-style',
        `html, body { background: #121212 !important; color: #e0e0e0 !important; }
         *:not([data-a11y-menu]):not([data-a11y-menu] *) {
           background-color: #121212 !important;
           color: #e0e0e0 !important;
           border-color: #444 !important;
         }
         a:not([data-a11y-menu] *) { color: #90caf9 !important; }
         img:not([data-a11y-menu] *) { opacity: 0.85 !important; filter: brightness(0.85); }
         input:not([data-a11y-menu] *), select:not([data-a11y-menu] *), textarea:not([data-a11y-menu] *) {
           background: #1e1e1e !important; color: #e0e0e0 !important; border: 1px solid #555 !important;
         }
         code:not([data-a11y-menu] *), pre:not([data-a11y-menu] *) { background: #1e1e1e !important; color: #a5d6a7 !important; }
         [class*="card"]:not([data-a11y-menu] *), [class*="box"]:not([data-a11y-menu] *), [class*="panel"]:not([data-a11y-menu] *) {
           background: #1e1e1e !important; color: #e0e0e0 !important;
         }`
      );
    } else {
      removeStyle('a11y-darkmode-style');
    }
  }

  if (filters.length > 0) {
    injectStyle('a11y-filter-style', `html { filter: ${filters.join(' ')} !important; }`);
  } else {
    removeStyle('a11y-filter-style');
  }
  // Clean up old separate filter styles from previous versions
  removeStyle('a11y-contrast-style');
  removeStyle('a11y-saturation-style');
  removeStyle('a11y-monochrome-style');

  // ── Font — load OpenDyslexic from CDN and apply ──
  if (features.font) {
    if (settings.font === 'readable') {
      // Inject OpenDyslexic font-face from CDN if not already loaded
      if (!document.getElementById('a11y-opendyslexic-link')) {
        const link = document.createElement('link');
        link.id = 'a11y-opendyslexic-link';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.cdnfonts.com/css/opendyslexic';
        document.head.appendChild(link);
      }
      injectStyle(
        'a11y-font-style',
        `html, body, p, span, div, a, li, td, th, label, button, input, textarea, select
         { font-family: "OpenDyslexic", "Arial", sans-serif !important; }`
      );
    } else {
      removeStyle('a11y-font-style');
      document.getElementById('a11y-opendyslexic-link')?.remove();
    }
  }

  // ── Text size — inject !important style tag ──
  if (features.textSize) {
    if (settings.textSize !== 100) {
      injectStyle('a11y-textsize-style', `html { font-size: ${settings.textSize}% !important; }`);
    } else {
      removeStyle('a11y-textsize-style');
    }
  }

  // ── Text spacing ──
  if (features.textSpacing) {
    if (settings.textSpacing > 0) {
      injectStyle('a11y-textspacing-style', `* { word-spacing: ${settings.textSpacing * 0.5}rem !important; }`);
    } else {
      removeStyle('a11y-textspacing-style');
    }
  }

  // ── Line height ──
  if (features.lineHeight) {
    if (settings.lineHeight !== 1) {
      injectStyle('a11y-lineheight-style', `* { line-height: ${settings.lineHeight} !important; }`);
    } else {
      removeStyle('a11y-lineheight-style');
    }
  }

  // ── Letter spacing ──
  if (features.letterSpacing) {
    if (settings.letterSpacing > 0) {
      injectStyle('a11y-letterspacing-style', `* { letter-spacing: ${settings.letterSpacing * 0.1}rem !important; }`);
    } else {
      removeStyle('a11y-letterspacing-style');
    }
  }

  // ── Cursor size ──
  if (features.cursorSize) {
    if (settings.cursorSize === 'big') {
      injectStyle('a11y-cursor-style', `*, *:hover { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='18' fill='none' stroke='%23000' stroke-width='2'/%3E%3Ccircle cx='20' cy='20' r='5' fill='%23000'/%3E%3C/svg%3E") 20 20, auto !important; }`);
    } else {
      removeStyle('a11y-cursor-style');
    }
  }

  // ── Highlight links ──
  if (features.highlightLinks) {
    if (settings.highlightLinks) {
      injectStyle(
        'a11y-highlight-links-style',
        `a, a:visited, a:hover, a:focus
         { outline: 3px solid #FFD700 !important; outline-offset: 2px !important;
           background-color: rgba(255,215,0,0.2) !important;
           text-decoration: underline !important; }`
      );
    } else {
      removeStyle('a11y-highlight-links-style');
    }
  }

  // ── Highlight titles ──
  if (features.highlightTitles) {
    if (settings.highlightTitles) {
      injectStyle(
        'a11y-highlight-titles-style',
        `h1,h2,h3,h4,h5,h6
         { outline: 2px solid #3b82f6 !important; outline-offset: 3px !important;
           background-color: rgba(59,130,246,0.1) !important; }`
      );
    } else {
      removeStyle('a11y-highlight-titles-style');
    }
  }

  // ── Stop animations ──
  if (features.stopAnimations) {
    if (settings.stopAnimations) {
      injectStyle('a11y-stop-animations-style', `*, *::before, *::after { animation: none !important; transition: none !important; }`);
    } else {
      removeStyle('a11y-stop-animations-style');
    }
  }

  // ── Hide images ──
  if (features.hideImages) {
    if (settings.hideImages) {
      injectStyle('a11y-hide-images-style', `img, picture { display: none !important; }`);
    } else {
      removeStyle('a11y-hide-images-style');
    }
  }

  // ── Reading mask ──
  if (features.readingMask) {
    const existingMask = document.getElementById('a11y-reading-mask');
    if (settings.readingMask) {
      let mask = existingMask as HTMLDivElement | null;
      if (!mask) {
        mask = document.createElement('div');
        mask.id = 'a11y-reading-mask';
        document.body.appendChild(mask);
      }
      mask.style.cssText = `
        position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;
        z-index:${buttonZIndex - 1};
        background:linear-gradient(to bottom,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0) 35%,rgba(0,0,0,0) 65%,rgba(0,0,0,0.75) 100%);
      `;
    } else {
      existingMask?.remove();
    }
  }

  // ── ADHD mode ──
  if (features.adhdMode) {
    if (settings.adhdMode) {
      injectStyle(
        'a11y-adhd-style',
        `*:focus { outline: 4px solid #f59e0b !important; outline-offset: 3px !important; }
         p, li, td { max-width: 70ch !important; }
         img, video, iframe { opacity: 0.5 !important; }`
      );
    } else {
      removeStyle('a11y-adhd-style');
    }
  }
}

// ─── Text-to-speech ───────────────────────────────────────────────────────────

function speakText(text: string) {
  if (!('speechSynthesis' in window) || !text.trim()) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text.trim().slice(0, 300));
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

function ttsHandleMouseOver(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target.closest('[data-a11y-menu]')) return;
  const text =
    target.getAttribute('aria-label') ||
    target.getAttribute('alt') ||
    target.getAttribute('title') ||
    target.innerText ||
    '';
  speakText(text);
}

function startTTS() {
  if (!('speechSynthesis' in window)) return;
  document.addEventListener('mouseover', ttsHandleMouseOver);
}

function stopTTS() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  document.removeEventListener('mouseover', ttsHandleMouseOver);
}

// ─── Component ────────────────────────────────────────────────────────────────

export const AccessibilityMenu: React.FC<AccessibilityMenuProps> = (userProps) => {
  // Stringify to stabilise memo — avoids re-creating config on every render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const config = useMemo(() => mergeConfig(userProps) as Required<AccessibilityMenuConfig>, [JSON.stringify(userProps)]);

  const [isOpen, setIsOpen] = useState(false);
  const [widgetSize, setWidgetSize] = useState<'normal' | 'small'>('normal');
  const [widgetSide, setWidgetSide] = useState<'left' | 'right'>(
    config.position.includes('left') ? 'left' : 'right'
  );
  const [widgetVertical, setWidgetVertical] = useState<'top' | 'bottom'>(
    config.position.includes('top') ? 'top' : 'bottom'
  );

  // Sync position state when prop changes
  useEffect(() => {
    setWidgetSide(config.position.includes('left') ? 'left' : 'right');
    setWidgetVertical(config.position.includes('top') ? 'top' : 'bottom');
  }, [config.position]);
  const [widgetVisible, setWidgetVisible] = useState(true);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);

  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    try {
      const saved = localStorage.getItem(config.storageKey);
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Apply settings & save whenever they change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    applySettingsToDom(settings, config.features, config.buttonZIndex);

    if (config.autoSave) {
      try {
        localStorage.setItem(config.storageKey, JSON.stringify(settings));
      } catch { /* ignore */ }
    }

    config.onSettingsChange?.(settings);
  }, [settings, config]);

  // TTS toggle
  useEffect(() => {
    if (settings.textToSpeech) {
      startTTS();
    } else {
      stopTTS();
    }
  }, [settings.textToSpeech]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && config.closeOnEscape) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, config.closeOnEscape]);

  // Click outside
  useEffect(() => {
    if (!isOpen || !config.closeOnClickOutside) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-a11y-menu]')) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, config.closeOnClickOutside]);

  const handleReset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    setWidgetSize('normal');
    setActiveProfile(null);
    config.onReset?.();
  }, [config]);

  const handleSettingChange = useCallback(
    <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const applyProfile = useCallback((profile: Profile) => {
    setSettings({ ...DEFAULT_SETTINGS, ...PROFILES[profile] });
    setActiveProfile(profile);
  }, []);

  const handleOpenClose = useCallback(
    (next: boolean) => {
      setIsOpen(next);
      if (next) config.onOpen?.(); else config.onClose?.();
    },
    [config]
  );

  // Cards that have a slider — open detail panel. All others toggle directly.
  const SLIDER_CARDS = new Set(['textSize', 'textSpacing', 'lineHeight', 'letterSpacing']);

  const handleCardClick = useCallback((id: string) => {
    if (SLIDER_CARDS.has(id)) {
      setActiveCard(id);
      return;
    }
    // Direct toggle
    switch (id) {
      case 'font':            setSettings(p => ({ ...p, font: p.font === 'readable' ? 'standard' : 'readable' })); break;
      case 'contrast':        setSettings(p => ({ ...p, contrast: p.contrast === 'dark' ? 'normal' : 'dark' })); break;
      case 'saturation':      setSettings(p => ({ ...p, saturation: p.saturation === 'high' ? 'normal' : 'high' })); break;
      case 'monochrome':      setSettings(p => ({ ...p, monochrome: !p.monochrome })); break;
      case 'invertColors':    setSettings(p => ({ ...p, invertColors: !p.invertColors })); break;
      case 'darkMode':        setSettings(p => ({ ...p, darkMode: !p.darkMode })); break;
      case 'highlightLinks':  setSettings(p => ({ ...p, highlightLinks: !p.highlightLinks })); break;
      case 'highlightTitles': setSettings(p => ({ ...p, highlightTitles: !p.highlightTitles })); break;
      case 'readingMask':     setSettings(p => ({ ...p, readingMask: !p.readingMask })); break;
      case 'textToSpeech':    setSettings(p => ({ ...p, textToSpeech: !p.textToSpeech })); break;
      case 'adhdMode':        setSettings(p => ({ ...p, adhdMode: !p.adhdMode })); break;
      case 'stopAnimations':  setSettings(p => ({ ...p, stopAnimations: !p.stopAnimations })); break;
      case 'hideImages':      setSettings(p => ({ ...p, hideImages: !p.hideImages })); break;
      case 'cursorSize':      setSettings(p => ({ ...p, cursorSize: p.cursorSize === 'big' ? 'normal' : 'big' })); break;
      case 'widgetSize':      setWidgetSize(s => s === 'small' ? 'normal' : 'small'); break;
      case 'widgetPosition':  setWidgetSide(s => s === 'left' ? 'right' : 'left'); break;
      case 'widgetVisibility':setIsOpen(false); setWidgetVisible(false); break;
      default: setActiveCard(id);
    }
  }, []);

  // Position based on widgetSide and widgetVertical
  const positionStyle: React.CSSProperties = {
    ...(widgetVertical === 'top' ? { top: '1rem' } : { bottom: '1rem' }),
    ...(widgetSide === 'left' ? { left: '1rem' } : { right: '1rem' }),
  };

  const sizeStyles = getStylesForSize(widgetSize === 'small' ? 'small' : config.size);
  const buttonStyles = getButtonStyleClass(config.buttonStyle);

  if (!widgetVisible) return null;

  // ── Detail panel state (when a card is clicked) ──
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const closeDetail = () => setActiveCard(null);

  return (
    <div
      data-a11y-menu
      style={{ position: config.buttonPosition, ...positionStyle, zIndex: config.zIndex }}
    >
      {/* Toggle button */}
      <button
        onClick={() => { handleOpenClose(!isOpen); setActiveCard(null); }}
        aria-label={isOpen ? 'Close accessibility menu' : 'Open accessibility menu'}
        aria-expanded={isOpen}
        title="Accessibility Menu"
        style={{
          minWidth: '44px',
          minHeight: '44px',
          ...buttonStyles,
          background: config.colors.buttonBackground,
          color: config.colors.buttonText,
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
          zIndex: config.buttonZIndex,
          fontWeight: 'bold',
          transition: config.enableAnimation ? 'all 0.3s ease' : 'none',
        }}
        onMouseEnter={(e) => {
          if (config.colors.buttonHover)
            (e.currentTarget as HTMLButtonElement).style.background = config.colors.buttonHover;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = config.colors.buttonBackground;
        }}
      >
        <svg width={widgetSize === 'small' ? 20 : config.size === 'large' ? 28 : 24} height={widgetSize === 'small' ? 20 : config.size === 'large' ? 28 : 24} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#a11y-clip)">
            <path d="M16 7a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" fill="currentColor"/>
            <path d="M27 7.05l-.028.008-.026.008a7.112 7.112 0 0 0-.188.055c-1.163.341-6.808 1.933-10.785 1.933-3.696 0-8.83-1.375-10.472-1.842A4.61 4.61 0 0 0 5 7.05c-1.188-.313-2 .893-2 1.996 0 1.092.98 1.612 1.972 1.985v.017l5.95 1.86c.609.232.771.47.85.677.259.662.053 1.972-.02 2.43l-.363 2.812L9.378 29.84l-.017.092-.014.08c-.145 1.009.596 1.988 2 1.988 1.225 0 1.766-.846 2-1.996.234-1.15 1.75-9.848 2.625-9.848s2.677 9.848 2.677 9.848c.235 1.15.775 1.996 2 1.996 1.408 0 2.15-.984 2-1.996a3.591 3.591 0 0 0-.047-.254l-2.04-10.92-.361-2.813c-.262-1.638-.052-2.18.02-2.306a.07.07 0 0 0 .005-.01c.067-.125.375-.405 1.092-.674l5.58-1.95c.034-.01.068-.02.101-.033 1-.375 2-.894 2-1.996 0-1.102-.811-2.31-1.999-1.998z" fill="currentColor"/>
          </g>
          <defs><clipPath id="a11y-clip"><path fill="currentColor" d="M0 0h32v32H0z"/></clipPath></defs>
        </svg>
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={config.ariaLabel}
          aria-describedby={config.ariaDescribedBy}
          style={{
            position: 'absolute',
            ...(widgetVertical === 'top' ? { top: '60px' } : { bottom: '60px' }),
            left: widgetSide === 'left' ? '0' : 'auto',
            right: widgetSide === 'right' ? '0' : 'auto',
            width: sizeStyles.width,
            background: config.colors.panelBackground,
            borderRadius: '16px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.16)',
            zIndex: config.buttonZIndex - 1,
            maxHeight: '88vh',
            overflowY: 'auto',
            color: config.colors.panelText,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: sizeStyles.fontSize,
          }}
        >
          {/* ── Header ── */}
          <div style={{
            background: config.colors.buttonBackground,
            color: config.colors.buttonText,
            padding: '1rem 1.25rem',
            borderRadius: '14px 14px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 2,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {activeCard ? (
                <button type="button" onClick={closeDetail} aria-label="Back" style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '6px', padding: '4px 8px', fontSize: '1rem' }}>←</button>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              )}
              <h2 id={config.ariaDescribedBy} style={{ margin: 0, fontSize: '1rem', fontWeight: '600', letterSpacing: '-0.01em' }}>
                {activeCard ? CARD_LABELS[activeCard] ?? config.labels.menuTitle : 'Accessibility Assistant'}
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <button type="button" onClick={() => handleOpenClose(false)} aria-label="Close menu" style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '8px', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>✕</button>
            </div>
          </div>

          {/* ── Body ── */}
          <div style={{ padding: '1rem 1rem 1.25rem' }}>
            {activeCard ? (
              /* Detail view */
              <div style={{ padding: '0.25rem 0' }}>
                <DetailPanel
                  card={activeCard}
                  settings={settings}
                  config={config}
                  widgetSize={widgetSize}
                  widgetSide={widgetSide}
                  widgetVisible={widgetVisible}
                  activeProfile={activeProfile}
                  handleSettingChange={handleSettingChange}
                  applyProfile={applyProfile}
                  setWidgetSize={setWidgetSize}
                  setWidgetSide={setWidgetSide}
                  setWidgetVisible={setWidgetVisible}
                  setIsOpen={setIsOpen}
                />
              </div>
            ) : (
              <>
                {/* Reset link */}
                {config.showReset && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                    <button type="button" onClick={handleReset} style={{ background: 'none', border: 'none', color: '#e05252', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '2px 0' }}>
                      Reset all settings
                    </button>
                  </div>
                )}

                {/* ── Profiles ── */}
                {config.features.profiles && (
                  <CardGroup label="Profiles">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', padding: '0.1rem 0 0.5rem' }}>
                      {([ ['readableFonts', config.labels.profileReadableFonts], ['screenReader', config.labels.profileScreenReader], ['motorImpaired', config.labels.profileMotorImpaired], ['dyslexia', config.labels.profileDyslexia], ['cognitive', config.labels.profileCognitive], ['adhd', config.labels.profileADHD], ['visualImpaired', config.labels.profileVisualImpaired], ['seizures', config.labels.profileSeizures] ] as [Profile, string][]).map(([key, label]) => (
                        <button type="button" key={key} onClick={() => applyProfile(key)} style={profileBtnStyle(config.colors, activeProfile === key)}>{label}</button>
                      ))}
                    </div>
                  </CardGroup>
                )}

                {/* ── Content group ── */}
                <CardGroup label="Content">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {CARD_GROUPS.content.filter(id => (config.features as any)[CARDS_BY_ID[id]?.featureKey] !== false && CARDS_BY_ID[id]).map(id => (
                      <FeatureCard key={id} card={CARDS_BY_ID[id]} isActive={getCardActive(id, settings, widgetSize, widgetSide, widgetVisible)} accentColor={config.colors.panelBorder} textColor={config.colors.panelText} onClick={() => handleCardClick(id)} />
                    ))}
                  </div>
                </CardGroup>

                {/* ── Colors group ── */}
                <CardGroup label="Colors">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {CARD_GROUPS.colors.filter(id => (config.features as any)[CARDS_BY_ID[id]?.featureKey] !== false && CARDS_BY_ID[id]).map(id => (
                      <FeatureCard key={id} card={CARDS_BY_ID[id]} isActive={getCardActive(id, settings, widgetSize, widgetSide, widgetVisible)} accentColor={config.colors.panelBorder} textColor={config.colors.panelText} onClick={() => handleCardClick(id)} />
                    ))}
                  </div>
                </CardGroup>

                {/* ── Navigation group ── */}
                <CardGroup label="Navigation">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {CARD_GROUPS.navigation.filter(id => (config.features as any)[CARDS_BY_ID[id]?.featureKey] !== false && CARDS_BY_ID[id]).map(id => (
                      <FeatureCard key={id} card={CARDS_BY_ID[id]} isActive={getCardActive(id, settings, widgetSize, widgetSide, widgetVisible)} accentColor={config.colors.panelBorder} textColor={config.colors.panelText} onClick={() => handleCardClick(id)} />
                    ))}
                  </div>
                </CardGroup>

                {/* ── Widget group ── */}
                <CardGroup label="Widget">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {CARD_GROUPS.widget.filter(id => (config.features as any)[CARDS_BY_ID[id]?.featureKey] !== false && CARDS_BY_ID[id]).map(id => (
                      <FeatureCard key={id} card={CARDS_BY_ID[id]} isActive={getCardActive(id, settings, widgetSize, widgetSide, widgetVisible)} accentColor={config.colors.panelBorder} textColor={config.colors.panelText} onClick={() => handleCardClick(id)} />
                    ))}
                  </div>
                </CardGroup>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

interface SectionProps {
  label: string;
  children: React.ReactNode;
  colors: AccessibilityMenuColors;
}

const Section: React.FC<SectionProps> = ({ label, children, colors }) => (
  <div style={{ marginBottom: '1.25rem' }}>
    <div style={{ fontWeight: 'bold', marginBottom: '0.4rem', fontSize: '0.875rem', color: colors.panelText }}>
      {label}
    </div>
    {children}
  </div>
);

interface ToggleGroupProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  colors: AccessibilityMenuColors;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({ options, value, onChange, colors }) => (
  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
    {options.map((opt) => (
      <button
        type="button"
        key={opt.value}
        onClick={() => onChange(opt.value)}
        style={{
          flex: 1,
          padding: '0.4rem 0.6rem',
          borderRadius: '4px',
          border: `1px solid ${value === opt.value ? colors.panelBorder : '#ccc'}`,
          background: value === opt.value ? colors.panelBorder : colors.panelBackground,
          color: value === opt.value ? '#fff' : colors.panelText,
          cursor: 'pointer',
          fontWeight: value === opt.value ? 'bold' : 'normal',
          fontSize: '0.8rem',
          transition: 'all 0.15s',
        }}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  colors: AccessibilityMenuColors;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, colors }) => (
  <div style={{ display: 'flex', gap: '0.35rem' }}>
    {['On', 'Off'].map((label) => {
      const active = label === 'On' ? checked : !checked;
      return (
        <button
          type="button"
          key={label}
          onClick={() => onChange(label === 'On')}
          style={{
            flex: 1,
            padding: '0.4rem 0.6rem',
            borderRadius: '4px',
            border: `1px solid ${active ? colors.panelBorder : '#ccc'}`,
            background: active ? colors.panelBorder : colors.panelBackground,
            color: active ? '#fff' : colors.panelText,
            cursor: 'pointer',
            fontWeight: active ? 'bold' : 'normal',
            fontSize: '0.8rem',
            transition: 'all 0.15s',
          }}
        >
          {label}
        </button>
      );
    })}
  </div>
);

function profileBtnStyle(colors: AccessibilityMenuColors, active = false): React.CSSProperties {
  return {
    padding: '0.3rem 0.6rem',
    borderRadius: '4px',
    border: `2px solid ${colors.panelBorder}`,
    background: active ? colors.panelBorder : colors.panelBackground,
    color: active ? '#fff' : colors.panelBorder,
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    transition: 'all 0.15s',
    boxShadow: active ? '0 2px 6px rgba(0,0,0,0.2)' : 'none',
  };
}

interface PresetButtonsProps {
  presets: { label: string; value: number }[];
  current: number;
  onSelect: (v: number) => void;
  colors: AccessibilityMenuColors;
}

const PresetButtons: React.FC<PresetButtonsProps> = ({ presets, current, onSelect, colors }) => (
  <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.4rem' }}>
    {presets.map((p) => {
      const active = current === p.value;
      return (
        <button
          type="button"
          key={p.label}
          onClick={() => onSelect(p.value)}
          style={{
            flex: 1,
            padding: '0.3rem 0',
            borderRadius: '4px',
            border: `1px solid ${active ? colors.panelBorder : '#d1d5db'}`,
            background: active ? colors.panelBorder : colors.panelBackground,
            color: active ? '#fff' : colors.panelText,
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: active ? 'bold' : 'normal',
            transition: 'all 0.15s',
          }}
        >
          {p.label}
        </button>
      );
    })}
  </div>
);

// ─── Feature card definitions ─────────────────────────────────────────────────

const FEATURE_CARDS: { id: string; icon: string; label: string; featureKey: string }[] = [
  { id: 'textSize',       icon: '𝐓↑',  label: 'Text Size',        featureKey: 'textSize' },
  { id: 'textSpacing',    icon: '↔',   label: 'Text Spacing',     featureKey: 'textSpacing' },
  { id: 'lineHeight',     icon: '↕',   label: 'Line Height',      featureKey: 'lineHeight' },
  { id: 'letterSpacing',  icon: 'A Z', label: 'Letter Spacing',   featureKey: 'letterSpacing' },
  { id: 'font',           icon: 'Df',  label: 'Dyslexia Font',    featureKey: 'font' },
  { id: 'contrast',       icon: '◑',   label: 'Light-Dark',       featureKey: 'contrast' },
  { id: 'saturation',     icon: '💧',  label: 'Saturation',       featureKey: 'saturation' },
  { id: 'monochrome',     icon: '⬛',  label: 'Monochrome',       featureKey: 'monochrome' },
  { id: 'invertColors',   icon: '🔲',  label: 'Invert Colors',    featureKey: 'invertColors' },
  { id: 'darkMode',       icon: '🌙',  label: 'Dark Mode',        featureKey: 'darkMode' },
  { id: 'highlightLinks', icon: '🔗',  label: 'Highlight Links',  featureKey: 'highlightLinks' },
  { id: 'highlightTitles',icon: '📌',  label: 'Highlight Titles', featureKey: 'highlightTitles' },
  { id: 'readingMask',    icon: '📖',  label: 'Reading Mask',     featureKey: 'readingMask' },
  { id: 'textToSpeech',   icon: '🔊',  label: 'Text To Speech',   featureKey: 'textToSpeech' },
  { id: 'adhdMode',       icon: '⚡',  label: 'ADHD Mode',        featureKey: 'adhdMode' },
  { id: 'stopAnimations', icon: '⏸',   label: 'Pause Animation',  featureKey: 'stopAnimations' },
  { id: 'hideImages',     icon: '🚫🖼', label: 'Hide Images',      featureKey: 'hideImages' },
  { id: 'cursorSize',     icon: '🖱',   label: 'Cursor',           featureKey: 'cursorSize' },
  { id: 'widgetSize',     icon: '⊡',   label: 'Widget Size',      featureKey: 'widgetSize' },
  { id: 'widgetPosition', icon: '⇄',   label: 'Display',          featureKey: 'widgetPosition' },
  { id: 'widgetVisibility',icon: '👁',  label: 'Visibility',       featureKey: 'widgetVisibility' },
];

const CARD_LABELS: Record<string, string> = Object.fromEntries(FEATURE_CARDS.map(c => [c.id, c.label]));

function getCardActive(
  id: string,
  settings: AccessibilitySettings,
  widgetSize: string,
  widgetSide: string,
  widgetVisible: boolean
): boolean {
  switch (id) {
    case 'textSize':        return settings.textSize !== 100;
    case 'textSpacing':     return settings.textSpacing > 0;
    case 'lineHeight':      return settings.lineHeight !== 1;
    case 'letterSpacing':   return settings.letterSpacing > 0;
    case 'font':            return settings.font === 'readable';
    case 'contrast':        return settings.contrast !== 'normal';
    case 'saturation':      return settings.saturation !== 'normal';
    case 'monochrome':      return settings.monochrome;
    case 'invertColors':    return settings.invertColors;
    case 'darkMode':        return settings.darkMode;
    case 'highlightLinks':  return settings.highlightLinks;
    case 'highlightTitles': return settings.highlightTitles;
    case 'readingMask':     return settings.readingMask;
    case 'textToSpeech':    return settings.textToSpeech;
    case 'adhdMode':        return settings.adhdMode;
    case 'stopAnimations':  return settings.stopAnimations;
    case 'hideImages':      return settings.hideImages;
    case 'cursorSize':      return settings.cursorSize === 'big';
    case 'widgetSize':      return widgetSize === 'small';
    case 'widgetPosition':  return widgetSide === 'left';
    case 'widgetVisibility':return !widgetVisible;
    default:                return false;
  }
}

// ─── Card groups (sections matching the screenshot) ──────────────────────────

const CARD_GROUPS = {
  content:    ['textSize', 'textSpacing', 'lineHeight', 'letterSpacing', 'font', 'hideImages', 'readingMask', 'textToSpeech', 'adhdMode'],
  colors:     ['invertColors', 'contrast', 'saturation', 'monochrome', 'darkMode'],
  navigation: ['highlightLinks', 'highlightTitles', 'stopAnimations', 'cursorSize'],
  widget:     ['widgetSize', 'widgetPosition', 'widgetVisibility'],
};

const CARDS_BY_ID: Record<string, typeof FEATURE_CARDS[0]> = Object.fromEntries(FEATURE_CARDS.map(c => [c.id, c]));

// SVG icons matching the screenshot style (outline, 24x24)
const CARD_SVGS: Record<string, React.ReactNode> = {
  textSize:        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><text x="3" y="18" fontSize="14" fontWeight="bold" stroke="currentColor" strokeWidth="0.5" fill="currentColor">T</text><text x="13" y="14" fontSize="9" stroke="currentColor" strokeWidth="0.3" fill="currentColor">T</text><line x1="20" y1="10" x2="20" y2="20" strokeWidth="1.5"/><line x1="17" y1="20" x2="23" y2="20" strokeWidth="1.5"/></svg>,
  textSpacing:     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h16M4 8l-2 4 2 4M20 8l2 4-2 4"/></svg>,
  lineHeight:      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><path d="M5 4v16M3 6l2-2 2 2M3 18l2 2 2-2"/></svg>,
  letterSpacing:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><text x="5" y="16" fontSize="11" fill="currentColor" stroke="none">A</text><text x="13" y="16" fontSize="11" fill="currentColor" stroke="none">Z</text><line x1="2" y1="20" x2="22" y2="20" strokeWidth="1.2"/></svg>,
  font:            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><text x="3" y="17" fontSize="13" fontStyle="italic" fill="currentColor" stroke="none" fontFamily="serif">Df</text><path d="M2 20h20" strokeWidth="1"/></svg>,
  hideImages:      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><line x1="3" y1="3" x2="21" y2="21"/></svg>,
  readingMask:     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="9" width="20" height="6" rx="1" fill="currentColor" fillOpacity="0.15"/><line x1="2" y1="6" x2="22" y2="6"/><line x1="2" y1="18" x2="22" y2="18"/></svg>,
  textToSpeech:    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 6v12M8 9v6M4 11v2M16 9v6M20 11v2"/></svg>,
  adhdMode:        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  invertColors:    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20V2z" fill="currentColor"/></svg>,
  contrast:        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18" fill="currentColor"/><line x1="12" y1="3" x2="12" y2="21"/></svg>,
  saturation:      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>,
  monochrome:      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 3c5 0 9 4 9 9s-4 9-9 9" fill="currentColor" fillOpacity="0.4"/></svg>,
  darkMode:        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  highlightLinks:  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  highlightTitles: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="17" x2="11" y2="17"/><rect x="15" y="10" width="7" height="9" rx="1" strokeDasharray="2 1"/></svg>,
  stopAnimations:  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><rect x="9" y="9" width="2" height="6" fill="currentColor" stroke="none"/><rect x="13" y="9" width="2" height="6" fill="currentColor" stroke="none"/></svg>,
  cursorSize:      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 3l14 9-7 1-4 7-3-17z" fill="currentColor" fillOpacity="0.15"/><path d="M5 3l14 9-7 1-4 7-3-17z"/></svg>,
  widgetSize:      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><rect x="8" y="8" width="8" height="8" rx="1"/></svg>,
  widgetPosition:  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  widgetVisibility:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
};

// ─── FeatureCard component ────────────────────────────────────────────────────

interface FeatureCardProps {
  card: typeof FEATURE_CARDS[0];
  isActive: boolean;
  accentColor: string;
  textColor: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ card, isActive, accentColor, textColor, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={isActive}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.45rem',
      padding: '0.9rem 0.4rem 0.7rem',
      background: isActive ? accentColor : '#f5f6fa',
      color: isActive ? '#fff' : textColor,
      border: `1.5px solid ${isActive ? accentColor : '#e8eaf0'}`,
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '0.7rem',
      fontWeight: isActive ? '600' : '400',
      transition: 'all 0.15s ease',
      minHeight: '88px',
      position: 'relative',
    }}
  >
    <span style={{ opacity: isActive ? 1 : 0.7 }}>
      {CARD_SVGS[card.id] ?? <span style={{ fontSize: '1.4rem' }}>{card.icon}</span>}
    </span>
    <span style={{ textAlign: 'center', lineHeight: 1.3, fontSize: '0.7rem' }}>{card.label}</span>
    {/* 3-dot drag handle */}
    <span style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '2px', opacity: 0.25 }}>
      {[0,1,2].map(i => <span key={i} style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'currentColor', display: 'block' }} />)}
    </span>
  </button>
);

// ─── CardGroup section label ──────────────────────────────────────────────────

const CardGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ marginBottom: '1.1rem' }}>
    <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'capitalize', marginBottom: '0.5rem', letterSpacing: '0.01em' }}>
      {label}
    </div>
    {children}
  </div>
);

// ─── Detail panel (shown when a card is tapped) ───────────────────────────────

interface DetailPanelProps {
  card: string;
  settings: AccessibilitySettings;
  config: Required<AccessibilityMenuConfig>;
  widgetSize: 'normal' | 'small';
  widgetSide: 'left' | 'right';
  widgetVisible: boolean;
  activeProfile: Profile | null;
  handleSettingChange: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  applyProfile: (p: Profile) => void;
  setWidgetSize: (v: 'normal' | 'small') => void;
  setWidgetSide: (v: 'left' | 'right') => void;
  setWidgetVisible: (v: boolean) => void;
  setIsOpen: (v: boolean) => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({
  card, settings, config, widgetSize, widgetSide, widgetVisible,
  handleSettingChange, setWidgetSize, setWidgetSide, setWidgetVisible, setIsOpen,
}) => {
  const c = config.colors;

  switch (card) {
    case 'contrast':
      return <ToggleGroup options={[{ value: 'normal', label: config.labels.normalContrast }, { value: 'dark', label: config.labels.darkContrast }, { value: 'light', label: config.labels.lightContrast }]} value={settings.contrast} onChange={v => handleSettingChange('contrast', v as any)} colors={c} />;
    case 'saturation':
      return <ToggleGroup options={[{ value: 'normal', label: config.labels.normalSaturation }, { value: 'high', label: config.labels.highSaturation }, { value: 'low', label: config.labels.lowSaturation }]} value={settings.saturation} onChange={v => handleSettingChange('saturation', v as any)} colors={c} />;
    case 'font':
      return <ToggleGroup options={[{ value: 'standard', label: config.labels.standardFont }, { value: 'readable', label: config.labels.dyslexiaFont }]} value={settings.font} onChange={v => handleSettingChange('font', v as any)} colors={c} />;
    case 'cursorSize':
      return <ToggleGroup options={[{ value: 'normal', label: config.labels.normalCursor }, { value: 'big', label: config.labels.bigCursor }]} value={settings.cursorSize} onChange={v => handleSettingChange('cursorSize', v as any)} colors={c} />;
    case 'monochrome':
      return <Toggle checked={settings.monochrome} onChange={v => handleSettingChange('monochrome', v)} colors={c} />;
    case 'invertColors':
      return <Toggle checked={settings.invertColors} onChange={v => handleSettingChange('invertColors', v)} colors={c} />;
    case 'darkMode':
      return <Toggle checked={settings.darkMode} onChange={v => handleSettingChange('darkMode', v)} colors={c} />;
    case 'highlightLinks':
      return <Toggle checked={settings.highlightLinks} onChange={v => handleSettingChange('highlightLinks', v)} colors={c} />;
    case 'highlightTitles':
      return <Toggle checked={settings.highlightTitles} onChange={v => handleSettingChange('highlightTitles', v)} colors={c} />;
    case 'readingMask':
      return <Toggle checked={settings.readingMask} onChange={v => handleSettingChange('readingMask', v)} colors={c} />;
    case 'textToSpeech':
      return <Toggle checked={settings.textToSpeech} onChange={v => handleSettingChange('textToSpeech', v)} colors={c} />;
    case 'adhdMode':
      return <Toggle checked={settings.adhdMode} onChange={v => handleSettingChange('adhdMode', v)} colors={c} />;
    case 'stopAnimations':
      return <Toggle checked={settings.stopAnimations} onChange={v => handleSettingChange('stopAnimations', v)} colors={c} />;
    case 'hideImages':
      return <Toggle checked={settings.hideImages} onChange={v => handleSettingChange('hideImages', v)} colors={c} />;
    case 'widgetSize':
      return <ToggleGroup options={[{ value: 'normal', label: config.labels.normalSize }, { value: 'small', label: config.labels.smallSize }]} value={widgetSize} onChange={v => setWidgetSize(v as any)} colors={c} />;
    case 'widgetPosition':
      return <ToggleGroup options={[{ value: 'left', label: config.labels.leftPosition }, { value: 'right', label: config.labels.rightPosition }]} value={widgetSide} onChange={v => setWidgetSide(v as any)} colors={c} />;
    case 'widgetVisibility':
      return <ToggleGroup options={[{ value: 'on', label: config.labels.visibilityOn }, { value: 'off', label: config.labels.visibilityOff }]} value={widgetVisible ? 'on' : 'off'} onChange={v => { if (v === 'off') { setIsOpen(false); setWidgetVisible(false); } else setWidgetVisible(true); }} colors={c} />;
    case 'textSize':
      return (
        <div>
          <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{settings.textSize}%</div>
          <input type="range" aria-label="Text size" min={config.textSizeMin} max={config.textSizeMax} step={config.textSizeStep} value={settings.textSize} onChange={e => handleSettingChange('textSize', parseInt(e.target.value))} style={{ width: '100%' }} />
          <PresetButtons presets={[{ label: 'x1.5', value: 115 }, { label: 'x2', value: 130 }, { label: 'x2.5', value: 145 }]} current={settings.textSize} onSelect={v => handleSettingChange('textSize', v)} colors={c} />
        </div>
      );
    case 'textSpacing':
      return (
        <div>
          <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{settings.textSpacing}</div>
          <input type="range" aria-label="Text spacing" min={config.spacingMin} max={config.spacingMax} step={config.spacingStep} value={settings.textSpacing} onChange={e => handleSettingChange('textSpacing', parseInt(e.target.value))} style={{ width: '100%' }} />
          <PresetButtons presets={[{ label: 'x1.5', value: 3 }, { label: 'x2', value: 6 }, { label: 'x2.5', value: 9 }]} current={settings.textSpacing} onSelect={v => handleSettingChange('textSpacing', v)} colors={c} />
        </div>
      );
    case 'lineHeight':
      return (
        <div>
          <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{settings.lineHeight.toFixed(1)}</div>
          <input type="range" aria-label="Line height" min={config.lineHeightMin} max={config.lineHeightMax} step={config.lineHeightStep} value={settings.lineHeight} onChange={e => handleSettingChange('lineHeight', parseFloat(e.target.value))} style={{ width: '100%' }} />
          <PresetButtons presets={[{ label: 'x1.5', value: 1.5 }, { label: 'x2', value: 2.0 }, { label: 'x2.5', value: 2.5 }]} current={settings.lineHeight} onSelect={v => handleSettingChange('lineHeight', v)} colors={c} />
        </div>
      );
    case 'letterSpacing':
      return (
        <div>
          <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{settings.letterSpacing}</div>
          <input type="range" aria-label="Letter spacing" min={config.letterSpacingMin} max={config.letterSpacingMax} step={config.letterSpacingStep} value={settings.letterSpacing} onChange={e => handleSettingChange('letterSpacing', parseInt(e.target.value))} style={{ width: '100%' }} />
          <PresetButtons presets={[{ label: 'x1.5', value: 3 }, { label: 'x2', value: 6 }, { label: 'x2.5', value: 9 }]} current={settings.letterSpacing} onSelect={v => handleSettingChange('letterSpacing', v)} colors={c} />
        </div>
      );
    default:
      return null;
  }
};

export default AccessibilityMenu;
