# Case Study System — Implementation Plan

## Current Status: 10/10 ✓

The Pfizer case study is complete. All issues from the review have been addressed.

---

## ✅ Fixes Applied (Session: Dec 1, 2025)

### Fix 1: Empty "Next Step | Impact:" Row
**Status:** ✓ FIXED  
**Issue:** Code referenced `metadata.nextStep.title` but interface had `metadata.nextStep` as string  
**Solution:** Updated to use correct property paths: `metadata.nextStep`, `metadata.owner`, `metadata.impact`

### Fix 2: CTA Tone Adjustment
**Status:** ✓ FIXED  
**Issue:** "Let's get IT done!" too playful for enterprise case study  
**Solution:** Changed to "Ready for your next transformation?"

### UI Updates (same session):
- Hero section moved down 100px
- Hero image corners rounded (16px) + shadow effect
- Next Case Study section aligned to right rail
- CTA button text: "View Next Case Study →"

---

## ✅ Architecture Verification (Complete)

Current file structure matches recommended pattern:

```
/src/data/caseStudies/
├── pfizerData.ts          ✓ Chart data (15 datasets)
├── pfizerCaseStudy.ts     ✓ Narrative data
├── index.ts               ✓ Registry with getCaseStudyBySlug()
└── _template.ts           ✓ Starter for new case studies

/src/components/caseStudy/
├── CaseStudyTemplate.tsx  ✓ Receives { data, charts } props
├── CollapsibleChart.tsx   ✓ Wrapper with expand/collapse
└── PhaseBlock.tsx         ✓ Phase section renderer

/src/app/(portfolio)/case-study/[slug]/
└── page.tsx               ✓ Dynamic route using registry

/src/types/
└── caseStudy.ts           ✓ CaseStudyData, CaseStudyCharts, CaseStudyConfig
```

---

## 📋 Remaining Tasks

### Phase 1: Validation
- [x] Fix empty "Next Step | Impact:" row
- [x] Update CTA copy for case study pages
- [ ] Verify all chart CollapsibleChart cards render correctly
- [ ] Test responsive behavior on mobile

### Phase 2: Next Case Study (Abbott)
- [ ] Create `abbottCaseStudy.ts` (narrative)
- [ ] Create `abbottData.ts` (charts)
- [ ] Add to registry in `index.ts`
- [ ] Test route: `/case-study/abbott`

---

## 🏗️ How to Add a New Case Study

### Step 1: Create Narrative File
```typescript
// src/data/caseStudies/abbottCaseStudy.ts
import type { CaseStudyData } from '@/types/caseStudy';

export const abbottCaseStudy: CaseStudyData = {
  title: "Abbott Diagnostic Workflow",
  company: "Abbott",
  role: "Lead AI/ML Engineer",
  year: "2024",
  heroImage: "/images/abbott-hero.jpg",
  overview: "...",
  phases: {
    diagnose: { ... },
    architect: { ... },
    engineer: { ... },
    enable: { ... },
    impact: { ... }
  },
  nextCaseStudy: {
    brand: "Medtronic",
    title: "Surgical AI Platform",
    href: "/case-study/medtronic"
  }
};
```

### Step 2: Create Chart Data File
```typescript
// src/data/caseStudies/abbottData.ts
import type { CaseStudyCharts } from '@/types/caseStudy';

export const abbottCharts: CaseStudyCharts = {
  gantt: [...],
  funnel: {...},
  systemContext: {...},
  serviceHealth: {...},
  journeyMap: {...},
  waterfall: {...},
};
```

### Step 3: Register in Index
```typescript
// src/data/caseStudies/index.ts
import { abbottCaseStudy } from './abbottCaseStudy';
import { abbottCharts } from './abbottData';

export const caseStudyConfigs: Record<string, CaseStudyConfig> = {
  "pfizer": { slug: "pfizer", study: pfizerData, charts: pfizerCharts },
  "abbott": { slug: "abbott", study: abbottCaseStudy, charts: abbottCharts },
};
```

### Step 4: Done!
Route automatically available at: `/case-study/abbott`

---

## 🎯 Key Architecture Principles

| Principle | Implementation |
|-----------|----------------|
| **Zero inline chart data in template** | All chart data in `{slug}Data.ts` |
| **Template is presentation-only** | Receives `{ data, charts }` props |
| **Single source of truth** | Registry in `index.ts` |
| **Unique chart keys** | `gantt`, `funnel`, `systemContext`, etc. |
| **Type safety** | `CaseStudyData`, `CaseStudyCharts`, `CaseStudyConfig` |

---

## 📊 Chart Registry (15 Charts)

| Chart Key | Component | Phase |
|-----------|-----------|-------|
| `gantt` | GanttChart | Timeline |
| `funnel` | FunnelChart | Diagnose |
| `systemContext` | SystemContextDiagram | Architect |
| `serviceHealth` | ServiceHealthDashboard | Engineer |
| `journeyMap` | CustomerJourneyMap | Enable |
| `waterfall` | WaterfallChart | Impact |
| `calendarHeatmap` | CalendarHeatmap | Impact |
| `raciMatrix` | RACIMatrix | Diagnose |
| `ragPipeline` | RAGPipelineDiagram | Architect |
| `modelCard` | ModelCard | Engineer |
| `latencyPercentiles` | LatencyPercentilesChart | Engineer |
| `dataQuality` | DataQualityScorecard | Engineer |
| `orgHealth` | OrgHealthDashboard | Enable |
| `unitEconomics` | UnitEconomicsCard | Impact |
| `sparklineGrid` | SparklineGrid | Impact |

---

## 🚀 Commands

```bash
# Development
npm run dev

# Build check
npm run build

# Type check
npx tsc --noEmit
```

---

## Session Summary (Dec 1, 2025)

### Files Modified:
1. `CaseStudyTemplate.tsx`
   - Hero section: paddingTop 140px → 240px
   - Hero image: Added borderRadius 16px + boxShadow
   - Fixed `metadata.nextStep.title` → `metadata.nextStep` bug
   - CTA text: "Let's get IT done!" → "Ready for your next transformation?"
   - Next Case Study: Removed duplicate, aligned to right rail

### Dev Server:
- Running on: `http://localhost:3006`
- Page: `/case-study/pfizer`

---

*Last updated: December 1, 2025*
