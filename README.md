# Field-Deployed Engineer Portfolio

> **Next.js 15 + TypeScript + D3.js**  
> Production portfolio with 95+ D3 visualizations and template-based case study system.

**Live:** [field-deployed-engineer.vercel.app](https://field-deployed-engineer.vercel.app)  
**Repo:** [github.com/cmangun/field-deployed-engineer](https://github.com/cmangun/field-deployed-engineer)

---

## Quick Start

```bash
git clone https://github.com/cmangun/field-deployed-engineer.git
cd field-deployed-engineer
npm install
npm run dev
# Open http://localhost:3000/career-details-light
```

---

## Local Development

### Prerequisites
- Node.js 18.x+
- npm 9.x+

### Setup
```bash
cd /Users/christophermangun/Desktop/claude_readme/live/Vercel-repo
npm install
npm run dev
```

### URLs
| Page | URL |
|------|-----|
| Resume | http://localhost:3000/career-details-light |
| Case Study | http://localhost:3000/case-study/pfizer |
| Portfolio | http://localhost:3000/portfolio-pinterest-light |

### Troubleshooting
```bash
# Port in use
lsof -i :3000 && kill -9 <PID>

# Clean install
npm run clean && npm install

# Clear cache
rm -rf .next && npm run build
```

---

## Git Workflow

### Repository
- **Remote:** github.com:cmangun/field-deployed-engineer.git
- **Branch:** main
- **Deploy:** Push to main → auto-deploys to Vercel

### Workflow
```bash
git status
git add .
git commit -m "feat: description"
git push origin main
```

### Commit Prefixes
| Prefix | Usage |
|--------|-------|
| feat: | New feature |
| fix: | Bug fix |
| style: | CSS changes |
| docs: | Documentation |

---

## Vercel Deployment

### Config
| Setting | Value |
|---------|-------|
| Project | field-deployed-engineer |
| Framework | Next.js |
| Build | next build |

### URLs
| Type | URL |
|------|-----|
| Production | https://field-deployed-engineer.vercel.app |
| Preview | https://field-deployed-engineer-git-main-cmanguns-projects.vercel.app |

### Process
1. Push to main → webhook triggers
2. Build runs → npm run build
3. Live in ~60 seconds

### Verify Before Push
```bash
npm run build
# ✓ Generating static pages (23/23)
```


---

## File Structure

```
field-deployed-engineer/
├── public/assets/img/
│   ├── case-studies/          # Case study images
│   │   └── _showcase/         # Hero images
│   └── logo/                  # Brand logos
├── src/
│   ├── app/(portfolio)/
│   │   ├── career-details-light/page.tsx   # Resume page
│   │   └── case-study/[slug]/page.tsx      # Dynamic case study
│   ├── charts_D3/             # 95+ D3 components
│   │   ├── index.ts           # Central exports
│   │   ├── colors.ts          # Color palette
│   │   ├── ChartCardWrapper.tsx
│   │   ├── FunnelChart.tsx
│   │   ├── GanttChart.tsx
│   │   ├── WaterfallChart.tsx
│   │   ├── SystemContextDiagram.tsx
│   │   ├── ServiceHealthDashboard.tsx
│   │   ├── OrgHealthDashboard.tsx
│   │   └── ... (90+ more)
│   ├── components/caseStudy/
│   │   ├── CaseStudyTemplate.tsx    # Main template
│   │   └── CollapsibleChart.tsx     # Chart wrapper
│   ├── data/caseStudies/
│   │   ├── index.ts                 # Registry
│   │   ├── pfizerDiagnoseData.ts    # Pfizer Diagnose
│   │   ├── colabArchitectData.ts    # Pfizer Architect
│   │   ├── pfizerPipelineData.ts    # Pfizer Engineer
│   │   ├── cocoData.ts              # Pfizer Enable
│   │   ├── abbottData.ts
│   │   ├── medtronicData.ts
│   │   └── ...
│   ├── layouts/headers/
│   │   ├── PortfolioNavHeader.tsx
│   │   ├── PortfolioNavMenus.tsx
│   │   └── portfolioMenuData.ts
│   └── types/caseStudy.ts
├── ARCHITECTURE_README.md     # Technical docs
├── README.md                  # This file
├── package.json
└── tsconfig.json
```

---

## Case Study System

### Pfizer Quartet (Canonical Reference)
| Slug | Phase | Title | Primary Chart |
|------|-------|-------|---------------|
| pfizer | Diagnose | Diagnostic Search Baseline | FunnelChart |
| colab | Architect | Architecture Colab Datasphere | SystemContextDiagram |
| pfizer-pipeline | Engineer | RAG Co-Pilot Engineering | ServiceHealthDashboard |
| coco | Enable | CoCo Company Companion | OrgHealthDashboard |

### All Case Study Slugs
```
pfizer · colab · pfizer-pipeline · coco
abbott · binaxnow · alinity · medtronic
amgen · lilly · sanofi · ipg-internet · nhf · publicis
```

### Adding a New Case Study
1. Create `src/data/caseStudies/newData.ts`
2. Export `newData: CaseStudyData` and `newCharts: CaseStudyCharts`
3. Register in `src/data/caseStudies/index.ts`
4. Build and test: `npm run build && npm run dev`

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run clean` | Remove node_modules |

---

## Tech Stack
| Tech | Version | Purpose |
|------|---------|---------|
| Next.js | 15.2.6 | React framework |
| React | 19.0.1 | UI library |
| TypeScript | 5.x | Type safety |
| D3.js | 7.9.0 | Visualizations |
| Bootstrap | 5.3.6 | CSS framework |
| GSAP | 3.13.0 | Animations |

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/data/caseStudies/index.ts` | Case study registry |
| `src/components/caseStudy/CaseStudyTemplate.tsx` | Main template |
| `src/charts_D3/index.ts` | Chart exports |
| `src/layouts/headers/portfolioMenuData.ts` | Navigation data |
| `ARCHITECTURE_README.md` | Technical architecture |

---

*Last Updated: December 2024*
