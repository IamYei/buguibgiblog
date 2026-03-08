import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import { ArrowLeft, Calendar, Tag, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES } from '../i18n';
import { posts } from '../data/posts';
import { PostMeta } from '../types';
import { MusicPlayer } from '../components/MusicPlayer';
import { ProgressBar } from '../components/ProgressBar';
import { TableOfContents } from '../components/TableOfContents';
import { Comments } from '../components/Comments';

export const Post: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const cats = CATEGORIES[language];

  const [postMeta, setPostMeta] = useState<PostMeta | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Find metadata
    const meta = posts.find((p) => p.slug === slug);
    if (!meta) {
      setError(language === 'zh' ? '未找到该文章' : 'Post not found');
      setLoading(false);
      return;
    }
    setPostMeta(meta);

    // 2. Fetch Markdown content dynamically
    setLoading(true);
    setError(null);

    const filename = `${slug}.${language}.md`;
    fetch(`${import.meta.env.BASE_URL}posts/${filename}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Content not found');
        }
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load markdown', err);
        setError(language === 'zh' ? '该语言版本暂未提供。' : 'This language version is not available yet.');
        setLoading(false);
      });
  }, [slug, language]);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center page-enter">
        <div className="flex flex-col items-center gap-4">
          {/* Glass Loader */}
          <div className="w-12 h-12 border-4 border-black/10 dark:border-white/10 border-t-black dark:border-t-white rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium tracking-widest uppercase text-sm">Loading</p>
        </div>
      </div>
    );
  }

  if (error || !postMeta) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 mt-20 page-enter text-center">
        <div className="glass-panel p-12 rounded-[3rem] inline-flex flex-col items-center justify-center">
          <AlertCircle size={48} className="text-red-500 mb-6" />
          <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-4">Oops!</h2>
          <p className="text-xl text-gray-500 mb-10">{error}</p>
          <button
            onClick={() => navigate('/blog')}
            className="glass-button px-8 py-3 rounded-full font-bold uppercase tracking-widest flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            {language === 'zh' ? '返回博客' : 'Back to Blog'}
          </button>
        </div>
      </div>
    );
  }

  const metaLang = postMeta[language];

  return (
    <article className="w-full max-w-4xl mx-auto px-4 sm:px-8 mt-10 md:mt-20 page-enter relative z-10">
      
      {/* ═══ Header ═══ */}
      <header className="mb-16 md:mb-24 text-center md:text-left">
        <button
          onClick={() => navigate('/blog')}
          className="group glass-button inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-16 md:mb-24 transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {language === 'zh' ? '返回' : 'Back'}
        </button>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
          <span className="glass-button px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-black dark:text-white">
            {cats[postMeta.category as keyof typeof cats] || postMeta.category}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-mono text-gray-500 dark:text-gray-400 px-2 py-1 bg-white/30 dark:bg-black/30 backdrop-blur-md rounded-full">
            <Calendar size={14} />
            {postMeta.date}
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-black dark:text-white mb-8 leading-[1.05]">
          {metaLang.title}
        </h1>
        
        {postMeta.tags && (
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-8">
            <Tag size={16} className="text-gray-400 mr-2" />
            {postMeta.tags.map((tag: string) => (
              <span key={tag} className="glass-button px-3 py-1 rounded-full text-xs font-mono text-gray-500 dark:text-gray-400">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* ═══ Content ═══ */}
      <div className="relative">
        <TableOfContents markdown={content} />
        <div className="glass-panel rounded-[2rem] md:rounded-[3rem] p-6 sm:p-12 lg:p-16 mb-24 relative">
          <div className="markdown-body">
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeSlug]}
            >
              {content}
            </Markdown>
          </div>
        </div>
      </div>

      {/* ═══ Comments ═══ */}
      <Comments />

      {/* ═══ Music Player (If Available) ═══ */}
      {postMeta.audio && <MusicPlayer audioUrl={postMeta.audio} />}

    </article>
  );
};
