# AirePro Climas — Sitio Web

Página web estática (HTML, CSS y JavaScript vanilla) para un negocio de mantenimiento, reparación e instalación de aires acondicionados y minisplits.

## Estructura

```
climacontrol-web/
├── index.html        # Página principal (hero, servicios, nosotros, testimonios, contacto)
├── css/
│   └── style.css     # Estilos, variables de tema y responsive
├── js/
│   └── main.js        # Menú móvil, animaciones al hacer scroll, contador de estadísticas y validación del formulario
└── img/               # Recursos gráficos
```

## Secciones incluidas

- Encabezado con barra de contacto y menú responsive
- Hero con llamados a la acción y estadísticas animadas
- Catálogo de servicios (mantenimiento, reparación, instalación, recarga de gas, limpieza, contratos)
- Sección "Nosotros" con lista de beneficios
- Testimonios de clientes
- Formulario de contacto con validación básica en el cliente
- Botón flotante de WhatsApp y botón "volver arriba"

## Cómo verlo localmente

Al ser un sitio estático, basta abrir `index.html` en el navegador, o servirlo con cualquier servidor estático, por ejemplo:

```bash
npx serve .
```

## Personalización

- Cambia el nombre del negocio, teléfono, correo y dirección directamente en `index.html`.
- Ajusta colores y tipografías en las variables `:root` de `css/style.css`.
- Los textos de servicios y testimonios son de ejemplo y deben reemplazarse con información real del negocio.
