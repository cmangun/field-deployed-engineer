"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample bump chart data - rankings over time
const defaultData = {
  periods: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2'],
  series: [
    { name: 'Pfizer', rankings: [1, 1, 2, 2, 3, 4], color: chartColors.teal },
    { name: 'Abbott', rankings: [3, 2, 1, 1, 1, 1], color: chartColors.orange },
    { name: 'Medtronic', rankings: [2, 3, 3, 4, 4, 3], color: chartColors.indigo },
    { name: 'J&J', rankings: [4, 4, 4, 3, 2, 2], color: chartColors.purple },
    { name: 'Sanofi', rankings: [5, 5, 5, 5, 5, 5], color: chartColors.gray },
  ]
};

interface BumpChartProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const BumpChart: React.FC<BumpChartProps> = ({
  data = defaultData,
  width = 700,
  height = 350,
  title = "Bump Chart"
}) => {
  const [hoveredSeries, setHoveredSeries] = useState<string | null>(null);

  const margin = { top: 30, right: 100, bottom: 40, left: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const numPeriods = data.periods.length;
  const maxRank = Math.max(...data.series.flatMap(s => s.rankings));

  const xScale = (i: number) => (i / (numPeriods - 1)) * innerWidth;
  const yScale = (rank: number) => ((rank - 1) / (maxRank - 1)) * innerHeight;

  // Generate smooth curve path
  const generatePath = (rankings: number[]): string => {
    if (rankings.length < 2) return '';
    
    let path = `M${xScale(0)},${yScale(rankings[0])}`;
    
    for (let i = 1; i < rankings.length; i++) {
      const x0 = xScale(i - 1);
      const y0 = yScale(rankings[i - 1]);
      const x1 = xScale(i);
      const y1 = yScale(rankings[i]);
      
      // Bezier control points for smooth curve
      const cpx = (x0 + x1) / 2;
      path += ` C${cpx},${y0} ${cpx},${y1} ${x1},${y1}`;
    }
    
    return path;
  };

  return (
    <div style={{ width: '100%' }}>
      {/* SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: 'white', borderRadius: '8px' }}
        onMouseLeave={() => setHoveredSeries(null)}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Rank labels (left) */}
          {Array.from({ length: maxRank }, (_, i) => (
            <text
              key={`rank-${i}`}
              x={-20}
              y={yScale(i + 1)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={12}
              fontWeight={600}
              fill={chartColors.charcoalLight}
            >
              #{i + 1}
            </text>
          ))}

          {/* Period labels (bottom) */}
          {data.periods.map((period, i) => (
            <text
              key={i}
              x={xScale(i)}
              y={innerHeight + 25}
              textAnchor="middle"
              fontSize={11}
              fill={chartColors.gray}
            >
              {period}
            </text>
          ))}

          {/* Vertical grid lines */}
          {data.periods.map((_, i) => (
            <line
              key={i}
              x1={xScale(i)}
              x2={xScale(i)}
              y1={0}
              y2={innerHeight}
              stroke={chartColors.light}
              strokeDasharray="4,4"
            />
          ))}

          {/* Horizontal grid lines */}
          {Array.from({ length: maxRank }, (_, i) => (
            <line
              key={i}
              x1={0}
              x2={innerWidth}
              y1={yScale(i + 1)}
              y2={yScale(i + 1)}
              stroke={chartColors.light}
            />
          ))}

          {/* Lines */}
          {data.series.map((series, i) => {
            const isHovered = hoveredSeries === series.name || hoveredSeries === null;
            
            return (
              <path
                key={i}
                d={generatePath(series.rankings)}
                fill="none"
                stroke={series.color}
                strokeWidth={isHovered ? 3 : 1.5}
                strokeOpacity={isHovered ? 1 : 0.2}
                strokeLinecap="round"
                onMouseEnter={() => setHoveredSeries(series.name)}
                style={{ cursor: 'pointer', transition: 'all 0.3s' }}
              />
            );
          })}

          {/* Data points */}
          {data.series.map((series, seriesIndex) => {
            const isHovered = hoveredSeries === series.name || hoveredSeries === null;
            
            return series.rankings.map((rank, i) => (
              <circle
                key={`${seriesIndex}-${i}`}
                cx={xScale(i)}
                cy={yScale(rank)}
                r={isHovered ? 6 : 4}
                fill={series.color}
                stroke="white"
                strokeWidth={2}
                fillOpacity={isHovered ? 1 : 0.2}
                onMouseEnter={() => setHoveredSeries(series.name)}
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <title>{`${series.name}: #${rank} in ${data.periods[i]}`}</title>
              </circle>
            ));
          })}

          {/* Right labels */}
          {data.series.map((series, i) => {
            const isHovered = hoveredSeries === series.name || hoveredSeries === null;
            const lastRank = series.rankings[series.rankings.length - 1];
            
            return (
              <g
                key={i}
                transform={`translate(${innerWidth + 10}, ${yScale(lastRank)})`}
                onMouseEnter={() => setHoveredSeries(series.name)}
                onMouseLeave={() => setHoveredSeries(null)}
                style={{ cursor: 'pointer' }}
              >
                <text
                  dominantBaseline="middle"
                  fontSize={11}
                  fontWeight={isHovered ? 600 : 400}
                  fill={isHovered ? series.color : chartColors.gray}
                >
                  {series.name}
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
        gap: '16px',
        flexWrap: 'wrap',
        fontSize: '11px'
      }}>
        {data.series.map((series, i) => {
          const isHovered = hoveredSeries === series.name;
          const firstRank = series.rankings[0];
          const lastRank = series.rankings[series.rankings.length - 1];
          const change = firstRank - lastRank;
          
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
                backgroundColor: isHovered ? `${series.color}15` : 'transparent'
              }}
              onMouseEnter={() => setHoveredSeries(series.name)}
              onMouseLeave={() => setHoveredSeries(null)}
            >
              <div style={{ 
                width: '20px', 
                height: '3px', 
                backgroundColor: series.color,
                borderRadius: '2px'
              }} />
              <span style={{ color: isHovered ? chartColors.charcoal : chartColors.charcoalLight }}>
                {series.name}
              </span>
              <span style={{ 
                color: change > 0 ? chartColors.teal : change < 0 ? chartColors.dark : chartColors.gray,
                fontWeight: 600
              }}>
                {change > 0 ? `↑${change}` : change < 0 ? `↓${Math.abs(change)}` : '–'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BumpChart;
