"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// ML Pipeline stages and components
const defaultData = {
  stages: [
    {
      id: 'data-sources',
      name: 'Data Sources',
      x: 0,
      components: [
        { id: 'streaming', name: 'Streaming Data', icon: '◉', type: 'kafka' },
        { id: 'databases', name: 'Databases', icon: '▤', type: 'postgres' },
        { id: 'apis', name: 'External APIs', icon: '⟳', type: 'api' },
        { id: 'files', name: 'File Storage', icon: '▢', type: 's3' },
      ]
    },
    {
      id: 'ingestion',
      name: 'Data Ingestion',
      x: 1,
      components: [
        { id: 'spark', name: 'Spark Jobs', icon: '⚡', type: 'compute' },
        { id: 'airflow', name: 'Airflow DAGs', icon: '↻', type: 'orchestration' },
      ]
    },
    {
      id: 'feature-store',
      name: 'Feature Store',
      x: 2,
      components: [
        { id: 'offline', name: 'Offline Store', icon: '▤', type: 'storage' },
        { id: 'online', name: 'Online Store', icon: '⚡', type: 'cache' },
        { id: 'registry', name: 'Feature Registry', icon: '☰', type: 'metadata' },
      ]
    },
    {
      id: 'training',
      name: 'Model Training',
      x: 3,
      components: [
        { id: 'experiments', name: 'Experiments', icon: '⚗', type: 'mlflow' },
        { id: 'training-cluster', name: 'Training Cluster', icon: '⬡', type: 'gpu' },
        { id: 'hyperparams', name: 'Hyperparameter Tuning', icon: '◎', type: 'optuna' },
      ]
    },
    {
      id: 'model-registry',
      name: 'Model Registry',
      x: 4,
      components: [
        { id: 'versioning', name: 'Model Versions', icon: '⑂', type: 'versioning' },
        { id: 'validation', name: 'Validation', icon: '✓', type: 'testing' },
        { id: 'artifacts', name: 'Artifacts', icon: '◆', type: 'storage' },
      ]
    },
    {
      id: 'serving',
      name: 'Model Serving',
      x: 5,
      components: [
        { id: 'inference', name: 'Inference API', icon: '⟐', type: 'endpoint' },
        { id: 'batch', name: 'Batch Predictions', icon: '▦', type: 'batch' },
        { id: 'edge', name: 'Edge Deployment', icon: '◇', type: 'edge' },
      ]
    },
    {
      id: 'monitoring',
      name: 'Monitoring',
      x: 6,
      components: [
        { id: 'metrics', name: 'Model Metrics', icon: '◈', type: 'metrics' },
        { id: 'drift', name: 'Drift Detection', icon: '⚠', type: 'alert' },
        { id: 'logs', name: 'Logging', icon: '≡', type: 'logs' },
      ]
    }
  ],
  connections: [
    { from: 'streaming', to: 'spark' },
    { from: 'databases', to: 'spark' },
    { from: 'apis', to: 'airflow' },
    { from: 'files', to: 'airflow' },
    { from: 'spark', to: 'offline' },
    { from: 'airflow', to: 'offline' },
    { from: 'offline', to: 'online' },
    { from: 'offline', to: 'registry' },
    { from: 'online', to: 'experiments' },
    { from: 'registry', to: 'experiments' },
    { from: 'experiments', to: 'training-cluster' },
    { from: 'training-cluster', to: 'hyperparams' },
    { from: 'hyperparams', to: 'versioning' },
    { from: 'training-cluster', to: 'versioning' },
    { from: 'versioning', to: 'validation' },
    { from: 'validation', to: 'artifacts' },
    { from: 'artifacts', to: 'inference' },
    { from: 'artifacts', to: 'batch' },
    { from: 'artifacts', to: 'edge' },
    { from: 'inference', to: 'metrics' },
    { from: 'batch', to: 'metrics' },
    { from: 'metrics', to: 'drift' },
    { from: 'drift', to: 'logs' },
    // Feedback loops
    { from: 'drift', to: 'experiments', feedback: true },
    { from: 'metrics', to: 'offline', feedback: true },
  ]
};

const stageColors: Record<number, string> = {
  0: chartColors.navy,  // Data Sources - Indigo
  1: chartColors.purple,  // Ingestion
  2: chartColors.teal,    // Feature Store
  3: chartColors.orange,  // Training
  4: chartColors.cyan,           // Model Registry - Pink
  5: chartColors.primary,           // Serving - Green
  6: chartColors.charcoalLight, // Monitoring
};

interface MLPipelineProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const MLPipeline: React.FC<MLPipelineProps> = ({
  data = defaultData,
  width = 700,
  height = 500,
  title = "ML Pipeline Architecture"
}) => {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const margin = { top: 60, right: 30, bottom: 40, left: 30 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const stageWidth = innerWidth / data.stages.length;
  const componentHeight = 36;
  const componentWidth = stageWidth * 0.85;

  // Calculate component positions
  const getComponentPosition = (stageX: number, componentIndex: number, totalComponents: number) => {
    const stageCenter = stageX * stageWidth + stageWidth / 2;
    const startY = (innerHeight - totalComponents * (componentHeight + 12)) / 2;
    return {
      x: stageCenter - componentWidth / 2,
      y: startY + componentIndex * (componentHeight + 12)
    };
  };

  // Build position map
  const componentPositions: Record<string, { x: number; y: number; stageX: number }> = {};
  data.stages.forEach((stage) => {
    stage.components.forEach((comp, i) => {
      const pos = getComponentPosition(stage.x, i, stage.components.length);
      componentPositions[comp.id] = { ...pos, stageX: stage.x };
    });
  });

  // Get connected components
  const getConnectedComponents = (compId: string): Set<string> => {
    const connected = new Set<string>();
    connected.add(compId);
    
    data.connections.forEach(conn => {
      if (conn.from === compId) connected.add(conn.to);
      if (conn.to === compId) connected.add(conn.from);
    });
    
    return connected;
  };

  const connectedComponents = hoveredComponent ? getConnectedComponents(hoveredComponent) : null;

  // Generate curved connection path
  const generateConnectionPath = (fromId: string, toId: string, feedback?: boolean): string => {
    const from = componentPositions[fromId];
    const to = componentPositions[toId];
    if (!from || !to) return '';

    const fromX = from.x + componentWidth;
    const fromY = from.y + componentHeight / 2;
    const toX = to.x;
    const toY = to.y + componentHeight / 2;

    if (feedback) {
      // Feedback loop goes above
      const midY = -30;
      return `M${fromX},${fromY} C${fromX + 40},${fromY} ${fromX + 40},${midY} ${(fromX + toX) / 2},${midY} C${toX - 40},${midY} ${toX - 40},${toY} ${toX},${toY}`;
    }

    // Regular forward connection
    const midX = (fromX + toX) / 2;
    return `M${fromX},${fromY} C${midX},${fromY} ${midX},${toY} ${toX},${toY}`;
  };

  return (
    <div style={{ width: '100%' }}>
      {/* SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: chartColors.background, borderRadius: '12px' }}
        onMouseLeave={() => setHoveredComponent(null)}
      >
        <defs>
          <marker
            id="arrowhead-pipeline"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill={chartColors.gray} />
          </marker>
          <marker
            id="arrowhead-active"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill={chartColors.teal} />
          </marker>
          <marker
            id="arrowhead-feedback"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill={chartColors.orange} />
          </marker>
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Stage headers */}
          {data.stages.map((stage, i) => (
            <g key={stage.id}>
              <rect
                x={i * stageWidth + 4}
                y={-45}
                width={stageWidth - 8}
                height={28}
                rx={6}
                fill={stageColors[i]}
                fillOpacity={selectedStage === stage.id ? 1 : 0.1}
                stroke={stageColors[i]}
                strokeWidth={1}
                onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                style={{ cursor: 'pointer' }}
              />
              <text
                x={i * stageWidth + stageWidth / 2}
                y={-26}
                textAnchor="middle"
                fontSize={10}
                fontWeight={600}
                fill={selectedStage === stage.id ? 'white' : stageColors[i]}
                onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                style={{ cursor: 'pointer' }}
              >
                {stage.name}
              </text>
            </g>
          ))}

          {/* Connections */}
          {data.connections.map((conn, i) => {
            const isActive = connectedComponents?.has(conn.from) && connectedComponents?.has(conn.to);
            const isFeedback = conn.feedback;
            
            return (
              <path
                key={i}
                d={generateConnectionPath(conn.from, conn.to, isFeedback)}
                fill="none"
                stroke={isFeedback ? chartColors.orange : (isActive ? chartColors.teal : chartColors.secondary)}
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={connectedComponents ? (isActive ? 1 : 0.2) : 0.6}
                strokeDasharray={isFeedback ? '6,3' : 'none'}
                markerEnd={isFeedback ? 'url(#arrowhead-feedback)' : (isActive ? 'url(#arrowhead-active)' : 'url(#arrowhead-pipeline)')}
                style={{ transition: 'all 0.2s' }}
              />
            );
          })}

          {/* Components */}
          {data.stages.map((stage) => (
            stage.components.map((comp, compIndex) => {
              const pos = componentPositions[comp.id];
              const isHovered = hoveredComponent === comp.id;
              const isConnected = !connectedComponents || connectedComponents.has(comp.id);
              const color = stageColors[stage.x];

              return (
                <g
                  key={comp.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onMouseEnter={() => setHoveredComponent(comp.id)}
                  style={{ cursor: 'pointer', opacity: isConnected ? 1 : 0.25 }}
                >
                  <rect
                    width={componentWidth}
                    height={componentHeight}
                    rx={8}
                    fill="white"
                    stroke={isHovered ? color : chartColors.light}
                    strokeWidth={isHovered ? 2 : 1}
                    style={{ transition: 'all 0.2s' }}
                  />
                  <text
                    x={12}
                    y={componentHeight / 2 + 1}
                    dominantBaseline="middle"
                    fontSize={14}
                    fill={color}
                  >
                    {comp.icon}
                  </text>
                  <text
                    x={30}
                    y={componentHeight / 2 + 1}
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight={isHovered ? 600 : 400}
                    fill={chartColors.charcoal}
                  >
                    {comp.name}
                  </text>
                </g>
              );
            })
          ))}

          {/* Feedback loop label */}
          <text
            x={innerWidth / 2}
            y={-55}
            textAnchor="middle"
            fontSize={9}
            fill={chartColors.orange}
            fontWeight={500}
          >
            ← Retraining Feedback Loop →
          </text>
        </g>
      </svg>

      {/* Legend */}
      <div style={{ 
        marginTop: '16px', 
        display: 'flex', 
        gap: '16px',
        flexWrap: 'wrap',
        fontSize: '10px'
      }}>
        {data.stages.map((stage, i) => (
          <div 
            key={stage.id} 
            style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
            onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
          >
            <div style={{ 
              width: '10px', 
              height: '10px', 
              backgroundColor: stageColors[i], 
              borderRadius: '2px' 
            }} />
            <span style={{ color: chartColors.charcoalLight }}>{stage.name}</span>
          </div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '20px', height: '2px', backgroundColor: chartColors.secondary }} />
            <span style={{ color: chartColors.gray }}>Data Flow</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '20px', height: '2px', backgroundColor: chartColors.orange, backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, chartColors.background 3px, chartColors.background 6px)' }} />
            <span style={{ color: chartColors.gray }}>Feedback</span>
          </div>
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
        <strong style={{ color: chartColors.teal }}>Tech Stack:</strong>
        <span style={{ marginLeft: '8px' }}>
          Kafka • Spark • Airflow • Feast • MLflow • Kubernetes • FastAPI • Prometheus • Grafana
        </span>
      </div>
    </div>
  );
};

export default MLPipeline;
