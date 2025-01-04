import React, { useState, ReactNode } from 'react';
import '../styles/TextField.css';

interface TextFieldProps {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  required?: boolean; // Añadir la propiedad required
  icon?: ReactNode; // Añadir la propiedad icon
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({ label, type, value, placeholder, error, success, disabled, required, icon, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`text-field-container ${focused ? 'focused' : ''} ${error ? 'error' : ''} ${success ? 'success' : ''} ${disabled ? 'disabled' : ''}`}>
      <label className="text-field-label">{label}</label>
      <div className="text-field-input-wrapper">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          required={required}
          className="text-field-input"
        />
        {icon && (
          <button type="button" className="text-field-icon-button">
            {icon}
          </button>
        )}
      </div>
      {error && <span className="text-field-error">{error}</span>}
    </div>
  );
};

export default TextField;