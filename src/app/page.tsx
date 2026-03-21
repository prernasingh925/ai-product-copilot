"use client";

import { useState } from "react";
import InputPanel from "@/components/InputPanel";
import OutputPanel from "@/components/OutputPanel";

export default function Home() {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingStage, setLoadingStage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const simulateProgress = () => {
    const stages = [
      "Understanding the product idea...",
      "Writing PRD...",
      "Designing MVP Scope...",
      "Generating Success Metrics...",
      "Structuring Development Roadmap..."
    ];

    let currentStage = 0;
    setLoadingStage(stages[0]);

    // Switch stages roughly every 2 seconds
    const interval = setInterval(() => {
      currentStage++;
      if (currentStage < stages.length) {
        setLoadingStage(stages[currentStage]);
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return interval;
  };

  const handleGenerate = async (data: { idea: string; audience: string; industry: string }) => {
    setIsLoading(true);
    setError(null);
    setContent(null);

    const progressInterval = simulateProgress();

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || json.details || 'Something went wrong');
      }

      // Add a small artificial delay if the API was too fast, 
      // just so the user sees a bit of the generating states.
      setTimeout(() => {
        clearInterval(progressInterval);
        setLoadingStage(null);
        setContent(json.result);
        setIsLoading(false);
      }, 1500);

    } catch (err: any) {
      clearInterval(progressInterval);
      setLoadingStage(null);
      setError(err.message || 'Failed to connect to the server');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">
              AI
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
              Product Copilot
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
            <span className="hidden sm:inline-block">Built for Product Managers</span>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-6">

        {/* Left Panel - Input */}
        <section className="w-full md:w-[45%] lg:w-[40%] flex-shrink-0 flex flex-col h-full min-h-[500px]">
          <InputPanel onGenerate={handleGenerate} isLoading={isLoading} />
        </section>

        {/* Right Panel - Output */}
        <section className="w-full md:w-[55%] lg:w-[60%] flex-col h-full flex min-h-[600px]">
          <OutputPanel content={content} error={error} loadingStage={loadingStage} />
        </section>

      </main>

    </div>
  );
}
