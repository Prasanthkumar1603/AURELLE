import React, { useState } from 'react'
import { Mail, Phone, MapPin, Instagram, MessageCircle } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="pt-28 md:pt-32 pb-24 bg-ivory">
      <div className="container-lux text-center max-w-xl mx-auto mb-16">
        <span className="overline">Get in Touch</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-normal">Contact Us</h1>
        <p className="mt-3 text-espresso/60 text-sm">
          For styling questions, bespoke orders, or anything else — we&apos;d love to hear from you.
        </p>
      </div>

      <div className="container-lux grid grid-cols-1 lg:grid-cols-2 gap-14">
        <div>
          {submitted ? (
            <div className="bg-blush rounded-3xl p-10 text-center">
              <p className="font-serif text-2xl">Thank you.</p>
              <p className="mt-2 text-espresso/70 text-sm">We&apos;ve received your message and will reply within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Name" type="text" required />
                <Field label="Email" type="email" required />
              </div>
              <Field label="Phone" type="tel" />
              <div>
                <label className="text-xs tracking-[0.1em] uppercase text-espresso/60 block mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-2xl border border-espresso/15 text-sm bg-transparent focus:border-gold outline-none resize-none"
                />
              </div>
              <button type="submit" className="btn-dark rounded-full">
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-8">
          <div className="rounded-3xl overflow-hidden h-64">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
              alt="AURELLE flagship store interior"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-5">
            <InfoRow icon={<MapPin size={17} className="text-gold" />} title="Flagship Store">
              12 Cathedral Road, Chennai, Tamil Nadu 600086
            </InfoRow>
            <InfoRow icon={<Mail size={17} className="text-gold" />} title="Email">
              hello@aurelle.example
            </InfoRow>
            <InfoRow icon={<Phone size={17} className="text-gold" />} title="Phone">
              +91 98765 43210
            </InfoRow>
          </div>

          <div className="flex gap-4 pt-2">
            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-espresso/15 flex items-center justify-center hover:border-espresso transition-colors">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="WhatsApp" className="w-10 h-10 rounded-full border border-espresso/15 flex items-center justify-center hover:border-espresso transition-colors">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, type, required }) {
  return (
    <div>
      <label className="text-xs tracking-[0.1em] uppercase text-espresso/60 block mb-2">{label}</label>
      <input
        type={type}
        required={required}
        className="w-full px-4 py-3 rounded-full border border-espresso/15 text-sm bg-transparent focus:border-gold outline-none"
      />
    </div>
  )
}

function InfoRow({ icon, title, children }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center shrink-0">{icon}</div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-espresso/60">{children}</p>
      </div>
    </div>
  )
}
