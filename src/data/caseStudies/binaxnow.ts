// src/data/caseStudies/binaxnow.ts
// ═══════════════════════════════════════════════════════════════════════════════
// ABBOTT BINAXNOW CASE STUDY — NARRATIVE + CHART DATA
// Rapid Antigen Assay for Decentralized Diagnostics
// ═══════════════════════════════════════════════════════════════════════════════

import type { CaseStudyData, CaseStudyCharts } from '@/types/caseStudy';
import { pfizerCharts } from './pfizerData';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA (CaseStudyData)
// ═══════════════════════════════════════════════════════════════════════════════

export const binaxNowData: CaseStudyData = {
  slug: 'binaxnow',
  brandLogo: '/assets/img/logo/Binax.png',
  title: 'Abbott – BinaxNOW Evaluation Backbone',
  subtitle: 'Diagnostic Evaluation Infrastructure',
  company: 'Abbott Labs',
  client: 'Abbott Diagnostics',
  role: 'Technical Program Lead',
  year: '2021',
  services: ['Evaluation Design', 'Data QA', 'Regulatory Compliance', 'Clinical Operations'],
  heroImage: '/assets/img/case-studies/_showcase/BInaxNow.jpg',
  overview: 'Built a controlled evaluation dataset and process so BinaxNOW performance claims could withstand regulatory and clinical scrutiny. Harmonized runs, conditions, and outcomes into a dataset that regulators and clinicians could trust.',

  heroContext: {
    client: 'Abbott needed proof—not slides—that low-cost rapid tests behaved consistently across lots, sites, and conditions.',
    constraint: 'Data lived in different systems and formats, making it hard to prove stability or trace specific anomalies.',
    result: 'A structured evaluation backbone that aligned lab, field, and manufacturing inputs to a single evaluation schema.',
  },

  heroMetrics: [
    { value: 'Multi-lot', label: 'Coverage' },
    { value: 'Multi-site', label: 'Validation' },
    { value: 'FDA', label: 'Ready' }
  ],

  executiveSnapshot: {
    headline: 'Evaluation as infrastructure, not afterthought',
    keyOutcomes: [
      'Harmonized lab and field evaluation schema',
      'Consistent metadata for environment and handling',
      'Regulatory-ready summary views',
      'Performance stability proven across conditions'
    ]
  },

  phasesMeta: [
    {
      key: 'diagnose',
      title: 'Diagnose',
      challenge:
        'We did not have a single view of how BinaxNOW performed across lots, sites, and storage conditions.',
      outcome:
        'Mapped all evaluation touchpoints and defined a harmonized schema so each run became a structured, comparable record.'
    },
    {
      key: 'architect',
      title: 'Architect',
      challenge:
        'We needed evaluation infrastructure that could handle ongoing runs without manual reconciliation.',
      outcome:
        'Designed ingestion and QC procedures that normalized data on arrival and flagged anomalies automatically.'
    },
    {
      key: 'engineer',
      title: 'Engineer',
      challenge:
        'Clinical and regulatory teams needed confidence in the data without rebuilding reports each time.',
      outcome:
        'Built regulatory-ready summary views showing sensitivity/specificity by lot and condition, with drill-down for investigations.'
    },
    {
      key: 'enable',
      title: 'Enable',
      challenge:
        'The evaluation backbone needed to be usable by clinical affairs, not just data engineers.',
      outcome:
        'Delivered training and documentation so teams could run evaluations and generate submission-ready outputs independently.'
    },
    {
      key: 'impact',
      title: 'Impact',
      challenge:
        'We needed to show that decentralized rapid tests actually changed behavior and transmission, not just shipped units.',
      outcome:
        '15-minute result windows enabled on-site isolation decisions in schools, workplaces, and community sites, with tens of millions of tests/month distributed nationally.'
    }
  ],

  patternGeneralization: {
    bestFitEnvironments:
      'Public-health crises where centralized lab capacity is the bottleneck and time-to-result directly impacts transmission and behavior.',
    corePrimitives:
      'Reusable assay platform (LFIA), existing high-volume manufacturing lines, simple sample collection, instrument-free readout, and clear EUA/IVD regulatory pathway.',
    whatYouNeedReady:
      'Prior infectious-disease assay IP, established quality systems, regulatory relationships, and a distribution network that can move diagnostics through retail and public-health channels.'
  },

  phases: {
    diagnose: {
      id: 'diagnose',
      title: 'Diagnose',
      duration: '2 weeks',
      description: 'BinaxNOW roots extend decades before COVID-19. Alere, acquired by Abbott in 2017, had built a broad portfolio of lateral-flow rapid diagnostics. The Binax brand was known for rugged, field-ready tests.',
      points: [
        'Leveraged Alere LFIA intellectual property—antibody immobilization, gold nanoparticle labels, nitrocellulose strip engineering',
        'Reused existing manufacturing lines for rapid antigen cards, accelerating pandemic deployment',
        'Positioned LFIA as the fastest route to decentralized SARS-CoV-2 detection',
        'Mapped pre-existing infectious-disease assay design patterns to COVID nucleocapsid antigen'
      ],
      deliverables: ['Platform Assessment', 'Manufacturing Feasibility', 'Regulatory Pathway'],
      metrics: [
        { value: '2017', label: 'Alere Acquisition' },
        { value: 'LFIA', label: 'Core Platform' },
        { value: 'N-Protein', label: 'Detection Target' }
      ]
    },
    architect: {
      id: 'architect',
      title: 'Architect',
      duration: '4 weeks',
      description: 'BinaxNOW operates on the same physics as home pregnancy tests: capillary-driven antigen binding on a nitrocellulose strip, with visible lines indicating the presence of SARS-CoV-2 N protein.',
      points: [
        'Sample collected from anterior nasal swab; antigen released using extraction buffer',
        'Sample wicks along strip via capillary action—no electricity or instrumentation required',
        'If viral N protein present, it binds to anti-N antibodies labeled with gold nanoparticles',
        'Accumulation on test line triggers visible color change; control line confirms assay validity'
      ],
      deliverables: ['Assay Design', 'Manufacturing Spec', 'Quality Protocol'],
      tools: [
        { label: 'Platform', value: 'Lateral Flow Immunoassay' },
        { label: 'Detection', value: 'Gold Nanoparticle Labels' },
        { label: 'Format', value: 'Card-Based, Visual Read' }
      ]
    },
    engineer: {
      id: 'engineer',
      title: 'Engineer',
      duration: '8 weeks',
      description: 'Demand surged beyond traditional diagnostics volumes, requiring rapid scale-up of U.S. manufacturing plants to tens of millions of tests per month.',
      points: [
        'Scaled to tens of millions of tests per month within months of launch',
        'Implemented multi-site production to mitigate supply chain fragility',
        'Standardized card-based assembly to support mass printing, lamination, and packaging',
        'Aligned distribution with federal programs delivering free tests to schools and community centers'
      ],
      deliverables: ['Manufacturing Scale-Up', 'Quality Assurance', 'Distribution Network'],
      metrics: [
        { value: 'M+', label: 'Tests/Month' },
        { value: 'Multi-Site', label: 'Production' },
        { value: 'National', label: 'Distribution' }
      ]
    },
    enable: {
      id: 'enable',
      title: 'Enable',
      duration: '4 weeks',
      description: 'BinaxNOW received its initial EUA in August 2020 for point-of-care professional use. On March 31, 2021, a pivotal shift occurred: the test was authorized for OTC, at-home use.',
      points: [
        'OTC authorization required redesigned instructions, human-factor testing, and usability validation',
        'Retail distribution expanded: CVS, Walgreens, Walmart, and national chains',
        'Packaging and workflow optimized for non-clinical household use',
        'Positioned the product as daily screening infrastructure for workplaces, schools, and events'
      ],
      deliverables: ['OTC Package Design', 'Usability Validation', 'Retail Distribution']
    },
    impact: {
      id: 'impact',
      title: 'Impact',
      duration: 'Ongoing',
      description: 'BinaxNOW became part of Abbott broader COVID diagnostics stack, serving a critical role in decentralized, rapid testing infrastructure.',
      points: [
        'BinaxNOW: LFIA antigen, no machine, visually read, lowest cost, OTC-enabled',
        'ID NOW: rapid molecular NAAT on a small instrument, ~15-minute RNA detection',
        'Alinity m: high-throughput molecular PCR/NAAT for centralized labs (115+ results/hr)',
        'Three products served different strata of the diagnostics pyramid: home → clinic → hospital'
      ],
      metrics: [
        { value: '~87%', label: 'Symptomatic Sensitivity' },
        { value: '15', suffix: 'min', label: 'Time to Result' },
        { value: 'OTC', label: 'Authorization' }
      ]
    }
  },

  challenge: {
    title: 'The Challenge',
    description: 'Centralized PCR testing could not scale to meet the volume, speed, and accessibility required during early SARS-CoV-2 waves.',
    points: [
      'PCR labs were overwhelmed; turnaround times ballooned from hours to days',
      'Communities needed low-cost, instrument-free, 15-minute tests',
      'Tests needed to work in schools, workplaces, and homes',
      'Rapid manufacturing scale-up required'
    ]
  },

  approach: {
    title: 'The Approach',
    description: 'Leveraged Alere LFIA platform for rapid antigen detection.',
    points: [
      'Adapted existing lateral-flow immunoassay technology',
      'Targeted SARS-CoV-2 nucleocapsid protein',
      'Designed for visual reading without instrumentation',
      'Optimized for mass manufacturing'
    ]
  },

  solution: {
    title: 'The Solution',
    description: 'Delivered a 15-minute, at-home antigen test at national scale.',
    points: [
      'Card-based, instrument-free format',
      'OTC EUA for at-home self-testing',
      'Tens of millions manufactured per month',
      'National retail distribution'
    ]
  },

  results: {
    title: 'Results',
    metrics: [
      { value: '15min', label: 'Time to Result' },
      { value: 'M+/mo', label: 'Manufacturing Scale' },
      { value: 'OTC EUA', label: 'Authorization' },
      { value: '~87%', label: 'Sensitivity' }
    ]
  },

  nextCaseStudy: {
    brand: 'Eli Lilly',
    title: 'MLR Sandbox',
    href: '/case-study/lilly'
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHART DATA — Inherits from Pfizer canonical charts
// ═══════════════════════════════════════════════════════════════════════════════

export const binaxNowCharts: CaseStudyCharts = {
  ...pfizerCharts
};
