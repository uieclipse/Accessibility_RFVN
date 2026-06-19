import React from 'react';

export interface AccessibleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
  ariaLabel?: string;
  loading?: boolean;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  label,
  icon,
  ariaLabel,
  loading = false,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      aria-label={ariaLabel || label}
      aria-busy={loading}
      disabled={isDisabled}
      {...props}
      style={{
        minHeight: '44px',
        minWidth: '44px',
        padding: '0.5rem 1rem',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.6 : 1,
        ...props.style,
      }}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{label}</span>
      {loading && <span aria-label="loading"> ...</span>}
    </button>
  );
};

export default AccessibleButton;
