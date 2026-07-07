/* =========================================================
   LA FOULÉE TULLÉSAINE 2026 — main.js (vanilla, zéro dépendance)
   ========================================================= */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav : ombre au scroll ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector('.nav__burger');
  var menu = document.getElementById('navmenu');
  function closeMenu() {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
  }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Compte à rebours ---------- */
  var cd = document.getElementById('countdown');
  if (cd) {
    var target = new Date(cd.getAttribute('data-target')).getTime();
    var nums = {
      days: cd.querySelector('[data-cd="days"]'),
      hours: cd.querySelector('[data-cd="hours"]'),
      mins: cd.querySelector('[data-cd="mins"]'),
      secs: cd.querySelector('[data-cd="secs"]')
    };
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        nums.days.textContent = '0'; nums.hours.textContent = '00';
        nums.mins.textContent = '00'; nums.secs.textContent = '00';
        return;
      }
      var s = Math.floor(diff / 1000);
      nums.days.textContent = Math.floor(s / 86400);
      nums.hours.textContent = pad(Math.floor((s % 86400) / 3600));
      nums.mins.textContent = pad(Math.floor((s % 3600) / 60));
      nums.secs.textContent = pad(s % 60);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Count-up des chiffres clés ---------- */
  function countUp(el) {
    var endVal = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = endVal.toLocaleString('fr-FR') + suffix; return; }
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * endVal).toLocaleString('fr-FR') + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = endVal.toLocaleString('fr-FR') + suffix;
    }
    requestAnimationFrame(step);
  }

  /* ---------- Lightbox galerie ---------- */
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('.lightbox__img');
    var items = [].slice.call(document.querySelectorAll('.gallery__item'));
    var current = 0;
    function show(i) {
      current = (i + items.length) % items.length;
      var btn = items[current];
      var img = btn.querySelector('img');
      lbImg.src = btn.getAttribute('data-full');
      lbImg.alt = img ? img.alt : '';
    }
    function openLb(i) {
      show(i);
      lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeLb() {
      lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    items.forEach(function (btn, i) {
      btn.addEventListener('click', function () { openLb(i); });
    });
    lb.querySelector('.lightbox__close').addEventListener('click', closeLb);
    lb.querySelector('.lightbox__nav--prev').addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
    lb.querySelector('.lightbox__nav--next').addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ---------- Reveal au scroll + déclenche count-up ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    document.querySelectorAll('[data-count]').forEach(countUp);
  }
})();
