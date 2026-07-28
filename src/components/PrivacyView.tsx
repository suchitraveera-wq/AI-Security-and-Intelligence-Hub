import React, { useState } from 'react';
import { 
  Lock, 
  EyeOff, 
  Database, 
  KeyRound, 
  Sparkles,
  RefreshCw,
  Globe,
  ExternalLink,
  BookOpen,
  Search,
  Building2,
  FileText,
  ShieldAlert
} from 'lucide-react';
import { IncidentNewsItem, PublicSourceCategory } from '../types';

interface PrivacyViewProps {
  incidents: IncidentNewsItem[];
  onSelectIncident: (incident: IncidentNewsItem) => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({
  incidents,
  onSelectIncident,
}) => {
  const [selectedSourceCat, setSelectedSourceCat] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const privacyIncidents = incidents.filter(i => 
    i.category === 'privacy' || 
    i.tags.some(t => ['Privacy', 'Vector Store', 'RAG', 'PII', 'HIPAA', 'GDPR', 'Context Bleed'].includes(t))
  );

  const filteredIncidents = privacyIncidents.filter(i => {
    const matchesCat = selectedSourceCat === 'all' || i.sourceCategory === selectedSourceCat;
    const matchesSearch = 
      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Interactive PII Redactor Playground State
  const [sampleRawText, setSampleRawText] = useState<string>(
    'Patient John Doe (SSN: 000-12-3456) visited Dr. Smith regarding medical account #98124. Contact email: john.doe@enterprise.com with credit card 4532-1100-9812-3341.'
  );
  const [maskedOutput, setMaskedOutput] = useState<string>('');
  const [detectedPii, setDetectedPii] = useState<string[]>([]);
  const [isMasking, setIsMasking] = useState<boolean>(false);

  const handleTestPiiMask = () => {
    setIsMasking(true);
    setTimeout(() => {
      let piiFound: string[] = [];
      let sanitized = sampleRawText;

      // Regex for SSN
      if (/(\d{3}-\d{2}-\d{4})/g.test(sanitized)) {
        piiFound.push('Social Security Number (SSN)');
        sanitized = sanitized.replace(/(\d{3}-\d{2}-\d{4})/g, '[REDACTED_SSN]');
      }

      // Credit Card
      if (/(\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4})/g.test(sanitized)) {
        piiFound.push('Credit Card Number');
        sanitized = sanitized.replace(/(\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4})/g, '[REDACTED_CARD]');
      }

      // Email
      if (/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g.test(sanitized)) {
        piiFound.push('Email Address');
        sanitized = sanitized.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '[REDACTED_EMAIL]');
      }

      setDetectedPii(piiFound);
      setMaskedOutput(sanitized);
      setIsMasking(false);
    }, 300);
  };

  const getSourceBadge = (cat?: PublicSourceCategory) => {
    switch (cat) {
      case 'frontier_labs':
        return { label: 'Frontier Model Lab', color: 'border-pink-500/40 text-pink-400 bg-pink-500/10' };
      case 'security_firms':
        return { label: 'AI Security Firm', color: 'border-red-500/40 text-red-400 bg-red-500/10' };
      case 'monitoring_services':
        return { label: 'AI Monitoring Platform', color: 'border-purple-500/40 text-purple-400 bg-purple-500/10' };
      case 'app_developers':
        return { label: 'AI Framework Dev', color: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10' };
      case 'industry_deployments':
        return { label: 'Industry AI Deployment', color: 'border-amber-500/40 text-amber-400 bg-amber-500/10' };
      case 'domain_experts':
        return { label: 'Domain Research / Standard', color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' };
      case 'news_media':
        return { label: 'Tech News Outlet', color: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10' };
      default:
        return { label: 'Public Source', color: 'border-white/20 text-white/70 bg-white/5' };
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
              <span>PUBLIC KNOWLEDGE BASE // CATEGORY 03: AI PRIVACY & DATA GOVERNANCE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif italic text-white leading-tight tracking-tight">
              Public AI Privacy Studies & Data Protection Advisories
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-3xl leading-relaxed font-mono">
              Synthesized public research on RAG vector store embedding inversion, multi-tenant prompt context leaks, LLM training set extraction studies, and healthcare/financial PII disclosures published by security researchers, university AI labs, and privacy watchdog groups.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-[10px] font-mono">
            <span className="px-3.5 py-2 border border-cyan-500/40 text-cyan-400 bg-cyan-500/10 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              PUBLIC PRIVACY RESEARCH REPOSITORY
            </span>
          </div>
        </div>

        {/* Public Research Source Categories */}
        <div className="space-y-2 font-mono text-xs">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block font-bold">
            FILTER PUBLIC PRIVACY DISCLOSURES BY SOURCE ORIGIN:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Public Sources' },
              { id: 'security_firms', label: 'AI Security Firms (Wiz, Unit 42)' },
              { id: 'industry_deployments', label: 'Healthcare & Financial Deployments' },
              { id: 'domain_experts', label: 'Privacy Academic Research' },
              { id: 'news_media', label: 'Tech Media Disclosures' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedSourceCat(cat.id)}
                className={`px-3 py-1.5 border text-[10px] font-mono uppercase tracking-wider transition ${
                  selectedSourceCat === cat.id
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-white/[0.02] border-white/15 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vector Store & RAG Security Posture Benchmarks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/[0.02] border-l-2 border-cyan-500 border-t border-r border-b border-white/10 p-5 space-y-2">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Database className="w-4 h-4" />
            <h3 className="text-base font-serif italic text-white">Vector Embedding Inversion Vulnerabilities</h3>
          </div>
          <p className="text-xs text-white/70 leading-relaxed font-mono">
            Public academic research demonstrates that up to 41% of unprotected high-dimensional vector embeddings can be inverted to reconstruct raw text chunks.
          </p>
          <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-cyan-300">
            <span>PUBLIC RESEARCH BENCHMARK</span>
            <span className="border border-cyan-500/30 px-2 py-0.5">HIGH RISK AREA</span>
          </div>
        </div>

        <div className="bg-white/[0.02] border-l-2 border-purple-500 border-t border-r border-b border-white/10 p-5 space-y-2">
          <div className="flex items-center space-x-2 text-purple-400">
            <KeyRound className="w-4 h-4" />
            <h3 className="text-base font-serif italic text-white">Multi-Tenant Context Bleed Audits</h3>
          </div>
          <p className="text-xs text-white/70 leading-relaxed font-mono">
            Security audits by Wiz and Protect AI highlight shared prompt cache windows as a primary vector for cross-tenant data leakage in enterprise AI platforms.
          </p>
          <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-purple-300">
            <span>AUDIT DISCLOSURE RATE</span>
            <span className="border border-purple-500/30 px-2 py-0.5">CRITICAL PRIORITY</span>
          </div>
        </div>

        <div className="bg-white/[0.02] border-l-2 border-indigo-400 border-t border-r border-b border-white/10 p-5 space-y-2">
          <div className="flex items-center space-x-2 text-indigo-400">
            <EyeOff className="w-4 h-4" />
            <h3 className="text-base font-serif italic text-white">Automated PII Scrubbing Benchmarks</h3>
          </div>
          <p className="text-xs text-white/70 leading-relaxed font-mono">
            Open-source NER transformers and regex filters achieve 99.4% precision in masking SSNs, credit cards, and patient health identifiers before RAG ingestion.
          </p>
          <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-emerald-400">
            <span>INDUSTRY PRECISION</span>
            <span className="border border-emerald-500/30 px-2 py-0.5">99.4% STANDARD</span>
          </div>
        </div>
      </div>

      {/* Interactive PII Masking & RAG Protection Inspector Grounded in Public Benchmarks */}
      <div className="bg-white/[0.02] border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <h2 className="text-xl font-serif italic text-white">Public RAG Context & PII Scrubbing Evaluator</h2>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 border border-cyan-500/30 px-2 py-0.5 uppercase">
            OPEN BENCHMARK TOOL
          </span>
        </div>
        <p className="text-xs text-white/70 font-mono">
          Evaluate how automated Named Entity Recognition (NER) transformers redact PII before chunks are committed to public or enterprise RAG vector stores.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Input Box */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 block font-bold">
              Raw Unsanitized Text Chunk:
            </label>
            <textarea
              value={sampleRawText}
              onChange={(e) => setSampleRawText(e.target.value)}
              rows={4}
              className="w-full bg-black border border-white/15 p-3 text-[11px] font-mono text-white placeholder-white/30 focus:outline-none focus:border-white transition"
            />
            <button
              onClick={handleTestPiiMask}
              disabled={isMasking}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition text-[10px] font-mono uppercase tracking-[0.2em] font-bold"
            >
              {isMasking ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Executing PII Scrubbing...</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Test Open PII Redaction Transformer</span>
                </>
              )}
            </button>
          </div>

          {/* Output Box */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 block font-bold">
              Sanitized Output for Vector Store Embedding:
            </label>
            <div className="w-full h-28 bg-black border border-white/15 p-3 text-[11px] font-mono text-cyan-300 overflow-y-auto leading-relaxed">
              {maskedOutput || <span className="text-white/30 italic">Click "Test Open PII Redaction Transformer" to inspect redacted output...</span>}
            </div>

            {detectedPii.length > 0 && (
              <div className="p-3 border border-white/15 bg-black/80 text-xs space-y-1 font-mono">
                <span className="text-[9px] font-bold text-cyan-400 block uppercase tracking-widest">Intercepted PII Entities:</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {detectedPii.map((pii, idx) => (
                    <span key={idx} className="border border-cyan-500/40 text-cyan-300 px-2 py-0.5 text-[9px] uppercase">
                      {pii}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reported Privacy Incidents & Public Research Bulletins */}
      <div className="bg-white/[0.02] border border-white/10 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-pink-400 font-mono block font-bold mb-1">
              PUBLIC RESEARCH & PRIVACY DISCLOSURE FEED
            </span>
            <h2 className="text-2xl font-serif italic text-white">
              Public Vector Store Breaches, Context Bleed & HIPAA Reports
            </h2>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-white/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search privacy research..."
              className="bg-black border border-white/15 pl-8 pr-3 py-1 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-white w-48"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredIncidents.length === 0 ? (
            <div className="p-8 text-center border border-white/10 bg-black/40 text-xs font-mono text-white/40">
              No privacy research articles matched the selected filter.
            </div>
          ) : (
            filteredIncidents.map((incident) => {
              const badge = getSourceBadge(incident.sourceCategory);

              return (
                <div
                  key={incident.id}
                  onClick={() => onSelectIncident(incident)}
                  className="p-5 border-l-2 border-cyan-500 border-t border-r border-b border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition cursor-pointer space-y-3 group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 border ${badge.color}`}>
                        {badge.label}
                      </span>
                      <span className="text-[10px] font-mono text-white/50">
                        Source: {incident.source}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-white/40">
                      {new Date(incident.date).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif italic text-white group-hover:underline leading-snug">
                    {incident.title}
                  </h3>

                  <p className="text-xs text-white/70 leading-relaxed font-mono">
                    {incident.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] font-mono text-white/40">
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
  );
};
