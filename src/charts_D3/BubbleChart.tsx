"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample bubble data
const defaultData = [
  { id: 'Pfizer HCP', category: 'Healthcare', value: 8500, growth: 12 },
  { id: 'Abbott DX', category: 'Healthcare', value: 6200, growth: 8 },
  { id: 'Medtronic', category: 'Healthcare', value: 4800, growth: 15 },
  { id: 'Sanofi', category: 'Healthcare', value: 3900, growth: 5 },
  { id: 'Google AI', category: 'Technology', value: 7200, growth: 22 },
  { id: 'Microsoft', category: 'Technology', value: 5800, growth: 18 },
  { id: 'Apple ML', category: 'Technology', value: 4500, growth: 10 },
  { id: 'JPMorgan', category: 'Finance', value: 4200, growth: 6 },
  { id: 'Goldman', category: 'Finance', value: 3800, growth: 9 },
  { id: 'Visa', category: 'Finance', value: 3200, growth: 14 },
  { id: 'Amazon', category: 'Retail', value: 5500, growth: 20 },
  { id: 'Walmart', category: 'Retail', value: 3200, growth: 4 },
];

const categoryColors: Record<string, string> = {
  Healthcare: chartColors.teal,
  Technology: chartColors.orange,
  Finance: chartColors.navy,
  Retail: chartColors.navy,
};

interface BubbleChartProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const BubbleChart: React.FC<BubbleChartProps> = ({
  data = defaultData,
  width = 700,
  height = 400,
  title = "Bubble Chart"
}) => {
  const [hoveredBubble, setHoveredBubble] = useState<string | null>(null);

  const margin = { top: 20, right: 30, bottom: 50, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Scales
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const maxGrowth = Math.max(...data.map(d => d.growth));
  const minGrowth = Math.min(...data.map(d => d.growth));

  const xScale = (v: number) => 
    ((v - minValue) / (maxValue - minValue)) * innerWidth;
  
  const yScale = (g: number) => 
    innerHeight - ((g - minGrowth) / (maxGrowth - minGrowth)) * innerHeight;
  
  const radiusScale = (v: number) => 
    10 + ((v - minValue) / (maxValue - minValue)) * 30;

  // Format number
  const formatNumber = (n: number) => `$${(n / 1000).toFixed(1)}K`;

  // Axis ticks
  const xTicks = [minValue, (minValue + maxValue) / 2, maxValue];
  const yTicks = [minGrowth, (minGrowth + maxGrowth) / 2, maxGrowth];

  // Pack circles to avoid overlap (simple collision detection)
  const packedData = data.map((d, i) => ({
    ...d,
    x: xScale(d.value),
    y: yScale(d.growth),
    r: radiusScale(d.value)
  }));

  return (
    <div style={{ width: '100%' }}>
      {/* SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: 'white', borderRadius: '8px' }}
        onMouseLeave={() => setHoveredBubble(null)}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid */}
          {yTicks.map((tick, i) => (
            <g key={`y-${i}`}>
              <line
                x1={0}
                x2={innerWidth}
                y1={yScale(tick)}
                y2={yScale(tick)}
                stroke={chartColors.light}
                strokeDasharray="4,4"
              />
              <text
                x={-8}
                y={yScale(tick)}
                dy="0.35em"
                textAnchor="end"
                fontSize={10}
                fill={chartColors.gray}
              >
                {tick}%
              </text>
            </g>
          ))}

          {xTicks.map((tick, i) => (
            <g key={`x-${i}`}>
              <line
                x1={xScale(tick)}
                x2={xScale(tick)}
                y1={0}
                y2={innerHeight}
                stroke={chartColors.light}
                strokeDasharray="4,4"
              />
              <text
                x={xScale(tick)}
                y={innerHeight + 20}
                textAnchor="middle"
                fontSize={10}
                fill={chartColors.gray}
              >
                {formatNumber(tick)}
              </text>
            </g>
          ))}

          {/* Axis labels */}
          <text
            x={innerWidth / 2}
            y={innerHeight + 40}
            textAnchor="middle"
            fontSize={11}
            fill={chartColors.charcoalLight}
          >
            Revenue
          </text>
          <text
            x={-innerHeight / 2}
            y={-45}
            textAnchor="middle"
            transform="rotate(-90)"
            fontSize={11}
            fill={chartColors.charcoalLight}
          >
            Growth Rate (%)
          </text>

          {/* Bubbles */}
          {packedData.map((d, i) => {
            const isHovered = hoveredBubble === d.id;
            const color = categoryColors[d.category] || chartColors.gray;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredBubble(d.id)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={d.x}
                  cy={d.y}
                  r={d.r + (isHovered ? 3 : 0)}
                  fill={color}
                  fillOpacity={isHovered ? 0.9 : 0.7}
                  stroke={isHovered ? chartColors.charcoal : 'white'}
                  strokeWidth={isHovered ? 2 : 1}
                  style={{ transition: 'all 0.2s' }}
                >
                  <title>{`${d.id}\nRevenue: ${formatNumber(d.value)}\nGrowth: ${d.growth}%`}</title>
                </circle>
                
                {/* Label */}
                {(isHovered || d.r > 20) && (
                  <text
                    x={d.x}
                    y={d.y}
                    textAnchor="middle"
                    dy="0.35em"
                    fontSize={isHovered ? 11 : 9}
                    fontWeight={isHovered ? 600 : 400}
                    fill={isHovered ? chartColors.charcoal : 'white'}
                    style={{ pointerEvents: 'none' }}
                  >
                    {d.id.split(' ')[0]}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredBubble && (
        <div style={{
          marginTop: '8px',
          padding: '12px',
          backgroundColor: chartColors.background,
          borderRadius: '8px',
          fontSize: '12px',
          display: 'flex',
          gap: '24px'
        }}>
          {(() => {
            const d = data.find(item => item.id === hoveredBubble)!;
            return (
              <>
                <div style={{ fontWeight: 600 }}>{d.id}</div>
                <div>Category: <span style={{ fontWeight: 500 }}>{d.category}</span></div>
                <div>Revenue: <span style={{ fontWeight: 500 }}>{formatNumber(d.value)}</span></div>
                <div>Growth: <span style={{ fontWeight: 500, color: d.growth > 10 ? chartColors.teal : chartColors.charcoalLight }}>{d.growth}%</span></div>
              </>
            );
          })()}
        </div>
      )}

      {/* Legend */}
      <div style={{ marginTop: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '11px' }}>
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: color, 
              borderRadius: '50%' 
            }} />
            <span style={{ color: chartColors.charcoalLight }}>{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BubbleChart;
