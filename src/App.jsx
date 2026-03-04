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
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset both native scroll and Lenis
    window.scrollTo(0, 0);
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SmoothScroll>
        <div className="app-container">
          <Navbar />
          <main>
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
