import React from 'react';
import '../styles/TextField.css'; // Corrigiendo la ruta de importación

interface TextFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  state: 'enabled' | 'selected' | 'disabled' | 'error' | 'success';
  type?: string;
  icon?: React.ReactNode;
  required?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  state,
  type = 'text',
  icon,
  required = false
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
          required={required}
        />
        {icon && <div className="textfield-icon">{icon}</div>}
      </div>
    </div>
  );
};

export default TextField;