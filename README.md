# Koon · Landing

Landing estática para Koon / INDEXSA. La dirección visual actual es la
**Fase 5 «La comanda»**: rediseño completo a partir de las seis referencias del
cliente, pendiente de su validación. La Fase 4 anterior queda en el historial de
git (tag `fase-4`).

## Ver la landing

Desde la raíz del repo:

```bash
python3 -m http.server 5500 --bind 127.0.0.1
```

Abre `http://localhost:5500`. No hay build ni npm.

## Estado actual

- **Diseño:** fondo hueso, tinta café y un solo color principal, hoy verde
  `#1F8A4C` (el cliente no quería naranja; se puede comparar con `?colores`). Titulares
  en Bricolage Grotesque, texto en Figtree. El ticket/comanda es el motivo
  gráfico. Detalle en [`docs/DIRECCION-VISUAL.md`](docs/DIRECCION-VISUAL.md).
- **Producto:** las fotos de stock dentro de marcos se sustituyeron por la
  interfaz dibujada en HTML (`mockups.css`): cocina, tienda en línea, caja,
  portal de facturación y sucursales. Son ilustraciones; se reemplazan por
  capturas reales cuando existan.
- **Movimiento:** `motion.js` con GSAP + ScrollTrigger y Lenis (en
  `assets/vendor/`, sin CDN). Respeta `prefers-reduced-motion`.
- **Contenido:** se conservaron todos los textos. Se añadieron dos piezas con
  contenido del brief: la cinta con las cinco ideas y la sección «Hecho para
  México» (para quién es).
- **Formulario:** sigue siendo una simulación sin backend; redirige a
  `gracias.html`.
- **WhatsApp:** el número real sigue pendiente en `script.js`
  (`WHATSAPP_NUMBER`). Mientras esté vacío, los botones llevan al formulario.
- **Pendientes de contenido:** testimonio real, respuestas del FAQ por validar,
  textos legales, logo de INDEXSA, capturas y fotos definitivas.

## Estructura

```
.
├── index.html
├── styles.css        ← sistema visual y secciones
├── mockups.css       ← interfaz del producto dibujada en HTML
├── motion.js         ← animaciones
├── script.js         ← formulario, acordeón, QR, WhatsApp
├── gracias.html
├── legales.html
├── assets/
│   ├── img/          ← platos recortados (provisionales)
│   ├── vendor/       ← gsap, ScrollTrigger, lenis
│   └── README.md
├── docs/
│   ├── DIRECCION-VISUAL.md
│   ├── HANDOFF.md
│   └── preview/      ← capturas de la Fase 5
└── references/       ← brief y documento de funcionalidades
```

## Sistema visual

| Token | Valor | Uso |
| --- | --- | --- |
| `--hueso` | `#F6F1E7` | fondo de página |
| `--papel` | `#FFFDF8` | tarjetas, tickets, secciones alternas |
| `--tinta` | `#1C1612` | texto, secciones oscuras |
| `--tinta-2` | `#5A5048` | texto secundario |
| `--chile` | `#1F8A4C` | color principal: botones y bloques de marca (el nombre viene de la primera propuesta en naranja) |
| `--hierba` | `#1F8A4C` | checks y sellos |
| `--maiz` | `#F6C445` | etiquetas pequeñas |

## Probar otro color principal

El color principal es una sola variable, `--chile`, en `:root` de `styles.css`;
los tonos hondo, suave y vivo se derivan de ella. Para que el cliente compare
colores sin tocar código:

```
http://localhost:5500/index.html?colores
http://localhost:5500/index.html?colores=1F8A4C   ← abre con ese color
```

Aparece un panel con colores sugeridos, selector libre, aviso de legibilidad y
un botón para copiar el enlace con el color elegido. Sin `?colores` el panel no
se carga. Cuando se decida el color, se escribe en `--chile` y `playground.js`
se puede borrar.

## Nota de contraste

Con el verde `#1F8A4C`, el texto claro de los botones queda en ≈4.3:1, un poco
por debajo del 4.5:1 de AA para texto normal (con texto oscuro sería ≈4.1:1). Un
verde algo más oscuro lo resolvería. Las palabras verdes del titular (≈3.9:1) y
«Koon» en el pie (≈4.1:1) valen por ser texto grande.
