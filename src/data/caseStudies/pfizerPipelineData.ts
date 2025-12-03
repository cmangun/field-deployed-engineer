// src/data/caseStudies/pfizerPipelineData.ts
// ═══════════════════════════════════════════════════════════════════════════════
// PFIZER RAG CO-PILOT ENGINEERING — Engineer-only Case Study
// Single-phase story: Make the co-pilot behave under real-world constraints
// ═══════════════════════════════════════════════════════════════════════════════

import type { CaseStudyData, CaseStudyCharts } from '@/types/caseStudy';
import { chartColors } from '@/charts_D3/colors';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA — Engineer Focus
// ═══════════════════════════════════════════════════════════════════════════════

export const pfizerPipelineData: CaseStudyData = {
  slug: 'pfizer-pipeline',
  title: 'Pfizer – RAG Co-Pilot Engineering',
  subtitle: 'Production Reliability Engineering',
  company: 'Pfizer',
  client: 'Pfizer Platform Engineering',
  role: 'Lead AI/ML Engineer',
  year: '2024',
  services: ['ML Engineering', 'SRE', 'Pipeline Architecture', 'Performance Optimization'],
  heroImage: '/assets/img/case-studies/_showcase/Technical_Program.jpg',
  brandLogo: '/assets/img/logo/Pfizer_(2021).png',

  overview: 'Turned the RAG architecture into a production co-pilot with 4,200+ daily queries, 280ms p95 latency, and 99.7% uptime, backed by SLO dashboards and incident routing.',

  // ─────────────────────────────────────────────────────────────────────────────
  // HERO CONTEXT — Engineering-focused framing
  // ─────────────────────────────────────────────────────────────────────────────
  heroContext: {
    problemStatement: 'With the Colab datasphere designed, the next step was to prove that the RAG co-pilot could handle real load, real reviewers, and real MLR risk—not just a demo environment.',
    solutionPattern: 'Production RAG co-pilot with clear SLOs, service health dashboards, and guardrails for MLR-sensitive workflows. Treated the AI engine like any other critical service.',
  },

  heroMetrics: [
    { value: '280ms', label: 'p95 latency', delta: 'from 850ms' },
    { value: '99.7%', label: 'Uptime', delta: 'SLO target' },
    { value: '4,200+', label: 'Daily queries', delta: 'production load' },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // EXECUTIVE SNAPSHOT
  // ─────────────────────────────────────────────────────────────────────────────
  executiveSnapshot: {
    context: 'The architecture was signed off, but we had to prove the RAG co-pilot could handle real load, real reviewers, and real MLR risk.',
    insight: 'Moving from demo to production required treating the AI engine like any other critical service—with SLOs, dashboards, and incident paths, not just "model quality".',
    outcome: 'Production RAG co-pilot handling 4,200+ daily queries at 280ms p95, with 99.7% uptime and zero MLR exceptions.',
    heroImage: '/assets/img/case-studies/_showcase/Technical_Program.jpg',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASES — Engineer only (single-phase case study)
  // ─────────────────────────────────────────────────────────────────────────────
  phases: {
    engineer: {
      id: 'engineer',
      title: 'Engineer',
      duration: '6 weeks',
      description: 'Built and hardened a production RAG co-pilot with clear SLOs, service health dashboards, and guardrails for MLR-sensitive workflows.',
      points: [
        'Implemented the RAG pipeline with hybrid search (semantic + keyword) and caching for hot paths',
        'Exposed a single AI Content API for content producers and integrations, with role-aware access controls',
        'Instrumented end-to-end service health: uptime, latency percentiles, and error rates across pipeline components',
        'Integrated MLR gateway checks and audit logging so every AI suggestion is traceable to sources and reviewers',
        'Reduced p95 latency from 850ms to 280ms through caching and query optimization',
        'Built incident routing and on-call playbooks for production issues',
      ],
      deliverables: [
        'RAG pipeline with hybrid search',
        'AI Content API',
        'Service health dashboard',
        'SLO definitions and alerts',
        'MLR gateway integration',
        'Incident playbooks',
      ],
      tools: [
        { label: 'ML Platform', value: 'Azure OpenAI' },
        { label: 'Vector DB', value: 'Azure Cognitive Search' },
        { label: 'Monitoring', value: 'Datadog' },
        { label: 'API', value: 'FastAPI / Python' },
      ],
      metrics: [
        { value: '280', label: 'p95 latency', suffix: 'ms' },
        { value: '99.7', label: 'Uptime', suffix: '%' },
        { value: '4,200', label: 'Daily queries', suffix: '+' },
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
    architect: {
      id: 'architect',
      title: 'Architect',
      duration: '',
      description: 'See Colab Datasphere Architecture case study.',
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
  // PHASES META — Short summaries for Engineer only
  // ─────────────────────────────────────────────────────────────────────────────
  phasesMeta: [
    {
      key: 'engineer',
      tagline: 'Make the co-pilot behave under real-world constraints.',
      challenge: 'We had to prove reliability and performance at production scale, not just in a demo environment.',
      outcome: 'Service health, model documentation, latency and data quality metrics showed stable production behaviour under real workloads.',
      summaryTitle: 'Build and harden a production RAG co-pilot.',
      summaryBody: 'We implemented the RAG pipeline with hybrid search, exposed a single API, and instrumented everything—treating the AI engine like any other critical service with SLOs, dashboards, and incident paths.',
      bullets: [
        'Implemented RAG pipeline with hybrid search and caching for hot paths',
        'Exposed AI Content API with role-aware access controls',
        'Instrumented service health: uptime, latency, error rates',
        'Integrated MLR gateway checks and audit logging',
      ],
      deliverables: ['RAG pipeline', 'AI Content API', 'Service health dashboard', 'Incident playbooks'],
      kpiFocus: 'p95 latency & uptime',
      decisionOwner: 'Platform Engineering',
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // LEGACY FIELDS
  // ─────────────────────────────────────────────────────────────────────────────
  challenge: {
    title: 'Production Readiness',
    description: 'The architecture was designed, but we had to prove the RAG co-pilot could handle real load and real MLR risk.',
    points: [
      '850ms p95 latency in demo environment',
      'No SLO definitions or dashboards',
      'No incident routing or on-call playbooks',
      'MLR audit trail not instrumented',
    ],
  },

  approach: {
    title: 'Production Engineering',
    description: 'We treated the AI engine like any other critical service—with SLOs, dashboards, and incident paths.',
    points: [
      'Hybrid search with caching for hot paths',
      'Single API with role-aware access controls',
      'End-to-end service health instrumentation',
      'MLR gateway integration with audit logging',
    ],
  },

  solution: {
    title: 'Production RAG Co-Pilot',
    description: 'The RAG co-pilot handles 4,200+ daily queries at 280ms p95 with 99.7% uptime.',
    points: [
      '280ms p95 latency (from 850ms)',
      '99.7% uptime with SLO alerts',
      '4,200+ daily queries handled',
      'Zero MLR exceptions in production',
    ],
    tools: [
      { name: 'Azure OpenAI', icon: '' },
      { name: 'Azure Cognitive Search', icon: '' },
      { name: 'Datadog', icon: '' },
      { name: 'FastAPI', icon: '' },
    ],
  },

  results: {
    title: 'Engineering Outcomes',
    metrics: [
      { value: '280ms', label: 'p95 latency', suffix: '' },
      { value: '99.7%', label: 'Uptime', suffix: '' },
      { value: '4,200+', label: 'Daily queries', suffix: '' },
      { value: '0', label: 'MLR exceptions', suffix: '' },
    ],
  },

  testimonial: {
    quote: 'This is the first AI system we\'ve deployed that behaves like a real production service. The SLO dashboards and incident routing give us confidence to scale.',
    author: 'Director, Platform Engineering',
    role: 'Pfizer IT',
    image: '',
  },

  nextCaseStudy: {
    brand: 'Pfizer',
    title: 'CoCo Company Companion',
    href: '/case-study/coco',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHARTS — Single primary chart (serviceHealth)
// ═══════════════════════════════════════════════════════════════════════════════

export const pfizerPipelineCharts: CaseStudyCharts = {
  // ─────────────────────────────────────────────────────────────────────────────
  // SERVICE HEALTH DASHBOARD — Primary chart for Engineer phase
  // ─────────────────────────────────────────────────────────────────────────────
  serviceHealth: {
    services: [
      { name: 'RAG API', status: 'healthy' as const, uptime: 99.7, latency: { p50: 145, p95: 280, p99: 420 }, errorRate: 0.3, throughput: 4200, lastIncident: '14d ago' },
      { name: 'Vector Search', status: 'healthy' as const, uptime: 99.9, latency: { p50: 85, p95: 165, p99: 280 }, errorRate: 0.1, throughput: 8400, lastIncident: '28d ago' },
      { name: 'Embedding Service', status: 'healthy' as const, uptime: 99.8, latency: { p50: 120, p95: 220, p99: 350 }, errorRate: 0.2, throughput: 4200, lastIncident: '21d ago' },
      { name: 'MLR Gateway', status: 'healthy' as const, uptime: 99.95, latency: { p50: 45, p95: 95, p99: 150 }, errorRate: 0.05, throughput: 980, lastIncident: '42d ago' },
      { name: 'Cache Layer', status: 'healthy' as const, uptime: 99.99, latency: { p50: 5, p95: 12, p99: 25 }, errorRate: 0.01, throughput: 12500, lastIncident: '90d ago' },
    ],
    latencyHistory: [
      { timestamp: 'Week 1', p50: 450, p95: 850, p99: 1200 },
      { timestamp: 'Week 2', p50: 380, p95: 720, p99: 980 },
      { timestamp: 'Week 3', p50: 280, p95: 520, p99: 750 },
      { timestamp: 'Week 4', p50: 195, p95: 380, p99: 580 },
      { timestamp: 'Week 5', p50: 160, p95: 310, p99: 480 },
      { timestamp: 'Week 6', p50: 145, p95: 280, p99: 420 },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SIMPLE GANTT — 6-week engineering timeline
  // ─────────────────────────────────────────────────────────────────────────────
  gantt: [
    { id: 1, task: 'RAG Pipeline Implementation', start: 0, duration: 2, category: 'Engineer', progress: 100 },
    { id: 2, task: 'API Development', start: 1, duration: 2, category: 'Engineer', progress: 100 },
    { id: 3, task: 'Service Health Instrumentation', start: 2, duration: 1.5, category: 'Engineer', progress: 100 },
    { id: 4, task: 'MLR Gateway Integration', start: 3, duration: 1.5, category: 'Engineer', progress: 100 },
    { id: 5, task: 'Performance Optimization', start: 4, duration: 1, category: 'Engineer', progress: 100 },
    { id: 6, task: 'SLO Definition & Alerts', start: 4.5, duration: 1, category: 'Engineer', progress: 100 },
    { id: 7, task: 'Incident Playbooks', start: 5, duration: 1, category: 'Engineer', progress: 100 },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // LATENCY PERCENTILES — Supporting chart for performance story
  // ─────────────────────────────────────────────────────────────────────────────
  latencyPercentiles: {
    service: 'RAG API',
    timeRange: '6 weeks',
    sloTargets: { p50: 200, p95: 350, p99: 500 },
    dataPoints: [
      { timestamp: 'Week 1', p50: 450, p95: 850, p99: 1200 },
      { timestamp: 'Week 2', p50: 380, p95: 720, p99: 980 },
      { timestamp: 'Week 3', p50: 280, p95: 520, p99: 750 },
      { timestamp: 'Week 4', p50: 195, p95: 380, p99: 580 },
      { timestamp: 'Week 5', p50: 160, p95: 310, p99: 480 },
      { timestamp: 'Week 6', p50: 145, p95: 280, p99: 420 },
    ],
  },
};
