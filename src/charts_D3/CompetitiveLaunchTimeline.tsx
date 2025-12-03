"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Competitive Launch Timeline data
const defaultData = {
  indication: 'NSCLC (PD-L1+)',
  timelineStart: 2024,
  timelineEnd: 2028,
  drugs: [
    {
      id: 'nexagen',
      name: 'NEXAGEN™',
      company: 'Apex Pharma',
      isOwn: true,
      color: chartColors.primary,
      phases: [
        { phase: 'Phase III', start: 2024.0, end: 2025.5 },
        { phase: 'NDA Review', start: 2025.5, end: 2026.0 },
        { phase: 'Launch', start: 2026.0, end: 2028.0 },
      ],
      milestones: [
        { name: 'Primary Endpoint', date: 2025.2, icon: '✓' },
        { name: 'FDA Approval', date: 2026.0, icon: '🎯' },
        { name: 'EU Approval', date: 2026.5, icon: '🇪🇺' },
      ],
      status: 'Active',
      keyDifferentiator: 'Best-in-class ORR (42%)',
    },
    {
      id: 'keytruda',
      name: 'KEYTRUDA',
      company: 'Merck',
      isOwn: false,
      color: chartColors.navy,
      phases: [
        { phase: 'Approved', start: 2024.0, end: 2028.0 },
      ],
      milestones: [
        { name: '1L NSCLC', date: 2024.0, icon: '●' },
      ],
      status: 'Market Leader',
      keyDifferentiator: '$25B+ annual sales',
    },
    {
      id: 'opdivo',
      name: 'OPDIVO',
      company: 'BMS',
      isOwn: false,
      color: chartColors.navy,
      phases: [
        { phase: 'Approved', start: 2024.0, end: 2028.0 },
      ],
      milestones: [
        { name: '1L Combo', date: 2024.3, icon: '●' },
      ],
      status: 'Established',
      keyDifferentiator: 'Strong combo data',
    },
    {
      id: 'imfinzi',
      name: 'IMFINZI',
      company: 'AstraZeneca',
      isOwn: false,
      color: chartColors.secondary,
      phases: [
        { phase: 'Approved', start: 2024.0, end: 2028.0 },
      ],
      milestones: [
        { name: 'Stage III', date: 2024.0, icon: '●' },
      ],
      status: 'Niche',
      keyDifferentiator: 'Unresectable Stage III',
    },
    {
      id: 'competitor-x',
      name: 'BIO-4892',
      company: 'BioGen',
      isOwn: false,
      color: chartColors.dark,
      phases: [
        { phase: 'Phase III', start: 2024.5, end: 2026.5 },
        { phase: 'NDA Review', start: 2026.5, end: 2027.2 },
        { phase: 'Launch', start: 2027.2, end: 2028.0 },
      ],
      milestones: [
        { name: 'Data Readout', date: 2026.0, icon: '⏳' },
        { name: 'Expected Approval', date: 2027.2, icon: '?' },
      ],
      status: 'Pipeline',
      keyDifferentiator: 'Oral formulation',
    },
    {
      id: 'competitor-y',
      name: 'PD-NEXT',
      company: 'NovaRx',
      isOwn: false,
      color: chartColors.cyan,
      phases: [
        { phase: 'Phase II', start: 2024.0, end: 2025.0 },
        { phase: 'Phase III', start: 2025.0, end: 2027.5 },
      ],
      milestones: [
        { name: 'Phase II Results', date: 2024.8, icon: '📊' },
      ],
      status: 'Early',
      keyDifferentiator: 'Bispecific antibody',
    },
  ],
  marketShare: {
    current: [
      { name: 'KEYTRUDA', share: 55 },
      { name: 'OPDIVO', share: 25 },
      { name: 'IMFINZI', share: 12 },
      { name: 'Others', share: 8 },
    ],
    projected2027: [
      { name: 'KEYTRUDA', share: 42 },
      { name: 'NEXAGEN™', share: 22 },
      { name: 'OPDIVO', share: 18 },
      { name: 'IMFINZI', share: 10 },
      { name: 'Others', share: 8 },
    ]
  }
};

interface CompetitiveLaunchTimelineProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const CompetitiveLaunchTimeline: React.FC<CompetitiveLaunchTimelineProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Competitive Launch Timeline"
}) => {
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);
  const [showProjected, setShowProjected] = useState(false);

  const margin = { top: 50, right: 30, bottom: 100, left: 120 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const years = data.timelineEnd - data.timelineStart;
  const yearWidth = innerWidth / years;
  const rowHeight = innerHeight / data.drugs.length;

  // Convert year to x position
  const yearToX = (year: number) => (year - data.timelineStart) * yearWidth;

  return (
    <div style={{ width: '100%' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: chartColors.background, borderRadius: '12px' }}
      >
        <defs>
          <pattern id="diagonal-stripes" patternUnits="userSpaceOnUse" width="6" height="6">
            <path d="M-1,1 l2,-2 M0,6 l6,-6 M5,7 l2,-2" stroke={chartColors.white} strokeWidth="1" strokeOpacity="0.3"/>
          </pattern>
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Year grid lines and labels */}
          {Array.from({ length: years + 1 }).map((_, i) => {
            const year = data.timelineStart + i;
            const x = i * yearWidth;
            const isCurrentYear = year === 2025;
            
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={-10}
                  x2={x}
                  y2={innerHeight}
                  stroke={isCurrentYear ? chartColors.dark : chartColors.light}
                  strokeWidth={isCurrentYear ? 2 : 1}
                  strokeDasharray={isCurrentYear ? 'none' : '4,4'}
                />
                <text
                  x={x}
                  y={-20}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={isCurrentYear ? 700 : 400}
                  fill={isCurrentYear ? chartColors.dark : chartColors.charcoalLight}
                >
                  {year}
                </text>
                {isCurrentYear && (
                  <text x={x} y={-8} textAnchor="middle" fontSize={8} fill={chartColors.dark}>
                    NOW
                  </text>
                )}
              </g>
            );
          })}

          {/* Drug rows */}
          {data.drugs.map((drug, i) => {
            const y = i * rowHeight;
            const isSelected = selectedDrug === drug.id;
            const isOwn = drug.isOwn;
            
            return (
              <g
                key={drug.id}
                onClick={() => setSelectedDrug(isSelected ? null : drug.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Row background */}
                {isOwn && (
                  <rect
                    x={-margin.left + 10}
                    y={y}
                    width={innerWidth + margin.left - 10}
                    height={rowHeight}
                    fill={chartColors.light}
                    rx={6}
                  />
                )}

                {/* Drug label */}
                <text
                  x={-10}
                  y={y + rowHeight / 2}
                  textAnchor="end"
                  fontSize={11}
                  fontWeight={isOwn ? 700 : 500}
                  fill={isOwn ? chartColors.primary : chartColors.charcoal}
                >
                  {drug.name}
                </text>
                <text
                  x={-10}
                  y={y + rowHeight / 2 + 12}
                  textAnchor="end"
                  fontSize={8}
                  fill={chartColors.gray}
                >
                  {drug.company}
                </text>

                {/* Phase bars */}
                {drug.phases.map((phase, j) => {
                  const phaseX = yearToX(phase.start);
                  const phaseWidth = yearToX(phase.end) - yearToX(phase.start);
                  const isApproved = phase.phase === 'Approved' || phase.phase === 'Launch';
                  
                  return (
                    <g key={j}>
                      <rect
                        x={phaseX}
                        y={y + rowHeight / 2 - 10}
                        width={phaseWidth}
                        height={20}
                        rx={4}
                        fill={drug.color}
                        fillOpacity={isApproved ? 0.9 : 0.5}
                      />
                      {!isApproved && (
                        <rect
                          x={phaseX}
                          y={y + rowHeight / 2 - 10}
                          width={phaseWidth}
                          height={20}
                          rx={4}
                          fill="url(#diagonal-stripes)"
                        />
                      )}
                      {phaseWidth > 40 && (
                        <text
                          x={phaseX + phaseWidth / 2}
                          y={y + rowHeight / 2 + 4}
                          textAnchor="middle"
                          fontSize={8}
                          fontWeight={500}
                          fill="white"
                        >
                          {phase.phase}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Milestones */}
                {drug.milestones.map((milestone, j) => {
                  const mx = yearToX(milestone.date);
                  return (
                    <g key={j}>
                      <circle
                        cx={mx}
                        cy={y + rowHeight / 2}
                        r={10}
                        fill="white"
                        stroke={drug.color}
                        strokeWidth={2}
                      />
                      <text
                        x={mx}
                        y={y + rowHeight / 2 + 4}
                        textAnchor="middle"
                        fontSize={10}
                      >
                        {milestone.icon}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Market Share Chart */}
      <div style={{ 
        marginTop: '16px',
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '10px',
        border: `1px solid ${chartColors.light}`
      }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '12px' }}>
          Market Share: {showProjected ? '2027 Projected' : 'Current'}
        </div>
        <div style={{ display: 'flex', height: '24px', borderRadius: '12px', overflow: 'hidden' }}>
          {(showProjected ? data.marketShare.projected2027 : data.marketShare.current).map((item, i) => {
            const drug = data.drugs.find(d => d.name === item.name);
            const color = drug?.color || (item.name === 'NEXAGEN™' ? chartColors.primary : chartColors.secondary);
            return (
              <div
                key={i}
                style={{
                  flex: item.share,
                  backgroundColor: color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'flex 0.3s'
                }}
              >
                {item.share >= 10 && (
                  <span style={{ fontSize: '10px', fontWeight: 600, color: 'white' }}>
                    {item.share}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
          {(showProjected ? data.marketShare.projected2027 : data.marketShare.current).map((item, i) => {
            const drug = data.drugs.find(d => d.name === item.name);
            const color = drug?.color || (item.name === 'NEXAGEN™' ? chartColors.primary : chartColors.secondary);
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: color }} />
                <span style={{ fontSize: '10px', color: chartColors.charcoalLight }}>
                  {item.name} ({item.share}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Drug Details */}
      {selectedDrug && (
        <div style={{ 
          marginTop: '12px',
          padding: '12px 16px',
          backgroundColor: data.drugs.find(d => d.id === selectedDrug)?.isOwn ? chartColors.light : chartColors.background,
          borderRadius: '8px',
          border: `1px solid ${data.drugs.find(d => d.id === selectedDrug)?.color}40`
        }}>
          {(() => {
            const drug = data.drugs.find(d => d.id === selectedDrug);
            if (!drug) return null;
            return (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: drug.color }}>{drug.name}</span>
                  <span style={{ fontSize: '11px', color: chartColors.gray, marginLeft: '8px' }}>{drug.company}</span>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: chartColors.gray }}>Status</div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>{drug.status}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: chartColors.gray }}>Differentiator</div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>{drug.keyDifferentiator}</div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Legend */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        gap: '16px',
        fontSize: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '16px', height: '8px', backgroundColor: chartColors.primary, borderRadius: '2px' }} />
          <span style={{ color: chartColors.charcoalLight }}>Approved/Launch</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '16px', height: '8px', backgroundColor: chartColors.primary, opacity: 0.5, borderRadius: '2px' }} />
          <span style={{ color: chartColors.charcoalLight }}>Development</span>
        </div>
        <div style={{ marginLeft: 'auto', color: chartColors.gray }}>
          Click drug for details
        </div>
      </div>
    </div>
  );
};

export default CompetitiveLaunchTimeline;
