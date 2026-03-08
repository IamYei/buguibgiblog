import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { Post } from './pages/Post';
import { Archives } from './pages/Archives';
import { Tags } from './pages/Tags';
import { Friends } from './pages/Friends';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const { language } = useLanguage();
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setIsFading(true);
    const timer = setTimeout(() => {
      setIsFading(false);
    }, 200); // 200ms fade transition
    return () => clearTimeout(timer);
  }, [language]);

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-500 relative flex flex-col pt-32 md:pt-40">
      {/* Liquid Atmosphere Background */}
      <div className="bg-atmosphere">
        <div className="blob-1" />
        <div className="blob-2" />
        <div className="blob-3" />
      </div>

      <Navbar />
      <main className={`w-full pb-16 transition-opacity duration-200 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Post />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <HashRouter>
          <ScrollToTop />
          <AppContent />
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
