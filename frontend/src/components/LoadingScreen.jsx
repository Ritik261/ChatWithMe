import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-indigo-500 animate-spin"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-r-4 border-l-4 border-indigo-200 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
