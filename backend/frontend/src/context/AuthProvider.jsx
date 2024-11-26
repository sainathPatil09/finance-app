import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie' 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const initialState = Cookies.get("jwt") || localStorage.getItem("auth")
  const[authUser, setAuthUser] = useState(initialState ? JSON.parse(initialState) : undefined);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={{authUser, setAuthUser}}>  
      {children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
