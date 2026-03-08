import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { posts } from '../data/posts';
import { useLanguage } from '../context/LanguageContext';

export const Tags: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, []);

  const sortedTags = useMemo(() => {
    return Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
  }, [tagCounts]);

  return (
    <div className="w-full max-w-4xl mx-auto px-6 pt-32 pb-24 page-enter">
      <header className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-display font-black tracking-tight text-black dark:text-white mb-6 leading-tight">
          {language === 'zh' ? '标签墙 🏷️' : 'Tags Wall 🏷️'}
        </h1>
        <p className="text-xl text-gray-500 font-display">
          {language === 'zh' ? '这里贴满了各种奇怪的标签。' : 'All the tags scattered around.'}
        </p>
      </header>

      <div className="glass-panel p-8 md:p-16 rounded-[3rem] shadow-glass dark:shadow-glass-dark">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {sortedTags.map(([tag, count]) => {
            const sizeClass = count > 5 ? 'text-2xl py-3 px-6' : count > 2 ? 'text-xl py-2 px-5' : 'text-base py-1.5 px-4';
            
            return (
              <button
                key={tag}
                onClick={() => navigate(`/blog?tag=${tag}`)}
                className={`group glass-button rounded-full flex items-center shadow-glass-hover dark:shadow-glass-dark-hover hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${sizeClass}`}
              >
                <Tag className="mr-2 text-gray-400 group-hover:text-blue-500 transition-colors" size={count > 5 ? 24 : count > 2 ? 20 : 16} />
                <span className="font-mono font-bold text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {tag}
                </span>
                <span className="ml-3 text-xs text-gray-400 bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-full border border-black/5 dark:border-white/5">
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};
