/**
 * Accessibility Auditor - Scans DOM for accessibility issues
 * Returns detailed reports of WCAG 2.1 violations
 */

export interface A11yIssue {
  id: string;
  severity: 'error' | 'warning' | 'info';
  wcagLevel: 'A' | 'AA' | 'AAA';
  criterion: string;
  description: string;
  element?: HTMLElement;
  selector?: string;
  fix?: string;
  count: number;
}

export interface A11yAuditReport {
  timestamp: Date;
  url: string;
  totalIssues: number;
  errors: number;
  warnings: number;
  info: number;
  issues: A11yIssue[];
  scoreA: number; // 0-100 WCAG A compliance
  scoreAA: number; // 0-100 WCAG AA compliance
  scoreAAA: number; // 0-100 WCAG AAA compliance
  summary: string;
}

export class AccessibilityAuditor {
  private issues: Map<string, A11yIssue> = new Map();

  /**
   * Run complete accessibility audit
   */
  audit(): A11yAuditReport {
    this.issues.clear();

    // Run all checks
    this.checkImages();
    this.checkLinks();
    this.checkHeadings();
    this.checkForm();
    this.checkContrast();
    this.checkKeyboardNav();
    this.checkLiveRegions();
    this.checkPageLanguage();
    this.checkFocusVisible();
    this.checkAltText();
    this.checkLabels();
    this.checkButtons();
    this.checkColorOnly();
    this.checkMovingContent();
    this.checkSkipLinks();
    // WCAG AAA checks
    this.checkEnhancedContrast();
    this.checkReadingLevel();
    this.checkAbbreviations();
    this.checkPronunciation();
    this.checkLinkPurposeAAA();
    this.checkNoTimingConstraints();
    this.checkInterruptionsControl();
    this.checkLocationBreadcrumb();
    this.checkSectionHeadings();
    this.checkFocusAppearance();

    return this.generateReport();
  }

  /**
   * Check for images without alt text
   */
  private checkImages(): void {
    const images = document.querySelectorAll('img');
    let count = 0;

    images.forEach((img) => {
      const alt = img.getAttribute('alt');
      if (!alt || alt.trim() === '') {
        count++;
      }
    });

    if (count > 0) {
      this.addIssue({
        id: 'images-no-alt',
        severity: 'error',
        wcagLevel: 'A',
        criterion: '1.1.1 Non-text Content',
        description: `Found ${count} image(s) without alt text`,
        fix: 'Add descriptive alt attributes to all images',
        count,
      });
    }
  }

  /**
   * Check for links without accessible text
   */
  private checkLinks(): void {
    const links = document.querySelectorAll('a');
    let count = 0;

    links.forEach((link) => {
      const text = link.textContent?.trim();
      const ariaLabel = link.getAttribute('aria-label');
      const title = link.getAttribute('title');

      if (!text && !ariaLabel && !title) {
        count++;
      }
    });

    if (count > 0) {
      this.addIssue({
        id: 'links-no-text',
        severity: 'error',
        wcagLevel: 'A',
        criterion: '2.4.4 Link Purpose',
        description: `Found ${count} link(s) without accessible text`,
        fix: 'Ensure all links have descriptive text or aria-label',
        count,
      });
    }

    // Check for "Click here" links
    const clickHereLinks = Array.from(links).filter(
      (link) =>
        link.textContent?.trim().toLowerCase().includes('click here') ||
        link.textContent?.trim().toLowerCase().includes('read more')
    );

    if (clickHereLinks.length > 0) {
      this.addIssue({
        id: 'links-vague-text',
        severity: 'warning',
        wcagLevel: 'AA',
        criterion: '2.4.4 Link Purpose',
        description: `Found ${clickHereLinks.length} link(s) with vague text like "Click here"`,
        fix: 'Use descriptive link text that makes sense out of context',
        count: clickHereLinks.length,
      });
    }
  }

  /**
   * Check heading structure
   */
  private checkHeadings(): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

    if (headings.length === 0) {
      this.addIssue({
        id: 'no-headings',
        severity: 'warning',
        wcagLevel: 'A',
        criterion: '1.3.1 Info and Relationships',
        description: 'No headings found on page',
        fix: 'Add proper heading hierarchy (h1, h2, h3, etc.)',
        count: 1,
      });
      return;
    }

    const h1s = document.querySelectorAll('h1');
    if (h1s.length === 0) {
      this.addIssue({
        id: 'no-h1',
        severity: 'error',
        wcagLevel: 'A',
        criterion: '1.3.1 Info and Relationships',
        description: 'No h1 heading found on page',
        fix: 'Add exactly one h1 heading per page',
        count: 1,
      });
    } else if (h1s.length > 1) {
      this.addIssue({
        id: 'multiple-h1',
        severity: 'warning',
        wcagLevel: 'AA',
        criterion: '1.3.1 Info and Relationships',
        description: `Found ${h1s.length} h1 headings (should be only one)`,
        fix: 'Use only one h1 per page',
        count: h1s.length,
      });
    }
  }

  /**
   * Check form accessibility
   */
  private checkForm(): void {
    const inputs = document.querySelectorAll('input, textarea, select');
    let missingLabels = 0;

    inputs.forEach((input) => {
      const id = input.getAttribute('id');
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');

      if (!ariaLabel && !ariaLabelledBy) {
        if (id) {
          const label = document.querySelector(`label[for="${id}"]`);
          if (!label) missingLabels++;
        } else {
          missingLabels++;
        }
      }
    });

    if (missingLabels > 0) {
      this.addIssue({
        id: 'form-missing-labels',
        severity: 'error',
        wcagLevel: 'A',
        criterion: '1.3.1 Info and Relationships',
        description: `Found ${missingLabels} form field(s) without labels`,
        fix: 'Associate labels with form inputs using <label> or aria-label',
        count: missingLabels,
      });
    }
  }

  /**
   * Check color contrast (basic check)
   */
  private checkContrast(): void {
    // This is a simplified check - full contrast checking requires more complex logic
    const textElements = document.querySelectorAll('p, a, button, span, li');
    let lowContrastCount = 0;

    textElements.forEach((el) => {
      const style = window.getComputedStyle(el);
      const bg = style.backgroundColor;
      const color = style.color;

      // Check for light text on light background or dark on dark (basic check)
      if (bg && color) {
        if ((bg.includes('rgb(255') && color.includes('rgb(255')) ||
            (bg.includes('rgb(0') && color.includes('rgb(0'))) {
          lowContrastCount++;
        }
      }
    });

    if (lowContrastCount > 0) {
      this.addIssue({
        id: 'low-contrast',
        severity: 'warning',
        wcagLevel: 'AA',
        criterion: '1.4.3 Contrast (Minimum)',
        description: `Found ${lowContrastCount} element(s) with potentially low contrast`,
        fix: 'Ensure text has at least 4.5:1 contrast ratio (AA) or 7:1 (AAA)',
        count: lowContrastCount,
      });
    }
  }

  /**
   * Check keyboard navigation
   */
  private checkKeyboardNav(): void {
    const clickableElements = document.querySelectorAll('[onclick], .button, [role="button"]');
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');

    if (focusableElements.length === 0) {
      this.addIssue({
        id: 'no-focusable',
        severity: 'warning',
        wcagLevel: 'A',
        criterion: '2.1.1 Keyboard',
        description: 'No focusable elements found on page',
        fix: 'Ensure interactive elements are keyboard accessible',
        count: 1,
      });
    }

    // Check for onclick without keyboard support
    let onclickCount = 0;
    clickableElements.forEach((el) => {
      const hasKeyboardEvent = el.hasAttribute('onclick') &&
        !el.hasAttribute('onkeydown') &&
        !el.hasAttribute('onkeyup');
      if (hasKeyboardEvent) {
        onclickCount++;
      }
    });

    if (onclickCount > 0) {
      this.addIssue({
        id: 'onclick-no-keyboard',
        severity: 'warning',
        wcagLevel: 'A',
        criterion: '2.1.1 Keyboard',
        description: `Found ${onclickCount} element(s) with onclick but no keyboard support`,
        fix: 'Add keyboard event handlers (onkeydown/onkeyup) or use semantic HTML buttons',
        count: onclickCount,
      });
    }
  }

  /**
   * Check for ARIA live regions
   */
  private checkLiveRegions(): void {
    // Check if page uses dynamic content but no live regions
    const dynamicContent = document.querySelectorAll('[role="status"], [aria-live]');

    if (dynamicContent.length === 0) {
      const modals = document.querySelectorAll('[role="dialog"]');
      if (modals.length > 0) {
        this.addIssue({
          id: 'no-live-regions',
          severity: 'info',
          wcagLevel: 'AA',
          criterion: '4.1.3 Status Messages',
          description: 'Page uses dynamic content but no ARIA live regions found',
          fix: 'Use aria-live="polite" or aria-live="assertive" for dynamic updates',
          count: 1,
        });
      }
    }
  }

  /**
   * Check page language
   */
  private checkPageLanguage(): void {
    const html = document.documentElement;
    const lang = html.getAttribute('lang');

    if (!lang || lang.trim() === '') {
      this.addIssue({
        id: 'no-page-language',
        severity: 'error',
        wcagLevel: 'A',
        criterion: '3.1.1 Language of Page',
        description: 'Page language not specified',
        fix: 'Add lang attribute to <html> tag (e.g., lang="en")',
        count: 1,
      });
    }
  }

  /**
   * Check for visible focus indicators
   */
  private checkFocusVisible(): void {
    // This is a simplified check - would need to actually test focus
    const buttons = document.querySelectorAll('button');
    let count = 0;

    buttons.forEach((btn) => {
      const style = window.getComputedStyle(btn);
      const outline = style.outline;
      const boxShadow = style.boxShadow;

      if (outline === 'none' && boxShadow === 'none') {
        count++;
      }
    });

    if (count > 0) {
      this.addIssue({
        id: 'no-focus-visible',
        severity: 'warning',
        wcagLevel: 'AA',
        criterion: '2.4.7 Focus Visible',
        description: `Found ${count} button(s) without visible focus indicator`,
        fix: 'Ensure :focus-visible state has clear styling (outline, border, shadow)',
        count,
      });
    }
  }

  /**
   * Check alt text quality
   */
  private checkAltText(): void {
    const images = document.querySelectorAll('img');
    let poorAltCount = 0;

    images.forEach((img) => {
      const alt = img.getAttribute('alt');
      if (alt) {
        // Check for poor alt text patterns
        if (alt.toLowerCase() === 'image' ||
            alt.toLowerCase() === 'photo' ||
            alt.toLowerCase() === 'picture' ||
            alt.match(/^\d+$/)) {
          poorAltCount++;
        }
      }
    });

    if (poorAltCount > 0) {
      this.addIssue({
        id: 'poor-alt-text',
        severity: 'warning',
        wcagLevel: 'AA',
        criterion: '1.1.1 Non-text Content',
        description: `Found ${poorAltCount} image(s) with poor alt text`,
        fix: 'Write descriptive alt text that explains the image content',
        count: poorAltCount,
      });
    }
  }

  /**
   * Check form labels
   */
  private checkLabels(): void {
    const buttons = document.querySelectorAll('button');
    let noTextCount = 0;

    buttons.forEach((btn) => {
      const text = btn.textContent?.trim();
      const ariaLabel = btn.getAttribute('aria-label');
      const ariaLabelledBy = btn.getAttribute('aria-labelledby');

      if (!text && !ariaLabel && !ariaLabelledBy) {
        noTextCount++;
      }
    });

    if (noTextCount > 0) {
      this.addIssue({
        id: 'buttons-no-label',
        severity: 'error',
        wcagLevel: 'A',
        criterion: '1.1.1 Non-text Content',
        description: `Found ${noTextCount} button(s) without labels`,
        fix: 'Add visible text or aria-label to all buttons',
        count: noTextCount,
      });
    }
  }

  /**
   * Check button roles
   */
  private checkButtons(): void {
    const divButtons = document.querySelectorAll('div[onclick]');
    if (divButtons.length > 0) {
      this.addIssue({
        id: 'div-as-button',
        severity: 'warning',
        wcagLevel: 'A',
        criterion: '1.3.1 Info and Relationships',
        description: `Found ${divButtons.length} div(s) used as button`,
        fix: 'Use <button> element instead of div with onclick',
        count: divButtons.length,
      });
    }
  }

  /**
   * Check for color-only information
   */
  private checkColorOnly(): void {
    const elements = document.querySelectorAll('[style*="color"]');
    let count = 0;

    elements.forEach((el) => {
      const text = el.textContent?.trim();
      if (text && text.length < 50) {
        // Simple check for color-only conveyed info
        count++;
      }
    });

    if (count > 0) {
      this.addIssue({
        id: 'color-only-info',
        severity: 'info',
        wcagLevel: 'A',
        criterion: '1.4.1 Use of Color',
        description: 'Ensure information is not conveyed by color alone',
        fix: 'Use icons, text, or patterns in addition to color',
        count: 1,
      });
    }
  }

  /**
   * Check for auto-playing content
   */
  private checkMovingContent(): void {
    const videos = document.querySelectorAll('video[autoplay], [autoplay]');
    if (videos.length > 0) {
      this.addIssue({
        id: 'autoplay-content',
        severity: 'warning',
        wcagLevel: 'A',
        criterion: '2.2.2 Pause, Stop, Hide',
        description: `Found ${videos.length} auto-playing content`,
        fix: 'Remove autoplay or provide pause/stop controls',
        count: videos.length,
      });
    }
  }

  /**
   * Check for skip links
   */
  private checkSkipLinks(): void {
    const skipLink = document.querySelector('a[href="#main"], a.skip-link');
    if (!skipLink) {
      this.addIssue({
        id: 'no-skip-link',
        severity: 'warning',
        wcagLevel: 'AA',
        criterion: '2.4.1 Bypass Blocks',
        description: 'No skip link found to bypass navigation',
        fix: 'Add a skip link as first focusable element on page',
        count: 1,
      });
    }
  }

  // ── WCAG AAA Checks ──────────────────────────────────────────────────────────

  /** 1.4.6 Contrast (Enhanced) — AAA: 7:1 for normal text, 4.5:1 for large text */
  private checkEnhancedContrast(): void {
    const textElements = document.querySelectorAll('p, span, a, li, td, th, label');
    let count = 0;
    textElements.forEach((el) => {
      const style = window.getComputedStyle(el);
      const fontSize = parseFloat(style.fontSize);
      const isBold = parseInt(style.fontWeight) >= 700;
      const isLarge = fontSize >= 18 || (isBold && fontSize >= 14);
      const bg = style.backgroundColor;
      const color = style.color;
      // Simple heuristic: both white or both dark = low contrast
      if (bg && color) {
        const bothLight = bg.includes('rgb(255') && color.includes('rgb(255');
        const bothDark = bg.includes('rgb(0') && color.includes('rgb(0');
        if ((bothLight || bothDark) && !isLarge) count++;
      }
    });
    if (count > 0) {
      this.addIssue({
        id: 'enhanced-contrast',
        severity: 'warning',
        wcagLevel: 'AAA',
        criterion: '1.4.6 Contrast (Enhanced)',
        description: `Found ${count} element(s) that may not meet 7:1 enhanced contrast ratio`,
        fix: 'Ensure normal text has 7:1 contrast ratio and large text has 4.5:1 for WCAG AAA',
        count,
      });
    }
  }

  /** 3.1.5 Reading Level — AAA: provide simplified content or reading aids */
  private checkReadingLevel(): void {
    const paragraphs = document.querySelectorAll('p');
    let longSentenceCount = 0;
    paragraphs.forEach((p) => {
      const text = p.textContent || '';
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      sentences.forEach(s => {
        if (s.trim().split(/\s+/).length > 30) longSentenceCount++;
      });
    });
    if (longSentenceCount > 2) {
      this.addIssue({
        id: 'reading-level',
        severity: 'info',
        wcagLevel: 'AAA',
        criterion: '3.1.5 Reading Level',
        description: `Found ${longSentenceCount} very long sentence(s) — content may be hard to read`,
        fix: 'Provide simplified alternatives or summaries for complex content (AAA)',
        count: longSentenceCount,
      });
    }
  }

  /** 3.1.4 Abbreviations — AAA: expand abbreviations */
  private checkAbbreviations(): void {
    const abbrs = document.querySelectorAll('abbr');
    let noTitleCount = 0;
    abbrs.forEach((abbr) => {
      if (!abbr.getAttribute('title')) noTitleCount++;
    });
    if (noTitleCount > 0) {
      this.addIssue({
        id: 'abbr-no-expansion',
        severity: 'warning',
        wcagLevel: 'AAA',
        criterion: '3.1.4 Abbreviations',
        description: `Found ${noTitleCount} <abbr> element(s) without title expansion`,
        fix: 'Add title attribute to all <abbr> elements with the full expansion',
        count: noTitleCount,
      });
    }
  }

  /** 3.1.6 Pronunciation — AAA: provide pronunciation for ambiguous words */
  private checkPronunciation(): void {
    const rubyElements = document.querySelectorAll('ruby');
    const hasPronunciation = rubyElements.length > 0;
    if (!hasPronunciation) {
      this.addIssue({
        id: 'pronunciation',
        severity: 'info',
        wcagLevel: 'AAA',
        criterion: '3.1.6 Pronunciation',
        description: 'No pronunciation aids (<ruby> elements) found',
        fix: 'For words with ambiguous pronunciation, provide phonetic guides using <ruby> or links to pronunciation (AAA)',
        count: 1,
      });
    }
  }

  /** 2.4.9 Link Purpose (Link Only) — AAA: link text alone must be descriptive */
  private checkLinkPurposeAAA(): void {
    const links = document.querySelectorAll('a');
    let vagueCount = 0;
    const vaguePatterns = ['here', 'more', 'link', 'this', 'click', 'go'];
    links.forEach((link) => {
      const text = (link.textContent || '').trim().toLowerCase();
      const ariaLabel = link.getAttribute('aria-label') || '';
      if (!ariaLabel && vaguePatterns.includes(text)) vagueCount++;
    });
    if (vagueCount > 0) {
      this.addIssue({
        id: 'link-purpose-aaa',
        severity: 'warning',
        wcagLevel: 'AAA',
        criterion: '2.4.9 Link Purpose (Link Only)',
        description: `Found ${vagueCount} link(s) whose text is not descriptive when read alone`,
        fix: 'Ensure each link text is descriptive without surrounding context (AAA)',
        count: vagueCount,
      });
    }
  }

  /** 2.2.3 No Timing — AAA: no time limits on user tasks */
  private checkNoTimingConstraints(): void {
    const timeouts = document.querySelectorAll('[data-timeout], [data-countdown], .timer, .countdown');
    if (timeouts.length > 0) {
      this.addIssue({
        id: 'timing-constraints',
        severity: 'warning',
        wcagLevel: 'AAA',
        criterion: '2.2.3 No Timing',
        description: `Found ${timeouts.length} element(s) that may impose time limits`,
        fix: 'Remove time limits entirely for AAA compliance, or allow users to turn off/extend them',
        count: timeouts.length,
      });
    }
  }

  /** 2.2.4 Interruptions — AAA: user can postpone or suppress interruptions */
  private checkInterruptionsControl(): void {
    const alerts = document.querySelectorAll('[aria-live="assertive"], [role="alert"]');
    if (alerts.length > 0) {
      this.addIssue({
        id: 'interruptions',
        severity: 'info',
        wcagLevel: 'AAA',
        criterion: '2.2.4 Interruptions',
        description: `Found ${alerts.length} assertive live region(s) — interruptions may not be suppresable`,
        fix: 'Allow users to postpone or suppress non-emergency interruptions (AAA)',
        count: alerts.length,
      });
    }
  }

  /** 2.4.8 Location — AAA: breadcrumb or sitemap shows current location */
  private checkLocationBreadcrumb(): void {
    const breadcrumb = document.querySelector('[aria-label="breadcrumb"], nav[aria-label*="bread"], .breadcrumb');
    if (!breadcrumb) {
      this.addIssue({
        id: 'no-breadcrumb',
        severity: 'info',
        wcagLevel: 'AAA',
        criterion: '2.4.8 Location',
        description: 'No breadcrumb navigation found',
        fix: 'Add breadcrumb navigation so users know their location within the site (AAA)',
        count: 1,
      });
    }
  }

  /** 2.4.10 Section Headings — AAA: use headings to organize content sections */
  private checkSectionHeadings(): void {
    const sections = document.querySelectorAll('section, article, aside, main');
    let noHeadingCount = 0;
    sections.forEach((section) => {
      const heading = section.querySelector('h1,h2,h3,h4,h5,h6,[role="heading"]');
      if (!heading) noHeadingCount++;
    });
    if (noHeadingCount > 0) {
      this.addIssue({
        id: 'section-no-heading',
        severity: 'info',
        wcagLevel: 'AAA',
        criterion: '2.4.10 Section Headings',
        description: `Found ${noHeadingCount} section(s) without headings`,
        fix: 'Add headings to all major content sections to help users navigate (AAA)',
        count: noHeadingCount,
      });
    }
  }

  /** 2.4.11 Focus Appearance — AAA: focus indicator must be clearly visible */
  private checkFocusAppearance(): void {
    const interactive = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
    let count = 0;
    interactive.forEach((el) => {
      const style = window.getComputedStyle(el);
      if (style.outlineStyle === 'none' || style.outlineWidth === '0px') count++;
    });
    if (count > 0) {
      this.addIssue({
        id: 'focus-appearance',
        severity: 'warning',
        wcagLevel: 'AAA',
        criterion: '2.4.11 Focus Appearance',
        description: `Found ${count} interactive element(s) with no visible focus outline`,
        fix: 'Ensure focus indicator has minimum 2px contrast and sufficient area (AAA)',
        count,
      });
    }
  }

  /**
   * Add issue to report
   */
  private addIssue(issue: A11yIssue | Omit<A11yIssue, 'element' | 'selector'>): void {
    const issueWithId = issue as any;
    const id = issueWithId.id;
    if (!this.issues.has(id)) {
      this.issues.set(id, {
        ...issueWithId,
      } as A11yIssue);
    }
  }

  /**
   * Generate accessibility report
   */
  private generateReport(): A11yAuditReport {
    const issueArray = Array.from(this.issues.values());

    const errors = issueArray.filter((i) => i.severity === 'error').length;
    const warnings = issueArray.filter((i) => i.severity === 'warning').length;
    const info = issueArray.filter((i) => i.severity === 'info').length;

    // Calculate compliance scores
    const aIssues = issueArray.filter((i) => i.wcagLevel === 'A');
    const aaIssues = issueArray.filter((i) => i.wcagLevel === 'A' || i.wcagLevel === 'AA');
    const aaaIssues = issueArray;

    const scoreA = Math.max(0, 100 - aIssues.filter((i) => i.severity === 'error').length * 5);
    const scoreAA = Math.max(0, 100 - aaIssues.filter((i) => i.severity === 'error').length * 3 - aaIssues.filter((i) => i.severity === 'warning').length);
    const aaaErrors = aaaIssues.filter((i) => i.severity === 'error').length;
    const aaaWarnings = aaaIssues.filter((i) => i.severity === 'warning').length;
    const aaaInfo = aaaIssues.filter((i) => i.severity === 'info').length;
    const scoreAAA = Math.max(0, 100 - aaaErrors * 2 - aaaWarnings - Math.floor(aaaInfo * 0.5));

    const summary = this.generateSummary(errors, warnings, scoreAA, scoreAAA);

    return {
      timestamp: new Date(),
      url: window.location.href,
      totalIssues: issueArray.length,
      errors,
      warnings,
      info,
      issues: issueArray,
      scoreA,
      scoreAA,
      scoreAAA,
      summary,
    };
  }

  /**
   * Generate summary text
   */
  private generateSummary(errors: number, warnings: number, score: number, scoreAAA: number): string {
    if (errors === 0 && warnings === 0) {
      return `✅ Excellent! No accessibility issues found. WCAG AA: ${score}/100 | AAA: ${scoreAAA}/100`;
    }
    if (score >= 80) {
      return `✅ Good! ${errors} error(s), ${warnings} warning(s). WCAG AA: ${score}/100 | AAA: ${scoreAAA}/100`;
    }
    if (score >= 60) {
      return `⚠️ Fair. ${errors} error(s), ${warnings} warning(s). WCAG AA: ${score}/100 | AAA: ${scoreAAA}/100. Improvements needed.`;
    }
    return `❌ Poor. ${errors} error(s), ${warnings} warning(s). WCAG AA: ${score}/100 | AAA: ${scoreAAA}/100. Significant improvements needed.`;
  }
}

/**
 * Quick audit function
 */
export function auditPage(): A11yAuditReport {
  const auditor = new AccessibilityAuditor();
  return auditor.audit();
}

/**
 * Monitor accessibility in real-time
 */
export class A11yMonitor {
  private auditor: AccessibilityAuditor;
  private lastReport: A11yAuditReport | null = null;
  private observers: ((report: A11yAuditReport) => void)[] = [];

  constructor() {
    this.auditor = new AccessibilityAuditor();
  }

  /**
   * Start monitoring
   */
  start(interval: number = 5000): void {
    // Initial audit
    this.audit();

    // Re-audit on interval
    setInterval(() => this.audit(), interval);

    // Re-audit on DOM changes
    const observer = new MutationObserver(() => {
      this.audit();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  }

  /**
   * Run audit and notify observers
   */
  private audit(): void {
    this.lastReport = this.auditor.audit();
    this.observers.forEach((cb) => cb(this.lastReport!));
  }

  /**
   * Subscribe to audit results
   */
  subscribe(callback: (report: A11yAuditReport) => void): () => void {
    this.observers.push(callback);
    if (this.lastReport) {
      callback(this.lastReport);
    }

    // Return unsubscribe function
    return () => {
      this.observers = this.observers.filter((cb) => cb !== callback);
    };
  }

  /**
   * Get latest report
   */
  getReport(): A11yAuditReport | null {
    return this.lastReport;
  }
}
