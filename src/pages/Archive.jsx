import React, { useState } from "react";
import { Plus, ArchiveRestore, User } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CreateProjectModal from "../components/CreateProjectModal";
import { useProjectStore } from "../components/ProjectContext";

export default function Archive() {
  const { projects, toggleArchiveStatus } = useProjectStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter to ONLY show archived projects
  const archivedProjects = projects.filter((project) => project.isArchived);

  return (
    <div className="flex h-screen bg-[#0d1117] text-gray-300 font-sans relative overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-6 pt-24 md:p-8 md:pt-8 overflow-y-auto">
        <Header />

        {/* Page Title Section - MADE RESPONSIVE */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-300">
              Archived Projects
            </h1>
            <div className="h-1 w-16 bg-blue-500 mt-2 rounded"></div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#a2b2f8] hover:bg-[#8e9ff0] transition-colors rounded-xl flex items-center justify-center text-[#161b22] font-bold text-xs tracking-widest py-3 px-6 shadow-lg w-full sm:w-auto"
            >
              <Plus size={18} className="mr-2" /> NEW PROJECT
            </button>
          </div>
        </header>

        {/* Dynamic Rendering: Grid or Empty State */}
        {archivedProjects.length === 0 ? (
          <div className="w-full border-2 border-dashed border-gray-800 rounded-2xl h-64 flex items-center justify-center">
            <p className="text-gray-500 font-medium tracking-wide">
              No projects in your archive.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6">
            {archivedProjects.map((project) => (
              <div
                key={project.id}
                className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#1c2128] rounded-3xl p-8 flex flex-col border border-gray-800 shadow-inner relative group transition-all duration-300"
              >
                {/* Archived Badge */}
                <span className="absolute top-6 right-6 bg-[#2d333b] text-gray-400 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  Archived
                </span>

                
                <h3 className="text-lg font-bold text-blue-300 mb-6 truncate pr-24">
                  {project.title}
                </h3>

                <div className="mt-auto border-t border-gray-800/50 pt-6">
                  {/* Assignee Section */}
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#161b22] border border-gray-800/80 flex items-center justify-center shadow-sm">
                      <User className="text-gray-500 w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-gray-400 font-medium truncate max-w-[100px]">
                      {project.assignee?.name || "Unassigned"}
                    </span>
                  </div>
                </div>

                {/* Action Panel */}
                <div className="flex gap-2.5 mt-6 border-t border-gray-800/50 pt-6">
                  <ActionIcon
                    icon={ArchiveRestore}
                    color="text-gray-700 hover:text-green-400 hover:bg-green-950/20"
                    onClick={() => toggleArchiveStatus(project.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

// Helper ActionIcon component
const ActionIcon = ({ icon: Icon, color, onClick }) => (
  <button
    onClick={onClick}
    className={`p-2.5 rounded-lg bg-[#161b22] border border-gray-800/60 transition-colors ${color}`}
  >
    <Icon size={18} />
  </button>
);