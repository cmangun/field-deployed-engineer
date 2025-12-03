"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample heatmap data (rows x columns matrix)
const defaultData = {
  rows: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  columns: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
  values: [
    [2, 1, 0, 5, 35, 48, 52, 38],
    [1, 0, 2, 12, 42, 55, 48, 35],
    [0, 1, 3, 18, 45, 58, 52, 40],
    [1, 0, 2, 15, 48, 62, 55, 42],
    [2, 1, 5, 22, 52, 68, 58, 48],
    [8, 5, 12, 35, 28, 32, 45, 55],
    [12, 8, 15, 25, 22, 28, 38, 48],
  ]
};

interface HeatmapProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
  colorScheme?: 'teal' | 'orange' | 'purple' | 'blue';
}

const Heatmap: React.FC<HeatmapProps> = ({
  data = defaultData,
  width = 700,
  height = 300,
  title = "Heatmap",
  colorScheme = 'teal'
}) => {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const margin = { top: 30, right: 30, bottom: 20, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const cellWidth = innerWidth / data.columns.length;
  const cellHeight = innerHeight / data.rows.length;

  // Color scales
  const colorScales = {
    teal: [chartColors.light, chartColors.light, chartColors.light, chartColors.cyan, chartColors.primary, chartColors.dark, chartColors.dark],
    orange: [chartColors.light, chartColors.light, chartColors.cyan, chartColors.secondary, chartColors.secondary, chartColors.secondary, chartColors.navy],
    purple: [chartColors.light, chartColors.light, chartColors.teal, chartColors.teal, chartColors.muted, chartColors.navy, chartColors.primary],
    blue: [chartColors.light, chartColors.light, chartColors.cyan, chartColors.cyan, chartColors.primary, chartColors.primary, chartColors.primary],
  };

  const colors = colorScales[colorScheme];

  // Find min/max
  const allValues = data.values.flat();
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);

  const getColor = (value: number): string => {
    if (maxValue === minValue) return colors[3];
    const ratio = (value - minValue) / (maxValue - minValue);
    const index = Math.min(colors.length - 1, Math.floor(ratio * colors.length));
    return colors[index];
  };

  const getTextColor = (value: number): string => {
    const ratio = (value - minValue) / (maxValue - minValue);
    return ratio > 0.5 ? 'white' : chartColors.charcoal;
  };

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
          {data.columns.map((col, i) => (
            <text
              key={i}
              x={i * cellWidth + cellWidth / 2}
              y={-10}
              textAnchor="middle"
              fontSize={10}
              fill={hoveredCell?.col === i ? chartColors.charcoal : chartColors.gray}
              fontWeight={hoveredCell?.col === i ? 600 : 400}
            >
              {col}
            </text>
          ))}

          {/* Row headers */}
          {data.rows.map((row, i) => (
            <text
              key={i}
              x={-10}
              y={i * cellHeight + cellHeight / 2}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={11}
              fill={hoveredCell?.row === i ? chartColors.charcoal : chartColors.gray}
              fontWeight={hoveredCell?.row === i ? 600 : 400}
            >
              {row}
            </text>
          ))}

          {/* Cells */}
          {data.values.map((row, rowIndex) => (
            row.map((value, colIndex) => {
              const isHovered = hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex;
              
              return (
                <g key={`${rowIndex}-${colIndex}`}>
                  <rect
                    x={colIndex * cellWidth + 1}
                    y={rowIndex * cellHeight + 1}
                    width={cellWidth - 2}
                    height={cellHeight - 2}
                    fill={getColor(value)}
                    rx={4}
                    stroke={isHovered ? chartColors.charcoal : 'transparent'}
                    strokeWidth={isHovered ? 2 : 0}
                    onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex })}
                    style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                  >
                    <title>{`${data.rows[rowIndex]} ${data.columns[colIndex]}: ${value}`}</title>
                  </rect>
                  
                  {/* Value text on hover or if cell is large enough */}
                  {(isHovered || cellWidth > 50) && (
                    <text
                      x={colIndex * cellWidth + cellWidth / 2}
                      y={rowIndex * cellHeight + cellHeight / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={isHovered ? 12 : 10}
                      fontWeight={isHovered ? 700 : 500}
                      fill={getTextColor(value)}
                      style={{ pointerEvents: 'none' }}
                    >
                      {value}
                    </text>
                  )}
                </g>
              );
            })
          ))}
        </g>
      </svg>

      {/* Legend */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        fontSize: '11px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: chartColors.gray }}>{minValue}</span>
          {colors.map((color, i) => (
            <div
              key={i}
              style={{
                width: 24,
                height: 12,
                backgroundColor: color,
                borderRadius: '2px'
              }}
            />
          ))}
          <span style={{ color: chartColors.gray }}>{maxValue}</span>
        </div>
        
        {hoveredCell && (
          <div style={{ 
            padding: '4px 8px', 
            backgroundColor: chartColors.background, 
            borderRadius: '4px' 
          }}>
            <span style={{ fontWeight: 500 }}>
              {data.rows[hoveredCell.row]} {data.columns[hoveredCell.col]}:
            </span>
            <span style={{ marginLeft: '8px', fontWeight: 600, color: chartColors.teal }}>
              {data.values[hoveredCell.row][hoveredCell.col]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Heatmap;
