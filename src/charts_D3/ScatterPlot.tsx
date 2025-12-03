"use client";
import React, { useState, useMemo } from 'react';
import { chartColors } from './colors';

// Sample scatter data with categories
const defaultData = [
  { id: 'Pfizer', x: 85, y: 78, category: 'Healthcare', size: 45 },
  { id: 'Abbott', x: 72, y: 85, category: 'Healthcare', size: 38 },
  { id: 'Medtronic', x: 65, y: 72, category: 'Healthcare', size: 32 },
  { id: 'Sanofi', x: 58, y: 68, category: 'Healthcare', size: 28 },
  { id: 'Google', x: 92, y: 88, category: 'Technology', size: 52 },
  { id: 'Microsoft', x: 88, y: 82, category: 'Technology', size: 48 },
  { id: 'Apple', x: 82, y: 90, category: 'Technology', size: 50 },
  { id: 'Amazon', x: 78, y: 75, category: 'Retail', size: 42 },
  { id: 'JPMorgan', x: 70, y: 65, category: 'Finance', size: 35 },
  { id: 'Goldman', x: 68, y: 70, category: 'Finance', size: 30 },
  { id: 'Visa', x: 75, y: 80, category: 'Finance', size: 28 },
  { id: 'Stripe', x: 80, y: 85, category: 'Finance', size: 25 },
];

const categoryColors: Record<string, string> = {
  Healthcare: chartColors.teal,
  Technology: chartColors.orange,
  Retail: chartColors.purple,
  Finance: chartColors.indigo,
};

interface ScatterPlotProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
  xLabel?: string;
  yLabel?: string;
  showTrendline?: boolean;
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data = defaultData,
  width = 700,
  height = 400,
  title = "Scatter Plot",
  xLabel = "Performance Score",
  yLabel = "Satisfaction Score",
  showTrendline = true
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const margin = { top: 20, right: 30, bottom: 50, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Calculate scales
  const xExtent = [Math.min(...data.map(d => d.x)) - 5, Math.max(...data.map(d => d.x)) + 5];
  const yExtent = [Math.min(...data.map(d => d.y)) - 5, Math.max(...data.map(d => d.y)) + 5];

  const xScale = (v: number) => ((v - xExtent[0]) / (xExtent[1] - xExtent[0])) * innerWidth;
  const yScale = (v: number) => innerHeight - ((v - yExtent[0]) / (yExtent[1] - yExtent[0])) * innerHeight;

  // Calculate trendline (linear regression)
  const trendline = useMemo(() => {
    const filteredData = selectedCategory 
      ? data.filter(d => d.category === selectedCategory)
      : data;
    
    const n = filteredData.length;
    const sumX = filteredData.reduce((sum, d) => sum + d.x, 0);
    const sumY = filteredData.reduce((sum, d) => sum + d.y, 0);
    const sumXY = filteredData.reduce((sum, d) => sum + d.x * d.y, 0);
    const sumX2 = filteredData.reduce((sum, d) => sum + d.x * d.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // R-squared
    const yMean = sumY / n;
    const ssTotal = filteredData.reduce((sum, d) => sum + Math.pow(d.y - yMean, 2), 0);
    const ssResidual = filteredData.reduce((sum, d) => sum + Math.pow(d.y - (slope * d.x + intercept), 2), 0);
    const r2 = 1 - ssResidual / ssTotal;

    return { slope, intercept, r2 };
  }, [data, selectedCategory]);

  // Categories
  const categories = [...new Set(data.map(d => d.category))];

  // Filter data
  const visibleData = selectedCategory 
    ? data.filter(d => d.category === selectedCategory)
    : data;

  // Axis ticks
  const xTicks = [xExtent[0], (xExtent[0] + xExtent[1]) / 2, xExtent[1]];
  const yTicks = [yExtent[0], (yExtent[0] + yExtent[1]) / 2, yExtent[1]];

  return (
    <div style={{ width: '100%' }}>
      {/* SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: 'white', borderRadius: '8px' }}
        onMouseLeave={() => setHoveredPoint(null)}
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
                {tick.toFixed(0)}
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
                {tick.toFixed(0)}
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
            {xLabel}
          </text>
          <text
            x={-innerHeight / 2}
            y={-45}
            textAnchor="middle"
            transform="rotate(-90)"
            fontSize={11}
            fill={chartColors.charcoalLight}
          >
            {yLabel}
          </text>

          {/* Trendline */}
          {showTrendline && (
            <line
              x1={xScale(xExtent[0])}
              y1={yScale(trendline.slope * xExtent[0] + trendline.intercept)}
              x2={xScale(xExtent[1])}
              y2={yScale(trendline.slope * xExtent[1] + trendline.intercept)}
              stroke={chartColors.charcoalLight}
              strokeWidth={2}
              strokeDasharray="8,4"
              strokeOpacity={0.6}
            />
          )}

          {/* Points */}
          {data.map((point, i) => {
            const isHovered = hoveredPoint === point.id;
            const isVisible = !selectedCategory || point.category === selectedCategory;
            const color = categoryColors[point.category] || chartColors.gray;

            return (
              <g key={i}>
                <circle
                  cx={xScale(point.x)}
                  cy={yScale(point.y)}
                  r={isHovered ? 10 : 6 + point.size / 20}
                  fill={color}
                  fillOpacity={isVisible ? (isHovered ? 0.9 : 0.7) : 0.1}
                  stroke={isHovered ? chartColors.charcoal : 'white'}
                  strokeWidth={isHovered ? 2 : 1}
                  onMouseEnter={() => setHoveredPoint(point.id)}
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <title>{`${point.id}\n${xLabel}: ${point.x}\n${yLabel}: ${point.y}`}</title>
                </circle>
                
                {/* Label on hover */}
                {isHovered && (
                  <text
                    x={xScale(point.x)}
                    y={yScale(point.y) - 15}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={600}
                    fill={chartColors.charcoal}
                    style={{ pointerEvents: 'none' }}
                  >
                    {point.id}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Legend */}
      <div style={{ marginTop: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '11px' }}>
        {categories.map(category => {
          const isSelected = selectedCategory === category;
          const color = categoryColors[category] || chartColors.gray;
          
          return (
            <div
              key={category}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                cursor: 'pointer',
                opacity: !selectedCategory || isSelected ? 1 : 0.4,
                padding: '4px 8px',
                backgroundColor: isSelected ? `${color}20` : 'transparent',
                borderRadius: '4px',
                transition: 'all 0.2s'
              }}
              onClick={() => setSelectedCategory(isSelected ? null : category)}
            >
              <div style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: color, 
                borderRadius: '50%' 
              }} />
              <span style={{ color: chartColors.charcoalLight }}>{category}</span>
              <span style={{ color: chartColors.gray }}>
                ({data.filter(d => d.category === category).length})
              </span>
            </div>
          );
        })}
      </div>

      {/* Tooltip */}
      {hoveredPoint && (
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
            const point = data.find(d => d.id === hoveredPoint)!;
            return (
              <>
                <div style={{ fontWeight: 600 }}>{point.id}</div>
                <div>Category: <span style={{ fontWeight: 500 }}>{point.category}</span></div>
                <div>{xLabel}: <span style={{ fontWeight: 500 }}>{point.x}</span></div>
                <div>{yLabel}: <span style={{ fontWeight: 500 }}>{point.y}</span></div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default ScatterPlot;
