// src/data/caseStudies/publicisData.ts
// ═══════════════════════════════════════════════════════════════════════════════
// PUBLICIS HEALTH CASE STUDY - NARRATIVE + CHART DATA
// Enterprise Architecture at Scale - Multi-Agency System Unification
// ═══════════════════════════════════════════════════════════════════════════════

import type { CaseStudyData, CaseStudyCharts } from '@/types/caseStudy';
import { pfizerCharts } from './pfizerData';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA (CaseStudyData)
// ═══════════════════════════════════════════════════════════════════════════════

export const publicisData: CaseStudyData = {
  slug: 'publicis',
  brandLogo: '/assets/img/logo/images.png',
  title: 'Publicis Health Enterprise Architecture',
  subtitle: 'Multi-Agency System Unification',
  company: 'Publicis Health',
  client: 'Publicis Health Network',
  role: 'Lead Enterprise Architect',
  year: '2023',
  services: ['System Unification', 'Identity Management', 'Workflow Design', 'SSO Integration'],
  heroImage: '/assets/img/case-studies/_showcase/EnterpriseScale.jpg',
  overview: 'Unified 14 agency systems into a governed content supply-chain with identity, routing, and creative-to-MLR workflow alignment. Reduced cross-agency handoff time by 60%, eliminated duplicate asset creation, and established a single source of truth for 2,500+ users across the network.',

  heroContext: {
    client: 'Publicis Health network of 14 agencies operated on fragmented systems with no unified identity, content routing, or workflow governance.',
    constraint: 'Each agency had evolved its own tech stack, creating silos that slowed cross-agency collaboration and increased compliance risk.',
    result: 'Delivered a unified architecture enabling seamless content flow from creative through MLR across all agencies.'
  },

  heroMetrics: [
    { value: '14', label: 'Agencies Unified' },
    { value: '60%', label: 'Handoff Reduction' },
    { value: '2.5K+', label: 'Users Onboarded' }
  ],

  executiveSnapshot: {
    headline: 'Enterprise-wide content supply chain governance',
    keyOutcomes: [
      '14 agency systems unified under single architecture',
      '60% reduction in cross-agency handoff time',
      'Single source of truth for 2,500+ users',
      'Zero duplicate asset creation incidents post-launch'
    ]
  },

  phasesMeta: [
    {
      key: 'diagnose',
      title: 'Diagnose',
      challenge:
        'Publicis Health\'s 14 agencies each had their own stack, workflows, and identity model. No one had an end-to-end picture of how content moved from creative through MLR, or where it stalled.',
      outcome:
        'In four weeks we inventoried 14 tech stacks, mapped 47 workflows, and quantified $2.3M in annual cost from duplicate asset creation and rework, reframing the problem as a system unification challenge, not a tooling issue at any single agency.'
    },
    {
      key: 'architect',
      title: 'Architect',
      challenge:
        'We needed a unification architecture that respected agency autonomy but enforced shared identity, routing, and governance - without breaking existing client commitments.',
      outcome:
        'Defined an enterprise architecture with a federated identity layer, shared routing and metadata services, and clear integration patterns so agencies could plug in without rewriting their entire stacks.'
    },
    {
      key: 'engineer',
      title: 'Engineer',
      challenge:
        'The engineering work had to land incrementally; we could not "big bang" cut over 14 agencies at once.',
      outcome:
        'Implemented the identity and routing layers, integrated priority agencies first, and wired observability so we could see cross-agency handoffs, errors, and latency before rolling out to the full network.'
    },
    {
      key: 'enable',
      title: 'Enable',
      challenge:
        'Agency leaders were wary of losing autonomy and feared a central architecture would slow them down or impose one-size-fits-all workflows.',
      outcome:
        'Framed the architecture as an accelerator, not a constraint: showed how unified identity and routing reduced friction with MLR, improved client governance, and still allowed agency-specific tools behind the shared interfaces.'
    },
    {
      key: 'impact',
      title: 'Impact',
      challenge:
        'We needed proof that unification reduced friction and compliance risk in practice, not just on diagrams.',
      outcome:
        'Handoff times fell by 60%, 2,500+ users moved under a single identity fabric, and content routing became observable and governable across the network, reducing duplicate work and compliance exposure.'
    }
  ],

  patternGeneralization: {
    bestFitEnvironments:
      'Holding-company or multi-agency networks where each unit has grown its own stack, but clients and regulators expect unified behavior and governance.',
    corePrimitives:
      'Federated identity layer, shared content routing and metadata services, integration patterns that allow local stacks to plug into a central nervous system, and cross-agency observability over workflows.',
    whatYouNeedReady:
      'Executive sponsorship across agencies, agreement on core identity and content models, a minimal central platform team, and a phased rollout plan that starts with the most constrained or highest-value agencies.'
  },

  phases: {
    diagnose: {
      id: 'diagnose',
      title: 'Diagnose',
      duration: '4 weeks',
      description: 'Mapped the complete technology landscape across 14 agencies, identifying integration points, authentication gaps, and workflow bottlenecks that were causing delays and compliance risks.',
      points: [
        'Inventoried 14 distinct agency tech stacks and their integration capabilities',
        'Mapped 47 unique content workflows with varying approval chains',
        'Identified 8 different authentication systems causing user friction',
        'Documented $2.3M annual cost of duplicate asset creation and rework'
      ],
      deliverables: ['Technology Inventory', 'Workflow Map', 'Integration Assessment'],
      metrics: [
        { value: '14', label: 'Agency Stacks' },
        { value: '47', label: 'Workflows Mapped' },
        { value: '$2.3M', label: 'Rework Cost/Year' }
      ]
    },
    architect: {
      id: 'architect',
      title: 'Architect',
      duration: '6 weeks',
      description: 'Designed a federated architecture with unified identity, content routing layer, and standardized API contracts that preserved agency autonomy while enabling network-wide governance.',
      points: [
        'Designed SSO federation layer supporting all 8 existing identity providers',
        'Created content routing middleware for cross-agency asset sharing',
        'Established API contracts for creative-to-MLR workflow handoffs',
        'Built governance framework balancing agency autonomy with network standards'
      ],
      deliverables: ['Architecture Blueprint', 'SSO Design', 'API Contracts', 'Governance Framework'],
      tools: [
        { label: 'Identity', value: 'Okta, Azure AD Federation' },
        { label: 'Routing', value: 'Custom Middleware' },
        { label: 'Workflow', value: 'Workfront Integration' }
      ]
    },
    engineer: {
      id: 'engineer',
      title: 'Engineer',
      duration: '12 weeks',
      description: 'Implemented the unified architecture in phases, starting with identity federation, then content routing, and finally workflow integration across all agencies.',
      points: [
        'Deployed SSO federation connecting 2,500+ users across all agencies',
        'Implemented content routing layer with real-time asset synchronization',
        'Integrated MLR workflow triggers across creative platforms',
        'Built monitoring dashboards for cross-agency content flow visibility'
      ],
      deliverables: ['SSO Federation', 'Content Routing Layer', 'MLR Integration', 'Monitoring Suite'],
      metrics: [
        { value: '2.5K+', label: 'Users Federated' },
        { value: '99.9%', label: 'Routing Uptime' },
        { value: '12', label: 'Week Deployment' }
      ]
    },
    enable: {
      id: 'enable',
      title: 'Enable',
      duration: '4 weeks',
      description: 'Rolled out training, documentation, and support structures to ensure adoption across all agencies with minimal disruption to ongoing work.',
      points: [
        'Trained 2,500+ users across 14 agencies on new workflows',
        'Created agency-specific quick-start guides and video tutorials',
        'Established help desk with 24-hour response SLA',
        'Deployed usage analytics to identify adoption gaps early'
      ],
      deliverables: ['Training Program', 'Documentation Library', 'Support Structure']
    },
    impact: {
      id: 'impact',
      title: 'Impact',
      duration: 'Ongoing',
      description: 'The unified architecture transformed how Publicis Health operates, enabling faster collaboration and eliminating costly inefficiencies.',
      points: [
        '60% reduction in cross-agency handoff time',
        'Zero duplicate asset creation incidents post-launch',
        '$1.8M annual savings from eliminated rework',
        'Foundation established for AI-powered content optimization'
      ],
      metrics: [
        { value: '60%', numericValue: 60, suffix: '%', label: 'Handoff Reduction' },
        { value: '$1.8M', label: 'Annual Savings' },
        { value: '0', label: 'Duplicate Incidents' }
      ]
    }
  },

  challenge: {
    title: 'The Challenge',
    description: 'Publicis Health network of 14 agencies operated on fragmented systems with no unified identity or workflow governance.',
    points: [
      '14 distinct agency tech stacks',
      '47 unique content workflows',
      '8 different authentication systems',
      '$2.3M annual rework cost'
    ]
  },

  approach: {
    title: 'The Approach',
    description: 'Designed federated architecture preserving agency autonomy while enabling network-wide governance.',
    points: [
      'SSO federation layer for unified identity',
      'Content routing middleware for asset sharing',
      'Standardized API contracts for workflow handoffs',
      'Governance framework for network standards'
    ]
  },

  solution: {
    title: 'The Solution',
    description: 'Implemented unified architecture in phases across all agencies.',
    points: [
      'Identity federation for 2,500+ users',
      'Real-time content routing layer',
      'MLR workflow integration',
      'Cross-agency visibility dashboards'
    ]
  },

  results: {
    title: 'Results',
    metrics: [
      { value: '60%', label: 'Handoff Reduction' },
      { value: '$1.8M', label: 'Annual Savings' },
      { value: '14', label: 'Agencies Unified' },
      { value: '2.5K+', label: 'Users Enabled' }
    ]
  },

  nextCaseStudy: {
    brand: 'Medtronic',
    title: 'Clinical AI Platform',
    href: '/case-study/medtronic'
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHART DATA - Inherits from Pfizer canonical charts
// ═══════════════════════════════════════════════════════════════════════════════

export const publicisCharts: CaseStudyCharts = {
  ...pfizerCharts
};
