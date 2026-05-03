export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 0' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>

        <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, letterSpacing: '-0.02em' }}>
          <span className="g-text">N</span>
          <span style={{ color: 'var(--text-3)' }}>aven</span>
        </span>

        <nav style={{ display: 'flex', gap: 20 }}>
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              id={`footer-${l.toLowerCase()}`}
              style={{
                fontSize: 12,
                color: 'var(--text-3)',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-2)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
            >{l}</a>
          ))}
        </nav>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
          © {new Date().getFullYear()} Navenkumar S
        </p>
      </div>
    </footer>
  )
}
