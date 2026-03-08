import { PostMeta } from '../types';

/**
 * ═══════════════════════════════════════════════════════
 *  文章元信息索引
 *
 *  每篇文章的 Markdown 文件存放在 public/posts/ 目录下：
 *    public/posts/{slug}.zh.md   ← 中文版
 *    public/posts/{slug}.en.md   ← 英文版
 *
 *  添加新文章只需：
 *  1. 在 public/posts/ 下放两个 .md 文件
 *  2. 在下面的 posts 数组里添加一条元信息
 * ═══════════════════════════════════════════════════════
 */

export const posts: PostMeta[] = [
  {
    id: '1',
    slug: 'vocal-extractor-evolution',
    category: 'tech',
    date: '2026-03-08',
    audio: '',
    zh: {
      title: '关于人声提取器的实现',
      summary: '具体的实现类型是把垫音与舞台进行对比，从而计算出一个阈值。',
    },
    en: {
      title: 'Implementation of Vocal Extractor',
      summary: 'The specific implementation type is to compare the backing track with the stage.',
    },
    tags: ['audio', 'tech', 'vocal-extractor'],
  },
];

export function getPostMeta(slug: string): PostMeta | undefined {
  return posts.find(p => p.slug === slug);
}

/**
 * 从 public/posts/ 目录加载 Markdown 文件
 * 文件命名格式：{slug}.{lang}.md
 */
export async function fetchPostContent(slug: string, lang: string): Promise<string | null> {
  try {
    const basePath = import.meta.env.BASE_URL || '/';
    const url = basePath + 'posts/' + slug + '.' + lang + '.md';
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}
