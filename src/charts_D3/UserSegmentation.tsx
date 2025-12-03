"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// User Segmentation data
const defaultData = {
  totalUsers: 45200,
  analysisDate: 'Nov 2024',
  segments: [
    {
      id: 'power',
      name: 'Power Users',
      icon: '⚡',
      color: chartColors.primary,
      count: 4520,
      percent: 10,
      characteristics: ['Daily active', '10+ features used', 'Team admins', 'API integrations'],
      metrics: { arpu: 850, retention: 96, nps: 72, supportTickets: 0.3 },
      behavior: { avgSessions: 28, avgDuration: 45, featureAdoption: 92 },
      value: 'high',
    },
    {
      id: 'engaged',
      name: 'Engaged Users',
      icon: '🎯',
      color: chartColors.navy,
      count: 13560,
      percent: 30,
      characteristics: ['Weekly active', '5-9 features used', 'Individual contributors', 'Standard workflows'],
      metrics: { arpu: 420, retention: 85, nps: 55, supportTickets: 0.8 },
      behavior: { avgSessions: 12, avgDuration: 25, featureAdoption: 68 },
      value: 'medium-high',
    },
    {
      id: 'casual',
      name: 'Casual Users',
      icon: '🌊',
      color: chartColors.secondary,
      count: 15820,
      percent: 35,
      characteristics: ['Monthly active', '2-4 features used', 'Basic needs only', 'Low engagement'],
      metrics: { arpu: 180, retention: 65, nps: 35, supportTickets: 1.2 },
      behavior: { avgSessions: 4, avgDuration: 12, featureAdoption: 35 },
      value: 'medium',
    },
    {
      id: 'dormant',
      name: 'Dormant Users',
      icon: '💤',
      color: chartColors.muted,
      count: 9040,
      percent: 20,
      characteristics: ['60+ days inactive', 'Signed up but churned', 'Never onboarded', 'Trial expired'],
      metrics: { arpu: 0, retention: 15, nps: -10, supportTickets: 0.1 },
      behavior: { avgSessions: 0.5, avgDuration: 3, featureAdoption: 8 },
      value: 'low',
    },
    {
      id: 'atrisk',
      name: 'At-Risk',
      icon: '⚠️',
      color: chartColors.dark,
      count: 2260,
      percent: 5,
      characteristics: ['Declining usage', 'Support escalations', 'Downgraded plan', 'Competitor mentions'],
      metrics: { arpu: 280, retention: 40, nps: 5, supportTickets: 3.5 },
      behavior: { avgSessions: 2, avgDuration: 8, featureAdoption: 25 },
      value: 'at-risk',
    },
  ],
  actions: {
    power: ['Invite to beta program', 'Case study candidates', 'Referral program'],
    engaged: ['Feature education', 'Upgrade nudges', 'Team expansion'],
    casual: ['Onboarding optimization', 'Use case discovery', 'Re-engagement campaigns'],
    dormant: ['Win-back campaigns', 'Exit survey', 'Sunset communication'],
    atrisk: ['CSM outreach', 'Executive sponsor', 'Save offer'],
  },
  trends: [
    { month: 'Jul', power: 8, engaged: 28, casual: 38, dormant: 22, atrisk: 4 },
    { month: 'Aug', power: 8.5, engaged: 29, casual: 37, dormant: 21, atrisk: 4.5 },
    { month: 'Sep', power: 9, engaged: 29, casual: 36, dormant: 21, atrisk: 5 },
    { month: 'Oct', power: 9.5, engaged: 30, casual: 35, dormant: 20, atrisk: 5.5 },
    { month: 'Nov', power: 10, engaged: 30, casual: 35, dormant: 20, atrisk: 5 },
  ],
};

interface UserSegmentationProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const UserSegmentation: React.FC<UserSegmentationProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "User Segmentation"
}) => {
  const [selectedSegment, setSelectedSegment] = useState<string | null>('power');
  const [viewMode, setViewMode] = useState<'overview' | 'metrics' | 'actions'>('overview');

  const totalRevenue = data.segments.reduce((sum, s) => sum + (s.count * s.metrics.arpu), 0);

  return (
    <div style={{ width: '100%' }}>
      {/* Segment Cards */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {data.segments.map((segment) => {
          const isSelected = selectedSegment === segment.id;
          const revenueContribution = ((segment.count * segment.metrics.arpu) / totalRevenue * 100).toFixed(1);
          
          return (
            <div
              key={segment.id}
              onClick={() => setSelectedSegment(isSelected ? null : segment.id)}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: isSelected ? `${segment.color}10` : 'white',
                borderRadius: '10px',
                border: `2px solid ${isSelected ? segment.color : chartColors.light}`,
                cursor: 'pointer',
                transition: 'all 0.15s',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>{segment.icon}</div>
              <div style={{ fontSize: '9px', fontWeight: 600, color: segment.color, marginBottom: '4px' }}>{segment.name}</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: chartColors.charcoal }}>{segment.percent}%</div>
              <div style={{ fontSize: '8px', color: chartColors.gray }}>{segment.count.toLocaleString()} users</div>
              <div style={{ fontSize: '8px', color: segment.color, marginTop: '4px' }}>{revenueContribution}% revenue</div>
            </div>
          );
        })}
      </div>

      {viewMode === 'overview' && selectedSegment && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {(() => {
            const segment = data.segments.find(s => s.id === selectedSegment);
            if (!segment) return null;
            
            return (
              <>
                {/* Characteristics */}
                <div style={{
                  padding: '16px',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  border: `1px solid ${chartColors.light}`
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
                    {segment.icon} {segment.name.toUpperCase()} CHARACTERISTICS
                  </div>
                  {segment.characteristics.map((char, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px',
                      backgroundColor: i % 2 === 0 ? chartColors.background : 'white',
                      borderRadius: '6px',
                      marginBottom: '4px'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: segment.color
                      }} />
                      <span style={{ fontSize: '10px', color: chartColors.charcoal }}>{char}</span>
                    </div>
                  ))}
                </div>

                {/* Behavior */}
                <div style={{
                  padding: '16px',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  border: `1px solid ${chartColors.light}`
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
                    BEHAVIOR METRICS
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: segment.color }}>{segment.behavior.avgSessions}</div>
                      <div style={{ fontSize: '9px', color: chartColors.gray }}>Avg Sessions/mo</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: segment.color }}>{segment.behavior.avgDuration}m</div>
                      <div style={{ fontSize: '9px', color: chartColors.gray }}>Avg Duration</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: segment.color }}>{segment.behavior.featureAdoption}%</div>
                      <div style={{ fontSize: '9px', color: chartColors.gray }}>Feature Adoption</div>
                    </div>
                  </div>
                  
                  {/* Value indicator */}
                  <div style={{
                    marginTop: '16px',
                    padding: '10px',
                    backgroundColor: `${segment.color}10`,
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '10px', color: chartColors.gray }}>Lifetime Value Tier</div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: segment.color,
                      textTransform: 'uppercase'
                    }}>
                      {segment.value}
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {viewMode === 'metrics' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, overflow: 'hidden' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr repeat(4, 1fr)',
            gap: '1px',
            backgroundColor: chartColors.light,
            fontSize: '10px'
          }}>
            {/* Header */}
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600 }}>Segment</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>ARPU</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Retention</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>NPS</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Support/User</div>
            
            {/* Rows */}
            {data.segments.map((segment) => (
              <React.Fragment key={segment.id}>
                <div style={{
                  padding: '12px 10px',
                  backgroundColor: selectedSegment === segment.id ? `${segment.color}10` : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedSegment(segment.id)}
                >
                  <span style={{ fontSize: '14px' }}>{segment.icon}</span>
                  <span style={{ fontWeight: 600, color: segment.color }}>{segment.name}</span>
                </div>
                <div style={{
                  padding: '12px 10px',
                  backgroundColor: selectedSegment === segment.id ? `${segment.color}10` : 'white',
                  textAlign: 'center',
                  fontWeight: 600
                }}>
                  ${segment.metrics.arpu}
                </div>
                <div style={{
                  padding: '12px 10px',
                  backgroundColor: selectedSegment === segment.id ? `${segment.color}10` : 'white',
                  textAlign: 'center',
                  fontWeight: 600,
                  color: segment.metrics.retention >= 80 ? chartColors.primary : segment.metrics.retention >= 50 ? chartColors.secondary : chartColors.dark
                }}>
                  {segment.metrics.retention}%
                </div>
                <div style={{
                  padding: '12px 10px',
                  backgroundColor: selectedSegment === segment.id ? `${segment.color}10` : 'white',
                  textAlign: 'center',
                  fontWeight: 600,
                  color: segment.metrics.nps >= 50 ? chartColors.primary : segment.metrics.nps >= 0 ? chartColors.secondary : chartColors.dark
                }}>
                  {segment.metrics.nps}
                </div>
                <div style={{
                  padding: '12px 10px',
                  backgroundColor: selectedSegment === segment.id ? `${segment.color}10` : 'white',
                  textAlign: 'center',
                  color: segment.metrics.supportTickets > 2 ? chartColors.dark : chartColors.charcoal
                }}>
                  {segment.metrics.supportTickets}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'actions' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {data.segments.map((segment) => {
            const actions = data.actions[segment.id as keyof typeof data.actions];
            
            return (
              <div key={segment.id} style={{
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '10px',
                border: `2px solid ${segment.color}`,
                borderLeft: `4px solid ${segment.color}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '18px' }}>{segment.icon}</span>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: segment.color }}>{segment.name}</div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>{segment.count.toLocaleString()} users ({segment.percent}%)</div>
                  </div>
                </div>
                
                <div style={{ fontSize: '10px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
                  RECOMMENDED ACTIONS
                </div>
                {actions.map((action, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    backgroundColor: `${segment.color}08`,
                    borderRadius: '6px',
                    marginBottom: '4px'
                  }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: segment.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: 600
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: '10px', color: chartColors.charcoal }}>{action}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserSegmentation;
