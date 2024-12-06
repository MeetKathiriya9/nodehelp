export interface Tutorial {
  id: string;
  title: string;
  summary: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readingTime: number;
  category: string;
  content: string;
}

export const tutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Getting Started with Express.js',
    summary: 'Learn the basics of Express.js and build your first REST API',
    difficulty: 'Beginner',
    readingTime: 15,
    category: 'Backend',
    content: '# Getting Started with Express.js\n\nExpress.js is a minimal and flexible Node.js web application framework...'
  },
  {
    id: '2',
    title: 'MongoDB Aggregation Pipeline',
    summary: 'Master complex data aggregations in MongoDB',
    difficulty: 'Advanced',
    readingTime: 25,
    category: 'Database',
    content: '# MongoDB Aggregation Pipeline\n\nLearn how to use MongoDB\'s powerful aggregation framework...'
  },
  {
    id: '3',
    title: 'JWT Authentication in Node.js',
    summary: 'Implement secure authentication using JSON Web Tokens',
    difficulty: 'Intermediate',
    readingTime: 20,
    category: 'Security',
    content: '# JWT Authentication\n\nJSON Web Tokens provide a secure way to handle authentication...'
  }
];