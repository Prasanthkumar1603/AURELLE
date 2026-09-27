import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import useSilkReveal from '../hooks/useSilkReveal.js'

const occasions = [
  {
    label: 'Wedding & Bridal',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    size: 'large',
  },
  {
    label: 'Evening',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80',
    size: 'small',
  },
  {
    label: 'Casual Day',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80',
    size: 'small',
  },
  {
    label: 'Festive Ethnic',
    image: 'https://images.unsplash.com/photo-1610189844502-0b6c8a0b4b1e?auto=format&fit=crop&w=900&q=80',
    size: 'small',
  },
]

export default function OccasionBento() {
  const ref = useRef(null)
  useSilkReveal(ref, '.bento-item', { stagger: 0.1 })

  return (
    <section ref={ref} className="bg-ivory py-24 md:py-32">
      <div className="container-lux">
        <span className="overline bento-item">By Occasion</span>
        <h2 className="mt-3 text-4xl md:text-5xl font-normal bento-item">Shop by Occasion</h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          <OccasionCard item={occasions[0]} tall className="bento-item" />
          <div className="grid grid-rows-3 gap-5">
            {occasions.slice(1).map((o) => (
              <OccasionCard key={o.label} item={o} className="bento-item" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function OccasionCard({ item, tall, className = '' }) {
  return (
    <Link
      to="/shop"
      className={`group relative overflow-hidden rounded-3xl block ${tall ? 'h-[520px] md:h-full' : 'h-40 md:h-[168px]'} ${className}`}
    >
      <img
        src={item.image}
        alt={item.label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-silk group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/5 to-transparent" />
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
        <span className="font-serif text-xl md:text-2xl text-ivory">{item.label}</span>
        <span className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-400 bg-gold text-espresso text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full whitespace-nowrap">
          Explore
        </span>
      </div>
    </Link>
  )
}
