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
- **Buscador & Filtros Multidimensionales**: Búsqueda instantánea en tiempo real por título, descripción, tecnologías o palabras clave. Filtrado por etiquetas y 3 modos de vista (Grid, Repositorios estilo GitHub y Timeline cronológica).
- **Consumo Dinámico de GitHub REST API**: Muestra automáticamente las estadísticas de tus repositorios públicos, estrellas totales y distribución de lenguajes de programación.
- **Lector de Markdown Avanzado**:
  - Tabla de Contenidos (TOC) generada automáticamente.
  - Barra superior de progreso de lectura.
  - Resaltado de código y botón de copiar al portapapeles.
  - Visor de imágenes en Lightbox modal.
- **Internacionalización (i18n)**: Alterna entre **Español (ES)** e **Inglés (EN)** de forma instantánea.
- **SEO & PWA Ready**: Meta etiquetas Open Graph, Twitter Cards, `manifest.json`, `sitemap.xml`, `robots.txt` y Service Worker `sw.js` para caché offline.

---

## 📂 Estructura de Directorios

```text
/
├── index.html                  # Landing Page / Hero, Stats Dashboard, Featured Projects
├── proyectos.html              # Catálogo completo de Proyectos (Filtros, Búsqueda, Vistas)
├── proyecto.html               # Lector dinámico de Caso de Estudio (Markdown)
├── blog.html                   # Índice del Blog Técnico
├── articulo.html               # Lector de Artículo de Blog (TOC, Progress bar)
├── tecnologias.html            # Matriz interactiva de Tecnologías y Habilidades
├── experiencia.html            # Línea de tiempo de Carrera y Certificaciones
├── contacto.html               # Formulario interactivo de Contacto
├── 404.html                    # Página de error 404
├── manifest.json               # Configuración de PWA
├── sitemap.xml                 # Mapa del sitio SEO
├── robots.txt                  # Instrucciones para buscadores
├── sw.js                       # Service Worker para PWA offline
├── assets/
│   ├── css/
│   │   ├── main.css            # Tokens de diseño, tipografía y variables HSL
│   │   ├── components.css      # Componentes UI (Cards, Navbar, Timeline, Buttons)
│   │   └── animations.css      # Keyframes, Partículas y Aurora Background
│   └── js/
│       ├── config.js           # Configuración del usuario y diccionario i18n
│       ├── theme.js            # Tema Claro/Oscuro
│       ├── i18n.js             # Motor de Idiomas
│       ├── particles.js        # Canvas de Partículas
│       ├── github-api.js       # Integración con la API de GitHub REST
│       ├── content-loader.js   # Parser de Markdown (marked) + Frontmatter
│       ├── search-filter.js    # Buscador y Filtros en tiempo real
│       ├── ui-effects.js       # Efectos UI (TOC, Lightbox, Copy Snippet)
│       └── app.js              # Controlador principal
├── content/
│   ├── projects/               # Markdown de proyectos
│   └── blog/                   # Markdown de artículos
└── data/
    ├── projects.json           # Índice de proyectos
    ├── blog.json               # Índice del blog
    ├── technologies.json       # Habilidades técnicas
    └── experience.json         # Trayectoria profesional
```

---

## 📝 Cómo Agregar un Nuevo Proyecto

1. Crea la carpeta en `content/projects/<mi-proyecto>/` y agrega `index.md`:
   ```markdown
   ---
   title: "Mi Nuevo Proyecto"
   date: "2026-07-23"
   author: "Tu Nombre"
   category: "Backend & AI"
   status: "Completed"
   ---
   # Mi Nuevo Proyecto
   Descripción detallada y arquitectura...
   ```
2. Agrega la entrada a `data/projects.json`:
   ```json
   {
     "slug": "mi-proyecto",
     "title": "Mi Nuevo Proyecto",
     "description": "Breve descripción para la tarjeta...",
     "category": "Backend & AI",
     "status": "Completed",
     "date": "2026-07",
     "image": "assets/images/placeholder.svg",
     "technologies": ["Python", "FastAPI", "Docker"],
     "githubUrl": "https://github.com/tu-usuario/mi-proyecto",
     "featured": true
   }
   ```

---

## 🚀 Despliegue en GitHub Pages

1. Sube este repositorio a tu cuenta de GitHub (ejemplo: `usuario.github.io` o un repositorio regular).
2. Ve a **Settings -> Pages** en tu repositorio de GitHub.
3. En **Source**, selecciona `Deploy from a branch` y elige la rama `main` (directorio `/root`).
4. Haz clic en **Save**. ¡Tu sitio estará en vivo en pocos segundos en `https://tu-usuario.github.io`!
