"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Alert Storm Dashboard data
const defaultData = {
  timeWindow: 'Last 30 minutes',
  totalAlerts: 847,
  correlatedIncidents: 3,
  noiseReduction: 94, // percentage
  alertClusters: [
    {
      id: 'cluster-1',
      rootCause: 'Database Connection Pool Exhaustion',
      severity: 'critical',
      affectedServices: ['payment-api', 'order-service', 'checkout-service'],
      alertCount: 342,
      startTime: '14:32:15',
      status: 'active',
      alerts: [
        { type: 'HighLatency', service: 'payment-api', count: 89, firstSeen: '14:32:15' },
        { type: 'ErrorRateSpike', service: 'payment-api', count: 67, firstSeen: '14:32:18' },
        { type: 'ConnectionTimeout', service: 'payment-api', count: 45, firstSeen: '14:32:20' },
        { type: 'HighLatency', service: 'order-service', count: 52, firstSeen: '14:33:05' },
        { type: 'UpstreamTimeout', service: 'checkout-service', count: 89, firstSeen: '14:33:12' },
      ],
      suggestedAction: 'Scale DB connection pool or investigate slow queries',
      incidentId: 'INC-2847',
    },
    {
      id: 'cluster-2',
      rootCause: 'Kubernetes Node Memory Pressure',
      severity: 'warning',
      affectedServices: ['search-api', 'recommendation-service'],
      alertCount: 156,
      startTime: '14:45:30',
      status: 'active',
      alerts: [
        { type: 'MemoryHigh', service: 'search-api', count: 45, firstSeen: '14:45:30' },
        { type: 'PodEvicted', service: 'search-api', count: 12, firstSeen: '14:46:00' },
        { type: 'MemoryHigh', service: 'recommendation-service', count: 38, firstSeen: '14:45:35' },
        { type: 'OOMKilled', service: 'recommendation-service', count: 8, firstSeen: '14:47:00' },
        { type: 'NodeNotReady', service: 'cluster', count: 3, firstSeen: '14:48:00' },
      ],
      suggestedAction: 'Drain node worker-3 and investigate memory leak',
      incidentId: null,
    },
    {
      id: 'cluster-3',
      rootCause: 'Certificate Expiry Warning',
      severity: 'info',
      affectedServices: ['api-gateway'],
      alertCount: 24,
      startTime: '14:00:00',
      status: 'acknowledged',
      alerts: [
        { type: 'CertExpiringSoon', service: 'api-gateway', count: 24, firstSeen: '14:00:00' },
      ],
      suggestedAction: 'Renew TLS certificate (expires in 7 days)',
      incidentId: null,
    },
  ],
  suppressedAlerts: [
    { type: 'HighCPU', reason: 'Maintenance window', count: 45 },
    { type: 'DiskSpaceWarning', reason: 'Known issue - scheduled cleanup', count: 23 },
    { type: 'HealthCheckFailed', reason: 'Flapping detection', count: 18 },
  ],
  alertTimeline: [
    { minute: 0, raw: 45, correlated: 2 }, { minute: 1, raw: 52, correlated: 3 }, { minute: 2, raw: 38, correlated: 2 },
    { minute: 3, raw: 61, correlated: 4 }, { minute: 4, raw: 48, correlated: 2 }, { minute: 5, raw: 55, correlated: 3 },
    { minute: 6, raw: 42, correlated: 2 }, { minute: 7, raw: 58, correlated: 3 }, { minute: 8, raw: 35, correlated: 2 },
    { minute: 9, raw: 67, correlated: 4 }, { minute: 10, raw: 51, correlated: 3 }, { minute: 11, raw: 44, correlated: 2 },
    { minute: 12, raw: 62, correlated: 3 }, { minute: 13, raw: 185, correlated: 4 }, { minute: 14, raw: 210, correlated: 5 },
    { minute: 15, raw: 195, correlated: 4 }, { minute: 16, raw: 225, correlated: 5 }, { minute: 17, raw: 180, correlated: 4 },
    { minute: 18, raw: 205, correlated: 5 }, { minute: 19, raw: 190, correlated: 4 }, { minute: 20, raw: 68, correlated: 3 },
    { minute: 21, raw: 54, correlated: 3 }, { minute: 22, raw: 47, correlated: 2 }, { minute: 23, raw: 59, correlated: 3 },
    { minute: 24, raw: 41, correlated: 2 }, { minute: 25, raw: 56, correlated: 3 }, { minute: 26, raw: 49, correlated: 2 },
    { minute: 27, raw: 63, correlated: 3 }, { minute: 28, raw: 45, correlated: 2 }, { minute: 29, raw: 52, correlated: 3 },
  ],
};

const severityConfig: Record<string, { color: string; bg: string; icon: string }> = {
  critical: { color: chartColors.dark, bg: chartColors.light, icon: '🔴' },
  warning: { color: chartColors.secondary, bg: chartColors.light, icon: '🟡' },
  info: { color: chartColors.navy, bg: chartColors.light, icon: '🔵' },
};

interface AlertStormDashboardProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const AlertStormDashboard: React.FC<AlertStormDashboardProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Alert Storm Dashboard"
}) => {
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);

  const chartWidth = width - 80;
  const chartHeight = 80;
  const maxRaw = Math.max(...data.alertTimeline.map(d => d.raw));

  return (
    <div style={{ width: '100%' }}>
      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '16px' }}>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: chartColors.dark }}>{data.totalAlerts}</div>
          <div style={{ fontSize: '9px', color: chartColors.dark }}>Raw Alerts</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: chartColors.primary }}>{data.correlatedIncidents}</div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>Correlated Incidents</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.background, borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: chartColors.charcoal }}>
            {data.suppressedAlerts.reduce((sum, a) => sum + a.count, 0)}
          </div>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>Suppressed</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.background, borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: chartColors.charcoal }}>
            {data.alertClusters.filter(c => c.status === 'active').length}
          </div>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>Active Clusters</div>
        </div>
      </div>

      {/* Alert Timeline */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        border: `1px solid ${chartColors.light}`,
        padding: '12px 16px',
        marginBottom: '16px'
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
          Alert Volume (Raw vs Correlated)
        </div>
        <svg width={chartWidth} height={chartHeight + 20}>
          <g transform="translate(40, 0)">
            {/* Raw alerts bars */}
            {data.alertTimeline.map((d, i) => (
              <g key={i}>
                <rect
                  x={(i / data.alertTimeline.length) * (chartWidth - 40)}
                  y={chartHeight - (d.raw / maxRaw) * chartHeight}
                  width={(chartWidth - 40) / data.alertTimeline.length - 2}
                  height={(d.raw / maxRaw) * chartHeight}
                  fill={chartColors.light}
                  rx={2}
                />
                <rect
                  x={(i / data.alertTimeline.length) * (chartWidth - 40)}
                  y={chartHeight - (d.correlated / maxRaw) * chartHeight * 10}
                  width={(chartWidth - 40) / data.alertTimeline.length - 2}
                  height={Math.max((d.correlated / maxRaw) * chartHeight * 10, 3)}
                  fill={chartColors.primary}
                  rx={2}
                />
              </g>
            ))}
            
            {/* Y axis */}
            <text x={-10} y={10} fontSize={8} fill={chartColors.gray} textAnchor="end">{maxRaw}</text>
            <text x={-10} y={chartHeight} fontSize={8} fill={chartColors.gray} textAnchor="end">0</text>
            
            {/* X axis labels */}
            <text x={0} y={chartHeight + 15} fontSize={8} fill={chartColors.gray}>-30m</text>
            <text x={(chartWidth - 40) / 2} y={chartHeight + 15} fontSize={8} fill={chartColors.gray} textAnchor="middle">-15m</text>
            <text x={chartWidth - 40} y={chartHeight + 15} fontSize={8} fill={chartColors.gray} textAnchor="end">now</text>
          </g>
        </svg>
        <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: chartColors.light, borderRadius: '2px' }} />
            <span style={{ fontSize: '9px', color: chartColors.gray }}>Raw Alerts</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: chartColors.primary, borderRadius: '2px' }} />
            <span style={{ fontSize: '9px', color: chartColors.gray }}>Correlated Incidents</span>
          </div>
        </div>
      </div>

      {/* Alert Clusters */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
          Correlated Alert Clusters
        </div>
        
        {data.alertClusters.map((cluster) => {
          const sev = severityConfig[cluster.severity];
          const isSelected = selectedCluster === cluster.id;
          
          return (
            <div
              key={cluster.id}
              onClick={() => setSelectedCluster(isSelected ? null : cluster.id)}
              style={{
                padding: '12px',
                backgroundColor: isSelected ? `${sev.color}08` : 'white',
                borderRadius: '10px',
                border: `2px solid ${isSelected ? sev.color : chartColors.light}`,
                marginBottom: '8px',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px' }}>{sev.icon}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>
                      {cluster.rootCause}
                    </span>
                    {cluster.incidentId && (
                      <span style={{
                        padding: '2px 6px',
                        backgroundColor: chartColors.light,
                        color: chartColors.navy,
                        borderRadius: '4px',
                        fontSize: '9px',
                        fontWeight: 600
                      }}>
                        {cluster.incidentId}
                      </span>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '12px', fontSize: '10px', color: chartColors.gray }}>
                    <span>{cluster.alertCount} alerts</span>
                    <span>Started {cluster.startTime}</span>
                    <span>{cluster.affectedServices.length} services</span>
                  </div>
                </div>
                
                <div style={{
                  padding: '4px 10px',
                  backgroundColor: cluster.status === 'active' ? sev.bg : chartColors.light,
                  color: cluster.status === 'active' ? sev.color : chartColors.gray,
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>
                  {cluster.status}
                </div>
              </div>
              
              {/* Expanded Details */}
              {isSelected && (
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${chartColors.light}` }}>
                  {/* Alert Types */}
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '9px', fontWeight: 600, color: chartColors.gray, marginBottom: '6px' }}>
                      ALERT BREAKDOWN
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {cluster.alerts.map((alert, i) => (
                        <div key={i} style={{
                          padding: '4px 8px',
                          backgroundColor: chartColors.background,
                          borderRadius: '4px',
                          fontSize: '9px'
                        }}>
                          <span style={{ fontWeight: 600, color: chartColors.charcoal }}>{alert.type}</span>
                          <span style={{ color: chartColors.gray }}> ({alert.service})</span>
                          <span style={{ color: sev.color, fontWeight: 600 }}> ×{alert.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Affected Services */}
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '9px', fontWeight: 600, color: chartColors.gray, marginBottom: '6px' }}>
                      AFFECTED SERVICES
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {cluster.affectedServices.map((service, i) => (
                        <span key={i} style={{
                          padding: '3px 8px',
                          backgroundColor: sev.bg,
                          color: sev.color,
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontFamily: 'monospace'
                        }}>
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Suggested Action */}
                  <div style={{
                    padding: '10px',
                    backgroundColor: chartColors.light,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '14px' }}>💡</span>
                    <div>
                      <div style={{ fontSize: '9px', fontWeight: 600, color: chartColors.navy }}>SUGGESTED ACTION</div>
                      <div style={{ fontSize: '11px', color: chartColors.navy }}>{cluster.suggestedAction}</div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <button style={{
                      flex: 1,
                      padding: '8px',
                      fontSize: '10px',
                      backgroundColor: 'white',
                      color: chartColors.charcoal,
                      border: `1px solid ${chartColors.light}`,
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      Acknowledge
                    </button>
                    <button style={{
                      flex: 1,
                      padding: '8px',
                      fontSize: '10px',
                      backgroundColor: cluster.incidentId ? chartColors.light : sev.color,
                      color: cluster.incidentId ? chartColors.gray : 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: cluster.incidentId ? 'not-allowed' : 'pointer'
                    }}>
                      {cluster.incidentId ? 'Incident Created' : 'Create Incident'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Suppressed Alerts */}
      <div style={{ 
        padding: '12px',
        backgroundColor: chartColors.background,
        borderRadius: '10px',
        border: `1px solid ${chartColors.light}`
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
          Suppressed Alerts
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {data.suppressedAlerts.map((alert, i) => (
            <div key={i} style={{
              padding: '6px 10px',
              backgroundColor: 'white',
              borderRadius: '6px',
              border: `1px solid ${chartColors.light}`,
              fontSize: '10px'
            }}>
              <span style={{ fontWeight: 600, color: chartColors.charcoal }}>{alert.type}</span>
              <span style={{ color: chartColors.gray }}> ({alert.count})</span>
              <div style={{ fontSize: '9px', color: chartColors.gray }}>{alert.reason}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertStormDashboard;
