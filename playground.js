/* ==========================================================================
   KOON · Selector de color principal (herramienta para el cliente)
   Solo se carga cuando la dirección lleva ?colores  (index.html lo decide).
     index.html?colores           → abre el panel con el color actual
     index.html?colores=1F8A4C    → abre el panel con ese color ya aplicado

   Cambia una sola variable, --chile, y dos que dependen de ella:
     --en-chile      texto e iconos sobre el color (oscuro o claro, el que se lea mejor)
     --titulo-chile  título gigante de «Hecho para México»
   Los tonos hondo, suave y vivo se derivan solos en styles.css.

   Cuando el cliente elija, el color definitivo se escribe en :root de styles.css
   (--chile, y --en-chile / --titulo-chile si cambian) y este archivo se puede borrar.
   ========================================================================== */
(function () {
  'use strict';

  var ORIGINAL = '#1F8A4C';
  var TINTA = '#1C1612';
  var PAPEL = '#FFFDF8';
  var HUESO = '#F6F1E7';
  var KEY = 'koonColorPrincipal';
  var root = document.documentElement;

  var PRESETS = [
    ['Chile', '#F0481E'],
    ['Mandarina', '#FF7A1A'],
    ['Jitomate', '#E23B2E'],
    ['Terracota', '#C8553D'],
    ['Rosa mexicano', '#E4007C'],
    ['Maíz', '#F6C445'],
    ['Limón', '#9BCB3C'],
    ['Hierba (actual)', '#1F8A4C'],
    ['Verde botella', '#0F5B3A'],
    ['Azul talavera', '#1F4FD8'],
    ['Mole', '#6B3A2A']
  ];

  /* ---------- color ---------- */
  function norm(v) {
    v = String(v || '').trim().replace(/^#/, '');
    if (/^[0-9a-f]{3}$/i.test(v)) v = v.replace(/./g, '$&$&');
    return /^[0-9a-f]{6}$/i.test(v) ? '#' + v.toUpperCase() : null;
  }
  function lum(hex) {
    var n = parseInt(hex.slice(1), 16);
    var ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(function (c) {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  }
  function ratio(a, b) {
    var x = lum(a), y = lum(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  }

  /* ---------- panel ---------- */
  var css = [
    '.kp{position:fixed;left:16px;bottom:16px;z-index:300;width:300px;max-width:calc(100vw - 32px);',
    'font:500 14px/1.4 Figtree,system-ui,sans-serif;color:#1C1612;background:#fff;border-radius:20px;',
    'box-shadow:0 0 0 1px rgba(28,22,18,.1),0 24px 50px -16px rgba(28,22,18,.45);overflow:hidden}',
    '.kp *{box-sizing:border-box}',
    '.kp__bar{display:flex;align-items:center;gap:10px;width:100%;padding:12px 14px;border:0;background:#1C1612;color:#fff;',
    'font:600 14px/1 Figtree,system-ui,sans-serif;cursor:pointer;text-align:left}',
    '.kp__dot{width:18px;height:18px;border-radius:50%;box-shadow:0 0 0 2px #fff}',
    '.kp__bar span:last-child{margin-left:auto;opacity:.7;font-weight:500}',
    '.kp__body{padding:14px;display:grid;gap:14px}',
    '.kp.is-min .kp__body{display:none}',
    '.kp__sw{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}',
    '.kp__sw button{aspect-ratio:1;border:0;border-radius:50%;cursor:pointer;box-shadow:inset 0 0 0 1px rgba(28,22,18,.15);transition:transform .15s}',
    '.kp__sw button:hover{transform:scale(1.12)}',
    '.kp__sw button[aria-pressed="true"]{box-shadow:0 0 0 2px #fff,0 0 0 4px #1C1612}',
    '.kp__row{display:grid;grid-template-columns:44px 1fr;gap:8px}',
    '.kp__row input[type=color]{width:44px;height:40px;padding:0;border:1px solid #CFC4B0;border-radius:10px;background:none;cursor:pointer}',
    '.kp__row input[type=text]{height:40px;padding:0 12px;border:1px solid #CFC4B0;border-radius:10px;font:600 15px/1 ui-monospace,Menlo,monospace;text-transform:uppercase;width:100%}',
    '.kp__name{font-weight:600}',
    '.kp__checks{display:grid;gap:6px;font-size:13px;color:#5A5048}',
    '.kp__checks li{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center}',
    '.kp__checks b{padding:2px 8px;border-radius:99px;font-weight:600;font-size:12px;background:#DCEEDD;color:#166B3A;white-space:nowrap}',
    '.kp__checks b.is-bad{background:#FBDCCF;color:#A12A0A}',
    '.kp__acts{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
    '.kp__acts button{height:38px;border:1px solid #CFC4B0;border-radius:99px;background:#fff;font:600 13px/1 Figtree,system-ui,sans-serif;cursor:pointer}',
    '.kp__acts button:hover{background:#F6F1E7}',
    '.kp__acts button:last-child{grid-column:1/-1}',
    '.kp ul{margin:0;padding:0;list-style:none}',
    '.kp :focus-visible{outline:2px solid #1C1612;outline-offset:2px}',
    '@media (max-width:859px){.kp{bottom:84px}}'
  ].join('');
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var panel = document.createElement('aside');
  panel.className = 'kp';
  panel.setAttribute('aria-label', 'Selector de color principal');
  panel.innerHTML =
    '<button class="kp__bar" type="button" aria-expanded="true"><span class="kp__dot"></span><span>Color principal</span><span data-kp-toggle>Ocultar</span></button>' +
    '<div class="kp__body">' +
      '<div class="kp__sw" role="group" aria-label="Colores sugeridos"></div>' +
      '<div class="kp__row"><input type="color" aria-label="Elegir otro color"><input type="text" maxlength="7" spellcheck="false" aria-label="Código HEX"></div>' +
      '<p class="kp__name" aria-live="polite"></p>' +
      '<ul class="kp__checks"></ul>' +
      '<div class="kp__acts"><button type="button" data-kp="hex">Copiar código</button><button type="button" data-kp="link">Copiar enlace</button><button type="button" data-kp="reset">Volver al color original</button></div>' +
    '</div>';
  document.body.appendChild(panel);

  var sw = panel.querySelector('.kp__sw');
  var picker = panel.querySelector('input[type=color]');
  var text = panel.querySelector('input[type=text]');
  var name = panel.querySelector('.kp__name');
  var checks = panel.querySelector('.kp__checks');
  var dot = panel.querySelector('.kp__dot');
  var bar = panel.querySelector('.kp__bar');
  var current = ORIGINAL;

  PRESETS.forEach(function (p) {
    var b = document.createElement('button');
    b.type = 'button';
    b.style.background = p[1];
    b.title = p[0];
    b.setAttribute('aria-label', p[0]);
    b.setAttribute('data-hex', p[1]);
    b.addEventListener('click', function () { apply(p[1], true); });
    sw.appendChild(b);
  });

  function check(label, value, min) {
    var ok = value >= min;
    return '<li><span>' + label + '</span><b class="' + (ok ? '' : 'is-bad') + '">' + value.toFixed(1) + ':1 ' + (ok ? 'se lee' : 'no se lee') + '</b></li>';
  }

  function apply(hex, save) {
    hex = norm(hex);
    if (!hex) return;
    current = hex;

    var onDark = ratio(hex, TINTA);
    var onLight = ratio(hex, PAPEL);
    var ink = onDark >= onLight ? TINTA : PAPEL;
    // El título gigante prefiere claro; solo pasa a oscuro si el claro no se leería.
    var title = onLight >= 2.6 ? PAPEL : TINTA;

    root.style.setProperty('--chile', hex);
    root.style.setProperty('--en-chile', ink);
    root.style.setProperty('--titulo-chile', title);

    picker.value = hex.toLowerCase();
    if (document.activeElement !== text) text.value = hex;
    dot.style.background = hex;
    var preset = PRESETS.filter(function (p) { return p[1] === hex; })[0];
    name.textContent = preset ? preset[0] : 'Color a medida';
    Array.prototype.forEach.call(sw.children, function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-hex') === hex));
    });
    checks.innerHTML =
      check('Texto del botón (' + (ink === TINTA ? 'oscuro' : 'claro') + ')', Math.max(onDark, onLight), 4.5) +
      check('Palabras de color en el titular', ratio(hex, HUESO), 3) +
      check('«Koon» gigante sobre fondo oscuro', onDark, 3);

    if (save) { try { localStorage.setItem(KEY, hex); } catch (e) { /* sin almacenamiento: solo dura esta visita */ } }
  }

  function flash(btn, msg) {
    var old = btn.textContent;
    btn.textContent = msg;
    window.setTimeout(function () { btn.textContent = old; }, 1400);
  }
  function copy(value, btn) {
    var done = function () { flash(btn, 'Copiado'); };
    var fail = function () { window.prompt('Copia este texto:', value); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(value).then(done, fail);
    else fail();
  }

  picker.addEventListener('input', function () { apply(picker.value, true); });
  text.addEventListener('input', function () { apply(text.value, true); });
  text.addEventListener('blur', function () { text.value = current; });
  bar.addEventListener('click', function () {
    var min = panel.classList.toggle('is-min');
    bar.setAttribute('aria-expanded', String(!min));
    panel.querySelector('[data-kp-toggle]').textContent = min ? 'Mostrar' : 'Ocultar';
  });
  panel.querySelector('[data-kp="hex"]').addEventListener('click', function (e) { copy(current, e.currentTarget); });
  panel.querySelector('[data-kp="link"]').addEventListener('click', function (e) {
    copy(location.origin + location.pathname + '?colores=' + current.slice(1), e.currentTarget);
  });
  panel.querySelector('[data-kp="reset"]').addEventListener('click', function () {
    try { localStorage.removeItem(KEY); } catch (e) { /* nada que borrar */ }
    apply(ORIGINAL, false);
  });

  /* ---------- color inicial: el de la dirección manda sobre el guardado ---------- */
  var fromUrl = norm((location.search.match(/[?&]colores=([0-9a-f]{3,6})/i) || [])[1]);
  var saved = null;
  try { saved = norm(localStorage.getItem(KEY)); } catch (e) { saved = null; }
  apply(fromUrl || saved || ORIGINAL, !!fromUrl);
  // En el celular el panel arranca plegado para no tapar la página.
  if (window.innerWidth < 700) bar.click();
})();
