// src/components/caseStudy/PhaseHeader.tsx
// ═══════════════════════════════════════════════════════════════════════════════
// PHASE HEADER — Single source of truth for 5-phase gated methodology
// Typography tokens unified for consistent styling across all phases
// ═══════════════════════════════════════════════════════════════════════════════

import React from 'react';

export type PhaseId = 'diagnose' | 'architect' | 'engineer' | 'enable' | 'impact';

// ─────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY TOKENS — Single source of truth
// ─────────────────────────────────────────────────────────────────────────────
const typography = {
  title: {
    fontSize: 'clamp(36px, 5vw, 56px)',
    fontWeight: 700,
    color: '#000',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    margin: '0 0 12px 0',
  },
  eyebrow: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#666',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    margin: '0 0 16px 0',
    maxWidth: '480px',
  },
  summary: {
    fontSize: '17px',
    fontWeight: 500,
    color: '#444',
    fontStyle: 'italic' as const,
    lineHeight: 1.5,
    maxWidth: '540px',
    margin: '0 0 20px 0',
  },
  metricLabel: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#888',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    marginBottom: '4px',
  },
  metricValue: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PHASE METADATA — Content for each gated phase
// ─────────────────────────────────────────────────────────────────────────────
interface PhaseMeta {
  id: PhaseId;
  label: string;
  eyebrow: string;
  summary: string;
  metrics: { label: string; value: string }[];
}

const phaseMeta: Record<PhaseId, PhaseMeta> = {
  diagnose: {
    id: 'diagnose',
    label: 'Diagnose',
    eyebrow: 'IDENTIFY THE BOTTLENECK AND ESTABLISH THE BASELINE',
    summary: 'Found the real constraint: content retrieval and version duplication, not demand or production capacity.',
    metrics: [
      { label: 'Duration', value: '2 weeks' },
      { label: 'Primary KPI', value: 'Review cycle time' },
      { label: 'Decision Owner', value: 'Commercial Operations' },
    ],
  },
  architect: {
    id: 'architect',
    label: 'Architect',
    eyebrow: 'DESIGN A GOVERNED AI SYSTEM THAT FITS THE COMPLIANCE PERIMETER',
    summary: 'Designed a governed RAG content engine that lived inside Pfizer\'s compliance perimeter and left CLM/CRM as system of record.',
    metrics: [
      { label: 'Duration', value: '2 weeks' },
      { label: 'Primary KPI', value: 'Architecture sign-off' },
      { label: 'Decision Owner', value: 'Enterprise Architecture' },
    ],
  },
  engineer: {
    id: 'engineer',
    label: 'Engineer',
    eyebrow: 'BUILD THE PIPELINE AND PROVE RELIABILITY UNDER REAL LOAD',
    summary: 'Built a production-grade RAG pipeline with measurable improvements in latency, uptime, and query throughput.',
    metrics: [
      { label: 'Duration', value: '6 weeks' },
      { label: 'Primary KPI', value: 'p95 latency & uptime' },
      { label: 'Decision Owner', value: 'Platform Engineering' },
    ],
  },
  enable: {
    id: 'enable',
    label: 'Enable',
    eyebrow: 'DRIVE ADOPTION ACROSS TEAMS AND LOCK IN NEW WORKING HABITS',
    summary: 'Scaled adoption across global brand, MLR, and field teams through training, governance, and admin enablement.',
    metrics: [
      { label: 'Duration', value: '4 weeks' },
      { label: 'Primary KPI', value: 'User activation & satisfaction' },
      { label: 'Decision Owner', value: 'Learning & Development' },
    ],
  },
  impact: {
    id: 'impact',
    label: 'Impact',
    eyebrow: 'DEMONSTRATE DEFENDABLE ROI AND AN EXPANSION PATH',
    summary: 'Converted infrastructure and change-management investment into defendable ROI, with durable savings and clear expansion runway.',
    metrics: [
      { label: 'Duration', value: 'Ongoing' },
      { label: 'Primary KPI', value: 'ROI & expansion readiness' },
      { label: 'Decision Owner', value: 'Product / Finance' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PHASE HEADER COMPONENT
// Pass custom meta via props to override defaults (for data-driven case studies)
// ─────────────────────────────────────────────────────────────────────────────
interface PhaseHeaderProps {
  phase: PhaseId;
  customMeta?: {
    eyebrow?: string;
    summary?: string;
    metrics?: { label: string; value: string }[];
  };
}

export function PhaseHeader({ phase, customMeta }: PhaseHeaderProps) {
  const defaultMeta = phaseMeta[phase];
  
  // Merge custom meta with defaults
  const meta = {
    ...defaultMeta,
    eyebrow: customMeta?.eyebrow || defaultMeta.eyebrow,
    summary: customMeta?.summary || defaultMeta.summary,
    metrics: customMeta?.metrics || defaultMeta.metrics,
  };

  return (
    <header style={{ 
      marginTop: '40px',
      marginBottom: '32px',
    }}>
      {/* Phase Title */}
      <h2 style={typography.title}>
        {meta.label}
      </h2>

      {/* Eyebrow - Purpose Line */}
      <p style={typography.eyebrow}>
        {meta.eyebrow}
      </p>

      {/* One-line Summary */}
      <p style={typography.summary}>
        {meta.summary}
      </p>

      {/* Metrics Row */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '32px',
        paddingTop: '20px',
        borderTop: '1px solid #e0e0e0',
      }}>
        {meta.metrics.map(metric => (
          <div key={metric.label} style={{ minWidth: '140px' }}>
            <div style={typography.metricLabel}>
              {metric.label}
            </div>
            <div style={typography.metricValue}>
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}

export default PhaseHeader;
