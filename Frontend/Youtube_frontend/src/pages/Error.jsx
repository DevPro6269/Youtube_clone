// src/components/ErrorPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <>
     <Navbar></Navbar>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
        <p className="mt-2 text-lg text-gray-500">Sorry, we couldn't find the page you were looking for.</p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-500 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
    </>
   
  );
};

export default ErrorPage;
