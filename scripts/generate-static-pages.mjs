import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { experiences, projects } from '../src/data.js'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = join(root, 'dist')
const baseUrl = 'https://mohammed-alazaar.github.io/portfolio'
const template = await readFile(join(dist, 'index.html'), 'utf8')

const escapeAttribute = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

function replaceMeta(html, attribute, name, content) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`<meta ${attribute}="${escapedName}" content="[^"]*" \\/>`)
  return html.replace(pattern, `<meta ${attribute}="${name}" content="${escapeAttribute(content)}" />`)
}

function pageHtml({ title, description, path, indexable = true }) {
  const canonical = `${baseUrl}/${path ? `${path}/` : ''}`
  let html = template.replace(/<title>.*?<\/title>/s, `<title>${escapeAttribute(title)}</title>`)
  html = replaceMeta(html, 'name', 'description', description)
  html = replaceMeta(html, 'name', 'robots', indexable ? 'index, follow' : 'noindex, nofollow')
  html = replaceMeta(html, 'property', 'og:title', title)
  html = replaceMeta(html, 'property', 'og:description', description)
  html = replaceMeta(html, 'property', 'og:url', canonical)
  html = replaceMeta(html, 'name', 'twitter:title', title)
  html = replaceMeta(html, 'name', 'twitter:description', description)
  return html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonical}" />`,
  )
}

const publicPages = [
  ...projects.map((project) => ({
    path: `project/${project.id}`,
    title: `${project.title} · Mohammed Alazaar`,
    description: project.description,
  })),
  ...experiences.map((experience) => ({
    path: `experience/${experience.id}`,
    title: `${experience.company} — ${experience.role} · Mohammed Alazaar`,
    description: experience.description,
  })),
]

const sitemapPages = [
  { path: '', priority: '1.0' },
  ...publicPages.map(({ path }) => ({ path, priority: '0.8' })),
]
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapPages.flatMap(({ path, priority }) => [
    '  <url>',
    `    <loc>${baseUrl}/${path ? `${path}/` : ''}</loc>`,
    '    <lastmod>2026-07-16</lastmod>',
    '    <changefreq>monthly</changefreq>',
    `    <priority>${priority}</priority>`,
    '  </url>',
  ]),
  '</urlset>',
  '',
].join('\n')

// A second, deliberately minimal sitemap has a fresh URL for Search Console.
// It avoids reusing a stale failed-fetch record for /sitemap.xml and contains
// only the required sitemap fields.
const minimalSitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapPages.flatMap(({ path }) => [
    '  <url>',
    `    <loc>${baseUrl}/${path ? `${path}/` : ''}</loc>`,
    '  </url>',
  ]),
  '</urlset>',
  '',
].join('\n')

await writeFile(join(dist, 'sitemap.xml'), sitemap)
await writeFile(join(dist, 'sitemap-pages.xml'), minimalSitemap)

for (const page of publicPages) {
  const directory = join(dist, ...page.path.split('/'))
  await mkdir(directory, { recursive: true })
  await writeFile(join(directory, 'index.html'), pageHtml(page))
}

// Preserve direct access to the existing admin route without advertising it
// to search engines or including it in the sitemap.
const adminDirectory = join(dist, 'admin')
await mkdir(adminDirectory, { recursive: true })
await writeFile(join(adminDirectory, 'index.html'), pageHtml({
  path: 'admin',
  title: 'Admin · Mohammed Alazaar',
  description: 'Portfolio administration.',
  indexable: false,
}))

console.log(`Generated two ${sitemapPages.length}-URL sitemaps, ${publicPages.length} indexable route shells, and the admin shell.`)
