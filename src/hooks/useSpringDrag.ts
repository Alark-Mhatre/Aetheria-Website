import { useRef } from 'react'
import type { PointerEvent as PE } from 'react'

type S = { x: number; y: number; vx: number; vy: number; raf: number; id: number; gx: number; gy: number; x0: number; y0: number; h: { x: number; y: number; t: number }[] }
const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches
// Progressive resistance: 1:1 near the grab point, stiffer the further you pull.
const soft = (d: number, r = 280) => (d * r) / (r + Math.abs(d))

/** Drag by a handle, rubber-band while held, spring home on release carrying the finger's velocity. */
export function useSpringDrag<T extends HTMLElement>(response = 0.4, damping = 0.8) {
  const ref = useRef<T>(null)
  const s = useRef<S>({ x: 0, y: 0, vx: 0, vy: 0, raf: 0, id: -1, gx: 0, gy: 0, x0: 0, y0: 0, h: [] })
  const paint = () => {
    const e = ref.current, o = s.current
    if (e) e.style.transform = o.x || o.y ? `translate3d(${o.x}px,${o.y}px,0)` : ''
  }
  const settle = () => {
    const o = s.current, k = (2 * Math.PI / response) ** 2, c = (4 * Math.PI * damping) / response
    let t = performance.now()
    const step = (n: number) => {
      const dt = Math.min((n - t) / 1000, 1 / 30); t = n
      o.vx += (-k * o.x - c * o.vx) * dt; o.vy += (-k * o.y - c * o.vy) * dt
      o.x += o.vx * dt; o.y += o.vy * dt; paint()
      if (Math.hypot(o.x, o.y, o.vx, o.vy) < 0.05) { o.x = o.y = o.vx = o.vy = 0; paint(); return }
      o.raf = requestAnimationFrame(step)
    }
    o.raf = requestAnimationFrame(step)
  }
  const down = (e: PE<HTMLElement>) => {
    const o = s.current
    if (o.id >= 0) return
    cancelAnimationFrame(o.raf) // interrupt: continue from the live on-screen value
    o.id = e.pointerId; e.currentTarget.setPointerCapture(e.pointerId)
    o.gx = e.clientX; o.gy = e.clientY; o.x0 = o.x; o.y0 = o.y; o.h = []
    ref.current?.setAttribute('data-drag', '1')
  }
  const move = (e: PE<HTMLElement>) => {
    const o = s.current
    if (e.pointerId !== o.id) return
    o.x = o.x0 + soft(e.clientX - o.gx); o.y = o.y0 + soft(e.clientY - o.gy); paint()
    const t = performance.now(); o.h.push({ x: o.x, y: o.y, t })
    while (o.h.length > 1 && t - o.h[0].t > 100) o.h.shift()
  }
  const up = (e: PE<HTMLElement>) => {
    const o = s.current
    if (e.pointerId !== o.id) return
    o.id = -1; ref.current?.removeAttribute('data-drag')
    const a = o.h[0], b = o.h[o.h.length - 1]
    const dt = a && b && b.t > a.t && performance.now() - b.t < 80 ? (b.t - a.t) / 1000 : 0
    o.vx = dt ? (b.x - a.x) / dt : 0; o.vy = dt ? (b.y - a.y) / dt : 0
    if (calm()) { o.x = o.y = o.vx = o.vy = 0; paint() } else settle()
  }
  return { ref, handlers: { onPointerDown: down, onPointerMove: move, onPointerUp: up, onPointerCancel: up } }
}
