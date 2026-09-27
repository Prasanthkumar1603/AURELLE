import React, { useRef } from 'react'
import ProductCard from './ProductCard.jsx'
import useSilkReveal from '../hooks/useSilkReveal.js'

export default function ProductGrid({ products, columns = 4 }) {
  const ref = useRef(null)
  useSilkReveal(ref, '.grid-item', { stagger: 0.08, y: 40 })

  const colClass = columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'

  return (
    <div ref={ref} className={`grid grid-cols-2 ${colClass} gap-x-5 gap-y-10`}>
      {products.map((p) => (
        <div key={p.id} className="grid-item">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  )
}
