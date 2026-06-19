# Testing & Validating Accessibility

## Automated Testing

### Using A11y Toolkit Utilities

```javascript
import { 
  checkContrast, 
  getFocusableElements, 
  KEYS 
} from '@a11y-toolkit/core';

// Test 1: Color Contrast
function testContrast() {
  const result = checkContrast('#333333', '#FFFFFF');
  
  console.assert(result.AA === true, 'Contrast should meet WCAG AA');
  console.assert(result.ratio >= 4.5, 'Contrast ratio should be 4.5:1 or higher');
}

// Test 2: Keyboard Navigation
function testKeyboardNavigation() {
  const nav = document.querySelector('nav');
  const focusable = getFocusableElements(nav);
  
  console.assert(focusable.length > 0, 'Navigation should have focusable elements');
  
  // Simulate keyboard navigation
  focusable[0].focus();
  console.assert(document.activeElement === focusable[0], 'First element should be focused');
}

// Test 3: ARIA Labels
function testAriaLabels() {
  const buttons = document.querySelectorAll('button');
  
  buttons.forEach(btn => {
    const hasLabel = btn.getAttribute('aria-label') || btn.textContent.trim();
    console.assert(hasLabel, `Button missing accessible label: ${btn}`);
  });
}
```

### Jest Test Example

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AccessibleButton } from '@a11y-toolkit/core/react';

describe('AccessibleButton', () => {
  it('should have 44px minimum height', () => {
    const { container } = render(
      <AccessibleButton label="Test" />
    );
    
    const button = container.querySelector('button');
    const height = window.getComputedStyle(button!).minHeight;
    
    expect(height).toBe('44px');
  });

  it('should have accessible label', () => {
    render(<AccessibleButton label="Submit" ariaLabel="Submit form" />);
    
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toHaveAttribute('aria-label', 'Submit form');
  });

  it('should be keyboard accessible', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    
    render(<AccessibleButton label="Click me" onClick={onClick} />);
    
    const button = screen.getByRole('button');
    await user.tab();
    
    expect(button).toHaveFocus();
    
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalled();
  });
});
```

## Manual Testing

### Keyboard Navigation Checklist

```
[ ] Can navigate to all interactive elements using TAB key
[ ] TAB order follows logical visual order
[ ] Focus indicator is visible (outline, border, background change)
[ ] Can activate buttons with ENTER and SPACE keys
[ ] Can select radio/checkboxes with arrow keys and SPACE
[ ] Can close modals with ESC key
[ ] No keyboard traps (can always escape)
[ ] Skip links work and move focus properly
```

### Screen Reader Testing

#### Using NVDA (Free, Windows)
```
1. Download from https://www.nvaccess.org/
2. Install and run NVDA
3. Press NVDA+H for help, NVDA+Q to quit
4. Navigate with arrow keys and tab
5. Listen for proper label announcements
```

#### Using VoiceOver (Mac/iOS)
```
1. Enable: System Preferences > Accessibility > VoiceOver
2. Toggle with Cmd+F5
3. Navigate with VO (Control+Option) + arrow keys
4. Read descriptions: VO+Down arrow
```

#### Using JAWS (Paid, Professional)
```
1. Similar to NVDA for testing
2. More comprehensive features
3. Industry standard for accessibility
```

### What to Listen For

✅ **Correct** - "Home link" or "Home button"  
❌ **Wrong** - (silence) or just "link"

```html
<!-- ✓ Good -->
<a href="/">Home</a>

<!-- ✗ Poor -->
<a href="/">
  <img src="logo.png" alt="logo" />
</a>

<!-- ✓ Better -->
<a href="/" aria-label="Home">
  <img src="logo.png" alt="" />
</a>
```

### Screen Reader Test Checklist

```
[ ] Page title is announced
[ ] Headings structure is logical (H1 > H2 > H3)
[ ] All images have alt text (or marked as decorative)
[ ] Form labels are properly associated
[ ] Error messages are announced
[ ] Success messages are announced
[ ] Links have descriptive text (not "click here")
[ ] Tables have headers and row labels
[ ] Live regions update are announced
[ ] Modal dialogs are announced
```

## Browser DevTools Testing

### Chrome DevTools

1. **Accessibility Inspector**
   ```
   Right-click element > Inspect > Accessibility tab
   ```
   
   Check:
   - Computed name (what screen reader announces)
   - Computed role (button, link, heading, etc.)
   - ARIA properties

2. **Lighthouse Audit**
   ```
   DevTools > Lighthouse tab > Generate report
   ```
   
   Reviews:
   - Color contrast
   - ARIA usage
   - Form labels
   - Touch target sizes
   - Page heading hierarchy

3. **Color Picker**
   ```
   DevTools > Inspector > Color picker tool
   Check contrast ratio on hover
   ```

### Firefox DevTools

1. **Inspector > Accessibility tab**
2. **Tree view** of accessible name and role
3. **Keyboard navigation** testing

## Online Tools

### axe DevTools
- Free browser extension
- Scans for WCAG violations
- Provides fixes and documentation

### WAVE (WebAIM)
- https://wave.webaim.org/
- Free web-based tool
- Evaluates page accessibility
- Shows errors and warnings

### Lighthouse
- Built into Chrome DevTools
- Run accessibility audit
- Provides score (0-100)
- Lists specific issues with fixes

### Contrast Checker
- https://webaim.org/resources/contrastchecker/
- Input colors to check ratio
- Verify WCAG AA/AAA compliance

## Automated CI/CD Testing

### axe-core with Jest

```bash
npm install --save-dev @axe-core/react jest-axe
```

```typescript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import MyComponent from './MyComponent';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  
  expect(results).toHaveNoViolations();
});
```

### GitHub Actions Example

```yaml
name: Accessibility Tests
on: [push, pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm ci
      - run: npm run test:a11y
      - run: npm run lint:a11y
```

## Testing Checklist

### Before Launch

#### Visual Design
```
[ ] Minimum text size: 14px
[ ] Line height >= 1.5
[ ] Generous spacing between elements
[ ] Clear visual hierarchy
[ ] Sufficient color contrast (4.5:1 normal, 3:1 large)
[ ] Not relying on color alone to convey meaning
```

#### Interaction
```
[ ] Touch targets >= 44x44px (WCAG AA) or 48x48px (AAA)
[ ] Visible focus indicators on all interactive elements
[ ] Keyboard shortcuts don't conflict with browser
[ ] No auto-playing audio/video without controls
[ ] Moving content can be paused
```

#### Content
```
[ ] All images have descriptive alt text
[ ] Form inputs have associated labels
[ ] Error messages are clear and specific
[ ] Instructions don't rely on sensory characteristics
[ ] Page language is specified
[ ] Links have descriptive text
```

#### Navigation
```
[ ] Logical heading hierarchy (no skipping H1-H6)
[ ] Skip links to main content
[ ] Consistent navigation across pages
[ ] Current page indicated in navigation
[ ] Multiple ways to find content (search, sitemap)
```

#### Forms
```
[ ] All inputs have labels
[ ] Required fields marked
[ ] Error messages appear near input
[ ] Help text provided for complex fields
[ ] Successful submission is confirmed
[ ] Form can be completed with keyboard alone
```

#### Media
```
[ ] Videos have captions
[ ] Videos have transcripts
[ ] Audio descriptions provided
[ ] Synchronized media controls work
```

## WCAG Conformance Levels

### Level A (Minimum)
- Text alternatives for images
- Basic keyboard navigation
- Color not sole means of info
- Error identification

### Level AA (Recommended) ⭐
- 4.5:1 color contrast (normal text)
- 3:1 color contrast (large text)
- Captions for video
- Focus visible
- Page title present
- Consistent navigation
- Heading hierarchy

### Level AAA (Enhanced)
- 7:1 color contrast (normal text)
- 4.5:1 color contrast (large text)
- Audio descriptions for video
- Extended captions for live media
- Sign language interpretation

## Performance Impact

Using A11y Toolkit has minimal impact:

```javascript
// Bundle size
// Core: ~8KB (gzipped)
// React components: +12KB
// Total: ~20KB for full feature set

// Runtime performance
// Config initialization: < 1ms
// Component render: same as alternatives
// Utility functions: < 1ms
```

## Monitoring Accessibility

### Regular Audits
- Run automated tests weekly
- Manual testing monthly
- User testing with real people with disabilities
- Track accessibility metrics over time

### Accessibility Issues Tracker
```javascript
// Log issues for follow-up
const a11yIssues = [
  {
    severity: 'critical',
    component: 'LoginForm',
    issue: 'No form label on email input',
    wcag: '1.3.1 Info and Relationships',
    estimatedFix: '5 mins',
  },
];
```

## Resources

- **W3C WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Authoring Practices:** https://www.w3.org/WAI/ARIA/apg/
- **WebAIM:** https://webaim.org/
- **Accessibility in Government:** https://ux4g.gov.in/
- **MDN Accessibility:** https://developer.mozilla.org/en-US/docs/Web/Accessibility

---

**Accessibility testing is not optional—it's a requirement for inclusive design.** ♿
