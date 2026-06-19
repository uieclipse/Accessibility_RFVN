export type WCAGLevel = 'A' | 'AA' | 'AAA';

export interface WCAGRequirements {
  perceivable: boolean;
  operable: boolean;
  understandable: boolean;
  robust: boolean;
}

export interface AccessibilityConfig {
  wcagLevel: WCAGLevel;
  enabled: boolean;
  features: {
    // Perceivable
    altText: boolean;
    captions: boolean;
    audioDescriptions: boolean;
    colorContrast: number; // ratio e.g., 4.5 for AA, 3 for AAA large text
    textResize: boolean;
    reflow: boolean;
    nonTextContrast: number;

    // Operable
    keyboardNavigation: boolean;
    keyboardTraps: boolean;
    focusVisible: boolean;
    focusOrder: boolean;
    skipLinks: boolean;
    clickableSize: number; // minimum pixels
    timing: boolean;
    pauseAnimation: boolean;

    // Understandable
    pageLanguage: boolean;
    predictableBehavior: boolean;
    errorIdentification: boolean;
    labels: boolean;
    instructions: boolean;

    // Robust
    semanticHTML: boolean;
    ariaUsage: boolean;
    assistiveTech: boolean;
  };
}

export interface A11yToolkitConfig {
  wcagLevel: WCAGLevel;
  enableLogging: boolean;
  theme?: 'light' | 'dark' | 'auto';
  locale?: string;
  customRules?: Record<string, boolean | number>;
}
