import { createContext, useReducer, useEffect } from "react";
import authReducer from "./AuthReducer";
import * as types from "../types";
import API_URL from "../../utils/setupApi";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const initialState = {
    user: null,
    loading: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      dispatch({ type: types.LOGIN, payload: { token } });
    }

    checkUserLoggedIn(token);
  }, []);

  // Login
  const login = async (email, password) => {
    dispatch({ type: types.SET_LOADING });
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();
    if (json.success) {
      dispatch({ type: types.LOGIN, payload: json });
      checkUserLoggedIn(json.token);
    } else {
      dispatch({ type: types.SET_ERROR, payload: json.error });
    }
  };

  // Sign up
  const signup = async (userData) => {
    dispatch({ type: types.SET_LOADING });
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const json = await res.json();
    if (json.success) {
      dispatch({ type: types.SIGN_UP, payload: json });
      checkUserLoggedIn(json.token);
    } else {
      dispatch({ type: types.SET_ERROR, payload: json.error });
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: types.LOGOUT });
  };

  // Update details
  const updateDetails = async (userInfo) => {
    dispatch({ type: types.UPDATE_USER_LOADING });
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await fetch(`${API_URL}/api/auth/updatedetails`, {
      method: "PUT",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { success, data, error } = await res.json();

    if (success) {
      dispatch({ type: types.UPDATE_USER, payload: data });
    }

    if (error) {
      dispatch({ type: types.UPDATE_USER_ERROR, payload: error });
    }
  };

  // Update password
  const updatePassword = async (currentPassword, newPassword) => {
    const token = JSON.parse(localStorage.getItem("token"));

    dispatch({ type: types.UPDATE_PASSWORD_LOADING });
    const res = await fetch(`${API_URL}/api/auth/updatepassword`, {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { success, data, error } = await res.json();

    if (success) {
      dispatch({ type: types.UPDATE_PASSWORD, payload: data });
    }

    if (error) {
      dispatch({ type: types.UPDATE_PASSWORD_ERROR, payload: error });
    }
  };

  // reset state
  const resetUserState = () => {
    dispatch({ type: types.RESET_USER_STATE });
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (token) => {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    console.log(json);

    if (json.success) {
      dispatch({ type: types.SET_USER, payload: json.data });
    } else {
      dispatch({ type: types.CLEAR_USER });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        updateDetails,
        updatePassword,
        resetUserState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
