# HANDOFF · Koon Landing

> Lee este archivo antes de tocar nada. Resume el estado al cerrar la Fase 5.

## 0. Contexto

- **Proyecto:** landing estática de Koon, producto de INDEXSA para restaurantes
  en México. Objetivo: que el dueño agende una demo o escriba por WhatsApp.
- **Historia:** la Fase 3 se rechazó con 2/10 (color y sensación estática). La
  Fase 4 añadió bloques de color. La **Fase 5** es un rediseño completo guiado
  por seis referencias del cliente; la favorita es UpsellSaaS.
- **Estado:** Fase 5 implementada, sin commit, pendiente de revisión.
- **Lecturas:** `docs/DIRECCION-VISUAL.md` (análisis y dirección),
  `references/` (brief y funcionalidades), `docs/preview/` (capturas).

## 1. Cómo levantarlo

```bash
python3 -m http.server 5500 --bind 127.0.0.1
```

## 2. Secciones

| # | Sección | Cómo está resuelta |
| --- | --- | --- |
| — | Barra | Píldora flotante; fondo al hacer scroll; se esconde al bajar. Móvil: logo + botón. |
| 1 | Hero | Titular gigante, CTAs, composición celular + pantalla de cocina con historia en bucle, platos sueltos, 3 sellos. |
| — | Cinta | Banda chile inclinada con las cinco ideas del brief. |
| 3 | Problema | Las 4 fugas como comandas que se apilan (`position: sticky`). |
| 4 | Cómo funciona | 4 pasos con mini ilustración; línea y comanda que avanzan con el scroll. |
| 5 | Funciones | 4 bloques; en ≥1024 px la captura vive en un escenario fijo que cambia de color. |
| 6 | Facturación | Ticket con QR que sale de una impresora. |
| 7 | Comparativo | Tabla oscura con la columna Koon en chile; en móvil, tarjetas (mismo HTML). |
| — | Hecho para México | Panel chile, título gigante, platos que entran rodando, a quién va dirigido. |
| 8 | Testimonio | Espacio reservado con los textos `[PENDIENTE]`. |
| 9 | Precios | «24 h» gigante con contador, tarjeta de cotización. |
| 10 | Implementación | 3 tarjetas inclinadas + frase de cierre. |
| 11 | FAQ | Acordeón; el título se queda fijo en escritorio. |
| 12 | CTA final | Sección oscura; el formulario es una comanda de papel. |
| 13 | Pie | Enlaces, espacio para logo INDEXSA, palabra «Koon» gigante. |

## 3. Archivos clave

- `styles.css`: tokens en `:root`; el bloque 13 contiene todos los estados de
  movimiento, siempre bajo la clase `.motion`.
- `mockups.css`: interfaz del producto. Escala con `cqw`/`em`; cada bloque
  (`.kds`, `.store`, `.pos`, `.portal`, `.panel`) se puede sustituir por una
  captura real dentro de su `.feat__media`.
- `motion.js`: una función por pieza (hero, cinta, pila, flujo, escenario,
  impresora, platos, pie). Sin GSAP la página sigue completa.
- `script.js`: sin cambios de lógica (formulario, acordeón, QR, WhatsApp,
  flotante). Solo se quitaron el reveal y la barra, que ahora viven en
  `motion.js`.
- `<head>` de `index.html`: añade `.motion` si el usuario no pide menos
  movimiento y la retira a los 3.5 s si `motion.js` no cargó.

## 4. Decisiones que hay que respetar o discutir

1. **No se cambiaron textos.** Lo añadido sale del brief: las cinco ideas
   (cinta), «Hecho para México: CFDI, pesos y dólares, tickets y propina» y la
   lista de a quién va dirigido.
2. **Datos de las pantallas dibujadas** («Tu Taquería», platillos, precios,
   folios, sucursales Centro / Boca del Río / Xalapa) son de ejemplo. No son
   clientes ni cifras reales.
3. **Botones naranjas con texto oscuro**, igual que en la Fase 4, por contraste.
4. **Dos familias tipográficas**, como pide el brief. El ticket no usa
   monoespaciada por eso.
5. **Nada prometido que no exista:** no se mencionan Uber Eats, lealtad,
   entrega a domicilio, reservaciones ni terminal bancaria.
6. **Formulario sin backend** y **WhatsApp sin número**, como antes.

## 5. Revisión hecha con Playwright

- 1440×900, 820×1180 y 390×844, de arriba a abajo con scroll gradual.
- Sin scroll horizontal y sin errores de consola en las tres medidas.
- Hover de botones, acordeón abierto, formulario con errores, envío válido →
  `gracias.html` con el nombre, `legales.html`.
- `prefers-reduced-motion`: página completa, sin animaciones.
- Sin JavaScript: todo el contenido visible, FAQ abierto.
- Lint de copy del skill `design-taste-frontend`: 0 FAIL, 2 avisos (demasiadas
  etiquetas sobre los titulares; son del texto original).

**No revisado:** Safari/iOS real, Firefox, rendimiento en 4G (el `perf.mjs` del
skill no encontró Chrome), lector de pantalla.

## 6. Pendientes

1. Revisión del cliente.
2. Capturas reales del producto y fotos propias (ver `assets/README.md`).
3. Número de WhatsApp, backend del formulario, testimonio, FAQ validado, textos
   legales, logo de INDEXSA, imagen Open Graph.
4. Probar en iPhone y Android reales; si el scroll suave molesta, se quita
   borrando el bloque Lenis de `motion.js`.
