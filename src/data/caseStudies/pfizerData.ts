// src/data/caseStudies/pfizerData.ts
// ═══════════════════════════════════════════════════════════════════════════════
// PFIZER CASE STUDY — NARRATIVE + CHART DATA
// Complete data bundle for the Pfizer AI Content Engine case study
// ═══════════════════════════════════════════════════════════════════════════════

import type { 
  CaseStudyData, 
  CaseStudyCharts,
  SystemContextData,
  JourneyMapData,
  DataQualityData 
} from '@/types/caseStudy';
import { chartColors } from '@/charts_D3/colors';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA (CaseStudyData)
// ═══════════════════════════════════════════════════════════════════════════════

export const pfizerData: CaseStudyData = {
  slug: 'pfizer',
  brandLogo: '/assets/img/logo/Pfizer-(2021).png',
  title: 'Pfizer AI Content Engine',
  subtitle: 'AI/ML Engineering',
  company: 'Pfizer',
  client: 'Pfizer Global Production',
  role: 'Lead AI/ML Engineer',
  year: '2024',
  services: ['AI/ML Engineering', 'RAG Pipeline', 'System Integration', 'Change Management'],
  heroImage: '/assets/img/case-studies/pfizer/hero.jpg',
  overview: 'Reduced MLR review cycles by 65% (42 → 14 days), tripled approved AI-assisted content, and unlocked $2M+ annual savings with a governed AI content engine embedded in existing CLM/CRM workflows.',

  // Three-line hero context (replaces complex executive header)
  heroContext: {
    client: 'Global top-5 pharma; commercial & digital teams operating under MLR governance.',
    constraint: '4–6 week review cycles and fragmented retrieval made AI experimentation too slow and expensive.',
    result: '65% faster approvals, 3× throughput, $2M+ in annual savings, and zero MLR exceptions (≥99% compliance SLA).'
  },

  // Metrics row under hero
  heroMetrics: [
    { label: 'Cycle Time', value: '42 → 14 days', delta: '-65%' },
    { label: 'Throughput', value: '3×', delta: 'approved AI-assisted content' },
    { label: 'Savings', value: '$2M+', delta: 'annualized' }
  ],

  executiveSnapshot: {
    headline: '65% faster MLR cycles, $2M+ annual savings',
    keyOutcomes: [
      '42→14 day review cycles',
      '3× throughput increase',
      '200+ users onboarded',
      '5 systems integrated'
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // EXECUTIVE SUMMARY — Full case study context block
  // ─────────────────────────────────────────────────────────────────────────────
  executiveSummary: {
    client: 'Global Top-5 Pharma',
    context: 'Commercial / Digital – MLR-governed content at global scale',
    primaryConstraint: 'Medical–Legal–Regulatory (MLR) review time and risk tolerance',
    primaryProblem: 'Campaign content cycles were too slow and expensive to justify AI-driven experimentation.',
    solutionPattern: 'Governed AI Content Engine: RAG + structured templates + human-in-the-loop MLR review, plugged into existing CLM and CRM surfaces.',
    scope: 'Salesforce, CLM platform, content asset library, MLR workflow, field enablement reporting.',
    engagementRole: 'Forward-Deployed Engineer embedded with Commercial, MLR, and Platform teams.',
    impact: {
      cycleTime: 'Content review cycle reduced from ~45 days to ~14 days.',
      throughput: '3× increase in approved AI-assisted content throughput.',
      cost: '$2M+ annualized savings from reduced agency/producer spend.',
      risk: 'Zero MLR exceptions; compliance SLA maintained ≥99%.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASE NARRATIVE META — Challenge/Outcome per phase
  // ─────────────────────────────────────────────────────────────────────────────
  phasesMeta: [
    {
      key: 'diagnose',
      title: 'Diagnose',
      challenge: 'We did not know whether AI initiatives were constrained by demand, MLR review, or production capacity.',
      outcome: 'Diagnostics showed that MLR cycle time and fragmented content workflows were the binding constraints.',
    },
    {
      key: 'architect',
      title: 'Architect',
      challenge: 'We needed an AI system that could plug into existing CLM/CRM and survive MLR scrutiny without disrupting controls.',
      outcome: 'We designed a governed RAG content engine that kept Salesforce/CLM as system of record and made the AI layer stateless and replaceable.',
    },
    {
      key: 'engineer',
      title: 'Engineer',
      challenge: 'We had to prove reliability and performance at production scale, not just in a demo environment.',
      outcome: 'Service health, model documentation, latency and data quality metrics showed stable production behaviour under real workloads.',
    },
    {
      key: 'enable',
      title: 'Enable',
      challenge: 'Without adoption by MLR and field teams, the platform would become another unused AI experiment.',
      outcome: 'Journey and org-health metrics showed cross-team adoption and satisfaction, with MLR and field partners actively using the engine.',
    },
    {
      key: 'impact',
      title: 'Impact',
      challenge: 'We needed to show that infrastructure and change-management investment produced defendable ROI.',
      outcome: 'Waterfall, unit-economics, seasonality and trend charts demonstrated durable savings and an expansion path without infra step-function costs.',
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // PATTERN GENERALIZATION — How this pattern generalizes
  // ─────────────────────────────────────────────────────────────────────────────
  patternGeneralization: {
    bestFitEnvironments: 'Regulated, high-volume content workflows – pharma, med-device, payer, and financial marketing teams with MLR or similar review boards.',
    corePrimitives: 'Governed RAG, curated asset library, approval-workflow hooks, production observability, and clear SLOs aligned to review SLAs.',
    whatYouNeedReady: 'Clean content sources, defined review process, and 1–2 pilot teams willing to co-design workflows around the AI content engine.',
  },

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
      deliverables: ['MLR Cycle-Time Baseline', 'Bottleneck & Revision Analysis', 'Accountability Map'],
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
      deliverables: ['C4 System Context Diagram', 'RAG Pipeline Blueprint', '14-Week Implementation Plan'],
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
        'Automated review routing and status tracking',
        'Real-time collaboration dashboard',
        'MLR compliance gate with audit logging'
      ],
      deliverables: ['AI Content API & RAG Service', 'Production SLO Dashboard', 'Model Card & Evaluation Report', 'Data Quality Scorecard'],
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
        '200+ content producers onboarded',
        '5 platform admins certified',
        'Governance playbook and runbooks',
        'Monthly office hours for advanced features'
      ],
      deliverables: ['Producer Journey Redesign', 'Training & Governance Playbook', 'Org Adoption & Health Dashboard'],
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
      deliverables: ['ROI Waterfall & Savings Model', 'Unit Economics Model', 'Usage Seasonality Report', 'Executive KPI Grid'],
      metrics: [
        { value: '65%', numericValue: 65, suffix: '%', label: 'Cycle Time Reduction' },
        { value: '3×', label: 'Throughput Increase' },
        { value: '$2M+', label: 'Annual Savings' }
      ]
    }
  },

  challenge: {
    title: 'Challenge',
    description: 'Manual content workflows bottlenecking delivery across global brand teams.',
    points: [
      'Content review cycles taking 4-6 weeks',
      'No centralized system for asset management',
      'Stakeholders across 3 continents misaligned',
      '40% of assets stuck in revision loops'
    ]
  },

  approach: {
    title: 'Approach',
    description: 'Embedded engineering with phased AI integration.',
    points: [
      'Onsite discovery with brand and MLR teams',
      'Mapped workflows and identified bottlenecks',
      'Designed compliant AI architecture',
      'Iterative delivery with continuous feedback'
    ]
  },

  solution: {
    title: 'Solution',
    description: 'AI-powered content engine with RAG retrieval and MLR compliance.',
    points: [
      'GPT-4 RAG pipeline over SharePoint assets',
      'Automated review routing and tracking',
      'Real-time collaboration dashboard',
      'MLR governance checkpoints'
    ],
    tools: [
      { label: 'AI/ML', value: 'Azure OpenAI, GPT-4' },
      { label: 'Search', value: 'Azure AI Search' },
      { label: 'Platform', value: 'SharePoint, Veeva, Workfront' },
      { label: 'Infra', value: 'Azure, Teams Bot Framework' }
    ]
  },

  results: {
    title: 'Outcomes',
    metrics: [
      { value: '65%', numericValue: 65, suffix: '%', label: 'Cycle Time Reduction' },
      { value: '3×', label: 'Throughput Increase' },
      { value: '$2M+', label: 'Annual Savings' },
      { value: '200+', label: 'Users Onboarded' }
    ]
  },

  testimonial: {
    quote: 'Christopher embedded with our team and delivered a system that fundamentally changed how we produce content. The AI integration was seamless and the compliance framework gave us confidence to scale.',
    author: 'Sarah Johnson',
    role: 'VP, Global Brand Operations',
    company: 'Pfizer'
  },

  galleryImages: [
    '/assets/img/case-studies/pfizer/gallery-1.jpg',
    '/assets/img/case-studies/pfizer/gallery-2.jpg',
    '/assets/img/case-studies/pfizer/gallery-3.jpg',
    '/assets/img/home-06/project/Embedded.jpg',
    '/assets/img/home-06/project/Embedded.jpg',
    '/assets/img/home-06/project/Embedded.jpg',
    '/assets/img/home-06/project/Embedded.jpg'
  ],

  nextCaseStudy: {
    brand: 'Medtronic',
    title: 'Surgical AI Platform',
    description: 'Real-time surgical guidance system',
    href: '/case-study/medtronic'
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHART DATA
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// GANTT CHART — 14-week timeline
// ─────────────────────────────────────────────────────────────────────────────
const gantt = [
  { id: 1, task: "Stakeholder Interviews & Discovery", start: 0, duration: 2, category: "Discovery", progress: 100 },
  { id: 2, task: "Workflow & MLR Bottleneck Mapping", start: 1, duration: 2, category: "Discovery", progress: 100 },
  { id: 3, task: "Pain Point Analysis", start: 1, duration: 2, category: "Discovery", progress: 100 },
  { id: 4, task: "AI Pipeline Architecture", start: 2, duration: 2, category: "Architecture", progress: 100 },
  { id: 5, task: "Compliance & Guardrail Design", start: 3, duration: 2, category: "Architecture", progress: 100 },
  { id: 6, task: "System Integration Planning", start: 3, duration: 1, category: "Architecture", progress: 100 },
  { id: 7, task: "RAG Pipeline Build", start: 4, duration: 4, category: "Engineering", progress: 100 },
  { id: 8, task: "Automated Review Routing", start: 5, duration: 3, category: "Engineering", progress: 100 },
  { id: 9, task: "Collaboration Dashboard", start: 6, duration: 3, category: "Engineering", progress: 100 },
  { id: 10, task: "MLR Compliance Gate", start: 7, duration: 3, category: "Engineering", progress: 100 },
  { id: 11, task: "Governance Playbook", start: 8, duration: 3, category: "Enablement", progress: 100 },
  { id: 12, task: "User Training (200+)", start: 9, duration: 3, category: "Enablement", progress: 100 },
  { id: 13, task: "Power User Certification", start: 10, duration: 2, category: "Enablement", progress: 100 },
  { id: 14, task: "Quarterly Review & KPIs", start: 12, duration: 2, category: "Enablement", progress: 100 }
];

// ─────────────────────────────────────────────────────────────────────────────
// FUNNEL CHART — MLR Content Review Pipeline (Diagnose phase)
// Per manuscript: 2,450+ assets per quarter entering MLR review
// ─────────────────────────────────────────────────────────────────────────────
const funnel = [
  { stage: 'Assets Created (Q)', value: 2450, color: chartColors.teal },
  { stage: 'Search & Retrieval', value: 1470, color: chartColors.gray },
  { stage: 'MLR Review Queue', value: 1225, color: chartColors.orange },
  { stage: 'Revisions Loop', value: 735, color: chartColors.indigo },
  { stage: 'Final Approval', value: 612, color: chartColors.purple },
  { stage: 'Field Deployed', value: 612, color: chartColors.green },
];


// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM CONTEXT (C4) — Architect phase
// ─────────────────────────────────────────────────────────────────────────────
const systemContext: SystemContextData = {
  system: {
    name: 'AI Content Engine',
    description: 'GPT-4 powered content assistant with RAG retrieval, integrated into Pfizer content workflow',
    type: 'Software System',
  },
  users: [
    {
      id: 'content-producer',
      name: 'Content Producer',
      icon: '/assets/SVG/Edit 1.svg',
      description: 'Creates and edits promotional content',
      interactions: ['Draft content', 'Request AI suggestions', 'Submit for review'],
    },
    {
      id: 'mlr-reviewer',
      name: 'MLR Reviewer',
      icon: '/assets/SVG/Legal.svg',
      description: 'Reviews content for regulatory compliance',
      interactions: ['Review submissions', 'Flag issues', 'Approve content'],
    },
    {
      id: 'brand-manager',
      name: 'Brand Manager',
      icon: '/assets/SVG/Chart Statistics 1.svg',
      description: 'Oversees brand content strategy',
      interactions: ['Track approvals', 'View dashboards', 'Manage templates'],
    },
    {
      id: 'admin',
      name: 'Platform Admin',
      icon: '/assets/SVG/Settings 1.svg',
      description: 'Manages system configuration and users',
      interactions: ['User management', 'Configure guardrails', 'Monitor usage'],
    },
  ],
  externalSystems: [
    {
      id: 'openai',
      name: 'Azure OpenAI',
      type: 'AI Service',
      icon: '/assets/SVG/Light Bulb.svg',
      description: 'GPT-4 language model',
      protocol: 'REST API',
      direction: 'outbound' as const,
      dataFlow: ['Prompts', 'Completions', 'Embeddings'],
    },
    {
      id: 'sharepoint',
      name: 'SharePoint',
      type: 'Document Store',
      icon: '/assets/SVG/Folder.svg',
      description: 'Enterprise document management',
      protocol: 'Graph API',
      direction: 'bidirectional' as const,
      dataFlow: ['Content drafts', 'Templates', 'Approved assets'],
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      type: 'Collaboration',
      icon: '/assets/SVG/Chat Bubble.svg',
      description: 'Real-time collaboration',
      protocol: 'Bot Framework',
      direction: 'bidirectional' as const,
      dataFlow: ['Notifications', 'Approvals', 'Comments'],
    },
    {
      id: 'workfront',
      name: 'Workfront',
      type: 'Project Management',
      icon: '/assets/SVG/Clipboard.svg',
      description: 'Marketing workflow orchestration',
      protocol: 'REST API',
      direction: 'bidirectional' as const,
      dataFlow: ['Task assignments', 'Status updates', 'Deadlines'],
    },
    {
      id: 'veeva',
      name: 'Veeva Vault',
      type: 'Content Platform',
      icon: '/assets/SVG/Medical Kit.svg',
      description: 'Pharma content management',
      protocol: 'REST API',
      direction: 'outbound' as const,
      dataFlow: ['Approved content', 'Audit trail', 'Metadata sync'],
    },
  ],
};


// ─────────────────────────────────────────────────────────────────────────────
// SERVICE HEALTH DASHBOARD — Engineer phase
// p95 response time optimized from 850ms → 280ms per manuscript
// ─────────────────────────────────────────────────────────────────────────────
const serviceHealth = {
  services: [
    { name: 'AI Content API', status: 'healthy' as const, uptime: 99.72, latency: { p50: 145, p95: 280, p99: 520 }, errorRate: 0.28, throughput: 4200, lastIncident: '21d ago' },
    { name: 'RAG Pipeline', status: 'healthy' as const, uptime: 99.68, latency: { p50: 320, p95: 580, p99: 920 }, errorRate: 0.32, throughput: 3800, lastIncident: '14d ago' },
    { name: 'MLR Gateway', status: 'healthy' as const, uptime: 99.91, latency: { p50: 95, p95: 185, p99: 310 }, errorRate: 0.09, throughput: 2100, lastIncident: '45d ago' },
    { name: 'SharePoint Sync', status: 'degraded' as const, uptime: 99.54, latency: { p50: 210, p95: 420, p99: 680 }, errorRate: 0.46, throughput: 8500, lastIncident: '3d ago' },
    { name: 'Notification Service', status: 'healthy' as const, uptime: 99.87, latency: { p50: 38, p95: 72, p99: 125 }, errorRate: 0.13, throughput: 12000, lastIncident: '30d ago' },
  ],
  latencyHistory: [
    { hour: '00:00', p50: 245, p95: 480, p99: 820 },
    { hour: '01:00', p50: 220, p95: 440, p99: 780 },
    { hour: '02:00', p50: 195, p95: 390, p99: 720 },
    { hour: '03:00', p50: 180, p95: 360, p99: 680 },
    { hour: '04:00', p50: 185, p95: 370, p99: 700 },
    { hour: '05:00', p50: 210, p95: 420, p99: 760 },
    { hour: '06:00', p50: 260, p95: 520, p99: 880 },
    { hour: '07:00', p50: 320, p95: 640, p99: 1050 },
    { hour: '08:00', p50: 350, p95: 700, p99: 1150 },
    { hour: '09:00', p50: 380, p95: 760, p99: 1250 },
    { hour: '10:00', p50: 360, p95: 720, p99: 1180 },
    { hour: '11:00', p50: 340, p95: 680, p99: 1120 },
    { hour: '12:00', p50: 390, p95: 780, p99: 1280 },
    { hour: '13:00', p50: 370, p95: 740, p99: 1220 },
    { hour: '14:00', p50: 355, p95: 710, p99: 1165 },
    { hour: '15:00', p50: 345, p95: 690, p99: 1135 },
    { hour: '16:00', p50: 360, p95: 720, p99: 1180 },
    { hour: '17:00', p50: 380, p95: 760, p99: 1250 },
    { hour: '18:00', p50: 330, p95: 660, p99: 1085 },
    { hour: '19:00', p50: 290, p95: 580, p99: 950 },
    { hour: '20:00', p50: 270, p95: 540, p99: 890 },
    { hour: '21:00', p50: 258, p95: 515, p99: 850 },
    { hour: '22:00', p50: 250, p95: 500, p99: 830 },
    { hour: '23:00', p50: 248, p95: 495, p99: 825 },
  ]
};


// ─────────────────────────────────────────────────────────────────────────────
// CUSTOMER JOURNEY MAP — Enable phase
// ─────────────────────────────────────────────────────────────────────────────
const journeyMap: JourneyMapData = {
  persona: { name: 'Content Producer', role: 'Senior Medical Writer', company: 'Pfizer Marketing', avatar: '/assets/SVG/Edit 1.svg' },
  goal: 'Get promotional content through MLR approval faster with AI assistance',
  stages: [
    {
      id: 'brief', name: 'Brief', icon: '/assets/SVG/Clipboard.svg', color: chartColors.teal, duration: '1-2 days',
      touchpoints: [{ channel: 'Workfront', type: 'owned' as const }, { channel: 'Teams', type: 'owned' as const }],
      actions: ['Receives campaign brief from brand team', 'Reviews brand guidelines and templates', 'Checks previous approved content'],
      thoughts: ['"What templates can I reuse?"', '"How do I find similar approved content?"'],
      emotions: { score: 3, label: 'Neutral' },
      painPoints: ['Hard to find relevant templates'],
      opportunities: ['AI-powered template suggestions'],
    },
    {
      id: 'draft', name: 'AI-Assisted Draft', icon: '/assets/SVG/Light Bulb.svg', color: chartColors.orange, duration: '2-3 days',
      touchpoints: [{ channel: 'AI Content Engine', type: 'owned' as const }, { channel: 'SharePoint', type: 'owned' as const }],
      actions: ['Opens AI assistant in Teams', 'Gets suggested content based on brief', 'Iterates with AI on messaging'],
      thoughts: ['"This is much faster than starting from scratch"', '"The AI remembers our brand voice"'],
      emotions: { score: 4, label: 'Optimistic' },
      painPoints: ['Learning new AI interface'],
      opportunities: ['Training videos'],
    },
    {
      id: 'mlr', name: 'MLR Submission', icon: '/assets/SVG/Legal.svg', color: chartColors.indigo, duration: '3-5 days',
      touchpoints: [{ channel: 'MLR Gateway', type: 'owned' as const }, { channel: 'Veeva Vault', type: 'owned' as const }],
      actions: ['Submits draft through AI gateway', 'AI pre-checks for common issues', 'Receives automated routing to right reviewer'],
      thoughts: ['"The pre-check caught issues before MLR saw it"', '"I know exactly who is reviewing"'],
      emotions: { score: 4, label: 'Confident' },
      painPoints: ['Waiting for reviewer assignment'],
      opportunities: ['Real-time status tracking'],
    },
    {
      id: 'approved', name: 'Approved', icon: '/assets/SVG/Checkmark Square.svg', color: chartColors.green, duration: '1 day',
      touchpoints: [{ channel: 'Teams notification', type: 'owned' as const }, { channel: 'Veeva Vault', type: 'owned' as const }],
      actions: ['Receives approval notification', 'Content auto-syncs to Veeva', 'Shares with field team'],
      thoughts: ['"That was 65% faster than before!"', '"I can take on more projects now"'],
      emotions: { score: 5, label: 'Delighted' },
      painPoints: [],
      opportunities: ['Celebrate wins'],
    },
  ],
};


// ─────────────────────────────────────────────────────────────────────────────
// WATERFALL CHART — Impact phase ($2.08M annual savings)
// ─────────────────────────────────────────────────────────────────────────────
const waterfall = [
  { label: 'Baseline Cost/Asset', value: 4.2, type: 'total' as const },
  { label: 'Faster MLR Cycles (-65%)', value: -0.95, type: 'decrease' as const },
  { label: 'Reduced Revision Loops', value: -0.42, type: 'decrease' as const },
  { label: 'Agency Fee Savings', value: -0.38, type: 'decrease' as const },
  { label: 'Producer Hour Recovery', value: -0.25, type: 'decrease' as const },
  { label: 'Reviewer Bandwidth', value: -0.12, type: 'decrease' as const },
  { label: 'Net Annual Cost', value: 2.08, type: 'total' as const },
];

// ─────────────────────────────────────────────────────────────────────────────
// CALENDAR HEATMAP — Diagnose phase (production volume patterns)
// ─────────────────────────────────────────────────────────────────────────────
const calendarHeatmap = {
  year: 2024,
  title: 'Content Production Volume',
  metric: 'Assets Created',
  data: Array.from({ length: 365 }, (_, i) => {
    const date = new Date(2024, 0, i + 1);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const monthMultiplier = [0.7, 0.8, 1.2, 1.0, 0.9, 0.6, 0.5, 0.7, 1.3, 1.4, 1.1, 0.8][date.getMonth()];
    const baseValue = isWeekend ? 2 : Math.floor(Math.random() * 15 + 8);
    return { date: date.toISOString().split('T')[0], value: Math.floor(baseValue * monthMultiplier) };
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// RACI MATRIX — Diagnose phase (workflow ownership)
// ─────────────────────────────────────────────────────────────────────────────
const raciMatrix = {
  project: 'MLR Content Workflow',
  lastUpdated: 'Oct 2024',
  workstreams: [
    { id: 'ws1', name: 'Content Drafting', category: 'Creation' },
    { id: 'ws2', name: 'Template Search', category: 'Creation' },
    { id: 'ws3', name: 'Compliance Pre-Check', category: 'Review' },
    { id: 'ws4', name: 'MLR Submission', category: 'Review' },
    { id: 'ws5', name: 'Medical Review', category: 'Review' },
    { id: 'ws6', name: 'Legal Review', category: 'Review' },
    { id: 'ws7', name: 'Revision Management', category: 'Operations' },
    { id: 'ws8', name: 'Final Approval', category: 'Operations' },
    { id: 'ws9', name: 'Asset Publishing', category: 'Deployment' },
  ],
  stakeholders: [
    { id: 'p1', name: 'Content Producer', role: 'Medical Writer', team: 'Marketing', initials: 'CP' },
    { id: 'p2', name: 'MLR Reviewer', role: 'Compliance Lead', team: 'MLR', initials: 'MR' },
    { id: 'p3', name: 'Brand Manager', role: 'Brand Lead', team: 'Brand', initials: 'BM' },
    { id: 'p4', name: 'Legal/Medical', role: 'Reviewer', team: 'Legal', initials: 'LM' },
    { id: 'p5', name: 'AI System', role: 'Automation', team: 'Tech', initials: 'AI' },
  ],
  assignments: {
    'ws1-p1': 'R', 'ws1-p3': 'A', 'ws1-p4': 'C', 'ws1-p5': 'C',
    'ws2-p1': 'R', 'ws2-p5': 'R', 'ws2-p3': 'I',
    'ws3-p1': 'I', 'ws3-p2': 'C', 'ws3-p4': 'C', 'ws3-p5': 'R',
    'ws4-p1': 'R', 'ws4-p2': 'A', 'ws4-p5': 'C',
    'ws5-p1': 'I', 'ws5-p2': 'C', 'ws5-p4': 'R',
    'ws6-p1': 'I', 'ws6-p2': 'C', 'ws6-p4': 'R',
    'ws7-p1': 'R', 'ws7-p2': 'A', 'ws7-p3': 'C', 'ws7-p5': 'R',
    'ws8-p2': 'R', 'ws8-p3': 'A', 'ws8-p4': 'C',
    'ws9-p1': 'R', 'ws9-p3': 'A', 'ws9-p5': 'C',
  } as Record<string, string>,
};


// ─────────────────────────────────────────────────────────────────────────────
// RAG PIPELINE — Architect phase
// ─────────────────────────────────────────────────────────────────────────────
const ragPipeline = {
  sections: [
    { id: 'ingestion', name: 'SharePoint Ingestion', color: chartColors.navy, components: [
      { id: 'docs', name: 'Brand Assets', icon: '📄', desc: 'Templates, approved content' },
      { id: 'loader', name: 'Graph API Loader', icon: '⟳', desc: 'Microsoft Graph' },
      { id: 'chunker', name: 'Section Chunker', icon: '▤', desc: 'Preserves claims' },
    ]},
    { id: 'embedding', name: 'Azure Embeddings', color: chartColors.purple, components: [
      { id: 'embedder', name: 'text-embedding-3', icon: '◈', desc: 'Azure OpenAI' },
      { id: 'vectordb', name: 'Cognitive Search', icon: '⬡', desc: 'Azure AI Search' },
      { id: 'metadata', name: 'Brand Filters', icon: '☰', desc: 'Region, Therapeutic' },
    ]},
    { id: 'retrieval', name: 'MLR-Aware Retrieval', color: chartColors.teal, components: [
      { id: 'query-embed', name: 'Query + Context', icon: '◇', desc: 'User intent' },
      { id: 'search', name: 'Hybrid Search', icon: '⟐', desc: 'Semantic + Keyword' },
      { id: 'rerank', name: 'Compliance Filter', icon: '↕', desc: 'Approved only' },
    ]},
    { id: 'generation', name: 'Guarded Generation', color: chartColors.orange, components: [
      { id: 'context', name: 'Prompt Template', icon: '⊞', desc: 'Brand voice' },
      { id: 'llm', name: 'GPT-4 Turbo', icon: '★', desc: 'Azure OpenAI' },
      { id: 'response', name: 'Draft + Citations', icon: '◉', desc: 'Traceable output' },
    ]},
  ],
  flows: [
    { from: 'docs', to: 'loader' }, { from: 'loader', to: 'chunker' }, { from: 'chunker', to: 'embedder' },
    { from: 'embedder', to: 'vectordb' }, { from: 'chunker', to: 'metadata' },
    { from: 'query-embed', to: 'search', type: 'query' }, { from: 'vectordb', to: 'search', type: 'query' },
    { from: 'metadata', to: 'search', type: 'query' }, { from: 'search', to: 'rerank', type: 'query' },
    { from: 'rerank', to: 'context', type: 'gen' }, { from: 'context', to: 'llm', type: 'gen' }, { from: 'llm', to: 'response', type: 'gen' },
  ],
  metrics: [
    { name: 'Relevance', value: 0.91, desc: 'Retrieved doc relevance' },
    { name: 'Faithfulness', value: 0.96, desc: 'Citations verified' },
    { name: 'Latency', value: '280ms', desc: 'p95 response time' },
    { name: 'Recall@5', value: 0.82, desc: 'Relevant in top 5' },
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// MODEL CARD — Architect phase (guardrails, failure modes)
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
  // Training data section required by ModelCard component
  training: {
    dataSize: '12,000 approved content assets',
    dateRange: 'Jan 2022 - Oct 2024',
    features: 0, // RAG pipeline, not feature-based ML
    targetVariable: 'Content retrieval & generation',
    samplingStrategy: 'Full corpus indexing',
    trainTestSplit: 'N/A (RAG)',
  },
  // Fairness metrics section
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
  // Feature importance for RAG system
  features: [
    { name: 'semantic_similarity', importance: 0.35, category: 'retrieval' },
    { name: 'recency_score', importance: 0.20, category: 'retrieval' },
    { name: 'brand_filter_match', importance: 0.18, category: 'filter' },
    { name: 'content_type_match', importance: 0.12, category: 'filter' },
    { name: 'approval_status', importance: 0.10, category: 'compliance' },
    { name: 'user_engagement_history', importance: 0.05, category: 'personalization' },
  ],
  // Deployment info required by ModelCard component
  deployment: {
    endpoint: 'ai-content-api.pfizer.internal/v1/generate',
    latency: '280ms p95',
    throughput: '4,200 req/day',
    monitoring: 'Datadog APM + custom guardrail alerts',
  },
};


// ─────────────────────────────────────────────────────────────────────────────
// LATENCY PERCENTILES — Engineer phase (850ms → 280ms)
// ─────────────────────────────────────────────────────────────────────────────
const latencyPercentiles = {
  service: 'ai-content-api',
  timeRange: 'Week 10 Production',
  currentTime: '14:30 UTC',
  sloTargets: { p50: 200, p95: 400, p99: 800 },
  dataPoints: [
    { time: 'Baseline', p50: 450, p95: 850, p99: 1420, requests: 2100, errors: 45 },
    { time: 'Week 6', p50: 380, p95: 720, p99: 1180, requests: 2800, errors: 32 },
    { time: 'Week 7', p50: 320, p95: 580, p99: 950, requests: 3200, errors: 24 },
    { time: 'Week 8', p50: 245, p95: 420, p99: 720, requests: 3600, errors: 18 },
    { time: 'Week 9', p50: 185, p95: 340, p99: 580, requests: 3900, errors: 12 },
    { time: 'Week 10', p50: 145, p95: 280, p99: 520, requests: 4200, errors: 8 },
  ],
  anomalies: [
    { start: 0, end: 1, severity: 'warning', cause: 'Pre-optimization baseline period' }
  ],
  currentStats: {
    p50: 145,
    p95: 280,
    p99: 520,
    requestRate: 4200,
    errorRate: 0.19,
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DATA QUALITY SCORECARD — Engineer phase
// ─────────────────────────────────────────────────────────────────────────────
const dataQuality: DataQualityData = {
  overall: 94,
  dimensions: [
    { name: 'Embedding Coverage', score: 96, target: 95, trend: 'up' as const },
    { name: 'Retrieval Accuracy', score: 91, target: 90, trend: 'up' as const },
    { name: 'Freshness', score: 95, target: 95, trend: 'stable' as const },
    { name: 'Drift Detection', score: 92, target: 90, trend: 'up' as const },
    { name: 'Citation Validity', score: 96, target: 95, trend: 'stable' as const },
  ],
  issues: [
    { severity: 'info' as const, count: 12, description: 'New templates indexed this week' },
    { severity: 'warning' as const, count: 3, description: 'Stale embeddings detected (>30d)' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ORG HEALTH DASHBOARD — Enable phase (adoption, training)
// ─────────────────────────────────────────────────────────────────────────────
const orgHealth = {
  asOfDate: 'Q4 2024',
  headcount: {
    total: 1400,
    fullTime: 1260,
    contractors: 140,
    openRoles: 45,
    trend: [
      { month: 'Jul', count: 320 },
      { month: 'Aug', count: 520 },
      { month: 'Sep', count: 780 },
      { month: 'Oct', count: 1050 },
      { month: 'Nov', count: 1250 },
      { month: 'Dec', count: 1400 },
    ],
  },
  attrition: {
    monthly: 1.2,
    annual: 8.5,
    voluntary: 6.0,
    involuntary: 2.5,
    regrettable: 3.0,
    benchmark: 15,
  },
  engagement: {
    enps: 62,
    participation: 94,
    trend: [
      { month: 'Q1', score: 48 },
      { month: 'Q2', score: 52 },
      { month: 'Q3', score: 58 },
      { month: 'Q4', score: 62 },
    ],
  },
  dei: {
    gender: { male: 52, female: 45, nonBinary: 3 },
    leadership: { male: 50, female: 50, nonBinary: 0 },
    ethnicity: [
      { group: 'White', percent: 45 },
      { group: 'Asian', percent: 32 },
      { group: 'Hispanic', percent: 12 },
      { group: 'Black', percent: 8 },
      { group: 'Other', percent: 3 },
    ],
  },
  departments: [
    { name: 'AI/ML Engineering', headcount: 380, attrition: 5, enps: 68, openRoles: 12 },
    { name: 'Content Ops', headcount: 340, attrition: 8, enps: 58, openRoles: 8 },
    { name: 'Medical Review', headcount: 280, attrition: 6, enps: 62, openRoles: 10 },
    { name: 'Brand Marketing', headcount: 220, attrition: 10, enps: 55, openRoles: 8 },
    { name: 'Product', headcount: 180, attrition: 4, enps: 72, openRoles: 7 },
  ],
  tenure: [
    { range: '<1 year', count: 602, percent: 43 },
    { range: '1-2 years', count: 406, percent: 29 },
    { range: '2-3 years', count: 266, percent: 19 },
    { range: '3-5 years', count: 126, percent: 9 },
  ],
};


// ─────────────────────────────────────────────────────────────────────────────
// UNIT ECONOMICS — Impact phase
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// SPARKLINE GRID — Impact phase (KPI trends)
// ─────────────────────────────────────────────────────────────────────────────
const sparklineGrid = [
  { 
    label: 'Cycle Time (days)', 
    values: [42, 40, 38, 35, 32, 28, 25, 22, 20, 18, 17, 16, 15, 14, 14, 14],
    current: 14,
    change: -66.7,
  },
  { 
    label: 'Throughput (assets/mo)', 
    values: [272, 285, 310, 340, 380, 420, 480, 540, 600, 660, 720, 760, 790, 810, 816, 816],
    current: 816,
    change: 200,
  },
  { 
    label: 'User Adoption', 
    values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 95, 145, 185, 200, 208],
    current: 208,
    change: 100,
  },
  { 
    label: 'p95 Latency (ms)', 
    values: [850, 850, 850, 850, 780, 720, 620, 520, 450, 380, 340, 310, 290, 285, 280, 280],
    current: 280,
    change: -67.1,
  },
];

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
// CLEAN CONFIG EXPORT — Single import for case study pages
// ═══════════════════════════════════════════════════════════════════════════════
// Usage: import { pfizerConfig } from '@/data/caseStudies/pfizerData';
// Then:  <CaseStudyTemplate study={pfizerConfig.study} charts={pfizerConfig.charts} />
// ═══════════════════════════════════════════════════════════════════════════════

export interface CaseStudyConfig {
  slug: string;
  study: CaseStudyData;
  charts: CaseStudyCharts;
}

export const pfizerConfig: CaseStudyConfig = {
  slug: 'pfizer',
  study: pfizerData,
  charts: pfizerCharts,
};
