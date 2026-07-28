import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Globe, 
  ExternalLink, 
  RefreshCw, 
  Zap, 
  Search
} from 'lucide-react';

interface IntelligenceDigestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntelligenceDigestModal: React.FC<IntelligenceDigestModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [topicQuery, setTopicQuery] = useState<string>('LLM Indirect Prompt Injections & EU AI Act Enforcement 2026');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [digestData, setDigestData] = useState<any>(null);

  const handleFetchDigest = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai-intel/news-digest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: topicQuery,
          category: 'All Categories'
        })
      });
      const data = await res.json();
      setDigestData(data);
    } catch (err) {
      console.error('Digest fetch failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0A0A0B] border border-white/10 max-w-3xl w-full p-8 shadow-2xl relative space-y-6 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-2 text-white/40 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 block font-bold">
            REAL-TIME INTEL BRIEFING // GOOGLE SEARCH GROUNDED
          </span>
          <h2 className="text-2xl font-serif italic text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            Live AI Threat Intelligence Briefing
          </h2>
          <p className="text-xs text-white/60">
            Synthesize real-time industry alerts, CVE reports, regulatory enforcement notices, and privacy disclosures using Gemini.
          </p>
        </div>

        {/* Query Input */}
        <div className="space-y-2 bg-black p-4 border border-white/10">
          <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 block font-bold">
            Threat Intelligence Search Topic:
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={topicQuery}
                onChange={(e) => setTopicQuery(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-white/15 pl-9 pr-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-white transition"
                placeholder="e.g. Prompt injection in agentic frameworks 2026..."
              />
            </div>

            <button
              onClick={handleFetchDigest}
              disabled={isLoading}
              className="flex items-center justify-center space-x-2 px-5 py-2 bg-white text-black hover:bg-white/80 text-[10px] font-mono uppercase tracking-[0.2em] font-bold transition disabled:opacity-50 whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  <span>Generate Briefing</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Digest Output */}
        {digestData ? (
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
            <div className="p-5 border border-white/10 bg-black/60 text-xs text-white/80 leading-relaxed font-mono">
              <div className="prose prose-invert max-w-none text-xs text-white/80 whitespace-pre-line leading-relaxed">
                {digestData.summary}
              </div>
            </div>

            {/* Grounded Citation Sources */}
            {digestData.groundingSources && digestData.groundingSources.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-white/10 font-mono">
                <span className="text-[10px] uppercase tracking-widest text-white/40 flex items-center gap-1.5 font-bold">
                  <Globe className="w-3.5 h-3.5 text-pink-400" />
                  Grounded News & Security References:
                </span>
                <div className="flex flex-wrap gap-2">
                  {digestData.groundingSources.map((source: any, idx: number) => (
                    <a
                      key={idx}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 border border-white/15 hover:border-white text-white/70 hover:text-white text-[10px] flex items-center gap-1 transition"
                    >
                      <span>{source.title || source.uri}</span>
                      <ExternalLink className="w-3 h-3 text-pink-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center bg-black/40 border border-white/10 space-y-2 font-mono">
            <Sparkles className="w-6 h-6 text-pink-400 mx-auto animate-pulse" />
            <p className="text-xs text-white/50">
              Click "Generate Briefing" to run Gemini search grounding across global security sources and regulatory filings.
            </p>
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex items-center justify-end pt-2 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/15 hover:border-white text-white text-[10px] font-mono uppercase tracking-widest font-bold transition"
          >
            Close Briefing
          </button>
        </div>
      </div>
    </div>
  );
};
