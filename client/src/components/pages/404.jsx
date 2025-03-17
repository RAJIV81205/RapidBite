import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center px-4">
        <div className="mb-8">
          <img 
            src="https://illustrations.popsy.co/white/crashed-error.svg" 
            alt="404 illustration" 
            className="w-64 h-64 mx-auto"
          />
        </div>
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-4xl font-semibold text-gray-600 mt-4">Page Not Found</h2>
        <p className="text-gray-500 mt-4 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-primary transition-colors duration-200 hover:text-gray-950"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;