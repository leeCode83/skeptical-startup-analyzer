# Skeptical Startup Analyzer

This project, "Startup Idea Forge," is a Next.js application designed to help entrepreneurs refine their startup ideas by analyzing them from different AI-powered perspectives. It leverages the power of Artificial Intelligence to provide critical, enthusiastic, or pragmatic feedback on a given startup concept.

-----

## 🚀 Features

  * **Multi-Persona AI Analysis**: Get your startup idea evaluated by three distinct AI personas:
      * **Skeptical VC**: Receives harsh, cynical feedback, highlighting potential fatal flaws and market unrealisticities.
      * **Tech Enthusiast**: Provides optimistic and visionary insights, focusing on disruptive potential and positive societal impact.
      * **Hackathon Judge**: Offers pragmatic critique on technical feasibility, innovation, and realistic next steps.
  * **Dynamic Input Form**: Easily input your startup name and a detailed description of your idea.
  * **Markdown-Formatted Output**: AI-generated analysis is presented in a well-structured and readable Markdown format, including headings, bold text, lists, and code blocks where relevant.
  * **Responsive UI**: The application features a modern and responsive user interface built with Tailwind CSS and Shadcn UI components.

-----

## 🛠️ Technology Stack

This project is built with the following technologies:

  * **Next.js 15.3.3**: A React framework for building full-stack web applications.
  * **React 19.1.0**: A JavaScript library for building user interfaces.
  * **Tailwind CSS 4.1.8**: A utility-first CSS framework for rapid UI development.
  * **Shadcn UI**: A collection of re-usable components built with Radix UI and Tailwind CSS.
  * **AI SDK (Vercel) with Google Gemini**: For AI-powered text generation and analysis. Specifically uses `createGoogleGenerativeAI` and `streamText` from `@ai-sdk/google` and `ai/react`.
  * **Marked.js 15.0.12**: A markdown parser and compiler, used for rendering the AI analysis.
  * **Lucide React 0.513.0**: A collection of open-source icons.

-----

## ⚙️ Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

  * Node.js (\>=18.18.0)
  * npm, Yarn, pnpm, or Bun

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/leecode83/skeptical-startup-analyzer.git
    cd skeptical-startup-analyzer
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Set up Google Gemini API Key**:
    Create a `.env.local` file in the root of your project and add your Google Gemini API key:

    ```
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result. The page will auto-update as you edit the files.

### Building for Production

To build the application for production, run:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

This will create an optimized build of your application in the `.next` directory.

### Starting the Production Server

To run the built application in production mode, use:

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

-----

## 📚 Learn More

To delve deeper into Next.js and its capabilities, check out these resources:

  * [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
  * [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

Your feedback and contributions are always welcome\! You can explore the Next.js GitHub repository for more details:
[https://github.com/vercel/next.js](https://github.com/vercel/next.js)

-----

## 🚀 Deployment

The simplest way to deploy your Next.js application is by using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), provided by the creators of Next.js.

For more deployment options and details, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).