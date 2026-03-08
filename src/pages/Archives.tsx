import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { posts } from '../data/posts';
import { useLanguage } from '../context/LanguageContext';
import { PostMeta } from '../types';

export const Archives: React.FC = () => {
  const { language } = useLanguage();

  const groupedPosts = useMemo(() => {
    const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const groups: { [year: string]: PostMeta[] } = {};
    
    sorted.forEach(post => {
      const year = post.date.substring(0, 4);
      if (!groups[year]) groups[year] = [];
      groups[year].push(post);
    });
    
    return groups;
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-6 pt-32 pb-24 page-enter">
      <header className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-display font-black tracking-tight text-black dark:text-white mb-6 leading-tight">
          {language === 'zh' ? '时光机 🕰️' : 'Archives 🕰️'}
        </h1>
        <p className="text-xl text-gray-500 font-display">
          {language === 'zh' ? '所有的碎片，按时间排好了队。' : 'All pieces, sorted by time.'}
        </p>
      </header>

      <div className="relative border-l-2 border-black/10 dark:border-white/10 ml-4 md:ml-8">
        {Object.entries(groupedPosts)
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .map(([year, yearPosts]) => (
          <div key={year} className="mb-16 relative">
            {/* Year bullet */}
            <div className="absolute -left-[9px] top-[10px] w-4 h-4 rounded-full bg-white dark:bg-black border-4 border-black dark:border-white shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
            
            <h2 className="text-3xl font-display font-black text-black dark:text-white ml-8 mb-8">{year}</h2>
            
            <div className="space-y-6 ml-8">
              {yearPosts.map(post => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.slug}`}
                  className="group block glass-panel p-5 md:p-6 rounded-3xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors shadow-glass-hover dark:shadow-glass-dark-hover"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <span className="text-gray-400 font-mono text-sm flex items-center gap-1.5 whitespace-nowrap">
                      <Calendar size={14} />
                      {post.date.substring(5)} {/* Show only MM-DD */}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-black dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                      {post[language].title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
