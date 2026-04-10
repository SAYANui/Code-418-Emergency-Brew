export function startAlarm() {
  try {
    // Play the custom audio file multiple times with a slight delay 
    // to create an echoing, chaotic, impossible-to-ignore sound!
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const audio = new Audio('/please.mp3');
        audio.loop = true;
        audio.volume = 1.0; // MAX VOLUME
        audio.play().catch(e => console.error("Audio block:", e));
      }, i * 400); // 400ms offset per track
    }
  } catch (e) {
    console.error("Audio block:", e);
  }
}
