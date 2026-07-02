import { useEffect, useRef } from 'react'
import { HashRouter as BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import ExperiencePage from './pages/ExperiencePage'
import Admin from './pages/Admin'
import { trackPageView } from './analytics'

// gtag config in index.html sends the initial page_view; this covers
// hash-route navigations GA4 doesn't see on its own. It also resets scroll
// to the top on every route change (SPAs keep the prior scroll position,
// so a new page would otherwise open mid-scroll). 'instant' overrides the
// global `scroll-behavior: smooth` so navigation doesn't animate the jump.
// Take manual control of scroll so the browser doesn't restore a remembered
// position and override the scroll-to-top below.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

function RouteChange() {
  const location = useLocation()
  const first = useRef(true)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (first.current) { first.current = false; return }
    const t = setTimeout(() => trackPageView(location.pathname), 0)
    return () => clearTimeout(t)
  }, [location.pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteChange />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/experience/:id" element={<ExperiencePage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
