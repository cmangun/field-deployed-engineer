"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Label Day Readiness data
const defaultData = {
  drugName: 'NEXAGEN™',
  labelDay: 'October 15, 2026',
  daysToLaunch: 45,
  overallReadiness: 78,
  workstreams: [
    {
      id: 'regulatory',
      name: 'Regulatory',
      icon: '📋',
      owner: 'VP Regulatory Affairs',
      readiness: 95,
      status: 'on-track',
      items: [
        { name: 'FDA Label Approved', status: 'complete', critical: true },
        { name: 'REMS Program Filed', status: 'complete', critical: true },
        { name: 'EU MAA Submitted', status: 'complete', critical: false },
        { name: 'Japan PMDA Filing', status: 'in-progress', critical: false },
      ]
    },
    {
      id: 'commercial',
      name: 'Commercial',
      icon: '💼',
      owner: 'VP Commercial Ops',
      readiness: 82,
      status: 'on-track',
      items: [
        { name: 'Sales Force Hired (180)', status: 'complete', critical: true },
        { name: 'Sales Training Complete', status: 'in-progress', critical: true },
        { name: 'CRM Configured', status: 'complete', critical: false },
        { name: 'Territory Alignment', status: 'complete', critical: true },
        { name: 'Incentive Comp Finalized', status: 'in-progress', critical: false },
      ]
    },
    {
      id: 'medical',
      name: 'Medical Affairs',
      icon: '🔬',
      owner: 'VP Medical Affairs',
      readiness: 88,
      status: 'on-track',
      items: [
        { name: 'KOL Advisory Board', status: 'complete', critical: true },
        { name: 'MSL Team Deployed', status: 'complete', critical: true },
        { name: 'Publications Plan', status: 'complete', critical: false },
        { name: 'Medical Information Ready', status: 'in-progress', critical: true },
      ]
    },
    {
      id: 'market-access',
      name: 'Market Access',
      icon: '🏥',
      owner: 'VP Market Access',
      readiness: 65,
      status: 'at-risk',
      items: [
        { name: 'WAC Price Set', status: 'complete', critical: true },
        { name: 'Top 10 Payer Contracts', status: 'in-progress', critical: true },
        { name: 'PBM Negotiations', status: 'in-progress', critical: true },
        { name: 'Prior Auth Pathway', status: 'not-started', critical: true },
        { name: 'Co-pay Card Program', status: 'in-progress', critical: false },
        { name: 'Hub Services Live', status: 'not-started', critical: true },
      ]
    },
    {
      id: 'supply',
      name: 'Supply Chain',
      icon: '📦',
      owner: 'VP Supply Chain',
      readiness: 72,
      status: 'at-risk',
      items: [
        { name: 'Launch Inventory Built', status: 'in-progress', critical: true },
        { name: '3PL Contract Signed', status: 'complete', critical: true },
        { name: 'Cold Chain Validated', status: 'complete', critical: true },
        { name: 'Specialty Pharmacy Network', status: 'in-progress', critical: true },
        { name: 'Sample Inventory', status: 'not-started', critical: false },
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: '📣',
      owner: 'VP Marketing',
      readiness: 70,
      status: 'at-risk',
      items: [
        { name: 'Brand Guidelines', status: 'complete', critical: false },
        { name: 'HCP Campaign Materials', status: 'in-progress', critical: true },
        { name: 'DTC Campaign Ready', status: 'not-started', critical: false },
        { name: 'Website Live', status: 'in-progress', critical: true },
        { name: 'Speaker Bureau Trained', status: 'in-progress', critical: true },
        { name: 'Congress Booth Ready', status: 'not-started', critical: false },
      ]
    },
  ],
  goNoGo: {
    date: 'September 30, 2026',
    daysAway: 30,
    gates: [
      { name: 'FDA Approval', status: 'pending', blocker: true },
      { name: 'Inventory > 90 days', status: 'pending', blocker: true },
      { name: 'Top 5 Payers Contracted', status: 'not-met', blocker: true },
      { name: 'Sales Force Certified', status: 'pending', blocker: true },
      { name: 'Hub Services Operational', status: 'not-met', blocker: true },
    ]
  }
};

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  'complete': { color: chartColors.primary, bg: chartColors.light, label: '✓' },
  'in-progress': { color: chartColors.secondary, bg: chartColors.light, label: '◐' },
  'not-started': { color: chartColors.secondary, bg: chartColors.light, label: '○' },
  'blocked': { color: chartColors.dark, bg: chartColors.light, label: '✕' },
};

const workstreamStatusConfig: Record<string, { color: string; label: string }> = {
  'on-track': { color: chartColors.primary, label: 'On Track' },
  'at-risk': { color: chartColors.secondary, label: 'At Risk' },
  'off-track': { color: chartColors.dark, label: 'Off Track' },
};

interface LabelDayReadinessProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const LabelDayReadiness: React.FC<LabelDayReadinessProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Label Day Readiness"
}) => {
  const [selectedWorkstream, setSelectedWorkstream] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div style={{ width: '100%' }}>
      {/* Overall Progress Bar */}
      <div style={{ 
        marginBottom: '20px',
        padding: '12px 16px',
        backgroundColor: 'white',
        borderRadius: '10px',
        border: `1px solid ${chartColors.light}`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>
            Launch Readiness
          </span>
          <span style={{ fontSize: '12px', color: chartColors.gray }}>
            {data.workstreams.filter(w => w.readiness >= 80).length}/{data.workstreams.length} workstreams ready
          </span>
        </div>
        <div style={{ 
          height: '12px', 
          backgroundColor: chartColors.light, 
          borderRadius: '6px',
          overflow: 'hidden',
          display: 'flex'
        }}>
          {data.workstreams.map((ws, i) => (
            <div
              key={ws.id}
              style={{
                flex: 1,
                height: '100%',
                backgroundColor: workstreamStatusConfig[ws.status].color,
                opacity: ws.readiness / 100,
                borderRight: i < data.workstreams.length - 1 ? '2px solid white' : 'none'
              }}
            />
          ))}
        </div>
      </div>

      {/* Workstream Grid */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '16px'
      }}>
        {data.workstreams.map((ws) => {
          const isSelected = selectedWorkstream === ws.id;
          const completedItems = ws.items.filter(i => i.status === 'complete').length;
          const criticalItems = ws.items.filter(i => i.critical);
          const criticalComplete = criticalItems.filter(i => i.status === 'complete').length;
          
          return (
            <div
              key={ws.id}
              onClick={() => setSelectedWorkstream(isSelected ? null : ws.id)}
              style={{
                padding: '14px',
                backgroundColor: isSelected ? chartColors.background : 'white',
                borderRadius: '10px',
                border: isSelected 
                  ? `2px solid ${workstreamStatusConfig[ws.status].color}` 
                  : `1px solid ${chartColors.light}`,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '16px' }}>{ws.icon}</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>
                    {ws.name}
                  </span>
                </div>
                <span style={{
                  fontSize: '9px',
                  padding: '2px 6px',
                  borderRadius: '8px',
                  backgroundColor: workstreamStatusConfig[ws.status].color,
                  color: 'white',
                  fontWeight: 500
                }}>
                  {workstreamStatusConfig[ws.status].label}
                </span>
              </div>

              {/* Progress Ring */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="44" height="44" viewBox="0 0 44 44">
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke={chartColors.light}
                    strokeWidth="5"
                  />
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke={workstreamStatusConfig[ws.status].color}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={`${(ws.readiness / 100) * 113} 113`}
                    transform="rotate(-90 22 22)"
                  />
                  <text x="22" y="26" textAnchor="middle" fontSize="11" fontWeight="700" fill={chartColors.charcoal}>
                    {ws.readiness}%
                  </text>
                </svg>
                
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '10px', color: chartColors.charcoalLight, marginBottom: '4px' }}>
                    {completedItems}/{ws.items.length} items complete
                  </div>
                  <div style={{ fontSize: '9px', color: criticalComplete === criticalItems.length ? chartColors.primary : chartColors.secondary }}>
                    ⚠️ {criticalComplete}/{criticalItems.length} critical ready
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Workstream Details */}
      {selectedWorkstream && (
        <div style={{
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '10px',
          border: `1px solid ${chartColors.light}`,
          marginBottom: '16px'
        }}>
          {(() => {
            const ws = data.workstreams.find(w => w.id === selectedWorkstream);
            if (!ws) return null;
            
            return (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>{ws.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: chartColors.charcoal }}>{ws.name}</span>
                    <span style={{ fontSize: '11px', color: chartColors.gray }}>• {ws.owner}</span>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {ws.items.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        backgroundColor: statusConfig[item.status].bg,
                        borderRadius: '6px',
                        border: item.critical ? `1px solid ${statusConfig[item.status].color}` : 'none'
                      }}
                    >
                      <span style={{ 
                        fontSize: '12px',
                        color: statusConfig[item.status].color,
                        fontWeight: 600
                      }}>
                        {statusConfig[item.status].label}
                      </span>
                      <span style={{ fontSize: '11px', color: chartColors.charcoal, flex: 1 }}>
                        {item.name}
                      </span>
                      {item.critical && (
                        <span style={{ fontSize: '8px', color: chartColors.dark, fontWeight: 600 }}>
                          CRITICAL
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Go/No-Go Gate */}
      <div style={{
        padding: '16px',
        backgroundColor: chartColors.dark,
        borderRadius: '12px',
        color: 'white'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>🚦 Go/No-Go Decision</span>
            <span style={{ fontSize: '11px', marginLeft: '12px', opacity: 0.7 }}>
              {data.goNoGo.date} ({data.goNoGo.daysAway} days away)
            </span>
          </div>
          <div style={{
            padding: '4px 12px',
            backgroundColor: data.goNoGo.gates.every(g => g.status === 'met') ? chartColors.primary : chartColors.secondary,
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 600
          }}>
            {data.goNoGo.gates.filter(g => g.status === 'met').length}/{data.goNoGo.gates.length} Gates Met
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {data.goNoGo.gates.map((gate, i) => {
            const gateColor = gate.status === 'met' ? chartColors.primary : (gate.status === 'pending' ? chartColors.secondary : chartColors.dark);
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  border: `1px solid ${gateColor}40`
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: gateColor
                }} />
                <span style={{ fontSize: '10px' }}>{gate.name}</span>
                {gate.blocker && (
                  <span style={{ fontSize: '8px', color: chartColors.dark }}>⚠</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        gap: '16px',
        fontSize: '10px'
      }}>
        {Object.entries(statusConfig).slice(0, 3).map(([status, config]) => (
          <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: config.color, fontWeight: 600 }}>{config.label}</span>
            <span style={{ color: chartColors.charcoalLight, textTransform: 'capitalize' }}>{status.replace('-', ' ')}</span>
          </div>
        ))}
        <div style={{ marginLeft: 'auto', color: chartColors.gray }}>
          Click workstream for details
        </div>
      </div>
    </div>
  );
};

export default LabelDayReadiness;
