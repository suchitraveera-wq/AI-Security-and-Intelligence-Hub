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
      <div className="bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.25em] text-pink-600 font-bold">
              <Globe className="w-3.5 h-3.5 animate-pulse" />
              <span>PUBLIC KNOWLEDGE BASE // CATEGORY 02: REGULATORY STANDARDS & ENFORCEMENT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif italic text-slate-900 leading-tight tracking-tight">
              Public AI Regulatory Frameworks & Compliance Benchmarks
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed font-mono">
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
                    ? 'bg-slate-900 text-white border border-slate-900 shadow-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                <span>{fw.shortCode}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Framework Public Metadata Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-slate-200 bg-slate-50 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-slate-500 block font-bold">Official Governing Body:</span>
            <span className="text-slate-900 font-semibold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-pink-600" />
              {activeFramework.governingBody || 'International Standards Authority'}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-slate-500 block font-bold">Official Public Source Portal:</span>
            {activeFramework.officialSourceUrl ? (
              <a
                href={activeFramework.officialSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-pink-600 hover:underline flex items-center gap-1 font-bold truncate"
              >
                <span>{activeFramework.officialSourceUrl}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            ) : (
              <span className="text-slate-600">Public Document Archive</span>
            )}
          </div>

          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-slate-500 block font-bold">Public Adoption & Status:</span>
            <span className="text-emerald-700 font-bold block truncate">
              {activeFramework.publicAdoptionRate || 'Global Industry Benchmark'}
            </span>
          </div>
        </div>
      </div>

      {/* Framework Summary Score & Control Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border-l-2 border-amber-500 border-t border-r border-b border-slate-200 p-5 flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono block">Public Compliance Score</span>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="text-4xl font-serif text-slate-900">{activeFramework.overallScore}%</span>
              <span className="text-[10px] font-mono text-amber-600 font-bold">BENCHMARK</span>
            </div>
          </div>
          <p className="text-[10px] font-mono text-slate-500 mt-3">
            PUBLIC AUDIT STREAM: {activeFramework.lastAuditDate}
          </p>
        </div>

        <div className="bg-white border-l-2 border-emerald-500 border-t border-r border-b border-slate-200 p-5 flex flex-col justify-between shadow-xs">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono block">Passed Public Controls</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-serif text-emerald-600 font-bold">{activeFramework.controlsCount.passed}</span>
            <span className="text-xs font-mono text-slate-500">/ {activeFramework.controlsCount.total} Clauses</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 mt-2 font-bold">Verified in Statutory Text</span>
        </div>

        <div className="bg-white border-l-2 border-red-500 border-t border-r border-b border-slate-200 p-5 flex flex-col justify-between shadow-xs">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono block">Non-Compliant Gaps</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-serif text-red-600 font-bold">{activeFramework.controlsCount.failed}</span>
            <span className="text-xs font-mono text-red-600">Industry Gaps</span>
          </div>
          <span className="text-[10px] font-mono text-red-600 mt-2 font-bold">Enforcement Warning</span>
        </div>

        <div className="bg-white border-l-2 border-amber-400 border-t border-r border-b border-slate-200 p-5 flex flex-col justify-between shadow-xs">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono block">Pending Reviews</span>
          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-4xl font-serif text-amber-600 font-bold">{activeFramework.controlsCount.warning}</span>
            <span className="text-xs font-mono text-slate-500">Clauses</span>
          </div>
          <span className="text-[10px] font-mono text-amber-600 mt-2 font-bold">Public Notice Draft</span>
        </div>
      </div>

      {/* Interactive Compliance Requirements List with Search & Filters */}
      <div className="bg-white border border-slate-200 p-6 space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-pink-600 font-mono block font-bold mb-1">
              STATUTORY CLAUSES & PUBLIC BENCHMARKS
            </span>
            <h2 className="text-xl font-serif italic text-slate-900">
              {activeFramework.name} Detailed Breakdown
            </h2>
            <p className="text-xs text-slate-600 mt-1 font-mono">{activeFramework.description}</p>
          </div>

          {/* Search & Status Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search clause or source..."
                className="bg-slate-50 border border-slate-300 pl-8 pr-3 py-1.5 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 w-48"
              />
            </div>

            <div className="flex items-center space-x-1 border border-slate-300 bg-slate-50 p-1 font-mono text-[10px]">
              {['all', 'compliant', 'needs review', 'non-compliant'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-1 uppercase font-bold transition ${
                    statusFilter === st 
                      ? 'bg-slate-900 text-white' 
                      : 'text-slate-600 hover:text-slate-900'
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
            <div className="p-8 text-center border border-slate-200 bg-slate-50 text-xs font-mono text-slate-500">
              No clauses matched the search filter.
            </div>
          ) : (
            filteredRequirements.map((req) => {
              const isCompliant = req.status === 'Compliant';
              const isNonCompliant = req.status === 'Non-Compliant';
              const borderAccent = isCompliant ? 'border-emerald-500' : isNonCompliant ? 'border-red-500' : 'border-amber-500';
              const statusColor = isCompliant ? 'text-emerald-700' : isNonCompliant ? 'text-red-600' : 'text-amber-700';

              return (
                <div
                  key={req.id}
                  className={`p-5 bg-white border-l-2 ${borderAccent} border-t border-r border-b border-slate-200 space-y-4 shadow-xs`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] font-mono font-bold text-amber-700 border border-amber-300 bg-amber-50 px-2 py-0.5">
                        {req.code}
                      </span>
                      <h3 className="text-base font-serif italic text-slate-900">{req.title}</h3>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${statusColor}`}>
                        {req.status}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 border border-slate-200 px-2 py-0.5 uppercase">
                        {req.riskLevel} PRIORITY
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-mono">{req.description}</p>

                  {/* Public Source Citation Block */}
                  {req.publicSource && (
                    <div className="p-3 border border-slate-200 bg-slate-50 text-xs font-mono space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-wider text-pink-600 font-bold flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          Official Public Source Citation:
                        </span>
                        {req.publicSourceUrl && (
                          <a 
                            href={req.publicSourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-slate-500 hover:text-slate-900 flex items-center gap-1 underline"
                          >
                            <span>View Source</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-slate-900 text-[11px] font-semibold">{req.publicSource}</p>
                    </div>
                  )}

                  {/* Public Industry Benchmark Stat */}
                  {req.publicIndustryBenchmark && (
                    <div className="p-3 border border-cyan-200 bg-cyan-50/60 text-xs text-cyan-900 font-mono space-y-1">
                      <span className="text-[9px] uppercase tracking-wider text-cyan-700 block font-bold">
                        Public Industry Benchmark Survey:
                      </span>
                      <p className="text-cyan-950 text-[11px] leading-relaxed">{req.publicIndustryBenchmark}</p>
                    </div>
                  )}

                  {/* Public Precedent or Enforcement Action */}
                  {req.publicPrecedentCase && (
                    <div className="p-3 border border-amber-200 bg-amber-50/60 text-xs text-amber-900 font-mono space-y-1">
                      <span className="text-[9px] uppercase tracking-wider text-amber-700 block font-bold">
                        Public Precedent & Regulatory Notice:
                      </span>
                      <p className="text-amber-950 text-[11px] leading-relaxed">{req.publicPrecedentCase}</p>
                    </div>
                  )}

                  {/* Required Remediation Fix */}
                  {req.recommendedFix && (
                    <div className="p-3 border border-red-200 bg-red-50/60 text-xs text-red-900 font-mono space-y-1">
                      <span className="text-[9px] uppercase tracking-wider text-red-700 block font-bold">Recommended Compliance Action:</span>
                      <p className="text-slate-900 text-[11px]">{req.recommendedFix}</p>
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
        <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex justify-between items-center border-b border-slate-200 pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-pink-600 font-mono block font-bold">
                PUBLIC REGULATORY DISCLOSURES & BULLETINS
              </span>
              <h2 className="text-xl font-serif italic text-slate-900">
                Official Regulatory Advisories & Industry Reports
              </h2>
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              {complianceIncidents.length} ARTICLES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complianceIncidents.map((incident) => (
              <div 
                key={incident.id}
                onClick={() => onSelectIncident && onSelectIncident(incident)}
                className="p-4 border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition space-y-2 shadow-xs"
              >
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-pink-600 font-bold border border-pink-200 bg-pink-50 px-1.5 py-0.5">
                    {incident.source}
                  </span>
                  <span className="text-slate-400">{new Date(incident.date).toLocaleDateString()}</span>
                </div>

                <h3 className="text-base font-serif italic text-slate-900 hover:underline leading-snug">
                  {incident.title}
                </h3>

                <p className="text-xs text-slate-600 font-mono line-clamp-2">
                  {incident.summary}
                </p>

                <div className="flex items-center gap-2 pt-1 text-[9px] font-mono text-slate-400">
                  {incident.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="border border-slate-200 px-1.5 py-0.5 text-slate-600">
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
      <div className="bg-white border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h2 className="text-lg font-serif italic text-slate-900">Automated AI System Compliance Auditor (Gemini Engine)</h2>
        </div>
        <p className="text-xs text-slate-600 font-mono">
          Describe your AI application architecture or system prompt to evaluate against <strong className="text-slate-900">{activeFramework.name}</strong> official public statutory clauses in real time.
        </p>

        <div className="space-y-3">
          <textarea
            value={systemDescription}
            onChange={(e) => setSystemDescription(e.target.value)}
            rows={3}
            className="w-full bg-slate-50 border border-slate-300 p-3 text-[11px] font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 transition"
            placeholder="e.g. System description of RAG agent, data retention rules, tool permissions..."
          />

          <button
            onClick={handleRunAudit}
            disabled={isAuditing}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white transition text-[10px] font-mono uppercase tracking-[0.2em] font-bold disabled:opacity-50 shadow-xs"
          >
            {isAuditing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
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
          <div className="mt-4 p-5 border border-slate-300 bg-slate-50 space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900 uppercase text-[10px] tracking-widest">Public Regulatory Audit Summary:</span>
              <span className="font-bold text-amber-700 text-sm">{auditResult.complianceScore}% PUBLIC COMPLIANCE SCORE</span>
            </div>

            <div className="space-y-2">
              <span className="text-slate-500 text-[10px] uppercase tracking-wider block">Clause Findings:</span>
              {auditResult.findings?.map((f: any, idx: number) => (
                <div key={idx} className="p-3 border border-slate-200 bg-white flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-900 text-[11px]">{f.control}</span>
                    <p className="text-slate-600 text-[10px] mt-0.5">{f.notes}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    f.status === 'Pass' ? 'text-emerald-700 border border-emerald-200 bg-emerald-50' :
                    f.status === 'Fail' ? 'text-red-700 border border-red-200 bg-red-50' :
                    'text-amber-700 border border-amber-200 bg-amber-50'
                  }`}>
                    {f.status}
                  </span>
                </div>
              ))}
            </div>

            {auditResult.actionPlan && (
              <div className="p-3 border border-slate-200 bg-white text-slate-800 space-y-1">
                <span className="font-bold text-slate-900 block text-[10px] uppercase tracking-widest">Recommended Statutory Remediation Plan:</span>
                <p className="whitespace-pre-line text-[11px] leading-relaxed">{auditResult.actionPlan}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
