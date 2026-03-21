import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';

interface InputPanelProps {
    onGenerate: (data: { idea: string; audience: string; industry: string }) => void;
    isLoading: boolean;
}

const EXAMPLES = [
    "AI tool to analyze telecom network alarms and identify root cause",
    "A SaaS platform that automates invoice processing for small businesses",
    "A mobile app that helps users track their carbon footprint",
];

export default function InputPanel({ onGenerate, isLoading }: InputPanelProps) {
    const [idea, setIdea] = useState("");
    const [audience, setAudience] = useState("");
    const [industry, setIndustry] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!idea.trim()) return;
        onGenerate({ idea, audience, industry });
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    Product Compass
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                    Describe your idea in plain english and let AI do the rest.
                </p>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Idea Input */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">
                            Product Idea <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            required
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            placeholder='e.g., "AI tool to analyze telecom network alarms and identify root cause"'
                            className="w-full min-h-[160px] p-4 text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none shadow-inner"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Target Users */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">
                                Target Users
                            </label>
                            <input
                                type="text"
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                                placeholder="e.g., Telecom Engineers"
                                className="w-full p-3 text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                        </div>

                        {/* Industry */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700">
                                Industry
                            </label>
                            <input
                                type="text"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                placeholder="e.g., Telecommunications"
                                className="w-full p-3 text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Examples */}
                    <div className="space-y-3 pt-4 border-t border-slate-100">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Need Inspiration?</p>
                        <div className="flex flex-col gap-2">
                            {EXAMPLES.map((example, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setIdea(example)}
                                    className="text-left text-sm p-3 rounded-lg border border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-600 hover:text-indigo-700 transition-all"
                                >
                                    {example}
                                </button>
                            ))}
                        </div>
                    </div>
                </form>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <button
                    onClick={handleSubmit}
                    disabled={isLoading || !idea.trim()}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Analyzing Idea...</span>
                        </div>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            <span>Generate Product Plan</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
