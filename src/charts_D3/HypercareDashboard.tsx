"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Hypercare Dashboard data
const defaultData = {
  launchName: 'Platform v2.0 Launch',
  launchDate: '2024-11-10',
  hypercareEnd: '2024-12-10',
  daysRemaining: 12,
  totalDays: 30,
  status: 'active',
  overallHealth: 82,
  metrics: {
    uptime: { current: 99.94, target: 99.9, status: 'green' },
    errorRate: { current: 0.12, target: 0.5, status: 'green' },
    p99Latency: { current: 245, target: 300, status: 'green' },
    ticketVolume: { current: 47, baseline: 35, status: 'yellow' },
    customerSentiment: { current: 4.2, target: 4.0, status: 'green' },
    featureAdoption: { current: 68, target: 50, status: 'green' },
  },
  incidents: [
    { id: 'INC-1247', severity: 'P2', title: 'Slow API responses in EU region', status: 'resolved', duration: '2h 15m', impactedUsers: 1250, resolvedAt: '2024-11-15' },
    { id: 'INC-1251', severity: 'P3', title: 'Dashboard widget rendering issue', status: 'resolved', duration: '45m', impactedUsers: 340, resolvedAt: '2024-11-18' },
    { id: 'INC-1255', severity: 'P3', title: 'Export functionality timeout', status: 'investigating', duration: '1h 20m', impactedUsers: 85, resolvedAt: null },
  ],
  supportQueue: {
    total: 47,
    byPriority: { critical: 2, high: 8, medium: 22, low: 15 },
    avgResponseTime: 1.2,
    avgResolutionTime: 4.8,
    csat: 4.3,
  },
  rollout: {
    totalCustomers: 2500,
    migrated: 2125,
    inProgress: 250,
    scheduled: 125,
    rollback: 0,
  },
  checklistItems: [
    { id: 'c1', category: 'Technical', item: 'Performance benchmarks met', status: 'complete', owner: 'SRE' },
    { id: 'c2', category: 'Technical', item: 'Monitoring & alerting configured', status: 'complete', owner: 'SRE' },
    { id: 'c3', category: 'Technical', item: 'Runbooks updated', status: 'complete', owner: 'SRE' },
    { id: 'c4', category: 'Technical', item: 'Rollback tested', status: 'complete', owner: 'DevOps' },
    { id: 'c5', category: 'Support', item: 'Support team trained', status: 'complete', owner: 'CS' },
    { id: 'c6', category: 'Support', item: 'FAQ documentation live', status: 'complete', owner: 'Docs' },
    { id: 'c7', category: 'Support', item: 'Escalation paths defined', status: 'complete', owner: 'CS' },
    { id: 'c8', category: 'Customer', item: 'Migration guides sent', status: 'complete', owner: 'CSM' },
    { id: 'c9', category: 'Customer', item: 'Executive comms sent', status: 'complete', owner: 'CSM' },
    { id: 'c10', category: 'Customer', item: 'Office hours scheduled', status: 'in-progress', owner: 'CSM' },
    { id: 'c11', category: 'Exit', item: 'Exit criteria defined', status: 'complete', owner: 'PM' },
    { id: 'c12', category: 'Exit', item: 'Retrospective scheduled', status: 'pending', owner: 'PM' },
  ],
  dailyTrend: [
    { day: 1, health: 75, tickets: 65, incidents: 3 },
    { day: 2, health: 72, tickets: 58, incidents: 2 },
    { day: 3, health: 78, tickets: 52, incidents: 1 },
    { day: 4, health: 80, tickets: 48, incidents: 2 },
    { day: 5, health: 82, tickets: 45, incidents: 1 },
    { day: 6, health: 79, tickets: 50, incidents: 2 },
    { day: 7, health: 81, tickets: 47, incidents: 1 },
    { day: 8, health: 83, tickets: 44, incidents: 0 },
    { day: 9, health: 85, tickets: 42, incidents: 1 },
    { day: 10, health: 84, tickets: 45, incidents: 1 },
    { day: 11, health: 82, tickets: 47, incidents: 1 },
  ],
  team: [
    { name: 'Sarah Chen', role: 'Hypercare Lead', status: 'on-call', contact: 'Slack' },
    { name: 'Mike Johnson', role: 'Engineering Lead', status: 'available', contact: 'Slack' },
    { name: 'David Park', role: 'SRE Lead', status: 'on-call', contact: 'PagerDuty' },
    { name: 'Lisa Wong', role: 'CS Lead', status: 'available', contact: 'Slack' },
  ],
};

const severityConfig: Record<string, { color: string; bg: string }> = {
  P1: { color: chartColors.dark, bg: chartColors.light },
  P2: { color: chartColors.secondary, bg: chartColors.light },
  P3: { color: chartColors.secondary, bg: chartColors.light },
  P4: { color: chartColors.primary, bg: chartColors.light },
  critical: { color: chartColors.dark, bg: chartColors.light },
  high: { color: chartColors.secondary, bg: chartColors.light },
  medium: { color: chartColors.secondary, bg: chartColors.light },
  low: { color: chartColors.primary, bg: chartColors.light },
};

const statusColors: Record<string, { color: string; bg: string }> = {
  complete: { color: chartColors.primary, bg: chartColors.light },
  'in-progress': { color: chartColors.navy, bg: chartColors.light },
  pending: { color: chartColors.muted, bg: chartColors.light },
  resolved: { color: chartColors.primary, bg: chartColors.light },
  investigating: { color: chartColors.secondary, bg: chartColors.light },
};

interface HypercareDashboardProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const HypercareDashboard: React.FC<HypercareDashboardProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Hypercare Dashboard"
}) => {
  const [viewMode, setViewMode] = useState<'overview' | 'incidents' | 'checklist'>('overview');
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);

  const progressPercent = ((data.totalDays - data.daysRemaining) / data.totalDays) * 100;
  const getHealthColor = (health: number) => {
    if (health >= 80) return chartColors.primary;
    if (health >= 60) return chartColors.secondary;
    return chartColors.dark;
  };

  const chartWidth = width - 100;

  return (
    <div style={{ width: '100%' }}>
      {/* Hypercare Progress */}
      <div style={{
        padding: '12px 16px',
        backgroundColor: chartColors.background,
        borderRadius: '10px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>
            HYPERCARE PERIOD
          </div>
          <div style={{ fontSize: '11px', color: chartColors.gray }}>
            <span style={{ fontWeight: 600, color: data.daysRemaining <= 7 ? chartColors.primary : chartColors.charcoal }}>
              {data.daysRemaining} days
            </span> remaining
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>{data.launchDate}</div>
          <div style={{ flex: 1, height: '8px', backgroundColor: chartColors.light, borderRadius: '4px', position: 'relative' }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              backgroundColor: chartColors.teal,
              borderRadius: '4px'
            }} />
            <div style={{
              position: 'absolute',
              left: `${progressPercent}%`,
              top: '-4px',
              width: '16px',
              height: '16px',
              backgroundColor: chartColors.teal,
              borderRadius: '50%',
              border: '2px solid white',
              transform: 'translateX(-50%)'
            }} />
          </div>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>{data.hypercareEnd}</div>
        </div>
      </div>

      {viewMode === 'overview' && (
        <>
          {/* Key Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', marginBottom: '16px' }}>
            {Object.entries(data.metrics).map(([key, metric]) => {
              const statusColor = metric.status === 'green' ? chartColors.primary : metric.status === 'yellow' ? chartColors.secondary : chartColors.dark;
              return (
                <div key={key} style={{
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: `1px solid ${chartColors.light}`,
                  borderTop: `3px solid ${statusColor}`,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: statusColor }}>
                    {metric.current}{key === 'uptime' || key === 'featureAdoption' ? '%' : key === 'p99Latency' ? 'ms' : ''}
                  </div>
                  <div style={{ fontSize: '8px', color: chartColors.gray, textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rollout & Support */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Rollout Progress */}
            <div style={{
              padding: '16px',
              backgroundColor: 'white',
              borderRadius: '10px',
              border: `1px solid ${chartColors.light}`
            }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
                ROLLOUT STATUS
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', color: chartColors.gray }}>Migration Progress</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: chartColors.teal }}>
                  {Math.round((data.rollout.migrated / data.rollout.totalCustomers) * 100)}%
                </span>
              </div>
              <div style={{ height: '8px', backgroundColor: chartColors.light, borderRadius: '4px', marginBottom: '12px' }}>
                <div style={{
                  width: `${(data.rollout.migrated / data.rollout.totalCustomers) * 100}%`,
                  height: '100%',
                  backgroundColor: chartColors.teal,
                  borderRadius: '4px'
                }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', fontSize: '9px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, color: chartColors.primary }}>{data.rollout.migrated}</div>
                  <div style={{ color: chartColors.gray }}>Migrated</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, color: chartColors.navy }}>{data.rollout.inProgress}</div>
                  <div style={{ color: chartColors.gray }}>In Progress</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, color: chartColors.secondary }}>{data.rollout.scheduled}</div>
                  <div style={{ color: chartColors.gray }}>Scheduled</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, color: data.rollout.rollback > 0 ? chartColors.dark : chartColors.primary }}>{data.rollout.rollback}</div>
                  <div style={{ color: chartColors.gray }}>Rollback</div>
                </div>
              </div>
            </div>

            {/* Support Queue */}
            <div style={{
              padding: '16px',
              backgroundColor: 'white',
              borderRadius: '10px',
              border: `1px solid ${chartColors.light}`
            }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
                SUPPORT QUEUE
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '28px', fontWeight: 700, color: chartColors.charcoal }}>{data.supportQueue.total}</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {Object.entries(data.supportQueue.byPriority).map(([priority, count]) => {
                    const config = severityConfig[priority];
                    return (
                      <span key={priority} style={{
                        padding: '3px 8px',
                        backgroundColor: config.bg,
                        color: config.color,
                        borderRadius: '4px',
                        fontSize: '9px',
                        fontWeight: 600
                      }}>
                        {priority.charAt(0).toUpperCase()}: {count}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '9px' }}>
                <div>
                  <div style={{ color: chartColors.gray }}>Avg Response</div>
                  <div style={{ fontWeight: 700 }}>{data.supportQueue.avgResponseTime}h</div>
                </div>
                <div>
                  <div style={{ color: chartColors.gray }}>Avg Resolution</div>
                  <div style={{ fontWeight: 700 }}>{data.supportQueue.avgResolutionTime}h</div>
                </div>
                <div>
                  <div style={{ color: chartColors.gray }}>CSAT</div>
                  <div style={{ fontWeight: 700, color: data.supportQueue.csat >= 4 ? chartColors.primary : chartColors.secondary }}>
                    {data.supportQueue.csat}/5
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* On-Call Team */}
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: chartColors.light,
            borderRadius: '10px',
            border: `1px solid ${chartColors.secondary}`
          }}>
            <div style={{ fontSize: '10px', fontWeight: 600, color: chartColors.dark, marginBottom: '8px' }}>
              🚨 ON-CALL TEAM
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              {data.team.filter(t => t.status === 'on-call').map((person) => (
                <div key={person.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: chartColors.secondary,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 600
                  }}>
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 600, color: chartColors.charcoal }}>{person.name}</div>
                    <div style={{ fontSize: '8px', color: chartColors.gray }}>{person.role} • {person.contact}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {viewMode === 'incidents' && (
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
            INCIDENTS DURING HYPERCARE
          </div>
          {data.incidents.map((incident) => {
            const sevConfig = severityConfig[incident.severity];
            const statConfig = statusColors[incident.status];
            const isSelected = selectedIncident === incident.id;
            
            return (
              <div
                key={incident.id}
                onClick={() => setSelectedIncident(isSelected ? null : incident.id)}
                style={{
                  padding: '12px',
                  backgroundColor: isSelected ? chartColors.background : 'white',
                  borderRadius: '10px',
                  border: `1px solid ${isSelected ? sevConfig.color : chartColors.light}`,
                  borderLeft: `4px solid ${sevConfig.color}`,
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{
                        padding: '2px 6px',
                        backgroundColor: sevConfig.bg,
                        color: sevConfig.color,
                        borderRadius: '4px',
                        fontSize: '9px',
                        fontWeight: 700
                      }}>
                        {incident.severity}
                      </span>
                      <span style={{ fontSize: '9px', color: chartColors.gray, fontFamily: 'monospace' }}>{incident.id}</span>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>{incident.title}</div>
                  </div>
                  <span style={{
                    padding: '3px 8px',
                    backgroundColor: statConfig.bg,
                    color: statConfig.color,
                    borderRadius: '4px',
                    fontSize: '9px',
                    fontWeight: 600,
                    textTransform: 'capitalize'
                  }}>
                    {incident.status}
                  </span>
                </div>
                
                {isSelected && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${chartColors.light}` }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '10px' }}>
                      <div>
                        <div style={{ color: chartColors.gray }}>Duration</div>
                        <div style={{ fontWeight: 600 }}>{incident.duration}</div>
                      </div>
                      <div>
                        <div style={{ color: chartColors.gray }}>Impacted Users</div>
                        <div style={{ fontWeight: 600 }}>{incident.impactedUsers.toLocaleString()}</div>
                      </div>
                      <div>
                        <div style={{ color: chartColors.gray }}>Resolved</div>
                        <div style={{ fontWeight: 600 }}>{incident.resolvedAt || 'In progress'}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'checklist' && (
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
            HYPERCARE CHECKLIST
          </div>
          {['Technical', 'Support', 'Customer', 'Exit'].map((category) => {
            const items = data.checklistItems.filter(c => c.category === category);
            const completed = items.filter(c => c.status === 'complete').length;
            
            return (
              <div key={category} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: chartColors.charcoal }}>{category}</span>
                  <span style={{ fontSize: '9px', color: chartColors.gray }}>{completed}/{items.length}</span>
                </div>
                {items.map((item) => {
                  const statConfig = statusColors[item.status];
                  return (
                    <div key={item.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px',
                      backgroundColor: item.status === 'complete' ? chartColors.light : 'white',
                      borderRadius: '6px',
                      marginBottom: '4px',
                      border: `1px solid ${chartColors.light}`
                    }}>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: statConfig.bg,
                        color: statConfig.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px'
                      }}>
                        {item.status === 'complete' ? '✓' : item.status === 'in-progress' ? '◐' : '○'}
                      </div>
                      <span style={{ flex: 1, fontSize: '10px', color: chartColors.charcoal }}>{item.item}</span>
                      <span style={{ fontSize: '9px', color: chartColors.gray }}>{item.owner}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HypercareDashboard;
