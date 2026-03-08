import { Language } from './types';

interface I18nStrings {
  // Navbar
  navHome: string;
  navBlog: string;
  navArchives: string;
  navTags: string;
  navFriends: string;
  navAbout: string;
  navContact: string;
  langToggle: string;

  // Home
  heroTagline: string;
  heroIntro: string;
  latestPosts: string;
  viewAll: string;

  // Blog
  blogTitle: string;
  blogDescription: string;
  allCategories: string;
  sortByDate: string;
  filterCategory: string;
  newestFirst: string;
  oldestFirst: string;
  postsCount: (n: number) => string;
  noPosts: string;
  readMore: string;

  // Post
  backToBlog: string;
  minRead: (n: number) => string;

  // About
  aboutTitle: string;
  aboutIntro: string;
  aboutContent: string[];

  // Contact
  contactTitle: string;
  contactIntro: string;
  emailLabel: string;
  githubLabel: string;

  // Footer
  footerCopyright: string;
  footerPoweredBy: string;

  // Categories
  categoryTech: string;
  categoryLife: string;
  categoryDesign: string;
  categoryThoughts: string;
}

export const i18n: Record<Language, I18nStrings> = {
  zh: {
    navHome: '窝',
    navBlog: '碎片',
    navArchives: '时光机',
    navTags: '标签墙',
    navFriends: '左邻右舍',
    navAbout: '关于我',
    navContact: '闲聊',
    langToggle: 'EN',

    heroTagline: '写字的地方 ✨',
    heroIntro: '记录技术、捣鼓设计，还有发发呆的瞬间 ૮ ˶ᵔ ᵕ ᵔ˶ ა|不定期掉落更新，偶尔认真一下。',
    latestPosts: '刚捞出锅的文章 🍜',
    viewAll: '去翻翻旧箱子 ➜',

    blogTitle: '所有的碎片 🧩',
    blogDescription: '这里装着所有的字，按时间排好队了。',
    allCategories: '全都要！',
    sortByDate: '时间魔法',
    filterCategory: '选个分类玩玩',
    newestFirst: '最新的！',
    oldestFirst: '压箱底的！',
    postsCount: (n) => `一共捉到了 ${n} 篇碎碎念`,
    noPosts: '呀，这里空空如也 ( ´･･)ﾉ(._.`)',
    readMore: '戳进去看 ✧',

    backToBlog: '⟵ 溜回列表',
    minRead: (n) => `大约挂机 ${n} 分钟看完`,

    aboutTitle: '关于本喵 🐾',
    aboutIntro: '阿罗哈！我是不归 (≧◡≦)',
    aboutContent: [
      '我是不归，一个喜欢瞎折腾写代码和搞搞设计的人 💻🎨',
      '建这个小破站主要是为了有个自己的秘密基地，记录那些突然蹦出来的灵感，踩过的坑，还有生活中闪闪发光的瞬间 ✨',
      '如果你觉得这里有些意思，欢迎常来串门呀！喝杯茶再走 🍵'
    ],

    contactTitle: '抓到我！ 🎈',
    contactIntro: '如果你想找我玩，或者只是闲聊，顺着这些网线就能摸过来~ (¬‿¬ )',
    emailLabel: '扔小纸条',
    githubLabel: '同性交友',

    footerCopyright: '© 2026 不归bgi ʕ•ᴥ•ʔ',
    footerPoweredBy: '由 React + 爱意 强力驱动 💖',

    categoryTech: '赛博空间 👾',
    categoryLife: '地球生活 🌍',
    categoryDesign: '像素魔法 🎨',
    categoryThoughts: '脑洞大开 💭',
  },
  en: {
    navHome: 'Nest',
    navBlog: 'Pieces',
    navArchives: 'Archives',
    navTags: 'Tags',
    navFriends: 'Friends',
    navAbout: 'Whoami',
    navContact: 'Chat',
    langToggle: '中',

    heroTagline: 'A Place to Ponder ✨',
    heroIntro: 'Fragments of code, design, and spacing out ૮ ˶ᵔ ᵕ ᵔ˶ ა|Updated irregularly, occasionally serious.',
    latestPosts: 'Fresh out the oven 🍜',
    viewAll: 'Dig the archives ➜',

    blogTitle: 'All the Pieces 🧩',
    blogDescription: 'Everything I wrote, lined up just for you.',
    allCategories: 'Gimme All!',
    sortByDate: 'Time Travel',
    filterCategory: 'Pick a flavor',
    newestFirst: 'Shiny & New!',
    oldestFirst: 'Dusty relics!',
    postsCount: (n) => `Caught ${n} wild pieces!`,
    noPosts: 'Oops, nothing here yet ( ´･･)ﾉ(._.`)',
    readMore: 'Dive in ✧',

    backToBlog: '⟵ Sneak back',
    minRead: (n) => `~${n} min AFK`,

    aboutTitle: 'About Meow 🐾',
    aboutIntro: 'Aloha! I am buguibgib (≧◡≦)',
    aboutContent: [
      "I'm buguibgib, a human who enjoys tinkering with code and splashing pixels 💻🎨",
      'This little corner of the internet is my secret base to drop brain dumps, learned lessons, and sparkly moments.',
      'If you find something fun, feel free to stick around and grab a cup of tea 🍵'
    ],

    contactTitle: 'Catch Me! 🎈',
    contactIntro: 'Wanna play or just say hi? Follow the glowing internet cables ~ (¬‿¬ )',
    emailLabel: 'Drop a note',
    githubLabel: 'Open Sourcery',

    footerCopyright: '© 2026 buguibgib ʕ•ᴥ•ʔ',
    footerPoweredBy: 'Powered by React + Love 💖',

    categoryTech: 'Cyberspace 👾',
    categoryLife: 'Earthling 🌍',
    categoryDesign: 'Pixel Magic 🎨',
    categoryThoughts: 'Shower Thoughts 💭',
  },
};

export const CATEGORIES: Record<Language, Record<string, string>> = {
  zh: {
    tech: '赛博空间 👾',
    life: '地球生活 🌍',
    design: '像素魔法 🎨',
    thoughts: '脑洞大开 💭',
  },
  en: {
    tech: 'Cyberspace 👾',
    life: 'Earthling 🌍',
    design: 'Pixel Magic 🎨',
    thoughts: 'Shower Thoughts 💭',
  },
};
