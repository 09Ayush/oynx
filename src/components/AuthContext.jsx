import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Check local storage when the app opens
  useEffect(() => {
    const token = localStorage.getItem('oynx_token');
    if (token === 'manager_logged_in') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // 2. The Login Function
  const login = (username, password) => {
    // HARDCODED
    if (username === 'manager' && password === 'Oynx2026!') {
      localStorage.setItem('oynx_token', 'manager_logged_in');
      setIsAuthenticated(true);
      navigate('/dashboard');
      return true; // Success
    }
    return false; // Failed
  };

  // 3. The Logout Function
  const logout = () => {
    localStorage.removeItem('oynx_token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);