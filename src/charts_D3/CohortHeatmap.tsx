"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample cohort retention data
const defaultData = {
  cohorts: [
    { name: 'Jan 2024', users: 1200 },
    { name: 'Feb 2024', users: 1450 },
    { name: 'Mar 2024', users: 1680 },
    { name: 'Apr 2024', users: 1520 },
    { name: 'May 2024', users: 1890 },
    { name: 'Jun 2024', users: 2100 },
  ],
  // Retention percentages for each cohort over months
  retention: [
    [100, 68, 52, 45, 40, 38],  // Jan cohort
    [100, 72, 58, 48, 42, null], // Feb cohort
    [100, 75, 62, 52, null, null], // Mar cohort
    [100, 70, 55, null, null, null], // Apr cohort
    [100, 78, null, null, null, null], // May cohort
    [100, null, null, null, null, null], // Jun cohort
  ]
};

interface CohortHeatmapProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const CohortHeatmap: React.FC<CohortHeatmapProps> = ({
  data = defaultData,
  width = 700,
  height = 350,
  title = "Cohort Retention Heatmap"
}) => {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const margin = { top: 40, right: 30, bottom: 30, left: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const numCohorts = data.cohorts.length;
  const numMonths = data.retention[0].length;

  const cellWidth = innerWidth / numMonths;
  const cellHeight = innerHeight / numCohorts;

  // Color scale for retention (green gradient)
  const getRetentionColor = (value: number | null): string => {
    if (value === null) return chartColors.light;
    if (value >= 80) return chartColors.primary;  // Dark green
    if (value >= 60) return chartColors.primary;  // Green
    if (value >= 50) return chartColors.teal;  // Light green
    if (value >= 40) return chartColors.light;  // Lighter green
    if (value >= 30) return chartColors.light;  // Very light green
    return chartColors.light;  // Palest green
  };

  const getTextColor = (value: number | null): string => {
    if (value === null) return chartColors.gray;
    return value >= 50 ? 'white' : chartColors.charcoal;
  };

  // Calculate averages
  const monthAverages = Array.from({ length: numMonths }, (_, monthIdx) => {
    const values = data.retention
      .map(row => row[monthIdx])
      .filter((v): v is number => v !== null);
    return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : null;
  });

  return (
    <div style={{ width: '100%' }}>
      {/* SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: 'white', borderRadius: '8px' }}
        onMouseLeave={() => setHoveredCell(null)}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Column headers */}
          {Array.from({ length: numMonths }, (_, i) => (
            <g key={i}>
              <text
                x={i * cellWidth + cellWidth / 2}
                y={-20}
                textAnchor="middle"
                fontSize={10}
                fontWeight={600}
                fill={hoveredCell?.col === i ? chartColors.charcoal : chartColors.charcoalLight}
              >
                {i === 0 ? 'Month 0' : `Month ${i}`}
              </text>
              <text
                x={i * cellWidth + cellWidth / 2}
                y={-8}
                textAnchor="middle"
                fontSize={9}
                fill={chartColors.gray}
              >
                {i === 0 ? '(Start)' : ''}
              </text>
            </g>
          ))}

          {/* Row headers */}
          {data.cohorts.map((cohort, i) => (
            <g key={i}>
              <text
                x={-10}
                y={i * cellHeight + cellHeight / 2 - 6}
                textAnchor="end"
                fontSize={10}
                fontWeight={hoveredCell?.row === i ? 600 : 400}
                fill={hoveredCell?.row === i ? chartColors.charcoal : chartColors.charcoalLight}
              >
                {cohort.name}
              </text>
              <text
                x={-10}
                y={i * cellHeight + cellHeight / 2 + 6}
                textAnchor="end"
                fontSize={9}
                fill={chartColors.gray}
              >
                n={cohort.users.toLocaleString()}
              </text>
            </g>
          ))}

          {/* Cells */}
          {data.retention.map((row, rowIdx) => (
            row.map((value, colIdx) => {
              const isHovered = hoveredCell?.row === rowIdx && hoveredCell?.col === colIdx;
              const isRowHovered = hoveredCell?.row === rowIdx;
              const isColHovered = hoveredCell?.col === colIdx;
              
              return (
                <g key={`${rowIdx}-${colIdx}`}>
                  <rect
                    x={colIdx * cellWidth + 1}
                    y={rowIdx * cellHeight + 1}
                    width={cellWidth - 2}
                    height={cellHeight - 2}
                    fill={getRetentionColor(value)}
                    rx={4}
                    stroke={isHovered ? chartColors.charcoal : (isRowHovered || isColHovered ? chartColors.secondary : 'transparent')}
                    strokeWidth={isHovered ? 2 : 1}
                    onMouseEnter={() => setHoveredCell({ row: rowIdx, col: colIdx })}
                    style={{ cursor: value !== null ? 'pointer' : 'default', transition: 'all 0.15s' }}
                  />
                  
                  {value !== null && (
                    <text
                      x={colIdx * cellWidth + cellWidth / 2}
                      y={rowIdx * cellHeight + cellHeight / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={11}
                      fontWeight={isHovered ? 700 : 500}
                      fill={getTextColor(value)}
                      style={{ pointerEvents: 'none' }}
                    >
                      {value}%
                    </text>
                  )}
                </g>
              );
            })
          ))}

          {/* Average row */}
          <g transform={`translate(0, ${innerHeight + 8})`}>
            <text
              x={-10}
              y={12}
              textAnchor="end"
              fontSize={10}
              fontWeight={600}
              fill={chartColors.charcoalLight}
            >
              Average
            </text>
            {monthAverages.map((avg, i) => (
              avg !== null && (
                <text
                  key={i}
                  x={i * cellWidth + cellWidth / 2}
                  y={12}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={600}
                  fill={chartColors.teal}
                >
                  {avg.toFixed(0)}%
                </text>
              )
            ))}
          </g>
        </g>
      </svg>

      {/* Legend & Info */}
      <div style={{ 
        marginTop: '16px', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px'
      }}>
        {/* Color legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: chartColors.gray }}>Low</span>
          {[chartColors.light, chartColors.light, chartColors.light, chartColors.teal, chartColors.primary, chartColors.primary].map((color, i) => (
            <div
              key={i}
              style={{
                width: 20,
                height: 12,
                backgroundColor: color,
                borderRadius: '2px'
              }}
            />
          ))}
          <span style={{ color: chartColors.gray }}>High</span>
        </div>
        
        {/* Hovered cell info */}
        {hoveredCell && data.retention[hoveredCell.row][hoveredCell.col] !== null && (
          <div style={{ 
            padding: '6px 12px', 
            backgroundColor: chartColors.background, 
            borderRadius: '6px',
            display: 'flex',
            gap: '16px'
          }}>
            <span><strong>{data.cohorts[hoveredCell.row].name}</strong></span>
            <span>Month {hoveredCell.col}</span>
            <span style={{ color: chartColors.teal, fontWeight: 600 }}>
              {data.retention[hoveredCell.row][hoveredCell.col]}% retained
            </span>
            <span style={{ color: chartColors.gray }}>
              ({Math.round((data.retention[hoveredCell.row][hoveredCell.col]! / 100) * data.cohorts[hoveredCell.row].users).toLocaleString()} users)
            </span>
          </div>
        )}
      </div>

      {/* Insights */}
      <div style={{ 
        marginTop: '12px',
        padding: '12px',
        backgroundColor: chartColors.light,
        borderRadius: '8px',
        fontSize: '11px',
        color: chartColors.charcoalLight
      }}>
        <strong style={{ color: chartColors.teal }}>Key Insights:</strong>
        <span style={{ marginLeft: '8px' }}>
          Month 1 retention averaging {monthAverages[1]?.toFixed(0)}% • 
          Best performing cohort: {data.cohorts[data.retention.findIndex(r => r[1] === Math.max(...data.retention.map(row => row[1] || 0)))].name} ({Math.max(...data.retention.map(row => row[1] || 0))}% M1)
        </span>
      </div>
    </div>
  );
};

export default CohortHeatmap;
