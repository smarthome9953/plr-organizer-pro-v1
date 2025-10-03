
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize dark mode from localStorage or system preference
const initDarkMode = () => {
  // Check for user preference in localStorage
  const savedTheme = localStorage.getItem('plrOrganizerTheme');
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    // If no preference is stored, use system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (systemPrefersDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('plrOrganizerTheme', 'dark');
    }
  }
};

// Initialize dark mode before rendering the app
initDarkMode();

createRoot(document.getElementById("root")!).render(<App />);
