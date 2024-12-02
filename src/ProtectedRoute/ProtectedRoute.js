import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  const currentUser = localStorage.getItem('currentUser');
  return !! currentUser;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
