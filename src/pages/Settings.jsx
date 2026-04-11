import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header'; // Assuming you have this like other pages!

export default function Settings() {
  return (
    <div className="flex h-screen bg-[#0d1117] text-gray-300 font-sans relative overflow-hidden">
      
      {/* Reusing our global sidebar keeps the codebase small and clean */}
      <Sidebar />

      {/* Added the mobile-responsive padding here (pt-24) */}
      <main className="flex-1 p-6 pt-24 md:p-8 md:pt-8 overflow-y-auto">
        
        {/* --- Page Header --- */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">
            <span className="text-blue-400">DASHBOARD</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-200 mb-1 tracking-tight">
            Account Settings
          </h1>
          <p className="text-sm text-gray-500">
            View your personal profile and account details.
          </p>
          <div className="h-1 w-12 bg-blue-500 mt-4 rounded"></div>
        </div>

        <div className="space-y-6 max-w-3xl">
          
          {/* --- User Profile Card --- */}
          <div className="bg-[#1c2128] p-8 rounded-3xl border border-gray-800 shadow-sm flex flex-col">
            
            {/* Top Section: Avatar & Name */}
            <div className="flex items-center gap-6">
              {/* User Avatar - using dicebear for a clean, professional SVG avatar */}
              <img 
                src="https://api.dicebear.com/7.x/lorelei/svg?seed=Aria&backgroundColor=ffdfbf" 
                alt="Ishani Gupta" 
                className="w-24 h-24 rounded-full border-4 border-[#2d333b] bg-[#e3e8ff]"
              />
              
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-gray-200 tracking-tight">
                  Ishani Gupta
                </h2>
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-gray-500 uppercase mt-1">
                  {/* Manager Badge */}
                  <span className="bg-[rgb(22,42,26)] text-green-400 border border-[rgb(34,84,42)] px-2 py-0.5 rounded">
                    MANAGER
                  </span>
                  <span>•</span>
                  <span>@ishani_admin</span>
                </div>
              </div>
            </div>

            {/* Bottom Section: Read-Only Account Details Grid */}
            <div className="mt-8 pt-8 border-t border-gray-800/50 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Detail 1 */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Employee ID
                </p>
                <p className="text-sm font-medium text-gray-300 bg-[#161b22] px-4 py-2.5 rounded-xl border border-gray-800/60 inline-block w-full">
                  EMP-2026-849
                </p>
              </div>

              {/* Detail 2 */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Email Address
                </p>
                <p className="text-sm font-medium text-gray-300 bg-[#161b22] px-4 py-2.5 rounded-xl border border-gray-800/60 inline-block w-full">
                  ishani.gupta@oynx.edu
                </p>
              </div>

              {/* Detail 3 */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Department
                </p>
                <p className="text-sm font-medium text-gray-300 bg-[#161b22] px-4 py-2.5 rounded-xl border border-gray-800/60 inline-block w-full">
                  Operations & Management
                </p>
              </div>

              {/* Detail 4 */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Account Status
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-300 bg-[#161b22] px-4 py-2.5 rounded-xl border border-gray-800/60 w-full">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Active & Verified
                </div>
              </div>

            </div>
            
          </div>

        </div>
      </main>
    </div>
  );
}