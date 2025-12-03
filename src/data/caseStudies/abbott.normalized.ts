// src/data/caseStudies/abbott.normalized.ts
// ═══════════════════════════════════════════════════════════════════════════════
// ABBOTT CASE STUDY — NORMALIZED
// Responsible AI & Governance for Global Diagnostics
// ═══════════════════════════════════════════════════════════════════════════════

import type { NormalizedCaseStudy } from './types';

export const abbottNormalized: NormalizedCaseStudy = {
  slug: 'abbott',
  client: 'Abbott Laboratories',
  title: 'Responsible AI & Governance Infrastructure',
  subtitle: 'Building HIPAA-compliant ML pipelines with zero audit findings.',
  category: 'Diagnostics · ML Governance · Compliance',
  heroImage: '/assets/img/home-06/project/abbott.jpg',
  brandLogo: undefined,

  heroStats: [
    {
      id: 'audit-findings',
      label: 'Audit Findings',
      value: '0',
      annotation: 'across 3 reviews'
    },
    {
      id: 'adoption',
      label: 'BU Adoption',
      value: '5',
      annotation: 'business units'
    },
    {
      id: 'compliance',
      label: 'Compliance',
      value: 'HIPAA',
      annotation: 'certified'
    }
  ],

  sections: [
    // ─────────────────────────────────────────────────────────────────────────
    // DIAGNOSE
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'diagnose',
      title: 'Diagnose – AI governance gap in regulated environment',
      summary: 'Abbott needed to innovate with AI/ML in diagnostics but had no governance framework for LLMs, data privacy requirements blocking experimentation, and audit readiness concerns for global operations.',
      duration: '2 weeks',
      kpiFocus: 'Compliance gaps, governance maturity, audit readiness',
      decisionOwner: 'VP, Compliance & Data Governance',
      bullets: [
        'No existing framework for LLM governance in diagnostics division',
        'PHI data isolation requirements blocking ML experimentation',
        'Regulatory audits looming with no AI-specific controls',
        'Cross-functional alignment needed across Legal, IT, and R&D'
      ],
      deliverables: [
        'Governance Gap Analysis',
        'Compliance Requirements Matrix',
        'Stakeholder RACI',
        'Risk Assessment'
      ],
      metrics: [
        {
          label: 'Governance Maturity',
          baseline: 'Level 1',
          outcome: 'Level 4',
          delta: '+3 levels'
        },
        {
          label: 'Audit Prep Time',
          baseline: '6 weeks',
          outcome: '1 week',
          delta: '-83%'
        },
        {
          label: 'Policy Coverage',
          baseline: '20%',
          outcome: '100%',
          delta: '+80%'
        }
      ],
      chartKeys: ['FunnelChart', 'RACIMatrix']
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ARCHITECT
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'architect',
      title: 'Architect – Governance-first AI infrastructure',
      summary: 'Designed a compliance-native architecture where governance was not a bolt-on but the foundation. Every data flow, model decision, and access pattern was auditable by design.',
      duration: '3 weeks',
      kpiFocus: 'Data isolation, audit trails, policy enforcement',
      decisionOwner: 'Chief Data Officer',
      bullets: [
        'HIPAA-compliant data isolation layer with encryption at rest and in transit',
        'Policy-as-code governance framework with automated enforcement',
        'Real-time audit trail generation for every data access',
        'Cross-functional AI ethics board charter and operating model'
      ],
      deliverables: [
        'Data Flow Architecture',
        'Encryption Standards',
        'Policy-as-Code Framework',
        'Ethics Board Charter'
      ],
      metrics: [
        {
          label: 'Data Isolation',
          baseline: 'Shared tenancy',
          outcome: 'Full isolation',
          delta: 'HIPAA compliant'
        },
        {
          label: 'Encryption Coverage',
          baseline: '40%',
          outcome: '100%',
          delta: 'E2E encrypted'
        },
        {
          label: 'Audit Latency',
          baseline: 'Manual (days)',
          outcome: 'Real-time',
          delta: 'Automated'
        }
      ],
      chartKeys: ['SystemContextDiagram', 'GanttChart']
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ENGINEER
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'engineer',
      title: 'Engineer – Compliant ML pipeline implementation',
      summary: 'Built production ML pipelines with compliance baked in. Every model training run, inference call, and data transformation was logged, versioned, and auditable.',
      duration: '6 weeks',
      kpiFocus: 'Pipeline reliability, compliance automation, model governance',
      decisionOwner: 'Director, ML Engineering',
      bullets: [
        'End-to-end encrypted data pipelines with PHI tokenization',
        'Automated compliance checking at every pipeline stage',
        'Model registry with lineage tracking and approval workflows',
        'Inference logging with PII redaction for audit trails'
      ],
      deliverables: [
        'ML Pipeline (Production)',
        'Compliance Automation Suite',
        'Model Registry',
        'Audit Log System'
      ],
      metrics: [
        {
          label: 'Pipeline Uptime',
          baseline: 'N/A',
          outcome: '99.9%',
          delta: 'SLA met'
        },
        {
          label: 'Compliance Checks',
          baseline: 'Manual',
          outcome: 'Automated',
          delta: '100% coverage'
        },
        {
          label: 'Model Versions',
          baseline: 'Untracked',
          outcome: 'Full lineage',
          delta: 'Auditable'
        }
      ],
      chartKeys: ['ServiceHealthDashboard']
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ENABLE
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'enable',
      title: 'Enable – Scaling governance across business units',
      summary: 'Governance framework adoption required change management. We trained compliance teams, embedded governance into existing workflows, and established the AI ethics board as the decision authority.',
      duration: '4 weeks',
      kpiFocus: 'Training completion, policy adoption, ethics board activation',
      decisionOwner: 'VP, Enterprise Transformation',
      bullets: [
        'Governance playbook with role-specific training modules',
        'Integration with existing GxP and SOX workflows',
        'AI ethics board operational with monthly review cadence',
        'Self-service compliance dashboard for business units'
      ],
      deliverables: [
        'Governance Playbook',
        'Training Curriculum',
        'Ethics Board SOP',
        'Compliance Dashboard'
      ],
      metrics: [
        {
          label: 'Training Completion',
          baseline: '0%',
          outcome: '94%',
          delta: 'Target exceeded'
        },
        {
          label: 'BU Adoption',
          baseline: '0',
          outcome: '5 BUs',
          delta: '100% target'
        },
        {
          label: 'Ethics Reviews',
          baseline: 'None',
          outcome: '12/year',
          delta: 'Monthly cadence'
        }
      ],
      chartKeys: ['CustomerJourneyMap']
    },

    // ─────────────────────────────────────────────────────────────────────────
    // IMPACT
    // ─────────────────────────────────────────────────────────────────────────
    {
      id: 'impact',
      title: 'Impact – Zero findings, LLM-ready infrastructure',
      summary: 'The governance infrastructure enabled Abbott to pass 3 regulatory audits with zero findings while positioning the organization for safe LLM adoption. The framework became the template for global diagnostics AI initiatives.',
      duration: 'Ongoing',
      kpiFocus: 'Audit outcomes, LLM readiness, framework replication',
      decisionOwner: 'Chief Compliance Officer',
      bullets: [
        'Zero audit findings across FDA, ISO, and internal audits',
        'HIPAA-compliant ML pipeline processing 10K+ daily inferences',
        'Governance framework adopted as global standard',
        'LLM infrastructure approved for controlled pilot deployment'
      ],
      deliverables: [
        'Audit Documentation',
        'LLM Readiness Assessment',
        'Global Governance Standard',
        'Expansion Roadmap'
      ],
      metrics: [
        {
          label: 'Audit Findings',
          baseline: 'Unknown risk',
          outcome: '0 findings',
          delta: 'Clean audits'
        },
        {
          label: 'Daily Inferences',
          baseline: '0',
          outcome: '10K+',
          delta: 'Production scale'
        },
        {
          label: 'LLM Status',
          baseline: 'Blocked',
          outcome: 'Pilot approved',
          delta: 'Unblocked'
        }
      ],
      chartKeys: ['WaterfallChart', 'UnitEconomics']
    }
  ],

  nextCaseStudy: {
    slug: 'medtronic',
    title: 'Medtronic → Surgical AI Platform'
  }
};
