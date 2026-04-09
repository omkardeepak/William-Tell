import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CurtainIntro from './components/CurtainIntro';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import SmoothScroll from './components/SmoothScroll';
import ContactOverlay from './components/ContactOverlay';

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
function GlobalCurtain() {
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Close the curtain when route changes
    setIsReady(false);
    
    // Fast-open the curtain after next page renders (1.2s minimum simulated loading)
    // For Home ('/'), wait up to 4s as a failsafe, but expect 'appReady' event
    const delay = location.pathname === '/' ? 4000 : 1200;
    const timer = setTimeout(() => {
      setIsReady(true);
      window.dispatchEvent(new Event('curtainOpened'));
    }, delay);

    // Global listener for special heavy components (like Home hero) to signal they are ready early
    const onAppReady = () => setIsReady(true);
    window.addEventListener('appReady', onAppReady);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('appReady', onAppReady);
    };
  }, [location.pathname]);

  return <CurtainIntro isReady={isReady} />;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <GlobalCurtain />
      <SmoothScroll>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/works" element={<Works />} />
              <Route path="/contact" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SmoothScroll>
      <ContactOverlay />
    </Router>
  );
}

export default App;
