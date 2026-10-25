/**
 * Lightweight, zero-dependency canvas confetti explosion.
 * Respects prefers-reduced-motion.
 */
export function triggerConfetti() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const colors = ['#FF6046', '#101010', '#F1EDE5', '#FF8D7A', '#FFD166', '#06D6A0'];
  const particleCount = 80;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: width / 2,
      y: height * 0.65,
      vx: (Math.random() - 0.5) * 16,
      vy: -(Math.random() * 14 + 8),
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      alpha: 1,
      decay: Math.random() * 0.015 + 0.01,
      shape: Math.random() > 0.4 ? 'rect' : 'circle',
    });
  }

  let animationFrame;
  const render = () => {
    ctx.clearRect(0, 0, width, height);
    let aliveCount = 0;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // Gravity
      p.vx *= 0.98; // Friction
      p.rotation += p.vRot;
      p.alpha -= p.decay;

      if (p.alpha > 0) {
        aliveCount++;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    if (aliveCount > 0) {
      animationFrame = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrame);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    }
  };

  render();
}
