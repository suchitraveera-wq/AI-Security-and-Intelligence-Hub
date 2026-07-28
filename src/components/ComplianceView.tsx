import React, { useState } from 'react';
import { 
  FileCheck2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw,
  ExternalLink,
  Globe,
  Building2,
  BookOpen,
  Search,
  FileText
} from 'lucide-react';
import { ComplianceFramework, IncidentNewsItem } from '../types';

interface ComplianceViewProps {
  frameworks: ComplianceFramework[];
  incidents?: IncidentNewsItem[];
  onSelectIncident?: (incident: IncidentNewsItem) => void;
}

export const ComplianceView: React.FC<ComplianceViewProps> = ({ 
  frameworks, 
  incidents = [],
  onSelectIncident 
}) => {
  const [selectedFrameworkId, setSelectedFrameworkId] = useState<string>(frameworks[0]?.id || 'eu-ai-act');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [systemDescription, setSystemDescription] = useState<string>(
    'Enterprise Agentic Support Assistant utilizing RAG over customer databases with automated database mutation tools.'
  );
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  const activeFramework = frameworks.find(f => f.id === selectedFrameworkId) || frameworks[0];

  // Filter compliance requirements
  const filteredRequirements = activeFramework.requirements.filter(req => {
    const matchesStatus = statusFilter === 'all' || req.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = 
      req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.publicSource && req.publicSource.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Filter relevant public regulatory bulletins & articles
  const complianceIncidents = incidents.filter(i => 
    i.category === 'compliance' || 
    i.tags.some(t => ['Compliance', 'EU AI Act', 'NIST', 'ISO 42001', 'Regulatory', 'Standards'].includes(t))
  );

  const handleRunAudit = async () => {
    setIsAuditing(true);
    setAuditResult(null);
    try {
      const res = await fetch('/api/compliance/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemDescription,
          frameworkId: activeFramework.id
        })
      });
      const data = await res.json();
      setAuditResult(data);
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title Bar */}
      <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-pink-400 font-bold">
              <Globe className="w-3.5 h-3.5 animate-pulse" />
              <span>PUBLIC KNOWLEDGE BASE // CATEGORY 02: REGULATORY STANDARDS & ENFORCEMENT</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif italic text-white leading-tight tracking-tight">
              Public AI Regulatory Frameworks & Compliance Benchmarks
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-3xl leading-relaxed font-mono">
              Aggregated regulatory intelligence, official EU AI Act office bulletins, NIST AI Risk Management Framework 2.0 guidance, ISO/IEC 42001 certification standards, and FTC enforcement actions compiled from public government and standards publications.
            </p>
          </div>

          {/* Framework Selector Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {frameworks.map(fw => (
              <button
                key={fw.id}
                onClick={() => setSelectedFrameworkId(fw.id)}
                className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest font-bold transition flex items-center space-x-2 ${
                  selectedFrameworkId === fw.id
                    ? 'bg-white text-black border border-white'
                    : 'bg-white/[0.02] border border-white/15 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                <span>{fw.shortCode}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Framework Public Metadata Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-white/10 bg-black/40 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-white/40 block font-bold">Official Governing Body:</span>
            <span className="text-white font-semibold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-pink-400" />
              {activeFramework.governingBody || 'International Standards Authority'}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-white/40 block font-bold">Official Public Source Portal:</span>
            {activeFramework.officialSourceUrl ? (
              <a
                href={activeFramework.officialSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-pink-400 hover:underline flex items-center gap-1 font-bold truncate"
              >
                <span>{activeFramework.officialSourceUrl}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            ) : (
              <span className="text-white/60">Public Document Archive</span>
            )}
          </div>

          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-white/40 block font-bold">Public Adoption & Status:</span>
            <span className="text-emerald-400 font-bold block truncate">
              {activeFramework.publicAdoptionRate || 'Global Industry Benchmark'}
            </span>
          </div>
        </div>
      </div>

      {/* Framework Summary Score & Control Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/[0.02] border-l-2 border-amber-500 border-t border-r border-b border-white/10 p-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block">Public Compliance Score</span>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="text-4xl font-serif text-white">{activeFramework.overallScore}%</span>
              <span className="text-[10px] font-mono text-amber-400">BENCHMARK</span>
            </div>
          </div>
          <p className="text-[10px] font-mono text-white/40 mt-3">
            PUBLIC AUDIT STREAM: {activeFramework.lastAuditDate}
          </p>
        </div>

        <div className="bg-white/[0.02] border-l-2 border-emerald-500 border-t border-r border-b border-white/10 p-5 flex flex-col justify-between">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block">Passed Public Controls</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-serif text-emerald-400">{activeFramework.controlsCount.passed}</span>
            <span className="text-xs font-mono text-white/40">/ {activeFramework.controlsCount.total} Clauses</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 mt-2">Verified in Statutory Text</span>
        </div>

        <div className="bg-white/[0.02] border-l-2 border-red-500 border-t border-r border-b border-white/10 p-5 flex flex-col justify-between">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block">Non-Compliant Gaps</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-serif text-red-500">{activeFramework.controlsCount.failed}</span>
            <span className="text-xs font-mono text-red-400">Industry Gaps</span>
          </div>
          <span className="text-[10px] font-mono text-red-400 mt-2">Enforcement Warning</span>
        </div>

        <div className="bg-white/[0.02] border-l-2 border-amber-400 border-t border-r border-b border-white/10 p-5 flex flex-col justify-between">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block">Pending Reviews</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-serif text-amber-400">{activeFramework.controlsCount.warning}</span>
            <span className="text-xs font-mono text-white/40">Clauses</span>
          </div>
          <span className="text-[10px] font-mono text-amber-400 mt-2">Public Notice Draft</span>
        </div>
      </div>

      {/* Interactive Compliance Requirements List with Search & Filters */}
      <div className="bg-white/[0.02] border border-white/10 p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-pink-400 font-mono block font-bold mb-1">
              STATUTORY CLAUSES & PUBLIC BENCHMARKS
            </span>
            <h2 className="text-2xl font-serif italic text-white">
              {activeFramework.name} Detailed Breakdown
            </h2>
            <p className="text-xs text-white/60 mt-1 font-mono">{activeFramework.description}</p>
          </div>

          {/* Search & Status Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-white/40" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search clause or source..."
                className="bg-black border border-white/15 pl-8 pr-3 py-1.5 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-white w-48"
              />
            </div>

            <div className="flex items-center space-x-1 border border-white/15 bg-black/40 p-1 font-mono text-[10px]">
              {['all', 'compliant', 'needs review', 'non-compliant'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-1 uppercase font-bold transition ${
                    statusFilter === st 
                      ? 'bg-white text-black' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clause Cards */}
        <div className="space-y-4">
          {filteredRequirements.length === 0 ? (
            <div className="p-8 text-center border border-white/10 bg-black/40 text-xs font-mono text-white/40">
              No clauses matched the search filter.
            </div>
          ) : (
            filteredRequirements.map((req) => {
              const isCompliant = req.status === 'Compliant';
              const isNonCompliant = req.status === 'Non-Compliant';
              const borderAccent = isCompliant ? 'border-emerald-500' : isNonCompliant ? 'border-red-500' : 'border-amber-500';
              const statusColor = isCompliant ? 'text-emerald-400' : isNonCompliant ? 'text-red-500' : 'text-amber-400';

              return (
                <div
                  key={req.id}
                  className={`p-5 bg-white/[0.01] border-l-2 ${borderAccent} border-t border-r border-b border-white/10 space-y-4`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] font-mono font-bold text-amber-400 border border-amber-500/30 px-2 py-0.5">
                        {req.code}
                      </span>
                      <h3 className="text-base font-serif italic text-white">{req.title}</h3>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${statusColor}`}>
                        {req.status}
                      </span>
                      <span className="text-[10px] font-mono text-white/40 border border-white/10 px-2 py-0.5 uppercase">
                        {req.riskLevel} PRIORITY
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed font-mono">{req.description}</p>

                  {/* Public Source Citation Block */}
                  {req.publicSource && (
                    <div className="p-3 border border-white/10 bg-black/60 text-xs font-mono space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-wider text-pink-400 font-bold flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          Official Public Source Citation:
                        </span>
                        {req.publicSourceUrl && (
                          <a 
                            href={req.publicSourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-white/60 hover:text-white flex items-center gap-1 underline"
                          >
                            <span>View Source</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-white/90 text-[11px] font-semibold">{req.publicSource}</p>
                    </div>
                  )}

                  {/* Public Industry Benchmark Stat */}
                  {req.publicIndustryBenchmark && (
                    <div className="p-3 border border-cyan-500/30 bg-cyan-950/20 text-xs text-cyan-200 font-mono space-y-1">
                      <span className="text-[9px] uppercase tracking-wider text-cyan-400 block font-bold">
                        Public Industry Benchmark Survey:
                      </span>
                      <p className="text-cyan-100 text-[11px] leading-relaxed">{req.publicIndustryBenchmark}</p>
                    </div>
                  )}

                  {/* Public Precedent or Enforcement Action */}
                  {req.publicPrecedentCase && (
                    <div className="p-3 border border-amber-500/30 bg-amber-950/20 text-xs text-amber-300 font-mono space-y-1">
                      <span className="text-[9px] uppercase tracking-wider text-amber-400 block font-bold">
                        Public Precedent & Regulatory Notice:
                      </span>
                      <p className="text-amber-100 text-[11px] leading-relaxed">{req.publicPrecedentCase}</p>
                    </div>
                  )}

                  {/* Required Remediation Fix */}
                  {req.recommendedFix && (
                    <div className="p-3 border border-red-500/30 bg-red-950/20 text-xs text-red-300 font-mono space-y-1">
                      <span className="text-[9px] uppercase tracking-wider text-red-400 block font-bold">Recommended Compliance Action:</span>
                      <p className="text-white/90 text-[11px]">{req.recommendedFix}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Public Regulatory Advisories & News Feed */}
      {complianceIncidents.length > 0 && (
        <div className="bg-white/[0.02] border border-white/10 p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-pink-400 font-mono block font-bold">
                PUBLIC REGULATORY DISCLOSURES & BULLETINS
              </span>
              <h2 className="text-2xl font-serif italic text-white">
                Official Regulatory Advisories & Industry Reports
              </h2>
            </div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
              {complianceIncidents.length} ARTICLES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complianceIncidents.map((incident) => (
              <div 
                key={incident.id}
                onClick={() => onSelectIncident && onSelectIncident(incident)}
                className="p-4 border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] cursor-pointer transition space-y-2"
              >
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-pink-400 font-bold border border-pink-500/30 px-1.5 py-0.5">
                    {incident.source}
                  </span>
                  <span className="text-white/40">{new Date(incident.date).toLocaleDateString()}</span>
                </div>

                <h3 className="text-base font-serif italic text-white hover:underline leading-snug">
                  {incident.title}
                </h3>

                <p className="text-xs text-white/70 font-mono line-clamp-2">
                  {incident.summary}
                </p>

                <div className="flex items-center gap-2 pt-1 text-[9px] font-mono text-white/40">
                  {incident.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="border border-white/10 px-1.5 py-0.5">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live AI Compliance Auditor Simulator Grounded in Public Standards */}
      <div className="bg-white/[0.02] border border-white/10 p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <h2 className="text-xl font-serif italic text-white">Automated AI System Compliance Auditor (Gemini Engine)</h2>
        </div>
        <p className="text-xs text-white/70 font-mono">
          Describe your AI application architecture or system prompt to evaluate against <strong className="text-white">{activeFramework.name}</strong> official public statutory clauses in real time.
        </p>

        <div className="space-y-3">
          <textarea
            value={systemDescription}
            onChange={(e) => setSystemDescription(e.target.value)}
            rows={3}
            className="w-full bg-black border border-white/15 p-3 text-[11px] font-mono text-white placeholder-white/30 focus:outline-none focus:border-white transition"
            placeholder="e.g. System description of RAG agent, data retention rules, tool permissions..."
          />

          <button
            onClick={handleRunAudit}
            disabled={isAuditing}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition text-[10px] font-mono uppercase tracking-[0.2em] font-bold disabled:opacity-50"
          >
            {isAuditing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Executing Regulatory Audit Against Public Standards...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Run Automated Regulatory Audit</span>
              </>
            )}
          </button>
        </div>

        {/* Audit Output Result */}
        {auditResult && (
          <div className="mt-4 p-5 border border-white/20 bg-black/80 space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold text-white uppercase text-[10px] tracking-widest">Public Regulatory Audit Summary:</span>
              <span className="font-bold text-amber-400 text-sm">{auditResult.complianceScore}% PUBLIC COMPLIANCE SCORE</span>
            </div>

            <div className="space-y-2">
              <span className="text-white/50 text-[10px] uppercase tracking-wider block">Clause Findings:</span>
              {auditResult.findings?.map((f: any, idx: number) => (
                <div key={idx} className="p-3 border border-white/10 bg-white/[0.02] flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-white text-[11px]">{f.control}</span>
                    <p className="text-white/70 text-[10px] mt-0.5">{f.notes}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    f.status === 'Pass' ? 'text-emerald-400 border border-emerald-500/30' :
                    f.status === 'Fail' ? 'text-red-500 border border-red-500/30' :
                    'text-amber-400 border border-amber-500/30'
                  }`}>
                    {f.status}
                  </span>
                </div>
              ))}
            </div>

            {auditResult.actionPlan && (
              <div className="p-3 border border-white/20 bg-white/[0.03] text-white/90 space-y-1">
                <span className="font-bold text-white block text-[10px] uppercase tracking-widest">Recommended Statutory Remediation Plan:</span>
                <p className="whitespace-pre-line text-[11px] leading-relaxed">{auditResult.actionPlan}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
