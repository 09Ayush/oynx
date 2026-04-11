import React, { useState } from 'react';
import { Plus, User, Trash2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CreateUserModal from '../components/CreateUserModal';
import { useTeamStore } from '../components/TeamContext';

export default function Team() {
  const { teamMembers, deleteTeamMember } = useTeamStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter out any "ghost" users that might have empty names from database testing
  const validTeamMembers = teamMembers.filter(member => member.name && member.name.trim() !== '');

  return (
    <div className="flex h-screen bg-[#0d1117] text-gray-300 relative overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 p-6 pt-24 md:p-8 md:pt-8 overflow-y-auto">
        <Header />

        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-300">Team Management</h1>
            <div className="h-1 w-16 bg-blue-500 mt-2 rounded"></div>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#a2b2f8] hover:bg-[#8e9ff0] transition-colors rounded-xl flex items-center justify-center text-[#161b22] font-bold text-xs tracking-widest py-3 px-6 shadow-lg"
          >
            <Plus size={18} className="mr-2" /> ADD NEW USER
          </button>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {validTeamMembers.map((member) => (
            <div 
              key={member.id} 
              className="col-span-4 bg-[#1c2128] rounded-3xl p-6 flex items-center justify-between border border-gray-800 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#161b22] border border-gray-800 flex items-center justify-center">
                  <User className="text-gray-500 w-5 h-5" />
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-gray-200">{member.name}</h3>
                  {/* Fixed the double @@ bug by just rendering the handle directly */}
                  <p className="text-xs text-gray-500 mb-1">{member.handle}</p>
                  
                  {member.role === 'MANAGER' ? (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-[rgb(22,42,26)] text-green-400 border border-[rgb(34,84,42)]">
                      Manager
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-[#2d333b] text-gray-400 border border-gray-700">
                      User
                    </span>
                  )}
                </div>
              </div>

              {/* ONLY show the delete button if they are a USER. Manager cannot be deleted! */}
              {member.role !== 'MANAGER' && (
                <button 
                  onClick={() => deleteTeamMember(member.id)}
                  className="p-2.5 rounded-lg bg-[#161b22] border border-gray-800/60 text-gray-600 hover:text-red-400 hover:bg-red-950/40 transition-colors shadow-sm"
                  title="Remove User"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      <CreateUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}