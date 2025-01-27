import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const SetNewPassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.hash.replace('#', ''));
    const accessToken = params.get('access_token');
    if (accessToken) {
      // Establecer la sesión en el cliente de Supabase
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: '', // No se necesita el refresh token para esta operación
      });
    } else {
      setError('Token de acceso no válido.');
    }
  }, [location]);

  const handleSetNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Tu contraseña ha sido actualizada exitosamente.');
      navigate('/login');
    }
  };

  return (
    <div className="set-new-password-container">
      <form onSubmit={handleSetNewPassword} className="set-new-password-form">
        <h2 className="set-new-password-title">Establecer Nueva Contraseña</h2>
        <div className="form-group">
          <label className="form-label">Nueva Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Confirmar Nueva Contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        {message && <div className="form-message">{message}</div>}
        <button type="submit" className="btn-primary">Actualizar Contraseña</button>
      </form>
    </div>
  );
};

export default SetNewPassword;