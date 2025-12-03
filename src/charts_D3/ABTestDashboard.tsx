"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample A/B test data
const defaultData = {
  testName: 'Checkout Flow Redesign',
  status: 'running' as const,
  startDate: 'Nov 15, 2024',
  endDate: 'Dec 1, 2024',
  totalUsers: 48250,
  variants: [
    {
      name: 'Control',
      id: 'A',
      color: chartColors.gray,
      users: 24125,
      conversions: 1687,
      conversionRate: 6.99,
      confidenceInterval: [6.52, 7.46],
      revenue: 168700,
      avgOrderValue: 100.0,
    },
    {
      name: 'Treatment',
      id: 'B', 
      color: chartColors.teal,
      users: 24125,
      conversions: 1929,
      conversionRate: 7.99,
      confidenceInterval: [7.48, 8.50],
      revenue: 202545,
      avgOrderValue: 105.0,
    },
  ],
  metrics: [
    { 
      name: 'Conversion Rate', 
      control: 6.99, 
      treatment: 7.99, 
      lift: 14.3, 
      pValue: 0.0023,
      significant: true,
      unit: '%'
    },
    { 
      name: 'Avg Order Value', 
      control: 100.0, 
      treatment: 105.0, 
      lift: 5.0, 
      pValue: 0.087,
      significant: false,
      unit: '$'
    },
    { 
      name: 'Revenue per User', 
      control: 6.99, 
      treatment: 8.39, 
      lift: 20.0, 
      pValue: 0.0041,
      significant: true,
      unit: '$'
    },
    { 
      name: 'Cart Abandonment', 
      control: 68.5, 
      treatment: 62.3, 
      lift: -9.1, 
      pValue: 0.0156,
      significant: true,
      unit: '%'
    },
  ],
  // Daily conversion rate over time
  timeline: [
    { day: 'Nov 15', control: 6.8, treatment: 7.2 },
    { day: 'Nov 16', control: 7.1, treatment: 7.8 },
    { day: 'Nov 17', control: 6.5, treatment: 8.1 },
    { day: 'Nov 18', control: 7.2, treatment: 8.0 },
    { day: 'Nov 19', control: 6.9, treatment: 7.5 },
    { day: 'Nov 20', control: 7.0, treatment: 8.2 },
    { day: 'Nov 21', control: 7.3, treatment: 8.4 },
    { day: 'Nov 22', control: 6.8, treatment: 7.9 },
    { day: 'Nov 23', control: 7.1, treatment: 8.0 },
    { day: 'Nov 24', control: 7.0, treatment: 8.1 },
  ],
  sampleSizeReached: 85,
  powerAnalysis: {
    requiredSampleSize: 56000,
    currentSampleSize: 48250,
    minimumDetectableEffect: 10,
    statisticalPower: 80,
  }
};

interface ABTestDashboardProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const ABTestDashboard: React.FC<ABTestDashboardProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "A/B Test Results"
}) => {
  const [selectedMetric, setSelectedMetric] = useState(0);
  const [showConfidenceIntervals, setShowConfidenceIntervals] = useState(true);

  const control = data.variants[0];
  const treatment = data.variants[1];
  const primaryMetric = data.metrics[selectedMetric];

  // Chart dimensions
  const chartWidth = 400;
  const chartHeight = 120;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const innerWidth = chartWidth - margin.left - margin.right;
  const innerHeight = chartHeight - margin.top - margin.bottom;

  const yMin = Math.min(...data.timeline.flatMap(d => [d.control, d.treatment])) - 1;
  const yMax = Math.max(...data.timeline.flatMap(d => [d.control, d.treatment])) + 1;
  
  const xScale = (i: number) => (i / (data.timeline.length - 1)) * innerWidth;
  const yScale = (v: number) => innerHeight - ((v - yMin) / (yMax - yMin)) * innerHeight;

  const generateLinePath = (key: 'control' | 'treatment') => {
    return data.timeline.map((d, i) => 
      `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d[key])}`
    ).join(' ');
  };

  // Confidence interval visualization
  const ciWidth = 200;
  const ciHeight = 60;

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '20px' }}>
        {/* Main Content */}
        <div>
          {/* Variant Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
            {data.variants.map((variant, i) => (
              <div
                key={i}
                style={{
                  padding: '16px',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  border: `2px solid ${variant.color}`,
                  borderLeftWidth: '4px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: chartColors.gray }}>Variant {variant.id}</span>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: chartColors.charcoal }}>{variant.name}</div>
                  </div>
                  <div style={{ 
                    fontSize: '10px', 
                    color: chartColors.gray,
                    padding: '4px 8px',
                    backgroundColor: chartColors.light,
                    borderRadius: '4px'
                  }}>
                    n = {variant.users.toLocaleString()}
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: chartColors.gray, marginBottom: '2px' }}>Conversion Rate</div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: variant.color }}>
                      {variant.conversionRate.toFixed(2)}%
                    </div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>
                      CI: [{variant.confidenceInterval[0].toFixed(2)}, {variant.confidenceInterval[1].toFixed(2)}]%
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', color: chartColors.gray, marginBottom: '2px' }}>Revenue</div>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: chartColors.charcoal }}>
                      ${(variant.revenue / 1000).toFixed(1)}K
                    </div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>
                      {variant.conversions.toLocaleString()} conversions
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lift Summary */}
          <div style={{
            padding: '16px',
            backgroundColor: primaryMetric.significant ? chartColors.light : chartColors.light,
            borderRadius: '10px',
            marginBottom: '16px',
            border: `1px solid ${primaryMetric.significant ? chartColors.primary : chartColors.orange}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', color: chartColors.gray, marginBottom: '4px' }}>
                  {primaryMetric.name} Lift (Treatment vs Control)
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ 
                    fontSize: '32px', 
                    fontWeight: 700, 
                    color: primaryMetric.lift > 0 ? chartColors.primary : chartColors.dark 
                  }}>
                    {primaryMetric.lift > 0 ? '+' : ''}{primaryMetric.lift.toFixed(1)}%
                  </span>
                  <span style={{ 
                    fontSize: '12px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: primaryMetric.significant ? chartColors.primary : chartColors.orange,
                    color: 'white',
                    fontWeight: 500
                  }}>
                    {primaryMetric.significant ? '✓ Significant' : '⚠ Not Significant'}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', color: chartColors.gray }}>p-value</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: chartColors.charcoal }}>
                  {primaryMetric.pValue.toFixed(4)}
                </div>
                <div style={{ fontSize: '10px', color: primaryMetric.pValue < 0.05 ? chartColors.primary : chartColors.gray }}>
                  {primaryMetric.pValue < 0.05 ? '< 0.05 threshold' : '≥ 0.05 threshold'}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Chart */}
          <div style={{
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '10px',
            border: `1px solid ${chartColors.light}`
          }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '12px' }}>
              Conversion Rate Over Time
            </div>
            <svg width={chartWidth} height={chartHeight} style={{ display: 'block' }}>
              <g transform={`translate(${margin.left}, ${margin.top})`}>
                {/* Grid */}
                {[yMin, (yMin + yMax) / 2, yMax].map((v, i) => (
                  <g key={i}>
                    <line x1={0} x2={innerWidth} y1={yScale(v)} y2={yScale(v)} stroke={chartColors.light} strokeDasharray="4,4" />
                    <text x={-8} y={yScale(v)} textAnchor="end" dominantBaseline="middle" fontSize={9} fill={chartColors.gray}>
                      {v.toFixed(1)}%
                    </text>
                  </g>
                ))}
                
                {/* Area fills */}
                <path
                  d={`${generateLinePath('treatment')} L${innerWidth},${innerHeight} L0,${innerHeight} Z`}
                  fill={chartColors.teal}
                  fillOpacity={0.1}
                />
                <path
                  d={`${generateLinePath('control')} L${innerWidth},${innerHeight} L0,${innerHeight} Z`}
                  fill={chartColors.gray}
                  fillOpacity={0.1}
                />
                
                {/* Lines */}
                <path d={generateLinePath('control')} fill="none" stroke={chartColors.gray} strokeWidth={2} />
                <path d={generateLinePath('treatment')} fill="none" stroke={chartColors.teal} strokeWidth={2} />
                
                {/* Points */}
                {data.timeline.map((d, i) => (
                  <g key={i}>
                    <circle cx={xScale(i)} cy={yScale(d.control)} r={3} fill={chartColors.gray} />
                    <circle cx={xScale(i)} cy={yScale(d.treatment)} r={3} fill={chartColors.teal} />
                  </g>
                ))}
                
                {/* X-axis labels */}
                {data.timeline.filter((_, i) => i % 3 === 0).map((d, i) => (
                  <text
                    key={i}
                    x={xScale(i * 3)}
                    y={innerHeight + 15}
                    textAnchor="middle"
                    fontSize={9}
                    fill={chartColors.gray}
                  >
                    {d.day}
                  </text>
                ))}
              </g>
            </svg>
            
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '12px', height: '2px', backgroundColor: chartColors.gray }} />
                <span style={{ color: chartColors.gray }}>Control</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '12px', height: '2px', backgroundColor: chartColors.teal }} />
                <span style={{ color: chartColors.gray }}>Treatment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Metric Selector */}
          <div style={{
            padding: '12px',
            backgroundColor: 'white',
            borderRadius: '10px',
            border: `1px solid ${chartColors.light}`
          }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '8px' }}>
              Select Metric
            </div>
            {data.metrics.map((metric, i) => (
              <div
                key={i}
                onClick={() => setSelectedMetric(i)}
                style={{
                  padding: '8px 10px',
                  marginBottom: '4px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: selectedMetric === i ? chartColors.light : 'transparent',
                  border: `1px solid ${selectedMetric === i ? chartColors.teal : 'transparent'}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontSize: '11px', color: chartColors.charcoalLight }}>{metric.name}</span>
                <span style={{ 
                  fontSize: '10px', 
                  fontWeight: 600,
                  color: metric.significant ? chartColors.primary : chartColors.gray
                }}>
                  {metric.lift > 0 ? '+' : ''}{metric.lift.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>

          {/* Confidence Interval Visual */}
          <div style={{
            padding: '12px',
            backgroundColor: 'white',
            borderRadius: '10px',
            border: `1px solid ${chartColors.light}`
          }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '12px' }}>
              Confidence Intervals (95%)
            </div>
            <svg width={ciWidth} height={ciHeight} style={{ display: 'block' }}>
              {data.variants.map((variant, i) => {
                const y = 15 + i * 25;
                const minCI = Math.min(...data.variants.flatMap(v => v.confidenceInterval));
                const maxCI = Math.max(...data.variants.flatMap(v => v.confidenceInterval));
                const range = maxCI - minCI;
                const scale = (v: number) => ((v - minCI) / range) * (ciWidth - 40) + 20;
                
                return (
                  <g key={i}>
                    <text x={0} y={y} fontSize={9} fill={chartColors.gray}>{variant.id}</text>
                    {/* CI line */}
                    <line
                      x1={scale(variant.confidenceInterval[0])}
                      x2={scale(variant.confidenceInterval[1])}
                      y1={y - 3}
                      y2={y - 3}
                      stroke={variant.color}
                      strokeWidth={3}
                      strokeLinecap="round"
                    />
                    {/* Point estimate */}
                    <circle
                      cx={scale(variant.conversionRate)}
                      cy={y - 3}
                      r={5}
                      fill={variant.color}
                      stroke="white"
                      strokeWidth={2}
                    />
                  </g>
                );
              })}
              {/* Scale */}
              <line x1={20} x2={ciWidth - 20} y1={ciHeight - 5} y2={ciHeight - 5} stroke={chartColors.light} />
              <text x={20} y={ciHeight - 10} fontSize={8} fill={chartColors.gray}>6%</text>
              <text x={ciWidth - 20} y={ciHeight - 10} fontSize={8} fill={chartColors.gray} textAnchor="end">9%</text>
            </svg>
            <div style={{ fontSize: '9px', color: chartColors.gray, marginTop: '4px', textAlign: 'center' }}>
              Non-overlapping CIs indicate significance
            </div>
          </div>

          {/* Sample Size Progress */}
          <div style={{
            padding: '12px',
            backgroundColor: 'white',
            borderRadius: '10px',
            border: `1px solid ${chartColors.light}`
          }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '8px' }}>
              Sample Size Progress
            </div>
            <div style={{ 
              height: '8px', 
              backgroundColor: chartColors.light, 
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '8px'
            }}>
              <div style={{
                height: '100%',
                width: `${data.sampleSizeReached}%`,
                backgroundColor: data.sampleSizeReached >= 100 ? chartColors.primary : chartColors.navy,
                borderRadius: '4px',
                transition: 'width 0.3s'
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
              <span style={{ color: chartColors.gray }}>
                {data.powerAnalysis.currentSampleSize.toLocaleString()} / {data.powerAnalysis.requiredSampleSize.toLocaleString()}
              </span>
              <span style={{ fontWeight: 600, color: chartColors.navy }}>{data.sampleSizeReached}%</span>
            </div>
          </div>

          {/* Power Analysis */}
          <div style={{
            padding: '12px',
            backgroundColor: chartColors.background,
            borderRadius: '10px',
            fontSize: '10px'
          }}>
            <div style={{ fontWeight: 600, color: chartColors.charcoal, marginBottom: '6px' }}>
              Power Analysis
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: chartColors.gray }}>Min. Detectable Effect</span>
              <span style={{ fontWeight: 500 }}>{data.powerAnalysis.minimumDetectableEffect}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: chartColors.gray }}>Statistical Power</span>
              <span style={{ fontWeight: 500 }}>{data.powerAnalysis.statisticalPower}%</span>
            </div>
          </div>

          {/* Recommendation */}
          <div style={{
            padding: '12px',
            backgroundColor: primaryMetric.significant ? chartColors.light : chartColors.light,
            borderRadius: '10px',
            border: `1px solid ${primaryMetric.significant ? chartColors.primary : chartColors.orange}`
          }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '4px' }}>
              Recommendation
            </div>
            <div style={{ fontSize: '10px', color: chartColors.charcoalLight }}>
              {primaryMetric.significant 
                ? '✓ Results are statistically significant. Consider rolling out Treatment to 100% of users.'
                : '⚠ Results not yet significant. Continue test until sample size is reached.'}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default ABTestDashboard;
