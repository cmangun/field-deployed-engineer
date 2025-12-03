"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Drug Launch Roadmap data
const defaultData = {
  drugName: 'NEXAGEN™',
  indication: 'Non-Small Cell Lung Cancer (NSCLC)',
  molecule: 'NEX-4521 (Anti-PD-L1 mAb)',
  phases: [
    {
      id: 'phase1',
      name: 'Phase I',
      subtitle: 'Safety & Dosing',
      startMonth: 0,
      duration: 18,
      color: chartColors.navy,
      status: 'completed',
      patients: '45 patients',
      sites: '8 sites',
      details: ['MTD established', 'DLTs characterized', 'PK/PD profiled'],
      milestones: [
        { name: 'IND Submission', month: -1, icon: '📄' },
        { name: 'FPI (First Patient In)', month: 1, icon: '👤' },
        { name: 'RP2D Selected', month: 16, icon: '💊' },
      ]
    },
    {
      id: 'phase2',
      name: 'Phase II',
      subtitle: 'Efficacy Signal',
      startMonth: 16,
      duration: 24,
      color: chartColors.navy,
      status: 'completed',
      patients: '280 patients',
      sites: '35 sites',
      details: ['ORR: 42%', 'DCR: 78%', 'mPFS: 8.2 mo'],
      milestones: [
        { name: 'EOP2 Meeting', month: 38, icon: '🏛️' },
        { name: 'Breakthrough Designation', month: 32, icon: '⚡' },
      ]
    },
    {
      id: 'phase3',
      name: 'Phase III',
      subtitle: 'Confirmatory',
      startMonth: 40,
      duration: 36,
      color: chartColors.primary,
      status: 'completed',
      patients: '1,247 patients',
      sites: '142 sites (global)',
      details: ['OS HR: 0.71', 'PFS HR: 0.58', 'p<0.001'],
      milestones: [
        { name: 'Primary Endpoint Met', month: 68, icon: '✓' },
        { name: 'Data Lock', month: 72, icon: '🔒' },
      ]
    },
    {
      id: 'nda',
      name: 'NDA/BLA',
      subtitle: 'Submission',
      startMonth: 74,
      duration: 4,
      color: chartColors.secondary,
      status: 'completed',
      patients: '',
      sites: '',
      details: ['eCTD compiled', 'Pre-NDA meeting', 'Rolling submission'],
      milestones: [
        { name: 'NDA Accepted', month: 78, icon: '📬' },
      ]
    },
    {
      id: 'review',
      name: 'FDA Review',
      subtitle: 'Priority Review',
      startMonth: 78,
      duration: 8,
      color: chartColors.dark,
      status: 'active',
      patients: '',
      sites: '',
      details: ['Priority Review granted', 'AdCom scheduled', 'Label negotiations'],
      milestones: [
        { name: 'AdCom Meeting', month: 83, icon: '👥' },
        { name: 'PDUFA Date', month: 86, icon: '🎯', isLabelDay: true },
      ]
    },
    {
      id: 'launch',
      name: 'Launch',
      subtitle: 'Commercial',
      startMonth: 86,
      duration: 12,
      color: chartColors.primary,
      status: 'upcoming',
      patients: '',
      sites: '',
      details: ['Sales force deployed', 'Payer contracts live', 'DTC campaign'],
      milestones: [
        { name: 'Label Day', month: 86, icon: '🏷️', isLabelDay: true },
        { name: 'First Commercial Rx', month: 87, icon: '💊' },
        { name: 'Peak Launch', month: 92, icon: '📈' },
      ]
    },
  ],
  currentMonth: 84,
  keyDates: {
    indSubmission: 'Jan 2020',
    breakthrough: 'Mar 2022',
    ndaSubmission: 'Feb 2026',
    pdufaDate: 'Oct 2026',
    projectedLaunch: 'Oct 2026'
  }
};

interface DrugLaunchRoadmapProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const DrugLaunchRoadmap: React.FC<DrugLaunchRoadmapProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Drug Launch Roadmap"
}) => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [hoveredMilestone, setHoveredMilestone] = useState<string | null>(null);

  const margin = { top: 80, right: 30, bottom: 80, left: 30 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Timeline calculations
  const totalMonths = Math.max(...data.phases.map(p => p.startMonth + p.duration)) + 6;
  const monthWidth = innerWidth / totalMonths;
  const trackHeight = 50;
  const trackY = innerHeight / 2 - trackHeight / 2;

  // Current time indicator
  const currentX = data.currentMonth * monthWidth;

  // Status colors
  const statusColors: Record<string, string> = {
    completed: chartColors.primary,
    active: chartColors.secondary,
    upcoming: chartColors.secondary,
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
          <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={chartColors.navy} stopOpacity={0.1} />
            <stop offset="100%" stopColor={chartColors.primary} stopOpacity={0.1} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Background track */}
          <rect
            x={0}
            y={trackY - 10}
            width={innerWidth}
            height={trackHeight + 20}
            rx={8}
            fill="url(#timeline-gradient)"
          />

          {/* Year markers */}
          {Array.from({ length: Math.ceil(totalMonths / 12) + 1 }).map((_, i) => {
            const x = i * 12 * monthWidth;
            const year = 2020 + i;
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={trackY - 20}
                  x2={x}
                  y2={trackY + trackHeight + 20}
                  stroke={chartColors.light}
                  strokeDasharray="4,4"
                />
                <text
                  x={x}
                  y={trackY + trackHeight + 45}
                  textAnchor="middle"
                  fontSize={10}
                  fill={chartColors.gray}
                >
                  {year}
                </text>
              </g>
            );
          })}

          {/* Phase bars */}
          {data.phases.map((phase) => {
            const x = phase.startMonth * monthWidth;
            const phaseWidth = phase.duration * monthWidth;
            const isSelected = selectedPhase === phase.id;
            const isActive = phase.status === 'active';
            
            return (
              <g
                key={phase.id}
                onClick={() => setSelectedPhase(isSelected ? null : phase.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Phase bar */}
                <rect
                  x={x}
                  y={trackY}
                  width={phaseWidth}
                  height={trackHeight}
                  rx={6}
                  fill={phase.color}
                  fillOpacity={phase.status === 'upcoming' ? 0.3 : 0.9}
                  stroke={isSelected ? chartColors.charcoal : 'none'}
                  strokeWidth={2}
                />
                
                {/* Active pulse animation */}
                {isActive && (
                  <rect
                    x={x}
                    y={trackY}
                    width={phaseWidth}
                    height={trackHeight}
                    rx={6}
                    fill="none"
                    stroke={phase.color}
                    strokeWidth={2}
                    opacity={0.5}
                  >
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                  </rect>
                )}

                {/* Phase label */}
                <text
                  x={x + phaseWidth / 2}
                  y={trackY + 20}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={600}
                  fill="white"
                >
                  {phase.name}
                </text>
                <text
                  x={x + phaseWidth / 2}
                  y={trackY + 34}
                  textAnchor="middle"
                  fontSize={8}
                  fill="rgba(255,255,255,0.8)"
                >
                  {phase.subtitle}
                </text>

                {/* Status indicator */}
                <circle
                  cx={x + 12}
                  cy={trackY + 12}
                  r={4}
                  fill={statusColors[phase.status]}
                />
              </g>
            );
          })}

          {/* Milestones */}
          {data.phases.flatMap((phase) =>
            phase.milestones.map((milestone, i) => {
              const x = milestone.month * monthWidth;
              const isAbove = i % 2 === 0;
              const y = isAbove ? trackY - 30 : trackY + trackHeight + 30;
              const isHovered = hoveredMilestone === `${phase.id}-${milestone.name}`;
              const isLabelDay = milestone.isLabelDay;
              
              return (
                <g
                  key={`${phase.id}-${milestone.name}`}
                  onMouseEnter={() => setHoveredMilestone(`${phase.id}-${milestone.name}`)}
                  onMouseLeave={() => setHoveredMilestone(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Connector line */}
                  <line
                    x1={x}
                    y1={isAbove ? trackY : trackY + trackHeight}
                    x2={x}
                    y2={isAbove ? y + 12 : y - 12}
                    stroke={isLabelDay ? chartColors.dark : chartColors.secondary}
                    strokeWidth={isLabelDay ? 2 : 1}
                    strokeDasharray={isLabelDay ? 'none' : '3,3'}
                  />
                  
                  {/* Milestone marker */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isLabelDay ? 16 : 12}
                    fill={isLabelDay ? chartColors.dark : (isHovered ? phase.color : 'white')}
                    stroke={isLabelDay ? chartColors.dark : phase.color}
                    strokeWidth={2}
                    filter={isLabelDay ? 'url(#glow)' : 'none'}
                  />
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    fontSize={isLabelDay ? 12 : 10}
                  >
                    {milestone.icon}
                  </text>

                  {/* Label */}
                  <text
                    x={x}
                    y={isAbove ? y - 18 : y + 24}
                    textAnchor="middle"
                    fontSize={8}
                    fontWeight={isLabelDay ? 700 : 500}
                    fill={isLabelDay ? chartColors.dark : chartColors.charcoalLight}
                  >
                    {milestone.name}
                  </text>
                </g>
              );
            })
          )}

          {/* Current time indicator */}
          <g>
            <line
              x1={currentX}
              y1={trackY - 40}
              x2={currentX}
              y2={trackY + trackHeight + 40}
              stroke={chartColors.dark}
              strokeWidth={2}
              strokeDasharray="4,2"
            />
            <polygon
              points={`${currentX - 6},${trackY - 45} ${currentX + 6},${trackY - 45} ${currentX},${trackY - 35}`}
              fill={chartColors.dark}
            />
            <text
              x={currentX}
              y={trackY - 52}
              textAnchor="middle"
              fontSize={9}
              fontWeight={600}
              fill={chartColors.dark}
            >
              TODAY
            </text>
          </g>
        </g>
      </svg>

      {/* Phase Details Panel */}
      {selectedPhase && (
        <div style={{ 
          marginTop: '16px',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '10px',
          border: `2px solid ${data.phases.find(p => p.id === selectedPhase)?.color}`,
        }}>
          {(() => {
            const phase = data.phases.find(p => p.id === selectedPhase);
            if (!phase) return null;
            return (
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '3px',
                      backgroundColor: phase.color 
                    }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: chartColors.charcoal }}>
                      {phase.name}: {phase.subtitle}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      backgroundColor: statusColors[phase.status],
                      color: 'white',
                      fontWeight: 500
                    }}>
                      {phase.status.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: chartColors.charcoalLight }}>
                    {phase.patients && <span>👥 {phase.patients}</span>}
                    {phase.sites && <span>🏥 {phase.sites}</span>}
                    <span>📅 {phase.duration} months</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {phase.details.map((detail, i) => (
                    <span key={i} style={{
                      fontSize: '10px',
                      padding: '4px 10px',
                      backgroundColor: `${phase.color}15`,
                      color: phase.color,
                      borderRadius: '12px',
                      fontWeight: 500
                    }}>
                      {detail}
                    </span>
                  ))}
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
        gap: '24px',
        fontSize: '10px'
      }}>
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} />
            <span style={{ color: chartColors.charcoalLight, textTransform: 'capitalize' }}>{status}</span>
          </div>
        ))}
        <div style={{ marginLeft: 'auto', color: chartColors.gray }}>
          Click phase for details
        </div>
      </div>
    </div>
  );
};

export default DrugLaunchRoadmap;
