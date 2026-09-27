import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '../providers/LenisProvider.jsx'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const lenisRef = useLenis()

  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
