import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 120, suffix: '+ hrs', label: 'Handwork' },
  { value: 100, suffix: '%', label: 'Pure Fabrics' },
  { value: null, label: 'Made to Measure' },
]

export default function FabricCraft() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const wordsRef = useRef(null)
  const countersRef = useRef([])

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          }
        )

        const words = wordsRef.current.querySelectorAll('span')
        gsap.set(words, { opacity: 0.15 })
        gsap.to(words, {
          opacity: 1,
          stagger: 0.03,
          ease: 'none',
          scrollTrigger: { trigger: wordsRef.current, start: 'top 85%', end: 'bottom 60%', scrub: 0.4 },
        })
      }

      stats.forEach((stat, i) => {
        if (stat.value == null) return
        const el = countersRef.current[i]
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            if (el) el.textContent = Math.round(obj.val) + stat.suffix
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const copy =
    'Every AURELLE piece passes through the hands of artisans who have worked in embroidery and weaving for generations. We work in small batches, sourcing pure fabrics and finishing every seam by hand, so what reaches you is closer to a keepsake than a purchase.'

  return (
    <section ref={sectionRef} className="bg-espresso text-ivory">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="relative h-[50vh] md:h-auto overflow-hidden">
          <img
            ref={imgRef}
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
            alt="Close-up of hand embroidery and zari work on silk fabric"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-6 md:px-14 py-16 md:py-0">
          <span className="overline">Fabric &amp; Craft</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-normal max-w-md">
            Hand-finished, from thread to hem.
          </h2>
          <p ref={wordsRef} className="mt-6 max-w-md text-ivory/80 leading-relaxed">
            {copy.split(' ').map((w, i) => (
              <span key={i} className="inline-block mr-1">
                {w}
              </span>
            ))}
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {stats.map((s, i) => (
              <div key={s.label}>
                <div
                  ref={(el) => (countersRef.current[i] = el)}
                  className="font-serif text-2xl md:text-3xl text-gold"
                >
                  {s.value == null ? '' : `0${s.suffix}`}
                </div>
                <p className="mt-1 text-xs tracking-[0.1em] uppercase text-ivory/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
