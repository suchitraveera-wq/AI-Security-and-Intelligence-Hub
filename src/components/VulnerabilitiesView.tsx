import React, { useState } from 'react';
import { 
  Bug, 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle2, 
  Cpu
} from 'lucide-react';
import { IncidentNewsItem } from '../types';

interface VulnerabilitiesViewProps {
  incidents: IncidentNewsItem[];
  onSelectIncident: (incident: IncidentNewsItem) => void;
}

export const VulnerabilitiesView: React.FC<VulnerabilitiesViewProps> = ({
  incidents,
  onSelectIncident,
}) => {
  const vulnIncidents = incidents.filter(i => i.category === 'vulnerabilities');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterFramework, setFilterFramework] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = vulnIncidents.filter(item => {
    if (filterSeverity !== 'all' && item.severity !== filterSeverity) return false;
    if (filterFramework !== 'all' && !item.affectedFrameworks.includes(filterFramework)) return false;
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchSummary = item.summary.toLowerCase().includes(query);
      const matchCve = item.cveId?.toLowerCase().includes(query);
      const matchTag = item.tags.some(t => t.toLowerCase().includes(query));
      return matchTitle || matchSummary || matchCve || matchTag;
    }
    return true;
  });

  const allFrameworks: string[] = Array.from(
    new Set(vulnIncidents.flatMap(i => i.affectedFrameworks))
  );

  return (
    <div className="space-y-8">
      {/* View Title & Header */}
      <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-pink-600 font-mono block font-bold mb-1">
              PUBLIC KNOWLEDGE BASE // CATEGORY 01: VULNERABILITY INTELLIGENCE
            </span>
            <h1 className="text-xl sm:text-2xl font-serif italic text-slate-900">Public AI Model & Application Vulnerabilities</h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl font-mono leading-relaxed">
              Public CVE disclosures, security research advisories from Palo Alto Unit 42, Wiz, and Protect AI, OWASP LLM Top 10 exploits, indirect prompt injections, and frontier model red teaming reports.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-[10px] font-mono">
            <span className="px-3 py-1.5 border border-red-300 bg-red-50 text-red-600 font-bold uppercase tracking-widest">
              {vulnIncidents.length} DISCLOSURES
            </span>
            <span className="px-3 py-1.5 border border-slate-300 text-slate-600 uppercase tracking-widest">
              OWASP LLM 2026 ALIGNED
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="relative md:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SEARCH CVE ID, ATTACK VECTOR..."
              className="w-full bg-slate-50 border border-slate-300 text-[11px] font-mono text-slate-900 placeholder-slate-400 pl-8 pr-4 py-2 focus:outline-none focus:border-slate-800 transition"
            />
          </div>

          <div className="flex items-center space-x-3 md:col-span-2">
            <div className="flex items-center space-x-1.5 text-[10px] font-mono uppercase text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              <span>SEVERITY:</span>
            </div>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-white border border-slate-300 text-slate-900 font-mono text-[11px] px-3 py-2 focus:outline-none focus:border-slate-800"
            >
              <option value="all">ALL SEVERITIES</option>
              <option value="Critical">CRITICAL</option>
              <option value="High">HIGH</option>
              <option value="Medium">MEDIUM</option>
            </select>

            <div className="flex items-center space-x-1.5 text-[10px] font-mono uppercase text-slate-500 ml-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>FRAMEWORK:</span>
            </div>
            <select
              value={filterFramework}
              onChange={(e) => setFilterFramework(e.target.value)}
              className="bg-white border border-slate-300 text-slate-900 font-mono text-[11px] px-3 py-2 focus:outline-none focus:border-slate-800 flex-1"
            >
              <option value="all">ALL FRAMEWORKS</option>
              {allFrameworks.map(fw => (
                <option key={fw} value={fw}>{fw.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Vulnerability Items List */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((item) => {
          const borderAccent = item.severity === 'Critical' ? 'border-red-500' : 'border-orange-500';
          const severityColor = item.severity === 'Critical' ? 'text-red-600' : 'text-orange-600';

          return (
            <div
              key={item.id}
              className={`bg-white border-l-2 ${borderAccent} border-t border-r border-b border-slate-200 p-6 space-y-4 transition hover:bg-slate-50 shadow-xs`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${severityColor}`}>
                    {item.severity} SEVERITY
                  </span>
                  {item.cveId && (
                    <span className="text-[10px] font-mono text-red-600 font-bold border border-red-200 bg-red-50 px-2 py-0.5">
                      {item.cveId}
                    </span>
                  )}
                  {item.cweId && (
                    <span className="text-[10px] font-mono text-slate-500 border border-slate-200 px-2 py-0.5">
                      {item.cweId}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-[10px] font-mono text-slate-500">
                  <span>CVSS: <strong className="text-slate-900">{item.impactScore}/10</strong></span>
                  <span>•</span>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                  <button
                    onClick={() => onSelectIncident(item)}
                    className="text-slate-900 hover:underline font-bold flex items-center gap-1 ml-2"
                  >
                    DETAILS & AUDIT <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-serif italic text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {item.fullContent || item.summary}
                </p>
              </div>

              {/* Remediation Action Callout */}
              {item.remediationAction && (
                <div className="p-4 border border-emerald-200 bg-emerald-50/60 text-xs space-y-1">
                  <div className="flex items-center space-x-2 text-emerald-700 font-mono font-bold uppercase text-[10px] tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>RECOMMENDED TECHNICAL REMEDIATION</span>
                  </div>
                  <p className="text-slate-800 font-mono text-[11px] leading-relaxed">
                    {item.remediationAction}
                  </p>
                </div>
              )}

              {/* Footer Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-400">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="uppercase text-slate-400">Target Frameworks:</span>
                  {item.affectedFrameworks.map((fw, idx) => (
                    <span key={idx} className="border border-slate-200 bg-slate-50 px-2 py-0.5 uppercase text-slate-700">
                      {fw}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="text-slate-500 uppercase">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-12 text-center bg-white border border-slate-200 space-y-3">
            <Bug className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-mono text-slate-500 uppercase">NO DISCLOSURES MATCH THE FILTER CRITERIA.</p>
          </div>
        )}
      </div>
    </div>
  );
};
