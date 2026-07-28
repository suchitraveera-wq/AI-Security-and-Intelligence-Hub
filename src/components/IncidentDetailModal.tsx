import React from 'react';
import { 
  X, 
  CheckCircle2
} from 'lucide-react';
import { IncidentNewsItem } from '../types';

interface IncidentDetailModalProps {
  incident: IncidentNewsItem | null;
  onClose: () => void;
}

export const IncidentDetailModal: React.FC<IncidentDetailModalProps> = ({
  incident,
  onClose,
}) => {
  if (!incident) return null;

  const isCritical = incident.severity === 'Critical';
  const isHigh = incident.severity === 'High';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0A0A0B] border border-white/10 max-w-2xl w-full p-8 shadow-2xl relative space-y-6 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-2 text-white/40 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3 pr-8 font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[9px] font-bold px-2 py-0.5 uppercase border ${
              isCritical ? 'text-red-400 border-red-500/40 bg-red-950/20' :
              isHigh ? 'text-amber-400 border-amber-500/40 bg-amber-950/20' :
              'text-white/60 border-white/20'
            }`}>
              {incident.severity} SEVERITY
            </span>
            <span className="text-[9px] px-2 py-0.5 border border-white/10 text-white/60 uppercase">
              {incident.category.replace('_', ' ')}
            </span>
            {incident.cveId && (
              <span className="text-[9px] font-bold text-red-400 px-2 py-0.5 border border-red-500/40">
                {incident.cveId}
              </span>
            )}
          </div>

          <h2 className="text-2xl font-serif italic text-white leading-snug">
            {incident.title}
          </h2>

          <div className="flex items-center space-x-3 text-[10px] text-white/40 uppercase tracking-widest">
            <span>Reported: {new Date(incident.date).toLocaleDateString()}</span>
            <span>//</span>
            <span>Source: {incident.source}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-5 text-xs text-white/80 leading-relaxed border-t border-b border-white/10 py-5">
          <div>
            <h3 className="font-mono uppercase tracking-widest text-[10px] text-white/40 font-bold mb-1.5">Executive Incident Summary</h3>
            <p className="leading-relaxed">{incident.summary}</p>
          </div>

          {incident.fullContent && (
            <div>
              <h3 className="font-mono uppercase tracking-widest text-[10px] text-white/40 font-bold mb-1.5">Detailed Technical Threat Vector</h3>
              <p className="leading-relaxed">{incident.fullContent}</p>
            </div>
          )}

          {/* Remediation Box */}
          {incident.remediationAction && (
            <div className="p-4 border border-emerald-500/30 bg-emerald-950/10 text-xs space-y-1.5 font-mono">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-[10px] uppercase tracking-widest">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Recommended Technical Mitigation</span>
              </div>
              <p className="text-emerald-300 text-[11px] leading-relaxed">
                {incident.remediationAction}
              </p>
            </div>
          )}

          {/* Affected Frameworks & Tags */}
          <div className="space-y-2 pt-1 font-mono">
            <span className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Affected AI Frameworks & Tools:</span>
            <div className="flex flex-wrap gap-1.5">
              {incident.affectedFrameworks.map((fw, idx) => (
                <span key={idx} className="px-2 py-1 border border-white/15 text-white/80 text-[10px] uppercase">
                  {fw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center space-x-2 font-mono">
            <span className="text-[10px] uppercase text-white/40 tracking-widest">CVSS Score:</span>
            <span className="font-bold text-white font-serif text-lg">{incident.impactScore} / 10</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white text-black hover:bg-white/80 transition text-[10px] font-mono uppercase tracking-[0.2em] font-bold"
          >
            Close Incident Report
          </button>
        </div>
      </div>
    </div>
  );
};
