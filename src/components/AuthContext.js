import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    console.log("Stored Data:", { token, username, email });

    if (token && username && email) {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      // Verify token by sending it in the Authorization header
      axios
        .get("http://localhost:4000/api/verify-token", {
          headers: { Authorization: `Bearer ${token}` }, // Correct token format: Bearer <token>
        })
        .then((response) => {
          console.log("Token verification successful:", response.data);
          setIsLoggedIn(true);
          setUser({ username, email });
        })
        .catch((error) => {
          console.error("Token verification failed:", error);
          localStorage.clear(); // Clear invalid token
        });
    }
  }, []);

  // Login function to set the user data in context
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Logout function to clear the user data from context and localStorage
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
