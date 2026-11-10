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

- **Diseño:** fondo hueso, tinta café y un solo acento naranja chile. Titulares
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
| `--chile` | `#F0481E` | único acento: botones y bloques de marca |
| `--hierba` | `#1F8A4C` | checks y sellos |
| `--maiz` | `#F6C445` | etiquetas pequeñas |

## Nota de contraste

Los botones naranjas llevan texto tinta (≈4.9:1, pasa AA). El texto blanco sobre
chile solo se usa en el título gigante de «Hecho para México» (≈3.7:1, válido
para texto grande). El naranja de «sin pagar comisión» en el titular del hero
ronda 3.3:1 sobre hueso: válido solo por ser texto grande.
