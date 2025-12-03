// src/data/caseStudies/cocoData.ts
// ═══════════════════════════════════════════════════════════════════════════════
// COCO COMPANY COMPANION — Enable-Only Case Study
// Part of the Pfizer Quartet: Diagnose → Architect → Engineer → Enable
// This is the Enable story: How we landed the platform in the org
// ═══════════════════════════════════════════════════════════════════════════════

import type { CaseStudyData, CaseStudyCharts } from '@/types/caseStudy';
import { chartColors } from '@/charts_D3/colors';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA — Enable Focus Only
// ═══════════════════════════════════════════════════════════════════════════════

export const cocoData: CaseStudyData = {
  slug: 'coco',
  title: 'CoCo: The Company Companion for Global Medical Content',
  subtitle: 'Enablement & Organizational Adoption',
  company: 'Pfizer',
  client: 'Pfizer Global Medical Content',
  role: 'Field-Deployed Engineer / Enablement Lead',
  year: '2024',
  services: ['AI Assistant Enablement', 'Change Management', 'Training & Governance', 'Knowledge Management'],
  heroImage: '/assets/img/case-studies/_showcase/coco-hero.jpg',
  brandLogo: '/assets/img/logo/coco-logo.png',

  overview: 'Turned a governed RAG pipeline into a daily Company Companion for global medical content—onboarding 200+ producers and reviewers, achieving 94% training completion, and cutting average time-to-answer from 15 minutes to under 60 seconds.',

  // ─────────────────────────────────────────────────────────────────────────────
  // HERO CONTEXT — Adoption-focused framing
  // ─────────────────────────────────────────────────────────────────────────────
  heroContext: {
    problemStatement: 'Before CoCo, people hopped 3–5 systems and asked a human. Without adoption by MLR and field teams, the platform would become another unused AI experiment.',
    solutionPattern: 'We treated CoCo like a product, not a demo: embedded in Teams, backed by training and governance, and measured by behavior change instead of just model quality.',
  },

  heroMetrics: [
    { value: '200+', label: 'Users Onboarded', delta: 'global producers & reviewers' },
    { value: '94%', label: 'Training Completion', delta: 'within 6 weeks' },
    { value: '15 min → <60 sec', label: 'Time-to-Answer', delta: 'per question' },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // EXECUTIVE SNAPSHOT
  // ─────────────────────────────────────────────────────────────────────────────
  executiveSnapshot: {
    context: 'We already diagnosed the bottleneck and built the architecture + pipeline. CoCo is how we landed it in the org.',
    insight: 'Adoption engineering is as important as model engineering. The assistant needed to become part of the daily ritual, not just available.',
    outcome: 'CoCo became the default way to ask content questions, with 200+ active users, 94% training completion, and 4.3/5 satisfaction.',
    heroImage: '/assets/img/case-studies/_showcase/coco-hero.jpg',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASES — Enable only, others as pointers to quartet siblings
  // ─────────────────────────────────────────────────────────────────────────────
  phases: {
    diagnose: {
      id: 'diagnose',
      title: 'Diagnose',
      duration: '',
      description: 'See Pfizer – Diagnostic Search Baseline for the constraint-mapping story.',
      points: [],
    },
    architect: {
      id: 'architect',
      title: 'Architect',
      duration: '',
      description: 'See Pfizer – Architecture Colab Datasphere for the architecture story.',
      points: [],
    },
    engineer: {
      id: 'engineer',
      title: 'Engineer',
      duration: '',
      description: 'See Pfizer – RAG Co-Pilot Engineering for the production story.',
      points: [],
    },
    enable: {
      id: 'enable',
      title: 'Enable',
      duration: '4 weeks',
      description: 'Embedded CoCo as a "Company Companion" across Teams and CLM workflows, trained producers and reviewers, and made the RAG engine part of the daily content ritual.',
      points: [
        'Embedded CoCo in Microsoft Teams and the internal intranet as the default place to ask content questions',
        'Ran live training sessions and office hours for 200+ content producers and reviewers',
        'Published a governance playbook: what CoCo can answer, when to escalate to humans, and how to cite sources',
        'Created champion cohorts in 3 pilot brands to drive habit formation and peer coaching',
        'Instrumented usage, satisfaction, and time-to-answer metrics to track behavior change',
      ],
      deliverables: [
        'CoCo assistant embedded in Teams and intranet',
        'Training curriculum and quick-start guides',
        'Governance & escalation playbook',
        'Org adoption & health dashboard',
      ],
      tools: [
        { label: 'Assistant Surface', value: 'Microsoft Teams' },
        { label: 'Knowledge Store', value: 'SharePoint / Veeva' },
        { label: 'Analytics', value: 'Power BI / custom dashboards' },
      ],
      metrics: [
        { value: '200', label: 'Users onboarded', suffix: '+' },
        { value: '94', label: 'Training completion', suffix: '%' },
        { value: '4.3', label: 'Satisfaction score', suffix: '/5' },
        { value: '60', label: 'Time-to-answer', suffix: 'sec' },
      ],
    },
    impact: {
      id: 'impact',
      title: 'Impact',
      duration: '',
      description: 'Impact metrics roll up to the Pfizer E2E program (see Impact on the main Pfizer case).',
      points: [],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASES META — Enable only
  // ─────────────────────────────────────────────────────────────────────────────
  phasesMeta: [
    {
      key: 'enable',
      tagline: 'Make the assistant part of the daily ritual.',
      challenge: 'Without adoption by MLR and field teams, the platform would become another unused AI experiment.',
      outcome: 'CoCo became the default way to ask content questions, with 200+ active users and 94% training completion.',
      summaryTitle: 'Turn a RAG platform into a trusted companion.',
      summaryBody: 'We treated CoCo like a product, not a demo: embedded in Teams, backed by training and governance, and measured by behavior change instead of just model quality.',
      bullets: [
        'Embedded CoCo in Teams and intranet as the default question surface',
        'Trained 200+ content producers and reviewers with live sessions',
        'Published governance playbook for escalation and citation',
        'Created champion cohorts in 3 pilot brands',
      ],
      deliverables: ['CoCo in Teams', 'Training curriculum', 'Governance playbook', 'Adoption dashboard'],
      kpiFocus: 'User activation & behavior change',
      decisionOwner: 'Learning & Development',
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // LEGACY FIELDS — Enablement-focused
  // ─────────────────────────────────────────────────────────────────────────────
  challenge: {
    title: 'Landing the Platform',
    description: 'The RAG pipeline was built, but without adoption by MLR and field teams, it would become another unused AI experiment.',
    points: [
      'People hopped 3–5 systems and asked humans instead of using the new assistant',
      'No training or onboarding path for producers and reviewers',
      'No governance model for what CoCo can answer vs. escalate',
      'No metrics for adoption or behavior change',
    ],
  },

  approach: {
    title: 'Product-Style Enablement',
    description: 'We treated CoCo like a product launch, not a demo: embedded where people work, backed by training and governance, measured by behavior change.',
    points: [
      'Embedded CoCo in Teams and intranet—the daily surfaces',
      'Ran live training sessions and office hours',
      'Published governance playbook for escalation and citation',
      'Created champion cohorts in 3 pilot brands',
    ],
  },

  solution: {
    title: 'CoCo as Daily Companion',
    description: 'CoCo became the default way to ask content questions, embedded in the daily workflow and backed by governance.',
    points: [
      '200+ users onboarded across producers and reviewers',
      '94% training completion within 6 weeks',
      'Time-to-answer reduced from 15 min to <60 sec',
      '4.3/5 satisfaction score',
    ],
    tools: [
      { name: 'Microsoft Teams', icon: '' },
      { name: 'SharePoint', icon: '' },
      { name: 'Power BI', icon: '' },
    ],
  },

  results: {
    title: 'Adoption Outcomes',
    metrics: [
      { value: '200+', label: 'Users onboarded', suffix: '' },
      { value: '94%', label: 'Training completion', suffix: '' },
      { value: '4.3/5', label: 'Satisfaction score', suffix: '' },
      { value: '<60 sec', label: 'Time-to-answer', suffix: '' },
    ],
  },

  testimonial: {
    quote: 'CoCo changed how we work. What used to take 15 minutes of searching now takes 30 seconds. The team finally trusts that they\'re looking at the right version of the document.',
    author: 'Senior Content Producer',
    role: 'Pfizer Global Commercial',
    image: '',
  },

  nextCaseStudy: {
    brand: 'Abbott',
    title: 'BinaxNOW Evaluation Backbone',
    href: '/case-study/binaxnow',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHARTS — One Enable chart only (orgHealth for adoption)
// ═══════════════════════════════════════════════════════════════════════════════

export const cocoCharts: CaseStudyCharts = {
  // ─────────────────────────────────────────────────────────────────────────────
  // ORG HEALTH / ADOPTION — Primary chart for Enable phase
  // ─────────────────────────────────────────────────────────────────────────────
  orgHealth: {
    title: 'CoCo Adoption & Satisfaction',
    subtitle: 'Active users, training completion, and satisfaction over first 12 weeks',
    period: 'Q4 2024',
    metrics: [
      { id: 'users', label: 'Active Users', value: 208, target: 200, unit: 'users', status: 'green' as const },
      { id: 'training', label: 'Training Completion', value: 94, target: 80, unit: '%', status: 'green' as const },
      { id: 'satisfaction', label: 'Satisfaction', value: 4.3, target: 4.0, unit: '/5', status: 'green' as const },
      { id: 'tta', label: 'Avg Time-to-Answer', value: 55, target: 60, unit: 'sec', status: 'green' as const },
    ],
    teams: [
      { id: 'producers', name: 'Content Producers', health: 92, headcount: 120, engagement: 95, velocity: 88 },
      { id: 'reviewers', name: 'MLR Reviewers', health: 88, headcount: 45, engagement: 91, velocity: 85 },
      { id: 'brand', name: 'Brand Teams', health: 85, headcount: 30, engagement: 87, velocity: 82 },
      { id: 'champions', name: 'Champion Cohorts', health: 95, headcount: 13, engagement: 100, velocity: 92 },
    ],
    weeklyData: [
      { week: 1, activeUsers: 12, completion: 10, satisfaction: 3.6 },
      { week: 2, activeUsers: 28, completion: 22, satisfaction: 3.8 },
      { week: 4, activeUsers: 68, completion: 55, satisfaction: 4.0 },
      { week: 6, activeUsers: 98, completion: 72, satisfaction: 4.1 },
      { week: 8, activeUsers: 142, completion: 82, satisfaction: 4.2 },
      { week: 10, activeUsers: 178, completion: 89, satisfaction: 4.2 },
      { week: 12, activeUsers: 208, completion: 94, satisfaction: 4.3 },
    ],
  },
};
