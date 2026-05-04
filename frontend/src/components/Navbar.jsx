import React from 'react';
import { MessageSquare } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <MessageSquare size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">ChatWithMe</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600">Home</a>
            <a href="#upload" className="text-sm font-medium text-gray-600 hover:text-indigo-600">Features</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600">Pricing</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-indigo-600">Docs</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">
              Sign in
            </button>
            <button className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-shadow">
              Get started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
