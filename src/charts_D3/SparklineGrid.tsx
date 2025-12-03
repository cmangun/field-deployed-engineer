"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample sparkline data
const defaultData = [
  { 
    label: 'Revenue', 
    values: [45, 52, 48, 55, 60, 58, 65, 72, 68, 75, 82, 78],
    current: 78,
    change: 12.5,
    format: (v: number) => `$${v}K`
  },
  { 
    label: 'Users', 
    values: [1200, 1350, 1280, 1450, 1520, 1480, 1620, 1750, 1680, 1820, 1950, 2100],
    current: 2100,
    change: 8.2,
    format: (v: number) => v >= 1000 ? `${(v/1000).toFixed(1)}K` : `${v}`
  },
  { 
    label: 'Conversion', 
    values: [3.2, 3.5, 3.4, 3.8, 4.1, 3.9, 4.2, 4.5, 4.3, 4.1, 3.8, 3.6],
    current: 3.6,
    change: -5.3,
    format: (v: number) => `${v.toFixed(1)}%`
  },
  { 
    label: 'Avg Order', 
    values: [85, 82, 88, 92, 95, 90, 88, 94, 98, 102, 105, 108],
    current: 108,
    change: 6.9,
    format: (v: number) => `$${v}`
  },
];

interface SparklineGridProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const SparklineGrid: React.FC<SparklineGridProps> = ({
  data = defaultData,
  width = 700,
  height = 300,
  title = "KPI Sparklines"
}) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // Larger sparkline dimensions
  const sparklineWidth = 280;
  const sparklineHeight = 80;

  // Generate sparkline path
  const generatePath = (values: number[]): string => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    
    const xStep = sparklineWidth / (values.length - 1);
    const padding = 6;
    
    return values.map((v, i) => {
      const x = i * xStep;
      const y = sparklineHeight - ((v - min) / range) * (sparklineHeight - padding * 2) - padding;
      return i === 0 ? `M${x},${y}` : `L${x},${y}`;
    }).join(' ');
  };

  // Generate area path
  const generateAreaPath = (values: number[]): string => {
    const path = generatePath(values);
    return `${path} L${sparklineWidth},${sparklineHeight} L0,${sparklineHeight} Z`;
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px'
      }}>
        {data.map((item, i) => {
          const isHovered = hoveredRow === i;
          const isPositive = item.change >= 0;
          const trendColor = isPositive ? chartColors.teal : chartColors.dark;
          
          return (
            <div 
              key={i}
              style={{
                padding: '24px',
                backgroundColor: isHovered ? chartColors.background : 'white',
                borderRadius: '14px',
                border: `1px solid ${isHovered ? chartColors.teal : chartColors.light}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* Header with label and change */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ fontSize: '14px', color: chartColors.gray }}>
                  {item.label}
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  padding: '5px 10px',
                  borderRadius: '14px',
                  backgroundColor: `${trendColor}15`
                }}>
                  <span style={{ fontSize: '13px', color: trendColor }}>
                    {isPositive ? '↑' : '↓'}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: trendColor }}>
                    {Math.abs(item.change)}%
                  </span>
                </div>
              </div>
              
              {/* Current value - large */}
              <div style={{ fontSize: '32px', fontWeight: 700, color: chartColors.charcoal, marginBottom: '16px' }}>
                {item.format ? item.format(item.current) : item.current.toLocaleString()}
              </div>
              
              {/* Sparkline - flex grow to fill space */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', minHeight: '90px' }}>
                <svg
                  viewBox={`0 0 ${sparklineWidth} ${sparklineHeight}`}
                  style={{ width: '100%', height: '100%', maxHeight: '90px' }}
                  preserveAspectRatio="none"
                >
                  {/* Area fill */}
                  <path
                    d={generateAreaPath(item.values)}
                    fill={trendColor}
                    fillOpacity={0.1}
                  />
                  
                  {/* Line */}
                  <path
                    d={generatePath(item.values)}
                    fill="none"
                    stroke={trendColor}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* End point */}
                  <circle
                    cx={sparklineWidth}
                    cy={(() => {
                      const min = Math.min(...item.values);
                      const max = Math.max(...item.values);
                      const range = max - min || 1;
                      const padding = 6;
                      return sparklineHeight - ((item.current - min) / range) * (sparklineHeight - padding * 2) - padding;
                    })()}
                    r={5}
                    fill={trendColor}
                    stroke="white"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              
              {/* Min/Max labels */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginTop: '12px',
                fontSize: '11px',
                color: chartColors.gray
              }}>
                <span>Min: {item.format ? item.format(Math.min(...item.values)) : Math.min(...item.values).toLocaleString()}</span>
                <span>Max: {item.format ? item.format(Math.max(...item.values)) : Math.max(...item.values).toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SparklineGrid;
