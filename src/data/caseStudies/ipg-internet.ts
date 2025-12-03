// src/data/caseStudies/ipgIntranetData.ts
// ═══════════════════════════════════════════════════════════════════════════════
// IPG HEALTH — AREA 23 + PROHEALTH
// Searchable SharePoint on Azure Intranet
// Single Source of Truth for Global Drug Launches
// ═══════════════════════════════════════════════════════════════════════════════

import type { CaseStudyData, CaseStudyCharts } from '@/types/caseStudy';
import { chartColors } from '@/charts_D3/colors';
import { pfizerCharts } from '@/data/caseStudies/pfizerData';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA
// ═══════════════════════════════════════════════════════════════════════════════

export const ipgIntranetData: CaseStudyData = {
  slug: 'ipg-searchable-intranet',
  brandLogo: '/assets/img/logo/IPG-white.png',
  title: 'IPG – Multi-Agency System Unification',
  subtitle: 'Enterprise Architecture',
  company: 'IPG Health',
  client: 'ProHealth, Area 23, and network agencies',
  role: 'Lead Architect & Forward Deployed Engineer',
  year: '2022',
  services: [
    'Multi-Tenant Architecture',
    'Content Supply Chain',
    'Identity & Routing',
    'Asset Lifecycle',
    'MLR Integration',
  ],
  heroImage: '/assets/img/home-06/project/publicis.jpg',

  overview:
    'Unified 14 agency systems into a governed content supply chain while preserving local autonomy and creative velocity. One governed backbone, many distinct agencies.',

  heroContext: {
    client:
      'IPG Health wanted a single supply chain for regulated content across 14 agencies without flattening their differences.',
    mandate:
      'Standardize identity, routing, and approval states while each agency keeps its own brands, teams, and nuanced workflows.',
    surface:
      'Multi-tenant platform with unified SSO, standardized asset states from Idea through MLR to Deployed.',
  },

  heroMetrics: [
    {
      label: 'Agencies Unified',
      value: '14',
      caption: 'Supported on a single content backbone.',
      color: chartColors.blue,
    },
    {
      label: 'Onboarding Time',
      value: '-30%',
      caption: 'Reduction in new team ramp-up.',
      color: chartColors.teal,
    },
    {
      label: 'Identity',
      value: 'Unified SSO',
      caption: 'Across the network.',
      color: chartColors.purple,
    },
    {
      label: 'Asset States',
      value: 'Standardized',
      caption: 'Idea → MLR → Deployed.',
      color: chartColors.orange,
    },
  ],

  executiveSnapshot: {
    headline:
      'Created a multi-tenant content backbone that unified 14 agencies while preserving local autonomy.',
    bullets: [
      'Architected multi-tenant platform with standardized identity and routing.',
      'Harmonized taxonomies and asset lifecycles across all agencies.',
      'Enabled concept handoff across agency boundaries with preserved MLR context.',
      'Built portfolio planning views for network leadership.',
    ],
  },

  executiveSummary: {
    client: 'IPG Health — Area 23 + ProHealth',
    context:
      'Hybrid creative, medical, and strategy teams coordinating global drug launches for 20+ brands simultaneously.',
    primaryConstraint:
      'Documents lived in fragmented storage—local drives, Teams, email threads, legacy portals—resulting in search failure and duplicate execution.',
    primaryProblem:
      'Teams couldn’t find the most current document versions, causing delays in global launch prep and rework under tight regulatory timelines.',
    solutionPattern:
      'An Azure-hosted SharePoint intranet with standardized taxonomies, universal metadata, and enriched enterprise search.',
    scope:
      'SharePoint Online, Azure Cognitive Search, Microsoft Graph connectors, taxonomy migration, metadata governance, SSO & permissions, and search relevance tuning.',
    engagementRole:
      'Forward Deployed Engineer embedded directly with Area 23 + ProHealth program leads, IT, and PMO.',
    impact: {
      cycleTime:
        '28% faster launch doc prep; 42% decrease in duplicate work identified in the first quarter.',
      throughput:
        '14,000+ documents indexed with P95 search latency under 200ms.',
      cost:
        'Leveraged existing Microsoft licenses for near-zero net-new spend—maximizing ROI of O365/Azure commitments.',
      risk:
        'Reduced launch risk by establishing authoritative document ownership and version lineage across global teams.',
    },
  },

  phasesMeta: [
    {
      key: 'diagnose',
      title: 'Diagnose',
      challenge:
        'Teams didn’t know where documents lived, which version was final, or how to retrieve work from prior launches.',
      outcome:
        'Mapped the full “document lifecycle” and proved search failure—not capacity—was the bottleneck.',
    },
    {
      key: 'architect',
      title: 'Architect',
      challenge:
        'Needed an architecture that fused SharePoint, Azure Cognitive Search, and Microsoft Graph while respecting agency-specific permissions.',
      outcome:
        'Defined a metadata-first, Azure-based search backbone with deep SharePoint integration and portable taxonomies.',
    },
    {
      key: 'engineer',
      title: 'Engineer',
      challenge:
        'Legacy content was inconsistent, unstructured, and poorly tagged—blocking any chance of relevance.',
      outcome:
        'Built ingestion pipelines, enrichment processes, version normalization, and a clean authoritative hierarchy.',
    },
    {
      key: 'enable',
      title: 'Enable',
      challenge:
        'Adoption would fail unless strategy, creative, and medical teams could immediately find what they needed.',
      outcome:
        'Created role-based search templates, UX patterns, and onboarding pathways that made search feel immediate.',
    },
    {
      key: 'impact',
      title: 'Impact',
      challenge:
        'Leadership needed proof the intranet actually accelerated launches and reduced work duplication.',
      outcome:
        'Search telemetry, version lineage checks, and cycle-time dashboards demonstrated measurable velocity gains.',
    },
  ],

  patternGeneralization: {
    bestFitEnvironments:
      'Distributed creative + medical teams working across fast-moving, globally coordinated drug launches.',
    corePrimitives:
      'Azure Cognitive Search, SharePoint Online, Microsoft Graph connectors, standardized metadata + taxonomies.',
    whatYouNeedReady:
      'Agreement on authoritative document systems, ownership rules, metadata fields, and governance maturity.',
  },

  phases: {
    diagnose: {
      id: 'diagnose',
      title: 'Diagnose: Map the Fragmentation',
      duration: '3–4 weeks',
      description:
        'Conducted interviews and system mapping to understand how documents flowed across Area 23 and ProHealth—from pitch to launch to maintenance.',
      points: [
        'Indexed every legacy storage location (Teams, SharePoint, email archives, local drives).',
        'Mapped the creative/medical/regulatory document lifecycle.',
        'Measured search failure: 61% of queries returned irrelevant or outdated content.',
        'Identified duplicative documents and version conflicts.',
      ],
      deliverables: [
        'Document lifecycle map',
        'Search failure baseline',
        'Taxonomy gap analysis',
      ],
      tools: [
        { label: 'O365', value: 'SharePoint Online + Teams' },
        { label: 'Azure', value: 'Azure AD, Cognitive Search' },
        { label: 'Analytics', value: 'Search logs, metadata sampling' },
      ],
    },

    architect: {
      id: 'architect',
      title: 'Architect: Azure-Backed SharePoint Intranet',
      duration: '3 weeks',
      description:
        'Designed a unified architecture connecting SharePoint, Graph connectors, and Azure Cognitive Search—anchored by a universal metadata schema.',
      points: [
        'C4 system diagrams covering SharePoint, Graph API, Azure Search, and indexing pipelines.',
        'Taxonomy standardization for brand, stage, audience, regulatory status, and asset class.',
        'Search UX design for brand teams, medical writers, editors, strategists, and PMs.',
        'Defined SLOs for search latency, indexing cadence, and version accuracy.',
      ],
      deliverables: [
        'Unified intranet architecture',
        'Metadata + taxonomy blueprint',
        'Search UX patterns + templates',
      ],
      tools: [
        { label: 'Azure', value: 'Cognitive Search, App Service' },
        { label: 'Graph', value: 'Microsoft Graph Connectors' },
        { label: 'Identity', value: 'Azure AD SSO' },
      ],
    },

    engineer: {
      id: 'engineer',
      title: 'Engineer: Indexing, Enrichment & Normalization',
      duration: '6–8 weeks',
      description:
        'Implemented ingestion pipelines, enrichment logic, permission-syncing, and version lineage systems.',
      points: [
        'Bulk migration of documents from legacy storage + normalization of naming conventions.',
        'Automated tagging pipelines using metadata heuristics + Azure OCR for PDFs.',
        'Index refresh workflows for incremental updates with P95 under 200ms search latency.',
        'Version lineage + authoritative “single source” enforcement for launches.',
      ],
      deliverables: [
        'Production ingestion + enrichment pipelines',
        'Indexing jobs + search relevance tuning reports',
        'Version lineage + governance schema',
      ],
      tools: [
        { label: 'Search', value: 'Azure Cognitive Search' },
        { label: 'Graph', value: 'SharePoint API + Graph API' },
        { label: 'Enrichment', value: 'Azure Functions OCR + metadata logic' },
      ],
    },

    enable: {
      id: 'enable',
      title: 'Enable: Adoption, Training & Templates',
      duration: '4 weeks',
      description:
        'Transformed the intranet into an everyday productivity tool for global launch teams.',
      points: [
        'Role-based search templates for PM, Creative, Editing, Medical, Regulatory.',
        'Launch playbooks tied directly to the intranet’s single source of truth.',
        'Training program: “Find anything in 30 seconds.”',
        'Dashboards to track document health, duplicates eliminated, and search quality.',
      ],
      deliverables: [
        'Search templates',
        'Launch playbooks',
        'Training curriculum + onboarding pathways',
      ],
      tools: [
        { label: 'O365', value: 'SharePoint + Teams' },
        { label: 'Analytics', value: 'Search telemetry dashboards' },
      ],
    },

    impact: {
      id: 'impact',
      title: 'Impact: Faster Launches, Zero Duplication, True SSoT',
      duration: 'Ongoing',
      description:
        'Measured operational and creative velocity improvements after consolidation into the Azure intranet.',
      points: [
        '28% faster global launch documentation cycles.',
        '3.4 hours/week reclaimed for PMs after metadata + search optimization.',
        '14,000+ documents indexed with 92% relevance.',
        'Eliminated 1,900+ redundant legacy documents within the first quarter.',
      ],
      deliverables: [
        'Search accuracy dashboards',
        'Launch cycle-time reporting',
        'Governance enforcement + quarterly audits',
      ],
      tools: [
        { label: 'Search', value: 'Azure Cognitive Search' },
        { label: 'Analytics', value: 'PowerBI dashboards' },
        { label: 'Ops', value: 'Automated governance enforcement' },
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHART DATA — Reuse pfizer charts for now
// Customize series later as needed
// ═══════════════════════════════════════════════════════════════════════════════

export const ipgIntranetCharts: CaseStudyCharts = {
  ...pfizerCharts,
};

// Unified export
export const ipgIntranetConfig = {
  slug: ipgIntranetData.slug,
  study: ipgIntranetData,
  charts: ipgIntranetCharts,
};