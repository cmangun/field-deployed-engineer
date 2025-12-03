"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sales Forecast data
const defaultData = {
  quarter: 'Q4 2024',
  asOfDate: 'Nov 15, 2024',
  quota: 4500000,
  closed: 2850000,
  forecast: {
    commit: 3650000,
    bestCase: 4200000,
    pipeline: 4850000,
  },
  reps: [
    { id: 'r1', name: 'Sarah Chen', quota: 750000, closed: 520000, commit: 680000, bestCase: 750000, pipeline: 890000, avatar: 'SC' },
    { id: 'r2', name: 'Mike Johnson', quota: 750000, closed: 485000, commit: 620000, bestCase: 720000, pipeline: 850000, avatar: 'MJ' },
    { id: 'r3', name: 'Lisa Wong', quota: 600000, closed: 380000, commit: 480000, bestCase: 560000, pipeline: 680000, avatar: 'LW' },
    { id: 'r4', name: 'David Park', quota: 600000, closed: 420000, commit: 540000, bestCase: 620000, pipeline: 720000, avatar: 'DP' },
    { id: 'r5', name: 'Alex Kim', quota: 500000, closed: 310000, commit: 420000, bestCase: 480000, pipeline: 580000, avatar: 'AK' },
    { id: 'r6', name: 'Emma Davis', quota: 500000, closed: 280000, commit: 380000, bestCase: 450000, pipeline: 540000, avatar: 'ED' },
    { id: 'r7', name: 'James Lee', quota: 400000, closed: 245000, commit: 310000, bestCase: 360000, pipeline: 420000, avatar: 'JL' },
    { id: 'r8', name: 'Rachel Green', quota: 400000, closed: 210000, commit: 280000, bestCase: 320000, pipeline: 380000, avatar: 'RG' },
  ],
  weeklyTrend: [
    { week: 'W1', commit: 2200000, bestCase: 2800000, pipeline: 3400000 },
    { week: 'W2', commit: 2450000, bestCase: 3100000, pipeline: 3700000 },
    { week: 'W3', commit: 2800000, bestCase: 3400000, pipeline: 4000000 },
    { week: 'W4', commit: 3100000, bestCase: 3700000, pipeline: 4300000 },
    { week: 'W5', commit: 3400000, bestCase: 4000000, pipeline: 4600000 },
    { week: 'W6', commit: 3650000, bestCase: 4200000, pipeline: 4850000 },
  ],
  dealCategories: [
    { category: 'Commit', deals: 28, value: 3650000, probability: 95 },
    { category: 'Best Case', deals: 15, value: 550000, probability: 65 },
    { category: 'Pipeline', deals: 22, value: 650000, probability: 30 },
  ],
};

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

interface SalesForecastProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const SalesForecast: React.FC<SalesForecastProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Sales Forecast"
}) => {
  const [viewMode, setViewMode] = useState<'summary' | 'byRep' | 'trend'>('summary');
  const [selectedRep, setSelectedRep] = useState<string | null>(null);

  const quotaAttainment = (data.closed / data.quota) * 100;
  const commitAttainment = (data.forecast.commit / data.quota) * 100;
  const gap = data.quota - data.forecast.commit;

  return (
    <div style={{ width: '100%' }}>
      {/* Forecast Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center', border: `2px solid ${chartColors.primary}` }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>{formatCurrency(data.closed)}</div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>Closed Won</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>{formatCurrency(data.forecast.commit)}</div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>Commit</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.secondary }}>{formatCurrency(data.forecast.bestCase)}</div>
          <div style={{ fontSize: '9px', color: chartColors.dark }}>Best Case</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>{formatCurrency(data.forecast.pipeline)}</div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>Pipeline</div>
        </div>
      </div>

      {/* Quota Progress */}
      <div style={{ padding: '12px 16px', backgroundColor: chartColors.background, borderRadius: '10px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>
            Quota: {formatCurrency(data.quota)}
          </span>
          <span style={{ fontSize: '11px', color: gap > 0 ? chartColors.dark : chartColors.primary }}>
            {gap > 0 ? `Gap: ${formatCurrency(gap)}` : `Surplus: ${formatCurrency(Math.abs(gap))}`}
          </span>
        </div>
        <div style={{ height: '24px', backgroundColor: chartColors.light, borderRadius: '6px', position: 'relative' }}>
          {/* Closed bar */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: `${Math.min(100, quotaAttainment)}%`,
            height: '100%',
            backgroundColor: chartColors.primary,
            borderRadius: '6px 0 0 6px'
          }} />
          {/* Commit delta */}
          <div style={{
            position: 'absolute',
            left: `${quotaAttainment}%`,
            top: 0,
            width: `${Math.min(100 - quotaAttainment, commitAttainment - quotaAttainment)}%`,
            height: '100%',
            backgroundColor: chartColors.light,
            borderRadius: commitAttainment >= 100 ? '0 6px 6px 0' : '0'
          }} />
          {/* 100% marker */}
          <div style={{
            position: 'absolute',
            left: '100%',
            top: '-4px',
            transform: 'translateX(-50%)',
            width: '2px',
            height: '32px',
            backgroundColor: chartColors.charcoal
          }} />
          {/* Labels */}
          <div style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', fontWeight: 600, color: 'white' }}>
            {quotaAttainment.toFixed(0)}% closed
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '9px', color: chartColors.gray }}>
          <span>0%</span>
          <span>Commit: {commitAttainment.toFixed(0)}%</span>
          <span>100%</span>
        </div>
      </div>

      {viewMode === 'summary' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Deal Categories */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              DEAL BREAKDOWN
            </div>
            {data.dealCategories.map((cat) => (
              <div key={cat.category} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: chartColors.background,
                borderRadius: '8px',
                marginBottom: '8px'
              }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>{cat.category}</div>
                  <div style={{ fontSize: '9px', color: chartColors.gray }}>{cat.deals} deals • {cat.probability}% prob</div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: chartColors.charcoal }}>
                  {formatCurrency(cat.value)}
                </div>
              </div>
            ))}
          </div>

          {/* Top Performers */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              TOP PERFORMERS
            </div>
            {data.reps.sort((a, b) => (b.closed / b.quota) - (a.closed / a.quota)).slice(0, 4).map((rep, i) => {
              const attainment = (rep.closed / rep.quota) * 100;
              return (
                <div key={rep.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px',
                  backgroundColor: i === 0 ? chartColors.light : 'transparent',
                  borderRadius: '8px',
                  marginBottom: '4px'
                }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: chartColors.gray, width: '20px' }}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}
                  </span>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: chartColors.teal,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 600
                  }}>
                    {rep.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '10px', fontWeight: 600, color: chartColors.charcoal }}>{rep.name}</div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>{formatCurrency(rep.closed)} / {formatCurrency(rep.quota)}</div>
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: attainment >= 100 ? chartColors.primary : attainment >= 80 ? chartColors.secondary : chartColors.dark
                  }}>
                    {attainment.toFixed(0)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === 'byRep' && (
        <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
          {data.reps.map((rep) => {
            const attainment = (rep.closed / rep.quota) * 100;
            const commitPct = (rep.commit / rep.quota) * 100;
            const isSelected = selectedRep === rep.id;
            
            return (
              <div
                key={rep.id}
                onClick={() => setSelectedRep(isSelected ? null : rep.id)}
                style={{
                  padding: '12px',
                  backgroundColor: isSelected ? chartColors.background : 'white',
                  borderRadius: '10px',
                  border: `1px solid ${isSelected ? chartColors.teal : chartColors.light}`,
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: chartColors.teal,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      {rep.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>{rep.name}</div>
                      <div style={{ fontSize: '9px', color: chartColors.gray }}>Quota: {formatCurrency(rep.quota)}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: chartColors.primary }}>{formatCurrency(rep.closed)}</div>
                      <div style={{ fontSize: '8px', color: chartColors.gray }}>Closed</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: chartColors.charcoal }}>{formatCurrency(rep.commit)}</div>
                      <div style={{ fontSize: '8px', color: chartColors.gray }}>Commit</div>
                    </div>
                    <div style={{
                      padding: '6px 10px',
                      backgroundColor: attainment >= 100 ? chartColors.light : attainment >= 80 ? chartColors.light : chartColors.light,
                      color: attainment >= 100 ? chartColors.navy : attainment >= 80 ? chartColors.dark : chartColors.dark,
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 700
                    }}>
                      {attainment.toFixed(0)}%
                    </div>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div style={{ marginTop: '10px', height: '6px', backgroundColor: chartColors.light, borderRadius: '3px', position: 'relative' }}>
                  <div style={{
                    width: `${Math.min(100, attainment)}%`,
                    height: '100%',
                    backgroundColor: chartColors.primary,
                    borderRadius: '3px'
                  }} />
                  {commitPct > attainment && (
                    <div style={{
                      position: 'absolute',
                      left: `${attainment}%`,
                      width: `${Math.min(100 - attainment, commitPct - attainment)}%`,
                      height: '100%',
                      backgroundColor: chartColors.light,
                      borderRadius: '0 3px 3px 0'
                    }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'trend' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '16px' }}>
            FORECAST PROGRESSION
          </div>
          <svg width={width - 80} height={200}>
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((pct) => (
              <g key={pct}>
                <line
                  x1={40}
                  y1={180 - (pct / 100) * 160}
                  x2={width - 60}
                  y2={180 - (pct / 100) * 160}
                  stroke={chartColors.light}
                  strokeDasharray="3,3"
                />
                <text x={35} y={185 - (pct / 100) * 160} textAnchor="end" fontSize={8} fill={chartColors.gray}>
                  {formatCurrency((pct / 100) * data.quota)}
                </text>
              </g>
            ))}
            
            {/* Quota line */}
            <line x1={40} y1={20} x2={width - 60} y2={20} stroke={chartColors.charcoal} strokeWidth={2} strokeDasharray="6,3" />
            <text x={width - 55} y={24} fontSize={8} fill={chartColors.charcoal}>Quota</text>
            
            {/* Lines */}
            {['pipeline', 'bestCase', 'commit'].map((key, lineIndex) => {
              const colors = { pipeline: chartColors.primary, bestCase: chartColors.secondary, commit: chartColors.primary };
              const color = colors[key as keyof typeof colors];
              
              return (
                <path
                  key={key}
                  d={data.weeklyTrend.map((week, i) => {
                    const x = 60 + (i / (data.weeklyTrend.length - 1)) * (width - 140);
                    const y = 180 - (week[key as keyof typeof week] as number / data.quota) * 160;
                    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                />
              );
            })}
            
            {/* X-axis labels */}
            {data.weeklyTrend.map((week, i) => {
              const x = 60 + (i / (data.weeklyTrend.length - 1)) * (width - 140);
              return (
                <text key={week.week} x={x} y={195} textAnchor="middle" fontSize={8} fill={chartColors.gray}>
                  {week.week}
                </text>
              );
            })}
          </svg>
          
          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '8px', fontSize: '9px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '12px', height: '3px', backgroundColor: chartColors.primary }} />
              <span style={{ color: chartColors.gray }}>Commit</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '12px', height: '3px', backgroundColor: chartColors.secondary }} />
              <span style={{ color: chartColors.gray }}>Best Case</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '12px', height: '3px', backgroundColor: chartColors.primary }} />
              <span style={{ color: chartColors.gray }}>Pipeline</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesForecast;
