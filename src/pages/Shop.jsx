import React, { useMemo, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import ProductGrid from '../components/ProductGrid.jsx'
import { products, categories } from '../data/products.js'
import useSilkReveal from '../hooks/useSilkReveal.js'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
]

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sort, setSort] = useState('featured')
  const headerRef = useRef(null)
  useSilkReveal(headerRef, '.shop-heading', { y: 30 })

  const filtered = useMemo(() => {
    let list =
      activeCategory === 'all'
        ? [...products]
        : products.filter((p) => p.category.toLowerCase().replace(/\s+/g, '-') === activeCategory)

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'newest') list = list.filter((p) => p.newArrival).concat(list.filter((p) => !p.newArrival))

    return list
  }, [activeCategory, sort])

  return (
    <div className="pt-28 md:pt-32 pb-24 bg-ivory min-h-screen">
      <div className="container-lux">
        <div ref={headerRef} className="shop-heading text-center max-w-lg mx-auto mb-14">
          <span className="overline">The Collection</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-normal">Shop All</h1>
          <p className="mt-3 text-espresso/60 text-sm">
            Designer dresses, gowns, lehengas, sarees, ethnic wear and occasion wear.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-xs tracking-wide uppercase border transition-colors ${
                activeCategory === 'all' ? 'bg-espresso text-ivory border-espresso' : 'border-espresso/20 hover:border-espresso'
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveCategory(c.slug)}
                className={`px-4 py-2 rounded-full text-xs tracking-wide uppercase border transition-colors ${
                  activeCategory === c.slug ? 'bg-espresso text-ivory border-espresso' : 'border-espresso/20 hover:border-espresso'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none pl-4 pr-9 py-2 rounded-full border border-espresso/20 text-xs tracking-wide uppercase bg-transparent focus:border-gold outline-none cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-espresso/60" />
          </div>
        </div>

        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <p className="text-center text-espresso/60 py-20">No products found in this category yet.</p>
        )}
      </div>
    </div>
  )
}
