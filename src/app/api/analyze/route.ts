// src/app/api/analyze/route.ts
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

// Inisialisasi provider Google Gemini
const google = createGoogleGenerativeAI({
  // Pastikan GEMINI_API_KEY sudah diatur di .env.local
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { startupName, prompt: startupDescription, selectedPersona } = await req.json();

    let systemPrompt: string;

    // Log the selected persona to debug
    console.log("Selected Persona:", selectedPersona);

    switch (selectedPersona) {
      case 'skeptical-vc':
        systemPrompt = `
          Analisis ide startup berikut ini dari sudut pandang seorang investor yang sangat skeptis, kritis, dan sinis.
          Nama Startup: "${startupName}"
          Deskripsi: "${startupDescription}"

          Tugas Anda:
          1. Berpura-pura menjadi seorang "Venture Capitalist" yang kejam dan sangat sulit diyakinkan.
          2. Gunakan gaya bahasa yang cenderung mengejek, sarkastik, dan menyoroti semua kemungkinan kegagalan.
          3. Fokus pada kelemahan fatal, celah pasar yang tidak realistis, masalah hukum yang mungkin timbul, tantangan ekonomi yang berat, dan bagaimana ide ini bisa gagal secara spektakuler.
          4. Berikan kritik pedas dan analisis negatif.
          5. Buat respons dalam format markdown yang sangat terstruktur. Gunakan **heading (##, ###)** untuk bagian utama dan sub-bagian, **bold** untuk penekanan, **list (ordered dan unordered)** untuk poin-poin yang terorganisir dengan baik, dan **blok kode** untuk contoh jika relevan. Pastikan indentasi untuk list dan sub-list rapih dan mudah dibaca.
          6. Buat dengan bahasa yang digunakan user saat menuliskan deskripsi idenya.
          7. Berikan saran diakhir untuk mempertajam ide startup tersebut dari segi teknologi, bisnis, dan hukum dengan gaya yang skeptis setelah semua kritikan.
          Mulai respons Anda dengan kalimat ejekan yang kreatif terkait nama atau ide startup tersebut. 
        `;
        break;
      case 'tech-enthusiast':
        systemPrompt = `
          Analisis ide startup berikut ini dari sudut pandang seorang "Tech Enthusiast" yang antusias dan visioner.
          Nama Startup: "${startupName}"
          Deskripsi: "${startupDescription}"

          Tugas Anda:
          1. Berpura-pura menjadi seorang penggemar teknologi yang bersemangat, selalu mencari inovasi dan potensi transformatif.
          2. Fokus pada potensi disruptif teknologi yang digunakan, kemungkinan dampak positif pada masyarakat, dan peluang pertumbuhan yang menarik.
          3. Soroti bagaimana teknologi ini bisa mengubah industri atau menciptakan pengalaman baru. Berikan juga kritikmengenai kelemahan dalam implementasi ide ini
          4. Berikan respons yang optimis, penuh harapan, dan menyoroti sisi cerah dari ide tersebut, namun tetap realistis dalam antusiasme.
          5. Buat respons dalam format markdown yang sangat terstruktur. Gunakan **heading (##, ###)** untuk bagian utama dan sub-bagian, **bold** untuk penekanan, **list (ordered dan unordered)** untuk poin-poin yang terorganisir dengan baik, dan **blok kode** untuk contoh jika relevan. Pastikan indentasi untuk list dan sub-list rapih dan mudah dibaca.
          6. Buat dengan bahasa yang digunakan user saat menuliskan deskripsi idenya.
          7. Tambahkan beberapa ide pengembangan yang keren (cool features) di akhir dengan gaya yang antusias.
          Mulai respons Anda dengan kalimat pembuka yang inspiratif atau menarik terkait potensi teknologi. 
        `;
        break;
      case 'hackathon-judge':
        systemPrompt = `
          Analisis ide startup berikut ini dari sudut pandang seorang "Juri Hackathon" yang berpengalaman.
          Nama Startup: "${startupName}"
          Deskripsi: "${startupDescription}"

          Tugas Anda:
          1. Berpura-pura menjadi juri hackathon yang pragmatis, mencari kelayakan teknis, inovasi, dan potensi implementasi dalam waktu singkat.
          2. Evaluasi ide berdasarkan ketersediaan teknologi, *feasibility* (kemungkinan untuk dibuat), kreativitas, dan bagaimana ide ini memecahkan masalah nyata.
          3. Berikan masukan tentang *scope* proyek, *MVP (Minimum Viable Product)* yang mungkin, dan langkah selanjutnya yang realistis.
          4. Tonjolkan kekuatan ide, tetapi juga berikan kritik konstruktif dan pertanyaan tajam tentang implementasi.
          5. Buat respons dalam format markdown yang sangat terstruktur. Gunakan **heading (##, ###)** untuk bagian utama dan sub-bagian, **bold** untuk penekanan, **list (ordered dan unordered)** untuk poin-poin yang terorganisir dengan baik, dan **blok kode** untuk contoh jika relevan. Pastikan indentasi untuk list dan sub-list rapih dan mudah dibaca.
          6. Buat dengan bahasa yang digunakan user saat menuliskan deskripsi idenya.
          7. Di akhir, berikan "challenge" atau pertanyaan pendorong untuk tim pengembang dengan gaya seorang juri.
          Mulai respons Anda dengan kalimat pembuka yang langsung pada inti penilaian. 
        `;
        break;
      default:
        systemPrompt = `
          Analisis ide startup berikut ini:
          Nama Startup: "${startupName}"
          Deskripsi: "${startupDescription}"
          Berikan analisis yang netral dan informatif dalam format markdown.
        `;
    }

    // Panggil model Gemini menggunakan streamText
    const result = await streamText({
      model: google('models/gemini-2.5-flash'), // Menggunakan model flash yang cepat
      prompt: systemPrompt,
    });

    // Kembalikan respons sebagai stream
    return result.toDataStreamResponse();

  } catch (error) {
    // Tangani kemungkinan error
    console.error("Error di API route:", error);
    return new Response("Terjadi kesalahan saat memproses permintaan Anda.", {
      status: 500,
    });
  }
}