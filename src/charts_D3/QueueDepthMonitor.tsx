"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Queue Depth Monitor data
const defaultData = {
  queues: [
    {
      id: 'orders',
      name: 'order-events',
      type: 'kafka',
      partitions: 12,
      consumers: 6,
      current: {
        depth: 45000,
        lag: 12500,
        oldestMessage: 45, // seconds
        throughputIn: 2400,
        throughputOut: 2100,
        consumerHealth: 'degraded',
      },
      thresholds: {
        lagWarning: 10000,
        lagCritical: 50000,
        ageWarning: 30,
        ageCritical: 120,
      },
      history: [
        { time: 0, depth: 38000, lag: 9500 }, { time: 1, depth: 42000, lag: 10200 }, { time: 2, depth: 39500, lag: 8800 },
        { time: 3, depth: 45000, lag: 11000 }, { time: 4, depth: 41000, lag: 9200 }, { time: 5, depth: 37500, lag: 8500 },
        { time: 6, depth: 43000, lag: 10500 }, { time: 7, depth: 40000, lag: 9800 }, { time: 8, depth: 38500, lag: 8200 },
        { time: 9, depth: 44000, lag: 10800 }, { time: 10, depth: 41500, lag: 9000 }, { time: 11, depth: 36500, lag: 8600 },
        { time: 12, depth: 42500, lag: 10000 }, { time: 13, depth: 39000, lag: 9400 }, { time: 14, depth: 44500, lag: 11200 },
        { time: 15, depth: 40500, lag: 8900 }, { time: 16, depth: 37000, lag: 9600 }, { time: 17, depth: 43500, lag: 10400 },
        { time: 18, depth: 41000, lag: 9100 }, { time: 19, depth: 38000, lag: 8400 }, { time: 20, depth: 45000, lag: 10600 },
        { time: 21, depth: 48000, lag: 12500 }, { time: 22, depth: 50000, lag: 13200 }, { time: 23, depth: 52000, lag: 14000 },
        { time: 24, depth: 49000, lag: 12800 }, { time: 25, depth: 51000, lag: 13500 }, { time: 26, depth: 53000, lag: 14200 },
        { time: 27, depth: 50000, lag: 13000 }, { time: 28, depth: 47000, lag: 12200 }, { time: 29, depth: 45000, lag: 12500 },
      ],
    },
    {
      id: 'notifications',
      name: 'notification-queue',
      type: 'sqs',
      partitions: 1,
      consumers: 4,
      current: {
        depth: 1200,
        lag: 0,
        oldestMessage: 8,
        throughputIn: 450,
        throughputOut: 460,
        consumerHealth: 'healthy',
      },
      thresholds: {
        lagWarning: 5000,
        lagCritical: 20000,
        ageWarning: 60,
        ageCritical: 300,
      },
      history: [
        { time: 0, depth: 850, lag: 120 }, { time: 1, depth: 920, lag: 180 }, { time: 2, depth: 1100, lag: 250 },
        { time: 3, depth: 980, lag: 150 }, { time: 4, depth: 1050, lag: 200 }, { time: 5, depth: 890, lag: 100 },
        { time: 6, depth: 1200, lag: 280 }, { time: 7, depth: 1080, lag: 220 }, { time: 8, depth: 950, lag: 160 },
        { time: 9, depth: 1150, lag: 240 }, { time: 10, depth: 1020, lag: 190 }, { time: 11, depth: 880, lag: 110 },
        { time: 12, depth: 1180, lag: 260 }, { time: 13, depth: 1000, lag: 170 }, { time: 14, depth: 920, lag: 130 },
        { time: 15, depth: 1120, lag: 230 }, { time: 16, depth: 980, lag: 140 }, { time: 17, depth: 1060, lag: 210 },
        { time: 18, depth: 900, lag: 120 }, { time: 19, depth: 1140, lag: 250 }, { time: 20, depth: 1020, lag: 180 },
        { time: 21, depth: 960, lag: 150 }, { time: 22, depth: 1100, lag: 220 }, { time: 23, depth: 1040, lag: 190 },
        { time: 24, depth: 880, lag: 100 }, { time: 25, depth: 1160, lag: 240 }, { time: 26, depth: 1000, lag: 160 },
        { time: 27, depth: 940, lag: 130 }, { time: 28, depth: 1080, lag: 200 }, { time: 29, depth: 1200, lag: 0 },
      ],
    },
    {
      id: 'analytics',
      name: 'analytics-stream',
      type: 'kafka',
      partitions: 24,
      consumers: 8,
      current: {
        depth: 2800000,
        lag: 85000,
        oldestMessage: 180,
        throughputIn: 15000,
        throughputOut: 14200,
        consumerHealth: 'critical',
      },
      thresholds: {
        lagWarning: 50000,
        lagCritical: 100000,
        ageWarning: 60,
        ageCritical: 120,
      },
      history: [
        { time: 0, depth: 2100000, lag: 65000 }, { time: 1, depth: 2300000, lag: 72000 }, { time: 2, depth: 2200000, lag: 68000 },
        { time: 3, depth: 2450000, lag: 78000 }, { time: 4, depth: 2350000, lag: 74000 }, { time: 5, depth: 2150000, lag: 66000 },
        { time: 6, depth: 2400000, lag: 76000 }, { time: 7, depth: 2250000, lag: 70000 }, { time: 8, depth: 2500000, lag: 80000 },
        { time: 9, depth: 2180000, lag: 67000 }, { time: 10, depth: 2380000, lag: 75000 }, { time: 11, depth: 2280000, lag: 71000 },
        { time: 12, depth: 2420000, lag: 77000 }, { time: 13, depth: 2120000, lag: 64000 }, { time: 14, depth: 2320000, lag: 73000 },
        { time: 15, depth: 2480000, lag: 79000 }, { time: 16, depth: 2220000, lag: 69000 }, { time: 17, depth: 2360000, lag: 74000 },
        { time: 18, depth: 2140000, lag: 65000 }, { time: 19, depth: 2440000, lag: 78000 }, { time: 20, depth: 2260000, lag: 70000 },
        { time: 21, depth: 2520000, lag: 81000 }, { time: 22, depth: 2340000, lag: 73000 }, { time: 23, depth: 2180000, lag: 67000 },
        { time: 24, depth: 2460000, lag: 79000 }, { time: 25, depth: 2300000, lag: 72000 }, { time: 26, depth: 2540000, lag: 82000 },
        { time: 27, depth: 2200000, lag: 68000 }, { time: 28, depth: 2420000, lag: 77000 }, { time: 29, depth: 2800000, lag: 85000 },
      ],
    },
    {
      id: 'payments',
      name: 'payment-dlq',
      type: 'sqs',
      partitions: 1,
      consumers: 2,
      current: {
        depth: 847,
        lag: 847,
        oldestMessage: 3600,
        throughputIn: 12,
        throughputOut: 0,
        consumerHealth: 'stopped',
      },
      thresholds: {
        lagWarning: 100,
        lagCritical: 500,
        ageWarning: 300,
        ageCritical: 900,
      },
      history: [
        { time: 0, depth: 800, lag: 800 }, { time: 1, depth: 802, lag: 802 }, { time: 2, depth: 804, lag: 804 },
        { time: 3, depth: 806, lag: 806 }, { time: 4, depth: 808, lag: 808 }, { time: 5, depth: 810, lag: 810 },
        { time: 6, depth: 812, lag: 812 }, { time: 7, depth: 814, lag: 814 }, { time: 8, depth: 816, lag: 816 },
        { time: 9, depth: 818, lag: 818 }, { time: 10, depth: 820, lag: 820 }, { time: 11, depth: 822, lag: 822 },
        { time: 12, depth: 824, lag: 824 }, { time: 13, depth: 826, lag: 826 }, { time: 14, depth: 828, lag: 828 },
        { time: 15, depth: 830, lag: 830 }, { time: 16, depth: 832, lag: 832 }, { time: 17, depth: 834, lag: 834 },
        { time: 18, depth: 836, lag: 836 }, { time: 19, depth: 838, lag: 838 }, { time: 20, depth: 840, lag: 840 },
        { time: 21, depth: 842, lag: 842 }, { time: 22, depth: 844, lag: 844 }, { time: 23, depth: 846, lag: 846 },
        { time: 24, depth: 847, lag: 847 }, { time: 25, depth: 847, lag: 847 }, { time: 26, depth: 847, lag: 847 },
        { time: 27, depth: 847, lag: 847 }, { time: 28, depth: 847, lag: 847 }, { time: 29, depth: 847, lag: 847 },
      ],
    },
  ],
  summary: {
    totalQueues: 4,
    healthy: 1,
    degraded: 1,
    critical: 2,
    totalLag: 98347,
    avgProcessingTime: 45,
  }
};

const healthConfig: Record<string, { color: string; bg: string; label: string; icon: string }> = {
  healthy: { color: chartColors.primary, bg: chartColors.light, label: 'Healthy', icon: '✓' },
  degraded: { color: chartColors.secondary, bg: chartColors.light, label: 'Degraded', icon: '⚠' },
  critical: { color: chartColors.dark, bg: chartColors.light, label: 'Critical', icon: '✕' },
  stopped: { color: chartColors.muted, bg: chartColors.light, label: 'Stopped', icon: '◼' },
};

interface QueueDepthMonitorProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const QueueDepthMonitor: React.FC<QueueDepthMonitorProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Queue Depth Monitor"
}) => {
  const [selectedQueue, setSelectedQueue] = useState<string | null>(null);

  const formatNumber = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  const formatAge = (seconds: number) => {
    if (seconds >= 3600) return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
    if (seconds >= 60) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Queue Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {data.queues.map((queue) => {
          const health = healthConfig[queue.current.consumerHealth];
          const isSelected = selectedQueue === queue.id;
          const lagPercent = (queue.current.lag / queue.thresholds.lagCritical) * 100;
          
          // Mini sparkline
          const maxDepth = Math.max(...queue.history.map(h => h.depth));
          const sparklinePoints = queue.history.map((h, i) => 
            `${(i / (queue.history.length - 1)) * 120},${40 - (h.depth / maxDepth) * 35}`
          ).join(' ');
          
          return (
            <div
              key={queue.id}
              onClick={() => setSelectedQueue(isSelected ? null : queue.id)}
              style={{
                padding: '14px',
                backgroundColor: isSelected ? `${health.color}08` : 'white',
                borderRadius: '12px',
                border: `2px solid ${isSelected ? health.color : chartColors.light}`,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ 
                      fontSize: '9px', 
                      padding: '2px 6px', 
                      backgroundColor: queue.type === 'kafka' ? chartColors.light : chartColors.light,
                      color: queue.type === 'kafka' ? chartColors.navy : chartColors.dark,
                      borderRadius: '4px',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      {queue.type}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal, fontFamily: 'monospace' }}>
                      {queue.name}
                    </span>
                  </div>
                  <div style={{ fontSize: '9px', color: chartColors.gray, marginTop: '2px' }}>
                    {queue.partitions} partitions • {queue.consumers} consumers
                  </div>
                </div>
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: health.bg,
                  color: health.color,
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: 600
                }}>
                  {health.icon} {health.label}
                </div>
              </div>

              {/* Key Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '9px', color: chartColors.gray }}>Depth</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: chartColors.charcoal }}>
                    {formatNumber(queue.current.depth)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '9px', color: chartColors.gray }}>Lag</div>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: 700, 
                    color: queue.current.lag > queue.thresholds.lagCritical ? chartColors.dark : 
                           queue.current.lag > queue.thresholds.lagWarning ? chartColors.secondary : chartColors.primary
                  }}>
                    {formatNumber(queue.current.lag)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '9px', color: chartColors.gray }}>Oldest Msg</div>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: 700, 
                    color: queue.current.oldestMessage > queue.thresholds.ageCritical ? chartColors.dark : 
                           queue.current.oldestMessage > queue.thresholds.ageWarning ? chartColors.secondary : chartColors.charcoal
                  }}>
                    {formatAge(queue.current.oldestMessage)}
                  </div>
                </div>
              </div>

              {/* Lag Progress Bar */}
              <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '9px', color: chartColors.gray }}>Consumer Lag</span>
                  <span style={{ fontSize: '9px', color: chartColors.gray }}>
                    {formatNumber(queue.current.lag)} / {formatNumber(queue.thresholds.lagCritical)}
                  </span>
                </div>
                <div style={{ height: '6px', backgroundColor: chartColors.light, borderRadius: '3px', position: 'relative' }}>
                  {/* Warning threshold marker */}
                  <div style={{
                    position: 'absolute',
                    left: `${(queue.thresholds.lagWarning / queue.thresholds.lagCritical) * 100}%`,
                    top: 0,
                    height: '100%',
                    width: '1px',
                    backgroundColor: chartColors.secondary
                  }} />
                  <div style={{
                    height: '100%',
                    width: `${Math.min(lagPercent, 100)}%`,
                    backgroundColor: lagPercent > 100 ? chartColors.dark : lagPercent > 50 ? chartColors.secondary : chartColors.primary,
                    borderRadius: '3px',
                    transition: 'width 0.3s'
                  }} />
                </div>
              </div>

              {/* Throughput */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '12px', color: chartColors.primary }}>↓</span>
                    <span style={{ fontSize: '10px', color: chartColors.charcoalLight }}>
                      {formatNumber(queue.current.throughputIn)}/s
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '12px', color: chartColors.navy }}>↑</span>
                    <span style={{ fontSize: '10px', color: chartColors.charcoalLight }}>
                      {formatNumber(queue.current.throughputOut)}/s
                    </span>
                  </div>
                </div>
                
                {/* Mini Sparkline */}
                <svg width={120} height={40} style={{ opacity: 0.6 }}>
                  <polyline
                    points={sparklinePoints}
                    fill="none"
                    stroke={health.color}
                    strokeWidth={1.5}
                  />
                </svg>
              </div>

              {/* Expanded Details */}
              {isSelected && (
                <div style={{ 
                  marginTop: '12px', 
                  paddingTop: '12px', 
                  borderTop: `1px solid ${chartColors.light}` 
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    <div style={{ padding: '8px', backgroundColor: chartColors.background, borderRadius: '6px' }}>
                      <div style={{ fontSize: '9px', color: chartColors.gray }}>Backpressure</div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>
                        {queue.current.throughputIn > queue.current.throughputOut ? (
                          <span style={{ color: chartColors.dark }}>
                            +{formatNumber(queue.current.throughputIn - queue.current.throughputOut)}/s accumulating
                          </span>
                        ) : (
                          <span style={{ color: chartColors.primary }}>
                            Draining {formatNumber(queue.current.throughputOut - queue.current.throughputIn)}/s
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ padding: '8px', backgroundColor: chartColors.background, borderRadius: '6px' }}>
                      <div style={{ fontSize: '9px', color: chartColors.gray }}>Time to Drain</div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>
                        {queue.current.throughputOut > queue.current.throughputIn 
                          ? formatAge(Math.round(queue.current.lag / (queue.current.throughputOut - queue.current.throughputIn)))
                          : 'N/A (backpressure)'
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <button style={{
                      flex: 1,
                      padding: '6px',
                      fontSize: '10px',
                      backgroundColor: 'white',
                      color: chartColors.charcoal,
                      border: `1px solid ${chartColors.light}`,
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      View Messages
                    </button>
                    <button style={{
                      flex: 1,
                      padding: '6px',
                      fontSize: '10px',
                      backgroundColor: health.color,
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      Scale Consumers
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ 
        marginTop: '16px', 
        padding: '10px 16px',
        backgroundColor: chartColors.background,
        borderRadius: '8px',
        display: 'flex', 
        gap: '20px',
        fontSize: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: chartColors.primary }}>↓</span>
          <span style={{ color: chartColors.charcoalLight }}>Ingest Rate</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: chartColors.navy }}>↑</span>
          <span style={{ color: chartColors.charcoalLight }}>Process Rate</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '1px', height: '10px', backgroundColor: chartColors.secondary }} />
          <span style={{ color: chartColors.charcoalLight }}>Warning Threshold</span>
        </div>
      </div>
    </div>
  );
};

export default QueueDepthMonitor;
