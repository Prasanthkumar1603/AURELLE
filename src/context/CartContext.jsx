import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
export const useCart = () => useContext(CartContext)

const STORAGE_KEY = 'aurelle_cart'

function readInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Line items are keyed by product id + size + color so the same product
// in a different size/color is tracked as a distinct cart line.
const lineKey = (item) => `${item.id}-${item.size}-${item.color}`

export function CartProvider({ children }) {
  const [items, setItems] = useState(readInitial)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = (product, { size, color, quantity = 1 }) => {
    setItems((prev) => {
      const key = lineKey({ id: product.id, size, color })
      const existing = prev.find((i) => lineKey(i) === key)
      if (existing) {
        return prev.map((i) => (lineKey(i) === key ? { ...i, quantity: i.quantity + quantity } : i))
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          size,
          color,
          quantity,
        },
      ]
    })
    setIsOpen(true)
  }

  const removeFromCart = (item) => {
    setItems((prev) => prev.filter((i) => lineKey(i) !== lineKey(item)))
  }

  const updateQuantity = (item, quantity) => {
    if (quantity < 1) return removeFromCart(item)
    setItems((prev) => prev.map((i) => (lineKey(i) === lineKey(item) ? { ...i, quantity } : i)))
  }

  const clearCart = () => setItems([])

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items])
  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])

  const value = {
    items,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    count,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
