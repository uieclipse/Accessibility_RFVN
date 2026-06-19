import { WCAGLevel, AccessibilityConfig } from './types';

const baseConfig: AccessibilityConfig = {
  wcagLevel: 'A',
  enabled: true,
  features: {
    // Perceivable
    altText: true,
    captions: false,
    audioDescriptions: false,
    colorContrast: 3,
    textResize: false,
    reflow: false,
    nonTextContrast: 0,

    // Operable
    keyboardNavigation: true,
    keyboardTraps: true,
    focusVisible: false,
    focusOrder: true,
    skipLinks: false,
    clickableSize: 0,
    timing: true,
    pauseAnimation: true,

    // Understandable
    pageLanguage: true,
    predictableBehavior: true,
    errorIdentification: true,
    labels: true,
    instructions: true,

    // Robust
    semanticHTML: true,
    ariaUsage: true,
    assistiveTech: true,
  },
};

export const wcagProfiles: Record<WCAGLevel, AccessibilityConfig> = {
  A: {
    ...baseConfig,
    wcagLevel: 'A',
  },

  AA: {
    ...baseConfig,
    wcagLevel: 'AA',
    features: {
      ...baseConfig.features,
      // Enhanced Perceivable
      captions: true,
      colorContrast: 4.5,
      textResize: true,
      reflow: true,
      nonTextContrast: 3,

      // Enhanced Operable
      focusVisible: true,
      skipLinks: true,
      clickableSize: 44,

      // Enhanced Understandable
      instructions: true,
    },
  },

  AAA: {
    ...baseConfig,
    wcagLevel: 'AAA',
    features: {
      ...baseConfig.features,
      // Maximum Perceivable
      captions: true,
      audioDescriptions: true,
      colorContrast: 7,
      textResize: true,
      reflow: true,
      nonTextContrast: 4.5,

      // Maximum Operable
      focusVisible: true,
      skipLinks: true,
      clickableSize: 48,

      // Maximum Understandable
      pageLanguage: true,
      instructions: true,
    },
  },
};

export function getWCAGProfile(level: WCAGLevel): AccessibilityConfig {
  return wcagProfiles[level];
}

export function mergeConfigs(
  baseProfile: AccessibilityConfig,
  customRules?: Record<string, boolean | number>
): AccessibilityConfig {
  if (!customRules) return baseProfile;

  return {
    ...baseProfile,
    features: {
      ...baseProfile.features,
      ...(customRules as Record<string, boolean | number>),
    },
  };
}
