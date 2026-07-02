import { useEffect } from 'react'

const BASE_TITLE = 'Mohammed Alazaar — Growth & Marketing Manager · Full-Stack Developer'

// Sets document.title and meta description per route (SPA — the static
// index.html values only cover the landing page).
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · Mohammed Alazaar` : BASE_TITLE
    if (description) {
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', description)
    }
  }, [title, description])
}
