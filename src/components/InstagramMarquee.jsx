import React from 'react'
import { instagramImages } from '../data/products.js'

export default function InstagramMarquee() {
  const loop = [...instagramImages, ...instagramImages]

  return (
    <section className="relative bg-ivory py-16 overflow-hidden">
      <div className="flex justify-center mb-8">
        <span className="bg-espresso text-ivory text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-full">
          @aurelle.official &mdash; Follow Us
        </span>
      </div>

      <div className="flex w-max marquee-track motion-reduce:animate-none">
        {loop.map((src, i) => (
          <div key={i} className="w-40 h-40 md:w-52 md:h-52 shrink-0 mx-2.5 rounded-2xl overflow-hidden">
            <img src={src} alt="AURELLE Instagram fashion post" className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  )
}
