import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'

/* ── Minimal 3D dot-cloud ─────────────────────── */
function DotCloud() {
  const ref = useRef()
  const count = 600
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 2.4 + (Math.random() - 0.5) * 0.8
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.04
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.025) * 0.08
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.011} color="#818cf8" transparent opacity={0.28} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/* ── Typing hook ──────────────────────────────── */
function useTyper(words, speed = 75, pause = 2200) {
  const [display, setDisplay] = useState('')
  const [idx, setIdx]         = useState(0)
  const [del, setDel]         = useState(false)

  useEffect(() => {
    const word = words[idx]
    let t
    if (!del && display === word)      t = setTimeout(() => setDel(true), pause)
    else if (del && display === '')    { setDel(false); setIdx(p => (p + 1) % words.length) }
    else t = setTimeout(() => setDisplay(del ? word.slice(0, display.length - 1) : word.slice(0, display.length + 1)), del ? 40 : speed)
    return () => clearTimeout(t)
  }, [display, del, idx, words, speed, pause])

  return display
}

/* ── Hero ─────────────────────────────────────── */
const ROLES = ['Aspiring Software Engineer', 'Full Stack Developer', 'Problem Solver']

export default function Hero() {
  const role = useTyper(ROLES)

  const up = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Subtle ambient glow — single, centred */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(124,111,238,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* 3D background */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.55 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.5]}>
          <DotCloud />
        </Canvas>
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.1, delayChildren: 0.15 }}
        style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 640 }}
      >
        {/* Status badge */}
        <motion.div variants={up} transition={{ duration: 0.5 }} style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-2)',
            letterSpacing: '0.08em',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#4ade80',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            Available for opportunities
          </span>
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={up}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.6rem, 7vw, 4.8rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.08,
            color: 'var(--text-1)',
            marginBottom: 16,
            whiteSpace: 'nowrap',
          }}
        >
          Navenkumar&nbsp;
          <span className="g-text">S</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={up}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            color: 'var(--text-2)',
            marginBottom: 32,
            minHeight: '1.6em',
            letterSpacing: '0.01em',
          }}
        >
          {role}
          <span style={{
            display: 'inline-block',
            width: 2,
            height: '0.9em',
            background: 'var(--accent)',
            marginLeft: 2,
            verticalAlign: 'text-bottom',
            animation: 'blink 1s step-end infinite',
          }} />
          <style>{`@keyframes blink{50%{opacity:0}}`}</style>
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={up}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}
        >
          <a
            href="#projects"
            id="hero-cta-work"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '10px 22px',
              borderRadius: 999,
              background: 'var(--accent)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'opacity 0.18s, transform 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            View Work <span style={{ fontSize: 16 }}>→</span>
          </a>
          <a
            href="#contact"
            id="hero-cta-contact"
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '10px 22px',
              borderRadius: 999,
              background: 'transparent',
              color: 'var(--text-2)',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
              border: '1px solid var(--border)',
              transition: 'border-color 0.18s, color 0.18s, transform 0.18s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-2)'; e.currentTarget.style.color = 'var(--text-1)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.15em' }}>SCROLL</span>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, var(--text-3), transparent)', opacity: 0.6 }} />
      </motion.div>
    </section>
  )
}
