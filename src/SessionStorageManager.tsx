import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface AuthContextProps {
  token: string | null;
  saveToken: (token: string) => void;
  removeToken: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  // Get token from sessionStorage
  useEffect(() => {
    const storedToken = sessionStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Save token to sessionStorage and update state
  const saveToken = (newToken: string) => {
    sessionStorage.setItem('authToken', newToken); // Add the token to sessionStorage
    setToken(newToken);
  };

  // Remove token from sessionStorage and update state
  const removeToken = () => {
    sessionStorage.removeItem('authToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
