import Axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

// Define initial state for auth context
const initialAuthState = {
  isAuthenticated: false,
  user: null,
};

// Define auth reducer function
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGIN_ERROR":
      return {
        isAuthenticated: false,
        user: null,
        error: action.error,
      };
    case "LOGOUT":
      return initialAuthState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Create auth context
const AuthContext = createContext();

// Create auth provider component
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = async ({ email, password, setMessage }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await Axios.post(
        "/auth/login",
        { email: email, password: password },
        config
      );
      console.log(response);
      if (response.status) {
        const data = response.data;

        // Store the user's token and other relevant data in local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user);

        // Set the user as authenticated in the context
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: data.user },
        });
        setMessage({ msg: data.message, type: "success" });
      } else {
        console.log("error");
        throw new Error("Failed to authenticate user");
      }
    } catch (error) {
      setMessage({ msg: `* ${error.response.data.message}`, type: "error" });
      // console.log(error.response.data.message);
      dispatch({ type: "LOGIN_ERROR", error });
    }
    // dispatch({ type: "LOGIN", payload: { user, userType } });
  };

  const logout = () => {
    // Remove the token and userId from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  // CHECK IF USER IS AVAILABLE
  useEffect(() => {
    const token = localStorage.getItem("token");
    // const user = localStorage.getItem("user");

    if (token) {
      const decoded = jwt_decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Token has expired, remove it from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      } else {
        // Token is still valid, set user as authenticated
        dispatch({ type: "LOGIN_SUCCESS", payload: decoded });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create custom hook to use auth context
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
