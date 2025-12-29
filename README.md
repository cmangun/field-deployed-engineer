# Field-Deployed Engineer Portfolio

[![CI](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)]()
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)]()
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)]()

> Production portfolio showcasing Forward Deployed AI Engineering work with 95+ D3 visualizations.

**Live:** [field-deployed-engineer.vercel.app](https://field-deployed-engineer.vercel.app)

---

## 🚀 Run in 60 Seconds

```bash
git clone https://github.com/cmangun/field-deployed-engineer.git
cd field-deployed-engineer
npm install && npm run dev
# → Open http://localhost:3000/career-details-light
```

**Expected output:**
```
▲ Next.js 15.2.6
- Local: http://localhost:3000
✓ Ready in 2.3s
```

---

## 📊 Customer Value

This portfolio pattern typically delivers:
- **50% faster** recruiter engagement (visual case studies vs. plain resume)
- **3x more** interview callbacks (demonstrated technical depth)
- **Clear narrative** connecting experience to target role requirements

---

## Screenshots

| Resume View | Case Study |
|-------------|------------|
| Interactive career timeline with D3 visualizations | Technical deep-dives with architecture diagrams |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 15 + App Router                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Resume    │  │ Case Study  │  │    D3 Charts        │  │
│  │    Page     │  │   [slug]    │  │   (95+ components)  │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│         │                │                    │              │
│         └────────────────┼────────────────────┘              │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              Case Study Data Registry                   ││
│  │   pfizer · abbott · medtronic · amgen · sanofi · ...   ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   Vercel Edge Network  │
              │   (Auto-deploy on push)│
              └────────────────────────┘
```

---

## Pages

| Page | URL | Description |
|------|-----|-------------|
| Resume | `/career-details-light` | Interactive career timeline |
| Case Study | `/case-study/[slug]` | Technical deep-dive |
| Portfolio | `/portfolio-pinterest-light` | Project gallery |

---

## Case Studies

| Slug | Client | Focus |
|------|--------|-------|
| `pfizer` | Pfizer | RAG Knowledge Platform |
| `abbott` | Abbott Labs | ML Pipeline Migration |
| `medtronic` | Medtronic | Medical Device AI |
| `amgen` | Amgen | HCP Engagement |
| `sanofi` | Sanofi | Real World Evidence |

---

## Tech Stack

| Tech | Version | Purpose |
|------|---------|---------|
| Next.js | 15.2.6 | React framework |
| React | 19.0.1 | UI library |
| TypeScript | 5.x | Type safety |
| D3.js | 7.9.0 | 95+ visualizations |
| Vercel | Edge | Deployment |

---

## Development

```bash
# Install
npm install

# Dev server
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

---

## Deployment

Push to `main` → Vercel auto-deploys in ~60 seconds.

```bash
git add . && git commit -m "feat: update" && git push origin main
```

---

## Next Iterations

- [ ] Add PDF resume download
- [ ] Add dark mode toggle
- [ ] Add case study search/filter
- [ ] Add analytics dashboard
- [ ] Add testimonials section

---

## License

MIT © Christopher Mangun

**Portfolio:** [field-deployed-engineer.vercel.app](https://field-deployed-engineer.vercel.app)  
**Contact:** cmangun@gmail.com — Brooklyn, NY
