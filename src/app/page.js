import Link from 'next/link';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { BookOpen, Code, MessageSquare } from 'lucide-react';
import { tutorials } from '../lib/data/tutorials';

export default function Home() {
  const featuredTutorials = tutorials.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Master Backend Development
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Learn Express.js, MongoDB, and Node.js through interactive tutorials,
          code examples, and real-world projects.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/tutorials">Start Learning</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/code-library">Browse Code</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 py-16">
        <Card>
          <CardHeader>
            <BookOpen className="h-12 w-12 mb-4 text-primary" />
            <CardTitle>Interactive Tutorials</CardTitle>
            <CardDescription>
              Step-by-step guides with practical examples and exercises
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Code className="h-12 w-12 mb-4 text-primary" />
            <CardTitle>Code Library</CardTitle>
            <CardDescription>
              Ready-to-use code snippets and example projects
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <MessageSquare className="h-12 w-12 mb-4 text-primary" />
            <CardTitle>Community Forum</CardTitle>
            <CardDescription>
              Connect with other developers and get help
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* Featured Tutorials */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Tutorials</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredTutorials.map((tutorial) => (
            <Card key={tutorial.id}>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm px-2 py-1 rounded-full bg-primary/10">
                    {tutorial.difficulty}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {tutorial.readingTime} min read
                  </span>
                </div>
                <CardTitle className="mb-2">{tutorial.title}</CardTitle>
                <CardDescription>{tutorial.summary}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
