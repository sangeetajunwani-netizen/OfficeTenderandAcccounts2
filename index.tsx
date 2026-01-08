
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Nexus Error: Root element not found.");
    return;
  }

  console.log("Nexus System: Starting mount sequence...");
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Nexus System: React render call successful.");

    // Register Service Worker for PWA installability
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(registration => {
          console.log('Nexus SW: Registered with scope:', registration.scope);
        }).catch(err => {
          console.log('Nexus SW: Registration skipped or failed (common on local files):', err);
        });
      });
    }
  } catch (err) {
    console.error("Nexus System: Mounting failed", err);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
