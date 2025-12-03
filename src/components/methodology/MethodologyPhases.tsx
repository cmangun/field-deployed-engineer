import React from 'react';

interface PhaseData {
    id: number;
    name: string;
    tagline: string;
    question: string;
    artifacts: {
        name: string;
        description: string;
    }[];
    gateCondition: string;
}

const phasesData: PhaseData[] = [
    {
        id: 1,
        name: 'PHASE 1 — DIAGNOSE',
        tagline: 'Reduce ambiguity. Establish truth. Align reality.',
        question: 'What problem are we solving, who owns it, what systems shape it, and what is the first viable path to deliver?',
        artifacts: [
            {
                name: 'Strategic Problem Definition',
                description: 'The clear, sponsor-validated articulation of the real problem, constraints, and outcome metrics.'
            },
            {
                name: 'Stakeholder & Dependency Map',
                description: 'Power flows, decision flows, knowledge flows, blockers, enablers, and ownership boundaries.'
            },
            {
                name: 'Systems & Data Landscape',
                description: 'All environments, integrations, data sources, access realities, and compliance boundaries mapped and baselined.'
            },
            {
                name: 'Baseline Delivery Roadmap',
                description: 'Sequenced path from prototype → pilot → production, with scope, risks, and dependencies exposed.'
            }
        ],
        gateCondition: 'All four artifacts validated by CTO + business sponsor. No coding begins without this phase complete.'
    },
    {
        id: 2,
        name: 'PHASE 2 — ARCHITECT',
        tagline: 'Design the system that obeys constraints, governance, and reality.',
        question: 'How will the system work, what boundaries shape it, and what decisions govern its behavior?',
        artifacts: [
            {
                name: 'Constraints & Compliance Register',
                description: 'Documented HIPAA/GDPR/security boundaries, risk posture, IAM rules, and non-negotiables.'
            },
            {
                name: 'Target Architecture Blueprint',
                description: 'The future-state architecture, prototype slice, system topology, data paths, and integration model.'
            },
            {
                name: 'Architectural Decision Records (ADRs)',
                description: 'The explicit reasoning behind every major choice: why X, why not Y, and what trade-offs were accepted.'
            },
            {
                name: 'Integration & Data Contracts',
                description: 'API schemas, access patterns, SLAs, event models, transformation logic, and performance expectations.'
            }
        ],
        gateCondition: 'Security + architecture leads validate all four artifacts before any buildwork begins.'
    },
    {
        id: 3,
        name: 'PHASE 3 — ACTIVATE',
        tagline: 'Build the system, test the system, and deploy it safely under real constraints.',
        question: 'How do we deliver this system without rework, breakage, or chaos?',
        artifacts: [
            {
                name: 'Implementation Blueprint',
                description: 'Work breakdown structure, ownership (RACI), sprint plan, and tracing from architecture → tasks.'
            },
            {
                name: 'Environment & Access Plan',
                description: 'Dev/stage/prod, IAM roles, permissions, secrets, logging, auditability, and deployment topology.'
            },
            {
                name: 'Test & Validation Framework',
                description: 'Safety tests, ML tests, unit tests, integration tests, redteam tests, fairness/bias tests.'
            },
            {
                name: 'Go-Live & Rollback Runbook',
                description: 'Deployment sequence, health checks, rollback triggers, observability hooks, SLAs, and owner-of-last-resort.'
            }
        ],
        gateCondition: 'SRE + CTO sign off. If the rollback plan is unclear, the system does not ship.'
    },
    {
        id: 4,
        name: 'PHASE 4 — ENABLE',
        tagline: 'Transfer ownership. Build capability. Ensure longevity.',
        question: 'How does the organization operate, maintain, and evolve the system after the engagement?',
        artifacts: [
            {
                name: 'Operating Model & Runbooks',
                description: 'Incident playbooks, support schedules, escalation paths, and control of the system\'s operational lifecycle.'
            },
            {
                name: 'Training & Enablement Package',
                description: 'Playbooks, video walkthroughs, architecture deep dives, hands-on training, and troubleshooting guides.'
            },
            {
                name: 'Observability & Metrics Specification',
                description: 'Model metrics, system metrics, cost transparency, safety telemetry, and dashboards.'
            },
            {
                name: 'Handoff & Continuous Improvement Plan',
                description: 'Ownership transfer, retraining cadence, maturity model, and roadmap for next 6–12 months.'
            }
        ],
        gateCondition: 'Internal team demonstrates capability without outside intervention.'
    }
];

const MethodologyPhases = () => {
    return (
        <div className="methodology-phases-area pt-200 pb-140" style={{ backgroundColor: '#F6F6F9' }}>
            <div className="container container-1230">
                <div className="row mb-70">
                    <div className="col-lg-12">
                        <div>
                            <h3 className="tp-section-title-clash mb-30 tp-text-revel-anim">4 Phase FDE Method</h3>
                            <p style={{ fontSize: '20px', maxWidth: '900px', lineHeight: '1.6', color: '#0E0F11' }}>
                                By gating artifacts we ensure every decision is validated, every risk surfaced early, and every system built to survive real-world conditions.
                            </p>
                        </div>
                    </div>
                </div>

                {phasesData.map((phase) => (
                    <div key={phase.id} className="methodology-phase-item mb-100">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2 className="mb-20" style={{ fontSize: '48px', fontWeight: '700', color: '#0E0F11' }}>{phase.name}</h2>
                                <p className="mb-20" style={{ fontSize: '22px', fontStyle: 'italic', opacity: 0.8, color: '#0E0F11' }}>{phase.tagline}</p>
                                
                                <p className="mb-30" style={{ fontSize: '17px', color: '#0E0F11' }}>
                                    This phase answers: <strong>{phase.question}</strong>
                                </p>

                                <h3 className="mb-30" style={{ fontSize: '28px', fontWeight: '600', color: '#0E0F11' }}>The 4 Gating Artifacts</h3>

                                <ol className="methodology-artifacts-list mb-35" style={{ paddingLeft: '0', listStyle: 'none' }}>
                                    {phase.artifacts.map((artifact, index) => (
                                        <li key={index} className="mb-25" style={{ counterIncrement: 'item' }}>
                                            <h4 className="mb-10" style={{ fontSize: '20px', fontWeight: '600', color: '#0E0F11' }}>
                                                {index + 1}. {artifact.name}
                                            </h4>
                                            <p style={{ fontSize: '16px', opacity: 0.85, paddingLeft: '28px', color: '#0E0F11' }}>
                                                {artifact.description}
                                            </p>
                                        </li>
                                    ))}
                                </ol>

                                <div className="gate-condition">
                                    <h4 className="mb-10" style={{ fontSize: '20px', fontWeight: '600', color: '#0E0F11' }}>Gate Condition:</h4>
                                    <p style={{ fontSize: '16px', opacity: 0.85, color: '#0E0F11' }}>{phase.gateCondition}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MethodologyPhases;