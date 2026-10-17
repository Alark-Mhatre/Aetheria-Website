import { useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { EMAIL, ROUTES } from '../data'

type Item = { label: string; hint: string; run: () => void }
export function CommandPalette({ onClose, onTheme }: { onClose: () => void; onTheme: () => void }) {
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)
  const inp = useRef<HTMLInputElement>(null)
  const items = useMemo<Item[]>(() => [
    ...ROUTES.map(r => ({ label: `Go to ${r.label}`, hint: r.file, run: () => { location.hash = r.id } })),
    { label: 'Switch theme', hint: 'light / dark', run: onTheme },
    { label: 'Email the studio', hint: EMAIL, run: () => { location.href = 'mailto:' + EMAIL } },
  ], [onTheme])
  const list = items.filter(x => (x.label + x.hint).toLowerCase().includes(q.toLowerCase()))
  useEffect(() => { inp.current?.focus() }, [])
  const go = (x?: Item) => { if (!x) return; onClose(); x.run() }
  const key = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') { e.preventDefault(); setI(n => Math.min(n + 1, list.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setI(n => Math.max(n - 1, 0)) }
    else if (e.key === 'Enter') go(list[i])
  }
  return (
    <div className="pal-scrim" onPointerDown={onClose}>
      <div className="pal" role="dialog" aria-modal="true" aria-label="Command palette" onPointerDown={e => e.stopPropagation()} onKeyDown={key}>
        <input ref={inp} value={q} onChange={e => { setQ(e.target.value); setI(0) }} placeholder="Jump to…  (esc to close)" aria-label="Search commands" />
        <ul>
          {list.map((x, n) => (
            <li key={x.label}><button className={n === i ? 'on' : ''} onMouseEnter={() => setI(n)} onClick={() => go(x)}>{x.label}<small>{x.hint}</small></button></li>
          ))}
          {!list.length && <li className="none">Nothing matches. Try “contact”.</li>}
        </ul>
      </div>
    </div>
  )
}
