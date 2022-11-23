import * as types from "../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case types.LOGIN:
    case types.SIGN_UP:
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return state;
    case types.SET_USER:
      return {
        loading: false,
        user: action.payload,
      };
    case types.UPDATE_USER:
      return {
        updateUserLoading: false,
        user: action.payload,
        updateSuccess: true,
      };
    case types.UPDATE_USER_LOADING:
      return { ...state, updateUserLoading: true, updateSuccess: null };
    case types.UPDATE_USER_ERROR:
      return {
        ...state,
        updateUserLoading: false,
        updateUserError: action.payload,
      };
    case types.UPDATE_PASSWORD:
      return {
        ...state,
        updatePasswordLoading: false,
        updatePasswordError: false,
        passwordSuccess: true,
      };
    case types.UPDATE_PASSWORD_LOADING:
      return { ...state, updatePasswordLoading: true, passwordSuccess: null };
    case types.UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        updatePasswordLoading: false,
        updatePasswordError: action.payload,
      };
    case types.RESET_USER_STATE:
      return {
        ...state,
        updatePasswordError: null,
        updatePasswordLoading: null,
        updateUserError: null,
        updateUserLoading: null,
        passwordSuccess: null,
        updateSuccess: null,
      };
    case types.SET_LOADING:
      return {
        loading: true,
        user: null,
        error: null,
      };
    case types.SET_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case types.LOGOUT:
    case types.CLEAR_USER:
      return { user: null, error: null, loading: false };

    default:
      return state;
  }
};

export default authReducer;
