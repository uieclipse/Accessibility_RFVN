import React, { useRef, useState } from 'react';
import { KEYS, isArrowKey, getFocusableElements } from '../../utils/keyboard';

export interface NavItem {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  submenu?: NavItem[];
  id?: string;
}

export interface AccessibleNavProps {
  items: NavItem[];
  onNavigate?: (item: NavItem) => void;
  skipLinkId?: string;
  ariaLabel?: string;
  className?: string;
}

export const AccessibleNav: React.FC<AccessibleNavProps> = ({
  items,
  onNavigate,
  skipLinkId,
  ariaLabel = 'Main Navigation',
  className,
}) => {
  const navRef = useRef<HTMLElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === KEYS.ARROW_DOWN) {
      e.preventDefault();
      const nextIndex = index + 1 < items.length ? index + 1 : 0;
      setFocusedIndex(nextIndex);
    } else if (e.key === KEYS.ARROW_UP) {
      e.preventDefault();
      const prevIndex = index - 1 >= 0 ? index - 1 : items.length - 1;
      setFocusedIndex(prevIndex);
    } else if (e.key === KEYS.ENTER || e.key === KEYS.SPACE) {
      e.preventDefault();
      onNavigate?.(items[index]);
    }
  };

  return (
    <>
      {skipLinkId && (
        <a
          href={`#${skipLinkId}`}
          style={{
            position: 'absolute',
            left: '-10000px',
            zIndex: 999,
          }}
        >
          Skip to main content
        </a>
      )}

      <nav
        ref={navRef}
        aria-label={ariaLabel}
        className={className}
        role="navigation"
      >
        <ul role="menubar" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map((item, index) => (
            <li key={item.id || index} role="none">
              <a
                href={item.href || '#'}
                role="menuitem"
                onKeyDown={(e) => handleKeyDown(e, index)}
                onClick={(e) => {
                  onNavigate?.(item);
                  item.onClick?.(e);
                }}
                tabIndex={focusedIndex === index ? 0 : -1}
                onFocus={() => setFocusedIndex(index)}
              >
                {item.label}
              </a>

              {item.submenu && (
                <ul role="menu" style={{ listStyle: 'none', paddingLeft: '1.5em' }}>
                  {item.submenu.map((subitem, subindex) => (
                    <li key={subitem.id || subindex} role="none">
                      <a
                        href={subitem.href || '#'}
                        role="menuitem"
                        onClick={(e) => {
                          onNavigate?.(subitem);
                          subitem.onClick?.(e);
                        }}
                      >
                        {subitem.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default AccessibleNav;
