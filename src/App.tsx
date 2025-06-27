import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import MainApp from './components/MainApp';
import BrowseInternships from './components/Student/BrowseInternships';
import CompanyDashboard from './components/Company/CompanyDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';

const AuthWrapper: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (isAuthenticated) {
    return <MainApp />;
  }

  return showLogin ? (
    <LoginForm onToggleForm={() => setShowLogin(false)} />
  ) : (
    <RegisterForm onToggleForm={() => setShowLogin(true)} />
  );
};

function App() {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
}

export default App;