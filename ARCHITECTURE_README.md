# Portfolio Case Study System — Architecture Reference

> **Last Updated:** December 1, 2025  
> **Canonical Reference:** Pfizer Case Study  
> **Stack:** Next.js 15 (App Router) + TypeScript + D3.js

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Directory Structure](#directory-structure)
3. [D3 Chart Library (charts_D3)](#d3-chart-library-charts_d3)
4. [Case Study System](#case-study-system)
5. [Data Flow Architecture](#data-flow-architecture)
6. [Type Contracts](#type-contracts)
7. [Taxonomy & Naming Conventions](#taxonomy--naming-conventions)
8. [How to Add a New Case Study](#how-to-add-a-new-case-study)
9. [Commands](#commands)

---

## Project Overview

This portfolio site uses a **template-based case study system** with:

- **95+ D3 chart components** in `/src/charts_D3/`
- **Centralized case study registry** in `/src/data/caseStudies/`
- **Dynamic routing** via Next.js App Router `/case-study/[slug]/`
- **Separation of concerns**: Narrative data vs Chart data vs Presentation

**Pfizer is the canonical reference** — it demonstrates all 15 charts and the full 5-phase FDE methodology.

---

## Directory Structure

```
/src
├── app/
│   └── (portfolio)/
│       └── case-study/
│           └── [slug]/
│               └── page.tsx          # Dynamic route → CaseStudyTemplate
│
├── charts_D3/                        # 95+ D3 visualization components
│   ├── index.ts                      # Central export registry
│   ├── colors.ts                     # Color palette + WCAG utilities
│   ├── ChartCardWrapper.tsx          # Neumorphic card wrapper
│   ├── FunnelChart.tsx
│   ├── GanttChart.tsx
│   ├── SystemContextDiagram.tsx
│   ├── ServiceHealthDashboard.tsx
│   ├── CustomerJourneyMap.tsx
│   ├── WaterfallChart.tsx
│   ├── ... (90+ more)
│   └── casestudydatad3.md            # Chart documentation
│
├── components/
│   └── caseStudy/
│       ├── CaseStudyTemplate.tsx     # Main presentation component
│       └── CollapsibleChart.tsx      # Expandable chart wrapper
│
├── data/
│   └── caseStudies/
│       ├── index.ts                  # Registry + getCaseStudyBySlug()
│       ├── pfizerCaseStudy.ts        # (DEPRECATED - merged into pfizerData.ts)
│       ├── pfizerData.ts             # ★ CANONICAL: Narrative + 15 chart datasets
│       ├── abbottCaseStudy.ts        # Narrative only (needs data file)
│       ├── medtronicCaseStudy.ts     # Narrative only (needs data file)
│       ├── chartData.ts              # Legacy chart data (12 case studies)
│       ├── _template.ts              # Starter template for new case studies
│       └── README.md
│
├── types/
│   └── caseStudy.ts                  # CaseStudyData, CaseStudyCharts, CaseStudyConfig
│
└── layouts/
    └── headers/
        └── PortfolioNavHeader.tsx    # Tackle-box mega menu navigation
```

---

## D3 Chart Library (charts_D3)

### Overview

The `/src/charts_D3/` directory contains **95+ production-ready D3 visualizations** organized by domain:

| Category | Chart Count | Examples |
|----------|-------------|----------|
| Core Charts | 23 | Funnel, Gantt, Waterfall, Heatmap, Gauge |
| Architecture & Infographics | 10 | SystemContext (C4), RAGPipeline, MLPipeline |
| Healthcare / Pharma | 8 | DrugLaunchRoadmap, HCPEngagementFunnel, PatientJourneySankey |
| SRE / DevOps | 10 | ServiceHealthDashboard, LatencyPercentiles, IncidentTimeline |
| Strategy & Governance | 12 | RACI Matrix, OKR Tracker, Risk Register |
| AI/ML Engineering | 15 | ModelCard, LLMEvaluation, ConfusionMatrix, SHAP Plot |
| Finance & Operations | 8 | UnitEconomics, RunwayCalculator, PipelineWaterfall |
| HR & People Ops | 4 | OrgHealthDashboard, HiringFunnel |

### Key Exports

```typescript
// Import individual charts
import { FunnelChart, GanttChart, WaterfallChart } from '@/charts_D3';

// Import color palette
import { chartColors, getContrastColor } from '@/charts_D3/colors';

// Import chart card wrapper
import { ChartCardWrapper } from '@/charts_D3';
```

### Color System

All charts use the unified color palette in `colors.ts`:

```typescript
export const chartColors = {
  // Neumorphic base
  background: '#e4e4e4',
  cardBg: '#e4e4e4',
  
  // Text hierarchy (WCAG AA compliant)
  primary: '#1a1a1a',
  secondary: '#333',
  tertiary: '#444',
  muted: '#555',
  
  // Semantic (grayscale)
  charcoal: '#222',
  gray: '#555',
  light: '#e0e0e0',
  
  // Status (grayscale for accessibility)
  green: '#444',
  red: '#222',
  orange: '#555',
};

// WCAG contrast utility
getContrastColor('#1a1a1a'); // Returns '#fff' or '#222'
```

### Chart Data Interfaces

Each chart expects a specific data shape. Examples:

```typescript
// Funnel
const funnel = [
  { stage: 'Assets Created', value: 2450, color: chartColors.teal },
  { stage: 'Search & Retrieval', value: 1470, color: chartColors.tealLight },
  ...
];

// Gantt
const gantt = [
  { id: 1, task: "Discovery", start: 0, duration: 2, category: "Discovery", progress: 100 },
  ...
];

// Waterfall
const waterfall = [
  { label: 'Baseline Cost', value: 4.2, type: 'total' },
  { label: 'Cycle Time Savings', value: -0.95, type: 'decrease' },
  ...
];
```

---

## Case Study System

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     /case-study/[slug]                          │
│                         page.tsx                                │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│              getCaseStudyBySlug(slug)                           │
│                    index.ts                                     │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│     caseStudyConfigs: Record<string, CaseStudyConfig>           │
│                                                                 │
│  "pfizer" → { slug, study: pfizerData, charts: pfizerCharts }   │
│  "abbott" → { slug, study: abbottData, charts: abbottCharts }   │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│              <CaseStudyTemplate                                 │
│                 data={config.study}                             │
│                 charts={config.charts}                          │
│              />                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Pfizer as Canonical Reference

**Pfizer demonstrates the full system:**

| Element | Pfizer Implementation |
|---------|----------------------|
| Narrative data | `pfizerData: CaseStudyData` |
| Chart data | `pfizerCharts: CaseStudyCharts` (15 datasets) |
| 5 Phases | Diagnose → Architect → Engineer → Enable → Impact |
| Charts per phase | Primary chart + supporting charts |

### Current Chart Sequence (Pfizer)

| Order | Chart Key | Phase | Component |
|-------|-----------|-------|-----------|
| 1 | `funnel` | Diagnose | FunnelChart |
| 2 | `gantt` | Timeline | GanttChart |
| 3 | `systemContext` | Architect | SystemContextDiagram |
| 4 | `raciMatrix` | Diagnose | RACIMatrix |
| 5 | `ragPipeline` | Architect | RAGPipeline |
| 6 | `modelCard` | Engineer | ModelCard |
| 7 | `latencyPercentiles` | Engineer | LatencyPercentiles |
| 8 | `dataQuality` | Engineer | DataQualityScorecard |
| 9 | `journeyMap` | Enable | CustomerJourneyMap |
| 10 | `orgHealth` | Enable | OrgHealthDashboard |
| 11 | `waterfall` | Impact | WaterfallChart |
| 12 | `calendarHeatmap` | Impact | CalendarHeatmap |
| 13 | `unitEconomics` | Impact | UnitEconomics |
| 14 | `sparklineGrid` | Impact | SparklineGrid |
| 15 | `serviceHealth` | Engineer | ServiceHealthDashboard |

---

## Data Flow Architecture

### 1. Narrative Data (`CaseStudyData`)

Contains the story, phases, metrics, and metadata:

```typescript
export const pfizerData: CaseStudyData = {
  slug: 'pfizer',
  title: 'Pfizer AI Content Engine',
  company: 'Pfizer',
  role: 'Lead AI/ML Engineer',
  year: '2024',
  heroImage: '/assets/img/case-studies/pfizer/hero.jpg',
  overview: '...',
  
  phases: {
    diagnose: { id: 'diagnose', title: 'Diagnose', duration: '2 weeks', ... },
    architect: { ... },
    engineer: { ... },
    enable: { ... },
    impact: { ... },
  },
  
  nextCaseStudy: {
    brand: 'Medtronic',
    title: 'Surgical AI Platform',
    href: '/case-study/medtronic'
  }
};
```

### 2. Chart Data (`CaseStudyCharts`)

Contains raw data for each chart component:

```typescript
export const pfizerCharts: CaseStudyCharts = {
  gantt: [...],           // GanttChart data
  funnel: [...],          // FunnelChart data
  systemContext: {...},   // SystemContextDiagram data
  serviceHealth: {...},   // ServiceHealthDashboard data
  journeyMap: {...},      // CustomerJourneyMap data
  waterfall: [...],       // WaterfallChart data
  calendarHeatmap: {...}, // CalendarHeatmap data
  raciMatrix: {...},      // RACIMatrix data
  ragPipeline: {...},     // RAGPipeline data
  modelCard: {...},       // ModelCard data
  latencyPercentiles: {...}, // LatencyPercentiles data
  dataQuality: {...},     // DataQualityScorecard data
  orgHealth: {...},       // OrgHealthDashboard data
  unitEconomics: {...},   // UnitEconomics data
  sparklineGrid: {...},   // SparklineGrid data
};
```

### 3. Registry (`index.ts`)

Maps slugs to combined configs:

```typescript
export const caseStudyConfigs: Record<string, CaseStudyConfig> = {
  "pfizer": { slug: "pfizer", study: pfizerData, charts: pfizerCharts },
  // Add more as created
};

export const getCaseStudyBySlug = (slug: string): CaseStudyConfig | undefined => 
  caseStudyConfigs[slug];
```

### 4. Template Rendering (`CaseStudyTemplate.tsx`)

Receives props and renders:

```typescript
interface CaseStudyTemplateProps {
  data: CaseStudyData;    // Narrative
  charts: CaseStudyCharts; // Chart datasets
}
```

---

## Type Contracts

### CaseStudyData (Narrative)

```typescript
interface CaseStudyData {
  slug: string;
  title: string;
  subtitle: string;
  company: string;
  client: string;
  role: string;
  year: string;
  services: string[];
  heroImage: string;
  overview: string;
  
  executiveSnapshot?: ExecutiveSnapshot;
  
  phases?: {
    diagnose: PhaseSection;
    architect: PhaseSection;
    engineer: PhaseSection;
    enable: PhaseSection;
    impact: PhaseSection;
  };
  
  // Legacy fields
  challenge: { title: string; description: string; points: string[] };
  approach: { title: string; description: string; points: string[] };
  solution: { title: string; description: string; points: string[]; tools?: Tool[] };
  results: { title: string; metrics: Metric[] };
  
  testimonial?: Testimonial;
  nextCaseStudy?: NextCaseStudy;
}
```

### PhaseSection

```typescript
interface PhaseSection {
  id: string;
  title: string;
  duration: string;
  description: string;
  points: string[];
  deliverables?: string[];
  tools?: { label: string; value: string }[];
  metrics?: { value: string; numericValue?: number; suffix?: string; label: string }[];
}
```

### CaseStudyCharts

```typescript
// Flexible container — specific chart shapes defined per chart component
type CaseStudyCharts = Record<string, unknown>;
```

### CaseStudyConfig

```typescript
interface CaseStudyConfig {
  slug: string;
  study: CaseStudyData;
  charts: CaseStudyCharts;
}
```

---

## Taxonomy & Naming Conventions

### File Naming

| Type | Pattern | Example |
|------|---------|---------|
| Combined data file | `{slug}Data.ts` | `pfizerData.ts` |
| Narrative only (legacy) | `{slug}CaseStudy.ts` | `abbottCaseStudy.ts` |
| Chart component | `PascalCase.tsx` | `ServiceHealthDashboard.tsx` |
| Registry | `index.ts` | `src/data/caseStudies/index.ts` |

### Slug Conventions

- **Lowercase, hyphenated**: `pfizer`, `abbott`, `medtronic`
- **Match URL path**: `/case-study/pfizer` → slug = `pfizer`
- **Match registry key**: `caseStudyConfigs["pfizer"]`

### Chart Keys

Use consistent keys across all case studies:

| Key | Component | Data Shape |
|-----|-----------|------------|
| `gantt` | GanttChart | `Array<{id, task, start, duration, category, progress}>` |
| `funnel` | FunnelChart | `Array<{stage, value, color}>` |
| `systemContext` | SystemContextDiagram | `{system, users, externalSystems}` |
| `serviceHealth` | ServiceHealthDashboard | `{services, latencyHistory}` |
| `journeyMap` | CustomerJourneyMap | `{persona, goal, stages}` |
| `waterfall` | WaterfallChart | `Array<{label, value, type}>` |
| `calendarHeatmap` | CalendarHeatmap | `{year, title, metric, data}` |
| `raciMatrix` | RACIMatrix | `{project, workstreams, stakeholders, assignments}` |
| `ragPipeline` | RAGPipeline | `{sections, flows, metrics}` |
| `modelCard` | ModelCard | `{model, description, intendedUse, performance, limitations}` |
| `latencyPercentiles` | LatencyPercentiles | `{service, timeRange, sloTargets, dataPoints}` |
| `dataQuality` | DataQualityScorecard | `{title, overallScore, dimensions, alerts}` |
| `orgHealth` | OrgHealthDashboard | `{title, period, metrics, teams}` |
| `unitEconomics` | UnitEconomics | `{title, period, revenue, costs, margin, metrics}` |
| `sparklineGrid` | SparklineGrid | `{title, period, metrics}` |

### Phase IDs

Always use these exact IDs:

1. `diagnose`
2. `architect`
3. `engineer`
4. `enable`
5. `impact`

---

## How to Add a New Case Study

### Step 1: Create Data File

```bash
cp src/data/caseStudies/_template.ts src/data/caseStudies/abbottData.ts
```

### Step 2: Fill Narrative + Chart Data

```typescript
// src/data/caseStudies/abbottData.ts

import type { CaseStudyData, CaseStudyCharts } from '@/types/caseStudy';
import { chartColors } from '@/charts_D3/colors';

export const abbottData: CaseStudyData = {
  slug: 'abbott',
  title: 'Abbott Diagnostic Workflow',
  // ... fill all narrative fields
  phases: {
    diagnose: { ... },
    architect: { ... },
    engineer: { ... },
    enable: { ... },
    impact: { ... },
  },
};

export const abbottCharts: CaseStudyCharts = {
  funnel: [...],
  gantt: [...],
  systemContext: {...},
  // ... add charts as needed
};
```

### Step 3: Register in Index

```typescript
// src/data/caseStudies/index.ts

import { abbottData, abbottCharts } from './abbottData';

export const caseStudyConfigs: Record<string, CaseStudyConfig> = {
  "pfizer": { slug: "pfizer", study: pfizerData, charts: pfizerCharts },
  "abbott": { slug: "abbott", study: abbottData, charts: abbottCharts },
};
```

### Step 4: Test

```bash
npm run dev
# Visit: http://localhost:3000/case-study/abbott
```

---

## Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

---

## Important Notes

1. **Pfizer is the reference, not the template** — Future case studies may use fewer charts
2. **All 5 phases are mandatory** — Chart usage is flexible per case study
3. **Hero images**: `/public/images/{slug}-hero.jpg` or `/public/assets/img/case-studies/{slug}/hero.jpg`
4. **No inline chart data in template** — All data lives in `{slug}Data.ts`
5. **Type safety** — Use `CaseStudyData`, `CaseStudyCharts`, `CaseStudyConfig`

---

*Generated: December 1, 2025*
