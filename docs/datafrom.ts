
interface Article {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string; // ISO 字符串，例如 "2025-07-14T10:00:00Z"
  author: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: '第一篇文章',
    content: '这是第一篇文章的内容。',
    tags: ['Notion', 'Vue3'],
    createdAt: '2025-07-14T10:00:00Z',
    author: 'Eafen',
  },
  {
    id: '2',
    title: '第二篇文章',
    content: '这是第二篇文章的内容。',
    tags: ['TypeScript', 'Netlify'],
    createdAt: '2025-07-13T15:20:00Z',
    author: 'Eafen',
  },
];
