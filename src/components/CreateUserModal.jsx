import React, { useState } from 'react';
import { useTeamStore } from './TeamContext';

export default function CreateUserModal({ isOpen, onClose }) {
  const { addTeamMember } = useTeamStore();
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    role: 'USER' // Hardcoded to USER so no one can create another Manager!
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure the handle has an @ symbol
    let formattedHandle = formData.handle;
    if (!formattedHandle.startsWith('@')) {
      formattedHandle = `@${formattedHandle}`;
    }

    addTeamMember({ ...formData, handle: formattedHandle });
    setFormData({ name: '', handle: '', role: 'USER' }); // Reset form
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#1c2128] border border-gray-800 rounded-2xl w-full max-w-md p-10 shadow-2xl transition-all">
        <h2 className="text-xl font-bold text-blue-300 text-center mb-8">Add New User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
            <input 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              type="text" 
              placeholder="e.g. Rahul Sharma"
              className="w-full bg-[#161b22] border border-gray-800 p-4 rounded-xl text-white placeholder-gray-600 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">User Handle</label>
            <input 
              value={formData.handle}
              onChange={(e) => setFormData({...formData, handle: e.target.value})}
              required
              type="text" 
              placeholder="e.g. rahul123"
              className="w-full bg-[#161b22] border border-gray-800 p-4 rounded-xl text-white placeholder-gray-600 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition-colors">Cancel</button>
            <button type="submit" className="flex-1 bg-[#a2b2f8] hover:bg-[#8e9ff0] text-[#161b22] font-bold py-3 rounded-xl transition-colors">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}