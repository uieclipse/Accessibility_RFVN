export type MenuPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type MenuSize = 'small' | 'medium' | 'large';
export type MenuTheme = 'light' | 'dark' | 'auto';
export type ButtonStyle = 'circle' | 'square' | 'rounded';

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
  highlightTitles?: boolean;
  stopAnimations?: boolean;
  hideImages?: boolean;
  readingMask?: boolean;
  textToSpeech?: boolean;
  adhdMode?: boolean;
  monochrome?: boolean;
  invertColors?: boolean;
  darkMode?: boolean;
  profiles?: boolean;
  widgetSize?: boolean;
  widgetPosition?: boolean;
  widgetVisibility?: boolean;
}

export interface AccessibilityMenuColors {
  buttonBackground: string;
  buttonText: string;
  panelBackground: string;
  panelBorder: string;
  panelText: string;
  buttonHover: string;
  resetButtonBackground: string;
  resetButtonHover: string;
}

export interface AccessibilityMenuLabels {
  menuTitle: string;
  contrast: string;
  saturation: string;
  font: string;
  textSize: string;
  textSpacing: string;
  lineHeight: string;
  letterSpacing: string;
  cursorSize: string;
  highlightLinks: string;
  highlightTitles: string;
  stopAnimations: string;
  hideImages: string;
  readingMask: string;
  textToSpeech: string;
  adhdMode: string;
  monochrome: string;
  invertColors: string;
  darkMode: string;
  reset: string;
  normalContrast: string;
  darkContrast: string;
  lightContrast: string;
  normalSaturation: string;
  highSaturation: string;
  lowSaturation: string;
  monochromeMode: string;
  standardFont: string;
  dyslexiaFont: string;
  normalCursor: string;
  bigCursor: string;
  profiles: string;
  widgetSize: string;
  widgetPosition: string;
  widgetVisibility: string;
  normalSize: string;
  smallSize: string;
  leftPosition: string;
  rightPosition: string;
  visibilityOn: string;
  visibilityOff: string;
  profileReadableFonts: string;
  profileScreenReader: string;
  profileMotorImpaired: string;
  profileDyslexia: string;
  profileCognitive: string;
  profileADHD: string;
  profileVisualImpaired: string;
  profileSeizures: string;
}

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
};

export const DEFAULT_COLORS: AccessibilityMenuColors = {
  buttonBackground: '#2563eb',
  buttonText: '#ffffff',
  panelBackground: '#ffffff',
  panelBorder: '#2563eb',
  panelText: '#000000',
  buttonHover: '#1d4ed8',
  resetButtonBackground: '#f3f4f6',
  resetButtonHover: '#e5e7eb',
};

export const DEFAULT_LABELS: AccessibilityMenuLabels = {
  menuTitle: 'Accessibility',
  contrast: 'Contrast',
  saturation: 'Saturation',
  font: 'Font',
  textSize: 'Text Size',
  textSpacing: 'Text Spacing',
  lineHeight: 'Line Height',
  letterSpacing: 'Letter Spacing',
  cursorSize: 'Cursor',
  highlightLinks: 'Highlight Links',
  highlightTitles: 'Highlight Titles',
  stopAnimations: 'Stop Animations',
  hideImages: 'Hide Images',
  readingMask: 'Reading Mask',
  textToSpeech: 'Text To Speech',
  adhdMode: 'ADHD Mode',
  monochrome: 'Monochrome',
  invertColors: 'Invert Colors',
  darkMode: 'Dark Mode',
  reset: 'Reset',
  normalContrast: 'Normal',
  darkContrast: 'Dark',
  lightContrast: 'Light',
  normalSaturation: 'Normal',
  highSaturation: 'High',
  lowSaturation: 'Low',
  monochromeMode: 'Monochrome',
  standardFont: 'Standard',
  dyslexiaFont: 'Dyslexia Friendly',
  normalCursor: 'Normal',
  bigCursor: 'Big',
  profiles: 'Profiles',
  widgetSize: 'Widget Size',
  widgetPosition: 'Display',
  widgetVisibility: 'Widget Visibility',
  normalSize: 'Normal',
  smallSize: 'Small',
  leftPosition: 'Left',
  rightPosition: 'Right',
  visibilityOn: 'On',
  visibilityOff: 'Off',
  profileReadableFonts: 'Readable Fonts',
  profileScreenReader: 'Screen Reader',
  profileMotorImpaired: 'Motor Impaired',
  profileDyslexia: 'Dyslexia',
  profileCognitive: 'Cognitive',
  profileADHD: 'ADHD',
  profileVisualImpaired: 'Visual Impaired',
  profileSeizures: 'Seizures',
};

export interface AccessibilitySettings {
  contrast: 'normal' | 'dark' | 'light';
  saturation: 'high' | 'normal' | 'low';
  font: 'standard' | 'readable';
  textSize: number;
  textSpacing: number;
  lineHeight: number;
  letterSpacing: number;
  cursorSize: 'normal' | 'big';
  highlightLinks: boolean;
  highlightTitles: boolean;
  stopAnimations: boolean;
  hideImages: boolean;
  readingMask: boolean;
  textToSpeech: boolean;
  adhdMode: boolean;
  monochrome: boolean;
  invertColors: boolean;
  darkMode: boolean;
}

export const DEFAULT_SETTINGS: AccessibilitySettings = {
  contrast: 'normal',
  saturation: 'normal',
  font: 'standard',
  textSize: 100,
  textSpacing: 0,
  lineHeight: 1,
  letterSpacing: 0,
  cursorSize: 'normal',
  highlightLinks: false,
  highlightTitles: false,
  stopAnimations: false,
  hideImages: false,
  readingMask: false,
  textToSpeech: false,
  adhdMode: false,
  monochrome: false,
  invertColors: false,
  darkMode: false,
};

export interface AccessibilityMenuConfig {
  features?: A11yFeatureFlags;
  position?: MenuPosition;
  buttonPosition?: 'fixed' | 'absolute';
  size?: MenuSize;
  zIndex?: number;
  buttonZIndex?: number;
  buttonLabel?: string;
  buttonStyle?: ButtonStyle;
  showKeyboardHint?: boolean;
  theme?: MenuTheme;
  colors?: AccessibilityMenuColors;
  labels?: AccessibilityMenuLabels;
  showReset?: boolean;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  autoSave?: boolean;
  storageKey?: string;
  storagePrefix?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;
  onSettingsChange?: (settings: AccessibilitySettings) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onReset?: () => void;
  textSizeMin?: number;
  textSizeMax?: number;
  textSizeStep?: number;
  spacingMin?: number;
  spacingMax?: number;
  spacingStep?: number;
  lineHeightMin?: number;
  lineHeightMax?: number;
  lineHeightStep?: number;
  letterSpacingMin?: number;
  letterSpacingMax?: number;
  letterSpacingStep?: number;
  animationDuration?: number;
  enableAnimation?: boolean;
  debug?: boolean;
  enableLogging?: boolean;
}

export const DEFAULT_CONFIG: Omit<Required<AccessibilityMenuConfig>, 'onSettingsChange' | 'onOpen' | 'onClose' | 'onReset'> & Partial<Pick<AccessibilityMenuConfig, 'onSettingsChange' | 'onOpen' | 'onClose' | 'onReset'>> = {
  features: DEFAULT_FEATURES,
  position: 'top-right',
  buttonPosition: 'fixed',
  size: 'medium',
  zIndex: 50,
  buttonZIndex: 9999,
  buttonLabel: '♿',
  buttonStyle: 'circle',
  showKeyboardHint: true,
  theme: 'auto',
  colors: DEFAULT_COLORS,
  labels: DEFAULT_LABELS,
  showReset: true,
  closeOnEscape: true,
  closeOnClickOutside: true,
  autoSave: true,
  storageKey: 'a11y-settings',
  storagePrefix: 'a11y',
  ariaLabel: 'Accessibility menu',
  ariaDescribedBy: 'a11y-menu-description',
  role: 'dialog',
  textSizeMin: 80,
  textSizeMax: 150,
  textSizeStep: 10,
  spacingMin: 0,
  spacingMax: 10,
  spacingStep: 1,
  lineHeightMin: 1,
  lineHeightMax: 2.5,
  lineHeightStep: 0.1,
  letterSpacingMin: 0,
  letterSpacingMax: 10,
  letterSpacingStep: 1,
  animationDuration: 300,
  enableAnimation: true,
  debug: false,
  enableLogging: false,
};

export function mergeConfig(
  userConfig?: Partial<AccessibilityMenuConfig>
): Required<AccessibilityMenuConfig> {
  const base = {
    ...DEFAULT_CONFIG,
    features: { ...DEFAULT_FEATURES, ...userConfig?.features },
    colors: { ...DEFAULT_COLORS, ...userConfig?.colors },
    labels: { ...DEFAULT_LABELS, ...userConfig?.labels },
    ...userConfig,
  } as Required<AccessibilityMenuConfig>;

  return base;
}

export function getStylesForSize(size: MenuSize) {
  const sizes = {
    small: { width: '260px', padding: '1rem', fontSize: '0.875rem' },
    medium: { width: '320px', padding: '1.5rem', fontSize: '1rem' },
    large: { width: '400px', padding: '2rem', fontSize: '1.125rem' },
  };
  return sizes[size];
}

export function getButtonStyleClass(style: ButtonStyle): Record<string, string | number> {
  const styles = {
    circle: { borderRadius: '50%', width: '44px', height: '44px', padding: '0.75rem' },
    square: { borderRadius: '4px', padding: '0.75rem 1rem', minWidth: '44px', minHeight: '44px' },
    rounded: { borderRadius: '8px', padding: '0.75rem 1rem', minWidth: '44px', minHeight: '44px' },
  };
  return styles[style];
}
