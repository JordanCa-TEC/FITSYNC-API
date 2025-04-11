import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updatePassword } from '../redux/profileActions';
import AlertProfile from '../components/user/AlertProfile';
import "../sass/_ProfileScreen.scss"; 

const ProfileScreen = () => {
  const dispatch = useDispatch();
  
  // Acceso seguro al estado del perfil
  const profileState = useSelector((state) => state.profile || {});
  const { 
    loading = false, 
    userData = null, 
    error = null, 
    success = false 
  } = profileState;
  
  // Estado para el formulario de contraseña
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Cargar datos del perfil al montar el componente
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

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
    
    await dispatch(updatePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    }));
    
    // Limpiar formulario después de enviar
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordForm(false);
  };

  return (
    <div className="profile-container">
      <h1>Mi Perfil</h1>
      
      {/* Alertas */}
      {loading && <AlertProfile type="loading" message="Cargando..." />}
      {error && <AlertProfile type="error" message={error} />}
      {success && <AlertProfile type="success" message="Contraseña actualizada correctamente" />}
      
      {/* Información del usuario (solo lectura) */}
      <div className="profile-info">
        <div className="info-group">
          <label>Nombre:</label>
          <div className="info-value">{userData?.firstName || 'No disponible'}</div>
        </div>
        
        <div className="info-group">
          <label>Apellido:</label>
          <div className="info-value">{userData?.lastName || 'No disponible'}</div>
        </div>
        
        <div className="info-group">
          <label>Email:</label>
          <div className="info-value">{userData?.email || 'No disponible'}</div>
        </div>
        
        <div className="info-group">
          <label>Edad:</label>
          <div className="info-value">{userData?.age || 'No disponible'}</div>
        </div>
      </div>
      
      {/* Sección de cambio de contraseña */}
      <div className="password-section">
        <button 
          className="change-password-btn"
          onClick={() => setShowPasswordForm(!showPasswordForm)}
        >
          {showPasswordForm ? 'Cancelar' : 'Cambiar Contraseña'}
        </button>
        
        {showPasswordForm && (
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <div className="form-group">
              <label>Contraseña Actual</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Nueva Contraseña</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                minLength="6"
              />
            </div>
            
            <div className="form-group">
              <label>Confirmar Nueva Contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                minLength="6"
              />
            </div>
            
            <button type="submit" disabled={loading}>
              {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;