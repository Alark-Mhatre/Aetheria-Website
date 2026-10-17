import { useMemo, useState } from 'react'
import { EMAIL } from '../data'

const TYPES = ['Brand website', 'E-commerce', 'SaaS MVP', 'Not sure yet']
const STAGES = ['Just an idea', 'Designed', 'Already live']
const FEATS = ['UI/UX design', 'Brand system', 'CMS', 'Payments', 'Logins', 'SEO & analytics']
const okMail = (s: string) => /^\S+@\S+\.\S+$/.test(s)

export function BriefBuilder() {
  const [type, setType] = useState(TYPES[0])
  const [stage, setStage] = useState(STAGES[0])
  const [feats, setFeats] = useState<string[]>([])
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [note, setNote] = useState('')
  const [seen, setSeen] = useState(false)
  const [msg, setMsg] = useState('')
  const brief = useMemo(
    () => `# Project brief\n\ntype:     ${type}\nstage:    ${stage}\nfeatures: ${feats.join(', ') || '—'}\nfrom:     ${name || '…'} <${mail || '…'}>\n\n${note || '(no notes yet)'}`,
    [type, stage, feats, name, mail, note])
  const bad = !name.trim() || !okMail(mail)
  const toggle = (f: string) => setFeats(a => (a.includes(f) ? a.filter(x => x !== f) : [...a, f]))
  const send = () => {
    setSeen(true)
    if (bad) { setMsg('Fix the highlighted fields first.'); return }
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Project brief — ' + type)}&body=${encodeURIComponent(brief)}`
    setMsg('Opening your email app…')
  }
  const copy = async () => {
    try { await navigator.clipboard.writeText(brief); setMsg('Brief copied.') } catch { setMsg('Copy blocked — select the text instead.') }
  }
  const chips = (opts: string[], active: (o: string) => boolean, on: (o: string) => void) =>
    opts.map(o => <button key={o} type="button" className={'chip' + (active(o) ? ' on' : '')} aria-pressed={active(o)} onClick={() => on(o)}>{o}</button>)
  return (
    <div className="brief">
      <div className="form">
        <p className="lbl">What are we building?</p><div className="chips">{chips(TYPES, o => o === type, setType)}</div>
        <p className="lbl">Where is it now?</p><div className="chips">{chips(STAGES, o => o === stage, setStage)}</div>
        <p className="lbl">Need any of these?</p><div className="chips">{chips(FEATS, o => feats.includes(o), toggle)}</div>
        <label className="lbl" htmlFor="bn">Your name</label>
        <input id="bn" value={name} onChange={e => setName(e.target.value)} onBlur={() => setSeen(true)} aria-invalid={seen && !name.trim()} />
        {seen && !name.trim() && <p className="err">We need a name to reply to.</p>}
        <label className="lbl" htmlFor="be">Email</label>
        <input id="be" type="email" value={mail} onChange={e => setMail(e.target.value)} onBlur={() => setSeen(true)} aria-invalid={seen && !okMail(mail)} />
        {seen && !okMail(mail) && <p className="err">That email doesn’t look right.</p>}
        <label className="lbl" htmlFor="bt">Tell us more (optional)</label>
        <textarea id="bt" rows={4} value={note} onChange={e => setNote(e.target.value)} />
      </div>
      <div className="out">
        <p className="lbl">Live preview — brief.md</p>
        <pre className="pre">{brief}</pre>
        <button className="btn" onClick={send}>Send brief →</button>
        <button className="btn alt" onClick={copy}>Copy</button>
        <p className="note" role="status">{msg}</p>
      </div>
    </div>
  )
}
