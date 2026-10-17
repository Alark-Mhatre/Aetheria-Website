export type Tone = 'y' | 'p' | 'b' | 'g'
export type Route = { id: string; label: string; file: string; nav?: boolean }
export const EMAIL = 'connectaetheria@gmail.com'
export const ROUTES: Route[] = [
  { id: 'home', label: 'Home', file: 'index.tsx', nav: true },
  { id: 'portfolio', label: 'Portfolio', file: 'portfolio.tsx', nav: true },
  { id: 'about', label: 'About', file: 'about.md', nav: true },
  { id: 'contact', label: 'Contact', file: 'contact.tsx', nav: true },
  { id: 'careers', label: 'Careers', file: 'careers.md' },
  { id: 'blog', label: 'Blog', file: 'blog.md' },
  { id: 'retreats', label: 'Retreats', file: 'retreats.md' },
]
export const SERVICES = ['Web Architecture', 'E-Commerce', 'SaaS MVPs', 'UI/UX Design', 'Brand Systems', 'Zero Templates']
export const METRICS = [
  { n: 100, suffix: '%', label: 'bespoke builds' },
  { n: 100, suffix: '%', label: 'code ownership' },
  { n: 3, suffix: 'x*', label: 'average client conversion gain' },
]
export const WORK = [
  { tag: 'brand-first', t: 'Brand websites', d: 'Identity-led sites that look like nobody else.' },
  { tag: 'saas', t: 'SaaS / MVPs', d: 'Product interfaces and first versions, shipped fast.' },
  { tag: 'commerce', t: 'E-commerce', d: 'Stores built around conversion, not templates.' },
]
export const TEAM = [
  { name: 'Alark', edu: 'BTech, Computer Engineering — SAKEC', url: 'https://www.linkedin.com/in/alark-mhatre-1551a9385/' },
  { name: 'Abishek', edu: 'Integrated Programme in Management — IIM BG', url: 'https://www.linkedin.com/in/abishek-neelakandan-a52b92352/' },
]
export const FAQ = [
  ['Do you use templates?', 'No. Every pixel and line of code is made for your brand, from first call to launch.'],
  ['How do projects run?', 'A streamlined process with a clear timeline.'],
  ['What do I own at handover?', 'The code, design files, and accounts. No lock-in.'],
  ["What's the tech stack?", 'React, TypeScript, and Tailwind CSS.'],
]
type Card = { tag: string; t: string; d: string }
export const PAGES: Record<string, { title: string; body: string; tone: Tone; cards?: Card[]; cta?: { label: string; href: string } }> = {
  portfolio: { title: 'Portfolio', tone: 'b', body: 'Our work spans brand-first websites, SaaS and product interfaces, and e-commerce. Case studies are being written up.', cards: WORK, cta: { label: 'Discuss your project →', href: '#contact' } },
  careers: { title: 'Careers', tone: 'y', body: "We're open to designers, engineers, and collaborators.", cta: { label: 'Get in touch', href: 'mailto:' + EMAIL } },
  blog: { title: 'Blog', tone: 'b', body: 'The first articles are in progress. Got a topic you want us to write about?', cta: { label: 'Suggest a topic →', href: 'mailto:' + EMAIL } },
  retreats: { title: 'Retreats', tone: 'g', body: 'A focused collaboration and creative retreat concept. Details are still taking shape.', cta: { label: 'Tell us you are interested →', href: '#contact' } },
}
