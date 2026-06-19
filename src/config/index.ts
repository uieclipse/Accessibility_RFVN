import { A11yToolkitConfig, WCAGLevel, AccessibilityConfig } from './types';
import { getWCAGProfile, mergeConfigs } from './wcag-profiles';

class AccessibilityConfigManager {
  private config: A11yToolkitConfig;
  private wcagConfig: AccessibilityConfig;

  constructor(config: Partial<A11yToolkitConfig> = {}) {
    this.config = {
      wcagLevel: config.wcagLevel || 'AA',
      enableLogging: config.enableLogging ?? false,
      theme: config.theme || 'auto',
      locale: config.locale || 'en',
      customRules: config.customRules || {},
    };

    this.wcagConfig = getWCAGProfile(this.config.wcagLevel);
    if (this.config.customRules) {
      this.wcagConfig = mergeConfigs(this.wcagConfig, this.config.customRules);
    }

    if (this.config.enableLogging) {
      console.log(`[A11y Toolkit] Initialized with WCAG ${this.config.wcagLevel} level`);
    }
  }

  setWCAGLevel(level: WCAGLevel): void {
    this.config.wcagLevel = level;
    this.wcagConfig = getWCAGProfile(level);
    if (this.config.enableLogging) {
      console.log(`[A11y Toolkit] WCAG level changed to ${level}`);
    }
  }

  getWCAGLevel(): WCAGLevel {
    return this.config.wcagLevel;
  }

  getConfig(): A11yToolkitConfig {
    return { ...this.config };
  }

  getWCAGConfig(): AccessibilityConfig {
    return { ...this.wcagConfig };
  }

  isFeatureEnabled(feature: keyof AccessibilityConfig['features']): boolean {
    return this.wcagConfig.features[feature] as boolean;
  }

  getFeatureValue(feature: string): boolean | number | undefined {
    return (this.wcagConfig.features as Record<string, boolean | number>)[feature];
  }

  setCustomRule(key: string, value: boolean | number): void {
    if (!this.config.customRules) {
      this.config.customRules = {};
    }
    this.config.customRules[key] = value;
    this.wcagConfig = mergeConfigs(this.wcagConfig, this.config.customRules);
  }
}

let globalConfig: AccessibilityConfigManager | null = null;

export function initializeAccessibility(config?: Partial<A11yToolkitConfig>): AccessibilityConfigManager {
  globalConfig = new AccessibilityConfigManager(config);
  return globalConfig;
}

export function getAccessibilityConfig(): AccessibilityConfigManager {
  if (!globalConfig) {
    globalConfig = new AccessibilityConfigManager();
  }
  return globalConfig;
}

export { AccessibilityConfigManager };
export * from './types';
export * from './wcag-profiles';
