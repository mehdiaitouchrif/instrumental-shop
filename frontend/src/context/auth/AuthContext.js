import { createContext, useReducer, useEffect } from "react";
import authReducer from "./AuthReducer";
import * as types from "../types";
import API_URL from "../../utils/setupApi";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const initialState = {
    user: JSON.parse(localStorage.getItem("instrumental_user")) || null,
    loading: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // Login
  const login = async (email, password) => {
    dispatch({ type: types.SET_LOADING });

    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const json = await res.json();
    if (json.success) {
      // dispatch({ type: types.LOGIN, payload: json });
      checkUserLoggedIn();
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
      credentials: "include",
    });

    const json = await res.json();
    if (json.success) {
      // dispatch({ type: types.SIGN_UP, payload: json });
      checkUserLoggedIn();
    } else {
      dispatch({ type: types.SET_ERROR, payload: json.error });
    }
  };

  // Logout
  const logout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/logout`, {
        credentials: "include",
      });

      await res.json();
      dispatch({ type: types.LOGOUT });
    } catch (error) {
      dispatch({ type: types.SET_ERROR, payload: error });
    }
  };

  // Update details
  const updateDetails = async (userInfo) => {
    dispatch({ type: types.UPDATE_USER_LOADING });
    const res = await fetch(`${API_URL}/api/auth/updatedetails`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
      credentials: "include",
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
    dispatch({ type: types.UPDATE_PASSWORD_LOADING });
    const res = await fetch(`${API_URL}/api/auth/updatepassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword, newPassword }),
      credentials: "include",
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
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      credentials: "include",
    });
    const json = await res.json();

    if (json.success) {
      localStorage.setItem("instrumental_user", JSON.stringify(json.data));
      dispatch({ type: types.SET_USER, payload: json.data });
    } else {
      localStorage.removeItem("instrumental_user");
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
