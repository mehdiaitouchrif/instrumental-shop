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
    case types.LOGOUT:
    case types.CLEAR_USER:
      return { user: null, error: null, loading: false };
    case types.SET_LOADING:
      return {
        loading: true,
        user: null,
        error: null,
      };
    case types.SET_ERROR:
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
