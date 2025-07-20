// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react'; // Impor useEffect
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
import { Loader2, Sparkles, User, Brain, Code } from 'lucide-react';

export default function Home() {
  const [startupName, setStartupName] = useState('');
  const [selectedPersona, setSelectedPersona] = useState('skeptical-vc');
  const [mounted, setMounted] = useState(false); // State baru untuk melacak apakah komponen sudah mounted di klien

  // Effect hook untuk menandai komponen sebagai mounted setelah render pertama di klien
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useCompletion({
    api: '/api/analyze',
    body: {
      startupName: startupName,
      selectedPersona: selectedPersona,
    },
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-background dark p-4 sm:p-8">
      <div className="w-full max-w-5xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Startup Idea Forge
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Harnessing AI to refine your entrepreneurial vision.
          </p>
        </header>

        <Card className="w-full bg-gradient-to-br from-card to-card/70 border border-border/50 shadow-lg shadow-primary/10 transition-all duration-300 hover:shadow-primary/20">
          <form onSubmit={handleSubmit}>
            <CardHeader className="border-b border-border/30 pb-6">
              <CardTitle className="text-2xl font-bold text-foreground">Ignite Your Idea</CardTitle>
              <CardDescription className="text-muted-foreground">
                Unleash the full potential of your "next big thing" with AI-powered insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="startup-name">Startup Name</Label>
                {/* Render Input hanya jika komponen sudah mounted di klien */}
                {mounted ? (
                  <Input
                    id="startup-name"
                    placeholder='e.g., &quot;Quantum Leap Innovations&quot;'
                    value={startupName}
                    onChange={(e) => setStartupName(e.target.value)}
                    required
                    className="bg-input/50 border-primary/20 focus-visible:border-primary/50"
                  />
                ) : (
                  // Placeholder untuk menghindari error hidrasi di server
                  <input
                    id="startup-name"
                    placeholder='e.g., "Quantum Leap Innovations"'
                    required
                    className="bg-input/50 border-primary/20 focus-visible:border-primary/50"
                    disabled // Menonaktifkan input sementara
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="startup-description">Description</Label>
                {/* Render Textarea hanya jika komponen sudah mounted di klien */}
                {mounted ? (
                  <Textarea
                    id="startup-description"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Elaborate on your groundbreaking idea, target demographic, revolutionary business model, and competitive edge."
                    className="min-h-[180px] bg-input/50 border-primary/20 focus-visible:border-primary/50"
                    required
                  />
                ) : (
                  // Placeholder untuk menghindari error hidrasi di server
                  <textarea
                    id="startup-description"
                    placeholder="Elaborate on your groundbreaking idea, target demographic, revolutionary business model, and competitive edge."
                    className="min-h-[180px] bg-input/50 border-primary/20 focus-visible:border-primary/50"
                    disabled // Menonaktifkan textarea sementara
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label>Choose AI Analyst Persona</Label>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    type="button"
                    variant={selectedPersona === 'skeptical-vc' ? 'default' : 'outline'}
                    onClick={() => setSelectedPersona('skeptical-vc')}
                    className="flex-1 min-w-0 py-2 sm:py-3 transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Skeptical VC
                  </Button>
                  <Button
                    type="button"
                    variant={selectedPersona === 'tech-enthusiast' ? 'default' : 'outline'}
                    onClick={() => setSelectedPersona('tech-enthusiast')}
                    className="flex-1 min-w-0 py-2 sm:py-3 transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    <Brain className="mr-2 h-4 w-4" />
                    Tech Enthusiast
                  </Button>
                  <Button
                    type="button"
                    variant={selectedPersona === 'hackathon-judge' ? 'default' : 'outline'}
                    onClick={() => setSelectedPersona('hackathon-judge')}
                    className="flex-1 min-w-0 py-2 sm:py-3 transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Hackathon Judge
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/30 pt-6">
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 ease-in-out transform hover:scale-[1.01]"
                disabled={isLoading || !startupName || !input}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Brilliance...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Unveil Analysis
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {completion && (
          <Card className="w-full bg-gradient-to-br from-background to-card/50 border border-border/50 shadow-lg shadow-purple-500/10">
            <CardHeader className="border-b border-border/30 pb-6">
              <CardTitle className="text-2xl font-bold text-foreground">AI-Powered Insights</CardTitle>
              <CardDescription className="text-muted-foreground">
                A deep dive into your idea from the selected perspective.
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-full"> {/* Perhatikan perubahan di sini */}
              {/* Menampilkan hasil analisis dalam format HTML setelah dikonversi dari Markdown. */}
              <div
                className="max-w-full overflow-x-auto" // Tambahkan kelas ini
                dangerouslySetInnerHTML={{ __html: marked.parse(completion) as string }}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}