document.addEventListener('DOMContentLoaded', () => {
  const aiSection = document.getElementById('movenAiSection');
  const blurCluster = document.querySelector('.ai-blur-cluster');

  if (!aiSection || !blurCluster) {
    console.warn('Missing blur cluster element');
    return;
  }

  // ✨ Parallax on mouse move
  window.addEventListener('mousemove', (e) => {
    const offsetX = (e.clientX / window.innerWidth - 0.5) * 40;
    const offsetY = (e.clientY / window.innerHeight - 0.5) * 40;
    blurCluster.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });

  // 🔁 AI-style blur movement loop
  const positions = [
    { x: '-25%', y: '-20%' }, // left-upper
    { x: '0%',    y: '-10%' }, // center-upper
    { x: '25%',   y: '-15%' }, // right-upper
    { x: '0%',    y: '-5%' }   // center-middle
  ];

  let index = 0;

  function nextPosition() {
    const pos = positions[index];

    // Fade out and prepare transition
    blurCluster.style.transition = 'opacity 1s ease, transform 1.5s ease';
    blurCluster.style.opacity = '0';

    setTimeout(() => {
      // Shift position and fade in
      blurCluster.style.transform = `translate(${pos.x}, ${pos.y})`;
      blurCluster.style.opacity = '0.9';

      // Cycle to next
      index = (index + 1) % positions.length;
      setTimeout(nextPosition, 3000);
    }, 1200);
  }

  // ⏱ Begin auto-shift on page load
  window.addEventListener('load', () => {
    setTimeout(nextPosition, 3000);
  });
});