# Dirección visual · Fase 5 «La comanda»

Análisis de las seis referencias del cliente y la dirección que sale de ellas.
Todas se recorrieron con Playwright (escritorio 1440 y móvil 390, de arriba a
abajo, con scroll fino en las secciones animadas, hover y menú móvil).

## 1. Lo más fuerte de cada referencia

| Referencia | Qué la hace buena | Movimiento observado |
| --- | --- | --- |
| **UpsellSaaS** (la favorita) | Blanco, un solo verde plano y saturado, tipografía redonda enorme (hasta 144 px), tarjetas inclinadas, casi nada de texto por pantalla. | Titular que entra palabra por palabra con desenfoque. Sección fija donde las tarjetas se apilan una sobre otra. Tarjetas de proceso inclinadas con trazos a mano. Panel verde con título gigante sobre el que un mazo de tarjetas se despliega y se recoge con el scroll. Scroll suave (Lenis). |
| **Callyra** | Papel cálido, tinta casi negra y un solo coral. El producto se muestra como sus resultados: una transcripción y un recibo con borde de papel cortado y sello. Teléfono gigante en el pie. | Reveal sobrio (14 px, 0.6 s). La llamada de ejemplo aparece línea por línea. |
| **Frankli** | Identidad cálida y humana; la interfaz se dibuja en fragmentos simplificados, sin marcos de dispositivo. Botón píldora con sombra dura. Notas adhesivas inclinadas. | El producto se arma con el scroll (tarjetas que convergen en la pantalla completa). La barra se esconde al bajar y vuelve al subir. |
| **Rise** | Blanco, un naranja saturado y una banda naranja a todo el ancho con una sola frase. | Demos del producto en bucle (una tarea cada una). Página interior con índice de pasos fijo. |
| **Slite** | Crema, tinta y un naranja; la interfaz del producto reconstruida en HTML y animada lleva todo el interés. | Demo guionizada en el hero (texto que se escribe, estados que cambian). Titular palabra por palabra. |
| **Gradient Labs** | Hueso y negro con bandas de color plano; tipografía apretada; etiquetas con regla. | Acordeón con línea de progreso; la flecha del botón viaja en hover. |

## 2. Patrones que se repiten

- Fondo cálido (hueso/crema) + tinta + **un solo color de acento** usado en grande.
- Tipografía de display muy grande y apretada; poco texto por pantalla.
- El producto se enseña **dibujado en HTML y en movimiento**, no en fotos de stock.
- Una o dos secciones que se quedan fijas mientras algo cambia con el scroll.
- Botones píldora; objetos ligeramente inclinados para dar vida.

## 3. Qué se adaptó y qué se evitó

**Se adaptó**

- De UpsellSaaS: la pila de tarjetas fija (aquí, las cuatro fugas como comandas),
  el titular con desenfoque, las tarjetas inclinadas de proceso y el panel de
  color con título gigante. El mazo de tarjetas se sustituyó por algo propio:
  **platos que entran rodando**.
- De Callyra: el ticket con borde cortado como motivo (lo pide también el brief:
  «el ticket con QR es el elemento gráfico de la marca»). Está en las fugas, en
  la facturación, en el formulario y en la página de gracias.
- De Slite y Frankli: la interfaz real dibujada en HTML y una historia guionizada
  en el hero (el pedido del celular llega a la pantalla de cocina).
- De Frankli: botón con sombra dura y barra que se esconde al bajar.
- De Rise y Gradient Labs: bandas de color plano para marcar el ritmo.

**Se evitó**

- Ilustración isométrica o de personajes (Gradient Labs, Frankli): cara de
  producir y ajena a un restaurante.
- Verde como color de marca (UpsellSaaS): el brief pide naranja chile.
- Diagramas en video, cuerpo de texto de 12–14 px, repetir el mismo CTA seis
  veces, pestañas fijas que tapan contenido.
- Copiar código, textos o imágenes de las referencias.

## 4. Dirección

**Idea:** un restaurante bien llevado. Papel de comanda, tinta de café y chile.

- **Color.** Hueso `#F6F1E7` (fondo), papel `#FFFDF8` (tarjetas y tickets),
  tinta `#1C1612`, **chile `#F0481E`** como único acento (botones, columna Koon,
  panel «Hecho para México», palabra del pie). Verde hierba `#1F8A4C` solo en
  checks y sellos; maíz `#F6C445` en etiquetas pequeñas. Secciones oscuras café
  para el comparativo y el cierre, como pide el brief.
- **Tipografía.** Bricolage Grotesque (titulares, 700–800, tracking negativo) y
  Figtree (texto, 17 px base). Dos familias, ambas de Google Fonts.
- **Composición.** Retícula de 1240 px; titulares a la izquierda; una idea por
  pantalla; objetos inclinados 1–5°; radios 12/20/32 y píldoras.
- **Imagen.** Interfaz del producto en HTML (caja, cocina, tienda, portal de
  facturas, sucursales) y platos mexicanos recortados en vista cenital.
- **Movimiento.** Ver tabla.

| Dónde | Qué pasa | Para qué |
| --- | --- | --- |
| Hero | El titular entra palabra por palabra; en bucle, el pedido se paga en el celular, un ticket vuela y aparece como comanda en cocina con su cronómetro. | Explica el producto sin leer. |
| Cinta | Corre sola y se acelera con el scroll. | Las cinco ideas del brief, con energía. |
| Problema | Las cuatro fugas se apilan como comandas; contador 01–04. | Una fuga a la vez. |
| Cómo funciona | La línea se llena y una comanda recorre los 4 pasos. | El viaje del pedido. |
| Funciones | En escritorio, la captura se queda fija y cambia con cada bloque. | Texto y pantalla siempre juntos. |
| Facturación | El ticket sale de la impresora; una línea escanea el QR. | El ticket es el protagonista. |
| Hecho para México | Los platos entran rodando sobre el título gigante. | El momento que se recuerda. |
| Resto | Reveals discretos, contador «24 h», tarjetas que se enderezan en hover, letras del pie que suben. | Que todo responda. |

Con `prefers-reduced-motion` nada de esto corre y la página queda completa.

## 5. Sobre el skill `design-taste-frontend`

Se aplicó su criterio de composición, tipografía, copy (el lint de copy pasa sin
FAIL), interfaz real en HTML, un solo sistema de botones y nada inventado. No se
siguió su capa de movimiento ni su «gate»: prohíbe los reveals al hacer scroll,
las tarjetas inclinadas y más de dos momentos animados, que es justo lo que el
cliente pidió con sus referencias.
