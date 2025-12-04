// src/data/caseStudies/pfizer.normalized.ts
// ═══════════════════════════════════════════════════════════════════════════════
// PFIZER CASE STUDY — NORMALIZED (GOLD REFERENCE)
// Unified end-to-end story: Diagnose → Architect → Engineer → Enable → Impact
// ═══════════════════════════════════════════════════════════════════════════════

import type { NormalizedCaseStudy } from './types';

export const pfizerNormalized: NormalizedCaseStudy = {
  slug: 'pfizer',
  client: 'Pfizer Global Commercial & Digital',
  title: 'Pfizer AI Content Engine',
  subtitle: 'Reduced MLR review cycles by 65% (42 → 14 days), tripled approved AI-assisted content, and unlocked $2M+ annual savings by building a governed AI content engine that sits inside Pfizer\'s existing CLM/CRM stack.',
  category: 'Pharma · RAG · MLR Compliance · Knowledge Engineering',
  heroImage: '/assets/img/case-studies/_showcase/Sanofi 2.png',
  brandLogo: '/assets/img/logo/Pfizer_(2021).png',

  heroStats: [
    {
      id: 'cycle-time',
      label: 'Cycle Time',
      value: '42 → 14 days',
      annotation: '-65%'
    },
    {
      id: 'throughput',
      label: 'Throughput',
      value: '272 → 816 assets/mo',
      annotation: '3×'
    },
    {
      id: 'savings',
      label: 'Savings',
      value: '$2.08M',
      annotation: 'annualized'
    }
  ],

  sections: [
    // ─────────────────────────────────────────────────────────────────────────
    // DIAGNOSE
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'diagnose',
      title: 'Diagnose – Find the real constraint before building anything',
      summary: 'The organization did not know whether AI initiatives were constrained by demand, MLR review capacity, or production throughput. Diagnostics showed that search, retrieval, and revision loops inside the MLR pipeline were the binding constraints. By combining interviews, process mapping, and log analysis, we established a quantitative baseline for review cycles, revision rates, and search time across three priority brands.',
      duration: '2 weeks',
      kpiFocus: 'Review cycle time & revision rate',
      decisionOwner: 'Commercial Operations',
      bullets: [
        'Mapped end-to-end content flow from brief to field deployment',
        'Measured search time, queue delays, and revision loops at each stage',
        'Showed that 75% of delays clustered in Search & Retrieval and early MLR triage',
        'Documented that ~40% of assets required multiple revision cycles'
      ],
      deliverables: [
        'MLR Cycle-Time Baseline',
        'Content Funnel & Bottleneck Analysis',
        'RACI Accountability Map',
        'Risk Register for AI Interventions'
      ],
      metrics: [
        {
          label: 'Avg Review Cycle',
          baseline: '42 days',
          outcome: '14 days',
          delta: '-65%',
          unit: 'days'
        },
        {
          label: 'Assets per Quarter',
          baseline: '2,450+',
          outcome: '2,450+',
          delta: 'baseline established'
        },
        {
          label: 'Revision Rate',
          baseline: '40%',
          outcome: '15%',
          delta: '-62%'
        }
      ],
      chartKeys: ['FunnelChart', 'RACIMatrix']
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ARCHITECT
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'architect',
      title: 'Architect – Design the smallest compliant surface area that can scale',
      summary: 'We needed an AI system that could plug into existing CLM/CRM and survive MLR scrutiny without becoming a shadow system of record. We designed a governed "datasphere" and RAG engine that kept Salesforce/CLM as system of record and treated the AI layer as stateless and replaceable. We defined a Colab datasphere pattern where content lives in existing stores (SharePoint, Veeva, Workfront) while the AI engine orchestrates retrieval and drafting under explicit compliance boundaries.',
      duration: '2 weeks',
      kpiFocus: 'Architecture sign-off',
      decisionOwner: 'Enterprise Architecture',
      bullets: [
        'C4 system-context diagram with five external integrations',
        'Explicit separation of systems of record vs. AI orchestration layer',
        'Integration contracts for SharePoint, Veeva Vault, Workfront, Teams, and Azure OpenAI',
        'Non-functional requirements defined for latency, auditability, and data residency'
      ],
      deliverables: [
        'C4 System Context Diagram',
        'RAG Pipeline Blueprint',
        'Integration & Data-Flow Contracts',
        'Architecture Decision Records (ADRs)'
      ],
      metrics: [
        {
          label: 'External Integrations',
          baseline: '0',
          outcome: '5',
          delta: '+5 systems'
        },
        {
          label: 'Retrieval Accuracy Target',
          baseline: 'N/A',
          outcome: '>85%',
          delta: 'SLO defined'
        }
      ],
      chartKeys: ['SystemContextDiagram', 'RAGPipeline', 'GanttChart']
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ENGINEER
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'engineer',
      title: 'Engineer – Turn a diagram into a service that behaves under load',
      summary: 'We had to prove the RAG co-pilot could handle real workloads, not just demos, while respecting strict MLR and security constraints. Built a production RAG co-pilot with clear SLOs, service-health dashboards, and incident paths, reducing p95 latency from 850ms to ~280ms and reaching 99.7% uptime. We implemented the RAG pipeline, instrumented it like any other tier-1 service, and exposed a single AI content API with role-aware access and MLR-aware guardrails.',
      duration: '6 weeks',
      kpiFocus: 'p95 latency, uptime, and error rate',
      decisionOwner: 'Platform Engineering',
      bullets: [
        'Hybrid search (semantic + keyword) with caching on hot paths',
        'Single AI Content API with role-aware access control',
        'End-to-end service health instrumentation (uptime, latency, error rate)',
        'MLR gateway checks and audit logging for every AI suggestion'
      ],
      deliverables: [
        'Production RAG Pipeline',
        'AI Content API',
        'Service-Health & Latency Dashboard',
        'Incident Playbooks & On-Call Runbooks'
      ],
      metrics: [
        {
          label: 'p95 Latency',
          baseline: '850ms',
          outcome: '280ms',
          delta: '-67%',
          unit: 'ms'
        },
        {
          label: 'Uptime',
          baseline: 'N/A',
          outcome: '99.7%',
          delta: 'SLO met'
        },
        {
          label: 'Daily Queries',
          baseline: '0',
          outcome: '4,200+',
          delta: 'production scale'
        }
      ],
      chartKeys: ['ServiceHealthDashboard', 'LatencyPercentiles', 'DataQualityScorecard', 'ModelCard']
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ENABLE
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'enable',
      title: 'Enable – If no one uses it, it does not exist',
      summary: 'Without adoption by MLR reviewers, brand teams, and producers, the engine would become yet another unused AI experiment. Embedded the co-pilot into existing tools, trained producers and admins, and reached >200 active users with 94% training completion and 4.2/5 satisfaction. We branded and deployed the co-pilot as "CoCo – the Company Companion," embedded directly in Teams and CLM surfaces with targeted onboarding journeys.',
      duration: '4 weeks',
      kpiFocus: 'User activation & satisfaction',
      decisionOwner: 'Learning & Development',
      bullets: [
        'Producer journey redesign focused on search and pre-review',
        'Hands-on training for 200+ content producers',
        'Power-user track for platform admins and MLR champions',
        'Monthly office hours and playbook updates based on real use'
      ],
      deliverables: [
        'Producer Journey & UX Flows',
        'Training & Governance Playbook',
        'Org-Adoption & Health Dashboard'
      ],
      metrics: [
        {
          label: 'Users Onboarded',
          baseline: '0',
          outcome: '208',
          delta: '+208'
        },
        {
          label: 'Satisfaction Score',
          baseline: '3.1/5',
          outcome: '4.2/5',
          delta: '+35%'
        },
        {
          label: 'Training Completion',
          baseline: 'N/A',
          outcome: '94%',
          delta: 'target exceeded'
        }
      ],
      chartKeys: ['CustomerJourneyMap', 'OrgHealthDashboard']
    },

    // ─────────────────────────────────────────────────────────────────────────
    // IMPACT
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'impact',
      title: 'Impact – Prove the economics, then expand',
      summary: 'Leaders needed durable ROI proof to justify ongoing investment and expansion into additional therapeutic areas. Showed 65% cycle-time reduction, 3× throughput, and $2.08M in annual savings with a clear path to multi-brand expansion. We translated performance and usage telemetry into an executive-level ROI model and expansion roadmap tied directly to cycle time, volume, and rework savings.',
      duration: 'Ongoing',
      kpiFocus: 'ROI & expansion readiness',
      decisionOwner: 'Product & Finance',
      bullets: [
        'Cost waterfall decomposing where savings actually came from',
        'Unit-economics model at the "per asset" level',
        'Usage seasonality and trend analysis across quarters',
        'Phase-2 roadmap for 5+ additional therapeutic areas'
      ],
      deliverables: [
        'ROI Waterfall & Savings Model',
        'Unit-Economics Model',
        'Usage Seasonality Report',
        'Executive KPI Grid'
      ],
      metrics: [
        {
          label: 'Cycle Time Reduction',
          baseline: '42 days',
          outcome: '14 days',
          delta: '-65%'
        },
        {
          label: 'Throughput Increase',
          baseline: '272 assets/mo',
          outcome: '816 assets/mo',
          delta: '3×'
        },
        {
          label: 'Annual Savings',
          baseline: '$0',
          outcome: '$2.08M',
          delta: '+$2.08M'
        }
      ],
      chartKeys: ['WaterfallChart', 'UnitEconomics', 'SparklineGrid', 'CalendarHeatmap']
    }
  ],

  tags: ['RAG', 'MLR', 'Pharma', 'Azure OpenAI', 'Knowledge Engineering', 'Content Ops', 'Change Management'],
  primaryCharts: ['FunnelChart', 'SystemContextDiagram', 'ServiceHealthDashboard', 'CustomerJourneyMap', 'WaterfallChart'],

  nextCaseStudy: {
    slug: 'binaxnow',
    title: 'Abbott BinaxNOW Diagnostic Platform'
  }
};
