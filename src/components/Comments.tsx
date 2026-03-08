import React from 'react';
import Giscus from '@giscus/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export const Comments: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  return (
    <div className="w-full mt-16 pt-16 border-t border-black/5 dark:border-white/5 relative z-10 animate-fade-in-up">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-display font-black tracking-tight text-black dark:text-white inline-block relative">
          {language === 'zh' ? '闲聊区 💬' : 'Comments 💬'}
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-black/10 dark:bg-white/10 rounded-full" />
        </h3>
        <p className="text-gray-500 mt-4 text-sm md:text-base">
          {language === 'zh' ? '留下你的足迹，或者和大家打个招呼吧 ✨' : 'Leave your footprints or say hi ✨'}
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-10 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-glass dark:shadow-glass-dark relative overflow-hidden">
        {/* Glow effect behind comments */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-[80px] -z-10 mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 dark:bg-purple-400/10 rounded-full blur-[80px] -z-10 mix-blend-screen" />

        <Giscus
          id="comments"
          repo="IamYei/buguibgiblog"
          repoId="R_kgDORhhJiA"
          category="Announcements"
          categoryId="DIC_kwDORhhJiM4C38sz"
          mapping="pathname"
          term="Welcome to my blog!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={theme === 'dark' ? 'transparent_dark' : 'light'}
          lang={language === 'zh' ? 'zh-CN' : 'en'}
          loading="lazy"
        />
      </div>
    </div>
  );
};
