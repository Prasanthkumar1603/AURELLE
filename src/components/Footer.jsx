import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, MessageCircle } from 'lucide-react'
import Newsletter from './Newsletter.jsx'

const shopLinks = ['New In', 'Dresses', 'Gowns', 'Ethnic', 'Occasion']
const helpLinks = ['Size Guide', 'Shipping & Returns', 'FAQs']

export default function Footer() {
  return (
    <footer className="relative bg-espresso text-ivory overflow-hidden pt-20">
      <span className="pointer-events-none select-none absolute -top-6 left-1/2 -translate-x-1/2 font-serif text-[22vw] leading-none text-ivory/5 whitespace-nowrap">
        AURELLE
      </span>

      <div className="relative container-lux">
        <div className="flex justify-center md:justify-start">
          <Newsletter />
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 pb-14">
          <div className="col-span-2 md:col-span-1">
            <span className="font-serif text-xl tracking-[0.1em]">AURELLE</span>
            <p className="mt-3 text-ivory/60 text-sm max-w-[220px]">
              Hand-finished dresses, gowns and ethnic wear, made in small batches.
            </p>
            <div className="mt-5 flex gap-4">
              <a href="#" aria-label="Instagram" className="hover:text-gold transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="WhatsApp" className="hover:text-gold transition-colors">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-ivory/50 mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {shopLinks.map((l) => (
                <li key={l}>
                  <Link to="/shop" className="text-sm text-ivory/80 hover:text-gold transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-ivory/50 mb-4">Help</h4>
            <ul className="space-y-2.5">
              {helpLinks.map((l) => (
                <li key={l}>
                  <Link to="/contact" className="text-sm text-ivory/80 hover:text-gold transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-ivory/50 mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li><Link to="/contact" className="text-sm text-ivory/80 hover:text-gold transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-sm text-ivory/80 hover:text-gold transition-colors">WhatsApp</a></li>
              <li><a href="#" className="text-sm text-ivory/80 hover:text-gold transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ivory/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory/40">&copy; {new Date().getFullYear()} AURELLE. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[10px] tracking-[0.1em] uppercase text-ivory/40">
            <span className="px-2 py-1 border border-ivory/15 rounded">UPI</span>
            <span className="px-2 py-1 border border-ivory/15 rounded">Visa</span>
            <span className="px-2 py-1 border border-ivory/15 rounded">Mastercard</span>
            <span className="px-2 py-1 border border-ivory/15 rounded">Razorpay</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
