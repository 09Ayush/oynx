import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// 1. Import your Global Context Providers
import { ProjectProvider } from './components/ProjectContext';
import { TeamProvider } from './components/TeamContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 2. Wrap the App with Providers. 
        The order doesn't strictly matter here, but nesting them 
        allows both Projects and Team data to be available everywhere.
      */}
      <ProjectProvider>
        <TeamProvider>
          <App />
        </TeamProvider>
      </ProjectProvider>
    </BrowserRouter>
  </React.StrictMode>
);