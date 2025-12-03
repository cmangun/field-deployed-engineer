"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample data
const defaultData = [
  { category: 'Q1', product: 85, services: 65, licensing: 40 },
  { category: 'Q2', product: 95, services: 70, licensing: 45 },
  { category: 'Q3', product: 110, services: 80, licensing: 52 },
  { category: 'Q4', product: 125, services: 90, licensing: 58 },
];

const barColors = [
  chartColors.teal,
  chartColors.tealLight,
  chartColors.charcoalLight,
];

interface StackedBarChartProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
  keys?: string[];
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data = defaultData,
  width = 700,
  height = 350,
  title = "Stacked Bar Chart",
  keys = ['product', 'services', 'licensing']
}) => {
  const [hoveredBar, setHoveredBar] = useState<{ category: string; key: string } | null>(null);

  const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Calculate stacked data
  const stackedData = data.map(d => {
    let y0 = 0;
    const stacks = keys.map(key => {
      const value = (d as any)[key] || 0;
      const stack = { key, y0, y1: y0 + value, value };
      y0 += value;
      return stack;
    });
    return { category: d.category, stacks, total: y0 };
  });

  // Scales
  const maxValue = Math.max(...stackedData.map(d => d.total));
  const barWidth = innerWidth / data.length * 0.7;
  const barGap = innerWidth / data.length * 0.3;
  const xScale = (i: number) => i * (barWidth + barGap) + barGap / 2;
  const yScale = (v: number) => innerHeight - (v / maxValue) * innerHeight;

  // Format number
  const formatNumber = (n: number) => `$${n}M`;

  // Y-axis ticks
  const yTicks = [0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue];

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
          {/* Grid lines */}
          {yTicks.map((tick, i) => (
            <g key={i}>
              <line
                x1={0}
                x2={innerWidth}
                y1={yScale(tick)}
                y2={yScale(tick)}
                stroke={chartColors.light}
                strokeDasharray={i === 0 ? 'none' : '4,4'}
              />
              <text
                x={-8}
                y={yScale(tick)}
                dy="0.35em"
                textAnchor="end"
                fontSize={10}
                fill={chartColors.gray}
              >
                {formatNumber(Math.round(tick))}
              </text>
            </g>
          ))}

          {/* Stacked bars */}
          {stackedData.map((d, i) => (
            <g key={i} transform={`translate(${xScale(i)}, 0)`}>
              {d.stacks.map((stack, j) => {
                const isHovered = hoveredBar?.category === d.category && hoveredBar?.key === stack.key;
                const barHeight = yScale(stack.y0) - yScale(stack.y1);
                
                return (
                  <rect
                    key={j}
                    x={0}
                    y={yScale(stack.y1)}
                    width={barWidth}
                    height={barHeight}
                    fill={barColors[j % barColors.length]}
                    fillOpacity={isHovered ? 1 : 0.85}
                    stroke={isHovered ? chartColors.charcoal : 'none'}
                    strokeWidth={2}
                    rx={j === keys.length - 1 ? 4 : 0}
                    onMouseEnter={() => setHoveredBar({ category: d.category, key: stack.key })}
                    style={{ cursor: 'pointer', transition: 'fill-opacity 0.2s' }}
                  >
                    <title>{`${d.category} - ${stack.key}: ${formatNumber(stack.value)}`}</title>
                  </rect>
                );
              })}
              
              {/* Category label */}
              <text
                x={barWidth / 2}
                y={innerHeight + 20}
                textAnchor="middle"
                fontSize={12}
                fontWeight={500}
                fill={chartColors.charcoal}
              >
                {d.category}
              </text>

              {/* Total label on top */}
              <text
                x={barWidth / 2}
                y={yScale(d.total) - 8}
                textAnchor="middle"
                fontSize={10}
                fontWeight={600}
                fill={chartColors.charcoal}
              >
                {formatNumber(d.total)}
              </text>
            </g>
          ))}
        </g>
      </svg>

      {/* Legend */}
      <div style={{ marginTop: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '11px' }}>
        {keys.map((key, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: barColors[i % barColors.length], 
              borderRadius: '2px' 
            }} />
            <span style={{ color: chartColors.charcoalLight, textTransform: 'capitalize' }}>{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackedBarChart;
