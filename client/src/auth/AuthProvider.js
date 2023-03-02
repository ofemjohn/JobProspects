import Axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Define initial state for auth context
// const initialAuthState = {
//   isAuthenticated: false,
//   user: null,
// };

// Define auth reducer function
// function authReducer(state, action) {
//   switch (action.type) {
//     case "LOGIN_SUCCESS":
//       return {
//         isAuthenticated: true,
//         user: action.payload.user,
//       };
//     case "LOGIN_ERROR":
//       return {
//         isAuthenticated: false,
//         user: null,
//         error: action.error,
//       };
//     case "LOGOUT":
//       Cookies.remove("token"); // remove token cookie
//       return initialAuthState;
//     default:
//       throw new Error(`Unhandled action type: ${action.type}`);
//   }
// }

// Create auth context
const AuthContext = createContext();

// Create auth provider component
function AuthProvider({ children }) {
  // const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get("isAuthenticated") || false
  );

  // const navigate = useNavigate();

  // CHECK IF USER IS AVAILABLE
  useEffect(() => {
    console.log(isAuthenticated);
    const isAuth = Cookies.get("isAuthenticated");
    if (isAuth) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
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
        setIsAuthenticated(true);
        // navigate("/user");
      } else {
        console.log("error");
        throw new Error("Failed to authenticate user");
      }
    } catch (error) {
      setMessage({ msg: `* ${error.response.data.message}`, type: "error" });
      // console.log(error.response.data.message);
      // dispatch({ type: "LOGIN_ERROR", error });
    }
    // dispatch({ type: "LOGIN", payload: { user, userType } });
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
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error.response.data);
    }
    // dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signUp }}>
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
