export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  category: string;
  replies: number;
  views: number;
  votes: number;
}

export const forumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'How to handle authentication in Express.js?',
    content: 'I\'m building a REST API and need help implementing user authentication...',
    author: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    date: '2024-03-15T10:00:00Z',
    category: 'Authentication',
    replies: 5,
    views: 120,
    votes: 8
  },
  {
    id: '2',
    title: 'Best practices for MongoDB indexes',
    content: 'What are the recommended approaches for indexing in MongoDB?',
    author: {
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
    },
    date: '2024-03-14T15:30:00Z',
    category: 'Database',
    replies: 3,
    views: 85,
    votes: 6
  }
];