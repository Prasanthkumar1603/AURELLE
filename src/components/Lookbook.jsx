import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const looks = [
  'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1610189844502-0b6c8a0b4b1e?auto=format&fit=crop&w=900&q=80',
]

export default function Lookbook() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    if (prefersReduced || isMobile) return undefined // native horizontal scroll on mobile / reduced motion

    const ctx = gsap.context(() => {
      const track = trackRef.current
      const distance = track.scrollWidth - window.innerWidth

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${distance}`,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          gsap.set(track, { x: -distance * self.progress })
          gsap.set(progressRef.current, { width: `${self.progress * 100}%` })
        },
      })
      return () => st.kill()
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-ivory overflow-hidden">
      <div className="pt-20 pb-6 container-lux">
        <span className="overline">The Lookbook</span>
        <h2 className="mt-3 text-4xl md:text-5xl font-normal">Spring · Summer &apos;26</h2>
      </div>

      <div
        ref={trackRef}
        className="flex gap-5 px-6 md:px-16 pb-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none"
      >
        {looks.map((src, i) => (
          <div
            key={i}
            className={`snap-start shrink-0 w-[70vw] sm:w-[42vw] md:w-[26vw] h-[62vh] rounded-3xl overflow-hidden ${
              i % 2 === 1 ? 'md:mt-12' : ''
            }`}
          >
            <img src={src} alt={`Lookbook editorial image ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="hidden md:block container-lux">
        <div className="h-[2px] bg-espresso/10 rounded-full overflow-hidden">
          <div ref={progressRef} className="h-full bg-gold" style={{ width: '0%' }} />
        </div>
      </div>
    </section>
  )
}
