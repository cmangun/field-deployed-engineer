// src/data/caseStudies/nhf.ts
// ═══════════════════════════════════════════════════════════════════════════════
// NAKED HEART FOUNDATION CASE STUDY - NARRATIVE + CHART DATA
// Mission-Embedded Non-Profit: From Trauma to Social Infrastructure
// ═══════════════════════════════════════════════════════════════════════════════

import type { CaseStudyData, CaseStudyCharts } from '@/types/caseStudy';
import { pfizerCharts } from './pfizerData';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA (CaseStudyData)
// ═══════════════════════════════════════════════════════════════════════════════

export const nakedHeartFoundationData: CaseStudyData = {
  slug: 'nakedheart',
  brandLogo: '/assets/img/logo/NHF.png',
  title: 'Naked Heart Foundation – Inclusive Playground Network',
  subtitle: 'Networked Execution Model',
  company: 'Naked Heart Foundation',
  client: 'Naked Heart Foundation',
  role: 'Embedded Project Lead',
  year: '2014',
  services: ['Program Operations', 'Process Design', 'Intake Systems', 'Impact Tracking'],
  heroImage: '/assets/img/case-studies/_showcase/nakedheart.jpg',
  overview: 'Helped scale a repeatable model for building safe, inclusive playgrounds across Russian cities. Turned individual playground builds into a pipeline with standardized intake, approvals, and tracking.',

  heroContext: {
    client: 'Playgrounds were historically run as heroic one-off projects with no consistent process.',
    constraint: 'Without a pipeline, projects stalled between land approval, design, and construction.',
    result: 'A networked execution model that gave donors, leadership, and communities visibility into where each playground stood.',
  },

  heroMetrics: [
    { value: 'Multi-city', label: 'Rollout' },
    { value: 'Pipeline', label: 'Established' },
    { value: 'Predictable', label: 'Delivery' }
  ],

  executiveSnapshot: {
    headline: 'From one-off playgrounds to a scalable rollout pattern',
    keyOutcomes: [
      'Clear visibility from Proposed Site to Launched Playground',
      'Reduced idle time between project phases',
      'Standardized intake and evaluation process',
      'Repeatable reporting for donors and partners'
    ]
  },

  phasesMeta: [
    {
      key: 'diagnose',
      title: 'Diagnose',
      challenge:
        'We did not know why some playground projects moved quickly while others stalled for months.',
      outcome:
        'Mapped the end-to-end process and identified where blockers consistently appeared.'
    },
    {
      key: 'architect',
      title: 'Architect',
      challenge:
        'Each playground was managed differently with no shared framework.',
      outcome:
        'Designed a standardized intake form and status model that worked across all sites.'
    },
    {
      key: 'engineer',
      title: 'Engineer',
      challenge:
        'Tracking dozens of playgrounds in parallel required simple but reliable tooling.',
      outcome:
        'Built a Kanban-style tracker and weekly operating rhythm so blockers surfaced early.'
    },
    {
      key: 'enable',
      title: 'Enable',
      challenge:
        'Donors, leadership, and local communities needed to see progress without asking for updates.',
      outcome:
        'Created reporting packs and status views that gave stakeholders self-service visibility into the pipeline.'
    },
    {
      key: 'impact',
      title: 'Impact',
      challenge:
        'The foundation needed to show that these playgrounds changed daily life, not just produced photo opportunities.',
      outcome:
        'Tracking usage, geographic spread, and community stories showed a growing network of inclusive spaces, giving donors and partners confidence to fund additional sites and programming.'
    }
  ],

  patternGeneralization: {
    bestFitEnvironments:
      'Mission-driven organizations turning collective trauma or systemic neglect into visible, physical infrastructure that must endure for decades.',
    corePrimitives:
      'A data-backed site selection model, a structured project and donor pipeline, repeatable partner engagement patterns, and metrics that connect physical assets to lived community impact.',
    whatYouNeedReady:
      'A clear mission narrative, access to basic demographic and municipal data, at least one reliable implementation partner, and a commitment to treat infrastructure as a long-term social contract-not a one-off project.'
  },

  phases: {
    diagnose: {
      id: 'diagnose',
      title: 'Diagnose',
      duration: '4 weeks',
      description: 'The starting point was the visceral aftermath of Beslan. The insight was simple and hard: if violence can make a schoolyard unsafe forever, then a new kind of space must be built where safety and joy are unquestionably present.',
      points: [
        'Named Beslan explicitly as the emotional and moral catalyst',
        'Defined a mission statement around play as a right, not a luxury',
        'Framed playgrounds as long-lived public commitments: visible, physical proof',
        'Set early criteria: every project must be safe, inclusive, durable, and free to access'
      ],
      deliverables: ['Mission Framework', 'Site Criteria', 'Partnership Model'],
      metrics: [
        { value: '2004', label: 'Mission Origin' },
        { value: 'Play', label: 'Core Right' },
        { value: '100%', label: 'Free Access' }
      ]
    },
    architect: {
      id: 'architect',
      title: 'Architect',
      duration: '6 weeks',
      description: 'Turned a deeply human intention into an operational model that could scale beyond a single site or city.',
      points: [
        'Codified repeatable project pattern: assess → secure permissions → co-design → build',
        'Developed design principles for inclusive play: different ages, abilities, and sensory needs',
        'Established governance model where municipalities, NGOs, and Foundation each had clear roles',
        'Treated each playground as both a project and a prototype for future builds'
      ],
      deliverables: ['Operational Model', 'Design Principles', 'Governance Framework'],
      tools: [
        { label: 'Design', value: 'Inclusive Play Standards' },
        { label: 'Build', value: 'Safety-First Construction' },
        { label: 'Operate', value: 'Community Partnership' }
      ]
    },
    engineer: {
      id: 'engineer',
      title: 'Engineer',
      duration: '12 weeks',
      description: 'Execution meant moving from symbolic to practical: finding land, resolving permits, contracting builders, and shipping steel, rubber, and paint into places that often did not have modern play infrastructure.',
      points: [
        'Rolled out playground projects across multiple Russian cities and towns',
        'Standardized core elements while allowing local adaptation to culture and climate',
        'Built transparent timelines and status tracking for local partners',
        'Documented each site with before/after imagery and usage observations'
      ],
      deliverables: ['Playground Network', 'Documentation System', 'Partner Dashboard'],
      metrics: [
        { value: '100+', label: 'Sites Delivered' },
        { value: 'Multi-City', label: 'Footprint' },
        { value: '100%', label: 'Safety Compliant' }
      ]
    },
    enable: {
      id: 'enable',
      title: 'Enable',
      duration: '4 weeks',
      description: 'As the number of playgrounds grew, the work shifted from individual builds to stewarding a recognizable mission: turning the memory of a national tragedy into a pattern of local hope.',
      points: [
        'Tracked core indicators: sites delivered, geographic spread, children reached',
        'Gathered qualitative feedback from parents, teachers, and local officials',
        'Used photos, stories, and site profiles to communicate impact to donors',
        'Positioned playground network as platform for future programming'
      ],
      deliverables: ['Impact Dashboard', 'Donor Communications', 'Programming Framework']
    },
    impact: {
      id: 'impact',
      title: 'Impact',
      duration: 'Ongoing',
      description: 'The result: a distributed network of play spaces across Russian cities and towns, each one a quiet piece of social infrastructure that families can touch, climb, and trust.',
      points: [
        'Free, safe, inclusive playgrounds across multiple cities',
        'Thousands of children and families benefited',
        'Repeatable mission model established for future builds',
        'Platform created for events, inclusive play days, and community gatherings'
      ],
      metrics: [
        { value: '100+', label: 'Playgrounds' },
        { value: '1000s', label: 'Children Reached' },
        { value: 'Scalable', label: 'Mission Model' }
      ]
    }
  },

  challenge: {
    title: 'The Challenge',
    description: 'Children and families had nowhere to process grief, no safe public spaces to gather after the Beslan tragedy.',
    points: [
      'Public infrastructure was functional at best, hostile at worst',
      'Broken equipment and inaccessible layouts',
      'Nothing deliberately built for healing, inclusion, or play',
      'Need for visible proof that childhood still mattered'
    ]
  },

  approach: {
    title: 'The Approach',
    description: 'Build modern, safe, inclusive playgrounds as physical public promises.',
    points: [
      'Co-design with communities, municipalities, and partners',
      'Safety-first construction standards',
      'Inclusive design for all abilities',
      'Free access for all families'
    ]
  },

  solution: {
    title: 'The Solution',
    description: 'A repeatable mission model for building inclusive play spaces.',
    points: [
      'Assess community need',
      'Secure local permissions and co-funding',
      'Co-design with residents',
      'Build to modern safety and accessibility standards'
    ]
  },

  results: {
    title: 'Results',
    metrics: [
      { value: '100+', label: 'Playgrounds' },
      { value: '1000s', label: 'Children' },
      { value: 'Multi-City', label: 'Footprint' },
      { value: '100%', label: 'Inclusive' }
    ]
  },

  nextCaseStudy: {
    brand: 'Pfizer',
    title: 'AI Content Engine',
    href: '/case-study/pfizer'
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHART DATA - Inherits from Pfizer canonical charts
// ═══════════════════════════════════════════════════════════════════════════════

export const nakedHeartCharts: CaseStudyCharts = {
  ...pfizerCharts
};
