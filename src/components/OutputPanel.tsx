import React from 'react';
import ReactMarkdown from 'react-markdown';

// Recursively extract plain text from React children for content-based styling
const getChildText = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(getChildText).join('');
  if (React.isValidElement(children)) return getChildText((children.props as { children?: React.ReactNode }).children);
  return '';
};
import { Copy, FileDown, CheckCircle2, Sparkles } from 'lucide-react';
import { exportToMarkdown } from '@/utils/exportMarkdown';

interface OutputPanelProps {
    content: string | null;
    error: string | null;
    loadingStage: string | null;
}

export default function OutputPanel({ content, error, loadingStage }: OutputPanelProps) {
    const [copiedSection, setCopiedSection] = React.useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedSection(id);
        setTimeout(() => setCopiedSection(null), 2000);
    };

    // Helper to chunk markdown by main headers (##)
    const sections = React.useMemo(() => {
        if (!content) return [];

        // Split by level 2 headings
        const parts = content.split(/(?=## )/);

        return parts.filter(part => part.trim().length > 0).map((part, index) => {
            // Extract the title (first line)
            const lines = part.split('\n');
            const title = lines[0].replace('## ', '').trim();
            const body = lines.slice(1).join('\n').trim();

            return { id: `section-${index}`, title, body, fullText: part };
        });
    }, [content]);

    if (error) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full bg-white rounded-2xl shadow-sm border border-red-100">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Failed to Generate Plan</h3>
                <p className="text-slate-600 max-w-md">{error}</p>
            </div>
        );
    }

    if (loadingStage) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 h-full bg-white rounded-2xl shadow-sm border border-slate-200">
                <div className="relative mb-8">
                    <div className="w-20 h-20 border-4 border-indigo-100 rounded-full"></div>
                    <div className="w-20 h-20 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin-slow absolute top-0 left-0"></div>
                    <Sparkles className="w-8 h-8 text-indigo-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <h3 className="text-xl font-medium text-slate-800 mb-2 animate-pulse">
                    {loadingStage}
                </h3>
                <p className="text-slate-500">This usually takes about 10-15 seconds.</p>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full bg-slate-50/50 rounded-2xl border border-dashed border-slate-300">
                <div className="w-16 h-16 bg-white shadow-sm text-slate-400 rounded-2xl flex items-center justify-center mb-4 rotate-3">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-1">No Output Yet</h3>
                <p className="text-slate-500 max-w-sm">
                    Enter a product idea on the left and click generate to create a detailed product plan.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

            {/* Header bar */}
            <div className="p-4 px-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between sticky top-0 z-10">
                <h2 className="text-lg font-semibold text-slate-800">Generated Product Plan</h2>
                <button
                    onClick={() => exportToMarkdown(content)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                >
                    <FileDown className="w-4 h-4" />
                    Export DOC
                </button>
            </div>

            {/* Content scrollable area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
                {sections.map((section, idx) => (
                    <React.Fragment key={section.id}>
                        {idx > 0 && <hr className="border-slate-200 my-0" />}
                        <div
                            className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                        >
                            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
                                <h3 className="font-semibold text-slate-800 text-lg border-l-4 border-indigo-500 pl-3">
                                    {section.title}
                                </h3>
                                <button
                                    onClick={() => handleCopy(section.fullText, section.id)}
                                    className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all focus:opacity-100"
                                    title="Copy section"
                                >
                                    {copiedSection === section.id ? (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    ) : (
                                        <Copy className="w-5 h-5" />
                                    )}
                                </button>
                            </div>

                            <div className="p-5">
                                <ReactMarkdown
                                    components={{
                                        ul: ({ children }) => (
                                            <ul className="my-3 pl-0 space-y-1">{children}</ul>
                                        ),
                                        li: ({ children }) => {
                                            const text = getChildText(children);
                                            const phaseMatch = text.match(/^Phase\s+(\d)/i);
                                            if (phaseMatch) {
                                                return (
                                                    <li className="flex items-start gap-3 my-2 list-none">
                                                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                                                            {phaseMatch[1]}
                                                        </span>
                                                        <span className="text-slate-600">{children}</span>
                                                    </li>
                                                );
                                            }
                                            return (
                                                <li className="flex items-start gap-2 my-1.5 list-none">
                                                    <span className="mt-2 w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0" />
                                                    <span className="text-slate-600">{children}</span>
                                                </li>
                                            );
                                        },
                                        strong: ({ children }) => {
                                            const text = getChildText(children);
                                            if (text.endsWith(':')) {
                                                return <strong className="text-indigo-600 font-semibold">{children}</strong>;
                                            }
                                            return <strong className="text-slate-800 font-semibold">{children}</strong>;
                                        },
                                        p: ({ children }) => {
                                            const text = getChildText(children);
                                            if (text.toLowerCase().includes('north star')) {
                                                return (
                                                    <div className="bg-indigo-50 border border-indigo-200 border-l-4 border-l-indigo-500 rounded-lg p-4 my-3">
                                                        <p className="text-indigo-800 font-semibold m-0">{children}</p>
                                                    </div>
                                                );
                                            }
                                            return <p className="text-slate-600 leading-relaxed my-2">{children}</p>;
                                        },
                                        h3: ({ children }) => (
                                            <h3 className="text-slate-800 font-semibold text-base mt-5 mb-2">{children}</h3>
                                        ),
                                    }}
                                >
                                    {section.body}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

// Component end
