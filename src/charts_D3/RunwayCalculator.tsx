"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Runway Calculator data
const defaultData = {
  company: 'DataFlow AI',
  asOfDate: 'Nov 2024',
  currentCash: 8500000,
  monthlyBurn: 485000,
  monthlyRevenue: 210000,
  netBurn: 275000,
  runwayMonths: 31,
  scenarios: [
    { id: 'base', name: 'Base Case', burn: 275000, runway: 31, color: chartColors.primary },
    { id: 'growth', name: 'Growth Mode', burn: 425000, runway: 20, color: chartColors.navy },
    { id: 'efficient', name: 'Efficient', burn: 175000, runway: 49, color: chartColors.primary },
    { id: 'crisis', name: 'Crisis Mode', burn: 85000, runway: 100, color: chartColors.secondary },
  ],
  milestones: [
    { name: 'Series B Target', month: 18, type: 'fundraise', amount: 25000000 },
    { name: 'Break-even', month: 36, type: 'milestone', amount: null },
    { name: 'Product Launch v2', month: 6, type: 'milestone', amount: null },
    { name: 'Enterprise Tier', month: 12, type: 'revenue', amount: 150000 },
  ],
  cashFlow: [
    { month: 'Dec', cash: 8225, burn: 275 },
    { month: 'Jan', cash: 7950, burn: 275 },
    { month: 'Feb', cash: 7675, burn: 275 },
    { month: 'Mar', cash: 7400, burn: 275 },
    { month: 'Apr', cash: 7125, burn: 275 },
    { month: 'May', cash: 6850, burn: 275 },
    { month: 'Jun', cash: 6575, burn: 275 },
    { month: 'Jul', cash: 6300, burn: 275 },
    { month: 'Aug', cash: 6025, burn: 275 },
    { month: 'Sep', cash: 5750, burn: 275 },
    { month: 'Oct', cash: 5475, burn: 275 },
    { month: 'Nov', cash: 5200, burn: 275 },
  ],
  burnBreakdown: [
    { category: 'Payroll', amount: 285000, percent: 59 },
    { category: 'Cloud/Infra', amount: 78000, percent: 16 },
    { category: 'Marketing', amount: 52000, percent: 11 },
    { category: 'Office/Admin', amount: 38000, percent: 8 },
    { category: 'Software/Tools', amount: 32000, percent: 6 },
  ],
  thresholds: {
    danger: 6,
    warning: 12,
    healthy: 18,
  },
};

const formatCurrency = (value: number, compact = false) => {
  if (compact) {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
};

interface RunwayCalculatorProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const RunwayCalculator: React.FC<RunwayCalculatorProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Runway Calculator"
}) => {
  const [selectedScenario, setSelectedScenario] = useState<string>('base');
  const [viewMode, setViewMode] = useState<'overview' | 'scenarios' | 'breakdown'>('overview');

  const getRunwayColor = (months: number) => {
    if (months <= data.thresholds.danger) return chartColors.dark;
    if (months <= data.thresholds.warning) return chartColors.secondary;
    return chartColors.primary;
  };

  const getRunwayStatus = (months: number) => {
    if (months <= data.thresholds.danger) return 'CRITICAL';
    if (months <= data.thresholds.warning) return 'CAUTION';
    return 'HEALTHY';
  };

  const activeScenario = data.scenarios.find(s => s.id === selectedScenario) || data.scenarios[0];
  const chartWidth = width - 100;

  return (
    <div style={{ width: '100%' }}>
      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
        <div style={{ padding: '16px', backgroundColor: chartColors.light, borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.primary }}>{formatCurrency(data.currentCash, true)}</div>
          <div style={{ fontSize: '10px', color: chartColors.navy }}>Cash Balance</div>
        </div>
        <div style={{ padding: '16px', backgroundColor: chartColors.light, borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.dark }}>{formatCurrency(data.netBurn, true)}</div>
          <div style={{ fontSize: '10px', color: chartColors.dark }}>Net Burn/mo</div>
        </div>
        <div style={{ padding: '16px', backgroundColor: `${getRunwayColor(data.runwayMonths)}15`, borderRadius: '10px', textAlign: 'center', border: `2px solid ${getRunwayColor(data.runwayMonths)}` }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: getRunwayColor(data.runwayMonths) }}>{data.runwayMonths}</div>
          <div style={{ fontSize: '10px', color: getRunwayColor(data.runwayMonths) }}>Months Runway</div>
        </div>
        <div style={{ padding: '16px', backgroundColor: chartColors.background, borderRadius: '10px', textAlign: 'center' }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 700,
            color: getRunwayColor(data.runwayMonths),
            padding: '4px 8px',
            backgroundColor: `${getRunwayColor(data.runwayMonths)}20`,
            borderRadius: '6px',
            display: 'inline-block'
          }}>
            {getRunwayStatus(data.runwayMonths)}
          </div>
          <div style={{ fontSize: '10px', color: chartColors.gray, marginTop: '4px' }}>Status</div>
        </div>
      </div>

      {viewMode === 'overview' && (
        <>
          {/* Cash Projection Chart */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              12-MONTH CASH PROJECTION
            </div>
            <svg width={chartWidth} height={140}>
              {/* Danger zone */}
              <rect x={40} y={100} width={chartWidth - 40} height={30} fill={chartColors.light} rx={4} />
              <text x={50} y={118} fontSize={8} fill={chartColors.dark}>Danger Zone (&lt;6mo runway)</text>
              
              {/* Cash line */}
              <path
                d={data.cashFlow.map((cf, i) => {
                  const x = 40 + (i / (data.cashFlow.length - 1)) * (chartWidth - 60);
                  const y = 90 - ((cf.cash - 4000) / 5000) * 70;
                  return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke={chartColors.teal}
                strokeWidth={3}
              />
              
              {/* Data points */}
              {data.cashFlow.map((cf, i) => {
                const x = 40 + (i / (data.cashFlow.length - 1)) * (chartWidth - 60);
                const y = 90 - ((cf.cash - 4000) / 5000) * 70;
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r={4} fill={chartColors.teal} />
                    <text x={x} y={135} textAnchor="middle" fontSize={8} fill={chartColors.gray}>{cf.month}</text>
                  </g>
                );
              })}
              
              {/* Y-axis labels */}
              <text x={35} y={25} textAnchor="end" fontSize={8} fill={chartColors.gray}>$9M</text>
              <text x={35} y={90} textAnchor="end" fontSize={8} fill={chartColors.gray}>$4M</text>
            </svg>
          </div>

          {/* Milestones */}
          <div style={{ backgroundColor: chartColors.background, borderRadius: '10px', padding: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
              KEY MILESTONES
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {data.milestones.sort((a, b) => a.month - b.month).map((m, i) => (
                <div key={i} style={{
                  padding: '8px 12px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: `1px solid ${m.type === 'fundraise' ? chartColors.primary : m.type === 'revenue' ? chartColors.navy : chartColors.light}`,
                  borderLeft: `4px solid ${m.type === 'fundraise' ? chartColors.primary : m.type === 'revenue' ? chartColors.navy : chartColors.gray}`
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>{m.name}</div>
                  <div style={{ fontSize: '9px', color: chartColors.gray }}>
                    Month {m.month} {m.amount && `• ${formatCurrency(m.amount, true)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {viewMode === 'scenarios' && (
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
            SCENARIO COMPARISON
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {data.scenarios.map((scenario) => (
              <div
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario.id)}
                style={{
                  padding: '16px',
                  backgroundColor: selectedScenario === scenario.id ? `${scenario.color}10` : 'white',
                  borderRadius: '12px',
                  border: `2px solid ${selectedScenario === scenario.id ? scenario.color : chartColors.light}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: chartColors.charcoal }}>{scenario.name}</div>
                    <div style={{ fontSize: '10px', color: chartColors.gray }}>Net burn: {formatCurrency(scenario.burn, true)}/mo</div>
                  </div>
                  <div style={{
                    fontSize: '10px',
                    padding: '3px 8px',
                    backgroundColor: `${getRunwayColor(scenario.runway)}20`,
                    color: getRunwayColor(scenario.runway),
                    borderRadius: '4px',
                    fontWeight: 600
                  }}>
                    {getRunwayStatus(scenario.runway)}
                  </div>
                </div>
                
                {/* Runway bar */}
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                    <span style={{ color: chartColors.gray }}>Runway</span>
                    <span style={{ fontWeight: 700, color: scenario.color }}>{scenario.runway} months</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: chartColors.light, borderRadius: '4px', position: 'relative' }}>
                    <div style={{
                      width: `${Math.min(100, (scenario.runway / 48) * 100)}%`,
                      height: '100%',
                      backgroundColor: scenario.color,
                      borderRadius: '4px'
                    }} />
                    {/* Threshold markers */}
                    <div style={{ position: 'absolute', left: `${(6/48)*100}%`, top: 0, bottom: 0, width: '2px', backgroundColor: chartColors.dark }} />
                    <div style={{ position: 'absolute', left: `${(12/48)*100}%`, top: 0, bottom: 0, width: '2px', backgroundColor: chartColors.secondary }} />
                    <div style={{ position: 'absolute', left: `${(18/48)*100}%`, top: 0, bottom: 0, width: '2px', backgroundColor: chartColors.primary }} />
                  </div>
                </div>
                
                {/* Zero cash date */}
                <div style={{ fontSize: '10px', color: chartColors.gray }}>
                  Zero cash: <span style={{ fontWeight: 600, color: chartColors.charcoal }}>
                    {new Date(Date.now() + scenario.runway * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '12px', justifyContent: 'center', fontSize: '9px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '12px', height: '2px', backgroundColor: chartColors.dark }} />
              <span style={{ color: chartColors.gray }}>6mo (Danger)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '12px', height: '2px', backgroundColor: chartColors.secondary }} />
              <span style={{ color: chartColors.gray }}>12mo (Warning)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '12px', height: '2px', backgroundColor: chartColors.primary }} />
              <span style={{ color: chartColors.gray }}>18mo (Healthy)</span>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'breakdown' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Burn Breakdown */}
            <div style={{ padding: '16px', backgroundColor: chartColors.light, borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.dark, marginBottom: '12px' }}>
                MONTHLY BURN ({formatCurrency(data.monthlyBurn, true)})
              </div>
              {data.burnBreakdown.map((item) => (
                <div key={item.category} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                    <span style={{ color: chartColors.charcoal }}>{item.category}</span>
                    <span style={{ fontWeight: 600 }}>{formatCurrency(item.amount, true)} ({item.percent}%)</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: chartColors.light, borderRadius: '3px' }}>
                    <div style={{ width: `${item.percent}%`, height: '100%', backgroundColor: chartColors.dark, borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Revenue & Net Burn */}
            <div style={{ padding: '16px', backgroundColor: chartColors.light, borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.navy, marginBottom: '12px' }}>
                MONTHLY REVENUE ({formatCurrency(data.monthlyRevenue, true)})
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '10px', color: chartColors.gray, marginBottom: '4px' }}>Gross Burn</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.dark }}>{formatCurrency(data.monthlyBurn, true)}</div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '10px', color: chartColors.gray, marginBottom: '4px' }}>Revenue Offset</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>- {formatCurrency(data.monthlyRevenue, true)}</div>
              </div>
              
              <div style={{ borderTop: `2px solid ${chartColors.primary}`, paddingTop: '12px' }}>
                <div style={{ fontSize: '10px', color: chartColors.gray, marginBottom: '4px' }}>Net Burn</div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.charcoal }}>{formatCurrency(data.netBurn, true)}</div>
              </div>
            </div>
          </div>
          
          {/* Efficiency Metrics */}
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: chartColors.background, borderRadius: '10px' }}>
            <div style={{ fontSize: '10px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
              EFFICIENCY METRICS
            </div>
            <div style={{ display: 'flex', gap: '24px', fontSize: '10px' }}>
              <div>
                <span style={{ color: chartColors.gray }}>Burn Multiple: </span>
                <span style={{ fontWeight: 700, color: data.netBurn / data.monthlyRevenue < 2 ? chartColors.primary : chartColors.secondary }}>
                  {(data.netBurn / data.monthlyRevenue).toFixed(1)}x
                </span>
              </div>
              <div>
                <span style={{ color: chartColors.gray }}>Revenue Coverage: </span>
                <span style={{ fontWeight: 700, color: chartColors.charcoal }}>
                  {((data.monthlyRevenue / data.monthlyBurn) * 100).toFixed(0)}%
                </span>
              </div>
              <div>
                <span style={{ color: chartColors.gray }}>Months to Breakeven: </span>
                <span style={{ fontWeight: 700, color: chartColors.charcoal }}>~36</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RunwayCalculator;
