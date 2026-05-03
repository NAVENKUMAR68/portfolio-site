import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { name: 'About',      href: '#about' },
  { name: 'Skills',     href: '#skills' },
  { name: 'Projects',   href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    transition: 'all 0.3s ease',
    padding: scrolled ? '12px 0' : '20px 0',
    background: scrolled ? 'rgba(10,10,10,0.88)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
  }

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={navStyle}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="#" id="nav-logo" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text-1)' }}>
              <span className="g-text">N</span>aven
            </span>
          </a>

          {/* Desktop links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
            {links.map((l, i) => (
              <motion.a
                key={l.name}
                href={l.href}
                id={`nav-${l.name.toLowerCase()}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.35 }}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'var(--text-2)',
                  textDecoration: 'none',
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-1)'; e.currentTarget.style.color = 'var(--text-1)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-2)' }}
              >{l.name}</motion.a>
            ))}
            <motion.a
              href="#contact"
              id="nav-hire"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                marginLeft: 8,
                padding: '7px 16px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 500,
                background: 'var(--accent)',
                color: '#fff',
                textDecoration: 'none',
                transition: 'opacity 0.15s, transform 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
            >Hire Me</motion.a>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            id="nav-hamburger"
            aria-label="Menu"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: 5,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
            }}
            className="hamburger"
          >
            {[0, 1, 2].map(n => (
              <motion.span
                key={n}
                animate={open ? (n === 1 ? { opacity: 0 } : { rotate: n === 0 ? 45 : -45, y: n === 0 ? 7 : -7 }) : { rotate: 0, y: 0, opacity: 1 }}
                style={{ width: 20, height: 1.5, background: 'var(--text-2)', display: 'block', borderRadius: 2 }}
              />
            ))}
          </button>
        </div>

        {/* Responsive override */}
        <style>{`
          @media (max-width: 640px) {
            .desktop-nav { display: none !important; }
            .hamburger   { display: flex !important; }
          }
        `}</style>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(10,10,10,0.96)',
              backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28,
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.name}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 24,
                  fontWeight: 300,
                  color: 'var(--text-2)',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                  letterSpacing: '-0.02em',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
                id={`mobile-${l.name.toLowerCase()}`}
              >{l.name}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
