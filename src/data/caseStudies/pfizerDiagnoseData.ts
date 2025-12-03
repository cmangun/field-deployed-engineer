// src/data/caseStudies/pfizerDiagnoseData.ts
// ═══════════════════════════════════════════════════════════════════════════════
// PFIZER DIAGNOSTIC SEARCH BASELINE — Diagnose-only Case Study
// Single-phase story: Find the real constraint before scaling any solution
// ═══════════════════════════════════════════════════════════════════════════════

import type { CaseStudyData, CaseStudyCharts } from '@/types/caseStudy';
import { chartColors } from '@/charts_D3/colors';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA — Diagnose Focus
// ═══════════════════════════════════════════════════════════════════════════════

export const pfizerDiagnoseData: CaseStudyData = {
  slug: 'pfizer',
  title: 'Pfizer – Diagnostic Search Baseline',
  subtitle: 'Constraint Mapping & Baseline',
  company: 'Pfizer',
  client: 'Pfizer Commercial Operations',
  role: 'Field-Deployed Engineer',
  year: '2024',
  services: ['Diagnostics', 'Workflow Mapping', 'Baseline Measurement', 'Stakeholder Research'],
  heroImage: '/assets/img/case-studies/_showcase/1Embedded_Pfizer.png',
  brandLogo: '/assets/img/logo/Pfizer_(2021).png',

  overview: 'Mapped the true bottleneck in Pfizer\'s MLR content pipeline—showing that search, retrieval, and revision loops, not demand or production capacity, were constraining AI experimentation.',

  // ─────────────────────────────────────────────────────────────────────────────
  // HERO CONTEXT — Diagnostic-focused framing
  // ─────────────────────────────────────────────────────────────────────────────
  heroContext: {
    problemStatement: 'Before investing in AI infrastructure, we needed proof of where the cycle actually broke: demand, MLR review, or production capability.',
    solutionPattern: 'Diagnostics showed the constraint lived in content retrieval and duplicated work—75% of delays clustered in Search & Retrieval.',
  },

  heroMetrics: [
    { value: '42 days', label: 'Avg review cycle (baseline)', delta: 'before intervention' },
    { value: '2,450+', label: 'Assets per quarter', delta: 'volume handled' },
    { value: '40%', label: 'Revision rate', delta: 'due to duplication' },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // EXECUTIVE SNAPSHOT
  // ─────────────────────────────────────────────────────────────────────────────
  executiveSnapshot: {
    context: 'Pfizer commercial teams were producing 2,450+ assets per quarter but 42-day review cycles made AI experimentation too slow and expensive.',
    insight: '75% of delays clustered in Search & Retrieval; 40% of assets required multiple revision loops due to content duplication or missing precedents.',
    outcome: 'Established a hard baseline for MLR cycle time, search delay, and revision loops so every later decision was grounded in evidence.',
    heroImage: '/assets/img/case-studies/_showcase/1Embedded_Pfizer.png',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASES — Diagnose only (single-phase case study)
  // ─────────────────────────────────────────────────────────────────────────────
  phases: {
    diagnose: {
      id: 'diagnose',
      title: 'Diagnose',
      duration: '2 weeks',
      description: 'Established a hard baseline for MLR cycle time, search delay, and revision loops so every later decision was grounded in evidence.',
      points: [
        'Ran stakeholder interviews across 3 brands to collect ground-truth pain points in MLR and production workflows',
        'Mapped end-to-end content flow from brief to field deployment, with timestamps on each stage',
        'Quantified search time and revision loops as the dominant contributors to cycle time',
        'Produced a baseline MLR performance profile to evaluate future AI and workflow changes against',
        'Identified that 75% of delays clustered in Search & Retrieval stage',
        'Documented that 40% of assets required multiple revision loops due to duplication',
      ],
      deliverables: [
        'MLR cycle time baseline report',
        'Content flow process map with timestamps',
        'Stakeholder interview synthesis',
        'Search & retrieval bottleneck analysis',
        'Baseline performance scorecard',
      ],
      tools: [
        { label: 'Process Mapping', value: 'Miro' },
        { label: 'Data Analysis', value: 'Python / Pandas' },
        { label: 'Interviews', value: 'Dovetail' },
        { label: 'Reporting', value: 'PowerPoint' },
      ],
      metrics: [
        { value: '42', label: 'Avg review cycle (baseline)', suffix: 'days' },
        { value: '2,450', label: 'Assets per quarter', suffix: '+' },
        { value: '40', label: 'Revision rate', suffix: '%' },
        { value: '25', label: 'Avg search time per asset', suffix: '+ min' },
      ],
    },
    // Empty placeholders for other phases (single-phase case study)
    architect: {
      id: 'architect',
      title: 'Architect',
      duration: '',
      description: 'See Colab Datasphere case study for architecture.',
      points: [],
    },
    engineer: {
      id: 'engineer',
      title: 'Engineer',
      duration: '',
      description: 'See RAG Co-Pilot case study for engineering.',
      points: [],
    },
    enable: {
      id: 'enable',
      title: 'Enable',
      duration: '',
      description: 'See CoCo Company Companion case study for enablement.',
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
  // PHASES META — Short summaries for Diagnose only
  // ─────────────────────────────────────────────────────────────────────────────
  phasesMeta: [
    {
      key: 'diagnose',
      tagline: 'Find the real constraint before scaling any solution.',
      challenge: 'We did not know whether AI initiatives were constrained by demand, MLR review, or production capacity.',
      outcome: 'Diagnostics showed that MLR cycle time and fragmented content workflows were the binding constraints.',
      summaryTitle: 'Establish the baseline before building anything.',
      summaryBody: 'Before investing in AI infrastructure, we mapped the true bottleneck: search, retrieval, and revision loops were constraining the pipeline, not demand or production capacity.',
      bullets: [
        'Ran stakeholder interviews across 3 brands for ground-truth pain points',
        'Mapped end-to-end content flow with timestamps on each stage',
        'Quantified search time and revision loops as dominant contributors',
        'Produced baseline MLR performance profile for future comparison',
      ],
      deliverables: ['Cycle time baseline', 'Process map', 'Bottleneck analysis', 'Performance scorecard'],
      kpiFocus: 'Review cycle time & revision rate',
      decisionOwner: 'Commercial Operations',
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // LEGACY FIELDS
  // ─────────────────────────────────────────────────────────────────────────────
  challenge: {
    title: 'Unknown Constraint',
    description: 'Pfizer was producing 2,450+ assets per quarter but didn\'t know where the real bottleneck was: demand, MLR review, or production capacity.',
    points: [
      '42-day average review cycles made AI experimentation too slow',
      'No baseline data to evaluate interventions against',
      'Multiple teams blamed different parts of the process',
      'Search and retrieval time was unmeasured',
    ],
  },

  approach: {
    title: 'Constraint Mapping',
    description: 'We ran a focused diagnostic sprint to establish ground truth before making any technology decisions.',
    points: [
      'Stakeholder interviews across 3 brands',
      'End-to-end process mapping with timestamps',
      'Quantitative analysis of search and revision patterns',
      'Baseline performance scorecard creation',
    ],
  },

  solution: {
    title: 'Baseline Established',
    description: 'Diagnostics revealed that 75% of delays clustered in Search & Retrieval, and 40% of assets required multiple revision loops.',
    points: [
      '42-day baseline cycle time documented',
      '25+ minute average search time per asset',
      '40% revision rate due to duplication',
      'Clear evidence for where to focus AI investment',
    ],
    tools: [
      { name: 'Miro', icon: '' },
      { name: 'Python', icon: '' },
      { name: 'Dovetail', icon: '' },
    ],
  },

  results: {
    title: 'Diagnostic Outcomes',
    metrics: [
      { value: '42 days', label: 'Baseline cycle time', suffix: '' },
      { value: '2,450+', label: 'Assets per quarter', suffix: '' },
      { value: '40%', label: 'Revision rate', suffix: '' },
      { value: '75%', label: 'Delays in Search & Retrieval', suffix: '' },
    ],
  },

  testimonial: {
    quote: 'For the first time, we had hard numbers on where the process actually broke. That baseline changed every conversation about AI investment.',
    author: 'Director, Commercial Operations',
    role: 'Pfizer',
    image: '',
  },

  nextCaseStudy: {
    brand: 'Pfizer',
    title: 'Architecture Colab Datasphere',
    href: '/case-study/colab',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHARTS — Single primary chart (funnel)
// ═══════════════════════════════════════════════════════════════════════════════

export const pfizerDiagnoseCharts: CaseStudyCharts = {
  // ─────────────────────────────────────────────────────────────────────────────
  // FUNNEL — Primary chart for Diagnose phase
  // Shows where volume drops off in the content pipeline
  // ─────────────────────────────────────────────────────────────────────────────
  funnel: [
    { stage: 'Assets Created', value: 2450, color: chartColors.charcoal },
    { stage: 'Search & Retrieval', value: 1470, color: chartColors.gray },
    { stage: 'Draft Complete', value: 1100, color: chartColors.charcoal },
    { stage: 'MLR Submitted', value: 980, color: chartColors.gray },
    { stage: 'First-Pass Approved', value: 590, color: chartColors.charcoal },
    { stage: 'Field Deployed', value: 520, color: chartColors.gray },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // SIMPLE GANTT — 2-week diagnostic timeline
  // ─────────────────────────────────────────────────────────────────────────────
  gantt: [
    { id: 1, task: 'Stakeholder Interviews', start: 0, duration: 1, category: 'Diagnose', progress: 100 },
    { id: 2, task: 'Process Mapping', start: 0.5, duration: 1, category: 'Diagnose', progress: 100 },
    { id: 3, task: 'Data Collection', start: 1, duration: 0.5, category: 'Diagnose', progress: 100 },
    { id: 4, task: 'Bottleneck Analysis', start: 1.25, duration: 0.5, category: 'Diagnose', progress: 100 },
    { id: 5, task: 'Baseline Report', start: 1.5, duration: 0.5, category: 'Diagnose', progress: 100 },
  ],
};
