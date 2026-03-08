import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { i18n, CATEGORIES } from '../i18n';
import { posts } from '../data/posts';
import { ArrowUpRight, Calendar } from 'lucide-react';

export const Home: React.FC = () => {
  const { language } = useLanguage();
  const t = i18n[language];
  const cats = CATEGORIES[language];

  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="page-enter">
      {/* ═══ Liquid Hero Section ═══ */}
      <section className="w-full max-w-[96vw] mx-auto mb-20 md:mb-32 relative z-10">
        <div className="glass-panel p-8 md:p-16 lg:p-24 rounded-[2rem] md:rounded-[3rem] overflow-hidden relative">
          
          {/* Subtle inside gradient */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/30 dark:bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-200/30 dark:bg-pink-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT: Massive Title */}
            <div className="lg:col-span-8 w-full animate-fade-in-up">
              <p className="glass-button inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-8 md:mb-12">
                {language === 'zh' ? '欢迎来到我的主页' : 'Welcome to my space'}
              </p>

              <h1 className="font-display text-[16vw] md:text-[12vw] lg:text-[8vw] font-black tracking-tight leading-[0.9] text-black dark:text-white mb-8">
                不归
                <span className="text-gray-300 dark:text-gray-700">bgi</span>
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-[2px] w-20 bg-gray-300 dark:bg-gray-700" />
                <p className="font-display text-2xl md:text-3xl lg:text-4xl text-gray-600 dark:text-gray-300 font-medium tracking-tight">
                  {t.heroTagline}
                </p>
              </div>

              <div className="max-w-xl">
                {t.heroIntro.split('|').map((line, i) => (
                  <p key={i} className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-2">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* RIGHT: Quick Stats / Glass Chips */}
            <div className="lg:col-span-4 w-full h-full flex flex-col justify-end gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="glass-panel p-6 rounded-3xl bg-white/40 dark:bg-black/40">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                  {language === 'zh' ? '文章总数' : 'Total Posts'}
                </h3>
                <p className="font-display text-6xl font-black text-black dark:text-white">
                  {String(posts.length).padStart(2, '0')}
                </p>
              </div>
              
              <div className="glass-panel p-6 rounded-3xl bg-white/40 dark:bg-black/40">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                  {language === 'zh' ? '话题探索' : 'Topics'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(cats).map(([key, cat]) => (
                    <Link
                      key={key}
                      to="/blog"
                      className="glass-button px-4 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Latest Posts ═══ */}
      <section className="w-full max-w-[96vw] mx-auto z-10 relative">
        <div className="flex justify-between items-end mb-8 md:mb-12 px-2 md:px-4">
          <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-black dark:text-white">
            {t.latestPosts}
          </h2>
          <Link
            to="/blog"
            className="group glass-button px-6 py-2.5 rounded-full text-sm md:text-base font-bold text-black dark:text-white flex items-center gap-2"
          >
            {t.viewAll}
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Glass Post Cards Grid */}
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {latestPosts.map((post, index) => {
            const meta = post[language];
            return (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="glass-panel glass-panel-hover p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="glass-button px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300">
                      {cats[post.category] || post.category}
                    </span>
                    <span className="text-xs font-mono text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                      <Calendar size={13} />
                      {post.date}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-2 leading-tight">
                    {meta.title}
                  </h3>
                  
                  <p className="text-base text-gray-500 dark:text-gray-400 line-clamp-2 max-w-3xl">
                    {meta.summary}
                  </p>
                </div>

                <div className="shrink-0 hidden md:flex w-14 h-14 rounded-full glass-button items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-500">
                  <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};
