import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import MobileMenu from './MobileMenu.jsx'

const links = [
  { label: 'New In', to: '/shop' },
  { label: 'Dresses', to: '/shop' },
  { label: 'Occasion', to: '/shop' },
  { label: 'Ethnic', to: '/shop' },
  { label: 'About', to: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, openCart } = useCart()
  const { ids } = useWishlist()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const transparent = isHome && !scrolled
  const textColor = transparent ? 'text-ivory' : 'text-espresso'

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[80] transition-all duration-500 ease-silk ${
          transparent ? 'bg-transparent py-6' : 'bg-ivory/90 backdrop-blur-md py-4 shadow-[0_1px_0_0_rgba(201,162,75,0.25)]'
        }`}
      >
        <div className={`container-lux flex items-center justify-between ${textColor}`}>
          <NavLink to="/" className="font-serif text-2xl tracking-[0.15em]">
            AURELLE
          </NavLink>

          <nav className="hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className="text-[13px] tracking-[0.08em] uppercase hover:opacity-60 transition-opacity"
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button aria-label="Search" className="hidden sm:inline-flex hover:opacity-60 transition-opacity">
              <Search size={19} />
            </button>
            <NavLink to="/shop" aria-label="Wishlist" className="relative hidden sm:inline-flex hover:opacity-60 transition-opacity">
              <Heart size={19} />
              {ids.length > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold text-espresso text-[9px] flex items-center justify-center">
                  {ids.length}
                </span>
              )}
            </NavLink>
            <button aria-label="Cart" onClick={openCart} className="relative hover:opacity-60 transition-opacity">
              <ShoppingBag size={19} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold text-espresso text-[9px] flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button aria-label="Open menu" className="lg:hidden" onClick={() => setMenuOpen(true)}>
              <Menu size={21} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
