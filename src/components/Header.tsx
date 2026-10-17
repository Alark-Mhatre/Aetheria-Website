import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ROUTES } from '../data'

type Props = { id: string; dark: boolean; onTheme: () => void; onPalette: () => void }
type Ind = { x: number; w: number; go: boolean }
export function Header({ id, dark, onTheme, onPalette }: Props) {
  const [open, setOpen] = useState(false)
  const [sc, setSc] = useState(false)
  const [ind, setInd] = useState<Ind | null>(null)
  const nav = useRef<HTMLElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const m = () => innerWidth > 900 && setOpen(false)
    addEventListener('keydown', k); addEventListener('resize', m)
    return () => { removeEventListener('keydown', k); removeEventListener('resize', m) }
  }, [open])
  // The active-tab marker glides to the current page (snaps on first appearance).
  useLayoutEffect(() => {
    const m = () => {
      const a = nav.current?.querySelector<HTMLElement>('a[aria-current=page]')
      setInd(p => (a ? { x: a.offsetLeft, w: a.offsetWidth, go: !!p } : null))
    }
    m(); addEventListener('resize', m); document.fonts?.ready.then(m)
    return () => removeEventListener('resize', m)
  }, [id])
  // Scroll progress hairline + stronger glass once content moves underneath.
  useEffect(() => {
    let r = 0
    const f = () => {
      cancelAnimationFrame(r)
      r = requestAnimationFrame(() => {
        const m = document.documentElement.scrollHeight - innerHeight
        bar.current?.style.setProperty('--prog', String(m > 0 ? Math.min(scrollY / m, 1) : 0))
        setSc(scrollY > 8)
      })
    }
    addEventListener('scroll', f, { passive: true }); f()
    return () => { removeEventListener('scroll', f); cancelAnimationFrame(r) }
  }, [id])
  return (
    <>
      <header className={'top' + (sc ? ' sc' : '')}>
        <a className="logo" href="#home">&lt;AETHERIA/&gt;</a>
        <nav ref={nav} id="nav" className={open ? 'open' : ''} onClick={() => setOpen(false)}>
          {ind && <span className="ind" style={{ transform: `translateX(${ind.x}px)`, width: ind.w, transition: ind.go ? undefined : 'none' }} />}
          {ROUTES.filter(r => r.nav).map(r => (
            <a key={r.id} href={'#' + r.id} aria-current={r.id === id ? 'page' : undefined}>{r.label}</a>
          ))}
          <a className="cta" href="#contact">Book a call</a>
        </nav>
        <button className="tool" onClick={onPalette} aria-label="Open command palette">⌘K</button>
        <button className="switch" role="switch" aria-checked={dark} aria-label="Dark mode" onClick={onTheme}>
          <span className="trk"><span>☀</span><span>☾</span><i className="thumb" /></span>
        </button>
        <button className="mb" aria-expanded={open} aria-controls="nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(o => !o)}>{open ? '✕' : '☰'}</button>
        <div className="prog" ref={bar} />
      </header>
      <div className={'scrim' + (open ? ' on' : '')} onClick={() => setOpen(false)} />
    </>
  )
}
