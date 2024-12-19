import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface UserProfile {
  email: string;
  fullName: string;
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({ email: '', fullName: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setError(error.message);
      } else if (data.user) {
        setProfile({ 
          email: data.user.email || '', 
          fullName: data.user.user_metadata.full_name || '' 
        });
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const { error } = await supabase.auth.updateUser({
      email: profile.email,
      data: { full_name: profile.fullName },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Perfil actualizado con éxito.');
    }
  };

  return (
    <form onSubmit={handleProfileUpdate}>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Nombre Completo</label>
        <input
          type="text"
          value={profile.fullName}
          onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {message && <div className="mb-4 text-green-500">{message}</div>}
      <button type="submit" className="btn-primary w-full">Actualizar Perfil</button>
    </form>
  );
};

export default UserProfile;