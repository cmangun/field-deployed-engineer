"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample service health data
const defaultData = {
  services: [
    { 
      name: 'API Gateway', 
      status: 'healthy' as const,
      uptime: 99.98,
      latency: { p50: 45, p95: 120, p99: 280 },
      errorRate: 0.02,
      throughput: 12500,
      lastIncident: '14d ago'
    },
    { 
      name: 'Auth Service', 
      status: 'healthy' as const,
      uptime: 99.95,
      latency: { p50: 32, p95: 85, p99: 150 },
      errorRate: 0.05,
      throughput: 8200,
      lastIncident: '7d ago'
    },
    { 
      name: 'User Service', 
      status: 'degraded' as const,
      uptime: 99.12,
      latency: { p50: 89, p95: 320, p99: 890 },
      errorRate: 1.2,
      throughput: 4500,
      lastIncident: '2h ago'
    },
    { 
      name: 'Payment Service', 
      status: 'healthy' as const,
      uptime: 99.99,
      latency: { p50: 120, p95: 250, p99: 450 },
      errorRate: 0.01,
      throughput: 2100,
      lastIncident: '30d ago'
    },
    { 
      name: 'Notification Service', 
      status: 'healthy' as const,
      uptime: 99.85,
      latency: { p50: 15, p95: 45, p99: 120 },
      errorRate: 0.15,
      throughput: 18500,
      lastIncident: '3d ago'
    },
    { 
      name: 'Search Service', 
      status: 'outage' as const,
      uptime: 98.50,
      latency: { p50: 0, p95: 0, p99: 0 },
      errorRate: 100,
      throughput: 0,
      lastIncident: 'now'
    },
  ],
  // 24-hour latency history (hourly)
  latencyHistory: [
    { hour: '00:00', p50: 42, p95: 115, p99: 260 },
    { hour: '01:00', p50: 38, p95: 105, p99: 240 },
    { hour: '02:00', p50: 35, p95: 98, p99: 220 },
    { hour: '03:00', p50: 33, p95: 92, p99: 210 },
    { hour: '04:00', p50: 34, p95: 95, p99: 215 },
    { hour: '05:00', p50: 40, p95: 108, p99: 245 },
    { hour: '06:00', p50: 52, p95: 140, p99: 320 },
    { hour: '07:00', p50: 68, p95: 185, p99: 420 },
    { hour: '08:00', p50: 75, p95: 210, p99: 480 },
    { hour: '09:00', p50: 82, p95: 235, p99: 540 },
    { hour: '10:00', p50: 78, p95: 220, p99: 505 },
    { hour: '11:00', p50: 72, p95: 200, p99: 460 },
    { hour: '12:00', p50: 85, p95: 245, p99: 560 },
    { hour: '13:00', p50: 80, p95: 225, p99: 520 },
    { hour: '14:00', p50: 76, p95: 215, p99: 495 },
    { hour: '15:00', p50: 74, p95: 205, p99: 475 },
    { hour: '16:00', p50: 78, p95: 220, p99: 505 },
    { hour: '17:00', p50: 82, p95: 238, p99: 548 },
    { hour: '18:00', p50: 70, p95: 195, p99: 450 },
    { hour: '19:00', p50: 58, p95: 160, p99: 365 },
    { hour: '20:00', p50: 52, p95: 145, p99: 330 },
    { hour: '21:00', p50: 48, p95: 130, p99: 295 },
    { hour: '22:00', p50: 45, p95: 122, p99: 278 },
    { hour: '23:00', p50: 43, p95: 118, p99: 268 },
  ]
};

const statusConfig = {
  healthy: { color: chartColors.primary, label: 'Healthy', icon: '●' },
  degraded: { color: chartColors.orange, label: 'Degraded', icon: '◐' },
  outage: { color: chartColors.dark, label: 'Outage', icon: '○' },
};

interface ServiceHealthDashboardProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const ServiceHealthDashboard: React.FC<ServiceHealthDashboardProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Service Health Dashboard"
}) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const healthyCount = data.services.filter(s => s.status === 'healthy').length;
  const degradedCount = data.services.filter(s => s.status === 'degraded').length;
  const outageCount = data.services.filter(s => s.status === 'outage').length;

  // Latency chart dimensions
  const chartWidth = 320;
  const chartHeight = 100;
  const chartMargin = { top: 10, right: 10, bottom: 20, left: 35 };
  const innerChartWidth = chartWidth - chartMargin.left - chartMargin.right;
  const innerChartHeight = chartHeight - chartMargin.top - chartMargin.bottom;

  const maxLatency = Math.max(...data.latencyHistory.map(d => d.p99));
  const xScale = (i: number) => (i / (data.latencyHistory.length - 1)) * innerChartWidth;
  const yScale = (v: number) => innerChartHeight - (v / maxLatency) * innerChartHeight;

  const generateLinePath = (key: 'p50' | 'p95' | 'p99') => {
    return data.latencyHistory.map((d, i) => 
      `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d[key])}`
    ).join(' ');
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Service Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {data.services.map((service, i) => {
            const status = statusConfig[service.status];
            const isSelected = selectedService === service.name;
            
            return (
              <div
                key={i}
                onClick={() => setSelectedService(isSelected ? null : service.name)}
                style={{
                  padding: '14px',
                  backgroundColor: isSelected ? chartColors.background : 'white',
                  borderRadius: '10px',
                  border: `1px solid ${isSelected ? status.color : chartColors.light}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: chartColors.charcoal }}>
                    {service.name}
                  </span>
                  <span style={{ 
                    fontSize: '10px', 
                    padding: '2px 8px', 
                    borderRadius: '10px',
                    backgroundColor: `${status.color}15`,
                    color: status.color,
                    fontWeight: 500
                  }}>
                    {status.icon} {status.label}
                  </span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: chartColors.gray, marginBottom: '2px' }}>Uptime</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: service.uptime >= 99.9 ? chartColors.primary : service.uptime >= 99 ? chartColors.orange : chartColors.dark }}>
                      {service.uptime}%
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', color: chartColors.gray, marginBottom: '2px' }}>p95 Latency</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: chartColors.charcoal }}>
                      {service.latency.p95}ms
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', color: chartColors.gray, marginBottom: '2px' }}>Error Rate</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: service.errorRate < 0.1 ? chartColors.primary : service.errorRate < 1 ? chartColors.orange : chartColors.dark }}>
                      {service.errorRate}%
                    </div>
                  </div>
                </div>
                
                {isSelected && (
                  <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: `1px solid ${chartColors.light}` }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '11px' }}>
                      <div>
                        <span style={{ color: chartColors.gray }}>Throughput:</span>
                        <span style={{ marginLeft: '4px', fontWeight: 500 }}>{service.throughput.toLocaleString()} req/min</span>
                      </div>
                      <div>
                        <span style={{ color: chartColors.gray }}>Last Incident:</span>
                        <span style={{ marginLeft: '4px', fontWeight: 500 }}>{service.lastIncident}</span>
                      </div>
                      <div>
                        <span style={{ color: chartColors.gray }}>p50:</span>
                        <span style={{ marginLeft: '4px', fontWeight: 500 }}>{service.latency.p50}ms</span>
                      </div>
                      <div>
                        <span style={{ color: chartColors.gray }}>p99:</span>
                        <span style={{ marginLeft: '4px', fontWeight: 500 }}>{service.latency.p99}ms</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Latency Chart */}
          <div style={{ 
            padding: '16px', 
            backgroundColor: 'white', 
            borderRadius: '10px',
            border: `1px solid ${chartColors.light}`
          }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '12px' }}>
              API Gateway Latency (24h)
            </div>
            <svg width={chartWidth} height={chartHeight} style={{ display: 'block' }}>
              <g transform={`translate(${chartMargin.left}, ${chartMargin.top})`}>
                {/* Grid lines */}
                {[0, 200, 400, 600].map((v, i) => (
                  <g key={i}>
                    <line
                      x1={0}
                      x2={innerChartWidth}
                      y1={yScale(v)}
                      y2={yScale(v)}
                      stroke={chartColors.light}
                      strokeDasharray="4,4"
                    />
                    <text x={-8} y={yScale(v)} textAnchor="end" dominantBaseline="middle" fontSize={9} fill={chartColors.gray}>
                      {v}
                    </text>
                  </g>
                ))}
                
                {/* Area fills */}
                <path
                  d={`${generateLinePath('p99')} L${innerChartWidth},${innerChartHeight} L0,${innerChartHeight} Z`}
                  fill={chartColors.dark}
                  fillOpacity={0.1}
                />
                <path
                  d={`${generateLinePath('p95')} L${innerChartWidth},${innerChartHeight} L0,${innerChartHeight} Z`}
                  fill={chartColors.orange}
                  fillOpacity={0.15}
                />
                <path
                  d={`${generateLinePath('p50')} L${innerChartWidth},${innerChartHeight} L0,${innerChartHeight} Z`}
                  fill={chartColors.teal}
                  fillOpacity={0.2}
                />
                
                {/* Lines */}
                <path d={generateLinePath('p99')} fill="none" stroke={chartColors.dark} strokeWidth={1.5} />
                <path d={generateLinePath('p95')} fill="none" stroke={chartColors.orange} strokeWidth={1.5} />
                <path d={generateLinePath('p50')} fill="none" stroke={chartColors.teal} strokeWidth={2} />
                
                {/* X-axis labels */}
                {[0, 6, 12, 18, 23].map((i) => (
                  <text
                    key={i}
                    x={xScale(i)}
                    y={innerChartHeight + 14}
                    textAnchor="middle"
                    fontSize={9}
                    fill={chartColors.gray}
                  >
                    {data.latencyHistory[i].hour}
                  </text>
                ))}
              </g>
            </svg>
            
            {/* Legend */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '12px', height: '2px', backgroundColor: chartColors.teal }} />
                <span style={{ color: chartColors.gray }}>p50</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '12px', height: '2px', backgroundColor: chartColors.orange }} />
                <span style={{ color: chartColors.gray }}>p95</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '12px', height: '2px', backgroundColor: chartColors.dark }} />
                <span style={{ color: chartColors.gray }}>p99</span>
              </div>
            </div>
          </div>

          {/* Overall Metrics */}
          <div style={{ 
            padding: '16px', 
            backgroundColor: 'white', 
            borderRadius: '10px',
            border: `1px solid ${chartColors.light}`
          }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '12px' }}>
              Aggregate Metrics
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div style={{ padding: '10px', backgroundColor: chartColors.light, borderRadius: '8px' }}>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>Avg Uptime</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>
                  {(data.services.reduce((sum, s) => sum + s.uptime, 0) / data.services.length).toFixed(2)}%
                </div>
              </div>
              <div style={{ padding: '10px', backgroundColor: chartColors.light, borderRadius: '8px' }}>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>Avg Error Rate</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.dark }}>
                  {(data.services.reduce((sum, s) => sum + s.errorRate, 0) / data.services.length).toFixed(2)}%
                </div>
              </div>
              <div style={{ padding: '10px', backgroundColor: chartColors.light, borderRadius: '8px' }}>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>Total Throughput</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.navy }}>
                  {(data.services.reduce((sum, s) => sum + s.throughput, 0) / 1000).toFixed(1)}K
                </div>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>req/min</div>
              </div>
              <div style={{ padding: '10px', backgroundColor: chartColors.light, borderRadius: '8px' }}>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>Active Incidents</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.orange }}>
                  {outageCount + degradedCount}
                </div>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>services affected</div>
              </div>
            </div>
          </div>

          {/* Active Alerts */}
          <div style={{ 
            padding: '16px', 
            backgroundColor: 'white', 
            borderRadius: '10px',
            border: `1px solid ${chartColors.light}`
          }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '12px' }}>
              Active Alerts
            </div>
            {data.services.filter(s => s.status !== 'healthy').map((service, i) => (
              <div 
                key={i}
                style={{ 
                  padding: '10px',
                  marginBottom: '8px',
                  backgroundColor: service.status === 'outage' ? chartColors.light : chartColors.light,
                  borderRadius: '6px',
                  borderLeft: `3px solid ${statusConfig[service.status].color}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>
                    {service.name}
                  </span>
                  <span style={{ fontSize: '10px', color: statusConfig[service.status].color }}>
                    {service.status === 'outage' ? '🔴 CRITICAL' : '🟡 WARNING'}
                  </span>
                </div>
                <div style={{ fontSize: '10px', color: chartColors.gray, marginTop: '4px' }}>
                  {service.status === 'outage' 
                    ? `Service down • Error rate: ${service.errorRate}%`
                    : `High latency (p95: ${service.latency.p95}ms) • Error rate: ${service.errorRate}%`
                  }
                </div>
              </div>
            ))}
            {data.services.filter(s => s.status !== 'healthy').length === 0 && (
              <div style={{ fontSize: '11px', color: chartColors.gray, textAlign: 'center', padding: '20px' }}>
                ✓ All systems operational
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHealthDashboard;
