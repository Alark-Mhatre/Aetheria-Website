import { useEffect, useRef, useState } from 'react'

export function CountUp({ n, suffix = '' }: { n: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(n); return }
    let raf = 0
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const f = (t: number) => {
        const p = Math.min((t - t0) / 1600, 1)
        setV(Math.round(n * (1 - (1 - p) ** 3)))
        if (p < 1) raf = requestAnimationFrame(f)
      }
      raf = requestAnimationFrame(f)
    })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [n])
  return <span ref={ref}>{v}{suffix}</span>
}
