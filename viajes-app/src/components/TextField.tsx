import React, { useState, InputHTMLAttributes } from 'react';
import './TextField.css';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
}

const TextField: React.FC<TextFieldProps> = ({ label, error, success, icon, type = 'text', ...props }) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const handleIconClick = () => {
    if (type === 'password') {
      setShowPassword(!showPassword);
    }
  };

  return (
    <div className={`text-field-container ${focused ? 'focused' : ''} ${error ? 'error' : ''} ${success ? 'success' : ''}`}>
      <label className="text-field-label">{label}</label>
      <div className="text-field-input-wrapper">
        <input
          className="text-field-input"
          type={inputType}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {icon && (
          <button
            type="button"
            onClick={handleIconClick}
            className="text-field-icon-button"
          >
            {icon}
          </button>
        )}
      </div>
      {error && <span className="text-field-error">{error}</span>}
    </div>
  );
};

export default TextField;