"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Latency Percentiles data
const defaultData = {
  service: 'payment-api',
  timeRange: 'Last 6 hours',
  currentTime: '15:30 UTC',
  sloTargets: {
    p50: 50,
    p95: 150,
    p99: 300,
  },
  dataPoints: [
    { time: '9:00', p50: 42, p95: 125, p99: 245, requests: 950, errors: 1 },
    { time: '9:05', p50: 38, p95: 118, p99: 232, requests: 1020, errors: 0 },
    { time: '9:10', p50: 45, p95: 132, p99: 258, requests: 890, errors: 1 },
    { time: '9:15', p50: 41, p95: 122, p99: 241, requests: 1100, errors: 0 },
    { time: '9:20', p50: 39, p95: 115, p99: 228, requests: 980, errors: 0 },
    { time: '9:25', p50: 44, p95: 128, p99: 252, requests: 1050, errors: 1 },
    { time: '9:30', p50: 40, p95: 120, p99: 238, requests: 920, errors: 0 },
    { time: '9:35', p50: 43, p95: 126, p99: 248, requests: 1080, errors: 0 },
    { time: '9:40', p50: 37, p95: 112, p99: 225, requests: 960, errors: 0 },
    { time: '9:45', p50: 46, p95: 135, p99: 262, requests: 1000, errors: 1 },
    { time: '9:50', p50: 42, p95: 124, p99: 244, requests: 1120, errors: 0 },
    { time: '9:55', p50: 38, p95: 116, p99: 230, requests: 940, errors: 0 },
    { time: '10:00', p50: 41, p95: 121, p99: 240, requests: 1010, errors: 0 },
    { time: '10:05', p50: 44, p95: 129, p99: 254, requests: 980, errors: 1 },
    { time: '10:10', p50: 39, p95: 117, p99: 234, requests: 1060, errors: 0 },
    { time: '10:15', p50: 43, p95: 127, p99: 250, requests: 900, errors: 0 },
    { time: '10:20', p50: 40, p95: 119, p99: 236, requests: 1090, errors: 0 },
    { time: '10:25', p50: 45, p95: 133, p99: 260, requests: 970, errors: 1 },
    { time: '10:30', p50: 38, p95: 114, p99: 226, requests: 1040, errors: 0 },
    { time: '10:35', p50: 42, p95: 123, p99: 242, requests: 930, errors: 0 },
    { time: '10:40', p50: 41, p95: 120, p99: 238, requests: 1070, errors: 0 },
    { time: '10:45', p50: 44, p95: 130, p99: 256, requests: 990, errors: 1 },
    { time: '10:50', p50: 39, p95: 116, p99: 232, requests: 1100, errors: 0 },
    { time: '10:55', p50: 43, p95: 126, p99: 248, requests: 950, errors: 0 },
    { time: '11:00', p50: 40, p95: 118, p99: 235, requests: 1030, errors: 0 },
    { time: '11:05', p50: 46, p95: 136, p99: 264, requests: 910, errors: 1 },
    { time: '11:10', p50: 38, p95: 113, p99: 224, requests: 1080, errors: 0 },
    { time: '11:15', p50: 42, p95: 124, p99: 246, requests: 960, errors: 0 },
    { time: '11:20', p50: 41, p95: 121, p99: 240, requests: 1050, errors: 0 },
    { time: '11:25', p50: 45, p95: 132, p99: 258, requests: 920, errors: 1 },
    { time: '11:30', p50: 39, p95: 115, p99: 228, requests: 1000, errors: 0 },
    { time: '11:35', p50: 43, p95: 127, p99: 252, requests: 1110, errors: 0 },
    { time: '11:40', p50: 40, p95: 119, p99: 236, requests: 940, errors: 0 },
    { time: '11:45', p50: 44, p95: 129, p99: 254, requests: 1020, errors: 1 },
    { time: '11:50', p50: 38, p95: 114, p99: 226, requests: 970, errors: 0 },
    { time: '11:55', p50: 42, p95: 123, p99: 244, requests: 1060, errors: 0 },
    { time: '12:00', p50: 41, p95: 120, p99: 238, requests: 900, errors: 0 },
    { time: '12:05', p50: 45, p95: 133, p99: 260, requests: 1090, errors: 1 },
    { time: '12:10', p50: 39, p95: 116, p99: 232, requests: 950, errors: 0 },
    { time: '12:15', p50: 43, p95: 126, p99: 250, requests: 1040, errors: 0 },
    { time: '12:20', p50: 40, p95: 118, p99: 234, requests: 980, errors: 0 },
    { time: '12:25', p50: 44, p95: 130, p99: 256, requests: 1070, errors: 1 },
    { time: '12:30', p50: 38, p95: 113, p99: 224, requests: 920, errors: 0 },
    { time: '12:35', p50: 42, p95: 124, p99: 246, requests: 1000, errors: 0 },
    { time: '12:40', p50: 41, p95: 121, p99: 240, requests: 1100, errors: 0 },
    // Anomaly period starts (12:45-13:20)
    { time: '12:45', p50: 95, p95: 285, p99: 580, requests: 1050, errors: 8 },
    { time: '12:50', p50: 102, p95: 310, p99: 625, requests: 960, errors: 12 },
    { time: '12:55', p50: 98, p95: 298, p99: 605, requests: 1020, errors: 10 },
    { time: '13:00', p50: 105, p95: 320, p99: 645, requests: 910, errors: 14 },
    { time: '13:05', p50: 100, p95: 305, p99: 615, requests: 980, errors: 11 },
    { time: '13:10', p50: 96, p95: 290, p99: 590, requests: 1040, errors: 9 },
    { time: '13:15', p50: 103, p95: 315, p99: 635, requests: 930, errors: 13 },
    { time: '13:20', p50: 99, p95: 300, p99: 610, requests: 1000, errors: 10 },
    // Anomaly ends, recovery
    { time: '13:25', p50: 48, p95: 140, p99: 275, requests: 1080, errors: 2 },
    { time: '13:30', p50: 43, p95: 127, p99: 252, requests: 950, errors: 1 },
    { time: '13:35', p50: 40, p95: 119, p99: 236, requests: 1020, errors: 0 },
    { time: '13:40', p50: 42, p95: 124, p99: 244, requests: 970, errors: 0 },
    { time: '13:45', p50: 39, p95: 116, p99: 230, requests: 1060, errors: 1 },
    { time: '13:50', p50: 44, p95: 130, p99: 256, requests: 910, errors: 0 },
    { time: '13:55', p50: 41, p95: 121, p99: 240, requests: 1000, errors: 0 },
    { time: '14:00', p50: 43, p95: 126, p99: 250, requests: 1090, errors: 0 },
    { time: '14:05', p50: 38, p95: 114, p99: 226, requests: 940, errors: 1 },
    { time: '14:10', p50: 42, p95: 123, p99: 244, requests: 1030, errors: 0 },
    { time: '14:15', p50: 40, p95: 118, p99: 234, requests: 980, errors: 0 },
    { time: '14:20', p50: 45, p95: 133, p99: 262, requests: 1070, errors: 1 },
    { time: '14:25', p50: 39, p95: 115, p99: 228, requests: 920, errors: 0 },
    { time: '14:30', p50: 43, p95: 127, p99: 252, requests: 1010, errors: 0 },
    { time: '14:35', p50: 41, p95: 120, p99: 238, requests: 960, errors: 0 },
    { time: '14:40', p50: 44, p95: 129, p99: 254, requests: 1050, errors: 1 },
    { time: '14:45', p50: 38, p95: 113, p99: 224, requests: 900, errors: 0 },
    { time: '14:50', p50: 42, p95: 124, p99: 246, requests: 1080, errors: 0 },
  ],
  anomalies: [
    { start: 45, end: 52, severity: 'warning', cause: 'Database connection pool saturation' }
  ],
  currentStats: {
    p50: 42,
    p95: 128,
    p99: 245,
    requestRate: 1247,
    errorRate: 0.12,
  }
};

interface LatencyPercentilesProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const LatencyPercentiles: React.FC<LatencyPercentilesProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Latency Percentiles"
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [showPercentile, setShowPercentile] = useState<'all' | 'p50' | 'p95' | 'p99'>('all');

  // Defensive guard - return null if missing required data
  if (!data || !data.currentStats || !data.sloTargets || !data.dataPoints) {
    console.warn('[LatencyPercentiles] Missing currentStats, sloTargets, or dataPoints for', data?.service);
    return null;
  }

  const margin = { top: 30, right: 50, bottom: 50, left: 50 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = 220;

  // Find max values
  const maxLatency = Math.max(...data.dataPoints.map(d => d.p99)) * 1.1;
  const maxRequests = Math.max(...data.dataPoints.map(d => d.requests)) * 1.1;

  // Scales
  const xScale = (i: number) => (i / (data.dataPoints.length - 1)) * chartWidth;
  const yScale = (v: number) => chartHeight - (v / maxLatency) * chartHeight;
  const yScaleReq = (v: number) => chartHeight - (v / maxRequests) * chartHeight;

  // Generate path
  const generatePath = (key: 'p50' | 'p95' | 'p99') => {
    return data.dataPoints.map((d, i) => 
      `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d[key])}`
    ).join(' ');
  };

  // Status indicators
  const getStatus = (value: number, target: number) => {
    if (value > target * 1.2) return { color: chartColors.dark, label: 'Critical' };
    if (value > target) return { color: chartColors.secondary, label: 'Warning' };
    return { color: chartColors.primary, label: 'Healthy' };
  };

  const percentileColors = {
    p50: chartColors.primary,
    p95: chartColors.secondary, 
    p99: chartColors.dark,
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Current Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '16px' }}>
        {(['p50', 'p95', 'p99'] as const).map((p) => {
          const current = data.currentStats?.[p] ?? 0;
          const target = data.sloTargets?.[p] ?? 0;
          const status = getStatus(current, target);
          return (
            <div key={p} style={{ 
              padding: '12px', 
              backgroundColor: `${status.color}10`,
              borderRadius: '10px',
              borderLeft: `4px solid ${status.color}`
            }}>
              <div style={{ fontSize: '10px', color: chartColors.gray, textTransform: 'uppercase' }}>{p}</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: status.color }}>
                {current}
              </div>
              <div style={{ fontSize: '9px', color: chartColors.gray }}>
                SLO: {target}ms
              </div>
            </div>
          );
        })}
        <div style={{ padding: '12px', backgroundColor: chartColors.background, borderRadius: '10px' }}>
          <div style={{ fontSize: '10px', color: chartColors.gray }}>Requests/s</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.charcoal }}>
            {data.currentStats?.requestRate ?? 0}
          </div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.background, borderRadius: '10px' }}>
          <div style={{ fontSize: '10px', color: chartColors.gray }}>Error Rate</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: (data.currentStats?.errorRate ?? 0) > 1 ? chartColors.dark : chartColors.charcoal }}>
            {data.currentStats?.errorRate ?? 0}%
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        border: `1px solid ${chartColors.light}`,
        padding: '16px'
      }}>
        <svg width={width - 32} height={chartHeight + 60} style={{ overflow: 'visible' }}>
          <defs>
            {/* Anomaly gradient */}
            <linearGradient id="anomaly-bg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={chartColors.dark} stopOpacity={0.15} />
              <stop offset="100%" stopColor={chartColors.dark} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
              <g key={i}>
                <line
                  x1={0}
                  y1={chartHeight * ratio}
                  x2={chartWidth}
                  y2={chartHeight * ratio}
                  stroke={chartColors.light}
                />
                <text
                  x={-8}
                  y={chartHeight * ratio + 4}
                  textAnchor="end"
                  fontSize={9}
                  fill={chartColors.gray}
                >
                  {Math.round(maxLatency * (1 - ratio))}ms
                </text>
              </g>
            ))}

            {/* Anomaly regions */}
            {data.anomalies.map((anomaly, i) => (
              <rect
                key={i}
                x={xScale(anomaly.start)}
                y={0}
                width={xScale(anomaly.end) - xScale(anomaly.start)}
                height={chartHeight}
                fill="url(#anomaly-bg)"
              />
            ))}

            {/* SLO target lines */}
            {Object.entries(data.sloTargets).map(([key, value]) => (
              (showPercentile === 'all' || showPercentile === key) && (
                <g key={key}>
                  <line
                    x1={0}
                    y1={yScale(value)}
                    x2={chartWidth}
                    y2={yScale(value)}
                    stroke={percentileColors[key as keyof typeof percentileColors]}
                    strokeWidth={1}
                    strokeDasharray="6,4"
                    opacity={0.5}
                  />
                </g>
              )
            ))}

            {/* P99 line */}
            {(showPercentile === 'all' || showPercentile === 'p99') && (
              <path
                d={generatePath('p99')}
                fill="none"
                stroke={percentileColors.p99}
                strokeWidth={2}
              />
            )}

            {/* P95 line */}
            {(showPercentile === 'all' || showPercentile === 'p95') && (
              <path
                d={generatePath('p95')}
                fill="none"
                stroke={percentileColors.p95}
                strokeWidth={2}
              />
            )}

            {/* P50 line */}
            {(showPercentile === 'all' || showPercentile === 'p50') && (
              <path
                d={generatePath('p50')}
                fill="none"
                stroke={percentileColors.p50}
                strokeWidth={2}
              />
            )}

            {/* Hover areas */}
            {data.dataPoints.map((d, i) => (
              <g key={i}>
                <rect
                  x={xScale(i) - chartWidth / data.dataPoints.length / 2}
                  y={0}
                  width={chartWidth / data.dataPoints.length}
                  height={chartHeight}
                  fill="transparent"
                  onMouseEnter={() => setHoveredPoint(i)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  style={{ cursor: 'crosshair' }}
                />
                
                {hoveredPoint === i && (
                  <g>
                    <line
                      x1={xScale(i)}
                      y1={0}
                      x2={xScale(i)}
                      y2={chartHeight}
                      stroke={chartColors.charcoal}
                      strokeWidth={1}
                      strokeDasharray="4,4"
                    />
                    
                    {/* Tooltip */}
                    <rect
                      x={xScale(i) - 50}
                      y={-25}
                      width={100}
                      height={72}
                      rx={6}
                      fill={chartColors.charcoal}
                    />
                    <text x={xScale(i)} y={-8} textAnchor="middle" fontSize={9} fontWeight={600} fill="white">
                      {d.time}
                    </text>
                    <text x={xScale(i) - 40} y={8} fontSize={8} fill={chartColors.primary}>p50: {d.p50}ms</text>
                    <text x={xScale(i) - 40} y={20} fontSize={8} fill={chartColors.secondary}>p95: {d.p95}ms</text>
                    <text x={xScale(i) - 40} y={32} fontSize={8} fill={chartColors.dark}>p99: {d.p99}ms</text>
                    <text x={xScale(i) - 40} y={44} fontSize={8} fill={chartColors.secondary}>{d.requests} req/s</text>
                    
                    {/* Data points */}
                    {(showPercentile === 'all' || showPercentile === 'p50') && (
                      <circle cx={xScale(i)} cy={yScale(d.p50)} r={4} fill={percentileColors.p50} stroke="white" strokeWidth={2} />
                    )}
                    {(showPercentile === 'all' || showPercentile === 'p95') && (
                      <circle cx={xScale(i)} cy={yScale(d.p95)} r={4} fill={percentileColors.p95} stroke="white" strokeWidth={2} />
                    )}
                    {(showPercentile === 'all' || showPercentile === 'p99') && (
                      <circle cx={xScale(i)} cy={yScale(d.p99)} r={4} fill={percentileColors.p99} stroke="white" strokeWidth={2} />
                    )}
                  </g>
                )}
              </g>
            ))}

            {/* X axis labels */}
            {data.dataPoints.filter((_, i) => i % 12 === 0).map((d, i) => (
              <text
                key={i}
                x={xScale(i * 12)}
                y={chartHeight + 20}
                textAnchor="middle"
                fontSize={9}
                fill={chartColors.gray}
              >
                {d.time}
              </text>
            ))}
          </g>
        </svg>
      </div>

      {/* Anomaly Alert */}
      {data.anomalies.length > 0 && (
        <div style={{ 
          marginTop: '12px',
          padding: '10px 16px',
          backgroundColor: chartColors.light,
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px' }}>⚠️</span>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.dark }}>
                Anomaly Detected: {data.anomalies[0].cause}
              </div>
              <div style={{ fontSize: '10px', color: chartColors.navy }}>
                Duration: ~{(data.anomalies[0].end - data.anomalies[0].start) * 5} minutes
              </div>
            </div>
          </div>
          <button style={{
            padding: '6px 12px',
            fontSize: '10px',
            backgroundColor: chartColors.dark,
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Investigate
          </button>
        </div>
      )}

      {/* Legend */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        gap: '16px',
        fontSize: '10px'
      }}>
        {Object.entries(percentileColors).map(([key, color]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '16px', height: '3px', backgroundColor: color }} />
            <span style={{ color: chartColors.charcoalLight, textTransform: 'uppercase' }}>{key}</span>
            <span style={{ color: chartColors.gray }}>(SLO: {data.sloTargets[key as keyof typeof data.sloTargets]}ms)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatencyPercentiles;
