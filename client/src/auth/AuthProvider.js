import Axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Create auth context
const AuthContext = createContext();

// Create auth provider component
function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get("isAuthenticated") || false
  );
  const [userId, setUserId] = useState(Cookies.get("userId") || {});
  const token = localStorage.getItem("token") || null;

  // const navigate = useNavigate();

  // CHECK IF USER IS AVAILABLE
  useEffect(() => {
    const isAuth = Cookies.get("isAuthenticated");
    if (token !== null) {
      const decoded = jwt_decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Token has expired, remove it from local state
        logout();
      }
      if (isAuth) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [isAuthenticated]);

  const login = async ({ email, password, setMessage, setOpen }) => {
    try {
      const response = await Axios.post("/auth/login", {
        email: email,
        password: password,
      });
      console.log("response", response);
      if (response.status === 200) {
        const data = response.data;
        setMessage({ msg: data.message, type: "success" });
        setOpen(false);
        Cookies.set("isAuthenticated", true);
        Cookies.set("userId", data.user.userId);
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        setUserId(data.user.userId);
      } else {
        console.log("error");
        throw new Error("Failed to authenticate user");
      }
    } catch (error) {
      setMessage({ msg: `* ${error.response.data.message}`, type: "error" });
    }
  };

  // CREATE USER
  const signUp = async ({ data, setMessage, setType }) => {
    try {
      await Axios.post("/auth/register", { ...data });
      setMessage({ msg: "Registration successful", type: "success" });
      setTimeout(() => {
        setType("login");
      }, 5000);
    } catch (error) {
      setMessage({ msg: `* ${error.response.data.message}`, type: "error" });
      console.log(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      const response = await Axios.post("/auth/logout");
      console.log("Logged out successfully", response);
      Cookies.remove("isAuthenticated");
      Cookies.remove("userId");
      localStorage.removeItem("token");

      setIsAuthenticated(false);
    } catch (error) {
      console.log(error.response.data);
    }
    // dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userId, token, login, logout, signUp }}
    >
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
