import React from 'react';
import { HiOutlineTerminal } from 'react-icons/hi';

interface HeaderProps {
  userEmail: string;
}

const Header: React.FC<HeaderProps> = ({ userEmail }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <HiOutlineTerminal className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-blue-600">Hemera AI Studio</h1>
        </div>
        <div className="text-sm text-gray-600">{userEmail}</div>
      </div>
    </header>
  );
};

export default Header;