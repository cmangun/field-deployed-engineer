"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample multi-line time series data
const defaultData = {
  dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    { name: 'Revenue', values: [120, 135, 150, 145, 160, 175, 190, 185, 200, 215, 225, 240], color: chartColors.teal },
    { name: 'Expenses', values: [90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145], color: chartColors.orange },
    { name: 'Profit', values: [30, 40, 50, 40, 50, 60, 70, 60, 70, 80, 85, 95], color: chartColors.indigo },
  ]
};

interface MultiLineChartProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
  yLabel?: string;
}

const MultiLineChart: React.FC<MultiLineChartProps> = ({
  data = defaultData,
  width = 700,
  height = 350,
  title = "Multi-Line Chart",
  yLabel = "Value ($M)"
}) => {
  const [hoveredSeries, setHoveredSeries] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const margin = { top: 20, right: 100, bottom: 40, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Calculate scales
  const allValues = data.series.flatMap(s => s.values);
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(0, Math.min(...allValues));

  const xScale = (i: number) => (i / (data.dates.length - 1)) * innerWidth;
  const yScale = (v: number) => innerHeight - ((v - minValue) / (maxValue - minValue)) * innerHeight;

  // Generate line path
  const generateLinePath = (values: number[]): string => {
    return values.map((v, i) => {
      const x = xScale(i);
      const y = yScale(v);
      return i === 0 ? `M${x},${y}` : `L${x},${y}`;
    }).join(' ');
  };

  // Generate area path
  const generateAreaPath = (values: number[]): string => {
    let path = generateLinePath(values);
    path += `L${xScale(values.length - 1)},${innerHeight}`;
    path += `L${xScale(0)},${innerHeight}Z`;
    return path;
  };

  // Y-axis ticks
  const yTicks = [minValue, (maxValue - minValue) * 0.25 + minValue, (maxValue - minValue) * 0.5 + minValue, (maxValue - minValue) * 0.75 + minValue, maxValue];

  const formatNumber = (n: number) => `$${n}M`;

  return (
    <div style={{ width: '100%' }}>
      {/* SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: 'white', borderRadius: '8px' }}
        onMouseLeave={() => { setHoveredSeries(null); setHoveredIndex(null); }}
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
                strokeDasharray={tick === 0 ? 'none' : '4,4'}
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

          {/* Areas (filled under lines) */}
          {data.series.map((series, i) => {
            const isHighlighted = hoveredSeries === null || hoveredSeries === series.name;
            
            return (
              <path
                key={`area-${i}`}
                d={generateAreaPath(series.values)}
                fill={series.color}
                fillOpacity={isHighlighted ? 0.1 : 0.02}
                style={{ transition: 'fill-opacity 0.3s' }}
              />
            );
          })}

          {/* Lines */}
          {data.series.map((series, i) => {
            const isHighlighted = hoveredSeries === null || hoveredSeries === series.name;
            
            return (
              <path
                key={`line-${i}`}
                d={generateLinePath(series.values)}
                fill="none"
                stroke={series.color}
                strokeWidth={isHighlighted ? 3 : 1.5}
                strokeOpacity={isHighlighted ? 1 : 0.3}
                strokeLinecap="round"
                strokeLinejoin="round"
                onMouseEnter={() => setHoveredSeries(series.name)}
                style={{ cursor: 'pointer', transition: 'all 0.3s' }}
              />
            );
          })}

          {/* Data points */}
          {data.series.map((series, seriesIndex) => {
            const isHighlighted = hoveredSeries === null || hoveredSeries === series.name;
            
            return series.values.map((value, i) => (
              <circle
                key={`point-${seriesIndex}-${i}`}
                cx={xScale(i)}
                cy={yScale(value)}
                r={hoveredIndex === i && isHighlighted ? 6 : (isHighlighted ? 4 : 2)}
                fill={series.color}
                fillOpacity={isHighlighted ? 1 : 0.3}
                stroke="white"
                strokeWidth={2}
                onMouseEnter={() => { setHoveredSeries(series.name); setHoveredIndex(i); }}
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <title>{`${series.name} (${data.dates[i]}): ${formatNumber(value)}`}</title>
              </circle>
            ));
          })}

          {/* Hover line */}
          {hoveredIndex !== null && (
            <line
              x1={xScale(hoveredIndex)}
              x2={xScale(hoveredIndex)}
              y1={0}
              y2={innerHeight}
              stroke={chartColors.charcoalLight}
              strokeWidth={1}
              strokeDasharray="4,4"
              style={{ pointerEvents: 'none' }}
            />
          )}

          {/* X-axis labels */}
          {data.dates.map((date, i) => (
            <text
              key={i}
              x={xScale(i)}
              y={innerHeight + 20}
              textAnchor="middle"
              fontSize={10}
              fill={hoveredIndex === i ? chartColors.charcoal : chartColors.gray}
              fontWeight={hoveredIndex === i ? 600 : 400}
            >
              {date}
            </text>
          ))}

          {/* Invisible hover areas */}
          {data.dates.map((_, i) => (
            <rect
              key={i}
              x={xScale(i) - innerWidth / data.dates.length / 2}
              y={0}
              width={innerWidth / data.dates.length}
              height={innerHeight}
              fill="transparent"
              onMouseEnter={() => setHoveredIndex(i)}
            />
          ))}

          {/* Legend (right side) */}
          {data.series.map((series, i) => {
            const isHighlighted = hoveredSeries === null || hoveredSeries === series.name;
            const lastValue = series.values[series.values.length - 1];
            
            return (
              <g
                key={`legend-${i}`}
                transform={`translate(${innerWidth + 10}, ${yScale(lastValue)})`}
                onMouseEnter={() => setHoveredSeries(series.name)}
                onMouseLeave={() => setHoveredSeries(null)}
                style={{ cursor: 'pointer' }}
              >
                <line x1={0} x2={20} y1={0} y2={0} stroke={series.color} strokeWidth={2} />
                <text
                  x={25}
                  dy="0.35em"
                  fontSize={11}
                  fill={isHighlighted ? chartColors.charcoal : chartColors.gray}
                  fontWeight={isHighlighted ? 600 : 400}
                >
                  {series.name}
                </text>
              </g>
            );
          })}
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
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>{data.dates[hoveredIndex]}</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {data.series.map((series, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: series.color, borderRadius: '2px' }} />
                <span>{series.name}:</span>
                <span style={{ fontWeight: 600 }}>{formatNumber(series.values[hoveredIndex])}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiLineChart;
