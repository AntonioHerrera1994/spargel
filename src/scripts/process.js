const INTERVAL_MS = 5000;

const steps = Array.from(document.querySelectorAll(".process-step"));
const images = Array.from(document.querySelectorAll(".process__image"));

if (steps.length && images.length) {
  let currentIndex = 0;

  function setActive(index) {
    steps.forEach((step, i) => {
      step.classList.toggle("is-active", i === index);
    });
    images.forEach((img, i) => {
      img.classList.toggle("is-active", i === index);
    });
  }

  // Estado inicial: primer paso activo
  setActive(currentIndex);

  function advance() {
    currentIndex = (currentIndex + 1) % steps.length;
    setActive(currentIndex);
  }

  // Un único temporizador, siempre corriendo cada 5s, sin condiciones
  // que puedan crear un segundo intervalo (eso causaba que un paso
  // se saltara antes de tiempo).
  setInterval(advance, INTERVAL_MS);
}