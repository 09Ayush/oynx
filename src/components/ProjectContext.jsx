import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  // 1. ADD NEW STATE FOR STATS
  const [stats, setStats] = useState({ totalProjects: 0, completedProjects: 0, overdueTasks: 0, systemEfficiency: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // 2. CREATE A FUNCTION TO FETCH STATS
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboardStats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load database projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
    fetchStats(); // Fetch stats when app loads
  }, []);

  const addProject = async (projectData) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      const newProject = await response.json();
      setProjects((prev) => [newProject, ...prev]);
      fetchStats(); // RE-FETCH STATS TO UPDATE UI INSTANTLY
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const updateProject = async (id, updatedFields) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) return;
      
      const updatedProject = await response.json();
      setProjects(projects.map(p => p.id === id ? updatedProject : p));
      fetchStats(); // RE-FETCH STATS
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter(p => p.id !== id));
      fetchStats(); // RE-FETCH STATS
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const toggleArchiveStatus = async (id) => {
    const project = projects.find(p => p.id === id);
    if (!project) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isArchived: !project.isArchived }),
      });
      if (!response.ok) return;

      const updatedProject = await response.json();
      setProjects(projects.map(p => p.id === id ? updatedProject : p));
      fetchStats(); // RE-FETCH STATS
    } catch (error) {
      console.error("Failed to archive project:", error);
    }
  };

  // EXPORT THE STATS HERE
  return (
    <ProjectContext.Provider value={{ projects, stats, addProject, updateProject, deleteProject, toggleArchiveStatus, isLoading }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectStore = () => useContext(ProjectContext);