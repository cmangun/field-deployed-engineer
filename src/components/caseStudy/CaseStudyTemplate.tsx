"use client";
import { CaseStudyData, CaseStudyCharts, PhaseSection, CaseStudyExecutiveSummary, PhaseNarrativeMeta, PatternGeneralization, PhaseKey } from '@/types/caseStudy';
import AnimatedCounter from '../counter/AnimatedCounter';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import { PhaseHeader, PhaseId } from './PhaseHeader';

// Chart Components
import GanttChart from '@/charts_D3/GanttChart';
import FunnelChart from '@/charts_D3/FunnelChart';
import SystemContextDiagram from '@/charts_D3/SystemContextDiagram';
import ServiceHealthDashboard from '@/charts_D3/ServiceHealthDashboard';
import CustomerJourneyMap from '@/charts_D3/CustomerJourneyMap';
import WaterfallChart from '@/charts_D3/WaterfallChart';
import CollapsibleChart from './CollapsibleChart';
import CalendarHeatmap from '@/charts_D3/CalendarHeatmap';
import RACIMatrix from '@/charts_D3/RACIMatrix';
import RAGPipeline from '@/charts_D3/RAGPipeline';
import ModelCard from '@/charts_D3/ModelCard';
import LatencyPercentiles from '@/charts_D3/LatencyPercentiles';
import DataQualityScorecard from '@/charts_D3/DataQualityScorecard';
import OrgHealthDashboard from '@/charts_D3/OrgHealthDashboard';
import UnitEconomics from '@/charts_D3/UnitEconomics';
import SparklineGrid from '@/charts_D3/SparklineGrid';

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════════════════
// RESPONSIVE STYLES
// ═══════════════════════════════════════════════════════════════════════════════

const responsiveStyles = `
    .cs-title-main { font-size: clamp(48px, 8vw, 90px); font-weight: 700; margin-bottom: 10px; line-height: 1.1; }
    .cs-subtitle-main { font-size: clamp(32px, 5vw, 58px); font-weight: 600; margin: 0; line-height: 1.2; }
    .cs-section-title { font-size: clamp(32px, 5vw, 56px); font-weight: 700; font-style: normal; margin-bottom: 48px; word-wrap: break-word; overflow-wrap: break-word; }
    .cs-section-title-no-margin { font-size: clamp(32px, 5vw, 56px); font-weight: 700; font-style: normal; word-wrap: break-word; overflow-wrap: break-word; }
    .cs-phase-label { font-size: clamp(48px, 6vw, 72px); font-weight: 800; color: #0d9488; }
    .cs-section { padding-top: 45px; padding-bottom: 45px; }
    .cs-hero-logo { height: 140px; width: auto; margin-bottom: 16px; object-fit: contain; }
    .cs-hero-metrics { display: flex; gap: 32px; flex-wrap: wrap; }
    .cs-hero-section { padding-top: 40px !important; }
    
    /* Phase column layout */
    .cs-phase-row { display: flex; flex-wrap: wrap; gap: 48px; }
    .cs-phase-col-left { flex: 0 0 45%; max-width: 45%; }
    .cs-phase-col-right { flex: 0 0 calc(55% - 48px); max-width: calc(55% - 48px); }
    
    @media (max-width: 991px) {
        .cs-title-main { margin-bottom: 8px; }
        .cs-subtitle-main { margin-bottom: 20px; }
        .cs-section-title { margin-bottom: 32px; }
        .cs-section-title, .cs-section-title-no-margin { font-size: clamp(28px, 4vw, 40px); }
        .cs-phase-label { font-size: clamp(36px, 5vw, 48px); margin-bottom: 24px; }
        .cs-section { padding-top: 28px; padding-bottom: 28px; }
        .cs-phase-row { gap: 32px; }
        .cs-phase-col-left { flex: 0 0 100%; max-width: 100%; }
        .cs-phase-col-right { flex: 0 0 100%; max-width: 100%; }
    }
    @media (max-width: 767px) {
        .cs-hero-logo { height: 70px; margin-bottom: 12px; }
        .cs-hero-metrics { gap: 16px; }
        .cs-hero-metrics > div { min-width: 70px; }
        .cs-section { padding-top: 20px; padding-bottom: 20px; }
        .cs-hero-section { padding-top: 24px !important; }
        .cs-phase-row { gap: 24px; }
    }
`;

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE PROPS
// ═══════════════════════════════════════════════════════════════════════════════

interface CaseStudyTemplateProps {
    study: CaseStudyData;
    charts: CaseStudyCharts;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHART METADATA — Titles, subtitles, insights for each chart
// ═══════════════════════════════════════════════════════════════════════════════

interface ChartMeta {
    title: string;
    subtitle: string;
    description: string;
    insight: string;
    transformation: string;
    nextStep: string;
    owner: string;
    impact: string;
    stats: { label: string; value: string }[];
}

const getChartMeta = (chartKey: string): ChartMeta => {
    const metadata: Record<string, ChartMeta> = {
        funnel: {
            title: 'Funnel: Content Pipeline',
            subtitle: 'Quarterly MLR content flow',
            description: 'Content review funnel from Draft → MLR → Approved, highlighting bottlenecks.',
            insight: '40% of assets required multiple revision cycles due to retrieval failures.',
            transformation: '25+ min search → <60 sec AI-powered retrieval.',
            nextStep: 'Implement AI-assisted pre-review before MLR submission.',
            owner: '@Content Operations',
            impact: 'Cycle time reduction',
            stats: [{ label: 'Assets/Quarter', value: '2,450+' }, { label: 'Conversion', value: '25%' }]
        },
        raciMatrix: {
            title: 'RACI: Accountability Map',
            subtitle: 'Who owns what across workstreams',
            description: 'Responsibility, accountability, consultation, and information assignments.',
            insight: 'Clear accountability reduced decision cycles from 5 days to 1 day.',
            transformation: 'Unclear ownership → explicit R/A/C/I assignments per workstream.',
            nextStep: 'Review RACI quarterly to reflect org changes.',
            owner: '@Program Management',
            impact: 'Decision velocity',
            stats: [{ label: 'Workstreams', value: '6' }, { label: 'Stakeholders', value: '5' }]
        },
        systemContext: {
            title: 'System Context (C4)',
            subtitle: 'Regulated boundary architecture',
            description: 'AI content engine positioned inside existing stack with governance boundaries.',
            insight: 'Architecture ensured AI operated inside compliance perimeter.',
            transformation: 'Fragmented content → single AI gateway with audit trails.',
            nextStep: 'Finalize data flow contracts with Veeva and Workfront.',
            owner: '@Enterprise Architecture',
            impact: 'System compliance',
            stats: [{ label: 'Integrations', value: '5' }, { label: 'User Types', value: '4' }]
        },
        gantt: {
            title: 'Gantt: Project Timeline',
            subtitle: '14-week implementation',
            description: 'Progress across Discovery, Architecture, Engineering, Enablement phases.',
            insight: 'Parallel workstreams enabled 30% faster delivery.',
            transformation: '6-month waterfall → agile sprints with bi-weekly demos.',
            nextStep: 'Apply same timeline model to Q2 expansion.',
            owner: '@Program Management',
            impact: 'Delivery velocity',
            stats: [{ label: 'Duration', value: '14 weeks' }, { label: 'Tasks', value: '14' }]
        },
        ragPipeline: {
            title: 'RAG Pipeline Architecture',
            subtitle: 'Retrieval-augmented generation flow',
            description: 'End-to-end RAG: embeddings, vector store, retrieval, augmentation, generation.',
            insight: 'Hybrid retrieval improved relevance 35% over pure vector search.',
            transformation: 'Manual search → AI-powered retrieval with brand/region filtering.',
            nextStep: 'Add re-ranking layer for top-k refinement.',
            owner: '@ML Engineering',
            impact: 'Retrieval quality',
            stats: [{ label: 'Retrieval Accuracy', value: '94%' }, { label: 'Latency', value: '<500ms' }]
        },
        serviceHealth: {
            title: 'Service Health Dashboard',
            subtitle: 'Production service monitoring',
            description: 'AI content service: p95 latency, error rates, request volume.',
            insight: 'p95 response time: 850ms → 280ms.',
            transformation: '850ms average → 280ms p95 with automated routing and SLA indicators.',
            nextStep: 'Add auto-scaling for RAG pipeline during peak hours.',
            owner: '@Platform Engineering',
            impact: 'Service reliability',
            stats: [{ label: 'Uptime', value: '99.74%' }, { label: 'p95 Latency', value: '280ms' }]
        },
        modelCard: {
            title: 'Model Card',
            subtitle: 'ML model documentation',
            description: 'Model purpose, training data, metrics, limitations, ethical considerations.',
            insight: 'Model cards reduced ML engineer onboarding time by 60%.',
            transformation: 'Tribal knowledge → standardized documentation for every model.',
            nextStep: 'Automate model card generation from training metadata.',
            owner: '@ML Governance',
            impact: 'Model transparency',
            stats: [{ label: 'Models Documented', value: '3' }, { label: 'Coverage', value: '100%' }]
        },
        latencyPercentiles: {
            title: 'Latency Percentiles',
            subtitle: 'Response time distribution',
            description: 'p50, p95, p99 latency over time to identify patterns and outliers.',
            insight: 'p99 spikes correlated with cache misses during content refreshes.',
            transformation: 'No tail latency visibility → real-time percentile tracking with alerting.',
            nextStep: 'Implement predictive cache warming.',
            owner: '@SRE',
            impact: 'User experience',
            stats: [{ label: 'p50', value: '120ms' }, { label: 'p99', value: '450ms' }]
        },
        dataQuality: {
            title: 'Data Quality Scorecard',
            subtitle: 'Content data health metrics',
            description: 'Completeness, accuracy, consistency, and freshness of content metadata.',
            insight: 'Data quality score improved from 72% to 94%.',
            transformation: 'Manual spot checks → continuous automated quality monitoring.',
            nextStep: 'Add anomaly detection for quality drift.',
            owner: '@Data Engineering',
            impact: 'Data reliability',
            stats: [{ label: 'Overall Score', value: '94%' }, { label: 'Dimensions', value: '4' }]
        },
        journeyMap: {
            title: 'Journey Map: Producer Experience',
            subtitle: 'Content producer workflow transformed',
            description: 'Content producer journey: Brief → Draft → AI Assist → MLR → Approved → Field.',
            insight: 'Emotional score: 3/5 → 5/5 with 65% faster approval cycles.',
            transformation: 'Dreaded MLR submissions → confident submissions with AI pre-checks.',
            nextStep: 'Launch monthly office hours for advanced AI features.',
            owner: '@Learning & Development',
            impact: 'User adoption',
            stats: [{ label: 'Users Trained', value: '200+' }, { label: 'Satisfaction', value: '4.2/5' }]
        },
        orgHealth: {
            title: 'Org Health Dashboard',
            subtitle: 'Team adoption and satisfaction',
            description: 'Team adoption rates, satisfaction scores, engagement metrics across BUs.',
            insight: 'Teams with AI champions showed 40% higher adoption.',
            transformation: 'No adoption visibility → real-time org health metrics.',
            nextStep: 'Scale AI champion program to remaining BUs.',
            owner: '@Change Management',
            impact: 'Organizational adoption',
            stats: [{ label: 'Adoption Rate', value: '85%' }, { label: 'Teams', value: '5' }]
        },
        waterfall: {
            title: 'Waterfall: Cost Breakdown',
            subtitle: 'Annual savings analysis ($2.08M)',
            description: 'Baseline costs → net savings showing cumulative improvements.',
            insight: 'MLR cycles (45%), revisions (20%), agency (18%), producer hours (12%).',
            transformation: '42-day cycles, $4.2M → 14-day cycles, $2.08M net.',
            nextStep: 'Expand to 3 additional therapeutic areas in Q2.',
            owner: '@Product Management',
            impact: 'ROI validation',
            stats: [{ label: 'Baseline', value: '$4.2M' }, { label: 'Savings', value: '$2.12M' }]
        },
        unitEconomics: {
            title: 'Unit Economics',
            subtitle: 'Per-asset cost analysis',
            description: 'Value per content asset vs. cost to produce, showing margin and ROI.',
            insight: 'Cost per approved asset: $1,720 → $850 (51% reduction).',
            transformation: 'High variable costs → fixed AI infrastructure amortized across volume.',
            nextStep: 'Model economics at 2x and 5x current volume.',
            owner: '@Finance',
            impact: 'Unit profitability',
            stats: [{ label: 'Cost/Asset', value: '$850' }, { label: 'ROI', value: '4.2×' }]
        },
        calendarHeatmap: {
            title: 'Calendar Heatmap',
            subtitle: 'Activity density over time',
            description: 'Daily activity patterns: peak usage, seasonality, trends.',
            insight: 'Q4 showed 3x activity spike aligned with product launches.',
            transformation: 'No usage visibility → clear seasonality insights.',
            nextStep: 'Align infrastructure scaling with seasonal patterns.',
            owner: '@Operations',
            impact: 'Capacity planning',
            stats: [{ label: 'Peak Day', value: '847 queries' }, { label: 'Avg/Day', value: '312' }]
        },
        sparklineGrid: {
            title: 'Sparkline Grid',
            subtitle: 'Multi-metric trend overview',
            description: 'Multiple KPIs with trend lines for at-a-glance monitoring.',
            insight: 'All 6 key metrics trending positive, with cycle time showing strongest improvement.',
            transformation: 'Before: Scattered metrics in multiple dashboards. After: Unified KPI view.',
            nextStep: 'Add predictive trend lines for forecasting',
            owner: '@Analytics',
            impact: 'Executive visibility',
            stats: [{ label: 'Metrics Tracked', value: '6' }, { label: 'Trend', value: '↑ All positive' }]
        }
    };
    return metadata[chartKey] || {
        title: chartKey,
        subtitle: '',
        description: '',
        insight: '',
        transformation: '',
        nextStep: '',
        owner: '',
        impact: '',
        stats: []
    };
};

// Get phase PURPOSE LINE (executive orientation)
const getPhasePurpose = (phaseName: string): string => {
    if (!phaseName) return '';
    const purposes: Record<string, string> = {
        diagnose: 'Identify the bottleneck and quantify the operational baseline.',
        architect: 'Design the governed system that survives security, compliance, and scale.',
        engineer: 'Prove the system works under real workloads with production metrics.',
        enable: 'Ensure cross-team adoption, training, and behavioral change.',
        impact: 'Demonstrate measurable outcomes, ROI, and expansion pathways.'
    };
    return purposes[phaseName.toLowerCase()] || '';
};

// Get phase KEY RESULT summary
const getPhaseSummary = (phaseName: string): string => {
    if (!phaseName) return '';
    const summaries: Record<string, string> = {
        diagnose: 'Found the real bottleneck: content retrieval and version duplication.',
        architect: 'Designed a compliant AI engine that fit inside governance perimeter.',
        engineer: 'Built a production-grade RAG pipeline with measurable performance gains.',
        enable: 'Ensured AI adoption scaled across global brand teams.',
        impact: 'Delivered $2M+ annual savings with 65% faster review cycles.'
    };
    return summaries[phaseName.toLowerCase()] || '';
};

// Get phase color for pills
const getPhaseColor = (phaseName: string): string => {
    if (!phaseName) return '#666';
    const colors: Record<string, string> = {
        diagnose: '#6366f1',  // indigo
        architect: '#8b5cf6', // violet
        engineer: '#0d9488',  // teal
        enable: '#f59e0b',    // amber
        impact: '#10b981'     // emerald
    };
    return colors[phaseName.toLowerCase()] || '#666';
};

// ═══════════════════════════════════════════════════════════════════════════════
// CANONICAL CHART ORDER — Phase → Chart keys (in display order)
// ═══════════════════════════════════════════════════════════════════════════════
// This is the single source of truth for chart sequence per phase.
// All case studies inherit this order; individual charts are optional.
// ═══════════════════════════════════════════════════════════════════════════════
type ChartKey = keyof CaseStudyCharts;

const phaseChartOrder: Record<PhaseKey, ChartKey[]> = {
    diagnose: ['funnel', 'raciMatrix'],
    architect: ['systemContext', 'ragPipeline', 'gantt'],
    engineer: ['serviceHealth', 'latencyPercentiles', 'modelCard', 'dataQuality'],
    enable: ['journeyMap', 'orgHealth'],
    impact: ['waterfall', 'unitEconomics', 'calendarHeatmap', 'sparklineGrid'],
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHART WRAPPER — Renders chart with metadata in CollapsibleChart
// ═══════════════════════════════════════════════════════════════════════════════

interface ChartWrapperProps {
    chartKey: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ chartKey, children, defaultExpanded = false }) => {
    const meta = getChartMeta(chartKey);
    
    return (
        <div style={{ marginBottom: '64px' }}>
            <CollapsibleChart 
                title={meta.title}
                subtitle={meta.subtitle}
                description={meta.description}
                defaultExpanded={defaultExpanded}
            >
                {/* Chart Container */}
                <div style={{ 
                    backgroundColor: '#fafafa', 
                    borderRadius: '12px', 
                    padding: '16px 20px',
                    border: '1px solid #e8e8e8',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '16px'
                }}>
                    {children}
                </div>

                {/* Compressed Insight Footer */}
                <div style={{ 
                    backgroundColor: '#f9f9f9',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    border: '1px solid #e8e8e8',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr auto',
                    gap: '16px',
                    alignItems: 'center'
                }}>
                    {/* Insight */}
                    <div>
                        <span style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Insight</span>
                        <p style={{ fontSize: '13px', color: '#333', margin: 0, lineHeight: 1.4 }}>{meta.insight}</p>
                    </div>

                    {/* Transformation */}
                    <div>
                        <span style={{ fontSize: '10px', color: '#0d9488', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Transformation</span>
                        <p style={{ fontSize: '13px', color: '#222', margin: 0, lineHeight: 1.4, fontWeight: 500 }}>{meta.transformation}</p>
                    </div>

                    {/* Next Step */}
                    <div>
                        <span style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 500, display: 'block', marginBottom: '4px' }}>Next Step</span>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: '#000', margin: 0, lineHeight: 1.4 }}>{meta.nextStep}</p>
                    </div>

                    {/* Approved Badge */}
                    <div style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '10px 20px', borderRadius: '20px', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                        Approved <span>✓</span>
                    </div>
                </div>
            </CollapsibleChart>
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXECUTIVE HEADER — Full case study context block
// ═══════════════════════════════════════════════════════════════════════════════

const ExecutiveHeader: React.FC<{ summary?: CaseStudyExecutiveSummary }> = ({ summary }) => {
    if (!summary) return null;

    return (
        <section
            style={{
                marginTop: '32px',
                marginBottom: '40px',
                padding: '24px',
                borderRadius: '16px',
                backgroundColor: '#f7f7f8',
                border: '1px solid #e3e4ea',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
            }}
        >
            <div>
                <h3 style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, color: '#666' }}>
                    Problem & Context
                </h3>
                <p style={{ fontSize: 13, marginBottom: 4, color: '#333' }}><strong>Client:</strong> {summary.client}</p>
                <p style={{ fontSize: 13, marginBottom: 4, color: '#333' }}><strong>Context:</strong> {summary.context}</p>
                <p style={{ fontSize: 13, marginBottom: 4, color: '#333' }}><strong>Primary Constraint:</strong> {summary.primaryConstraint}</p>
                <p style={{ fontSize: 13, color: '#333' }}><strong>Primary Problem:</strong> {summary.primaryProblem}</p>
            </div>

            <div>
                <h3 style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, color: '#666' }}>
                    Solution Pattern
                </h3>
                <p style={{ fontSize: 13, marginBottom: 4, color: '#333' }}>{summary.solutionPattern}</p>
                <p style={{ fontSize: 13, marginBottom: 4, color: '#333' }}><strong>Scope:</strong> {summary.scope}</p>
                <p style={{ fontSize: 13, color: '#333' }}><strong>Engagement Role:</strong> {summary.engagementRole}</p>
            </div>

            <div>
                <h3 style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, color: '#666' }}>
                    Impact Snapshot
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 13, color: '#333' }}>
                    <li style={{ marginBottom: 4 }}><strong>Cycle Time:</strong> {summary.impact.cycleTime}</li>
                    <li style={{ marginBottom: 4 }}><strong>Throughput:</strong> {summary.impact.throughput}</li>
                    <li style={{ marginBottom: 4 }}><strong>Cost:</strong> {summary.impact.cost}</li>
                    <li><strong>Risk:</strong> {summary.impact.risk}</li>
                </ul>
            </div>
        </section>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE INTRO — Challenge/Outcome per phase
// ═══════════════════════════════════════════════════════════════════════════════

const PhaseIntro: React.FC<{ phaseKey: PhaseKey; phasesMeta?: PhaseNarrativeMeta[] }> = ({
    phaseKey,
    phasesMeta,
}) => {
    if (!phasesMeta) return null;
    const meta = phasesMeta.find((p) => p.key === phaseKey);
    if (!meta) return null;

    return (
        <div style={{ marginBottom: 20, padding: '16px 20px', backgroundColor: '#fafbfc', borderRadius: '12px', border: '1px solid #e8e8e8' }}>
            <p style={{ fontSize: 13, color: '#555', marginBottom: 8, lineHeight: 1.5 }}>
                <strong style={{ color: '#0d9488' }}>Challenge:</strong> {meta.challenge}
            </p>
            <p style={{ fontSize: 13, color: '#555', margin: 0, lineHeight: 1.5 }}>
                <strong style={{ color: '#0d9488' }}>Outcome:</strong> {meta.outcome}
            </p>
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE BLOCK — Renders narrative + all charts for a phase
// ═══════════════════════════════════════════════════════════════════════════════

interface PhaseBlockProps {
    phase: PhaseSection;
    phaseName: string;
    isLast?: boolean;
    charts: CaseStudyCharts;
    phasesMeta?: PhaseNarrativeMeta[];
}

const PhaseBlock: React.FC<PhaseBlockProps> = ({ phase, phaseName, isLast = false, charts, phasesMeta }) => {
    const phaseId = phaseName.toLowerCase() as PhaseId;
    
    // Build customMeta from phasesMeta if available
    const phaseMeta = phasesMeta?.find(p => p.key === phaseId);
    const customMeta = phaseMeta ? {
        eyebrow: phaseMeta.challenge,
        summary: phaseMeta.outcome,
    } : undefined;

    // ═══════════════════════════════════════════════════════════════════════════
    // CHART–SECTION MAPPING — Canonical order per phase
    // ═══════════════════════════════════════════════════════════════════════════
    // Diagnose:  Funnel → RACI
    // Architect: System Context → RAG Pipeline → Gantt
    // Engineer:  Service Health → Latency → Model Card → Data Quality
    // Enable:    Journey Map → Org Health
    // Impact:    Waterfall → Unit Economics → Calendar Heatmap → Sparkline Grid
    // ═══════════════════════════════════════════════════════════════════════════
    const renderPhaseCharts = () => {
        const phaseKey = phaseName.toLowerCase();
        
        switch (phaseKey) {
            case 'diagnose':
                return (
                    <>
                        {/* 1. Funnel Chart — Content Pipeline */}
                        <ChartWrapper chartKey="funnel">
                            <FunnelChart data={charts.funnel as any} width={800} height={420} title="" />
                        </ChartWrapper>
                        
                        {/* 2. RACI Matrix — Accountability Map */}
                        <ChartWrapper chartKey="raciMatrix">
                            <RACIMatrix data={charts.raciMatrix as any} width={900} height={500} title="" />
                        </ChartWrapper>
                    </>
                );
                
            case 'architect':
                return (
                    <>
                        {/* 3. C4 System Context — Regulated boundary architecture */}
                        <ChartWrapper chartKey="systemContext">
                            <SystemContextDiagram data={charts.systemContext as any} width={900} height={700} title="" />
                        </ChartWrapper>
                        
                        {/* 4. RAG Pipeline — Retrieval-augmented generation flow */}
                        {charts.ragPipeline && (
                            <ChartWrapper chartKey="ragPipeline">
                                <RAGPipeline data={charts.ragPipeline as any} width={1100} height={700} title="" />
                            </ChartWrapper>
                        )}
                        
                        {/* 5. Gantt Timeline — Discovery → Arch → Eng → Enable */}
                        <ChartWrapper chartKey="gantt">
                            <GanttChart data={charts.gantt as any} width={900} height={520} title="" weeksToShow={14} />
                        </ChartWrapper>
                    </>
                );
                
            case 'engineer':
                return (
                    <>
                        {/* 6. Service Health Dashboard — Uptime, latency, throughput */}
                        <ChartWrapper chartKey="serviceHealth">
                            <ServiceHealthDashboard data={charts.serviceHealth as any} width={900} height={480} title="" />
                        </ChartWrapper>
                        
                        {/* 7. Latency Percentiles — API response time distribution */}
                        {charts.latencyPercentiles && (
                            <ChartWrapper chartKey="latencyPercentiles">
                                <LatencyPercentiles data={charts.latencyPercentiles as any} width={900} height={400} title="" />
                            </ChartWrapper>
                        )}
                        
                        {/* 8. Model Card — ML model documentation */}
                        {charts.modelCard && (
                            <ChartWrapper chartKey="modelCard">
                                <ModelCard data={charts.modelCard as any} width={900} height={600} title="" />
                            </ChartWrapper>
                        )}
                        
                        {/* 9. Data Quality Scorecard — Content data health */}
                        {charts.dataQuality && (
                            <ChartWrapper chartKey="dataQuality">
                                <DataQualityScorecard data={charts.dataQuality as any} width={900} height={400} title="" />
                            </ChartWrapper>
                        )}
                    </>
                );
                
            case 'enable':
                return (
                    <>
                        {/* 10. Journey Map — Producer Experience */}
                        <ChartWrapper chartKey="journeyMap">
                            <CustomerJourneyMap data={charts.journeyMap as any} width={900} height={600} title="" />
                        </ChartWrapper>
                        
                        {/* 11. Org Health Dashboard — Team adoption & satisfaction */}
                        {charts.orgHealth && (
                            <ChartWrapper chartKey="orgHealth">
                                <OrgHealthDashboard data={charts.orgHealth as any} width={900} height={500} title="" />
                            </ChartWrapper>
                        )}
                    </>
                );
                
            case 'impact':
                return (
                    <>
                        {/* 12. Waterfall — Cost Breakdown */}
                        <ChartWrapper chartKey="waterfall">
                            <WaterfallChart data={charts.waterfall as any} width={800} height={400} title="" />
                        </ChartWrapper>
                        
                        {/* 13. Unit Economics — Per-asset cost analysis */}
                        <ChartWrapper chartKey="unitEconomics">
                            <UnitEconomics data={charts.unitEconomics as any} width={900} height={500} title="" />
                        </ChartWrapper>
                        
                        {/* 14. Calendar Heatmap — Activity density */}
                        {charts.calendarHeatmap && (
                            <ChartWrapper chartKey="calendarHeatmap">
                                <CalendarHeatmap data={(charts.calendarHeatmap as any).data} width={900} height={200} title="" />
                            </ChartWrapper>
                        )}
                        
                        {/* 15. Sparkline Grid — Multi-metric KPI trends */}
                        {charts.sparklineGrid && (
                            <ChartWrapper chartKey="sparklineGrid">
                                <SparklineGrid data={charts.sparklineGrid as any} width={900} height={400} title="" />
                            </ChartWrapper>
                        )}
                    </>
                );
                
            default:
                return null;
        }
    };

    return (
        <div 
            id={phase.id} 
            className="cs-section"
            style={{ 
                borderBottom: !isLast ? '1px solid #eee' : 'none',
                scrollMarginTop: '100px'
            }}
        >
            <div className="container container-1230">
                {/* New PhaseHeader Component */}
                <PhaseHeader phase={phaseId} customMeta={customMeta} />

                <div className="cs-phase-row">
                    {/* Left Column - Narrative */}
                    <div className="cs-phase-col-left">
                        <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.7, marginBottom: '24px' }}>{phase.description}</p>
                        
                        {/* Points - Tight Bullet List */}
                        {phase.points && phase.points.length > 0 && (
                            <ul style={{ margin: '0 0 24px 0', padding: '0 0 0 18px', listStyle: 'disc' }}>
                                {phase.points.map((point, i) => (
                                    <li key={i} style={{ padding: '4px 0', fontSize: '14px', color: '#333', lineHeight: 1.5 }}>{point}</li>
                                ))}
                            </ul>
                        )}

                        {/* Deliverables */}
                        {phase.deliverables && phase.deliverables.length > 0 && (
                            <div style={{ marginBottom: '24px' }}>
                                <span style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '12px' }}>Deliverables</span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {phase.deliverables.map((item, i) => (
                                        <span key={i} style={{ padding: '6px 12px', backgroundColor: '#f5f5f5', borderRadius: '14px', fontSize: '13px', color: '#333' }}>{item}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Stakeholders */}
                        {phase.stakeholders && phase.stakeholders.length > 0 && (
                            <div style={{ borderTop: '1px solid #eee', marginTop: '24px', paddingTop: '8px' }}>
                                {phase.stakeholders.map((stakeholder, i) => (
                                    <div key={i} style={{ padding: '16px 0', borderBottom: '1px solid #eee' }}>
                                        <span style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>{stakeholder.role}</span>
                                        <span style={{ fontSize: '14px', fontWeight: 500 }}>{stakeholder.contribution}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Metrics/Testimonial */}
                    <div className="cs-phase-col-right">
                        {/* Metrics */}
                        {phase.metrics && phase.metrics.length > 0 && (
                            <div style={{ backgroundColor: '#f8f8f8', borderRadius: '24px', padding: '28px', marginBottom: '32px' }}>
                                {phase.metrics.map((metric, i) => (
                                    <div key={i} style={{ padding: '18px 0', borderBottom: i < phase.metrics!.length - 1 ? '1px solid #ddd' : 'none' }}>
                                        <span style={{ fontSize: '14px', color: '#666', display: 'block', marginBottom: '8px' }}>{metric.label}</span>
                                        <span style={{ fontSize: '32px', fontWeight: 700 }}>
                                            {metric.numericValue !== undefined ? (
                                                <><AnimatedCounter min={0} max={metric.numericValue} />{metric.suffix}</>
                                            ) : metric.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Testimonial */}
                        {phase.testimonial && (
                            <div style={{ 
                                marginTop: '32px', 
                                padding: '32px 36px', 
                                backgroundColor: '#0d1117', 
                                borderRadius: '24px', 
                                color: '#fff',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                            }}>
                                <p style={{ fontSize: '22px', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '24px', fontWeight: 400 }}>
                                    &ldquo;{phase.testimonial.quote}&rdquo;
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                                    <div>
                                        <strong style={{ display: 'block', fontSize: '16px', fontWeight: 600 }}>{phase.testimonial.author}</strong>
                                        <span style={{ color: '#0d9488', fontSize: '14px', fontWeight: 500 }}>{phase.testimonial.role}, {phase.testimonial.company}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Phase Charts */}
                <div style={{ marginTop: '48px' }}>
                    {renderPhaseCharts()}
                </div>
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════════

const CaseStudyTemplate: React.FC<CaseStudyTemplateProps> = ({ study, charts }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const images = containerRef.current.querySelectorAll('.parallax-image');
        images.forEach((image) => {
            gsap.fromTo(image, 
                { y: 50 },
                {
                    y: -50,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: image,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // Guard clause for undefined props
    if (!study || !charts) {
        return (
            <div style={{ padding: '100px', textAlign: 'center' }}>
                <h1>Loading case study...</h1>
            </div>
        );
    }

    const phases = study.phases;

    return (
        <>
            <style>{responsiveStyles}</style>
            
            <div id="magic-cursor" className="cursor-bg-red-2">
                <div id="ball"></div>
            </div>

            <PortfolioWebglHeader />

            <div className="case-study-template" style={{ paddingBottom: '10px', backgroundImage: 'url(/assets/img/background.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} ref={containerRef}>
                {/* Hero Section */}
                <div id="overview" className="cs-section cs-hero-section" style={{ paddingTop: '40px', borderBottom: '1px solid #eee', scrollMarginTop: '100px' }}>
                    <div className="container container-1230">
                        {/* Logo + Subtitle Row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
                            {/* Logo */}
                            {study.brandLogo ? (
                                <img 
                                    src={study.brandLogo} 
                                    alt={study.title}
                                    className="cs-hero-logo"
                                    style={{ margin: 0 }}
                                />
                            ) : (
                                <h1 style={{ fontSize: 'clamp(42px, 6vw, 72px)', fontWeight: 700, lineHeight: 1.1, margin: 0, color: '#000' }}>
                                    {study.title}
                                </h1>
                            )}
                            
                            {/* Subtitle */}
                            {study.subtitle && (
                                <h2 style={{ fontSize: '34px', fontWeight: 500, color: '#666', margin: 0 }}>
                                    {study.subtitle}
                                </h2>
                            )}
                        </div>
                        
                        {/* Hero Image - Full Width */}
                        <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '32px', boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
                            <img src={study.heroImage} alt={study.title} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
                        </div>

                        {/* Description */}
                        <p style={{ fontSize: '26px', lineHeight: 1.4, color: '#444', margin: '0 0 40px 0', fontWeight: 500 }}>
                            {study.overview}
                        </p>

                        <div className="row">
                            <div className="col-12">
                                {/* Hero Metrics - Full Width & Large */}
                                {study.heroMetrics && (
                                    <div style={{ 
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '32px',
                                        paddingTop: '24px',
                                        gap: '32px',
                                    }}>
                                        {study.heroMetrics.map((metric, i) => (
                                            <div key={i} style={{ flex: 1 }}>
                                                <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                                                    {metric.label}
                                                </span>
                                                <span style={{ fontSize: '48px', fontWeight: 800, color: '#0d9488', display: 'block', lineHeight: 1, marginBottom: '6px' }}>
                                                    {metric.value}
                                                </span>
                                                <span style={{ fontSize: '15px', color: '#666', fontWeight: 500 }}>
                                                    {metric.delta}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Phase Sections — Canonical Order */}
                {phases && (
                    <>
                        <PhaseBlock phase={phases.diagnose} phaseName="Diagnose" charts={charts} phasesMeta={study.phasesMeta} />
                        <PhaseBlock phase={phases.architect} phaseName="Architect" charts={charts} phasesMeta={study.phasesMeta} />
                        <PhaseBlock phase={phases.engineer} phaseName="Engineer" charts={charts} phasesMeta={study.phasesMeta} />
                        <PhaseBlock phase={phases.enable} phaseName="Enable" charts={charts} phasesMeta={study.phasesMeta} />
                        <PhaseBlock phase={phases.impact} phaseName="Impact" isLast charts={charts} phasesMeta={study.phasesMeta} />
                    </>
                )}

                {/* Next Case Study Button */}
                {study.nextCaseStudy && (
                    <div className="cs-section" style={{ borderTop: '1px solid #eee', paddingTop: '40px', paddingBottom: '40px' }}>
                        <div className="container container-1230">
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <a href={study.nextCaseStudy.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 24px', backgroundColor: '#000', color: '#fff', borderRadius: '14px', textDecoration: 'none', fontSize: '15px', fontWeight: 600, transition: 'all 0.3s ease' }}>
                                    View Next Case Study <span style={{ fontSize: '18px' }}>→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                )}


                {/* Connect CTA */}
                <div className="cta-footer-grain cs-section" style={{ backgroundColor: '#0d9488', color: '#fff', borderRadius: '24px', margin: '20px 20px 10px', position: 'relative', overflow: 'hidden', padding: '60px 0' }}>
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '24px', zIndex: 1, pointerEvents: 'none', opacity: 0.4, mixBlendMode: 'overlay' as const,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        filter: 'contrast(200%) brightness(150%)',
                    }} />
                    <div className="container container-1230" style={{ position: 'relative', zIndex: 2 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h4 className="cs-section-title-no-margin" style={{ color: '#fff', margin: 0 }}>Connect</h4>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <a href="tel:+19177171894" style={{ width: '60px', height: '60px', border: '2px solid #fff', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.99C20.44 21.05 19.87 21.08 19.29 21.08C10.23 21.08 2.92 13.77 2.92 4.71C2.92 4.13 2.95 3.56 3.01 3C3.07 2.44 3.52 2 4.08 2H7.08C7.56 2 7.97 2.34 8.06 2.81C8.24 3.76 8.53 4.68 8.92 5.55C9.09 5.93 9 6.38 8.68 6.67L7.01 8.34C8.39 11.02 10.98 13.61 13.66 14.99L15.33 13.32C15.62 13 16.07 12.91 16.45 13.08C17.32 13.47 18.24 13.76 19.19 13.94C19.66 14.03 20 14.44 20 14.92V16.92H22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </a>
                                <a href="mailto:cmangun@gmail.com" style={{ width: '60px', height: '60px', border: '2px solid #fff', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </a>
                                <a href="https://www.linkedin.com/in/christopher-mangun-5257265/" target="_blank" rel="noopener noreferrer" style={{ width: '60px', height: '60px', border: '2px solid #fff', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </a>
                                <a href="https://github.com/cmangun" target="_blank" rel="noopener noreferrer" style={{ width: '60px', height: '60px', border: '2px solid #fff', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 19C4 20.5 4 16.5 2 16M16 22V18.13C16.0375 17.6532 15.9731 17.1738 15.811 16.7238C15.6489 16.2738 15.3929 15.8634 15.06 15.52C18.2 15.17 21.5 13.98 21.5 8.52C21.4997 7.12383 20.9627 5.7812 20 4.77C20.4559 3.54851 20.4236 2.19835 19.91 1C19.91 1 18.73 0.650001 16 2.48C13.708 1.85882 11.292 1.85882 9 2.48C6.27 0.650001 5.09 1 5.09 1C4.57638 2.19835 4.54414 3.54851 5 4.77C4.03013 5.7887 3.49252 7.14346 3.5 8.55C3.5 13.97 6.8 15.16 9.94 15.55C9.611 15.89 9.35726 16.2954 9.19531 16.7399C9.03335 17.1844 8.96681 17.6581 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CaseStudyTemplate;
