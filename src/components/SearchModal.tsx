import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { posts } from '../data/posts';
import { useLanguage } from '../context/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const results = posts.filter(post => {
    if (!query) return false;
    const search = query.toLowerCase();
    const zhMatch = post.zh.title.toLowerCase().includes(search) || post.zh.summary.toLowerCase().includes(search);
    const enMatch = post.en.title.toLowerCase().includes(search) || post.en.summary.toLowerCase().includes(search);
    const tagMatch = post.tags?.some(t => t.toLowerCase().includes(search));
    return zhMatch || enMatch || tagMatch;
  });

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 md:pt-32 p-4 page-enter">
      <div className="absolute inset-0 bg-white/20 dark:bg-black/40 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col max-h-[70vh] overflow-hidden">
        <div className="p-4 md:p-6 border-b border-black/5 dark:border-white/5 flex items-center gap-4">
          <Search className="text-gray-400" size={24} />
          <input
            ref={inputRef}
            type="text"
            placeholder={language === 'zh' ? '搜索文章、碎片或标签...' : 'Search posts, thoughts or tags...'}
            className="flex-1 bg-transparent border-none outline-none text-xl md:text-2xl text-black dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 font-display font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="p-2 bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-2 md:p-4">
          {query && results.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              <p className="text-lg">{language === 'zh' ? '哎呀，没有找到相关的碎片 🍂' : 'Oops, no matching pieces found 🍂'}</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {results.map(post => (
                <li key={post.id}>
                  <button
                    onClick={() => {
                      onClose();
                      navigate(`/blog/${post.slug}`);
                    }}
                    className="w-full text-left p-4 md:p-5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors group flex items-start gap-4 md:gap-5"
                  >
                    <div className="p-3 bg-black/5 dark:bg-white/10 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      <Hash size={20} className="text-gray-600 dark:text-gray-300" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-black dark:text-white mb-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                        {post[language].title}
                      </h4>
                      <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 line-clamp-1">{post[language].summary}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {!query && (
            <div className="py-16 text-center text-gray-400">
              <p className="text-sm md:text-base uppercase tracking-widest font-bold font-display opacity-50">
                {language === 'zh' ? '输入任意关键词开始捕捉 ✨' : 'Type keywords to start capturing ✨'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
