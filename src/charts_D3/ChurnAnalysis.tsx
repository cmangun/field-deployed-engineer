"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Churn Analysis data
const defaultData = {
  period: 'Q4 2024',
  totalChurned: 42,
  churnRate: 2.8,
  revenueChurned: 185000,
  netRevenueRetention: 108,
  byReason: [
    { reason: 'Price/Budget', count: 14, percent: 33, revenue: 62000, recoverable: true },
    { reason: 'Switched to Competitor', count: 10, percent: 24, revenue: 48000, recoverable: false },
    { reason: 'No Longer Needed', count: 8, percent: 19, revenue: 32000, recoverable: false },
    { reason: 'Poor Experience', count: 6, percent: 14, revenue: 28000, recoverable: true },
    { reason: 'Company Closed', count: 4, percent: 10, revenue: 15000, recoverable: false },
  ],
  bySegment: [
    { segment: 'SMB', churned: 28, total: 890, rate: 3.1, revenue: 68000 },
    { segment: 'Mid-Market', churned: 10, total: 156, rate: 6.4, revenue: 72000 },
    { segment: 'Enterprise', churned: 4, total: 45, rate: 8.9, revenue: 45000 },
  ],
  cohortRetention: [
    { cohort: 'Jan 2024', m1: 100, m3: 92, m6: 85, m9: 78, m12: 72 },
    { cohort: 'Apr 2024', m1: 100, m3: 94, m6: 88, m9: 82, m12: null },
    { cohort: 'Jul 2024', m1: 100, m3: 95, m6: 90, m9: null, m12: null },
    { cohort: 'Oct 2024', m1: 100, m3: 96, m6: null, m9: null, m12: null },
  ],
  monthlyTrend: [
    { month: 'Jun', churned: 12, rate: 2.4, revenue: 42000 },
    { month: 'Jul', churned: 15, rate: 2.9, revenue: 55000 },
    { month: 'Aug', churned: 10, rate: 1.9, revenue: 38000 },
    { month: 'Sep', churned: 14, rate: 2.6, revenue: 52000 },
    { month: 'Oct', churned: 11, rate: 2.1, revenue: 41000 },
    { month: 'Nov', churned: 42, rate: 2.8, revenue: 185000 },
  ],
  savedCustomers: {
    attempted: 28,
    saved: 12,
    saveRate: 43,
    revenueSaved: 85000,
  },
};

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

interface ChurnAnalysisProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const ChurnAnalysis: React.FC<ChurnAnalysisProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Churn Analysis"
}) => {
  const [viewMode, setViewMode] = useState<'overview' | 'reasons' | 'cohorts'>('overview');

  return (
    <div style={{ width: '100%' }}>
      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center', border: `2px solid ${chartColors.dark}` }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.dark }}>{data.churnRate}%</div>
          <div style={{ fontSize: '9px', color: chartColors.dark }}>Churn Rate</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.dark }}>{formatCurrency(data.revenueChurned)}</div>
          <div style={{ fontSize: '9px', color: chartColors.dark }}>Revenue Lost</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.primary }}>{data.netRevenueRetention}%</div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>Net Revenue Retention</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.primary }}>{data.savedCustomers.saveRate}%</div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>Save Rate</div>
        </div>
      </div>

      {viewMode === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* By Segment */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              CHURN BY SEGMENT
            </div>
            {data.bySegment.map((seg) => (
              <div key={seg.segment} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: chartColors.background,
                borderRadius: '8px',
                marginBottom: '8px'
              }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>{seg.segment}</div>
                  <div style={{ fontSize: '9px', color: chartColors.gray }}>{seg.churned} of {seg.total} customers</div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: chartColors.dark }}>{formatCurrency(seg.revenue)}</div>
                    <div style={{ fontSize: '8px', color: chartColors.gray }}>lost</div>
                  </div>
                  <div style={{
                    padding: '4px 10px',
                    backgroundColor: seg.rate <= 3 ? chartColors.light : seg.rate <= 6 ? chartColors.light : chartColors.light,
                    color: seg.rate <= 3 ? chartColors.navy : seg.rate <= 6 ? chartColors.dark : chartColors.dark,
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700
                  }}>
                    {seg.rate}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Trend */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              MONTHLY TREND
            </div>
            <svg width="100%" height={140} viewBox="0 0 280 140">
              {/* Bars */}
              {data.monthlyTrend.map((month, i) => {
                const maxRate = Math.max(...data.monthlyTrend.map(m => m.rate));
                const barHeight = (month.rate / maxRate) * 80;
                const x = 20 + i * 44;
                
                return (
                  <g key={month.month}>
                    <rect
                      x={x}
                      y={100 - barHeight}
                      width={32}
                      height={barHeight}
                      fill={month.rate <= 2.5 ? chartColors.primary : month.rate <= 3 ? chartColors.secondary : chartColors.dark}
                      rx={4}
                    />
                    <text x={x + 16} y={90 - barHeight} textAnchor="middle" fontSize={9} fontWeight={600} fill={chartColors.charcoal}>
                      {month.rate}%
                    </text>
                    <text x={x + 16} y={120} textAnchor="middle" fontSize={8} fill={chartColors.gray}>
                      {month.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Save Stats */}
          <div style={{ backgroundColor: chartColors.light, borderRadius: '10px', padding: '16px', gridColumn: 'span 2' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.navy, marginBottom: '12px' }}>
              🛟 SAVE EFFORTS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.charcoal }}>{data.savedCustomers.attempted}</div>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>Attempted</div>
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>{data.savedCustomers.saved}</div>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>Saved</div>
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>{data.savedCustomers.saveRate}%</div>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>Save Rate</div>
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>{formatCurrency(data.savedCustomers.revenueSaved)}</div>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>Revenue Saved</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'reasons' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '16px' }}>
            CHURN REASONS
          </div>
          {data.byReason.map((reason) => (
            <div key={reason.reason} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: reason.recoverable ? chartColors.light : chartColors.light,
              borderRadius: '10px',
              marginBottom: '8px',
              borderLeft: `4px solid ${reason.recoverable ? chartColors.secondary : chartColors.dark}`
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>{reason.reason}</span>
                  {reason.recoverable && (
                    <span style={{
                      padding: '2px 6px',
                      backgroundColor: chartColors.primary,
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '8px',
                      fontWeight: 600
                    }}>
                      RECOVERABLE
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>
                  {reason.count} customers • {formatCurrency(reason.revenue)} lost
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Progress bar */}
                <div style={{ width: '100px', height: '8px', backgroundColor: chartColors.light, borderRadius: '4px' }}>
                  <div style={{
                    width: `${reason.percent}%`,
                    height: '100%',
                    backgroundColor: reason.recoverable ? chartColors.secondary : chartColors.dark,
                    borderRadius: '4px'
                  }} />
                </div>
                <span style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: reason.recoverable ? chartColors.secondary : chartColors.dark,
                  minWidth: '40px',
                  textAlign: 'right'
                }}>
                  {reason.percent}%
                </span>
              </div>
            </div>
          ))}
          
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: chartColors.background,
            borderRadius: '8px',
            fontSize: '10px'
          }}>
            <strong>Insight:</strong> {data.byReason.filter(r => r.recoverable).reduce((sum, r) => sum + r.percent, 0)}% of churn is potentially recoverable through proactive intervention.
          </div>
        </div>
      )}

      {viewMode === 'cohorts' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, overflow: 'hidden' }}>
          <div style={{ padding: '16px 16px 0' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              COHORT RETENTION
            </div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr repeat(5, 1fr)',
            gap: '1px',
            backgroundColor: chartColors.light,
            fontSize: '10px'
          }}>
            {/* Header */}
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600 }}>Cohort</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Month 1</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Month 3</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Month 6</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Month 9</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Month 12</div>
            
            {/* Rows */}
            {data.cohortRetention.map((cohort, i) => (
              <React.Fragment key={cohort.cohort}>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, fontWeight: 500 }}>
                  {cohort.cohort}
                </div>
                {['m1', 'm3', 'm6', 'm9', 'm12'].map((month) => {
                  const value = cohort[month as keyof typeof cohort] as number | null;
                  const getColor = (v: number | null) => {
                    if (v === null) return { bg: chartColors.light, text: chartColors.gray };
                    if (v >= 90) return { bg: chartColors.light, text: chartColors.navy };
                    if (v >= 80) return { bg: chartColors.light, text: chartColors.dark };
                    if (v >= 70) return { bg: chartColors.light, text: chartColors.dark };
                    return { bg: chartColors.light, text: chartColors.dark };
                  };
                  const colors = getColor(value);
                  
                  return (
                    <div key={month} style={{
                      padding: '10px',
                      backgroundColor: colors.bg,
                      textAlign: 'center',
                      fontWeight: 600,
                      color: colors.text
                    }}>
                      {value !== null ? `${value}%` : '—'}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          
          <div style={{ padding: '12px 16px', fontSize: '9px', color: chartColors.gray, backgroundColor: chartColors.background }}>
            💡 Newer cohorts showing improved retention — Q4 onboarding improvements working
          </div>
        </div>
      )}
    </div>
  );
};

export default ChurnAnalysis;
