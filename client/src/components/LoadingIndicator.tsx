import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 text-blue-600">
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent" />
      <span className="text-sm">Thinking...</span>
    </div>
  );
};

export default LoadingIndicator;