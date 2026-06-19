export * from './contrast';
export * from './keyboard';
export * from './aria';
export * from './accessibilityAuditor';

export function validateElement(element: HTMLElement | null): element is HTMLElement {
  return element instanceof HTMLElement;
}

export function ensureId(element: HTMLElement): string {
  if (!element.id) {
    element.id = `auto-id-${Math.random().toString(36).substr(2, 9)}`;
  }
  return element.id;
}

export function makeElementVisible(element: HTMLElement): void {
  element.style.position = 'relative';
  element.style.width = 'auto';
  element.style.height = 'auto';
  element.style.overflow = 'visible';
  element.style.clip = 'auto';
}

export function makeElementScreenReaderOnly(element: HTMLElement): void {
  element.style.position = 'absolute';
  element.style.left = '-10000px';
  element.style.width = '1px';
  element.style.height = '1px';
  element.style.overflow = 'hidden';
}
