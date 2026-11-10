/* ==========================================================================
   KOON · Landing B2B
   JS vanilla, sin dependencias:
   (El movimiento vive en motion.js)
   - Acordeón accesible de preguntas frecuentes
   - Código QR simulado del ticket
   - Validación del formulario de demo
   - WhatsApp flotante que se oculta en el CTA final
   - Enlaces de WhatsApp centralizados
   - Detalle de la página de gracias
   ========================================================================== */
(function () {
  'use strict';

  /* ----------------------------------------------------------------------
     SCROLL REVEAL
     Los elementos con [data-reveal] aparecen al entrar al viewport.
     Si el usuario prefiere menos movimiento, se muestran de inmediato.
     ---------------------------------------------------------------------- */
  function initReveal() {
    var elements = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!elements.length) return;

    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach(function (element) {
        element.classList.add('is-revealed');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    elements.forEach(function (element) {
      observer.observe(element);
    });
  }

  /* ----------------------------------------------------------------------
     CONFIGURACIÓN DE WHATSAPP
     PENDIENTE: escribe aquí el número real, con lada y solo dígitos.
     Ejemplo de formato: 5215512345678
     Mientras esté vacío, los botones llevan al formulario de demo.
     ---------------------------------------------------------------------- */
  var WHATSAPP_NUMBER = '';
  var WHATSAPP_TEXT = 'Hola, quiero una demo de Koon para mi restaurante.';

  function whatsappHref() {
    if (!WHATSAPP_NUMBER) return '';
    var digits = String(WHATSAPP_NUMBER).replace(/\D/g, '');
    return 'https://wa.me/' + digits + '?text=' + encodeURIComponent(WHATSAPP_TEXT);
  }

  function initWhatsAppLinks() {
    var href = whatsappHref();
    if (!href) return;

    document.querySelectorAll('[data-wa]').forEach(function (link) {
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener';
    });
  }

  /* ----------------------------------------------------------------------
     BARRA FIJA
     ---------------------------------------------------------------------- */
  function initHeader() {
    var header = document.querySelector('[data-header]');
    if (!header) return;

    var ticking = false;

    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ----------------------------------------------------------------------
     ACORDEÓN
     ---------------------------------------------------------------------- */
  function initFaq() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.faq__item'));
    if (!items.length) return;

    function setOpen(item, open) {
      var trigger = item.querySelector('.faq__trigger');
      var panel = item.querySelector('.faq__panel');
      if (!trigger || !panel) return;

      item.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
      panel.setAttribute('aria-hidden', String(!open));
    }

    items.forEach(function (item) {
      var trigger = item.querySelector('.faq__trigger');
      if (!trigger) return;

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        items.forEach(function (other) {
          if (other !== item) setOpen(other, false);
        });

        setOpen(item, !isOpen);
      });

      trigger.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && item.classList.contains('is-open')) {
          setOpen(item, false);
          trigger.focus();
        }
      });
    });
  }

  /* ----------------------------------------------------------------------
     QR SIMULADO DEL TICKET
     Dibuja una matriz de 25 × 25 con patrones de localización.
     No es un QR funcional: es una ilustración del ticket.
     ---------------------------------------------------------------------- */
  function initQr() {
    var qr = document.querySelector('[data-qr]');
    if (!qr) return;

    var SIZE = 25;
    var grid = [];
    var row;
    var col;

    for (row = 0; row < SIZE; row += 1) {
      grid[row] = [];
      for (col = 0; col < SIZE; col += 1) {
        grid[row][col] = false;
      }
    }

    function set(r, c, value) {
      if (r >= 0 && r < SIZE && c >= 0 && c < SIZE) {
        grid[r][c] = value;
      }
    }

    // Zona reservada para los tres cuadros de localización y su separación
    function reserved(r, c) {
      return (
        (r < 8 && c < 8) ||
        (r < 8 && c >= SIZE - 8) ||
        (r >= SIZE - 8 && c < 8)
      );
    }

    // Datos pseudoaleatorios, deterministas
    var seed = 20261106;
    function random() {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    }

    for (row = 0; row < SIZE; row += 1) {
      for (col = 0; col < SIZE; col += 1) {
        if (!reserved(row, col) && random() < 0.46) {
          grid[row][col] = true;
        }
      }
    }

    // Patrón de alineación
    for (row = 0; row < 5; row += 1) {
      for (col = 0; col < 5; col += 1) {
        var isEdge = row === 0 || row === 4 || col === 0 || col === 4;
        var isCore = row === 2 && col === 2;
        set(16 + row, 16 + col, isEdge || isCore);
      }
    }

    // Patrones de tiempo
    for (var i = 8; i < 17; i += 1) {
      set(6, i, i % 2 === 0);
      set(i, 6, i % 2 === 0);
    }

    // Cuadros de localización
    function finder(top, left) {
      for (var r = 0; r < 7; r += 1) {
        for (var c = 0; c < 7; c += 1) {
          var border = r === 0 || r === 6 || c === 0 || c === 6;
          var core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          set(top + r, left + c, border || core);
        }
      }
    }

    finder(0, 0);
    finder(0, SIZE - 7);
    finder(SIZE - 7, 0);

    var fragment = document.createDocumentFragment();

    for (row = 0; row < SIZE; row += 1) {
      for (col = 0; col < SIZE; col += 1) {
        var cell = document.createElement('span');
        if (grid[row][col]) {
          cell.className = 'is-on';
        }
        fragment.appendChild(cell);
      }
    }

    qr.appendChild(fragment);
  }

  /* ----------------------------------------------------------------------
     FORMULARIO
     ---------------------------------------------------------------------- */
  function initForm() {
    var form = document.getElementById('demo-form');
    if (!form) return;

    var nameInput = document.getElementById('nombre');
    var phoneInput = document.getElementById('whatsapp');
    var restaurantInput = document.getElementById('restaurante');
    var submit = form.querySelector('button[type="submit"]');

    var fields = [
      {
        input: nameInput,
        error: document.getElementById('nombre-error'),
        validate: function (value) {
          if (!value.trim()) return 'Escribe tu nombre.';
          if (value.trim().length < 2) return 'Tu nombre debe tener al menos 2 letras.';
          return '';
        }
      },
      {
        input: phoneInput,
        error: document.getElementById('whatsapp-error'),
        validate: function (value) {
          var digits = value.replace(/\D/g, '');
          if (!value.trim()) return 'Escribe tu WhatsApp.';
          if (!digits) return 'Escribe un número de WhatsApp válido.';

          var valid =
            digits.length === 10 ||
            (digits.length === 12 && digits.indexOf('52') === 0) ||
            (digits.length === 13 && digits.indexOf('521') === 0);

          return valid ? '' : 'Escribe 10 dígitos o el número con lada 52.';
        }
      },
      {
        input: restaurantInput,
        error: document.getElementById('restaurante-error'),
        validate: function (value) {
          if (!value.trim()) return 'Escribe el nombre de tu restaurante.';
          if (value.trim().length < 2) return 'El nombre debe tener al menos 2 letras.';
          return '';
        }
      }
    ].filter(function (field) {
      return field.input && field.error;
    });

    function setError(field, message) {
      var wrapper = field.input.closest('.field');
      if (wrapper) wrapper.classList.add('is-invalid');
      field.input.setAttribute('aria-invalid', 'true');
      field.error.textContent = message;
    }

    function clearError(field) {
      var wrapper = field.input.closest('.field');
      if (wrapper) wrapper.classList.remove('is-invalid');
      field.input.removeAttribute('aria-invalid');
      field.error.textContent = '';
    }

    fields.forEach(function (field) {
      field.input.addEventListener('input', function () {
        clearError(field);
      });
    });

    if (!submit) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var firstInvalid = null;

      fields.forEach(function (field) {
        var message = field.validate(field.input.value);

        if (message) {
          setError(field, message);
          if (!firstInvalid) firstInvalid = field.input;
        } else {
          clearError(field);
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      submit.disabled = true;
      form.setAttribute('aria-busy', 'true');

      var label = submit.querySelector('.btn__label');
      if (label) label.textContent = 'Enviando…';

      try {
        sessionStorage.setItem('koonNombre', nameInput.value.trim());
      } catch (error) {
        // Si el navegador bloquea sessionStorage, la página de gracias usa su texto por defecto.
      }

      // Simulación de envío: no hay backend todavía.
      window.setTimeout(function () {
        window.location.href = 'gracias.html';
      }, 550);
    });
  }

  /* ----------------------------------------------------------------------
     WHATSAPP FLOTANTE
     Se oculta cuando el CTA final o el pie entran en pantalla.
     ---------------------------------------------------------------------- */
  function initFloat() {
    var float = document.querySelector('.wa-float');
    if (!float) return;

    var targets = [
      document.getElementById('agenda-tu-demo'),
      document.querySelector('#facturacion .ticket'),
      document.getElementById('precios'),
      document.querySelector('.footer')
    ].filter(Boolean);

    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      return;
    }

    var visibleTargets = [];

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var index = visibleTargets.indexOf(entry.target);

          if (entry.isIntersecting && index === -1) {
            visibleTargets.push(entry.target);
          } else if (!entry.isIntersecting && index !== -1) {
            visibleTargets.splice(index, 1);
          }
        });

        float.classList.toggle('is-hidden', visibleTargets.length > 0);
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.01
      }
    );

    targets.forEach(function (target) {
      observer.observe(target);
    });
  }

  /* ----------------------------------------------------------------------
     PÁGINA DE GRACIAS
     ---------------------------------------------------------------------- */
  function initThanks() {
    var title = document.getElementById('thanks-title');
    if (!title) return;

    var name = '';

    try {
      name = sessionStorage.getItem('koonNombre') || '';
    } catch (error) {
      name = '';
    }

    if (name) {
      title.textContent = 'Gracias, ' + name + '.';
    }
  }

  /* ----------------------------------------------------------------------
     AÑO DEL PIE
     ---------------------------------------------------------------------- */
  function initYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach(function (element) {
      element.textContent = year;
    });
  }

  initWhatsAppLinks();
  initFaq();
  initQr();
  initForm();
  initFloat();
  initThanks();
  initYear();
})();
