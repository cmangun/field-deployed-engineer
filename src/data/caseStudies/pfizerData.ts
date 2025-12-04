// src/data/caseStudies/pfizerData.ts
// ═══════════════════════════════════════════════════════════════════════════════
// PFIZER CASE STUDY — NARRATIVE + CHART DATA
// Unified end-to-end story: Diagnose → Architect → Engineer → Enable → Impact
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
  slug: 'pfizer',
  brandLogo: '/assets/img/logo/Pfizer_(2021).png',
  title: 'Pfizer AI Content Engine',
  subtitle: 'Diagnostics → Architecture → Production → Enablement',
  company: 'Pfizer',
  client: 'Pfizer Global Commercial & Digital',
  role: 'Forward-Deployed AI/ML Engineer',
  year: '2024',
  services: [
    'Diagnostics & Baseline',
    'RAG Architecture',
    'ML Engineering & SRE',
    'Change Management',
  ],
  heroImage: '/assets/img/case-studies/pfizer/hero.jpg',

  overview:
    "Reduced MLR review cycles by 65% (42 → 14 days), tripled approved AI-assisted content, and unlocked $2M+ annual savings by building a governed AI content engine that sits inside Pfizer's existing CLM/CRM stack.",

  // ─────────────────────────────────────────────────────────────────────────────
  // HERO CONTEXT
  // ─────────────────────────────────────────────────────────────────────────────
  heroContext: {
    client:
      'Global top-5 pharma; commercial, medical, and digital teams operating under strict MLR governance.',
    constraint:
      'Campaign content moved on 4–6 week cycles with high revision rates and scattered templates, making AI experimentation too slow and expensive.',
    result:
      '65% faster review cycles, 3× throughput in approved AI-assisted content, and >$2M annual savings with zero MLR exceptions.',
  },

  heroMetrics: [
    { label: 'Cycle Time', value: '42 → 14 days', delta: '-65%' },
    { label: 'Throughput', value: '272 → 816 assets/mo', delta: '3×' },
    { label: 'Savings', value: '$2.08M', delta: 'annualized' },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // EXECUTIVE SNAPSHOT
  // ─────────────────────────────────────────────────────────────────────────────
  executiveSnapshot: {
    headline: 'From 42-day cycles to 14-day AI-assisted approvals.',
    keyOutcomes: [
      '65% reduction in MLR cycle time',
      '3× increase in approved AI-assisted assets',
      '$2.08M+ annual cost savings',
      'Zero MLR exceptions; ≥99% compliance SLA',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // EXECUTIVE SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  executiveSummary: {
    client: 'Pfizer – Global Commercial & Digital',
    context:
      'Commercial and medical teams depended on a complex mix of CLM, CRM, asset libraries, and MLR workflows to launch and sustain promotional campaigns.',
    primaryConstraint:
      'MLR review time and fragmented retrieval – not demand – were the binding constraints on campaign velocity and AI adoption.',
    primaryProblem:
      'AI and automation pilots could not scale because no one could prove they would relieve the true bottleneck instead of just adding more work to an already overloaded MLR queue.',
    solutionPattern:
      'A governed AI content engine: retrieval-augmented generation (RAG) plus structured templates and human-in-the-loop MLR review, fully embedded in existing CLM/CRM workflows.',
    scope:
      'End-to-end pipeline from brief → template selection → draft → MLR submission → approval → field deployment, with telemetry and SLOs across each stage.',
    engagementRole:
      'Field-embedded engineer partnering with Commercial Ops, MLR, Platform Engineering, and Enterprise Architecture.',
    impact: {
      cycleTime: 'Review cycle reduced from ~42 days to ~14 days across piloted brands.',
      throughput: '3× increase in approved AI-assisted content throughput.',
      cost: '$2.08M+ annualized savings from reduced agency hours, rework, and producer time.',
      risk: 'Zero MLR exceptions; compliance SLA held at ≥99% while volume increased.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASE META — Diagnose → Architect → Engineer → Enable → Impact
  // ─────────────────────────────────────────────────────────────────────────────
  phasesMeta: [
    {
      key: 'diagnose',
      title: 'Diagnose',
      tagline: 'Find the real constraint before building anything.',
      challenge:
        'The organization did not know whether AI initiatives were constrained by demand, MLR review capacity, or production throughput.',
      outcome:
        'Diagnostics showed that search, retrieval, and revision loops inside the MLR pipeline were the binding constraints.',
      summaryTitle: 'Baseline the MLR content pipeline.',
      summaryBody:
        'By combining interviews, process mapping, and log analysis, we established a quantitative baseline for review cycles, revision rates, and search time across three priority brands.',
      bullets: [
        'Mapped end-to-end content flow from brief to field deployment.',
        'Measured search time, queue delays, and revision loops at each stage.',
        'Showed that 75% of delays clustered in Search & Retrieval and early MLR triage.',
        'Documented that ~40% of assets required multiple revision cycles.',
      ],
      deliverables: [
        'MLR cycle-time baseline',
        'Content funnel & bottleneck analysis',
        'RACI accountability map',
        'Risk register for AI interventions',
      ],
      kpiFocus: 'Review cycle time & revision rate',
      decisionOwner: 'Commercial Operations',
    },
    {
      key: 'architect',
      title: 'Architect',
      tagline: 'Design the smallest compliant surface area that can scale.',
      challenge:
        'We needed an AI system that could plug into existing CLM/CRM and survive MLR scrutiny without becoming a shadow system of record.',
      outcome:
        'Designed a governed "datasphere" and RAG engine that kept Salesforce/CLM as system of record and treated the AI layer as stateless and replaceable.',
      summaryTitle: 'Colab datasphere and governed RAG architecture.',
      summaryBody:
        'We defined a Colab datasphere pattern where content lives in existing stores (SharePoint, Veeva, Workfront) while the AI engine orchestrates retrieval and drafting under explicit compliance boundaries.',
      bullets: [
        'C4 system-context diagram with five external integrations.',
        'Explicit separation of systems of record vs. AI orchestration layer.',
        'Integration contracts for SharePoint, Veeva Vault, Workfront, Teams, and Azure OpenAI.',
        'Non-functional requirements defined for latency, auditability, and data residency.',
      ],
      deliverables: [
        'C4 system-context diagram',
        'RAG pipeline blueprint',
        'Integration & data-flow contracts',
        'Architecture decision records (ADRs)',
      ],
      kpiFocus: 'Architecture sign-off',
      decisionOwner: 'Enterprise Architecture',
    },
    {
      key: 'engineer',
      title: 'Engineer',
      tagline: 'Turn a diagram into a service that behaves under load.',
      challenge:
        'We had to prove the RAG co-pilot could handle real workloads, not just demos, while respecting strict MLR and security constraints.',
      outcome:
        'Built a production RAG co-pilot with clear SLOs, service-health dashboards, and incident paths, reducing p95 latency from 850ms to ~280ms and reaching 99.7% uptime.',
      summaryTitle: 'Production RAG co-pilot with SLOs.',
      summaryBody:
        'We implemented the RAG pipeline, instrumented it like any other tier-1 service, and exposed a single AI content API with role-aware access and MLR-aware guardrails.',
      bullets: [
        'Hybrid search (semantic + keyword) with caching on hot paths.',
        'Single AI Content API with role-aware access control.',
        'End-to-end service health instrumentation (uptime, latency, error rate).',
        'MLR gateway checks and audit logging for every AI suggestion.',
      ],
      deliverables: [
        'Production RAG pipeline',
        'AI Content API',
        'Service-health & latency dashboard',
        'Incident playbooks & on-call runbooks',
      ],
      kpiFocus: 'p95 latency, uptime, and error rate',
      decisionOwner: 'Platform Engineering',
    },
    {
      key: 'enable',
      title: 'Enable',
      tagline: 'If no one uses it, it does not exist.',
      challenge:
        'Without adoption by MLR reviewers, brand teams, and producers, the engine would become yet another unused AI experiment.',
      outcome:
        'Embedded the co-pilot into existing tools, trained producers and admins, and reached >200 active users with 94% training completion and 4.2/5 satisfaction.',
      summaryTitle: 'CoCo – the Company Companion.',
      summaryBody:
        'We branded and deployed the co-pilot as "CoCo – the Company Companion," embedded directly in Teams and CLM surfaces with targeted onboarding journeys.',
      bullets: [
        'Producer journey redesign focused on search and pre-review.',
        'Hands-on training for 200+ content producers.',
        'Power-user track for platform admins and MLR champions.',
        'Monthly office hours and playbook updates based on real use.',
      ],
      deliverables: [
        'Producer journey & UX flows',
        'Training & governance playbook',
        'Org-adoption & health dashboard',
      ],
      kpiFocus: 'User activation & satisfaction',
      decisionOwner: 'Learning & Development',
    },
    {
      key: 'impact',
      title: 'Impact',
      tagline: 'Prove the economics, then expand.',
      challenge:
        'Leaders needed durable ROI proof to justify ongoing investment and expansion into additional therapeutic areas.',
      outcome:
        'Showed 65% cycle-time reduction, 3× throughput, and $2.08M in annual savings with a clear path to multi-brand expansion.',
      summaryTitle: 'From pilot economics to portfolio impact.',
      summaryBody:
        'We translated performance and usage telemetry into an executive-level ROI model and expansion roadmap tied directly to cycle time, volume, and rework savings.',
      bullets: [
        'Cost waterfall decomposing where savings actually came from.',
        'Unit-economics model at the "per asset" level.',
        'Usage seasonality and trend analysis across quarters.',
        'Phase-2 roadmap for 5+ additional therapeutic areas.',
      ],
      deliverables: [
        'ROI waterfall & savings model',
        'Unit-economics model',
        'Usage seasonality report',
        'Executive KPI grid',
      ],
      kpiFocus: 'ROI & expansion readiness',
      decisionOwner: 'Product & Finance',
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASES — Detailed phase sections
  // ─────────────────────────────────────────────────────────────────────────────
  phases: {
    diagnose: {
      id: 'diagnose',
      title: 'Diagnose',
      duration: '2 weeks',
      description: 'Discovery revealed a 4–6 week MLR bottleneck. 40% of assets required multiple revision cycles due to content retrieval failures.',
      points: [
        'Stakeholder interviews across 3 brands',
        'Workflow mapping revealed 75% delays at Search & Retrieval',
        '2,450+ assets per quarter entering MLR review',
        'Pain point: 25+ min searching for relevant templates'
      ],
      deliverables: ['MLR Cycle-Time Baseline', 'Content Funnel & Bottleneck Analysis', 'RACI Accountability Map'],
      metrics: [
        { value: '42', numericValue: 42, suffix: ' days', label: 'Avg Review Cycle' },
        { value: '2,450+', label: 'Assets/Quarter' },
        { value: '40%', numericValue: 40, suffix: '%', label: 'Revision Rate' }
      ]
    },
    architect: {
      id: 'architect',
      title: 'Architect',
      duration: '2 weeks',
      description: 'Designed Azure OpenAI + SharePoint RAG pipeline with MLR-aware compliance gates. Architecture ensured AI operated inside Pfizer compliance perimeter.',
      points: [
        'C4 system context with 5 external integrations',
        'RAG pipeline: SharePoint → Azure OpenAI → Veeva',
        'Brand/region filtering for multi-therapeutic support',
        'Compliance gates ensure human reviewer authority'
      ],
      deliverables: ['C4 System Context Diagram', 'RAG Pipeline Blueprint', 'Integration & Data-Flow Contracts'],
      tools: [
        { label: 'AI', value: 'Azure OpenAI GPT-4' },
        { label: 'Search', value: 'Azure AI Search' },
        { label: 'Platform', value: 'SharePoint, Veeva, Workfront' }
      ]
    },
    engineer: {
      id: 'engineer',
      title: 'Engineer',
      duration: '6 weeks',
      description: 'Built production RAG pipeline handling 4,200+ daily queries. Optimized p95 latency from 850ms → 280ms.',
      points: [
        'RAG pipeline with hybrid search (semantic + keyword)',
        'Single AI Content API with role-aware access control',
        'End-to-end service health instrumentation',
        'MLR gateway checks and audit logging'
      ],
      deliverables: ['Production RAG Pipeline', 'AI Content API', 'Service-Health Dashboard', 'Incident Playbooks'],
      metrics: [
        { value: '280', numericValue: 280, suffix: 'ms', label: 'p95 Latency' },
        { value: '99.7%', numericValue: 99.7, suffix: '%', label: 'Uptime' },
        { value: '4,200+', label: 'Daily Queries' }
      ]
    },
    enable: {
      id: 'enable',
      title: 'Enable',
      duration: '4 weeks',
      description: 'Trained 200+ users, certified 5 admins, established governance playbook. User satisfaction reached 4.2/5.',
      points: [
        'Producer journey redesign focused on search and pre-review',
        'Hands-on training for 200+ content producers',
        'Power-user track for platform admins and MLR champions',
        'Monthly office hours and playbook updates'
      ],
      deliverables: ['Producer Journey & UX Flows', 'Training & Governance Playbook', 'Org Adoption Dashboard'],
      metrics: [
        { value: '208', numericValue: 208, label: 'Users Onboarded' },
        { value: '4.2/5', label: 'Satisfaction Score' },
        { value: '94%', numericValue: 94, suffix: '%', label: 'Training Completion' }
      ]
    },
    impact: {
      id: 'impact',
      title: 'Impact',
      duration: 'Ongoing',
      description: 'Review cycles shortened 65%, duplication collapsed, and MLR reviewers saw clearer submissions. $2.08M annual savings.',
      points: [
        '65% reduction in review cycle time (42→14 days)',
        '3× increase in content throughput',
        '$2.08M annual cost savings',
        'Roadmap to 5+ therapeutic areas'
      ],
      deliverables: ['ROI Waterfall & Savings Model', 'Unit Economics Model', 'Usage Seasonality Report'],
      metrics: [
        { value: '65%', numericValue: 65, suffix: '%', label: 'Cycle Time Reduction' },
        { value: '3×', label: 'Throughput Increase' },
        { value: '$2.08M', label: 'Annual Savings' }
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // LEGACY / SUMMARY FIELDS
  // ─────────────────────────────────────────────────────────────────────────────
  challenge: {
    title: 'Slow, fragmented MLR pipeline',
    description:
      "Pfizer's teams produced thousands of assets per quarter, but 4–6 week MLR cycles and duplicated work made AI investment hard to justify.",
    points: [
      '42-day average review cycle time across piloted brands.',
      '2,450+ assets per quarter entering some form of MLR review.',
      '~40% revision rate driven by duplicated or hard-to-find precedents.',
      'Search-to-answer time often exceeded 25 minutes per asset.',
    ],
  },

  approach: {
    title: 'Field-embedded AI/ML engineering',
    description:
      'Rather than starting from a model, we started from the bottleneck, embedded in the teams experiencing it, and worked backwards to architecture and implementation.',
    points: [
      'Diagnostic sprint to quantify the constraint.',
      'Governed architecture that preserved systems of record.',
      'SLO-driven RAG engineering with full observability.',
      'Deliberate enablement and change-management plan.',
    ],
  },

  solution: {
    title: 'Pfizer AI Content Engine',
    description:
      'A governed AI content engine embedded in CLM/CRM workflows that accelerates MLR cycles without compromising compliance.',
    points: [
      'RAG engine tuned for high-trust template retrieval and drafting.',
      'Integration with Salesforce, Veeva, SharePoint, Workfront, and Teams.',
      'MLR-aware audit trails for every AI suggestion and decision.',
      'Composable architecture for future models and use cases.',
    ],
    tools: [
      { label: 'AI/ML', value: 'Azure OpenAI GPT-4' },
      { label: 'Search', value: 'Azure Cognitive Search' },
      { label: 'Platform', value: 'Veeva Vault, Salesforce CLM' },
      { label: 'Infra', value: 'Azure, Teams Bot Framework' },
    ],
  },

  results: {
    title: 'Measured Outcomes',
    metrics: [
      { value: '65%', label: 'Cycle time reduction (42 → 14 days)', suffix: '' },
      { value: '3×', label: 'Increase in approved AI-assisted assets', suffix: '' },
      { value: '$2.08M', label: 'Annual savings validated', suffix: '' },
      { value: '0', label: 'MLR exceptions in pilot period', suffix: '' },
    ],
  },

  testimonial: {
    quote:
      'For the first time, we could see exactly where our content pipeline broke—and how AI actually fixed it without adding risk.',
    author: 'Director',
    role: 'Commercial Operations',
    company: 'Pfizer',
  },

  nextCaseStudy: {
    brand: 'Abbott',
    title: 'BinaxNOW Diagnostic Platform',
    href: '/case-study/binaxnow',
  },
};


// ═══════════════════════════════════════════════════════════════════════════════
// CHART DATA (CaseStudyCharts)
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// DIAGNOSE — Funnel + RACI
// ─────────────────────────────────────────────────────────────────────────────

const funnel = [
  { stage: 'Assets Created', value: 2450, color: chartColors.charcoal },
  { stage: 'Search & Retrieval', value: 1470, color: chartColors.gray },
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
    name: 'AI Content Engine',
    description: 'Governed RAG and drafting layer for MLR-sensitive content',
    type: 'Software System',
  },
  users: [
    {
      id: 'content-producer',
      name: 'Content Producer',
      icon: '/assets/SVG/Edit 1.svg',
      description: 'Creates and submits content through CLM/CRM surfaces',
      interactions: ['Draft content', 'Request AI suggestions', 'Submit for review'],
    },
    {
      id: 'mlr-reviewer',
      name: 'MLR Reviewer',
      icon: '/assets/SVG/Legal.svg',
      description: 'Reviews, comments, and approves content for field use',
      interactions: ['Review submissions', 'Flag issues', 'Approve content'],
    },
    {
      id: 'brand-lead',
      name: 'Brand Lead',
      icon: '/assets/SVG/Chart Statistics 1.svg',
      description: 'Owns campaign objectives and portfolio',
      interactions: ['Track approvals', 'View dashboards', 'Manage templates'],
    },
    {
      id: 'platform-admin',
      name: 'Platform Admin',
      icon: '/assets/SVG/Settings 1.svg',
      description: 'Manages access, guardrails, and configuration',
      interactions: ['User management', 'Configure guardrails', 'Monitor usage'],
    },
  ],
  externalSystems: [
    {
      id: 'salesforce',
      name: 'Salesforce / CLM',
      type: 'CRM',
      icon: '/assets/SVG/Folder.svg',
      description: 'Field and campaign execution',
      protocol: 'REST API',
      direction: 'bidirectional' as const,
      dataFlow: ['Campaign data', 'Field feedback', 'Asset metadata'],
    },
    {
      id: 'veeva',
      name: 'Veeva Vault',
      type: 'Content Platform',
      icon: '/assets/SVG/Medical Kit.svg',
      description: 'MLR submission and tracking',
      protocol: 'REST API',
      direction: 'bidirectional' as const,
      dataFlow: ['MLR submissions', 'Approval status', 'Audit trail'],
    },
    {
      id: 'sharepoint',
      name: 'SharePoint',
      type: 'Document Store',
      icon: '/assets/SVG/Folder.svg',
      description: 'Template and asset repository',
      protocol: 'Graph API',
      direction: 'bidirectional' as const,
      dataFlow: ['Templates', 'Approved assets', 'Brand guidelines'],
    },
    {
      id: 'workfront',
      name: 'Workfront',
      type: 'Project Management',
      icon: '/assets/SVG/Clipboard.svg',
      description: 'Project and workflow management',
      protocol: 'REST API',
      direction: 'bidirectional' as const,
      dataFlow: ['Task assignments', 'Status updates', 'Deadlines'],
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      type: 'Collaboration',
      icon: '/assets/SVG/Chat Bubble.svg',
      description: 'CoCo assistant interface',
      protocol: 'Bot Framework',
      direction: 'bidirectional' as const,
      dataFlow: ['User queries', 'AI responses', 'Notifications'],
    },
    {
      id: 'openai',
      name: 'Azure OpenAI',
      type: 'AI Service',
      icon: '/assets/SVG/Light Bulb.svg',
      description: 'LLM inference and embeddings',
      protocol: 'REST API',
      direction: 'outbound' as const,
      dataFlow: ['Prompts', 'Completions', 'Embeddings'],
    },
  ],
};

const ragPipeline = {
  sections: [
    { id: 'ingestion', name: 'Ingest', color: chartColors.navy || '#1a365d', components: [
      { id: 'ingest', name: 'Ingest', icon: '📄', desc: 'Ingest approved assets, templates, and claims from systems of record.' },
    ]},
    { id: 'indexing', name: 'Index', color: chartColors.purple || '#553c9a', components: [
      { id: 'index', name: 'Index', icon: '⬡', desc: 'Chunk, embed, and index content with claims-aware metadata.' },
    ]},
    { id: 'retrieval', name: 'Retrieve', color: chartColors.teal || '#0d9488', components: [
      { id: 'retrieve', name: 'Retrieve', icon: '⟐', desc: 'Hybrid semantic + keyword retrieval with brand and region filters.' },
    ]},
    { id: 'generation', name: 'Generate', color: chartColors.orange || '#dd6b20', components: [
      { id: 'generate', name: 'Generate', icon: '★', desc: 'LLM drafts content with explicit citations and claim references.' },
    ]},
    { id: 'review', name: 'Review', color: chartColors.green || '#38a169', components: [
      { id: 'review', name: 'Review', icon: '✓', desc: 'Producers and MLR reviewers inspect, edit, and approve drafts.' },
    ]},
  ],
  flows: [
    { from: 'ingest', to: 'index' },
    { from: 'index', to: 'retrieve' },
    { from: 'retrieve', to: 'generate' },
    { from: 'generate', to: 'review' },
  ],
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
    {
      name: 'AI Content API',
      status: 'healthy' as const,
      uptime: 99.72,
      latency: { p50: 145, p95: 280, p99: 420 },
      errorRate: 0.28,
      throughput: 4200,
      lastIncident: '14d ago',
    },
    {
      name: 'Vector Search',
      status: 'healthy' as const,
      uptime: 99.9,
      latency: { p50: 85, p95: 165, p99: 280 },
      errorRate: 0.1,
      throughput: 8400,
      lastIncident: '28d ago',
    },
    {
      name: 'Embedding Service',
      status: 'healthy' as const,
      uptime: 99.8,
      latency: { p50: 120, p95: 220, p99: 350 },
      errorRate: 0.2,
      throughput: 4200,
      lastIncident: '21d ago',
    },
    {
      name: 'MLR Gateway',
      status: 'healthy' as const,
      uptime: 99.95,
      latency: { p50: 45, p95: 95, p99: 150 },
      errorRate: 0.05,
      throughput: 980,
      lastIncident: '42d ago',
    },
    {
      name: 'Cache Layer',
      status: 'healthy' as const,
      uptime: 99.99,
      latency: { p50: 5, p95: 12, p99: 25 },
      errorRate: 0.01,
      throughput: 12500,
      lastIncident: '90d ago',
    },
  ],
  latencyHistory: [
    { hour: '00:00', p50: 145, p95: 280, p99: 420 },
    { hour: '01:00', p50: 140, p95: 275, p99: 415 },
    { hour: '02:00', p50: 135, p95: 270, p99: 410 },
    { hour: '03:00', p50: 130, p95: 265, p99: 400 },
    { hour: '04:00', p50: 125, p95: 260, p99: 395 },
    { hour: '05:00', p50: 130, p95: 265, p99: 400 },
    { hour: '06:00', p50: 140, p95: 280, p99: 420 },
    { hour: '07:00', p50: 155, p95: 300, p99: 450 },
    { hour: '08:00', p50: 175, p95: 330, p99: 490 },
    { hour: '09:00', p50: 185, p95: 345, p99: 510 },
    { hour: '10:00', p50: 180, p95: 340, p99: 500 },
    { hour: '11:00', p50: 175, p95: 335, p99: 495 },
    { hour: '12:00', p50: 185, p95: 345, p99: 510 },
    { hour: '13:00', p50: 180, p95: 340, p99: 500 },
    { hour: '14:00', p50: 175, p95: 335, p99: 495 },
    { hour: '15:00', p50: 170, p95: 330, p99: 490 },
    { hour: '16:00', p50: 175, p95: 335, p99: 495 },
    { hour: '17:00', p50: 180, p95: 340, p99: 500 },
    { hour: '18:00', p50: 165, p95: 320, p99: 475 },
    { hour: '19:00', p50: 155, p95: 305, p99: 455 },
    { hour: '20:00', p50: 150, p95: 295, p99: 445 },
    { hour: '21:00', p50: 148, p95: 290, p99: 435 },
    { hour: '22:00', p50: 146, p95: 285, p99: 425 },
    { hour: '23:00', p50: 145, p95: 280, p99: 420 },
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
  currentStats: {
    p50: 145,
    p95: 280,
    p99: 420,
    requestRate: 4200,
    errorRate: 0.19,
  },
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
      touchpoints: [{ channel: 'AI Content Engine', type: 'owned' as const }, { channel: 'SharePoint', type: 'owned' as const }],
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
    total: 273,
    fullTime: 245,
    contractors: 28,
    openRoles: 8,
    trend: [
      { month: 'Jul', count: 45 },
      { month: 'Aug', count: 95 },
      { month: 'Sep', count: 145 },
      { month: 'Oct', count: 185 },
      { month: 'Nov', count: 220 },
      { month: 'Dec', count: 273 },
    ],
  },
  attrition: {
    monthly: 0.8,
    annual: 6.2,
    voluntary: 4.5,
    involuntary: 1.7,
    regrettable: 2.1,
    benchmark: 15,
  },
  engagement: {
    enps: 42,
    participation: 94,
    trend: [
      { month: 'Q1', score: 32 },
      { month: 'Q2', score: 36 },
      { month: 'Q3', score: 39 },
      { month: 'Q4', score: 42 },
    ],
  },
  dei: {
    gender: { male: 48, female: 49, nonBinary: 3 },
    leadership: { male: 45, female: 52, nonBinary: 3 },
    ethnicity: [
      { group: 'White', percent: 42 },
      { group: 'Asian', percent: 35 },
      { group: 'Hispanic', percent: 12 },
      { group: 'Black', percent: 8 },
      { group: 'Other', percent: 3 },
    ],
  },
  departments: [
    { name: 'Producers', headcount: 208, attrition: 5, enps: 45, openRoles: 4 },
    { name: 'MLR Reviewers', headcount: 42, attrition: 4, enps: 40, openRoles: 2 },
    { name: 'Brand Leads', headcount: 18, attrition: 3, enps: 48, openRoles: 1 },
    { name: 'Admins', headcount: 5, attrition: 0, enps: 55, openRoles: 1 },
  ],
  tenure: [
    { range: '<1 year', count: 118, percent: 43 },
    { range: '1-2 years', count: 79, percent: 29 },
    { range: '2-3 years', count: 52, percent: 19 },
    { range: '3+ years', count: 24, percent: 9 },
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
  { label: 'Net Annual Cost', value: 2.08, type: 'total' as const },
];

const unitEconomics = {
  period: 'Q4 2024',
  currency: 'USD',
  summary: {
    ltv: 86600,
    cac: 12200,
    ltvCacRatio: 7.1,
    paybackMonths: 4.2,
    grossMargin: 61,
    netRevRetention: 135,
  },
  segments: [
    { name: 'Enterprise Brands', ltv: 125000, cac: 18000, ratio: 6.9, payback: 3.8, customers: 8, arr: 1000000 },
    { name: 'Regional Teams', ltv: 68000, cac: 12500, ratio: 5.4, payback: 4.5, customers: 24, arr: 1632000 },
    { name: 'Field Medical', ltv: 42000, cac: 8200, ratio: 5.1, payback: 5.2, customers: 45, arr: 1890000 },
    { name: 'Marketing Ops', ltv: 28000, cac: 6500, ratio: 4.3, payback: 6.0, customers: 65, arr: 1820000 },
  ],
  cohorts: [
    { month: 'Jul', cac: 15200, ltv: 72000, payback: 5.8 },
    { month: 'Aug', cac: 14100, ltv: 76000, payback: 5.2 },
    { month: 'Sep', cac: 13200, ltv: 80000, payback: 4.8 },
    { month: 'Oct', cac: 12800, ltv: 83000, payback: 4.5 },
    { month: 'Nov', cac: 12400, ltv: 85000, payback: 4.3 },
    { month: 'Dec', cac: 12200, ltv: 86600, payback: 4.2 },
  ],
  costBreakdown: {
    cac: [
      { category: 'Azure OpenAI', amount: 4200, percent: 34 },
      { category: 'Infrastructure', amount: 3200, percent: 26 },
      { category: 'Integration', amount: 2400, percent: 20 },
      { category: 'Training', amount: 1500, percent: 12 },
      { category: 'Support', amount: 900, percent: 8 },
    ],
    ltv: [
      { category: 'Cycle Time Savings', amount: 52000, percent: 60 },
      { category: 'Revision Reduction', amount: 22000, percent: 25 },
      { category: 'Agency Offset', amount: 12600, percent: 15 },
    ],
  },
  benchmarks: {
    ltvCacRatio: { good: 3, great: 5 },
    paybackMonths: { good: 12, great: 6 },
    grossMargin: { good: 50, great: 70 },
  },
};

const calendarHeatmap = {
  year: 2024,
  title: 'AI-Assisted Content Volume',
  metric: 'Assets Created',
  data: [
    { date: '2024-01-01', value: 18 },
    { date: '2024-02-01', value: 22 },
    { date: '2024-03-01', value: 25 },
    { date: '2024-04-01', value: 30 },
    { date: '2024-05-01', value: 34 },
    { date: '2024-06-01', value: 38 },
    { date: '2024-07-01', value: 41 },
    { date: '2024-08-01', value: 39 },
    { date: '2024-09-01', value: 44 },
    { date: '2024-10-01', value: 47 },
    { date: '2024-11-01', value: 50 },
    { date: '2024-12-01', value: 52 },
  ],
};

const sparklineGrid = [
  {
    label: 'Cycle Time (days)',
    values: [42, 38, 35, 30, 24, 20, 18, 16, 14],
    current: 14,
    change: -66.7,
  },
  {
    label: 'Approved Assets / Month',
    values: [272, 310, 355, 420, 520, 610, 720, 780, 816],
    current: 816,
    change: 200,
  },
  {
    label: 'Revision Rate',
    values: [0.4, 0.36, 0.32, 0.28, 0.23, 0.2, 0.18, 0.16, 0.15],
    current: 0.15,
    change: -62.5,
  },
  {
    label: 'Weekly Active Users',
    values: [0.1, 0.18, 0.24, 0.32, 0.4, 0.48, 0.55, 0.61, 0.68],
    current: 0.68,
    change: 580,
  },
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
  model: { name: 'Pfizer Content Assistant', version: '1.2.0', type: 'RAG + GPT-4 Turbo', lastUpdated: 'Oct 2024', owner: 'AI Platform Team', status: 'Production' },
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
  training: {
    dataSize: '12,000 approved content assets',
    dateRange: 'Jan 2022 - Oct 2024',
    features: 0,
    targetVariable: 'Content retrieval & generation',
    samplingStrategy: 'Full corpus indexing',
    trainTestSplit: 'N/A (RAG)',
  },
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
  deployment: {
    endpoint: 'ai-content-api.pfizer.internal/v1/generate',
    latency: '280ms p95',
    throughput: '4,200 req/day',
    monitoring: 'Datadog APM + custom guardrail alerts',
  },
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
