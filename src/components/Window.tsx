import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Tone } from '../data'

export function Window({ file, tone = 'y', children }: { file: string; tone?: Tone; children: ReactNode }) {
  const ref = useRef<HTMLElement | null>(null)
  const [on, setOn] = useState(false)
  // Windows rise into place the first time they scroll into view.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.06 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <section ref={ref} className={'win' + (on ? ' in' : '')}>
      <div className={`bar t-${tone}`}>
        <i /><i /><i /><span>{file}</span>
      </div>
      <div className="body">{children}</div>
    </section>
  )
}
