import React, { createContext, useContext, useEffect, useState } from 'react'

const WishlistContext = createContext(null)
export const useWishlist = () => useContext(WishlistContext)

const STORAGE_KEY = 'aurelle_wishlist'

function readInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(readInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  }, [ids])

  const isWishlisted = (id) => ids.includes(id)

  const toggleWishlist = (id) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <WishlistContext.Provider value={{ ids, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}
