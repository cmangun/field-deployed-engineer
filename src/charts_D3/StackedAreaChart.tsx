"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample time series data
const defaultData = [
  { date: '2024-01', product: 120, services: 80, licensing: 45 },
  { date: '2024-02', product: 135, services: 85, licensing: 50 },
  { date: '2024-03', product: 150, services: 90, licensing: 55 },
  { date: '2024-04', product: 145, services: 95, licensing: 60 },
  { date: '2024-05', product: 160, services: 100, licensing: 62 },
  { date: '2024-06', product: 175, services: 110, licensing: 68 },
  { date: '2024-07', product: 190, services: 115, licensing: 72 },
  { date: '2024-08', product: 185, services: 120, licensing: 75 },
  { date: '2024-09', product: 200, services: 125, licensing: 80 },
  { date: '2024-10', product: 215, services: 130, licensing: 85 },
  { date: '2024-11', product: 225, services: 140, licensing: 88 },
  { date: '2024-12', product: 240, services: 150, licensing: 95 },
];

const stackColors = [
  chartColors.teal,
  chartColors.tealLight,
  chartColors.charcoalLight,
];

interface StackedAreaChartProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
  keys?: string[];
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({
  data = defaultData,
  width = 700,
  height = 350,
  title = "Stacked Area Chart",
  keys = ['product', 'services', 'licensing']
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Calculate stacked data
  const stackedData = data.map((d, i) => {
    let y0 = 0;
    const stacks = keys.map(key => {
      const value = (d as any)[key] || 0;
      const stack = { key, y0, y1: y0 + value, value };
      y0 += value;
      return stack;
    });
    return { date: d.date, index: i, stacks, total: y0 };
  });

  // Scales
  const maxValue = Math.max(...stackedData.map(d => d.total));
  const xScale = (i: number) => (i / (data.length - 1)) * innerWidth;
  const yScale = (v: number) => innerHeight - (v / maxValue) * innerHeight;

  // Generate area paths
  const generateAreaPath = (keyIndex: number): string => {
    let path = '';
    
    // Top line (forward)
    stackedData.forEach((d, i) => {
      const x = xScale(i);
      const y = yScale(d.stacks[keyIndex].y1);
      path += i === 0 ? `M${x},${y}` : `L${x},${y}`;
    });
    
    // Bottom line (backward)
    for (let i = stackedData.length - 1; i >= 0; i--) {
      const x = xScale(i);
      const y = yScale(stackedData[i].stacks[keyIndex].y0);
      path += `L${x},${y}`;
    }
    
    path += 'Z';
    return path;
  };

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
        onMouseLeave={() => { setHoveredIndex(null); setHoveredKey(null); }}
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

          {/* Stacked areas */}
          {keys.map((key, keyIndex) => (
            <path
              key={key}
              d={generateAreaPath(keyIndex)}
              fill={stackColors[keyIndex % stackColors.length]}
              fillOpacity={hoveredKey === null || hoveredKey === key ? 0.7 : 0.2}
              stroke={stackColors[keyIndex % stackColors.length]}
              strokeWidth={1}
              onMouseEnter={() => setHoveredKey(key)}
              style={{ cursor: 'pointer', transition: 'fill-opacity 0.2s' }}
            />
          ))}

          {/* Hover line and tooltip */}
          {hoveredIndex !== null && (
            <g>
              <line
                x1={xScale(hoveredIndex)}
                x2={xScale(hoveredIndex)}
                y1={0}
                y2={innerHeight}
                stroke={chartColors.charcoal}
                strokeWidth={1}
                strokeDasharray="4,4"
              />
              {stackedData[hoveredIndex].stacks.map((stack, i) => (
                <circle
                  key={i}
                  cx={xScale(hoveredIndex)}
                  cy={yScale(stack.y1)}
                  r={4}
                  fill={stackColors[i % stackColors.length]}
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
            </g>
          )}

          {/* Invisible hover areas */}
          {stackedData.map((d, i) => (
            <rect
              key={i}
              x={xScale(i) - innerWidth / data.length / 2}
              y={0}
              width={innerWidth / data.length}
              height={innerHeight}
              fill="transparent"
              onMouseEnter={() => setHoveredIndex(i)}
            />
          ))}

          {/* X-axis */}
          {data.map((d, i) => (
            i % 2 === 0 && (
              <text
                key={i}
                x={xScale(i)}
                y={innerHeight + 20}
                textAnchor="middle"
                fontSize={10}
                fill={chartColors.gray}
              >
                {d.date}
              </text>
            )
          ))}
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredIndex !== null && (
        <div style={{
          marginTop: '8px',
          padding: '12px',
          backgroundColor: chartColors.background,
          borderRadius: '8px',
          fontSize: '12px',
        }}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            {stackedData[hoveredIndex].date}
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {stackedData[hoveredIndex].stacks.map((stack, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ 
                  width: '10px', 
                  height: '10px', 
                  backgroundColor: stackColors[i % stackColors.length],
                  borderRadius: '2px'
                }} />
                <span style={{ textTransform: 'capitalize' }}>{stack.key}:</span>
                <span style={{ fontWeight: 600 }}>{formatNumber(stack.value)}</span>
              </div>
            ))}
            <div style={{ fontWeight: 600, color: chartColors.charcoal }}>
              Total: {formatNumber(stackedData[hoveredIndex].total)}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div style={{ marginTop: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '11px' }}>
        {keys.map((key, i) => (
          <div 
            key={i} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              cursor: 'pointer',
              opacity: hoveredKey === null || hoveredKey === key ? 1 : 0.5,
            }}
            onMouseEnter={() => setHoveredKey(key)}
            onMouseLeave={() => setHoveredKey(null)}
          >
            <div style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: stackColors[i % stackColors.length], 
              borderRadius: '2px' 
            }} />
            <span style={{ color: chartColors.charcoalLight, textTransform: 'capitalize' }}>{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackedAreaChart;
