"use client";
import React, { useState, useEffect } from 'react';
import { chartColors } from './colors';

// C4 System Context Diagram data
const defaultData = {
  system: {
    name: 'DataFlow ML Platform',
    description: 'Enterprise machine learning platform for model development, deployment, and monitoring',
    type: 'Software System',
  },
  users: [
    {
      id: 'data-scientist',
      name: 'Data Scientist',
      icon: '👩‍🔬',
      description: 'Develops and trains ML models',
      interactions: ['Uploads datasets', 'Trains models', 'Reviews metrics'],
    },
    {
      id: 'ml-engineer',
      name: 'ML Engineer',
      icon: '👨‍💻',
      description: 'Deploys and monitors models in production',
      interactions: ['Deploys models', 'Sets up pipelines', 'Monitors drift'],
    },
    {
      id: 'analyst',
      name: 'Business Analyst',
      icon: '📊',
      description: 'Consumes model predictions for insights',
      interactions: ['Queries predictions', 'Views dashboards', 'Exports reports'],
    },
    {
      id: 'admin',
      name: 'Platform Admin',
      icon: '🔧',
      description: 'Manages users, permissions, and infrastructure',
      interactions: ['User management', 'Resource allocation', 'Cost monitoring'],
    },
  ],
  externalSystems: [
    {
      id: 'data-warehouse',
      name: 'Snowflake',
      type: 'Data Warehouse',
      icon: '❄️',
      description: 'Enterprise data warehouse',
      protocol: 'SQL/JDBC',
      direction: 'bidirectional',
      dataFlow: ['Training data', 'Feature store sync', 'Prediction results'],
    },
    {
      id: 'cloud-storage',
      name: 'S3 / GCS',
      type: 'Object Storage',
      icon: '🗄️',
      description: 'Model artifacts and datasets',
      protocol: 'S3 API',
      direction: 'bidirectional',
      dataFlow: ['Model artifacts', 'Large datasets', 'Experiment logs'],
    },
    {
      id: 'identity',
      name: 'Okta SSO',
      type: 'Identity Provider',
      icon: '🔐',
      description: 'Authentication and authorization',
      protocol: 'SAML/OIDC',
      direction: 'inbound',
      dataFlow: ['Auth tokens', 'User attributes', 'Group memberships'],
    },
    {
      id: 'monitoring',
      name: 'Datadog',
      type: 'Observability',
      icon: '📡',
      description: 'Metrics, logs, and traces',
      protocol: 'HTTP/Agent',
      direction: 'outbound',
      dataFlow: ['Metrics', 'Logs', 'Traces', 'Alerts'],
    },
    {
      id: 'k8s',
      name: 'Kubernetes',
      type: 'Container Orchestration',
      icon: '☸️',
      description: 'Model serving infrastructure',
      protocol: 'K8s API',
      direction: 'outbound',
      dataFlow: ['Deployments', 'Scaling events', 'Health checks'],
    },
    {
      id: 'git',
      name: 'GitHub',
      type: 'Version Control',
      icon: '🐙',
      description: 'Code and model versioning',
      protocol: 'Git/REST',
      direction: 'bidirectional',
      dataFlow: ['Code commits', 'PR triggers', 'Release tags'],
    },
  ],
  internalComponents: [
    { name: 'Model Registry', description: 'Version control for models' },
    { name: 'Feature Store', description: 'Centralized feature management' },
    { name: 'Training Pipeline', description: 'Distributed model training' },
    { name: 'Serving Engine', description: 'Real-time inference' },
    { name: 'Monitoring Hub', description: 'Drift and performance tracking' },
  ],
};

interface SystemContextDiagramProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const SystemContextDiagram: React.FC<SystemContextDiagramProps> = ({
  data = defaultData,
  width = 800,
  height = 600,
  title = "System Context Diagram (C4)"
}) => {
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [showDataFlows, setShowDataFlows] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Only render on client to avoid hydration mismatch from Math calculations
  useEffect(() => {
    setIsClient(true);
  }, []);

  const centerX = width / 2;
  const centerY = height / 2 - 40; // Shift up to give bottom more room
  const systemRadius = 80;
  const userRadius = 160;
  const externalRadius = 240;

  // Mouse handlers for drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as Element).tagName === 'rect') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Position users at top - wider spread
  const getUserPosition = (index: number, total: number) => {
    const startAngle = -Math.PI / 2 - Math.PI / 3;
    const endAngle = -Math.PI / 2 + Math.PI / 3;
    const angle = startAngle + (index / (total - 1)) * (endAngle - startAngle);
    return {
      x: centerX + Math.cos(angle) * userRadius,
      y: centerY + Math.sin(angle) * userRadius,
    };
  };

  // Position external systems around bottom - wider spread
  const getExternalPosition = (index: number, total: number) => {
    const startAngle = Math.PI / 8;
    const endAngle = Math.PI - Math.PI / 8;
    const angle = startAngle + (index / (total - 1)) * (endAngle - startAngle);
    return {
      x: centerX + Math.cos(angle) * externalRadius,
      y: centerY + Math.sin(angle) * externalRadius,
    };
  };

  const directionColors: Record<string, string> = {
    inbound: chartColors.primary,
    outbound: chartColors.navy,
    bidirectional: chartColors.secondary,
  };

  // Don't render on server to avoid hydration mismatch from floating-point Math
  if (!isClient) {
    return (
      <div style={{ width: '100%', height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: chartColors.muted, fontSize: '14px' }}>Loading diagram...</span>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Diagram */}
      <svg 
        width={width} 
        height={height - 40} 
        style={{ overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <defs>
          {/* Arrow markers */}
          <marker id="arrow-in" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={chartColors.primary} />
          </marker>
          <marker id="arrow-out" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={chartColors.navy} />
          </marker>
          <marker id="arrow-bi" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={chartColors.secondary} />
          </marker>
        </defs>

        {/* Draggable group */}
        <g transform={`translate(${offset.x}, ${offset.y})`}>

        {/* Connection lines to users */}
        {data.users.map((user, i) => {
          const pos = getUserPosition(i, data.users.length);
          return (
            <line
              key={`line-${user.id}`}
              x1={centerX}
              y1={centerY - systemRadius + 20}
              x2={pos.x}
              y2={pos.y + 32}
              stroke={selectedEntity === user.id ? chartColors.teal : chartColors.secondary}
              strokeWidth={selectedEntity === user.id ? 2 : 1}
              strokeDasharray={showDataFlows ? 'none' : '4,4'}
            />
          );
        })}

        {/* Connection lines to external systems */}
        {data.externalSystems.map((sys, i) => {
          const pos = getExternalPosition(i, data.externalSystems.length);
          const color = directionColors[sys.direction];
          return (
            <line
              key={`line-${sys.id}`}
              x1={centerX}
              y1={centerY + systemRadius - 20}
              x2={pos.x}
              y2={pos.y - 30}
              stroke={selectedEntity === sys.id ? color : chartColors.secondary}
              strokeWidth={selectedEntity === sys.id ? 2 : 1}
              strokeDasharray={showDataFlows ? 'none' : '4,4'}
              markerEnd={sys.direction !== 'inbound' ? `url(#arrow-${sys.direction === 'bidirectional' ? 'bi' : 'out'})` : undefined}
            />
          );
        })}

        {/* Central System */}
        <g 
          onClick={() => setSelectedEntity(selectedEntity === 'system' ? null : 'system')}
          style={{ cursor: 'pointer' }}
        >
          <rect
            x={centerX - systemRadius}
            y={centerY - systemRadius + 30}
            width={systemRadius * 2}
            height={systemRadius * 2 - 60}
            rx={12}
            fill={selectedEntity === 'system' ? chartColors.teal : chartColors.primary}
            stroke="white"
            strokeWidth={3}
          />
          <text
            x={centerX}
            y={centerY - 5}
            textAnchor="middle"
            fontSize={14}
            fontWeight={600}
            fill="white"
          >
            {data.system.name}
          </text>
          <text
            x={centerX}
            y={centerY + 15}
            textAnchor="middle"
            fontSize={10}
            fill="rgba(255,255,255,0.8)"
          >
            [Software System]
          </text>
        </g>

        {/* Users */}
        {data.users.map((user, i) => {
          const pos = getUserPosition(i, data.users.length);
          const isSelected = selectedEntity === user.id;
          const isSvgIcon = user.icon.endsWith('.svg');
          
          return (
            <g
              key={user.id}
              onClick={() => setSelectedEntity(isSelected ? null : user.id)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={32}
                fill={isSelected ? chartColors.navy : chartColors.background}
                stroke={isSelected ? chartColors.navy : chartColors.secondary}
                strokeWidth={2}
              />
              {isSvgIcon ? (
                <image
                  href={user.icon}
                  x={pos.x - 14}
                  y={pos.y - 14}
                  width={28}
                  height={28}
                />
              ) : (
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fontSize={20}
                >
                  {user.icon}
                </text>
              )}
              <text
                x={pos.x}
                y={pos.y + 50}
                textAnchor="middle"
                fontSize={10}
                fontWeight={600}
                fill={chartColors.charcoal}
              >
                {user.name}
              </text>
              <text
                x={pos.x}
                y={pos.y + 62}
                textAnchor="middle"
                fontSize={9}
                fill={chartColors.gray}
              >
                [Person]
              </text>
            </g>
          );
        })}

        {/* External Systems */}
        {data.externalSystems.map((sys, i) => {
          const pos = getExternalPosition(i, data.externalSystems.length);
          const isSelected = selectedEntity === sys.id;
          const color = directionColors[sys.direction];
          const isSvgIcon = sys.icon.endsWith('.svg');
          
          return (
            <g
              key={sys.id}
              onClick={() => setSelectedEntity(isSelected ? null : sys.id)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={pos.x - 55}
                y={pos.y - 30}
                width={110}
                height={60}
                rx={6}
                fill={isSelected ? `${color}20` : chartColors.background}
                stroke={isSelected ? color : chartColors.secondary}
                strokeWidth={2}
                strokeDasharray="4,2"
              />
              {isSvgIcon ? (
                <image
                  href={sys.icon}
                  x={pos.x - 12}
                  y={pos.y - 24}
                  width={24}
                  height={24}
                />
              ) : (
                <text
                  x={pos.x}
                  y={pos.y - 4}
                  textAnchor="middle"
                  fontSize={16}
                >
                  {sys.icon}
                </text>
              )}
              <text
                x={pos.x}
                y={pos.y + 14}
                textAnchor="middle"
                fontSize={10}
                fontWeight={600}
                fill={chartColors.charcoal}
              >
                {sys.name}
              </text>
              <text
                x={pos.x}
                y={pos.y + 48}
                textAnchor="middle"
                fontSize={9}
                fill={chartColors.gray}
              >
                [{sys.type}]
              </text>
            </g>
          );
        })}
        </g>
      </svg>

      {/* Detail Panel */}
      {selectedEntity && (
        <div style={{
          padding: '12px',
          backgroundColor: chartColors.background,
          borderRadius: '8px',
          border: `1px solid ${chartColors.light}`,
          marginTop: '8px'
        }}>
          {selectedEntity === 'system' ? (
            <>
              <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '8px' }}>
                {data.system.name}
              </div>
              <div style={{ fontSize: '11px', color: chartColors.gray, marginBottom: '8px' }}>
                {data.system.description}
              </div>
              <div style={{ fontSize: '10px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '4px' }}>
                INTERNAL COMPONENTS
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {data.internalComponents.map((comp) => (
                  <span key={comp.name} style={{
                    padding: '4px 8px',
                    backgroundColor: `${chartColors.teal}15`,
                    borderRadius: '4px',
                    fontSize: '9px',
                    color: chartColors.teal
                  }}>
                    {comp.name}
                  </span>
                ))}
              </div>
            </>
          ) : data.users.find(u => u.id === selectedEntity) ? (
            (() => {
              const user = data.users.find(u => u.id === selectedEntity)!;
              return (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{user.icon}</span>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>{user.name}</div>
                      <div style={{ fontSize: '10px', color: chartColors.gray }}>{user.description}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '4px' }}>
                    INTERACTIONS
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {user.interactions.map((int, i) => (
                      <span key={i} style={{
                        padding: '4px 8px',
                        backgroundColor: chartColors.light,
                        borderRadius: '4px',
                        fontSize: '9px',
                        color: chartColors.navy
                      }}>
                        {int}
                      </span>
                    ))}
                  </div>
                </>
              );
            })()
          ) : (
            (() => {
              const sys = data.externalSystems.find(s => s.id === selectedEntity)!;
              const color = directionColors[sys.direction];
              return (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{sys.icon}</span>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>{sys.name}</div>
                      <div style={{ fontSize: '10px', color: chartColors.gray }}>{sys.description}</div>
                    </div>
                    <span style={{
                      marginLeft: 'auto',
                      padding: '2px 8px',
                      backgroundColor: `${color}20`,
                      color: color,
                      borderRadius: '4px',
                      fontSize: '9px',
                      fontWeight: 600,
                      textTransform: 'capitalize'
                    }}>
                      {sys.direction}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '4px' }}>
                        PROTOCOL
                      </div>
                      <span style={{ fontSize: '10px', fontFamily: 'monospace', color: chartColors.teal }}>{sys.protocol}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '4px' }}>
                        DATA FLOWS
                      </div>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {sys.dataFlow.map((flow, i) => (
                          <span key={i} style={{
                            padding: '2px 6px',
                            backgroundColor: chartColors.light,
                            borderRadius: '3px',
                            fontSize: '9px'
                          }}>
                            {flow}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()
          )}
        </div>
      )}

      {/* Legend */}
      <div style={{ marginTop: '8px', display: 'flex', gap: '16px', justifyContent: 'center', fontSize: '9px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '20px', height: '2px', backgroundColor: chartColors.primary }} />
          <span style={{ color: chartColors.gray }}>Inbound</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '20px', height: '2px', backgroundColor: chartColors.navy }} />
          <span style={{ color: chartColors.gray }}>Outbound</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '20px', height: '2px', backgroundColor: chartColors.secondary }} />
          <span style={{ color: chartColors.gray }}>Bidirectional</span>
        </div>
      </div>
    </div>
  );
};

export default SystemContextDiagram;
