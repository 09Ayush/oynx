import React from 'react';
import { User } from 'lucide-react'; // Don't forget to import the icon!

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-10">
      <div>
        <h2 className="text-gray-400 text-lg uppercase tracking-widest">Manager's View</h2>
        <div className="h-1 w-12 bg-blue-500 mt-1 rounded"></div>
      </div>
      
      {/* Profile Section */}
      <div className="flex items-center bg-[#161b22] px-4 py-2 rounded-full border border-gray-700">
        <div className="text-right mr-3">
          <p className="text-white text-sm font-bold">Ishani Gupta</p>
          <p className="text-gray-500 text-[10px] uppercase">Manager</p>
        </div>
        
        {/* NEW UNIFORM AVATAR */}
        <div className="w-10 h-10 rounded-full border-2 border-pink-400 bg-[#1c2128] flex items-center justify-center">
          <User className="text-gray-400 w-5 h-5" />
        </div>
        
      </div>
    </header>
  );
}