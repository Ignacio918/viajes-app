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
  required?: boolean; // Agregamos esta propiedad como opcional
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
  required = false // Valor por defecto false
}) => {
  return (
    <div className="login-input-container">
      <label className="login-input-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className={`login-input ${state === 'error' ? 'border-red-500' : ''}`}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
        />
        {icon}
      </div>
    </div>
  );
};

export default TextField;