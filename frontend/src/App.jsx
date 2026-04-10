import { useState, useEffect } from 'react'
import Countdown from './components/Countdown'
import ChaosScreen from './components/ChaosScreen'
import { unlockAudio } from './utils/alarm'
import './index.css'

function App() {
  // Check if this is a popup spawned from chaos
  const isChaosOurselves = new URLSearchParams(window.location.search).get('chaos') === 'true';
  const [phase, setPhase] = useState(isChaosOurselves ? 'chaos' : 'init');

  useEffect(() => {
    // Need user interaction to start audio context and notifications
    const handleInteraction = () => {
      if (phase === 'init') {
        Notification.requestPermission();
        unlockAudio(); // Unlocks audio engine in the browser instantly!
        setPhase('countdown');
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [phase]);

  return (
    <div className="app-root">
      {phase === 'init' && (
        <div className="init-screen">
          <h1>BREW A COFFEE? ☕</h1>
          <button className="start-btn">YES PLEASE</button>
          <p className="small-text">(Click anywhere to begin)</p>
        </div>
      )}
      
      {phase === 'countdown' && (
        <Countdown onComplete={() => setPhase('chaos')} />
      )}
      
      {phase === 'chaos' && (
        <ChaosScreen />
      )}
    </div>
  )
}

export default App
