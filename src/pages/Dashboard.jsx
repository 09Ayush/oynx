import React from 'react';
import { Plus, User } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useProjectStore } from '../components/ProjectContext';

export default function Dashboard() {
  const { projects, stats } = useProjectStore();

  // --- 1. CIRCULAR PROGRESS MATH ---
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  // Calculate how much of the circle to hide based on the efficiency percentage
  const strokeDashoffset = circumference - (stats.systemEfficiency / 100) * circumference;

  // --- 2. TIME HELPER ---
  const timeAgo = (dateString) => {
    if (!dateString) return 'Just now';
    const diffInSeconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // --- 3. ACTIVITY FEED GENERATOR ---
  // Sort projects by newest updates and take the top 4
  const recentActivity = [...projects]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 4)
    .map(project => {
      let actionText = 'updated';
      if (project.status === 'COMPLETED') actionText = 'completed';
      else if (project.status === 'IN PROGRESS') actionText = 'is working on';
      else if (project.status === 'TO DO') actionText = 'created';

      return {
        id: project.id,
        user: project.assignee?.name || 'Someone',
        action: actionText,
        projectTitle: project.title,
        time: timeAgo(project.updatedAt)
      };
    });

  return (
    <div className="flex h-screen bg-[#0d1117] text-gray-300 relative overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 p-6 pt-24 md:p-8 md:pt-8 overflow-y-auto">
        <Header />

        <header className="mb-10">
          <h1 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Manager's View</h1>
          <div className="h-1 w-12 bg-blue-500 mt-2 rounded"></div>
        </header>

        {/* TOP ROW */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          
          <div className="md:col-span-3 bg-[#1c2128] border border-gray-800 rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Total Projects</p>
            <h2 className="text-4xl font-bold text-blue-400">{stats.totalProjects}</h2>
          </div>

          <div className="md:col-span-3 bg-[#1c2128] border border-gray-800 rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Overdue Tasks</p>
            <h2 className={`text-4xl font-bold ${stats.overdueTasks > 0 ? 'text-red-400' : 'text-gray-600'}`}>
              {stats.overdueTasks}
            </h2>
          </div>

          {/* Create Project Button Card */}
          <Link to="/projects" className="md:col-span-6 bg-[#a2b2f8] hover:bg-[#8e9ff0] transition-colors border border-[#8e9ff0] rounded-2xl p-6 shadow-sm flex items-center justify-center group cursor-pointer">
            <h2 className="text-sm font-bold text-[#161b22] uppercase tracking-widest flex items-center group-hover:scale-105 transition-transform">
              <Plus size={20} className="mr-2" /> Create New Project
            </h2>
          </Link>

        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* SYSTEM EFFICIENCY CHART */}
          <div className="md:col-span-8 bg-[#1c2128] border border-gray-800 rounded-2xl p-8 shadow-sm flex flex-col relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-200">System Efficiency</h3>
              <span className="text-sm font-bold text-gray-400">{stats.systemEfficiency}%</span>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative">
              {/* SVG Circular Progress Bar */}
              <svg className="w-48 h-48 transform -rotate-90">
                {/* Background Track */}
                <circle
                  cx="96" cy="96" r={radius}
                  stroke="currentColor" strokeWidth="16" fill="transparent"
                  className="text-[#161b22]"
                />
                {/* Colored Progress Ring */}
                <circle
                  cx="96" cy="96" r={radius}
                  stroke="currentColor" strokeWidth="16" fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="text-blue-500 transition-all duration-1000 ease-out"
                />
              </svg>
              
              {/* Number inside the circle */}
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold text-gray-200">{stats.completedProjects}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Completed</span>
              </div>
            </div>
          </div>

          {/* TEAM ACTIVITY FEED */}
          <div className="md:col-span-4 bg-[#1c2128] border border-gray-800 rounded-2xl p-8 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-gray-200 mb-6">Team Activity</h3>
            
            <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
              {recentActivity.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No recent activity.</p>
              ) : (
                recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    {/* User Avatar Placeholder */}
                    <div className="w-8 h-8 rounded-full bg-[#2d333b] border border-gray-700 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-xs font-bold text-gray-400">
                        {activity.user.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-300">
                        <span className="font-bold text-blue-300">{activity.user}</span> {activity.action} <span className="text-gray-100">{activity.projectTitle}</span>
                      </p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}