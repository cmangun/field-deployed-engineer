"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Request Flow Tracer data
const defaultData = {
  traceId: 'abc123def456',
  rootSpan: 'POST /api/checkout',
  totalDuration: 892,
  status: 'error',
  timestamp: '2026-11-22T14:32:15.234Z',
  services: ['api-gateway', 'checkout-service', 'payment-api', 'inventory-service', 'order-service', 'notification-service'],
  spans: [
    { id: 's1', parent: null, service: 'api-gateway', operation: 'POST /api/checkout', start: 0, duration: 892, status: 'error', tags: { 'http.status_code': 500 } },
    { id: 's2', parent: 's1', service: 'checkout-service', operation: 'processCheckout', start: 12, duration: 868, status: 'error', tags: { 'user.id': 'u-12345' } },
    { id: 's3', parent: 's2', service: 'inventory-service', operation: 'reserveItems', start: 25, duration: 145, status: 'ok', tags: { 'items.count': 3 } },
    { id: 's4', parent: 's2', service: 'payment-api', operation: 'processPayment', start: 185, duration: 678, status: 'error', tags: { 'amount': '$129.99' } },
    { id: 's5', parent: 's4', service: 'payment-api', operation: 'validateCard', start: 190, duration: 45, status: 'ok', tags: { 'card.type': 'visa' } },
    { id: 's6', parent: 's4', service: 'payment-api', operation: 'chargeCard', start: 240, duration: 612, status: 'error', tags: { 'error': 'Gateway timeout' } },
    { id: 's7', parent: 's6', service: 'payment-api', operation: 'retryCharge', start: 520, duration: 325, status: 'error', tags: { 'retry.attempt': 2 } },
    { id: 's8', parent: 's2', service: 'order-service', operation: 'createOrder', start: 870, duration: 8, status: 'ok', tags: { 'order.id': 'ord-98765' } },
  ],
  logs: [
    { spanId: 's4', timestamp: '14:32:15.425', level: 'warn', message: 'Payment gateway slow response (>500ms)' },
    { spanId: 's6', timestamp: '14:32:15.852', level: 'error', message: 'Gateway timeout after 600ms' },
    { spanId: 's7', timestamp: '14:32:16.145', level: 'error', message: 'Retry failed: Gateway still unavailable' },
  ],
  criticalPath: ['s1', 's2', 's4', 's6', 's7'],
  bottleneck: { spanId: 's6', service: 'payment-api', operation: 'chargeCard', contribution: 68.6 },
};

const statusColors: Record<string, { color: string; bg: string }> = {
  ok: { color: chartColors.primary, bg: chartColors.light },
  error: { color: chartColors.dark, bg: chartColors.light },
  warn: { color: chartColors.secondary, bg: chartColors.light },
};

const serviceColors: Record<string, string> = {
  'api-gateway': chartColors.navy,
  'checkout-service': chartColors.navy,
  'payment-api': chartColors.dark,
  'inventory-service': chartColors.primary,
  'order-service': chartColors.primary,
  'notification-service': chartColors.secondary,
};

interface RequestFlowTracerProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const RequestFlowTracer: React.FC<RequestFlowTracerProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Distributed Trace"
}) => {
  const [selectedSpan, setSelectedSpan] = useState<string | null>(null);
  const [showCriticalPath, setShowCriticalPath] = useState(true);

  const chartWidth = width - 200;
  const rowHeight = 36;
  const leftMargin = 180;

  // Scale for timeline
  const xScale = (ms: number) => (ms / data.totalDuration) * chartWidth;

  // Build span hierarchy
  const getSpanDepth = (spanId: string, depth = 0): number => {
    const span = data.spans.find(s => s.id === spanId);
    if (!span?.parent) return depth;
    return getSpanDepth(span.parent, depth + 1);
  };

  // Sort spans by start time
  const sortedSpans = [...data.spans].sort((a, b) => a.start - b.start);

  return (
    <div style={{ width: '100%' }}>
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '16px' }}>
        <div style={{ padding: '10px', backgroundColor: chartColors.background, borderRadius: '8px' }}>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>Root Operation</div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>{data.rootSpan}</div>
        </div>
        <div style={{ padding: '10px', backgroundColor: chartColors.background, borderRadius: '8px' }}>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>Services</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: chartColors.charcoal }}>{data.services.length}</div>
        </div>
        <div style={{ padding: '10px', backgroundColor: chartColors.background, borderRadius: '8px' }}>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>Spans</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: chartColors.charcoal }}>{data.spans.length}</div>
        </div>
        <div style={{ 
          padding: '10px', 
          backgroundColor: statusColors[data.bottleneck ? 'error' : 'ok'].bg, 
          borderRadius: '8px' 
        }}>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>Bottleneck</div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: statusColors.error.color }}>
            {data.bottleneck.operation} ({data.bottleneck.contribution}%)
          </div>
        </div>
      </div>

      {/* Trace Waterfall */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        border: `1px solid ${chartColors.light}`,
        overflow: 'hidden'
      }}>
        {/* Timeline Header */}
        <div style={{ 
          display: 'flex',
          borderBottom: `1px solid ${chartColors.light}`,
          backgroundColor: chartColors.background
        }}>
          <div style={{ width: leftMargin, padding: '8px 12px', fontSize: '10px', fontWeight: 600, color: chartColors.charcoalLight }}>
            Service / Operation
          </div>
          <div style={{ flex: 1, padding: '8px 12px', position: 'relative' }}>
            {/* Time markers */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
              <span
                key={i}
                style={{
                  position: 'absolute',
                  left: `${ratio * 100}%`,
                  fontSize: '9px',
                  color: chartColors.gray,
                  transform: 'translateX(-50%)'
                }}
              >
                {Math.round(data.totalDuration * ratio)}ms
              </span>
            ))}
          </div>
        </div>

        {/* Spans */}
        <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
          {sortedSpans.map((span, i) => {
            const depth = getSpanDepth(span.id);
            const isCritical = data.criticalPath.includes(span.id);
            const isSelected = selectedSpan === span.id;
            const serviceColor = serviceColors[span.service] || chartColors.charcoal;
            const status = statusColors[span.status];
            
            return (
              <div
                key={span.id}
                onClick={() => setSelectedSpan(isSelected ? null : span.id)}
                style={{
                  display: 'flex',
                  borderBottom: `1px solid ${chartColors.light}`,
                  backgroundColor: isSelected ? chartColors.background : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.1s'
                }}
              >
                {/* Service/Operation Label */}
                <div style={{ 
                  width: leftMargin, 
                  padding: '8px 12px',
                  paddingLeft: `${12 + depth * 16}px`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {depth > 0 && (
                    <span style={{ color: chartColors.secondary, fontSize: '10px' }}>└</span>
                  )}
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '2px',
                    backgroundColor: serviceColor
                  }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '10px', fontWeight: 600, color: chartColors.charcoal, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {span.operation}
                    </div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>{span.service}</div>
                  </div>
                </div>

                {/* Timeline Bar */}
                <div style={{ 
                  flex: 1, 
                  padding: '8px 12px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: `${(span.start / data.totalDuration) * 100}%`,
                      width: `${Math.max((span.duration / data.totalDuration) * 100, 0.5)}%`,
                      height: '20px',
                      backgroundColor: status.color,
                      borderRadius: '4px',
                      opacity: showCriticalPath && !isCritical ? 0.3 : 1,
                      border: isCritical && showCriticalPath ? `2px solid ${chartColors.charcoal}` : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: '4px',
                      transition: 'opacity 0.2s'
                    }}
                  >
                    <span style={{ fontSize: '9px', color: 'white', fontWeight: 600 }}>
                      {span.duration}ms
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Span Details */}
      {selectedSpan && (
        <div style={{ 
          marginTop: '12px',
          padding: '12px',
          backgroundColor: chartColors.background,
          borderRadius: '10px',
          border: `1px solid ${chartColors.light}`
        }}>
          {(() => {
            const span = data.spans.find(s => s.id === selectedSpan);
            if (!span) return null;
            const serviceColor = serviceColors[span.service];
            const spanLogs = data.logs.filter(l => l.spanId === span.id);
            
            return (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: serviceColor }} />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: chartColors.charcoal }}>{span.operation}</span>
                      <span style={{
                        padding: '2px 6px',
                        backgroundColor: statusColors[span.status].bg,
                        color: statusColors[span.status].color,
                        borderRadius: '4px',
                        fontSize: '9px',
                        fontWeight: 600
                      }}>
                        {span.status.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ fontSize: '10px', color: chartColors.gray, marginTop: '2px' }}>
                      {span.service} • Start: {span.start}ms • Duration: {span.duration}ms
                    </div>
                  </div>
                </div>
                
                {/* Tags */}
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '9px', fontWeight: 600, color: chartColors.gray, marginBottom: '4px' }}>TAGS</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {Object.entries(span.tags).map(([key, value], i) => (
                      <span key={i} style={{
                        padding: '3px 8px',
                        backgroundColor: 'white',
                        border: `1px solid ${chartColors.light}`,
                        borderRadius: '4px',
                        fontSize: '9px'
                      }}>
                        <span style={{ color: chartColors.gray }}>{key}:</span>{' '}
                        <span style={{ fontWeight: 600, color: chartColors.charcoal }}>{String(value)}</span>
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Logs */}
                {spanLogs.length > 0 && (
                  <div>
                    <div style={{ fontSize: '9px', fontWeight: 600, color: chartColors.gray, marginBottom: '4px' }}>LOGS</div>
                    {spanLogs.map((log, i) => (
                      <div key={i} style={{
                        padding: '6px 8px',
                        backgroundColor: statusColors[log.level]?.bg || chartColors.light,
                        borderRadius: '4px',
                        marginBottom: '4px',
                        fontSize: '10px'
                      }}>
                        <span style={{ fontWeight: 600, color: statusColors[log.level]?.color || chartColors.charcoal }}>
                          [{log.level.toUpperCase()}]
                        </span>{' '}
                        <span style={{ color: chartColors.gray }}>{log.timestamp}</span>{' '}
                        <span style={{ color: chartColors.charcoal }}>{log.message}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}

      {/* Service Legend */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        gap: '12px',
        flexWrap: 'wrap',
        fontSize: '10px'
      }}>
        {data.services.map((service) => (
          <div key={service} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ 
              width: '10px', 
              height: '10px', 
              borderRadius: '2px', 
              backgroundColor: serviceColors[service] || chartColors.charcoal 
            }} />
            <span style={{ color: chartColors.charcoalLight, fontFamily: 'monospace' }}>{service}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestFlowTracer;
