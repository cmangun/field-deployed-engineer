// src/data/caseStudies/sanofiData.ts
// ═══════════════════════════════════════════════════════════════════════════════
// SANOFI CASE STUDY — NARRATIVE + CHART DATA
// Digital DAM for Sanofi’s Global Vaccines Portfolio
// ═══════════════════════════════════════════════════════════════════════════════

import type { 
  CaseStudyData, 
  CaseStudyCharts,
} from '@/types/caseStudy';
import { chartColors } from '@/charts_D3/colors';

// If you want Sanofi to inherit the same chart structures as Pfizer (and then
// gradually customize), keep this import. Otherwise you can replace this with
// Sanofi-specific charts defined in this file.
import { pfizerCharts } from '@/data/caseStudies/pfizerData';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA (CaseStudyData)
// ═══════════════════════════════════════════════════════════════════════════════

export const sanofiData: CaseStudyData = {
  slug: 'sanofi-vaccines-dam',
  brandLogo: '/assets/logo/sanofi.png',
  title: 'Sanofi Vaccines Digital Asset Management',
  subtitle: 'Technical Program Management',
  company: 'Sanofi',
  client: 'Sanofi Global Vaccines',
  role: 'Lead AI/ML Architect & Forward Deployed Engineer',
  year: '2023–2024',
  services: [
    'Enterprise Architecture',
    'Digital Asset Management',
    'Regulated Workflow Integration',
    'Production Observability',
    'Cost Optimization',
  ],
  heroImage: '/assets/img/case-studies/sanofi/hero.jpg',
  overview:
    'Replaced a fragmented, legacy vaccines DAM with an Adobe Experience Manager–based platform integrated with Veeva Vault, delivering 48% TCO reduction, sub-500ms global search, and a validated shadow deployment with 99.1% functional parity before full cutover.',

  // ─────────────────────────────────────────────────────────────────────────────
  // HERO CONTEXT
  // ─────────────────────────────────────────────────────────────────────────────
  heroContext: {
    client:
      'Global vaccines unit operating in 73 countries under strict regulatory and MLR governance.',
    mandate:
      'Unify vaccines content, approvals, and distribution into a single digital asset management backbone.',
    surface:
      'Adobe Experience Manager Assets, Veeva Vault PromoMats, Adobe Dynamic Media CDN, and regional localization sites.',
  },

  heroMetrics: [
    {
      label: 'System Availability',
      value: '99.97% uptime',
      caption: 'During 14-day shadow run with mirrored production traffic.',
      color: chartColors.teal,
    },
    {
      label: 'TCO Reduction',
      value: '48% lower',
      caption: 'Compared to legacy Oracle-based DAM, including infra and licensing.',
      color: chartColors.purple,
    },
    {
      label: 'Global Response',
      value: '340 ms avg',
      caption: 'Search and asset retrieval, P95 latency under 500 ms.',
      color: chartColors.blue,
    },
    {
      label: 'ROI & Payback',
      value: '285% / 4.2 mo',
      caption: 'Annual ROI with payback in under five months.',
      color: chartColors.orange,
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // EXECUTIVE SNAPSHOT — “What this proves”
  // ─────────────────────────────────────────────────────────────────────────────
  executiveSnapshot: {
    headline:
      'Turned a vaccines portfolio of regional silos into a unified, production-grade DAM with regulated workflows, global performance SLOs, and provable TCO savings.',
    bullets: [
      'Built a production integration stack around Adobe Experience Manager Assets, Adobe Dynamic Media, and Veeva Vault for end-to-end vaccines content lifecycle.',
      'Implemented asset intake, regulatory workflow, and global distribution as observable pipelines with clear SLOs for latency, reliability, and approval cycle time.',
      'Used 14-day shadow mode with 5% mirrored traffic to validate functional parity and performance before switching off the legacy DAM.',
      'Established cost telemetry and unit economics that showed $1.1M+ annual savings and 48% lower TCO against the prior Oracle-based platform.',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // EXECUTIVE SUMMARY — Full case study context block
  // ─────────────────────────────────────────────────────────────────────────────
  executiveSummary: {
    client: 'Global Vaccines Division, Sanofi',
    context:
      'Commercial, medical, and regulatory teams coordinating vaccines campaigns and safety content across 73 markets.',
    primaryConstraint:
      'Aging Oracle-based DAM with slow approvals, limited observability, and no clean path to globalized, multi-tenant distribution.',
    primaryProblem:
      'Vaccines content for launches and safety updates moved too slowly and too opaquely through the system to safely retire legacy platforms or introduce automation.',
    solutionPattern:
      'Digital DAM backbone on Adobe Experience Manager Assets integrated with Veeva Vault and Adobe Dynamic Media, validated in production via shadow mode before full cutover.',
    scope:
      'Adobe Experience Manager Assets, Adobe I/O events, Dynamic Media CDN, Veeva Vault PromoMats, S3 backup, monitoring, cost telemetry, and regulatory dashboards.',
    engagementRole:
      'Forward Deployed Engineer embedded with global vaccines, digital, and regulatory teams from pilot architecture through production integration and shadow deployment.',
    impact: {
      cycleTime:
        'Average regulatory approval cycle brought under 48 hours with 94% automated routing and complete audit trails.',
      throughput:
        '650+ concurrent users and 15k+ monthly assets processed with P95 global latency under 100 ms.',
      cost:
        'TCO reduced by 48% vs. legacy DAM, with $1.1M+ annual savings and clear unit economics per asset, user, and regulatory approval.',
      risk:
        'Zero data-loss incidents, no unplanned downtime during shadow or cutover, and 100% compliance with documentation and audit requirements.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASE NARRATIVE META — Challenge/Outcome per phase
  // ─────────────────────────────────────────────────────────────────────────────
  phasesMeta: [
    {
      key: 'diagnose',
      title: 'Diagnose',
      challenge:
        'The organization could not quantify whether vaccines campaigns were constrained by DAM capacity, regulatory workflow, or regional distribution.',
      outcome:
        'System mapping and baselining showed that legacy DAM and opaque approval workflows were the critical bottlenecks, not just “content volume”.',
    },
    {
      key: 'architect',
      title: 'Architect',
      challenge:
        'We needed an architecture that could connect Adobe Experience Manager, Veeva Vault, and global CDN while respecting data residency and regulatory rules.',
      outcome:
        'Defined a production integration stack with AEM Assets as the content backbone, Veeva Vault as regulatory system of record, and Dynamic Media as global edge, all wrapped in observable pipelines.',
    },
    {
      key: 'engineer',
      title: 'Engineer',
      challenge:
        'It was not enough to have a diagram; we had to prove upload, approval, and distribution performance under real vaccines workloads.',
      outcome:
        'Built production-grade ingestion, regulatory, and distribution pipelines with full integration testing, failure scenarios, and SLO-driven monitoring.',
    },
    {
      key: 'enable',
      title: 'Enable',
      challenge:
        'Without adoption by brand, medical, and regulatory stakeholders, the new DAM risked remaining a parallel experiment.',
      outcome:
        'Enabled role-specific dashboards and workflows so each function could see cycle time, backlog, and compliance metrics tied to their own responsibilities.',
    },
    {
      key: 'impact',
      title: 'Impact',
      challenge:
        'Leadership needed proof that the migration delivered both financial savings and operational resilience before switching off the legacy platform.',
      outcome:
        'Shadow mode, cost telemetry, and unit economics showed 99.1% functional parity, 8% performance improvement, and 48% TCO reduction prior to full cutover.',
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // PATTERN GENERALIZATION — How this pattern generalizes
  // ─────────────────────────────────────────────────────────────────────────────
  patternGeneralization: {
    bestFitEnvironments:
      'Global, regulated organizations where brand, medical, and regulatory teams share a common content backbone but must respect local rules and approvals.',
    corePrimitives:
      'Enterprise DAM as content backbone, regulatory system of record (e.g., Veeva Vault), edge distribution via CDN, observable pipelines, and clearly defined SLOs.',
    whatYouNeedReady:
      'Defined approval workflows, agreement on systems of record, alignment on latency and availability SLOs, and sponsorship to run a shadow deployment before retiring legacy platforms.',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASES — D/A/E/E/I mapped to concrete Sanofi DAM work
  // ─────────────────────────────────────────────────────────────────────────────
  phases: {
    diagnose: {
      id: 'diagnose',
      title: 'Diagnose: Map the Vaccines Content System',
      duration: '4–6 weeks',
      description:
        'Mapped the end-to-end vaccines content lifecycle from asset creation through regulatory approval to global distribution, including shadow IT and regional workarounds.',
      points: [
        'Inventory of existing Oracle-based DAM, regional file shares, and ad-hoc tools.',
        'Value-stream map for vaccines campaign assets, safety docs, and localization content.',
        'Baseline metrics for upload time, approval cycle time, and global retrieval latency.',
        'Risk assessment for data residency, audit trails, and business continuity.',
      ],
      deliverables: [
        'Current-state system map and value stream',
        'Bottleneck and risk assessment',
        'Baseline metrics & SLO definition',
      ],
      tools: [
        { label: 'DAM', value: 'Legacy Oracle-based DAM' },
        { label: 'Workshops', value: 'Stakeholder mapping & VSM' },
        { label: 'Analytics', value: 'Usage, latency, and backlog dashboards' },
      ],
    },

    architect: {
      id: 'architect',
      title: 'Architect: AEM + Veeva + Dynamic Media Backbone',
      duration: '3–4 weeks',
      description:
        'Designed a production integration stack centered on Adobe Experience Manager Assets, with Veeva Vault as the regulatory engine and Adobe Dynamic Media for global delivery.',
      points: [
        'System context diagrams linking AEM Assets, Veeva Vault, Adobe I/O events, and Dynamic Media.',
        'Multi-tenant design for 73 markets with access controls and regional isolation.',
        'Content ingestion, auto-tagging, and rendition generation patterns using Adobe Sensei and Asset Compute.',
        'Regulatory workflow design that mirrored existing approval paths while enabling automation and observability.',
      ],
      deliverables: [
        'C4 system context & integration contracts',
        'Regulated workflow design for vaccines portfolio',
        'Production SLOs for availability, latency, and approval cycle time',
      ],
      tools: [
        { label: 'DAM', value: 'Adobe Experience Manager Assets' },
        { label: 'Regulatory', value: 'Veeva Vault PromoMats' },
        { label: 'CDN', value: 'Adobe Dynamic Media' },
        { label: 'Events', value: 'Adobe I/O Events API' },
      ],
    },

    engineer: {
      id: 'engineer',
      title: 'Engineer: Pipelines, Testing & Shadow Deploys',
      duration: '8–10 weeks',
      description:
        'Implemented the production pipelines for asset ingestion, metadata, regulatory review, and global distribution, then validated them with comprehensive testing and a 14-day shadow run.',
      points: [
        'Built high-volume ingestion endpoints with file-size limits, naming conventions, and security scanning.',
        'Configured staged regulatory workflows across medical, regulatory, legal, and final brand approval.',
        'Implemented performance, security, disaster-recovery, and user-acceptance testing across core journeys.',
        'Ran a 14-day shadow deployment with 5% mirrored traffic to validate latency, correctness, and compliance against production.',
      ],
      deliverables: [
        'Production ingestion and regulatory pipelines',
        'Comprehensive integration and failure-mode test suites',
        'Shadow deployment runbook and validation report',
      ],
      tools: [
        { label: 'Pipelines', value: 'AEM Asset Compute, Adobe Sensei auto-tagging' },
        { label: 'Regulatory', value: 'Veeva Vault integration' },
        { label: 'Monitoring', value: 'Datadog, Prometheus, Splunk' },
      ],
    },

    enable: {
      id: 'enable',
      title: 'Enable: Dashboards, Roles & Adoption',
      duration: '4–6 weeks',
      description:
        'Turned the new DAM into an operational system of record with dashboards and workflows tailored to executives, operations, regulatory, and content teams.',
      points: [
        'Executive dashboard for availability, cycle time, content velocity, and cost per asset.',
        'Operations dashboard for performance, error rates, backups, and capacity.',
        'Regulatory dashboard for review backlogs, approval cycle time, and audit trail completeness.',
        'User-experience dashboard for adoption, satisfaction, training effectiveness, and regional performance.',
      ],
      deliverables: [
        'Role-specific dashboards and alerting policies',
        'Runbooks for operations and on-call rotations',
        'Training and onboarding material for regional teams',
      ],
      tools: [
        { label: 'Monitoring', value: 'Datadog, Adobe Analytics' },
        { label: 'Security', value: 'Splunk Security / SIEM' },
        { label: 'Collaboration', value: 'Teams / Slack channels for alerts' },
      ],
    },

    impact: {
      id: 'impact',
      title: 'Impact: TCO, Unit Economics & Migration',
      duration: 'Ongoing',
      description:
        'Closed the loop between architecture, operations, and finance by making DAM costs and benefits measurable at the level of assets, users, and regulatory approvals.',
      points: [
        'Cost telemetry across Adobe licensing, cloud infrastructure, regulatory systems, and operations.',
        'Unit economics for cost per asset, cost per user per month, and cost per regulatory approval.',
        'Comparison with the baseline Oracle-based DAM showing 48% lower TCO and material productivity gains.',
        'ROI model including cost savings, productivity, time-to-market, and risk-reduction benefits.',
      ],
      deliverables: [
        'TCO model and cost dashboards',
        'ROI and payback analysis for vaccines leadership',
        'Decommissioning plan for the legacy DAM platform',
      ],
      tools: [
        { label: 'Cloud', value: 'AWS compute, storage, networking' },
        { label: 'Finance', value: 'Cost allocation and chargeback models' },
        { label: 'Analytics', value: 'Cost trend and variance reports' },
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHART DATA (CaseStudyCharts)
// For now, Sanofi reuses the Pfizer chart structures. You can gradually
// replace these with Sanofi-specific series while preserving the same shapes.
// ═══════════════════════════════════════════════════════════════════════════════

export const sanofiCharts: CaseStudyCharts = {
  ...pfizerCharts,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CLEAN CONFIG EXPORT — Single import for case study pages
// ═══════════════════════════════════════════════════════════════════════════════
// Usage: import { sanofiConfig } from '@/data/caseStudies/sanofiData';
// Then:  <CaseStudyTemplate study={sanofiConfig.study} charts={sanofiConfig.charts} />
// ═══════════════════════════════════════════════════════════════════════════════

export interface CaseStudyConfig {
  slug: string;
  study: CaseStudyData;
  charts: CaseStudyCharts;
}

export const sanofiConfig: CaseStudyConfig = {
  slug: sanofiData.slug,
  study: sanofiData,
  charts: sanofiCharts,
};
