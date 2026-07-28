import React from 'react';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Bug, 
  FileCheck2, 
  Lock, 
  Activity, 
  MessageSquareHeart, 
  Scan, 
  Sparkles, 
  Search
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenDigest: () => void;
  activeCriticalCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenDigest,
  activeCriticalCount,
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vulnerabilities', label: 'Vulnerabilities', icon: Bug },
    { id: 'compliance', label: 'Automated Compliance', icon: FileCheck2 },
    { id: 'privacy', label: 'Privacy & Governance', icon: Lock },
    { id: 'threat_monitoring', label: 'Real-Time Monitoring', icon: Activity },
    { id: 'sentiment', label: 'Public Sentiment', icon: MessageSquareHeart },
    { id: 'scanner', label: 'AI Security Scanner', icon: Scan },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-md border-b border-white/10 text-[#E0E0E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <div className="py-5 flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-white/10">
          <div className="flex flex-col">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl sm:text-4xl font-serif italic text-white leading-none tracking-tighter">
                Sentinel.ai
              </h1>
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 border border-pink-500/40 text-pink-400 bg-pink-500/10">
                PUBLIC KNOWLEDGE BASE
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.25em] mt-2 text-white/60 font-mono">
              Global AI Security & Governance Industry Observatory
            </p>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-sm mx-0 md:mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH CVEs, PROMPT INJECTIONS, CONTROLS..."
                className="w-full bg-white/[0.03] border border-white/15 rounded-none pl-8 pr-4 py-1.5 text-[11px] font-mono text-white placeholder-white/30 focus:outline-none focus:border-white transition"
              />
            </div>
          </div>

          {/* Status Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-6 text-right">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-white/40">Global Threat Level</span>
              <span className="text-sm sm:text-base font-mono text-red-500 font-bold">ELEVATED // {activeCriticalCount} CRITICAL</span>
            </div>

            <div className="flex flex-col hidden sm:flex">
              <span className="text-[9px] uppercase tracking-widest text-white/40">System Status</span>
              <span className="text-sm sm:text-base font-mono text-emerald-400 font-bold">OPERATIONAL</span>
            </div>

            <button
              onClick={onOpenDigest}
              className="flex items-center space-x-2 px-3.5 py-2 bg-white/10 hover:bg-white text-white hover:text-black transition border border-white/20 text-[10px] uppercase tracking-[0.2em] font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:text-black" />
              <span>AI Briefing</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-max py-3.5 px-4 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold border-r border-white/10 flex items-center justify-center space-x-2 transition ${
                  isActive
                    ? 'bg-white text-black font-bold'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-white/50'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
