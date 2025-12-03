"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Customer Health Score data
const defaultData = {
  period: 'Nov 2024',
  totalCustomers: 485,
  atRisk: 42,
  healthy: 380,
  champions: 63,
  avgHealthScore: 72,
  customers: [
    { id: 'c1', name: 'Acme Corp', healthScore: 92, mrr: 18500, usage: 95, nps: 9, supportTickets: 1, trend: 'up', segment: 'Enterprise', riskFactors: [] },
    { id: 'c2', name: 'TechStart Inc', healthScore: 85, mrr: 8200, usage: 88, nps: 8, supportTickets: 2, trend: 'stable', segment: 'Mid-Market', riskFactors: [] },
    { id: 'c3', name: 'Global Services', healthScore: 78, mrr: 24000, usage: 72, nps: 7, supportTickets: 3, trend: 'stable', segment: 'Enterprise', riskFactors: ['Low engagement'] },
    { id: 'c4', name: 'DataDriven LLC', healthScore: 45, mrr: 5400, usage: 32, nps: 5, supportTickets: 8, trend: 'down', segment: 'SMB', riskFactors: ['Low usage', 'High support volume', 'Declining NPS'] },
    { id: 'c5', name: 'InnovateCo', healthScore: 38, mrr: 12800, usage: 28, nps: 4, supportTickets: 12, trend: 'down', segment: 'Mid-Market', riskFactors: ['Champion left', 'Low usage', 'Contract ending'] },
    { id: 'c6', name: 'FastGrowth', healthScore: 88, mrr: 6500, usage: 92, nps: 9, supportTickets: 0, trend: 'up', segment: 'SMB', riskFactors: [] },
    { id: 'c7', name: 'Enterprise One', healthScore: 65, mrr: 32000, usage: 58, nps: 6, supportTickets: 5, trend: 'down', segment: 'Enterprise', riskFactors: ['Declining usage', 'Payment issues'] },
    { id: 'c8', name: 'Startup Labs', healthScore: 82, mrr: 3200, usage: 85, nps: 8, supportTickets: 1, trend: 'up', segment: 'SMB', riskFactors: [] },
  ],
  healthDistribution: [
    { range: '0-20', count: 12, label: 'Critical' },
    { range: '21-40', count: 30, label: 'At Risk' },
    { range: '41-60', count: 85, label: 'Needs Attention' },
    { range: '61-80', count: 195, label: 'Healthy' },
    { range: '81-100', count: 163, label: 'Champion' },
  ],
  factors: [
    { name: 'Product Usage', weight: 30, avgScore: 68 },
    { name: 'NPS Score', weight: 25, avgScore: 72 },
    { name: 'Support Health', weight: 20, avgScore: 78 },
    { name: 'Engagement', weight: 15, avgScore: 65 },
    { name: 'Payment History', weight: 10, avgScore: 92 },
  ],
  riskReasons: [
    { reason: 'Low product usage', count: 28 },
    { reason: 'Declining NPS', count: 22 },
    { reason: 'High support volume', count: 18 },
    { reason: 'Champion departed', count: 15 },
    { reason: 'Contract ending soon', count: 12 },
    { reason: 'Payment issues', count: 8 },
  ],
};

const formatCurrency = (value: number) => {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value}`;
};

const getHealthColor = (score: number) => {
  if (score >= 80) return chartColors.primary;
  if (score >= 60) return chartColors.secondary;
  if (score >= 40) return chartColors.dark;
  return chartColors.dark;
};

const getHealthLabel = (score: number) => {
  if (score >= 80) return 'Champion';
  if (score >= 60) return 'Healthy';
  if (score >= 40) return 'At Risk';
  return 'Critical';
};

interface CustomerHealthScoreProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const CustomerHealthScore: React.FC<CustomerHealthScoreProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Customer Health Score"
}) => {
  const [viewMode, setViewMode] = useState<'overview' | 'customers' | 'factors'>('overview');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [filterHealth, setFilterHealth] = useState<string | null>(null);

  const filteredCustomers = filterHealth
    ? data.customers.filter(c => {
        if (filterHealth === 'critical') return c.healthScore < 40;
        if (filterHealth === 'at-risk') return c.healthScore >= 40 && c.healthScore < 60;
        if (filterHealth === 'healthy') return c.healthScore >= 60 && c.healthScore < 80;
        return c.healthScore >= 80;
      })
    : data.customers;

  return (
    <div style={{ width: '100%' }}>
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center', border: `2px solid ${chartColors.primary}` }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.primary }}>{data.avgHealthScore}</div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>Avg Health Score</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.primary }}>{data.champions}</div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>Champions (80+)</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.secondary }}>{data.healthy}</div>
          <div style={{ fontSize: '9px', color: chartColors.dark }}>Healthy (60-79)</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.dark }}>{data.atRisk}</div>
          <div style={{ fontSize: '9px', color: chartColors.dark }}>At Risk (&lt;60)</div>
        </div>
      </div>

      {viewMode === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Health Distribution */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              HEALTH DISTRIBUTION
            </div>
            {data.healthDistribution.map((bucket) => {
              const colors: Record<string, string> = {
                Critical: chartColors.dark,
                'At Risk': chartColors.dark,
                'Needs Attention': chartColors.secondary,
                Healthy: chartColors.primary,
                Champion: chartColors.primary,
              };
              const percent = (bucket.count / data.totalCustomers) * 100;
              
              return (
                <div key={bucket.range} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                    <span style={{ color: chartColors.charcoal }}>{bucket.label} ({bucket.range})</span>
                    <span style={{ fontWeight: 600 }}>{bucket.count} ({percent.toFixed(0)}%)</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: chartColors.light, borderRadius: '4px' }}>
                    <div style={{
                      width: `${percent}%`,
                      height: '100%',
                      backgroundColor: colors[bucket.label],
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Risk Reasons */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              TOP RISK REASONS
            </div>
            {data.riskReasons.map((reason, i) => (
              <div key={reason.reason} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px',
                backgroundColor: i % 2 === 0 ? chartColors.light : 'white',
                borderRadius: '6px',
                marginBottom: '4px'
              }}>
                <span style={{ fontSize: '10px', color: chartColors.charcoal }}>{reason.reason}</span>
                <span style={{
                  padding: '2px 8px',
                  backgroundColor: chartColors.dark,
                  color: 'white',
                  borderRadius: '10px',
                  fontSize: '10px',
                  fontWeight: 600
                }}>
                  {reason.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'customers' && (
        <div>
          {/* Filter buttons */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '10px', color: chartColors.gray, alignSelf: 'center' }}>Filter:</span>
            {[
              { key: null, label: 'All' },
              { key: 'champion', label: 'Champions' },
              { key: 'healthy', label: 'Healthy' },
              { key: 'at-risk', label: 'At Risk' },
              { key: 'critical', label: 'Critical' },
            ].map((filter) => (
              <button
                key={filter.key || 'all'}
                onClick={() => setFilterHealth(filter.key)}
                style={{
                  padding: '3px 10px',
                  fontSize: '9px',
                  backgroundColor: filterHealth === filter.key ? chartColors.charcoal : 'white',
                  color: filterHealth === filter.key ? 'white' : chartColors.charcoal,
                  border: `1px solid ${chartColors.light}`,
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
            {filteredCustomers.sort((a, b) => a.healthScore - b.healthScore).map((customer) => {
              const isSelected = selectedCustomer === customer.id;
              const healthColor = getHealthColor(customer.healthScore);
              
              return (
                <div
                  key={customer.id}
                  onClick={() => setSelectedCustomer(isSelected ? null : customer.id)}
                  style={{
                    padding: '12px',
                    backgroundColor: isSelected ? chartColors.background : 'white',
                    borderRadius: '10px',
                    border: `2px solid ${isSelected ? healthColor : chartColors.light}`,
                    marginBottom: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>{customer.name}</div>
                      <div style={{ fontSize: '9px', color: chartColors.gray }}>
                        {customer.segment} • {formatCurrency(customer.mrr)}/mo
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        fontSize: '12px',
                        color: customer.trend === 'up' ? chartColors.primary : customer.trend === 'down' ? chartColors.dark : chartColors.secondary
                      }}>
                        {customer.trend === 'up' ? '↑' : customer.trend === 'down' ? '↓' : '→'}
                      </span>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: `${healthColor}15`,
                        border: `3px solid ${healthColor}`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: healthColor }}>{customer.healthScore}</span>
                      </div>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${chartColors.light}` }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '12px' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: chartColors.charcoal }}>{customer.usage}%</div>
                          <div style={{ fontSize: '8px', color: chartColors.gray }}>Usage</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: chartColors.charcoal }}>{customer.nps}</div>
                          <div style={{ fontSize: '8px', color: chartColors.gray }}>NPS</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: customer.supportTickets > 5 ? chartColors.dark : chartColors.charcoal }}>{customer.supportTickets}</div>
                          <div style={{ fontSize: '8px', color: chartColors.gray }}>Tickets</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <span style={{ fontSize: '10px', padding: '2px 8px', backgroundColor: `${healthColor}20`, color: healthColor, borderRadius: '4px', fontWeight: 600 }}>
                            {getHealthLabel(customer.healthScore)}
                          </span>
                        </div>
                      </div>
                      {customer.riskFactors.length > 0 && (
                        <div>
                          <div style={{ fontSize: '9px', color: chartColors.gray, marginBottom: '4px' }}>Risk Factors:</div>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {customer.riskFactors.map((factor) => (
                              <span key={factor} style={{
                                padding: '2px 6px',
                                backgroundColor: chartColors.light,
                                color: chartColors.dark,
                                borderRadius: '4px',
                                fontSize: '9px'
                              }}>
                                {factor}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === 'factors' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '16px' }}>
            HEALTH SCORE COMPONENTS
          </div>
          {data.factors.map((factor) => (
            <div key={factor.name} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '6px' }}>
                <span style={{ fontWeight: 500, color: chartColors.charcoal }}>{factor.name}</span>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ color: chartColors.gray }}>Weight: {factor.weight}%</span>
                  <span style={{ fontWeight: 600, color: getHealthColor(factor.avgScore) }}>Avg: {factor.avgScore}</span>
                </div>
              </div>
              <div style={{ height: '12px', backgroundColor: chartColors.light, borderRadius: '6px', position: 'relative' }}>
                <div style={{
                  width: `${factor.avgScore}%`,
                  height: '100%',
                  backgroundColor: getHealthColor(factor.avgScore),
                  borderRadius: '6px'
                }} />
                {/* Weight indicator */}
                <div style={{
                  position: 'absolute',
                  right: `${100 - factor.weight}%`,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '2px',
                  height: '16px',
                  backgroundColor: chartColors.charcoal,
                  opacity: 0.3
                }} />
              </div>
            </div>
          ))}
          
          <div style={{
            marginTop: '24px',
            padding: '12px',
            backgroundColor: chartColors.background,
            borderRadius: '8px',
            fontSize: '10px',
            color: chartColors.gray
          }}>
            <strong>Health Score Formula:</strong> (Usage × 30%) + (NPS × 25%) + (Support × 20%) + (Engagement × 15%) + (Payment × 10%)
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerHealthScore;
