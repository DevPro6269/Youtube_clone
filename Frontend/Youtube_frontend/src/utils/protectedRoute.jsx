import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'; // Use Navigate for redirection in React Router v6

const ProtectedRoute = ({ children }) => {
  const userLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (!userLoggedIn) {
    return <Navigate to="/login" />; // Redirect to login if not logged in
  }

  return children; // If logged in, render the child components (protected route)
};

export default ProtectedRoute;
