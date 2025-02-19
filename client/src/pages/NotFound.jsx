import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-brick mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-md">
        Oops! The page you're looking for doesn't exist. Let's get you back to helping your neighbours.
      </p>
      <Link 
        to="/" 
        className="bg-brick hover:bg-brickHover text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
