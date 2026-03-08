import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { i18n } from '../i18n';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = i18n[language];
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.navHome, path: '/' },
    { name: t.navBlog, path: '/blog' },
    { name: t.navArchives, path: '/archives' },
    { name: t.navTags, path: '/tags' },
    { name: t.navFriends, path: '/friends' },
    { name: t.navAbout, path: '/about' },
    { name: t.navContact, path: '/contact' },
  ];

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleLanguageToggle = () => {
    toggleLanguage();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out flex justify-center py-4 ${
        scrolled ? 'pt-2 md:pt-4' : 'pt-6 md:pt-8'
      }`}
    >
      <nav
        className={`flex items-center justify-between glass-panel transition-all duration-300 ease-out will-change-transform ${
          scrolled 
            ? 'w-full max-w-5xl mx-2 md:mx-4 px-4 md:px-6 py-2 rounded-full shadow-glass dark:shadow-glass-dark translate-y-1 lg:translate-y-2 bg-white/70 dark:bg-black/70' 
            : 'w-full max-w-[96vw] px-4 md:px-8 py-4 rounded-3xl bg-white/40 dark:bg-black/30 shadow-none border-transparent'
        }`}
      >
        {/* LOGO */}
        <NavLink to="/" className="flex items-baseline group shrink-0">
          <span className={`font-display font-black tracking-tight text-black dark:text-white transition-all duration-300 ${scrolled ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'}`}>
            不归<span className="text-gray-400 dark:text-gray-500">bgi</span>
          </span>
        </NavLink>

        {/* Desktop Links & Controls */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          <div className="flex items-center gap-1 mr-2 lg:mr-6 bg-black/5 dark:bg-white/5 p-1 rounded-full backdrop-blur-md overflow-x-auto">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs lg:text-sm font-bold uppercase tracking-wider lg:tracking-widest px-3 py-1.5 lg:px-4 lg:py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                      : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3 pr-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="group flex items-center justify-center w-10 h-10 rounded-full glass-button relative overflow-hidden"
              aria-label="Search"
            >
              <Search size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white z-10 transition-colors" />
            </button>

            <button
              onClick={handleLanguageToggle}
              className="group flex items-center justify-center w-10 h-10 rounded-full glass-button relative overflow-hidden"
              aria-label="Toggle language"
            >
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white z-10 transition-colors">
                {language === 'zh' ? 'EN' : '中'}
              </span>
            </button>

            <button
              onClick={handleThemeToggle}
              className="group flex items-center justify-center w-10 h-10 rounded-full glass-button relative overflow-hidden"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-orange-400 z-10 transition-colors" />
              ) : (
                <Moon size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-sky-400 z-10 transition-colors" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile controls (simplistic) */}
        <div className="flex md:hidden items-center gap-2">
           <button
             onClick={() => setIsSearchOpen(true)}
             className="p-2 rounded-full glass-button text-gray-500 dark:text-gray-400"
             aria-label="Search"
           >
             <Search size={16} />
           </button>
           <button
             onClick={handleLanguageToggle}
             className="text-xs font-bold text-gray-500 dark:text-gray-400 px-3 py-2 rounded-full glass-button"
           >
             {language === 'zh' ? 'EN' : '中'}
           </button>
           <button
             onClick={handleThemeToggle}
             className="p-2 rounded-full glass-button text-gray-500 dark:text-gray-400"
           >
             {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
           </button>
        </div>
      </nav>
      
      {/* Mobile bottom nav (Floating Glass Pill) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-sm">
        <nav className="glass-panel rounded-full p-2 flex justify-between items-center shadow-glass dark:shadow-glass-dark">
          {navLinks.map((link) => (
             <NavLink
               key={link.name}
               to={link.path}
               className={({ isActive }) =>
                 `text-xs font-bold uppercase tracking-wider px-3 py-2.5 rounded-full transition-all duration-300 flex-1 text-center ${
                   isActive
                     ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                     : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
                 }`
               }
             >
               {link.name}
             </NavLink>
          ))}
        </nav>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};
