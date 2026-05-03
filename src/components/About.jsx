import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { n: '3+', label: 'Projects shipped' },
  { n: '10+', label: 'Technologies' },
  { n: '1+', label: 'Year experience' },
]

const cards = [
  { title: 'Full Stack', body: 'End-to-end development from database schema to pixel-perfect UI.' },
  { title: 'Problem Solving', body: 'Building real systems — from restaurant order flow to campus navigation.' },
  { title: 'Modern DevOps', body: 'Docker, CI/CD pipelines, RESTful APIs, and agile workflows.' },
]

export default function About() {
  const ref = useRef()
  const inV = useInView(ref, { once: true, margin: '-80px' })
  const up  = (d = 0) => ({ initial: { opacity: 0, y: 16 }, animate: inV ? { opacity: 1, y: 0 } : {}, transition: { delay: d, duration: 0.5 } })

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">

        {/* Header */}
        <motion.div {...up()} style={{ marginBottom: 40 }}>
          <p className="label" style={{ marginBottom: 10 }}>About</p>
          <h2 className="heading">A little about me</h2>
        </motion.div>

        {/* Bio + stats */}
        <motion.div {...up(0.08)} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'start', marginBottom: 36 }} className="about-grid">
          <style>{`@media(max-width:640px){.about-grid{grid-template-columns:1fr !important;} .about-cards{grid-template-columns:1fr !important;}}`}</style>
          <motion.div {...up(0.08)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p className="subtext">
              I'm <strong style={{ color: 'var(--text-1)', fontWeight: 500 }}>Navenkumar S</strong>, an aspiring software engineer passionate about building impactful, real-world applications. I specialize in full-stack development, combining clean architecture with intuitive experiences.
            </p>
            <p className="subtext">
              From real-time kitchen order management to campus navigation apps, I focus on creating software that solves meaningful problems — written clean, maintained properly, and shipped with care.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div {...up(0.12)} style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 160 }}>
            {stats.map(s => (
              <div
                key={s.label}
                style={{
                  padding: '14px 18px',
                  borderRadius: 10,
                  background: 'var(--bg-1)',
                  border: '1px solid var(--border)',
                  marginBottom: 8,
                  transition: 'border-color 0.18s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }} className="g-text">{s.n}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Highlight cards */}
        <div className="about-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              {...up(0.18 + i * 0.07)}
              style={{
                padding: '20px 20px 18px',
                borderRadius: 12,
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                transition: 'border-color 0.18s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-2)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 8 }}>{c.title}</h4>
              <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.65 }}>{c.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
