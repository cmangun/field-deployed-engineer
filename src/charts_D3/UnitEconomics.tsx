"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Unit Economics Dashboard data
const defaultData = {
  period: 'Q4 2024',
  currency: 'USD',
  summary: {
    ltv: 48500,
    cac: 12200,
    ltvCacRatio: 3.97,
    paybackMonths: 8.2,
    grossMargin: 78,
    netRevRetention: 118,
  },
  segments: [
    { name: 'Enterprise', ltv: 125000, cac: 28000, ratio: 4.46, payback: 6.5, customers: 45, arr: 5625000 },
    { name: 'Mid-Market', ltv: 42000, cac: 11500, ratio: 3.65, payback: 8.0, customers: 156, arr: 6552000 },
    { name: 'SMB', ltv: 8500, cac: 3200, ratio: 2.66, payback: 11.2, customers: 890, arr: 7565000 },
    { name: 'Self-Serve', ltv: 2400, cac: 450, ratio: 5.33, payback: 4.5, customers: 2340, arr: 5616000 },
  ],
  cohorts: [
    { month: 'Jan', cac: 14200, ltv: 52000, payback: 9.1 },
    { month: 'Feb', cac: 13800, ltv: 49500, payback: 8.8 },
    { month: 'Mar', cac: 13100, ltv: 48000, payback: 8.5 },
    { month: 'Apr', cac: 12900, ltv: 47500, payback: 8.3 },
    { month: 'May', cac: 12500, ltv: 48200, payback: 8.1 },
    { month: 'Jun', cac: 12200, ltv: 48500, payback: 7.9 },
    { month: 'Jul', cac: 11800, ltv: 49000, payback: 7.6 },
    { month: 'Aug', cac: 11500, ltv: 49500, payback: 7.4 },
    { month: 'Sep', cac: 11200, ltv: 50000, payback: 7.2 },
    { month: 'Oct', cac: 10900, ltv: 50500, payback: 7.0 },
    { month: 'Nov', cac: 10600, ltv: 51000, payback: 6.8 },
    { month: 'Dec', cac: 10400, ltv: 51500, payback: 6.6 },
  ],
  costBreakdown: {
    cac: [
      { category: 'Paid Ads', amount: 4200, percent: 34 },
      { category: 'Sales Team', amount: 3800, percent: 31 },
      { category: 'Content/SEO', amount: 2100, percent: 17 },
      { category: 'Events', amount: 1200, percent: 10 },
      { category: 'Tools/Tech', amount: 900, percent: 8 },
    ],
    ltv: [
      { category: 'Subscription', amount: 38500, percent: 79 },
      { category: 'Prof Services', amount: 6200, percent: 13 },
      { category: 'Expansion', amount: 3800, percent: 8 },
    ],
  },
  benchmarks: {
    ltvCacRatio: { good: 3, great: 5 },
    paybackMonths: { good: 12, great: 6 },
    grossMargin: { good: 70, great: 80 },
  },
};

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value}`;
};

interface UnitEconomicsProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const UnitEconomics: React.FC<UnitEconomicsProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Unit Economics Dashboard"
}) => {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'trends' | 'breakdown'>('overview');

  const getRatioColor = (ratio: number) => {
    if (ratio >= data.benchmarks.ltvCacRatio.great) return chartColors.primary;
    if (ratio >= data.benchmarks.ltvCacRatio.good) return chartColors.secondary;
    return chartColors.dark;
  };

  const getPaybackColor = (months: number) => {
    if (months <= data.benchmarks.paybackMonths.great) return chartColors.primary;
    if (months <= data.benchmarks.paybackMonths.good) return chartColors.secondary;
    return chartColors.dark;
  };

  const chartWidth = width - 80;
  const maxLtv = Math.max(...data.cohorts.map(c => c.ltv));
  const maxCac = Math.max(...data.cohorts.map(c => c.cac));

  return (
    <div style={{ width: '100%' }}>
      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', marginBottom: '16px' }}>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>{formatCurrency(data.summary.ltv)}</div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>LTV</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.dark }}>{formatCurrency(data.summary.cac)}</div>
          <div style={{ fontSize: '9px', color: chartColors.dark }}>CAC</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: `${getRatioColor(data.summary.ltvCacRatio)}15`, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: getRatioColor(data.summary.ltvCacRatio) }}>{data.summary.ltvCacRatio.toFixed(1)}x</div>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>LTV:CAC</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: `${getPaybackColor(data.summary.paybackMonths)}15`, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: getPaybackColor(data.summary.paybackMonths) }}>{data.summary.paybackMonths}</div>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>Payback (mo)</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.background, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.charcoal }}>{data.summary.grossMargin}%</div>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>Gross Margin</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>{data.summary.netRevRetention}%</div>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>NRR</div>
        </div>
      </div>

      {viewMode === 'overview' && (
        <>
          {/* Segment Table */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
              UNIT ECONOMICS BY SEGMENT
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 1fr 0.8fr 0.8fr 0.8fr 1fr',
              gap: '1px',
              backgroundColor: chartColors.light,
              borderRadius: '8px',
              overflow: 'hidden',
              fontSize: '10px'
            }}>
              {['Segment', 'LTV', 'CAC', 'Ratio', 'Payback', 'Customers', 'ARR'].map((h) => (
                <div key={h} style={{ padding: '8px', backgroundColor: chartColors.background, fontWeight: 600, color: chartColors.charcoalLight }}>
                  {h}
                </div>
              ))}
              
              {/* Rows */}
              {data.segments.map((seg) => (
                <React.Fragment key={seg.name}>
                  <div 
                    onClick={() => setSelectedSegment(selectedSegment === seg.name ? null : seg.name)}
                    style={{ 
                      padding: '10px 8px', 
                      backgroundColor: selectedSegment === seg.name ? chartColors.light : 'white',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {seg.name}
                  </div>
                  <div style={{ padding: '10px 8px', backgroundColor: selectedSegment === seg.name ? chartColors.light : 'white', color: chartColors.primary, fontWeight: 600 }}>
                    {formatCurrency(seg.ltv)}
                  </div>
                  <div style={{ padding: '10px 8px', backgroundColor: selectedSegment === seg.name ? chartColors.light : 'white', color: chartColors.dark }}>
                    {formatCurrency(seg.cac)}
                  </div>
                  <div style={{ padding: '10px 8px', backgroundColor: selectedSegment === seg.name ? chartColors.light : 'white', color: getRatioColor(seg.ratio), fontWeight: 600 }}>
                    {seg.ratio.toFixed(1)}x
                  </div>
                  <div style={{ padding: '10px 8px', backgroundColor: selectedSegment === seg.name ? chartColors.light : 'white', color: getPaybackColor(seg.payback) }}>
                    {seg.payback} mo
                  </div>
                  <div style={{ padding: '10px 8px', backgroundColor: selectedSegment === seg.name ? chartColors.light : 'white' }}>
                    {seg.customers.toLocaleString()}
                  </div>
                  <div style={{ padding: '10px 8px', backgroundColor: selectedSegment === seg.name ? chartColors.light : 'white', fontWeight: 600 }}>
                    {formatCurrency(seg.arr)}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Benchmarks */}
          <div style={{ padding: '12px', backgroundColor: chartColors.background, borderRadius: '8px' }}>
            <div style={{ fontSize: '10px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
              BENCHMARK TARGETS
            </div>
            <div style={{ display: 'flex', gap: '24px', fontSize: '10px' }}>
              <div>
                <span style={{ color: chartColors.gray }}>LTV:CAC Ratio: </span>
                <span style={{ color: chartColors.secondary }}>Good ≥{data.benchmarks.ltvCacRatio.good}x</span>
                <span style={{ color: chartColors.gray }}> • </span>
                <span style={{ color: chartColors.primary }}>Great ≥{data.benchmarks.ltvCacRatio.great}x</span>
              </div>
              <div>
                <span style={{ color: chartColors.gray }}>Payback: </span>
                <span style={{ color: chartColors.secondary }}>Good ≤{data.benchmarks.paybackMonths.good}mo</span>
                <span style={{ color: chartColors.gray }}> • </span>
                <span style={{ color: chartColors.primary }}>Great ≤{data.benchmarks.paybackMonths.great}mo</span>
              </div>
            </div>
          </div>
        </>
      )}

      {viewMode === 'trends' && (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
            LTV & CAC TRENDS (12-Month)
          </div>
          <svg width={chartWidth} height={200}>
            {/* Grid */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1={40} y1={i * 40 + 20} x2={chartWidth} y2={i * 40 + 20} stroke={chartColors.light} />
            ))}
            
            {/* LTV Line */}
            <path
              d={data.cohorts.map((c, i) => {
                const x = 40 + (i / (data.cohorts.length - 1)) * (chartWidth - 60);
                const y = 180 - ((c.ltv - 45000) / (maxLtv - 45000)) * 140;
                return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke={chartColors.primary}
              strokeWidth={2}
            />
            
            {/* CAC Line */}
            <path
              d={data.cohorts.map((c, i) => {
                const x = 40 + (i / (data.cohorts.length - 1)) * (chartWidth - 60);
                const y = 180 - ((c.cac - 8000) / (maxCac - 8000)) * 140;
                return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke={chartColors.dark}
              strokeWidth={2}
            />
            
            {/* Dots and labels */}
            {data.cohorts.map((c, i) => {
              const x = 40 + (i / (data.cohorts.length - 1)) * (chartWidth - 60);
              const yLtv = 180 - ((c.ltv - 45000) / (maxLtv - 45000)) * 140;
              const yCac = 180 - ((c.cac - 8000) / (maxCac - 8000)) * 140;
              return (
                <g key={i}>
                  <circle cx={x} cy={yLtv} r={3} fill={chartColors.primary} />
                  <circle cx={x} cy={yCac} r={3} fill={chartColors.dark} />
                  <text x={x} y={195} textAnchor="middle" fontSize={8} fill={chartColors.gray}>{c.month}</text>
                </g>
              );
            })}
            
            {/* Y-axis labels */}
            <text x={35} y={25} textAnchor="end" fontSize={8} fill={chartColors.gray}>{formatCurrency(maxLtv)}</text>
            <text x={35} y={180} textAnchor="end" fontSize={8} fill={chartColors.gray}>{formatCurrency(45000)}</text>
          </svg>
          
          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '3px', backgroundColor: chartColors.primary, borderRadius: '2px' }} />
              <span style={{ fontSize: '10px', color: chartColors.gray }}>LTV (trending up)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '3px', backgroundColor: chartColors.dark, borderRadius: '2px' }} />
              <span style={{ fontSize: '10px', color: chartColors.gray }}>CAC (trending down)</span>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'breakdown' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* CAC Breakdown */}
          <div style={{ padding: '16px', backgroundColor: chartColors.light, borderRadius: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.dark, marginBottom: '12px' }}>
              CAC BREAKDOWN ({formatCurrency(data.summary.cac)})
            </div>
            {data.costBreakdown.cac.map((item) => (
              <div key={item.category} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                  <span style={{ color: chartColors.charcoal }}>{item.category}</span>
                  <span style={{ fontWeight: 600 }}>{formatCurrency(item.amount)} ({item.percent}%)</span>
                </div>
                <div style={{ height: '6px', backgroundColor: chartColors.light, borderRadius: '3px' }}>
                  <div style={{ width: `${item.percent}%`, height: '100%', backgroundColor: chartColors.dark, borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
          
          {/* LTV Breakdown */}
          <div style={{ padding: '16px', backgroundColor: chartColors.light, borderRadius: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.navy, marginBottom: '12px' }}>
              LTV BREAKDOWN ({formatCurrency(data.summary.ltv)})
            </div>
            {data.costBreakdown.ltv.map((item) => (
              <div key={item.category} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                  <span style={{ color: chartColors.charcoal }}>{item.category}</span>
                  <span style={{ fontWeight: 600 }}>{formatCurrency(item.amount)} ({item.percent}%)</span>
                </div>
                <div style={{ height: '6px', backgroundColor: chartColors.light, borderRadius: '3px' }}>
                  <div style={{ width: `${item.percent}%`, height: '100%', backgroundColor: chartColors.primary, borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitEconomics;
