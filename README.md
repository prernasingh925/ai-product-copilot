# AI Product Copilot

A simple AI-powered web application designed for Product Managers, Startup Founders, and Consultants. 
Convert raw product ideas into structured Product Requirements Documents (PRDs), MVP scopes, roadmaps, and success metrics instantly.

## Architecture Overview

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Icons:** Lucide React
- **Markdown Parsing:** React Markdown
- **AI Integration:** Google Gemini API (`gemini-2.5-flash` model)

The app consists of a clean, two-panel dashboard.
1. **Left Panel (`InputPanel.tsx`):** Captures the Product Idea, Target Users, and Industry.
2. **Right Panel (`OutputPanel.tsx`):** Parses the AI-generated Markdown and displays it in copyable, structured cards.
3. **API Route (`/api/generate/route.ts`):** Securely communicates with the Gemini API from the backend.

## Prerequisites

- Node.js 18+
- A Google Gemini API Key

## Setup Instructions

1. **Clone/Download the repository**
2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`
3. **Environment Setup:**
   Create a `.env.local` file in the root directory and add your Gemini API key:
   \`\`\`env
   GEMINI_API_KEY="your_actual_api_key_here"
   \`\`\`
4. **Run the Development Server:**
   \`\`\`bash
   npm run dev
   \`\`\`
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- **Auto-Suggestions:** Click on inspiration ideas to auto-fill the form.
- **Copy to Clipboard:** Copy individual sections of the generated PRD.
- **Export to MD:** Download the entire generated product plan as a Markdown file.
