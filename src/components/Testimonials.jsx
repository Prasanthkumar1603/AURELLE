import React, { useRef } from 'react'
import { Quote } from 'lucide-react'
import { testimonials } from '../data/products.js'
import useSilkReveal from '../hooks/useSilkReveal.js'

export default function Testimonials() {
  const ref = useRef(null)
  useSilkReveal(ref, '.testi-card', { stagger: 0.12, y: 30 })

  return (
    <section ref={ref} className="bg-ivory py-24 md:py-32">
      <div className="container-lux text-center">
        <span className="overline">Reviews</span>
        <h2 className="mt-3 text-4xl md:text-5xl font-normal">Loved by Every Silhouette</h2>
        <p className="mt-3 text-espresso/60 text-sm tracking-wide">4.9 / 5 &middot; 500+ Happy Customers</p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`testi-card bg-blush rounded-3xl p-8 relative ${i === 1 ? 'md:-translate-y-6' : ''}`}
            >
              <Quote className="text-gold/50" size={34} />
              <p className="mt-4 text-espresso/80 leading-relaxed text-[15px]">{t.text}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/30 flex items-center justify-center font-serif text-sm text-espresso">
                  {t.name.charAt(0)}
                </div>
                <span className="text-sm font-medium">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
