"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample waterfall data
const defaultData = [
  { label: 'Starting Revenue', value: 100, type: 'total' as const },
  { label: 'Product Sales', value: 45, type: 'increase' as const },
  { label: 'Services', value: 25, type: 'increase' as const },
  { label: 'Returns', value: -15, type: 'decrease' as const },
  { label: 'Discounts', value: -8, type: 'decrease' as const },
  { label: 'Licensing', value: 18, type: 'increase' as const },
  { label: 'Operating Costs', value: -35, type: 'decrease' as const },
  { label: 'Net Revenue', value: 130, type: 'total' as const },
];

interface WaterfallChartProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const WaterfallChart: React.FC<WaterfallChartProps> = ({
  data = defaultData,
  width = 700,
  height = 350,
  title = "Waterfall Chart"
}) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const margin = { top: 20, right: 30, bottom: 80, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Calculate running totals and bar positions
  const processedData = data.map((d, i) => {
    if (d.type === 'total') {
      return { ...d, start: 0, end: d.value };
    }
    
    // Calculate running total up to this point
    let runningTotal = 0;
    for (let j = 0; j < i; j++) {
      if (data[j].type === 'total') {
        runningTotal = data[j].value;
      } else {
        runningTotal += data[j].value;
      }
    }
    
    return {
      ...d,
      start: runningTotal,
      end: runningTotal + d.value
    };
  });

  // Calculate scales
  const allValues = processedData.flatMap(d => [d.start, d.end]);
  const maxValue = Math.max(...allValues) * 1.1;
  const minValue = Math.min(0, Math.min(...allValues)) * 1.1;

  const yScale = (v: number) => innerHeight - ((v - minValue) / (maxValue - minValue)) * innerHeight;
  const barWidth = (innerWidth / data.length) * 0.7;
  const barGap = (innerWidth / data.length) * 0.3;

  const getBarColor = (type: string, hovered: boolean) => {
    const colors = {
      total: hovered ? chartColors.charcoal : chartColors.charcoalLight,
      increase: hovered ? chartColors.primary : chartColors.teal,
      decrease: hovered ? chartColors.dark : chartColors.dark,
    };
    return colors[type as keyof typeof colors] || chartColors.gray;
  };

  // Y-axis ticks
  const yTicks = [0, 50, 100, 150];

  const formatValue = (v: number) => `$${v}M`;

  return (
    <div style={{ width: '100%' }}>
      {/* SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: 'white', borderRadius: '8px' }}
        onMouseLeave={() => setHoveredBar(null)}
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
                {formatValue(tick)}
              </text>
            </g>
          ))}

          {/* Connector lines */}
          {processedData.map((d, i) => {
            if (i === processedData.length - 1) return null;
            const nextD = processedData[i + 1];
            const xEnd = i * (barWidth + barGap) + barWidth;
            const xStart = (i + 1) * (barWidth + barGap);
            const y = d.type === 'total' ? yScale(d.value) : yScale(d.end);
            
            return (
              <line
                key={`connector-${i}`}
                x1={xEnd}
                x2={xStart}
                y1={y}
                y2={y}
                stroke={chartColors.gray}
                strokeWidth={1}
                strokeDasharray="3,3"
              />
            );
          })}

          {/* Bars */}
          {processedData.map((d, i) => {
            const isHovered = hoveredBar === i;
            const x = i * (barWidth + barGap);
            const y = yScale(Math.max(d.start, d.end));
            const barHeight = Math.abs(yScale(d.start) - yScale(d.end));
            
            return (
              <g key={i} onMouseEnter={() => setHoveredBar(i)}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight || 2}
                  fill={getBarColor(d.type, isHovered)}
                  rx={4}
                  style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
                >
                  <title>{`${d.label}: ${d.value > 0 ? '+' : ''}${formatValue(d.value)}`}</title>
                </rect>
                
                {/* Value label */}
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={600}
                  fill={d.type === 'decrease' ? chartColors.dark : (d.type === 'increase' ? chartColors.teal : chartColors.charcoal)}
                >
                  {d.type !== 'total' && (d.value > 0 ? '+' : '')}{formatValue(d.value)}
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {data.map((d, i) => {
            const x = i * (barWidth + barGap) + barWidth / 2;
            return (
              <text
                key={i}
                x={x}
                y={innerHeight + 16}
                textAnchor="middle"
                fontSize={10}
                fill={hoveredBar === i ? chartColors.charcoal : chartColors.gray}
                fontWeight={hoveredBar === i ? 600 : 400}
                transform={`rotate(-35, ${x}, ${innerHeight + 16})`}
                style={{ transformOrigin: `${x}px ${innerHeight + 16}px` }}
              >
                {d.label}
              </text>
            );
          })}
        </g>
      </svg>

      {/* Legend */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        gap: '20px',
        fontSize: '11px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '14px', height: '14px', backgroundColor: chartColors.charcoalLight, borderRadius: '3px' }} />
          <span style={{ color: chartColors.charcoalLight }}>Total</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '14px', height: '14px', backgroundColor: chartColors.teal, borderRadius: '3px' }} />
          <span style={{ color: chartColors.charcoalLight }}>Increase</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '14px', height: '14px', backgroundColor: chartColors.dark, borderRadius: '3px' }} />
          <span style={{ color: chartColors.charcoalLight }}>Decrease</span>
        </div>
      </div>
    </div>
  );
};

export default WaterfallChart;
