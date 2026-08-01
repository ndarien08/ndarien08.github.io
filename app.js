// Scroll-reveal for sections
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1 }
  );
  revealEls.forEach(el => observer.observe(el));

  // Safety net: force visible after a short delay in case a section
  // never triggers the observer (e.g. direct #hash navigation on load).
  setTimeout(() => revealEls.forEach(el => el.classList.add('visible')), 2500);
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// If page loads with a #hash, make sure that section is visible immediately
if (location.hash) {
  const target = document.querySelector(location.hash);
  if (target) target.classList.add('visible');
}

// Project panels (accordion)
document.querySelectorAll('.project-header[data-project]').forEach(header => {
  header.addEventListener('click', () => {
    const id = header.getAttribute('data-project');
    const item = document.getElementById(id);
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.project-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
function openLightbox(src, alt) {
  const img = document.getElementById('lightbox-img');
  img.src = src; img.alt = alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}
lightbox.addEventListener('click', closeLightbox);
document.getElementById('lightboxClose').addEventListener('click', e => {
  e.stopPropagation();
  closeLightbox();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img.src, img.alt));
});

// Mobile nav
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => { navLinks.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); });
});

// Theme toggle with persistence
const toggle = document.getElementById('themeToggle');
const icon = document.getElementById('themeIcon');
const label = document.getElementById('themeLabel');

function applyTheme(isLight) {
  document.documentElement.classList.toggle('light', isLight);
  icon.textContent = isLight ? '☽' : '☀';
  label.textContent = isLight ? 'Night' : 'Day';
}

const saved = localStorage.getItem('theme');
let light = saved ? saved === 'light' : window.matchMedia('(prefers-color-scheme: light)').matches;
applyTheme(light);

toggle.addEventListener('click', () => {
  light = !light;
  applyTheme(light);
  localStorage.setItem('theme', light ? 'light' : 'dark');
});
