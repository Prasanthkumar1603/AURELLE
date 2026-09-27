import React from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()
  const wishlisted = isWishlisted(product.id)
  const onSale = product.mrp && product.mrp > product.price

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-blush">
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={product.images[1] || product.images[0]}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-105 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {product.newArrival && (
            <span className="absolute top-3 left-3 bg-gold text-espresso text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full">
              New
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault()
              toggleWishlist(product.id)
            }}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-ivory/90 flex items-center justify-center hover:bg-ivory transition-colors"
          >
            <Heart size={15} className={wishlisted ? 'fill-gold text-gold' : 'text-espresso'} />
          </button>

          <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-silk">
            <button
              onClick={(e) => {
                e.preventDefault()
                addToCart(product, { size: product.sizes[0], color: product.colors[0], quantity: 1 })
              }}
              className="w-full bg-espresso text-ivory text-[11px] tracking-[0.15em] uppercase py-3 hover:bg-black transition-colors"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </Link>

      <Link to={`/product/${product.id}`} className="block mt-3">
        <h3 className="text-sm text-espresso">{product.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-gold text-sm font-medium">₹{product.price.toLocaleString('en-IN')}</span>
          {onSale && (
            <span className="text-espresso/40 text-xs line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
          )}
        </div>
      </Link>
    </div>
  )
}
