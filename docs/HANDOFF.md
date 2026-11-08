# HANDOFF · Koon Landing

> Lee este archivo antes de tocar nada. Resume el estado exacto al cerrar la
> Fase 4 y está pensado para que un chat nuevo pueda continuar sin el historial
> anterior.

## 0. Contexto

- **Proyecto:** landing estática de Koon, producto de INDEXSA para restaurantes
  en México.
- **Objetivo:** demo comercial / generación de citas, sin backend real.
- **Estado:** Fase 4 implementada y pendiente de revisión del cliente. La Fase 3
  (rediseño visual anterior) fue rechazada con 2/10 por color y sensación
  estática; la Fase 4 responde a ese feedback.
- **Repo:** git local en esta carpeta. Tag de cierre: `fase-4`.
- **Workspace:** `A:\Documents\deepseek-harness\default-workspace\koon`
- **Preview:** `docs/preview/` (capturas de esta fase).
- **Servidor de revisión:** `http://localhost:5500`.

## 1. Cómo levantar el proyecto

Desde la raíz del repo:

```powershell
python -m http.server 5500 --bind 127.0.0.1
```

Abrir `http://localhost:5500`. Son archivos estáticos; no hay build, npm,
backend ni variables de entorno.

## 2. Qué se hizo en la Fase 4

### Equilibrio de color y secciones

| Sección | Estado actual |
| --- | --- |
| 1. Hero | Fondo blanco + círculo naranja claro (`#FFE7DB`) con trama de puntos detrás de monitor/celular. Fotos reales de cocina/tacos. |
| 2. Sellos | Franja verde `#00A86B`, texto e iconos blancos. |
| 3. Problema | Fondo `#F8F9FA`, patrón de puntos sutil y 4 tarjetas pastel: naranja, verde, azul y amarillo, con borde superior de color. |
| 4. Cómo funciona | Fondo blanco; círculos naranja (pasos 1 y 3) y verde (2 y 4), iconos blancos. |
| 5. Funciones | Fondo blanco; checks verdes; foto-card con hover. |
| 6. Facturación | Bloque naranja `#FF5A1F`, texto y checks blancos, ticket blanco flotante con halo claro y sombra. |
| 7. Comparativo | Azul profundo; columna Koon en `#16243C` con borde verde; columna delivery en `#1B2433`. En móvil, filas Koon/delivery con el mismo tratamiento. |
| 8. Testimonio | Sección gris; tarjeta verde pastel `#E6F7EF`, texto oscuro, cita grande y placeholder de foto. |
| 9. Precios | Fondo blanco; tarjeta crema `#FFF7F2` con borde superior naranja; “24” en naranja y Outfit 800. |
| 10. Implementación | Fondo blanco; números 01/02/03 naranjas y Outfit 800. |
| 11. FAQ | Fondo gris suave; tarjetas blancas con borde fino. Sin cambios de copy. |
| 12. CTA final | Fondo azul profundo; formulario en tarjeta blanca con texto oscuro; ilustración isométrica decorativa en desktop. |

### Gráficos y texturas

- Patrón de puntos CSS en “El Problema”, con máscara para que se desvanezca
  arriba/abajo.
- Ilustración isométrica SVG inline en el CTA final (cajas naranja/verde/azul y
  una comanda blanca). Es decorativa, `aria-hidden="true"`, y se oculta por
  debajo de 1200px para no cargar el formulario en móvil/tablet.
- El hero conserva la trama de puntos dentro del círculo naranja.

### Motion y microinteracciones

- Scroll reveal con **`translate: 0 30px`** + fade, 800ms, IntersectionObserver.
  Se usa la propiedad `translate` (no `transform`) para que el hover de las
  tarjetas no se pise con el reveal.
- Hover de `.pain-card` y `.shot`: `translateY(-5px)` +
  `box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1)`.
- Flecha de `.btn--primary` se mueve 4px a la derecha en hover/focus.
- Zoom de fotos a 1.05 solo con `(hover: hover) and (pointer: fine) and
  (min-width: 1024px)`.
- `prefers-reduced-motion`: todo visible, sin transiciones.

### Tipografía

- H1 58px, H2 48px en desktop (`3rem` desde 1024px), Outfit 800.
- H2 blanco sobre naranja/azul; oscuro sobre fondos claros.
- “24” y números 01/02/03 en Outfit 800; “24” naranja.

## 3. Archivos y selectores clave

- `index.html`
  - Hero: `.hero__visual`, `.devices`.
  - Sellos: `.seals`, `.seal`.
  - Problema: `.section--problem`, `.pain-card` (4).
  - Flujo: `.flow-step`, `.flow-step__icon`.
  - Funciones: `.section--features`, `.feature`, `.shot`, `.shot__photo`.
  - Facturación: `.section--invoice`, `.invoice__title`, `.invoice__lead`,
    `.invoice__checks`, `.ticket`.
  - Comparativo: `.section--compare`, `.compare`, `.compare-card`.
  - Testimonio: `.section--testimonial`, `.testimonial`.
  - Precios: `.section--pricing`, `.pricing-card`, `.pricing-card__time`.
  - Implementación: `.impl__num`.
  - FAQ: `.section--faq`, `.faq__item`.
  - CTA: `.section--cta`, `.demo-form`, `.iso-scene`.
- `styles.css`
  - Tokens en `:root`.
  - La Fase 4 está al final, bajo el comentario
    `27. FASE 4 · IMPACTO VISUAL Y EQUILIBRIO DE COLOR`, más un bloque de
    refinamientos y la eliminación del círculo verde suelto del hero.
  - El reveal está al final (`[data-reveal]`) y usa `translate`.
- `script.js`
  - `initReveal()`, `initFloat()`, `initFaq()`, `initForm()`, `initWa()`.
  - `WHATSAPP_NUMBER` vacío: los enlaces `data-wa` caen al formulario.
  - El flotante se oculta al entrar el ticket (`#facturacion .ticket`),
    `#precios`, `#agenda-tu-demo` y el footer.
- `assets/README.md`: fuentes de las fotos temporales de Pexels y pendientes.
- `docs/preview/`: capturas finales de la Fase 4.

## 4. Decisiones que hay que respetar o discutir explícitamente

1. **Texto blanco sobre verde/naranja.** El cliente lo pidió expresamente.
   Contraste ≈3.1:1; no es AA para texto normal. No cambiarlo sin avisar.
2. **Botones naranjas con texto `#0B0F19`, no blanco.** Es una decisión de
   accesibilidad: blanco sobre `#FF5A1F` da ≈3.1:1 y no pasa; oscuro da ≈5.7:1
   (hover ≈4.6:1). Si el cliente exige blanco, hay que asumir la pérdida de AA.
3. **No cambiar textos ni orden de secciones.** La Fase 4 fue solo capa visual,
   fotos y motion. El placeholder de testimonio se conserva para no inventar
   prueba social.
4. **Fotos de stock.** Son Pexels, temporales; no representan clientes reales.
   Ver `assets/README.md`.
5. **Isométrico solo en desktop** (≥1200px). Si el cliente lo quiere en móvil,
   hay que rediseñar el espacio del CTA para no empujar el formulario.
6. **Formulario sin backend.** El submit valida y redirige a `gracias.html`.
   No hay envío real ni almacenamiento.
7. **WhatsApp sin número.** Mientras `WHATSAPP_NUMBER` esté vacío, los botones
   de WhatsApp abren/desplazan al formulario.

## 5. Tests ejecutados en la Fase 4

- 1440, 1024, 768 y 375 sin scroll horizontal.
- Todos los H2 y bloques con reveal; 45 elementos revelados.
- `prefers-reduced-motion`: 45/45 visibles.
- Hover `.pain-card` y `.shot`: `translateY(-5px)` y sombra exacta.
- Flecha del botón: `translateX(4px)`.
- Zoom de imagen: escala 1.05 en desktop.
- Formulario: errores visibles en tarjeta blanca, borde naranja y texto oscuro;
  submit válido redirige a `gracias.html`.
- FAQ abre/cierra; flotante se oculta en ticket, precios y CTA.
- Sin errores de consola (solo el aviso de lazy loading de Chromium en headless).
- Fotos cargadas; el full-page screenshot puede no pintar las lazy si no se
  scrollea, pero en navegación real cargan.

## 6. Pendientes / Fase 5 sugerida

1. **Revisión del cliente:** validar intensidad del naranja/verde, tarjetas
   pastel y formulario blanco.
2. **Accesibilidad:** decidir si se mantiene el blanco sobre naranja/verde
   (impacto visual) o se ajusta a AA con texto oscuro / fondos más profundos.
3. **Fotos reales:** sustituir las 6 fotos de stock; mantener proporciones y
   `border-radius: 16px`. Actualizar `assets/README.md`.
4. **WhatsApp real:** poner el número en `script.js` y probar `data-wa`.
5. **Backend del formulario:** endpoint, validación server-side, consentimiento
   y estado de error/éxito real.
6. **Contenido pendiente:** testimonio real, respuestas del FAQ, textos legales.
7. **Opcional:** llevar el isométrico a “Cómo funciona” o móvil; añadir más
   texturas solo si no compiten con los bloques de color.
8. **Opcional:** imágenes Open Graph y `og-koon.jpg`.

## 7. Git

- Repo inicializado en esta carpeta.
- Tag: `fase-4`.
- Para retomar:

```powershell
git log --oneline --decorate -5
git status
python -m http.server 5500 --bind 127.0.0.1
```

- El repo local no tiene remoto configurado. Si se necesita GitHub, crear el
  remoto y hacer `git remote add origin <url>` + `git push -u origin main` con
  credenciales del usuario.

## 8. Cómo pedir la continuación en un chat nuevo

> “Estoy en `A:\Documents\deepseek-harness\default-workspace\koon`. Lee
> `docs/HANDOFF.md` y `README.md`, revisa `docs/preview/`, y continúa con la
> Fase 5. No cambies textos ni el orden de secciones salvo que lo pida el
> cliente.”
