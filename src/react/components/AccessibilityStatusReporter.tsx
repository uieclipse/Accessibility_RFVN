import React, { useState, useEffect, useMemo, useRef } from 'react';
import { auditPage, A11yAuditReport, AccessibilityAuditor } from '../../utils/accessibilityAuditor';

export interface AccessibilityStatusReporterProps {
  /**
   * Position of the status badge
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

  /**
   * Show as badge (small) or panel (detailed)
   */
  mode?: 'badge' | 'panel';

  /**
   * Auto-audit on interval (ms), 0 = no auto-audit
   */
  auditInterval?: number;

  /**
   * Callback when audit completes
   */
  onAuditComplete?: (report: A11yAuditReport) => void;

  /**
   * Custom colors
   */
  colors?: {
    excellent?: string;
    good?: string;
    fair?: string;
    poor?: string;
    textColor?: string;
  };

  /**
   * Show/hide details
   */
  showDetails?: boolean;

  /**
   * Enable download report
   */
  enableDownload?: boolean;

  /**
   * Z-index
   */
  zIndex?: number;
}

export const AccessibilityStatusReporter: React.FC<AccessibilityStatusReporterProps> = ({
  position = 'bottom-left',
  mode = 'badge',
  auditInterval = 0,
  onAuditComplete,
  colors = {},
  showDetails = true,
  enableDownload = true,
  zIndex = 40,
}) => {
  const [report, setReport] = useState<A11yAuditReport | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);

  // Keep callback in a ref so the effect doesn't re-run when the caller passes a new function reference
  const onAuditCompleteRef = useRef(onAuditComplete);
  useEffect(() => { onAuditCompleteRef.current = onAuditComplete; }, [onAuditComplete]);

  const defaultColors = useMemo(
    () => ({
      excellent: '#10b981',
      good: '#3b82f6',
      fair: '#f59e0b',
      poor: '#ef4444',
      textColor: '#ffffff',
      ...colors,
    }),
    [colors]
  );

  // Run initial audit
  useEffect(() => {
    const runAudit = async () => {
      setIsAuditing(true);
      try {
        const auditReport = auditPage();
        setReport(auditReport);
        onAuditCompleteRef.current?.(auditReport);
      } catch (error) {
        console.error('Accessibility audit failed:', error);
      } finally {
        setIsAuditing(false);
      }
    };

    runAudit();

    // Set up interval audit if specified
    if (auditInterval > 0) {
      const interval = setInterval(runAudit, auditInterval);
      return () => clearInterval(interval);
    }
  }, [auditInterval]); // onAuditComplete intentionally excluded — accessed via ref

  const getStatusColor = (score: number): string => {
    if (score >= 90) return defaultColors.excellent;
    if (score >= 70) return defaultColors.good;
    if (score >= 50) return defaultColors.fair;
    return defaultColors.poor;
  };

  const getStatusLabel = (score: number): string => {
    if (score >= 90) return '✅ Excellent';
    if (score >= 70) return '✅ Good';
    if (score >= 50) return '⚠️ Fair';
    return '❌ Poor';
  };

  const downloadReport = () => {
    if (!report) return;

    const json = JSON.stringify(report, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `a11y-report-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!report) {
    return (
      <div
        style={{
          position: 'fixed',
          ...(position === 'top-left' && { top: '1rem', left: '1rem' }),
          ...(position === 'top-right' && { top: '1rem', right: '1rem' }),
          ...(position === 'bottom-left' && { bottom: '1rem', left: '1rem' }),
          ...(position === 'bottom-right' && { bottom: '1rem', right: '1rem' }),
          zIndex,
        }}
      >
        <div
          style={{
            background: '#f3f4f6',
            padding: '0.75rem 1rem',
            borderRadius: '4px',
            fontSize: '0.875rem',
          }}
        >
          {isAuditing ? 'Scanning accessibility...' : 'Loading...'}
        </div>
      </div>
    );
  }

  const positionStyles = {
    'top-left': { top: '1rem', left: '1rem' },
    'top-right': { top: '1rem', right: '1rem' },
    'bottom-left': { bottom: '1rem', left: '1rem' },
    'bottom-right': { bottom: '1rem', right: '1rem' },
  };

  if (mode === 'badge') {
    return (
      <div
        style={{
          position: 'fixed',
          ...positionStyles[position],
          zIndex,
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: getStatusColor(report.scoreAA),
            color: defaultColors.textColor,
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          }}
          title={getStatusLabel(report.scoreAA)}
        >
          {report.scoreAA}
        </button>

        {isOpen && (
          <div
            style={{
              position: 'absolute',
              ...(position.includes('left') && { left: '80px' }),
              ...(position.includes('right') && { right: '80px' }),
              ...(position.includes('top') && { top: '0' }),
              ...(position.includes('bottom') && { bottom: '0' }),
              background: '#ffffff',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              padding: '1rem',
              minWidth: '300px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              zIndex: zIndex + 1,
            }}
          >
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>
              {getStatusLabel(report.scoreAA)}
            </h3>

            <div style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>
              <div>
                <strong>WCAG AA Score:</strong> {report.scoreAA}/100
              </div>
              <div>
                <strong>Errors:</strong> {report.errors}
              </div>
              <div>
                <strong>Warnings:</strong> {report.warnings}
              </div>
              <div>
                <strong>Info:</strong> {report.info}
              </div>
            </div>

            {showDetails && report.totalIssues > 0 && (
              <div
                style={{
                  background: '#f9fafb',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  marginTop: '0.75rem',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  fontSize: '0.8rem',
                }}
              >
                <strong>Top Issues:</strong>
                <ul style={{ margin: '0.5rem 0', paddingLeft: '1.25rem' }}>
                  {report.issues.slice(0, 5).map((issue) => (
                    <li key={issue.id} style={{ marginBottom: '0.25rem' }}>
                      {issue.severity === 'error' && '❌'}{' '}
                      {issue.severity === 'warning' && '⚠️'}{' '}
                      {issue.severity === 'info' && 'ℹ️'} {issue.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              {enableDownload && (
                <button
                  onClick={downloadReport}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                  }}
                >
                  Download Report
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  background: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Panel mode
  return (
    <div
      style={{
        position: 'fixed',
        ...positionStyles[position],
        zIndex,
        background: '#ffffff',
        border: `2px solid ${getStatusColor(report.scoreAA)}`,
        borderRadius: '8px',
        padding: '1.5rem',
        minWidth: '350px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.125rem', color: getStatusColor(report.scoreAA) }}>
          {getStatusLabel(report.scoreAA)}
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
          }}
        >
          {isOpen ? '−' : '+'}
        </button>
      </div>

      <div style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <strong>WCAG AA:</strong> <span style={{ color: getStatusColor(report.scoreAA) }}>{report.scoreAA}/100</span>
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <strong>Issues:</strong> {report.errors} errors, {report.warnings} warnings
        </div>
      </div>

      {isOpen && showDetails && (
        <div
          style={{
            background: '#f9fafb',
            padding: '1rem',
            borderRadius: '4px',
            marginTop: '1rem',
            maxHeight: '400px',
            overflowY: 'auto',
            fontSize: '0.85rem',
          }}
        >
          <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem' }}>Issues Found</h3>
          {report.issues.length === 0 ? (
            <p style={{ margin: 0, color: '#6b7280' }}>No accessibility issues found!</p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {report.issues.map((issue) => (
                <li key={issue.id} style={{ marginBottom: '0.75rem' }}>
                  <strong>{issue.description}</strong>
                  <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    {issue.criterion} • {issue.wcagLevel}
                  </div>
                  {issue.fix && (
                    <div style={{ color: '#059669', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                      💡 {issue.fix}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {enableDownload && (
        <button
          onClick={downloadReport}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginTop: '1rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          📥 Download Full Report
        </button>
      )}
    </div>
  );
};

export default AccessibilityStatusReporter;
