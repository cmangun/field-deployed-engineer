"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Feature Flag Dashboard data
const defaultData = {
  totalFlags: 47,
  activeExperiments: 8,
  summary: {
    enabled: 32,
    disabled: 15,
    stale: 6,
    experiments: 8,
  },
  flags: [
    {
      id: 'new-checkout-flow',
      name: 'New Checkout Flow',
      description: 'Streamlined 3-step checkout experience',
      type: 'experiment',
      status: 'running',
      rollout: 50,
      owner: 'Sarah Chen',
      createdAt: '2024-10-15',
      environments: { dev: true, staging: true, prod: true },
      targeting: { users: 125000, segments: ['Premium', 'Pro'] },
      metrics: { conversion: '+12%', revenue: '+8%', bounceRate: '-5%' },
      killSwitch: false,
    },
    {
      id: 'ai-recommendations',
      name: 'AI-Powered Recommendations',
      description: 'ML-based product suggestions on homepage',
      type: 'experiment',
      status: 'running',
      rollout: 25,
      owner: 'Mike Johnson',
      createdAt: '2024-11-01',
      environments: { dev: true, staging: true, prod: true },
      targeting: { users: 62500, segments: ['All'] },
      metrics: { ctr: '+18%', engagement: '+22%', orders: '+6%' },
      killSwitch: false,
    },
    {
      id: 'dark-mode',
      name: 'Dark Mode',
      description: 'System-wide dark theme support',
      type: 'release',
      status: 'enabled',
      rollout: 100,
      owner: 'Alex Kim',
      createdAt: '2024-09-20',
      environments: { dev: true, staging: true, prod: true },
      targeting: { users: 250000, segments: ['All'] },
      metrics: null,
      killSwitch: false,
    },
    {
      id: 'new-payment-gateway',
      name: 'Stripe Payment v3',
      description: 'Upgraded payment processing integration',
      type: 'release',
      status: 'enabled',
      rollout: 75,
      owner: 'David Park',
      createdAt: '2024-10-28',
      environments: { dev: true, staging: true, prod: true },
      targeting: { users: 187500, segments: ['Enterprise', 'Pro'] },
      metrics: null,
      killSwitch: true,
    },
    {
      id: 'beta-dashboard',
      name: 'Analytics Dashboard v2',
      description: 'Revamped analytics with real-time data',
      type: 'beta',
      status: 'enabled',
      rollout: 10,
      owner: 'Lisa Wong',
      createdAt: '2024-11-10',
      environments: { dev: true, staging: true, prod: true },
      targeting: { users: 25000, segments: ['Beta Testers'] },
      metrics: null,
      killSwitch: true,
    },
    {
      id: 'mobile-biometrics',
      name: 'Biometric Login',
      description: 'Face ID / Touch ID authentication',
      type: 'release',
      status: 'disabled',
      rollout: 0,
      owner: 'Sarah Chen',
      createdAt: '2024-08-15',
      environments: { dev: true, staging: true, prod: false },
      targeting: { users: 0, segments: [] },
      metrics: null,
      killSwitch: false,
    },
    {
      id: 'legacy-export',
      name: 'CSV Export (Legacy)',
      description: 'Old export functionality - deprecated',
      type: 'ops',
      status: 'stale',
      rollout: 100,
      owner: 'Unknown',
      createdAt: '2023-03-10',
      environments: { dev: true, staging: true, prod: true },
      targeting: { users: 250000, segments: ['All'] },
      metrics: null,
      killSwitch: false,
      daysOld: 620,
    },
  ],
  recentChanges: [
    { flag: 'new-checkout-flow', action: 'Rollout increased', from: '25%', to: '50%', by: 'Sarah Chen', when: '2 hours ago' },
    { flag: 'ai-recommendations', action: 'Created', from: null, to: null, by: 'Mike Johnson', when: '1 day ago' },
    { flag: 'dark-mode', action: 'Enabled for all', from: '75%', to: '100%', by: 'Alex Kim', when: '3 days ago' },
  ],
};

const typeConfig: Record<string, { color: string; bg: string; label: string }> = {
  experiment: { color: chartColors.navy, bg: chartColors.light, label: '🧪 Experiment' },
  release: { color: chartColors.primary, bg: chartColors.light, label: '🚀 Release' },
  beta: { color: chartColors.secondary, bg: chartColors.light, label: '⭐ Beta' },
  ops: { color: chartColors.muted, bg: chartColors.light, label: '⚙️ Ops' },
};

const statusConfig: Record<string, { color: string; bg: string }> = {
  running: { color: chartColors.navy, bg: chartColors.light },
  enabled: { color: chartColors.primary, bg: chartColors.light },
  disabled: { color: chartColors.muted, bg: chartColors.light },
  stale: { color: chartColors.dark, bg: chartColors.light },
};

interface FeatureFlagDashboardProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const FeatureFlagDashboard: React.FC<FeatureFlagDashboardProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Feature Flag Dashboard"
}) => {
  const [selectedFlag, setSelectedFlag] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filteredFlags = data.flags.filter(f => {
    if (filterType && f.type !== filterType) return false;
    if (filterStatus && f.status !== filterStatus) return false;
    return true;
  });

  return (
    <div style={{ width: '100%' }}>
      {/* Filters */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <span style={{ fontSize: '10px', color: chartColors.gray, padding: '4px 0' }}>Type:</span>
          {Object.entries(typeConfig).map(([type, config]) => (
            <button
              key={type}
              onClick={() => setFilterType(filterType === type ? null : type)}
              style={{
                padding: '4px 8px',
                fontSize: '9px',
                backgroundColor: filterType === type ? config.color : 'white',
                color: filterType === type ? 'white' : config.color,
                border: `1px solid ${config.color}`,
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {config.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '4px', marginLeft: '12px' }}>
          <span style={{ fontSize: '10px', color: chartColors.gray, padding: '4px 0' }}>Status:</span>
          {Object.entries(statusConfig).map(([status, config]) => (
            <button
              key={status}
              onClick={() => setFilterStatus(filterStatus === status ? null : status)}
              style={{
                padding: '4px 8px',
                fontSize: '9px',
                backgroundColor: filterStatus === status ? config.color : 'white',
                color: filterStatus === status ? 'white' : config.color,
                border: `1px solid ${config.color}`,
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Flags List */}
      <div style={{ maxHeight: '320px', overflowY: 'auto', marginBottom: '12px' }}>
        {filteredFlags.map((flag) => {
          const typeConf = typeConfig[flag.type];
          const statusConf = statusConfig[flag.status];
          const isSelected = selectedFlag === flag.id;
          
          return (
            <div
              key={flag.id}
              onClick={() => setSelectedFlag(isSelected ? null : flag.id)}
              style={{
                padding: '12px',
                backgroundColor: isSelected ? chartColors.background : 'white',
                borderRadius: '10px',
                border: `2px solid ${isSelected ? chartColors.teal : chartColors.light}`,
                marginBottom: '8px',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {/* Flag Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>{flag.name}</span>
                    <span style={{
                      padding: '2px 6px',
                      backgroundColor: typeConf.bg,
                      color: typeConf.color,
                      borderRadius: '4px',
                      fontSize: '8px',
                      fontWeight: 600
                    }}>
                      {typeConf.label}
                    </span>
                    {flag.killSwitch && (
                      <span style={{
                        padding: '2px 6px',
                        backgroundColor: chartColors.light,
                        color: chartColors.dark,
                        borderRadius: '4px',
                        fontSize: '8px',
                        fontWeight: 600
                      }}>
                        🔴 Kill Switch
                      </span>
                    )}
                    {flag.daysOld && flag.daysOld > 180 && (
                      <span style={{
                        padding: '2px 6px',
                        backgroundColor: chartColors.light,
                        color: chartColors.dark,
                        borderRadius: '4px',
                        fontSize: '8px'
                      }}>
                        ⚠️ {flag.daysOld}d old
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '10px', color: chartColors.gray }}>{flag.description}</div>
                </div>
                
                {/* Rollout Progress */}
                <div style={{ textAlign: 'right', minWidth: '100px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                    <div style={{ width: '60px', height: '8px', backgroundColor: chartColors.light, borderRadius: '4px' }}>
                      <div style={{
                        width: `${flag.rollout}%`,
                        height: '100%',
                        backgroundColor: statusConf.color,
                        borderRadius: '4px'
                      }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: statusConf.color }}>{flag.rollout}%</span>
                  </div>
                  <div style={{
                    fontSize: '9px',
                    color: statusConf.color,
                    textTransform: 'capitalize',
                    marginTop: '2px'
                  }}>
                    {flag.status}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isSelected && (
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${chartColors.light}` }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {/* Environments */}
                    <div>
                      <div style={{ fontSize: '9px', fontWeight: 600, color: chartColors.gray, marginBottom: '4px' }}>
                        ENVIRONMENTS
                      </div>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {Object.entries(flag.environments).map(([env, enabled]) => (
                          <span key={env} style={{
                            padding: '3px 6px',
                            backgroundColor: enabled ? chartColors.light : chartColors.light,
                            color: enabled ? chartColors.navy : chartColors.gray,
                            borderRadius: '4px',
                            fontSize: '9px',
                            textTransform: 'uppercase'
                          }}>
                            {enabled ? '✓' : '✗'} {env}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Targeting */}
                    <div>
                      <div style={{ fontSize: '9px', fontWeight: 600, color: chartColors.gray, marginBottom: '4px' }}>
                        TARGETING
                      </div>
                      <div style={{ fontSize: '10px', color: chartColors.charcoal }}>
                        {flag.targeting.users.toLocaleString()} users
                      </div>
                      <div style={{ fontSize: '9px', color: chartColors.gray }}>
                        {flag.targeting.segments.join(', ') || 'No segments'}
                      </div>
                    </div>
                    
                    {/* Owner & Date */}
                    <div>
                      <div style={{ fontSize: '9px', fontWeight: 600, color: chartColors.gray, marginBottom: '4px' }}>
                        OWNER
                      </div>
                      <div style={{ fontSize: '10px', color: chartColors.charcoal }}>{flag.owner}</div>
                      <div style={{ fontSize: '9px', color: chartColors.gray }}>Created {flag.createdAt}</div>
                    </div>
                  </div>
                  
                  {/* Experiment Metrics */}
                  {flag.metrics && (
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ fontSize: '9px', fontWeight: 600, color: chartColors.gray, marginBottom: '4px' }}>
                        EXPERIMENT METRICS
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {Object.entries(flag.metrics).map(([metric, value]) => (
                          <div key={metric} style={{
                            padding: '6px 10px',
                            backgroundColor: String(value).startsWith('+') ? chartColors.light : String(value).startsWith('-') ? chartColors.light : chartColors.background,
                            borderRadius: '6px'
                          }}>
                            <div style={{
                              fontSize: '14px',
                              fontWeight: 700,
                              color: String(value).startsWith('+') ? chartColors.primary : String(value).startsWith('-') ? chartColors.dark : chartColors.charcoal
                            }}>
                              {value}
                            </div>
                            <div style={{ fontSize: '8px', color: chartColors.gray, textTransform: 'capitalize' }}>
                              {metric.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button style={{
                      padding: '6px 12px',
                      fontSize: '10px',
                      backgroundColor: 'white',
                      color: chartColors.charcoal,
                      border: `1px solid ${chartColors.light}`,
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      Edit Rules
                    </button>
                    <button style={{
                      padding: '6px 12px',
                      fontSize: '10px',
                      backgroundColor: flag.rollout < 100 ? chartColors.primary : chartColors.light,
                      color: flag.rollout < 100 ? 'white' : chartColors.gray,
                      border: 'none',
                      borderRadius: '6px',
                      cursor: flag.rollout < 100 ? 'pointer' : 'not-allowed'
                    }}>
                      {flag.rollout < 100 ? 'Increase Rollout' : 'Fully Rolled Out'}
                    </button>
                    {flag.killSwitch && (
                      <button style={{
                        padding: '6px 12px',
                        fontSize: '10px',
                        backgroundColor: chartColors.dark,
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}>
                        🔴 Kill Switch
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Recent Changes */}
      <div style={{
        padding: '12px',
        backgroundColor: chartColors.background,
        borderRadius: '8px'
      }}>
        <div style={{ fontSize: '10px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
          RECENT CHANGES
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {data.recentChanges.map((change, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
              <div>
                <span style={{ fontWeight: 600, color: chartColors.charcoal }}>{change.flag}</span>
                <span style={{ color: chartColors.gray }}> - {change.action}</span>
                {change.from && (
                  <span style={{ color: chartColors.gray }}> ({change.from} → {change.to})</span>
                )}
              </div>
              <div style={{ color: chartColors.gray }}>
                {change.by} • {change.when}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureFlagDashboard;
