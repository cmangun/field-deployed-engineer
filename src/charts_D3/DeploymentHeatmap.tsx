"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Deployment Heatmap data
const defaultData = {
  asOf: 'November 22, 2026 15:30 UTC',
  environments: ['production', 'staging', 'development'],
  services: [
    {
      name: 'payment-api',
      team: 'Payments',
      deployments: {
        production: { version: 'v2.4.0', status: 'healthy', deployedAt: '2026-11-20T15:28:00Z', deployedBy: 'Mike Johnson', commit: 'a1b2c3d' },
        staging: { version: 'v2.4.2', status: 'healthy', deployedAt: '2026-11-22T10:15:00Z', deployedBy: 'Sarah Chen', commit: 'e4f5g6h' },
        development: { version: 'v2.5.0-rc1', status: 'healthy', deployedAt: '2026-11-22T14:30:00Z', deployedBy: 'David Kim', commit: 'i7j8k9l' },
      }
    },
    {
      name: 'checkout-service',
      team: 'Commerce',
      deployments: {
        production: { version: 'v3.1.2', status: 'healthy', deployedAt: '2026-11-21T09:00:00Z', deployedBy: 'Lisa Wang', commit: 'm1n2o3p' },
        staging: { version: 'v3.1.3', status: 'deploying', deployedAt: '2026-11-22T15:20:00Z', deployedBy: 'CI/CD', commit: 'q4r5s6t', progress: 65 },
        development: { version: 'v3.2.0-dev', status: 'healthy', deployedAt: '2026-11-22T11:45:00Z', deployedBy: 'Tom Brown', commit: 'u7v8w9x' },
      }
    },
    {
      name: 'order-service',
      team: 'Commerce',
      deployments: {
        production: { version: 'v4.0.1', status: 'healthy', deployedAt: '2026-11-19T14:22:00Z', deployedBy: 'Sarah Chen', commit: 'y1z2a3b' },
        staging: { version: 'v4.0.1', status: 'healthy', deployedAt: '2026-11-19T11:00:00Z', deployedBy: 'CI/CD', commit: 'y1z2a3b' },
        development: { version: 'v4.1.0-dev', status: 'failed', deployedAt: '2026-11-22T13:10:00Z', deployedBy: 'Mike Johnson', commit: 'c4d5e6f', error: 'Build failed: test timeout' },
      }
    },
    {
      name: 'user-service',
      team: 'Platform',
      deployments: {
        production: { version: 'v5.2.0', status: 'healthy', deployedAt: '2026-11-18T16:45:00Z', deployedBy: 'David Kim', commit: 'g7h8i9j' },
        staging: { version: 'v5.2.1', status: 'healthy', deployedAt: '2026-11-21T08:30:00Z', deployedBy: 'CI/CD', commit: 'k1l2m3n' },
        development: { version: 'v5.3.0-alpha', status: 'healthy', deployedAt: '2026-11-22T09:00:00Z', deployedBy: 'Lisa Wang', commit: 'o4p5q6r' },
      }
    },
    {
      name: 'notification-service',
      team: 'Platform',
      deployments: {
        production: { version: 'v1.8.3', status: 'rollback', deployedAt: '2026-11-22T14:00:00Z', deployedBy: 'Tom Brown', commit: 's7t8u9v', rollbackFrom: 'v1.8.4' },
        staging: { version: 'v1.8.4', status: 'healthy', deployedAt: '2026-11-21T15:00:00Z', deployedBy: 'CI/CD', commit: 'w1x2y3z' },
        development: { version: 'v1.9.0-dev', status: 'healthy', deployedAt: '2026-11-22T10:00:00Z', deployedBy: 'Sarah Chen', commit: 'a4b5c6d' },
      }
    },
    {
      name: 'search-api',
      team: 'Discovery',
      deployments: {
        production: { version: 'v2.0.5', status: 'healthy', deployedAt: '2026-11-17T10:30:00Z', deployedBy: 'Mike Johnson', commit: 'e7f8g9h' },
        staging: { version: 'v2.0.6', status: 'pending', deployedAt: null, deployedBy: null, commit: 'i1j2k3l' },
        development: { version: 'v2.1.0-dev', status: 'healthy', deployedAt: '2026-11-22T08:15:00Z', deployedBy: 'David Kim', commit: 'm4n5o6p' },
      }
    },
    {
      name: 'inventory-service',
      team: 'Commerce',
      deployments: {
        production: { version: 'v3.3.1', status: 'healthy', deployedAt: '2026-11-20T11:00:00Z', deployedBy: 'Lisa Wang', commit: 'q7r8s9t' },
        staging: { version: 'v3.3.2', status: 'healthy', deployedAt: '2026-11-21T14:30:00Z', deployedBy: 'CI/CD', commit: 'u1v2w3x' },
        development: { version: 'v3.4.0-dev', status: 'healthy', deployedAt: '2026-11-22T12:00:00Z', deployedBy: 'Tom Brown', commit: 'y4z5a6b' },
      }
    },
    {
      name: 'analytics-service',
      team: 'Data',
      deployments: {
        production: { version: 'v6.1.0', status: 'healthy', deployedAt: '2026-11-15T09:00:00Z', deployedBy: 'Sarah Chen', commit: 'c7d8e9f' },
        staging: { version: 'v6.1.1', status: 'healthy', deployedAt: '2026-11-20T16:00:00Z', deployedBy: 'CI/CD', commit: 'g1h2i3j' },
        development: { version: 'v6.2.0-dev', status: 'healthy', deployedAt: '2026-11-22T07:30:00Z', deployedBy: 'Mike Johnson', commit: 'k4l5m6n' },
      }
    },
  ],
  summary: {
    healthy: 20,
    deploying: 1,
    failed: 1,
    rollback: 1,
    pending: 1,
  },
  recentActivity: [
    { service: 'checkout-service', env: 'staging', action: 'deploy', time: '2 min ago', status: 'in-progress' },
    { service: 'notification-service', env: 'production', action: 'rollback', time: '1 hr ago', status: 'complete' },
    { service: 'order-service', env: 'development', action: 'deploy', time: '2 hr ago', status: 'failed' },
  ]
};

const statusConfig: Record<string, { color: string; bg: string; icon: string; label: string }> = {
  healthy: { color: chartColors.primary, bg: chartColors.light, icon: '✓', label: 'Healthy' },
  deploying: { color: chartColors.navy, bg: chartColors.light, icon: '◐', label: 'Deploying' },
  failed: { color: chartColors.dark, bg: chartColors.light, icon: '✕', label: 'Failed' },
  rollback: { color: chartColors.secondary, bg: chartColors.light, icon: '↩', label: 'Rollback' },
  pending: { color: chartColors.secondary, bg: chartColors.light, icon: '○', label: 'Pending' },
};

const envConfig: Record<string, { color: string; label: string }> = {
  production: { color: chartColors.dark, label: 'PROD' },
  staging: { color: chartColors.secondary, label: 'STG' },
  development: { color: chartColors.primary, label: 'DEV' },
};

interface DeploymentHeatmapProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const DeploymentHeatmap: React.FC<DeploymentHeatmapProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Deployment Status"
}) => {
  const [selectedCell, setSelectedCell] = useState<{ service: string; env: string } | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterTeam, setFilterTeam] = useState<string | null>(null);

  // Get unique teams
  const teams = [...new Set(data.services.map(s => s.team))];

  // Filter services
  const filteredServices = data.services.filter(service => {
    if (filterTeam && service.team !== filterTeam) return false;
    if (filterStatus) {
      const hasStatus = Object.values(service.deployments).some(d => d.status === filterStatus);
      if (!hasStatus) return false;
    }
    return true;
  });

  // Get time ago string
  const getTimeAgo = (dateStr: string | null) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return `${diffMins}m ago`;
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Team Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button
          onClick={() => setFilterTeam(null)}
          style={{
            padding: '4px 12px',
            fontSize: '10px',
            backgroundColor: !filterTeam ? chartColors.charcoal : 'white',
            color: !filterTeam ? 'white' : chartColors.charcoal,
            border: `1px solid ${chartColors.light}`,
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          All Teams
        </button>
        {teams.map(team => (
          <button
            key={team}
            onClick={() => setFilterTeam(filterTeam === team ? null : team)}
            style={{
              padding: '4px 12px',
              fontSize: '10px',
              backgroundColor: filterTeam === team ? chartColors.teal : 'white',
              color: filterTeam === team ? 'white' : chartColors.charcoal,
              border: `1px solid ${chartColors.light}`,
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {team}
          </button>
        ))}
      </div>

      {/* Heatmap Grid */}
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '12px',
        border: `1px solid ${chartColors.light}`,
        overflow: 'hidden'
      }}>
        {/* Header Row */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '140px repeat(3, 1fr)',
          backgroundColor: chartColors.background,
          borderBottom: `1px solid ${chartColors.light}`
        }}>
          <div style={{ padding: '10px 12px', fontSize: '10px', fontWeight: 600, color: chartColors.charcoalLight }}>
            Service
          </div>
          {data.environments.map(env => (
            <div key={env} style={{ 
              padding: '10px 12px', 
              textAlign: 'center',
              borderLeft: `1px solid ${chartColors.light}`
            }}>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: envConfig[env].color,
              }}>
                {envConfig[env].label}
              </span>
            </div>
          ))}
        </div>

        {/* Service Rows */}
        {filteredServices.map((service, i) => (
          <div 
            key={service.name}
            style={{ 
              display: 'grid',
              gridTemplateColumns: '140px repeat(3, 1fr)',
              borderBottom: i < filteredServices.length - 1 ? `1px solid ${chartColors.light}` : 'none'
            }}
          >
            {/* Service Name */}
            <div style={{ 
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal, fontFamily: 'monospace' }}>
                {service.name}
              </div>
              <div style={{ fontSize: '9px', color: chartColors.gray }}>{service.team}</div>
            </div>

            {/* Environment Cells */}
            {data.environments.map(env => {
              const deployment = service.deployments[env as keyof typeof service.deployments];
              const config = statusConfig[deployment.status];
              const isSelected = selectedCell?.service === service.name && selectedCell?.env === env;
              
              return (
                <div
                  key={env}
                  onClick={() => setSelectedCell(isSelected ? null : { service: service.name, env })}
                  style={{
                    padding: '10px',
                    borderLeft: `1px solid ${chartColors.light}`,
                    backgroundColor: isSelected ? config.bg : 'transparent',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: config.bg,
                      color: config.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: 700
                    }}>
                      {deployment.status === 'deploying' ? (
                        <span style={{ animation: 'spin 1s linear infinite' }}>◐</span>
                      ) : config.icon}
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal, fontFamily: 'monospace' }}>
                      {deployment.version}
                    </span>
                  </div>
                  
                  {deployment.deployedAt && (
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>
                      {getTimeAgo(deployment.deployedAt)}
                    </div>
                  )}
                  
                  {deployment.status === 'deploying' && deployment.progress && (
                    <div style={{ marginTop: '4px' }}>
                      <div style={{ height: '3px', backgroundColor: chartColors.light, borderRadius: '2px' }}>
                        <div style={{ 
                          height: '100%', 
                          width: `${deployment.progress}%`,
                          backgroundColor: config.color,
                          borderRadius: '2px',
                          transition: 'width 0.3s'
                        }} />
                      </div>
                      <div style={{ fontSize: '8px', color: config.color, marginTop: '2px' }}>
                        {deployment.progress}%
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Selected Cell Details */}
      {selectedCell && (
        <div style={{
          marginTop: '12px',
          padding: '12px 16px',
          backgroundColor: chartColors.background,
          borderRadius: '10px',
          border: `1px solid ${chartColors.light}`
        }}>
          {(() => {
            const service = data.services.find(s => s.name === selectedCell.service);
            const deployment = service?.deployments[selectedCell.env as keyof typeof service.deployments];
            if (!deployment) return null;
            const config = statusConfig[deployment.status];
            
            return (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal, fontFamily: 'monospace' }}>
                      {selectedCell.service}
                    </span>
                    <span style={{ 
                      fontSize: '10px', 
                      padding: '2px 6px', 
                      borderRadius: '4px',
                      backgroundColor: envConfig[selectedCell.env].color,
                      color: 'white'
                    }}>
                      {envConfig[selectedCell.env].label}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: config.bg,
                      color: config.color,
                      fontWeight: 600
                    }}>
                      {config.label}
                    </span>
                  </div>
                  <div style={{ fontSize: '10px', color: chartColors.gray }}>
                    {deployment.version} • Commit: {deployment.commit} • Deployed by: {deployment.deployedBy || 'N/A'}
                  </div>
                  {deployment.error && (
                    <div style={{ fontSize: '10px', color: chartColors.dark, marginTop: '4px' }}>
                      ⚠️ {deployment.error}
                    </div>
                  )}
                  {deployment.rollbackFrom && (
                    <div style={{ fontSize: '10px', color: chartColors.secondary, marginTop: '4px' }}>
                      ↩ Rolled back from {deployment.rollbackFrom}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    padding: '6px 12px',
                    fontSize: '10px',
                    backgroundColor: 'white',
                    color: chartColors.charcoal,
                    border: `1px solid ${chartColors.light}`,
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}>
                    View Logs
                  </button>
                  <button style={{
                    padding: '6px 12px',
                    fontSize: '10px',
                    backgroundColor: chartColors.charcoal,
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}>
                    Promote
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Recent Activity */}
      <div style={{ 
        marginTop: '12px',
        padding: '12px',
        backgroundColor: chartColors.background,
        borderRadius: '10px',
        border: `1px solid ${chartColors.light}`
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
          Recent Activity
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {data.recentActivity.map((activity, i) => {
            const envConf = envConfig[activity.env];
            return (
              <div key={i} style={{ 
                flex: 1,
                padding: '8px',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: `1px solid ${chartColors.light}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: chartColors.charcoal, fontFamily: 'monospace' }}>
                    {activity.service}
                  </span>
                  <span style={{ fontSize: '9px', color: envConf.color, fontWeight: 600 }}>
                    {envConf.label}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '9px', color: chartColors.gray }}>{activity.action}</span>
                  <span style={{ fontSize: '9px', color: chartColors.gray }}>{activity.time}</span>
                </div>
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
        {Object.entries(statusConfig).map(([status, config]) => (
          <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{
              width: '14px',
              height: '14px',
              borderRadius: '3px',
              backgroundColor: config.bg,
              color: config.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '9px',
              fontWeight: 700
            }}>
              {config.icon}
            </div>
            <span style={{ color: chartColors.charcoalLight }}>{config.label}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DeploymentHeatmap;
