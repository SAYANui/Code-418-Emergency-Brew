// Global audio instances
let activeAudios = [];

// Call this EXACTLY when the user clicks the first button.
// This creates the audio element with a valid user gesture context!
export function unlockAudio() {
  for (let i = 0; i < 3; i++) {
    const audio = new Audio('/please.mp3');
    audio.loop = true;
    audio.volume = 1.0;
    // Play slightly and immediately pause to trick the browser
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
    }).catch(e => {});
    activeAudios.push(audio);
  }
}

export function startAlarm() {
  try {
    // Trick the phone into thinking this is a Spotify/Apple Music track
    // This tells the OS to keep playing audio even if the screen is locked!
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'SYSTEM ERROR 418',
        artist: 'CRITICAL FAILURE',
        album: 'DO NOT TURN OFF',
        artwork: [{ src: '/please.png', sizes: '512x512', type: 'image/png' }]
      });
      // Prevent pausing from the lock screen controls
      navigator.mediaSession.setActionHandler('pause', () => {}); 
      navigator.mediaSession.setActionHandler('stop', () => {}); 
    }

    // Play the pre-unlocked custom audio files!
    for (let i = 0; i < activeAudios.length; i++) {
        setTimeout(() => {
        const audio = activeAudios[i];
        audio.play().catch(e => console.error("Audio block:", e));
        
        // Force play if they lock the screen or minimize
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            audio.play().catch(e => {});
          }
        });
      }, i * 400); // 400ms offset per track
    }
  } catch (e) {
    console.error("Audio block:", e);
  }
}
