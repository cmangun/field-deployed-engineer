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
  title: 'Abbott BinaxNOW',
  subtitle: 'Rapid Antigen Testing at Scale',
  company: 'Abbott Labs',
  client: 'Abbott Diagnostics',
  role: 'Technical Program Lead',
  year: '2022',
  services: ['Data QA', 'FDA Compliance', 'Evaluation Design', 'Manufacturing Scale'],
  heroImage: '/assets/img/case-studies/_showcase/BInaxNow.jpg',
  overview: 'In August 2020, Abbott launched the BinaxNOW COVID-19 Antigen Card. Within months it became one of the most widely used rapid antigen tests in the U.S. By March 2021, it secured OTC EUA for self-testing—shifting diagnostics from hospitals to households. Manufactured at tens of millions of units per month, BinaxNOW democratized access to testing, enabling real-time isolation decisions and reducing transmission risk nationwide.',

  heroContext: {
    client: 'The U.S. faced a diagnostics bottleneck - centralized PCR testing could not scale to meet the volume, speed, and accessibility required during early SARS-CoV-2 waves.',
    constraint: 'Communities needed a low-cost, instrument-free, 15-minute test that could work in schools, workplaces, and homes.',
    result: 'Abbott adapted its LFIA lineage to detect the virus nucleocapsid protein, enabling mass manufacturing at unprecedented speed and scale.'
  },

  heroMetrics: [
    { value: '15', suffix: 'min', label: 'Time to Result' },
    { value: 'M+', label: 'Tests/Month' },
    { value: 'OTC', label: 'EUA Approved' }
  ],

  executiveSnapshot: {
    headline: 'Democratized diagnostics at pandemic scale',
    keyOutcomes: [
      '15-minute results enabling immediate isolation decisions',
      'Tens of millions of tests manufactured per month',
      'OTC EUA achieved March 2021',
      'National distribution through CVS, Walgreens, Walmart'
    ]
  },

  phasesMeta: [
    {
      key: 'diagnose',
      title: 'Diagnose',
      challenge:
        'The U.S. was trapped in a lab-based PCR bottleneck; we did not know whether the right lever was assay chemistry, instrumentation, or distribution.',
      outcome:
        'Assessment revealed that the fastest safe path was not a new platform, but re-using the Binax LFIA lineage and existing manufacturing capacity for SARS-CoV-2.'
    },
    {
      key: 'architect',
      title: 'Architect',
      challenge:
        'We needed an assay that could run instrument-free, be interpretable by non-clinicians, and still meet FDA performance thresholds.',
      outcome:
        'Designed a lateral-flow architecture: nasal swab sample, extraction buffer, capillary strip, gold-labeled anti-N antibodies, and visual test/control lines suitable for home and point-of-care use.'
    },
    {
      key: 'engineer',
      title: 'Engineer',
      challenge:
        'Engineering had to compress years of assay optimization into months without compromising specificity or manufacturability.',
      outcome:
        'Iterated on antibody pairs, strip geometry, and buffer chemistry; locked a design that met sensitivity/specificity targets and could run on existing high-volume lines.'
    },
    {
      key: 'enable',
      title: 'Enable',
      challenge:
        'Even the best assay would fail if end-users mis-swabbed, mis-timed, or mis-read the card, or if regulators could not trust the data.',
      outcome:
        'Delivered clear IFU, training material, and EUA submission packages; aligned with public-health agencies and retailers on correct use and reporting flows.'
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
