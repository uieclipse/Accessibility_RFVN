export interface AriaAttributes {
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: 'true' | 'false';
  'aria-disabled'?: 'true' | 'false';
  'aria-pressed'?: 'true' | 'false' | 'mixed';
  'aria-expanded'?: 'true' | 'false';
  'aria-selected'?: 'true' | 'false';
  'aria-checked'?: 'true' | 'false' | 'mixed';
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-atomic'?: 'true' | 'false';
  'aria-relevant'?: string;
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
  'aria-label-id'?: string;
  'aria-valuenow'?: number;
  'aria-valuemin'?: number;
  'aria-valuemax'?: number;
  'aria-valuetext'?: string;
}

export function setAriaLabel(
  element: HTMLElement,
  label: string,
  hidden: boolean = false
): void {
  element.setAttribute('aria-label', label);
  if (hidden) {
    element.setAttribute('aria-hidden', 'true');
  }
}

export function setAriaDescribedBy(element: HTMLElement, descriptionId: string): void {
  element.setAttribute('aria-describedby', descriptionId);
}

export function setAriaLabelledBy(element: HTMLElement, labelId: string): void {
  element.setAttribute('aria-labelledby', labelId);
}

export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';

  announcement.textContent = message;
  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

export function getAccessibleName(element: HTMLElement): string {
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;

  const ariaLabelledBy = element.getAttribute('aria-labelledby');
  if (ariaLabelledBy) {
    const labelElement = document.getElementById(ariaLabelledBy);
    if (labelElement) return labelElement.textContent || '';
  }

  return element.textContent || element.getAttribute('title') || '';
}

export function markElementAsRequired(
  element: HTMLElement,
  required: boolean = true
): void {
  if (required) {
    element.setAttribute('aria-required', 'true');
  } else {
    element.removeAttribute('aria-required');
  }
}

export function markElementAsInvalid(
  element: HTMLElement,
  invalid: boolean = true,
  description?: string
): void {
  if (invalid) {
    element.setAttribute('aria-invalid', 'true');
    if (description) {
      const descId = `error-${Math.random().toString(36).substr(2, 9)}`;
      const descElement = document.createElement('span');
      descElement.id = descId;
      descElement.textContent = description;
      descElement.style.display = 'none';
      element.parentElement?.appendChild(descElement);
      element.setAttribute('aria-describedby', descId);
    }
  } else {
    element.removeAttribute('aria-invalid');
    const describedBy = element.getAttribute('aria-describedby');
    if (describedBy) {
      const descElement = document.getElementById(describedBy);
      descElement?.remove();
      element.removeAttribute('aria-describedby');
    }
  }
}
