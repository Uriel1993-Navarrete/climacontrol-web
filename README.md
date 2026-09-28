# Ing. Jonathan Perez — Servicios técnicos (electricidad y climas)

Sitio de una sola página en Angular 21 (componentes standalone, signals, OnPush, CSS plano, sin SSR) para un negocio de mantenimiento, reubicación, instalación y reparación de climas 110V y 220V. Convierte visitas en cotizaciones por WhatsApp (botón flotante y formulario que arma el mensaje y abre `wa.me`).

## Desarrollo

```bash
npm ci            # o npm install
npm start         # http://localhost:4200
npm run build     # salida en dist/climacontrol-web/browser
npm test -- --watch=false
```

Requiere Node 22 y npm 10. El archivo `.npmrc` activa `legacy-peer-deps` por un fallo de npm 10 al resolver peers de vitest/jsdom.

## Qué editar

| Qué | Dónde |
|-----|-------|
| Nombre del negocio, número de WhatsApp, horarios, zona, marcas, mensaje genérico | `src/app/config/site.config.ts` |
| Servicios, descripciones e imagen de cada tarjeta | `src/app/data/services.ts` |
| Fotos | `public/img/` (reemplaza el archivo con el mismo nombre, o cambia la ruta en `services.ts`) |
| Colores y tipografía | variables `:root` en `src/styles.css` |

- El número de WhatsApp va solo con dígitos y lada (por ejemplo `5215512345678`). Todos los enlaces lo leen de `site.config.ts`.
- Los valores actuales (zona, horarios, marcas, imágenes) son **placeholders** y deben reemplazarse antes de publicar.

## Despliegue en Netlify

1. Sube el repositorio a GitHub y en Netlify elige "Import from Git".
2. `netlify.toml` ya define: build `npm run build`, publish `dist/climacontrol-web/browser` y la redirección `/*` a `/index.html` (200).
3. Cada push a la rama configurada redespliega el sitio.

## Fuera del alcance del MVP

Video (segunda etapa), backend, correo y pagos.
