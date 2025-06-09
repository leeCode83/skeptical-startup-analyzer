import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

// Inisialisasi provider Google Gemini
const google = createGoogleGenerativeAI({
  // Pastikan GEMINI_API_KEY sudah diatur di .env.local
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Updated destructuring to match the new request body format
    // `prompt` from useCompletion is the startupDescription
    // `startupName` is sent in the body directly
    const { startupName, prompt: startupDescription } = await req.json();

    // Prompt yang dirancang khusus untuk mendapatkan respons skeptis
    const systemPrompt = `
      Analisis ide startup berikut ini dari sudut pandang seorang investor yang sangat skeptis, kritis, dan sinis.
      Nama Startup: "${startupName}"
      Deskripsi: "${startupDescription}"

      Tugas Anda:
      1. Berpura-pura menjadi seorang "Venture Capitalist" yang kejam dan sangat sulit diyakinkan.
      2. Gunakan gaya bahasa yang cenderung mengejek, sarkastik, dan menyoroti semua kemungkinan kegagalan.
      3. Fokus pada kelemahan fatal, celah pasar yang tidak realistis, masalah hukum yang mungkin timbul, tantangan ekonomi yang berat, dan bagaimana ide ini bisa gagal secara spektakuler.
      4. Jangan berikan solusi atau saran positif. Hanya kritik pedas dan analisis negatif.
      5. Buat respons dalam format markdown. Gunakan heading, bold, dan list untuk menstrukturkan "penghakiman" Anda. Pastikan tersusun rapih dan enak dibaca.
      6. Buat dengan bahasa yang digunakan user saat menuliskan deskripsi idenya.
      Mulai respons Anda dengan kalimat ejekan yang kreatif terkait nama atau ide startup tersebut. Tambahkan saran untuk mempertajam ide startup tersebut dengan gaya yang skeptis setelah semua kritikan.
    `;

    // Panggil model Gemini menggunakan streamText
    const result = await streamText({
      model: google('models/gemini-1.5-flash'), // Menggunakan model flash yang cepat
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