// Rio Clássica — interações da página pública

// ============================================
// Menu mobile
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
let mobileMenuOpen = false;

function closeMobileNav() {
  if (!navLinks || !menuToggle) return;
  mobileMenuOpen = false;
  navLinks.classList.remove('visible');
  menuToggle.textContent = '☰';
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    mobileMenuOpen = !mobileMenuOpen;
    navLinks.classList.toggle('visible', mobileMenuOpen);
    menuToggle.textContent = mobileMenuOpen ? '✕' : '☰';
  });
}

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', closeMobileNav);
});

window.closeMobileNav = closeMobileNav;

// ============================================
// Scroll suave para âncoras internas
// ============================================
const HEADER_OFFSET = 80;

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - HEADER_OFFSET, behavior: 'smooth' });
  });
});

// ============================================
// Sombra do header ao rolar
// ============================================
const header = document.querySelector('.header');

if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow =
      window.scrollY > 50
        ? '0 4px 16px rgba(10, 37, 64, 0.15)'
        : '0 2px 8px rgba(10, 37, 64, 0.08)';
  });
}

// ============================================
// Animação de entrada (fade-in ao aparecer na tela)
// ============================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity = '1';
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.roteiro-card, .contact-item').forEach((el) => {
  el.style.opacity = '0';
  revealObserver.observe(el);
});

// ============================================
// Acessibilidade por teclado
// ============================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenuOpen) closeMobileNav();
  if (e.key === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
});
document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ============================================
// Galeria de fotos
// ============================================
const GALLERY_AUTOPLAY_INTERVAL = 10000;
let currentGalleryIndex = 1;
let galleryAutoplayTimer;

function showGalleryImage(n) {
  const items = document.querySelectorAll('.gallery-item');
  const indicators = document.querySelectorAll('.indicator');
  if (!items.length) return;

  if (n > items.length) currentGalleryIndex = 1;
  if (n < 1) currentGalleryIndex = items.length;

  items.forEach((item) => (item.style.display = 'none'));
  indicators.forEach((indicator) => indicator.classList.remove('active'));

  items[currentGalleryIndex - 1]?.style.setProperty('display', 'block');
  indicators[currentGalleryIndex - 1]?.classList.add('active');
}

function startGalleryAutoplay() {
  galleryAutoplayTimer = setInterval(() => {
    currentGalleryIndex += 1;
    showGalleryImage(currentGalleryIndex);
  }, GALLERY_AUTOPLAY_INTERVAL);
}

function resetGalleryAutoplay() {
  clearInterval(galleryAutoplayTimer);
  startGalleryAutoplay();
}

function galleryNext() {
  showGalleryImage((currentGalleryIndex += 1));
  resetGalleryAutoplay();
}

function galleryPrev() {
  showGalleryImage((currentGalleryIndex -= 1));
  resetGalleryAutoplay();
}

function galleryGoTo(n) {
  showGalleryImage((currentGalleryIndex = n));
  resetGalleryAutoplay();
}

document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelectorAll('.gallery-item').length) return;
  showGalleryImage(currentGalleryIndex);
  startGalleryAutoplay();
});

document.addEventListener('keydown', (e) => {
  const gallery = document.querySelector('.gallery-section');
  if (!gallery) return;
  const rect = gallery.getBoundingClientRect();
  const visible = rect.top < window.innerHeight && rect.bottom > 0;
  if (!visible) return;
  if (e.key === 'ArrowRight') galleryNext();
  if (e.key === 'ArrowLeft') galleryPrev();
});

const galleryDisplay = document.querySelector('.gallery-display');
if (galleryDisplay) {
  let touchStartX = 0;
  galleryDisplay.addEventListener(
    'touchstart',
    (e) => (touchStartX = e.changedTouches[0].screenX),
    false
  );
  galleryDisplay.addEventListener(
    'touchend',
    (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) galleryNext();
      if (touchEndX > touchStartX + 50) galleryPrev();
    },
    false
  );
}

window.galleryNext = galleryNext;
window.galleryPrev = galleryPrev;
window.galleryGoTo = galleryGoTo;
