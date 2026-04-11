import React, { useState } from 'react';
import { Plus, Pencil, Archive, Trash2, User, Calendar, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CreateProjectModal from '../components/CreateProjectModal';
import { useProjectStore } from '../components/ProjectContext';

export default function Projects() {
  const { projects, stats, toggleArchiveStatus, deleteProject } = useProjectStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null); 

  const activeProjects = projects.filter(project => !project.isArchived);

  const handleEditClick = (project) => {
    setProjectToEdit(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProjectToEdit(null); 
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // --- CUSTOM DEEP-SHADE BADGE COLORS ---
  const getStatusStyle = (status) => {
    switch (status) {
      case 'COMPLETED': 
        return 'bg-[rgb(22,42,26)] text-green-400 border border-[rgb(34,84,42)]';
      case 'IN PROGRESS': 
        return 'bg-[rgb(22,26,42)] text-blue-400 border border-[rgb(34,42,84)]';
      default: 
        return 'bg-[#2d333b] text-gray-400 border border-gray-700';
    }
  };

  const isOverdue = (dueDate, status) => {
    if (!dueDate || status === 'COMPLETED') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    return due < today;
  };

  // --- CUSTOM DEEP-SHADE CARD BACKGROUNDS ---
  const getCardTheme = (project) => {
    if (isOverdue(project.dueDate, project.status)) {
      // OVERDUE: User's Custom Deep Red
      return 'bg-[rgb(42,22,24)] border-[rgb(84,34,38)] hover:border-[rgb(120,40,45)]'; 
    }
    
    switch (project.status) {
      case 'COMPLETED':
        // COMPLETED: Matching Deep Green
        return 'bg-[rgb(22,42,26)] border-[rgb(34,84,42)] hover:border-[rgb(40,120,52)]';
      case 'IN PROGRESS':
        // IN PROGRESS: Matching Deep Blue
        return 'bg-[rgb(22,26,42)] border-[rgb(34,42,84)] hover:border-[rgb(40,52,120)]';
      default:
        // TO DO: Standard Dark Theme
        return 'bg-[#1c2128] border-gray-800 hover:border-gray-600';
    }
  };
  

  return (
    <div className="flex h-screen bg-[#0d1117] text-gray-300 relative overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 p-6 pt-24 md:p-8 md:pt-8 overflow-y-auto">
        <Header />

        {/* Header Area - MADE RESPONSIVE */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-300">Projects Catalogue</h1>
            <div className="h-1 w-16 bg-blue-500 mt-2 rounded"></div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#a2b2f8] hover:bg-[#8e9ff0] transition-colors rounded-xl flex items-center justify-center text-[#161b22] font-bold text-xs tracking-widest py-3 px-6 shadow-lg w-full sm:w-auto mt-2 sm:mt-0"
          >
            <Plus size={18} className="mr-2" /> NEW PROJECT
          </button>
        </header>

        {/* Stats Banner - MADE RESPONSIVE (grid-cols-1 on mobile, md:grid-cols-3 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#1c2128] border border-gray-800 rounded-2xl p-6 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-1">Active Projects</p>
              <h2 className="text-3xl font-bold text-gray-200">{stats.totalProjects}</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-950/30 flex items-center justify-center border border-blue-900/40">
              <Activity className="text-blue-400" size={24} />
            </div>
          </div>

          <div className="bg-[#1c2128] border border-gray-800 rounded-2xl p-6 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-1">System Efficiency</p>
              <h2 className="text-3xl font-bold text-green-400">{stats.systemEfficiency}%</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-950/30 flex items-center justify-center border border-green-900/40">
              <CheckCircle2 className="text-green-400" size={24} />
            </div>
          </div>

          <div className="bg-[#1c2128] border border-gray-800 rounded-2xl p-6 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-1">Overdue Tasks</p>
              <h2 className={`text-3xl font-bold ${stats.overdueTasks > 0 ? 'text-red-400' : 'text-gray-200'}`}>
                {stats.overdueTasks}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-950/20 flex items-center justify-center border border-red-900/30">
              <AlertCircle className={stats.overdueTasks > 0 ? 'text-red-400' : 'text-gray-600'} size={24} />
            </div>
          </div>
        </div>

        {/* --- DYNAMIC PROJECT GRID --- */}
        <div className="grid grid-cols-12 gap-6">
          {activeProjects.map((project) => (
             <div 
              key={project.id}
              // FIX APPLIED HERE: Stacks on mobile (12), splits on tablet (6), three-across on desktop (4)
              className={`col-span-12 md:col-span-6 lg:col-span-4 rounded-3xl p-8 flex flex-col border shadow-inner group transition-all duration-300 relative ${getCardTheme(project)}`}
            >
              
              <div className="flex justify-between items-start mb-6">
                <h3 className={`text-lg font-bold truncate pr-4 transition-colors ${isOverdue(project.dueDate, project.status) ? 'text-red-300' : project.status === 'COMPLETED' ? 'text-green-300' : 'text-blue-300'}`}>
                  {project.title}
                </h3>
                
                {/* STATUS BADGE */}
                <span className={`text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider whitespace-nowrap ${getStatusStyle(project.status)}`}>
                  {project.status || 'TO DO'}
                </span>
              </div>
              
              <div className="mt-auto border-gray-800/30">
                <div className="flex items-center justify-between mb-5 border-t border-gray-800/50 pt-6">
                  
                  {/* Assignee */}
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#161b22] border border-gray-800/80 flex items-center justify-center shadow-sm">
                      <User className="text-gray-500 w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-gray-400 font-medium truncate max-w-[100px]">
                      {project.assignee?.name || 'Unassigned'}
                    </span>
                  </div>

                  {/* Deadline Badge */}
                  {project.dueDate && (
                    <div className="flex items-center gap-1.5 bg-[#161b22] px-2.5 py-1.5 rounded-lg border border-gray-800/50 shadow-sm">
                      <Calendar size={12} className="text-gray-500 shrink-0" />
                      <span className={`text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${isOverdue(project.dueDate, project.status) ? 'text-red-400' : 'text-gray-400'}`}>
                        {formatDate(project.dueDate)}
                      </span>
                    </div>
                  )}

                </div>
              </div>

              {/* Action Icons Panel */}
              <div className="flex gap-2.5 mt-2 border-t border-gray-800/50 pt-6">
                <button 
                  onClick={() => handleEditClick(project)}
                  className="p-2.5 rounded-lg bg-[#161b22] border border-gray-800/60 text-gray-400 hover:text-blue-300 hover:bg-blue-950/40 transition-colors shadow-sm"
                >
                  <Pencil size={18} />
                </button>
                <button 
                  onClick={() => toggleArchiveStatus(project.id)}
                  className="p-2.5 rounded-lg bg-[#161b22] border border-gray-800/60 text-gray-400 hover:text-yellow-400 hover:bg-yellow-950/40 transition-colors shadow-sm"
                >
                  <Archive size={18} />
                </button>
                <button 
                  onClick={() => deleteProject(project.id)}
                  className="p-2.5 rounded-lg bg-[#161b22] border border-gray-800/60 text-gray-400 hover:text-red-400 hover:bg-red-950/40 transition-colors shadow-sm"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        editingProject={projectToEdit} 
      />
    </div>
  );
}