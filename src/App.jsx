import { useEffect, useRef } from 'react'
import { HashRouter as BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import ExperiencePage from './pages/ExperiencePage'
import Admin from './pages/Admin'
import { trackPageView } from './analytics'

// gtag config in index.html sends the initial page_view; this covers
// hash-route navigations GA4 doesn't see on its own.
function RouteAnalytics() {
  const location = useLocation()
  const first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    const t = setTimeout(() => trackPageView(location.pathname), 0)
    return () => clearTimeout(t)
  }, [location.pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteAnalytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/experience/:id" element={<ExperiencePage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
