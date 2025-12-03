"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Brand Health Tracker data
const defaultData = {
  period: 'Q4 2024',
  brandName: 'DataFlow AI',
  overallScore: 72,
  trend: 'up',
  metrics: {
    awareness: { score: 68, change: 5, benchmark: 65 },
    consideration: { score: 45, change: 8, benchmark: 42 },
    preference: { score: 32, change: 3, benchmark: 28 },
    nps: { score: 42, change: -2, benchmark: 35 },
    sentiment: { score: 78, change: 4, benchmark: 70 },
  },
  awarenessBreakdown: [
    { segment: 'Enterprise', aided: 82, unaided: 45 },
    { segment: 'Mid-Market', aided: 68, unaided: 28 },
    { segment: 'SMB', aided: 52, unaided: 15 },
  ],
  competitorComparison: [
    { name: 'DataFlow AI (Us)', awareness: 68, consideration: 45, nps: 42 },
    { name: 'Competitor A', awareness: 85, consideration: 52, nps: 38 },
    { name: 'Competitor B', awareness: 72, consideration: 48, nps: 35 },
    { name: 'Competitor C', awareness: 58, consideration: 35, nps: 45 },
  ],
  sentimentTrend: [
    { month: 'Jun', positive: 72, neutral: 20, negative: 8 },
    { month: 'Jul', positive: 70, neutral: 22, negative: 8 },
    { month: 'Aug', positive: 74, neutral: 18, negative: 8 },
    { month: 'Sep', positive: 75, neutral: 18, negative: 7 },
    { month: 'Oct', positive: 76, neutral: 17, negative: 7 },
    { month: 'Nov', positive: 78, neutral: 16, negative: 6 },
  ],
  topAssociations: [
    { attribute: 'Innovative', score: 82 },
    { attribute: 'Reliable', score: 78 },
    { attribute: 'Easy to Use', score: 72 },
    { attribute: 'Good Value', score: 65 },
    { attribute: 'Enterprise-Ready', score: 68 },
  ],
  channels: [
    { channel: 'Social Media', mentions: 2450, sentiment: 75, reach: 850000 },
    { channel: 'Tech Blogs', mentions: 185, sentiment: 82, reach: 420000 },
    { channel: 'News', mentions: 42, sentiment: 88, reach: 1200000 },
    { channel: 'Forums', mentions: 680, sentiment: 65, reach: 125000 },
  ],
};

interface BrandHealthTrackerProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const BrandHealthTracker: React.FC<BrandHealthTrackerProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Brand Health Tracker"
}) => {
  const [viewMode, setViewMode] = useState<'overview' | 'competitive' | 'sentiment'>('overview');

  const getScoreColor = (score: number, type?: string) => {
    if (type === 'nps') {
      if (score >= 50) return chartColors.primary;
      if (score >= 30) return chartColors.secondary;
      return chartColors.dark;
    }
    if (score >= 70) return chartColors.primary;
    if (score >= 50) return chartColors.secondary;
    return chartColors.dark;
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Brand Score */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <div style={{
          padding: '20px',
          backgroundColor: chartColors.light,
          borderRadius: '12px',
          textAlign: 'center',
          border: '2px solid ' + chartColors.teal,
          minWidth: '120px'
        }}>
          <div style={{ fontSize: '11px', color: chartColors.charcoalLight, marginBottom: '4px' }}>BRAND HEALTH</div>
          <div style={{ fontSize: '36px', fontWeight: 700, color: chartColors.teal }}>{data.overallScore}</div>
          <div style={{ fontSize: '10px', color: data.trend === 'up' ? chartColors.primary : chartColors.dark }}>
            {data.trend === 'up' ? '↑ Improving' : '↓ Declining'}
          </div>
        </div>
        
        {/* Key Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', flex: 1 }}>
          {Object.entries(data.metrics).map(([key, metric]) => (
            <div key={key} style={{
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: `1px solid ${chartColors.light}`,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: getScoreColor(metric.score, key) }}>
                {metric.score}{key === 'nps' ? '' : '%'}
              </div>
              <div style={{ fontSize: '8px', color: chartColors.gray, textTransform: 'capitalize', marginBottom: '2px' }}>
                {key}
              </div>
              <div style={{
                fontSize: '9px',
                color: metric.change >= 0 ? chartColors.primary : chartColors.dark
              }}>
                {metric.change >= 0 ? '+' : ''}{metric.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {viewMode === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Awareness by Segment */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              AWARENESS BY SEGMENT
            </div>
            {data.awarenessBreakdown.map((seg) => (
              <div key={seg.segment} style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '10px', fontWeight: 500, color: chartColors.charcoal, marginBottom: '6px' }}>
                  {seg.segment}
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '2px' }}>
                      <span style={{ color: chartColors.gray }}>Aided</span>
                      <span style={{ fontWeight: 600 }}>{seg.aided}%</span>
                    </div>
                    <div style={{ height: '6px', backgroundColor: chartColors.light, borderRadius: '3px' }}>
                      <div style={{ width: `${seg.aided}%`, height: '100%', backgroundColor: chartColors.navy, borderRadius: '3px' }} />
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '2px' }}>
                      <span style={{ color: chartColors.gray }}>Unaided</span>
                      <span style={{ fontWeight: 600 }}>{seg.unaided}%</span>
                    </div>
                    <div style={{ height: '6px', backgroundColor: chartColors.light, borderRadius: '3px' }}>
                      <div style={{ width: `${seg.unaided}%`, height: '100%', backgroundColor: chartColors.teal, borderRadius: '3px' }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Top Associations */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              BRAND ASSOCIATIONS
            </div>
            {data.topAssociations.map((attr, i) => (
              <div key={attr.attribute} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                  <span style={{ color: chartColors.charcoal }}>{attr.attribute}</span>
                  <span style={{ fontWeight: 600, color: getScoreColor(attr.score) }}>{attr.score}%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: chartColors.light, borderRadius: '4px' }}>
                  <div style={{
                    width: `${attr.score}%`,
                    height: '100%',
                    backgroundColor: getScoreColor(attr.score),
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Channels */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px', gridColumn: 'span 2' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              CHANNEL PERFORMANCE
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {data.channels.map((ch) => (
                <div key={ch.channel} style={{
                  padding: '12px',
                  backgroundColor: chartColors.background,
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '8px' }}>
                    {ch.channel}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '9px' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: chartColors.charcoal }}>{formatNumber(ch.mentions)}</div>
                      <div style={{ color: chartColors.gray }}>Mentions</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: getScoreColor(ch.sentiment) }}>{ch.sentiment}%</div>
                      <div style={{ color: chartColors.gray }}>Positive</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'competitive' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, overflow: 'hidden' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr repeat(3, 1fr)',
            gap: '1px',
            backgroundColor: chartColors.light,
            fontSize: '10px'
          }}>
            {/* Header */}
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600 }}>Brand</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Awareness</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Consideration</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>NPS</div>
            
            {/* Rows */}
            {data.competitorComparison.map((comp, i) => {
              const isUs = comp.name.includes('Us');
              return (
                <React.Fragment key={comp.name}>
                  <div style={{
                    padding: '10px',
                    backgroundColor: isUs ? chartColors.light : i % 2 === 0 ? 'white' : chartColors.background,
                    fontWeight: isUs ? 700 : 500,
                    color: isUs ? chartColors.teal : chartColors.charcoal
                  }}>
                    {comp.name}
                  </div>
                  <div style={{
                    padding: '10px',
                    backgroundColor: isUs ? chartColors.light : i % 2 === 0 ? 'white' : chartColors.background,
                    textAlign: 'center'
                  }}>
                    <div style={{ marginBottom: '4px' }}>
                      <span style={{
                        padding: '2px 8px',
                        backgroundColor: comp.awareness >= 70 ? chartColors.light : comp.awareness >= 50 ? chartColors.light : chartColors.light,
                        color: getScoreColor(comp.awareness),
                        borderRadius: '4px',
                        fontWeight: 600
                      }}>
                        {comp.awareness}%
                      </span>
                    </div>
                  </div>
                  <div style={{
                    padding: '10px',
                    backgroundColor: isUs ? chartColors.light : i % 2 === 0 ? 'white' : chartColors.background,
                    textAlign: 'center'
                  }}>
                    <span style={{
                      padding: '2px 8px',
                      backgroundColor: comp.consideration >= 45 ? chartColors.light : comp.consideration >= 35 ? chartColors.light : chartColors.light,
                      color: getScoreColor(comp.consideration),
                      borderRadius: '4px',
                      fontWeight: 600
                    }}>
                      {comp.consideration}%
                    </span>
                  </div>
                  <div style={{
                    padding: '10px',
                    backgroundColor: isUs ? chartColors.light : i % 2 === 0 ? 'white' : chartColors.background,
                    textAlign: 'center'
                  }}>
                    <span style={{
                      padding: '2px 8px',
                      backgroundColor: comp.nps >= 40 ? chartColors.light : comp.nps >= 30 ? chartColors.light : chartColors.light,
                      color: getScoreColor(comp.nps, 'nps'),
                      borderRadius: '4px',
                      fontWeight: 600
                    }}>
                      {comp.nps}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          
          <div style={{ padding: '12px', fontSize: '9px', color: chartColors.gray, backgroundColor: chartColors.background }}>
            💡 We lead on NPS (+4 vs Competitor C) but trail on awareness (-17 vs Competitor A)
          </div>
        </div>
      )}

      {viewMode === 'sentiment' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '16px' }}>
            SENTIMENT TREND
          </div>
          <svg width="100%" height={180} viewBox={`0 0 ${width - 80} 180`}>
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((pct) => (
              <g key={pct}>
                <line
                  x1={40}
                  y1={150 - (pct / 100) * 130}
                  x2={width - 100}
                  y2={150 - (pct / 100) * 130}
                  stroke={chartColors.light}
                  strokeDasharray="3,3"
                />
                <text x={35} y={155 - (pct / 100) * 130} textAnchor="end" fontSize={8} fill={chartColors.gray}>
                  {pct}%
                </text>
              </g>
            ))}
            
            {/* Stacked area */}
            {data.sentimentTrend.map((month, i) => {
              const barWidth = (width - 160) / data.sentimentTrend.length - 8;
              const x = 50 + i * (barWidth + 8);
              
              return (
                <g key={month.month}>
                  {/* Positive */}
                  <rect
                    x={x}
                    y={150 - (month.positive / 100) * 130}
                    width={barWidth}
                    height={(month.positive / 100) * 130}
                    fill={chartColors.primary}
                    rx={3}
                  />
                  {/* Neutral - stacked above negative conceptually */}
                  {/* Negative */}
                  <text x={x + barWidth / 2} y={165} textAnchor="middle" fontSize={8} fill={chartColors.gray}>
                    {month.month}
                  </text>
                </g>
              );
            })}
          </svg>
          
          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: chartColors.primary, borderRadius: '2px' }} />
              <span>Positive ({data.sentimentTrend[data.sentimentTrend.length - 1].positive}%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: chartColors.secondary, borderRadius: '2px' }} />
              <span>Neutral ({data.sentimentTrend[data.sentimentTrend.length - 1].neutral}%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: chartColors.dark, borderRadius: '2px' }} />
              <span>Negative ({data.sentimentTrend[data.sentimentTrend.length - 1].negative}%)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandHealthTracker;
