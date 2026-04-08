import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on') }),
      { threshold: 0.13 }
    )
    document.querySelectorAll('.r').forEach((el) => obs.observe(el))
    document.querySelectorAll('#hero .r').forEach((el) => el.classList.add('on'))
    return () => obs.disconnect()
  }, [])
}
