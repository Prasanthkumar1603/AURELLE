import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function LoadingScreen() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const tl = gsap.timeline()
    tl.fromTo(el.querySelector('.load-word'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to(el, { opacity: 0, duration: 0.5, ease: 'power2.inOut', delay: 0.3, pointerEvents: 'none' })
    return () => tl.kill()
  }, [])

  return (
    <div ref={ref} className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso">
      <span className="load-word font-serif text-3xl tracking-[0.3em] text-ivory">AURELLE</span>
    </div>
  )
}
