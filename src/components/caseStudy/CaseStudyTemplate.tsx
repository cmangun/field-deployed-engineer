// src/components/caseStudy/CaseStudyTemplate.tsx
// ═══════════════════════════════════════════════════════════════════════════════
// CASE STUDY TEMPLATE — Renders NormalizedCaseStudy with ChartRegistry
// Contract: study: NormalizedCaseStudy, charts: CaseStudyCharts
// ═══════════════════════════════════════════════════════════════════════════════

"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { CaseStudyCharts } from '@/types/caseStudy';
import type { NormalizedCaseStudy, CaseStudySection, HeroStat, CaseStudyMetricBlock } from '@/data/caseStudies/types';
import { chartRegistry, ChartConfig } from '@/charts_D3/chartRegistry';
import AnimatedCounter from '../counter/AnimatedCounter';
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import { PhaseHeader, PhaseId } from './PhaseHeader';
import CollapsibleChart from './CollapsibleChart';

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════════════════
// RESPONSIVE STYLES — Polished spacing & typography
// ═══════════════════════════════════════════════════════════════════════════════

const responsiveStyles = `
    /* ─────────────────────────────────────────────────────────────────────────────
       TYPOGRAPHY SCALE
       ───────────────────────────────────────────────────────────────────────────── */
    .cs-title-main { font-size: clamp(48px, 8vw, 90px); font-weight: 700; margin-bottom: 8px; line-height: 1.05; }
    .cs-subtitle-main { font-size: clamp(28px, 4vw, 48px); font-weight: 500; margin: 0; line-height: 1.25; color: #555; }
    .cs-section-title { font-size: clamp(32px, 5vw, 56px); font-weight: 700; margin-bottom: 40px; word-wrap: break-word; }
    .cs-section-title-no-margin { font-size: clamp(32px, 5vw, 56px); font-weight: 700; word-wrap: break-word; }
    .cs-phase-label { font-size: clamp(48px, 6vw, 72px); font-weight: 800; color: #0d9488; margin-bottom: 12px; }
    
    /* ─────────────────────────────────────────────────────────────────────────────
       SECTION SPACING
       ───────────────────────────────────────────────────────────────────────────── */
    .cs-section { padding-top: 48px; padding-bottom: 48px; }
    .cs-hero-section { padding-top: 32px !important; padding-bottom: 40px !important; }
    
    /* ─────────────────────────────────────────────────────────────────────────────
       HERO COMPONENTS
       ───────────────────────────────────────────────────────────────────────────── */
    .cs-hero-logo { height: 100px; width: auto; object-fit: contain; }
    .cs-hero-metrics { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); 
        gap: 24px; 
    }
    .cs-hero-stat {
        min-width: 0;
    }
    
    /* ─────────────────────────────────────────────────────────────────────────────
       PHASE LAYOUT
       ───────────────────────────────────────────────────────────────────────────── */
    .cs-phase-row { display: flex; flex-wrap: wrap; gap: 40px; margin-top: 24px; }
    .cs-phase-col-left { flex: 0 0 42%; max-width: 42%; }
    .cs-phase-col-right { flex: 0 0 calc(58% - 40px); max-width: calc(58% - 40px); }
    
    /* ─────────────────────────────────────────────────────────────────────────────
       BULLETS — Cleaner list styling
       ───────────────────────────────────────────────────────────────────────────── */
    .cs-bullet-list {
        margin: 0 0 20px 0;
        padding: 0;
        list-style: none;
    }
    .cs-bullet-list li {
        position: relative;
        padding: 5px 0 5px 20px;
        font-size: 14px;
        color: #444;
        line-height: 1.55;
    }
    .cs-bullet-list li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 12px;
        width: 6px;
        height: 6px;
        background: #0d9488;
        border-radius: 50%;
    }
    
    /* ─────────────────────────────────────────────────────────────────────────────
       IMPACT SECTION EMPHASIS
       ───────────────────────────────────────────────────────────────────────────── */
    .cs-section-impact {
        background: linear-gradient(180deg, rgba(13, 148, 136, 0.03) 0%, rgba(13, 148, 136, 0.08) 100%);
        border-top: 3px solid #0d9488;
        margin-top: 8px;
    }
    .cs-section-impact .cs-metric-value {
        font-size: 40px !important;
        font-weight: 800 !important;
    }
    .cs-section-impact .cs-metric-delta {
        font-size: 18px !important;
        font-weight: 700 !important;
    }
    
    /* ─────────────────────────────────────────────────────────────────────────────
       CHART CARDS — Tighter padding, left-aligned
       ───────────────────────────────────────────────────────────────────────────── */
    .cs-chart-container {
        background-color: #fafafa;
        border-radius: 10px;
        padding: 12px 16px;
        border: 1px solid #e5e5e5;
        overflow: hidden;
        margin-bottom: 12px;
    }
    .cs-chart-footer {
        background-color: #f7f7f7;
        border-radius: 10px;
        padding: 14px 18px;
        border: 1px solid #e5e5e5;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr auto;
        gap: 14px;
        align-items: center;
    }
    .cs-chart-footer-label {
        font-size: 9px;
        color: #999;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        font-weight: 600;
        display: block;
        margin-bottom: 3px;
    }
    .cs-chart-footer-text {
        font-size: 12px;
        color: #444;
        margin: 0;
        line-height: 1.35;
    }
    
    /* ─────────────────────────────────────────────────────────────────────────────
       CONNECT FOOTER
       ───────────────────────────────────────────────────────────────────────────── */
    .cs-connect-footer {
        margin-top: 64px !important;
    }
    .cs-connect-icons {
        display: flex;
        gap: 16px;
        align-items: center;
    }
    .cs-connect-icon {
        width: 52px;
        height: 52px;
        border: 2px solid rgba(255,255,255,0.8);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        text-decoration: none;
        transition: all 0.2s ease;
        font-size: 20px;
    }
    .cs-connect-icon:hover {
        background: rgba(255,255,255,0.15);
        transform: translateY(-2px);
    }
    
    /* ─────────────────────────────────────────────────────────────────────────────
       RESPONSIVE BREAKPOINTS
       ───────────────────────────────────────────────────────────────────────────── */
    @media (max-width: 991px) {
        .cs-title-main { margin-bottom: 6px; }
        .cs-subtitle-main { margin-bottom: 16px; font-size: clamp(22px, 3.5vw, 32px); }
        .cs-section-title { margin-bottom: 28px; font-size: clamp(28px, 4vw, 40px); }
        .cs-phase-label { font-size: clamp(36px, 5vw, 48px); margin-bottom: 16px; }
        .cs-section { padding-top: 32px; padding-bottom: 32px; }
        .cs-phase-row { gap: 28px; margin-top: 20px; }
        .cs-phase-col-left { flex: 0 0 100%; max-width: 100%; }
        .cs-phase-col-right { flex: 0 0 100%; max-width: 100%; }
        .cs-chart-footer { grid-template-columns: 1fr 1fr; gap: 12px; }
        .cs-connect-footer { margin-top: 48px !important; }
    }
    
    @media (max-width: 767px) {
        .cs-hero-logo { height: 64px; }
        .cs-hero-metrics { grid-template-columns: 1fr; gap: 20px; }
        .cs-section { padding-top: 24px; padding-bottom: 24px; }
        .cs-hero-section { padding-top: 20px !important; padding-bottom: 28px !important; }
        .cs-phase-row { gap: 20px; margin-top: 16px; }
        .cs-chart-footer { grid-template-columns: 1fr; gap: 10px; padding: 12px 14px; }
        .cs-connect-footer { margin-top: 32px !important; }
        .cs-connect-icons { gap: 12px; }
        .cs-connect-icon { width: 44px; height: 44px; border-radius: 12px; font-size: 18px; }
    }
`;

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE PROPS — NormalizedCaseStudy only
// ═══════════════════════════════════════════════════════════════════════════════

interface CaseStudyTemplateProps {
    study: NormalizedCaseStudy;
    charts: CaseStudyCharts;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHART METADATA — Extended metadata for chart insights
// ═══════════════════════════════════════════════════════════════════════════════

interface ChartMeta {
    insight: string;
    transformation: string;
    nextStep: string;
}

const getChartInsights = (chartKey: string): ChartMeta => {
    const insights: Record<string, ChartMeta> = {
        FunnelChart: {
            insight: '40% of assets required multiple revision cycles due to retrieval failures.',
            transformation: '25+ min search → <60 sec AI-powered retrieval.',
            nextStep: 'Implement AI-assisted pre-review before MLR submission.'
        },
        RACIMatrix: {
            insight: 'Clear accountability reduced decision cycles from 5 days to 1 day.',
            transformation: 'Unclear ownership → explicit R/A/C/I assignments per workstream.',
            nextStep: 'Review RACI quarterly to reflect org changes.'
        },
        SystemContextDiagram: {
            insight: 'Architecture ensured AI operated inside compliance perimeter.',
            transformation: 'Fragmented content → single AI gateway with audit trails.',
            nextStep: 'Finalize data flow contracts with Veeva and Workfront.'
        },
        RAGPipeline: {
            insight: 'Hybrid retrieval improved relevance 35% over pure vector search.',
            transformation: 'Manual search → AI-powered retrieval with brand/region filtering.',
            nextStep: 'Add re-ranking layer for top-k refinement.'
        },
        GanttChart: {
            insight: 'Parallel workstreams compressed 6-month timeline to 14 weeks.',
            transformation: 'Sequential waterfall → parallel agile sprints.',
            nextStep: 'Lock Phase 2 dependencies before sprint planning.'
        },
        ModelCard: {
            insight: 'Model card documented all training data, bias checks, and limitations.',
            transformation: 'Undocumented AI → transparent, auditable model governance.',
            nextStep: 'Schedule quarterly model reviews with compliance.'
        },
        ServiceHealthDashboard: {
            insight: 'p95 latency improved 67% after caching layer deployment.',
            transformation: '850ms avg response → 280ms with 99.9% uptime.',
            nextStep: 'Set up PagerDuty alerts for SLO breaches.'
        },
        LatencyPercentiles: {
            insight: 'Tail latency (p99) was 3x median due to cold starts.',
            transformation: 'Unpredictable performance → consistent sub-300ms responses.',
            nextStep: 'Implement connection pooling to eliminate cold starts.'
        },
        DataQualityScorecard: {
            insight: 'Data completeness improved from 72% to 96% after validation rules.',
            transformation: 'Manual spot-checks → automated quality gates.',
            nextStep: 'Add anomaly detection for real-time quality monitoring.'
        },
        CustomerJourneyMap: {
            insight: 'Identified 3 friction points causing 45% drop-off in onboarding.',
            transformation: 'Assumed journey → evidence-based touchpoint optimization.',
            nextStep: 'A/B test simplified onboarding flow.'
        },
        OrgHealthDashboard: {
            insight: 'Training completion correlated 0.8 with adoption velocity.',
            transformation: 'Ad-hoc enablement → structured change management.',
            nextStep: 'Launch champions program for super-users.'
        },
        WaterfallChart: {
            insight: 'Cycle time savings drove 45% of total cost reduction.',
            transformation: '$4.2M baseline → $2.08M annual savings.',
            nextStep: 'Reinvest savings into Phase 2 expansion.'
        },
        UnitEconomics: {
            insight: 'Cost per asset dropped 68% while quality scores improved.',
            transformation: 'Manual process → AI-augmented workflow.',
            nextStep: 'Model ROI for additional therapeutic areas.'
        },
        SparklineGrid: {
            insight: 'All 6 KPIs trending positive over 12-week measurement period.',
            transformation: 'Point-in-time metrics → continuous trend visibility.',
            nextStep: 'Set up executive dashboard for monthly reviews.'
        },
        CalendarHeatmap: {
            insight: 'Q4 showed 3x activity spike aligned with product launches.',
            transformation: 'No usage visibility → clear seasonality insights.',
            nextStep: 'Align infrastructure scaling with seasonal patterns.'
        }
    };
    return insights[chartKey] || { insight: '', transformation: '', nextStep: '' };
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHART WRAPPER — Renders chart with metadata in CollapsibleChart
// ═══════════════════════════════════════════════════════════════════════════════

interface ChartWrapperProps {
    chartKey: string;
    chartData: unknown;
    defaultExpanded?: boolean;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ chartKey, chartData, defaultExpanded = false }) => {
    const config = chartRegistry[chartKey];
    if (!config) {
        console.warn(`Chart not found in registry: ${chartKey}`);
        return null;
    }
    
    const insights = getChartInsights(chartKey);
    
    return (
        <div style={{ marginBottom: '56px' }}>
            <CollapsibleChart 
                title={config.title}
                subtitle={config.subtitle || ''}
                description=""
                defaultExpanded={defaultExpanded}
            >
                {/* Chart Container — tighter padding */}
                <div className="cs-chart-container">
                    {config.render(chartData)}
                </div>

                {/* Insight Footer — consistent spacing */}
                {(insights.insight || insights.transformation || insights.nextStep) && (
                    <div className="cs-chart-footer">
                        <div>
                            <span className="cs-chart-footer-label">Insight</span>
                            <p className="cs-chart-footer-text">{insights.insight}</p>
                        </div>
                        <div>
                            <span className="cs-chart-footer-label" style={{ color: '#0d9488' }}>Transformation</span>
                            <p className="cs-chart-footer-text" style={{ fontWeight: 500 }}>{insights.transformation}</p>
                        </div>
                        <div>
                            <span className="cs-chart-footer-label">Next Step</span>
                            <p className="cs-chart-footer-text" style={{ fontWeight: 600, color: '#222' }}>{insights.nextStep}</p>
                        </div>
                        <div style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '8px 16px', borderRadius: '16px', fontSize: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
                            Approved <span>✓</span>
                        </div>
                    </div>
                )}
            </CollapsibleChart>
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION BLOCK — Renders narrative + charts for a section
// ═══════════════════════════════════════════════════════════════════════════════

interface SectionBlockProps {
    section: CaseStudySection;
    charts: CaseStudyCharts;
    isLast?: boolean;
}

const SectionBlock: React.FC<SectionBlockProps> = ({ section, charts, isLast = false }) => {
    const phaseId = section.id as PhaseId;
    const isImpact = section.id === 'impact';
    
    // Build customMeta for PhaseHeader
    const customMeta = {
        eyebrow: section.kpiFocus || '',
        summary: section.summary,
    };

    // Get chart data by key
    const getChartData = (chartKey: string): unknown => {
        const keyMap: Record<string, string> = {
            'FunnelChart': 'funnel',
            'RACIMatrix': 'raciMatrix',
            'SystemContextDiagram': 'systemContext',
            'RAGPipeline': 'ragPipeline',
            'GanttChart': 'gantt',
            'ServiceHealthDashboard': 'serviceHealth',
            'LatencyPercentiles': 'latencyPercentiles',
            'DataQualityScorecard': 'dataQuality',
            'ModelCard': 'modelCard',
            'CustomerJourneyMap': 'journeyMap',
            'OrgHealthDashboard': 'orgHealth',
            'WaterfallChart': 'waterfall',
            'UnitEconomics': 'unitEconomics',
            'SparklineGrid': 'sparklineGrid',
            'CalendarHeatmap': 'calendarHeatmap',
        };
        const dataKey = keyMap[chartKey] || chartKey.charAt(0).toLowerCase() + chartKey.slice(1);
        return (charts as Record<string, unknown>)[dataKey];
    };

    return (
        <div 
            id={section.id} 
            className={`cs-section ${isImpact ? 'cs-section-impact' : ''}`}
            style={{ 
                borderBottom: !isLast && !isImpact ? '1px solid #eee' : 'none',
                scrollMarginTop: '100px'
            }}
        >
            <div className="container container-1230">
                {/* Phase Header — tighter spacing to body */}
                <PhaseHeader phase={phaseId} customMeta={customMeta} />

                <div className="cs-phase-row">
                    {/* Left Column - Narrative */}
                    <div className="cs-phase-col-left">
                        <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.65, marginBottom: '20px' }}>{section.summary}</p>
                        
                        {/* Bullets — cleaner custom bullets */}
                        {section.bullets && section.bullets.length > 0 && (
                            <ul className="cs-bullet-list">
                                {section.bullets.map((bullet, i) => (
                                    <li key={i}>{bullet}</li>
                                ))}
                            </ul>
                        )}

                        {/* Deliverables */}
                        {section.deliverables && section.deliverables.length > 0 && (
                            <div style={{ marginBottom: '20px' }}>
                                <span style={{ fontSize: '11px', color: '#999', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600, display: 'block', marginBottom: '10px' }}>Deliverables</span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {section.deliverables.map((item, i) => (
                                        <span key={i} style={{ padding: '5px 10px', backgroundColor: '#f0f0f0', borderRadius: '12px', fontSize: '12px', color: '#444' }}>{item}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Duration */}
                        {section.duration && (
                            <div style={{ marginTop: '12px', padding: '10px 14px', backgroundColor: '#f5f5f5', borderRadius: '10px', display: 'inline-block' }}>
                                <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 500 }}>Duration: </span>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>{section.duration}</span>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Metrics */}
                    <div className="cs-phase-col-right">
                        {section.metrics && section.metrics.length > 0 && (
                            <div style={{ backgroundColor: isImpact ? 'rgba(255,255,255,0.9)' : '#f8f8f8', borderRadius: '20px', padding: '24px', marginBottom: '28px', border: isImpact ? '1px solid rgba(13, 148, 136, 0.2)' : 'none' }}>
                                {section.metrics.map((metric, i) => (
                                    <div key={i} style={{ padding: '14px 0', borderBottom: i < section.metrics!.length - 1 ? '1px solid #e5e5e5' : 'none' }}>
                                        <span style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>{metric.label}</span>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: '13px', color: '#888' }}>{metric.baseline}</span>
                                            <span style={{ fontSize: '18px', color: '#0d9488' }}>→</span>
                                            <span className="cs-metric-value" style={{ fontSize: isImpact ? '40px' : '32px', fontWeight: isImpact ? 800 : 700, color: '#0d9488' }}>{metric.outcome}</span>
                                            {metric.delta && (
                                                <span className="cs-metric-delta" style={{ fontSize: isImpact ? '18px' : '15px', fontWeight: isImpact ? 700 : 600, color: '#059669', backgroundColor: '#d1fae5', padding: '3px 10px', borderRadius: '10px' }}>{metric.delta}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Section Charts */}
                {section.chartKeys && section.chartKeys.length > 0 && (
                    <div style={{ marginTop: '40px' }}>
                        {section.chartKeys.map((chartKey, i) => {
                            const chartData = getChartData(chartKey);
                            if (!chartData) {
                                console.warn(`No chart data found for key: ${chartKey}`);
                                return null;
                            }
                            return (
                                <ChartWrapper 
                                    key={chartKey}
                                    chartKey={chartKey}
                                    chartData={chartData}
                                    defaultExpanded={i === 0}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
// HERO STATS ROW — Balanced grid layout
// ═══════════════════════════════════════════════════════════════════════════════

const HeroStatsRow: React.FC<{ stats: HeroStat[] }> = ({ stats }) => {
    if (!stats || stats.length === 0) return null;
    
    return (
        <div className="cs-hero-metrics">
            {stats.map((stat, i) => (
                <div key={stat.id || i} className="cs-hero-stat">
                    <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                        {stat.label}
                    </span>
                    <span style={{ fontSize: '44px', fontWeight: 800, color: '#0d9488', display: 'block', lineHeight: 1.05, marginBottom: '4px' }}>
                        {stat.value}
                    </span>
                    {stat.annotation && (
                        <span style={{ fontSize: '14px', color: '#666', fontWeight: 500 }}>
                            {stat.annotation}
                        </span>
                    )}
                </div>
            ))}
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

    // Guard clause
    if (!study || !charts) {
        return (
            <div style={{ padding: '100px', textAlign: 'center' }}>
                <h1>Loading case study...</h1>
            </div>
        );
    }

    return (
        <>
            <style>{responsiveStyles}</style>
            
            <div id="magic-cursor" className="cursor-bg-red-2">
                <div id="ball"></div>
            </div>

            <PortfolioWebglHeader />

            <div className="case-study-template" style={{ paddingBottom: '10px', backgroundImage: 'url(/assets/img/background.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} ref={containerRef}>
                
                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* HERO SECTION — Tightened vertical spacing */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                <div id="overview" className="cs-section cs-hero-section" style={{ borderBottom: '1px solid #eee', scrollMarginTop: '100px' }}>
                    <div className="container container-1230">
                        {/* Logo + Title Row */}
                        <div style={{ marginBottom: '20px' }}>
                            {study.brandLogo ? (
                                <img 
                                    src={study.brandLogo} 
                                    alt={study.title}
                                    className="cs-hero-logo"
                                    style={{ marginBottom: '12px' }}
                                />
                            ) : (
                                <h1 style={{ fontSize: 'clamp(42px, 6vw, 72px)', fontWeight: 700, lineHeight: 1.1, margin: '0 0 8px 0', color: '#000' }}>
                                    {study.client}
                                </h1>
                            )}
                            
                            {study.subtitle && (
                                <h2 className="cs-subtitle-main">
                                    {study.subtitle}
                                </h2>
                            )}
                        </div>
                        
                        {/* Hero Image */}
                        {study.heroImage && (
                            <div style={{ borderRadius: '14px', overflow: 'hidden', marginBottom: '28px', boxShadow: '0 10px 32px rgba(0,0,0,0.10), 0 3px 10px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.05)' }}>
                                <img src={study.heroImage} alt={study.title} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
                            </div>
                        )}

                        {/* Title */}
                        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#000', marginBottom: '10px', lineHeight: 1.25 }}>
                            {study.title}
                        </h1>

                        {/* Category Tags */}
                        {study.category && (
                            <p style={{ fontSize: '15px', color: '#888', marginBottom: '20px' }}>
                                {study.category}
                            </p>
                        )}

                        {/* Hero Stats — balanced grid */}
                        <HeroStatsRow stats={study.heroStats} />
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* PHASE SECTIONS */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                {study.sections.map((section, i) => (
                    <SectionBlock 
                        key={section.id} 
                        section={section} 
                        charts={charts}
                        isLast={i === study.sections.length - 1}
                    />
                ))}

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* CONNECT CTA — Breathing room above, balanced icons */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                <div className="cta-footer-grain cs-section cs-connect-footer" style={{ backgroundColor: '#0d9488', color: '#fff', borderRadius: '20px', margin: '20px 20px 10px', position: 'relative', overflow: 'hidden', padding: '52px 0' }}>
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '20px', zIndex: 1, pointerEvents: 'none', opacity: 0.35, mixBlendMode: 'overlay' as const,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        filter: 'contrast(200%) brightness(150%)',
                    }} />
                    <div className="container container-1230" style={{ position: 'relative', zIndex: 2 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                            <h4 className="cs-section-title-no-margin" style={{ color: '#fff', margin: 0 }}>Connect</h4>
                            <div className="cs-connect-icons">
                                <a href="tel:+19177171894" className="cs-connect-icon" aria-label="Phone">
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                                </a>
                                <a href="mailto:chris@cmangun.com" className="cs-connect-icon" aria-label="Email">
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                                </a>
                                <a href="https://linkedin.com/in/christophermangun" target="_blank" rel="noopener noreferrer" className="cs-connect-icon" aria-label="LinkedIn">
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                                </a>
                                <a href="https://github.com/christophermangun" target="_blank" rel="noopener noreferrer" className="cs-connect-icon" aria-label="GitHub">
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
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
