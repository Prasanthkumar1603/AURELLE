import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reusable "silk entrance" reveal: fades, lifts and de-skews elements
 * matching `selector` inside `ref` as they enter the viewport.
 *
 * Usage: useSilkReveal(sectionRef, '.reveal-item', { stagger: 0.1 })
 */
export default function useSilkReveal(ref, selector, options = {}) {
  const {
    y = 60,
    skewY = 4,
    duration = 1.1,
    stagger = 0.08,
    delay = 0,
    start = 'top 80%',
  } = options

  useLayoutEffect(() => {
    if (!ref.current) return undefined
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const targets = ref.current.querySelectorAll(selector)
      if (!targets.length) return

      if (prefersReduced) {
        gsap.set(targets, { opacity: 1, y: 0, skewY: 0 })
        return
      }

      gsap.set(targets, { opacity: 0, y, skewY })
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration,
        delay,
        stagger,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: ref.current,
          start,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [ref, selector])
}
