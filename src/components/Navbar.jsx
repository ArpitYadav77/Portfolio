import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiClock } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const SECTION_IDS = ['hero', 'experience', 'projects', 'skills', 'education', 'contact'];

function formatDateTime(date) {
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const dayNum = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${day}, ${month} ${dayNum} · ${hours}:${minutes}:${seconds}`;
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);

  // Live clock — update every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll to add extra styling when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to detect which section is currently visible
  useEffect(() => {
    const observers = [];

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    },
    []
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-3">
      {/* Main pill container */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.1 }}
        className={`
          relative w-full max-w-5xl rounded-full
          border-3 border-brutal-black bg-beyondcode-purple
          shadow-[6px_6px_0px_#000]
          transition-all duration-200
          ${scrolled ? 'shadow-[4px_4px_0px_#000]' : 'shadow-[6px_6px_0px_#000]'}
        `}
      >
        {/* Desktop layout */}
        <div className="flex items-center justify-between px-3 py-2 md:px-5 md:py-2.5">
          {/* Logo / Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="font-display text-lg font-bold tracking-tight text-brutal-black select-none
                       hover:text-brutal-white transition-colors duration-150 shrink-0"
          >
            {'<P />'}
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`
                    relative font-display text-xs lg:text-sm font-bold uppercase tracking-wide
                    px-3 py-1.5 rounded-full transition-all duration-150 select-none
                    ${
                      isActive
                        ? 'bg-brutal-black text-brutal-white border-2 border-brutal-black'
                        : 'text-brutal-navy hover:bg-white/30 border-2 border-transparent hover:border-brutal-black'
                    }
                  `}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-brutal-black -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right side: clock chip + mobile hamburger */}
          <div className="flex items-center gap-2">
            {/* Live clock chip */}
            <div
              className="hidden sm:flex items-center gap-1.5 rounded-full
                          border-2 border-brutal-black bg-brutal-white
                          px-3 py-1 font-mono text-xs font-semibold text-brutal-navy
                          shadow-[3px_3px_0px_#000] select-none"
            >
              <FiClock className="text-brutal-black w-3.5 h-3.5" />
              <span>{formatDateTime(currentTime)}</span>
            </div>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full
                         border-2 border-brutal-black bg-brutal-white text-brutal-black
                         shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000]
                         hover:translate-x-[-1px] hover:translate-y-[-1px]
                         active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]
                         transition-all duration-100"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t-3 border-brutal-black"
            >
              <div className="flex flex-col items-center gap-1 px-4 py-4">
                {NAV_LINKS.map((link, index) => {
                  const sectionId = link.href.replace('#', '');
                  const isActive = activeSection === sectionId;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      className={`
                        w-full text-center font-display text-sm font-bold uppercase tracking-wide
                        px-4 py-2.5 rounded-xl transition-all duration-150 select-none
                        ${
                          isActive
                            ? 'bg-brutal-black text-brutal-white border-2 border-brutal-black shadow-[3px_3px_0px_#000]'
                            : 'text-brutal-navy hover:bg-white/40 border-2 border-transparent hover:border-brutal-black'
                        }
                      `}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}

                {/* Mobile clock */}
                <div
                  className="sm:hidden flex items-center gap-1.5 mt-2 rounded-full
                              border-2 border-brutal-black bg-brutal-white
                              px-4 py-1.5 font-mono text-xs font-semibold text-brutal-navy
                              shadow-[3px_3px_0px_#000]"
                >
                  <FiClock className="text-brutal-black w-3.5 h-3.5" />
                  <span>{formatDateTime(currentTime)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
