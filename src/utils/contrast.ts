export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function getLuminance(rgb: { r: number; g: number; b: number }): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastRatio(foreground: string, background: string): number {
  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);

  if (!fgRgb || !bgRgb) {
    throw new Error('Invalid color format. Use hex colors like #FFFFFF');
  }

  const lum1 = getLuminance(fgRgb);
  const lum2 = getLuminance(bgRgb);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

export function meetsWCAGAA(contrast: number): boolean {
  return contrast >= 4.5;
}

export function meetsWCAGAALargeText(contrast: number): boolean {
  return contrast >= 3;
}

export function meetsWCAGAAA(contrast: number): boolean {
  return contrast >= 7;
}

export function meetsWCAGAAALargeText(contrast: number): boolean {
  return contrast >= 4.5;
}

export function checkContrast(
  foreground: string,
  background: string
): {
  ratio: number;
  AA: boolean;
  AALargeText: boolean;
  AAA: boolean;
  AAALargeText: boolean;
} {
  const ratio = getContrastRatio(foreground, background);

  return {
    ratio: Math.round(ratio * 100) / 100,
    AA: meetsWCAGAA(ratio),
    AALargeText: meetsWCAGAALargeText(ratio),
    AAA: meetsWCAGAAA(ratio),
    AAALargeText: meetsWCAGAAALargeText(ratio),
  };
}
