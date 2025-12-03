"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Marketing Funnel data
const defaultData = {
  period: 'Q4 2024',
  stages: [
    { id: 'visitors', name: 'Website Visitors', value: 485000, color: chartColors.navy },
    { id: 'leads', name: 'Leads', value: 14200, color: chartColors.navy },
    { id: 'mqls', name: 'MQLs', value: 3850, color: chartColors.muted },
    { id: 'sqls', name: 'SQLs', value: 1420, color: chartColors.cyan },
    { id: 'opps', name: 'Opportunities', value: 680, color: chartColors.cyan },
    { id: 'closed', name: 'Closed Won', value: 185, color: chartColors.primary },
  ],
  conversionRates: [
    { from: 'Visitors', to: 'Leads', rate: 2.93 },
    { from: 'Leads', to: 'MQLs', rate: 27.1 },
    { from: 'MQLs', to: 'SQLs', rate: 36.9 },
    { from: 'SQLs', to: 'Opps', rate: 47.9 },
    { from: 'Opps', to: 'Closed', rate: 27.2 },
  ],
  bySource: [
    { source: 'Organic Search', visitors: 145000, leads: 4850, mqls: 1420, closed: 62, rate: 0.043 },
    { source: 'Paid Search', visitors: 98000, leads: 3200, mqls: 920, closed: 38, rate: 0.039 },
    { source: 'Social Media', visitors: 85000, leads: 2100, mqls: 485, closed: 18, rate: 0.021 },
    { source: 'Email', visitors: 52000, leads: 1850, mqls: 580, closed: 32, rate: 0.062 },
    { source: 'Direct', visitors: 68000, leads: 1450, mqls: 320, closed: 22, rate: 0.032 },
    { source: 'Referral', visitors: 37000, leads: 750, mqls: 125, closed: 13, rate: 0.035 },
  ],
  trends: [
    { month: 'Sep', visitors: 152000, leads: 4200, mqls: 1150, closed: 52 },
    { month: 'Oct', visitors: 165000, leads: 4850, mqls: 1320, closed: 65 },
    { month: 'Nov', visitors: 168000, leads: 5150, mqls: 1380, closed: 68 },
  ],
  benchmarks: {
    visitorToLead: { value: 2.93, benchmark: 2.5, status: 'above' },
    leadToMQL: { value: 27.1, benchmark: 25, status: 'above' },
    mqlToSQL: { value: 36.9, benchmark: 40, status: 'below' },
    sqlToOpp: { value: 47.9, benchmark: 45, status: 'above' },
    oppToClose: { value: 27.2, benchmark: 25, status: 'above' },
  },
};

const formatNumber = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
};

interface MarketingFunnelProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const MarketingFunnel: React.FC<MarketingFunnelProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Marketing Funnel"
}) => {
  const [viewMode, setViewMode] = useState<'funnel' | 'sources' | 'trends'>('funnel');
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const maxValue = data.stages[0].value;
  const funnelWidth = width - 200;

  return (
    <div style={{ width: '100%' }}>
      {/* Top-of-funnel to Bottom metrics */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', padding: '12px', backgroundColor: chartColors.background, borderRadius: '10px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.charcoal }}>{formatNumber(data.stages[0].value)}</div>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>Visitors</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', color: chartColors.gray }}>→</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>{data.stages[data.stages.length - 1].value}</div>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>Closed Won</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', color: chartColors.gray }}>|</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.teal }}>
            {((data.stages[data.stages.length - 1].value / data.stages[0].value) * 100).toFixed(2)}%
          </div>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>End-to-End Rate</div>
        </div>
      </div>

      {viewMode === 'funnel' && (
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Funnel Visualization */}
          <div style={{ flex: 1 }}>
            <svg width={funnelWidth} height={320}>
              {data.stages.map((stage, i) => {
                const widthPercent = (stage.value / maxValue);
                const barWidth = widthPercent * (funnelWidth - 100);
                const x = (funnelWidth - barWidth) / 2;
                const y = i * 52;
                const isSelected = selectedStage === stage.id;
                
                return (
                  <g key={stage.id}
                    onClick={() => setSelectedStage(isSelected ? null : stage.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Connector from previous */}
                    {i > 0 && (
                      <path
                        d={`M ${(funnelWidth - (data.stages[i-1].value / maxValue) * (funnelWidth - 100)) / 2 + (data.stages[i-1].value / maxValue) * (funnelWidth - 100) / 2} ${y - 12}
                           L ${x + barWidth / 2} ${y}`}
                        stroke={chartColors.light}
                        strokeWidth={2}
                        fill="none"
                      />
                    )}
                    
                    {/* Main bar */}
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={40}
                      fill={stage.color}
                      opacity={isSelected ? 1 : 0.85}
                      rx={6}
                    />
                    
                    {/* Stage name */}
                    <text
                      x={funnelWidth / 2}
                      y={y + 18}
                      textAnchor="middle"
                      fontSize={10}
                      fill="white"
                      fontWeight={600}
                    >
                      {stage.name}
                    </text>
                    
                    {/* Value */}
                    <text
                      x={funnelWidth / 2}
                      y={y + 32}
                      textAnchor="middle"
                      fontSize={12}
                      fill="white"
                      fontWeight={700}
                    >
                      {formatNumber(stage.value)}
                    </text>
                    
                    {/* Conversion rate arrow */}
                    {i < data.stages.length - 1 && (
                      <text
                        x={funnelWidth - 30}
                        y={y + 46}
                        textAnchor="middle"
                        fontSize={9}
                        fill={chartColors.gray}
                      >
                        ↓ {data.conversionRates[i]?.rate}%
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
          
          {/* Benchmark Comparison */}
          <div style={{ width: '180px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              VS BENCHMARK
            </div>
            {Object.entries(data.benchmarks).map(([key, bench]) => (
              <div key={key} style={{
                padding: '8px',
                backgroundColor: bench.status === 'above' ? chartColors.light : chartColors.light,
                borderRadius: '6px',
                marginBottom: '6px',
                borderLeft: `3px solid ${bench.status === 'above' ? chartColors.primary : chartColors.dark}`
              }}>
                <div style={{ fontSize: '9px', color: chartColors.gray, textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: bench.status === 'above' ? chartColors.primary : chartColors.dark }}>
                    {bench.value}%
                  </span>
                  <span style={{ fontSize: '9px', color: chartColors.gray }}>
                    vs {bench.benchmark}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'sources' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, overflow: 'hidden' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr repeat(5, 1fr)',
            gap: '1px',
            backgroundColor: chartColors.light,
            fontSize: '10px'
          }}>
            {/* Header */}
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600 }}>Source</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Visitors</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Leads</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>MQLs</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Closed</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Conv %</div>
            
            {/* Rows */}
            {data.bySource.sort((a, b) => b.closed - a.closed).map((source, i) => (
              <React.Fragment key={source.source}>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, fontWeight: 500 }}>
                  {source.source}
                </div>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, textAlign: 'center' }}>
                  {formatNumber(source.visitors)}
                </div>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, textAlign: 'center' }}>
                  {formatNumber(source.leads)}
                </div>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, textAlign: 'center' }}>
                  {formatNumber(source.mqls)}
                </div>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, textAlign: 'center', fontWeight: 600, color: chartColors.primary }}>
                  {source.closed}
                </div>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, textAlign: 'center' }}>
                  <span style={{
                    padding: '2px 6px',
                    backgroundColor: source.rate >= 0.04 ? chartColors.light : source.rate >= 0.03 ? chartColors.light : chartColors.light,
                    color: source.rate >= 0.04 ? chartColors.navy : source.rate >= 0.03 ? chartColors.dark : chartColors.dark,
                    borderRadius: '4px',
                    fontWeight: 600
                  }}>
                    {(source.rate * 100).toFixed(2)}%
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'trends' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '16px' }}>
            MONTHLY FUNNEL TREND
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {data.trends.map((month) => (
              <div key={month.month} style={{
                padding: '16px',
                backgroundColor: chartColors.background,
                borderRadius: '10px'
              }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '12px' }}>
                  {month.month}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '10px' }}>
                  <div>
                    <div style={{ color: chartColors.gray }}>Visitors</div>
                    <div style={{ fontWeight: 600 }}>{formatNumber(month.visitors)}</div>
                  </div>
                  <div>
                    <div style={{ color: chartColors.gray }}>Leads</div>
                    <div style={{ fontWeight: 600 }}>{formatNumber(month.leads)}</div>
                  </div>
                  <div>
                    <div style={{ color: chartColors.gray }}>MQLs</div>
                    <div style={{ fontWeight: 600 }}>{formatNumber(month.mqls)}</div>
                  </div>
                  <div>
                    <div style={{ color: chartColors.gray }}>Closed</div>
                    <div style={{ fontWeight: 600, color: chartColors.primary }}>{month.closed}</div>
                  </div>
                </div>
                <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: `1px solid ${chartColors.light}` }}>
                  <div style={{ fontSize: '9px', color: chartColors.gray }}>End-to-End Rate</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: chartColors.teal }}>
                    {((month.closed / month.visitors) * 100).toFixed(3)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingFunnel;
