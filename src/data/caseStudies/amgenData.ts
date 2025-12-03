// src/data/caseStudies/amgenData.ts
// ═══════════════════════════════════════════════════════════════════════════════
// AMGEN CASE STUDY - NARRATIVE + CHART DATA
// Technical Program Leadership for Multi-Cloud Scientific Data Platform
// ═══════════════════════════════════════════════════════════════════════════════

import type { CaseStudyData, CaseStudyCharts } from '@/types/caseStudy';
import { pfizerCharts } from './pfizerData';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA (CaseStudyData)
// ═══════════════════════════════════════════════════════════════════════════════

export const amgenData: CaseStudyData = {
  slug: 'amgen',
  brandLogo: '/assets/img/logo/Amgen-black.png',
  title: 'Amgen Technical Program Leadership',
  subtitle: 'Multi-Cloud Scientific Data Platform',
  company: 'Amgen',
  client: 'Amgen Repatha Launch',
  role: 'Lead Technical Program Manager',
  year: '2023',
  services: ['Program Leadership', 'Data Platforms', 'Taxonomy Design', 'Multi-Cloud Architecture'],
  heroImage: '/assets/img/case-studies/_showcase/Technical_Program.jpg',
  overview: 'Delivered a cross-cloud, multi-team platform that standardized metadata, centralized embeddings, automated lineage, and reduced asset update latency from multi-day cycles to under 24 hours. Enabled Repatha high-intensity launch without disruption and established a durable blueprint for Amgen broader data strategy.',

  heroContext: {
    client: 'Amgen needed a unified scientific data platform to manage $12M+ in marketing, clinical, and regulatory assets requiring 24-hour turnaround updates.',
    constraint: 'Content lived across Sitecore, AWS S3, on-prem DAMs, and isolated analytics systems with fragmented taxonomies across 7 therapeutic areas.',
    result: 'Harmonized taxonomies, aligned teams, and provided single-source-of-truth embedding store for compliant retrieval at launch velocity.'
  },

  heroMetrics: [
    { value: '<24', suffix: 'hrs', label: 'Update Latency' },
    { value: '100%', label: 'Metadata Aligned' },
    { value: '3×', label: 'Workflow Stability' }
  ],

  executiveSnapshot: {
    headline: 'Multi-cloud platform enabling real-time launch velocity',
    keyOutcomes: [
      'Asset update latency: multi-day → <24 hours',
      '100% metadata consistency across clouds',
      '3× improvement in cross-team workflow stability',
      '90% reduction in content drift'
    ]
  },

  phasesMeta: [
    {
      key: 'diagnose',
      title: 'Diagnose',
      challenge:
        "Amgen\'s scientific content for launch lived across Sitecore, AWS S3, on-prem DAMs, and analytics tools. No one could say with confidence where 'truth' lived or why updates took days.",
      outcome:
        'In 48 hours we mapped 30+ asset flows, identified taxonomy divergence across 7 therapeutic areas, and showed that misaligned metadata and embeddings - not lack of tools - were the real bottlenecks.'
    },
    {
      key: 'architect',
      title: 'Architect',
      challenge:
        'We needed a platform that could harmonize taxonomies and embeddings across clouds, avoid locking into a single vendor stack, and still support launch-level SLAs (<24 hours) for changes.',
      outcome:
        'Defined a multi-cloud scientific data platform: governed taxonomies, a unified embedding store, and routing patterns that treated Sitecore, AWS, and on-prem systems as peers behind a single truth layer.'
    },
    {
      key: 'engineer',
      title: 'Engineer',
      challenge:
        'Engineering efforts had to move while launch pressure was building; there was no option to take systems offline or rebuild from scratch.',
      outcome:
        'Implemented ingestion, normalization, and embedding pipelines around existing systems; wired health checks and dashboards so business owners could see drift, latency, and coverage in real time.'
    },
    {
      key: 'enable',
      title: 'Enable',
      challenge:
        'Brand, medical, and regulatory teams had different vocabularies and incentives; without alignment, even a perfect platform would be underused or misused.',
      outcome:
        'Facilitated working sessions to align on a unified taxonomy, onboarded teams onto the new flows, and embedded platform usage into launch playbooks rather than "optional" tools.'
    },
    {
      key: 'impact',
      title: 'Impact',
      challenge:
        'We needed to demonstrate that the platform reduced launch risk and cycle time, not just added another layer of abstraction.',
      outcome:
        'Update latency dropped to under 24 hours, metadata alignment reached 100% across targeted clouds, and cross-team workflows became measurably more stable, establishing a blueprint for future launches.'
    }
  ],

  patternGeneralization: {
    bestFitEnvironments:
      'Global life-science organizations where launch-critical content spans multiple clouds, legacy CMS/DAM platforms, and analytics stacks, and where "scientific truth" must update quickly.',
    corePrimitives:
      'Unified taxonomy and ID strategy, cross-cloud embedding store, ingestion/normalization pipelines, and routing patterns that treat clouds and platforms as interchangeable views over a single source of truth.',
    whatYouNeedReady:
      'Agreement on the scientific and brand taxonomy, access to existing CMS/DAM/analytics systems, sponsorship from brand and medical leaders, and willingness from platform teams to expose metadata and events.'
  },

  phases: {
    diagnose: {
      id: 'diagnose',
      title: 'Diagnose',
      duration: '48 hours',
      description: 'Dropped into a fragmented ecosystem at the moment Amgen needed surgical execution. Conducted a compressed discovery cycle across Sitecore, AWS, brand teams, MLR workflows, and DAMs to map where scientific truth was stored-and where it was drifting.',
      points: [
        'Interviewed brand, medical, regulatory, IT, and agency partners within 48 hours',
        'Mapped 30+ asset flows spanning Sitecore, AWS, on-prem DAMs, and analytics',
        'Identified taxonomy divergence across 7 therapeutic areas',
        'Pinpointed that lack of embedding alignment was blocking automation across channels'
      ],
      deliverables: ['Asset Flow Map', 'Taxonomy Gap Analysis', 'Bottleneck Assessment'],
      metrics: [
        { value: '30+', label: 'Asset Flows Mapped' },
        { value: '7', label: 'Therapeutic Areas' },
        { value: '$12M', label: 'Assets Under Management' }
      ]
    },
    architect: {
      id: 'architect',
      title: 'Architect',
      duration: '2 weeks',
      description: 'Evaluated Sitecore vs AWS-native paths for content delivery, lineage, and governed automation. Required a solution that would withstand a launch crisis while giving Amgen a long-term platform.',
      points: [
        'Produced side-by-side deep evaluation of Sitecore vs AWS for Repatha launch',
        'Defined a federated scientific taxonomy spanning medical → brand → regulatory',
        'Designed unified embedding store for compliant semantic search and enrichment',
        'Established cross-cloud lineage to prevent content drift under urgent updates'
      ],
      deliverables: ['Platform Comparison', 'Federated Taxonomy', 'Embedding Store Design'],
      tools: [
        { label: 'Cloud', value: 'AWS, Sitecore' },
        { label: 'Embeddings', value: 'Vector Store' },
        { label: 'Lineage', value: 'Cross-Cloud Sync' }
      ]
    },
    engineer: {
      id: 'engineer',
      title: 'Engineer',
      duration: '4 weeks',
      description: 'Execution during the Repatha launch window became a real-world stress test. $12M in assets required synchronized updates in <24 hours. The architecture had to hold, and the teams had to trust it.',
      points: [
        'Coordinated brand, medical, and regulatory teams across 3 time zones',
        'Activated automated enrichment and validation checks tied to embeddings',
        'Reduced asset update latency from multi-day to under 24 hours',
        'Eliminated cross-channel inconsistencies during peak launch activity'
      ],
      deliverables: ['Automated Enrichment Pipeline', 'Validation Framework', 'Update Workflow'],
      metrics: [
        { value: '<24', suffix: 'hrs', label: 'Update Latency' },
        { value: '3', label: 'Time Zones Coordinated' },
        { value: '0', label: 'Channel Inconsistencies' }
      ]
    },
    enable: {
      id: 'enable',
      title: 'Enable',
      duration: '2 weeks',
      description: 'Turned the Repatha emergency architecture into an enterprise capability. Codified taxonomies, governance, and embedding strategies that became part of Amgen long-term scientific data platform roadmap.',
      points: [
        'Converted launch-specific workflows into durable enterprise patterns',
        'Documented unified metadata strategy for future therapy areas',
        'Built KPIs: update-speed, error-rate, content-parity, lineage completeness',
        'Trained cross-functional teams and ensured repeatable adoption'
      ],
      deliverables: ['Enterprise Playbook', 'KPI Dashboard', 'Training Materials']
    },
    impact: {
      id: 'impact',
      title: 'Impact',
      duration: 'Ongoing',
      description: 'The platform enabled Repatha launch success and became the foundation for Amgen broader data strategy across therapeutic areas.',
      points: [
        'Asset update latency reduced from multi-day to under 24 hours',
        '100% metadata consistency maintained across all cloud environments',
        '3× improvement in cross-team workflow stability',
        '90% reduction in content drift incidents'
      ],
      metrics: [
        { value: '90%', numericValue: 90, suffix: '%', label: 'Content Drift Reduction' },
        { value: '100%', label: 'Metadata Consistency' },
        { value: '3×', label: 'Workflow Improvement' }
      ]
    }
  },

  challenge: {
    title: 'The Challenge',
    description: 'Amgen needed to manage $12M+ in marketing, clinical, and regulatory assets with 24-hour turnaround updates during Repatha launch.',
    points: [
      'Content fragmented across Sitecore, AWS S3, on-prem DAMs',
      'Taxonomy divergence across 7 therapeutic areas',
      'No single source of truth for embeddings',
      'Multi-day asset update cycles'
    ]
  },

  approach: {
    title: 'The Approach',
    description: 'Built a cross-cloud architecture with harmonized metadata and centralized embedding store.',
    points: [
      'Rapid 48-hour discovery and assessment',
      'Federated taxonomy spanning medical, brand, regulatory',
      'Unified embedding store for semantic search',
      'Cross-cloud lineage for content integrity'
    ]
  },

  solution: {
    title: 'The Solution',
    description: 'Delivered a multi-cloud platform enabling real-time launch velocity.',
    points: [
      'Automated enrichment and validation pipelines',
      'Cross-team coordination across 3 time zones',
      'Enterprise-grade metadata consistency',
      'Durable patterns for future therapeutic launches'
    ]
  },

  results: {
    title: 'Results',
    metrics: [
      { value: '<24hrs', label: 'Update Latency' },
      { value: '100%', label: 'Metadata Aligned' },
      { value: '3×', label: 'Workflow Stability' },
      { value: '90%', label: 'Drift Reduction' }
    ]
  },

  nextCaseStudy: {
    brand: 'Sanofi',
    title: 'Global Vaccine Dashboard',
    href: '/case-study/sanofi'
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHART DATA - Inherits from Pfizer canonical charts
// ═══════════════════════════════════════════════════════════════════════════════

export const amgenCharts: CaseStudyCharts = {
  ...pfizerCharts
};
