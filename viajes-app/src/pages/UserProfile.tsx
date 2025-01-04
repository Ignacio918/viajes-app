import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (error) {
          console.error(error);
        } else {
          setUser(data);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (session && session.user) {
      const { error } = await supabase
        .from('profiles')
        .update({ /* campos a actualizar */ })
        .eq('id', session.user.id);

      if (error) {
        console.error(error);
      } else {
        // Actualiza el estado de usuario
      }
    }

    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      <form onSubmit={handleUpdateProfile} className="user-profile-form">
        <h2 className="user-profile-title">Perfil de Usuario</h2>
        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            value={user?.name || ''}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="form-input"
          />
        </div>
        {/* Otros campos de perfil */}
        <button type="submit" className="btn-primary">Actualizar Perfil</button>
      </form>
    </div>
  );
};

export default UserProfile;