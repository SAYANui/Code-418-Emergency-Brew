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

    // Play the custom audio file multiple times with a slight delay 
    // to create an echoing, chaotic, impossible-to-ignore sound!
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
        const audio = new Audio('/please.mp3');
        audio.loop = true;
        audio.volume = 1.0; // MAX VOLUME
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
