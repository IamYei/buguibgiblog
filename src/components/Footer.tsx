import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { i18n } from '../i18n';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = i18n[language];

  return (
    <footer className="w-full max-w-[96vw] mx-auto mt-32 border-t-2 border-black dark:border-white pt-10 pb-12 flex flex-col md:flex-row justify-between items-center text-sm font-light text-gray-400 dark:text-gray-500 uppercase tracking-widest gap-4 transition-colors duration-300">
      <p>{t.footerCopyright}</p>
      <p>{t.footerPoweredBy}</p>
    </footer>
  );
};
