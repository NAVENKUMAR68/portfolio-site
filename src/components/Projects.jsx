import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ── Data ──────────────────────────────────────── */
const projects = [
  {
    id: 1,
    num: '01',
    title: 'Smart KOT System',
    subtitle: 'Kitchen Order Ticket Management',
    summary: 'Real-time order management system connecting waitstaff and kitchen with live updates, role-based access, and WebSocket-powered dashboards.',
    tags: ['Node.js', 'Express', 'MongoDB', 'React', 'Socket.io', 'Docker'],
    highlights: [
      'Real-time order tracking via WebSocket',
      'Role-based dashboards (waiter / kitchen / admin)',
      'CI/CD pipeline with Jenkins & Docker',
      'RESTful API with JWT authentication',
    ],
  },
  {
    id: 2,
    num: '02',
    title: 'Campus Complaint System',
    subtitle: 'Role-Based Complaint Management',
    summary: 'Campus-wide complaint platform with priority routing, role-based dashboards for students, staff, and admins, and real-time resolution tracking.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'React'],
    highlights: [
      'RBAC — three-level access control',
      'Priority-based complaint routing',
      'Status tracking with email notifications',
      'Admin analytics dashboard',
    ],
  },
  {
    id: 3,
    num: '03',
    title: 'Campus Navigation App',
    subtitle: 'Android Mobile Application',
    summary: 'Smart campus navigation app built with Kotlin and Jetpack Compose. Provides GPS-powered indoor/outdoor routing and offline map support.',
    tags: ['Kotlin', 'Jetpack Compose', 'Google Maps API', 'Room DB'],
    highlights: [
      'Built with Kotlin & Jetpack Compose',
      'Real-time GPS turn-by-turn navigation',
      'Offline-first map caching',
      'Material Design 3 UI system',
    ],
  },
]

/* ── Modal ─────────────────────────────────────── */
function Modal({ p, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        transition={{ duration: 0.22 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#141414',
          border: '1px solid var(--border-2)',
          borderRadius: 20,
          padding: 36,
          width: '100%',
          maxWidth: 520,
          maxHeight: '80vh',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 20, right: 20,
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--bg-2)', border: '1px solid var(--border)',
            color: 'var(--text-3)', fontSize: 16, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'border-color 0.15s, color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-2)'; e.currentTarget.style.color = 'var(--text-1)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-3)' }}
        >×</button>

        <p className="label" style={{ marginBottom: 10 }}>{p.num}</p>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 22, fontWeight: 600,
          letterSpacing: '-0.02em',
          color: 'var(--text-1)',
          marginBottom: 4,
        }}>{p.title}</h3>
        <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 20 }}>{p.subtitle}</p>

        <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 28 }}>{p.summary}</p>

        {/* Highlights */}
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 14 }}>Key Features</p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {p.highlights.map((h, i) => (
            <motion.li
              key={h}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text-2)' }}
            >
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', marginTop: 7, flexShrink: 0 }} />
              {h}
            </motion.li>
          ))}
        </ul>

        {/* Tags */}
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 12 }}>Stack</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {p.tags.map(t => (
            <span key={t} style={{
              padding: '5px 12px', borderRadius: 999,
              fontSize: 12, fontFamily: 'var(--font-mono)',
              background: 'rgba(124,111,238,0.08)',
              border: '1px solid rgba(124,111,238,0.18)',
              color: '#a5b4fc',
            }}>{t}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Card ──────────────────────────────────────── */
function Card({ p, i, onClick }) {
  const ref  = useRef()
  const inV  = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      style={{
        background: 'var(--bg-1)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '28px 28px 24px',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-2)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      id={`project-${p.id}`}
    >
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.1em' }}>{p.num}</span>
        <span style={{ fontSize: 14, color: 'var(--text-3)', transition: 'color 0.18s' }}
          className="card-arrow">↗</span>
      </div>

      {/* Title */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 18, fontWeight: 600,
          letterSpacing: '-0.02em',
          color: 'var(--text-1)',
          marginBottom: 4,
        }}>{p.title}</h3>
        <p style={{ fontSize: 12, color: 'var(--text-3)' }}>{p.subtitle}</p>
      </div>

      {/* Summary */}
      <p style={{
        fontSize: 13.5,
        color: 'var(--text-2)',
        lineHeight: 1.7,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>{p.summary}</p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {p.tags.map(t => (
          <span key={t} style={{
            padding: '3px 10px', borderRadius: 999,
            fontSize: 11, fontFamily: 'var(--font-mono)',
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            color: 'var(--text-3)',
          }}>{t}</span>
        ))}
      </div>
    </motion.div>
  )
}

/* ── Projects ──────────────────────────────────── */
export default function Projects() {
  const ref   = useRef()
  const inV   = useInView(ref, { once: true, margin: '-80px' })
  const [sel, setSel] = useState(null)

  return (
    <>
      <section id="projects" className="section" ref={ref}>
        <div className="container">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 48 }}
          >
            <p className="label" style={{ marginBottom: 10 }}>Projects</p>
            <h2 className="heading">Featured work</h2>
            <p className="subtext" style={{ marginTop: 8 }}>
              End-to-end applications built for real-world problems.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {projects.map((p, i) => (
              <Card key={p.id} p={p} i={i} onClick={() => setSel(p)} />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {sel && <Modal p={sel} onClose={() => setSel(null)} />}
      </AnimatePresence>
    </>
  )
}
