const revealTargets = document.querySelectorAll(
  ".about__image, .feature-card, .about__content"
);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (revealTargets.length && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // pequeño desfase entre elementos para un efecto escalonado
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, i * 80);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));
} else {
  // Si el usuario prefiere menos movimiento, se muestran directo (ya lo cubre el CSS).
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}