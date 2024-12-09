
"use client";

import Link from 'next/link';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { BookOpen, Code, MessageSquare } from 'lucide-react';
import { Badge } from "./components/ui/badge";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import API_URL from './components/apiConfig';
import { useTheme } from 'next-themes';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // Ensures animations run on reload
    });
  }, []);

  const [tutorials, setTutorials] = useState([]);
  const { resolvedTheme } = useTheme();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const TutorialRes = await fetch(`${API_URL}/featured`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!TutorialRes.ok) {
          console.error('Error Status:', TutorialRes.status);
          throw new Error("Failed to fetch tutorials");
        }
        const TutorialData = await TutorialRes.json();
        setTutorials(TutorialData.data || []);

      } catch (err) {
        console.error(err); // Log the error for debugging
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16" data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="1000">
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
      <section className="grid md:grid-cols-3 gap-8 py-16" data-aos="fade-up">
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
      <section className="py-16" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-8">Featured Tutorials</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <Card key={tutorial._id} className={`h-full hover:shadow-lg transition-shadow border ${resolvedTheme == "dark" ? "border-gray-600" : ""} `}>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{tutorial.difficulty.name}</Badge>
                </div>
                <CardTitle className="mb-2">{tutorial.title}</CardTitle>
                <CardDescription className=" line-clamp-1">{tutorial.description}</CardDescription>
                <div className="mt-4">
                  <Badge  variant="outline" className={`${resolvedTheme == "dark" ? "border-gray-600" : ""}`}>{tutorial.category.name}</Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
