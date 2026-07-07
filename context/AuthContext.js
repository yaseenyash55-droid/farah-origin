"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error("Error parsing saved user:", e);
        }
      }
      setLoading(false);
    }
  }, []);

  const login = async (userData) => {
    setUser(userData);
    if (typeof window !== "undefined") {
      localStorage.setItem("currentUser", JSON.stringify(userData));
    }
    
    // Save to database
    try {
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
    } catch (e) {
      console.error("Failed to register user to DB", e);
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isLoggedIn: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
