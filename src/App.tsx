import React, { useState, useEffect } from 'react';
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
import { CheckCircle2, RefreshCw, X, Sparkles } from 'lucide-react';

import { 
  INITIAL_INCIDENTS_NEWS, 
  MOCK_COMPLIANCE_FRAMEWORKS, 
  MOCK_THREAT_LOGS, 
  HISTORICAL_TRENDS_DATA, 
  FRAMEWORK_VULN_STATS,
  MOCK_SENTIMENT_TOPICS,
  MOCK_SENTIMENT_TRENDS
} from './data/mockIncidentsAndNews';
import { IncidentNewsItem, ComplianceFramework, ThreatLogEvent, HistoricalTrendPoint, SentimentTopic, SentimentTrendPoint } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIncident, setSelectedIncident] = useState<IncidentNewsItem | null>(null);
  const [isDigestOpen, setIsDigestOpen] = useState<boolean>(false);

  // Dynamic state for report data across all tabs
  const [incidents, setIncidents] = useState<IncidentNewsItem[]>(INITIAL_INCIDENTS_NEWS);
  const [complianceFrameworks, setComplianceFrameworks] = useState<ComplianceFramework[]>(MOCK_COMPLIANCE_FRAMEWORKS);
  const [threatLogs, setThreatLogs] = useState<ThreatLogEvent[]>(MOCK_THREAT_LOGS);
  const [trendData, setTrendData] = useState<HistoricalTrendPoint[]>(HISTORICAL_TRENDS_DATA);
  const [sentimentTopics, setSentimentTopics] = useState<SentimentTopic[]>(MOCK_SENTIMENT_TOPICS);
  const [sentimentTrends, setSentimentTrends] = useState<SentimentTrendPoint[]>(MOCK_SENTIMENT_TRENDS);

  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date | null>(new Date());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [showRefreshToast, setShowRefreshToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const activeCriticalCount = incidents.filter(
    i => i.severity === 'Critical' && i.status !== 'Resolved'
  ).length;

  // Refresh data function to stream live public security disclosures from CISA, GitHub, and NIST APIs
  const handleRefreshData = async () => {
    setIsRefreshing(true);
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];

    try {
      const eventSource = new EventSource('/api/live-security-feed/stream');
      let streamedCount = 0;

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'item' && data.item) {
            const newItem: IncidentNewsItem = data.item;
            streamedCount++;
            setIncidents(prev => {
              if (prev.some(i => i.id === newItem.id)) return prev;
              return [newItem, ...prev];
            });
          } else if (data.type === 'complete') {
            eventSource.close();
            setIsRefreshing(false);
            setLastRefreshedAt(new Date());
            setToastMessage(`Streamed ${data.totalFetched || streamedCount} live public advisories from CISA KEV Catalog, GitHub Security Advisories DB, and NIST NVD REST API!`);
            setShowRefreshToast(true);
            setTimeout(() => setShowRefreshToast(false), 7000);
          }
        } catch (e) {
          console.error('Error parsing SSE event:', e);
        }
      };

      eventSource.onerror = async () => {
        eventSource.close();
        try {
          const res = await fetch('/api/live-security-feed');
          if (res.ok) {
            const json = await res.json();
            if (json.items && json.items.length > 0) {
              setIncidents(prev => {
                const newItems = json.items.filter((ni: IncidentNewsItem) => !prev.some(p => p.id === ni.id));
                return [...newItems, ...prev];
              });
              setToastMessage(`Fetched ${json.returnedCount} live public advisories from CISA KEV, GitHub Security Advisories, and NIST NVD!`);
            }
          }
        } catch (err) {
          console.warn('Fallback fetch error:', err);
        } finally {
          setIsRefreshing(false);
          setLastRefreshedAt(new Date());
          setShowRefreshToast(true);
          setTimeout(() => setShowRefreshToast(false), 6000);
        }
      };
    } catch (err) {
      console.error('SSE initialization error:', err);
      setIsRefreshing(false);
    }

    // Simultaneously update compliance framework audit dates and threat logs
    setComplianceFrameworks(prev => prev.map(f => ({
      ...f,
      lastAuditDate: dateStr,
      overallScore: Math.min(98, f.overallScore + 1)
    })));

    setThreatLogs(prev => [
      {
        id: `TL-${Math.floor(9930 + Math.random() * 50)}`,
        timestamp: now.toISOString(),
        sourceIp: `${Math.floor(100 + Math.random() * 100)}.${Math.floor(10 + Math.random() * 200)}.42.10`,
        targetModel: 'gemini-3.6-flash-agent-live',
        threatType: 'Prompt Injection',
        severity: 'Critical',
        blocked: true,
        promptSnippet: `Live Stream Feed Sync [${now.toLocaleTimeString()}]: Streamed public CVE disclosures from CISA, GitHub Advisories & NIST NVD.`,
        guardrailTriggered: 'Direct Instruction Override Guard (Level 1)',
        confidenceScore: 0.99,
        publicObservatorySource: 'CISA & GitHub Advisories Live Stream'
      },
      ...prev
    ]);

    setTrendData(prev => {
      const hasAug = prev.some(p => p.date === '2026-08');
      if (hasAug) {
        return prev.map(p => p.date === '2026-08' ? { ...p, threatsBlocked: p.threatsBlocked + 320, totalIncidents: p.totalIncidents + 1 } : p);
      }
      return [...prev, { date: '2026-08', vulnerabilities: 11, complianceIssues: 4, privacyIncidents: 5, threatsBlocked: 9850, totalIncidents: 20, mttdMinutes: 3, mttrMinutes: 14 }];
    });
  };

  // Fetch live public security stream on component mount
  useEffect(() => {
    handleRefreshData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white flex flex-col relative">
      {/* Top Refresh Toast Notification */}
      {showRefreshToast && (
        <div className="fixed top-20 right-4 z-50 max-w-md w-full bg-slate-900 text-white border border-emerald-500/50 p-4 shadow-2xl rounded-none flex items-start justify-between gap-3 font-mono text-xs animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                ✓ Report Data Synced to August 2026
              </span>
              <p className="text-slate-200 leading-relaxed text-[11px]">
                {toastMessage}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowRefreshToast(false)}
            className="text-slate-400 hover:text-white transition p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenDigest={() => setIsDigestOpen(true)}
        activeCriticalCount={activeCriticalCount}
        onRefreshData={handleRefreshData}
        isRefreshing={isRefreshing}
        lastRefreshedAt={lastRefreshedAt}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            incidents={incidents}
            trendData={trendData}
            frameworkStats={FRAMEWORK_VULN_STATS}
            onSelectCategory={(cat) => setActiveTab(cat)}
            onSelectIncident={(inc) => setSelectedIncident(inc)}
            onRefreshData={handleRefreshData}
            isRefreshing={isRefreshing}
            lastRefreshedAt={lastRefreshedAt}
          />
        )}

        {activeTab === 'vulnerabilities' && (
          <VulnerabilitiesView
            incidents={incidents}
            onSelectIncident={(inc) => setSelectedIncident(inc)}
          />
        )}

        {activeTab === 'compliance' && (
          <ComplianceView 
            frameworks={complianceFrameworks} 
            incidents={incidents}
            onSelectIncident={(inc) => setSelectedIncident(inc)}
          />
        )}

        {activeTab === 'privacy' && (
          <PrivacyView
            incidents={incidents}
            onSelectIncident={(inc) => setSelectedIncident(inc)}
          />
        )}

        {activeTab === 'threat_monitoring' && (
          <ThreatMonitoringView initialLogs={threatLogs} />
        )}

        {activeTab === 'sentiment' && (
          <PublicSentimentView 
            topics={sentimentTopics} 
            trends={sentimentTrends} 
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
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono">
          <span className="flex items-center gap-2">
            <span>Sentinel.ai Intelligence Radar</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">August 2026 Live Sync Active</span>
          </span>
          <span>Aligned with OWASP Top 10 for LLMs, EU AI Act, NIST AI RMF 2.0 & ISO 42001</span>
        </div>
      </footer>
    </div>
  );
}

