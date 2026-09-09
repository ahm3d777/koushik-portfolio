
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Rocket, X } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import FloatingContact from './components/FloatingContact';
import CustomCursor from './components/CustomCursor';

// Route-level code splitting. Work.tsx and Articles.tsx pull in the heavy
// three.js/@react-three vendor chunk (~1MB) — before this, they were
// statically imported here, so that chunk was fetched on *every* page load
// (including Home) regardless of which route a visitor actually landed on.
// Lazy-loading each page means that chunk is only fetched when someone
// actually navigates to /work or /articles.
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Work = lazy(() => import('./pages/Work'));
const Contact = lazy(() => import('./pages/Contact'));
const Articles = lazy(() => import('./pages/Articles'));
const Snippets = lazy(() => import('./pages/Snippets'));
const Uses = lazy(() => import('./pages/Uses'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Minimal, on-brand fallback for the (usually brief) gap while a route
// chunk loads — no logo/animation weight, just a quiet pulse so navigation
// doesn't feel like it stalled.
const RouteFallback: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-neutral-800 border-t-rose-500 animate-spin" />
  </div>
);

// Enhanced Scroll Handler
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  
  return null;
};

const App: React.FC = () => {
  // Only show the full intro animation once per browser session — repeat
  // visits (new pages within the same tab/session) skip straight in.
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('koushik:visited'));
  const [konamiActive, setKonamiActive] = useState(false);

  useEffect(() => {
    if (!loading) return;
    // Shortened intro (was 2.5s on every load); matches the counter speed in Preloader.
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('koushik:visited', '1');
    }, 1200);
    return () => clearTimeout(timer);
  }, [loading]);

  // Konami Code Listener
  useEffect(() => {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't hijack arrow/letter keys while someone is typing in a form field.
      const target = e.target as HTMLElement | null;
      const isTyping = !!target && (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      );
      if (isTyping) {
        index = 0;
        return;
      }

      if (e.key === code[index]) {
        index++;
        if (index === code.length) {
          setKonamiActive(true);
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading && <Preloader />}
      </AnimatePresence>
      
      {/* Konami Easter Egg Modal */}
      <AnimatePresence>
        {konamiActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              className="bg-neutral-900 p-8 rounded-2xl border border-rose-500/50 shadow-[0_0_50px_rgba(244,63,94,0.3)] max-w-md w-full relative overflow-hidden"
            >
              <button
                onClick={() => setKonamiActive(false)}
                aria-label="Close"
                className="absolute top-4 right-4 text-neutral-400 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 animate-shimmer" />

              <div className="text-center">
                 <div className="mx-auto w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-6 border border-neutral-700">
                    <Rocket size={32} className="text-rose-500 animate-bounce" />
                 </div>
                 <h2 className="text-2xl font-black text-white mb-2">CHEAT CODE ACTIVATED!</h2>
                 <p className="text-neutral-400 mb-6">
                   You've discovered the secret developer mode. While there are no infinite lives here, you've definitely earned some cool points.
                 </p>
                 <div className="bg-neutral-950 p-4 rounded-lg font-mono text-xs text-green-400 mb-6 text-left">
                    "{'>'}" ACCESS_LEVEL: ADMIN<br/>
                    "{'>'}" UNLOCKING_HIDDEN_ASSETS...<br/>
                    "{'>'}" CONFETTI_CANNON_READY
                 </div>
                 <button 
                   onClick={() => setKonamiActive(false)}
                   className="w-full py-3 bg-rose-600 text-white font-bold rounded-lg hover:bg-rose-700 transition-colors"
                 >
                   Return to Reality
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <Router>
          <ScrollHandler />
          <ScrollProgress />
          <CommandPalette />
          <div className="bg-neutral-950 text-neutral-200 min-h-screen font-sans selection:bg-rose-500 selection:text-white">
            <Navbar />
            <main>
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/snippets" element={<Snippets />} />
                  <Route path="/uses" element={<Uses />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <FloatingContact />
          </div>
        </Router>
      )}
    </>
  );
};

export default App;
