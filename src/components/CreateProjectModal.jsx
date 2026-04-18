import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react'; 
import { useProjectStore } from './ProjectContext';
import { useTeamStore } from './TeamContext';

export default function CreateProjectModal({ isOpen, onClose, editingProject }) {
  const { addProject, updateProject } = useProjectStore();
  const { teamMembers } = useTeamStore();
  const assignableMembers = teamMembers.filter(member => member.role !== 'MANAGER');

  // 1. STATE LIVES AT THE TOP
  const [formData, setFormData] = useState({
    title: '', 
    description: '', 
    assigneeId: '', 
    dueDate: '', 
    status: 'TO DO'
  });

  // 2. EFFECTS LIVE AT THE TOP
  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        description: editingProject.description,
        assigneeId: editingProject.assigneeId || '', // Use ID
        dueDate: editingProject.dueDate || '',
        status: editingProject.status || 'TO DO',
      });
    } else {
      setFormData({ title: '', description: '', assigneeId: '', dueDate: '', status: 'TO DO' });
    }
  }, [editingProject, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProject) {
      updateProject(editingProject.id, formData);
    } else {
      addProject(formData);
    }
    onClose();
  };

  // 3. ONLY JSX/HTML LIVES IN THE RETURN BLOCK
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#1c2128] border border-gray-800 rounded-2xl w-full max-w-lg p-10 shadow-2xl transition-all">
        <h2 className="text-xl font-bold text-blue-300 text-center mb-10">
          {editingProject ? 'Edit Project' : 'Create New Project'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Project Title</label>
            <input 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required type="text" placeholder="e.g. Smart Campus App"
              className="w-full bg-[#161b22] border border-gray-800 p-4 rounded-xl text-white placeholder-gray-600 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Description</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Details of the project goal..." rows="2"
              className="w-full bg-[#161b22] border border-gray-800 p-4 rounded-xl text-white placeholder-gray-600 focus:border-blue-500 outline-none transition-colors resize-none"
            />
          </div>

          {/* THREE-COLUMN LAYOUT FOR ASSIGNEE, STATUS, AND DEADLINE */}
          <div className="grid grid-cols-3 gap-4">
            
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Lead</label>
              <div className="relative">
                <select
                  value={formData.assigneeId}
                  onChange={(e) => setFormData({...formData, assigneeId: e.target.value})}
                  className="w-full bg-[#161b22] border border-gray-800 p-4 pr-8 rounded-xl text-white focus:border-blue-500 outline-none transition-colors appearance-none cursor-pointer text-sm"
                >
                  <option value="">Unassigned</option>
                  {assignableMembers.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Status</label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-[#161b22] border border-gray-800 p-4 pr-8 rounded-xl text-white focus:border-blue-500 outline-none transition-colors appearance-none cursor-pointer text-sm"
                >
                  <option value="TO DO">To Do</option>
                  <option value="IN PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Deadline</label>
              <input 
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                className="w-full bg-[#161b22] border border-gray-800 p-4 rounded-xl text-white focus:border-blue-500 outline-none transition-colors cursor-pointer text-sm"
                style={{ colorScheme: 'dark' }} 
              />
            </div>

          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition-colors">Cancel</button>
            <button type="submit" className="flex-1 bg-[#a2b2f8] hover:bg-[#8e9ff0] text-[#161b22] font-bold py-3 rounded-xl transition-colors">
              {editingProject ? 'Save Changes' : 'Launch Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}