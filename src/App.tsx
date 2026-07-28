import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { VulnerabilitiesView } from './components/VulnerabilitiesView';
import { ComplianceView } from './components/ComplianceView';
import { PrivacyView } from './components/PrivacyView';
import { ThreatMonitoringView } from './components/ThreatMonitoringView';
import { PublicSentimentView } from './components/PublicSentimentView';
import { LiveScannerView } from './components/LiveScannerView';
import { IncidentDetailModal } from './components/IncidentDetailModal';
import { IntelligenceDigestModal } from './components/IntelligenceDigestModal';

import { 
  INITIAL_INCIDENTS_NEWS, 
  MOCK_COMPLIANCE_FRAMEWORKS, 
  MOCK_THREAT_LOGS, 
  HISTORICAL_TRENDS_DATA, 
  FRAMEWORK_VULN_STATS,
  MOCK_SENTIMENT_TOPICS,
  MOCK_SENTIMENT_TRENDS
} from './data/mockIncidentsAndNews';
import { IncidentNewsItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIncident, setSelectedIncident] = useState<IncidentNewsItem | null>(null);
  const [isDigestOpen, setIsDigestOpen] = useState<boolean>(false);

  const activeCriticalCount = INITIAL_INCIDENTS_NEWS.filter(
    i => i.severity === 'Critical' && i.status !== 'Resolved'
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Top Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenDigest={() => setIsDigestOpen(true)}
        activeCriticalCount={activeCriticalCount}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            incidents={INITIAL_INCIDENTS_NEWS}
            trendData={HISTORICAL_TRENDS_DATA}
            frameworkStats={FRAMEWORK_VULN_STATS}
            onSelectCategory={(cat) => setActiveTab(cat)}
            onSelectIncident={(inc) => setSelectedIncident(inc)}
          />
        )}

        {activeTab === 'vulnerabilities' && (
          <VulnerabilitiesView
            incidents={INITIAL_INCIDENTS_NEWS}
            onSelectIncident={(inc) => setSelectedIncident(inc)}
          />
        )}

        {activeTab === 'compliance' && (
          <ComplianceView 
            frameworks={MOCK_COMPLIANCE_FRAMEWORKS} 
            incidents={INITIAL_INCIDENTS_NEWS}
            onSelectIncident={(inc) => setSelectedIncident(inc)}
          />
        )}

        {activeTab === 'privacy' && (
          <PrivacyView
            incidents={INITIAL_INCIDENTS_NEWS}
            onSelectIncident={(inc) => setSelectedIncident(inc)}
          />
        )}

        {activeTab === 'threat_monitoring' && (
          <ThreatMonitoringView initialLogs={MOCK_THREAT_LOGS} />
        )}

        {activeTab === 'sentiment' && (
          <PublicSentimentView 
            topics={MOCK_SENTIMENT_TOPICS} 
            trends={MOCK_SENTIMENT_TRENDS} 
          />
        )}

        {activeTab === 'scanner' && (
          <LiveScannerView />
        )}
      </main>

      {/* Incident Detail Modal */}
      <IncidentDetailModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />

      {/* AI Intelligence Briefing Modal */}
      <IntelligenceDigestModal
        isOpen={isDigestOpen}
        onClose={() => setIsDigestOpen(false)}
      />

      {/* Platform Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AI Sec & Intelligence Platform — Enterprise Posture Monitoring & Threat Radar</span>
          <span>Aligned with OWASP Top 10 for LLMs, EU AI Act, NIST AI RMF 2.0 & ISO 42001</span>
        </div>
      </footer>
    </div>
  );
}
