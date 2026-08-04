window.addEventListener('load', () => {
  setTimeout(() => {
    // Open the gallery
    document.getElementById('gallery-btn')?.click();
    // After 1s, check modal bounds
    setTimeout(() => {
      const modal = document.getElementById('gallery-modal');
      const content = modal?.querySelector('.modal-content');
      console.log('MODAL:', modal?.getBoundingClientRect());
      console.log('CONTENT:', content?.getBoundingClientRect());
      console.log('CONTENT COMPUTED RIGHT:', getComputedStyle(content).right);
      console.log('CONTENT COMPUTED LEFT:', getComputedStyle(content).left);
    }, 1000);
  }, 1000);
});
