"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Pipeline Waterfall data
const defaultData = {
  quarter: 'Q4 2024',
  asOfDate: 'Nov 15, 2024',
  quotaTotal: 4500000,
  stages: [
    { id: 'start', name: 'Pipeline Start', value: 12500000, deals: 145, color: chartColors.navy },
    { id: 'new', name: 'New Opps Added', value: 3200000, deals: 38, color: chartColors.primary, isAddition: true },
    { id: 'pulled_in', name: 'Pulled In', value: 850000, deals: 8, color: chartColors.primary, isAddition: true },
    { id: 'expansion', name: 'Expansion', value: 620000, deals: 12, color: chartColors.primary, isAddition: true },
    { id: 'slipped', name: 'Slipped Out', value: -1800000, deals: 15, color: chartColors.dark, isSubtraction: true },
    { id: 'lost', name: 'Closed Lost', value: -2100000, deals: 22, color: chartColors.dark, isSubtraction: true },
    { id: 'down', name: 'Down-sized', value: -450000, deals: 8, color: chartColors.secondary, isSubtraction: true },
    { id: 'won', name: 'Closed Won', value: -2850000, deals: 18, color: chartColors.primary, isWon: true },
    { id: 'end', name: 'Pipeline End', value: 9970000, deals: 130, color: chartColors.navy },
  ],
  velocity: {
    avgDealSize: 158000,
    avgCycleTime: 45,
    winRate: 28,
    pipelineCoverage: 2.2,
  },
  byStage: [
    { stage: 'Discovery', value: 2850000, deals: 42, probability: 10 },
    { stage: 'Qualification', value: 2100000, deals: 28, probability: 25 },
    { stage: 'Demo/POC', value: 1950000, deals: 22, probability: 50 },
    { stage: 'Proposal', value: 1680000, deals: 18, probability: 70 },
    { stage: 'Negotiation', value: 1390000, deals: 12, probability: 85 },
  ],
  forecast: {
    commit: 2850000,
    bestCase: 3600000,
    pipeline: 4200000,
  },
};

const formatCurrency = (value: number, compact = false) => {
  const absValue = Math.abs(value);
  if (compact) {
    if (absValue >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (absValue >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
};

interface PipelineWaterfallProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const PipelineWaterfall: React.FC<PipelineWaterfallProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Pipeline Waterfall"
}) => {
  const [viewMode, setViewMode] = useState<'waterfall' | 'stages' | 'forecast'>('waterfall');
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const chartWidth = width - 80;
  const chartHeight = 220;
  const maxValue = Math.max(...data.stages.map(s => Math.abs(s.value)));

  // Calculate running total for waterfall
  let runningTotal = 0;
  const waterfallBars = data.stages.map((stage, index) => {
    if (stage.id === 'start') {
      runningTotal = stage.value;
      return { ...stage, start: 0, end: stage.value };
    } else if (stage.id === 'end') {
      return { ...stage, start: 0, end: stage.value };
    } else if (stage.isWon) {
      const start = runningTotal;
      runningTotal -= Math.abs(stage.value);
      return { ...stage, start: runningTotal, end: start };
    } else {
      const start = runningTotal;
      runningTotal += stage.value;
      return { ...stage, start: Math.min(start, runningTotal), end: Math.max(start, runningTotal) };
    }
  });

  const scaleY = (value: number) => chartHeight - (value / maxValue) * chartHeight;

  return (
    <div style={{ width: '100%' }}>
      {/* Velocity Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>{formatCurrency(data.velocity.avgDealSize, true)}</div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>Avg Deal Size</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>{data.velocity.avgCycleTime}d</div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>Avg Cycle Time</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.secondary }}>{data.velocity.winRate}%</div>
          <div style={{ fontSize: '9px', color: chartColors.dark }}>Win Rate</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.teal }}>{data.velocity.pipelineCoverage}x</div>
          <div style={{ fontSize: '9px', color: chartColors.dark }}>Coverage</div>
        </div>
      </div>

      {viewMode === 'waterfall' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
          <svg width={chartWidth} height={chartHeight + 60}>
            {/* Bars */}
            {waterfallBars.map((bar, i) => {
              const barWidth = (chartWidth - 40) / waterfallBars.length - 8;
              const x = 20 + i * (barWidth + 8);
              const y1 = scaleY(bar.end);
              const y2 = scaleY(bar.start);
              const barHeight = Math.abs(y2 - y1);
              const isHovered = hoveredBar === bar.id;
              
              return (
                <g key={bar.id}
                  onMouseEnter={() => setHoveredBar(bar.id)}
                  onMouseLeave={() => setHoveredBar(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Connector line */}
                  {i > 0 && i < waterfallBars.length - 1 && (
                    <line
                      x1={x - 4}
                      y1={scaleY(waterfallBars[i - 1].id === 'start' ? waterfallBars[i - 1].value : (bar.isAddition ? bar.start : bar.end))}
                      x2={x}
                      y2={scaleY(bar.isAddition ? bar.start : bar.end)}
                      stroke={chartColors.light}
                      strokeDasharray="3,3"
                    />
                  )}
                  
                  <rect
                    x={x}
                    y={Math.min(y1, y2)}
                    width={barWidth}
                    height={barHeight || 2}
                    fill={bar.color}
                    opacity={isHovered ? 1 : 0.85}
                    rx={4}
                  />
                  
                  {/* Value label */}
                  <text
                    x={x + barWidth / 2}
                    y={Math.min(y1, y2) - 6}
                    textAnchor="middle"
                    fontSize={9}
                    fontWeight={600}
                    fill={bar.color}
                  >
                    {bar.isSubtraction || bar.isWon ? '' : '+'}{formatCurrency(bar.value, true)}
                  </text>
                  
                  {/* X-axis label */}
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight + 20}
                    textAnchor="middle"
                    fontSize={8}
                    fill={chartColors.gray}
                    transform={`rotate(-30, ${x + barWidth / 2}, ${chartHeight + 20})`}
                  >
                    {bar.name}
                  </text>
                  
                  {/* Tooltip */}
                  {isHovered && (
                    <g>
                      <rect
                        x={x + barWidth / 2 - 50}
                        y={Math.min(y1, y2) - 45}
                        width={100}
                        height={35}
                        fill={chartColors.charcoal}
                        rx={4}
                      />
                      <text x={x + barWidth / 2} y={Math.min(y1, y2) - 30} textAnchor="middle" fontSize={10} fill="white" fontWeight={600}>
                        {formatCurrency(Math.abs(bar.value), true)}
                      </text>
                      <text x={x + barWidth / 2} y={Math.min(y1, y2) - 17} textAnchor="middle" fontSize={9} fill={chartColors.secondary}>
                        {bar.deals} deals
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
          
          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px', fontSize: '9px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: chartColors.primary, borderRadius: '2px' }} />
              <span style={{ color: chartColors.gray }}>Additions</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: chartColors.dark, borderRadius: '2px' }} />
              <span style={{ color: chartColors.gray }}>Reductions</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: chartColors.primary, borderRadius: '2px' }} />
              <span style={{ color: chartColors.gray }}>Closed Won</span>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'stages' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
            PIPELINE BY STAGE
          </div>
          {data.byStage.map((stage, i) => {
            const widthPercent = (stage.value / data.byStage[0].value) * 100;
            const weightedValue = stage.value * (stage.probability / 100);
            return (
              <div key={stage.stage} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 500, color: chartColors.charcoal }}>{stage.stage}</span>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ color: chartColors.gray }}>{stage.deals} deals</span>
                    <span style={{ fontWeight: 600 }}>{formatCurrency(stage.value, true)}</span>
                    <span style={{ color: chartColors.teal, fontWeight: 600 }}>
                      {formatCurrency(weightedValue, true)} weighted
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '20px', backgroundColor: chartColors.light, borderRadius: '4px', position: 'relative' }}>
                    <div style={{
                      width: `${widthPercent}%`,
                      height: '100%',
                      backgroundColor: chartColors.teal,
                      borderRadius: '4px',
                      opacity: 0.3 + (stage.probability / 100) * 0.7
                    }} />
                  </div>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    color: stage.probability >= 70 ? chartColors.primary : stage.probability >= 50 ? chartColors.secondary : chartColors.gray,
                    minWidth: '35px'
                  }}>
                    {stage.probability}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'forecast' && (
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
            FORECAST VS QUOTA
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              padding: '20px',
              backgroundColor: chartColors.light,
              borderRadius: '12px',
              textAlign: 'center',
              border: `2px solid ${chartColors.primary}`
            }}>
              <div style={{ fontSize: '10px', color: chartColors.navy, marginBottom: '4px' }}>COMMIT</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: chartColors.primary }}>{formatCurrency(data.forecast.commit, true)}</div>
              <div style={{ fontSize: '10px', color: chartColors.navy }}>{Math.round((data.forecast.commit / data.quotaTotal) * 100)}% of quota</div>
            </div>
            <div style={{
              padding: '20px',
              backgroundColor: chartColors.light,
              borderRadius: '12px',
              textAlign: 'center',
              border: `2px solid ${chartColors.secondary}`
            }}>
              <div style={{ fontSize: '10px', color: chartColors.dark, marginBottom: '4px' }}>BEST CASE</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: chartColors.secondary }}>{formatCurrency(data.forecast.bestCase, true)}</div>
              <div style={{ fontSize: '10px', color: chartColors.dark }}>{Math.round((data.forecast.bestCase / data.quotaTotal) * 100)}% of quota</div>
            </div>
            <div style={{
              padding: '20px',
              backgroundColor: chartColors.light,
              borderRadius: '12px',
              textAlign: 'center',
              border: `2px solid ${chartColors.primary}`
            }}>
              <div style={{ fontSize: '10px', color: chartColors.navy, marginBottom: '4px' }}>PIPELINE</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: chartColors.primary }}>{formatCurrency(data.forecast.pipeline, true)}</div>
              <div style={{ fontSize: '10px', color: chartColors.navy }}>{Math.round((data.forecast.pipeline / data.quotaTotal) * 100)}% of quota</div>
            </div>
          </div>
          
          {/* Quota Progress */}
          <div style={{
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '10px',
            border: `1px solid ${chartColors.light}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>Quota: {formatCurrency(data.quotaTotal, true)}</span>
              <span style={{ fontSize: '11px', color: chartColors.gray }}>
                Gap to quota: {formatCurrency(data.quotaTotal - data.forecast.commit, true)}
              </span>
            </div>
            <div style={{ height: '24px', backgroundColor: chartColors.light, borderRadius: '6px', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: `${(data.forecast.commit / data.quotaTotal) * 100}%`,
                height: '100%',
                backgroundColor: chartColors.primary,
              }} />
              <div style={{
                position: 'absolute',
                left: `${(data.forecast.commit / data.quotaTotal) * 100}%`,
                top: 0,
                width: `${((data.forecast.bestCase - data.forecast.commit) / data.quotaTotal) * 100}%`,
                height: '100%',
                backgroundColor: chartColors.secondary,
                opacity: 0.6
              }} />
              <div style={{
                position: 'absolute',
                left: `${(data.forecast.bestCase / data.quotaTotal) * 100}%`,
                top: 0,
                width: `${((data.forecast.pipeline - data.forecast.bestCase) / data.quotaTotal) * 100}%`,
                height: '100%',
                backgroundColor: chartColors.primary,
                opacity: 0.4
              }} />
              {/* 100% marker */}
              <div style={{
                position: 'absolute',
                left: '100%',
                top: 0,
                width: '2px',
                height: '100%',
                backgroundColor: chartColors.charcoal,
                transform: 'translateX(-2px)'
              }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelineWaterfall;
