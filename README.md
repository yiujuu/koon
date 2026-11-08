# Koon · Landing

Landing estática para Koon / INDEXSA. La dirección visual actual es la
**Fase 4: impacto visual extremo y equilibrio de color**, aplicada como
iteración de trabajo después de la Fase 3 y pendiente de validación del cliente.

El repo se creó al final de la Fase 4 para poder retomar el proyecto en un chat
nuevo sin depender del historial de la conversación.

## Ver la landing

Desde la raíz de este repo:

```powershell
python -m http.server 5500 --bind 127.0.0.1
```

Abre `http://localhost:5500`.

Para una revisión rápida de todo el estado:

```powershell
git log --oneline --decorate -5
git status
```

## Estado actual

- **Fase 4 aplicada:** bloques de color, tarjetas pastel, hero con halo naranja,
  franja de sellos verde, facturación naranja, comparativo azul con columna Koon
  destacada, testimonio verde, precios crema, formulario blanco sobre azul y
  números de implementación naranja.
- **Motion:** scroll reveal de 30px, hover de tarjetas, flecha animada, zoom de
  imagen en desktop y `prefers-reduced-motion`.
- **Contenido:** no se reescribieron textos ni se cambió el orden de secciones.
  Solo se sustituyeron los placeholders de captura por fotos temporales y se
  añadieron capas visuales/decorativas.
- **Formulario:** sigue siendo una simulación sin backend; redirige a
  `gracias.html`.
- **WhatsApp:** el número real sigue pendiente en `script.js`
  (`WHATSAPP_NUMBER`). Mientras esté vacío, los botones de WhatsApp llevan al
  formulario.
- **Fotos:** stock temporal de Pexels, documentado en `assets/README.md`. No son
  clientes reales. El testimonio conserva el placeholder de foto.
- **Pendientes de contenido:** testimonio real, respuestas del FAQ por validar,
  textos legales y capturas definitivas del producto.

## Estructura

```
.
├── index.html
├── styles.css
├── script.js
├── gracias.html
├── legales.html
├── assets/
│   └── README.md
├── docs/
│   ├── HANDOFF.md
│   └── preview/          ← capturas finales de la Fase 4
├── README.md
└── .gitignore
```

## Sistema visual

Tokens base:

| Token | Valor | Uso |
| --- | --- | --- |
| `--blanco-puro` | `#FFFFFF` | fondos claros, ticket, formulario |
| `--gris-fondo-suave` | `#F8F9FA` | problema, testimonio, FAQ |
| `--negro-texto` | `#111827` | titulares y texto principal |
| `--gris-texto` | `#4B5563` | texto secundario |
| `--naranja-acento` | `#FF5A1F` | CTAs, facturación, acentos |
| `--naranja-hover` | `#E04812` | hover de botones |
| `--verde-acento` | `#00A86B` | sellos, checks, pasos 2/4, testimonios |
| `--azul-profundo` | `#0F172A` | comparativo, CTA final |

Pasteles y superficies derivadas: `--naranja-pastel`, `--verde-pastel`,
`--azul-pastel`, `--amarillo-pastel`, `--azul-medio`, `--gris-panel`,
`--crema-precio`.

Tipografía: **Outfit 700/800** para display y **Inter 400/500** para texto.
Los H1/H2 son `#111827` sobre fondo claro y blancos sobre naranja, verde o azul.

## Nota de contraste

La franja de sellos y la sección de facturación usan **texto blanco sobre
`#00A86B` / `#FF5A1F`**, tal como pidió el cliente. Ese contraste ronda
**3.1:1**, así que no cumple AA para texto normal. Los botones naranjas usan
texto casi negro (`#0B0F19`) para conservar AA. Si en la Fase 5 se exige AA
estricto, hay que cambiar el texto de esos dos bloques a oscuro o usar un verde
más profundo.

## Preview

Las capturas finales están en [`docs/preview/`](docs/preview/). El handoff
detallado para el siguiente chat está en [`docs/HANDOFF.md`](docs/HANDOFF.md).
