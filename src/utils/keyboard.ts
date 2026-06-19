export const KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  TAB: 'Tab',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
} as const;

export function isEnterKey(event: KeyboardEvent): boolean {
  return event.key === KEYS.ENTER || event.code === 'Enter';
}

export function isSpaceKey(event: KeyboardEvent): boolean {
  return event.key === KEYS.SPACE || event.code === 'Space';
}

export function isEscapeKey(event: KeyboardEvent): boolean {
  return event.key === KEYS.ESCAPE || event.code === 'Escape';
}

export function isArrowKey(event: KeyboardEvent): boolean {
  return [KEYS.ARROW_UP, KEYS.ARROW_DOWN, KEYS.ARROW_LEFT, KEYS.ARROW_RIGHT].includes(
    event.key as any
  );
}

export function isTabKey(event: KeyboardEvent): boolean {
  return event.key === KEYS.TAB || event.code === 'Tab';
}

export function isActivationKey(event: KeyboardEvent): boolean {
  return isEnterKey(event) || isSpaceKey(event);
}

export function trapFocus(container: HTMLElement, event: KeyboardEvent): void {
  if (!isTabKey(event)) return;

  const focusableElements = container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const activeElement = document.activeElement;

  if (event.shiftKey) {
    if (activeElement === firstElement) {
      lastElement.focus();
      event.preventDefault();
    }
  } else {
    if (activeElement === lastElement) {
      firstElement.focus();
      event.preventDefault();
    }
  }
}

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => {
    return el.offsetParent !== null && !el.hasAttribute('disabled');
  });
}
