import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const items = [
  {
    role: 'Junior Software Intern',
    company: 'Bini',
    period: '2024 — Present',
    current: true,
    desc: 'Contributing to production full-stack projects within a professional engineering team. Working across backend APIs, database design, and frontend interfaces using agile practices.',
    points: [
      'Full-stack development with Java, Spring Boot, React',
      'API design, database architecture, code reviews',
      'Agile / Scrum collaboration with cross-functional teams',
      'Best practices: clean code, testing, documentation',
    ],
    stack: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
  },
  {
    role: 'Independent Projects',
    company: 'Self-Directed',
    period: '2023 — 2024',
    current: false,
    desc: 'Built three complete end-to-end projects independently, applying modern tech stacks and DevOps practices to solve real campus and business problems.',
    points: [
      'Designed and shipped 3+ full-stack applications',
      'CI/CD pipelines with Jenkins & Docker',
      'RESTful APIs, WebSocket, microservices',
      'Android mobile app with Kotlin & Jetpack Compose',
    ],
    stack: ['Node.js', 'MongoDB', 'Docker', 'Kotlin'],
  },
]

export default function Experience() {
  const ref  = useRef()
  const inV  = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inV ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48 }}
        >
          <p className="label" style={{ marginBottom: 10 }}>Experience</p>
          <h2 className="heading">My journey</h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: 28 }}>

          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: 7,
            top: 6,
            bottom: 6,
            width: 1,
            background: 'var(--border)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {items.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 20 }}
                animate={inV ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
                style={{ position: 'relative' }}
                id={`exp-${i}`}
              >
                {/* Dot */}
                <div style={{
                  position: 'absolute',
                  left: -21,
                  top: 6,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: item.current ? 'var(--accent)' : 'var(--bg)',
                  border: `2px solid ${item.current ? 'var(--accent)' : 'var(--border-2)'}`,
                  zIndex: 1,
                }} />

                {/* Card */}
                <div style={{
                  background: 'var(--bg-1)',
                  border: `1px solid ${item.current ? 'rgba(124,111,238,0.2)' : 'var(--border)'}`,
                  borderRadius: 14,
                  padding: '24px 24px 22px',
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = item.current ? 'rgba(124,111,238,0.35)' : 'var(--border-2)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = item.current ? 'rgba(124,111,238,0.2)' : 'var(--border)'}
                >
                  {/* Period + badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.05em' }}>{item.period}</span>
                    {item.current && (
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        background: 'rgba(124,111,238,0.12)',
                        color: '#a5b4fc',
                        padding: '2px 8px',
                        borderRadius: 999,
                        border: '1px solid rgba(124,111,238,0.2)',
                      }}>Current</span>
                    )}
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 17, fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-1)',
                    marginBottom: 2,
                  }}>{item.role}</h3>
                  <p style={{ fontSize: 13, color: 'var(--accent)', opacity: 0.8, marginBottom: 14 }}>{item.company}</p>

                  <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 18 }}>{item.desc}</p>

                  {/* Points */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
                    {item.points.map(pt => (
                      <li key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--text-2)' }}>
                        <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text-3)', marginTop: 8, flexShrink: 0 }} />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  {/* Stack */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {item.stack.map(t => (
                      <span key={t} style={{
                        padding: '4px 10px', borderRadius: 999,
                        fontSize: 11, fontFamily: 'var(--font-mono)',
                        background: 'var(--bg-2)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-3)',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
