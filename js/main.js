// DRL-FPV-Arena - Main JavaScript

// Theme Toggle
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
  }
}

// RTL/LTR Toggle
function initDirection() {
  const savedDirection = localStorage.getItem('direction') || 'ltr';
  document.documentElement.setAttribute('dir', savedDirection);
  updateDirectionIcon(savedDirection);
}

function toggleDirection() {
  const currentDir = document.documentElement.getAttribute('dir');
  const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', newDir);
  localStorage.setItem('direction', newDir);
  updateDirectionIcon(newDir);
}

function updateDirectionIcon(dir) {
  const dirIcon = document.getElementById('dir-icon');
  if (dirIcon) {
    dirIcon.textContent = dir === 'ltr' ? '🌐' : '🌍';
  }
}

// Mobile Menu
function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('overlay');
  
  if (menuToggle && mobileMenu && overlay) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    overlay.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}

// Close mobile menu on link click
function closeMobileMenuOnLinkClick() {
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('overlay');
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.remove('active');
      overlay?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Dropdown Toggle for Mobile
function initDropdowns() {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.closest('.dropdown');
      const menu = parent?.querySelector('.dropdown-menu');
      
      if (menu) {
        menu.classList.toggle('show');
      }
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });
}

// Active Link Highlight
function setActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('a');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else if (currentPage === 'index.html' && href === 'home2.html') {
      link.classList.remove('active');
    }
  });
}

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(el => observer.observe(el));
}

// Load Navbar
async function loadNavbar() {
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  if (!navbarPlaceholder) return;
  
  try {
    const response = await fetch('/components/navbar.html');
    const html = await response.text();
    navbarPlaceholder.innerHTML = html;
    
    // Re-initialize after navbar loads
    initTheme();
    initDirection();
    initMobileMenu();
    closeMobileMenuOnLinkClick();
    initDropdowns();
    setActiveLink();
  } catch (error) {
    console.error('Error loading navbar:', error);
  }
}

// Load Footer
async function loadFooter() {
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (!footerPlaceholder) return;
  
  try {
    const response = await fetch('/components/footer.html');
    const html = await response.text();
    footerPlaceholder.innerHTML = html;
  } catch (error) {
    console.error('Error loading footer:', error);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  initMobileMenu();
  closeMobileMenuOnLinkClick();
  initDropdowns();
  setActiveLink();
  initScrollAnimations();
  
  // Animate counters if they exist
  if (document.querySelector('.counter')) {
    animateCounters();
  }
});

// Export for global use
window.toggleTheme = toggleTheme;
window.toggleDirection = toggleDirection;