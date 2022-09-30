import { useContext } from "react";

//context
import { AuthContext } from "../contexts/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("UseAuthContext is used outside the scope");
  }

  return context;
};
