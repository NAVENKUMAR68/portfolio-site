import { useState, useEffect, lazy, Suspense } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import SmoothScroll from './components/SmoothScroll'
import Hero from './components/Hero'

const About      = lazy(() => import('./components/About'))
const Skills     = lazy(() => import('./components/Skills'))
const Projects   = lazy(() => import('./components/Projects'))
const Experience = lazy(() => import('./components/Experience'))
const Contact    = lazy(() => import('./components/Contact'))
const Footer     = lazy(() => import('./components/Footer'))

export default function App() {
  const [loading,  setLoading]  = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!isMobile) document.body.classList.add('no-cursor')
    else           document.body.classList.remove('no-cursor')
    return () => document.body.classList.remove('no-cursor')
  }, [isMobile])

  if (loading) return <Loader onComplete={() => setLoading(false)} />

  return (
    <SmoothScroll>
      <div style={{ minHeight: '100vh' }}>
        {!isMobile && <CustomCursor />}
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<div style={{ height: '50vh' }} />}>
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
            <Footer />
          </Suspense>
        </main>
      </div>
    </SmoothScroll>
  )
}
