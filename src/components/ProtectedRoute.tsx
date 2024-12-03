import React from 'react';
import { Navigate } from 'react-router-dom'; 
import { useAuth } from '../SessionStorageManager';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/" replace />;
  }

  // If the user is authenticated, render the protected route element
  return <>{children}</>;
};

export default ProtectedRoute;
