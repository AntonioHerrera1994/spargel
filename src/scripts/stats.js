// stats-bar.js
// Anima los números (0 -> valor final) cuando la barra entra en pantalla.

const numbers = document.querySelectorAll(".stats__number");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  if (Number.isNaN(target)) return;

  if (prefersReducedMotion) {
    el.textContent = target;
    return;
  }

  const duration = 1200; // ms
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    // easeOutQuad: arranca rápido y desacelera al final
    const eased = 1 - (1 - progress) * (1 - progress);
    const current = Math.round(eased * target);
    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(tick);
}

if (numbers.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  numbers.forEach((el) => observer.observe(el));
}