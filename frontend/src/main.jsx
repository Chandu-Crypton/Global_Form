import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ProfileProvider } from './context/ProfileContext'; // Import the provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProfileProvider> 
      <App />
    </ProfileProvider>
  </StrictMode>
);
