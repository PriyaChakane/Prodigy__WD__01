const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const menu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// 1. Scroll header background
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// 2. Mobile toggle + close on click
hamburger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      menu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

// 3. Scroll‑Spy with Intersection Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    const id = e.target.id;
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { threshold:0.6, rootMargin:"-100px 0px -50%" });

sections.forEach(sec => observer.observe(sec));

// 4. Animate underline on click using View Transition API
document.querySelector('nav').addEventListener('click', e => {
  if (e.target.matches('.nav-link:not(.active)')) {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navLinks.forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
      });
    } else {
      navLinks.forEach(l => l.classList.remove('active'));
      e.target.classList.add('active');
    }
  }
});

// 5. Keyboard navigation for menu
menu.addEventListener('keydown', e => {
  const items = [...menu.querySelectorAll('[role="menuitem"]')];
  const idx = items.indexOf(document.activeElement);
  if (e.key === 'ArrowDown') items[(idx+1)%items.length].focus();
  if (e.key === 'ArrowUp') items[(idx-1+items.length)%items.length].focus();
  if (e.key === 'Escape' && menu.classList.contains('open')) hamburger.click();
});
