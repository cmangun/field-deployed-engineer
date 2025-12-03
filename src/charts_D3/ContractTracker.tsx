"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Contract Tracker data
const defaultData = {
  asOfDate: 'Nov 2024',
  totalContracts: 485,
  totalACV: 8500000,
  upForRenewal: {
    next30: { count: 12, value: 420000 },
    next60: { count: 28, value: 850000 },
    next90: { count: 45, value: 1250000 },
  },
  contracts: [
    { id: 'c1', customer: 'Acme Corp', type: 'Enterprise', startDate: '2023-01-15', endDate: '2025-01-15', acv: 185000, status: 'active', autoRenew: true, riskLevel: 'low', owner: 'Sarah Chen', terms: '2 year', paymentStatus: 'current' },
    { id: 'c2', customer: 'TechStart Inc', type: 'Mid-Market', startDate: '2024-02-01', endDate: '2025-02-01', acv: 48000, status: 'expiring', autoRenew: false, riskLevel: 'medium', owner: 'Mike Johnson', terms: '1 year', paymentStatus: 'current' },
    { id: 'c3', customer: 'Global Services', type: 'Enterprise', startDate: '2023-06-01', endDate: '2024-12-01', acv: 240000, status: 'expiring', autoRenew: false, riskLevel: 'high', owner: 'Lisa Wong', terms: '18 month', paymentStatus: 'late' },
    { id: 'c4', customer: 'DataDriven LLC', type: 'SMB', startDate: '2024-06-15', endDate: '2025-06-15', acv: 24000, status: 'active', autoRenew: true, riskLevel: 'low', owner: 'David Park', terms: '1 year', paymentStatus: 'current' },
    { id: 'c5', customer: 'InnovateCo', type: 'Mid-Market', startDate: '2024-01-01', endDate: '2024-12-31', acv: 72000, status: 'expiring', autoRenew: false, riskLevel: 'high', owner: 'Alex Kim', terms: '1 year', paymentStatus: 'current' },
    { id: 'c6', customer: 'Enterprise One', type: 'Enterprise', startDate: '2022-09-01', endDate: '2025-09-01', acv: 320000, status: 'active', autoRenew: true, riskLevel: 'low', owner: 'Emma Davis', terms: '3 year', paymentStatus: 'current' },
    { id: 'c7', customer: 'FastGrowth', type: 'SMB', startDate: '2024-03-01', endDate: '2025-03-01', acv: 18000, status: 'active', autoRenew: true, riskLevel: 'low', owner: 'James Lee', terms: '1 year', paymentStatus: 'current' },
    { id: 'c8', customer: 'Startup Labs', type: 'SMB', startDate: '2024-08-01', endDate: '2025-01-31', acv: 12000, status: 'expiring', autoRenew: false, riskLevel: 'medium', owner: 'Rachel Green', terms: '6 month', paymentStatus: 'current' },
  ],
  byType: [
    { type: 'Enterprise', count: 45, acv: 4200000, avgTerm: 24 },
    { type: 'Mid-Market', count: 156, acv: 2800000, avgTerm: 12 },
    { type: 'SMB', count: 284, acv: 1500000, avgTerm: 12 },
  ],
  riskSummary: {
    low: { count: 380, acv: 6200000 },
    medium: { count: 68, acv: 1500000 },
    high: { count: 37, acv: 800000 },
  },
  renewalOutcomes: {
    renewed: 142,
    expanded: 38,
    contracted: 12,
    churned: 18,
  },
};

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getDaysUntil = (dateStr: string) => {
  const end = new Date(dateStr);
  const now = new Date();
  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
};

interface ContractTrackerProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const ContractTracker: React.FC<ContractTrackerProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Contract Tracker"
}) => {
  const [viewMode, setViewMode] = useState<'overview' | 'contracts' | 'renewals'>('overview');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedContract, setSelectedContract] = useState<string | null>(null);

  const filteredContracts = filterStatus
    ? data.contracts.filter(c => c.status === filterStatus || c.riskLevel === filterStatus)
    : data.contracts;

  const getRiskColor = (risk: string) => {
    if (risk === 'low') return chartColors.primary;
    if (risk === 'medium') return chartColors.secondary;
    return chartColors.dark;
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Renewal Pipeline */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center', border: `2px solid ${chartColors.dark}` }}>
          <div style={{ fontSize: '9px', color: chartColors.dark, marginBottom: '4px' }}>Next 30 Days</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.dark }}>{data.upForRenewal.next30.count}</div>
          <div style={{ fontSize: '10px', color: chartColors.dark }}>{formatCurrency(data.upForRenewal.next30.value)}</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center', border: `2px solid ${chartColors.secondary}` }}>
          <div style={{ fontSize: '9px', color: chartColors.dark, marginBottom: '4px' }}>Next 60 Days</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.secondary }}>{data.upForRenewal.next60.count}</div>
          <div style={{ fontSize: '10px', color: chartColors.dark }}>{formatCurrency(data.upForRenewal.next60.value)}</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center', border: `2px solid ${chartColors.primary}` }}>
          <div style={{ fontSize: '9px', color: chartColors.navy, marginBottom: '4px' }}>Next 90 Days</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>{data.upForRenewal.next90.count}</div>
          <div style={{ fontSize: '10px', color: chartColors.navy }}>{formatCurrency(data.upForRenewal.next90.value)}</div>
        </div>
      </div>

      {viewMode === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* By Segment */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              CONTRACTS BY SEGMENT
            </div>
            {data.byType.map((type) => {
              const percent = (type.count / data.totalContracts) * 100;
              return (
                <div key={type.type} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 500, color: chartColors.charcoal }}>{type.type}</span>
                    <span style={{ color: chartColors.gray }}>{type.count} contracts • {formatCurrency(type.acv)}</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: chartColors.light, borderRadius: '4px' }}>
                    <div style={{
                      width: `${percent}%`,
                      height: '100%',
                      backgroundColor: type.type === 'Enterprise' ? chartColors.navy : type.type === 'Mid-Market' ? chartColors.navy : chartColors.muted,
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Risk Summary */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              RISK DISTRIBUTION
            </div>
            {Object.entries(data.riskSummary).map(([risk, info]) => (
              <div key={risk} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: risk === 'high' ? chartColors.light : risk === 'medium' ? chartColors.light : chartColors.light,
                borderRadius: '8px',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: getRiskColor(risk)
                  }} />
                  <span style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal, textTransform: 'capitalize' }}>
                    {risk} Risk
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: getRiskColor(risk) }}>{info.count}</div>
                  <div style={{ fontSize: '9px', color: chartColors.gray }}>{formatCurrency(info.acv)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'contracts' && (
        <div>
          {/* Filters */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '10px', color: chartColors.gray, alignSelf: 'center' }}>Filter:</span>
            {[
              { key: null, label: 'All' },
              { key: 'expiring', label: 'Expiring' },
              { key: 'high', label: 'High Risk' },
              { key: 'medium', label: 'Med Risk' },
            ].map((filter) => (
              <button
                key={filter.key || 'all'}
                onClick={() => setFilterStatus(filter.key)}
                style={{
                  padding: '3px 10px',
                  fontSize: '9px',
                  backgroundColor: filterStatus === filter.key ? chartColors.charcoal : 'white',
                  color: filterStatus === filter.key ? 'white' : chartColors.charcoal,
                  border: `1px solid ${chartColors.light}`,
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {filteredContracts.sort((a, b) => getDaysUntil(a.endDate) - getDaysUntil(b.endDate)).map((contract) => {
              const daysUntil = getDaysUntil(contract.endDate);
              const isSelected = selectedContract === contract.id;
              
              return (
                <div
                  key={contract.id}
                  onClick={() => setSelectedContract(isSelected ? null : contract.id)}
                  style={{
                    padding: '12px',
                    backgroundColor: isSelected ? chartColors.background : 'white',
                    borderRadius: '10px',
                    border: `2px solid ${contract.riskLevel === 'high' ? chartColors.dark : contract.riskLevel === 'medium' ? chartColors.secondary : chartColors.light}`,
                    marginBottom: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>
                        {contract.customer}
                      </div>
                      <div style={{ fontSize: '9px', color: chartColors.gray }}>
                        {contract.type} • {contract.terms} • {contract.owner}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: chartColors.charcoal }}>{formatCurrency(contract.acv)}</div>
                        <div style={{ fontSize: '8px', color: chartColors.gray }}>ACV</div>
                      </div>
                      <div style={{
                        padding: '4px 8px',
                        backgroundColor: daysUntil <= 30 ? chartColors.light : daysUntil <= 60 ? chartColors.light : chartColors.light,
                        color: daysUntil <= 30 ? chartColors.dark : daysUntil <= 60 ? chartColors.secondary : chartColors.primary,
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: 600
                      }}>
                        {daysUntil > 0 ? `${daysUntil}d` : 'Expired'}
                      </div>
                      {contract.autoRenew && (
                        <span style={{ fontSize: '12px' }} title="Auto-renew">🔄</span>
                      )}
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${chartColors.light}` }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', fontSize: '10px' }}>
                        <div>
                          <div style={{ color: chartColors.gray }}>Start Date</div>
                          <div style={{ fontWeight: 600 }}>{formatDate(contract.startDate)}</div>
                        </div>
                        <div>
                          <div style={{ color: chartColors.gray }}>End Date</div>
                          <div style={{ fontWeight: 600 }}>{formatDate(contract.endDate)}</div>
                        </div>
                        <div>
                          <div style={{ color: chartColors.gray }}>Payment</div>
                          <div style={{ fontWeight: 600, color: contract.paymentStatus === 'late' ? chartColors.dark : chartColors.primary }}>
                            {contract.paymentStatus}
                          </div>
                        </div>
                        <div>
                          <div style={{ color: chartColors.gray }}>Risk Level</div>
                          <div style={{ fontWeight: 600, color: getRiskColor(contract.riskLevel), textTransform: 'capitalize' }}>
                            {contract.riskLevel}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === 'renewals' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '16px' }}>
            RENEWAL OUTCOMES (YTD)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            <div style={{ padding: '16px', backgroundColor: chartColors.light, borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: chartColors.primary }}>{data.renewalOutcomes.renewed}</div>
              <div style={{ fontSize: '10px', color: chartColors.navy }}>Renewed</div>
              <div style={{ fontSize: '8px', color: chartColors.gray, marginTop: '4px' }}>
                {((data.renewalOutcomes.renewed / (data.renewalOutcomes.renewed + data.renewalOutcomes.churned)) * 100).toFixed(0)}% rate
              </div>
            </div>
            <div style={{ padding: '16px', backgroundColor: chartColors.light, borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: chartColors.primary }}>{data.renewalOutcomes.expanded}</div>
              <div style={{ fontSize: '10px', color: chartColors.navy }}>Expanded</div>
              <div style={{ fontSize: '8px', color: chartColors.gray, marginTop: '4px' }}>
                ↑ Upsell
              </div>
            </div>
            <div style={{ padding: '16px', backgroundColor: chartColors.light, borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: chartColors.secondary }}>{data.renewalOutcomes.contracted}</div>
              <div style={{ fontSize: '10px', color: chartColors.dark }}>Contracted</div>
              <div style={{ fontSize: '8px', color: chartColors.gray, marginTop: '4px' }}>
                ↓ Downsell
              </div>
            </div>
            <div style={{ padding: '16px', backgroundColor: chartColors.light, borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: chartColors.dark }}>{data.renewalOutcomes.churned}</div>
              <div style={{ fontSize: '10px', color: chartColors.dark }}>Churned</div>
              <div style={{ fontSize: '8px', color: chartColors.gray, marginTop: '4px' }}>
                Lost
              </div>
            </div>
          </div>
          
          {/* Net Retention */}
          <div style={{
            marginTop: '20px',
            padding: '16px',
            backgroundColor: chartColors.background,
            borderRadius: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight }}>GROSS RETENTION</div>
                <div style={{ fontSize: '10px', color: chartColors.gray }}>Renewed / (Renewed + Churned)</div>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.primary }}>
                {((data.renewalOutcomes.renewed / (data.renewalOutcomes.renewed + data.renewalOutcomes.churned)) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractTracker;
