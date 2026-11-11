/* ==========================================================================
   KOON · Movimiento
   Depende de GSAP + ScrollTrigger (assets/vendor). Lenis es opcional y solo
   se activa en escritorio con puntero fino.
   Si el usuario pide menos movimiento, este archivo no anima nada: la página
   queda completa y legible (la clase .motion no se añade en <head>).
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  window.__koonMotion = true;

  /* ---------------------------------------------------------------------
     Reloj de las comandas (también corre con movimiento reducido: es
     información, no decoración)
     --------------------------------------------------------------------- */
  function fmt(s) {
    var m = Math.floor(s / 60);
    var r = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r;
  }
  var newTimer = { el: $('[data-timer-new]'), s: 0, on: false };
  if (!reduced) {
    var timers = $$('[data-timer]').map(function (el) {
      return { el: el, s: parseInt(el.getAttribute('data-timer'), 10) || 0 };
    });
    window.setInterval(function () {
      if (document.hidden) return;
      timers.forEach(function (t) { t.s += 1; t.el.textContent = fmt(t.s); });
      if (newTimer.el && newTimer.on) { newTimer.s += 1; newTimer.el.textContent = fmt(newTimer.s); }
    }, 1000);
  }

  if (reduced || !root.classList.contains('motion')) {
    root.classList.remove('motion');
    return;
  }

  /* ---------------------------------------------------------------------
     Titulares partidos por palabra
     --------------------------------------------------------------------- */
  function split(el) {
    var n = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span');
            w.className = 'w';
            var i = document.createElement('i');
            i.textContent = part;
            i.style.setProperty('--n', n);
            n += 1;
            w.appendChild(i);
            frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    })(el);
  }
  $$('[data-split], [data-split-hero]').forEach(split);

  /* ---------------------------------------------------------------------
     Entrada del hero (una vez)
     --------------------------------------------------------------------- */
  $$('[data-hero-in]').forEach(function (el, i) {
    el.style.setProperty('--hd', (0.62 + i * 0.07).toFixed(2) + 's');
  });
  function ready() { root.classList.add('is-ready'); }
  if (document.fonts && document.fonts.ready) {
    var done = false;
    var go = function () { if (!done) { done = true; window.requestAnimationFrame(ready); } };
    document.fonts.ready.then(go);
    window.setTimeout(go, 900);
  } else {
    window.requestAnimationFrame(ready);
  }

  /* ---------------------------------------------------------------------
     Reveal al entrar en pantalla
     --------------------------------------------------------------------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -9% 0px' });

  $$('[data-reveal], [data-split], [data-vs-row], .feat__media, .impl__thread').forEach(function (el) { io.observe(el); });
  $$('[data-vs-row]').forEach(function (row, i) { row.style.transitionDelay = (i * 0.09) + 's'; });

  /* Contador «24 h» */
  var count = $('[data-count]');
  if (count) {
    var target = parseInt(count.getAttribute('data-count'), 10);
    var cio = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      cio.disconnect();
      var t0 = performance.now();
      (function tick(now) {
        var p = clamp((now - t0) / 1400, 0, 1);
        var e = 1 - Math.pow(1 - p, 4);
        count.textContent = String(Math.round(e * target)).padStart(2, '0');
        if (p < 1) window.requestAnimationFrame(tick);
      })(t0);
    }, { threshold: 0.6 });
    count.textContent = '00';
    cio.observe(count);
  }

  /* ---------------------------------------------------------------------
     La historia del hero: el pedido del celular llega a cocina
     --------------------------------------------------------------------- */
  var art = $('[data-hero-art]');
  if (art) {
    var add = $('[data-add]', art);
    var total = $('[data-total]', art);
    var steps = [1900, 1100, 1500, 5200];
    var step = 0;
    var visible = true;
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }, { threshold: 0.1 }).observe(art);

    var setStep = function (n) {
      step = n;
      if (n === 0) {
        if (add) { add.textContent = '+'; add.classList.remove('is-added'); }
        if (total) total.textContent = '$96';
        newTimer.on = false; newTimer.s = 0;
        if (newTimer.el) newTimer.el.textContent = '00:00';
      }
      if (n === 1 && add) {
        add.textContent = '1'; add.classList.add('is-added', 'is-tap');
        window.setTimeout(function () { add.classList.remove('is-tap'); }, 260);
        if (total) total.textContent = '$211';
      }
      if (n === 3) newTimer.on = true;
      art.setAttribute('data-step', String(n));
    };
    var loop = function () {
      window.setTimeout(function () {
        if (visible && !document.hidden) setStep((step + 1) % 4);
        loop();
      }, steps[step]);
    };
    window.setTimeout(loop, 1400);
  }

  /* ---------------------------------------------------------------------
     Barra: fondo al hacer scroll, se esconde al bajar y vuelve al subir
     --------------------------------------------------------------------- */
  var header = $('[data-header]');
  var lastY = window.scrollY;
  function onScrollHeader() {
    var y = window.scrollY;
    if (!header) return;
    header.classList.toggle('is-scrolled', y > 24);
    if (y > 520 && y > lastY + 6) header.classList.add('is-hidden');
    else if (y < lastY - 6 || y < 520) header.classList.remove('is-hidden');
    lastY = y;
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  if (!hasGsap) {
    // Sin GSAP la página sigue completa: solo faltan las piezas ligadas al scroll.
    root.classList.add('no-gsap');
    return;
  }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  /* ---------------------------------------------------------------------
     Scroll suave (solo escritorio con puntero fino)
     --------------------------------------------------------------------- */
  var lenis = null;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (window.Lenis && fine && window.innerWidth >= 1024) {
    lenis = new window.Lenis({ lerp: 0.11, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;
  }
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.getElementById(id.slice(1));
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.3 });
      else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

  /* ---------------------------------------------------------------------
     Cinta: corre sola y se acelera con el scroll
     --------------------------------------------------------------------- */
  var track = $('[data-marquee]');
  if (track) {
    var set = track.children[0];
    for (var c = 0; c < 3; c += 1) track.appendChild(set.cloneNode(true));
    var x = 0;
    var dir = -1;
    var boost = 0;
    var prev = window.scrollY;
    gsap.ticker.add(function (time, delta) {
      var y = window.scrollY;
      var dy = y - prev;
      prev = y;
      if (dy !== 0) dir = dy > 0 ? -1 : 1;
      boost += (Math.abs(dy) * 0.9 - boost) * 0.12;
      var w = set.offsetWidth;
      // delta acotado: al volver de otra pestaña puede venir enorme
      x += dir * (0.06 * Math.min(delta, 50) + Math.min(boost, 60));
      if (w > 0) x = (((x % w) + w) % w) - w;
      track.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)';
    });
  }

  /* ---------------------------------------------------------------------
     Platos sueltos: flotan a otra velocidad y giran
     --------------------------------------------------------------------- */
  $$('[data-plate]').forEach(function (el) {
    var speed = parseFloat(el.getAttribute('data-speed')) || -0.3;
    var spin = parseFloat(el.getAttribute('data-spin')) || 40;
    gsap.fromTo(el, { yPercent: -speed * 40, rotation: -spin / 2 }, {
      yPercent: speed * 160, rotation: spin, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
    });
  });

  /* ---------------------------------------------------------------------
     Problema: las comandas se apilan; la de abajo se encoge
     --------------------------------------------------------------------- */
  var pains = $$('[data-pain]');
  var painCount = $('[data-pain-count]');
  pains.forEach(function (pain, i) {
    var paper = $('.pain__paper', pain);
    var next = pains[i + 1];
    if (next) {
      gsap.to(paper, {
        scale: 0.93, ease: 'none',
        scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 25%', scrub: true }
      });
    }
    ScrollTrigger.create({
      trigger: pain, start: 'top 62%', end: 'bottom 62%',
      onToggle: function (self) {
        if (self.isActive && painCount) painCount.textContent = '0' + (i + 1);
      }
    });
  });

  /* ---------------------------------------------------------------------
     Cómo funciona: la comanda recorre los 4 pasos
     --------------------------------------------------------------------- */
  var rail = $('[data-flow]');
  if (rail) {
    var items = $$('[data-step-item]', rail);
    var marks = [];
    var measure = function () {
      var horizontal = window.innerWidth >= 960;
      var size = horizontal ? rail.offsetWidth : rail.offsetHeight;
      marks = items.map(function (it) { return (horizontal ? it.offsetLeft : it.offsetTop) / size; });
    };
    measure();
    ScrollTrigger.addEventListener('refreshInit', measure);
    rail.style.setProperty('--p', 0);
    ScrollTrigger.create({
      trigger: rail, start: 'top 72%', end: 'bottom 62%', scrub: 0.5,
      onUpdate: function (self) {
        var p = self.progress;
        rail.style.setProperty('--p', p.toFixed(4));
        items.forEach(function (it, i) { it.classList.toggle('is-on', p >= marks[i] - 0.002 && p > 0.001); });
      }
    });
  }

  /* ---------------------------------------------------------------------
     Funciones: en escritorio las capturas viven en un escenario fijo
     --------------------------------------------------------------------- */
  var feats = $('[data-feats]');
  if (feats) {
    var stage = $('[data-feats-stage]', feats);
    var arts = $$('[data-feat]', feats);
    var medias = arts.map(function (a) { return $('.feat__media', a); });
    var mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', function () {
      medias.forEach(function (m) { stage.appendChild(m); });
      feats.classList.add('is-staged');
      var setActive = function (i) {
        arts.forEach(function (a, k) { a.classList.toggle('is-active', k === i); });
        medias.forEach(function (m, k) { m.classList.toggle('is-active', k === i); });
        stage.setAttribute('data-active', String(i));
      };
      setActive(0);
      var triggers = arts.map(function (a, i) {
        return ScrollTrigger.create({
          trigger: a, start: 'top 55%', end: 'bottom 55%',
          onToggle: function (self) { if (self.isActive) setActive(i); }
        });
      });
      return function () {
        triggers.forEach(function (t) { t.kill(); });
        feats.classList.remove('is-staged');
        arts.forEach(function (a, i) { a.appendChild(medias[i]); a.classList.remove('is-active'); medias[i].classList.remove('is-active'); });
        arts[0].classList.add('is-active');
      };
    });
  }

  /* ---------------------------------------------------------------------
     Facturación: el ticket sale de la impresora
     --------------------------------------------------------------------- */
  var printer = $('[data-printer]');
  if (printer) {
    printer.style.setProperty('--p', 0);
    ScrollTrigger.create({
      trigger: printer, start: 'top 82%', end: 'top 18%', scrub: 0.6,
      onUpdate: function (self) { printer.style.setProperty('--p', self.progress.toFixed(4)); }
    });
  }

  /* ---------------------------------------------------------------------
     Hecho para México: los platos entran rodando
     --------------------------------------------------------------------- */
  var mx = $('[data-mx]');
  if (mx) {
    var plates = $$('[data-mx-plate]', mx);
    var words = $$('.mx__title span', mx);
    var n = plates.length;
    var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
    var render = function (p) {
      var vw = window.innerWidth;
      plates.forEach(function (pl, i) {
        var delay = (n - 1 - i) * 0.12;
        var e = ease(clamp((p * 1.22 - delay) / 0.62, 0, 1));
        var off = (1 - e) * -(vw * 1.05 + i * 40);
        var size = pl.offsetWidth || 200;
        var rot = (off / (Math.PI * size)) * 360;
        pl.style.transform = 'translate3d(' + off.toFixed(1) + 'px,0,0) rotate(' + rot.toFixed(1) + 'deg)';
      });
      var t = ease(clamp(p / 0.5, 0, 1));
      if (words[0]) words[0].style.transform = 'translate3d(' + ((1 - t) * -7).toFixed(2) + 'vw,0,0)';
      if (words[1]) words[1].style.transform = 'translate3d(' + ((1 - t) * 7).toFixed(2) + 'vw,0,0)';
    };
    render(0);
    ScrollTrigger.create({
      trigger: mx, start: 'top 55%', end: 'bottom bottom', scrub: 0.5,
      onUpdate: function (self) { render(self.progress); }
    });
  }

  /* ---------------------------------------------------------------------
     Pie: las letras de «Koon» suben
     --------------------------------------------------------------------- */
  var word = $('[data-word]');
  if (word) {
    gsap.from(word.children, {
      yPercent: 70, stagger: 0.08, ease: 'none',
      scrollTrigger: { trigger: word, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 }
    });
  }

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
