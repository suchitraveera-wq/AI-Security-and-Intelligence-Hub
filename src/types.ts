export type CategoryType = 
  | 'vulnerabilities' 
  | 'compliance' 
  | 'privacy' 
  | 'threat_monitoring'
  | 'sentiment';

export type ThreatSeverity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';

export type PublicSourceCategory = 
  | 'frontier_labs'       // OpenAI, Anthropic, Google DeepMind, Meta AI, Microsoft
  | 'security_firms'      // Palo Alto Unit 42, Wiz, HiddenLayer, Protect AI, Adversa AI
  | 'monitoring_services' // Arize AI, LangSmith, Weights & Biases, Datadog AI
  | 'app_developers'      // LangChain, LlamaIndex, CrewAI, AutoGPT, Ollama, vLLM, HuggingFace
  | 'industry_deployments'// Healthcare, Financial Services, E-Commerce, Automotive AI
  | 'domain_experts'      // OWASP LLM Top 10, NIST AI RMF, EU AI Act, MITRE ATLAS
  | 'news_media';         // Ars Technica, Wired, TechCrunch, SecurityWeek, arXiv

export interface PublicSourceInfo {
  id: string;
  name: string;
  category: PublicSourceCategory;
  description: string;
  websiteUrl: string;
  articleCount: number;
}

export interface IncidentNewsItem {
  id: string;
  title: string;
  summary: string;
  fullContent?: string;
  category: CategoryType;
  severity: ThreatSeverity;
  date: string; // ISO date string or formatted string
  source: string;
  sourceCategory: PublicSourceCategory;
  sourceUrl?: string;
  affectedFrameworks: string[]; // e.g. ['LangChain', 'OpenAI API', 'Ollama', 'vLLM', 'AutoGPT']
  cveId?: string;
  cweId?: string;
  impactScore: number; // 1-10
  status: 'Active' | 'Mitigated' | 'Investigating' | 'Resolved';
  remediationAction?: string;
  tags: string[];
}

export interface ComplianceFramework {
  id: string;
  name: string;
  shortCode: string;
  version: string;
  description: string;
  governingBody: string;
  officialSourceUrl: string;
  publicAdoptionRate: string;
  overallScore: number; // 0 - 100 public benchmark score
  controlsCount: {
    passed: number;
    failed: number;
    warning: number;
    total: number;
  };
  lastAuditDate: string;
  requirements: ComplianceRequirement[];
}

export interface ComplianceRequirement {
  id: string;
  code: string;
  title: string;
  description: string;
  status: 'Compliant' | 'Non-Compliant' | 'Needs Review' | 'Not Applicable';
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  category: string;
  publicSource: string;
  publicSourceUrl: string;
  publicIndustryBenchmark: string;
  publicPrecedentCase?: string;
  recommendedFix?: string;
}

export interface ThreatLogEvent {
  id: string;
  timestamp: string;
  sourceIp: string;
  targetModel: string;
  threatType: 'Prompt Injection' | 'Data Exfiltration' | 'Model Poisoning' | 'PII Leak' | 'Jailbreak Attempt' | 'DoS / Token Exhaustion' | 'Unauthorized Agent Action';
  severity: ThreatSeverity;
  blocked: boolean;
  promptSnippet: string;
  guardrailTriggered: string;
  confidenceScore: number;
  publicObservatorySource?: string;
}

export interface ScanResult {
  scanId: string;
  timestamp: string;
  targetType: 'System Prompt' | 'Model Configuration' | 'Agent Tool Code' | 'Data Pipeline';
  overallRiskScore: number; // 0 - 100 (100 is max risk)
  vulnerabilitiesFound: {
    title: string;
    type: string;
    severity: ThreatSeverity;
    description: string;
    impact: string;
    remediationCode?: string;
  }[];
  complianceGaps: {
    framework: string;
    clause: string;
    issue: string;
  }[];
  aiAnalysis: string;
}

export interface HistoricalTrendPoint {
  date: string;
  vulnerabilities: number;
  complianceIssues: number;
  privacyIncidents: number;
  threatsBlocked: number;
  totalIncidents: number;
  mttdMinutes: number; // Mean time to detect
  mttrMinutes: number; // Mean time to remediate
}

export interface FrameworkVulnerabilityStat {
  framework: string;
  cveCount: number;
  avgSeverity: number;
  mostCommonIssue: string;
}

export interface SentimentTopic {
  id: string;
  topic: string;
  category: 'vulnerabilities' | 'compliance' | 'privacy' | 'threat_monitoring';
  positivePct: number;
  neutralPct: number;
  negativePct: number;
  sentimentScore: number; // -100 to +100
  trustIndex: number; // 0 to 100
  sampleVolume: string; // e.g. "142.5k posts"
  keyDrivers: string[];
  recentPublicQuote: string;
  quoteAuthor: string;
}

export interface SentimentTrendPoint {
  date: string;
  positiveRatio: number;
  negativeRatio: number;
  trustScore: number;
  regulatorySupportScore: number;
}

