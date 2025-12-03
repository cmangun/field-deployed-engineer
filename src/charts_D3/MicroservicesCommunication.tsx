"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Microservices Communication Architecture
const defaultData = {
  services: [
    { id: 'api-gateway', name: 'API Gateway', icon: '🚪', type: 'gateway', x: 0, y: 1 },
    { id: 'auth-service', name: 'Auth Service', icon: '🔐', type: 'core', x: 1, y: 0 },
    { id: 'user-service', name: 'User Service', icon: '👤', type: 'core', x: 1, y: 1 },
    { id: 'order-service', name: 'Order Service', icon: '📦', type: 'core', x: 1, y: 2 },
    { id: 'inventory-service', name: 'Inventory', icon: '📊', type: 'core', x: 2, y: 0 },
    { id: 'payment-service', name: 'Payment', icon: '💳', type: 'core', x: 2, y: 1 },
    { id: 'notification-service', name: 'Notification', icon: '🔔', type: 'core', x: 2, y: 2 },
    { id: 'search-service', name: 'Search', icon: '🔍', type: 'support', x: 3, y: 0.5 },
    { id: 'analytics-service', name: 'Analytics', icon: '📈', type: 'support', x: 3, y: 1.5 },
  ],
  communications: [
    // Sync (REST/gRPC)
    { from: 'api-gateway', to: 'auth-service', type: 'sync', protocol: 'REST' },
    { from: 'api-gateway', to: 'user-service', type: 'sync', protocol: 'REST' },
    { from: 'api-gateway', to: 'order-service', type: 'sync', protocol: 'REST' },
    { from: 'user-service', to: 'auth-service', type: 'sync', protocol: 'gRPC' },
    { from: 'order-service', to: 'inventory-service', type: 'sync', protocol: 'gRPC' },
    { from: 'order-service', to: 'payment-service', type: 'sync', protocol: 'gRPC' },
    { from: 'order-service', to: 'user-service', type: 'sync', protocol: 'gRPC' },
    // Async (Events)
    { from: 'order-service', to: 'notification-service', type: 'async', protocol: 'Kafka' },
    { from: 'payment-service', to: 'notification-service', type: 'async', protocol: 'Kafka' },
    { from: 'user-service', to: 'analytics-service', type: 'async', protocol: 'Kafka' },
    { from: 'order-service', to: 'analytics-service', type: 'async', protocol: 'Kafka' },
    { from: 'inventory-service', to: 'search-service', type: 'async', protocol: 'Kafka' },
  ],
  patterns: [
    { name: 'Circuit Breaker', icon: '⚡', services: ['order-service', 'payment-service'] },
    { name: 'Retry + Backoff', icon: '🔄', services: ['api-gateway'] },
    { name: 'Service Discovery', icon: '🔍', services: ['all'] },
    { name: 'Load Balancing', icon: '⚖️', services: ['api-gateway'] },
  ],
  infrastructure: {
    serviceMesh: 'Istio',
    discovery: 'Consul',
    tracing: 'Jaeger',
    metrics: 'Prometheus'
  }
};

const typeColors: Record<string, string> = {
  gateway: chartColors.navy,
  core: chartColors.teal,
  support: chartColors.orange,
};

interface MicroservicesCommunicationProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const MicroservicesCommunication: React.FC<MicroservicesCommunicationProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Microservices Communication"
}) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showSync, setShowSync] = useState(true);
  const [showAsync, setShowAsync] = useState(true);
  const [hoveredComm, setHoveredComm] = useState<number | null>(null);

  const margin = { top: 60, right: 30, bottom: 60, left: 30 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Layout
  const serviceWidth = 100;
  const serviceHeight = 55;
  const colWidth = innerWidth / 4;
  const rowHeight = innerHeight / 3;

  // Get service position
  const getServicePos = (service: typeof data.services[0]) => ({
    x: service.x * colWidth + (colWidth - serviceWidth) / 2,
    y: service.y * rowHeight + 20
  });

  // Get connected services
  const getConnectedServices = (serviceId: string) => {
    const connected = new Set<string>();
    connected.add(serviceId);
    data.communications.forEach(comm => {
      if (comm.from === serviceId) connected.add(comm.to);
      if (comm.to === serviceId) connected.add(comm.from);
    });
    return connected;
  };

  const connectedServices = selectedService ? getConnectedServices(selectedService) : null;

  // Generate curved path
  const generatePath = (from: typeof data.services[0], to: typeof data.services[0], type: string) => {
    const fromPos = getServicePos(from);
    const toPos = getServicePos(to);
    
    const x1 = fromPos.x + serviceWidth;
    const y1 = fromPos.y + serviceHeight / 2;
    const x2 = toPos.x;
    const y2 = toPos.y + serviceHeight / 2;

    // Offset for async to avoid overlap
    const offset = type === 'async' ? 8 : 0;
    
    const midX = (x1 + x2) / 2;
    return `M${x1},${y1 + offset} C${midX},${y1 + offset} ${midX},${y2 + offset} ${x2},${y2 + offset}`;
  };

  return (
    <div style={{ width: '100%' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: chartColors.background, borderRadius: '12px' }}
      >
        <defs>
          <marker id="arrow-sync" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={chartColors.teal} />
          </marker>
          <marker id="arrow-async" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={chartColors.orange} />
          </marker>
          <marker id="arrow-gray" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={chartColors.secondary} />
          </marker>
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Column Labels */}
          {['Gateway', 'Core Services', 'Integration', 'Support'].map((label, i) => (
            <text
              key={i}
              x={i * colWidth + colWidth / 2}
              y={-30}
              textAnchor="middle"
              fontSize={11}
              fontWeight={600}
              fill={chartColors.charcoalLight}
            >
              {label}
            </text>
          ))}

          {/* Service Mesh Background */}
          <rect
            x={colWidth - 20}
            y={-10}
            width={colWidth * 2 + 40}
            height={innerHeight - 30}
            rx={16}
            fill={chartColors.navy}
            fillOpacity={0.03}
            stroke={chartColors.navy}
            strokeOpacity={0.1}
            strokeDasharray="8,4"
          />
          <text x={colWidth * 2} y={innerHeight - 25} textAnchor="middle" fontSize={9} fill={chartColors.navy} fontWeight={500}>
            Service Mesh ({data.infrastructure.serviceMesh})
          </text>

          {/* Communications */}
          {data.communications.map((comm, i) => {
            const fromService = data.services.find(s => s.id === comm.from);
            const toService = data.services.find(s => s.id === comm.to);
            if (!fromService || !toService) return null;
            
            const isSync = comm.type === 'sync';
            if (isSync && !showSync) return null;
            if (!isSync && !showAsync) return null;
            
            const isActive = !connectedServices || 
              (connectedServices.has(comm.from) && connectedServices.has(comm.to));
            const isHovered = hoveredComm === i;
            
            const color = isSync ? chartColors.teal : chartColors.orange;
            
            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredComm(i)}
                onMouseLeave={() => setHoveredComm(null)}
              >
                <path
                  d={generatePath(fromService, toService, comm.type)}
                  fill="none"
                  stroke={isActive ? color : chartColors.secondary}
                  strokeWidth={isHovered ? 3 : (isActive ? 2 : 1)}
                  strokeOpacity={isActive ? 0.8 : 0.3}
                  strokeDasharray={isSync ? 'none' : '6,3'}
                  markerEnd={isActive ? `url(#arrow-${comm.type})` : 'url(#arrow-gray)'}
                  style={{ transition: 'all 0.2s', cursor: 'pointer' }}
                />
                {isHovered && (
                  <text
                    x={(getServicePos(fromService).x + getServicePos(toService).x + serviceWidth) / 2}
                    y={(getServicePos(fromService).y + getServicePos(toService).y + serviceHeight) / 2 - 10}
                    textAnchor="middle"
                    fontSize={9}
                    fontWeight={600}
                    fill={color}
                  >
                    {comm.protocol}
                  </text>
                )}
              </g>
            );
          })}

          {/* Services */}
          {data.services.map((service) => {
            const pos = getServicePos(service);
            const isSelected = selectedService === service.id;
            const isActive = !connectedServices || connectedServices.has(service.id);
            const color = typeColors[service.type];
            
            return (
              <g
                key={service.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={() => setSelectedService(isSelected ? null : service.id)}
                style={{ cursor: 'pointer', opacity: isActive ? 1 : 0.3 }}
              >
                <rect
                  width={serviceWidth}
                  height={serviceHeight}
                  rx={10}
                  fill={isSelected ? color : 'white'}
                  stroke={color}
                  strokeWidth={isSelected ? 2 : 1}
                />
                <text x={14} y={22} fontSize={16}>{service.icon}</text>
                <text
                  x={38}
                  y={20}
                  fontSize={10}
                  fontWeight={600}
                  fill={isSelected ? 'white' : chartColors.charcoal}
                >
                  {service.name.split(' ')[0]}
                </text>
                <text
                  x={38}
                  y={32}
                  fontSize={10}
                  fontWeight={600}
                  fill={isSelected ? 'white' : chartColors.charcoal}
                >
                  {service.name.split(' ')[1] || ''}
                </text>
                <text
                  x={14}
                  y={46}
                  fontSize={8}
                  fill={isSelected ? 'rgba(255,255,255,0.8)' : chartColors.gray}
                >
                  {service.type}
                </text>
              </g>
            );
          })}

          {/* Patterns Legend */}
          <g transform={`translate(0, ${innerHeight - 10})`}>
            <text x={0} y={0} fontSize={9} fontWeight={600} fill={chartColors.charcoalLight}>
              Patterns:
            </text>
            {data.patterns.slice(0, 4).map((pattern, i) => (
              <g key={i} transform={`translate(${60 + i * 120}, -4)`}>
                <text x={0} y={0} fontSize={12}>{pattern.icon}</text>
                <text x={18} y={0} fontSize={8} fill={chartColors.gray}>{pattern.name}</text>
              </g>
            ))}
          </g>
        </g>
      </svg>

      {/* Infrastructure Panel */}
      <div style={{ 
        marginTop: '16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px'
      }}>
        {[
          { label: 'Service Mesh', value: data.infrastructure.serviceMesh, icon: '🕸️' },
          { label: 'Discovery', value: data.infrastructure.discovery, icon: '🔍' },
          { label: 'Tracing', value: data.infrastructure.tracing, icon: '📍' },
          { label: 'Metrics', value: data.infrastructure.metrics, icon: '📊' },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: `1px solid ${chartColors.light}`,
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '16px', marginBottom: '4px' }}>{item.icon}</div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>{item.value}</div>
            <div style={{ fontSize: '9px', color: chartColors.gray }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        gap: '24px',
        fontSize: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '20px', height: '2px', backgroundColor: chartColors.teal }} />
          <span style={{ color: chartColors.charcoalLight }}>Sync (REST/gRPC)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '20px', height: '2px', backgroundColor: chartColors.orange, backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, chartColors.background 3px, chartColors.background 6px)' }} />
          <span style={{ color: chartColors.charcoalLight }}>Async (Events/Kafka)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: chartColors.navy, borderRadius: '3px', opacity: 0.2 }} />
          <span style={{ color: chartColors.charcoalLight }}>Service Mesh</span>
        </div>
      </div>

      {/* Tech Stack */}
      <div style={{ 
        marginTop: '12px',
        padding: '12px',
        backgroundColor: chartColors.light,
        borderRadius: '8px',
        fontSize: '10px',
        color: chartColors.charcoalLight
      }}>
        <strong style={{ color: chartColors.primary }}>Tech Stack:</strong>
        <span style={{ marginLeft: '8px' }}>
          Kubernetes • Istio • Envoy • Consul • gRPC • Apache Kafka • Jaeger • Prometheus • Grafana
        </span>
      </div>
    </div>
  );
};

export default MicroservicesCommunication;
