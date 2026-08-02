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
  Search,
  RefreshCw
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenDigest: () => void;
  activeCriticalCount: number;
  onRefreshData: () => void;
  isRefreshing: boolean;
  lastRefreshedAt: Date | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenDigest,
  activeCriticalCount,
  onRefreshData,
  isRefreshing,
  lastRefreshedAt,
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Bar */}
        <div className="py-4 flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-slate-200">
          <div className="flex flex-col">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl sm:text-3xl font-serif italic text-slate-900 leading-none tracking-tighter">
                Sentinel.ai
              </h1>
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 border border-pink-500/40 text-pink-600 bg-pink-50 font-bold">
                PUBLIC KNOWLEDGE BASE
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.25em] mt-1.5 text-slate-500 font-mono">
              Global AI Security & Governance Industry Observatory
            </p>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-sm mx-0 md:mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH CVEs, PROMPT INJECTIONS, CONTROLS..."
                className="w-full bg-slate-50 border border-slate-300 rounded-none pl-8 pr-4 py-1.5 text-[11px] font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 transition"
              />
            </div>
          </div>

          {/* Status Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-6 text-right">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-slate-500">Global Threat Level</span>
              <span className="text-sm sm:text-base font-mono text-red-600 font-bold">ELEVATED // {activeCriticalCount} CRITICAL</span>
            </div>

            <div className="flex flex-col hidden sm:flex">
              <span className="text-[9px] uppercase tracking-widest text-slate-500">System Status</span>
              <span className="text-sm sm:text-base font-mono text-emerald-600 font-bold flex items-center gap-1.5 justify-end">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>OPERATIONAL</span>
              </span>
            </div>

            <div className="flex flex-col hidden lg:flex text-left border-l border-slate-200 pl-4 font-mono">
              <span className="text-[9px] uppercase tracking-widest text-slate-500">Data Feed Sync</span>
              <span className="text-[11px] text-slate-800 font-bold">
                {lastRefreshedAt ? `Aug 2026 (${lastRefreshedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})` : 'August 2026 Live'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={onRefreshData}
                disabled={isRefreshing}
                className="flex items-center space-x-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white transition border border-emerald-700 text-[10px] font-mono uppercase tracking-[0.2em] font-bold shadow-xs disabled:opacity-50"
                title="Refresh report data across dashboard and all tabs to August 2026"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Syncing...' : 'Refresh Data'}</span>
              </button>

              <button
                onClick={onOpenDigest}
                className="flex items-center space-x-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white transition border border-slate-900 text-[10px] font-mono uppercase tracking-[0.2em] font-semibold shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Briefing</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex flex-wrap lg:flex-nowrap overflow-x-auto scrollbar-none border-t border-slate-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isScanner = tab.id === 'scanner';

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-max py-3 px-2.5 sm:px-3 text-[10px] xl:text-[11px] uppercase tracking-[0.12em] font-semibold border-r border-slate-200 flex items-center justify-center space-x-1.5 transition ${
                  isActive
                    ? 'bg-slate-900 text-white font-bold'
                    : isScanner
                    ? 'bg-indigo-50/80 text-indigo-900 hover:bg-indigo-100 font-bold border-b-2 border-b-indigo-600'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : isScanner ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {isScanner && !isActive && (
                  <span className="ml-1 text-[8px] bg-indigo-600 text-white px-1.5 py-0.2 rounded-none font-mono uppercase tracking-normal">
                    Tool
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
