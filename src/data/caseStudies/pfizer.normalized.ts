// src/data/caseStudies/pfizer.normalized.ts
// ═══════════════════════════════════════════════════════════════════════════════
// PFIZER CASE STUDY — NORMALIZED (GOLD REFERENCE)
// All other case studies MUST follow this structure, naming, and pattern
// ═══════════════════════════════════════════════════════════════════════════════

import type { NormalizedCaseStudy } from './types';

export const pfizerNormalized: NormalizedCaseStudy = {
  slug: 'pfizer',
  client: 'Pfizer',
  title: 'CoCo: The Company Companion for Global Medical Content',
  subtitle: 'Turning scattered MLR content into a single, searchable RAG assistant.',
  category: 'Pharma · RAG · Knowledge Engineering',
  heroImage: '/assets/img/case-studies/_showcase/Sanofi 2.png',
  brandLogo: '/assets/img/logo/coco-logo.png',

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
      value: '3×',
      annotation: 'approved AI-assisted content'
    },
    {
      id: 'savings',
      label: 'Savings',
      value: '$2M+',
      annotation: 'annualized'
    }
  ],

  sections: [
    // ─────────────────────────────────────────────────────────────────────────
    // DIAGNOSE
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'diagnose',
      title: 'Diagnose – Why AI initiatives were stalling',
      summary: 'We did not know whether AI initiatives were constrained by demand, MLR review, or production capacity. Diagnostics showed that MLR cycle time and fragmented content workflows were the binding constraints.',
      duration: '2 weeks',
      kpiFocus: 'MLR cycle time, content retrieval, revision loops',
      decisionOwner: 'VP, Global Medical Affairs',
      bullets: [
        'Stakeholder interviews across 3 brands revealed consistent bottleneck patterns',
        'Workflow mapping showed 75% of delays concentrated at Search & Retrieval stage',
        '2,450+ assets per quarter entering MLR review with 40% revision rate',
        'Pain point: 25+ minutes average time searching for relevant templates'
      ],
      deliverables: [
        'MLR Cycle-Time Baseline',
        'Bottleneck & Revision Analysis',
        'RACI Accountability Map',
        'Risk Register'
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
      chartKeys: ['FunnelChart', 'RACIMatrix', 'CalendarHeatmap']
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ARCHITECT
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'architect',
      title: 'Architect – Governed RAG inside existing workflows',
      summary: 'We needed an AI system that could plug into existing CLM/CRM and survive MLR scrutiny without disrupting controls. We designed a governed RAG content engine that kept Salesforce/CLM as system of record and made the AI layer stateless and replaceable.',
      duration: '2 weeks',
      kpiFocus: 'Integration complexity, compliance surface, scalability',
      decisionOwner: 'Chief Digital Officer',
      bullets: [
        'C4 system context diagram with 5 external integrations defined',
        'RAG pipeline architecture: SharePoint → Azure OpenAI → Veeva',
        'Brand/region filtering for multi-therapeutic support',
        'Compliance gates ensure human reviewer authority is preserved'
      ],
      deliverables: [
        'C4 System Context Diagram',
        'RAG Pipeline Blueprint',
        '14-Week Implementation Plan',
        'Model Card with guardrails'
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
      chartKeys: ['SystemContextDiagram', 'RAGPipeline', 'GanttChart', 'ModelCard']
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ENGINEER
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'engineer',
      title: 'Engineer – Production-grade RAG at scale',
      summary: 'We had to prove reliability and performance at production scale, not just in a demo environment. Service health, model documentation, latency and data quality metrics showed stable production behaviour under real workloads.',
      duration: '6 weeks',
      kpiFocus: 'p95 latency, uptime, throughput, data quality',
      decisionOwner: 'Engineering Lead',
      bullets: [
        'RAG pipeline with hybrid search (semantic + keyword) deployed',
        'Automated review routing and status tracking implemented',
        'Real-time collaboration dashboard built',
        'MLR compliance gate with audit logging integrated'
      ],
      deliverables: [
        'AI Content API & RAG Service',
        'Production SLO Dashboard',
        'Model Card & Evaluation Report',
        'Data Quality Scorecard'
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
      chartKeys: ['ServiceHealthDashboard', 'LatencyPercentiles', 'DataQualityScorecard']
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ENABLE
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'enable',
      title: 'Enable – Cross-team adoption and satisfaction',
      summary: 'Without adoption by MLR and field teams, the platform would become another unused AI experiment. Journey and org-health metrics showed cross-team adoption and satisfaction, with MLR and field partners actively using the engine.',
      duration: '4 weeks',
      kpiFocus: 'User adoption, training completion, satisfaction score',
      decisionOwner: 'VP, Content Operations',
      bullets: [
        '200+ content producers onboarded with hands-on training',
        '5 platform admins certified as power users',
        'Governance playbook and runbooks published',
        'Monthly office hours established for advanced features'
      ],
      deliverables: [
        'Producer Journey Redesign',
        'Training & Governance Playbook',
        'Org Adoption & Health Dashboard'
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
      title: 'Impact – Durable savings and expansion path',
      summary: 'We needed to show that infrastructure and change-management investment produced defendable ROI. Waterfall, unit-economics, seasonality and trend charts demonstrated durable savings and an expansion path without infra step-function costs.',
      duration: 'Ongoing',
      kpiFocus: 'ROI, cost savings, throughput increase',
      decisionOwner: 'CFO / Commercial Leadership',
      bullets: [
        '65% reduction in review cycle time (42 → 14 days)',
        '3× increase in approved content throughput',
        '$2.08M annual cost savings validated',
        'Roadmap defined for 5+ therapeutic area expansion'
      ],
      deliverables: [
        'ROI Waterfall & Savings Model',
        'Unit Economics Model',
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
      chartKeys: ['WaterfallChart', 'UnitEconomics', 'SparklineGrid']
    }
  ],

  tags: ['RAG', 'MLR', 'Pharma', 'Azure OpenAI', 'Knowledge Graph', 'Content Ops'],
  primaryCharts: ['FunnelChart', 'RAGPipeline', 'ServiceHealthDashboard', 'WaterfallChart'],

  nextCaseStudy: {
    slug: 'medtronic',
    title: 'Surgical AI Platform'
  }
};
