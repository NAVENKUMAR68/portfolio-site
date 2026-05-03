import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref   = useRef()
  const inV   = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focus, setFocus] = useState({})

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = e => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', message: '' }) }, 3000)
  }

  /* shared input style */
  const inputBase = {
    width: '100%',
    padding: '11px 14px',
    borderRadius: 10,
    background: 'var(--bg-1)',
    border: '1px solid var(--border)',
    color: 'var(--text-1)',
    fontSize: 14,
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    transition: 'border-color 0.18s',
    caretColor: 'var(--accent)',
  }

  const inputFocused = { borderColor: 'rgba(124,111,238,0.4)' }

  const Label = ({ htmlFor, children }) => (
    <label
      htmlFor={htmlFor}
      style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 8 }}
    >
      {children}
    </label>
  )

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        <div style={{ maxWidth: 560, margin: '0 auto' }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inV ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <p className="label" style={{ marginBottom: 10 }}>Contact</p>
            <h2 className="heading" style={{ marginBottom: 10 }}>Get in touch</h2>
            <p className="subtext">Have a project in mind or want to work together? I'd love to hear from you.</p>
          </motion.div>

          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inV ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.45 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}
          >
            {[
              { label: 'Email', value: 'ss3534418@gmail.com' },
              { label: 'Location', value: 'India' },
            ].map(c => (
              <div
                key={c.label}
                style={{
                  padding: '16px 18px',
                  borderRadius: 12,
                  background: 'var(--bg-1)',
                  border: '1px solid var(--border)',
                }}
              >
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 6 }}>{c.label}</p>
                <p style={{ fontSize: 13, color: 'var(--text-2)' }}>{c.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={inV ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.45 }}
            onSubmit={onSubmit}
            id="contact-form"
            style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
          >
            {/* Name + Email row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <Label htmlFor="contact-name">Name</Label>
                <input
                  id="contact-name" name="name" type="text"
                  value={form.name} onChange={onChange} required
                  placeholder="Your name"
                  onFocus={() => setFocus(f => ({ ...f, name: true }))}
                  onBlur={() => setFocus(f => ({ ...f, name: false }))}
                  style={{ ...inputBase, ...(focus.name ? inputFocused : {}) }}
                />
              </div>
              <div>
                <Label htmlFor="contact-email">Email</Label>
                <input
                  id="contact-email" name="email" type="email"
                  value={form.email} onChange={onChange} required
                  placeholder="you@example.com"
                  onFocus={() => setFocus(f => ({ ...f, email: true }))}
                  onBlur={() => setFocus(f => ({ ...f, email: false }))}
                  style={{ ...inputBase, ...(focus.email ? inputFocused : {}) }}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="contact-message">Message</Label>
              <textarea
                id="contact-message" name="message"
                value={form.message} onChange={onChange} required
                rows={5} placeholder="Tell me about your project or opportunity..."
                onFocus={() => setFocus(f => ({ ...f, message: true }))}
                onBlur={() => setFocus(f => ({ ...f, message: false }))}
                style={{ ...inputBase, resize: 'none', lineHeight: 1.6, ...(focus.message ? inputFocused : {}) }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="contact-submit"
              style={{
                padding: '12px',
                borderRadius: 10,
                background: sent ? '#22c55e' : 'var(--accent)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 500,
                fontFamily: 'var(--font-sans)',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s, transform 0.15s, opacity 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {sent ? '✓ Message Sent' : 'Send Message'}
            </button>
          </motion.form>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inV ? { opacity: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.4 }}
            style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28 }}
          >
            {['GitHub', 'LinkedIn', 'Twitter'].map(s => (
              <a
                key={s} href="#"
                id={`social-${s.toLowerCase()}`}
                style={{
                  padding: '7px 16px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-3)',
                  border: '1px solid var(--border)',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s, color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-2)'; e.currentTarget.style.color = 'var(--text-2)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-3)' }}
              >{s}</a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
