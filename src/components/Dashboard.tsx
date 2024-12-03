import React from 'react';
import { useAuth } from '../SessionStorageManager';

const Dashboard: React.FC = () => {
  const { token, removeToken } = useAuth();

  const handleLogout = () => {
    removeToken();  // Clear the token when the user logs out
  };

  return (
    <div>
      <h2>Welcome to the Dashboard!</h2>
      <p>JWT Token: {token ? token : 'No token found'}</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
