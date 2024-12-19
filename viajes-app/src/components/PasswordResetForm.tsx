import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const PasswordResetForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setError(error.message);
    } else {
      setMessage('Se ha enviado un enlace para restablecer la contraseña a tu correo electrónico.');
    }
  };

  return (
    <div className="password-reset-container">
      <form onSubmit={handlePasswordReset} className="password-reset-form">
        <h2 className="password-reset-title">Recuperar Contraseña</h2>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        {message && <div className="form-message">{message}</div>}
        <button type="submit" className="btn-primary">Restablecer Contraseña</button>
      </form>
    </div>
  );
};

export default PasswordResetForm;