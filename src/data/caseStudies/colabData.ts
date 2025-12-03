// src/data/caseStudies/colabData.ts
// ═══════════════════════════════════════════════════════════════════════════════
// COLAB CASE STUDY — RETRIEVAL & KNOWLEDGE ENGINEERING
// Complete data bundle for the CoCo (Company Companion) knowledge engine
// ═══════════════════════════════════════════════════════════════════════════════

import type {
  CaseStudyData,
  CaseStudyCharts,
  SystemContextData,
  JourneyMapData,
  DataQualityData,
  PhaseSection,
} from '@/types/caseStudy';
import { chartColors } from '@/charts_D3/colors';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA (CaseStudyData)
// ═══════════════════════════════════════════════════════════════════════════════

export const colabData: CaseStudyData = {
  id: 'colab',
  slug: 'colab',
  brandLogo: '/assets/img/cmlogo.png',
  title: 'Colab Company Companion',
  subtitle: 'Retrieval & Knowledge Engineering',
  company: 'Global Enterprise',
  client: 'Enterprise Research & Operations',
  role: 'Lead Retrieval & Knowledge Engineer',
  year: '2024',
  services: ['Knowledge Engineering', 'RAG Pipeline', 'Vector Search', 'Semantic Infrastructure'],
  heroImage: '/assets/img/home-06/project/colab.jpg',
  overview: 'Turned a fragmented intranet into a single source of truth with an AI assistant ("CoCo") that cut search-to-answer time from 15 minutes to under 30 seconds and tripled successful document discovery for onboarding, SOPs, and internal workflows.',

  // Three-line hero context
  heroContext: {
    client: 'Enterprise research & operations teams working across multiple business units.',
    constraint: 'Knowledge lived in disconnected wikis, SharePoint sites, and legacy portals; new hires and project teams could not reliably find the "latest approved" document.',
    result: 'A governed RAG knowledge engine ("CoCo") became the company companion for onboarding and daily work, with measurable gains in time-to-answer, SOP adoption, and cross-team reuse.',
  },

  // Metrics row under hero
  heroMetrics: [
    { label: 'Search → Answer', value: '15 min → 30 sec', delta: '-97%' },
    { label: 'Doc Discovery', value: '3×', delta: 'first-result correct' },
    { label: 'Onboarding Ramp', value: '-30%', delta: 'time-to-independence' },
  ],

  executiveSnapshot: {
    headline: '97% faster search-to-answer, 3× discovery rate',
    keyOutcomes: [
      '15 min → 30 sec search time',
      '3× document discovery',
      '180+ active pilot users',
      '4 systems integrated',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // EXECUTIVE SUMMARY
  // ─────────────────────────────────────────────────────────────────────────────
  executiveSummary: {
    client: 'Global enterprise knowledge & research organization',
    context: 'Teams depended on SharePoint, wikis, email, and legacy portals for critical process knowledge, but there was no single, trusted way to ask a question and get the right answer.',
    primaryConstraint: 'High search friction and low trust in "what is current" made onboarding slow and cross-team collaboration brittle.',
    primaryProblem: 'Leaders could not scale consistent execution because the knowledge surface was fragmented and opaque.',
    solutionPattern: 'A governed retrieval-augmented knowledge engine (CoCo) that sat on top of existing systems, exposed a conversational assistant, and enforced source-of-truth constraints.',
    scope: 'SharePoint, Confluence/wikis, file shares, curated knowledge bases, onboarding playbooks, SOP library, and team spaces.',
    engagementRole: 'Forward-Deployed Engineer partnering with Knowledge Management, IT, and pilot business units.',
    impact: {
      cycleTime: 'Search-to-answer time reduced from ~15 minutes to ~30 seconds.',
      throughput: '3× increase in successful first-result document discovery.',
      cost: '1,200+ hours/month time savings across pilot teams.',
      risk: 'Zero unauthorized content exposure; 95%+ citation coverage maintained.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASE NARRATIVE META
  // ─────────────────────────────────────────────────────────────────────────────
  phasesMeta: [
    {
      key: 'diagnose',
      title: 'Diagnose',
      challenge: 'We did not know whether the knowledge problem was content volume, findability, trust, or all three.',
      outcome: 'Diagnostics showed that search friction and version confusion were the binding constraints, not lack of content.',
    },
    {
      key: 'architect',
      title: 'Architect',
      challenge: 'We needed an AI layer that could unify multiple systems without becoming yet another system of record.',
      outcome: 'We designed CoCo as a governed retrieval layer: documents stayed in their sources, the assistant handled understanding and retrieval.',
    },
    {
      key: 'engineer',
      title: 'Engineer',
      challenge: 'We had to prove reliability, latency, and citation accuracy under real usage patterns.',
      outcome: 'p95 latency under 500ms, 95%+ citation coverage, and stable performance at 3,500+ daily queries.',
    },
    {
      key: 'enable',
      title: 'Enable',
      challenge: 'Without adoption by real teams, CoCo would become another unused internal tool.',
      outcome: 'Embedded CoCo in Teams and intranet; 180+ active users, 4.4/5 satisfaction in pilot.',
    },
    {
      key: 'impact',
      title: 'Impact',
      challenge: 'We needed to show durable ROI to justify expansion beyond pilot.',
      outcome: '1,200+ hours/month saved, 2.7× playbook reuse, expansion approved for 4 additional functions.',
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // PATTERN GENERALIZATION
  // ─────────────────────────────────────────────────────────────────────────────
  patternGeneralization: {
    bestFitEnvironments: 'Enterprises where critical process knowledge is scattered across wikis, SharePoint, and legacy portals, and where execution quality depends on finding the right document fast.',
    corePrimitives: 'Governed RAG, clear systems of record, conversational assistant surfaces, evaluation harness, and usage telemetry tied to business workflows.',
    whatYouNeedReady: 'You know which systems are your true sources of record. You can identify 50–100 "golden questions" that matter. You have at least one pilot team willing to co-design.',
  },

  phases: {
    diagnose: {
      id: 'diagnose',
      title: 'Diagnose',
      summaryTitle: 'Map the knowledge surface and find the real friction.',
      summaryBody: 'Interviews and log analysis showed that the problem was not a lack of content but an inability to find and trust it. Most answers required hopping across three or more systems and asking a human for confirmation.',
      duration: '3 weeks',
      description: 'Discovery revealed that employees spent 15+ minutes per question, touching 3-5 systems, with only 30% confidence in finding the latest version.',
      points: [
        'Held discovery sessions with HR, Operations, Engineering, and GTM teams',
        'Traced common questions back to their content origins',
        'Mapped 12+ major knowledge repositories and identified 4 as systems of record',
        'Quantified search-to-answer time and confidence metrics',
      ],
      deliverables: ['Current-state knowledge map', 'Search-journey diagnostics', 'Opportunity map for high-value question flows'],
      metrics: [
        { value: '15', numericValue: 15, suffix: ' min', label: 'Avg Search Time' },
        { value: '3-5', label: 'Systems/Answer' },
        { value: '30%', numericValue: 30, suffix: '%', label: 'Confidence Rate' },
      ],
    } as PhaseSection,

    architect: {
      id: 'architect',
      title: 'Architect',
      summaryTitle: 'Design a governed RAG layer over existing systems of record.',
      summaryBody: 'We designed CoCo as a thin, governed retrieval layer: documents stayed in SharePoint and wikis, while the assistant handled understanding the question, retrieving the right passages, and returning citation-backed answers.',
      duration: '2 weeks',
      description: 'Designed cross-cloud architecture integrating SharePoint, Confluence, file shares, and curated knowledge bases with semantic search and auto-labeling.',
      points: [
        'Defined canonical "source of truth" for each knowledge domain',
        'Modeled document lifecycles so CoCo would only surface current, approved versions',
        'Chose a RAG architecture that could evolve as models and embeddings improved',
        'Built ontology layer for auto-labeling and semantic routing',
      ],
      deliverables: ['System context diagram for CoCo', 'Source-of-truth registry by domain', 'Guardrail and access-control design'],
      tools: [
        { label: 'Embeddings', value: 'OpenAI text-embedding-3' },
        { label: 'Vector DB', value: 'Pinecone' },
        { label: 'Sources', value: 'SharePoint, Confluence, S3' },
      ],
    } as PhaseSection,

    engineer: {
      id: 'engineer',
      title: 'Engineer',
      summaryTitle: 'Build the retrieval engine and prove reliability under load.',
      summaryBody: 'We implemented ingestion, embeddings, hybrid search, and answer generation with strict citation requirements, then tuned it against real questions from pilot teams until relevance and latency met our SLOs.',
      duration: '5 weeks',
      description: 'Built production RAG pipeline handling 3,500+ daily queries with p95 latency under 500ms and 95%+ citation coverage.',
      points: [
        'Ingested and chunked documents from SharePoint, wikis, and curated knowledge bases',
        'Implemented hybrid search (semantic + keyword) with domain-aware filters',
        'Added evaluation harness for "golden questions" to track precision, recall, and coverage',
        'Built auto-labeling pipeline for new content classification',
      ],
      deliverables: ['CoCo retrieval API', 'Indexing and refresh pipeline', 'Evaluation dashboard for answer quality', 'Auto-labeling service'],
      metrics: [
        { value: '480', numericValue: 480, suffix: 'ms', label: 'p95 Latency' },
        { value: '99.4%', numericValue: 99.4, suffix: '%', label: 'Uptime' },
        { value: '3,500+', label: 'Daily Queries' },
      ],
    } as PhaseSection,

    enable: {
      id: 'enable',
      title: 'Enable',
      summaryTitle: 'Make CoCo the default way to ask questions.',
      summaryBody: 'We embedded CoCo into existing tools—Teams, the intranet home page, and onboarding checklists—then trained champions in each function to own usage norms and feedback.',
      duration: '4 weeks',
      description: 'Trained 180+ pilot users, established champion network, achieved 4.4/5 satisfaction score.',
      points: [
        'Ran live training sessions focused on real questions, not features',
        'Created lightweight "How to ask CoCo" guides for each function',
        'Established feedback loops with champions to refine prompts and content coverage',
        'Embedded in Teams, intranet, and onboarding flows',
      ],
      deliverables: ['Training program & materials', 'Champion enablement kit', 'Usage and satisfaction reporting'],
      metrics: [
        { value: '180+', numericValue: 180, label: 'Active Users' },
        { value: '4.4/5', label: 'Satisfaction Score' },
        { value: '92%', numericValue: 92, suffix: '%', label: 'Training Completion' },
      ],
    } as PhaseSection,

    impact: {
      id: 'impact',
      title: 'Impact',
      summaryTitle: 'Prove durable value and chart the expansion path.',
      summaryBody: 'Time-savings, higher reuse of best-practice playbooks, and smoother onboarding created a defendable ROI story for expanding CoCo into additional functions.',
      duration: 'Ongoing',
      description: '1,200+ hours/month saved, 2.7× playbook reuse increase, expansion approved for 7 total functions.',
      points: [
        'Measured aggregate time-savings from reduced search and fewer "who owns this?" loops',
        'Tracked reuse of playbooks and SOPs as a proxy for knowledge leverage',
        'Defined staged rollout plan for additional business units',
        'Built quarterly impact review framework',
      ],
      deliverables: ['ROI and time-savings analysis', 'Expansion roadmap', 'Quarterly impact review pack'],
      metrics: [
        { value: '1,200+', label: 'Hours Saved/Month' },
        { value: '2.7×', label: 'Playbook Reuse' },
        { value: '3→7', label: 'Functions Live' },
      ],
    } as PhaseSection,
  },

  challenge: {
    title: 'Challenge',
    description: 'Fragmented knowledge surface causing execution friction across the organization.',
    points: [
      'Knowledge scattered across 12+ repositories',
      '15+ minute average search-to-answer time',
      'No single source of truth for SOPs and playbooks',
      'New hires took 30% longer to become productive',
    ],
  },

  approach: {
    title: 'Approach',
    description: 'Embedded engineering with governed RAG architecture.',
    points: [
      'Discovery sessions across 4 major business functions',
      'Mapped knowledge flows and identified systems of record',
      'Designed retrieval layer that respects existing ownership',
      'Iterative delivery with champion-led feedback loops',
    ],
  },

  solution: {
    title: 'Solution',
    description: 'CoCo: AI-powered knowledge assistant with semantic search and auto-labeling.',
    points: [
      'RAG pipeline over 4 integrated knowledge sources',
      'Hybrid search with ontology-based filtering',
      'Citation-backed answers with source links',
      'Auto-labeling for new content classification',
    ],
    tools: [
      { label: 'Embeddings', value: 'OpenAI text-embedding-3' },
      { label: 'Vector DB', value: 'Pinecone' },
      { label: 'Sources', value: 'SharePoint, Confluence, S3' },
      { label: 'Surface', value: 'Teams Bot, Intranet Widget' },
    ],
  },

  results: {
    title: 'Outcomes',
    metrics: [
      { value: '97%', numericValue: 97, suffix: '%', label: 'Search Time Reduction' },
      { value: '3×', label: 'Doc Discovery Rate' },
      { value: '1,200+', label: 'Hours Saved/Month' },
      { value: '180+', label: 'Active Users' },
    ],
  },

  testimonial: {
    quote: 'CoCo changed how we onboard and operate. What used to take 15 minutes of searching now takes 30 seconds. The team finally trusts that they\'re looking at the right version of the document.',
    author: 'Director of Knowledge Management',
    role: 'Head of Knowledge Operations',
    company: 'Enterprise Client',
  },

  galleryImages: [
    '/assets/img/case-studies/colab/gallery-1.jpg',
    '/assets/img/case-studies/colab/gallery-2.jpg',
    '/assets/img/case-studies/colab/gallery-3.jpg',
  ],

  nextCaseStudy: {
    brand: 'Pfizer',
    title: 'AI Content Engine',
    description: 'MLR-compliant content acceleration',
    href: '/case-study/pfizer',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHART DATA
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// GANTT CHART — 14-week CoCo implementation timeline
// ─────────────────────────────────────────────────────────────────────────────
const gantt = [
  { id: 1, task: "Knowledge Landscape Discovery", start: 0, duration: 2, category: "Discovery", progress: 100 },
  { id: 2, task: "Search Journey Analysis", start: 1, duration: 2, category: "Discovery", progress: 100 },
  { id: 3, task: "Source-of-Truth Mapping", start: 2, duration: 1, category: "Discovery", progress: 100 },
  { id: 4, task: "RAG Architecture Design", start: 3, duration: 2, category: "Architecture", progress: 100 },
  { id: 5, task: "Ontology & Auto-Label Design", start: 4, duration: 2, category: "Architecture", progress: 100 },
  { id: 6, task: "Integration Planning", start: 4, duration: 1, category: "Architecture", progress: 100 },
  { id: 7, task: "Ingestion Pipeline Build", start: 5, duration: 3, category: "Engineering", progress: 100 },
  { id: 8, task: "Embedding & Indexing Service", start: 6, duration: 3, category: "Engineering", progress: 100 },
  { id: 9, task: "Hybrid Search Implementation", start: 7, duration: 3, category: "Engineering", progress: 100 },
  { id: 10, task: "Citation & Answer Generation", start: 8, duration: 2, category: "Engineering", progress: 100 },
  { id: 11, task: "Teams Bot & Intranet Widget", start: 9, duration: 2, category: "Enablement", progress: 100 },
  { id: 12, task: "Champion Training Program", start: 10, duration: 3, category: "Enablement", progress: 100 },
  { id: 13, task: "Pilot Rollout (3 Functions)", start: 11, duration: 2, category: "Enablement", progress: 100 },
  { id: 14, task: "Impact Measurement & Expansion", start: 12, duration: 2, category: "Enablement", progress: 100 },
];

// ─────────────────────────────────────────────────────────────────────────────
// FUNNEL CHART — Knowledge Discovery Pipeline (Diagnose phase)
// ─────────────────────────────────────────────────────────────────────────────
const funnel = [
  { stage: 'Questions Asked (daily)', value: 850, color: chartColors.teal },
  { stage: 'Search Initiated', value: 720, color: chartColors.gray },
  { stage: 'Results Found', value: 540, color: chartColors.orange },
  { stage: 'Result Clicked', value: 380, color: chartColors.indigo },
  { stage: 'Correct First Result', value: 255, color: chartColors.purple },
  { stage: 'Question Resolved', value: 255, color: chartColors.green },
];

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM CONTEXT (C4) — CoCo Architecture (Architect phase)
// ─────────────────────────────────────────────────────────────────────────────
const systemContext: SystemContextData = {
  system: {
    name: 'CoCo Knowledge Engine',
    description: 'AI-powered knowledge assistant with RAG retrieval over enterprise knowledge sources',
    type: 'Software System',
  },
  users: [
    {
      id: 'employee',
      name: 'Employee',
      icon: '/assets/SVG/User Profile 1.svg',
      description: 'Asks questions and searches for documents',
      interactions: ['Ask questions', 'Search documents', 'Get citations'],
    },
    {
      id: 'new-hire',
      name: 'New Hire',
      icon: '/assets/SVG/Open Book 1.svg',
      description: 'Onboarding and learning company processes',
      interactions: ['Onboarding guides', 'SOP discovery', 'Policy questions'],
    },
    {
      id: 'knowledge-owner',
      name: 'Knowledge Owner',
      icon: '/assets/SVG/Edit 1.svg',
      description: 'Creates and maintains knowledge content',
      interactions: ['Publish content', 'Review analytics', 'Update sources'],
    },
    {
      id: 'admin',
      name: 'Platform Admin',
      icon: '/assets/SVG/Settings 1.svg',
      description: 'Manages system configuration and access',
      interactions: ['Source management', 'User permissions', 'Monitor usage'],
    },
  ],
  externalSystems: [
    {
      id: 'openai',
      name: 'OpenAI API',
      type: 'AI Service',
      icon: '/assets/SVG/Light Bulb.svg',
      description: 'Embeddings and generation',
      protocol: 'REST API',
      direction: 'outbound' as const,
      dataFlow: ['Embeddings', 'Completions', 'Prompts'],
    },
    {
      id: 'sharepoint',
      name: 'SharePoint',
      type: 'Document Store',
      icon: '/assets/SVG/Folder.svg',
      description: 'Enterprise document management',
      protocol: 'Graph API',
      direction: 'inbound' as const,
      dataFlow: ['Documents', 'Policies', 'Templates'],
    },
    {
      id: 'confluence',
      name: 'Confluence',
      type: 'Wiki Platform',
      icon: '/assets/SVG/Notebook.svg',
      description: 'Team wikis and knowledge bases',
      protocol: 'REST API',
      direction: 'inbound' as const,
      dataFlow: ['Wiki pages', 'SOPs', 'Runbooks'],
    },
    {
      id: 'pinecone',
      name: 'Pinecone',
      type: 'Vector Database',
      icon: '/assets/SVG/Folder.svg',
      description: 'Vector storage and search',
      protocol: 'REST API',
      direction: 'bidirectional' as const,
      dataFlow: ['Embeddings', 'Search queries', 'Results'],
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      type: 'Chat Surface',
      icon: '/assets/SVG/Chat Message.svg',
      description: 'Conversational interface',
      protocol: 'Bot Framework',
      direction: 'bidirectional' as const,
      dataFlow: ['Questions', 'Answers', 'Citations'],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE HEALTH DASHBOARD — Engineer phase
// ─────────────────────────────────────────────────────────────────────────────
const serviceHealth = {
  services: [
    { name: 'CoCo API', status: 'healthy' as const, uptime: 99.42, latency: { p50: 185, p95: 480, p99: 720 }, errorRate: 0.58, throughput: 3500, lastIncident: '18d ago' },
    { name: 'Embedding Service', status: 'healthy' as const, uptime: 99.68, latency: { p50: 95, p95: 220, p99: 380 }, errorRate: 0.32, throughput: 4200, lastIncident: '25d ago' },
    { name: 'Vector Search', status: 'healthy' as const, uptime: 99.85, latency: { p50: 45, p95: 120, p99: 210 }, errorRate: 0.15, throughput: 3500, lastIncident: '42d ago' },
    { name: 'SharePoint Sync', status: 'degraded' as const, uptime: 99.21, latency: { p50: 320, p95: 680, p99: 1100 }, errorRate: 0.79, throughput: 8200, lastIncident: '4d ago' },
    { name: 'Confluence Sync', status: 'healthy' as const, uptime: 99.54, latency: { p50: 280, p95: 520, p99: 850 }, errorRate: 0.46, throughput: 5400, lastIncident: '12d ago' },
  ],
  latencyHistory: [
    { hour: '00:00', p50: 165, p95: 420, p99: 680 },
    { hour: '01:00', p50: 145, p95: 380, p99: 620 },
    { hour: '02:00', p50: 135, p95: 350, p99: 580 },
    { hour: '03:00', p50: 125, p95: 320, p99: 540 },
    { hour: '04:00', p50: 130, p95: 335, p99: 560 },
    { hour: '05:00', p50: 150, p95: 390, p99: 640 },
    { hour: '06:00', p50: 185, p95: 480, p99: 780 },
    { hour: '07:00', p50: 245, p95: 620, p99: 980 },
    { hour: '08:00', p50: 285, p95: 720, p99: 1120 },
    { hour: '09:00', p50: 310, p95: 780, p99: 1220 },
    { hour: '10:00', p50: 295, p95: 740, p99: 1160 },
    { hour: '11:00', p50: 275, p95: 690, p99: 1080 },
    { hour: '12:00', p50: 320, p95: 810, p99: 1280 },
    { hour: '13:00', p50: 305, p95: 770, p99: 1210 },
    { hour: '14:00', p50: 290, p95: 730, p99: 1145 },
    { hour: '15:00', p50: 280, p95: 705, p99: 1105 },
    { hour: '16:00', p50: 295, p95: 745, p99: 1170 },
    { hour: '17:00', p50: 310, p95: 785, p99: 1235 },
    { hour: '18:00', p50: 260, p95: 655, p99: 1030 },
    { hour: '19:00', p50: 220, p95: 555, p99: 875 },
    { hour: '20:00', p50: 195, p95: 495, p99: 780 },
    { hour: '21:00', p50: 180, p95: 460, p99: 725 },
    { hour: '22:00', p50: 172, p95: 440, p99: 695 },
    { hour: '23:00', p50: 168, p95: 430, p99: 680 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOMER JOURNEY MAP — Enable phase (Knowledge Seeker Journey)
// ─────────────────────────────────────────────────────────────────────────────
const journeyMap: JourneyMapData = {
  persona: { name: 'Knowledge Seeker', role: 'Operations Manager', company: 'Enterprise Client', avatar: '/assets/SVG/User Profile 1.svg' },
  goal: 'Find the right document or answer quickly without hopping between systems',
  stages: [
    {
      id: 'question', name: 'Question Arises', icon: '/assets/SVG/Comment 1.svg', color: chartColors.teal, duration: 'Instant',
      touchpoints: [{ channel: 'Teams', type: 'owned' as const }, { channel: 'Email', type: 'owned' as const }],
      actions: ['Realizes need for specific information', 'Considers where to look', 'Thinks about who might know'],
      thoughts: ['"Where is that SOP again?"', '"Who owns this process?"'],
      emotions: { score: 2, label: 'Frustrated' },
      painPoints: ['Don\'t know which system to check first'],
      opportunities: ['Single entry point for all questions'],
    },
    {
      id: 'ask', name: 'Ask CoCo', icon: '/assets/SVG/Chat Message.svg', color: chartColors.orange, duration: '< 30 sec',
      touchpoints: [{ channel: 'Teams Bot', type: 'owned' as const }, { channel: 'Intranet Widget', type: 'owned' as const }],
      actions: ['Opens CoCo in Teams or intranet', 'Types natural language question', 'Gets instant response with citations'],
      thoughts: ['"This is so much faster"', '"I can see exactly where this came from"'],
      emotions: { score: 4, label: 'Relieved' },
      painPoints: ['Learning to phrase questions effectively'],
      opportunities: ['Suggested questions based on role'],
    },
    {
      id: 'verify', name: 'Verify Source', icon: '/assets/SVG/Checkmark Square.svg', color: chartColors.indigo, duration: '1-2 min',
      touchpoints: [{ channel: 'CoCo Citations', type: 'owned' as const }, { channel: 'Source Document', type: 'owned' as const }],
      actions: ['Clicks citation link', 'Verifies document is current', 'Confirms answer matches source'],
      thoughts: ['"Good, this is the latest version"', '"I trust this because I can see the source"'],
      emotions: { score: 4, label: 'Confident' },
      painPoints: [],
      opportunities: ['Version indicators in citations'],
    },
    {
      id: 'resolve', name: 'Question Resolved', icon: '/assets/SVG/Trophy.svg', color: chartColors.green, duration: 'Complete',
      touchpoints: [{ channel: 'Task Complete', type: 'owned' as const }],
      actions: ['Applies information to task', 'Optionally shares with teammate', 'Moves on to next work item'],
      thoughts: ['"That used to take 15 minutes"', '"I should tell my team about CoCo"'],
      emotions: { score: 5, label: 'Delighted' },
      painPoints: [],
      opportunities: ['Feedback mechanism', 'Share with team feature'],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// WATERFALL CHART — Impact phase (Time savings breakdown)
// ─────────────────────────────────────────────────────────────────────────────
const waterfall = [
  { label: 'Baseline Search Time (hrs/mo)', value: 2.4, type: 'total' as const },
  { label: 'Eliminated System Hopping', value: -0.85, type: 'decrease' as const },
  { label: 'Faster First-Result Discovery', value: -0.62, type: 'decrease' as const },
  { label: 'Reduced "Who Knows This?"', value: -0.38, type: 'decrease' as const },
  { label: 'Self-Service Onboarding', value: -0.28, type: 'decrease' as const },
  { label: 'Playbook Reuse Gains', value: -0.15, type: 'decrease' as const },
  { label: 'Net Time/Employee (hrs/mo)', value: 0.12, type: 'total' as const },
];

// ─────────────────────────────────────────────────────────────────────────────
// CALENDAR HEATMAP — Query volume patterns (Diagnose phase)
// ─────────────────────────────────────────────────────────────────────────────
const calendarHeatmap = {
  year: 2024,
  title: 'Knowledge Query Volume',
  metric: 'Questions Asked',
  data: Array.from({ length: 365 }, (_, i) => {
    const date = new Date(2024, 0, i + 1);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const monthMultiplier = [0.8, 0.9, 1.1, 1.0, 0.95, 0.7, 0.6, 0.75, 1.2, 1.3, 1.15, 0.85][date.getMonth()];
    const baseValue = isWeekend ? 5 : Math.floor(Math.random() * 40 + 25);
    return { date: date.toISOString().split('T')[0], value: Math.floor(baseValue * monthMultiplier) };
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// RACI MATRIX — Knowledge ownership (Diagnose phase)
// ─────────────────────────────────────────────────────────────────────────────
const raciMatrix = {
  project: 'Knowledge Management Workflow',
  lastUpdated: 'Nov 2024',
  workstreams: [
    { id: 'ws1', name: 'Content Creation', category: 'Creation' },
    { id: 'ws2', name: 'Knowledge Curation', category: 'Creation' },
    { id: 'ws3', name: 'Source Publishing', category: 'Publishing' },
    { id: 'ws4', name: 'Auto-Labeling Review', category: 'Publishing' },
    { id: 'ws5', name: 'Search Optimization', category: 'Operations' },
    { id: 'ws6', name: 'Quality Monitoring', category: 'Operations' },
    { id: 'ws7', name: 'User Training', category: 'Enablement' },
    { id: 'ws8', name: 'Feedback Triage', category: 'Enablement' },
    { id: 'ws9', name: 'Expansion Planning', category: 'Strategy' },
  ],
  stakeholders: [
    { id: 'p1', name: 'Knowledge Owner', role: 'Content SME', team: 'Business', initials: 'KO' },
    { id: 'p2', name: 'KM Admin', role: 'Knowledge Mgmt', team: 'KM', initials: 'KA' },
    { id: 'p3', name: 'Platform Team', role: 'Engineering', team: 'IT', initials: 'PT' },
    { id: 'p4', name: 'Champion', role: 'Power User', team: 'Business', initials: 'CH' },
    { id: 'p5', name: 'CoCo System', role: 'Automation', team: 'Tech', initials: 'CC' },
  ],
  assignments: {
    'ws1-p1': 'R', 'ws1-p2': 'A', 'ws1-p3': 'C',
    'ws2-p1': 'R', 'ws2-p2': 'A', 'ws2-p5': 'C',
    'ws3-p1': 'R', 'ws3-p2': 'A', 'ws3-p5': 'R',
    'ws4-p2': 'R', 'ws4-p3': 'C', 'ws4-p5': 'R',
    'ws5-p3': 'R', 'ws5-p2': 'A', 'ws5-p5': 'R',
    'ws6-p2': 'R', 'ws6-p3': 'C', 'ws6-p5': 'R',
    'ws7-p2': 'A', 'ws7-p4': 'R', 'ws7-p3': 'C',
    'ws8-p2': 'A', 'ws8-p4': 'R', 'ws8-p3': 'I',
    'ws9-p2': 'R', 'ws9-p3': 'C', 'ws9-p1': 'I',
  } as Record<string, string>,
};

// ─────────────────────────────────────────────────────────────────────────────
// RAG PIPELINE — CoCo Architecture (Architect phase)
// ─────────────────────────────────────────────────────────────────────────────
const ragPipeline = {
  sections: [
    { id: 'ingestion', name: 'Multi-Source Ingestion', color: chartColors.navy, components: [
      { id: 'docs', name: 'Knowledge Sources', icon: '📄', desc: 'SharePoint, Confluence, S3' },
      { id: 'loader', name: 'Unified Loader', icon: '⟳', desc: 'Graph API, REST, S3 SDK' },
      { id: 'chunker', name: 'Semantic Chunker', icon: '▤', desc: 'Preserves context' },
    ]},
    { id: 'embedding', name: 'Embedding & Indexing', color: chartColors.purple, components: [
      { id: 'embedder', name: 'text-embedding-3', icon: '◈', desc: 'OpenAI API' },
      { id: 'vectordb', name: 'Pinecone', icon: '⬡', desc: 'Vector storage' },
      { id: 'metadata', name: 'Auto-Labels', icon: '☰', desc: 'Ontology tags' },
    ]},
    { id: 'retrieval', name: 'Hybrid Retrieval', color: chartColors.teal, components: [
      { id: 'query-embed', name: 'Query Understanding', icon: '◇', desc: 'Intent + context' },
      { id: 'search', name: 'Hybrid Search', icon: '⟐', desc: 'Semantic + BM25' },
      { id: 'rerank', name: 'Domain Reranker', icon: '↕', desc: 'Function-aware' },
    ]},
    { id: 'generation', name: 'Citation Generation', color: chartColors.orange, components: [
      { id: 'context', name: 'Context Assembly', icon: '⊞', desc: 'Top-k passages' },
      { id: 'llm', name: 'GPT-4 Turbo', icon: '★', desc: 'OpenAI API' },
      { id: 'response', name: 'Answer + Citations', icon: '◉', desc: 'Verified output' },
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
    { name: 'Relevance', value: 0.89, desc: 'Retrieved doc relevance' },
    { name: 'Faithfulness', value: 0.95, desc: 'Citations verified' },
    { name: 'Latency', value: '480ms', desc: 'p95 response time' },
    { name: 'Recall@5', value: 0.78, desc: 'Relevant in top 5' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MODEL CARD — CoCo Knowledge Engine (Architect phase)
// ─────────────────────────────────────────────────────────────────────────────
const modelCard = {
  model: { name: 'CoCo Knowledge Assistant', version: '1.0.0', type: 'RAG + GPT-4 Turbo', lastUpdated: 'Nov 2024', owner: 'Knowledge Platform Team', status: 'Production' },
  description: 'AI assistant for enterprise knowledge discovery with citation-backed answers. Uses RAG pipeline over SharePoint, Confluence, and curated knowledge bases.',
  intendedUse: {
    primary: ['Answer process questions', 'Find SOPs and playbooks', 'Onboarding support'],
    outOfScope: ['Creating new content', 'Approving documents', 'Accessing restricted systems'],
    users: ['All Employees', 'New Hires', 'Operations Teams'],
  },
  performance: {
    metrics: [
      { name: 'Retrieval Relevance', value: '89%', baseline: '—', threshold: '>85%' },
      { name: 'Citation Accuracy', value: '95%', baseline: '—', threshold: '>90%' },
      { name: 'User Satisfaction', value: '4.4/5', baseline: '2.8/5', threshold: '>4.0' },
      { name: 'p95 Latency', value: '480ms', baseline: '—', threshold: '<500ms' },
    ],
    evaluationData: 'Internal benchmark: 200 golden questions across 4 domains',
  },
  limitations: [
    'Cannot access systems outside indexed sources',
    'May not have latest content if sync delayed (>4hrs)',
    'Domain filters must be set correctly by user',
    'Cannot answer questions about restricted content',
  ],
  ethicalConsiderations: [
    'Access controlled by existing permissions model',
    'No training on internal data (API-only)',
    'Audit logging for all queries',
    'PII detection and redaction layer',
  ],
  training: {
    dataSize: '45,000 indexed documents',
    dateRange: 'Jan 2023 - Nov 2024',
    features: 0,
    targetVariable: 'Knowledge retrieval & synthesis',
    samplingStrategy: 'Full corpus indexing',
    trainTestSplit: 'N/A (RAG)',
  },
  fairness: {
    protectedAttributes: ['department', 'region', 'role_level'],
    metrics: [
      { group: 'Operations', fpr: 0.09, fnr: 0.12, samples: 2800 },
      { group: 'Engineering', fpr: 0.08, fnr: 0.11, samples: 2200 },
      { group: 'HR/Finance', fpr: 0.10, fnr: 0.14, samples: 1500 },
    ],
    findings: [
      { severity: 'info', text: 'Retrieval accuracy consistent across departments (±3%)' },
      { severity: 'low', text: 'Newer departments have less indexed content' },
    ],
  },
  features: [
    { name: 'semantic_similarity', importance: 0.38, category: 'retrieval' },
    { name: 'recency_score', importance: 0.18, category: 'retrieval' },
    { name: 'department_match', importance: 0.16, category: 'filter' },
    { name: 'content_type_match', importance: 0.14, category: 'filter' },
    { name: 'author_authority', importance: 0.08, category: 'quality' },
    { name: 'engagement_history', importance: 0.06, category: 'personalization' },
  ],
  deployment: {
    endpoint: 'coco-api.internal/v1/ask',
    latency: '480ms p95',
    throughput: '3,500 req/day',
    monitoring: 'Datadog APM + custom quality alerts',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// LATENCY PERCENTILES — Engineer phase (optimization journey)
// ─────────────────────────────────────────────────────────────────────────────
const latencyPercentiles = {
  service: 'coco-api',
  timeRange: 'Week 10 Production',
  currentTime: '14:30 UTC',
  sloTargets: { p50: 250, p95: 500, p99: 1000 },
  dataPoints: [
    { time: 'Baseline', p50: 520, p95: 980, p99: 1650, requests: 1800, errors: 52 },
    { time: 'Week 6', p50: 440, p95: 820, p99: 1380, requests: 2400, errors: 38 },
    { time: 'Week 7', p50: 380, p95: 710, p99: 1190, requests: 2800, errors: 28 },
    { time: 'Week 8', p50: 310, p95: 580, p99: 970, requests: 3100, errors: 22 },
    { time: 'Week 9', p50: 245, p95: 520, p99: 870, requests: 3300, errors: 16 },
    { time: 'Week 10', p50: 185, p95: 480, p99: 720, requests: 3500, errors: 12 },
  ],
  anomalies: [
    { start: 0, end: 1, severity: 'warning', cause: 'Pre-optimization baseline period' },
  ],
  currentStats: {
    p50: 185,
    p95: 480,
    p99: 720,
    requestRate: 3500,
    errorRate: 0.34,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// DATA QUALITY SCORECARD — Engineer phase
// ─────────────────────────────────────────────────────────────────────────────
const dataQuality: DataQualityData = {
  overall: 91,
  dimensions: [
    { name: 'Embedding Coverage', score: 94, target: 90, trend: 'up' as const },
    { name: 'Retrieval Relevance', score: 89, target: 85, trend: 'up' as const },
    { name: 'Content Freshness', score: 92, target: 90, trend: 'stable' as const },
    { name: 'Citation Accuracy', score: 95, target: 90, trend: 'up' as const },
    { name: 'Auto-Label Quality', score: 88, target: 85, trend: 'up' as const },
  ],
  issues: [
    { severity: 'info' as const, count: 28, description: 'New documents indexed this week' },
    { severity: 'warning' as const, count: 5, description: 'Stale sources detected (>30d)' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ORG HEALTH DASHBOARD — Enable phase (adoption metrics)
// ─────────────────────────────────────────────────────────────────────────────
const orgHealth = {
  asOfDate: 'Q4 2024',
  headcount: {
    total: 180,
    fullTime: 165,
    contractors: 15,
    openRoles: 0,
    trend: [
      { month: 'Jul', count: 0 },
      { month: 'Aug', count: 0 },
      { month: 'Sep', count: 45 },
      { month: 'Oct', count: 95 },
      { month: 'Nov', count: 145 },
      { month: 'Dec', count: 180 },
    ],
  },
  attrition: {
    monthly: 0,
    annual: 0,
    voluntary: 0,
    involuntary: 0,
    regrettable: 0,
    benchmark: 0,
  },
  engagement: {
    enps: 68,
    participation: 92,
    trend: [
      { month: 'Sep', score: 52 },
      { month: 'Oct', score: 58 },
      { month: 'Nov', score: 64 },
      { month: 'Dec', score: 68 },
    ],
  },
  dei: {
    gender: { male: 48, female: 49, nonBinary: 3 },
    leadership: { male: 45, female: 52, nonBinary: 3 },
    ethnicity: [
      { group: 'Pilot Team A', percent: 35 },
      { group: 'Pilot Team B', percent: 30 },
      { group: 'Pilot Team C', percent: 25 },
      { group: 'Champions', percent: 10 },
    ],
  },
  departments: [
    { name: 'Operations', headcount: 65, attrition: 0, enps: 72, openRoles: 0 },
    { name: 'Engineering', headcount: 45, attrition: 0, enps: 68, openRoles: 0 },
    { name: 'HR/People', headcount: 40, attrition: 0, enps: 65, openRoles: 0 },
    { name: 'Go-To-Market', headcount: 30, attrition: 0, enps: 64, openRoles: 0 },
  ],
  tenure: [
    { range: 'Week 1-2', count: 45, percent: 25 },
    { range: 'Week 3-4', count: 50, percent: 28 },
    { range: 'Month 2', count: 50, percent: 28 },
    { range: 'Month 3+', count: 35, percent: 19 },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// UNIT ECONOMICS — Impact phase (time savings ROI)
// ─────────────────────────────────────────────────────────────────────────────
const unitEconomics = {
  period: 'Q4 2024',
  currency: 'USD',
  summary: {
    ltv: 42000,
    cac: 8500,
    ltvCacRatio: 4.9,
    paybackMonths: 2.8,
    grossMargin: 72,
    netRevRetention: 145,
  },
  segments: [
    { name: 'Operations Teams', ltv: 58000, cac: 10000, ratio: 5.8, payback: 2.2, customers: 3, arr: 174000 },
    { name: 'Engineering Teams', ltv: 45000, cac: 9000, ratio: 5.0, payback: 2.6, customers: 2, arr: 90000 },
    { name: 'HR/People Teams', ltv: 32000, cac: 7500, ratio: 4.3, payback: 3.2, customers: 2, arr: 64000 },
    { name: 'GTM Teams', ltv: 28000, cac: 7000, ratio: 4.0, payback: 3.5, customers: 1, arr: 28000 },
  ],
  cohorts: [
    { month: 'Sep', cac: 12000, ltv: 32000, payback: 4.2 },
    { month: 'Oct', cac: 10500, ltv: 36000, payback: 3.5 },
    { month: 'Nov', cac: 9200, ltv: 40000, payback: 3.0 },
    { month: 'Dec', cac: 8500, ltv: 42000, payback: 2.8 },
  ],
  costBreakdown: {
    cac: [
      { category: 'OpenAI API', amount: 2800, percent: 33 },
      { category: 'Pinecone', amount: 1800, percent: 21 },
      { category: 'Infrastructure', amount: 1600, percent: 19 },
      { category: 'Integration', amount: 1400, percent: 16 },
      { category: 'Training', amount: 900, percent: 11 },
    ],
    ltv: [
      { category: 'Search Time Savings', amount: 22000, percent: 52 },
      { category: 'Onboarding Acceleration', amount: 12000, percent: 29 },
      { category: 'Knowledge Reuse', amount: 8000, percent: 19 },
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
    label: 'Search Time (min)',
    values: [15, 14.5, 14, 13, 11, 9, 7, 5, 3, 2, 1.5, 1, 0.8, 0.6, 0.5, 0.5],
    current: 0.5,
    change: -96.7,
  },
  {
    label: 'Discovery Rate (%)',
    values: [30, 32, 35, 40, 48, 55, 62, 68, 74, 78, 82, 85, 87, 88, 89, 90],
    current: 90,
    change: 200,
  },
  {
    label: 'Active Users',
    values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 75, 110, 140, 160, 175, 180],
    current: 180,
    change: 100,
  },
  {
    label: 'Satisfaction (1-5)',
    values: [2.8, 2.8, 2.8, 2.8, 3.2, 3.5, 3.8, 4.0, 4.1, 4.2, 4.3, 4.3, 4.4, 4.4, 4.4, 4.4],
    current: 4.4,
    change: 57.1,
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT — Master Colab chart bundle
// ═══════════════════════════════════════════════════════════════════════════════

export const colabCharts: CaseStudyCharts = {
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

export interface CaseStudyConfig {
  slug: string;
  study: CaseStudyData;
  charts: CaseStudyCharts;
}

export const colabConfig: CaseStudyConfig = {
  slug: 'colab',
  study: colabData,
  charts: colabCharts,
};
