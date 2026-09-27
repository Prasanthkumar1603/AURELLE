import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import DressShowcase from '../components/DressShowcase.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import OccasionBento from '../components/OccasionBento.jsx'
import FabricCraft from '../components/FabricCraft.jsx'
import Lookbook from '../components/Lookbook.jsx'
import Testimonials from '../components/Testimonials.jsx'
import InstagramMarquee from '../components/InstagramMarquee.jsx'
import { products } from '../data/products.js'
import useSilkReveal from '../hooks/useSilkReveal.js'

export default function Home() {
  const newArrivalsRef = useRef(null)
  useSilkReveal(newArrivalsRef, '.na-heading', { y: 30 })

  const newArrivals = products.filter((p) => p.newArrival).slice(0, 8)

  return (
    <div>
      <Hero />
      <DressShowcase />

      <section ref={newArrivalsRef} className="bg-blush py-24 md:py-28">
        <div className="container-lux">
          <div className="flex items-end justify-between mb-12 na-heading">
            <div>
              <span className="overline">Just In</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-normal">New Arrivals</h2>
            </div>
            <Link to="/shop" className="hidden sm:inline-block text-xs tracking-[0.15em] uppercase text-espresso/60 hover:text-espresso underline underline-offset-4">
              View All
            </Link>
          </div>
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      <OccasionBento />
      <FabricCraft />
      <Lookbook />
      <Testimonials />
      <InstagramMarquee />
    </div>
  )
}
