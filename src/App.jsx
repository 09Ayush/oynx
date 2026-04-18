
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Archive from './pages/Archive';
import ManageTeam from './pages/ManageTeam';
import Settings from './pages/Settings';


import { ProjectProvider } from './components/ProjectContext';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    // Wraping everything in AuthProvider first!
    <AuthProvider>
      <ProjectProvider>
        <Routes>
          {/* THE PUBLIC ROUTE */}
          <Route path="/" element={<Login />} />
          
          {/* THE PROTECTED ROUTES */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          
          <Route path="/projects" element={
            <ProtectedRoute><Projects /></ProtectedRoute>
          } />
          
          <Route path="/archive" element={
            <ProtectedRoute><Archive /></ProtectedRoute>
          } />
          
          <Route path="/manage-team" element={
            <ProtectedRoute><ManageTeam /></ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute><Settings /></ProtectedRoute>
          } />

          {/* Catch-all route for bad URLs */}
          <Route path="*" element={<div className="p-8 text-white h-screen bg-[#0d1117] flex items-center justify-center">404 - Page not found</div>} />
        </Routes>
      </ProjectProvider>
    </AuthProvider>
  );
}