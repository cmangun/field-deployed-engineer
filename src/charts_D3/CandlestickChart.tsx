"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample candlestick data (OHLC)
const defaultData = [
  { date: 'Jan 1', open: 100, high: 108, low: 98, close: 105 },
  { date: 'Jan 2', open: 105, high: 112, low: 103, close: 110 },
  { date: 'Jan 3', open: 110, high: 115, low: 105, close: 108 },
  { date: 'Jan 4', open: 108, high: 110, low: 100, close: 102 },
  { date: 'Jan 5', open: 102, high: 106, low: 98, close: 104 },
  { date: 'Jan 8', open: 104, high: 112, low: 102, close: 111 },
  { date: 'Jan 9', open: 111, high: 118, low: 109, close: 116 },
  { date: 'Jan 10', open: 116, high: 120, low: 114, close: 118 },
  { date: 'Jan 11', open: 118, high: 122, low: 112, close: 114 },
  { date: 'Jan 12', open: 114, high: 116, low: 108, close: 110 },
  { date: 'Jan 15', open: 110, high: 115, low: 106, close: 113 },
  { date: 'Jan 16', open: 113, high: 120, low: 111, close: 119 },
  { date: 'Jan 17', open: 119, high: 125, low: 117, close: 122 },
  { date: 'Jan 18', open: 122, high: 128, low: 120, close: 126 },
  { date: 'Jan 19', open: 126, high: 130, low: 122, close: 124 },
];

interface CandlestickChartProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({
  data = defaultData,
  width = 700,
  height = 350,
  title = "Candlestick Chart"
}) => {
  const [hoveredCandle, setHoveredCandle] = useState<number | null>(null);

  const margin = { top: 20, right: 50, bottom: 40, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Calculate scales
  const allPrices = data.flatMap(d => [d.high, d.low]);
  const minPrice = Math.min(...allPrices) * 0.98;
  const maxPrice = Math.max(...allPrices) * 1.02;

  const candleWidth = (innerWidth / data.length) * 0.7;
  const candleGap = (innerWidth / data.length) * 0.15;

  const yScale = (v: number) => innerHeight - ((v - minPrice) / (maxPrice - minPrice)) * innerHeight;

  // Price ticks
  const priceRange = maxPrice - minPrice;
  const tickCount = 5;
  const priceTicks = Array.from({ length: tickCount + 1 }, (_, i) => 
    minPrice + (priceRange / tickCount) * i
  );

  // Colors
  const upColor = chartColors.teal;
  const downColor = chartColors.dark;

  return (
    <div style={{ width: '100%' }}>
      {/* SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: 'white', borderRadius: '8px' }}
        onMouseLeave={() => setHoveredCandle(null)}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid lines */}
          {priceTicks.map((tick, i) => (
            <g key={i}>
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
                ${tick.toFixed(0)}
              </text>
            </g>
          ))}

          {/* Candlesticks */}
          {data.map((d, i) => {
            const isHovered = hoveredCandle === i;
            const isUp = d.close >= d.open;
            const color = isUp ? upColor : downColor;
            
            const x = i * (candleWidth + candleGap * 2) + candleGap;
            const bodyTop = yScale(Math.max(d.open, d.close));
            const bodyBottom = yScale(Math.min(d.open, d.close));
            const bodyHeight = Math.max(1, bodyBottom - bodyTop);
            
            return (
              <g key={i} onMouseEnter={() => setHoveredCandle(i)}>
                {/* Wick (high-low line) */}
                <line
                  x1={x + candleWidth / 2}
                  x2={x + candleWidth / 2}
                  y1={yScale(d.high)}
                  y2={yScale(d.low)}
                  stroke={color}
                  strokeWidth={isHovered ? 2 : 1}
                />
                
                {/* Body */}
                <rect
                  x={x}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={isUp ? 'white' : color}
                  stroke={color}
                  strokeWidth={isHovered ? 2 : 1}
                  rx={2}
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <title>{`${d.date}\nO: $${d.open} H: $${d.high}\nL: $${d.low} C: $${d.close}`}</title>
                </rect>

                {/* X-axis labels (every 3rd) */}
                {i % 3 === 0 && (
                  <text
                    x={x + candleWidth / 2}
                    y={innerHeight + 20}
                    textAnchor="middle"
                    fontSize={9}
                    fill={isHovered ? chartColors.charcoal : chartColors.gray}
                    fontWeight={isHovered ? 600 : 400}
                  >
                    {d.date}
                  </text>
                )}
              </g>
            );
          })}

          {/* Current price line */}
          {data.length > 0 && (
            <g>
              <line
                x1={0}
                x2={innerWidth}
                y1={yScale(data[data.length - 1].close)}
                y2={yScale(data[data.length - 1].close)}
                stroke={chartColors.charcoal}
                strokeWidth={1}
                strokeDasharray="6,3"
              />
              <rect
                x={innerWidth + 4}
                y={yScale(data[data.length - 1].close) - 10}
                width={40}
                height={20}
                fill={chartColors.charcoal}
                rx={3}
              />
              <text
                x={innerWidth + 24}
                y={yScale(data[data.length - 1].close)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={10}
                fontWeight={600}
                fill="white"
              >
                ${data[data.length - 1].close}
              </text>
            </g>
          )}
        </g>
      </svg>

      {/* Legend & Stats */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        justifyContent: 'space-between',
        fontSize: '11px',
        padding: '12px',
        backgroundColor: chartColors.background,
        borderRadius: '8px'
      }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ 
              width: '14px', 
              height: '14px', 
              backgroundColor: 'white',
              border: `2px solid ${upColor}`,
              borderRadius: '2px' 
            }} />
            <span style={{ color: upColor }}>Bullish</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ 
              width: '14px', 
              height: '14px', 
              backgroundColor: downColor,
              borderRadius: '2px' 
            }} />
            <span style={{ color: downColor }}>Bearish</span>
          </div>
        </div>
        
        {hoveredCandle !== null && (
          <div style={{ display: 'flex', gap: '16px' }}>
            <span><strong>{data[hoveredCandle].date}</strong></span>
            <span>O: ${data[hoveredCandle].open}</span>
            <span>H: ${data[hoveredCandle].high}</span>
            <span>L: ${data[hoveredCandle].low}</span>
            <span>C: ${data[hoveredCandle].close}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandlestickChart;
