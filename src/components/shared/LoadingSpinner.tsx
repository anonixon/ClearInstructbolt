import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-indigo-500 ${sizeClasses[size]} ${className}`}
      />
    </div>
  );
}; 