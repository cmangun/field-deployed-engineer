"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Rx Adoption Curve data
const defaultData = {
  drugName: 'NEXAGEN™',
  launchDate: 'October 2026',
  weeksPostLaunch: 12,
  weeklyData: [
    { week: 1, trx: 245, nrx: 245, refills: 0, marketShare: 0.8 },
    { week: 2, trx: 520, nrx: 380, refills: 140, marketShare: 1.7 },
    { week: 3, trx: 890, nrx: 520, refills: 370, marketShare: 2.9 },
    { week: 4, trx: 1340, nrx: 680, refills: 660, marketShare: 4.4 },
    { week: 5, trx: 1920, nrx: 820, refills: 1100, marketShare: 6.3 },
    { week: 6, trx: 2580, nrx: 950, refills: 1630, marketShare: 8.5 },
    { week: 7, trx: 3320, nrx: 1080, refills: 2240, marketShare: 10.9 },
    { week: 8, trx: 4150, nrx: 1200, refills: 2950, marketShare: 13.6 },
    { week: 9, trx: 5050, nrx: 1350, refills: 3700, marketShare: 16.6 },
    { week: 10, trx: 5980, nrx: 1480, refills: 4500, marketShare: 19.6 },
    { week: 11, trx: 6950, nrx: 1580, refills: 5370, marketShare: 22.8 },
    { week: 12, trx: 7980, nrx: 1680, refills: 6300, marketShare: 26.2 },
  ],
  benchmarks: {
    launchExcellence: { week12TRx: 6000, status: 'exceeded' },
    peakShare: { target: 25, current: 26.2, status: 'on-track' },
    nrxGrowth: { target: 15, current: 18, status: 'exceeded' },
  },
  competitors: [
    { name: 'KEYTRUDA', week12Share: 42 },
    { name: 'OPDIVO', week12Share: 18 },
    { name: 'IMFINZI', week12Share: 10 },
  ],
  channels: {
    specialty: 65,
    retail: 25,
    mailOrder: 10,
  }
};

interface RxAdoptionCurveProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const RxAdoptionCurve: React.FC<RxAdoptionCurveProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Rx Adoption Curve"
}) => {
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);
  const [showMetric, setShowMetric] = useState<'trx' | 'nrx' | 'share'>('trx');

  const margin = { top: 50, right: 60, bottom: 80, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Scales
  const maxTRx = Math.max(...data.weeklyData.map(d => d.trx)) * 1.1;
  const maxShare = Math.max(...data.weeklyData.map(d => d.marketShare)) * 1.2;
  
  const xScale = (week: number) => ((week - 1) / (data.weeklyData.length - 1)) * innerWidth;
  const yScaleTRx = (value: number) => innerHeight - (value / maxTRx) * innerHeight;
  const yScaleShare = (value: number) => innerHeight - (value / maxShare) * innerHeight;

  // Generate path
  const generatePath = (metric: 'trx' | 'nrx' | 'refills') => {
    return data.weeklyData.map((d, i) => {
      const x = xScale(d.week);
      const y = yScaleTRx(d[metric]);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');
  };

  // Generate area path
  const generateAreaPath = (metric: 'trx' | 'nrx' | 'refills') => {
    const linePath = data.weeklyData.map((d, i) => {
      const x = xScale(d.week);
      const y = yScaleTRx(d[metric]);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');
    
    return `${linePath} L${innerWidth},${innerHeight} L0,${innerHeight} Z`;
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Key Metrics */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '16px'
      }}>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '10px' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.primary }}>
            {data.weeklyData[data.weeklyData.length - 1].trx.toLocaleString()}
          </div>
          <div style={{ fontSize: '10px', color: chartColors.navy }}>Week {data.weeksPostLaunch} TRx</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '10px' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.primary }}>
            {data.weeklyData[data.weeklyData.length - 1].nrx.toLocaleString()}
          </div>
          <div style={{ fontSize: '10px', color: chartColors.navy }}>Week {data.weeksPostLaunch} NRx</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '10px' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.navy }}>
            {data.weeklyData[data.weeklyData.length - 1].marketShare}%
          </div>
          <div style={{ fontSize: '10px', color: chartColors.navy }}>Market Share</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '10px' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.secondary }}>
            {Math.round((data.weeklyData[data.weeklyData.length - 1].refills / data.weeklyData[data.weeklyData.length - 1].trx) * 100)}%
          </div>
          <div style={{ fontSize: '10px', color: chartColors.dark }}>Refill Rate</div>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: 'white', borderRadius: '12px', border: `1px solid ${chartColors.light}` }}
      >
        <defs>
          <linearGradient id="trx-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={chartColors.primary} stopOpacity={0.3} />
            <stop offset="100%" stopColor={chartColors.primary} stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="nrx-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={chartColors.primary} stopOpacity={0.3} />
            <stop offset="100%" stopColor={chartColors.primary} stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <g key={i}>
              <line
                x1={0}
                y1={innerHeight * ratio}
                x2={innerWidth}
                y2={innerHeight * ratio}
                stroke={chartColors.light}
                strokeWidth={1}
              />
              <text
                x={-10}
                y={innerHeight * ratio + 4}
                textAnchor="end"
                fontSize={9}
                fill={chartColors.gray}
              >
                {showMetric === 'share' 
                  ? `${Math.round(maxShare * (1 - ratio))}%`
                  : Math.round(maxTRx * (1 - ratio)).toLocaleString()
                }
              </text>
            </g>
          ))}

          {/* X axis labels */}
          {data.weeklyData.filter((_, i) => i % 2 === 0).map((d) => (
            <text
              key={d.week}
              x={xScale(d.week)}
              y={innerHeight + 20}
              textAnchor="middle"
              fontSize={9}
              fill={chartColors.gray}
            >
              W{d.week}
            </text>
          ))}

          {/* TRx Area and Line */}
          {showMetric !== 'share' && (
            <>
              <path
                d={generateAreaPath('trx')}
                fill="url(#trx-gradient)"
              />
              <path
                d={generatePath('trx')}
                fill="none"
                stroke={chartColors.primary}
                strokeWidth={3}
              />
            </>
          )}

          {/* NRx Line */}
          {showMetric !== 'share' && (
            <>
              <path
                d={generateAreaPath('nrx')}
                fill="url(#nrx-gradient)"
              />
              <path
                d={generatePath('nrx')}
                fill="none"
                stroke={chartColors.primary}
                strokeWidth={2}
                strokeDasharray="6,3"
              />
            </>
          )}

          {/* Market Share Line */}
          {showMetric === 'share' && (
            <path
              d={data.weeklyData.map((d, i) => {
                const x = xScale(d.week);
                const y = yScaleShare(d.marketShare);
                return `${i === 0 ? 'M' : 'L'}${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke={chartColors.navy}
              strokeWidth={3}
            />
          )}

          {/* Data points */}
          {data.weeklyData.map((d, i) => {
            const x = xScale(d.week);
            const y = showMetric === 'share' ? yScaleShare(d.marketShare) : yScaleTRx(d.trx);
            const isHovered = hoveredWeek === d.week;
            
            return (
              <g
                key={d.week}
                onMouseEnter={() => setHoveredWeek(d.week)}
                onMouseLeave={() => setHoveredWeek(null)}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 8 : 5}
                  fill={showMetric === 'share' ? chartColors.navy : chartColors.primary}
                  stroke="white"
                  strokeWidth={2}
                  style={{ cursor: 'pointer' }}
                />
                
                {isHovered && (
                  <g>
                    <rect
                      x={x - 45}
                      y={y - 55}
                      width={90}
                      height={45}
                      rx={6}
                      fill={chartColors.charcoal}
                    />
                    <text x={x} y={y - 38} textAnchor="middle" fontSize={9} fontWeight={600} fill="white">
                      Week {d.week}
                    </text>
                    <text x={x} y={y - 24} textAnchor="middle" fontSize={9} fill={chartColors.secondary}>
                      TRx: {d.trx.toLocaleString()} | NRx: {d.nrx.toLocaleString()}
                    </text>
                    <text x={x} y={y - 12} textAnchor="middle" fontSize={9} fill={chartColors.secondary}>
                      Share: {d.marketShare}%
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Benchmark line */}
          {showMetric !== 'share' && (
            <g>
              <line
                x1={0}
                y1={yScaleTRx(data.benchmarks.launchExcellence.week12TRx)}
                x2={innerWidth}
                y2={yScaleTRx(data.benchmarks.launchExcellence.week12TRx)}
                stroke={chartColors.secondary}
                strokeWidth={2}
                strokeDasharray="8,4"
              />
              <text
                x={innerWidth + 5}
                y={yScaleTRx(data.benchmarks.launchExcellence.week12TRx) + 4}
                fontSize={9}
                fill={chartColors.secondary}
              >
                Target
              </text>
            </g>
          )}

          {/* Axis labels */}
          <text
            x={innerWidth / 2}
            y={innerHeight + 40}
            textAnchor="middle"
            fontSize={11}
            fontWeight={500}
            fill={chartColors.charcoalLight}
          >
            Weeks Post-Launch
          </text>
          <text
            transform={`rotate(-90)`}
            x={-innerHeight / 2}
            y={-40}
            textAnchor="middle"
            fontSize={11}
            fontWeight={500}
            fill={chartColors.charcoalLight}
          >
            {showMetric === 'share' ? 'Market Share (%)' : 'Prescriptions'}
          </text>
        </g>
      </svg>

      {/* Channel Distribution */}
      <div style={{ 
        marginTop: '16px',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '16px'
      }}>
        {/* Channel Mix */}
        <div style={{ 
          padding: '12px 16px',
          backgroundColor: chartColors.background,
          borderRadius: '10px',
          border: `1px solid ${chartColors.light}`
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
            Channel Distribution
          </div>
          <div style={{ display: 'flex', height: '20px', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ flex: data.channels.specialty, backgroundColor: chartColors.primary }} />
            <div style={{ flex: data.channels.retail, backgroundColor: chartColors.primary }} />
            <div style={{ flex: data.channels.mailOrder, backgroundColor: chartColors.navy }} />
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: chartColors.primary }} />
              <span style={{ fontSize: '10px', color: chartColors.gray }}>Specialty ({data.channels.specialty}%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: chartColors.primary }} />
              <span style={{ fontSize: '10px', color: chartColors.gray }}>Retail ({data.channels.retail}%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: chartColors.navy }} />
              <span style={{ fontSize: '10px', color: chartColors.gray }}>Mail ({data.channels.mailOrder}%)</span>
            </div>
          </div>
        </div>

        {/* Competitive Context */}
        <div style={{ 
          padding: '12px 16px',
          backgroundColor: chartColors.background,
          borderRadius: '10px',
          border: `1px solid ${chartColors.light}`
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
            Week 12 Share vs Competitors
          </div>
          {data.competitors.map((comp, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '10px', color: chartColors.gray, width: '70px' }}>{comp.name}</span>
              <div style={{ flex: 1, height: '6px', backgroundColor: chartColors.light, borderRadius: '3px' }}>
                <div style={{ width: `${comp.week12Share}%`, height: '100%', backgroundColor: chartColors.secondary, borderRadius: '3px' }} />
              </div>
              <span style={{ fontSize: '10px', color: chartColors.charcoal, width: '30px' }}>{comp.week12Share}%</span>
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
          <div style={{ width: '16px', height: '3px', backgroundColor: chartColors.primary }} />
          <span style={{ color: chartColors.charcoalLight }}>TRx (Total Rx)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '16px', height: '2px', backgroundColor: chartColors.primary, backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, chartColors.background 3px, chartColors.background 6px)' }} />
          <span style={{ color: chartColors.charcoalLight }}>NRx (New Rx)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '16px', height: '2px', backgroundColor: chartColors.secondary, backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, chartColors.background 4px, chartColors.background 8px)' }} />
          <span style={{ color: chartColors.charcoalLight }}>Target</span>
        </div>
      </div>
    </div>
  );
};

export default RxAdoptionCurve;
