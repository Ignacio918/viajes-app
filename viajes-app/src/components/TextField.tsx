import React, { ChangeEvent } from 'react';
import '../styles/TextField.css';

export interface TextFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  state: 'enabled' | 'error' | 'success';
  type: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  state,
  type,
  icon,
  disabled = false,
  required = false,
  helperText
}) => {
  return (
    <div className="textfield-container">
      <label className="textfield-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className={`textfield-input-container ${state}`}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`textfield-input ${disabled ? 'disabled' : ''}`}
        />
        {icon && <div className="textfield-icon">{icon}</div>}
      </div>
      {helperText && (
        <span className={`textfield-helper-text ${state === 'error' ? 'text-error' : state === 'success' ? 'text-success' : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default TextField;