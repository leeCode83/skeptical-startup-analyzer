// src/app/page.tsx
'use client'; // Menandai komponen ini sebagai Client Component, karena menggunakan Hooks dan interaktivitas.

import { useState } from 'react'; // Hook untuk mengelola state di React.
import { useCompletion } from 'ai/react'; // Hook dari AI SDK untuk berinteraksi dengan API completion.
import { marked } from 'marked'; // Library untuk mengonversi Markdown menjadi HTML.
import { Button } from '@/components/ui/button'; // Mengimpor komponen Button dari UI library.
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'; // Mengimpor komponen Card dari UI library.
import { Input } from '@/components/ui/input'; // Mengimpor komponen Input dari UI library.
import { Label } from '@/components/ui/label'; // Mengimpor komponen Label dari UI library.
import { Textarea } from '@/components/ui/textarea'; // Mengimpor komponen Textarea dari UI library.
import { Loader2, Sparkles, User, Brain, Code } from 'lucide-react'; // Mengimpor ikon dari Lucide React untuk tampilan yang lebih menarik.

export default function Home() {
  // State untuk menyimpan nama startup yang diinput oleh pengguna.
  const [startupName, setStartupName] = useState('');
  // State untuk menyimpan persona analisis yang dipilih pengguna. Default ke 'skeptical-vc'.
  const [selectedPersona, setSelectedPersona] = useState('skeptical-vc');

  // useCompletion hook untuk mengelola interaksi dengan API.
  // api: Menentukan endpoint API yang akan dipanggil.
  // body: Data tambahan yang akan dikirim ke API bersama dengan 'prompt' (startupDescription).
  //       selectedPersona disertakan agar API tahu persona mana yang harus digunakan.
  const {
    completion, // Hasil respons dari API.
    input, // Input teks yang dikelola oleh hook (dalam kasus ini, startupDescription).
    handleInputChange, // Handler untuk memperbarui 'input' saat pengguna mengetik.
    handleSubmit, // Handler untuk mengirimkan formulir.
    isLoading, // Boolean yang menunjukkan apakah permintaan API sedang berlangsung.
  } = useCompletion({
    api: '/api/analyze',
    body: {
      startupName: startupName,
      selectedPersona: selectedPersona,
    },
  });

  return (
    // Kontainer utama halaman dengan gaya latar belakang gelap dan padding responsif.
    <div className="flex flex-col items-center min-h-screen bg-background dark p-4 sm:p-8">
      {/* Kontainer untuk konten utama dengan lebar maksimum dan jarak antar elemen vertikal. */}
      <div className="w-full max-w-3xl space-y-8">
        {/* Header halaman dengan judul dan deskripsi yang menarik. */}
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Startup Idea Forge
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Harnessing AI to refine your entrepreneurial vision.
          </p>
        </header>

        {/* Card untuk input ide startup. Disesuaikan untuk tampilan tech-savvy. */}
        <Card className="w-full bg-gradient-to-br from-card to-card/70 border border-border/50 shadow-lg shadow-primary/10 transition-all duration-300 hover:shadow-primary/20">
          <form onSubmit={handleSubmit}>
            <CardHeader className="border-b border-border/30 pb-6">
              <CardTitle className="text-2xl font-bold text-foreground">Ignite Your Idea</CardTitle>
              <CardDescription className="text-muted-foreground">
                Unleash the full potential of your "next big thing" with AI-powered insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Input untuk nama startup */}
              <div className="space-y-2">
                <Label htmlFor="startup-name">Startup Name</Label>
                <Input
                  id="startup-name"
                  placeholder='e.g., "Quantum Leap Innovations"'
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  required
                  className="bg-input/50 border-primary/20 focus-visible:border-primary/50"
                />
              </div>
              {/* Textarea untuk deskripsi startup */}
              <div className="space-y-2">
                <Label htmlFor="startup-description">Description</Label>
                <Textarea
                  id="startup-description"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Elaborate on your groundbreaking idea, target demographic, revolutionary business model, and competitive edge."
                  className="min-h-[180px] bg-input/50 border-primary/20 focus-visible:border-primary/50"
                  required
                />
              </div>
              {/* Pilihan Persona (berjajar ke samping) */}
              <div className="space-y-2">
                <Label>Choose AI Analyst Persona</Label>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    type="button" // Penting: type="button" agar tidak mensubmit form.
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
              {/* Tombol submit dengan indikator loading. */}
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

        {/* Card untuk menampilkan hasil analisis jika sudah ada. */}
        {completion && (
          <Card className="w-full bg-gradient-to-br from-background to-card/50 border border-border/50 shadow-lg shadow-purple-500/10">
            <CardHeader className="border-b border-border/30 pb-6">
              <CardTitle className="text-2xl font-bold text-foreground">AI-Powered Insights</CardTitle>
              <CardDescription className="text-muted-foreground">
                A deep dive into your idea from the selected perspective.
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none pt-6">
              {/* Menampilkan hasil analisis dalam format HTML setelah dikonversi dari Markdown. */}
              <div dangerouslySetInnerHTML={{ __html: marked.parse(completion) as string }} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}