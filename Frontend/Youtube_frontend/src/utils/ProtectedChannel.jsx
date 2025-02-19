import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'; // Use Navigate for redirection in React Router v6

const ProtectedChannel = ({ children }) => {
  const channel = useSelector((state) => state.user.user.channel);

  if (!channel) {
    return <Navigate to="/youtube/channel/new" />; // Redirect to login if not logged in
  }

  return children; // If logged in, render the child components (protected route)
};

export default ProtectedChannel;
