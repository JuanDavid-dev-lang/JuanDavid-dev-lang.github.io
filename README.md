# 🚀 Antigravity Portfolio & Technical Blog Engine (v2.5)

Un sitio web de portafolio profesional y blog técnico completamente estático, sin backend, optimizado para **GitHub Pages (`github.io`)**. Inspirado en el lenguaje de diseño visual de **Vercel, Linear, Raycast, Stripe y GitHub**.

---

## 🌟 Características Principales

- **Arquitectura 100% Estática**: Diseñado con **HTML5, Vanilla CSS3 y JavaScript Vanilla ES6+**. Cero dependencias de Node.js en tiempo de ejecución, cero servidores backend o bases de datos relacionales.
- **Mantenibilidad Ultra Simple**: Para agregar un nuevo proyecto o artículo, solo necesitas crear una carpeta en `content/projects/<nombre>/index.md` o `content/blog/<nombre>/index.md` y actualizar `data/projects.json` o `data/blog.json`.
- **Diseño Futurista & Premium**:
  - Dark Mode por defecto con selector opcional de Light Mode.
  - Efectos de Glassmorphism, Aurora Glow y canvas interactivo de partículas.
  - Micro-animaciones con `IntersectionObserver` y seguimiento de cursor.
- **Filtro de Tecnologías por Categoría**: Frontend, Backend, Bases de Datos, IA & ML, DevOps & Cloud y Herramientas.
- **Consumo Dinámico de GitHub REST API**: Muestra automáticamente repositorios públicos, estrellas, forks, seguidores y distribución de lenguajes (con caché local de 1 hora y valores de respaldo si la API no responde).
- **Contenido en Markdown**: Los casos de estudio y artículos se escriben en `content/**/index.md` y se renderizan en el navegador con [marked](https://marked.js.org/).
- **Internacionalización (i18n)**: Alterna entre **Español (ES)** e **Inglés (EN)** de forma instantánea.
- **SEO & PWA Ready**: Meta etiquetas Open Graph, Twitter Cards, `manifest.json`, `sitemap.xml`, `robots.txt` y Service Worker `sw.js` para caché offline.

---

## 📂 Estructura de Directorios

```text
/
├── index.html                  # Landing SPA: Hero, Sobre Mí, Servicios, Tecnologías, Trayectoria,
│                               # Proyectos (modal), Blog, GitHub Stats y Contacto
├── proyecto.html               # Caso de estudio de un proyecto (?id=<slug>, renderiza Markdown)
├── articulo.html               # Artículo del blog (?id=<slug>, renderiza Markdown)
├── 404.html                    # Página de error 404
├── manifest.json               # Configuración de PWA
├── sitemap.xml                 # Mapa del sitio SEO
├── robots.txt                  # Instrucciones para buscadores
├── sw.js                       # Service Worker (network-first, fallback offline)
├── assets/
│   ├── css/
│   │   ├── design-system.css   # Tokens de diseño, tipografía, tema claro/oscuro
│   │   ├── components.css      # Navbar, botones, cards, modal, cursor, canvas de partículas
│   │   ├── sections.css        # Estilos por sección de la landing
│   │   ├── animations.css      # Keyframes, scroll reveal, aurora
│   │   ├── responsive.css      # Media queries (mobile first)
│   │   └── markdown.css        # Tipografía del contenido Markdown (blog / casos de estudio)
│   └── js/
│       ├── config.js           # SITE_CONFIG (datos personales, Formspree) y diccionario i18n
│       ├── theme.js            # Tema Claro/Oscuro
│       ├── i18n.js             # Motor de Idiomas ES/EN
│       ├── navigation.js       # Navbar, menú móvil, scroll suave, sección activa
│       ├── particles.js        # Canvas de Partículas
│       ├── github-api.js       # Estadísticas en vivo desde la API REST de GitHub
│       ├── sections.js         # Render dinámico de secciones desde data/*.json
│       ├── modal.js            # Modal de detalle de proyecto
│       ├── contact.js          # Validación y envío del formulario (Formspree o mailto)
│       ├── animations.js       # Scroll reveal, contadores, cursor, parallax
│       └── app.js              # Router principal (landing / proyecto / artículo)
├── content/
│   ├── projects/<slug>/index.md   # Markdown de casos de estudio
│   └── blog/<slug>/index.md       # Markdown de artículos
└── data/
    ├── projects.json           # Proyectos destacados
    ├── other-projects.json     # Otros proyectos y experimentos
    ├── blog.json               # Índice del blog
    ├── technologies.json       # Habilidades técnicas
    ├── experience.json         # Trayectoria profesional
    └── services.json           # Servicios ofrecidos
```

## ⚙️ Configuración Personal

Edita `assets/js/config.js`:

- `email`, `social.linkedin`: datos de contacto que se muestran en la página.
- `contact.formspreeEndpoint`: endpoint de [Formspree](https://formspree.io) para recibir mensajes del formulario. Si se deja vacío, el formulario abre el cliente de correo con el mensaje prellenado (`mailto:`).


