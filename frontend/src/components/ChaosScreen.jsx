import { useEffect } from 'react';
import { setupTabTrap } from '../utils/tabTrap';
import { startLagEngine } from '../utils/lagEngine';
import { startAlarm } from '../utils/alarm';

export default function ChaosScreen() {
  useEffect(() => {
    // Lock the tab down
    setupTabTrap();
    
    // 🛑 DANGER: LAG ENGINE IS COMMENTED OUT FOR SAFE TESTING 🛑
     startLagEngine();
    
    // Start siren
    startAlarm();

    // Signal the Service Worker to start the undying notification loop
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'START_CHAOS' });
    }

  }, []);

  return (
    <div className="chaos-container">
      <div className="ambulance-light"></div>
      <div className="chaos-text-container">
        <h1 className="glitch-text" data-text="ERROR 418">ERROR 418</h1>
        <h2>I'M A TEAPOT</h2>
        <p>SYSTEM CORRUPTION IN PROGRESS. HARD RESTART DEVICE IMMEDIATELY.</p>
      </div>
    </div>
  );
}
