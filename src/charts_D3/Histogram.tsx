"use client";
import React, { useState, useMemo } from 'react';
import { chartColors } from './colors';

// Sample data - normally distributed values
const defaultData = [
  12, 15, 18, 22, 25, 28, 30, 32, 33, 35, 36, 38, 40, 41, 42, 43, 44, 45, 45, 46,
  47, 48, 48, 49, 50, 50, 51, 51, 52, 52, 53, 53, 54, 54, 55, 55, 55, 56, 56, 57,
  57, 58, 58, 59, 60, 60, 61, 62, 63, 64, 65, 66, 68, 70, 72, 75, 78, 82, 85, 90
];

interface HistogramProps {
  data?: number[];
  width?: number;
  height?: number;
  title?: string;
  bins?: number;
  xLabel?: string;
  yLabel?: string;
}

const Histogram: React.FC<HistogramProps> = ({
  data = defaultData,
  width = 700,
  height = 350,
  title = "Histogram",
  bins = 12,
  xLabel = "Value",
  yLabel = "Frequency"
}) => {
  const [hoveredBin, setHoveredBin] = useState<number | null>(null);

  const margin = { top: 20, right: 30, bottom: 50, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Calculate histogram bins
  const histogram = useMemo(() => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const binWidth = (max - min) / bins;
    
    const binData: { x0: number; x1: number; count: number; values: number[] }[] = [];
    
    for (let i = 0; i < bins; i++) {
      const x0 = min + i * binWidth;
      const x1 = min + (i + 1) * binWidth;
      const values = data.filter(d => d >= x0 && (i === bins - 1 ? d <= x1 : d < x1));
      binData.push({ x0, x1, count: values.length, values });
    }
    
    return { binData, min, max, binWidth };
  }, [data, bins]);

  const maxCount = Math.max(...histogram.binData.map(b => b.count));

  // Scales
  const xScale = (v: number) => 
    ((v - histogram.min) / (histogram.max - histogram.min)) * innerWidth;
  
  const yScale = (count: number) => 
    innerHeight - (count / maxCount) * innerHeight;

  const barWidth = innerWidth / bins - 2;

  // Stats
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const sortedData = [...data].sort((a, b) => a - b);
  const median = sortedData[Math.floor(sortedData.length / 2)];
  const stdDev = Math.sqrt(
    data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length
  );

  // Y-axis ticks
  const yTicks = [0, Math.round(maxCount * 0.25), Math.round(maxCount * 0.5), Math.round(maxCount * 0.75), maxCount];

  return (
    <div style={{ width: '100%' }}>
      {/* SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: 'white', borderRadius: '8px' }}
        onMouseLeave={() => setHoveredBin(null)}
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
                {tick}
              </text>
            </g>
          ))}

          {/* Bars */}
          {histogram.binData.map((bin, i) => {
            const isHovered = hoveredBin === i;
            const barHeight = innerHeight - yScale(bin.count);
            
            return (
              <g key={i} onMouseEnter={() => setHoveredBin(i)}>
                <rect
                  x={xScale(bin.x0) + 1}
                  y={yScale(bin.count)}
                  width={barWidth}
                  height={barHeight}
                  fill={chartColors.teal}
                  fillOpacity={isHovered ? 1 : 0.7}
                  stroke={isHovered ? chartColors.charcoal : chartColors.teal}
                  strokeWidth={isHovered ? 2 : 1}
                  rx={2}
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <title>{`${bin.x0.toFixed(1)} - ${bin.x1.toFixed(1)}: ${bin.count} items`}</title>
                </rect>
                
                {/* Count label on tall bars */}
                {barHeight > 20 && (
                  <text
                    x={xScale(bin.x0) + barWidth / 2 + 1}
                    y={yScale(bin.count) + 14}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={500}
                    fill="white"
                    style={{ pointerEvents: 'none' }}
                  >
                    {bin.count}
                  </text>
                )}
              </g>
            );
          })}

          {/* Mean line */}
          <line
            x1={xScale(mean)}
            x2={xScale(mean)}
            y1={0}
            y2={innerHeight}
            stroke={chartColors.orange}
            strokeWidth={2}
            strokeDasharray="6,3"
          />
          <text
            x={xScale(mean) + 4}
            y={12}
            fontSize={10}
            fill={chartColors.orange}
            fontWeight={600}
          >
            Mean
          </text>

          {/* Median line */}
          <line
            x1={xScale(median)}
            x2={xScale(median)}
            y1={0}
            y2={innerHeight}
            stroke={chartColors.purple}
            strokeWidth={2}
            strokeDasharray="3,3"
          />
          <text
            x={xScale(median) + 4}
            y={26}
            fontSize={10}
            fill={chartColors.purple}
            fontWeight={600}
          >
            Median
          </text>

          {/* X-axis labels */}
          {histogram.binData.filter((_, i) => i % 2 === 0).map((bin, i) => (
            <text
              key={i}
              x={xScale(bin.x0) + barWidth / 2}
              y={innerHeight + 20}
              textAnchor="middle"
              fontSize={10}
              fill={chartColors.gray}
            >
              {bin.x0.toFixed(0)}
            </text>
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
            y={-35}
            textAnchor="middle"
            transform="rotate(-90)"
            fontSize={11}
            fill={chartColors.charcoalLight}
          >
            {yLabel}
          </text>
        </g>
      </svg>

      {/* Stats */}
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
          <span style={{ color: chartColors.gray }}>Count:</span>
          <span style={{ marginLeft: '4px', fontWeight: 600 }}>{data.length}</span>
        </div>
        <div>
          <span style={{ color: chartColors.orange }}>Mean:</span>
          <span style={{ marginLeft: '4px', fontWeight: 600 }}>{mean.toFixed(2)}</span>
        </div>
        <div>
          <span style={{ color: chartColors.purple }}>Median:</span>
          <span style={{ marginLeft: '4px', fontWeight: 600 }}>{median.toFixed(2)}</span>
        </div>
        <div>
          <span style={{ color: chartColors.gray }}>Std Dev:</span>
          <span style={{ marginLeft: '4px', fontWeight: 600 }}>{stdDev.toFixed(2)}</span>
        </div>
        <div>
          <span style={{ color: chartColors.gray }}>Min:</span>
          <span style={{ marginLeft: '4px', fontWeight: 600 }}>{histogram.min.toFixed(1)}</span>
        </div>
        <div>
          <span style={{ color: chartColors.gray }}>Max:</span>
          <span style={{ marginLeft: '4px', fontWeight: 600 }}>{histogram.max.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default Histogram;
