/* ============================================
   PORTFOLIO SCRIPT — Darren Dharma Sintarja
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     1. SCROLL REVEAL
     Uses IntersectionObserver to fade/slide in
     elements with class .reveal
  ------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Stagger siblings within the same parent
            const parent = entry.target.parentElement;
            const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
            const idx = siblings.indexOf(entry.target);
            const delay = idx * 90; // 90ms per sibling

            setTimeout(function () {
              entry.target.classList.add('visible');
            }, delay);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for old browsers
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }


  /* ------------------------------------------
     2. NAVBAR — scroll class + shrink
  ------------------------------------------ */
  var navbar = document.getElementById('navbar');

  function onScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load


  /* ------------------------------------------
     3. HAMBURGER MENU
  ------------------------------------------ */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('nav-links');

  function openMenu() {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent scroll while open
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when any nav link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });


  /* ------------------------------------------
     4. SMOOTH SCROLL for anchor links
     Works cross-browser
  ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var navH = navbar ? navbar.offsetHeight : 0;
      var top  = target.getBoundingClientRect().top + window.pageYOffset - navH - 16;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });


  /* ------------------------------------------
     5. ACTIVE NAV HIGHLIGHT on scroll
  ------------------------------------------ */
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-a');

  function setActiveNav() {
    var scrollY = window.pageYOffset;
    var navH = navbar ? navbar.offsetHeight : 0;

    sections.forEach(function (section) {
      var top    = section.offsetTop - navH - 80;
      var bottom = top + section.offsetHeight;

      if (scrollY >= top && scrollY < bottom) {
        navAnchors.forEach(function (a) { a.classList.remove('active'); });
        var active = document.querySelector('.nav-a[href="#' + section.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

})();
