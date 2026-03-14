import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Contact from './pages/Contact';
import SmoothScroll from './components/SmoothScroll';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');

      const doScroll = () => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          setTimeout(() => {
            if (window.__lenis) {
              window.__lenis.scrollTo(targetElement, { offset: -80, duration: 1.2 });
            } else {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 50);
        }
      };

      // Special case: if targeting stories-in-motion on home page, 
      // we might need to wait for the hero to expand.
      if (pathname === '/' && targetId === 'stories-in-motion') {
        const onHeroExpanded = () => {
          doScroll();
          window.removeEventListener('heroExpanded', onHeroExpanded);
        };
        window.addEventListener('heroExpanded', onHeroExpanded);

        // Fallback: if already expanded or event never fires, try after a while
        const timer = setTimeout(doScroll, 800);

        return () => {
          window.removeEventListener('heroExpanded', onHeroExpanded);
          clearTimeout(timer);
        };
      } else {
        // Standard hash scrolling for other hashes or pages
        setTimeout(doScroll, 100);
      }
      return;
    }

    // Reset both native scroll and Lenis if no hash
    window.scrollTo(0, 0);
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SmoothScroll>
        <div className="app-container" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
          <Navbar />
          <main style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/works" element={<Works />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
