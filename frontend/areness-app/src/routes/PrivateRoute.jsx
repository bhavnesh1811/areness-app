import React from 'react';
import { Navigate } from 'react-router-dom';

// Mock authentication status - replace this with your actual authentication logic
const isAuthenticated = () => {
  // This function should return true if the user is authenticated, false otherwise.
  // For example, you could check a token in localStorage:
  return localStorage.getItem('token') ? true : false; // Replace with your actual auth logic
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
