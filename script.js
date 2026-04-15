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
  var reels = document.querySelectorAll('[data-reel]');

  reels.forEach(function (reel) {
    var track = reel.querySelector('.reel__track');
    var prevBtn = reel.querySelector('[data-reel-prev]');
    var nextBtn = reel.querySelector('[data-reel-next]');
    var currentEl = reel.querySelector('[data-reel-current]');
    var totalEl = reel.querySelector('[data-reel-total]');
    var slides = track ? track.querySelectorAll('.reel__slide') : [];

    if (!track || slides.length === 0) return;

    var pos = 0;
    var isDragging = false;
    var startX = 0;
    var scrollStart = 0;

    if (totalEl) totalEl.textContent = String(slides.length);

    function getSlideWidth() {
      return slides[0].offsetWidth + parseInt(getComputedStyle(track).gap || '0', 10);
    }

    function getMaxPos() {
      return Math.max(0, track.scrollWidth - reel.offsetWidth);
    }

    function updateCounter() {
      if (!currentEl) return;
      var slideW = getSlideWidth();
      var idx = Math.round(pos / slideW) + 1;
      currentEl.textContent = String(Math.min(Math.max(idx, 1), slides.length));
    }

    function moveTo(newPos) {
      pos = Math.max(0, Math.min(newPos, getMaxPos()));
      track.style.transform = 'translateX(' + (-pos) + 'px)';
      updateCounter();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        moveTo(pos - getSlideWidth());
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        moveTo(pos + getSlideWidth());
      });
    }

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

    window.addEventListener('resize', function () {
      moveTo(pos);
    });
  });

  // --- FACEBOOK PAGE PLUGIN (auto, no button) ---
  // Uses profile.php?id=... — more reliable than /people/... for Meta's page embed.
  (function initFacebookPagePlugin() {
    var iframe = document.getElementById('fbPageEmbed');
    var wrap = document.getElementById('fbEmbedWrap');
    if (!iframe || !wrap) return;

    function assign() {
      var rawW = wrap.getBoundingClientRect().width;
      var w = Math.min(500, Math.max(280, Math.floor(rawW > 0 ? rawW : 320)));
      var h = window.matchMedia('(max-width: 768px)').matches ? 540 : 620;
      var pageHref = 'https://www.facebook.com/profile.php?id=61574357836350';
      var q = new URLSearchParams({
        href: pageHref,
        tabs: 'timeline',
        width: String(w),
        height: String(h),
        small_header: 'true',
        adapt_container_width: 'true',
        hide_cover: 'true',
        show_facepile: 'false',
      });
      iframe.src = 'https://www.facebook.com/plugins/page.php?' + q.toString();
    }

    requestAnimationFrame(assign);
  })();

  // --- SCROLL REVEAL ---
  var revealEls = document.querySelectorAll('.service-card, .section-header, .review__inner, .contact__inner, .contact__text, .contact__phones, .facebook__grid');
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
