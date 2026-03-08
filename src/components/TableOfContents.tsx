import React, { useEffect, useState } from 'react';
import GithubSlugger from 'github-slugger';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  markdown: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ markdown }) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const slugger = new GithubSlugger();
    // Match h2, h3, h4 headings
    const headings = markdown.match(/^(#{2,4})\s+(.+)$/gm);
    
    if (headings) {
      const parsed = headings.map(heading => {
        const match = heading.match(/^(#{2,4})\s+(.+)$/);
        const level = match![1].length;
        // Strip markdown formatting from the heading text for display
        const textStr = match![2].replace(/[#*_~`\[\]]/g, '').trim(); 
        const id = slugger.slug(textStr);
        return { id, text: textStr, level };
      });
      setToc(parsed);
    } else {
      setToc([]);
    }
  }, [markdown]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = toc.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
      
      let currentActiveId = '';
      for (const element of headingElements) {
        const rect = element.getBoundingClientRect();
        // 120px offset to account for sticky navbars or other top elements
        if (rect.top <= 120) {
          currentActiveId = element.id;
        }
      }
      
      if (currentActiveId) {
        setActiveId(currentActiveId);
      } else if (headingElements.length > 0) {
        // If scrolled above the first heading, highlight the first one
        if (window.scrollY < 120) {
          setActiveId(headingElements[0].id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial active state
    // We use a small timeout to ensure the DOM is painted since it relies on the actual HTMLElements
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <div className="hidden xl:block absolute left-full top-32 ml-8 w-64 z-10 transition-opacity duration-500 animate-fade-in">
      <div className="sticky top-32 p-6 glass-panel rounded-3xl text-sm shadow-glass dark:shadow-glass-dark">
        <h4 className="font-bold font-display text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-widest text-xs">
          目录
        </h4>
        <ul className="space-y-3">
          {toc.map(item => (
            <li 
              key={item.id} 
              style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
            >
              <a 
                href={`#${item.id}`}
                className={`block transition-all duration-300 line-clamp-2 ${
                  activeId === item.id 
                    ? 'text-black dark:text-white font-bold translate-x-1' 
                    : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    const y = target.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
