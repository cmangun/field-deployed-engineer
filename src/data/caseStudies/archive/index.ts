import { CaseStudyData, CaseStudyCharts, CaseStudyConfig } from "@/types/caseStudy";

// ═══════════════════════════════════════════════════════════════════════════════
// CASE STUDY IMPORTS — All case study data files
// ═══════════════════════════════════════════════════════════════════════════════

import { pfizerData, pfizerCharts } from "./pfizerData";
import { colabData, colabCharts } from "./colabData";
import { medtronicData, medtronicCharts } from "./medtronicData";
import { amgenData, amgenCharts } from "./amgenData";
import { sanofiData, sanofiCharts } from "./sanofi";
import { abbottAlinityData, abbottAlinityCharts } from "./alinity";
import { binaxNowData, binaxNowCharts } from "./binaxnow";
import { ipgIntranetData, ipgIntranetCharts } from "./ipg-internet";
import { abbottData, abbottCharts } from "./abbottData";
import { nakedHeartFoundationData, nakedHeartCharts } from "./nhf";
import { publicisData, publicisCharts } from "./publicisData";
import { lillyData, lillyCharts } from "./lillyData";

// ═══════════════════════════════════════════════════════════════════════════════
// CASE STUDY REGISTRY — Central registry for all case studies
// ═══════════════════════════════════════════════════════════════════════════════

// Full configs with narrative + charts
export const caseStudyConfigs: Record<string, CaseStudyConfig> = {
    // ─────────────────────────────────────────────────────────────────────────
    // LIVE CASE STUDIES (Complete with charts)
    // ─────────────────────────────────────────────────────────────────────────
    "pfizer": {
        slug: "pfizer",
        study: pfizerData,
        charts: pfizerCharts,
    },
    "colab": {
        slug: "colab",
        study: colabData,
        charts: colabCharts,
    },
    "medtronic": {
        slug: "medtronic",
        study: medtronicData,
        charts: medtronicCharts,
    },
    "amgen": {
        slug: "amgen",
        study: amgenData,
        charts: amgenCharts,
    },
    "sanofi": {
        slug: "sanofi",
        study: sanofiData,
        charts: sanofiCharts,
    },
    "alinity": {
        slug: "alinity",
        study: abbottAlinityData,
        charts: abbottAlinityCharts,
    },
    "binaxnow": {
        slug: "binaxnow",
        study: binaxNowData,
        charts: binaxNowCharts,
    },
    "ipg": {
        slug: "ipg",
        study: ipgIntranetData,
        charts: ipgIntranetCharts,
    },
    "abbott": {
        slug: "abbott",
        study: abbottData,
        charts: abbottCharts,
    },
    "nakedheart": {
        slug: "nakedheart",
        study: nakedHeartFoundationData,
        charts: nakedHeartCharts,
    },
    "publicis": {
        slug: "publicis",
        study: publicisData,
        charts: publicisCharts,
    },
    "lilly": {
        slug: "lilly",
        study: lillyData,
        charts: lillyCharts,
    },
};

// Legacy registry (narrative data only) for backwards compatibility
export const caseStudyRegistry: Record<string, CaseStudyData> = {
    "pfizer": pfizerData,
    "colab": colabData,
    "medtronic": medtronicData,
    "amgen": amgenData,
    "sanofi": sanofiData,
    "alinity": abbottAlinityData,
    "binaxnow": binaxNowData,
    "ipg": ipgIntranetData,
    "abbott": abbottData,
    "nakedheart": nakedHeartFoundationData,
    "publicis": publicisData,
    "lilly": lillyData,
};

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

// Get all case study slugs
export const getCaseStudySlugs = (): string[] => Object.keys(caseStudyConfigs);

// Get full config (study + charts) by slug
export const getCaseStudyBySlug = (slug: string): CaseStudyConfig | undefined => 
    caseStudyConfigs[slug];

// Get just narrative data by slug (legacy)
export const getCaseStudyData = (slug: string): CaseStudyData | undefined => 
    caseStudyConfigs[slug]?.study;

// Get just charts by slug
export const getCaseStudyCharts = (slug: string): CaseStudyCharts | undefined => 
    caseStudyConfigs[slug]?.charts;

// ═══════════════════════════════════════════════════════════════════════════════
// STATIC PARAMS — For Next.js generateStaticParams
// ═══════════════════════════════════════════════════════════════════════════════

export const getAllCaseStudySlugs = () => getCaseStudySlugs().map(slug => ({ slug }));
