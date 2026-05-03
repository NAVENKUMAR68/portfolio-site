import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Data ────────────────────────────────────── */
const groups = [
  {
    label: 'Languages',
    items: ['Java', 'Python', 'JavaScript', 'Kotlin'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'Spring Boot'],
  },
  {
    label: 'Frontend',
    items: ['React', 'HTML / CSS', 'Tailwind CSS'],
  },
  {
    label: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'MySQL'],
  },
  {
    label: 'DevOps & Tools',
    items: ['Docker', 'Git', 'Jenkins', 'Linux'],
  },
]

/* ── Pill ─────────────────────────────────────── */
function Pill({ name, i }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.04, duration: 0.35 }}
      style={{
        display: 'inline-block',
        padding: '7px 16px',
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--text-2)',
        background: 'var(--bg-1)',
        border: '1px solid var(--border)',
        cursor: 'default',
        transition: 'background 0.18s, border-color 0.18s, color 0.18s, transform 0.18s',
      }}
      whileHover={{
        y: -2,
        borderColor: 'rgba(124,111,238,0.3)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(124,111,238,0.08)'
        e.currentTarget.style.color = '#c4b9ff'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--bg-1)'
        e.currentTarget.style.color = 'var(--text-2)'
      }}
    >
      {name}
    </motion.span>
  )
}

/* ── Skills ───────────────────────────────────── */
export default function Skills() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48 }}
        >
          <p className="label" style={{ marginBottom: 10 }}>Skills</p>
          <h2 className="heading">Technologies I work with</h2>
        </motion.div>

        {/* Group list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          <style>{`@media(max-width:640px){.skill-row{flex-direction:column !important; gap:12px !important;} .skill-label{width:auto !important; padding-top:0 !important;}}`}</style>
          {groups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.06 + gi * 0.07, duration: 0.45 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}
              className="skill-row"
            >
              {/* Group label — fixed width column */}
              <div style={{
                width: 128,
                flexShrink: 0,
                paddingTop: 6,
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-3)',
                }}>
                  {group.label}
                </span>
              </div>

              {/* Divider */}
              <div style={{
                width: 1,
                background: 'var(--border)',
                alignSelf: 'stretch',
                flexShrink: 0,
                marginTop: 4,
              }} />

              {/* Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {group.items.map((name, si) => (
                  <Pill key={name} name={name} i={gi * 4 + si} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
