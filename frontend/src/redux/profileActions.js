import axios from 'axios';
import { API_URL } from '../configapi';

export const getProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PROFILE_REQUEST' });

    const { data: users } = await axios.get(`${API_URL}/users`);
    const currentEmail = getState().userLogin.userInfo?.email;

    const currentUser = users.find(user => user.email === currentEmail);

    if (!currentUser) throw new Error('Usuario no encontrado');

    dispatch({ type: 'PROFILE_SUCCESS', payload: currentUser });
  } catch (error) {
    dispatch({
      type: 'PROFILE_FAIL',
      payload: error.response?.data?.message || error.message,
    });
  }
};
