"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Incident Timeline data
const defaultData = {
  incidentId: 'INC-2847',
  title: 'Payment Service Degradation',
  severity: 'SEV-1',
  status: 'resolved',
  startTime: '2026-11-20T14:32:00Z',
  endTime: '2026-11-20T15:44:00Z',
  duration: 72, // minutes
  impactedServices: ['payment-api', 'checkout-service', 'order-service'],
  impactedCustomers: 12450,
  commander: 'Sarah Chen',
  timeline: [
    { time: '14:32', type: 'detected', title: 'Alert Triggered', description: 'PagerDuty alert: Payment API latency > 500ms p99', actor: 'Datadog' },
    { time: '14:34', type: 'acknowledged', title: 'Incident Acknowledged', description: 'On-call engineer acknowledged alert', actor: 'Mike Johnson' },
    { time: '14:36', type: 'escalated', title: 'SEV-1 Declared', description: 'Escalated to SEV-1, incident commander assigned', actor: 'Sarah Chen' },
    { time: '14:38', type: 'investigation', title: 'War Room Opened', description: 'Slack channel #inc-2847 created, Zoom bridge started', actor: 'System' },
    { time: '14:42', type: 'investigation', title: 'Initial Triage', description: 'DB connection pool exhaustion identified as likely cause', actor: 'David Kim' },
    { time: '14:48', type: 'action', title: 'Mitigation Attempted', description: 'Increased connection pool size from 100 to 200', actor: 'Mike Johnson' },
    { time: '14:52', type: 'update', title: 'Partial Recovery', description: 'Latency improved but still elevated, investigating further', actor: 'Sarah Chen' },
    { time: '15:05', type: 'investigation', title: 'Root Cause Found', description: 'Slow query from recent deployment causing connection leak', actor: 'Lisa Wang' },
    { time: '15:12', type: 'action', title: 'Rollback Initiated', description: 'Rolling back deployment v2.4.1 → v2.4.0', actor: 'Mike Johnson' },
    { time: '15:28', type: 'action', title: 'Rollback Complete', description: 'All pods running v2.4.0, connections stabilizing', actor: 'System' },
    { time: '15:35', type: 'update', title: 'Monitoring Recovery', description: 'Latency returned to normal, error rate dropping', actor: 'Sarah Chen' },
    { time: '15:44', type: 'resolved', title: 'Incident Resolved', description: 'All metrics nominal, incident closed', actor: 'Sarah Chen' },
  ],
  metrics: {
    ttd: 2, // time to detect (minutes)
    tta: 2, // time to acknowledge
    ttm: 16, // time to mitigate
    ttr: 72, // time to resolve
  },
  affectedMetrics: [
    { name: 'Latency p99', before: 180, during: 2400, after: 175, unit: 'ms' },
    { name: 'Error Rate', before: 0.02, during: 4.8, after: 0.03, unit: '%' },
    { name: 'Throughput', before: 1200, during: 450, after: 1180, unit: 'rps' },
  ],
  postmortem: {
    scheduled: '2026-11-22T10:00:00Z',
    actionItems: 3,
    completed: 0
  }
};

const typeConfig: Record<string, { icon: string; color: string; bg: string }> = {
  detected: { icon: '🚨', color: chartColors.dark, bg: chartColors.light },
  acknowledged: { icon: '👋', color: chartColors.secondary, bg: chartColors.light },
  escalated: { icon: '⬆️', color: chartColors.dark, bg: chartColors.light },
  investigation: { icon: '🔍', color: chartColors.navy, bg: chartColors.light },
  action: { icon: '🔧', color: chartColors.primary, bg: chartColors.light },
  update: { icon: '📝', color: chartColors.navy, bg: chartColors.light },
  resolved: { icon: '✅', color: chartColors.primary, bg: chartColors.light },
};

const severityConfig: Record<string, { color: string; bg: string }> = {
  'SEV-1': { color: chartColors.dark, bg: chartColors.light },
  'SEV-2': { color: chartColors.secondary, bg: chartColors.light },
  'SEV-3': { color: chartColors.navy, bg: chartColors.light },
  'SEV-4': { color: chartColors.secondary, bg: chartColors.light },
};

interface IncidentTimelineProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const IncidentTimeline: React.FC<IncidentTimelineProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Incident Timeline"
}) => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const sevConfig = severityConfig[data.severity];
  const isActive = data.status !== 'resolved';

  // Filter timeline
  const filteredTimeline = filter 
    ? data.timeline.filter(e => e.type === filter)
    : data.timeline;

  return (
    <div style={{ width: '100%' }}>
      {/* Key Metrics */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '10px',
        marginBottom: '16px'
      }}>
        <div style={{ padding: '12px', backgroundColor: chartColors.background, borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.charcoal }}>{data.metrics.ttd}m</div>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>Time to Detect</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.background, borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.charcoal }}>{data.metrics.tta}m</div>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>Time to Ack</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.background, borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.charcoal }}>{data.metrics.ttm}m</div>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>Time to Mitigate</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.background, borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.charcoal }}>{data.metrics.ttr}m</div>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>Time to Resolve</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.secondary }}>{data.impactedCustomers.toLocaleString()}</div>
          <div style={{ fontSize: '9px', color: chartColors.dark }}>Customers Impacted</div>
        </div>
      </div>

      {/* Filter Chips */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilter(null)}
          style={{
            padding: '4px 12px',
            fontSize: '10px',
            backgroundColor: !filter ? chartColors.charcoal : 'white',
            color: !filter ? 'white' : chartColors.charcoal,
            border: `1px solid ${chartColors.light}`,
            borderRadius: '16px',
            cursor: 'pointer'
          }}
        >
          All ({data.timeline.length})
        </button>
        {Object.entries(typeConfig).map(([type, config]) => {
          const count = data.timeline.filter(e => e.type === type).length;
          if (count === 0) return null;
          return (
            <button
              key={type}
              onClick={() => setFilter(filter === type ? null : type)}
              style={{
                padding: '4px 12px',
                fontSize: '10px',
                backgroundColor: filter === type ? config.bg : 'white',
                color: filter === type ? config.color : chartColors.charcoal,
                border: `1px solid ${filter === type ? config.color : chartColors.light}`,
                borderRadius: '16px',
                cursor: 'pointer'
              }}
            >
              {config.icon} {type} ({count})
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '12px',
        border: `1px solid ${chartColors.light}`,
        maxHeight: '240px',
        overflowY: 'auto',
        padding: '12px'
      }}>
        {filteredTimeline.map((event, i) => {
          const config = typeConfig[event.type];
          const isSelected = selectedEvent === i;
          
          return (
            <div
              key={i}
              onClick={() => setSelectedEvent(isSelected ? null : i)}
              style={{
                display: 'flex',
                gap: '12px',
                padding: '10px',
                marginBottom: '8px',
                backgroundColor: isSelected ? config.bg : chartColors.background,
                borderRadius: '8px',
                cursor: 'pointer',
                border: isSelected ? `1px solid ${config.color}` : '1px solid transparent',
                transition: 'all 0.15s'
              }}
            >
              {/* Timeline connector */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '24px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: config.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  border: `2px solid ${config.color}`
                }}>
                  {config.icon}
                </div>
                {i < filteredTimeline.length - 1 && (
                  <div style={{ 
                    width: '2px', 
                    flex: 1, 
                    backgroundColor: chartColors.light,
                    marginTop: '4px'
                  }} />
                )}
              </div>
              
              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>
                      {event.title}
                    </div>
                    <div style={{ fontSize: '10px', color: chartColors.gray, marginTop: '2px' }}>
                      {event.description}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: config.color }}>
                      {event.time}
                    </div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>
                      {event.actor}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Affected Metrics & Services */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginTop: '16px' }}>
        {/* Affected Metrics */}
        <div style={{ 
          padding: '12px',
          backgroundColor: chartColors.background,
          borderRadius: '10px',
          border: `1px solid ${chartColors.light}`
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '10px' }}>
            Metric Impact
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {data.affectedMetrics.map((metric, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: chartColors.gray, marginBottom: '4px' }}>{metric.name}</div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '10px', color: chartColors.primary }}>{metric.before}</span>
                  <span style={{ fontSize: '10px', color: chartColors.gray }}>→</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: chartColors.dark }}>{metric.during}</span>
                  <span style={{ fontSize: '10px', color: chartColors.gray }}>→</span>
                  <span style={{ fontSize: '10px', color: chartColors.primary }}>{metric.after}</span>
                </div>
                <div style={{ fontSize: '8px', color: chartColors.gray }}>{metric.unit}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Impacted Services */}
        <div style={{ 
          padding: '12px',
          backgroundColor: chartColors.background,
          borderRadius: '10px',
          border: `1px solid ${chartColors.light}`
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '10px' }}>
            Impacted Services
          </div>
          {data.impactedServices.map((service, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              padding: '4px 0'
            }}>
              <div style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                backgroundColor: chartColors.dark 
              }} />
              <span style={{ fontSize: '10px', color: chartColors.charcoal, fontFamily: 'monospace' }}>
                {service}
              </span>
            </div>
          ))}
          
          <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: `1px solid ${chartColors.light}` }}>
            <div style={{ fontSize: '9px', color: chartColors.gray }}>Incident Commander</div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>{data.commander}</div>
          </div>
        </div>
      </div>

      {/* Postmortem Status */}
      <div style={{ 
        marginTop: '12px',
        padding: '10px 16px',
        backgroundColor: chartColors.light,
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px' }}>📋</span>
          <span style={{ fontSize: '11px', color: chartColors.navy, fontWeight: 500 }}>
            Postmortem scheduled: {new Date(data.postmortem.scheduled).toLocaleDateString()}
          </span>
        </div>
        <div style={{ fontSize: '10px', color: chartColors.navy }}>
          {data.postmortem.completed}/{data.postmortem.actionItems} action items complete
        </div>
      </div>
    </div>
  );
};

export default IncidentTimeline;
