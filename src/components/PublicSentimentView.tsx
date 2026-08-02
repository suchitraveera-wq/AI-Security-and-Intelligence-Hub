import React, { useState } from 'react';
import { 
  MessageSquareHeart, 
  Quote, 
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

  const filteredTopics = topics.filter(t => {
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* View Title Bar */}
      <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-pink-600 font-mono block font-bold mb-1">
              PUBLIC KNOWLEDGE BASE // CATEGORY 05: PUBLIC & MEDIA SENTIMENT OBSERVATORY
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif italic text-slate-900">Public, Media & Developer Sentiment Index</h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl font-mono leading-relaxed">
              Public sentiment analysis tracking developer discussions on GitHub/Reddit, tech news sentiment (Ars Technica, Wired, TechCrunch), and enterprise leader trust indices regarding AI safety and governance.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-[10px] font-mono">
            <span className="px-3 py-1.5 border border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-widest">
              904K MENTIONS ANALYZED
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border-l-2 border-pink-500 border-t border-r border-b border-slate-200 p-5 shadow-xs">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono block font-bold">Public Trust Index</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-serif text-slate-900">72 <span className="text-sm font-mono text-slate-400">/ 100</span></span>
            <span className="text-[10px] font-mono text-emerald-600 font-bold">+8.4 PTS</span>
          </div>
        </div>

        <div className="bg-white border-l-2 border-emerald-500 border-t border-r border-b border-slate-200 p-5 shadow-xs">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono block font-bold">Positive Perceptions</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-serif text-emerald-600 font-bold">56%</span>
            <span className="text-xs font-mono text-slate-500">Favorable</span>
          </div>
        </div>

        <div className="bg-white border-l-2 border-amber-400 border-t border-r border-b border-slate-200 p-5 shadow-xs">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono block font-bold">Regulatory Support</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-serif text-amber-600 font-bold">88%</span>
            <span className="text-xs font-mono text-slate-500">EU Act Backers</span>
          </div>
        </div>

        <div className="bg-white border-l-2 border-red-500 border-t border-r border-b border-slate-200 p-5 shadow-xs">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono block font-bold">Injection Vulnerability Concern</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-serif text-red-600 font-bold">64%</span>
            <span className="text-xs font-mono text-slate-500">Wary</span>
          </div>
        </div>
      </div>

      {/* Public Sentiment & Trust Trend Chart */}
      <div className="bg-white border border-slate-200 p-6 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-mono block font-bold mb-1">
              HISTORICAL TREND
            </span>
            <h2 className="text-xl font-serif italic text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-pink-600" />
              12-Month Public Trust & Regulatory Approval Trend
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Tracking net favorable sentiment vs. regulatory support following major CVE disclosures and EU enforcement notices.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-[10px] font-mono">
            <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Positive Ratio
            </span>
            <span className="flex items-center gap-1.5 text-red-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> Negative Anxiety
            </span>
          </div>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorNeg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} fontFamily="monospace" />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} fontFamily="monospace" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '0px', fontSize: '11px', fontFamily: 'monospace', color: '#0f172a' }}
              />
              <Area type="monotone" dataKey="positiveRatio" stroke="#059669" fillOpacity={1} fill="url(#colorPos)" name="Positive %" />
              <Area type="monotone" dataKey="negativeRatio" stroke="#dc2626" fillOpacity={1} fill="url(#colorNeg)" name="Negative %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Topic Sentiment Cards */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-mono block font-bold mb-1">
              TOPIC BREAKDOWN
            </span>
            <h2 className="text-xl font-serif italic text-slate-900">Public Sentiment Drivers by Category</h2>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-mono">
            {['all', 'vulnerabilities', 'compliance', 'privacy'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 uppercase font-bold tracking-widest border transition ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
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
              className="bg-white border border-slate-200 p-6 space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                  {top.category.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-semibold">{top.sampleVolume}</span>
              </div>

              <h3 className="text-lg font-serif italic text-slate-900">{top.topic}</h3>

              {/* Sentiment Ratio Bar */}
              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="flex justify-between font-bold">
                  <span className="text-emerald-700">{top.positivePct}% POSITIVE</span>
                  <span className="text-slate-500">{top.neutralPct}% NEUTRAL</span>
                  <span className="text-red-700">{top.negativePct}% NEGATIVE</span>
                </div>
                <div className="h-2 w-full bg-slate-100 border border-slate-200 overflow-hidden flex">
                  <div style={{ width: `${top.positivePct}%` }} className="bg-emerald-500"></div>
                  <div style={{ width: `${top.neutralPct}%` }} className="bg-slate-300"></div>
                  <div style={{ width: `${top.negativePct}%` }} className="bg-red-500"></div>
                </div>
              </div>

              {/* Key Drivers */}
              <div className="space-y-2 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block font-bold">Key Sentiment Drivers:</span>
                <ul className="space-y-1.5">
                  {top.keyDrivers.map((driver, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-slate-700">
                      <span className="text-pink-600 font-mono text-xs">—</span>
                      <span className="leading-relaxed">{driver}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Public Quote Card */}
              <div className="p-4 border border-slate-200 bg-slate-50 space-y-2 text-xs">
                <Quote className="w-3.5 h-3.5 text-pink-600 mb-1 opacity-80" />
                <p className="text-slate-900 italic font-serif leading-relaxed">"{top.recentPublicQuote}"</p>
                <span className="text-[10px] font-mono text-slate-500 font-bold block text-right uppercase tracking-wider">
                  — {top.quoteAuthor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
