"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from "next-themes";


export function CodeSnippetCard({ snippet }) {
  const copyCode = () => {
    navigator.clipboard.writeText(snippet.code);
  };

  const { resolvedTheme } = useTheme();
  const syntaxHighlighterStyle = resolvedTheme === "dark" ? tomorrow : coy;


  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="mb-2">{snippet.title}</CardTitle>
          <Button variant="ghost" size="icon" onClick={copyCode}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>{snippet.description}</CardDescription>
        <div className="flex flex-wrap gap-2 mt-2">
          {snippet.keywords.map((tag) => (
            <Badge key={tag._id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md overflow-hidden">
          <SyntaxHighlighter
            language="javascript"
            style={syntaxHighlighterStyle}
            customStyle={{
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 0,
              borderRadius: '0.375rem',
              fontSize: '1rem',
              lineHeight: 1.5,
              padding: resolvedTheme == "dark" ? '1em' : "0.7em 0em 0.6em",
              overflow: 'auto',
              boxSizing: 'border-box',
              background: resolvedTheme === 'light' ? 'rgb(253, 253, 253)' : undefined,

            }}
          >
            {snippet.codeSnippet}
          </SyntaxHighlighter>
        </div>
      </CardContent>
    </Card>
  );
}
