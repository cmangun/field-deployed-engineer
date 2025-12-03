"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Error Budget Tracker data
const defaultData = {
  service: 'Payment Service',
  sloTarget: 99.9,
  currentPeriod: 'November 2026',
  daysInPeriod: 30,
  daysPassed: 22,
  daysRemaining: 8,
  totalBudgetMinutes: 43.2, // 30 days * 24 hours * 60 min * 0.001
  consumedMinutes: 28.5,
  remainingMinutes: 14.7,
  burnRate: {
    current: 1.8, // x faster than sustainable
    sustainable: 1.0,
    threshold: 2.0, // alert threshold
  },
  dailyData: [
    { day: 1, consumed: 0.8, cumulative: 0.8, incidents: 0 },
    { day: 2, consumed: 0.5, cumulative: 1.3, incidents: 0 },
    { day: 3, consumed: 1.2, cumulative: 2.5, incidents: 1 },
    { day: 4, consumed: 0.6, cumulative: 3.1, incidents: 0 },
    { day: 5, consumed: 0.4, cumulative: 3.5, incidents: 0 },
    { day: 6, consumed: 2.8, cumulative: 6.3, incidents: 1 },
    { day: 7, consumed: 0.9, cumulative: 7.2, incidents: 0 },
    { day: 8, consumed: 0.7, cumulative: 7.9, incidents: 0 },
    { day: 9, consumed: 1.1, cumulative: 9.0, incidents: 0 },
    { day: 10, consumed: 0.5, cumulative: 9.5, incidents: 0 },
    { day: 11, consumed: 3.5, cumulative: 13.0, incidents: 1 },
    { day: 12, consumed: 1.8, cumulative: 14.8, incidents: 0 },
    { day: 13, consumed: 0.6, cumulative: 15.4, incidents: 0 },
    { day: 14, consumed: 0.9, cumulative: 16.3, incidents: 0 },
    { day: 15, consumed: 1.2, cumulative: 17.5, incidents: 0 },
    { day: 16, consumed: 0.8, cumulative: 18.3, incidents: 0 },
    { day: 17, consumed: 2.1, cumulative: 20.4, incidents: 1 },
    { day: 18, consumed: 1.5, cumulative: 21.9, incidents: 0 },
    { day: 19, consumed: 1.8, cumulative: 23.7, incidents: 0 },
    { day: 20, consumed: 2.2, cumulative: 25.9, incidents: 1 },
    { day: 21, consumed: 1.4, cumulative: 27.3, incidents: 0 },
    { day: 22, consumed: 1.2, cumulative: 28.5, incidents: 0 },
  ],
  slis: [
    { name: 'Availability', target: 99.9, current: 99.87, status: 'at-risk' },
    { name: 'Latency p99', target: 200, current: 185, unit: 'ms', status: 'healthy' },
    { name: 'Error Rate', target: 0.1, current: 0.08, unit: '%', status: 'healthy' },
    { name: 'Throughput', target: 1000, current: 1250, unit: 'rps', status: 'healthy' },
  ],
  recentIncidents: [
    { id: 'INC-2847', date: 'Nov 20', duration: 12, impact: 2.2, cause: 'DB connection pool exhaustion' },
    { id: 'INC-2831', date: 'Nov 17', duration: 8, impact: 2.1, cause: 'Certificate expiration' },
    { id: 'INC-2815', date: 'Nov 11', duration: 18, impact: 3.5, cause: 'Upstream timeout cascade' },
  ],
  forecast: {
    projectedEnd: 38.2,
    willExhaust: false,
    exhaustDate: null,
    confidence: 72,
  }
};

interface ErrorBudgetTrackerProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const ErrorBudgetTracker: React.FC<ErrorBudgetTrackerProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Error Budget Tracker"
}) => {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const budgetUsedPercent = (data.consumedMinutes / data.totalBudgetMinutes) * 100;
  const budgetRemainingPercent = 100 - budgetUsedPercent;
  const timePassedPercent = (data.daysPassed / data.daysInPeriod) * 100;

  // Determine status
  const getStatus = () => {
    if (budgetUsedPercent > 90) return { label: 'CRITICAL', color: chartColors.dark, bg: chartColors.light };
    if (budgetUsedPercent > 75 || data.burnRate.current > data.burnRate.threshold) return { label: 'AT RISK', color: chartColors.secondary, bg: chartColors.light };
    return { label: 'HEALTHY', color: chartColors.primary, bg: chartColors.light };
  };
  const status = getStatus();

  const margin = { top: 40, right: 30, bottom: 40, left: 50 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = 160;

  // Scales
  const xScale = (day: number) => ((day - 1) / (data.daysInPeriod - 1)) * chartWidth;
  const yScale = (value: number) => chartHeight - (value / data.totalBudgetMinutes) * chartHeight;

  // Ideal burn line
  const idealBurnLine = data.dailyData.map((_, i) => ({
    day: i + 1,
    value: (data.totalBudgetMinutes / data.daysInPeriod) * (i + 1)
  }));

  return (
    <div style={{ width: '100%' }}>
      {/* Main Metrics */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '16px'
      }}>
        <div style={{ 
          padding: '16px',
          backgroundColor: budgetRemainingPercent < 25 ? chartColors.light : chartColors.light,
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: 700, 
            color: budgetRemainingPercent < 25 ? chartColors.dark : chartColors.primary 
          }}>
            {budgetRemainingPercent.toFixed(1)}%
          </div>
          <div style={{ fontSize: '10px', color: budgetRemainingPercent < 25 ? chartColors.dark : chartColors.navy }}>
            Budget Remaining
          </div>
        </div>
        
        <div style={{ padding: '16px', backgroundColor: chartColors.background, borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: chartColors.charcoal }}>
            {data.remainingMinutes.toFixed(1)}
          </div>
          <div style={{ fontSize: '10px', color: chartColors.gray }}>Minutes Left</div>
        </div>
        
        <div style={{ 
          padding: '16px', 
          backgroundColor: data.burnRate.current > data.burnRate.threshold ? chartColors.light : chartColors.background, 
          borderRadius: '12px', 
          textAlign: 'center' 
        }}>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: 700, 
            color: data.burnRate.current > data.burnRate.threshold ? chartColors.secondary : chartColors.charcoal 
          }}>
            {data.burnRate.current}x
          </div>
          <div style={{ fontSize: '10px', color: data.burnRate.current > data.burnRate.threshold ? chartColors.dark : chartColors.gray }}>
            Burn Rate
          </div>
        </div>
        
        <div style={{ padding: '16px', backgroundColor: chartColors.background, borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: chartColors.charcoal }}>
            {data.daysRemaining}
          </div>
          <div style={{ fontSize: '10px', color: chartColors.gray }}>Days Left</div>
        </div>
      </div>

      {/* Budget Bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>Error Budget</span>
          <span style={{ fontSize: '11px', color: chartColors.gray }}>
            {data.consumedMinutes.toFixed(1)} / {data.totalBudgetMinutes.toFixed(1)} min consumed
          </span>
        </div>
        <div style={{ position: 'relative', height: '24px', backgroundColor: chartColors.light, borderRadius: '12px', overflow: 'hidden' }}>
          {/* Consumed */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${budgetUsedPercent}%`,
            backgroundColor: status.color,
            borderRadius: '12px',
            transition: 'width 0.3s'
          }} />
          {/* Time marker */}
          <div style={{
            position: 'absolute',
            left: `${timePassedPercent}%`,
            top: 0,
            height: '100%',
            width: '2px',
            backgroundColor: chartColors.charcoal,
          }} />
          <div style={{
            position: 'absolute',
            left: `${timePassedPercent}%`,
            top: '-18px',
            transform: 'translateX(-50%)',
            fontSize: '9px',
            color: chartColors.charcoal,
            fontWeight: 600
          }}>
            Day {data.daysPassed}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          <span style={{ fontSize: '9px', color: chartColors.gray }}>Period Start</span>
          <span style={{ fontSize: '9px', color: chartColors.gray }}>Period End</span>
        </div>
      </div>

      {/* Burn Down Chart */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        border: `1px solid ${chartColors.light}`,
        padding: '16px',
        marginBottom: '16px'
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
          Budget Consumption Trend
        </div>
        
        <svg width={width - 32} height={chartHeight + 50} style={{ overflow: 'visible' }}>
          <g transform={`translate(${margin.left}, 10)`}>
            {/* Grid */}
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
                  fontSize={8}
                  fill={chartColors.gray}
                >
                  {Math.round(data.totalBudgetMinutes * (1 - ratio))}m
                </text>
              </g>
            ))}

            {/* Budget line (total) */}
            <line
              x1={0}
              y1={yScale(data.totalBudgetMinutes)}
              x2={chartWidth}
              y2={yScale(data.totalBudgetMinutes)}
              stroke={chartColors.dark}
              strokeWidth={2}
              strokeDasharray="6,4"
            />
            <text x={chartWidth + 5} y={yScale(data.totalBudgetMinutes) + 4} fontSize={8} fill={chartColors.dark}>
              Budget
            </text>

            {/* Ideal burn line */}
            <path
              d={idealBurnLine.map((d, i) => 
                `${i === 0 ? 'M' : 'L'}${xScale(d.day)},${yScale(d.value)}`
              ).join(' ')}
              fill="none"
              stroke={chartColors.secondary}
              strokeWidth={1}
              strokeDasharray="4,4"
            />

            {/* Actual consumption area */}
            <path
              d={`
                M${xScale(1)},${chartHeight}
                ${data.dailyData.map(d => `L${xScale(d.day)},${yScale(d.cumulative)}`).join(' ')}
                L${xScale(data.dailyData.length)},${chartHeight}
                Z
              `}
              fill={status.color}
              fillOpacity={0.1}
            />

            {/* Actual consumption line */}
            <path
              d={data.dailyData.map((d, i) => 
                `${i === 0 ? 'M' : 'L'}${xScale(d.day)},${yScale(d.cumulative)}`
              ).join(' ')}
              fill="none"
              stroke={status.color}
              strokeWidth={2}
            />

            {/* Data points */}
            {data.dailyData.map((d, i) => (
              <g key={i}>
                <circle
                  cx={xScale(d.day)}
                  cy={yScale(d.cumulative)}
                  r={hoveredDay === d.day ? 6 : (d.incidents > 0 ? 5 : 3)}
                  fill={d.incidents > 0 ? chartColors.dark : status.color}
                  stroke="white"
                  strokeWidth={2}
                  onMouseEnter={() => setHoveredDay(d.day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  style={{ cursor: 'pointer' }}
                />
                {hoveredDay === d.day && (
                  <g>
                    <rect
                      x={xScale(d.day) - 40}
                      y={yScale(d.cumulative) - 45}
                      width={80}
                      height={38}
                      rx={6}
                      fill={chartColors.charcoal}
                    />
                    <text x={xScale(d.day)} y={yScale(d.cumulative) - 30} textAnchor="middle" fontSize={9} fontWeight={600} fill="white">
                      Day {d.day}
                    </text>
                    <text x={xScale(d.day)} y={yScale(d.cumulative) - 18} textAnchor="middle" fontSize={8} fill={chartColors.secondary}>
                      +{d.consumed.toFixed(1)}m | Total: {d.cumulative.toFixed(1)}m
                    </text>
                  </g>
                )}
              </g>
            ))}

            {/* X axis labels */}
            {[1, 7, 14, 21, 28].map(day => (
              <text
                key={day}
                x={xScale(day)}
                y={chartHeight + 20}
                textAnchor="middle"
                fontSize={9}
                fill={chartColors.gray}
              >
                Day {day}
              </text>
            ))}
          </g>
        </svg>
      </div>

      {/* SLIs and Incidents */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* SLIs */}
        <div style={{ 
          padding: '12px',
          backgroundColor: chartColors.background,
          borderRadius: '10px',
          border: `1px solid ${chartColors.light}`
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '10px' }}>
            Service Level Indicators
          </div>
          {data.slis.map((sli, i) => {
            const isHealthy = sli.status === 'healthy';
            return (
              <div key={i} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '6px 0',
                borderBottom: i < data.slis.length - 1 ? `1px solid ${chartColors.light}` : 'none'
              }}>
                <span style={{ fontSize: '10px', color: chartColors.charcoalLight }}>{sli.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '10px', color: chartColors.gray }}>
                    Target: {sli.target}{sli.unit || '%'}
                  </span>
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: 600,
                    color: isHealthy ? chartColors.primary : chartColors.secondary
                  }}>
                    {sli.current}{sli.unit || '%'}
                  </span>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: isHealthy ? chartColors.primary : chartColors.secondary
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Incidents */}
        <div style={{ 
          padding: '12px',
          backgroundColor: chartColors.background,
          borderRadius: '10px',
          border: `1px solid ${chartColors.light}`
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '10px' }}>
            Recent Incidents
          </div>
          {data.recentIncidents.map((inc, i) => (
            <div key={i} style={{ 
              padding: '6px 0',
              borderBottom: i < data.recentIncidents.length - 1 ? `1px solid ${chartColors.light}` : 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontSize: '10px', fontWeight: 600, color: chartColors.dark }}>{inc.id}</span>
                <span style={{ fontSize: '9px', color: chartColors.gray }}>{inc.date} • {inc.duration}min</span>
              </div>
              <div style={{ fontSize: '9px', color: chartColors.charcoalLight }}>{inc.cause}</div>
              <div style={{ fontSize: '9px', color: chartColors.dark }}>Budget Impact: -{inc.impact}min</div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        gap: '16px',
        fontSize: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '12px', height: '3px', backgroundColor: status.color }} />
          <span style={{ color: chartColors.charcoalLight }}>Actual Consumption</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '12px', height: '1px', backgroundColor: chartColors.secondary, backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, chartColors.background 2px, chartColors.background 4px)' }} />
          <span style={{ color: chartColors.charcoalLight }}>Ideal Burn</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: chartColors.dark }} />
          <span style={{ color: chartColors.charcoalLight }}>Incident</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorBudgetTracker;
