import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from './AuthContext'; 
import {
  LayoutDashboard,
  FolderKanban,
  Archive,
  Users,
  Settings,
  LogOut,
  Menu, // <-- Added Hamburger icon
  X     // <-- Added Close icon
} from "lucide-react";

const navLinks = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FolderKanban, label: "Projects", path: "/projects" },
  { icon: Archive, label: "Archive", path: "/archive" },
  { icon: Users, label: "Manage Team", path: "/manage-team" },
];

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth(); 
  
  // State to handle mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  // Helper to close menu when a mobile user clicks a link
  const handleNavClick = () => setIsOpen(false);

  return (
    <>
      {/* MOBILE HAMBURGER BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-6 left-6 z-40 p-2.5 bg-[#1c2128] border border-gray-800 rounded-xl text-gray-300 shadow-xl hover:text-white transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* MOBILE OVERLAY (Darkens background when open) */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-50 w-64 bg-[#161b22] flex flex-col p-6 border-r border-gray-800 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}`}
      >
        
        {/* Header with Mobile Close Button */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-blue-400 font-bold text-3xl tracking-widest uppercase">
            Oynx
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-300 transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={`flex items-center space-x-4 p-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#2d333b] text-blue-400"
                    : "hover:bg-[#1c2128] text-gray-300"
                }`}
              >
                <link.icon size={20} />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-8">
            <Link
              to="/settings"
              onClick={handleNavClick}
              className="flex items-center space-x-4 p-3 rounded-xl transition-all hover:bg-[#1c2128] text-gray-300"
            >
              <Settings size={20} />
              <span className="font-medium">Settings</span>
            </Link>
          </div>
        </nav>

        <button
          onClick={logout}
          className="flex items-center space-x-3 text-red-400 mt-auto hover:bg-red-900/10 p-2 rounded w-full transition-colors cursor-pointer"
        >
          <LogOut size={20} />
          <span className="text-xs font-bold uppercase tracking-widest">
            Logout
          </span>
        </button>
      </aside>
    </>
  );
}