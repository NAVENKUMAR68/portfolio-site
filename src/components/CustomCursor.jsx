import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const ring = ringRef.current
    const dot = dotRef.current

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      // Dot follows immediately
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`
      if (!isVisible) setIsVisible(true)
    }

    const onMouseEnter = () => setIsVisible(true)
    const onMouseLeave = () => setIsVisible(false)

    let raf
    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15
      const size = isHovering ? 48 : 32
      ring.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`
      ring.style.width = `${size}px`
      ring.style.height = `${size}px`
      raf = requestAnimationFrame(animate)
    }

    // Attach hover listeners to interactive elements
    const handleHoverStart = () => setIsHovering(true)
    const handleHoverEnd = () => setIsHovering(false)

    const attachListeners = () => {
      document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', handleHoverStart)
        el.addEventListener('mouseleave', handleHoverEnd)
      })
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    attachListeners()
    raf = requestAnimationFrame(animate)

    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [isVisible, isHovering])

  return (
    <>
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.15)',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.25s ease, height 0.25s ease, opacity 0.3s ease, border-color 0.2s ease',
          ...(isHovering && { borderColor: 'rgba(129, 140, 248, 0.4)' }),
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          width: 6,
          height: 6,
          background: isHovering ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.7)',
          opacity: isVisible ? 1 : 0,
          transition: 'background 0.2s ease, opacity 0.3s ease',
        }}
      />
    </>
  )
}
