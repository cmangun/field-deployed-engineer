"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample tornado/butterfly chart data - sensitivity analysis
const defaultData = [
  { factor: 'Market Size', low: -25, high: 35, baseline: 100 },
  { factor: 'Price Point', low: -20, high: 28, baseline: 100 },
  { factor: 'Conversion Rate', low: -18, high: 22, baseline: 100 },
  { factor: 'CAC', low: -15, high: 12, baseline: 100 },
  { factor: 'Churn Rate', low: -12, high: 8, baseline: 100 },
  { factor: 'Op. Costs', low: -8, high: 6, baseline: 100 },
  { factor: 'Tax Rate', low: -5, high: 4, baseline: 100 },
];

interface TornadoChartProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
  valueLabel?: string;
}

const TornadoChart: React.FC<TornadoChartProps> = ({
  data = defaultData,
  width = 700,
  height = 350,
  title = "Tornado Chart",
  valueLabel = "Impact on NPV ($M)"
}) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const margin = { top: 30, right: 60, bottom: 40, left: 120 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Sort by total impact (high - low)
  const sortedData = [...data].sort((a, b) => (b.high - b.low) - (a.high - a.low));

  const barHeight = (innerHeight / sortedData.length) * 0.7;
  const barGap = (innerHeight / sortedData.length) * 0.3;

  // Find max absolute value for scale
  const maxAbsValue = Math.max(
    ...sortedData.map(d => Math.max(Math.abs(d.low), Math.abs(d.high)))
  );

  const centerX = innerWidth / 2;
  const xScale = (v: number) => centerX + (v / maxAbsValue) * (innerWidth / 2);

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
          {/* Center line */}
          <line
            x1={centerX}
            x2={centerX}
            y1={-10}
            y2={innerHeight + 10}
            stroke={chartColors.charcoal}
            strokeWidth={2}
          />

          {/* Grid lines */}
          {[-maxAbsValue, -maxAbsValue/2, maxAbsValue/2, maxAbsValue].map((v, i) => (
            <g key={i}>
              <line
                x1={xScale(v)}
                x2={xScale(v)}
                y1={0}
                y2={innerHeight}
                stroke={chartColors.light}
                strokeDasharray="4,4"
              />
              <text
                x={xScale(v)}
                y={innerHeight + 20}
                textAnchor="middle"
                fontSize={10}
                fill={chartColors.gray}
              >
                {v > 0 ? '+' : ''}{v.toFixed(0)}%
              </text>
            </g>
          ))}

          {/* Axis label */}
          <text
            x={centerX}
            y={innerHeight + 35}
            textAnchor="middle"
            fontSize={11}
            fill={chartColors.charcoalLight}
          >
            {valueLabel}
          </text>

          {/* Baseline label */}
          <text
            x={centerX}
            y={-15}
            textAnchor="middle"
            fontSize={10}
            fill={chartColors.charcoal}
            fontWeight={600}
          >
            Baseline
          </text>

          {/* Bars */}
          {sortedData.map((d, i) => {
            const isHovered = hoveredBar === i;
            const y = i * (barHeight + barGap);
            
            // Low bar (negative, goes left)
            const lowX = xScale(d.low);
            const lowWidth = centerX - lowX;
            
            // High bar (positive, goes right)
            const highWidth = xScale(d.high) - centerX;

            return (
              <g key={i} onMouseEnter={() => setHoveredBar(i)}>
                {/* Factor label */}
                <text
                  x={-10}
                  y={y + barHeight / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={11}
                  fontWeight={isHovered ? 600 : 400}
                  fill={isHovered ? chartColors.charcoal : chartColors.charcoalLight}
                >
                  {d.factor}
                </text>

                {/* Low bar (left side - red) */}
                <rect
                  x={lowX}
                  y={y}
                  width={lowWidth}
                  height={barHeight}
                  fill={chartColors.dark}
                  fillOpacity={isHovered ? 1 : 0.7}
                  rx={3}
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <title>{`${d.factor} (Low): ${d.low}%`}</title>
                </rect>

                {/* High bar (right side - teal) */}
                <rect
                  x={centerX}
                  y={y}
                  width={highWidth}
                  height={barHeight}
                  fill={chartColors.teal}
                  fillOpacity={isHovered ? 1 : 0.7}
                  rx={3}
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <title>{`${d.factor} (High): +${d.high}%`}</title>
                </rect>

                {/* Value labels */}
                {isHovered && (
                  <>
                    <text
                      x={lowX - 6}
                      y={y + barHeight / 2}
                      textAnchor="end"
                      dominantBaseline="middle"
                      fontSize={10}
                      fontWeight={600}
                      fill={chartColors.dark}
                    >
                      {d.low}%
                    </text>
                    <text
                      x={xScale(d.high) + 6}
                      y={y + barHeight / 2}
                      textAnchor="start"
                      dominantBaseline="middle"
                      fontSize={10}
                      fontWeight={600}
                      fill={chartColors.teal}
                    >
                      +{d.high}%
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Legend */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        gap: '24px',
        fontSize: '11px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '14px', height: '14px', backgroundColor: chartColors.dark, borderRadius: '3px' }} />
          <span style={{ color: chartColors.charcoalLight }}>Downside (-20% input)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '14px', height: '14px', backgroundColor: chartColors.teal, borderRadius: '3px' }} />
          <span style={{ color: chartColors.charcoalLight }}>Upside (+20% input)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '2px', height: '14px', backgroundColor: chartColors.charcoal }} />
          <span style={{ color: chartColors.charcoalLight }}>Baseline NPV</span>
        </div>
      </div>
    </div>
  );
};

export default TornadoChart;
