"use client";
import React, { useState, useMemo } from 'react';
import { chartColors } from './colors';

// Sample multi-dimensional data
const defaultData = [
  { name: 'Pfizer', revenue: 85, growth: 12, satisfaction: 78, efficiency: 82, innovation: 75 },
  { name: 'Abbott', revenue: 72, growth: 18, satisfaction: 85, efficiency: 70, innovation: 80 },
  { name: 'Medtronic', revenue: 65, growth: 15, satisfaction: 72, efficiency: 88, innovation: 70 },
  { name: 'Google', revenue: 92, growth: 22, satisfaction: 80, efficiency: 75, innovation: 95 },
  { name: 'Microsoft', revenue: 88, growth: 16, satisfaction: 82, efficiency: 85, innovation: 88 },
  { name: 'JPMorgan', revenue: 78, growth: 8, satisfaction: 70, efficiency: 90, innovation: 60 },
  { name: 'Goldman', revenue: 70, growth: 10, satisfaction: 65, efficiency: 92, innovation: 55 },
];

const defaultDimensions = ['revenue', 'growth', 'satisfaction', 'efficiency', 'innovation'];

const lineColors = [
  chartColors.teal,
  chartColors.tealLight,
  chartColors.orange,
  chartColors.navy,
  chartColors.navy,
  chartColors.cyan,
  chartColors.charcoalLight,
];

interface ParallelCoordinatesProps {
  data?: typeof defaultData;
  dimensions?: string[];
  width?: number;
  height?: number;
  title?: string;
}

const ParallelCoordinates: React.FC<ParallelCoordinatesProps> = ({
  data = defaultData,
  dimensions = defaultDimensions,
  width = 700,
  height = 400,
  title = "Parallel Coordinates"
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [brushRanges, setBrushRanges] = useState<Record<string, [number, number] | null>>({});

  const margin = { top: 40, right: 30, bottom: 30, left: 30 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Calculate scales for each dimension
  const scales = useMemo(() => {
    const result: Record<string, { min: number; max: number; scale: (v: number) => number }> = {};
    
    dimensions.forEach(dim => {
      const values = data.map(d => (d as any)[dim]);
      const min = Math.min(...values);
      const max = Math.max(...values);
      result[dim] = {
        min,
        max,
        scale: (v: number) => innerHeight - ((v - min) / (max - min)) * innerHeight
      };
    });
    
    return result;
  }, [data, dimensions, innerHeight]);

  // X position for each axis
  const xScale = (i: number) => (i / (dimensions.length - 1)) * innerWidth;

  // Generate path for each data item
  const generatePath = (item: typeof data[0]): string => {
    return dimensions.map((dim, i) => {
      const x = xScale(i);
      const y = scales[dim].scale((item as any)[dim]);
      return i === 0 ? `M${x},${y}` : `L${x},${y}`;
    }).join(' ');
  };

  // Check if item passes brush filters
  const passesFilters = (item: typeof data[0]): boolean => {
    return dimensions.every(dim => {
      const range = brushRanges[dim];
      if (!range) return true;
      const value = (item as any)[dim];
      return value >= range[0] && value <= range[1];
    });
  };

  // Handle brush on axis
  const handleAxisClick = (dim: string, e: React.MouseEvent<SVGGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top - margin.top;
    const value = scales[dim].min + ((innerHeight - y) / innerHeight) * (scales[dim].max - scales[dim].min);
    
    const range = brushRanges[dim];
    if (!range) {
      // Start new brush
      setBrushRanges(prev => ({ ...prev, [dim]: [value - 5, value + 5] }));
    } else {
      // Clear brush
      setBrushRanges(prev => ({ ...prev, [dim]: null }));
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: 'white', borderRadius: '8px' }}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Axes */}
          {dimensions.map((dim, i) => (
            <g
              key={dim}
              transform={`translate(${xScale(i)}, 0)`}
              onClick={(e) => handleAxisClick(dim, e)}
              style={{ cursor: 'pointer' }}
            >
              {/* Axis line */}
              <line
                y1={0}
                y2={innerHeight}
                stroke={chartColors.charcoalLight}
                strokeWidth={1}
              />
              
              {/* Brush indicator */}
              {brushRanges[dim] && (
                <rect
                  x={-8}
                  y={scales[dim].scale(brushRanges[dim]![1])}
                  width={16}
                  height={scales[dim].scale(brushRanges[dim]![0]) - scales[dim].scale(brushRanges[dim]![1])}
                  fill={chartColors.teal}
                  fillOpacity={0.3}
                  stroke={chartColors.teal}
                  strokeWidth={1}
                  rx={2}
                />
              )}
              
              {/* Axis title */}
              <text
                y={-12}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill={chartColors.charcoal}
                style={{ textTransform: 'capitalize' }}
              >
                {dim}
              </text>
              
              {/* Min/Max labels */}
              <text
                y={innerHeight + 16}
                textAnchor="middle"
                fontSize={9}
                fill={chartColors.gray}
              >
                {scales[dim].min.toFixed(0)}
              </text>
              <text
                y={-2}
                textAnchor="middle"
                fontSize={9}
                fill={chartColors.gray}
              >
                {scales[dim].max.toFixed(0)}
              </text>
            </g>
          ))}

          {/* Lines */}
          {data.map((item, i) => {
            const isHovered = hoveredItem === item.name;
            const passes = passesFilters(item);
            
            return (
              <path
                key={i}
                d={generatePath(item)}
                fill="none"
                stroke={lineColors[i % lineColors.length]}
                strokeWidth={isHovered ? 3 : 1.5}
                strokeOpacity={passes ? (isHovered ? 1 : 0.6) : 0.1}
                onMouseEnter={() => setHoveredItem(item.name)}
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <title>{item.name}</title>
              </path>
            );
          })}

          {/* Data points on hover */}
          {hoveredItem && data.filter(d => d.name === hoveredItem).map((item, i) => (
            dimensions.map((dim, j) => (
              <circle
                key={`${i}-${j}`}
                cx={xScale(j)}
                cy={scales[dim].scale((item as any)[dim])}
                r={5}
                fill={lineColors[data.indexOf(item) % lineColors.length]}
                stroke="white"
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
            ))
          ))}
        </g>
      </svg>

      {/* Legend */}
      <div style={{ marginTop: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '11px' }}>
        {data.map((item, i) => {
          const isHovered = hoveredItem === item.name;
          const passes = passesFilters(item);
          
          return (
            <div
              key={i}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                cursor: 'pointer',
                opacity: passes ? 1 : 0.3,
              }}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div style={{ 
                width: '16px', 
                height: '3px', 
                backgroundColor: lineColors[i % lineColors.length],
                borderRadius: '2px'
              }} />
              <span style={{ 
                color: isHovered ? chartColors.charcoal : chartColors.charcoalLight,
                fontWeight: isHovered ? 600 : 400
              }}>
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Tooltip */}
      {hoveredItem && (
        <div style={{
          marginTop: '8px',
          padding: '12px',
          backgroundColor: chartColors.background,
          borderRadius: '8px',
          fontSize: '12px',
        }}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>{hoveredItem}</div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {dimensions.map(dim => {
              const item = data.find(d => d.name === hoveredItem)!;
              return (
                <div key={dim}>
                  <span style={{ color: chartColors.gray, textTransform: 'capitalize' }}>{dim}:</span>
                  <span style={{ marginLeft: '4px', fontWeight: 500 }}>{(item as any)[dim]}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParallelCoordinates;
