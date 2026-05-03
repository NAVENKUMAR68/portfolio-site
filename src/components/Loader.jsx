import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [pct,  setPct]  = useState(0)
  const [done, setDone] = useState(false)
  const t = useRef()

  useEffect(() => {
    t.current = setInterval(() => {
      setPct(p => {
        if (p >= 100) {
          clearInterval(t.current)
          setTimeout(() => setDone(true), 250)
          setTimeout(() => onComplete(), 750)
          return 100
        }
        return Math.min(p + Math.random() * 16, 100)
      })
    }, 55)
    return () => clearInterval(t.current)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="loader-wrap"
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: '-0.04em',
              }}
              className="g-text"
            >
              NS
            </motion.div>
            <div style={{ width: 120, height: 1, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', background: 'var(--accent)', width: `${Math.min(pct, 100)}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
