// ================================
// Theme Toggle (Dark / Light)
// ================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;

// Check saved preference or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
} else if (systemPrefersDark) {
  html.setAttribute('data-theme', 'dark');
  updateThemeIcon('dark');
}

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ================================
// Mobile Menu
// ================================
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ================================
// Smooth scroll offset is handled by CSS (scroll-padding-top)
// ================================

// ================================
// Fade-in animations on scroll
// ================================
const fadeElements = document.querySelectorAll(
  '.section-title, .about-content, .timeline-item, .skill-category, .project-card, .achievement-item, .contact-grid'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after animation so it only plays once
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  }
);

fadeElements.forEach(el => observer.observe(el));

// ================================
// Contact Form Validation
// ================================
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Clear previous errors
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  formStatus.textContent = '';

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  let isValid = true;

  if (name.length < 2) {
    document.getElementById('name-error').textContent = 'Please enter your name (at least 2 characters).';
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById('email-error').textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  if (message.length < 10) {
    document.getElementById('message-error').textContent = 'Message should be at least 10 characters.';
    isValid = false;
  }

  if (isValid) {
    // Since this is a static site, we show a success message.
    // In a real project you would send the data to a service (Formspree, etc.)
    formStatus.textContent = 'Thank you! Your message has been prepared. (In a live site this would be sent.)';
    formStatus.style.color = 'var(--accent)';
    form.reset();
  } else {
    formStatus.textContent = 'Please fix the errors above.';
    formStatus.style.color = '#ef4444';
  }
});

// ================================
// Footer year
// ================================
document.getElementById('year').textContent = new Date().getFullYear();
