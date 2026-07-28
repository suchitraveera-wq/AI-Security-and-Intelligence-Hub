import React, { useState } from 'react';
import { 
  MessageSquareHeart, 
  Quote, 
  Sparkles, 
  Search, 
  RefreshCw,
  BarChart2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { SentimentTopic, SentimentTrendPoint } from '../types';

interface PublicSentimentViewProps {
  topics: SentimentTopic[];
  trends: SentimentTrendPoint[];
}

export const PublicSentimentView: React.FC<PublicSentimentViewProps> = ({ topics, trends }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customSearchQuery, setCustomSearchQuery] = useState<string>('Public opinion on AI agent safety and prompt injection risks');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [liveSentimentResult, setLiveSentimentResult] = useState<any>(null);

  const filteredTopics = topics.filter(t => {
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    return true;
  });

  const handleRunSentimentAnalysis = async () => {
    setIsAnalyzing(true);
    setLiveSentimentResult(null);

    try {
      const res = await fetch('/api/ai-intel/news-digest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `Public sentiment, media perceptions, developer concerns, and user trust regarding: ${customSearchQuery}`,
          category: 'sentiment'
        })
      });
      const data = await res.json();
      setLiveSentimentResult(data);
    } catch (err) {
      console.error('Sentiment analysis failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* View Title Bar */}
      <div className="bg-white/[0.02] border border-white/10 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-pink-400 font-mono block font-bold mb-1">
              PUBLIC KNOWLEDGE BASE // CATEGORY 05: PUBLIC & MEDIA SENTIMENT OBSERVATORY
            </span>
            <h1 className="text-3xl font-serif italic text-white">Public, Media & Developer Sentiment Index</h1>
            <p className="text-xs text-white/70 mt-1 max-w-2xl font-mono leading-relaxed">
              Public sentiment analysis tracking developer discussions on GitHub/Reddit, tech news sentiment (Ars Technica, Wired, TechCrunch), and enterprise leader trust indices regarding AI safety and governance.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-[10px] font-mono">
            <span className="px-3 py-1.5 border border-white/20 text-white/80 font-bold uppercase tracking-widest">
              904K MENTIONS ANALYZED
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/[0.02] border-l-2 border-pink-500 border-t border-r border-b border-white/10 p-5">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block font-bold">Public Trust Index</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-serif text-white">72 <span className="text-sm font-mono text-white/40">/ 100</span></span>
            <span className="text-[10px] font-mono text-emerald-400">+8.4 PTS</span>
          </div>
        </div>

        <div className="bg-white/[0.02] border-l-2 border-emerald-500 border-t border-r border-b border-white/10 p-5">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block font-bold">Positive Perceptions</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-serif text-emerald-400">56%</span>
            <span className="text-xs font-mono text-white/40">Favorable</span>
          </div>
        </div>

        <div className="bg-white/[0.02] border-l-2 border-amber-400 border-t border-r border-b border-white/10 p-5">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block font-bold">Regulatory Support</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-serif text-amber-400">88%</span>
            <span className="text-xs font-mono text-white/40">EU Act Backers</span>
          </div>
        </div>

        <div className="bg-white/[0.02] border-l-2 border-red-500 border-t border-r border-b border-white/10 p-5">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block font-bold">Injection Vulnerability Concern</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-serif text-red-500">64%</span>
            <span className="text-xs font-mono text-white/40">Wary</span>
          </div>
        </div>
      </div>

      {/* Public Sentiment & Trust Trend Chart */}
      <div className="bg-white/[0.02] border border-white/10 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono block font-bold mb-1">
              HISTORICAL TREND
            </span>
            <h2 className="text-2xl font-serif italic text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-pink-400" />
              12-Month Public Trust & Regulatory Approval Trend
            </h2>
            <p className="text-xs text-white/60 mt-1">
              Tracking net favorable sentiment vs. regulatory support following major CVE disclosures and EU enforcement notices.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-[10px] font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Positive Ratio
            </span>
            <span className="flex items-center gap-1.5 text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-400"></span> Negative Anxiety
            </span>
          </div>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="date" stroke="#737373" fontSize={10} tickLine={false} fontFamily="monospace" />
              <YAxis stroke="#737373" fontSize={10} tickLine={false} fontFamily="monospace" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0a0a0b', borderColor: '#404040', borderRadius: '0px', fontSize: '11px', fontFamily: 'monospace' }}
              />
              <Area type="monotone" dataKey="positiveRatio" stroke="#10b981" fillOpacity={1} fill="url(#colorPos)" name="Positive %" />
              <Area type="monotone" dataKey="negativeRatio" stroke="#ef4444" fillOpacity={1} fill="url(#colorNeg)" name="Negative %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Topic Sentiment Cards */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-3">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono block font-bold mb-1">
              TOPIC BREAKDOWN
            </span>
            <h2 className="text-2xl font-serif italic text-white">Public Sentiment Drivers by Category</h2>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-mono">
            {['all', 'vulnerabilities', 'compliance', 'privacy'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 uppercase font-bold tracking-widest border transition ${
                  selectedCategory === cat
                    ? 'bg-white text-black'
                    : 'border-white/15 text-white/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTopics.map((top) => (
            <div
              key={top.id}
              className="bg-white/[0.02] border border-white/10 p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">
                  {top.category.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-mono text-white/40">{top.sampleVolume}</span>
              </div>

              <h3 className="text-xl font-serif italic text-white">{top.topic}</h3>

              {/* Sentiment Ratio Bar */}
              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="flex justify-between font-bold">
                  <span className="text-emerald-400">{top.positivePct}% POSITIVE</span>
                  <span className="text-white/40">{top.neutralPct}% NEUTRAL</span>
                  <span className="text-red-400">{top.negativePct}% NEGATIVE</span>
                </div>
                <div className="h-2 w-full bg-black border border-white/10 overflow-hidden flex">
                  <div style={{ width: `${top.positivePct}%` }} className="bg-emerald-500"></div>
                  <div style={{ width: `${top.neutralPct}%` }} className="bg-white/30"></div>
                  <div style={{ width: `${top.negativePct}%` }} className="bg-red-500"></div>
                </div>
              </div>

              {/* Key Drivers */}
              <div className="space-y-2 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block font-bold">Key Sentiment Drivers:</span>
                <ul className="space-y-1.5">
                  {top.keyDrivers.map((driver, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-white/70">
                      <span className="text-pink-400 font-mono text-xs">—</span>
                      <span className="leading-relaxed">{driver}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Public Quote Card */}
              <div className="p-4 border border-white/10 bg-black/60 space-y-2 text-xs">
                <Quote className="w-3.5 h-3.5 text-pink-400 mb-1 opacity-80" />
                <p className="text-white/90 italic font-serif leading-relaxed">"{top.recentPublicQuote}"</p>
                <span className="text-[10px] font-mono text-white/40 font-bold block text-right uppercase tracking-wider">
                  — {top.quoteAuthor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live AI Sentiment Analysis Query Generator */}
      <div className="bg-white/[0.02] border border-white/10 p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <h2 className="text-xl font-serif italic text-white">Live AI Sentiment Intelligence Query (Gemini Engine)</h2>
        </div>
        <p className="text-xs text-white/60">
          Analyze public reaction and media sentiment for any AI model security, privacy leak, or regulatory policy topic.
        </p>

        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={customSearchQuery}
              onChange={(e) => setCustomSearchQuery(e.target.value)}
              className="w-full bg-black border border-white/15 pl-9 pr-4 py-2.5 text-xs text-white placeholder-white/30 font-mono focus:outline-none focus:border-white transition"
              placeholder="e.g. Public opinion on LLM vector store privacy leaks..."
            />
          </div>

          <button
            onClick={handleRunSentimentAnalysis}
            disabled={isAnalyzing}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition text-[10px] font-mono uppercase tracking-[0.2em] font-bold disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Synthesizing Media & Developer Public Sentiment...</span>
              </>
            ) : (
              <>
                <MessageSquareHeart className="w-3.5 h-3.5" />
                <span>Analyze Public Sentiment</span>
              </>
            )}
          </button>
        </div>

        {liveSentimentResult && (
          <div className="mt-4 p-5 border border-white/20 bg-black/80 space-y-3 text-xs font-mono leading-relaxed">
            <h3 className="font-bold text-white uppercase text-[10px] tracking-widest">Live Sentiment Synthesis:</h3>
            <div className="prose prose-invert max-w-none text-white/80 text-xs whitespace-pre-line leading-relaxed">
              {liveSentimentResult.summary}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
