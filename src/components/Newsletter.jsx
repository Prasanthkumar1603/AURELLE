import React, { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <div className="bg-ivory rounded-3xl p-8 md:p-10 max-w-md mx-auto md:mx-0 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]">
      <h3 className="text-2xl font-normal text-espresso">Get 10% off your first dress</h3>
      <p className="mt-2 text-espresso/60 text-sm">Join our list for early access to new arrivals and edits.</p>

      {submitted ? (
        <p className="mt-5 text-gold text-sm">You&apos;re on the list &mdash; welcome to AURELLE.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            aria-label="Email address"
            className="flex-1 px-4 py-3 rounded-full border border-espresso/15 text-sm bg-transparent focus:border-gold outline-none"
          />
          <button type="submit" className="btn-dark shrink-0">
            Subscribe
          </button>
        </form>
      )}
    </div>
  )
}
