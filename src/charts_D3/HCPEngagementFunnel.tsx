"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// HCP Engagement Funnel data
const defaultData = {
  drugName: 'NEXAGEN™',
  indication: 'NSCLC',
  targetHCPs: 45000,
  period: 'Q4 2026 (Launch Quarter)',
  stages: [
    {
      id: 'universe',
      name: 'Target Universe',
      count: 45000,
      percentage: 100,
      color: chartColors.light,
      description: 'Total addressable HCPs in specialty',
      metrics: [
        { label: 'Oncologists', value: '28,000' },
        { label: 'Pulmonologists', value: '12,000' },
        { label: 'Nurse Practitioners', value: '5,000' },
      ]
    },
    {
      id: 'reached',
      name: 'Reached',
      count: 32400,
      percentage: 72,
      color: chartColors.navy,
      description: 'Contacted via any channel',
      metrics: [
        { label: 'Rep Visits', value: '18,500' },
        { label: 'Email Engaged', value: '24,200' },
        { label: 'Webinar Attended', value: '8,400' },
      ],
      channels: [
        { name: 'Field Sales', value: 45, color: chartColors.navy },
        { name: 'Email', value: 30, color: chartColors.navy },
        { name: 'Webinar', value: 15, color: chartColors.teal },
        { name: 'Conference', value: 10, color: chartColors.light },
      ]
    },
    {
      id: 'educated',
      name: 'Educated',
      count: 18900,
      percentage: 42,
      color: chartColors.navy,
      description: 'Completed clinical education',
      metrics: [
        { label: 'Speaker Program', value: '4,200' },
        { label: 'Peer-to-Peer', value: '6,800' },
        { label: 'Self-Directed', value: '7,900' },
      ]
    },
    {
      id: 'trial',
      name: 'Trial',
      count: 8100,
      percentage: 18,
      color: chartColors.primary,
      description: 'Wrote first prescription',
      metrics: [
        { label: 'Avg Days to 1st Rx', value: '12' },
        { label: 'Sample Conversions', value: '2,400' },
        { label: 'Voucher Redemptions', value: '1,800' },
      ]
    },
    {
      id: 'adoption',
      name: 'Adoption',
      count: 4050,
      percentage: 9,
      color: chartColors.primary,
      description: 'Regular prescriber (3+ Rx/mo)',
      metrics: [
        { label: 'Avg TRx/Month', value: '4.2' },
        { label: 'New Starts', value: '2,100' },
        { label: 'Switches', value: '1,950' },
      ]
    },
    {
      id: 'advocacy',
      name: 'Advocacy',
      count: 1620,
      percentage: 3.6,
      color: chartColors.primary,
      description: 'Champion/KOL recommending to peers',
      metrics: [
        { label: 'Speaker Bureau', value: '180' },
        { label: 'Pub Authors', value: '45' },
        { label: 'Case Studies', value: '320' },
      ]
    },
  ],
  conversionRates: [
    { from: 'universe', to: 'reached', rate: 72 },
    { from: 'reached', to: 'educated', rate: 58 },
    { from: 'educated', to: 'trial', rate: 43 },
    { from: 'trial', to: 'adoption', rate: 50 },
    { from: 'adoption', to: 'advocacy', rate: 40 },
  ],
  benchmarks: {
    reachRate: { value: 72, benchmark: 65, status: 'above' },
    trialRate: { value: 43, benchmark: 35, status: 'above' },
    adoptionRate: { value: 50, benchmark: 45, status: 'above' },
  }
};

interface HCPEngagementFunnelProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const HCPEngagementFunnel: React.FC<HCPEngagementFunnelProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "HCP Engagement Funnel"
}) => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  const margin = { top: 50, right: 180, bottom: 40, left: 30 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Funnel dimensions
  const maxWidth = innerWidth * 0.85;
  const stageHeight = innerHeight / data.stages.length;
  const minWidth = maxWidth * 0.15;

  // Calculate stage widths based on percentage
  const getStageWidth = (percentage: number) => {
    return minWidth + (maxWidth - minWidth) * (percentage / 100);
  };

  return (
    <div style={{ width: '100%' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: chartColors.background, borderRadius: '12px' }}
      >
        <defs>
          {data.stages.map((stage, i) => (
            <linearGradient key={stage.id} id={`funnel-gradient-${stage.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={stage.color} stopOpacity={0.9} />
              <stop offset="100%" stopColor={stage.color} stopOpacity={0.7} />
            </linearGradient>
          ))}
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Funnel stages */}
          {data.stages.map((stage, i) => {
            const stageWidth = getStageWidth(stage.percentage);
            const nextStage = data.stages[i + 1];
            const nextWidth = nextStage ? getStageWidth(nextStage.percentage) : stageWidth * 0.8;
            
            const y = i * stageHeight;
            const x = (maxWidth - stageWidth) / 2;
            const nextX = (maxWidth - nextWidth) / 2;
            
            const isSelected = selectedStage === stage.id;
            const isHovered = hoveredStage === stage.id;
            
            // Trapezoid points
            const points = [
              [x, y + 4],
              [x + stageWidth, y + 4],
              [nextX + nextWidth, y + stageHeight - 4],
              [nextX, y + stageHeight - 4],
            ].map(p => p.join(',')).join(' ');

            return (
              <g
                key={stage.id}
                onClick={() => setSelectedStage(isSelected ? null : stage.id)}
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Stage shape */}
                <polygon
                  points={points}
                  fill={`url(#funnel-gradient-${stage.id})`}
                  stroke={isSelected || isHovered ? chartColors.charcoal : 'none'}
                  strokeWidth={2}
                  style={{ transition: 'all 0.2s' }}
                />

                {/* Stage label (inside) */}
                <text
                  x={maxWidth / 2}
                  y={y + stageHeight / 2 - 2}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={600}
                  fill={stage.color === chartColors.light ? chartColors.charcoal : 'white'}
                >
                  {stage.name}
                </text>
                <text
                  x={maxWidth / 2}
                  y={y + stageHeight / 2 + 14}
                  textAnchor="middle"
                  fontSize={14}
                  fontWeight={700}
                  fill={stage.color === chartColors.light ? chartColors.charcoal : 'white'}
                >
                  {stage.count.toLocaleString()}
                </text>

                {/* Percentage on right */}
                <text
                  x={maxWidth + 20}
                  y={y + stageHeight / 2 + 5}
                  fontSize={16}
                  fontWeight={700}
                  fill={stage.color === chartColors.light ? chartColors.charcoalLight : stage.color}
                >
                  {stage.percentage}%
                </text>

                {/* Conversion rate arrow */}
                {i < data.stages.length - 1 && (
                  <g>
                    <line
                      x1={maxWidth + 60}
                      y1={y + stageHeight / 2}
                      x2={maxWidth + 60}
                      y2={y + stageHeight + stageHeight / 2}
                      stroke={chartColors.secondary}
                      strokeWidth={1}
                      strokeDasharray="3,3"
                    />
                    <text
                      x={maxWidth + 75}
                      y={y + stageHeight}
                      fontSize={10}
                      fill={chartColors.gray}
                    >
                      {data.conversionRates[i]?.rate}%→
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Right side labels */}
          <g transform={`translate(${maxWidth + 100}, 0)`}>
            <text x={0} y={0} fontSize={10} fontWeight={600} fill={chartColors.charcoalLight}>
              Conversion
            </text>
            <text x={0} y={12} fontSize={10} fontWeight={600} fill={chartColors.charcoalLight}>
              Rates
            </text>
          </g>
        </g>
      </svg>

      {/* Stage Details Panel */}
      {selectedStage && (
        <div style={{
          marginTop: '16px',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '10px',
          border: `2px solid ${data.stages.find(s => s.id === selectedStage)?.color}`,
        }}>
          {(() => {
            const stage = data.stages.find(s => s.id === selectedStage);
            if (!stage) return null;
            
            return (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div>
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: 600, 
                      color: chartColors.charcoal,
                      marginRight: '8px'
                    }}>
                      {stage.name}
                    </span>
                    <span style={{ fontSize: '11px', color: chartColors.gray }}>
                      {stage.description}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: stage.color === chartColors.light ? chartColors.charcoal : stage.color
                  }}>
                    {stage.count.toLocaleString()} HCPs
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  {stage.metrics.map((metric, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: chartColors.background,
                        borderRadius: '8px',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '18px', fontWeight: 700, color: stage.color === chartColors.light ? chartColors.charcoal : stage.color }}>
                        {metric.value}
                      </div>
                      <div style={{ fontSize: '10px', color: chartColors.gray }}>
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Channel breakdown for 'reached' stage */}
                {stage.id === 'reached' && stage.channels && (
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
                      Channel Mix
                    </div>
                    <div style={{ display: 'flex', height: '24px', borderRadius: '12px', overflow: 'hidden' }}>
                      {stage.channels.map((channel, i) => (
                        <div
                          key={i}
                          style={{
                            flex: channel.value,
                            backgroundColor: channel.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          title={`${channel.name}: ${channel.value}%`}
                        >
                          <span style={{ fontSize: '9px', color: 'white', fontWeight: 500 }}>
                            {channel.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                      {stage.channels.map((channel, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: channel.color }} />
                          <span style={{ fontSize: '9px', color: chartColors.gray }}>{channel.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}

      {/* Funnel Summary */}
      <div style={{
        marginTop: '12px',
        padding: '12px 16px',
        backgroundColor: chartColors.light,
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <div>
            <span style={{ fontSize: '10px', color: chartColors.primary, fontWeight: 500 }}>Overall Conversion</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: chartColors.primary, marginLeft: '8px' }}>
              {((data.stages[data.stages.length - 1].count / data.stages[0].count) * 100).toFixed(1)}%
            </span>
          </div>
          <div>
            <span style={{ fontSize: '10px', color: chartColors.primary, fontWeight: 500 }}>Avg Drop-off</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: chartColors.primary, marginLeft: '8px' }}>
              {Math.round(100 - (data.conversionRates.reduce((a, b) => a + b.rate, 0) / data.conversionRates.length))}% per stage
            </span>
          </div>
        </div>
        <div style={{ fontSize: '10px', color: chartColors.gray }}>
          Click stage for details
        </div>
      </div>
    </div>
  );
};

export default HCPEngagementFunnel;
