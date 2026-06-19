# 🔍 Accessibility Monitoring & Auditing

**Comprehensive tools to scan, monitor, and report website accessibility issues with WCAG compliance scoring.**

---

## 📊 What's Included

### 1. **AccessibilityAuditor** - Scan for Issues
- Scans entire website DOM for accessibility violations
- Checks 15+ WCAG criteria
- Generates detailed reports with severity levels
- Calculates compliance scores (0-100)
- Provides fix suggestions

### 2. **A11yMonitor** - Real-time Monitoring
- Continuously monitors page for accessibility changes
- Watches DOM mutations
- Re-audits on specified interval
- Subscription pattern for observers
- Track changes over time

### 3. **AccessibilityStatusReporter** - Visual UI
- Displays accessibility score badge
- Shows issue summary
- Expandable details panel
- Download reports as JSON
- Real-time status updates

---

## 🚀 Quick Start

### Basic Audit

```tsx
import { auditPage } from '@a11y-toolkit/core/utils';

// Run one-time audit
const report = auditPage();

console.log(`Score: ${report.scoreAA}/100`);
console.log(`Errors: ${report.errors}`);
console.log(`Issues: ${report.issues}`);
```

### Show Status Badge

```tsx
import { AccessibilityStatusReporter } from '@a11y-toolkit/core';

export default function App() {
  return (
    <>
      {/* Your app */}
      <AccessibilityStatusReporter
        position="bottom-right"
        mode="badge"
        auditInterval={5000}
      />
    </>
  );
}
```

### Real-time Monitoring

```tsx
import { A11yMonitor } from '@a11y-toolkit/core/utils';

const monitor = new A11yMonitor();

monitor.subscribe((report) => {
  console.log(`Current score: ${report.scoreAA}`);
  console.log(`Issues found: ${report.totalIssues}`);
});

monitor.start(5000); // Audit every 5 seconds
```

---

## 📋 AccessibilityAuditor API

### Run Audit

```typescript
import { AccessibilityAuditor, auditPage } from '@a11y-toolkit/core/utils';

// Method 1: Quick function
const report = auditPage();

// Method 2: Class instance
const auditor = new AccessibilityAuditor();
const report = auditor.audit();
```

### Report Structure

```typescript
interface A11yAuditReport {
  timestamp: Date;           // When audit ran
  url: string;              // Page URL
  totalIssues: number;      // Total issue count
  errors: number;           // Critical errors
  warnings: number;         // Warnings
  info: number;             // Info-level issues
  issues: A11yIssue[];      // List of all issues
  scoreA: number;           // 0-100 WCAG A score
  scoreAA: number;          // 0-100 WCAG AA score
  scoreAAA: number;         // 0-100 WCAG AAA score
  summary: string;          // Human-readable summary
}
```

### Issue Structure

```typescript
interface A11yIssue {
  id: string;                    // Unique ID
  severity: 'error' | 'warning' | 'info';
  wcagLevel: 'A' | 'AA' | 'AAA'; // WCAG criterion
  criterion: string;             // WCAG criterion name
  description: string;           // Issue description
  element?: HTMLElement;         // Affected element
  selector?: string;             // CSS selector
  fix?: string;                  // Suggested fix
  count: number;                 // How many found
}
```

### Example Report

```json
{
  "timestamp": "2026-06-18T16:00:00.000Z",
  "url": "https://example.com",
  "totalIssues": 5,
  "errors": 2,
  "warnings": 3,
  "info": 0,
  "scoreA": 85,
  "scoreAA": 70,
  "scoreAAA": 50,
  "summary": "⚠️ Fair. 2 error(s), 3 warning(s). WCAG AA Score: 70/100. Improvements needed.",
  "issues": [
    {
      "id": "images-no-alt",
      "severity": "error",
      "wcagLevel": "A",
      "criterion": "1.1.1 Non-text Content",
      "description": "Found 3 image(s) without alt text",
      "fix": "Add descriptive alt attributes to all images",
      "count": 3
    }
  ]
}
```

---

## 👁️ What Gets Audited?

### Images (1.1.1 Non-text Content)
- ✅ Missing alt text
- ✅ Poor alt text (generic like "image", "photo")
- ✅ Decorative images marked properly

### Links (2.4.4 Link Purpose)
- ✅ Missing link text
- ✅ Vague link text ("Click here", "Read more")
- ✅ Keyboard accessible links

### Headings (1.3.1 Info and Relationships)
- ✅ Missing h1 heading
- ✅ Multiple h1 headings
- ✅ Heading hierarchy

### Forms (1.3.1 Info and Relationships)
- ✅ Form fields without labels
- ✅ Missing input IDs
- ✅ Missing aria-label attributes

### Color & Contrast (1.4.3 Contrast)
- ✅ Basic contrast detection
- ✅ Color-only information (1.4.1)
- ⚠️ Note: Full contrast checking requires additional tools

### Keyboard Navigation (2.1.1 Keyboard)
- ✅ Focusable elements count
- ✅ onclick without keyboard support
- ✅ Tab order issues

### ARIA & Semantic HTML
- ✅ Live regions (aria-live)
- ✅ Proper element roles
- ✅ Button accessibility

### Page Configuration
- ✅ Page language attribute (3.1.1)
- ✅ Focus visible indicators (2.4.7)
- ✅ Auto-playing content (2.2.2)
- ✅ Skip links (2.4.1)

---

## 🔄 A11yMonitor - Real-time Monitoring

### Start Monitoring

```typescript
import { A11yMonitor } from '@a11y-toolkit/core/utils';

const monitor = new A11yMonitor();

// Run audit every 5 seconds
monitor.start(5000);

// Subscribe to results
const unsubscribe = monitor.subscribe((report) => {
  console.log('Latest audit:', report);
  
  // Track changes
  if (report.errors > 0) {
    sendAlert('Accessibility issues found');
  }
});

// Stop monitoring when done
unsubscribe();
```

### Monitor with Callbacks

```typescript
const monitor = new A11yMonitor();

monitor.subscribe((report) => {
  // Update UI
  updateAccessibilityScore(report.scoreAA);
  
  // Log errors
  if (report.errors > 0) {
    console.error('A11y errors:', report.issues.filter(i => i.severity === 'error'));
  }
  
  // Send to analytics
  trackAccessibility({
    score: report.scoreAA,
    errors: report.errors,
    warnings: report.warnings,
  });
});

monitor.start();
```

### Get Current Report

```typescript
const monitor = new A11yMonitor();
monitor.start();

// Later...
const currentReport = monitor.getReport();
if (currentReport) {
  console.log(`Current score: ${currentReport.scoreAA}`);
}
```

---

## 📊 AccessibilityStatusReporter Component

### Badge Mode (Default)

```tsx
import { AccessibilityStatusReporter } from '@a11y-toolkit/core';

<AccessibilityStatusReporter
  position="bottom-right"
  mode="badge"
  auditInterval={5000}
  showDetails={true}
  enableDownload={true}
/>
```

**Result:** Circular badge showing score (0-100), clickable for details

### Panel Mode

```tsx
<AccessibilityStatusReporter
  position="bottom-left"
  mode="panel"
  auditInterval={10000}
  showDetails={true}
  enableDownload={true}
/>
```

**Result:** Always-visible panel with full details

### With Callbacks

```tsx
<AccessibilityStatusReporter
  onAuditComplete={(report) => {
    console.log('Audit results:', report);
    
    // Send to backend
    fetch('/api/accessibility', {
      method: 'POST',
      body: JSON.stringify(report),
    });
  }}
/>
```

### Custom Colors

```tsx
<AccessibilityStatusReporter
  colors={{
    excellent: '#10b981',  // Green for 90+
    good: '#3b82f6',       // Blue for 70-89
    fair: '#f59e0b',       // Amber for 50-69
    poor: '#ef4444',       // Red for <50
    textColor: '#ffffff',  // Text color
  }}
/>
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-left'` | Badge position |
| `mode` | `'badge' \| 'panel'` | `'badge'` | Display mode |
| `auditInterval` | `number` | `0` | Interval in ms (0 = no auto-audit) |
| `onAuditComplete` | `function` | - | Called after each audit |
| `colors` | `object` | defaults | Custom color scheme |
| `showDetails` | `boolean` | `true` | Show issue details |
| `enableDownload` | `boolean` | `true` | Show download button |
| `zIndex` | `number` | `40` | CSS z-index |

---

## 💡 Usage Examples

### Example 1: Developer Dashboard

```tsx
import { AccessibilityStatusReporter } from '@a11y-toolkit/core';
import { AccessibilityMenu } from '@a11y-toolkit/core';

export default function App() {
  return (
    <>
      {/* Accessibility menu for users */}
      <AccessibilityMenu position="top-right" />
      
      {/* Status reporter for developers */}
      <AccessibilityStatusReporter
        position="bottom-right"
        mode="badge"
        auditInterval={5000}
        onAuditComplete={(report) => {
          if (report.scoreAA < 70) {
            console.warn('Low accessibility score:', report.scoreAA);
          }
        }}
      />
      
      {/* Your app */}
      <YourApp />
    </>
  );
}
```

### Example 2: Real-time Monitoring Service

```typescript
import { A11yMonitor } from '@a11y-toolkit/core/utils';

class AccessibilityService {
  private monitor: A11yMonitor;
  private scores: number[] = [];

  constructor() {
    this.monitor = new A11yMonitor();
  }

  start() {
    this.monitor.subscribe((report) => {
      // Track score history
      this.scores.push(report.scoreAA);

      // Alert on regressions
      if (this.scores.length > 1) {
        const previousScore = this.scores[this.scores.length - 2];
        const currentScore = report.scoreAA;

        if (currentScore < previousScore - 10) {
          console.warn('Accessibility regression detected!');
          this.alertTeam(report);
        }
      }

      // Send to monitoring service
      this.reportToMonitoring(report);
    });

    this.monitor.start(10000); // Every 10 seconds
  }

  private alertTeam(report: A11yAuditReport) {
    // Send Slack/email alert
    fetch('/api/alerts/accessibility', {
      method: 'POST',
      body: JSON.stringify(report),
    });
  }

  private reportToMonitoring(report: A11yAuditReport) {
    // Send to monitoring service
    fetch('https://monitoring.example.com/accessibility', {
      method: 'POST',
      body: JSON.stringify({
        score: report.scoreAA,
        errors: report.errors,
        warnings: report.warnings,
        url: report.url,
        timestamp: report.timestamp,
      }),
    });
  }

  getScoreHistory() {
    return this.scores;
  }

  getAverageScore() {
    if (this.scores.length === 0) return 0;
    return this.scores.reduce((a, b) => a + b) / this.scores.length;
  }
}
```

### Example 3: Accessibility Report Generator

```typescript
import { auditPage } from '@a11y-toolkit/core/utils';

function generateAccessibilityReport() {
  const report = auditPage();

  const markdown = `
# Accessibility Audit Report
**Date:** ${report.timestamp}
**URL:** ${report.url}

## Summary
${report.summary}

## Scores
- **WCAG A:** ${report.scoreA}/100
- **WCAG AA:** ${report.scoreAA}/100
- **WCAG AAA:** ${report.scoreAAA}/100

## Issues Found
- **Errors:** ${report.errors}
- **Warnings:** ${report.warnings}
- **Info:** ${report.info}

## Details
${report.issues.map(issue => `
### ${issue.description}
- **Severity:** ${issue.severity}
- **WCAG Level:** ${issue.wcagLevel}
- **Criterion:** ${issue.criterion}
- **Fix:** ${issue.fix}
`).join('\n')}
`;

  return markdown;
}

// Download as file
const markdown = generateAccessibilityReport();
const blob = new Blob([markdown], { type: 'text/markdown' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `a11y-report-${new Date().toISOString()}.md`;
a.click();
```

### Example 4: CI/CD Integration

```typescript
// In your CI pipeline
import { auditPage } from '@a11y-toolkit/core/utils';

async function validateAccessibility() {
  // Load page in headless browser
  // const page = await browser.newPage();
  // await page.goto(process.env.SITE_URL);

  const report = auditPage();

  // Fail if score is below threshold
  if (report.scoreAA < 80) {
    console.error(`❌ Accessibility score too low: ${report.scoreAA}/100`);
    console.error('Errors:', report.issues.filter(i => i.severity === 'error'));
    process.exit(1);
  }

  console.log(`✅ Accessibility check passed: ${report.scoreAA}/100`);
}

validateAccessibility();
```

---

## 📈 Score Interpretation

| Score | Status | Action |
|-------|--------|--------|
| 90-100 | ✅ Excellent | Keep maintaining |
| 70-89 | ✅ Good | Minor improvements needed |
| 50-69 | ⚠️ Fair | Plan improvements |
| 0-49 | ❌ Poor | Critical work needed |

---

## 🔧 Advanced Configuration

### Exclude Certain Checks

```typescript
// Create custom auditor with filtered checks
class CustomAuditor extends AccessibilityAuditor {
  audit() {
    const report = super.audit();
    
    // Remove certain checks
    report.issues = report.issues.filter(
      issue => issue.id !== 'no-skip-link'
    );
    
    return report;
  }
}
```

### Integrate with Analytics

```tsx
<AccessibilityStatusReporter
  onAuditComplete={(report) => {
    // Track in Google Analytics
    gtag('event', 'accessibility_audit', {
      score: report.scoreAA,
      errors: report.errors,
      warnings: report.warnings,
      level: report.scoreAA >= 80 ? 'good' : 'needs_improvement',
    });
  }}
/>
```

### Send to Backend

```typescript
const monitor = new A11yMonitor();

monitor.subscribe(async (report) => {
  // Store accessibility metrics
  await fetch('/api/metrics/accessibility', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      scoreA: report.scoreA,
      scoreAA: report.scoreAA,
      scoreAAA: report.scoreAAA,
      errors: report.errors,
      warnings: report.warnings,
      timestamp: report.timestamp,
      url: report.url,
    }),
  });
});

monitor.start(300000); // Every 5 minutes
```

---

## 🎯 Best Practices

1. **Audit Regularly** - Set up continuous monitoring
2. **Fix Critical Errors** - Prioritize error-level issues
3. **Track Progress** - Monitor score over time
4. **Test Changes** - Re-audit after modifications
5. **Automate Checks** - Add to CI/CD pipeline
6. **User Testing** - Combine with manual testing
7. **Accessibility Focus** - Make it part of culture
8. **Document Issues** - Track and assign fixes

---

## 📝 Example Implementation

```tsx
import { AccessibilityMenu, AccessibilityStatusReporter } from '@a11y-toolkit/core';
import { A11yMonitor } from '@a11y-toolkit/core/utils';
import { useEffect, useState } from 'react';

export default function App() {
  const [a11yScore, setA11yScore] = useState(0);

  useEffect(() => {
    // Start monitoring
    const monitor = new A11yMonitor();
    
    monitor.subscribe((report) => {
      setA11yScore(report.scoreAA);
      
      // Log to backend
      fetch('/api/metrics/a11y', {
        method: 'POST',
        body: JSON.stringify(report),
      }).catch(console.error);
    });

    monitor.start(10000);
  }, []);

  return (
    <>
      {/* User-facing accessibility menu */}
      <AccessibilityMenu position="top-right" />

      {/* Developer status reporter */}
      {process.env.NODE_ENV === 'development' && (
        <AccessibilityStatusReporter
          position="bottom-right"
          mode="badge"
          auditInterval={5000}
        />
      )}

      {/* Your app */}
      <main>
        <h1>My Accessible App</h1>
        <p>Score: {a11yScore}/100</p>
      </main>
    </>
  );
}
```

---

## 📚 See Also

- [AccessibilityMenu Configuration](./ACCESSIBILITY_MENU_CONFIG.md)
- [Quick Start](./QUICK_START.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Start monitoring accessibility today!** 🔍✨

