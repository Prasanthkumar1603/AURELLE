import React, { useRef } from 'react'
import useSilkReveal from '../hooks/useSilkReveal.js'

const values = [
  { title: 'Craft over speed', text: 'Every piece is made in small batches, never rushed to meet a trend cycle.' },
  { title: 'Fabric first', text: 'We source pure, breathable fabrics and reject anything that compromises on feel.' },
  { title: 'Made to last', text: 'Hand-finished construction built to be worn for years, not one season.' },
]

export default function About() {
  const heroRef = useRef(null)
  const valuesRef = useRef(null)
  useSilkReveal(heroRef, '.about-reveal', { y: 40 })
  useSilkReveal(valuesRef, '.value-item', { stagger: 0.1, y: 30 })

  return (
    <div className="bg-ivory">
      <section ref={heroRef} className="pt-32 md:pt-40 pb-20 container-lux max-w-3xl">
        <span className="overline about-reveal">Our Story</span>
        <h1 className="mt-4 text-4xl md:text-6xl font-normal leading-[1.05] about-reveal">
          A house built on the belief that clothing should feel like an heirloom.
        </h1>
        <p className="mt-6 text-espresso/70 leading-relaxed max-w-xl about-reveal">
          AURELLE began as a small atelier working with weavers and embroiderers across India,
          committed to fabrics and techniques that take time to get right. Today, every dress,
          gown, lehenga and saree we make still passes through the same hands, the same
          patience, and the same standard.
        </p>
      </section>

      <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1800&q=85"
          alt="Editorial photograph of an AURELLE saree in motion"
          className="w-full h-full object-cover"
        />
      </section>

      <section className="container-lux py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="overline">Craftsmanship</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-normal max-w-md">
            Behind every seam, hours of unhurried handwork.
          </h2>
        </div>
        <p className="text-espresso/70 leading-relaxed">
          From hand-embroidered zari to hand-block-printed silk, our craft partners bring
          generations of technique to every AURELLE piece. We work directly with artisan
          clusters, ensuring fair, sustained work and fabrics that are chosen, not defaulted to.
        </p>
      </section>

      <section ref={valuesRef} className="bg-blush py-20 md:py-28">
        <div className="container-lux">
          <span className="overline">Our Values</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-normal mb-12">What AURELLE stands for</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="value-item bg-ivory rounded-3xl p-8">
                <h3 className="font-serif text-xl">{v.title}</h3>
                <p className="mt-3 text-espresso/70 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
