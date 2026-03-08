import React, { useState, useEffect } from 'react';

export const ProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (winHeightPx <= 0) {
         setScrollProgress(0);
         return;
      }
      
      let scrolled = (scrollPx / winHeightPx) * 100;
      // Cap between 0 and 100
      scrolled = Math.min(100, Math.max(0, scrolled));
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-transparent pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 dark:from-blue-500 dark:via-purple-600 dark:to-pink-600 shadow-[0_0_12px_rgba(168,85,247,0.7)] transition-all duration-150 ease-out rounded-r-full"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
