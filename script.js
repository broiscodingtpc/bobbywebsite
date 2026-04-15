/* ============================================
   LIMITLESS CONTRACTING — JS
   ============================================ */

(function () {
  'use strict';

  // --- NAV SCROLL ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function handleNavScroll() {
    const y = window.scrollY;
    nav.classList.toggle('nav--scrolled', y > 60);
    lastScroll = y;
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- MOBILE MENU ---
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', function () {
    burger.classList.toggle('nav__burger--open');
    navLinks.classList.toggle('nav__links--open');
    document.body.style.overflow = navLinks.classList.contains('nav__links--open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      burger.classList.remove('nav__burger--open');
      navLinks.classList.remove('nav__links--open');
      document.body.style.overflow = '';
    });
  });

  // --- REEL / CAROUSEL ---
  const track = document.getElementById('reelTrack');
  const prevBtn = document.getElementById('reelPrev');
  const nextBtn = document.getElementById('reelNext');
  const currentEl = document.getElementById('reelCurrent');
  const slides = track.querySelectorAll('.reel__slide');
  let pos = 0;
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;

  function getSlideWidth() {
    return slides[0].offsetWidth + parseInt(getComputedStyle(track).gap);
  }

  function getMaxPos() {
    return track.scrollWidth - track.parentElement.offsetWidth;
  }

  function updateCounter() {
    const slideW = getSlideWidth();
    const idx = Math.round(pos / slideW) + 1;
    currentEl.textContent = Math.min(Math.max(idx, 1), slides.length);
  }

  function moveTo(newPos) {
    pos = Math.max(0, Math.min(newPos, getMaxPos()));
    track.style.transform = 'translateX(' + (-pos) + 'px)';
    updateCounter();
  }

  prevBtn.addEventListener('click', function () {
    moveTo(pos - getSlideWidth());
  });

  nextBtn.addEventListener('click', function () {
    moveTo(pos + getSlideWidth());
  });

  // Drag support
  track.addEventListener('mousedown', function (e) {
    isDragging = true;
    startX = e.clientX;
    scrollStart = pos;
    track.style.transition = 'none';
  });

  window.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    var diff = startX - e.clientX;
    moveTo(scrollStart + diff);
  });

  window.addEventListener('mouseup', function () {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';
    // Snap to nearest slide
    var slideW = getSlideWidth();
    moveTo(Math.round(pos / slideW) * slideW);
  });

  // Touch support
  track.addEventListener('touchstart', function (e) {
    isDragging = true;
    startX = e.touches[0].clientX;
    scrollStart = pos;
    track.style.transition = 'none';
  }, { passive: true });

  track.addEventListener('touchmove', function (e) {
    if (!isDragging) return;
    var diff = startX - e.touches[0].clientX;
    moveTo(scrollStart + diff);
  }, { passive: true });

  track.addEventListener('touchend', function () {
    isDragging = false;
    track.style.transition = '';
    var slideW = getSlideWidth();
    moveTo(Math.round(pos / slideW) * slideW);
  });

  // --- SCROLL REVEAL ---
  var revealEls = document.querySelectorAll('.service-card, .section-header, .review__inner, .contact__inner, .contact__text, .contact__phones');
  revealEls.forEach(function (el) { el.classList.add('reveal'); });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(function (el) { observer.observe(el); });

  // Stagger service cards
  var cards = document.querySelectorAll('.service-card');
  cards.forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.1) + 's';
  });

})();
