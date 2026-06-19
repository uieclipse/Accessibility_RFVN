export { AccessibilityMenu, DEFAULT_FEATURES, DEFAULT_SETTINGS } from './components/AccessibilityMenu';
export type {
  AccessibilityMenuProps,
  AccessibilityMenuConfig,
  A11yFeatureFlags,
  AccessibilitySettings,
} from './components/AccessibilityMenu';
export {
  DEFAULT_COLORS,
  DEFAULT_LABELS,
  mergeConfig,
  getStylesForSize,
  getButtonStyleClass,
} from './config/accessibilityMenuConfig';
export type {
  MenuPosition,
  MenuSize,
  MenuTheme,
  ButtonStyle,
  AccessibilityMenuColors,
  AccessibilityMenuLabels,
} from './config/accessibilityMenuConfig';

export { AccessibleNav } from './components/AccessibleNav';
export type { AccessibleNavProps, NavItem } from './components/AccessibleNav';

export { AccessibleButton } from './components/AccessibleButton';
export type { AccessibleButtonProps } from './components/AccessibleButton';

export { AccessibleInput } from './components/AccessibleInput';
export type { AccessibleInputProps } from './components/AccessibleInput';

export { AccessibleModal } from './components/AccessibleModal';
export type { AccessibleModalProps } from './components/AccessibleModal';

export { AccessibleTabs } from './components/AccessibleTabs';
export type { AccessibleTabsProps, TabItem } from './components/AccessibleTabs';

export { AccessibilityStatusReporter } from './components/AccessibilityStatusReporter';
export type { AccessibilityStatusReporterProps } from './components/AccessibilityStatusReporter';

export { useA11yConfig } from './hooks/useA11yConfig';
