import { Window } from '../components/Window'
import { BriefBuilder } from '../components/BriefBuilder'
import { Team } from './Home'
import { EMAIL, PAGES, ROUTES } from '../data'

export function Info({ id }: { id: string }) {
  const p = PAGES[id], r = ROUTES.find(x => x.id === id)!
  return (
    <Window file={r.file} tone={p.tone}>
      <h1 className="sm">{p.title}</h1><p className="lead">{p.body}</p>
      {p.cards && <div className="grid">{p.cards.map(c => <div key={c.t} className="card"><span className="tag">{c.tag}</span><h3>{c.t}</h3><p>{c.d}</p></div>)}</div>}
      {p.cta && <p><a className="btn" href={p.cta.href}>{p.cta.label}</a></p>}
    </Window>
  )
}
export function About() {
  return <Window file="about.md" tone="y"><h1 className="sm">About</h1><p className="lead">Aetheria is two co-founders building custom websites, stores, and SaaS MVPs.</p><Team /></Window>
}
export function Contact() {
  return (
    <Window file="contact.tsx" tone="g">
      <h1 className="sm">Book a call</h1>
      <p className="lead">Build a quick brief below and we’ll set up an alignment call. Nothing is sent until you press Send.</p>
      <BriefBuilder />
      <p className="note">Prefer plain email? <a href={'mailto:' + EMAIL}><b>{EMAIL}</b></a></p>
    </Window>
  )
}
