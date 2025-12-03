"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample funnel data
const defaultData = [
  { stage: 'Visitors', value: 10000, color: chartColors.teal },
  { stage: 'Leads', value: 5500, color: chartColors.tealLight },
  { stage: 'Qualified', value: 2800, color: chartColors.orange },
  { stage: 'Proposals', value: 1400, color: chartColors.indigo },
  { stage: 'Negotiations', value: 700, color: chartColors.purple },
  { stage: 'Closed Won', value: 350, color: chartColors.green },
];

interface FunnelChartProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const FunnelChart: React.FC<FunnelChartProps> = ({
  data = defaultData,
  width = 700,
  height = 350,
  title = "Funnel Chart"
}) => {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  const margin = { top: 20, right: 120, bottom: 20, left: 120 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const maxValue = Math.max(...data.map(d => d.value));
  const stageHeight = innerHeight / data.length;
  const gap = 4;

  const formatNumber = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString();

  return (
    <div style={{ width: '100%' }}>
      {/* SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: 'white', borderRadius: '8px' }}
        onMouseLeave={() => setHoveredStage(null)}
      >
        <defs>
          {data.map((d, i) => (
            <linearGradient key={i} id={`funnel-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={d.color} stopOpacity={0.8} />
              <stop offset="50%" stopColor={d.color} stopOpacity={1} />
              <stop offset="100%" stopColor={d.color} stopOpacity={0.8} />
            </linearGradient>
          ))}
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {data.map((d, i) => {
            const isHovered = hoveredStage === i;
            const currentWidth = (d.value / maxValue) * innerWidth;
            const nextWidth = i < data.length - 1 ? (data[i + 1].value / maxValue) * innerWidth : currentWidth * 0.6;
            
            const y = i * stageHeight;
            const trapezoidHeight = stageHeight - gap;
            
            // Calculate trapezoid points
            const topLeft = (innerWidth - currentWidth) / 2;
            const topRight = (innerWidth + currentWidth) / 2;
            const bottomLeft = (innerWidth - nextWidth) / 2;
            const bottomRight = (innerWidth + nextWidth) / 2;
            
            const points = `
              ${topLeft},${y}
              ${topRight},${y}
              ${bottomRight},${y + trapezoidHeight}
              ${bottomLeft},${y + trapezoidHeight}
            `;

            // Conversion rate
            const conversionRate = i > 0 ? ((d.value / data[i - 1].value) * 100).toFixed(1) : '100';
            
            return (
              <g key={i} onMouseEnter={() => setHoveredStage(i)}>
                <polygon
                  points={points}
                  fill={`url(#funnel-gradient-${i})`}
                  stroke={isHovered ? chartColors.charcoal : 'white'}
                  strokeWidth={isHovered ? 2 : 1}
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                  opacity={isHovered ? 1 : 0.9}
                >
                  <title>{`${d.stage}: ${formatNumber(d.value)} (${conversionRate}%)`}</title>
                </polygon>
                
                {/* Center value */}
                <text
                  x={innerWidth / 2}
                  y={y + trapezoidHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={14}
                  fontWeight={700}
                  fill="white"
                  style={{ pointerEvents: 'none', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                >
                  {formatNumber(d.value)}
                </text>

                {/* Left label */}
                <text
                  x={-10}
                  y={y + trapezoidHeight / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={12}
                  fontWeight={isHovered ? 600 : 400}
                  fill={isHovered ? chartColors.charcoal : chartColors.charcoalLight}
                >
                  {d.stage}
                </text>

                {/* Right percentage */}
                <text
                  x={innerWidth + 10}
                  y={y + trapezoidHeight / 2}
                  textAnchor="start"
                  dominantBaseline="middle"
                  fontSize={11}
                  fill={chartColors.gray}
                >
                  {conversionRate}%
                </text>

                {/* Drop-off arrow */}
                {i > 0 && (
                  <g transform={`translate(${innerWidth + 50}, ${y + trapezoidHeight / 2})`}>
                    <text
                      textAnchor="start"
                      dominantBaseline="middle"
                      fontSize={10}
                      fill={chartColors.dark}
                    >
                      ↓ {(100 - parseFloat(conversionRate)).toFixed(1)}%
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Summary Stats */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        gap: '24px',
        fontSize: '11px',
        padding: '12px',
        backgroundColor: chartColors.background,
        borderRadius: '8px'
      }}>
        <div>
          <span style={{ color: chartColors.gray }}>Total Visitors:</span>
          <span style={{ marginLeft: '4px', fontWeight: 600 }}>{formatNumber(data[0].value)}</span>
        </div>
        <div>
          <span style={{ color: chartColors.gray }}>Conversions:</span>
          <span style={{ marginLeft: '4px', fontWeight: 600, color: chartColors.green }}>{formatNumber(data[data.length - 1].value)}</span>
        </div>
        <div>
          <span style={{ color: chartColors.gray }}>Overall Rate:</span>
          <span style={{ marginLeft: '4px', fontWeight: 600, color: chartColors.teal }}>
            {((data[data.length - 1].value / data[0].value) * 100).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default FunnelChart;
