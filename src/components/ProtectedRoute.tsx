import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      void navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  return children;
};

export default ProtectedRoute;