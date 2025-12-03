# Portfolio Case Study Showcase — Quick Reference

> **Last Updated:** December 3, 2025  
> **Dev Server:** `npm run dev` → http://localhost:3000 (or 3001/3002 if occupied)  
> **Main Route:** `/portfolio-horizontal-showcase-light`

---

## Key File Locations

| Purpose | File Path |
|---------|-----------|
| **Showcase Component** | `src/components/portfolio/CaseStudyShowcase.tsx` |
| **Case Study Card Data** | `src/data/caseStudyCardsData.ts` |
| **Menu Navigation** | `src/data/header-menu/menuItemTwo.ts` |
| **Case Study Registry** | `src/data/caseStudies/index.ts` |
| **Header (Case Studies btn)** | `src/layouts/headers/PortfolioWebglHeader.tsx` |
| **Mobile Menu** | `src/layouts/subComponents/MobileMenus.tsx` |
| **Hero Images** | `public/assets/img/case-studies/_showcase/` |

---

## Case Study Card Structure

Each card in `caseStudyCardsData.ts`:

```typescript
{
  id: "pfizer",           // Unique identifier
  slug: "pfizer",         // URL slug for routing
  title: "Field-Embedded Engineering",  // Card title
  client: "Pfizer",       // Client name
  subtitle: "...",        // Description (shown on hover)
  domain: "...",          // Domain tags (shown on hover)
  services: [...],        // Services array
  year: "2024",
  heroImage: "/assets/img/case-studies/_showcase/image.png",
  delay: 0,               // Animation delay (0, 0.08, 0.16...)
  isPlaceholder: false,   // true = "Coming Soon" badge
}
```

---

## How to Update Case Study Hover Text

### Current Verbose Format (OLD):
```
01 / 12
Pfizer
Field-Embedded Engineering
Governed AI content engine that cut MLR cycles 42→14 days, tripled AI-assisted throughput, and saved $2M+ annually.
Regulated pharma, MLR, RAG, CLM/CRM integration
```

### New Minimal Format (NEW):
```
Field-Embedded Engineering
Data Strategy Enterprise Platform Planning
```

### Steps to Update:

1. **Open:** `src/components/portfolio/CaseStudyShowcase.tsx`

2. **Find the parallax-content div** (around line 130-180) that renders:
   - Case Study Number (`01 / 12`)
   - Client name
   - Title (h4)
   - Subtitle/Description (p)
   - Domain (div)
   - Placeholder badge

3. **Replace with minimal structure:**

```tsx
<div className="parallax-content">
    {/* Title */}
    <h4 style={{ marginBottom: '8px', color: '#fff' }}>{card.title}</h4>
    
    {/* Domain - simplified */}
    <p style={{
        fontSize: '14px',
        color: '#fff',
        opacity: 0.8,
    }}>
        {card.domain}
    </p>
</div>
```

4. **Update card data** in `src/data/caseStudyCardsData.ts`:
   - Change `domain` field to simplified version
   - Example: `"Regulated pharma, MLR, RAG, CLM/CRM integration"` → `"Data Strategy Enterprise Platform Planning"`

---

## Canonical Case Study Order (1-12)

| # | Slug | Client | Title |
|---|------|--------|-------|
| 0 | intro | Christopher Mangun | AI/MLOps Field Deployed Engineer |
| 1 | pfizer | Pfizer | Field-Embedded Engineering |
| 2 | colab | Pfizer | RAG Solution Architect |
| 3 | pfizer-pipeline | Pfizer | RAG Co-Pilot Engineer |
| 4 | coco | Pfizer | CoCo Company Companion |
| 5 | binaxnow | Abbott | BinaxNOW Evaluation Dataset |
| 6 | alinity | Abbott | Alinity Platform |
| 7 | medtronic | Medtronic | Genius GI Surgical AI |
| 8 | publicis | Publicis Health | Enterprise Architecture |
| 9 | ipg | IPG / Area 23 | Sub-Portfolio Planning |
| 10 | amgen | Syneos Health | Repatha Technical Program |
| 11 | sanofi | Sanofi | Cross-Sector Dashboard |
| 12 | nakedheart | Naked Heart Foundation | Global Playground Program |

---

## Intro Card (First Card)

The intro card is special and always visible (not hover-triggered):

**Location:** `src/components/portfolio/CaseStudyShowcase.tsx` (lines ~80-130)

**Content:**
- Christopher Mangun
- AI/MLOps Field Deployed Engineer
- 15 years six-sigma blackbelt enterprise enablement
- • Diagnostics • Architecture • Production • Enablement

**Behavior:**
- Text always visible (opacity: 1)
- Gray background (#e5e5e5)
- No cursor effect
- Text turns white on hover

---

## Quick Commands

```bash
# Start dev server
cd /Users/christophermangun/Desktop/claude_readme/live/Vercel-repo
npm run dev

# Check if server running
curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/portfolio-horizontal-showcase-light"
```

---

*Generated: December 3, 2025*
