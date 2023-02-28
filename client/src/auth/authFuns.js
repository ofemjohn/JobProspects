import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

function useAuth() {
  const { state, dispatch } = useContext(AuthContext);

  return { state, login };
}

export default useAuth;
