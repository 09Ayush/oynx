import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../components/AuthContext'; // Import the Auth hook!

export default function Login() {
  const { login } = useAuth(); // Grab the login function from context
  const [error, setError] = useState('');
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear the red error message when they start typing again
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Pass the credentials to your context
    const success = login(credentials.username, credentials.password);
    
    if (!success) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] p-4 font-sans text-gray-300">
      <div className="bg-[#1c2128] w-full max-w-sm p-10 rounded-2xl border border-gray-800 shadow-2xl">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#2d333b] rounded-full flex items-center justify-center mb-4">
            <User className="text-gray-400" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-[#a2b2f8]">Login</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-200">Username</label>
            <input 
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              className="w-full bg-[#161b22] border border-gray-700/50 p-3.5 rounded-lg text-white placeholder-gray-600 focus:border-[#a2b2f8] focus:ring-1 focus:ring-[#a2b2f8] outline-none transition-all text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-200">Password</label>
            <input 
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full bg-[#161b22] border border-gray-700/50 p-3.5 rounded-lg text-white placeholder-gray-600 focus:border-[#a2b2f8] focus:ring-1 focus:ring-[#a2b2f8] outline-none transition-all tracking-widest text-sm"
            />
          </div>

          {/* Dynamic Error Message */}
          {error && <p className="text-red-400 text-xs font-bold text-center">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-[#a2b2f8] hover:bg-[#8e9ff0] text-[#161b22] font-bold py-3.5 rounded-lg text-sm transition-colors mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}