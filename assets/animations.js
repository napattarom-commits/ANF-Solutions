/*
 * ANF Solutions — Scroll Reveal Observer
 * Watches elements with .reveal-on-scroll and adds .is-visible when intersecting.
 * Falls back gracefully on browsers without IntersectionObserver.
 */
(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  // Respect reduced-motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  function init() {
    var els = document.querySelectorAll('.reveal-on-scroll');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: reveal everything
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    els.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
