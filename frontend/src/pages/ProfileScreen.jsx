import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlertProfile from '../components/user/AlertProfile';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
        console.log('✅ Respuesta de la API:', data);

        if (Array.isArray(data) && data.length > 0) {
          setUserData(data[0]);
          setError('');
        } else {
          throw new Error('⚠️ No se encontraron usuarios');
        }
      } catch (err) {
        console.error('❌ Error al obtener los datos:', err);
        setError('Error al obtener los datos del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      setLoading(true);
      // Aquí iría la lógica real de actualización de contraseña

      setSuccess(true);
    } catch (err) {
      console.error('Error al actualizar la contraseña:', err);
      setError('Error al actualizar la contraseña');
    } finally {
      setLoading(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  return (
    <div className="profile-container">
      <h1>Mi Perfil</h1>

      {loading && <AlertProfile type="loading" message="Cargando..." />}
      {error && <AlertProfile type="error" message={error} />}
      {success && <AlertProfile type="success" message="Contraseña actualizada correctamente" />}

      {userData && (
        <div className="profile-info">
          <div className="info-group">
            <label htmlFor="name">Nombre:</label>
            <div className="info-value" id="name">{userData.name || 'No disponible'}</div>
          </div>

          <div className="info-group">
            <label htmlFor="lastname">Apellido:</label>
            <div className="info-value" id="lastname">{userData.lastname || 'No disponible'}</div>
          </div>

          <div className="info-group">
            <label htmlFor="email">Email:</label>
            <div className="info-value" id="email">{userData.email || 'No disponible'}</div>
          </div>

          <div className="info-group">
            <label htmlFor="age">Edad:</label>
            <div className="info-value" id="age">{userData.age || 'No disponible'}</div>
          </div>
        </div>
      )}

      <div className="password-section">
        <form onSubmit={handlePasswordSubmit} className="password-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Contraseña Actual</label>
            <input
              id="currentPassword"
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">Nueva Contraseña</label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
              minLength={6}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
