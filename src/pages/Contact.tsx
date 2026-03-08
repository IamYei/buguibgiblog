import React from 'react';
import { Mail, Github, Youtube, MessageCircleHeart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { i18n } from '../i18n';

export const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = i18n[language];

  // We are using a scattered, asymmetrical organic layout.
  // We use custom inline rotations and translations to make it look like cards thrown on a desk.
  const contacts = [
    {
      id: 'email',
      icon: <Mail size={32} strokeWidth={1.5} />,
      label: t.emailLabel,
      value: 'buguibgi@gmail.com',
      href: 'mailto:buguibgi@gmail.com',
      rotation: '-rotate-2',
      colorText: 'text-violet-500',
      colorBg: 'bg-violet-500/10',
      align: 'justify-start',
    },
    {
      id: 'github',
      icon: <Github size={32} strokeWidth={1.5} />,
      label: t.githubLabel,
      value: '@IamYei',
      href: 'https://github.com/IamYei',
      rotation: 'rotate-3',
      colorText: 'text-zinc-600 dark:text-zinc-300',
      colorBg: 'bg-zinc-500/10',
      align: 'justify-end',
    },
    {
      id: 'bilibili',
      icon: <MessageCircleHeart size={32} strokeWidth={1.5} />,
      label: language === 'zh' ? '哔哩哔哩 (゜-゜)つロ' : 'Bilibili',
      value: 'UID: 70572092',
      href: 'https://space.bilibili.com/70572092',
      rotation: '-rotate-3',
      colorText: 'text-pink-500',
      colorBg: 'bg-pink-500/10',
      align: 'justify-start',
    },
    {
      id: 'youtube',
      icon: <Youtube size={32} strokeWidth={1.5} />,
      label: language === 'zh' ? '油管频道 📺' : 'YouTube',
      value: '@buguimrremoved',
      href: 'https://www.youtube.com/@buguimrremoved',
      rotation: 'rotate-2',
      colorText: 'text-red-500',
      colorBg: 'bg-red-500/10',
      align: 'justify-end',
    },
  ];

  return (
    <div className="page-enter min-h-[70vh] flex flex-col items-center justify-center py-12 px-4 relative z-10">
      
      {/* Title Area */}
      <div className="text-center mb-16 relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-3xl rounded-full opacity-50 organic-glow animate-blob"></div>
        <h1 className="relative text-6xl md:text-8xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">
          {t.contactTitle}
        </h1>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 font-medium max-w-xl mx-auto font-sans leading-relaxed">
          {t.contactIntro}
        </p>
      </div>

      {/* Scattered Cards Layout */}
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 md:gap-10 perspective-1000">
        {contacts.map((contact, index) => (
          <div key={contact.id} className={`flex w-full ${contact.align}`}>
            <a
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                glass-panel glass-panel-hover group
                relative w-full md:w-2/3 lg:w-1/2 p-6 md:p-8 rounded-[2rem] 
                flex items-center gap-6 overflow-hidden
                ${contact.rotation} origin-center
                animate-float
              `}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              {/* Internal Glow Effect */}
              <div className={`absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 ${contact.colorBg}`}></div>
              
              <div className={`
                flex-shrink-0 w-16 h-16 rounded-3xl flex items-center justify-center
                backdrop-blur-md bg-white/50 dark:bg-black/20 border border-white/30 dark:border-white/10
                group-hover:scale-110 transition-transform duration-[600ms] cubic-bezier(0.34, 1.56, 0.64, 1)
                ${contact.colorText}
              `}>
                {contact.icon}
              </div>

              <div className="flex-1 min-w-0 z-10">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                  {contact.label}
                </p>
                <p className="text-xl md:text-2xl font-bold font-display text-gray-900 dark:text-white truncate">
                  {contact.value}
                </p>
              </div>

              <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                <div className="w-2 h-2 rounded-full bg-current"></div>
              </div>
            </a>
          </div>
        ))}
      </div>

    </div>
  );
};
