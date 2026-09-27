# AURELLE

Luxury women's fashion e-commerce frontend — React + Vite + Tailwind + GSAP + Lenis.
Frontend-only: no backend, database, or auth. Cart and wishlist persist via `localStorage`.

## Run locally

```bash
npm install
npm run dev
```

## Stack

React 18, Vite, Tailwind CSS, GSAP + ScrollTrigger + smooth scroll via Lenis,
React Router DOM, Lucide React icons.

## Notes

- Product data lives in `src/data/products.js` — swap in real inventory/images later.
- Checkout in the cart drawer is a UI placeholder, structured so a real
  payment integration (e.g. Razorpay) can be added later.
- Respects `prefers-reduced-motion` throughout (Lenis, ScrollTrigger reveals, hero parallax).
