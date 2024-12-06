export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  category: string;
  tags: string[];
}

export const codeSnippets: CodeSnippet[] = [
  {
    id: '1',
    title: 'Basic Express.js Server',
    description: 'A simple Express.js server setup with error handling',
    code: `const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    language: 'javascript',
    category: 'Backend',
    tags: ['express', 'nodejs', 'server']
  },
  {
    id: '2',
    title: 'MongoDB Connection',
    description: 'Connect to MongoDB with proper error handling',
    code: `const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));`,
    language: 'javascript',
    category: 'Database',
    tags: ['mongodb', 'mongoose', 'database']
  }
];