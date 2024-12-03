// LogoutComponent.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../SessionStorageManager';

const LogoutComponent: React.FC = () => {
  const { removeToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from sessionStorage and context
    removeToken();
    // Redirect the user to the home page or login page
    navigate('/');
  }, [removeToken, navigate]);

  return <div>Logging out...</div>;
};

export default LogoutComponent;
