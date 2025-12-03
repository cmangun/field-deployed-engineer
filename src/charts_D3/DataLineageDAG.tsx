"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample data lineage DAG
const defaultData = {
  nodes: [
    // Sources (level 0)
    { id: 'salesforce', label: 'Salesforce', type: 'source', level: 0 },
    { id: 'postgres', label: 'PostgreSQL', type: 'source', level: 0 },
    { id: 'stripe', label: 'Stripe API', type: 'source', level: 0 },
    { id: 's3_raw', label: 'S3 Raw', type: 'source', level: 0 },
    
    // Ingestion (level 1)
    { id: 'fivetran', label: 'Fivetran Sync', type: 'ingestion', level: 1 },
    { id: 'airbyte', label: 'Airbyte', type: 'ingestion', level: 1 },
    
    // Staging (level 2)
    { id: 'stg_customers', label: 'stg_customers', type: 'staging', level: 2 },
    { id: 'stg_orders', label: 'stg_orders', type: 'staging', level: 2 },
    { id: 'stg_payments', label: 'stg_payments', type: 'staging', level: 2 },
    
    // Intermediate (level 3)
    { id: 'int_customer_orders', label: 'int_customer_orders', type: 'intermediate', level: 3 },
    { id: 'int_order_payments', label: 'int_order_payments', type: 'intermediate', level: 3 },
    
    // Marts (level 4)
    { id: 'dim_customers', label: 'dim_customers', type: 'mart', level: 4 },
    { id: 'fct_orders', label: 'fct_orders', type: 'mart', level: 4 },
    { id: 'fct_revenue', label: 'fct_revenue', type: 'mart', level: 4 },
    
    // Outputs (level 5)
    { id: 'looker', label: 'Looker', type: 'output', level: 5 },
    { id: 'tableau', label: 'Tableau', type: 'output', level: 5 },
  ],
  edges: [
    // Sources to Ingestion
    { source: 'salesforce', target: 'fivetran' },
    { source: 'postgres', target: 'fivetran' },
    { source: 'stripe', target: 'airbyte' },
    { source: 's3_raw', target: 'airbyte' },
    
    // Ingestion to Staging
    { source: 'fivetran', target: 'stg_customers' },
    { source: 'fivetran', target: 'stg_orders' },
    { source: 'airbyte', target: 'stg_payments' },
    
    // Staging to Intermediate
    { source: 'stg_customers', target: 'int_customer_orders' },
    { source: 'stg_orders', target: 'int_customer_orders' },
    { source: 'stg_orders', target: 'int_order_payments' },
    { source: 'stg_payments', target: 'int_order_payments' },
    
    // Intermediate to Marts
    { source: 'int_customer_orders', target: 'dim_customers' },
    { source: 'int_customer_orders', target: 'fct_orders' },
    { source: 'int_order_payments', target: 'fct_orders' },
    { source: 'int_order_payments', target: 'fct_revenue' },
    
    // Marts to Outputs
    { source: 'dim_customers', target: 'looker' },
    { source: 'fct_orders', target: 'looker' },
    { source: 'fct_revenue', target: 'looker' },
    { source: 'dim_customers', target: 'tableau' },
    { source: 'fct_revenue', target: 'tableau' },
  ]
};

const typeColors: Record<string, string> = {
  source: chartColors.navy,      // Indigo
  ingestion: chartColors.purple,
  staging: chartColors.teal,
  intermediate: chartColors.tealLight,
  mart: chartColors.orange,
  output: chartColors.primary,      // Green
};

const typeIcons: Record<string, string> = {
  source: '◆',
  ingestion: '⟳',
  staging: '▤',
  intermediate: '⬡',
  mart: '★',
  output: '◎',
};

interface DataLineageDAGProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const DataLineageDAG: React.FC<DataLineageDAGProps> = ({
  data = defaultData,
  width = 700,
  height = 420,
  title = "Data Lineage DAG"
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const margin = { top: 40, right: 30, bottom: 30, left: 30 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Calculate node positions
  const levels = [...new Set(data.nodes.map(n => n.level))].sort((a, b) => a - b);
  const levelWidth = innerWidth / (levels.length - 1 || 1);

  // Group nodes by level
  const nodesByLevel = levels.map(level => 
    data.nodes.filter(n => n.level === level)
  );

  // Calculate positions
  const nodePositions: Record<string, { x: number; y: number }> = {};
  nodesByLevel.forEach((nodesAtLevel, levelIndex) => {
    const levelHeight = innerHeight / (nodesAtLevel.length + 1);
    nodesAtLevel.forEach((node, nodeIndex) => {
      nodePositions[node.id] = {
        x: levelIndex * levelWidth,
        y: (nodeIndex + 1) * levelHeight
      };
    });
  });

  // Get connected nodes
  const getConnectedNodes = (nodeId: string): Set<string> => {
    const connected = new Set<string>();
    connected.add(nodeId);
    
    // Upstream (sources)
    const findUpstream = (id: string) => {
      data.edges.filter(e => e.target === id).forEach(e => {
        connected.add(e.source);
        findUpstream(e.source);
      });
    };
    
    // Downstream (targets)
    const findDownstream = (id: string) => {
      data.edges.filter(e => e.source === id).forEach(e => {
        connected.add(e.target);
        findDownstream(e.target);
      });
    };
    
    findUpstream(nodeId);
    findDownstream(nodeId);
    return connected;
  };

  const activeNode = selectedNode || hoveredNode;
  const connectedNodes = activeNode ? getConnectedNodes(activeNode) : null;

  // Generate curved path
  const generateEdgePath = (source: string, target: string): string => {
    const s = nodePositions[source];
    const t = nodePositions[target];
    if (!s || !t) return '';
    
    const midX = (s.x + t.x) / 2;
    return `M${s.x + 60},${s.y} C${midX},${s.y} ${midX},${t.y} ${t.x - 10},${t.y}`;
  };

  return (
    <div style={{ width: '100%' }}>
      {/* SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: chartColors.background, borderRadius: '8px' }}
        onMouseLeave={() => !selectedNode && setHoveredNode(null)}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={chartColors.gray} />
          </marker>
          <marker
            id="arrowhead-active"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={chartColors.teal} />
          </marker>
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Level labels */}
          {['Sources', 'Ingestion', 'Staging', 'Transform', 'Marts', 'Output'].map((label, i) => (
            <text
              key={i}
              x={i * levelWidth}
              y={-15}
              textAnchor="middle"
              fontSize={10}
              fontWeight={600}
              fill={chartColors.charcoalLight}
            >
              {label}
            </text>
          ))}

          {/* Edges */}
          {data.edges.map((edge, i) => {
            const isActive = connectedNodes?.has(edge.source) && connectedNodes?.has(edge.target);
            
            return (
              <path
                key={i}
                d={generateEdgePath(edge.source, edge.target)}
                fill="none"
                stroke={isActive ? chartColors.teal : chartColors.secondary}
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={connectedNodes ? (isActive ? 1 : 0.2) : 0.6}
                markerEnd={isActive ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
                style={{ transition: 'all 0.3s' }}
              />
            );
          })}

          {/* Nodes */}
          {data.nodes.map((node) => {
            const pos = nodePositions[node.id];
            const isActive = !connectedNodes || connectedNodes.has(node.id);
            const isHovered = hoveredNode === node.id;
            const isSelected = selectedNode === node.id;
            const color = typeColors[node.type];
            
            return (
              <g
                key={node.id}
                transform={`translate(${pos.x - 50}, ${pos.y - 14})`}
                onMouseEnter={() => !selectedNode && setHoveredNode(node.id)}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  width={100}
                  height={28}
                  rx={6}
                  fill={isSelected ? color : 'white'}
                  stroke={color}
                  strokeWidth={isHovered || isSelected ? 2 : 1}
                  opacity={isActive ? 1 : 0.3}
                  style={{ transition: 'all 0.2s' }}
                />
                <text
                  x={8}
                  y={18}
                  fontSize={10}
                  fill={isSelected ? 'white' : color}
                  opacity={isActive ? 1 : 0.3}
                >
                  {typeIcons[node.type]}
                </text>
                <text
                  x={22}
                  y={18}
                  fontSize={9}
                  fill={isSelected ? 'white' : chartColors.charcoal}
                  opacity={isActive ? 1 : 0.3}
                  fontWeight={isHovered || isSelected ? 600 : 400}
                >
                  {node.label.length > 12 ? node.label.slice(0, 11) + '…' : node.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Legend */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        gap: '16px',
        flexWrap: 'wrap',
        fontSize: '10px'
      }}>
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color, fontSize: '12px' }}>{typeIcons[type]}</span>
            <span style={{ color: chartColors.charcoalLight, textTransform: 'capitalize' }}>{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataLineageDAG;
