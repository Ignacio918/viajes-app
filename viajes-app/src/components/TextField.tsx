import React from 'react';
import './textfield.css';

interface TextFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  state: 'enabled' | 'selected' | 'disabled' | 'error' | 'success';
  type?: string;
  icon?: React.ReactNode;
  required?: boolean; // Agregar la propiedad required
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  state,
  type = 'text',
  icon,
  required = false // Default value for required
}) => {
  return (
    <div className="textfield-container">
      <label className={`textfield-label ${state}`}>
        {label}
      </label>
      <div className={`textfield-input-container ${state}`}>
        <input
          type={type}
          placeholder={placeholder}
          className={`textfield-input ${state}`}
          value={value}
          onChange={onChange}
          disabled={state === 'disabled'}
          required={required} // Agregar la propiedad required al input
        />
        {icon && <div className="textfield-icon">{icon}</div>}
      </div>
    </div>
  );
};

export default TextField;