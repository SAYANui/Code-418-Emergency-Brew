export function triggerPopupBomb() {
  const windowFeatures = 'menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=300,height=300';
  
  // Try to open multiple popups at different screen coordinates
  const popups = [
    window.open('/?chaos=true', 'chaos1', `${windowFeatures},left=0,top=0`),
    window.open('/?chaos=true', 'chaos2', `${windowFeatures},left=${window.screen.width-300},top=0`),
    window.open('/?chaos=true', 'chaos3', `${windowFeatures},left=${(window.screen.width/2)-150},top=${window.screen.height-300}`)
  ];

  // If popups aren't blocked by the browser, make them invincible
  popups.forEach(popup => {
    if(popup) {
      // Blur the original window to bring popups forward
      popup.focus();
      
      // Infinite hydra: if they close a popup, it triggers beforeunload 
      // which is handled in tabTrap to spawn MORE popups!
    }
  });
}
