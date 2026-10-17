import { useCallback, useEffect, useState } from 'react'
import { Header } from './components/Header'
import { CommandPalette } from './components/CommandPalette'
import Home from './pages/Home'
import { About, Contact, Info } from './pages/Pages'
import { EMAIL, ROUTES } from './data'

const get = () => { const h = location.hash.slice(1); return ROUTES.some(r => r.id === h) ? h : 'home' }
export default function App() {
  const [id, setId] = useState(get)
  const [pal, setPal] = useState(false)
  const [dark, setDark] = useState(() => matchMedia('(prefers-color-scheme: dark)').matches)
  // Ease between themes instead of a hard brightness jump.
  const flip = useCallback(() => {
    const d = document.documentElement
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { d.classList.add('theming'); setTimeout(() => d.classList.remove('theming'), 450) }
    navigator.vibrate?.(8)
    setDark(v => !v)
  }, [])
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  useEffect(() => {
    const h = () => { setId(get()); scrollTo({ top: 0, behavior: 'instant' }) }
    const k = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPal(p => !p) } }
    addEventListener('hashchange', h); addEventListener('keydown', k)
    return () => { removeEventListener('hashchange', h); removeEventListener('keydown', k) }
  }, [])
  const r = ROUTES.find(x => x.id === id)!
  return (
    <>
      <Header id={id} dark={dark} onTheme={flip} onPalette={() => setPal(true)} />
      <main className="wrap" key={id}>
        {id === 'home' ? <Home /> : id === 'about' ? <About /> : id === 'contact' ? <Contact /> : <Info id={id} />}
      </main>
      <footer>
        <div><a href="#careers">Careers</a><a href="#blog">Blogs</a><a href="#contact">Contact</a><a href={'mailto:' + EMAIL}>Email</a></div>
        <div>© Aetheria — every pixel custom.</div>
      </footer>
      <div className="stat"><span>{r.file}</span><span>TypeScript React</span><span className="hide-s">⌘K to jump</span></div>
      {pal && <CommandPalette onClose={() => setPal(false)} onTheme={flip} />}
    </>
  )
}
