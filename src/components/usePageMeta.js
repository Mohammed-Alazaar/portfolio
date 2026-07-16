import { useEffect } from 'react'

const BASE_TITLE = 'Mohammed Alazaar — Growth & Marketing Manager · Full-Stack Developer'
const BASE_URL = 'https://mohammed-alazaar.github.io/portfolio'

function setMeta(selector, content) {
  const meta = document.querySelector(selector)
  if (meta && content) meta.setAttribute('content', content)
}

// Keep route metadata synchronized during client-side navigation. Each public
// route also receives matching static metadata during the production build.
export function usePageMeta(title, description, path = '/') {
  useEffect(() => {
    const pageTitle = title ? `${title} · Mohammed Alazaar` : BASE_TITLE
    const routePath = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}/`
    const canonicalUrl = `${BASE_URL}${routePath}`

    document.title = pageTitle
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', pageTitle)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:url"]', canonicalUrl)
    setMeta('meta[name="twitter:title"]', pageTitle)
    setMeta('meta[name="twitter:description"]', description)

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', canonicalUrl)
  }, [title, description, path])
}
