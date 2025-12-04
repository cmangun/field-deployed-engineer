"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample Gantt data
const defaultData = [
  { id: 1, task: 'Discovery & Research', start: 0, duration: 3, category: 'Planning', progress: 100 },
  { id: 2, task: 'Requirements Gathering', start: 2, duration: 2, category: 'Planning', progress: 100 },
  { id: 3, task: 'System Design', start: 4, duration: 3, category: 'Design', progress: 100 },
  { id: 4, task: 'UI/UX Prototyping', start: 5, duration: 4, category: 'Design', progress: 80 },
  { id: 5, task: 'Backend Development', start: 7, duration: 6, category: 'Development', progress: 60 },
  { id: 6, task: 'Frontend Development', start: 8, duration: 5, category: 'Development', progress: 45 },
  { id: 7, task: 'API Integration', start: 10, duration: 3, category: 'Development', progress: 30 },
  { id: 8, task: 'Testing & QA', start: 12, duration: 4, category: 'Testing', progress: 10 },
  { id: 9, task: 'User Acceptance', start: 15, duration: 2, category: 'Testing', progress: 0 },
  { id: 10, task: 'Deployment', start: 17, duration: 1, category: 'Launch', progress: 0 },
];

const categoryColors: Record<string, string> = {
  Planning: chartColors.teal,
  Design: chartColors.orange,
  Development: chartColors.indigo,
  Testing: chartColors.purple,
  Launch: chartColors.green,
  // Pfizer case study categories
  Discovery: chartColors.teal,
  Architecture: chartColors.orange,
  Engineering: chartColors.indigo,
  Enablement: chartColors.purple,
};

interface GanttChartProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
  weeksToShow?: number;
  showTodayMarker?: boolean;
}

const GanttChart: React.FC<GanttChartProps> = ({
  data = defaultData,
  width = 700,
  height = 400,
  title = "Gantt Chart",
  weeksToShow,
  showTodayMarker = false
}) => {
  const [hoveredTask, setHoveredTask] = useState<number | null>(null);

  // Auto-calculate weeks from data if not provided
  const maxWeek = Math.max(...data.map(d => d.start + d.duration));
  const effectiveWeeksToShow = weeksToShow ?? Math.max(maxWeek + 1, 12); // +1 buffer, min 12 weeks

  const margin = { top: 120, right: 20, bottom: 30, left: 220 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const rowHeight = innerHeight / data.length;
  const weekWidth = innerWidth / effectiveWeeksToShow;

  // Current week marker (week 11)
  const currentWeek = 11;

  // Phase definitions for header - stacked like mini Gantt bars (week ranges are 0-indexed)
  const phases = [
    { name: 'Discovery', startWeek: 0, endWeek: 3, color: chartColors.teal, row: 0 },
    { name: 'Architecture', startWeek: 2, endWeek: 5, color: chartColors.orange, row: 1 },
    { name: 'Engineering', startWeek: 4, endWeek: 11, color: chartColors.indigo, row: 2 },
    { name: 'Enablement', startWeek: 8, endWeek: 14, color: chartColors.purple, row: 3 },
  ];
  
  const phaseRowHeight = 16;
  const phaseGap = 2;

  return (
    <div style={{ width: '100%' }}>
      {/* SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: 'white', borderRadius: '8px' }}
        onMouseLeave={() => setHoveredTask(null)}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Week labels at the top */}
          {Array.from({ length: effectiveWeeksToShow + 1 }).map((_, i) => (
            <g key={`week-${i}`}>
              <text
                x={i * weekWidth}
                y={-95}
                textAnchor="middle"
                fontSize={9}
                fill={chartColors.gray}
                fontWeight={400}
              >
                W{i + 1}
              </text>
            </g>
          ))}

          {/* Phase headers below weeks - stacked like mini Gantt */}
          {phases.map((phase) => {
            const startX = phase.startWeek * weekWidth;
            const endX = phase.endWeek * weekWidth;
            const phaseWidth = endX - startX;
            const barY = -80 + (phase.row * (phaseRowHeight + phaseGap));
            
            return (
              <g key={phase.name}>
                {/* Phase bar */}
                <rect
                  x={startX}
                  y={barY}
                  width={phaseWidth}
                  height={phaseRowHeight}
                  fill={phase.color}
                  fillOpacity={0.85}
                  rx={3}
                />
                {/* Phase label inside bar */}
                <text
                  x={startX + 8}
                  y={barY + phaseRowHeight / 2 + 1}
                  dominantBaseline="middle"
                  fontSize={10}
                  fontWeight={600}
                  fill="white"
                >
                  {phase.name}
                </text>
              </g>
            );
          })}

          {/* Week column grid lines */}
          {Array.from({ length: effectiveWeeksToShow + 1 }).map((_, i) => (
            <g key={`grid-${i}`}>
              <line
                x1={i * weekWidth}
                x2={i * weekWidth}
                y1={0}
                y2={innerHeight}
                stroke={chartColors.light}
                strokeWidth={1}
                strokeDasharray={'2,2'}
              />
            </g>
          ))}

          {/* Today marker - optional */}
          {showTodayMarker && (
            <>
              <line
                x1={currentWeek * weekWidth}
                x2={currentWeek * weekWidth}
                y1={-20}
                y2={innerHeight}
                stroke={chartColors.orange}
                strokeWidth={2}
              />
              <text
                x={currentWeek * weekWidth}
                y={-25}
                textAnchor="middle"
                fontSize={9}
                fill={chartColors.orange}
                fontWeight={600}
              >
                TODAY
              </text>
            </>
          )}

          {/* Row backgrounds */}
          {data.map((_, i) => (
            <rect
              key={i}
              x={0}
              y={i * rowHeight}
              width={innerWidth}
              height={rowHeight}
              fill={i % 2 === 0 ? chartColors.background : 'white'}
            />
          ))}

          {/* Task bars */}
          {data.map((task, i) => {
            const isHovered = hoveredTask === task.id;
            const x = task.start * weekWidth;
            const barWidth = task.duration * weekWidth - 4;
            const y = i * rowHeight + rowHeight * 0.2;
            const barHeight = rowHeight * 0.6;
            const color = categoryColors[task.category] || chartColors.gray;
            const progressWidth = (task.progress / 100) * barWidth;

            return (
              <g key={task.id} onMouseEnter={() => setHoveredTask(task.id)}>
                {/* Task label */}
                <text
                  x={-8}
                  y={i * rowHeight + rowHeight / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={11}
                  fill={isHovered ? chartColors.charcoal : chartColors.charcoalLight}
                  fontWeight={isHovered ? 600 : 400}
                >
                  {task.task}
                </text>

                {/* Background bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={color}
                  fillOpacity={0.2}
                  rx={4}
                  stroke={isHovered ? color : 'transparent'}
                  strokeWidth={2}
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <title>{`${task.task}\nWeek ${task.start + 1} - ${task.start + task.duration}\nProgress: ${task.progress}%`}</title>
                </rect>

                {/* Progress bar */}
                <rect
                  x={x}
                  y={y}
                  width={progressWidth}
                  height={barHeight}
                  fill={color}
                  rx={4}
                  style={{ pointerEvents: 'none' }}
                />

                {/* Progress text */}
                {barWidth > 40 && (
                  <text
                    x={x + barWidth / 2}
                    y={y + barHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight={600}
                    fill={task.progress > 50 ? 'white' : chartColors.charcoal}
                    style={{ pointerEvents: 'none' }}
                  >
                    {task.progress}%
                  </text>
                )}

                {/* Duration label (on hover) */}
                {isHovered && (
                  <text
                    x={x + barWidth + 6}
                    y={y + barHeight / 2}
                    dominantBaseline="middle"
                    fontSize={9}
                    fill={chartColors.gray}
                  >
                    {task.duration}w
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Legend - only show categories with data */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        gap: '16px',
        flexWrap: 'wrap',
        fontSize: '11px'
      }}>
        {Object.entries(categoryColors)
          .filter(([category]) => data.some(d => d.category === category))
          .map(([category, color]) => (
          <div key={category} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '14px', height: '14px', backgroundColor: color, borderRadius: '3px' }} />
            <span style={{ color: chartColors.charcoalLight }}>{category}</span>
            <span style={{ color: chartColors.gray }}>
              ({data.filter(d => d.category === category).length})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
