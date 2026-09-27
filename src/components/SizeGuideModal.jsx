import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { sizeGuide } from '../data/products.js'

export default function SizeGuideModal({ open, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label="Size guide">
      <div className="absolute inset-0 bg-espresso/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-ivory w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-xl">Size Guide</h3>
          <button onClick={onClose} aria-label="Close size guide">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-espresso/15 text-espresso/50 text-xs uppercase tracking-wide">
                <th className="py-2 pr-3">Size</th>
                <th className="py-2 pr-3">Bust</th>
                <th className="py-2 pr-3">Waist</th>
                <th className="py-2 pr-3">Hip</th>
                <th className="py-2">Fit</th>
              </tr>
            </thead>
            <tbody>
              {sizeGuide.map((row) => (
                <tr key={row.size} className="border-b border-espresso/5">
                  <td className="py-2.5 pr-3 font-medium">{row.size}</td>
                  <td className="py-2.5 pr-3">{row.bust}</td>
                  <td className="py-2.5 pr-3">{row.waist}</td>
                  <td className="py-2.5 pr-3">{row.hip}</td>
                  <td className="py-2.5 text-espresso/70">{row.fit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
