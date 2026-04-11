import React, { createContext, useContext, useState, useEffect } from 'react';

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState([]);

  // FETCH TEAM
  const fetchTeam = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      console.error("Failed to load team from database:", error);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // ADD NEW MEMBER
  const addTeamMember = async (userData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const newUser = await response.json();
      // Instantly update the UI
      setTeamMembers((prev) => [newUser, ...prev]);
    } catch (error) {
      console.error("Failed to add team member:", error);
    }
  };

  // DELETE MEMBER
  const deleteTeamMember = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error("Failed to delete");
      
      // Instantly remove from the UI
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    } catch (error) {
      console.error("Failed to delete team member:", error);
    }
  };

  return (
    <TeamContext.Provider value={{ teamMembers, addTeamMember, deleteTeamMember }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamStore = () => useContext(TeamContext);