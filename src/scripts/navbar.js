// ===== TOGGLE MENÚ MÓVIL =====
const toggleBtn = document.getElementById('navbarToggle');
const menu = document.getElementById('navbarMenu');

if (toggleBtn && menu) {
  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('open');
    menu.classList.toggle('open');
  });

  // Cerrar el menú al hacer clic en un enlace (opcional)
  const links = menu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

// ===== SOMBRA AL HACER SCROLL (efecto sticky mejorado) =====
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}