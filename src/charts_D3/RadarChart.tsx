"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample radar/spider chart data
const defaultData = {
  categories: ['Innovation', 'Quality', 'Speed', 'Cost', 'Support', 'Reliability'],
  series: [
    { name: 'Product A', values: [85, 72, 90, 65, 78, 88], color: chartColors.teal },
    { name: 'Product B', values: [70, 85, 75, 80, 90, 72], color: chartColors.orange },
  ]
};

interface RadarChartProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
  maxValue?: number;
}

const RadarChart: React.FC<RadarChartProps> = ({
  data = defaultData,
  width = 400,
  height = 400,
  title = "Radar Chart",
  maxValue = 100
}) => {
  const [hoveredSeries, setHoveredSeries] = useState<string | null>(null);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.35;

  const numCategories = data.categories.length;
  const angleStep = (Math.PI * 2) / numCategories;

  // Generate points for a polygon
  const getPolygonPoints = (values: number[]): string => {
    return values.map((v, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const r = (v / maxValue) * radius;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      return `${x},${y}`;
    }).join(' ');
  };

  // Generate grid levels
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div>
        {/* SVG */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          style={{ maxWidth: '100%', height: 'auto' }}
          onMouseLeave={() => setHoveredSeries(null)}
        >
          {/* Grid circles */}
          {gridLevels.map((level, i) => (
            <polygon
              key={i}
              points={data.categories.map((_, j) => {
                const angle = j * angleStep - Math.PI / 2;
                const r = radius * level;
                return `${centerX + Math.cos(angle) * r},${centerY + Math.sin(angle) * r}`;
              }).join(' ')}
              fill="none"
              stroke={chartColors.light}
              strokeWidth={1}
            />
          ))}

          {/* Grid level labels */}
          {gridLevels.map((level, i) => (
            <text
              key={i}
              x={centerX + 4}
              y={centerY - radius * level + 4}
              fontSize={9}
              fill={chartColors.gray}
            >
              {Math.round(maxValue * level)}
            </text>
          ))}

          {/* Axis lines */}
          {data.categories.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke={chartColors.light}
                strokeWidth={1}
              />
            );
          })}

          {/* Category labels */}
          {data.categories.map((cat, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelRadius = radius + 20;
            const x = centerX + Math.cos(angle) * labelRadius;
            const y = centerY + Math.sin(angle) * labelRadius;
            
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={11}
                fill={chartColors.charcoalLight}
                fontWeight={500}
              >
                {cat}
              </text>
            );
          })}

          {/* Data polygons */}
          {data.series.map((series, i) => {
            const isHovered = hoveredSeries === series.name || hoveredSeries === null;
            
            return (
              <g key={i}>
                <polygon
                  points={getPolygonPoints(series.values)}
                  fill={series.color}
                  fillOpacity={isHovered ? 0.25 : 0.05}
                  stroke={series.color}
                  strokeWidth={isHovered ? 2 : 1}
                  strokeOpacity={isHovered ? 1 : 0.3}
                  onMouseEnter={() => setHoveredSeries(series.name)}
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                />
                
                {/* Data points */}
                {series.values.map((v, j) => {
                  const angle = j * angleStep - Math.PI / 2;
                  const r = (v / maxValue) * radius;
                  const x = centerX + Math.cos(angle) * r;
                  const y = centerY + Math.sin(angle) * r;
                  
                  return (
                    <circle
                      key={j}
                      cx={x}
                      cy={y}
                      r={isHovered ? 5 : 3}
                      fill={series.color}
                      stroke="white"
                      strokeWidth={2}
                      style={{ transition: 'all 0.2s' }}
                    >
                      <title>{`${series.name} - ${data.categories[j]}: ${v}`}</title>
                    </circle>
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div style={{ 
          marginTop: '16px', 
          display: 'flex', 
          justifyContent: 'center',
          gap: '20px',
          fontSize: '11px'
        }}>
          {data.series.map((series, i) => {
            const isHovered = hoveredSeries === series.name;
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
                  backgroundColor: isHovered ? `${series.color}20` : 'transparent',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={() => setHoveredSeries(series.name)}
                onMouseLeave={() => setHoveredSeries(null)}
              >
                <div style={{ 
                  width: '14px', 
                  height: '14px', 
                  backgroundColor: series.color,
                  opacity: 0.5,
                  borderRadius: '3px',
                  border: `2px solid ${series.color}`
                }} />
                <span style={{ 
                  color: isHovered ? chartColors.charcoal : chartColors.charcoalLight,
                  fontWeight: isHovered ? 600 : 400
                }}>
                  {series.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RadarChart;
