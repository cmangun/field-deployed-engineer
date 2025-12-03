// Case Study Data Interface
export interface CaseStudySlide {
    id: number;
    type: 'hero' | 'context' | 'approach' | 'solution' | 'results' | 'proof';
    title: string;
    subtitle: string;
    content: string[];
    backgroundImage?: string;
    codeSnippet?: string;
    testimonial?: {
        quote: string;
        author: string;
        role: string;
        company: string;
    };
}

// Chart recommendation for DS3 visualization system
export interface ChartRecommendation {
    chartId: string;
    chartName: string;
    description: string;
}

// Phase section for FDE methodology
export interface PhaseSection {
    id: string;
    title: string;
    duration: string;
    description: string;
    points: string[];
    deliverables?: string[];
    image?: string;
    tools?: {
        label: string;
        value: string;
    }[];
    stakeholders?: {
        role: string;
        contribution: string;
    }[];
    metrics?: {
        value: string;
        numericValue?: number;
        suffix?: string;
        label: string;
    }[];
    testimonial?: {
        quote: string;
        author: string;
        role: string;
        company: string;
    };
    codeSnippet?: {
        language: string;
        filename?: string;
        description?: string;
        code: string;
    };
    // DS3 chart recommendations for this phase
    recommendedCharts?: ChartRecommendation[];
}

// Executive Snapshot for hero section
export interface ExecutiveSnapshot {
    headline: string;
    keyOutcomes: string[];
    impactCharts?: ChartRecommendation[];
}

// ─────────────────────────────────────────────────────────────────────────────
// EXECUTIVE SUMMARY — Full case study context block
// ─────────────────────────────────────────────────────────────────────────────
export interface CaseStudyExecutiveSummary {
    client: string;
    context: string;
    primaryConstraint: string;
    primaryProblem: string;
    solutionPattern: string;
    scope: string;
    engagementRole: string;
    impact: {
        cycleTime: string;
        throughput: string;
        cost: string;
        risk: string;
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE NARRATIVE META — Challenge/Outcome per phase
// ─────────────────────────────────────────────────────────────────────────────
export type PhaseKey = 'diagnose' | 'architect' | 'engineer' | 'enable' | 'impact';

export interface PhaseNarrativeMeta {
    key: PhaseKey;
    title: string;
    challenge: string;
    outcome: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PATTERN FOOTER — How this pattern generalizes
// ─────────────────────────────────────────────────────────────────────────────
export interface PatternGeneralization {
    bestFitEnvironments: string;
    corePrimitives: string;
    whatYouNeedReady: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CASE STUDY DATA — Narrative content for case study pages
// ═══════════════════════════════════════════════════════════════════════════════
/**
 * CaseStudyData — Narrative content for a case study
 * 
 * MINIMAL VALID CASE STUDY — Required fields:
 * ─────────────────────────────────────────────────────────────────────────────
 * - slug: URL-safe identifier (e.g., 'pfizer', 'abbott')
 * - title: Main title (e.g., 'Pfizer AI Content Engine')
 * - subtitle: Role or tagline (e.g., 'Field Deployed Engineer')
 * - company: Company name for display
 * - client: Client name for metadata
 * - role: Your role on the project
 * - year: Year of engagement
 * - services: Array of service tags
 * - heroImage: Path to hero image (must exist in /public/assets/img/case-studies/)
 * - overview: 1-2 sentence summary
 * - phases: All 5 phases (diagnose, architect, engineer, enable, impact)
 * - challenge, approach, solution, results: Legacy sections (still required)
 * 
 * RECOMMENDED ADDITIONS:
 * ─────────────────────────────────────────────────────────────────────────────
 * - brandLogo: Path to company logo
 * - heroMetrics: 3 key metrics for hero section
 * - phasesMeta: Challenge/outcome per phase (drives PhaseHeader)
 * - nextCaseStudy: Link to next case study
 * 
 * OPTIONAL ENHANCEMENTS:
 * ─────────────────────────────────────────────────────────────────────────────
 * - heroContext: 3-line client/constraint/result summary
 * - executiveSummary: Full executive context block
 * - executiveSnapshot: Headline + key outcomes
 * - patternGeneralization: How pattern generalizes
 * - contextConstraints: Additional context bullets
 */
export interface CaseStudyData {
    slug: string;
    title: string;
    subtitle: string;
    company: string;
    client: string;
    brandLogo?: string;
    role: string;
    year: string;
    services: string[];
    heroImage: string;
    overview: string;
    
    // Hero context — simplified 3-line summary
    heroContext?: {
        client: string;
        constraint: string;
        result: string;
    };
    
    // Hero metrics row
    heroMetrics?: {
        label: string;
        value: string;
        delta: string;
    }[];
    
    // Executive Snapshot for hero section
    executiveSnapshot?: ExecutiveSnapshot;
    
    // Executive Summary — Full context block (new)
    executiveSummary?: CaseStudyExecutiveSummary;
    
    // Phase narrative metadata (new)
    phasesMeta?: PhaseNarrativeMeta[];
    
    // Pattern generalization footer (new)
    patternGeneralization?: PatternGeneralization;
    
    // Context & Constraints
    contextConstraints?: string[];
    
    // Phase-based sections for FDE methodology
    phases?: {
        diagnose: PhaseSection;
        architect: PhaseSection;
        engineer: PhaseSection;
        enable: PhaseSection;
        impact: PhaseSection;
    };
    
    // Legacy fields for backwards compatibility
    challenge: {
        title: string;
        description: string;
        points: string[];
    };
    approach: {
        title: string;
        description: string;
        points: string[];
    };
    solution: {
        title: string;
        description: string;
        points: string[];
        tools?: {
            label: string;
            value: string;
        }[];
    };
    results: {
        title: string;
        metrics: {
            value: string;
            numericValue?: number;
            suffix?: string;
            label: string;
        }[];
    };
    // FDE-specific sections
    architectureDiagram?: {
        image: string;
        caption?: string;
    };
    timeline?: {
        phase: string;
        duration: string;
        description: string;
    }[];
    stakeholders?: {
        role: string;
        contribution: string;
    }[];
    handoff?: {
        title: string;
        description: string;
        deliverables: string[];
    };
    testimonial?: {
        quote: string;
        author: string;
        role: string;
        company: string;
    };
    codeSnippet?: {
        language: string;
        filename?: string;
        description?: string;
        code: string;
    };
    clientLogo?: string;
    galleryImages?: string[];
    nextCaseStudy?: {
        title: string;
        href: string;
        brand?: string;
        description?: string;
    };
    prevCaseStudy?: {
        title: string;
        href: string;
        brand?: string;
        description?: string;
    };
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHART DATA TYPES — For centralized chart data per case study
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// CORE CHART DATA SHAPES (8 Required)
// ─────────────────────────────────────────────────────────────────────────────

// Funnel Chart — Diagnose phase
export interface FunnelDataPoint {
    stage: string;
    value: number;
    color?: string;
}

// RACI Matrix — Diagnose phase
export interface RaciWorkstream {
    id: string;
    name: string;
    category: string;
}

export interface RaciStakeholder {
    id: string;
    name: string;
    role: string;
    team: string;
    initials: string;
}

export interface RaciMatrixData {
    project: string;
    lastUpdated: string;
    workstreams: RaciWorkstream[];
    stakeholders: RaciStakeholder[];
    assignments: Record<string, string>; // "ws1-p1": "R" | "A" | "C" | "I"
}

// System Context (C4) — Architect phase
export interface SystemContextUser {
    id: string;
    name: string;
    icon?: string;
    description: string;
    interactions: string[];
}

export interface SystemContextExternal {
    id: string;
    name: string;
    type: string;
    icon?: string;
    description: string;
    protocol: string;
    direction: 'inbound' | 'outbound' | 'bidirectional';
    dataFlow: string[];
}

export interface SystemContextData {
    system: {
        name: string;
        description: string;
        type: string;
    };
    users: SystemContextUser[];
    externalSystems: SystemContextExternal[];
}

// Gantt Chart — Architect/Execute phase
export interface GanttTask {
    id: number;
    task: string;
    start: number;
    duration: number;
    category: string;
    progress: number;
}

// Service Health Dashboard — Engineer phase
export interface ServiceHealthService {
    name: string;
    status: 'healthy' | 'degraded' | 'critical';
    uptime: number;
    latency: { p50: number; p95: number; p99: number };
    errorRate: number;
    throughput: number;
    lastIncident: string;
}

export interface ServiceHealthLatencyPoint {
    hour: string;
    p50: number;
    p95: number;
    p99: number;
}

export interface ServiceHealthData {
    services: ServiceHealthService[];
    latencyHistory: ServiceHealthLatencyPoint[];
}

// Journey Map — Enable phase
export interface JourneyTouchpoint {
    channel: string;
    type: 'owned' | 'earned' | 'paid';
}

export interface JourneyStage {
    id: string;
    name: string;
    icon?: string;
    color?: string;
    duration: string;
    touchpoints: JourneyTouchpoint[];
    actions: string[];
    thoughts: string[];
    emotions: { score: number; label: string };
    painPoints: string[];
    opportunities: string[];
}

export interface JourneyMapData {
    persona: {
        name: string;
        role: string;
        company: string;
        avatar?: string;
    };
    goal: string;
    stages: JourneyStage[];
}

// Waterfall Chart — Impact phase
export interface WaterfallDataPoint {
    label: string;
    value: number;
    type: 'total' | 'increase' | 'decrease';
}

// Unit Economics — Impact phase
export interface UnitEconomicsSummary {
    ltv: number;
    cac: number;
    ltvCacRatio: number;
    paybackMonths: number;
    grossMargin: number;
    netRevRetention: number;
}

export interface UnitEconomicsSegment {
    name: string;
    ltv: number;
    cac: number;
    ratio: number;
    payback: number;
    customers: number;
    arr: number;
}

export interface UnitEconomicsCohort {
    month: string;
    cac: number;
    ltv: number;
    payback: number;
}

export interface UnitEconomicsCostItem {
    category: string;
    amount: number;
    percent: number;
}

export interface UnitEconomicsBenchmarks {
    ltvCacRatio: { good: number; great: number };
    paybackMonths: { good: number; great: number };
    grossMargin: { good: number; great: number };
}

export interface UnitEconomicsData {
    period: string;
    currency: string;
    summary: UnitEconomicsSummary;
    segments: UnitEconomicsSegment[];
    cohorts: UnitEconomicsCohort[];
    costBreakdown: {
        cac: UnitEconomicsCostItem[];
        ltv: UnitEconomicsCostItem[];
    };
    benchmarks: UnitEconomicsBenchmarks;
}

// ─────────────────────────────────────────────────────────────────────────────
// OPTIONAL CHART DATA SHAPES (7 Plug-ins)
// ─────────────────────────────────────────────────────────────────────────────

// RAG Pipeline — Architect phase (optional)
export interface RagPipelineComponent {
    id: string;
    name: string;
    icon: string;
    desc: string;
}

export interface RagPipelineSection {
    id: string;
    name: string;
    color: string;
    components: RagPipelineComponent[];
}

export interface RagPipelineFlow {
    from: string;
    to: string;
    type?: string;
}

export interface RagPipelineMetric {
    name: string;
    value: number | string;
    desc: string;
}

export interface RagPipelineData {
    sections: RagPipelineSection[];
    flows: RagPipelineFlow[];
    metrics: RagPipelineMetric[];
}

// Model Card — Engineer phase (optional)
export interface ModelCardPerformanceMetric {
    name: string;
    value: string;
    baseline: string;
    threshold: string;
}

export interface ModelCardData {
    model: {
        name: string;
        version: string;
        type: string;
        lastUpdated: string;
        owner: string;
        status: string;
    };
    description: string;
    intendedUse: {
        primary: string[];
        outOfScope: string[];
        users: string[];
    };
    performance: {
        metrics: ModelCardPerformanceMetric[];
        evaluationData: string;
    };
    limitations: string[];
    ethicalConsiderations: string[];
}

// Latency Percentiles — Engineer phase (optional)
export interface LatencyDataPoint {
    time: string;
    p50: number;
    p95: number;
    p99: number;
    requests: number;
    errors: number;
}

export interface LatencyAnomaly {
    start: number;
    end: number;
    severity: string;
    cause: string;
}

export interface LatencyCurrentStats {
    p50: number;
    p95: number;
    p99: number;
    requestRate: number;
    errorRate: number;
}

export interface LatencyPercentilesData {
    service: string;
    timeRange: string;
    currentTime: string;
    sloTargets: { p50: number; p95: number; p99: number };
    dataPoints: LatencyDataPoint[];
    anomalies: LatencyAnomaly[];
    currentStats: LatencyCurrentStats;
}

// Data Quality Scorecard — Engineer phase (optional)
export interface DataQualityDimension {
    name: string;
    score: number;
    target: number;
    trend: 'up' | 'down' | 'stable';
}

export interface DataQualityIssue {
    severity: 'critical' | 'warning' | 'info';
    count: number;
    description: string;
}

export interface DataQualityData {
    overall: number;
    dimensions: DataQualityDimension[];
    issues: DataQualityIssue[];
}

// Org Health Dashboard — Enable phase (optional)
export interface OrgHealthHeadcountTrend {
    month: string;
    count: number;
}

export interface OrgHealthHeadcount {
    total: number;
    fullTime: number;
    contractors: number;
    openRoles: number;
    trend: OrgHealthHeadcountTrend[];
}

export interface OrgHealthAttrition {
    monthly: number;
    annual: number;
    voluntary: number;
    involuntary: number;
    regrettable: number;
    benchmark: number;
}

export interface OrgHealthEngagementTrend {
    month: string;
    score: number;
}

export interface OrgHealthEngagement {
    enps: number;
    participation: number;
    trend: OrgHealthEngagementTrend[];
}

export interface OrgHealthDEI {
    gender: { male: number; female: number; nonBinary: number };
    leadership: { male: number; female: number; nonBinary: number };
    ethnicity: { group: string; percent: number }[];
}

export interface OrgHealthDepartment {
    name: string;
    headcount: number;
    attrition: number;
    enps: number;
    openRoles: number;
}

export interface OrgHealthTenure {
    range: string;
    count: number;
    percent: number;
}

export interface OrgHealthData {
    asOfDate: string;
    headcount: OrgHealthHeadcount;
    attrition: OrgHealthAttrition;
    engagement: OrgHealthEngagement;
    dei: OrgHealthDEI;
    departments: OrgHealthDepartment[];
    tenure: OrgHealthTenure[];
}

// Calendar Heatmap — Impact phase (optional)
export interface CalendarHeatmapDataPoint {
    date: string;
    value: number;
}

export interface CalendarHeatmapData {
    year: number;
    title: string;
    metric: string;
    data: CalendarHeatmapDataPoint[];
}

// Sparkline Grid — Impact phase (optional)
export interface SparklineMetric {
    label: string;
    values: number[];
    current: number;
    change: number;
}

export type SparklineGridData = SparklineMetric[];

// ═══════════════════════════════════════════════════════════════════════════════
// CASE STUDY CHARTS INTERFACE — 8 Core Required + 7 Optional Plug-ins
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * CaseStudyCharts — Chart data container for case studies
 * 
 * CORE CHARTS (8 Required):
 * All case studies must provide these 8 charts.
 * 
 * OPTIONAL CHARTS (7 Plug-ins):
 * Use when relevant to the case study. Pfizer uses all 15.
 * Future case studies start from the 8-chart base.
 * 
 * Rendering Order (canonical):
 * - Diagnose: funnel, raciMatrix
 * - Architect: systemContext, gantt, [ragPipeline?]
 * - Engineer: serviceHealth, [modelCard?, latencyPercentiles?, dataQuality?]
 * - Enable: journeyMap, [orgHealth?]
 * - Impact: waterfall, unitEconomics, [calendarHeatmap?, sparklineGrid?]
 */
export interface CaseStudyCharts {
    // ─────────────────────────────────────────────────────────────────────────
    // CORE CHARTS — Required for all case studies (8)
    // ─────────────────────────────────────────────────────────────────────────
    
    /** Diagnose: Conversion / opportunity analysis */
    funnel: FunnelDataPoint[];
    
    /** Diagnose: Stakeholder accountability matrix */
    raciMatrix: RaciMatrixData;
    
    /** Architect: System boundaries & integrations (C4-style) */
    systemContext: SystemContextData;
    
    /** Architect/Execute: Timeline & milestones */
    gantt: GanttTask[];
    
    /** Engineer: System reliability / SLOs / incident posture */
    serviceHealth: ServiceHealthData;
    
    /** Enable: User / stakeholder experience flow */
    journeyMap: JourneyMapData;
    
    /** Impact: Financial / KPI contribution breakdown */
    waterfall: WaterfallDataPoint[];
    
    /** Impact: Cost-per-unit / ROI metrics */
    unitEconomics: UnitEconomicsData;
    
    // ─────────────────────────────────────────────────────────────────────────
    // OPTIONAL CHARTS — Plug-ins, render if present (7)
    // ─────────────────────────────────────────────────────────────────────────
    
    /** Architect: RAG / retrieval system architecture */
    ragPipeline?: RagPipelineData;
    
    /** Engineer: ML model documentation / governance */
    modelCard?: ModelCardData;
    
    /** Engineer: Performance / latency analysis */
    latencyPercentiles?: LatencyPercentilesData;
    
    /** Engineer: Data quality metrics & checks */
    dataQuality?: DataQualityData;
    
    /** Enable: Team / org health / adoption signals */
    orgHealth?: OrgHealthData;
    
    /** Impact: Activity density over time */
    calendarHeatmap?: CalendarHeatmapData;
    
    /** Impact: Multi-metric trend overview */
    sparklineGrid?: SparklineGridData;
}

// Config object that pairs narrative + charts for a case study
export interface CaseStudyConfig {
    slug: string;
    study: CaseStudyData;
    charts: CaseStudyCharts;
}
