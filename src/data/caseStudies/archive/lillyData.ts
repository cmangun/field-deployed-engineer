// src/data/caseStudies/lillyData.ts
// ═══════════════════════════════════════════════════════════════════════════════
// ELI LILLY CASE STUDY — NARRATIVE + CHART DATA
// Regulated Portfolio Deployment - MLR-Compliant AI Sandbox
// ═══════════════════════════════════════════════════════════════════════════════

import type { CaseStudyData, CaseStudyCharts } from '@/types/caseStudy';
import { pfizerCharts } from './pfizerData';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA (CaseStudyData)
// ═══════════════════════════════════════════════════════════════════════════════

export const lillyData: CaseStudyData = {
  slug: 'lilly',
  title: 'Eli Lilly AI Sandbox',
  subtitle: 'MLR-Compliant Rapid Experimentation',
  company: 'Eli Lilly',
  client: 'Eli Lilly Digital Innovation',
  role: 'Lead AI Platform Architect',
  year: '2023',
  services: ['Sandbox Design', 'Portfolio Management', 'Rapid Prototyping', 'MLR Compliance'],
  heroImage: '/assets/img/case-studies/_showcase/lily.jpg',
  overview: 'Launched 20+ AI proof-of-concepts via an MLR-compliant sandbox that enabled faster approvals and safer experimentation. Reduced POC cycle time from 12 weeks to 3 weeks, maintained zero compliance incidents, and established a repeatable framework for regulated AI innovation.',

  heroContext: {
    client: 'Eli Lilly digital teams wanted to experiment with AI but faced 12-week approval cycles for each proof-of-concept due to MLR compliance requirements.',
    constraint: 'FDA regulations demanded full audit trails and compliance documentation even for experimental AI deployments.',
    result: 'Built a pre-approved sandbox environment with built-in compliance guardrails enabling rapid, safe experimentation.'
  },

  heroMetrics: [
    { value: '20+', label: 'POCs Launched' },
    { value: '75%', label: 'Cycle Reduction' },
    { value: '0', label: 'Compliance Incidents' }
  ],

  executiveSnapshot: {
    headline: 'Regulated AI innovation at startup speed',
    keyOutcomes: [
      'POC cycle time: 12 weeks → 3 weeks (75% reduction)',
      '20+ AI experiments deployed in first year',
      'Zero compliance incidents across all deployments',
      'Framework adopted by 4 additional therapeutic areas'
    ]
  },

  phases: {
    diagnose: {
      id: 'diagnose',
      title: 'Diagnose',
      duration: '3 weeks',
      description: 'Analyzed the regulatory landscape and existing approval workflows to identify where compliance friction could be eliminated without sacrificing safety.',
      points: [
        'Mapped 12-week approval workflow identifying 8 weeks of avoidable delays',
        'Interviewed MLR, legal, IT security, and data science teams on pain points',
        'Catalogued 15 common AI use cases that could benefit from sandbox approach',
        'Identified pre-approvable compliance patterns applicable to 80% of experiments'
      ],
      deliverables: ['Workflow Analysis', 'Compliance Pattern Library', 'Use Case Catalog'],
      metrics: [
        { value: '8', suffix: 'wks', label: 'Avoidable Delay' },
        { value: '15', label: 'Use Cases Mapped' },
        { value: '80%', label: 'Pre-Approvable' }
      ]
    },
    architect: {
      id: 'architect',
      title: 'Architect',
      duration: '4 weeks',
      description: 'Designed a sandbox architecture with built-in compliance guardrails that would receive blanket pre-approval for experimental AI work within defined boundaries.',
      points: [
        'Defined sandbox boundaries acceptable to MLR and legal for blanket pre-approval',
        'Designed automatic audit trail generation for all AI experiments',
        'Created data isolation architecture preventing PHI/PII exposure',
        'Built compliance scoring system to flag experiments needing additional review'
      ],
      deliverables: ['Sandbox Architecture', 'Compliance Framework', 'Data Isolation Design'],
      tools: [
        { label: 'Platform', value: 'AWS GovCloud' },
        { label: 'Audit', value: 'Custom Logging' },
        { label: 'Scoring', value: 'Compliance Engine' }
      ]
    },
    engineer: {
      id: 'engineer',
      title: 'Engineer',
      duration: '8 weeks',
      description: 'Built the sandbox infrastructure with automated compliance checks, audit logging, and self-service experiment deployment.',
      points: [
        'Deployed isolated sandbox environment with automatic audit trails',
        'Implemented compliance guardrails blocking non-approved data types',
        'Created self-service portal for experiment provisioning',
        'Built dashboards for real-time compliance monitoring'
      ],
      deliverables: ['Sandbox Environment', 'Compliance Automation', 'Self-Service Portal'],
      metrics: [
        { value: '100%', label: 'Audit Coverage' },
        { value: '<1hr', label: 'Provision Time' },
        { value: '24/7', label: 'Monitoring' }
      ]
    },
    enable: {
      id: 'enable',
      title: 'Enable',
      duration: '3 weeks',
      description: 'Trained data science teams on sandbox usage and established governance processes for ongoing operation.',
      points: [
        'Trained 45 data scientists on sandbox self-service capabilities',
        'Created experiment template library for common use cases',
        'Established governance committee for edge-case review',
        'Deployed usage analytics to track adoption and identify gaps'
      ],
      deliverables: ['Training Program', 'Template Library', 'Governance Process']
    },
    impact: {
      id: 'impact',
      title: 'Impact',
      duration: 'Ongoing',
      description: 'The sandbox transformed Lilly ability to experiment with AI while maintaining regulatory compliance.',
      points: [
        'POC cycle time reduced from 12 weeks to 3 weeks (75% improvement)',
        '20+ AI experiments deployed in first year',
        'Zero compliance incidents across all deployments',
        'Framework adopted by 4 additional therapeutic areas'
      ],
      metrics: [
        { value: '75%', numericValue: 75, suffix: '%', label: 'Cycle Reduction' },
        { value: '20+', label: 'POCs Launched' },
        { value: '0', label: 'Incidents' }
      ]
    }
  },

  challenge: {
    title: 'The Challenge',
    description: 'Eli Lilly digital teams faced 12-week approval cycles for AI proof-of-concepts due to MLR compliance requirements.',
    points: [
      '12-week approval cycles for each POC',
      'Full audit trails required for experiments',
      'MLR review bottleneck on all AI work',
      'Innovation velocity lagging competitors'
    ]
  },

  approach: {
    title: 'The Approach',
    description: 'Designed pre-approved sandbox with built-in compliance guardrails.',
    points: [
      'Identified pre-approvable compliance patterns',
      'Designed automatic audit trail generation',
      'Created data isolation architecture',
      'Built compliance scoring system'
    ]
  },

  solution: {
    title: 'The Solution',
    description: 'Built sandbox infrastructure with automated compliance and self-service deployment.',
    points: [
      'Isolated sandbox with automatic audit trails',
      'Compliance guardrails blocking non-approved data',
      'Self-service experiment provisioning portal',
      'Real-time compliance monitoring dashboards'
    ]
  },

  results: {
    title: 'Results',
    metrics: [
      { value: '75%', label: 'Cycle Reduction' },
      { value: '20+', label: 'POCs Launched' },
      { value: '0', label: 'Incidents' },
      { value: '4', label: 'Areas Adopted' }
    ]
  },

  nextCaseStudy: {
    brand: 'IPG',
    title: 'Global Intranet Platform',
    href: '/case-study/ipg'
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHART DATA — Inherits from Pfizer canonical charts
// ═══════════════════════════════════════════════════════════════════════════════

export const lillyCharts: CaseStudyCharts = {
  ...pfizerCharts
};
