import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    console.log("User logged in:", userData, "Token:", tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    console.log("User logged out");
  };

 
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
