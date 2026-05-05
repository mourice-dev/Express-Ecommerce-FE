/** @format */

import React from "react";

interface LoadingProps {
  type?: "spinner" | "skeleton" | "dots";
  message?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  type = "spinner",
  message = "Loading...",
  className = "",
}) => {
  if (type === "skeleton") {
    return (
      <div className={`animate-pulse space-y-4 ${className}`}>
        <div className='h-48 bg-gray-200 rounded-2xl w-full'></div>
        <div className='h-4 bg-gray-200 rounded w-3/4'></div>
        <div className='h-4 bg-gray-200 rounded w-1/2'></div>
      </div>
    );
  }

  if (type === "dots") {
    return (
      <div className={`flex items-center justify-center space-x-2 ${className}`}>
        <div className='w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='w-3 h-3 bg-orange-500 rounded-full animate-bounce'></div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <div className='relative w-16 h-16'>
        <div className='absolute inset-0 border-4 border-orange-100 rounded-full'></div>
        <div className='absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin'></div>
      </div>
      {message && (
        <p className='mt-4 text-gray-500 font-medium animate-pulse'>
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;
