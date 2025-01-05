import React, { useState } from 'react';
import '../styles/TextField.css';

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
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const inputState = isFocused ? 'selected' : state;

  return (
    <div className="textfield-container">
      <label className={`textfield-label ${state}`}>
        {label}
      </label>
      <div className={`textfield-input-container ${inputState}`}>
        <input
          type={type}
          placeholder={placeholder}
          className={`textfield-input ${inputState}`}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={state === 'disabled'}
          required={required}
        />
        {icon && <div className="textfield-icon">{icon}</div>}
      </div>
    </div>
  );
};

export default TextField;