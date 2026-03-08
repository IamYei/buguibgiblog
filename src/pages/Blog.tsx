import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { i18n, CATEGORIES } from '../i18n';
import { posts } from '../data/posts';
import { Calendar, ArrowUpRight } from 'lucide-react';

export const Blog: React.FC = () => {
  const { language } = useLanguage();
  const t = i18n[language];
  const cats = CATEGORIES[language];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [searchParams, setSearchParams] = useSearchParams();
  const tagFilter = searchParams.get('tag');

  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];
    if (selectedCategory !== 'all') {
      result = result.filter((post) => post.category === selectedCategory);
    }
    if (tagFilter) {
      result = result.filter((post) => post.tags?.includes(tagFilter));
    }
    result.sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });
    return result;
  }, [selectedCategory, sortOrder]);

  return (
    <div className="page-enter">
      {/* ═══ Header ═══ */}
      <div className="w-full max-w-[96vw] mx-auto mb-12 md:mb-24 relative z-10 px-4 md:px-0 text-center md:text-left">
        <h1 className="font-display text-[14vw] md:text-[8vw] leading-[0.9] font-black tracking-tight text-black dark:text-white italic mb-6">
          {t.blogTitle}
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl">
          {t.blogDescription}
        </p>
      </div>

      <div className="w-full max-w-[96vw] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 relative z-10">
        
        {/* ═══ Sidebar / Filters ═══ */}
        <aside className="lg:col-span-3">
          <div className="glass-panel p-6 rounded-3xl sticky top-32">
            
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
              {t.filterCategory}
            </h3>
            
            <div className="flex flex-wrap lg:flex-col gap-2 mb-10">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`text-left px-5 py-3 rounded-full md:rounded-2xl transition-all duration-300 font-medium text-sm md:text-base ${
                  selectedCategory === 'all'
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/10 dark:shadow-white/10'
                    : 'glass-button text-gray-600 dark:text-gray-300'
                }`}
              >
                {t.allCategories}
              </button>
              {Object.entries(cats).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`text-left px-5 py-3 rounded-full md:rounded-2xl transition-all duration-300 font-medium text-sm md:text-base ${
                    selectedCategory === key
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/10 dark:shadow-white/10'
                      : 'glass-button text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
              {t.sortByDate}
            </h3>
            <div className="flex glass-panel rounded-full p-1 w-full relative">
              <button
                onClick={() => setSortOrder('desc')}
                className={`flex-1 text-center px-4 py-2 rounded-full text-sm font-bold transition-colors z-10 ${
                  sortOrder === 'desc' ? 'text-white dark:text-black' : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {t.newestFirst}
              </button>
              <button
                onClick={() => setSortOrder('asc')}
                className={`flex-1 text-center px-4 py-2 rounded-full text-sm font-bold transition-colors z-10 ${
                  sortOrder === 'asc' ? 'text-white dark:text-black' : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {t.oldestFirst}
              </button>
              
              {/* Sliding Pill Indicator */}
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-black dark:bg-white rounded-full transition-all duration-300 pointer-events-none shadow-md ${
                  sortOrder === 'desc' ? 'left-1' : 'left-[calc(50%+3px)]'
                }`} 
              />
            </div>
          </div>
        </aside>

        {/* ═══ Posts Grid ═══ */}
        <main className="lg:col-span-9">
          {tagFilter && (
            <div className="mb-8 flex items-center justify-between glass-panel p-4 md:p-6 rounded-3xl animate-fade-in-up shadow-glass dark:shadow-glass-dark">
              <span className="text-gray-500 font-medium text-sm md:text-base flex items-center gap-2">
                {language === 'zh' ? `正在查看标签：` : `Filtered by tag:`}
                <span className="font-bold font-mono text-black dark:text-white uppercase px-3 py-1 bg-black/5 dark:bg-white/10 rounded-full">
                  #{tagFilter}
                </span>
              </span>
              <button 
                onClick={() => setSearchParams({})} 
                className="text-xs transition-transform duration-300 md:text-sm font-bold bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full hover:-translate-y-1 shadow-md shadow-black/20 dark:shadow-white/20"
              >
                {language === 'zh' ? '清除 ×' : 'Clear ×'}
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredAndSortedPosts.map((post, index) => {
              const meta = post[language];
              return (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="glass-panel glass-panel-hover p-6 md:p-8 rounded-[2rem] flex flex-col justify-between group h-full animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="glass-button px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                        {cats[post.category] || post.category}
                      </span>
                      <div className="w-10 h-10 rounded-full glass-button flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-500">
                        <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-500" />
                      </div>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-black dark:text-white mb-4 leading-[1.1]">
                      {meta.title}
                    </h2>
                    
                    <p className="text-base text-gray-500 dark:text-gray-400 mb-8 line-clamp-3 leading-relaxed">
                      {meta.summary}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm font-mono text-gray-400 dark:text-gray-500 pt-6 border-t border-white/20 dark:border-white/5">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                  </div>
                </Link>
              );
            })}
            
            {filteredAndSortedPosts.length === 0 && (
              <div className="col-span-full py-24 text-center glass-panel rounded-[2rem]">
                <p className="text-xl md:text-2xl text-gray-400 dark:text-gray-500 font-medium">
                  {language === 'zh' ? '暂无该分类下的文章。' : 'No posts found in this category.'}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
