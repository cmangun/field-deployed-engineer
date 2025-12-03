"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample radial/donut data
const defaultData = [
  { label: 'Product Sales', value: 42, color: chartColors.teal },
  { label: 'Services', value: 28, color: chartColors.tealLight },
  { label: 'Licensing', value: 18, color: chartColors.orange },
  { label: 'Consulting', value: 12, color: chartColors.indigo },
];

interface DonutChartProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
  innerRadiusRatio?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data = defaultData,
  width = 350,
  height = 350,
  title = "Donut Chart",
  innerRadiusRatio = 0.6
}) => {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.4;
  const innerRadius = radius * innerRadiusRatio;

  const total = data.reduce((sum, d) => sum + d.value, 0);

  // Calculate slice angles
  let currentAngle = -Math.PI / 2; // Start at top
  const slices = data.map((d, i) => {
    const angle = (d.value / total) * Math.PI * 2;
    const slice = {
      ...d,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      percentage: ((d.value / total) * 100).toFixed(1)
    };
    currentAngle += angle;
    return slice;
  });

  // Generate arc path
  const createArc = (startAngle: number, endAngle: number, outerR: number, innerR: number) => {
    const x1 = centerX + Math.cos(startAngle) * outerR;
    const y1 = centerY + Math.sin(startAngle) * outerR;
    const x2 = centerX + Math.cos(endAngle) * outerR;
    const y2 = centerY + Math.sin(endAngle) * outerR;
    const x3 = centerX + Math.cos(endAngle) * innerR;
    const y3 = centerY + Math.sin(endAngle) * innerR;
    const x4 = centerX + Math.cos(startAngle) * innerR;
    const y4 = centerY + Math.sin(startAngle) * innerR;
    
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    
    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  // Hovered slice data
  const hoveredData = hoveredSlice !== null ? slices[hoveredSlice] : null;

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div>
        {/* SVG */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          style={{ maxWidth: '100%', height: 'auto' }}
          onMouseLeave={() => setHoveredSlice(null)}
        >
          {/* Slices */}
          {slices.map((slice, i) => {
            const isHovered = hoveredSlice === i;
            const expandedRadius = isHovered ? radius + 8 : radius;
            const expandedInner = isHovered ? innerRadius - 4 : innerRadius;
            
            return (
              <path
                key={i}
                d={createArc(slice.startAngle, slice.endAngle, expandedRadius, expandedInner)}
                fill={slice.color}
                stroke="white"
                strokeWidth={2}
                onMouseEnter={() => setHoveredSlice(i)}
                style={{ 
                  cursor: 'pointer', 
                  transition: 'all 0.2s ease-out',
                  filter: isHovered ? 'brightness(1.1)' : 'none'
                }}
              >
                <title>{`${slice.label}: ${slice.value} (${slice.percentage}%)`}</title>
              </path>
            );
          })}

          {/* Center text */}
          <text
            x={centerX}
            y={centerY - 8}
            textAnchor="middle"
            fontSize={hoveredData ? 24 : 28}
            fontWeight={700}
            fill={hoveredData ? hoveredData.color : chartColors.charcoal}
          >
            {hoveredData ? `${hoveredData.percentage}%` : total}
          </text>
          <text
            x={centerX}
            y={centerY + 14}
            textAnchor="middle"
            fontSize={12}
            fill={chartColors.gray}
          >
            {hoveredData ? hoveredData.label : 'Total'}
          </text>

          {/* Percentage labels on slices */}
          {slices.map((slice, i) => {
            const midAngle = (slice.startAngle + slice.endAngle) / 2;
            const labelRadius = (radius + innerRadius) / 2;
            const x = centerX + Math.cos(midAngle) * labelRadius;
            const y = centerY + Math.sin(midAngle) * labelRadius;
            
            // Only show label if slice is big enough
            const sliceAngle = slice.endAngle - slice.startAngle;
            if (sliceAngle < 0.4) return null;
            
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={11}
                fontWeight={600}
                fill="white"
                style={{ pointerEvents: 'none', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
              >
                {slice.percentage}%
              </text>
            );
          })}
        </svg>

        {/* Legend */}
        <div style={{ 
          marginTop: '16px', 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px',
          fontSize: '11px'
        }}>
          {slices.map((slice, i) => {
            const isHovered = hoveredSlice === i;
            return (
              <div 
                key={i} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: isHovered ? `${slice.color}20` : 'transparent',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={() => setHoveredSlice(i)}
                onMouseLeave={() => setHoveredSlice(null)}
              >
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  backgroundColor: slice.color, 
                  borderRadius: '3px' 
                }} />
                <span style={{ 
                  color: isHovered ? chartColors.charcoal : chartColors.charcoalLight,
                  fontWeight: isHovered ? 600 : 400
                }}>
                  {slice.label}
                </span>
                <span style={{ color: chartColors.gray }}>
                  ({slice.value})
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
