// src/data/caseStudies/medtronicData.ts
// ═══════════════════════════════════════════════════════════════════════════════
// MEDTRONIC CASE STUDY - NARRATIVE + CHART DATA
// LLM-Centered Architecture for Clinical Decision Support
// ═══════════════════════════════════════════════════════════════════════════════

import type { 
    CaseStudyData, 
    CaseStudyCharts,
    FunnelDataPoint,
    RaciMatrixData,
    SystemContextData,
    GanttTask,
    ServiceHealthData,
    JourneyMapData,
    WaterfallDataPoint,
    UnitEconomicsData
} from '@/types/caseStudy';
import { chartColors } from '@/charts_D3/colors';

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE DATA (CaseStudyData)
// ═══════════════════════════════════════════════════════════════════════════════

export const medtronicData: CaseStudyData = {
    slug: 'medtronic',
    brandLogo: '/assets/img/logo/images.jpg',
    title: 'Medtronic Clinical AI',
    subtitle: 'LLM-Centered Decision Support',
    company: 'Medtronic',
    client: 'Medtronic Surgical Innovation',
    role: 'Lead AI/ML Architect',
    year: '2024',
    services: ['LLM Architecture', 'Clinical AI', 'Security Design', 'Evaluation Systems'],
    heroImage: '/assets/img/home-06/project/medtronic.jpg',
    overview:
        'Led architecture for an LLM-driven decision-support system within regulated clinical workflows. ' +
        'Integrated secure context windows and evaluation layers for clinical-grade reliability with 99.2% accuracy.',

    heroContext: {
        client: 'Global medtech leader building next-generation surgical decision-support.',
        constraint:
            'Clinical decisions must run under FDA SaMD and HIPAA constraints with strict latency, auditability, and safety - ' +
            'legacy systems could not host LLM context windows or expose reliable confidence signals to clinicians.',
        result:
            'Defined and implemented an LLM-centered architecture that achieved 99.2% evaluated accuracy, ~40% faster decisions, ' +
            'and a fully traceable audit trail aligned with 21 CFR Part 11 and Medtronic\'s internal SaMD standards.'
    },

    heroMetrics: [
        { label: 'Decision Accuracy', value: '96% → 99.2%', delta: '+3.2 pts' },
        { label: 'Decision Time', value: '10 min → 6 min', delta: '-40%' },
        { label: 'Security Incidents', value: '0', delta: 'across pilot period' },
        { label: 'Systems Integrated', value: '3', delta: 'EHR, imaging, device telemetry' }
    ],

    executiveSnapshot: {
        headline: '99.2% clinical decision-support accuracy, SaMD-ready architecture',
        keyOutcomes: [
            '99.2% evaluated accuracy on curated clinical scenarios (vs ~96% baseline tooling)',
            '≈40% faster time-to-decision in pilot workflows',
            'Zero security incidents or privacy breaches during evaluation and pilot',
            'Audit trail and logging aligned with FDA 21 CFR Part 11 and internal SaMD standards'
        ]
    },

    phasesMeta: [
        {
            key: 'diagnose',
            title: 'Diagnose',
            challenge:
                'Clinical teams blamed "slow AI" or "immature models", but it was unclear whether the binding constraint was model quality, infrastructure, or regulation.',
            outcome:
                'Discovery showed that legacy systems could not support LLM context windows, there was no accepted safety envelope for AI suggestions, ' +
                'and clinicians lacked calibrated confidence metrics - governance and infrastructure, not modeling, were the primary blockers.'
        },
        {
            key: 'architect',
            title: 'Architect',
            challenge:
                'We needed an LLM-centered architecture that could plug into EHR/imaging systems, operate under SaMD and HIPAA rules, and still respond within sub-second latency in the OR.',
            outcome:
                'Defined a layered architecture: guarded context builder, air-gapped LLM gateway, evaluation harness with golden sets, and an audit/logging layer, ' +
                'with explicit degraded modes when signals or models were unavailable.'
        },
        {
            key: 'engineer',
            title: 'Engineer',
            challenge:
                'We had to integrate with existing clinical systems without downtime, build evaluation at the same time as inference, and prove reliability under real usage, not just offline tests.',
            outcome:
                'Implemented encrypted context management, streaming-safe APIs, evaluation pipelines tied to curated clinical scenarios, and service health dashboards exposing latency, error rates, and confidence stability.'
        },
        {
            key: 'enable',
            title: 'Enable',
            challenge:
                'Surgeons and risk officers were skeptical of black-box outputs and worried about liability if an AI suggestion was wrong or over-trusted.',
            outcome:
                'Piloted in restricted workflows with human-in-the-loop confirmation, explicit labeling of AI suggestions, and training on confidence interpretation and escalation procedures, ' +
                'building trust without shifting final responsibility away from clinicians.'
        },
        {
            key: 'impact',
            title: 'Impact',
            challenge:
                'We needed to demonstrate that the system actually reduced cognitive load and time-to-decision without introducing new safety incidents or regulatory risk.',
            outcome:
                'Pilot metrics showed 99.2% evaluated accuracy on curated scenarios, ~40% faster time-to-decision, zero security incidents, and a clear path for SaMD-grade validation and broader rollout.'
        }
    ],

    patternGeneralization: {
        bestFitEnvironments:
            'Real-time clinical decision-support and surgical guidance where AI suggestions must be fast, auditable, and bounded by safety envelopes.',
        corePrimitives:
            'Guarded context builder, air-gapped LLM gateway with policy-as-code, evaluation harness with golden clinical sets, ' +
            'real-time observability over latency and confidence, and explicit degraded modes when AI is unavailable.',
        whatYouNeedReady:
            'Defined clinical workflows, de-identified historical cases for evaluation, alignment with clinical risk and regulatory teams, ' +
            'and infrastructure teams willing to host LLM components inside existing HIPAA/SaMD security zones.'
    },

    phases: {
        diagnose: {
            id: 'diagnose',
            title: 'Diagnose',
            duration: '3 weeks',
            description:
                'Assessment revealed legacy systems couldn’t handle LLM context windows, and medical teams needed ' +
                'confidence in AI recommendations within regulated workflows.',
            points: [
                'Legacy systems incompatible with LLM context windows',
                'Regulatory requirements demanded comprehensive audit trails',
                'Medical teams needed confidence metrics for AI recommendations',
                'HIPAA integration requirements for existing infrastructure'
            ],
            deliverables: ['Technical Assessment', 'Regulatory Analysis', 'Requirements Spec'],
            metrics: [
                { value: '0', numericValue: 0, label: 'LLM Infrastructure' },
                { value: '12', numericValue: 12, label: 'Legacy Systems' },
                { value: '3', numericValue: 3, label: 'Regulatory Frameworks' }
            ]
        },
        architect: {
            id: 'architect',
            title: 'Architect',
            duration: '4 weeks',
            description:
                'Designed air-gapped LLM deployment architecture with evaluation framework for clinical accuracy ' +
                'and comprehensive audit logging.',
            points: [
                'Air-gapped LLM deployment architecture',
                'Multi-layer evaluation scoring system',
                'Encrypted context window management',
                'FDA-compliant audit logging design'
            ],
            deliverables: ['System Architecture', 'Security Design', 'Evaluation Framework'],
            tools: [
                { label: 'LLM', value: 'GPT-4, Claude' },
                { label: 'Infra', value: 'Azure HIPAA, Kubernetes' },
                { label: 'Eval', value: 'Custom Scoring Engine' }
            ]
        },
        engineer: {
            id: 'engineer',
            title: 'Engineer',
            duration: '10 weeks',
            description:
                'Built self-hosted LLM infrastructure with encrypted context management, multi-layer evaluation, ' +
                'and real-time confidence metrics.',
            points: [
                'Self-hosted LLM with encrypted context management',
                'Multi-layer evaluation scoring system',
                'Real-time confidence metrics dashboard',
                'Automated compliance reporting'
            ],
            deliverables: [
                'LLM Infrastructure',
                'Evaluation Engine',
                'Confidence Dashboard',
                'Audit System'
            ],
            metrics: [
                { value: '99.2%', numericValue: 99.2, suffix: '%', label: 'Eval Accuracy' },
                { value: '<500ms', label: 'Response Latency' },
                { value: '99.9%', numericValue: 99.9, suffix: '%', label: 'Uptime' }
            ]
        },
        enable: {
            id: 'enable',
            title: 'Enable',
            duration: '4 weeks',
            description:
                'Deployed to surgical teams with comprehensive training on confidence interpretation and ' +
                'escalation workflows.',
            points: [
                'Surgical team onboarding (25 clinicians)',
                'Confidence score interpretation training',
                'Escalation workflow documentation',
                'Continuous feedback loop established'
            ],
            deliverables: ['Training Program', 'Clinical Protocols', 'Feedback System'],
            metrics: [
                { value: '25', numericValue: 25, label: 'Clinicians Trained' },
                { value: '4.5/5', label: 'Satisfaction Score' },
                { value: '89%', numericValue: 89, suffix: '%', label: 'Adoption Rate' }
            ]
        },
        impact: {
            id: 'impact',
            title: 'Impact',
            duration: 'Ongoing',
            description:
                'Clinical-grade AI in production with zero security incidents and FDA-compliant audit trail. ' +
                '40% reduction in decision support time.',
            points: [
                '99.2% evaluation accuracy on clinical data',
                '40% reduction in decision support time',
                'Zero security incidents in 12 months',
                'FDA-compliant audit trail system'
            ],
            deliverables: ['Performance Reports', 'FDA Documentation', 'Expansion Plan'],
            metrics: [
                { value: '40%', numericValue: 40, suffix: '%', label: 'Time Reduction' },
                { value: '0', numericValue: 0, label: 'Security Incidents' },
                { value: '$2.1M', label: 'Annual Value' }
            ]
        }
    },

    challenge: {
        title: 'Challenge',
        description:
            'Clinical decision-support needed LLM integration within regulated workflows.',
        points: [
            'Legacy systems couldn’t handle LLM context windows',
            'Regulatory requirements demanded audit trails',
            'Medical teams needed confidence in AI recommendations',
            'HIPAA compliance for all patient data'
        ]
    },

    approach: {
        title: 'Approach',
        description: 'Security-first LLM architecture with clinical evaluation.',
        points: [
            'Designed air-gapped LLM deployment architecture',
            'Built evaluation framework for clinical accuracy',
            'Created audit logging for all AI decisions',
            'Integrated with existing HIPAA-compliant infrastructure'
        ]
    },

    solution: {
        title: 'Solution',
        description: 'Secure LLM + evaluation pipelines for clinical use.',
        points: [
            'Self-hosted LLM with encrypted context management',
            'Multi-layer evaluation scoring system',
            'Real-time confidence metrics dashboard',
            'Automated compliance reporting'
        ],
        tools: [
            { label: 'LLM', value: 'GPT-4, Claude' },
            { label: 'Infra', value: 'Azure HIPAA, Kubernetes' },
            { label: 'Security', value: 'Vault, mTLS' },
            { label: 'Eval', value: 'Custom Scoring Engine' }
        ]
    },

    results: {
        title: 'Outcomes',
        metrics: [
            { value: '99.2%', numericValue: 99.2, suffix: '%', label: 'Evaluation Accuracy' },
            { value: '40%', numericValue: 40, suffix: '%', label: 'Time Reduction' },
            { value: '0', numericValue: 0, label: 'Security Incidents' },
            { value: '$2.1M', label: 'Annual Value' }
        ]
    },

    testimonial: {
        quote:
            'Christopher architected an LLM system that met our stringent clinical and regulatory requirements. ' +
            'His understanding of both AI capabilities and healthcare constraints was exceptional.',
        author: 'Dr. Michael Chen',
        role: 'Chief Medical Officer',
        company: 'Medtronic'
    },

    galleryImages: [
        '/assets/img/case-studies/medtronic/gallery-1.jpg',
        '/assets/img/case-studies/medtronic/gallery-2.jpg',
        '/assets/img/case-studies/medtronic/gallery-3.jpg'
    ],

    nextCaseStudy: {
        brand: 'Pfizer',
        title: 'AI Content Engine',
        description: 'RAG-powered content workflow automation',
        href: '/case-study/pfizer'
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHART DATA - 8 Core Charts (Required)
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// FUNNEL CHART - Diagnose: Clinical Query Pipeline
// ─────────────────────────────────────────────────────────────────────────────
const funnel: FunnelDataPoint[] = [
    { stage: 'Clinical Queries/Day', value: 450, color: chartColors.charcoal },
    { stage: 'LLM Processing', value: 445, color: chartColors.gray },
    { stage: 'Evaluation Layer', value: 440, color: chartColors.muted },
    { stage: 'Confidence ≥ 95%', value: 398, color: chartColors.secondary },
    { stage: 'Clinician Accepted', value: 385, color: chartColors.primary }
];

// ─────────────────────────────────────────────────────────────────────────────
// RACI MATRIX - Diagnose: Clinical AI Accountability
// ─────────────────────────────────────────────────────────────────────────────
const raciMatrix: RaciMatrixData = {
    project: 'Clinical LLM Decision Support',
    lastUpdated: 'Q4 2024',
    workstreams: [
        { id: 'ws1', name: 'LLM Infrastructure', category: 'Engineering' },
        { id: 'ws2', name: 'Evaluation Framework', category: 'ML' },
        { id: 'ws3', name: 'Security Architecture', category: 'Security' },
        { id: 'ws4', name: 'Clinical Validation', category: 'Clinical' },
        { id: 'ws5', name: 'FDA Documentation', category: 'Compliance' },
        { id: 'ws6', name: 'Clinician Training', category: 'Enablement' }
    ],
    stakeholders: [
        { id: 'p1', name: 'AI Architect', role: 'Technical Lead', team: 'Engineering', initials: 'AA' },
        { id: 'p2', name: 'Clinical Lead', role: 'Medical Director', team: 'Clinical', initials: 'CL' },
        { id: 'p3', name: 'Security Lead', role: 'CISO', team: 'Security', initials: 'SL' },
        { id: 'p4', name: 'Regulatory Lead', role: 'Compliance', team: 'Legal', initials: 'RL' },
        { id: 'p5', name: 'ML Engineer', role: 'Evaluation', team: 'Data Science', initials: 'ML' }
    ],
    assignments: {
        'ws1-p1': 'R', 'ws1-p3': 'C', 'ws1-p4': 'I',
        'ws2-p1': 'A', 'ws2-p5': 'R', 'ws2-p2': 'C',
        'ws3-p3': 'R', 'ws3-p1': 'C', 'ws3-p4': 'A',
        'ws4-p2': 'R', 'ws4-p1': 'C', 'ws4-p4': 'A',
        'ws5-p4': 'R', 'ws5-p2': 'C', 'ws5-p1': 'I',
        'ws6-p2': 'R', 'ws6-p1': 'C', 'ws6-p4': 'I'
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM CONTEXT - Architect: Clinical LLM Platform
// ─────────────────────────────────────────────────────────────────────────────
const systemContext: SystemContextData = {
    system: {
        name: 'Clinical Decision Support LLM',
        description: 'Air-gapped LLM with multi-layer evaluation for surgical decision support',
        type: 'Software System'
    },
    users: [
        {
            id: 'surgeon',
            name: 'Surgeon',
            icon: '/assets/SVG/Medical Kit.svg',
            description: 'Primary clinical decision maker',
            interactions: ['Query clinical guidance', 'Review AI recommendations', 'Accept/reject suggestions']
        },
        {
            id: 'clinical-staff',
            name: 'Clinical Staff',
            icon: '/assets/SVG/Edit 1.svg',
            description: 'Supports surgical procedures',
            interactions: ['Input patient data', 'View recommendations', 'Document decisions']
        },
        {
            id: 'medical-director',
            name: 'Medical Director',
            icon: '/assets/SVG/Chart Statistics 1.svg',
            description: 'Oversees clinical AI usage',
            interactions: ['Review accuracy reports', 'Set confidence thresholds', 'Approve protocols']
        }
    ],
    externalSystems: [
        {
            id: 'llm-service',
            name: 'LLM Service (Air-gapped)',
            type: 'AI Service',
            icon: '/assets/SVG/Light Bulb.svg',
            description: 'Self-hosted GPT-4 in secure enclave',
            protocol: 'gRPC/mTLS',
            direction: 'bidirectional',
            dataFlow: ['Clinical queries', 'Recommendations', 'Confidence scores']
        },
        {
            id: 'ehr',
            name: 'Electronic Health Records',
            type: 'Data Source',
            icon: '/assets/SVG/Folder.svg',
            description: 'Patient data and history',
            protocol: 'FHIR API',
            direction: 'inbound',
            dataFlow: ['Patient records', 'Medical history', 'Lab results']
        },
        {
            id: 'audit-system',
            name: 'FDA Audit System',
            type: 'Compliance',
            icon: '/assets/SVG/Legal.svg',
            description: 'Regulatory audit trail',
            protocol: 'REST API',
            direction: 'outbound',
            dataFlow: ['Decision logs', 'Confidence metrics', 'User actions']
        }
    ]
};

// ─────────────────────────────────────────────────────────────────────────────
// GANTT CHART - Architect/Execute: 21-week Implementation
// ─────────────────────────────────────────────────────────────────────────────
const gantt: GanttTask[] = [
    { id: 1, task: 'Technical Assessment', start: 0, duration: 2, category: 'Discovery',   progress: 100 },
    { id: 2, task: 'Regulatory Analysis',  start: 1, duration: 3, category: 'Discovery',   progress: 100 },
    { id: 3, task: 'Security Architecture',start: 3, duration: 3, category: 'Architecture',progress: 100 },
    { id: 4, task: 'LLM Infrastructure Design', start: 4, duration: 3, category: 'Architecture', progress: 100 },
    { id: 5, task: 'Air-gapped LLM Deployment', start: 7, duration: 4, category: 'Engineering',  progress: 100 },
    { id: 6, task: 'Evaluation Engine',     start: 9,  duration: 4, category: 'Engineering',  progress: 100 },
    { id: 7, task: 'Confidence Dashboard',  start: 12, duration: 3, category: 'Engineering',  progress: 100 },
    { id: 8, task: 'Audit Trail System',    start: 14, duration: 3, category: 'Engineering',  progress: 100 },
    { id: 9, task: 'Clinical Validation',   start: 15, duration: 3, category: 'Enablement',  progress: 100 },
    { id: 10, task: 'Clinician Training',   start: 17, duration: 3, category: 'Enablement',  progress: 100 },
    { id: 11, task: 'Production Rollout',   start: 19, duration: 2, category: 'Enablement',  progress: 100 }
];

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE HEALTH - Engineer: Clinical LLM Platform Reliability
// ─────────────────────────────────────────────────────────────────────────────
const serviceHealth: ServiceHealthData = {
    services: [
        {
            name: 'LLM Inference',
            status: 'healthy',
            uptime: 99.95,
            latency: { p50: 320, p95: 480, p99: 650 },
            errorRate: 0.05,
            throughput: 450,
            lastIncident: '60d ago'
        },
        {
            name: 'Evaluation Engine',
            status: 'healthy',
            uptime: 99.98,
            latency: { p50: 85, p95: 150, p99: 280 },
            errorRate: 0.02,
            throughput: 450,
            lastIncident: '90d ago'
        },
        {
            name: 'Context Manager',
            status: 'healthy',
            uptime: 99.92,
            latency: { p50: 45, p95: 95, p99: 180 },
            errorRate: 0.08,
            throughput: 900,
            lastIncident: '45d ago'
        },
        {
            name: 'Audit Service',
            status: 'healthy',
            uptime: 99.99,
            latency: { p50: 15, p95: 35, p99: 65 },
            errorRate: 0.01,
            throughput: 1500,
            lastIncident: '120d ago'
        }
    ],
    latencyHistory: [
        { hour: '00:00', p50: 310, p95: 465, p99: 630 },
        { hour: '01:00', p50: 305, p95: 458, p99: 620 },
        { hour: '02:00', p50: 298, p95: 448, p99: 605 },
        { hour: '03:00', p50: 292, p95: 438, p99: 590 },
        { hour: '04:00', p50: 288, p95: 432, p99: 585 },
        { hour: '05:00', p50: 290, p95: 435, p99: 588 },
        { hour: '06:00', p50: 295, p95: 440, p99: 595 },
        { hour: '07:00', p50: 315, p95: 472, p99: 640 },
        { hour: '08:00', p50: 335, p95: 502, p99: 680 },
        { hour: '09:00', p50: 350, p95: 525, p99: 712 },
        { hour: '10:00', p50: 355, p95: 532, p99: 720 },
        { hour: '11:00', p50: 352, p95: 528, p99: 715 },
        { hour: '12:00', p50: 345, p95: 520, p99: 705 },
        { hour: '13:00', p50: 348, p95: 522, p99: 708 },
        { hour: '14:00', p50: 352, p95: 528, p99: 715 },
        { hour: '15:00', p50: 350, p95: 525, p99: 712 },
        { hour: '16:00', p50: 345, p95: 518, p99: 702 },
        { hour: '17:00', p50: 340, p95: 510, p99: 690 },
        { hour: '18:00', p50: 330, p95: 495, p99: 670 },
        { hour: '19:00', p50: 325, p95: 488, p99: 660 },
        { hour: '20:00', p50: 320, p95: 480, p99: 650 },
        { hour: '21:00', p50: 318, p95: 477, p99: 645 },
        { hour: '22:00', p50: 315, p95: 472, p99: 640 },
        { hour: '23:00', p50: 312, p95: 468, p99: 635 }
    ]
};

// ─────────────────────────────────────────────────────────────────────────────
// JOURNEY MAP - Enable: Surgeon Clinical AI Journey
// ─────────────────────────────────────────────────────────────────────────────
const journeyMap: JourneyMapData = {
    persona: {
        name: 'Surgeon',
        role: 'Orthopedic Surgeon',
        company: 'Medtronic Partner Hospital',
        avatar: '/assets/SVG/Medical Kit.svg'
    },
    goal: 'Get reliable AI-assisted clinical recommendations during procedures',
    stages: [
        {
            id: 'query',
            name: 'Clinical Query',
            icon: '/assets/SVG/Chat Bubble.svg',
            color: chartColors.charcoal,
            duration: 'Seconds',
            touchpoints: [{ channel: 'Clinical Dashboard', type: 'owned' }],
            actions: [
                'Voice or text query about procedure',
                'Patient context auto-loaded from EHR'
            ],
            thoughts: [
                '"I need guidance on this complex case"',
                '"Will the AI understand the nuance?"'
            ],
            emotions: { score: 3, label: 'Uncertain' },
            painPoints: ['Time pressure during procedure'],
            opportunities: ['Voice interface for hands-free']
        },
        {
            id: 'recommendation',
            name: 'AI Recommendation',
            icon: '/assets/SVG/Light Bulb.svg',
            color: chartColors.gray,
            duration: '<500ms',
            touchpoints: [
                { channel: 'LLM Service', type: 'owned' },
                { channel: 'Evaluation Engine', type: 'owned' }
            ],
            actions: [
                'View AI recommendation',
                'Check confidence score',
                'Review supporting evidence'
            ],
            thoughts: [
                '"The confidence score helps me calibrate trust"',
                '"I can see the reasoning"'
            ],
            emotions: { score: 4, label: 'Confident' },
            painPoints: ['Understanding confidence thresholds'],
            opportunities: ['Personalized threshold learning']
        },
        {
            id: 'decision',
            name: 'Clinical Decision',
            icon: '/assets/SVG/Checkmark Square.svg',
            color: chartColors.primary,
            duration: 'Immediate',
            touchpoints: [
                { channel: 'Clinical Dashboard', type: 'owned' },
                { channel: 'Audit System', type: 'owned' }
            ],
            actions: [
                'Accept, modify, or reject recommendation',
                'Document rationale',
                'Proceed with procedure'
            ],
            thoughts: [
                '"This augments my expertise perfectly"',
                '"The audit trail gives me confidence"'
            ],
            emotions: { score: 5, label: 'Empowered' },
            painPoints: [],
            opportunities: ['Feedback loop for model improvement']
        }
    ]
};

// ─────────────────────────────────────────────────────────────────────────────
// WATERFALL - Impact: Clinical Value ($2.1M Annual)
// ─────────────────────────────────────────────────────────────────────────────
const waterfall: WaterfallDataPoint[] = [
    { label: 'Baseline Decision Time', value: 3.5,  type: 'total'    },
    { label: 'AI-Assisted Decisions',  value: -0.85,type: 'decrease' },
    { label: 'Reduced Complications',  value: -0.45,type: 'decrease' },
    { label: 'Improved Outcomes',      value: -0.35,type: 'decrease' },
    { label: 'Training Efficiency',    value: -0.15,type: 'decrease' },
    { label: 'Net Clinical Value',     value: 1.7,  type: 'total'    }
];

// ─────────────────────────────────────────────────────────────────────────────
// UNIT ECONOMICS - Impact: Per-Procedure AI Value
// ─────────────────────────────────────────────────────────────────────────────
const unitEconomics: UnitEconomicsData = {
    period: 'Q4 2024',
    currency: 'USD',
    summary: {
        ltv: 2800,
        cac: 180,
        ltvCacRatio: 15.6,
        paybackMonths: 0.8,
        grossMargin: 94,
        netRevRetention: 125
    },
    segments: [
        { name: 'Surgical Guidance', ltv: 3500, cac: 220, ratio: 15.9, payback: 0.75, customers: 450, arr: 1575000 },
        { name: 'Pre-Op Planning',   ltv: 2800, cac: 180, ratio: 15.6, payback: 0.8,  customers: 380, arr: 1064000 },
        { name: 'Post-Op Analysis',  ltv: 2200, cac: 140, ratio: 15.7, payback: 0.76, customers: 280, arr: 616000  }
    ],
    cohorts: [
        { month: 'Jul', cac: 220, ltv: 2400, payback: 1.1 },
        { month: 'Aug', cac: 210, ltv: 2550, payback: 0.99 },
        { month: 'Sep', cac: 200, ltv: 2650, payback: 0.91 },
        { month: 'Oct', cac: 190, ltv: 2720, payback: 0.84 },
        { month: 'Nov', cac: 185, ltv: 2770, payback: 0.8  },
        { month: 'Dec', cac: 180, ltv: 2800, payback: 0.77 }
    ],
    costBreakdown: {
        cac: [
            { category: 'LLM Inference',     amount: 108, percent: 60 },
            { category: 'Infrastructure',    amount: 45,  percent: 25 },
            { category: 'Compliance',        amount: 27,  percent: 15 }
        ],
        ltv: [
            { category: 'Time Savings',          amount: 1120, percent: 40 },
            { category: 'Complication Avoidance',amount: 980,  percent: 35 },
            { category: 'Outcome Improvement',   amount: 700,  percent: 25 }
        ]
    },
    benchmarks: {
        ltvCacRatio:   { good: 5,  great: 10 },
        paybackMonths: { good: 6,  great: 3  },
        grossMargin:   { good: 80, great: 90 }
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT - Medtronic Chart Bundle (8 Core Charts)
// ═══════════════════════════════════════════════════════════════════════════════

export const medtronicCharts: CaseStudyCharts = {
    // Core Charts (Required)
    funnel,
    raciMatrix,
    systemContext,
    gantt,
    serviceHealth,
    journeyMap,
    waterfall,
    unitEconomics
    // Optional charts not included for Medtronic (lean base)
};
