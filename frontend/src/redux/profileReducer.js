const initialState = {
    loading: false,
    userData: null,
    error: null,
    success: false
  };
  
  export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PROFILE_REQUEST':
      case 'PROFILE_UPDATE_REQUEST':
        return { ...state, loading: true, error: null, success: false };
      
      case 'PROFILE_SUCCESS':
      case 'PROFILE_UPDATE_SUCCESS':
        return { ...state, loading: false, userData: action.payload, success: true };
      
      case 'PROFILE_FAIL':
      case 'PROFILE_UPDATE_FAIL':
        return { ...state, loading: false, error: action.payload };
      
      case 'PROFILE_RESET':
        return initialState;
      
      default:
        return state;
    }
  };