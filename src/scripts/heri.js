// hero.js
// Controla el slider: avanza / retrocede una imagen a la vez, en loop.

const track = document.getElementById("slider-track");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

if (track && prevBtn && nextBtn) {
  const slides = Array.from(track.children);
  const total = slides.length;
  let currentIndex = 0;

  function goTo(index) {
    currentIndex = (index + total) % total;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // El botón "siguiente" queda resaltado mientras se navega hacia adelante;
    // ambos botones permanecen usables ya que el recorrido es circular.
    nextBtn.classList.add("is-active");
    prevBtn.classList.remove("is-active");
  }

  nextBtn.addEventListener("click", () => {
    goTo(currentIndex + 1);
    nextBtn.classList.add("is-active");
  });

  prevBtn.addEventListener("click", () => {
    goTo(currentIndex - 1);
    prevBtn.classList.add("is-active");
    nextBtn.classList.remove("is-active");
  });

  // Soporte de teclado (flechas) cuando el slider tiene foco
  const sliderWrapper = document.getElementById("hero-slider");
  if (sliderWrapper) {
    sliderWrapper.setAttribute("tabindex", "0");
    sliderWrapper.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") nextBtn.click();
      if (event.key === "ArrowLeft") prevBtn.click();
    });
  }

  goTo(0);
}