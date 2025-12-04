// src/data/caseStudies/pfizerData.ts
// ═══════════════════════════════════════════════════════════════════════════════
// PFIZER CASE STUDY — NARRATIVE + CHART DATA
// Charlie: Pfizer Vaccines AI Content Engine
// ═══════════════════════════════════════════════════════════════════════════════

import type {
  CaseStudyData,
  CaseStudyCharts,
  SystemContextData,
  JourneyMapData,
  DataQualityData,
} from '@/types/caseStudy';
import { chartColors } from '@/charts_D3/colors';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA (CaseStudyData)
// ═══════════════════════════════════════════════════════════════════════════════

export const pfizerData: CaseStudyData = {
  slug: "pfizer",
  brandLogo: "/assets/img/logo/Pfizer_(2021).png",
  title: "Charlie: Pfizer Vaccines AI Content Engine",
  subtitle:
    "Re-architecting global vaccines marketing across Pfizer, IPG, and Publicis with an AI-governed content platform.",
  company: "Pfizer",
  client: "Pfizer Vaccines Franchise (Paxlovid, Abrysvo, Comirnaty)",
  role: "Lead Architect / Forward Deployed Engineer",
  year: "2020–2024",
  services: [
    "AI Architecture",
    "RAG & Vector Search",
    "MLR Workflow Optimization",
    "Enterprise Integration",
    "Change Management",
  ],
  heroImage: "/assets/img/case-studies/_showcase/Pfizerhero.png",

  // HERO SECTION
  hero: {
    description:
      `Pfizer's vaccines portfolio—including Paxlovid, Abrysvo, and Comirnaty—generated nearly $10B in revenue while operating under intense strain: quarterly label changes, global regulatory variation, and a split agency model across IPG and Publicis. Over five years, we designed and delivered "Charlie," a governed AI content engine that unified 20+ systems, accelerated MLR cycles by 65%, tripled throughput, and prepared Pfizer's vaccines business for AI-first production at global scale.`,
    heroContext: {
      client:
        "Pfizer Vaccines franchise working across IPG (creative/PR) and Publicis (strategy, media, production).",
      constraint:
        "Quarterly strain updates, divergent regional approvals, 40+ languages, and a two-holding-company agency model created massive operational friction across 20+ fragmented systems.",
      result:
        `Built "Charlie," a single-source-of-truth AI content engine that reduced MLR cycle time from 42 to 14 days, tripled approved assets per month, and unlocked $2.08M in annual savings while strengthening global compliance and readiness.`,
    },
    heroMetrics: [
      {
        label: "MLR Cycle Time",
        value: "42 → 14 days",
        helperText: "-65% reduction in review cycle duration",
      },
      {
        label: "Throughput",
        value: "272 → 816 assets / mo",
        helperText: "3× increase in approved content throughput",
      },
      {
        label: "Annual Savings",
        value: "$2.08M",
        helperText: "Annualized, directly attributable savings",
      },
      {
        label: "p95 Latency",
        value: "850 → 280 ms",
        helperText: "-67% improvement in AI response time",
      },
    ],
  },

  // EXECUTIVE SECTION
  executiveSummary: {
    client: "Pfizer Vaccines – Global Commercial, Medical, and Agencies",
    context:
      "Pfizer split its marketing business between IPG (creative/PR) and Publicis (strategy, media, production) while vaccines brands like Paxlovid, Abrysvo, and Comirnaty faced quarterly label updates, divergent regional approvals, and multilingual obligations across 150+ markets.",
    primaryConstraint:
      "Quarterly strain updates, divergent regional approvals, 40+ languages, and a two-holding-company agency model created massive operational friction across 20+ fragmented systems.",
    primaryProblem:
      "Even with significant agency and internal capacity, vaccines teams could not move fast enough on label changes, strain variants, and campaigns because no one had a single source of truth for approved content and claims.",
    solutionPattern:
      `Charlie – a governed AI content engine that sits above existing systems of record and orchestrates retrieval, drafting, and governance for vaccines content.`,
    impactSummary:
      "Reduced MLR cycle time by 65% (42→14 days), tripled throughput (272→816 assets/mo), unlocked $2.08M annual savings, and enabled AI/ML capabilities inside a fully auditable, regulator-ready architecture.",
  },

  executiveSnapshot: {
    headline:
      "Unified vaccines content across Pfizer, IPG, and Publicis into a single AI-governed platform that could absorb quarterly scientific change without breaking compliance or capacity.",
    keyOutcomes: [
      `Designed and deployed "Charlie," a governed AI content engine over 20+ legacy systems.`,
      "Reduced MLR review cycles for global vaccines content by 65% (42 → 14 days).",
      "Tripled approved asset throughput (272 → 816 assets/month) under heavy regulatory load.",
      "Enabled AI-assisted retrieval and drafting with >85% retrieval accuracy and 280 ms p95 latency.",
      "Unlocked $2.08M annual savings via reduced rework, derivative content workflows, and agency efficiencies.",
      "Created a scalable architecture ready for multi-brand, multi-market expansion.",
    ],
  },

  // PHASES (5 FDE phases)
  phasesMeta: [
    {
      id: "diagnose",
      title: "Diagnose",
      tagline: "Surfacing the real bottlenecks beneath a billion-dollar vaccines engine.",
      duration: "2 weeks",
      challenge:
        "Pfizer's vaccines content lifecycle was fragmented across more than 20 systems spanning Pfizer, IPG, Publicis, and regional agencies. No one could say with confidence whether MLR capacity, production bandwidth, or demand was the true constraint. Quarterly strain updates and regional regulatory differences exacerbated the problem, while content was constantly rebuilt instead of derived from approved sources.",
      outcome:
        "Established a quantitative and qualitative baseline that showed the true constraint was not headcount, but fragmented search and retrieval inside the MLR pipeline.",
      summaryTitle: "From intuition to a quantified problem statement.",
      summaryBody:
        "Over two weeks, we mapped the end-to-end vaccines content flow—from initial brief through production, MLR review, and field deployment—across Pfizer, IPG, and Publicis. We combined interviews, process mapping, and log analysis to understand where delays and rework actually occurred. The result was a clear, data-backed picture: 75% of delays clustered in search, retrieval, and early MLR triage, and 40% of assets required multiple revision cycles due to content and claims being pulled from the wrong sources.",
      bullets: [
        "Mapped content lifecycle from brief → production → MLR → field deployment across three organizations.",
        "Measured search time, queue delays, and revision loops across multiple vaccines brands.",
        "Showed 75% of delays occurred in Search & Retrieval and early MLR triage, not reviewer capacity.",
        "Documented that ~40% of assets required multiple revision cycles, primarily due to retrieval failures and version collisions.",
        "Confirmed that 20+ unconnected systems prevented any realistic AI/ML enablement.",
      ],
      deliverables: [
        "MLR Cycle-Time Baseline",
        "Content Funnel & Bottleneck Analysis",
        "RACI Accountability Map (Pfizer/IPG/Publicis)",
        "Risk Register for AI/ML Interventions",
      ],
      kpiFocus: [
        "Review cycle time (42 days baseline)",
        "Revision rate (40% baseline)",
        "Search and retrieval time per asset",
      ],
      decisionOwner: "Commercial Operations",
      chartKeys: ["funnel", "raciMatrix"],
    },
    {
      id: "architect",
      title: "Architect",
      tagline: "Designing Charlie, a unified AI content engine over 20+ systems.",
      duration: "2 weeks",
      challenge:
        "We needed an AI-ready architecture that could unify vaccines content across SharePoint, Veeva, Workfront, CLM/CRM, and agency systems without creating a shadow system of record or violating MLR constraints. Any solution had to respect medical–promo boundaries, data residency, and auditability, while handling quarterly label changes and global regulatory variants.",
      outcome:
        `Designed "Charlie," a governed AI content platform that treats Veeva, CLM, and SharePoint as systems of record and orchestrates retrieval and drafting via a stateless, replaceable RAG layer.`,
      summaryTitle: "A governed datasphere and stateless AI orchestration layer.",
      summaryBody:
        `In partnership with enterprise architecture, we designed Charlie as a "datasphere" and RAG engine that lives entirely inside Pfizer's compliance perimeter. Core content remains in existing systems—Veeva Vault for regulatory, SharePoint for document storage, Workfront for production, CLM/CRM for field deployment—while Charlie provides a single AI Content API that orchestrates retrieval, drafting, and governance. We defined clear integration contracts, C4 system diagrams, and non-functional requirements for latency, auditability, and data residency, with an explicit goal of resilience to model or vendor change.`,
      bullets: [
        "Defined Charlie as a governed datasphere over Veeva Vault, SharePoint, Workfront, CLM/CRM, and Teams.",
        "Separated systems of record from AI orchestration via a stateless RAG layer.",
        "Integrated Azure Cognitive Search and Azure OpenAI within Pfizer's security and data residency requirements.",
        "Embedded medical–promo separation directly into the design of RAG filters and generation guardrails.",
        "Established SLO targets for retrieval accuracy (>85%), p95 latency (<350 ms), and uptime (>99.7%).",
      ],
      deliverables: [
        "C4 System Context Diagram",
        "RAG Pipeline Blueprint",
        "Integration & Data-Flow Contracts (SharePoint, Veeva, Workfront, Teams, CLM/CRM)",
        "Architecture Decision Records (ADRs)",
      ],
      kpiFocus: ["Retrieval accuracy SLO", "Latency SLO", "Uptime SLO"],
      decisionOwner: "Enterprise Architecture",
      chartKeys: ["systemContext", "ragPipeline"],
    },
    {
      id: "engineer",
      title: "Engineer",
      tagline: "Turning the architecture into a production-grade AI service.",
      duration: "3 weeks",
      challenge:
        "We had to prove that Charlie could handle real Pfizer vaccines workloads, not just demos—under strict MLR, security, and regional constraints. The platform needed to support thousands of daily queries, maintain low latency, and provide full observability and traceability for every AI suggestion.",
      outcome:
        "Built and deployed a production RAG co-pilot with clear SLOs, service-health dashboards, and incident paths, reducing p95 latency from 850 ms to ~280 ms and achieving 99.7% uptime.",
      summaryTitle: "A tier-1 service with AI at the core and compliance at the edges.",
      summaryBody:
        "We implemented the RAG pipeline, AI Content API, and MLR gateway as a fully instrumented, tier-1 internal service. Hybrid semantic + keyword search, a cache layer for hot paths, and a centralized AI Content API ensured consistent performance and access control. We wired up service health dashboards for latency, uptime, and error rates, and established incident playbooks and on-call runbooks so Charlie could be operated like any other mission-critical platform.",
      bullets: [
        "Implemented hybrid semantic + keyword search with aggressive caching on hot paths.",
        "Exposed a single AI Content API with role-aware access control and brand/region scoping.",
        "Instrumented end-to-end service health: uptime, latency percentiles, error rates.",
        "Added an MLR gateway that enforces guardrails and logs every AI suggestion for auditability.",
        "Established incident management playbooks and on-call procedures for SLO breaches.",
      ],
      deliverables: [
        "Production RAG Pipeline",
        "AI Content API",
        "Service-Health & Latency Dashboards",
        "Incident Playbooks & On-Call Runbooks",
      ],
      kpiFocus: ["p95 latency", "Uptime", "Daily queries / throughput"],
      decisionOwner: "Platform Engineering",
      chartKeys: ["serviceHealth", "latencyPercentiles", "dataQuality", "modelCard"],
    },
    {
      id: "enable",
      title: "Enable",
      tagline: "Equipping producers, reviewers, and agencies to operate Charlie at scale.",
      duration: "3 weeks",
      challenge:
        "Without meaningful adoption from content producers, brand teams, MLR reviewers, and agencies, Charlie would become another unused AI experiment. Publicis also faced a steep hiring and onboarding curve—scaling to ~1,000 staff—to service Pfizer's portfolio with limited time before flu season.",
      outcome:
        `Embedded Charlie (branded "CoCo – the Company Companion") into existing tools and workflows, onboarded 200+ users with 94% training completion, and achieved a 4.2/5 satisfaction score.`,
      summaryTitle: "From platform launch to a living operating system for vaccines content.",
      summaryBody:
        "We focused on the human side of the system: redesigning the producer journey, embedding CoCo within Teams and CLM surfaces, and creating targeted onboarding for new Publicis hires and existing Pfizer/IPG users. Journey mapping revealed three major friction points, which we resolved through just-in-time training, in-context help, and simplified flows. CoCo became the default way to search, draft, and pre-review vaccines content, rather than an optional AI add-on.",
      bullets: [
        `Branded the co-pilot as "CoCo – the Company Companion" and embedded it into Teams and CLM flows.`,
        "Redesigned the producer journey with AI-assisted search and pre-review steps.",
        "Ran hands-on training for 200+ users across Pfizer, IPG, and Publicis.",
        "Created a power-user program for platform admins and MLR champions.",
        "Established monthly office hours and playbook updates based on real usage patterns.",
      ],
      deliverables: [
        "Producer Journey & UX Flows",
        "Training & Governance Playbook",
        "Org-Adoption & Health Dashboard",
      ],
      kpiFocus: ["User activation", "Training completion", "User satisfaction"],
      decisionOwner: "Learning & Development",
      chartKeys: ["journeyMap", "orgHealth"],
    },
    {
      id: "impact",
      title: "Impact",
      tagline: "Quantifying ROI and preparing for multi-brand, multi-market expansion.",
      duration: "2 weeks",
      challenge:
        "Leadership needed hard evidence that Charlie delivered durable value and could scale beyond vaccines into other therapeutic areas. ROI had to be expressed in cycle time, throughput, and dollars saved—not anecdotes.",
      outcome:
        "Demonstrated a 65% reduction in MLR cycle time, 3× asset throughput, $2.08M annualized savings, and a clear roadmap for expansion into additional brands and markets.",
      summaryTitle: "From project to platform: Charlie as Pfizer's vaccines content backbone.",
      summaryBody:
        "Using telemetry from Charlie's service layer and MLR workflow data, we built an ROI model that decomposed savings into cycle-time reduction, revision-loop reduction, agency fee optimization, and producer/reviewer time recovered. We then mapped these gains into a phase-2 expansion plan across additional therapeutic areas. Charlie emerged not as a one-off AI initiative, but as Pfizer's new center of gravity for AI-enabled content operations.",
      bullets: [
        "Reduced MLR review cycle time from 42 to 14 days (-65%).",
        "Increased approved asset throughput from 272 to 816 assets per month (3×).",
        "Unlocked $2.08M in annual savings across production, review, and agency costs.",
        "Improved data completeness from 72% to 96% with automated quality gates.",
        "Defined an expansion roadmap to extend Charlie to 5+ additional therapeutic areas.",
      ],
      deliverables: [
        "ROI Waterfall & Savings Model",
        `Unit-Economics Model ("per asset" economics)`,
        "Usage Seasonality & Capacity Planning Report",
        "Executive KPI Grid & Expansion Roadmap",
      ],
      kpiFocus: [
        "Cycle time reduction",
        "Throughput (assets/month)",
        "Annualized savings",
        "Expansion readiness",
      ],
      decisionOwner: "Product / Finance",
      chartKeys: ["waterfall", "unitEconomics", "calendarHeatmap", "sparklineGrid"],
    },
  ],

  // LEGACY FIELDS (for backward compatibility)
  challenge: {
    title: "Challenge",
    description:
      "A fragmented vaccines content ecosystem across Pfizer, IPG, and Publicis struggled to keep pace with quarterly strain updates, global regulatory differences, and blockbuster launch pressure.",
    points: [
      "20+ disconnected systems across three organizations",
      "42-day average MLR review cycle",
      "40% of assets required multiple revision cycles",
      "No single source of truth for approved content",
    ],
  },
  approach: {
    title: "Approach",
    description:
      "Acted as a forward deployed architect embedded across product, marketing, agencies, and MLR to diagnose bottlenecks, design Charlie as a governed AI content engine, and lead its implementation as a tier-1 internal service.",
    points: [
      "Embedded across Pfizer, IPG, and Publicis as forward deployed engineer",
      "Diagnosed real constraints via logs, process mapping, and interviews",
      "Designed governed AI platform respecting MLR and compliance requirements",
      "Led implementation with full observability and incident management",
    ],
  },
  solution: {
    title: "Solution",
    description:
      `Charlie unified 20+ systems into a single AI-governed content platform, enabling fast, accurate, and compliant vaccines content creation across 40+ languages, multiple regions, and a complex agency model.`,
    points: [
      "Stateless RAG layer over Veeva, SharePoint, Workfront, CLM/CRM",
      "Hybrid semantic + keyword search with brand/region filters",
      "MLR gateway with guardrails and full audit logging",
      "Embedded in Teams and CLM for seamless user adoption",
    ],
    tools: [
      { label: "Azure OpenAI", value: "GPT-4 Turbo" },
      { label: "Azure Cognitive Search", value: "Hybrid search" },
      { label: "Veeva Vault", value: "MLR workflow" },
      { label: "Microsoft Teams", value: "CoCo interface" },
    ],
  },
  results: {
    title: "Results",
    metrics: [
      { value: "65%", label: "Reduction in MLR cycle time" },
      { value: "3×", label: "Increase in approved assets/month" },
      { value: "$2.08M", label: "Annual savings" },
      { value: "280ms", label: "p95 latency (from 850ms)" },
    ],
  },
  testimonial: "",
  nextCaseStudy: "abbott-binaxnow-diagnostic-platform",
};



// ═══════════════════════════════════════════════════════════════════════════════
// CHART DATA (CaseStudyCharts)
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// DIAGNOSE — Funnel + RACI
// ─────────────────────────────────────────────────────────────────────────────

const funnel = [
  { stage: 'Assets Created', value: 2500, color: chartColors.charcoal },
  { stage: 'Search & Retrieval', value: 1500, color: chartColors.gray },
  { stage: 'Draft Complete', value: 1100, color: chartColors.charcoal },
  { stage: 'MLR Submitted', value: 980, color: chartColors.gray },
  { stage: 'First-Pass Approved', value: 590, color: chartColors.charcoal },
  { stage: 'Field Deployed', value: 520, color: chartColors.gray },
];

const raciMatrix = {
  project: 'MLR Content Workflow',
  lastUpdated: 'Oct 2024',
  workstreams: [
    { id: 'ws1', name: 'Define Brief', category: 'Creation' },
    { id: 'ws2', name: 'Select Template', category: 'Creation' },
    { id: 'ws3', name: 'Draft Content', category: 'Creation' },
    { id: 'ws4', name: 'Submit to MLR', category: 'Review' },
    { id: 'ws5', name: 'Review & Approve', category: 'Review' },
    { id: 'ws6', name: 'Publish to Field', category: 'Deployment' },
  ],
  stakeholders: [
    { id: 'p1', name: 'Brand', role: 'Brand Lead', team: 'Marketing', initials: 'BR' },
    { id: 'p2', name: 'Producer', role: 'Content Producer', team: 'Production', initials: 'PR' },
    { id: 'p3', name: 'MLR', role: 'MLR Reviewer', team: 'Compliance', initials: 'ML' },
    { id: 'p4', name: 'Platform', role: 'Platform Team', team: 'Tech', initials: 'PL' },
    { id: 'p5', name: 'IT', role: 'IT Support', team: 'IT', initials: 'IT' },
  ],
  assignments: {
    'ws1-p1': 'A', 'ws1-p2': 'R', 'ws1-p3': 'C', 'ws1-p4': 'C', 'ws1-p5': 'I',
    'ws2-p1': 'C', 'ws2-p2': 'R', 'ws2-p3': 'C', 'ws2-p4': 'I', 'ws2-p5': 'I',
    'ws3-p1': 'C', 'ws3-p2': 'R', 'ws3-p3': 'C', 'ws3-p4': 'I', 'ws3-p5': 'I',
    'ws4-p1': 'I', 'ws4-p2': 'R', 'ws4-p3': 'C', 'ws4-p4': 'I', 'ws4-p5': 'I',
    'ws5-p1': 'I', 'ws5-p2': 'I', 'ws5-p3': 'R', 'ws5-p4': 'C', 'ws5-p5': 'I',
    'ws6-p1': 'A', 'ws6-p2': 'R', 'ws6-p3': 'C', 'ws6-p4': 'I', 'ws6-p5': 'C',
  } as Record<string, string>,
};


// ─────────────────────────────────────────────────────────────────────────────
// ARCHITECT — System Context + RAG Pipeline
// ─────────────────────────────────────────────────────────────────────────────

const systemContext: SystemContextData = {
  system: {
    name: 'Charlie / CoCo AI Content Engine',
    description: 'Governed RAG and drafting layer for MLR-sensitive content',
    type: 'Software System',
  },
  users: [
    { id: 'content-producer', name: 'Content Producer', icon: '/assets/SVG/Edit 1.svg', description: 'Creates and submits content through CLM/CRM surfaces', interactions: ['Draft content', 'Request AI suggestions', 'Submit for review'] },
    { id: 'mlr-reviewer', name: 'MLR Reviewer', icon: '/assets/SVG/Legal.svg', description: 'Reviews, comments, and approves content for field use', interactions: ['Review submissions', 'Flag issues', 'Approve content'] },
    { id: 'brand-lead', name: 'Brand Lead', icon: '/assets/SVG/Chart Statistics 1.svg', description: 'Owns campaign objectives and portfolio', interactions: ['Track approvals', 'View dashboards', 'Manage templates'] },
    { id: 'platform-admin', name: 'Platform Admin', icon: '/assets/SVG/Settings 1.svg', description: 'Manages access, guardrails, and configuration', interactions: ['User management', 'Configure guardrails', 'Monitor usage'] },
  ],
  externalSystems: [
    { id: 'salesforce', name: 'Salesforce / CLM', type: 'CRM', icon: '/assets/SVG/Folder.svg', description: 'Field and campaign execution', protocol: 'REST API', direction: 'bidirectional' as const, dataFlow: ['Campaign data', 'Field feedback', 'Asset metadata'] },
    { id: 'veeva', name: 'Veeva Vault', type: 'Content Platform', icon: '/assets/SVG/Medical Kit.svg', description: 'MLR submission and tracking', protocol: 'REST API', direction: 'bidirectional' as const, dataFlow: ['MLR submissions', 'Approval status', 'Audit trail'] },
    { id: 'sharepoint', name: 'SharePoint', type: 'Document Store', icon: '/assets/SVG/Folder.svg', description: 'Template and asset repository', protocol: 'Graph API', direction: 'bidirectional' as const, dataFlow: ['Templates', 'Approved assets', 'Brand guidelines'] },
    { id: 'workfront', name: 'Workfront', type: 'Project Management', icon: '/assets/SVG/Clipboard.svg', description: 'Project and workflow management', protocol: 'REST API', direction: 'bidirectional' as const, dataFlow: ['Task assignments', 'Status updates', 'Deadlines'] },
    { id: 'teams', name: 'Microsoft Teams', type: 'Collaboration', icon: '/assets/SVG/Chat Bubble.svg', description: 'CoCo assistant interface', protocol: 'Bot Framework', direction: 'bidirectional' as const, dataFlow: ['User queries', 'AI responses', 'Notifications'] },
    { id: 'openai', name: 'Azure OpenAI', type: 'AI Service', icon: '/assets/SVG/Light Bulb.svg', description: 'LLM inference and embeddings', protocol: 'REST API', direction: 'outbound' as const, dataFlow: ['Prompts', 'Completions', 'Embeddings'] },
  ],
};

const ragPipeline = {
  sections: [
    { id: 'ingestion', name: 'Ingest', color: chartColors.navy || '#1a365d', components: [{ id: 'ingest', name: 'Ingestion', icon: '📄', desc: 'Pull content from SharePoint, Veeva, Workfront into staging.' }] },
    { id: 'normalize', name: 'Normalize', color: chartColors.purple || '#553c9a', components: [{ id: 'normalize', name: 'Normalization & Enrichment', icon: '⬡', desc: 'Clean, tag, and enrich with brand/region/label metadata.' }] },
    { id: 'indexing', name: 'Index', color: chartColors.teal || '#0d9488', components: [{ id: 'index', name: 'Indexing', icon: '⟐', desc: 'Create hybrid lexical + vector indices with freshness checks.' }] },
    { id: 'retrieval', name: 'Retrieve', color: chartColors.orange || '#dd6b20', components: [{ id: 'retrieve', name: 'Retrieval', icon: '★', desc: 'Retrieve top-k candidates with filters for brand, region, language, and label version.' }] },
    { id: 'generation', name: 'Generate', color: chartColors.green || '#38a169', components: [{ id: 'generate', name: 'Generation', icon: '✦', desc: 'Draft suggestions with Azure OpenAI under prompt and policy guardrails.' }] },
    { id: 'mlr-gateway', name: 'MLR Gateway', color: chartColors.red || '#e53e3e', components: [{ id: 'mlr-gateway', name: 'MLR Gateway', icon: '✓', desc: 'Apply hard guardrails, log every suggestion, and route to human review.' }] },
  ],
  flows: [{ from: 'ingest', to: 'normalize' }, { from: 'normalize', to: 'index' }, { from: 'index', to: 'retrieve' }, { from: 'retrieve', to: 'generate' }, { from: 'generate', to: 'mlr-gateway' }],
  metrics: [
    { name: 'Relevance', value: 0.91, desc: 'Retrieved doc relevance' },
    { name: 'Faithfulness', value: 0.96, desc: 'Citations verified' },
    { name: 'Latency', value: '280ms', desc: 'p95 response time' },
    { name: 'Recall@5', value: 0.82, desc: 'Relevant in top 5' },
  ]
};


// ─────────────────────────────────────────────────────────────────────────────
// ENGINEER — Service Health + Latency + Data Quality
// ─────────────────────────────────────────────────────────────────────────────

const serviceHealth = {
  services: [
    { name: 'AI Content API', status: 'healthy' as const, uptime: 99.72, latency: { p50: 145, p95: 280, p99: 420 }, errorRate: 0.28, throughput: 4200, lastIncident: '14d ago' },
    { name: 'Vector Search', status: 'healthy' as const, uptime: 99.9, latency: { p50: 85, p95: 165, p99: 280 }, errorRate: 0.1, throughput: 8400, lastIncident: '28d ago' },
    { name: 'Embedding Service', status: 'healthy' as const, uptime: 99.8, latency: { p50: 120, p95: 220, p99: 350 }, errorRate: 0.2, throughput: 4200, lastIncident: '21d ago' },
    { name: 'MLR Gateway', status: 'healthy' as const, uptime: 99.95, latency: { p50: 45, p95: 95, p99: 150 }, errorRate: 0.05, throughput: 980, lastIncident: '42d ago' },
    { name: 'Cache Layer', status: 'healthy' as const, uptime: 99.99, latency: { p50: 5, p95: 12, p99: 25 }, errorRate: 0.01, throughput: 12500, lastIncident: '90d ago' },
  ],
  latencyHistory: [
    { hour: '00:00', p50: 145, p95: 280, p99: 420 }, { hour: '01:00', p50: 140, p95: 275, p99: 415 },
    { hour: '02:00', p50: 135, p95: 270, p99: 410 }, { hour: '03:00', p50: 130, p95: 265, p99: 400 },
    { hour: '04:00', p50: 125, p95: 260, p99: 395 }, { hour: '05:00', p50: 130, p95: 265, p99: 400 },
    { hour: '06:00', p50: 140, p95: 280, p99: 420 }, { hour: '07:00', p50: 155, p95: 300, p99: 450 },
    { hour: '08:00', p50: 175, p95: 330, p99: 490 }, { hour: '09:00', p50: 185, p95: 345, p99: 510 },
    { hour: '10:00', p50: 180, p95: 340, p99: 500 }, { hour: '11:00', p50: 175, p95: 335, p99: 495 },
    { hour: '12:00', p50: 185, p95: 345, p99: 510 }, { hour: '13:00', p50: 180, p95: 340, p99: 500 },
    { hour: '14:00', p50: 175, p95: 335, p99: 495 }, { hour: '15:00', p50: 170, p95: 330, p99: 490 },
    { hour: '16:00', p50: 175, p95: 335, p99: 495 }, { hour: '17:00', p50: 180, p95: 340, p99: 500 },
    { hour: '18:00', p50: 165, p95: 320, p99: 475 }, { hour: '19:00', p50: 155, p95: 305, p99: 455 },
    { hour: '20:00', p50: 150, p95: 295, p99: 445 }, { hour: '21:00', p50: 148, p95: 290, p99: 435 },
    { hour: '22:00', p50: 146, p95: 285, p99: 425 }, { hour: '23:00', p50: 145, p95: 280, p99: 420 },
  ],
};

const latencyPercentiles = {
  service: 'AI Content API',
  timeRange: '6 weeks',
  currentTime: 'Week 6',
  sloTargets: { p50: 200, p95: 350, p99: 500 },
  dataPoints: [
    { time: 'Week 1', p50: 450, p95: 850, p99: 1200, requests: 2100, errors: 45 },
    { time: 'Week 2', p50: 380, p95: 720, p99: 980, requests: 2800, errors: 32 },
    { time: 'Week 3', p50: 280, p95: 520, p99: 750, requests: 3200, errors: 24 },
    { time: 'Week 4', p50: 195, p95: 380, p99: 580, requests: 3600, errors: 18 },
    { time: 'Week 5', p50: 160, p95: 310, p99: 480, requests: 3900, errors: 12 },
    { time: 'Week 6', p50: 145, p95: 280, p99: 420, requests: 4200, errors: 8 },
  ],
  anomalies: [] as { start: number; end: number; severity: string; cause: string }[],
  currentStats: { p50: 145, p95: 280, p99: 420, requestRate: 4200, errorRate: 0.19 },
};

const dataQuality: DataQualityData = {
  overall: 93,
  dimensions: [
    { name: 'Freshness', score: 92, target: 90, trend: 'up' as const },
    { name: 'Accuracy', score: 95, target: 95, trend: 'stable' as const },
    { name: 'Completeness', score: 88, target: 85, trend: 'up' as const },
    { name: 'Traceability', score: 95, target: 90, trend: 'stable' as const },
  ],
  issues: [
    { severity: 'info' as const, count: 12, description: 'New content indexed this week' },
    { severity: 'warning' as const, count: 3, description: 'Stale embeddings detected (>30d)' },
  ],
};


// ─────────────────────────────────────────────────────────────────────────────
// ENABLE — Journey Map + Org Health
// ─────────────────────────────────────────────────────────────────────────────

const journeyMap: JourneyMapData = {
  persona: { name: 'Content Producer', role: 'Senior Medical Writer', company: 'Pfizer Marketing', avatar: '/assets/SVG/Edit 1.svg' },
  goal: 'Get promotional content through MLR approval faster with AI assistance',
  stages: [
    {
      id: 'brief', name: 'Brief', icon: '/assets/SVG/Clipboard.svg', color: chartColors.teal || '#0d9488', duration: '1–2 days',
      touchpoints: [{ channel: 'Workfront', type: 'owned' as const }, { channel: 'Teams', type: 'owned' as const }],
      actions: ['Clarify objectives', 'Pull prior campaigns'],
      thoughts: ['"What templates can I reuse?"', '"How do I find similar approved content?"'],
      emotions: { score: 3, label: 'Neutral' },
      painPoints: ['Hard to find relevant templates'],
      opportunities: ['AI-powered template suggestions at brief stage'],
    },
    {
      id: 'draft', name: 'AI-Assisted Draft', icon: '/assets/SVG/Light Bulb.svg', color: chartColors.orange || '#dd6b20', duration: '2–3 days',
      touchpoints: [{ channel: 'Charlie AI Engine', type: 'owned' as const }, { channel: 'SharePoint', type: 'owned' as const }],
      actions: ['Draft content using templates', 'Use CoCo suggestions'],
      thoughts: ['"This is much faster than starting from scratch"', '"The AI remembers our brand voice"'],
      emotions: { score: 4, label: 'Optimistic' },
      painPoints: ['Learning curve for first-time AI usage'],
      opportunities: ['Just-in-time training inside Teams'],
    },
    {
      id: 'submission', name: 'MLR Submission', icon: '/assets/SVG/Legal.svg', color: chartColors.indigo || '#5a67d8', duration: '3–5 days',
      touchpoints: [{ channel: 'MLR Gateway', type: 'owned' as const }, { channel: 'Veeva Vault', type: 'owned' as const }],
      actions: ['Submit and track content through MLR workflow'],
      thoughts: ['"The pre-check caught issues before MLR saw it"', '"I know exactly who is reviewing"'],
      emotions: { score: 4, label: 'Confident' },
      painPoints: ['Anxiety waiting on reviewer assignment'],
      opportunities: ['Real-time status tracking and notifications'],
    },
    {
      id: 'approved', name: 'Approval & Field', icon: '/assets/SVG/Checkmark Square.svg', color: chartColors.green || '#38a169', duration: '1 day',
      touchpoints: [{ channel: 'Teams notification', type: 'owned' as const }, { channel: 'Veeva Vault', type: 'owned' as const }],
      actions: ['Publish to field', 'Capture usage signals'],
      thoughts: ['"That was 65% faster than before!"', '"I can take on more projects now"'],
      emotions: { score: 5, label: 'Delighted' },
      painPoints: [],
      opportunities: ['Celebrate wins'],
    },
  ],
};

const orgHealth = {
  asOfDate: 'Q4 2024',
  headcount: {
    total: 273, fullTime: 245, contractors: 28, openRoles: 8,
    trend: [
      { month: 'Jul', count: 45 }, { month: 'Aug', count: 95 }, { month: 'Sep', count: 145 },
      { month: 'Oct', count: 185 }, { month: 'Nov', count: 220 }, { month: 'Dec', count: 273 },
    ],
  },
  attrition: { monthly: 0.8, annual: 6.2, voluntary: 4.5, involuntary: 1.7, regrettable: 2.1, benchmark: 15 },
  engagement: {
    enps: 42, participation: 94,
    trend: [{ month: 'Q1', score: 32 }, { month: 'Q2', score: 36 }, { month: 'Q3', score: 39 }, { month: 'Q4', score: 42 }],
  },
  dei: {
    gender: { male: 48, female: 49, nonBinary: 3 },
    leadership: { male: 45, female: 52, nonBinary: 3 },
    ethnicity: [
      { group: 'White', percent: 42 }, { group: 'Asian', percent: 35 }, { group: 'Hispanic', percent: 12 },
      { group: 'Black', percent: 8 }, { group: 'Other', percent: 3 },
    ],
  },
  departments: [
    { name: 'Producers', headcount: 208, attrition: 5, enps: 45, openRoles: 4 },
    { name: 'MLR Reviewers', headcount: 42, attrition: 4, enps: 40, openRoles: 2 },
    { name: 'Brand Leads', headcount: 18, attrition: 3, enps: 48, openRoles: 1 },
    { name: 'Admins', headcount: 5, attrition: 0, enps: 55, openRoles: 1 },
  ],
  tenure: [
    { range: '<1 year', count: 118, percent: 43 }, { range: '1-2 years', count: 79, percent: 29 },
    { range: '2-3 years', count: 52, percent: 19 }, { range: '3+ years', count: 24, percent: 9 },
  ],
};


// ─────────────────────────────────────────────────────────────────────────────
// IMPACT — Waterfall + Unit Economics + Calendar + Sparklines
// ─────────────────────────────────────────────────────────────────────────────

const waterfall = [
  { label: 'Baseline Cost', value: 4.2, type: 'total' as const },
  { label: 'Faster MLR Cycles (-65%)', value: -0.95, type: 'decrease' as const },
  { label: 'Reduced Revision Loops', value: -0.42, type: 'decrease' as const },
  { label: 'Agency Fee Savings', value: -0.38, type: 'decrease' as const },
  { label: 'Producer Hour Recovery', value: -0.25, type: 'decrease' as const },
  { label: 'Reviewer Bandwidth', value: -0.12, type: 'decrease' as const },
  { label: 'Net Annual Cost', value: 2.12, type: 'total' as const },
];

const unitEconomics = {
  period: 'Q4 2024',
  currency: 'USD',
  summary: { ltv: 86600, cac: 12200, ltvCacRatio: 7.1, paybackMonths: 4.2, grossMargin: 61, netRevRetention: 135 },
  segments: [
    { name: 'Enterprise Brands', ltv: 125000, cac: 18000, ratio: 6.9, payback: 3.8, customers: 8, arr: 1000000 },
    { name: 'Regional Teams', ltv: 68000, cac: 12500, ratio: 5.4, payback: 4.5, customers: 24, arr: 1632000 },
    { name: 'Field Medical', ltv: 42000, cac: 8200, ratio: 5.1, payback: 5.2, customers: 45, arr: 1890000 },
    { name: 'Marketing Ops', ltv: 28000, cac: 6500, ratio: 4.3, payback: 6.0, customers: 65, arr: 1820000 },
  ],
  cohorts: [
    { month: 'Jul', cac: 15200, ltv: 72000, payback: 5.8 }, { month: 'Aug', cac: 14100, ltv: 76000, payback: 5.2 },
    { month: 'Sep', cac: 13200, ltv: 80000, payback: 4.8 }, { month: 'Oct', cac: 12800, ltv: 83000, payback: 4.5 },
    { month: 'Nov', cac: 12400, ltv: 85000, payback: 4.3 }, { month: 'Dec', cac: 12200, ltv: 86600, payback: 4.2 },
  ],
  costBreakdown: {
    cac: [
      { category: 'Azure OpenAI', amount: 4200, percent: 34 }, { category: 'Infrastructure', amount: 3200, percent: 26 },
      { category: 'Integration', amount: 2400, percent: 20 }, { category: 'Training', amount: 1500, percent: 12 },
      { category: 'Support', amount: 900, percent: 8 },
    ],
    ltv: [
      { category: 'Cycle Time Savings', amount: 52000, percent: 60 },
      { category: 'Revision Reduction', amount: 22000, percent: 25 },
      { category: 'Agency Offset', amount: 12600, percent: 15 },
    ],
  },
  benchmarks: { ltvCacRatio: { good: 3, great: 5 }, paybackMonths: { good: 12, great: 6 }, grossMargin: { good: 50, great: 70 } },
};

const calendarHeatmap = {
  year: 2024,
  title: 'AI-Assisted Content Volume',
  metric: 'Assets Created',
  data: [
    { date: '2024-01-01', value: 18 }, { date: '2024-02-01', value: 22 }, { date: '2024-03-01', value: 25 },
    { date: '2024-04-01', value: 30 }, { date: '2024-05-01', value: 34 }, { date: '2024-06-01', value: 38 },
    { date: '2024-07-01', value: 41 }, { date: '2024-08-01', value: 39 }, { date: '2024-09-01', value: 44 },
    { date: '2024-10-01', value: 47 }, { date: '2024-11-01', value: 50 }, { date: '2024-12-01', value: 52 },
  ],
};

const sparklineGrid = [
  { label: 'Cycle Time (days)', values: [42, 38, 35, 30, 24, 20, 18, 16, 14], current: 14, change: -66.7 },
  { label: 'Approved Assets / Month', values: [272, 310, 355, 420, 520, 610, 720, 780, 816], current: 816, change: 200 },
  { label: 'Revision Rate', values: [0.4, 0.36, 0.32, 0.28, 0.23, 0.2, 0.18, 0.16, 0.15], current: 0.15, change: -62.5 },
  { label: 'Weekly Active Users', values: [0.1, 0.18, 0.24, 0.32, 0.4, 0.48, 0.55, 0.61, 0.68], current: 0.68, change: 580 },
];

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE — High level Gantt across phases
// ─────────────────────────────────────────────────────────────────────────────

const gantt = [
  { id: 1, task: 'Diagnostic Sprint', start: 0, duration: 2, category: 'Diagnose', progress: 100 },
  { id: 2, task: 'Architecture & Security Review', start: 2, duration: 2, category: 'Architect', progress: 100 },
  { id: 3, task: 'RAG Pipeline Implementation', start: 4, duration: 3, category: 'Engineer', progress: 100 },
  { id: 4, task: 'Service Health & SLOs', start: 5, duration: 2, category: 'Engineer', progress: 100 },
  { id: 5, task: 'Pilot Enablement & Training', start: 7, duration: 3, category: 'Enable', progress: 100 },
  { id: 6, task: 'ROI & Expansion Plan', start: 9, duration: 2, category: 'Impact', progress: 100 },
];


// ─────────────────────────────────────────────────────────────────────────────
// MODEL CARD — Engineer phase (guardrails, failure modes)
// ─────────────────────────────────────────────────────────────────────────────

const modelCard = {
  model: { name: 'Charlie Content Assistant', version: '1.2.0', type: 'RAG + GPT-4 Turbo', lastUpdated: 'Oct 2024', owner: 'AI Platform Team', status: 'Production' },
  description: 'AI assistant for accelerating promotional content creation while maintaining MLR compliance. Uses RAG pipeline over approved SharePoint assets with GPT-4 generation.',
  intendedUse: {
    primary: ['Draft promotional content', 'Search approved templates', 'Pre-check compliance issues'],
    outOfScope: ['Final MLR approval decisions', 'Medical claims without review', 'Patient-facing content'],
    users: ['Content Producers', 'Brand Managers', 'Agency Partners'],
  },
  performance: {
    metrics: [
      { name: 'Retrieval Accuracy', value: '91%', baseline: '—', threshold: '>85%' },
      { name: 'Citation Faithfulness', value: '96%', baseline: '—', threshold: '>90%' },
      { name: 'User Satisfaction', value: '4.2/5', baseline: '3.1/5', threshold: '>4.0' },
      { name: 'p95 Latency', value: '280ms', baseline: '850ms', threshold: '<500ms' },
    ],
    evaluationData: 'Internal benchmark: 500 queries across 12 brands',
  },
  limitations: [
    'Cannot verify scientific claims — requires medical reviewer',
    'May hallucinate if query is outside SharePoint corpus',
    'Region/brand filters must be set correctly by user',
    'Not trained on competitor content or external sources',
  ],
  ethicalConsiderations: [
    'All output requires human MLR review before use',
    'PHI redaction layer prevents patient data exposure',
    'Audit logging for all queries and responses',
    'No model training on Pfizer data (API-only)',
  ],
  training: { dataSize: '12,000 approved content assets', dateRange: 'Jan 2022 - Oct 2024', features: 0, targetVariable: 'Content retrieval & generation', samplingStrategy: 'Full corpus indexing', trainTestSplit: 'N/A (RAG)' },
  fairness: {
    protectedAttributes: ['brand', 'region', 'content_type'],
    metrics: [
      { group: 'US Brands', fpr: 0.08, fnr: 0.12, samples: 4500 },
      { group: 'EU Brands', fpr: 0.09, fnr: 0.14, samples: 3200 },
      { group: 'APAC Brands', fpr: 0.11, fnr: 0.15, samples: 2100 },
    ],
    findings: [
      { severity: 'info', text: 'Retrieval accuracy consistent across regions (±3%)' },
      { severity: 'low', text: 'Newer brands have less indexed content' },
    ],
  },
  features: [
    { name: 'semantic_similarity', importance: 0.35, category: 'retrieval' },
    { name: 'recency_score', importance: 0.20, category: 'retrieval' },
    { name: 'brand_filter_match', importance: 0.18, category: 'filter' },
    { name: 'content_type_match', importance: 0.12, category: 'filter' },
    { name: 'approval_status', importance: 0.10, category: 'compliance' },
    { name: 'user_engagement_history', importance: 0.05, category: 'personalization' },
  ],
  deployment: { endpoint: 'ai-content-api.pfizer.internal/v1/generate', latency: '280ms p95', throughput: '4,200 req/day', monitoring: 'Datadog APM + custom guardrail alerts' },
};


// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT — Master Pfizer chart bundle
// ═══════════════════════════════════════════════════════════════════════════════

export const pfizerCharts: CaseStudyCharts = {
  gantt,
  funnel,
  systemContext,
  serviceHealth,
  journeyMap,
  waterfall,
  calendarHeatmap,
  raciMatrix,
  ragPipeline,
  modelCard,
  latencyPercentiles,
  dataQuality,
  orgHealth,
  unitEconomics,
  sparklineGrid,
};

// ═══════════════════════════════════════════════════════════════════════════════
// CLEAN CONFIG EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export interface PfizerCaseStudyConfig {
  slug: string;
  study: CaseStudyData;
  charts: CaseStudyCharts;
}

export const pfizerConfig: PfizerCaseStudyConfig = {
  slug: 'pfizer',
  study: pfizerData,
  charts: pfizerCharts,
};
