import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, Minus, Plus, Truck, RefreshCw } from 'lucide-react'
import { getProductById, getRelatedProducts } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import SizeGuideModal from '../components/SizeGuideModal.jsx'

export default function ProductDetails() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()

  const [activeImg, setActiveImg] = useState(0)
  const [size, setSize] = useState(product?.sizes?.[0])
  const [color, setColor] = useState(product?.colors?.[0])
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('info')
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

  useEffect(() => {
    setActiveImg(0)
    setSize(product?.sizes?.[0])
    setColor(product?.colors?.[0])
    setQty(1)
  }, [id])

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center">
        <p className="text-espresso/60">Product not found.</p>
        <Link to="/shop" className="btn-dark mt-6 inline-flex rounded-full">
          Back to Shop
        </Link>
      </div>
    )
  }

  const related = getRelatedProducts(product)
  const onSale = product.mrp && product.mrp > product.price
  const wishlisted = isWishlisted(product.id)

  return (
    <div className="pt-24 md:pt-28 pb-24 bg-ivory">
      <div className="container-lux grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-blush">
            <img
              key={activeImg}
              src={product.images[activeImg]}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          </div>
          <div className="mt-4 flex gap-3">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-colors ${
                  activeImg === i ? 'border-gold' : 'border-transparent'
                }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:pt-4">
          <p className="text-xs tracking-[0.15em] uppercase text-espresso/50">{product.category}</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-normal">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl text-gold font-serif">₹{product.price.toLocaleString('en-IN')}</span>
            {onSale && (
              <span className="text-espresso/40 line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
            )}
          </div>

          <p className="mt-5 text-espresso/70 leading-relaxed max-w-md">{product.description}</p>

          {/* Size */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs tracking-[0.1em] uppercase text-espresso/60">Size</span>
              <button onClick={() => setSizeGuideOpen(true)} className="text-xs underline underline-offset-4 text-espresso/60 hover:text-espresso">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-full text-xs border transition-colors ${
                    size === s ? 'bg-espresso text-ivory border-espresso' : 'border-espresso/25 hover:border-espresso'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mt-6">
            <span className="text-xs tracking-[0.1em] uppercase text-espresso/60 block mb-2">Color</span>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-4 py-2 rounded-full text-xs border transition-colors ${
                    color === c ? 'bg-espresso text-ivory border-espresso' : 'border-espresso/25 hover:border-espresso'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + actions */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-4 border border-espresso/20 rounded-full px-4 py-2.5">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                <Minus size={14} />
              </button>
              <span className="w-5 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={() => addToCart(product, { size, color, quantity: qty })}
              className="btn-dark rounded-full flex-1"
            >
              Add to Bag
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className="w-12 h-12 shrink-0 rounded-full border border-espresso/20 flex items-center justify-center hover:border-espresso transition-colors"
            >
              <Heart size={17} className={wishlisted ? 'fill-gold text-gold' : ''} />
            </button>
          </div>

          {/* Info tabs */}
          <div className="mt-10 border-t border-espresso/10 pt-6">
            <div className="flex gap-6 text-xs tracking-[0.1em] uppercase mb-4">
              <button onClick={() => setTab('info')} className={tab === 'info' ? 'text-espresso border-b border-gold pb-1' : 'text-espresso/40 pb-1'}>
                Product Info
              </button>
              <button onClick={() => setTab('shipping')} className={tab === 'shipping' ? 'text-espresso border-b border-gold pb-1' : 'text-espresso/40 pb-1'}>
                Shipping
              </button>
            </div>
            {tab === 'info' ? (
              <ul className="text-sm text-espresso/70 space-y-1.5">
                <li>Fabric: {product.fabric}</li>
                <li>Occasion: {product.occasion}</li>
                <li>Care: Dry clean only</li>
              </ul>
            ) : (
              <div className="text-sm text-espresso/70 space-y-2.5">
                <p className="flex items-center gap-2"><Truck size={15} className="text-gold" /> Ships within 5–7 business days.</p>
                <p className="flex items-center gap-2"><RefreshCw size={15} className="text-gold" /> Easy 7-day exchange on unworn pieces.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="container-lux mt-24">
          <span className="overline">You May Also Like</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-normal mb-10">Related Pieces</h2>
          <ProductGrid products={related} />
        </div>
      )}

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  )
}
