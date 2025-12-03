"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Hiring Funnel data
const defaultData = {
  period: 'Q4 2024',
  openRoles: 18,
  stages: [
    { id: 'applicants', name: 'Applicants', value: 2450, color: chartColors.navy },
    { id: 'screened', name: 'Screened', value: 485, color: chartColors.navy },
    { id: 'phone', name: 'Phone Screen', value: 245, color: chartColors.muted },
    { id: 'onsite', name: 'Onsite/Virtual', value: 98, color: chartColors.cyan },
    { id: 'offer', name: 'Offer Extended', value: 42, color: chartColors.cyan },
    { id: 'accepted', name: 'Offer Accepted', value: 32, color: chartColors.primary },
  ],
  metrics: {
    timeToFill: 38,
    timeToHire: 28,
    costPerHire: 4850,
    offerAcceptRate: 76,
    qualityOfHire: 4.2,
  },
  byDepartment: [
    { dept: 'Engineering', open: 8, pipeline: 145, offers: 12, accepted: 8, avgDays: 42 },
    { dept: 'Sales', open: 4, pipeline: 85, offers: 8, accepted: 6, avgDays: 28 },
    { dept: 'Product', open: 3, pipeline: 62, offers: 5, accepted: 4, avgDays: 35 },
    { dept: 'Marketing', open: 2, pipeline: 48, offers: 4, accepted: 3, avgDays: 32 },
    { dept: 'Operations', open: 1, pipeline: 28, offers: 2, accepted: 2, avgDays: 25 },
  ],
  sources: [
    { source: 'LinkedIn', applicants: 680, hires: 12, cost: 18500, quality: 4.1 },
    { source: 'Referrals', applicants: 185, hires: 8, cost: 4000, quality: 4.6 },
    { source: 'Indeed', applicants: 520, hires: 5, cost: 8200, quality: 3.8 },
    { source: 'Careers Page', applicants: 420, hires: 4, cost: 0, quality: 4.0 },
    { source: 'Recruiters', applicants: 145, hires: 3, cost: 28500, quality: 4.3 },
  ],
  pipeline: [
    { week: 'W1', applicants: 380, screens: 75, onsites: 18, offers: 6 },
    { week: 'W2', applicants: 420, screens: 82, onsites: 22, offers: 8 },
    { week: 'W3', applicants: 395, screens: 78, onsites: 20, offers: 7 },
    { week: 'W4', applicants: 445, screens: 88, onsites: 24, offers: 9 },
  ],
};

interface HiringFunnelProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const HiringFunnel: React.FC<HiringFunnelProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Hiring Funnel"
}) => {
  const [viewMode, setViewMode] = useState<'funnel' | 'departments' | 'sources'>('funnel');

  const maxValue = data.stages[0].value;
  const funnelWidth = width - 180;

  const formatCurrency = (value: number) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '16px' }}>
        <div style={{ padding: '10px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: chartColors.primary }}>{data.metrics.timeToFill}d</div>
          <div style={{ fontSize: '8px', color: chartColors.navy }}>Time to Fill</div>
        </div>
        <div style={{ padding: '10px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: chartColors.primary }}>{data.metrics.timeToHire}d</div>
          <div style={{ fontSize: '8px', color: chartColors.navy }}>Time to Hire</div>
        </div>
        <div style={{ padding: '10px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: chartColors.secondary }}>{formatCurrency(data.metrics.costPerHire)}</div>
          <div style={{ fontSize: '8px', color: chartColors.dark }}>Cost per Hire</div>
        </div>
        <div style={{ padding: '10px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: chartColors.cyan }}>{data.metrics.offerAcceptRate}%</div>
          <div style={{ fontSize: '8px', color: chartColors.navy }}>Accept Rate</div>
        </div>
        <div style={{ padding: '10px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: chartColors.teal }}>{data.metrics.qualityOfHire}</div>
          <div style={{ fontSize: '8px', color: chartColors.dark }}>Quality Score</div>
        </div>
      </div>

      {viewMode === 'funnel' && (
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Funnel Visualization */}
          <div style={{ flex: 1 }}>
            <svg width={funnelWidth} height={320}>
              {data.stages.map((stage, i) => {
                const widthPercent = (stage.value / maxValue);
                const barWidth = widthPercent * (funnelWidth - 80);
                const x = (funnelWidth - barWidth) / 2;
                const y = i * 52;
                const convRate = i > 0 ? ((stage.value / data.stages[i-1].value) * 100).toFixed(1) : null;
                
                return (
                  <g key={stage.id}>
                    {/* Main bar */}
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={40}
                      fill={stage.color}
                      opacity={0.9}
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
                      {stage.value.toLocaleString()}
                    </text>
                    
                    {/* Conversion rate arrow */}
                    {convRate && (
                      <text
                        x={funnelWidth - 20}
                        y={y + 25}
                        textAnchor="end"
                        fontSize={9}
                        fill={chartColors.gray}
                      >
                        {convRate}%
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
          
          {/* Conversion Rates */}
          <div style={{ width: '160px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              STAGE CONVERSION
            </div>
            {data.stages.slice(1).map((stage, i) => {
              const rate = (stage.value / data.stages[i].value) * 100;
              return (
                <div key={stage.id} style={{
                  padding: '8px',
                  backgroundColor: rate >= 50 ? chartColors.light : rate >= 20 ? chartColors.light : chartColors.light,
                  borderRadius: '6px',
                  marginBottom: '6px'
                }}>
                  <div style={{ fontSize: '9px', color: chartColors.gray }}>
                    {data.stages[i].name} → {stage.name}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: rate >= 50 ? chartColors.primary : rate >= 20 ? chartColors.secondary : chartColors.dark }}>
                    {rate.toFixed(1)}%
                  </div>
                </div>
              );
            })}
            
            <div style={{
              marginTop: '12px',
              padding: '10px',
              backgroundColor: chartColors.light,
              borderRadius: '8px',
              border: `2px solid ${chartColors.primary}`
            }}>
              <div style={{ fontSize: '9px', color: chartColors.navy }}>Overall Conversion</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: chartColors.primary }}>
                {((data.stages[data.stages.length - 1].value / data.stages[0].value) * 100).toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'departments' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, overflow: 'hidden' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr repeat(5, 1fr)',
            gap: '1px',
            backgroundColor: chartColors.light,
            fontSize: '10px'
          }}>
            {/* Header */}
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600 }}>Department</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Open</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Pipeline</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Offers</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Accepted</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Avg Days</div>
            
            {/* Rows */}
            {data.byDepartment.map((dept, i) => (
              <React.Fragment key={dept.dept}>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, fontWeight: 500 }}>
                  {dept.dept}
                </div>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, textAlign: 'center', fontWeight: 600, color: chartColors.primary }}>
                  {dept.open}
                </div>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, textAlign: 'center' }}>
                  {dept.pipeline}
                </div>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, textAlign: 'center' }}>
                  {dept.offers}
                </div>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, textAlign: 'center', fontWeight: 600, color: chartColors.primary }}>
                  {dept.accepted}
                </div>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, textAlign: 'center' }}>
                  <span style={{
                    padding: '2px 6px',
                    backgroundColor: dept.avgDays <= 30 ? chartColors.light : dept.avgDays <= 40 ? chartColors.light : chartColors.light,
                    color: dept.avgDays <= 30 ? chartColors.navy : dept.avgDays <= 40 ? chartColors.dark : chartColors.dark,
                    borderRadius: '4px',
                    fontWeight: 600
                  }}>
                    {dept.avgDays}d
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'sources' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
            SOURCE EFFECTIVENESS
          </div>
          {data.sources.sort((a, b) => b.hires - a.hires).map((source) => {
            const costPerHire = source.hires > 0 ? source.cost / source.hires : 0;
            const conversionRate = (source.hires / source.applicants) * 100;
            
            return (
              <div key={source.source} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: chartColors.background,
                borderRadius: '8px',
                marginBottom: '8px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>{source.source}</div>
                  <div style={{ fontSize: '9px', color: chartColors.gray }}>{source.applicants} applicants</div>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: chartColors.primary }}>{source.hires}</div>
                    <div style={{ fontSize: '8px', color: chartColors.gray }}>Hires</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: chartColors.charcoal }}>{conversionRate.toFixed(1)}%</div>
                    <div style={{ fontSize: '8px', color: chartColors.gray }}>Conv.</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: costPerHire <= 3000 ? chartColors.primary : costPerHire <= 6000 ? chartColors.secondary : chartColors.dark }}>
                      {costPerHire > 0 ? formatCurrency(costPerHire) : 'Free'}
                    </div>
                    <div style={{ fontSize: '8px', color: chartColors.gray }}>Cost/Hire</div>
                  </div>
                  <div style={{
                    padding: '4px 8px',
                    backgroundColor: source.quality >= 4.3 ? chartColors.light : source.quality >= 4 ? chartColors.light : chartColors.light,
                    color: source.quality >= 4.3 ? chartColors.navy : source.quality >= 4 ? chartColors.dark : chartColors.dark,
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700
                  }}>
                    {source.quality}★
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HiringFunnel;
