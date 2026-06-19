import { useEffect, useState } from 'react';
import {
  getAccessibilityConfig,
  AccessibilityConfigManager,
  WCAGLevel,
  AccessibilityConfig,
} from '../../config';

export function useA11yConfig() {
  const [config, setConfig] = useState<AccessibilityConfigManager>(
    getAccessibilityConfig()
  );
  const [wcagConfig, setWcagConfig] = useState<AccessibilityConfig>(
    config.getWCAGConfig()
  );

  useEffect(() => {
    setWcagConfig(config.getWCAGConfig());
  }, [config]);

  const setWCAGLevel = (level: WCAGLevel) => {
    config.setWCAGLevel(level);
    setWcagConfig(config.getWCAGConfig());
  };

  const isFeatureEnabled = (feature: keyof AccessibilityConfig['features']) => {
    return config.isFeatureEnabled(feature);
  };

  return {
    config,
    wcagConfig,
    wcagLevel: config.getWCAGLevel(),
    setWCAGLevel,
    isFeatureEnabled,
  };
}
