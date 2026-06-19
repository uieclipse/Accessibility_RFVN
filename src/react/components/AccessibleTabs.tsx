import React, { useState, useId } from 'react';
import { KEYS } from '../../utils/keyboard';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface AccessibleTabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export const AccessibleTabs: React.FC<AccessibleTabsProps> = ({
  tabs,
  defaultTabId,
  onChange,
  className,
}) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);
  const idPrefix = useId();

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
    onChange?.(tabId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let targetIndex = currentIndex;

    if (e.key === KEYS.ARROW_RIGHT || e.key === KEYS.ARROW_DOWN) {
      e.preventDefault();
      targetIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === KEYS.ARROW_LEFT || e.key === KEYS.ARROW_UP) {
      e.preventDefault();
      targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === KEYS.HOME) {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === KEYS.END) {
      e.preventDefault();
      targetIndex = tabs.length - 1;
    }

    const targetTabId = tabs[targetIndex].id;
    setActiveTabId(targetTabId);
    onChange?.(targetTabId);

    setTimeout(() => {
      document.getElementById(`${idPrefix}-tab-${targetTabId}`)?.focus();
    }, 0);
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Tabs"
        style={{
          display: 'flex',
          borderBottom: '2px solid #e5e7eb',
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`${idPrefix}-tab-${tab.id}`}
            role="tab"
            aria-selected={activeTabId === tab.id}
            aria-controls={`${idPrefix}-panel-${tab.id}`}
            tabIndex={activeTabId === tab.id ? 0 : -1}
            onClick={() => handleTabClick(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              borderBottom:
                activeTabId === tab.id ? '3px solid #3b82f6' : 'none',
              color: activeTabId === tab.id ? '#3b82f6' : '#6b7280',
              fontWeight: activeTabId === tab.id ? 'bold' : 'normal',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${idPrefix}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${idPrefix}-tab-${tab.id}`}
          hidden={activeTabId !== tab.id}
          style={{ padding: '1.5rem 0' }}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export default AccessibleTabs;
