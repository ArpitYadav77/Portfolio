import React, { useEffect, useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import AccordionBar from './components/AccordionBar'
import Marquee from './components/Marquee'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ScrollProgress from './components/ScrollProgress'

function App() {
  const [loading, setLoading] = useState(true);
  const cursorRef = useRef(null);

  // Mousemove handler to update custom cursor position
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-sky-bg">
          {/* Custom Cursor */}
          <div className="cursor" ref={cursorRef}>
            <svg
              width="24"
              height="32"
              viewBox="0 0 24 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2 L2 28 L8 22 L12 30 L15 28 L11 20 L22 20 Z"
                fill="#f7a6c8"
                stroke="#000"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <ScrollProgress />
          <Navbar />
          
          {/* Spacer for fixed navbar: 24px gap after navbar bottom */}
          <div className="h-24" />
          
          <main className="w-full flex flex-col items-center">
            <Hero />
            <Experience />
            <Skills />
            <Projects />
            <Education />
            <AccordionBar />
          </main>
          
          <Marquee />
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
