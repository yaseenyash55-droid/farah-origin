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
      const response = await fetch('https://farah-origin.vercel.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (data.token && typeof window !== "undefined") {
        localStorage.setItem("authToken", data.token);
      }
    } catch (e) {
      console.error("Failed to register user to DB", e);
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("authToken");
    }
  };

  const getApiUrl = (path) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://farah-origin.vercel.app";
    return `${baseUrl}${path}`;
  };

  const getAuthHeaders = (extraHeaders = {}) => {
    const headers = { ...extraHeaders };
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return headers;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isLoggedIn: !!user,
    getApiUrl,
    getAuthHeaders
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
