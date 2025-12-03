// src/data/caseStudies/nhf.ts
// ═══════════════════════════════════════════════════════════════════════════════
// NAKED HEART FOUNDATION CASE STUDY — NARRATIVE + CHART DATA
// Mission-Embedded Non-Profit: From Trauma to Social Infrastructure
// ═══════════════════════════════════════════════════════════════════════════════

import type { CaseStudyData, CaseStudyCharts } from '@/types/caseStudy';
import { pfizerCharts } from './pfizerData';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA (CaseStudyData)
// ═══════════════════════════════════════════════════════════════════════════════

export const nakedHeartFoundationData: CaseStudyData = {
  slug: 'nakedheart',
  title: 'Naked Heart Foundation',
  subtitle: 'Inclusive Playground Network',
  company: 'Naked Heart Foundation',
  client: 'Naked Heart Foundation',
  role: 'Digital Platform Architect',
  year: '2022',
  services: ['Data Platform', 'Analytics', 'Donor Operations', 'Impact Measurement'],
  heroImage: '/assets/img/case-studies/_showcase/nakedheart.jpg',
  overview: 'Built a data and recommendations platform supporting early-childhood programs and donor transparency. Delivered a distributed network of inclusive play spaces across Russian cities and towns, each one a piece of social infrastructure that families can touch, climb, and trust.',

  heroContext: {
    client: 'In 2004, the Beslan school tragedy exposed not only a crisis of security, but a deeper wound: children and families with nowhere to process grief, no safe public spaces.',
    constraint: 'Public infrastructure in many cities was functional at best—broken equipment, inaccessible layouts, and nothing deliberately built for healing, inclusion, or play.',
    result: 'Modern, safe, inclusive playgrounds as a public promise that childhood still mattered—co-designed with communities, municipalities, and partners.'
  },

  heroMetrics: [
    { value: '100+', label: 'Playgrounds Built' },
    { value: '1000s', label: 'Children Reached' },
    { value: '100%', label: 'Inclusive Access' }
  ],

  executiveSnapshot: {
    headline: 'Turning grief into tangible spaces for play and community repair',
    keyOutcomes: [
      'Free, safe, inclusive playgrounds across Russia',
      'Thousands of children and families benefited',
      'Repeatable mission model established',
      'Platform for future programming created'
    ]
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
// CHART DATA — Inherits from Pfizer canonical charts
// ═══════════════════════════════════════════════════════════════════════════════

export const nakedHeartCharts: CaseStudyCharts = {
  ...pfizerCharts
};
