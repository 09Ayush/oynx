import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';


import { ProjectProvider } from './components/ProjectContext';
import { TeamProvider } from './components/TeamContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProjectProvider>
        <TeamProvider>
          <App />
        </TeamProvider>
      </ProjectProvider>
    </BrowserRouter>
  </React.StrictMode>
);