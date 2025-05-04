// AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  // Load username from localStorage on refresh
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const login = (name) => {
    setUsername(name);
    localStorage.setItem("username", name);
  };

  const logout = () => {
    setUsername("");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
