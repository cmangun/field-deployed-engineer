// src/data/caseStudies/cocoData.ts
// ═══════════════════════════════════════════════════════════════════════════════
// COCO COMPANY COMPANION — Focused Enablement Case Study
// Single-phase story: Enable only (adoption, training, operationalization)
// ═══════════════════════════════════════════════════════════════════════════════

import type { CaseStudyData, CaseStudyCharts } from '@/types/caseStudy';
import { chartColors } from '@/charts_D3/colors';

// ═══════════════════════════════════════════════════════════════════════════════
// COCO CASE STUDY DATA — Enablement Focus
// ═══════════════════════════════════════════════════════════════════════════════

export const cocoData: CaseStudyData = {
  slug: 'coco',
  title: 'CoCo: The Company Companion',
  subtitle: 'Enablement & Adoption Engineering',
  company: 'Pfizer',
  client: 'Pfizer Global Commercial',
  role: 'Enablement Lead',
  year: '2024',
  services: ['Change Management', 'Training Design', 'Adoption Engineering', 'Governance Ops'],
  heroImage: '/assets/img/case-studies/_showcase/coco-hero.jpg',
  brandLogo: '/assets/img/logo/coco-logo.png',

  overview: 'Turned a production RAG content engine into CoCo—a "company companion" that became the default starting point for content producers and MLR reviewers. Trained 200+ users, certified 5 platform admins, and made CoCo the front door for onboarding, process help, and content retrieval.',

  // ─────────────────────────────────────────────────────────────────────────────
  // HERO CONTEXT — Adoption-focused metrics (not E2E program metrics)
  // ─────────────────────────────────────────────────────────────────────────────
  heroContext: {
    problemStatement: 'Pfizer had a production RAG engine but risked it becoming another unused AI project. Without adoption by real teams, all the engineering work would be wasted.',
    solutionPattern: 'Reframed the technical tool as CoCo—a daily companion for getting work done—then embedded it in existing workflows, trained champions, and built governance ops.',
  },

  heroMetrics: [
    { value: '208', label: 'Users onboarded', delta: 'across 4 teams' },
    { value: '94%', label: 'Training completion', delta: 'target: 80%' },
    { value: '4.2/5', label: 'User satisfaction', delta: 'NPS: +42' },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // EXECUTIVE SNAPSHOT
  // ─────────────────────────────────────────────────────────────────────────────
  executiveSnapshot: {
    context: 'Pfizer commercial and MLR teams had a production RAG engine built on Azure OpenAI, but risked it becoming another unused internal tool.',
    insight: 'Adoption engineering is as important as model engineering. The tool needed a name, a personality, and a path into daily workflows.',
    outcome: 'CoCo crossed the "habit threshold"—producers and reviewers now start sessions in CoCo first, then click through to Veeva/Workfront only when needed.',
    heroImage: '/assets/img/case-studies/_showcase/coco-hero.jpg',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASES — Enable only (single-phase case study)
  // ─────────────────────────────────────────────────────────────────────────────
  phases: {
    enable: {
      id: 'enable',
      title: 'Enable',
      duration: '4 weeks',
      description: 'Branded, launched, and operationalized CoCo so it became the default starting point for content producers and reviewers.',
      points: [
        'Onboarded 200+ content producers with hands-on training flows tailored to producers vs. reviewers',
        'Certified 5 platform admins to manage content governance, access, and guardrails without engineering',
        'Published governance playbook and runbooks so new brands and regions can adopt CoCo with a repeatable process',
        'Established monthly office hours and power-user sessions to turn early adopters into champions',
        'Embedded CoCo into Teams, the intranet home page, and onboarding checklists',
        'Created lightweight "How to ask CoCo" guides for each function',
      ],
      deliverables: [
        'CoCo brand identity and naming',
        'Role-based training curriculum (producers, reviewers, admins)',
        'Governance playbook and access control runbook',
        'Monthly office hours cadence',
        'Power-user champion network',
      ],
      tools: [
        { label: 'Training Platform', value: 'Workday Learning' },
        { label: 'Collaboration', value: 'Microsoft Teams' },
        { label: 'Documentation', value: 'SharePoint' },
        { label: 'Feedback', value: 'Qualtrics' },
      ],
      metrics: [
        { value: '208', label: 'Users onboarded', suffix: '' },
        { value: '94', label: 'Training completion', suffix: '%' },
        { value: '4.2', label: 'User satisfaction', suffix: '/5' },
        { value: '5', label: 'Certified admins', suffix: '' },
      ],
    },
    // Empty placeholders for other phases (single-phase case study)
    diagnose: {
      id: 'diagnose',
      title: 'Diagnose',
      duration: '',
      description: 'See Pfizer Search Baseline case study for diagnostics.',
      points: [],
    },
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
    impact: {
      id: 'impact',
      title: 'Impact',
      duration: '',
      description: 'Impact metrics roll up to the Pfizer E2E program.',
      points: [],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PHASES META — Short summaries for Enable only
  // ─────────────────────────────────────────────────────────────────────────────
  phasesMeta: [
    {
      key: 'enable',
      tagline: 'From tool to teammate.',
      challenge: 'Without adoption by real teams, CoCo would become another unused internal tool.',
      outcome: 'CoCo became the default starting point—users now ask CoCo first before navigating to source systems.',
      summaryTitle: 'Make CoCo the default way to get work done.',
      summaryBody: 'We branded the RAG engine as CoCo, embedded it in existing tools—Teams, intranet, onboarding—then trained champions in each function to own usage norms and feedback loops.',
      bullets: [
        'Onboarded 200+ content producers with role-tailored training',
        'Certified 5 platform admins to manage governance without engineering',
        'Published repeatable governance playbook for new brand/region rollouts',
        'Established monthly office hours and power-user champion network',
      ],
      deliverables: ['CoCo brand identity', 'Training curriculum', 'Governance playbook', 'Champion network'],
      kpiFocus: 'User activation & satisfaction',
      decisionOwner: 'Learning & Development',
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // LEGACY FIELDS (required by type but not primary for this case)
  // ─────────────────────────────────────────────────────────────────────────────
  challenge: {
    title: 'The Adoption Gap',
    description: 'Pfizer had built a production RAG engine but risked it becoming shelfware. The technical capability existed, but users didn\'t know about it or how to use it.',
    points: [
      'No brand identity or memorable name for the tool',
      'No training or onboarding path for different user roles',
      'No governance model for ongoing operations',
      'No feedback loop to capture issues and improvements',
    ],
  },

  approach: {
    title: 'Enablement Engineering',
    description: 'We treated adoption as a product problem, not a communication problem. CoCo needed a personality, a path into daily workflows, and operational support.',
    points: [
      'Named and branded the assistant as "CoCo" (Company Companion)',
      'Designed role-specific training paths for producers, reviewers, and admins',
      'Built governance playbook for repeatable rollout to new teams',
      'Created champion network for peer support and feedback',
    ],
  },

  solution: {
    title: 'CoCo Launch & Operations',
    description: 'CoCo launched embedded in Teams and intranet, with training, governance, and ongoing support baked in from day one.',
    points: [
      'Embedded CoCo in Teams and intranet home page',
      'Trained 200+ users with hands-on curriculum',
      'Certified 5 admins to run governance ops',
      'Monthly office hours and power-user sessions',
    ],
    tools: [
      { name: 'Microsoft Teams', icon: '' },
      { name: 'SharePoint', icon: '' },
      { name: 'Workday Learning', icon: '' },
      { name: 'Qualtrics', icon: '' },
    ],
  },

  results: {
    title: 'Adoption Outcomes',
    metrics: [
      { value: '208', label: 'Users onboarded', suffix: '' },
      { value: '94%', label: 'Training completion', suffix: '' },
      { value: '4.2/5', label: 'User satisfaction', suffix: '' },
      { value: '5', label: 'Certified admins', suffix: '' },
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
// COCO CHARTS — Single primary chart (adoption curve)
// ═══════════════════════════════════════════════════════════════════════════════

export const cocoCharts: CaseStudyCharts = {
  // ─────────────────────────────────────────────────────────────────────────────
  // ADOPTION CURVE — Primary chart for Enable phase
  // ─────────────────────────────────────────────────────────────────────────────
  adoptionCurve: {
    id: 'cocoAdoptionCurve',
    phase: 'enable',
    title: 'CoCo Adoption Curve',
    subtitle: 'Weekly active users and training completion during initial rollout.',
    type: 'line',
    xAxisLabel: 'Week',
    yAxisLabel: 'Users / % completion',
    series: [
      {
        id: 'wau',
        label: 'Weekly active users',
        data: [12, 35, 78, 122, 156, 181, 195, 208],
        color: chartColors.charcoal,
      },
      {
        id: 'trainingCompletion',
        label: 'Training completion (%)',
        data: [10, 25, 48, 63, 78, 86, 91, 94],
        color: chartColors.gray,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SIMPLE GANTT — 4-week enablement timeline
  // ─────────────────────────────────────────────────────────────────────────────
  gantt: [
    { id: 1, task: 'CoCo Branding', start: 0, duration: 1, category: 'Enable', progress: 100 },
    { id: 2, task: 'Training Design', start: 0.5, duration: 1.5, category: 'Enable', progress: 100 },
    { id: 3, task: 'Teams Integration', start: 1, duration: 1, category: 'Enable', progress: 100 },
    { id: 4, task: 'Pilot Group Rollout', start: 1.5, duration: 1, category: 'Enable', progress: 100 },
    { id: 5, task: 'Admin Certification', start: 2, duration: 1, category: 'Enable', progress: 100 },
    { id: 6, task: 'Full Rollout', start: 2.5, duration: 1.5, category: 'Enable', progress: 100 },
    { id: 7, task: 'Office Hours Launch', start: 3, duration: 1, category: 'Enable', progress: 100 },
  ],

  // ─────────────────────────────────────────────────────────────────────────────
  // CUSTOMER JOURNEY — User experience with CoCo
  // ─────────────────────────────────────────────────────────────────────────────
  journeyMap: {
    persona: {
      name: 'Content Producer',
      role: 'Senior Associate, Commercial Marketing',
      image: '/assets/SVG/Salaried Male.svg',
      goals: ['Find approved content fast', 'Avoid compliance issues', 'Reduce search time'],
    },
    goal: 'Use CoCo to find the right content without digging through multiple systems',
    stages: [
      {
        id: 'discover',
        name: 'Discover CoCo',
        icon: '/assets/SVG/Touchscreen.svg',
        color: chartColors.charcoal,
        duration: '< 2 min',
        actions: ['Sees CoCo in Teams sidebar', 'Clicks to explore', 'Views quick-start guide'],
        emotions: ['Curious', 'Cautiously optimistic'],
        painPoints: ['Not sure if this is another tool to learn'],
        opportunities: ['Make first interaction delightful'],
        touchpoints: [
          { channel: 'Teams', type: 'owned' as const },
          { channel: 'Intranet', type: 'owned' as const },
        ],
        thoughts: ['"What is this?"', '"Hope it\'s not another tool I have to learn"'],
        satisfaction: 3,
      },
      {
        id: 'ask',
        name: 'Ask CoCo',
        icon: '/assets/SVG/Chat Message.svg',
        color: chartColors.charcoal,
        duration: '< 30 sec',
        actions: ['Types natural language question', 'Gets instant response with citations', 'Clicks through to source'],
        emotions: ['Surprised', 'Impressed'],
        painPoints: [],
        opportunities: ['Reinforce trust with citations'],
        touchpoints: [
          { channel: 'CoCo Chat', type: 'owned' as const },
          { channel: 'Source Document', type: 'owned' as const },
        ],
        thoughts: ['"That used to take 15 minutes"', '"I should tell my team"'],
        satisfaction: 5,
      },
      {
        id: 'trust',
        name: 'Build Trust',
        icon: '/assets/SVG/Handshake Heart.svg',
        color: chartColors.charcoal,
        duration: 'Ongoing',
        actions: ['Uses CoCo for daily questions', 'Verifies answers with sources', 'Shares with colleagues'],
        emotions: ['Confident', 'Appreciative'],
        painPoints: [],
        opportunities: ['Champion program'],
        touchpoints: [
          { channel: 'CoCo', type: 'owned' as const },
          { channel: 'Team Chat', type: 'owned' as const },
        ],
        thoughts: ['"This is my new starting point"', '"Why didn\'t we have this before?"'],
        satisfaction: 5,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ORG HEALTH — Enablement metrics
  // ─────────────────────────────────────────────────────────────────────────────
  orgHealth: {
    title: 'CoCo Enablement Scorecard',
    period: 'Q4 2024',
    metrics: [
      { id: 'adoption', label: 'User Adoption', value: 208, target: 200, unit: 'users', status: 'green' as const },
      { id: 'training', label: 'Training Completion', value: 94, target: 80, unit: '%', status: 'green' as const },
      { id: 'satisfaction', label: 'User Satisfaction', value: 4.2, target: 4.0, unit: '/5', status: 'green' as const },
      { id: 'admins', label: 'Certified Admins', value: 5, target: 5, unit: 'admins', status: 'green' as const },
    ],
    teams: [
      { id: 'commercial', name: 'Commercial Marketing', health: 92, headcount: 85, engagement: 95, velocity: 88 },
      { id: 'mlr', name: 'MLR Reviewers', health: 88, headcount: 45, engagement: 91, velocity: 85 },
      { id: 'medical', name: 'Medical Affairs', health: 85, headcount: 52, engagement: 87, velocity: 82 },
      { id: 'admins', name: 'Platform Admins', health: 95, headcount: 5, engagement: 100, velocity: 90 },
    ],
  },
};
