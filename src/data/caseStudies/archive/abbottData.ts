// src/data/caseStudies/abbottData.ts
// ═══════════════════════════════════════════════════════════════════════════════
// ABBOTT CASE STUDY — NARRATIVE + CHART DATA
// Responsible AI & Governance for Global Diagnostics
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

export const abbottData: CaseStudyData = {
    slug: 'abbott',
    title: 'Abbott Responsible AI',
    subtitle: 'Governance & Compliance Infrastructure',
    company: 'Abbott Laboratories',
    client: 'Abbott Global Diagnostics',
    role: 'Lead AI/ML Architect',
    year: '2024',
    services: ['AI Governance', 'HIPAA Compliance', 'ML Pipeline Architecture', 'Audit Infrastructure'],
    heroImage: '/images/abbott-hero.jpg',
    overview: 'Engineered HIPAA-compliant data planes and audit-ready ML pipelines for global diagnostics. Achieved zero audit findings across 3 regulatory reviews and established governance frameworks for LLM readiness.',

    executiveSnapshot: {
        headline: 'Zero audit findings, LLM-ready infrastructure',
        keyOutcomes: [
            '0 audit findings',
            '5 business units adopted',
            'HIPAA-compliant ML pipeline',
            'LLM governance framework'
        ]
    },

    phases: {
        diagnose: {
            id: 'diagnose',
            title: 'Diagnose',
            duration: '3 weeks',
            description: 'Assessment revealed significant AI governance gaps in a highly regulated diagnostics environment. No framework existed for LLM deployment in clinical workflows.',
            points: [
                'No existing LLM governance framework for diagnostics',
                'Data privacy requirements blocking AI innovation',
                'Audit readiness gaps for global operations',
                'Cross-functional AI ethics oversight needed'
            ],
            deliverables: ['Governance Gap Assessment', 'Regulatory Mapping', 'Risk Register'],
            metrics: [
                { value: '0', numericValue: 0, label: 'LLM Governance Frameworks' },
                { value: '3', numericValue: 3, label: 'Regulatory Bodies' },
                { value: '47', numericValue: 47, label: 'Compliance Gaps' }
            ]
        },
        architect: {
            id: 'architect',
            title: 'Architect',
            duration: '4 weeks',
            description: 'Designed governance-first AI infrastructure with HIPAA-compliant data isolation, policy-as-code frameworks, and comprehensive audit trails.',
            points: [
                'HIPAA-compliant data isolation layer design',
                'LLM governance framework and policy architecture',
                'Audit-ready ML pipeline specifications',
                'Cross-functional AI ethics board charter'
            ],
            deliverables: ['Architecture Decision Records', 'Governance Framework', 'Security Design'],
            tools: [
                { label: 'Cloud', value: 'AWS GovCloud' },
                { label: 'Data', value: 'Snowflake, dbt' },
                { label: 'ML', value: 'SageMaker, MLflow' }
            ]
        },
        engineer: {
            id: 'engineer',
            title: 'Engineer',
            duration: '8 weeks',
            description: 'Built end-to-end encrypted data pipelines, automated compliance checking, and real-time audit trail generation.',
            points: [
                'End-to-end encrypted data pipelines',
                'Automated compliance checking system',
                'Real-time audit trail generation',
                'Policy-as-code governance engine'
            ],
            deliverables: ['ML Pipeline', 'Compliance Engine', 'Audit System', 'Governance API'],
            metrics: [
                { value: '99.9%', numericValue: 99.9, suffix: '%', label: 'Pipeline Uptime' },
                { value: '<100ms', label: 'Compliance Check Latency' },
                { value: '100%', numericValue: 100, suffix: '%', label: 'Audit Coverage' }
            ]
        },
        enable: {
            id: 'enable',
            title: 'Enable',
            duration: '4 weeks',
            description: 'Rolled out governance framework to 5 business units with comprehensive training and documentation.',
            points: [
                'Governance training for 50+ data scientists',
                'Policy documentation and playbooks',
                'AI ethics board operationalized',
                'Self-service compliance portal launched'
            ],
            deliverables: ['Training Program', 'Runbooks', 'Ethics Board Charter'],
            metrics: [
                { value: '5', numericValue: 5, label: 'Business Units' },
                { value: '50+', label: 'Team Members Trained' },
                { value: '92%', numericValue: 92, suffix: '%', label: 'Adoption Rate' }
            ]
        },
        impact: {
            id: 'impact',
            title: 'Impact',
            duration: 'Ongoing',
            description: 'Zero audit findings across 3 regulatory reviews. LLM-ready infrastructure positioned Abbott for next-generation AI diagnostics.',
            points: [
                'Zero audit findings across 3 regulatory reviews',
                'HIPAA-compliant ML pipeline in production',
                'Governance framework adopted by 5 business units',
                'LLM infrastructure ready for deployment'
            ],
            deliverables: ['Audit Reports', 'Compliance Certification', 'Expansion Roadmap'],
            metrics: [
                { value: '0', numericValue: 0, label: 'Audit Findings' },
                { value: '5', numericValue: 5, label: 'BUs Adopted' },
                { value: '$1.2M', label: 'Compliance Cost Avoidance' }
            ]
        }
    },

    challenge: {
        title: 'Challenge',
        description: 'AI governance gap in regulated diagnostics environment.',
        points: [
            'No framework for LLM governance in diagnostics',
            'Data privacy requirements blocking innovation',
            'Audit readiness needed for global operations',
            'Cross-functional AI ethics oversight missing'
        ]
    },

    approach: {
        title: 'Approach',
        description: 'Governance-first AI infrastructure.',
        points: [
            'Built HIPAA-compliant data isolation layer',
            'Created LLM governance framework and policies',
            'Designed audit-ready ML pipeline architecture',
            'Established cross-functional AI ethics board'
        ]
    },

    solution: {
        title: 'Solution',
        description: 'Compliant ML + governance infrastructure.',
        points: [
            'End-to-end encrypted data pipelines',
            'Automated compliance checking system',
            'Real-time audit trail generation',
            'Policy-as-code governance framework'
        ],
        tools: [
            { label: 'Cloud', value: 'AWS GovCloud' },
            { label: 'ML', value: 'SageMaker, MLflow' },
            { label: 'Data', value: 'Snowflake, dbt' },
            { label: 'Security', value: 'Vault, KMS' }
        ]
    },

    results: {
        title: 'Outcomes',
        metrics: [
            { value: '0', numericValue: 0, label: 'Audit Findings' },
            { value: '5', numericValue: 5, label: 'Business Units Adopted' },
            { value: '100%', numericValue: 100, suffix: '%', label: 'Compliance Coverage' },
            { value: '$1.2M', label: 'Cost Avoidance' }
        ]
    },

    testimonial: {
        quote: 'Christopher built a governance infrastructure that gave us confidence to pursue AI innovation while maintaining our regulatory standards. Zero findings speaks volumes.',
        author: 'Lisa Martinez',
        role: 'VP, Compliance & Data Governance',
        company: 'Abbott Laboratories'
    },

    galleryImages: [
        '/assets/img/case-studies/abbott/gallery-1.jpg',
        '/assets/img/case-studies/abbott/gallery-2.jpg',
        '/assets/img/case-studies/abbott/gallery-3.jpg'
    ],

    nextCaseStudy: {
        brand: 'Medtronic',
        title: 'LLM-Centered Architecture',
        description: 'Clinical decision-support with secure LLM integration',
        href: '/case-study/medtronic'
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHART DATA — 8 Core Charts (Required)
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// FUNNEL CHART — Diagnose: Compliance Gap Pipeline
// ─────────────────────────────────────────────────────────────────────────────
const funnel: FunnelDataPoint[] = [
    { stage: 'AI Use Cases Identified', value: 47, color: chartColors.charcoal },
    { stage: 'Governance Review', value: 32, color: chartColors.gray },
    { stage: 'Compliance Assessment', value: 24, color: chartColors.muted },
    { stage: 'Risk Mitigation', value: 18, color: chartColors.secondary },
    { stage: 'Approved for Production', value: 12, color: chartColors.primary },
];

// ─────────────────────────────────────────────────────────────────────────────
// RACI MATRIX — Diagnose: AI Governance Accountability
// ─────────────────────────────────────────────────────────────────────────────
const raciMatrix: RaciMatrixData = {
    project: 'AI Governance Framework',
    lastUpdated: 'Q3 2024',
    workstreams: [
        { id: 'ws1', name: 'Policy Development', category: 'Governance' },
        { id: 'ws2', name: 'Data Classification', category: 'Data' },
        { id: 'ws3', name: 'Model Validation', category: 'ML' },
        { id: 'ws4', name: 'Audit Trail Design', category: 'Compliance' },
        { id: 'ws5', name: 'Ethics Review', category: 'Governance' },
        { id: 'ws6', name: 'Pipeline Security', category: 'Security' },
    ],
    stakeholders: [
        { id: 'p1', name: 'AI Architect', role: 'Technical Lead', team: 'Engineering', initials: 'AA' },
        { id: 'p2', name: 'Compliance Officer', role: 'Regulatory Lead', team: 'Legal', initials: 'CO' },
        { id: 'p3', name: 'Data Steward', role: 'Data Governance', team: 'Data', initials: 'DS' },
        { id: 'p4', name: 'Ethics Board', role: 'Oversight', team: 'Executive', initials: 'EB' },
        { id: 'p5', name: 'Security Team', role: 'InfoSec', team: 'Security', initials: 'ST' },
    ],
    assignments: {
        'ws1-p1': 'C', 'ws1-p2': 'A', 'ws1-p4': 'R',
        'ws2-p1': 'C', 'ws2-p3': 'R', 'ws2-p2': 'A',
        'ws3-p1': 'R', 'ws3-p2': 'A', 'ws3-p4': 'C',
        'ws4-p1': 'R', 'ws4-p2': 'A', 'ws4-p5': 'C',
        'ws5-p4': 'R', 'ws5-p2': 'A', 'ws5-p1': 'I',
        'ws6-p5': 'R', 'ws6-p1': 'C', 'ws6-p2': 'A',
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM CONTEXT — Architect: AI Governance Platform
// ─────────────────────────────────────────────────────────────────────────────
const systemContext: SystemContextData = {
    system: {
        name: 'AI Governance Platform',
        description: 'HIPAA-compliant ML pipeline with policy-as-code governance and real-time audit trails',
        type: 'Software System',
    },
    users: [
        {
            id: 'data-scientist',
            name: 'Data Scientist',
            icon: '/assets/SVG/Chart Statistics 1.svg',
            description: 'Develops and deploys ML models',
            interactions: ['Submit models for review', 'Access approved data', 'Monitor compliance'],
        },
        {
            id: 'compliance-officer',
            name: 'Compliance Officer',
            icon: '/assets/SVG/Legal.svg',
            description: 'Reviews AI systems for regulatory compliance',
            interactions: ['Review model submissions', 'Approve deployments', 'Generate audit reports'],
        },
        {
            id: 'ethics-board',
            name: 'Ethics Board',
            icon: '/assets/SVG/Settings 1.svg',
            description: 'Provides AI ethics oversight',
            interactions: ['Review high-risk models', 'Set governance policies', 'Escalation decisions'],
        },
    ],
    externalSystems: [
        {
            id: 'sagemaker',
            name: 'AWS SageMaker',
            type: 'ML Platform',
            icon: '/assets/SVG/Light Bulb.svg',
            description: 'Model training and deployment',
            protocol: 'AWS SDK',
            direction: 'bidirectional',
            dataFlow: ['Training jobs', 'Model artifacts', 'Inference endpoints'],
        },
        {
            id: 'snowflake',
            name: 'Snowflake',
            type: 'Data Warehouse',
            icon: '/assets/SVG/Folder.svg',
            description: 'HIPAA-compliant data storage',
            protocol: 'JDBC/ODBC',
            direction: 'bidirectional',
            dataFlow: ['PHI data', 'Feature stores', 'Audit logs'],
        },
        {
            id: 'vault',
            name: 'HashiCorp Vault',
            type: 'Secrets Management',
            icon: '/assets/SVG/Settings 1.svg',
            description: 'Encryption key management',
            protocol: 'REST API',
            direction: 'outbound',
            dataFlow: ['Encryption keys', 'Access tokens', 'Certificates'],
        },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
// GANTT CHART — Architect/Execute: 19-week Implementation
// ─────────────────────────────────────────────────────────────────────────────
const gantt: GanttTask[] = [
    { id: 1, task: 'Governance Gap Assessment', start: 0, duration: 3, category: 'Discovery', progress: 100 },
    { id: 2, task: 'Regulatory Requirements Mapping', start: 1, duration: 3, category: 'Discovery', progress: 100 },
    { id: 3, task: 'Architecture Design', start: 3, duration: 4, category: 'Architecture', progress: 100 },
    { id: 4, task: 'Policy Framework Development', start: 4, duration: 3, category: 'Architecture', progress: 100 },
    { id: 5, task: 'Encrypted Pipeline Build', start: 7, duration: 4, category: 'Engineering', progress: 100 },
    { id: 6, task: 'Compliance Engine', start: 8, duration: 4, category: 'Engineering', progress: 100 },
    { id: 7, task: 'Audit Trail System', start: 10, duration: 3, category: 'Engineering', progress: 100 },
    { id: 8, task: 'Governance API', start: 12, duration: 3, category: 'Engineering', progress: 100 },
    { id: 9, task: 'Team Training', start: 15, duration: 3, category: 'Enablement', progress: 100 },
    { id: 10, task: 'BU Rollout', start: 16, duration: 3, category: 'Enablement', progress: 100 },
];

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE HEALTH — Engineer: Governance Platform Reliability
// ─────────────────────────────────────────────────────────────────────────────
const serviceHealth: ServiceHealthData = {
    services: [
        { name: 'Governance API', status: 'healthy', uptime: 99.95, latency: { p50: 45, p95: 120, p99: 280 }, errorRate: 0.05, throughput: 1200, lastIncident: '45d ago' },
        { name: 'Compliance Engine', status: 'healthy', uptime: 99.92, latency: { p50: 85, p95: 180, p99: 350 }, errorRate: 0.08, throughput: 800, lastIncident: '30d ago' },
        { name: 'Audit Trail Service', status: 'healthy', uptime: 99.99, latency: { p50: 25, p95: 65, p99: 120 }, errorRate: 0.01, throughput: 5000, lastIncident: '90d ago' },
        { name: 'Encryption Service', status: 'healthy', uptime: 99.98, latency: { p50: 12, p95: 35, p99: 80 }, errorRate: 0.02, throughput: 10000, lastIncident: '60d ago' },
    ],
    latencyHistory: [
        { hour: '00:00', p50: 42, p95: 115, p99: 270 },
        { hour: '01:00', p50: 40, p95: 110, p99: 260 },
        { hour: '02:00', p50: 38, p95: 105, p99: 250 },
        { hour: '03:00', p50: 36, p95: 100, p99: 240 },
        { hour: '04:00', p50: 35, p95: 98, p99: 235 },
        { hour: '05:00', p50: 36, p95: 100, p99: 240 },
        { hour: '06:00', p50: 38, p95: 105, p99: 250 },
        { hour: '07:00', p50: 42, p95: 115, p99: 270 },
        { hour: '08:00', p50: 48, p95: 130, p99: 305 },
        { hour: '09:00', p50: 52, p95: 140, p99: 320 },
        { hour: '10:00', p50: 55, p95: 148, p99: 340 },
        { hour: '11:00', p50: 54, p95: 145, p99: 335 },
        { hour: '12:00', p50: 52, p95: 140, p99: 320 },
        { hour: '13:00', p50: 53, p95: 142, p99: 325 },
        { hour: '14:00', p50: 54, p95: 145, p99: 335 },
        { hour: '15:00', p50: 52, p95: 140, p99: 320 },
        { hour: '16:00', p50: 50, p95: 135, p99: 310 },
        { hour: '17:00', p50: 48, p95: 130, p99: 305 },
        { hour: '18:00', p50: 48, p95: 125, p99: 290 },
        { hour: '19:00', p50: 46, p95: 122, p99: 285 },
        { hour: '20:00', p50: 44, p95: 118, p99: 275 },
        { hour: '21:00', p50: 43, p95: 116, p99: 272 },
        { hour: '22:00', p50: 42, p95: 115, p99: 270 },
        { hour: '23:00', p50: 42, p95: 115, p99: 270 }
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
// JOURNEY MAP — Enable: Data Scientist Governance Journey
// ─────────────────────────────────────────────────────────────────────────────
const journeyMap: JourneyMapData = {
    persona: { name: 'Data Scientist', role: 'Senior ML Engineer', company: 'Abbott Diagnostics', avatar: '/assets/SVG/Chart Statistics 1.svg' },
    goal: 'Deploy compliant ML model to production with minimal friction',
    stages: [
        {
            id: 'register', name: 'Model Registration', icon: '/assets/SVG/Clipboard.svg', color: chartColors.charcoal, duration: '1 day',
            touchpoints: [{ channel: 'Governance Portal', type: 'owned' }],
            actions: ['Register model intent', 'Classify data sensitivity', 'Submit initial documentation'],
            thoughts: ['"Is my model going to pass compliance?"', '"What documentation do I need?"'],
            emotions: { score: 3, label: 'Uncertain' },
            painPoints: ['Unclear requirements'],
            opportunities: ['Guided registration wizard'],
        },
        {
            id: 'review', name: 'Compliance Review', icon: '/assets/SVG/Legal.svg', color: chartColors.gray, duration: '2-3 days',
            touchpoints: [{ channel: 'Compliance Engine', type: 'owned' }],
            actions: ['Automated policy checks', 'Risk scoring', 'Gap identification'],
            thoughts: ['"The automated checks are fast"', '"I can see exactly what needs fixing"'],
            emotions: { score: 4, label: 'Confident' },
            painPoints: ['Waiting for human review'],
            opportunities: ['Faster automated checks'],
        },
        {
            id: 'approved', name: 'Production Deployment', icon: '/assets/SVG/Checkmark Square.svg', color: chartColors.primary, duration: '1 day',
            touchpoints: [{ channel: 'SageMaker', type: 'owned' }, { channel: 'Audit Trail', type: 'owned' }],
            actions: ['Deploy to production', 'Audit trail generated', 'Monitoring enabled'],
            thoughts: ['"That was much smoother than expected"', '"I have full visibility into compliance"'],
            emotions: { score: 5, label: 'Satisfied' },
            painPoints: [],
            opportunities: ['Celebrate successful deployments'],
        },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
// WATERFALL — Impact: Compliance Cost Avoidance ($1.2M)
// ─────────────────────────────────────────────────────────────────────────────
const waterfall: WaterfallDataPoint[] = [
    { label: 'Baseline Compliance Cost', value: 2.4, type: 'total' },
    { label: 'Automated Audit Savings', value: -0.45, type: 'decrease' },
    { label: 'Reduced Manual Reviews', value: -0.35, type: 'decrease' },
    { label: 'Avoided Audit Findings', value: -0.25, type: 'decrease' },
    { label: 'Faster Time-to-Market', value: -0.15, type: 'decrease' },
    { label: 'Net Compliance Cost', value: 1.2, type: 'total' },
];

// ─────────────────────────────────────────────────────────────────────────────
// UNIT ECONOMICS — Impact: Per-Model Governance Cost
// ─────────────────────────────────────────────────────────────────────────────
const unitEconomics = {
    period: 'Q4 2024',
    currency: 'USD',
    summary: {
        ltv: 85000,
        cac: 12000,
        ltvCacRatio: 7.1,
        paybackMonths: 1.7,
        grossMargin: 86,
        netRevRetention: 115,
    },
    segments: [
        { name: 'AI/ML Governance', ltv: 125000, cac: 18000, ratio: 6.9, payback: 2.0, customers: 5, arr: 625000 },
        { name: 'Audit Compliance', ltv: 85000, cac: 12000, ratio: 7.1, payback: 1.7, customers: 12, arr: 1020000 },
        { name: 'Data Classification', ltv: 45000, cac: 8000, ratio: 5.6, payback: 2.1, customers: 18, arr: 810000 },
    ],
    cohorts: [
        { month: 'Jul', cac: 14000, ltv: 78000, payback: 2.2 },
        { month: 'Aug', cac: 13200, ltv: 80000, payback: 2.0 },
        { month: 'Sep', cac: 12800, ltv: 82000, payback: 1.9 },
        { month: 'Oct', cac: 12400, ltv: 83500, payback: 1.8 },
        { month: 'Nov', cac: 12200, ltv: 84500, payback: 1.75 },
        { month: 'Dec', cac: 12000, ltv: 85000, payback: 1.7 },
    ],
    costBreakdown: {
        cac: [
            { category: 'Platform Infrastructure', amount: 6000, percent: 50 },
            { category: 'Review Overhead', amount: 3600, percent: 30 },
            { category: 'Training', amount: 2400, percent: 20 },
        ],
        ltv: [
            { category: 'Audit Avoidance', amount: 38250, percent: 45 },
            { category: 'Faster Deployment', amount: 29750, percent: 35 },
            { category: 'Risk Reduction', amount: 17000, percent: 20 },
        ],
    },
    benchmarks: {
        ltvCacRatio: { good: 3, great: 5 },
        paybackMonths: { good: 12, great: 6 },
        grossMargin: { good: 70, great: 85 },
    },
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT — Abbott Chart Bundle (8 Core Charts)
// ═══════════════════════════════════════════════════════════════════════════════

export const abbottCharts: CaseStudyCharts = {
    // Core Charts (Required)
    funnel,
    raciMatrix,
    systemContext,
    gantt,
    serviceHealth,
    journeyMap,
    waterfall,
    unitEconomics,
    // Optional charts not included for Abbott (lean base)
};
