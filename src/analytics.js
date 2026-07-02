// GA4 helpers — gtag is loaded in index.html; guard so dev/ad-blockers never throw.
export function track(event, params = {}) {
  if (typeof window.gtag === 'function') window.gtag('event', event, params)
}

export function trackContact(channel, location) {
  track('contact_click', { channel, location })
}

export function trackPageView(path) {
  if (typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}
