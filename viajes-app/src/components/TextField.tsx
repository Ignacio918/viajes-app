import React, { ChangeEvent } from 'react';

export interface TextFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  state: 'enabled' | 'error';
  type: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
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
  required = false
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
    </div>
  );
};

export default TextField;