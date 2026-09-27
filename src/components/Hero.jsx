import React, { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1800&q=85'

export default function Hero() {
  const sectionRef = useRef(null)
  const imgFrameRef = useRef(null)
  const contentRef = useRef(null)

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const lines = contentRef.current.querySelectorAll('.headline-line span')
      gsap.set(lines, { yPercent: prefersReduced ? 0 : 110 })
      const overline = contentRef.current.querySelector('.hero-overline')
      const sub = contentRef.current.querySelector('.hero-sub')
      const ctas = contentRef.current.querySelector('.hero-ctas')
      gsap.set([overline, sub, ctas], { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 24 })

      const tl = gsap.timeline({ delay: 0.9 })
      tl.to(overline, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .to(lines, { yPercent: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, '-=0.4')
        .to(sub, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .to(ctas, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')

      if (!prefersReduced) {
        gsap.to(imgFrameRef.current, {
          scale: 0.86,
          borderRadius: '2rem',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
        gsap.to(contentRef.current, {
          yPercent: -25,
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-espresso">
      <div ref={imgFrameRef} className="absolute inset-0 origin-top overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Model wearing a flowing AURELLE evening gown"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/10 to-espresso/30" />
      </div>

      <div ref={contentRef} className="relative h-full container-lux flex flex-col justify-center max-w-xl">
        <span className="hero-overline overline text-gold mb-6">Spring · Summer &apos;26</span>
        <h1 className="text-ivory">
          <span className="headline-line line-mask">
            <span className="block text-[15vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] font-normal">
              Dressed in
            </span>
          </span>
          <span className="headline-line line-mask">
            <span className="block text-[15vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] italic font-normal">
              Poetry.
            </span>
          </span>
        </h1>
        <p className="hero-sub mt-6 text-ivory/80 max-w-sm text-[15px] leading-relaxed">
          Hand-finished dresses, gowns and ethnic wear, made in small batches for the moments
          worth dressing for.
        </p>
        <div className="hero-ctas mt-10 flex flex-wrap items-center gap-4">
          <Link to="/shop" className="btn-gold">
            Shop the Collection
          </Link>
          <Link to="/about" className="btn-ghost">
            Watch the Film
          </Link>
        </div>
      </div>
    </section>
  )
}
