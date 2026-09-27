import React, { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { featuredLooks } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

gsap.registerPlugin(ScrollTrigger)

const accents = ['#EFE3D8', '#F3E6E0', '#E7DCCB', '#EADFE3']

export default function DressShowcase() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const imgRefs = useRef([])
  const [active, setActive] = useState(0)
  const [size, setSize] = useState(null)
  const { addToCart } = useCart()

  const product = featuredLooks[active] || featuredLooks[0]

  useLayoutEffect(() => {
    setSize(product?.sizes?.[0] ?? null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !featuredLooks.length) return undefined

    const ctx = gsap.context(() => {
      const panels = imgRefs.current
      gsap.set(panels, { opacity: 0, scale: 0.85, rotateY: 8, filter: 'blur(0px)' })
      gsap.set(panels[0], { opacity: 1, scale: 1, rotateY: 0 })

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${featuredLooks.length * 100}%`,
        pin: stageRef.current,
        scrub: 0.5,
        onUpdate: (self) => {
          const idx = Math.min(
            featuredLooks.length - 1,
            Math.floor(self.progress * featuredLooks.length)
          )
          setActive((prev) => {
            if (prev === idx) return prev
            gsap.to(panels[prev], { opacity: 0, filter: 'blur(8px)', x: -40, duration: 0.5, ease: 'power2.out' })
            gsap.fromTo(
              panels[idx],
              { opacity: 0, scale: 0.85, rotateY: 8, x: 0, filter: 'blur(0px)' },
              { opacity: 1, scale: 1, rotateY: 0, duration: 0.6, ease: 'power3.out' }
            )
            return idx
          })
        },
      })

      return () => st.kill()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!product) return null

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ '--accent': accents[active] }}
    >
      <div
        ref={stageRef}
        className="h-screen w-full flex items-stretch transition-colors duration-700"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        <div className="container-lux grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full py-16">
          {/* Image stage */}
          <div className="relative h-[55vh] md:h-[70vh] rounded-3xl overflow-hidden" style={{ perspective: 1200 }}>
            {featuredLooks.map((look, i) => (
              <img
                key={look.id}
                ref={(el) => (imgRefs.current[i] = el)}
                src={look.images[0]}
                alt={look.name}
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                style={{ opacity: i === 0 ? 1 : 0 }}
              />
            ))}
          </div>

          {/* Copy / controls */}
          <div className="max-w-md">
            <span className="font-serif text-sm text-espresso/50">
              0{active + 1} / 0{featuredLooks.length}
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-normal text-espresso">{product.name}</h2>
            <p className="mt-3 text-espresso/70 text-sm">{product.fabric}</p>
            <p className="mt-4 text-2xl text-gold font-serif">₹{product.price.toLocaleString('en-IN')}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3.5 py-1.5 rounded-full text-xs tracking-wide border transition-colors ${
                    size === s ? 'bg-espresso text-ivory border-espresso' : 'border-espresso/30 text-espresso hover:border-espresso'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-5 flex gap-2">
              {product.colors.map((c) => (
                <span
                  key={c}
                  title={c}
                  className="w-6 h-6 rounded-full border border-espresso/20"
                  style={{ background: c.toLowerCase().includes('ivory') ? '#FAF7F2' : c.toLowerCase().includes('espresso') || c.toLowerCase().includes('black') || c.toLowerCase().includes('midnight') ? '#1C1512' : c.toLowerCase().includes('champagne') || c.toLowerCase().includes('gold') ? '#C9A24B' : '#E7DCCB' }}
                />
              ))}
            </div>

            <button
              onClick={() => addToCart(product, { size: size ?? product.sizes[0], color: product.colors[0], quantity: 1 })}
              className="btn-dark mt-8 rounded-full"
            >
              Add to Bag
            </button>

            <Link to={`/product/${product.id}`} className="block mt-4 text-xs tracking-[0.15em] uppercase text-espresso/60 hover:text-espresso underline underline-offset-4">
              View full details
            </Link>

            {/* progress */}
            <div className="mt-10 flex gap-1.5">
              {featuredLooks.map((_, i) => (
                <span
                  key={i}
                  className="h-[2px] flex-1 rounded-full bg-espresso/15 overflow-hidden"
                >
                  <span
                    className="block h-full bg-gold transition-all duration-500"
                    style={{ width: i <= active ? '100%' : '0%' }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
