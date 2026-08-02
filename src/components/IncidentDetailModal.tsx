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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 max-w-2xl w-full p-8 shadow-xl relative space-y-6 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-2 text-slate-400 hover:text-slate-900 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3 pr-8 font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[9px] font-bold px-2 py-0.5 uppercase border ${
              isCritical ? 'text-red-700 border-red-300 bg-red-50' :
              isHigh ? 'text-amber-700 border-amber-300 bg-amber-50' :
              'text-slate-700 border-slate-300 bg-slate-100'
            }`}>
              {incident.severity} SEVERITY
            </span>
            <span className="text-[9px] px-2 py-0.5 border border-slate-200 bg-slate-50 text-slate-600 uppercase font-semibold">
              {incident.category.replace('_', ' ')}
            </span>
            {incident.cveId && (
              <span className="text-[9px] font-bold text-red-700 px-2 py-0.5 border border-red-300 bg-red-50">
                {incident.cveId}
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-serif italic text-slate-900 leading-snug">
            {incident.title}
          </h2>

          <div className="flex items-center space-x-3 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
            <span>Reported: {new Date(incident.date).toLocaleDateString()}</span>
            <span>//</span>
            <span>Source: {incident.source}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-5 text-xs text-slate-700 leading-relaxed border-t border-b border-slate-200 py-5">
          <div>
            <h3 className="font-mono uppercase tracking-widest text-[10px] text-slate-500 font-bold mb-1.5">Executive Incident Summary</h3>
            <p className="leading-relaxed text-slate-800">{incident.summary}</p>
          </div>

          {incident.fullContent && (
            <div>
              <h3 className="font-mono uppercase tracking-widest text-[10px] text-slate-500 font-bold mb-1.5">Detailed Technical Threat Vector</h3>
              <p className="leading-relaxed text-slate-800">{incident.fullContent}</p>
            </div>
          )}

          {/* Remediation Box */}
          {incident.remediationAction && (
            <div className="p-4 border border-emerald-300 bg-emerald-50 text-xs space-y-1.5 font-mono">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-[10px] uppercase tracking-widest">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Recommended Technical Mitigation</span>
              </div>
              <p className="text-emerald-950 text-[11px] leading-relaxed font-medium">
                {incident.remediationAction}
              </p>
            </div>
          )}

          {/* Affected Frameworks & Tags */}
          <div className="space-y-2 pt-1 font-mono">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 block font-bold">Affected AI Frameworks & Tools:</span>
            <div className="flex flex-wrap gap-1.5">
              {incident.affectedFrameworks.map((fw, idx) => (
                <span key={idx} className="px-2 py-1 border border-slate-200 bg-slate-50 text-slate-700 text-[10px] uppercase font-semibold">
                  {fw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center space-x-2 font-mono">
            <span className="text-[10px] uppercase text-slate-500 tracking-widest font-bold">CVSS Score:</span>
            <span className="font-bold text-slate-900 font-serif text-lg">{incident.impactScore} / 10</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 transition text-[10px] font-mono uppercase tracking-[0.2em] font-bold shadow-xs"
          >
            Close Incident Report
          </button>
        </div>
      </div>
    </div>
  );
};
