const viewport = document.querySelector(".testimonials__viewport");
const track = document.getElementById("t-track");
const prevBtn = document.getElementById("t-prev");
const nextBtn = document.getElementById("t-next");

if (viewport && track && prevBtn && nextBtn) {
  const items = Array.from(track.children);
  let index = 0;

  function getVisibleCount() {
    const width = viewport.offsetWidth;
    if (width < 640) return 1;
    if (width < 960) return 2;
    return 3;
  }

  function getStep() {
    // Distancia de una tarjeta + el gap, medida en tiempo real.
    const first = items[0];
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    return first.getBoundingClientRect().width + gap;
  }

  function getMaxIndex() {
    return Math.max(items.length - getVisibleCount(), 0);
  }

  function update() {
    const maxIndex = getMaxIndex();
    index = Math.min(index, maxIndex);

    const step = getStep();
    track.style.transform = `translateX(-${index * step}px)`;

    prevBtn.classList.toggle("is-disabled", index === 0);
    nextBtn.classList.toggle("is-disabled", index >= maxIndex);
  }

  prevBtn.addEventListener("click", () => {
    if (index === 0) return;
    index -= 1;
    update();
  });

  nextBtn.addEventListener("click", () => {
    if (index >= getMaxIndex()) return;
    index += 1;
    update();
  });

  window.addEventListener("resize", update);

  update();
}