/* ==========================================================================
   Antigravity Engine - Markdown & JSON Content Loader
   ========================================================================== */

class ContentLoader {
  constructor() {
    this.projectsCache = null;
    this.blogCache = null;
    this.techCache = null;
  }

  async loadProjects() {
    if (this.projectsCache) return this.projectsCache;
    try {
      const res = await fetch('data/projects.json');
      if (!res.ok) throw new Error('Failed to load projects.json');
      this.projectsCache = await res.json();
      return this.projectsCache;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async loadBlogPosts() {
    if (this.blogCache) return this.blogCache;
    try {
      const res = await fetch('data/blog.json');
      if (!res.ok) throw new Error('Failed to load blog.json');
      this.blogCache = await res.json();
      return this.blogCache;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async loadTechnologies() {
    if (this.techCache) return this.techCache;
    try {
      const res = await fetch('data/technologies.json');
      if (!res.ok) throw new Error('Failed to load technologies.json');
      this.techCache = await res.json();
      return this.techCache;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async loadMarkdownFile(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Could not fetch Markdown file at: ${path}`);
      const text = await res.text();
      return this.parseFrontmatterAndMarkdown(text);
    } catch (err) {
      console.error(err);
      return {
        metadata: {},
        html: `<div class="glass-panel" style="padding: 2rem; text-align: center;"><p>Error al cargar el contenido. Por favor intenta más tarde.</p></div>`
      };
    }
  }

  parseFrontmatterAndMarkdown(text) {
    let metadata = {};
    let markdownText = text;

    // YAML Frontmatter parsing (between --- and ---)
    const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+/;
    const match = text.match(frontmatterRegex);

    if (match) {
      const yamlBlock = match[1];
      markdownText = text.replace(frontmatterRegex, '');

      yamlBlock.split('\n').forEach(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx !== -1) {
          const key = line.slice(0, colonIdx).trim();
          let value = line.slice(colonIdx + 1).trim();
          // Remove wrapping quotes
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          metadata[key] = value;
        }
      });
    }

    // Render markdown using Marked library if available, else lightweight custom parser
    let html = '';
    if (typeof marked !== 'undefined') {
      html = marked.parse(markdownText);
    } else {
      html = this.basicMarkdownParser(markdownText);
    }

    return { metadata, html, rawText: markdownText };
  }

  basicMarkdownParser(md) {
    return md
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
      .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
      .replace(/\n$/gim, '<br />');
  }

  calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
}

const contentLoader = new ContentLoader();
