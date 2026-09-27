import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import useSilkReveal from '../hooks/useSilkReveal.js'

const collections = [
  { name: 'Evening Edit', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=80', tag: 'Gowns · Occasion Wear' },
  { name: 'Bridal Collection', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80', tag: 'Lehengas · Sarees' },
  { name: 'Festive Edit', image: 'https://images.unsplash.com/photo-1610189844502-0b6c8a0b4b1e?auto=format&fit=crop&w=1200&q=80', tag: 'Ethnic Wear' },
  { name: 'Contemporary Sarees', image: 'https://images.unsplash.com/photo-1594736797933-d0301ba4fe65?auto=format&fit=crop&w=1200&q=80', tag: 'Sarees' },
  { name: 'Signature Gowns', image: 'https://images.unsplash.com/photo-1571908599407-cdb918ed83bf?auto=format&fit=crop&w=1200&q=80', tag: 'Gowns' },
  { name: 'Luxury Lehengas', image: 'https://images.unsplash.com/photo-1583391733981-8498408ee6d5?auto=format&fit=crop&w=1200&q=80', tag: 'Lehengas' },
]

export default function Collections() {
  const ref = useRef(null)
  useSilkReveal(ref, '.col-item', { stagger: 0.1, y: 50 })

  return (
    <div className="pt-28 md:pt-32 pb-24 bg-ivory">
      <div className="container-lux text-center max-w-xl mx-auto mb-16">
        <span className="overline">Editorial</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-normal">Collections</h1>
        <p className="mt-3 text-espresso/60 text-sm">Curated edits, built around a single mood or occasion.</p>
      </div>

      <div ref={ref} className="container-lux grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((c) => (
          <Link
            key={c.name}
            to="/shop"
            className="col-item group relative h-[420px] md:h-[480px] rounded-3xl overflow-hidden block"
          >
            <img
              src={c.image}
              alt={c.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-silk group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/10 to-transparent" />
            <div className="absolute bottom-7 left-7 right-7">
              <span className="text-xs tracking-[0.15em] uppercase text-gold">{c.tag}</span>
              <h2 className="mt-2 font-serif text-3xl text-ivory">{c.name}</h2>
              <span className="mt-4 inline-block opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-400 text-xs tracking-[0.15em] uppercase text-ivory border-b border-gold pb-1">
                View Collection
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
