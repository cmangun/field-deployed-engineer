"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample gauge data
const defaultData = {
  value: 72,
  min: 0,
  max: 100,
  target: 80,
  thresholds: [
    { value: 40, color: chartColors.dark, label: 'Low' },
    { value: 70, color: chartColors.orange, label: 'Medium' },
    { value: 100, color: chartColors.teal, label: 'High' },
  ]
};

interface GaugeChartProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
  subtitle?: string;
}

const GaugeChart: React.FC<GaugeChartProps> = ({
  data = defaultData,
  width = 300,
  height = 220,
  title = "Performance Score",
  subtitle = "Current period"
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const centerX = width / 2;
  const centerY = height - 40;
  const radius = Math.min(width, height) * 0.4;
  const innerRadius = radius * 0.7;
  const needleLength = radius * 0.85;

  // Arc angles (180 degree arc)
  const startAngle = -Math.PI;
  const endAngle = 0;
  const totalAngle = endAngle - startAngle;

  const valueToAngle = (value: number) => {
    const ratio = (value - data.min) / (data.max - data.min);
    return startAngle + ratio * totalAngle;
  };

  // Generate arc path
  const createArc = (startVal: number, endVal: number, outerR: number, innerR: number) => {
    const start = valueToAngle(startVal);
    const end = valueToAngle(endVal);
    
    const x1 = centerX + Math.cos(start) * outerR;
    const y1 = centerY + Math.sin(start) * outerR;
    const x2 = centerX + Math.cos(end) * outerR;
    const y2 = centerY + Math.sin(end) * outerR;
    const x3 = centerX + Math.cos(end) * innerR;
    const y3 = centerY + Math.sin(end) * innerR;
    const x4 = centerX + Math.cos(start) * innerR;
    const y4 = centerY + Math.sin(start) * innerR;
    
    const largeArc = end - start > Math.PI ? 1 : 0;
    
    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  // Needle
  const needleAngle = valueToAngle(data.value);
  const needleX = centerX + Math.cos(needleAngle) * needleLength;
  const needleY = centerY + Math.sin(needleAngle) * needleLength;

  // Current threshold color
  const currentColor = data.thresholds.find(t => data.value <= t.value)?.color || chartColors.teal;

  // Tick marks
  const ticks = [0, 25, 50, 75, 100];

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div 
        style={{ textAlign: 'center' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* SVG */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          style={{ maxWidth: '100%', height: 'auto' }}
        >
          {/* Background arc */}
          <path
            d={createArc(data.min, data.max, radius, innerRadius)}
            fill={chartColors.light}
          />

          {/* Threshold arcs */}
          {data.thresholds.map((threshold, i) => {
            const prevValue = i === 0 ? data.min : data.thresholds[i - 1].value;
            return (
              <path
                key={i}
                d={createArc(prevValue, threshold.value, radius, innerRadius)}
                fill={threshold.color}
                fillOpacity={0.2}
              />
            );
          })}

          {/* Value arc */}
          <path
            d={createArc(data.min, data.value, radius, innerRadius)}
            fill={currentColor}
            style={{ transition: 'all 0.5s ease-out' }}
          />

          {/* Target marker */}
          {data.target && (
            <line
              x1={centerX + Math.cos(valueToAngle(data.target)) * innerRadius}
              y1={centerY + Math.sin(valueToAngle(data.target)) * innerRadius}
              x2={centerX + Math.cos(valueToAngle(data.target)) * (radius + 5)}
              y2={centerY + Math.sin(valueToAngle(data.target)) * (radius + 5)}
              stroke={chartColors.charcoal}
              strokeWidth={3}
              strokeLinecap="round"
            />
          )}

          {/* Tick marks and labels */}
          {ticks.map((tick, i) => {
            const angle = valueToAngle(tick);
            const x1 = centerX + Math.cos(angle) * radius;
            const y1 = centerY + Math.sin(angle) * radius;
            const x2 = centerX + Math.cos(angle) * (radius + 8);
            const y2 = centerY + Math.sin(angle) * (radius + 8);
            const labelX = centerX + Math.cos(angle) * (radius + 20);
            const labelY = centerY + Math.sin(angle) * (radius + 20);
            
            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={chartColors.gray}
                  strokeWidth={2}
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={10}
                  fill={chartColors.gray}
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Needle */}
          <line
            x1={centerX}
            y1={centerY}
            x2={needleX}
            y2={needleY}
            stroke={chartColors.charcoal}
            strokeWidth={3}
            strokeLinecap="round"
            style={{ 
              transition: 'all 0.5s ease-out',
              transformOrigin: `${centerX}px ${centerY}px`
            }}
          />

          {/* Center circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={12}
            fill={chartColors.charcoal}
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={6}
            fill="white"
          />

          {/* Value display */}
          <text
            x={centerX}
            y={centerY + 35}
            textAnchor="middle"
            fontSize={28}
            fontWeight={700}
            fill={currentColor}
          >
            {data.value}
          </text>
          <text
            x={centerX}
            y={centerY + 52}
            textAnchor="middle"
            fontSize={11}
            fill={chartColors.gray}
          >
            of {data.max}
          </text>
        </svg>

        {/* Labels */}
        <div style={{ marginTop: '-10px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: chartColors.charcoal }}>
            {title}
          </div>
          <div style={{ fontSize: '11px', color: chartColors.gray }}>
            {subtitle}
          </div>
        </div>

        {/* Threshold legend */}
        <div style={{ 
          marginTop: '12px', 
          display: 'flex', 
          justifyContent: 'center',
          gap: '16px',
          fontSize: '10px'
        }}>
          {data.thresholds.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: t.color, borderRadius: '2px' }} />
              <span style={{ color: chartColors.gray }}>{t.label}</span>
            </div>
          ))}
          {data.target && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '10px', height: '3px', backgroundColor: chartColors.charcoal }} />
              <span style={{ color: chartColors.gray }}>Target ({data.target})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
