import { StaticImageData } from 'next/image';

export interface PhaseDataType {
    id: number;
    title: string;
    tagline: string;
    question: string;
    artifacts: string[];
    gateCondition: string;
    image?: StaticImageData;
}

const phasesData: PhaseDataType[] = [
    {
        id: 1,
        title: 'PHASE 1 — DIAGNOSE',
        tagline: 'Reduce ambiguity. Establish truth. Align reality.',
        question: 'What problem are we solving, who owns it, what systems shape it, and what is the first viable path to deliver?',
        artifacts: [
            'Strategic Problem Definition',
            'Stakeholder & Dependency Map',
            'Systems & Data Landscape',
            'Baseline Delivery Roadmap'
        ],
        gateCondition: 'All four artifacts validated by CTO + business sponsor. No coding begins without this phase complete.'
    },
    {
        id: 2,
        title: 'PHASE 2 — ARCHITECT',
        tagline: 'Design the system that obeys constraints, governance, and reality.',
        question: 'How will the system work, what boundaries shape it, and what decisions govern its behavior?',
        artifacts: [
            'Constraints & Compliance Register',
            'Target Architecture Blueprint',
            'Architectural Decision Records (ADRs)',
            'Integration & Data Contracts'
        ],
        gateCondition: 'Security + architecture leads validate all four artifacts before any buildwork begins.'
    },
    {
        id: 3,
        title: 'PHASE 3 — ACTIVATE',
        tagline: 'Build the system, test the system, and deploy it safely under real constraints.',
        question: 'How do we deliver this system without rework, breakage, or chaos?',
        artifacts: [
            'Implementation Blueprint',
            'Environment & Access Plan',
            'Test & Validation Framework',
            'Go-Live & Rollback Runbook'
        ],
        gateCondition: 'SRE + CTO sign off. If the rollback plan is unclear, the system does not ship.'
    },
    {
        id: 4,
        title: 'PHASE 4 — ENABLE',
        tagline: 'Transfer ownership. Build capability. Ensure longevity.',
        question: 'How does the organization operate, maintain, and evolve the system after the engagement?',
        artifacts: [
            'Operating Model & Runbooks',
            'Training & Enablement Package',
            'Observability & Metrics Specification',
            'Handoff & Continuous Improvement Plan'
        ],
        gateCondition: 'Internal team demonstrates capability without outside intervention.'
    }
];

export default phasesData;