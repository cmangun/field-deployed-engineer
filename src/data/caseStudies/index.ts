// src/data/caseStudies/index.ts
// ═══════════════════════════════════════════════════════════════════════════════
// CASE STUDY REGISTRY — Normalized case studies as the canonical contract
// Router → getCaseStudy(slug) → NormalizedCaseStudy
// Template → <CaseStudyTemplate study={normalized} charts={chartRegistry} />
// ═══════════════════════════════════════════════════════════════════════════════

import type { CaseStudyData, CaseStudyCharts, CaseStudyConfig } from "@/types/caseStudy";
import type { NormalizedCaseStudy, CaseStudySection, CaseStudyMetricBlock, HeroStat } from "./types";
import { DEFAULT_SECTION_CHARTS } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// NORMALIZED CASE STUDY IMPORTS (Gold standard)
// ─────────────────────────────────────────────────────────────────────────────
import { pfizerNormalized } from "./pfizer.normalized";
import { abbottNormalized } from "./abbott.normalized";

// ─────────────────────────────────────────────────────────────────────────────
// LEGACY CASE STUDY IMPORTS (To be migrated)
// ─────────────────────────────────────────────────────────────────────────────
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
// NORMALIZED REGISTRY — Preferred source (hand-crafted normalized studies)
// ═══════════════════════════════════════════════════════════════════════════════

const normalizedRegistry: Record<string, NormalizedCaseStudy> = {
  pfizer: pfizerNormalized,
  abbott: abbottNormalized,
  // Add more as they are migrated:
  // colab: colabNormalized,
};

// ═══════════════════════════════════════════════════════════════════════════════
// LEGACY REGISTRY — Full configs (study + charts) for backward compatibility
// Ordered by canonical 1-12 sequence
// ═══════════════════════════════════════════════════════════════════════════════

export const caseStudyConfigs: Record<string, CaseStudyConfig> = {
  // 1. Pfizer — Field-Embedded Engineer
  "pfizer": { slug: "pfizer", study: pfizerData, charts: pfizerCharts },
  // 2. Pfizer — RAG Solution Architect
  "colab": { slug: "colab", study: colabData, charts: colabCharts },
  // 3. Pfizer — RAG Co-Pilot (placeholder - uses colab charts)
  "pfizer-pipeline": { slug: "pfizer-pipeline", study: colabData, charts: colabCharts },
  // 4. Pfizer — CoCo (placeholder - uses pfizer charts)
  "coco": { slug: "coco", study: pfizerData, charts: pfizerCharts },
  // 5. Abbott — BinaxNOW
  "binaxnow": { slug: "binaxnow", study: binaxNowData, charts: binaxNowCharts },
  // 6. Abbott — Alinity
  "alinity": { slug: "alinity", study: abbottAlinityData, charts: abbottAlinityCharts },
  // 7. Medtronic — Genius GI
  "medtronic": { slug: "medtronic", study: medtronicData, charts: medtronicCharts },
  // 8. Publicis — Enterprise Architecture
  "publicis": { slug: "publicis", study: publicisData, charts: publicisCharts },
  // 9. IPG — Sub-Portfolio Planning
  "ipg": { slug: "ipg", study: ipgIntranetData, charts: ipgIntranetCharts },
  // 10. Repatha — Technical Program (via Syneos/Amgen)
  "amgen": { slug: "amgen", study: amgenData, charts: amgenCharts },
  // 11. Sanofi — Cross-Sector Dashboard
  "sanofi": { slug: "sanofi", study: sanofiData, charts: sanofiCharts },
  // 12. Naked Heart Foundation
  "nakedheart": { slug: "nakedheart", study: nakedHeartFoundationData, charts: nakedHeartCharts },
  // Legacy (kept for backwards compatibility)
  "abbott": { slug: "abbott", study: abbottData, charts: abbottCharts },
  "lilly": { slug: "lilly", study: lillyData, charts: lillyCharts },
};

// ═══════════════════════════════════════════════════════════════════════════════
// LEGACY → NORMALIZED ADAPTER
// Converts CaseStudyData to NormalizedCaseStudy for non-migrated studies
// ═══════════════════════════════════════════════════════════════════════════════

const PHASE_ORDER = ['diagnose', 'architect', 'engineer', 'enable', 'impact'] as const;

function normalizeLegacyCaseStudy(legacy: CaseStudyData): NormalizedCaseStudy {
  // Convert heroMetrics to heroStats
  const heroStats: HeroStat[] = (legacy.heroMetrics || []).map((m, i) => ({
    id: `stat-${i}`,
    label: m.label,
    value: m.value,
    annotation: m.delta,
  }));

  // Convert phases to sections
  const sections: CaseStudySection[] = PHASE_ORDER
    .filter(phaseId => legacy.phases?.[phaseId])
    .map(phaseId => {
      const phase = legacy.phases![phaseId];
      const phaseMeta = legacy.phasesMeta?.find(pm => pm.key === phaseId);

      // Build summary from phaseMeta or phase description
      const summary = phaseMeta
        ? `${phaseMeta.challenge} ${phaseMeta.outcome}`
        : phase.description || '';

      // Convert phase metrics to CaseStudyMetricBlock
      const metrics: CaseStudyMetricBlock[] = (phase.metrics || []).map(m => ({
        label: m.label,
        baseline: 'N/A',
        outcome: m.value,
        delta: m.suffix || '',
        unit: m.suffix?.replace(/[^a-zA-Z%]/g, '') || undefined,
      }));

      return {
        id: phaseId,
        title: `${phase.title} – ${phaseMeta?.challenge?.slice(0, 50) || phase.description?.slice(0, 50) || ''}...`,
        summary,
        duration: phase.duration,
        kpiFocus: undefined,
        decisionOwner: undefined,
        bullets: phase.points || [],
        deliverables: phase.deliverables || [],
        metrics,
        chartKeys: undefined, // Legacy doesn't have explicit chartKeys
      };
    });

  // Build category from services or company
  const category = legacy.services?.slice(0, 3).join(' · ') || legacy.company || '';

  return {
    slug: legacy.slug,
    client: legacy.client || legacy.company,
    title: legacy.title,
    subtitle: legacy.subtitle || legacy.role || '',
    category,
    heroImage: legacy.heroImage,
    brandLogo: legacy.brandLogo,
    heroStats,
    sections,
    tags: legacy.services,
    primaryCharts: undefined,
    nextCaseStudy: legacy.nextCaseStudy ? {
      slug: legacy.nextCaseStudy.href?.replace('/case-study/', '') || '',
      title: legacy.nextCaseStudy.title,
    } : undefined,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC API — Single source of truth for case study data
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Get normalized case study by slug
 * Prefers hand-crafted normalized versions, falls back to legacy adapter
 */
export function getCaseStudy(slug: string): NormalizedCaseStudy | undefined {
  // Prefer normalized version if available
  if (normalizedRegistry[slug]) {
    return normalizedRegistry[slug];
  }

  // Fallback: convert legacy to normalized
  const legacy = caseStudyConfigs[slug]?.study;
  if (legacy) {
    return normalizeLegacyCaseStudy(legacy);
  }

  return undefined;
}

/**
 * Get chart data for a case study
 */
export function getCaseStudyCharts(slug: string): CaseStudyCharts | undefined {
  return caseStudyConfigs[slug]?.charts;
}

/**
 * Get all case study slugs
 */
export function getCaseStudySlugs(): string[] {
  return Object.keys(caseStudyConfigs);
}

/**
 * Check if a case study has been migrated to normalized format
 */
export function isNormalized(slug: string): boolean {
  return slug in normalizedRegistry;
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEGACY API — For backward compatibility (deprecated)
// ═══════════════════════════════════════════════════════════════════════════════

/** @deprecated Use getCaseStudy() instead */
export const getCaseStudyBySlug = (slug: string): CaseStudyConfig | undefined => 
  caseStudyConfigs[slug];

/** @deprecated Use getCaseStudy() instead */
export const getCaseStudyData = (slug: string): CaseStudyData | undefined => 
  caseStudyConfigs[slug]?.study;

/** @deprecated Use getCaseStudySlugs() instead */
export const caseStudyRegistry: Record<string, CaseStudyData> = Object.fromEntries(
  Object.entries(caseStudyConfigs).map(([slug, config]) => [slug, config.study])
);

// ═══════════════════════════════════════════════════════════════════════════════
// STATIC PARAMS — For Next.js generateStaticParams
// ═══════════════════════════════════════════════════════════════════════════════

export const getAllCaseStudySlugs = () => getCaseStudySlugs().map(slug => ({ slug }));

// ═══════════════════════════════════════════════════════════════════════════════
// CANONICAL ORDER — 1-12 sequence for navigation
// ═══════════════════════════════════════════════════════════════════════════════

export const canonicalOrder = [
  'pfizer',           // 1. Pfizer — Field-Embedded Engineer
  'colab',            // 2. Pfizer — RAG Solution Architect
  'pfizer-pipeline',  // 3. Pfizer — RAG Co-Pilot Engineer
  'coco',             // 4. Pfizer — CoCo Company Companion
  'binaxnow',         // 5. Abbott — BinaxNOW
  'alinity',          // 6. Abbott — Alinity
  'medtronic',        // 7. Medtronic — Genius GI
  'publicis',         // 8. Publicis — Enterprise Architecture
  'ipg',              // 9. IPG — Sub-Portfolio Planning
  'amgen',            // 10. Repatha — Technical Program
  'sanofi',           // 11. Sanofi — Dashboard
  'nakedheart',       // 12. Naked Heart Foundation
];

/**
 * Get next case study in canonical order
 */
export function getNextCaseStudy(currentSlug: string): { slug: string; title: string } | undefined {
  const currentIndex = canonicalOrder.indexOf(currentSlug);
  const nextIndex = currentIndex === -1 || currentIndex === canonicalOrder.length - 1 
    ? 0 
    : currentIndex + 1;
  
  const nextSlug = canonicalOrder[nextIndex];
  const nextStudy = getCaseStudy(nextSlug);
  
  if (nextStudy) {
    return { slug: nextSlug, title: nextStudy.title };
  }
  return undefined;
}

// ═══════════════════════════════════════════════════════════════════════════════
// RE-EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export type { NormalizedCaseStudy, CaseStudySection, CaseStudyMetricBlock, HeroStat } from './types';
