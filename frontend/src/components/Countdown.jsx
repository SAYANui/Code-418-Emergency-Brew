import { useState, useEffect } from 'react';

export default function Countdown({ onComplete }) {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      // Play a tick sound if user has interacted
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.frequency.value = 800 - (count * 50); // Gets lower/more ominous as counting down
        osc.type = 'triangle';
        osc.connect(ctx.destination);
        osc.start();
        setTimeout(() => osc.stop(), 50);
      } catch (e) {}

      setCount(c => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  // Give a visceral shaking effect that gets worse as it counts down
  const intensity = (6 - count) * 2; 

  return (
    <div className="countdown-container">
      <h1 
        className="countdown-text"
        style={{
          transform: `translate(${Math.random() * intensity - intensity/2}px, ${Math.random() * intensity - intensity/2}px)`,
          color: count <= 2 ? '#ff0000' : '#ffffff'
        }}
      >
        {count}
      </h1>
      <p className="countdown-sub">SYSTEM CALIBRATION</p>
      
      {/* Hidden button to trick browsers into granting user interaction context */}
      <button 
        className="hidden-interact" 
        onClick={() => {}}
      >
        Click to Verify
      </button>
    </div>
  );
}
