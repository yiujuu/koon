# Assets de Koon

Todo lo que hay aquí es provisional salvo `vendor/`.

## Platos (`img/`)

Fotografías de Pexels en vista cenital, recortadas en círculo y guardadas como
WebP de 720 px con transparencia. No son platillos de un cliente real; hay que
sustituirlas por fotografía propia antes de publicar.

| Archivo | Fuente |
| --- | --- |
| `plato-tacos.webp` | https://www.pexels.com/photo/5848703/ |
| `plato-dorados.webp` | https://www.pexels.com/photo/3391962/ |
| `plato-pozole.webp` | https://www.pexels.com/photo/16235561/ |
| `plato-pozole-rojo.webp` | https://www.pexels.com/photo/16235564/ |
| `plato-quesadillas.webp` | https://www.pexels.com/photo/31009742/ |
| `plato-sopa.webp` | https://www.pexels.com/photo/9251294/ |

Licencia de Pexels: https://www.pexels.com/license/

Para reemplazarlas: foto cenital del plato completo, recorte cuadrado ajustado
al borde del plato, fondo transparente, 720 × 720 px, mismo nombre de archivo.

## Pantallas del producto

No son imágenes: están dibujadas en HTML en `index.html` con estilos de
`mockups.css`. Cuando lleguen las capturas reales, cada una entra dentro de su
contenedor `.feat__media` (o `.hero__art`) en lugar del bloque dibujado.

| Bloque | Dónde | Captura que lo sustituye |
| --- | --- | --- |
| `.kds` | Hero | Pantalla de cocina, 1600 × 1000 px |
| `.store` (en `.phone`) | Hero y Funciones 02 | Tienda en línea, 720 × 1520 px |
| `.pos` | Funciones 01 | Caja, 1600 × 1000 px |
| `.portal` (en `.phone`) | Funciones 03 | Portal de facturación, 720 × 1520 px |
| `.panel` | Funciones 04 | Panel de sucursales, 1600 × 1000 px |

Los nombres, precios, folios y sucursales que aparecen son de ejemplo.

## Otros pendientes

| Archivo | Uso |
| --- | --- |
| `foto-testimonio.jpg` | Foto circular del testimonio, 400 × 400 px |
| `logo-indexsa.svg` | Logo de INDEXSA para el pie |
| `og-koon.jpg` | Imagen para compartir el enlace, 1200 × 630 px |

- El QR del ticket se genera con JavaScript; no es un QR funcional.
- El testimonio conserva sus textos `[PENDIENTE]`; no se inventó prueba social.

## `vendor/`

GSAP 3.12.5, ScrollTrigger 3.12.5 y Lenis 1.1.14, servidos desde el propio
sitio para no depender de un CDN.
