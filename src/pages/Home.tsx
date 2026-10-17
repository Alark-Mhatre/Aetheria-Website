import { Window } from '../components/Window'
import { CountUp } from '../components/CountUp'
import { FAQ, METRICS, SERVICES, TEAM, WORK, EMAIL } from '../data'
import type { Tone } from '../data'

const T: Tone[] = ['y', 'p', 'b', 'g']
export function Team() {
  return (
    <div className="grid">
      {TEAM.map(t => (
        <div key={t.name} className="card tone-p">
          <div className="ph">PHOTO</div><span className="tag">co-founder</span>
          <h3><a href={t.url} target="_blank" rel="noopener">{t.name} ↗</a></h3>{t.edu}
        </div>
      ))}
    </div>
  )
}
export default function Home() {
  const ticker = [...SERVICES, ...SERVICES].join(' ✱ ') + ' ✱ '
  return (
    <>
      <Window file="index.tsx — hero" tone="y">
        <p className="ln">01 &nbsp;export default function Studio() {'{'}</p>
        <h1>We build <mark>badass</mark> websites</h1>
        <p className="lead">Custom-built, template-free digital experiences engineered to convert — and designed to scale with you.</p>
        <a className="btn" href="#contact">Get a Quote →</a><a className="btn alt" href="#portfolio">View Case Studies</a>
      </Window>
      <div className="marq" aria-hidden="true"><div>{ticker}{ticker}</div></div>
      <Window file="services.config.ts" tone="p">
        <h2>What we ship</h2>
        <div className="grid">{SERVICES.map((s, i) => <div key={s} className={'card tone-' + T[i % 4]}><span className="mono">0{i + 1}</span><h3>{s}</h3></div>)}</div>
      </Window>
      <Window file="metrics.json" tone="g">
        <div className="grid">{METRICS.map((m, i) => <div key={m.label} className={'card tone-' + T[[0, 2, 3][i]]}><div className="big"><CountUp n={m.n} suffix={m.suffix} /></div>{m.label}</div>)}</div>
        <p className="note">*Results vary depending on the client and business context.</p>
      </Window>
      <Window file="work/" tone="b">
        <h2>Kinds of work</h2>
        <div className="grid">{WORK.map(w => <div key={w.t} className="card"><span className="tag">{w.tag}</span><h3>{w.t}</h3><p>{w.d}</p></div>)}</div>
        <p className="note">Illustrative categories — not named clients.</p>
      </Window>
      <Window file="team.tsx" tone="y"><h2>Co-founders</h2><Team /></Window>
      <Window file="audience.md" tone="g"><h2>Who we build for</h2><p className="lead">We build for everyone — open to everything and any stage.</p></Window>
      <Window file="faq.md" tone="y">
        <h2>FAQ</h2>
        {FAQ.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>)}
      </Window>
      <Window file="contact.tsx" tone="b">
        <h2>Describe your project</h2><p>Tell us what you’re building. We’ll take it from there.</p>
        <a className="btn" href="#contact">Build a brief →</a><a className="btn alt" href={'mailto:' + EMAIL}>{EMAIL}</a>
      </Window>
    </>
  )
}
