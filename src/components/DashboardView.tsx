import React, { useState } from 'react';
import { 
  ShieldAlert, 
  FileCheck, 
  Lock, 
  Activity, 
  TrendingUp, 
  ArrowDownRight, 
  ChevronRight,
  AlertTriangle,
  Zap,
  Layers,
  MessageSquareHeart,
  Globe,
  Building2,
  Cpu,
  Radio,
  FileText,
  Search,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid
} from 'recharts';
import { IncidentNewsItem, HistoricalTrendPoint, FrameworkVulnerabilityStat, PublicSourceCategory } from '../types';
import { PUBLIC_KNOWLEDGE_SOURCES } from '../data/mockIncidentsAndNews';

interface DashboardViewProps {
  incidents: IncidentNewsItem[];
  trendData: HistoricalTrendPoint[];
  frameworkStats: FrameworkVulnerabilityStat[];
  onSelectCategory: (category: string) => void;
  onSelectIncident: (incident: IncidentNewsItem) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  incidents,
  trendData,
  frameworkStats,
  onSelectCategory,
  onSelectIncident,
}) => {
  const [selectedSourceCat, setSelectedSourceCat] = useState<string>('all');

  const criticalCount = incidents.filter(i => i.severity === 'Critical').length;

  const filteredIncidents = selectedSourceCat === 'all' 
    ? incidents 
    : incidents.filter(i => i.sourceCategory === selectedSourceCat);

  const sourceCategoriesConfig: { id: PublicSourceCategory | 'all'; label: string; count: number; icon: any }[] = [
    { id: 'all', label: 'All Public Sources', count: PUBLIC_KNOWLEDGE_SOURCES.length, icon: Globe },
    { id: 'frontier_labs', label: 'Frontier Model Labs', count: 3, icon: Cpu },
    { id: 'security_firms', label: 'AI Security Research', count: 3, icon: ShieldAlert },
    { id: 'monitoring_services', label: 'AI Monitoring Platforms', count: 1, icon: Radio },
    { id: 'app_developers', label: 'AI App & Framework Devs', count: 2, icon: Layers },
    { id: 'industry_deployments', label: 'Industry AI Deployments', count: 1, icon: Building2 },
    { id: 'domain_experts', label: 'Standards & Domain Experts', count: 3, icon: BookOpen },
    { id: 'news_media', label: 'Tech & Security News', count: 1, icon: FileText },
  ];

  const getSourceBadge = (cat?: PublicSourceCategory) => {
    switch (cat) {
      case 'frontier_labs':
        return { label: 'Frontier Lab', color: 'border-pink-500/40 text-pink-400 bg-pink-500/10' };
      case 'security_firms':
        return { label: 'AI Security Firm', color: 'border-red-500/40 text-red-400 bg-red-500/10' };
      case 'monitoring_services':
        return { label: 'AI Monitoring Service', color: 'border-purple-500/40 text-purple-400 bg-purple-500/10' };
      case 'app_developers':
        return { label: 'AI Framework Dev', color: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10' };
      case 'industry_deployments':
        return { label: 'Industry Deployment', color: 'border-amber-500/40 text-amber-400 bg-amber-500/10' };
      case 'domain_experts':
        return { label: 'Domain Expert / Standard', color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' };
      case 'news_media':
        return { label: 'Tech & Security News', color: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10' };
      default:
        return { label: 'Public Source', color: 'border-white/20 text-white/70 bg-white/5' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Global Public Knowledge Base Overview */}
      <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-pink-400">
              <Globe className="w-3.5 h-3.5 animate-pulse" />
              <span>PUBLIC KNOWLEDGE BASE // MULTI-SOURCE AI INTELLIGENCE OBSERVATORY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif italic text-white leading-tight tracking-tight">
              Global AI Security & Governance Knowledge Base
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-3xl leading-relaxed font-mono">
              Aggregated industry intelligence, CVE disclosures, research whitepapers, and regulatory updates synthesized from public blogs of <strong className="text-white">AI Frontier Labs</strong> (OpenAI, Anthropic, Google DeepMind), <strong className="text-white">AI Security Research Firms</strong> (Palo Alto Unit 42, Wiz, Protect AI), <strong className="text-white">AI Monitoring Services</strong> (Arize AI, LangSmith), <strong className="text-white">Enterprise Deployments</strong> (Healthcare, FinTech), <strong className="text-white">Standards Bodies</strong> (OWASP LLM Top 10, NIST AI RMF, EU AI Act), and <strong className="text-white">Tech News Outlets</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 min-w-max">
            <div className="border-l-2 border-red-500 pl-4 py-1">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block">Public CVEs</span>
              <span className="text-2xl font-serif text-white">{criticalCount}</span>
              <span className="text-[9px] font-mono text-red-400 block uppercase tracking-wider mt-0.5">Critical Disclosures</span>
            </div>

            <div className="border-l-2 border-emerald-500 pl-4 py-1">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block">EU AI Act</span>
              <span className="text-2xl font-serif text-white">88%</span>
              <span className="text-[9px] font-mono text-emerald-400 block uppercase tracking-wider mt-0.5">Public Benchmark</span>
            </div>

            <div className="border-l-2 border-cyan-500 pl-4 py-1">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block">Public Sources</span>
              <span className="text-2xl font-serif text-white">{PUBLIC_KNOWLEDGE_SOURCES.length}</span>
              <span className="text-[9px] font-mono text-cyan-400 block uppercase tracking-wider mt-0.5">Tracked Outlets</span>
            </div>

            <div className="border-l-2 border-purple-500 pl-4 py-1">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block">Articles Indexed</span>
              <span className="text-2xl font-serif text-white">1.4k+</span>
              <span className="text-[9px] font-mono text-purple-400 block uppercase tracking-wider mt-0.5">Synthesized</span>
            </div>
          </div>
        </div>

        {/* Public Knowledge Source Origin Selector */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block font-bold">
            FILTER KNOWLEDGE BASE BY PUBLIC SOURCE ORIGIN:
          </span>
          <div className="flex flex-wrap gap-2">
            {sourceCategoriesConfig.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedSourceCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedSourceCat(cat.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 border text-[10px] font-mono uppercase tracking-wider transition ${
                    isSelected
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-white/[0.02] border-white/15 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Historical Analytics & Trends Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Historical Incident Trends Chart */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono block mb-1">
                PUBLIC RESEARCH TRENDS STREAM
              </span>
              <h2 className="text-2xl font-serif italic text-white flex items-center gap-2">
                12-Month Industry Vulnerability & Risk Disclosures
              </h2>
            </div>
            <div className="flex items-center space-x-3 text-[10px] font-mono uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-red-400">
                <span className="w-2 h-2 bg-red-500"></span> Vulnerabilities
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2 h-2 bg-amber-500"></span> Compliance
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2 h-2 bg-cyan-500"></span> Privacy
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVuln" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPriv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" opacity={0.6} />
                <XAxis dataKey="date" stroke="#737373" fontSize={10} tickLine={false} fontFamily="JetBrains Mono" />
                <YAxis stroke="#737373" fontSize={10} tickLine={false} fontFamily="JetBrains Mono" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0B', borderColor: '#262626', color: '#E0E0E0', fontSize: '11px', fontFamily: 'JetBrains Mono' }}
                />
                <Area type="monotone" dataKey="vulnerabilities" stroke="#ef4444" fillOpacity={1} fill="url(#colorVuln)" name="Vulnerabilities Disclosed" />
                <Area type="monotone" dataKey="complianceIssues" stroke="#f59e0b" fillOpacity={1} fill="url(#colorComp)" name="Compliance Regulatory Actions" />
                <Area type="monotone" dataKey="privacyIncidents" stroke="#06b6d4" fillOpacity={1} fill="url(#colorPriv)" name="Privacy Leaks Reported" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Response SLA Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
            <div className="p-3 border border-white/10 bg-white/[0.01]">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block">Avg CVE Disclosure SLA</span>
              <span className="text-lg font-serif text-white font-semibold">5.2 days</span>
              <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">Vendor Patch Window</span>
            </div>
            <div className="p-3 border border-white/10 bg-white/[0.01]">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block">OWASP Top 10 Coverage</span>
              <span className="text-lg font-serif text-white font-semibold">100%</span>
              <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">Fully Mapped</span>
            </div>
            <div className="p-3 border border-white/10 bg-white/[0.01]">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block">Frontier Red Teaming</span>
              <span className="text-lg font-serif text-white font-semibold">Weekly</span>
              <span className="text-[10px] font-mono text-purple-400 block mt-0.5">OpenAI & Anthropic Sync</span>
            </div>
          </div>
        </div>

        {/* Right Column: Knowledge Portals */}
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono block font-bold">
            KNOWLEDGE BASE SECTIONS
          </span>

          <div className="space-y-3">
            <button
              onClick={() => onSelectCategory('vulnerabilities')}
              className="w-full text-left p-4 bg-white/[0.02] hover:bg-white/10 border-l-2 border-red-500 border-t border-r border-b border-white/10 transition group flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold font-mono block">
                  01 // Vulnerabilities & CVEs
                </span>
                <h3 className="text-base font-serif italic text-white group-hover:underline">
                  Public Model Exploits & Security Advisories
                </h3>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition" />
            </button>

            <button
              onClick={() => onSelectCategory('compliance')}
              className="w-full text-left p-4 bg-white/[0.02] hover:bg-white/10 border-l-2 border-amber-500 border-t border-r border-b border-white/10 transition group flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold font-mono block">
                  02 // Regulatory & Standards
                </span>
                <h3 className="text-base font-serif italic text-white group-hover:underline">
                  EU AI Act, NIST RMF & ISO Standards
                </h3>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition" />
            </button>

            <button
              onClick={() => onSelectCategory('privacy')}
              className="w-full text-left p-4 bg-white/[0.02] hover:bg-white/10 border-l-2 border-cyan-500 border-t border-r border-b border-white/10 transition group flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold font-mono block">
                  03 // Privacy & Vector Stores
                </span>
                <h3 className="text-base font-serif italic text-white group-hover:underline">
                  RAG Embedding Leaks & HIPAA Studies
                </h3>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition" />
            </button>

            <button
              onClick={() => onSelectCategory('threat_monitoring')}
              className="w-full text-left p-4 bg-white/[0.02] hover:bg-white/10 border-l-2 border-purple-500 border-t border-r border-b border-white/10 transition group flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-purple-500 font-bold font-mono block">
                  04 // Threat Observatories
                </span>
                <h3 className="text-base font-serif italic text-white group-hover:underline">
                  Public Honeypot & Guardrail Telemetry
                </h3>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition" />
            </button>

            <button
              onClick={() => onSelectCategory('sentiment')}
              className="w-full text-left p-4 bg-white/[0.02] hover:bg-white/10 border-l-2 border-pink-500 border-t border-r border-b border-white/10 transition group flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-pink-500 font-bold font-mono block">
                  05 // Public & Media Sentiment
                </span>
                <h3 className="text-base font-serif italic text-white group-hover:underline">
                  Industry Opinion & Developer Perceptions
                </h3>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition" />
            </button>
          </div>
        </div>
      </div>

      {/* Framework Vulnerability Exposure & Advisories Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Framework Vulnerability Density */}
        <div className="bg-white/[0.02] border border-white/10 p-6 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono block font-bold">
            PUBLIC CVE DENSITY
          </span>
          <h3 className="text-xl font-serif italic text-white">
            Vulnerabilities by AI Framework
          </h3>
          <p className="text-xs text-white/50 font-mono">
            Reported CVE density across open-source LLM orchestrators and serving frameworks in public research databases.
          </p>
          
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={frameworkStats} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" opacity={0.4} />
                <XAxis type="number" stroke="#737373" fontSize={10} fontFamily="JetBrains Mono" />
                <YAxis dataKey="framework" type="category" stroke="#a3a3a3" fontSize={10} width={95} tickLine={false} fontFamily="JetBrains Mono" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0B', borderColor: '#262626', color: '#E0E0E0', fontSize: '11px', fontFamily: 'JetBrains Mono' }}
                />
                <Bar dataKey="cveCount" fill="#ffffff" radius={[0, 2, 2, 0]} name="Public CVE Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latest Advisories Feed */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-pink-400 font-mono block font-bold">
                PUBLIC INTELLIGENCE FEED
              </span>
              <h2 className="text-2xl font-serif italic text-white">
                Public Disclosures, Research & News Bulletins
              </h2>
            </div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
              {filteredIncidents.length} ENTRIES
            </span>
          </div>

          <div className="space-y-4">
            {filteredIncidents.length === 0 ? (
              <div className="p-8 text-center border border-white/10 bg-white/[0.01] text-xs font-mono text-white/40">
                No articles found for selected public source filter.
              </div>
            ) : (
              filteredIncidents.slice(0, 5).map((incident) => {
                const borderAccent = 
                  incident.severity === 'Critical' ? 'border-red-500' :
                  incident.severity === 'High' ? 'border-orange-500' :
                  'border-amber-500';

                const badge = getSourceBadge(incident.sourceCategory);

                return (
                  <div 
                    key={incident.id}
                    onClick={() => onSelectIncident(incident)}
                    className={`group cursor-pointer border-l-2 ${borderAccent} pl-6 py-2 transition hover:bg-white/[0.02] space-y-2`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 border ${badge.color}`}>
                          {badge.label}
                        </span>
                        <span className="text-[10px] font-mono text-white/50">
                          {incident.source}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono opacity-50">
                        {new Date(incident.date).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif italic text-white group-hover:underline leading-snug">
                      {incident.title}
                    </h3>

                    <p className="text-xs text-white/70 line-clamp-2 leading-relaxed font-mono">
                      {incident.summary}
                    </p>

                    <div className="flex items-center gap-2 pt-1 text-[10px] font-mono text-white/40">
                      {incident.affectedFrameworks.map((fw, idx) => (
                        <span key={idx} className="uppercase border border-white/10 px-1.5 py-0.5">
                          {fw}
                        </span>
                      ))}
                      {incident.cveId && (
                        <span className="text-red-400 font-bold border border-red-500/30 px-1.5 py-0.5">
                          {incident.cveId}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

