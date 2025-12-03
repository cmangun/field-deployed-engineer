// src/data/caseStudies/alinity.ts
// ═══════════════════════════════════════════════════════════════════════════════
// ABBOTT ALINITY CASE STUDY — NARRATIVE + CHART DATA
// GxP-Qualified AWS Data Platform for Global Diagnostics
// ═══════════════════════════════════════════════════════════════════════════════

import type { CaseStudyData, CaseStudyCharts } from '@/types/caseStudy';
import { pfizerCharts } from './pfizerData';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA (CaseStudyData)
// ═══════════════════════════════════════════════════════════════════════════════

export const abbottAlinityData: CaseStudyData = {
  slug: 'alinity',
  title: 'Abbott Alinity Systems',
  subtitle: 'GxP-Qualified AWS Diagnostic Platform',
  company: 'Abbott Labs',
  client: 'Abbott Diagnostics',
  role: 'Lead Cloud Architect',
  year: '2023',
  services: ['Edge Computing', 'Alerting Systems', 'Reliability Engineering', 'GxP Compliance'],
  heroImage: '/assets/img/home-06/project/alinity.jpg',
  overview: 'GxP-qualified AWS data platform powering 15B+ diagnostic tests a year with sub-minute analytics, zero data integrity incidents, and global mission reliability. Reduced complex query latency from 24 hours to seconds, supported 650+ concurrent users globally, cut infrastructure cost by ~79%, and maintained zero GxP findings across FDA and international audits.',

  heroContext: {
    client: 'Abbott Architect, Alinity, and Libre platforms were running on aging on-prem Oracle systems with 14-24 hour query times.',
    constraint: '15 billion diagnostic tests per year across 180+ countries under strict GxP and 21 CFR Part 11 oversight.',
    result: 'Harmonized three fragmented systems into cloud-native diagnostic backbone with near-real-time insight.'
  },

  heroMetrics: [
    { value: '15B+', label: 'Tests/Year' },
    { value: '~79%', label: 'Cost Reduction' },
    { value: '0', label: 'GxP Findings' }
  ],

  executiveSnapshot: {
    headline: 'Global diagnostic platform with zero integrity incidents',
    keyOutcomes: [
      'Query performance: 24 hrs → seconds',
      '~$12.7M annual cost reduction (~79%)',
      '15B+ tests/year supported',
      '0 audit findings, 0 integrity incidents'
    ]
  },

  phases: {
    diagnose: {
      id: 'diagnose',
      title: 'Diagnose',
      duration: '3 weeks',
      description: 'Framed Architect, Alinity, and Libre not as three databases to migrate, but as one diagnostic mission: 15B+ tests per year, 180+ countries, and no room for diagnostic drift.',
      points: [
        'Cataloged 850TB+ of Oracle workloads across Architect, Alinity, and Libre with a GxP impact lens',
        'Mapped end-to-end flows from instrument → LIS → data warehouse → downstream analytics',
        'Defined success in mission terms: sub-minute analytics, zero integrity incidents, zero audit findings',
        'Aligned stakeholders (platform engineering, clinical ops, data science, regulatory, security) around a single diagnostic data strategy'
      ],
      deliverables: ['GxP Impact Assessment', 'Data Flow Map', 'Success Criteria Document'],
      metrics: [
        { value: '850', suffix: 'TB+', label: 'Data Cataloged' },
        { value: '180+', label: 'Countries Served' },
        { value: '15B+', label: 'Annual Tests' }
      ]
    },
    architect: {
      id: 'architect',
      title: 'Architect',
      duration: '4 weeks',
      description: 'Architected a GxP-qualified AWS landing zone and data platform that treated compliance as a design constraint, not an afterthought.',
      points: [
        'Designed three-zone data lake (raw → curated → analytics-ready) on S3 with Parquet, partitioning, and Object Lock for ALCOA+ integrity',
        'Implemented dual-path query architecture: Athena for cohort analytics, Aurora + DynamoDB for sub-second lookups',
        'Established zero-trust access with Cognito, IAM, WAF, VPC endpoints, and role-based access control',
        'Mapped 21 CFR Part 11 and EU Annex 11 controls to AWS services and codified into landing-zone baseline'
      ],
      deliverables: ['AWS Landing Zone Design', 'Data Lake Architecture', 'Compliance Mapping'],
      tools: [
        { label: 'Cloud', value: 'AWS S3, Athena, Aurora' },
        { label: 'Security', value: 'Cognito, IAM, WAF' },
        { label: 'Compliance', value: '21 CFR Part 11, ALCOA+' }
      ]
    },
    engineer: {
      id: 'engineer',
      title: 'Engineer',
      duration: '12 weeks',
      description: 'Executed an 850TB Oracle-to-AWS migration using Snowball Edge, Treesitter-enhanced ETL, and a full GAMP 5 CSV approach.',
      points: [
        'Used multiple Snowball Edge devices to move 850TB+ with SHA-256 checksums and chain-of-custody logging',
        'Built Treesitter-backed ETL pipelines in AWS Glue to validate JSON/XML structures and normalize schemas',
        'Harmonized test schemas into single analytics-ready schema with deterministic hashes and ISO8601 temporal standards',
        'Completed IQ/OQ/PQ validation with 450+ test cases, 30-day parallel runs, and 99.97% result agreement'
      ],
      deliverables: ['Migration Execution', 'ETL Pipeline', 'Validation Report'],
      metrics: [
        { value: '850', suffix: 'TB', label: 'Data Migrated' },
        { value: '450+', label: 'Test Cases' },
        { value: '99.97%', label: 'Result Agreement' }
      ]
    },
    enable: {
      id: 'enable',
      title: 'Enable',
      duration: '4 weeks',
      description: 'Delivered a React-based experience and monitoring stack that turned the cloud migration into visible mission outcomes for clinicians, scientists, and regulators.',
      points: [
        'Shipped React-based, composable query and visualization layer for SQL-free analysis',
        'Achieved 1,440×+ performance improvement (24-hour queries reduced to <60 seconds)',
        'Supported 650+ concurrent users with 99.97% uptime',
        'Built real-time dashboards for latency, pipeline health, and GxP compliance states'
      ],
      deliverables: ['Query Interface', 'Monitoring Dashboard', 'User Training']
    },
    impact: {
      id: 'impact',
      title: 'Impact',
      duration: 'Ongoing',
      description: 'The platform passed all regulatory audits with zero findings and now serves as the foundation for Abbott global diagnostics.',
      points: [
        'Passed FDA PAI, EU GMP Annex 11, and global audits with zero findings',
        'Zero data integrity incidents since launch',
        '~$12.7M annual cost reduction (~79% vs on-prem Oracle)',
        '650+ concurrent users with sub-second diagnostic lookups'
      ],
      metrics: [
        { value: '0', label: 'Audit Findings' },
        { value: '$12.7M', label: 'Annual Savings' },
        { value: '1440×', label: 'Query Speedup' }
      ]
    }
  },

  challenge: {
    title: 'The Challenge',
    description: 'Abbott Architect, Alinity, and Libre platforms were running on aging on-prem Oracle systems.',
    points: [
      'Complex queries taking 14-24 hours',
      '850TB+ of data across fragmented systems',
      'Strict GxP and 21 CFR Part 11 oversight',
      '15 billion tests per year across 180+ countries'
    ]
  },

  approach: {
    title: 'The Approach',
    description: 'Architected a GxP-qualified AWS landing zone treating compliance as a design constraint.',
    points: [
      'Three-zone data lake with ALCOA+ integrity',
      'Dual-path query architecture for analytics and lookups',
      'Zero-trust security model',
      'Full GAMP 5 CSV validation approach'
    ]
  },

  solution: {
    title: 'The Solution',
    description: 'Delivered a cloud-native diagnostic backbone with near-real-time insight.',
    points: [
      '850TB migration via Snowball Edge',
      'Treesitter-backed ETL for schema validation',
      'React-based query interface',
      'Real-time compliance monitoring'
    ]
  },

  results: {
    title: 'Results',
    metrics: [
      { value: '<60s', label: 'Query Time' },
      { value: '~79%', label: 'Cost Reduction' },
      { value: '0', label: 'Audit Findings' },
      { value: '650+', label: 'Concurrent Users' }
    ]
  },

  nextCaseStudy: {
    brand: 'BinaxNOW',
    title: 'Rapid Antigen Testing',
    href: '/case-study/binaxnow'
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHART DATA — Inherits from Pfizer canonical charts
// ═══════════════════════════════════════════════════════════════════════════════

export const abbottAlinityCharts: CaseStudyCharts = {
  ...pfizerCharts
};
