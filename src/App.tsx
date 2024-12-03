import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './SessionStorageManager';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LogIn />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/logout" element={<LogOut />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;

