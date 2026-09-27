import React from 'react'
import { Link } from 'react-router-dom'
import { X, Minus, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, subtotal } = useCart()

  return (
    <div className={`fixed inset-0 z-[95] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <div
        className={`absolute inset-0 bg-espresso/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
      />
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-ivory flex flex-col transition-transform duration-500 ease-silk ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-espresso/10">
          <h2 className="font-serif text-xl">Your Bag ({items.length})</h2>
          <button onClick={closeCart} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {items.length === 0 && (
            <p className="text-espresso/60 text-sm mt-8 text-center">Your bag is empty.</p>
          )}
          {items.map((item) => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
              <div className="w-20 h-24 rounded-xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm">{item.name}</h3>
                  <button onClick={() => removeFromCart(item)} aria-label="Remove item" className="text-espresso/40 hover:text-espresso">
                    <X size={15} />
                  </button>
                </div>
                <p className="text-xs text-espresso/50 mt-1">
                  {item.size} &middot; {item.color}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 border border-espresso/15 rounded-full px-2 py-1">
                    <button onClick={() => updateQuantity(item, item.quantity - 1)} aria-label="Decrease quantity">
                      <Minus size={12} />
                    </button>
                    <span className="text-xs w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item, item.quantity + 1)} aria-label="Increase quantity">
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="text-sm text-gold font-medium">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-espresso/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-espresso/60">Subtotal</span>
              <span className="text-lg font-serif text-gold">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {/* Checkout is a UI placeholder — structured so a real payment
                integration (e.g. Razorpay) can be wired in later. */}
            <button className="btn-dark w-full rounded-full" onClick={() => alert('Checkout is a UI placeholder in this demo.')}>
              Checkout
            </button>
            <Link to="/shop" onClick={closeCart} className="block text-center mt-3 text-xs uppercase tracking-[0.1em] text-espresso/50 hover:text-espresso">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
