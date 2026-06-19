import React, { useId } from 'react';

export interface AccessibleInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  ariaLabel?: string;
}

export const AccessibleInput: React.FC<AccessibleInputProps> = ({
  label,
  error,
  helperText,
  required = false,
  ariaLabel,
  id,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const describedBy = [
    error ? errorId : null,
    helperText ? helperId : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      <label htmlFor={inputId} style={{ display: 'block', marginBottom: '0.5rem' }}>
        {label}
        {required && (
          <span
            aria-label="required"
            style={{ color: 'red', marginLeft: '0.25rem' }}
          >
            *
          </span>
        )}
      </label>

      <input
        id={inputId}
        aria-label={ariaLabel || label}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        required={required}
        {...props}
        style={{
          borderColor: error ? 'red' : undefined,
          ...props.style,
        }}
      />

      {error && (
        <div
          id={errorId}
          role="alert"
          style={{ color: 'red', marginTop: '0.25rem', fontSize: '0.875rem' }}
        >
          {error}
        </div>
      )}

      {helperText && (
        <div
          id={helperId}
          style={{ color: '#666', marginTop: '0.25rem', fontSize: '0.875rem' }}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};

export default AccessibleInput;
