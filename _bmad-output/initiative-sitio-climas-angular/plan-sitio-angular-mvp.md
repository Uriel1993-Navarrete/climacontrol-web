---
title: 'MVP sitio Angular para empresa de mantenimiento de climas'
type: 'feature'
ticket: ''
created: '2026-09-28'
status: 'built'
baseline_revision: 'e1c91485efb488096626fbee2d7d601b0e296dec'
route: 'full'
route_source: 'auto'
review: 'quick'
review_source: 'pinned'
lenses_ran: [quick]
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** El negocio (mantenimiento, reubicación, instalación y reparación de climas 110V/220V de varias marcas) necesita un sitio moderno, desplegable en Netlify desde el repo, que convierta visitas en cotizaciones por WhatsApp. El repo solo tiene un sitio estático de ejemplo (`index.html`, `css/`, `js/`).

**Approach:** Reemplazar el ejemplo por una app Angular (standalone, signals, OnPush) de una sola página con carrusel de servicios (sin precios, por decisión del usuario), y contacto por WhatsApp (botón flotante más formulario que arma el mensaje y abre `wa.me`). Número, nombre del negocio, horarios y precios viven en dos archivos de datos editables. Sin librerías de UI ni de carrusel.

## Boundaries & Constraints

**Always:** Angular CLI 21 (instalado), CSS plano, sin SSR. Proyecto en la raíz del repo. Todo texto en español. Número de WhatsApp definido en un solo lugar, con el número real del cliente. Las fotos son placeholders reemplazables sin tocar componentes (imágenes en `public/img/`). Accesible: carrusel operable con teclado y botones, `aria-label` en controles, contraste suficiente. Responsive desde 360px.

**Never:** Video (segunda etapa). Backend, base de datos, envío de correo o pasarela de pago. Librerías de carrusel o de UI. Inventar teléfonos, direcciones o testimonios reales: usar marcadores claramente falsos. Borrar `.git`, `.agents/`, `.claude/`, `_bmad/`, `_bmad-output/` o `skills-lock.json`.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Formulario válido | Nombre, servicio, voltaje, marca y zona llenos | Abre `https://wa.me/<número>?text=<mensaje codificado>` en pestaña nueva con todos los datos | No error |
| Formulario incompleto | Falta nombre o servicio | No abre WhatsApp; muestra el error junto al campo | Mensajes en línea |
| Caracteres especiales | Acentos, `&`, saltos de línea, emojis | Mensaje llega íntegro (codificado con `encodeURIComponent`) | No error |
| Botón directo | Clic en botón flotante o CTA | Abre `wa.me/<número>` con mensaje genérico de cotización | No error |
| Carrusel | Primera/última tarjeta o pantalla táctil | Botones se deshabilitan en los extremos; deslizar o flechas de teclado funcionan | Sin JS de scroll, sigue usable |

</frozen-after-approval>

## Code Map

- `index.html`, `css/style.css`, `js/main.js` -- sitio de ejemplo (315/452/102 líneas). Referencia de secciones y textos (servicios, "nosotros", contacto); se eliminan.
- `README.md` -- describe el ejemplo estático; reescribir para Angular y Netlify.
- `.gitignore` -- solo ignora `.DS_Store`, `Thumbs.db`, `node_modules/`, `.vscode/`; añadir `dist/` y `.angular/`.
- `_bmad/`, `_bmad-output/`, `.agents/`, `.claude/`, `skills-lock.json` -- infraestructura BMad; no tocar.
- Entorno: Node 22.13.1, npm 10.9.2, Angular CLI 21.0.4 disponible con `npx --no-install ng`.

## Tasks & Acceptance

**Execution:**
- [ ] raíz del repo -- generar el proyecto `climacontrol-web` (standalone, CSS, sin SSR, sin routing) sin pisar los archivos protegidos; retirar `index.html`, `css/`, `js/` del ejemplo -- base Angular en raíz
- [ ] `src/app/config/site.config.ts` -- nombre del negocio, número de WhatsApp (placeholder), horarios, zona de servicio, marcas -- un solo lugar
- [ ] `src/app/data/services.ts` -- servicios (mantenimiento, reubicación, instalación, reparación, y los 110V/220V que aplique) con descripción e imagen, sin precios -- alimenta el carrusel y el select
- [ ] `src/app/core/whatsapp.ts` -- función pura que construye la URL `wa.me` y el texto del mensaje -- reusable y testeable
- [ ] `src/app/core/whatsapp.spec.ts` -- pruebas de la matriz de casos (codificación, número, mensaje genérico) -- evita regresiones
- [ ] `src/app/components/` -- header con navegación, hero con CTA, carrusel de servicios (scroll-snap, botones, teclado), sección nosotros y marcas, formulario de contacto, footer y botón flotante de WhatsApp -- páginas y CTA del MVP
- [ ] `src/styles.css`, `src/app/app.ts` -- variables de tema, tipografía, layout responsive, composición de secciones -- aspecto moderno
- [ ] `public/img/` -- imágenes placeholder livianas (SVG o similares) por servicio y hero -- se sustituyen con las fotos del usuario
- [ ] `netlify.toml` -- build `npm run build`, publish `dist/climacontrol-web/browser`, redirect `/*` a `/index.html` con 200 -- despliegue en Netlify
- [ ] `README.md`, `.gitignore` -- instrucciones de desarrollo, cómo cambiar número, servicios y fotos, y despliegue en Netlify -- entrega usable

**Acceptance Criteria:**
- Given el repo clonado, when se ejecuta `npm ci && npm run build`, then termina sin errores y produce `dist/climacontrol-web/browser/index.html`.
- Given la página cargada a 360px y a 1280px, when se recorre de arriba abajo, then no hay scroll horizontal y todas las secciones son legibles.
- Given el carrusel, when se usan botones, deslizado o flechas del teclado, then se recorren todos los servicios y ninguno muestra precios.
- Given el formulario válido, when se envía, then se abre WhatsApp con el mensaje esperado.
- Given `site.config.ts` con otro número, when se recompila, then todos los enlaces a WhatsApp usan ese número.

## Implementation Notes

- Scaffold generado con `ng new` en un directorio temporal y copiado a la raíz; se añadió `.npmrc` con `legacy-peer-deps=true` porque `npm install` falla en npm 10.9.2 con los peers de vitest/jsdom.
- Sitio de ejemplo (`index.html`, `css/`, `js/`) eliminado con `git rm` tras confirmación del usuario.
- Auditoría de la matriz: faltaban pruebas de formulario incompleto y carrusel; se añadieron `contact-form.spec.ts` y `services-carousel.spec.ts`.
- Corrección durante la auditoría: `alFinal` empezaba en `false` y solo cambiaba al hacer scroll, dejando "siguiente" activo cuando todo cabe en pantalla. Ahora se recalcula tras el primer render y en `window:resize`.
- Pendiente de verificación manual: aspecto a 360px y 1280px, icono de WhatsApp dibujado a mano, apertura real de `wa.me`.

## Plan Change Log

- 2026-09-28 (decisión del usuario): se quitan los precios del carrusel y de todo el sitio. Se añaden los servicios eléctricos y se usan el nombre y el teléfono de la imagen de referencia del cliente. KEEP: carrusel con scroll-snap, botón Cotizar por tarjeta, datos en `site.config.ts` y `services.ts`.

## Review Triage Log

Revisión rápida, un revisor. Todos los hallazgos verificados contra el código; ninguno cambia la intención, todos son patch.

| Verdict | Route | Evidencia |
|---|---|---|
| medium | patch | Blanco sobre #128c4a da 4.3:1 (<4.5). Se cambió a #0f7a40 (≈5.4:1). |
| medium | patch | Botón con `disabled` pierde el foco en el extremo. Ahora usa `aria-disabled` y `mover()` ignora el extremo; prueba de foco añadida. |
| low | patch | `buildWhatsAppBaseUrl` sin uso; eliminada junto con su prueba. |
| low | patch | `@angular/router` sin uso; desinstalado. |
| low | patch | Línea con espacios en `app.config.ts` y `package.json` sin salto final; corregidos. |
| low | patch | Señales solo con input/change: el autocompletado podía dejar campos vacíos. `enviar()` lee `FormData`. |
| low | patch | `package-lock.json` sin rastrear: es un archivo nuevo; se incluye al confirmar los cambios. |

## Design Notes

El carrusel es una lista horizontal con `scroll-snap-type: x mandatory`; los botones llaman `scrollBy` sobre el contenedor y un signal guarda si está en el inicio o en el final (actualizado en el evento `scroll`). Así funciona con toque y teclado sin librerías.

```ts
buildWhatsAppUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
```

## Verification

**Commands:**
- `npm run build` -- expected: build de producción sin errores ni warnings de presupuesto
- `npm test -- --watch=false` -- expected: pruebas de `whatsapp.ts` en verde

**Manual checks (if no CLI):**
- `npm start` y revisar a 360px y 1280px: secciones, carrusel, botón flotante y formulario (que abra `wa.me` con el mensaje esperado).
