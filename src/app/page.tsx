'use client';

import { useState } from 'react';
import { useCompletion } from 'ai/react';
import { marked } from 'marked';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';

export default function Home() {
  const [startupName, setStartupName] = useState('');

  // 'input' dari useCompletion akan digunakan untuk startupDescription
  const {
    completion,
    input, 
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useCompletion({
    api: '/api/analyze',
    // The `input` from this hook (which is the startup description)
    // will be sent as `prompt` in the request body by default.
    // We only need to send `startupName` as additional data.
    body: {
      startupName: startupName, // Ensure `startupName` is defined in your component's state
    },
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-background dark p-4 sm:p-8">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            How Good is Your Startup?
          </h1>
          <p className="text-muted-foreground mt-2">
            Let our skeptical AI crush your dreams before the market does.
          </p>
        </header>

        <Card className="w-full">
          {/* 2. Gunakan handleSubmit langsung dari hook */}
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Validate Your Idea</CardTitle>
              <CardDescription>
                Tell us about your "next big thing". Be as detailed as you can.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="startup-name">Startup Name</Label>
                <Input
                  id="startup-name"
                  placeholder='e.g., "SoulBean Ledger"'
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startup-description">Description</Label>
                <Textarea
                  id="startup-description"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Describe your startup idea, target market, business model, etc."
                  className="min-h-[150px]"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading || !startupName || !input}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Crush My Idea
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {completion && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Skeptical Analysis</CardTitle>
              <CardDescription>
                Here's why your idea is probably doomed to fail.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-slate dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: marked.parse(completion) as string }}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}