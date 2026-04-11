import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  // Don't kick them out while we are still checking local storage!
  if (isLoading) {
    return <div className="h-screen bg-[#0d1117] text-white flex items-center justify-center">Loading...</div>;
  }

  // If they aren't logged in, redirect to login page ("/")
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If they are logged in, let them see the page
  return children;
}