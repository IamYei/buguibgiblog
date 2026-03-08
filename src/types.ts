export type Language = 'zh' | 'en';

export interface PostMeta {
  id: string;
  slug: string;
  category: string;
  date: string;
  audio?: string;
  zh: {
    title: string;
    summary: string;
  };
  en: {
    title: string;
    summary: string;
  };
  tags?: string[];
}

export interface PostContent {
  meta: PostMeta;
  content: string;
}
