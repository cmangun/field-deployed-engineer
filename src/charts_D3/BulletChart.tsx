"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample bullet chart data
const defaultData = [
  { 
    label: 'Revenue', 
    value: 275, 
    target: 250, 
    ranges: [150, 225, 300],
    format: (v: number) => `$${v}K`
  },
  { 
    label: 'Profit', 
    value: 42, 
    target: 50, 
    ranges: [20, 40, 60],
    format: (v: number) => `${v}%`
  },
  { 
    label: 'Orders', 
    value: 1850, 
    target: 2000, 
    ranges: [1000, 1500, 2500],
    format: (v: number) => v >= 1000 ? `${(v/1000).toFixed(1)}K` : `${v}`
  },
  { 
    label: 'Satisfaction', 
    value: 4.2, 
    target: 4.5, 
    ranges: [3.0, 4.0, 5.0],
    format: (v: number) => v.toFixed(1)
  },
];

interface BulletChartProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const BulletChart: React.FC<BulletChartProps> = ({
  data = defaultData,
  width = 700,
  height = 250,
  title = "Bullet Chart"
}) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const margin = { top: 20, right: 40, bottom: 20, left: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const barHeight = (innerHeight / data.length) * 0.6;
  const barGap = (innerHeight / data.length) * 0.4;

  const rangeColors = [chartColors.light, chartColors.secondary, chartColors.secondary];

  return (
    <div style={{ width: '100%' }}>
      {/* SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: 'white', borderRadius: '8px' }}
        onMouseLeave={() => setHoveredBar(null)}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {data.map((item, i) => {
            const isHovered = hoveredBar === i;
            const y = i * (barHeight + barGap);
            const maxRange = item.ranges[item.ranges.length - 1];
            const scale = (v: number) => (v / maxRange) * innerWidth;
            
            const isAboveTarget = item.value >= item.target;
            const barColor = isAboveTarget ? chartColors.teal : chartColors.orange;

            return (
              <g key={i} onMouseEnter={() => setHoveredBar(i)}>
                {/* Label */}
                <text
                  x={-10}
                  y={y + barHeight / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={12}
                  fontWeight={isHovered ? 600 : 400}
                  fill={isHovered ? chartColors.charcoal : chartColors.charcoalLight}
                >
                  {item.label}
                </text>

                {/* Range bars (background) */}
                {item.ranges.map((range, j) => (
                  <rect
                    key={j}
                    x={0}
                    y={y + (barHeight - barHeight * (1 - j * 0.15)) / 2}
                    width={scale(range)}
                    height={barHeight * (1 - j * 0.15)}
                    fill={rangeColors[j]}
                    rx={2}
                  />
                ))}

                {/* Value bar */}
                <rect
                  x={0}
                  y={y + barHeight * 0.25}
                  width={scale(item.value)}
                  height={barHeight * 0.5}
                  fill={barColor}
                  rx={2}
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <title>{`${item.label}: ${item.format(item.value)} (Target: ${item.format(item.target)})`}</title>
                </rect>

                {/* Target marker */}
                <line
                  x1={scale(item.target)}
                  x2={scale(item.target)}
                  y1={y}
                  y2={y + barHeight}
                  stroke={chartColors.charcoal}
                  strokeWidth={3}
                />

                {/* Value label */}
                <text
                  x={scale(item.value) + 6}
                  y={y + barHeight / 2}
                  dominantBaseline="middle"
                  fontSize={11}
                  fontWeight={600}
                  fill={barColor}
                >
                  {item.format(item.value)}
                </text>

                {/* Target label (on hover) */}
                {isHovered && (
                  <text
                    x={scale(item.target)}
                    y={y - 6}
                    textAnchor="middle"
                    fontSize={9}
                    fill={chartColors.gray}
                  >
                    Target: {item.format(item.target)}
                  </text>
                )}

                {/* Status indicator */}
                <text
                  x={innerWidth + 10}
                  y={y + barHeight / 2}
                  dominantBaseline="middle"
                  fontSize={12}
                  fill={isAboveTarget ? chartColors.teal : chartColors.orange}
                >
                  {isAboveTarget ? '✓' : '○'}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Legend */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        gap: '20px',
        fontSize: '11px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '14px', height: '8px', backgroundColor: chartColors.teal, borderRadius: '2px' }} />
          <span style={{ color: chartColors.charcoalLight }}>Above Target</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '14px', height: '8px', backgroundColor: chartColors.orange, borderRadius: '2px' }} />
          <span style={{ color: chartColors.charcoalLight }}>Below Target</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '3px', height: '14px', backgroundColor: chartColors.charcoal }} />
          <span style={{ color: chartColors.charcoalLight }}>Target</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            {rangeColors.map((c, i) => (
              <div key={i} style={{ width: '8px', height: '8px', backgroundColor: c, borderRadius: '1px' }} />
            ))}
          </div>
          <span style={{ color: chartColors.charcoalLight }}>Poor → Good → Excellent</span>
        </div>
      </div>
    </div>
  );
};

export default BulletChart;
