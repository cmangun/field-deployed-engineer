// src/data/caseStudies/types.ts
// ═══════════════════════════════════════════════════════════════════════════════
// CANONICAL CASE STUDY SCHEMA — Pfizer as gold standard
// All case studies MUST conform to NormalizedCaseStudy
// ═══════════════════════════════════════════════════════════════════════════════

export interface HeroStat {
  id: string;              // 'patients', 'latency', etc.
  label: string;           // 'HCPs Enabled'
  value: string;           // '12,500+'
  annotation?: string;     // 'In 9 months'
}

export interface CaseStudyMetricBlock {
  label: string;           // 'Approval cycle time'
  baseline: string;        // '21 days'
  outcome: string;         // '7 days'
  delta: string;           // '-67%'
  unit?: string;           // 'days', '%'
  note?: string;
}

export interface CaseStudySection {
  id: string;              // 'diagnose' | 'architect' | 'engineer' | 'enable' | 'impact'
  title: string;           // 'Diagnose - Why Pfizer Colab?'
  eyebrow?: string;        // 'Phase 1 · 2 weeks' — appears above section title
  summary: string;         // 1-3 sentence narrative
  duration?: string;       // '3 months'
  kpiFocus?: string;       // 'Cycle time, search depth'
  decisionOwner?: string;  // 'VP Medical Affairs'
  bullets: string[];       // key beats
  deliverables: string[];  // assets produced
  metrics: CaseStudyMetricBlock[];
  chartKeys?: string[];    // ['FunnelChart', 'SystemContextDiagram']
}

export interface NormalizedCaseStudy {
  slug: string;              // 'pfizer'
  client: string;            // 'Pfizer'
  title: string;
  subtitle: string;
  category: string;          // 'Healthcare - RAG Platform'
  heroImage?: string;        // Hero background image path
  brandLogo?: string;        // Client logo path
  heroStats: HeroStat[];
  sections: CaseStudySection[]; // 5 phases: diagnose, architect, engineer, enable, impact
  tags?: string[];
  primaryCharts?: string[];  // global highlight charts
  nextCaseStudy?: {
    slug: string;
    title: string;
  };
}

// Phase ID type for strict typing
export type PhaseId = 'diagnose' | 'architect' | 'engineer' | 'enable' | 'impact';

// Default charts per section type
export const DEFAULT_SECTION_CHARTS: Record<string, string[]> = {
  diagnose: ['SystemContextDiagram', 'FunnelChart'],
  architect: ['RAGPipeline', 'GanttChart'],
  engineer: ['ServiceHealthDashboard', 'ModelCard'],
  enable: ['CustomerJourneyMap', 'OrgHealthDashboard'],
  impact: ['WaterfallChart', 'UnitEconomics']
};
