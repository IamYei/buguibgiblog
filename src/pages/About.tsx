import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { i18n } from '../i18n';

export const About: React.FC = () => {
  const { language } = useLanguage();
  const t = i18n[language];

  const technologies = [
    'React 19',
    'Vite',
    'TypeScript',
    'TailwindCSS 3',
    'React Router',
    'Framer Motion',
    'Markdown',
    'Glassmorphism',
  ];

  return (
    <div className="page-enter">
      <div className="w-full max-w-4xl mx-auto px-4 lg:grid lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Col: Title & Quote */}
        <div className="lg:col-span-5 mb-12 lg:mb-0">
          <div className="sticky top-40">
            <span className="glass-button px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-6 inline-block">
              {language === 'zh' ? '关于作者' : 'Who Am I'}
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-black tracking-tight leading-[1] text-black dark:text-white mb-8">
              {t.aboutTitle}
            </h1>
            
            <div className="glass-panel p-6 rounded-3xl border-l-4 border-l-black dark:border-l-white bg-white/40 dark:bg-black/40">
              <p className="text-xl md:text-2xl font-display font-medium italic text-gray-800 dark:text-gray-200">
                "Writing is the most reliable way to clarify thoughts."
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Content */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] space-y-8">
            <h2 className="text-2xl font-bold font-display text-black dark:text-white">
              {t.aboutIntro}
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                {language === 'zh'
                  ? '欢迎来到我的数字花园。这里主要记录我关于技术、设计、以及生活的一些碎片想法。没有固定的更新频率，也没有特定的受众，只是一个单纯的写作空间。'
                  : 'Welcome to my digital garden. This space is dedicated to my scattered thoughts on technology, design, and life. There is no set schedule and no specific audience—just a pure writing space.'}
              </p>
              <p>
                {language === 'zh'
                  ? '本站采用了极简的「液态玻璃」风格设计，意在去除多余的视觉噪音，同时保留高级的手工质感，让阅读回归本质。'
                  : 'This site embraces a minimalist "Liquid Glass" design language. The goal is to strip away visual noise while retaining a premium, crafted feel, bringing the focus back to reading.'}
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-white/20 dark:border-white/5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
                {language === 'zh' ? '本站构建技术' : 'Built With'}
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="glass-button px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 hover:scale-105 transition-transform"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
