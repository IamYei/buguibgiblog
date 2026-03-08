import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const friendsList = [
  {
    name: 'Antigravity ✨',
    desc: 'The smartest AI assistant doing all the heavy lifting',
    url: 'https://deepmind.google',
    avatar: '🤖',
  },
  {
    name: 'Vite',
    desc: 'Next Generation Frontend Tooling',
    url: 'https://vitejs.dev',
    avatar: '⚡',
  },
  {
    name: 'React',
    desc: 'The library for web and native user interfaces',
    url: 'https://react.dev',
    avatar: '⚛️',
  }
];

export const Friends: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="w-full max-w-5xl mx-auto px-6 pt-32 pb-24 page-enter">
      <header className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-display font-black tracking-tight text-black dark:text-white mb-6 leading-tight">
          {language === 'zh' ? '左邻右舍 🏘️' : 'Friends 🏘️'}
        </h1>
        <p className="text-xl text-gray-500 font-display">
          {language === 'zh' ? '常去串门的神仙网站和朋友们。' : 'Awesome sites and friends I visit often.'}
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {friendsList.map((friend, i) => (
          <a 
            key={i}
            href={friend.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-panel p-8 rounded-[3rem] hover:-translate-y-3 hover:rotate-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col items-center text-center shadow-glass-hover dark:shadow-glass-dark-hover"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="text-5xl mb-6 bg-white/50 dark:bg-black/50 w-24 h-24 rounded-full flex items-center justify-center shadow-inner pt-2 border border-black/5 dark:border-white/5 group-hover:scale-110 transition-transform">
              {friend.avatar}
            </div>
            <h3 className="text-2xl font-bold font-display text-black dark:text-white mb-3 group-hover:text-amber-500 transition-colors">
              {friend.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm md:text-base leading-relaxed">
              {friend.desc}
            </p>
            <div className="mt-auto px-5 py-2.5 bg-black/5 dark:bg-white/10 rounded-full flex items-center gap-2 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors">
               <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-300 group-hover:text-amber-700 dark:group-hover:text-amber-400">Visit</span>
               <ExternalLink size={14} className="text-gray-400 group-hover:text-amber-500" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
