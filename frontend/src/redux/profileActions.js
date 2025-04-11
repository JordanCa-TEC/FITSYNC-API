import axios from 'axios';
import { API_URL } from '../configapi';

// Acciones básicas para el perfil
export const getProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PROFILE_REQUEST' });
    
    const { data } = await axios.get(`${API_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo?.accessToken}`
      }
    });
    
    dispatch({ type: 'PROFILE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ 
      type: 'PROFILE_FAIL', 
      payload: error.response?.data?.message || error.message 
    });
  }
};

export const updateProfile = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PROFILE_UPDATE_REQUEST' });
    
    const { data } = await axios.put(`${API_URL}/api/users/profile`, userData, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo?.accessToken}`
      }
    });
    
    dispatch({ type: 'PROFILE_UPDATE_SUCCESS', payload: data });
    return { success: true };
  } catch (error) {
    dispatch({ type: 'PROFILE_UPDATE_FAIL', payload: error.response?.data?.message || error.message });
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

export const updatePassword = (passwordData) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PASSWORD_UPDATE_REQUEST' });

    const { data } = await axios.put(`${API_URL}/api/users/update-password`, passwordData, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo?.accessToken}`,
        'Content-Type': 'application/json',
      }
    });

    dispatch({ type: 'PASSWORD_UPDATE_SUCCESS', payload: data });
    return { success: true };
  } catch (error) {
    dispatch({
      type: 'PASSWORD_UPDATE_FAIL',
      payload: error.response?.data?.message || error.message,
    });
    return { success: false, error: error.response?.data?.message || error.message };
  }
};
