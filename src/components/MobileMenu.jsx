import React from 'react'
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'

const links = [
  { label: 'New In', to: '/shop' },
  { label: 'Dresses', to: '/shop' },
  { label: 'Occasion', to: '/shop' },
  { label: 'Ethnic', to: '/shop' },
  { label: 'Collections', to: '/collections' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function MobileMenu({ open, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-[90] transition-all duration-500 ease-silk ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-espresso/50 backdrop-blur-sm transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-ivory flex flex-col px-8 py-8 transition-transform duration-500 ease-silk ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-12">
          <span className="font-serif text-xl tracking-widest">AURELLE</span>
          <button onClick={onClose} aria-label="Close menu" className="p-2">
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col gap-6">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              onClick={onClose}
              className="font-serif text-2xl text-espresso hover:text-gold transition-colors"
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
