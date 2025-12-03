// src/data/caseStudies/colabArchitectData.ts
// ═══════════════════════════════════════════════════════════════════════════════
// PFIZER COLAB DATASPHERE — Architect-only Case Study
// Single-phase story: Design the smallest compliant surface area that can scale
// ═══════════════════════════════════════════════════════════════════════════════

import type { CaseStudyData, CaseStudyCharts, SystemContextData } from '@/types/caseStudy';
import { chartColors } from '@/charts_D3/colors';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA — Architect Focus
// ═══════════════════════════════════════════════════════════════════════════════

export const colabArchitectData: CaseStudyData = {
  slug: 'colab',
  title: 'Pfizer – Architecture Colab Datasphere',
  subtitle: 'Governed Data Architecture',
  company: 'Pfizer',
  client: 'Pfizer Enterprise Architecture',
  role: 'Lead Solution Architect',
  year: '2024',
  services: ['System Architecture', 'Integration Design', 'Compliance Boundary', 'Data Governance'],
  heroImage: '/assets/img/case-studies/_showcase/Knowledge_Retreval.jpg',
  brandLogo: '/assets/img/logo/Pfizer_(2021).png',

  overview: 'Designed the Colab datasphere: a governed RAG architecture where Salesforce, CLM, and existing platforms remained system of record, and the AI layer stayed stateless, observable, and fully inside the compliance perimeter.',

  // ─────────────────────────────────────────────────────────────────────────────
  // HERO CONTEXT — Architecture-focused framing
  // ─────────────────────────────────────────────────────────────────────────────
  heroContext: {
    problemStatement: 'Once the bottleneck was clear, we needed an architecture that could sit inside Pfizer\'s compliance perimeter, speak to existing systems, and still be replaceable as models and vendors evolved.',
    solutionPattern: 'A Colab datasphere pattern where content lives in existing stores, and the AI engine only orchestrates retrieval and drafting—keeping CLM/CRM as system of record.',
  },

  heroMetrics: [
    { value: '5', label: 'External integrations', delta: 'unified' },
    { value: '>85%', label: 'Retrieval SLO target', delta: 'relevant@5' },
    { value: 'CLM/CRM', label: 'System of record', delta: 'preserved' },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // EXECUTIVE SNAPSHOT
  // ─────────────────────────────────────────────────────────────────────────────
  executiveSnapshot: {
    context: 'After diagnostics revealed search and retrieval as the bottleneck, we needed an architecture that could plug into existing systems without disrupting compliance controls.',
    insight: 'By keeping CLM/CRM as system of record and treating the AI layer as stateless and replaceable, we reduced compliance risk while preserving future model optionality.',
    outcome: 'Architecture signed off by Enterprise Architecture, Security, and MLR governance—ready for implementation.',
    heroImage: '/assets/img/case-studies/_showcase/Knowledge_Retreval.jpg',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASES — Architect only (single-phase case study)
  // ─────────────────────────────────────────────────────────────────────────────
  phases: {
    architect: {
      id: 'architect',
      title: 'Architect',
      duration: '2 weeks',
      description: 'Defined a Colab datasphere architecture connecting SharePoint, Veeva, Workfront, Teams, and Azure OpenAI into a single, governed content engine.',
      points: [
        'Drew a C4 system context for the AI content engine, clearly separating regulated systems of record from the AI orchestration layer',
        'Introduced a Colab datasphere pattern where content lives in existing stores, and the AI engine only orchestrates retrieval and drafting',
        'Defined integration contracts and data flow diagrams for SharePoint, Veeva Vault, Workfront, and Teams',
        'Captured non-functional requirements: latency targets, auditability, data residency, and change-control boundaries',
        'Ensured the AI layer remained stateless and replaceable as models evolve',
        'Got sign-off from Enterprise Architecture, Security, and MLR governance',
      ],
      deliverables: [
        'C4 system context diagram',
        'Integration contracts for 5 systems',
        'Data flow diagrams',
        'Non-functional requirements spec',
        'Compliance boundary documentation',
        'Architecture decision records (ADRs)',
      ],
      tools: [
        { label: 'Diagramming', value: 'Miro / Lucidchart' },
        { label: 'Documentation', value: 'Confluence' },
        { label: 'Cloud', value: 'Azure' },
        { label: 'AI Platform', value: 'Azure OpenAI' },
      ],
      metrics: [
        { value: '5', label: 'External integrations', suffix: '' },
        { value: '4', label: 'User types', suffix: '' },
        { value: '>85', label: 'Retrieval relevance target', suffix: '% @5' },
      ],
    },
    // Empty placeholders for other phases (single-phase case study)
    diagnose: {
      id: 'diagnose',
      title: 'Diagnose',
      duration: '',
      description: 'See Pfizer Diagnostic Search Baseline case study.',
      points: [],
    },
    engineer: {
      id: 'engineer',
      title: 'Engineer',
      duration: '',
      description: 'See RAG Co-Pilot Engineering case study.',
      points: [],
    },
    enable: {
      id: 'enable',
      title: 'Enable',
      duration: '',
      description: 'See CoCo Company Companion case study.',
      points: [],
    },
    impact: {
      id: 'impact',
      title: 'Impact',
      duration: '',
      description: 'Impact metrics roll up to the Pfizer E2E program.',
      points: [],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASES META — Short summaries for Architect only
  // ─────────────────────────────────────────────────────────────────────────────
  phasesMeta: [
    {
      key: 'architect',
      tagline: 'Design the smallest compliant surface area that can still scale.',
      challenge: 'We needed an AI system that could plug into existing CLM/CRM and survive MLR scrutiny without disrupting controls.',
      outcome: 'We designed a governed RAG content engine that kept Salesforce/CLM as system of record and made the AI layer stateless and replaceable.',
      summaryTitle: 'Design a governed RAG layer over existing systems of record.',
      summaryBody: 'We designed the Colab datasphere: documents stay in their sources (SharePoint, Veeva, Workfront), while the AI engine handles understanding, retrieval, and drafting without becoming a shadow system of record.',
      bullets: [
        'Drew C4 system context separating regulated systems from AI orchestration',
        'Defined integration contracts for SharePoint, Veeva, Workfront, Teams',
        'Captured latency targets, auditability, and change-control boundaries',
        'Got sign-off from Enterprise Architecture, Security, and MLR governance',
      ],
      deliverables: ['C4 system context', 'Integration contracts', 'Data flow diagrams', 'ADRs'],
      kpiFocus: 'Architecture sign-off',
      decisionOwner: 'Enterprise Architecture',
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // LEGACY FIELDS
  // ─────────────────────────────────────────────────────────────────────────────
  challenge: {
    title: 'Compliance + Integration',
    description: 'We needed an architecture that could sit inside Pfizer\'s compliance perimeter, speak to existing systems, and still be replaceable as models evolved.',
    points: [
      'Content, metadata, and claims lived in siloed systems',
      'No unified retrieval surface for AI consumption',
      'MLR boundaries had to be enforced at the integration layer',
      'Architecture had to survive vendor and model changes',
    ],
  },

  approach: {
    title: 'Colab Datasphere Pattern',
    description: 'We designed an architecture where existing systems remain the source of record, and the AI layer orchestrates without storing regulated content.',
    points: [
      'C4 system context diagram for clear boundaries',
      'Stateless AI layer that can be replaced',
      'Integration contracts for each system',
      'Non-functional requirements documented',
    ],
  },

  solution: {
    title: 'Architecture Approved',
    description: 'The Colab datasphere architecture was signed off by Enterprise Architecture, Security, and MLR governance.',
    points: [
      '5 systems integrated: SharePoint, Veeva, Workfront, Teams, Azure OpenAI',
      'CLM/CRM remains system of record',
      'AI layer is stateless and replaceable',
      'Compliance boundaries enforced at integration layer',
    ],
    tools: [
      { name: 'Azure', icon: '' },
      { name: 'Azure OpenAI', icon: '' },
      { name: 'SharePoint', icon: '' },
      { name: 'Veeva Vault', icon: '' },
    ],
  },

  results: {
    title: 'Architecture Outcomes',
    metrics: [
      { value: '5', label: 'Systems integrated', suffix: '' },
      { value: '4', label: 'User types supported', suffix: '' },
      { value: '>85%', label: 'Retrieval relevance target', suffix: '' },
      { value: 'Approved', label: 'Security sign-off', suffix: '' },
    ],
  },

  testimonial: {
    quote: 'This is the first AI architecture proposal that actually respected our compliance boundaries. The datasphere pattern lets us move fast without creating risk.',
    author: 'Enterprise Architect',
    role: 'Pfizer IT',
    image: '',
  },

  nextCaseStudy: {
    brand: 'Pfizer',
    title: 'RAG Co-Pilot Engineering',
    href: '/case-study/pfizer-pipeline',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHARTS — Single primary chart (systemContext)
// ═══════════════════════════════════════════════════════════════════════════════

export const colabArchitectCharts: CaseStudyCharts = {
  // ─────────────────────────────────────────────────────────────────────────────
  // SYSTEM CONTEXT (C4) — Primary chart for Architect phase
  // ─────────────────────────────────────────────────────────────────────────────
  systemContext: {
    title: 'Colab Datasphere Architecture',
    subtitle: 'C4 System Context — AI layer orchestrates, systems of record preserved',
    system: {
      name: 'Colab Datasphere',
      description: 'Governed RAG architecture for AI-assisted content retrieval and drafting',
      technology: 'Azure OpenAI, Python, FastAPI, Vector DB',
    },
    users: [
      { name: 'Content Producers', count: 150, role: 'Create and submit content for MLR review' },
      { name: 'MLR Reviewers', count: 45, role: 'Review and approve content for compliance' },
      { name: 'Brand Teams', count: 30, role: 'Request and manage brand-specific content' },
      { name: 'Platform Admins', count: 5, role: 'Manage governance, access, and guardrails' },
    ],
    externalSystems: [
      { name: 'SharePoint', type: 'storage' as const, description: 'Document storage and collaboration', dataFlow: 'bidirectional' as const },
      { name: 'Veeva Vault', type: 'service' as const, description: 'MLR submission and tracking', dataFlow: 'bidirectional' as const },
      { name: 'Workfront', type: 'service' as const, description: 'Project and workflow management', dataFlow: 'bidirectional' as const },
      { name: 'Microsoft Teams', type: 'service' as const, description: 'Collaboration and assistant surface', dataFlow: 'bidirectional' as const },
      { name: 'Azure OpenAI', type: 'service' as const, description: 'LLM inference and embeddings', dataFlow: 'outbound' as const },
    ],
  } as SystemContextData,

  // ─────────────────────────────────────────────────────────────────────────────
  // SIMPLE GANTT — 2-week architecture timeline
  // ─────────────────────────────────────────────────────────────────────────────
  gantt: [
    { id: 1, task: 'System Context Diagram', start: 0, duration: 0.5, category: 'Architect', progress: 100 },
    { id: 2, task: 'Integration Contracts', start: 0.5, duration: 1, category: 'Architect', progress: 100 },
    { id: 3, task: 'Data Flow Diagrams', start: 1, duration: 0.5, category: 'Architect', progress: 100 },
    { id: 4, task: 'NFR Documentation', start: 1.25, duration: 0.5, category: 'Architect', progress: 100 },
    { id: 5, task: 'Security Review', start: 1.5, duration: 0.5, category: 'Architect', progress: 100 },
    { id: 6, task: 'Architecture Sign-off', start: 1.75, duration: 0.25, category: 'Architect', progress: 100 },
  ],
};
