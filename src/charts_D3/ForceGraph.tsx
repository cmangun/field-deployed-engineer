"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { chartColors } from './colors';

// Sample network data
const defaultData = {
  nodes: [
    { id: "Healthcare", group: 0, size: 30 },
    { id: "Pfizer", group: 1, size: 20 },
    { id: "Abbott", group: 1, size: 18 },
    { id: "Medtronic", group: 1, size: 16 },
    { id: "Sanofi", group: 1, size: 15 },
    { id: "Technology", group: 0, size: 28 },
    { id: "Google", group: 2, size: 22 },
    { id: "Microsoft", group: 2, size: 20 },
    { id: "Apple", group: 2, size: 18 },
    { id: "Finance", group: 0, size: 25 },
    { id: "JPMorgan", group: 3, size: 16 },
    { id: "Goldman", group: 3, size: 14 },
    { id: "Visa", group: 3, size: 12 },
  ],
  links: [
    { source: "Healthcare", target: "Pfizer", value: 5 },
    { source: "Healthcare", target: "Abbott", value: 4 },
    { source: "Healthcare", target: "Medtronic", value: 4 },
    { source: "Healthcare", target: "Sanofi", value: 3 },
    { source: "Technology", target: "Google", value: 5 },
    { source: "Technology", target: "Microsoft", value: 4 },
    { source: "Technology", target: "Apple", value: 4 },
    { source: "Finance", target: "JPMorgan", value: 4 },
    { source: "Finance", target: "Goldman", value: 3 },
    { source: "Finance", target: "Visa", value: 3 },
    { source: "Pfizer", target: "Google", value: 2 },
    { source: "Abbott", target: "Microsoft", value: 2 },
    { source: "JPMorgan", target: "Apple", value: 1 },
    { source: "Healthcare", target: "Technology", value: 3 },
    { source: "Technology", target: "Finance", value: 2 },
  ]
};

interface GraphNode {
  id: string;
  group: number;
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface GraphLink {
  source: GraphNode;
  target: GraphNode;
  value: number;
}

const groupColors = [
  chartColors.charcoal,
  chartColors.teal,
  chartColors.orange,
  chartColors.navy,
  chartColors.navy,
];

interface ForceGraphProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const ForceGraph: React.FC<ForceGraphProps> = ({
  data = defaultData,
  width = 700,
  height = 450,
  title = "Force-Directed Graph"
}) => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, setLinks] = useState<GraphLink[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(true);
  const animationRef = useRef<number>();

  // Initialize simulation
  useEffect(() => {
    // Create nodes with initial positions
    const nodeMap = new Map<string, GraphNode>();
    const initialNodes: GraphNode[] = data.nodes.map((n, i) => {
      const angle = (i / data.nodes.length) * 2 * Math.PI;
      const radius = 150;
      const node: GraphNode = {
        ...n,
        x: width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 50,
        y: height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 50,
        vx: 0,
        vy: 0
      };
      nodeMap.set(n.id, node);
      return node;
    });

    // Create links
    const initialLinks: GraphLink[] = data.links.map(l => ({
      source: nodeMap.get(l.source)!,
      target: nodeMap.get(l.target)!,
      value: l.value
    }));

    setNodes(initialNodes);
    setLinks(initialLinks);
  }, [data, width, height]);

  // Force simulation
  useEffect(() => {
    if (!isSimulating || nodes.length === 0) return;

    const simulate = () => {
      setNodes(prevNodes => {
        const newNodes = prevNodes.map(n => ({ ...n }));
        const alpha = 0.1;
        const centerX = width / 2;
        const centerY = height / 2;

        // Apply forces
        newNodes.forEach(node => {
          if (node.id === draggedNode) return;

          // Center force
          node.vx += (centerX - node.x) * 0.01;
          node.vy += (centerY - node.y) * 0.01;

          // Repulsion between all nodes
          newNodes.forEach(other => {
            if (node.id === other.id) return;
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = 500 / (dist * dist);
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          });
        });

        // Link forces (spring)
        links.forEach(link => {
          const source = newNodes.find(n => n.id === link.source.id)!;
          const target = newNodes.find(n => n.id === link.target.id)!;
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const targetDist = 80;
          const force = (dist - targetDist) * 0.05;
          
          if (source.id !== draggedNode) {
            source.vx += (dx / dist) * force;
            source.vy += (dy / dist) * force;
          }
          if (target.id !== draggedNode) {
            target.vx -= (dx / dist) * force;
            target.vy -= (dy / dist) * force;
          }
        });

        // Apply velocity with damping
        newNodes.forEach(node => {
          if (node.id === draggedNode) return;
          node.vx *= 0.9;
          node.vy *= 0.9;
          node.x += node.vx * alpha;
          node.y += node.vy * alpha;
          
          // Bounds
          const padding = 30;
          node.x = Math.max(padding, Math.min(width - padding, node.x));
          node.y = Math.max(padding, Math.min(height - padding, node.y));
        });

        return newNodes;
      });

      animationRef.current = requestAnimationFrame(simulate);
    };

    animationRef.current = requestAnimationFrame(simulate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSimulating, links, width, height, draggedNode, nodes.length]);

  // Handle drag
  const handleMouseDown = (nodeId: string) => {
    setDraggedNode(nodeId);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggedNode) return;
    
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * width;
    const y = ((e.clientY - rect.top) / rect.height) * height;

    setNodes(prev => prev.map(n => 
      n.id === draggedNode ? { ...n, x, y, vx: 0, vy: 0 } : n
    ));
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  const getConnectedNodes = (nodeId: string): Set<string> => {
    const connected = new Set<string>();
    links.forEach(link => {
      if (link.source.id === nodeId) connected.add(link.target.id);
      if (link.target.id === nodeId) connected.add(link.source.id);
    });
    return connected;
  };

  const connectedNodes = hoveredNode ? getConnectedNodes(hoveredNode) : new Set<string>();

  return (
    <div style={{ width: '100%' }}>
      {/* SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ 
          maxWidth: '100%', 
          height: 'auto', 
          backgroundColor: 'white', 
          borderRadius: '8px',
          border: `1px solid ${chartColors.light}`,
          cursor: draggedNode ? 'grabbing' : 'default'
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Links */}
        {links.map((link, i) => {
          const sourceNode = nodes.find(n => n.id === link.source.id);
          const targetNode = nodes.find(n => n.id === link.target.id);
          if (!sourceNode || !targetNode) return null;

          const isHighlighted = hoveredNode && 
            (link.source.id === hoveredNode || link.target.id === hoveredNode);

          return (
            <line
              key={i}
              x1={sourceNode.x}
              y1={sourceNode.y}
              x2={targetNode.x}
              y2={targetNode.y}
              stroke={isHighlighted ? chartColors.teal : chartColors.secondary}
              strokeWidth={isHighlighted ? link.value : Math.max(1, link.value * 0.5)}
              strokeOpacity={isHighlighted ? 0.8 : 0.4}
              style={{ transition: 'stroke-opacity 0.2s, stroke-width 0.2s' }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isHovered = hoveredNode === node.id;
          const isConnected = connectedNodes.has(node.id);
          const isDimmed = hoveredNode && !isHovered && !isConnected;

          return (
            <g
              key={i}
              transform={`translate(${node.x}, ${node.y})`}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onMouseDown={() => handleMouseDown(node.id)}
              style={{ cursor: 'grab' }}
            >
              <circle
                r={node.size / 2 + (isHovered ? 3 : 0)}
                fill={groupColors[node.group % groupColors.length]}
                fillOpacity={isDimmed ? 0.3 : 0.9}
                stroke={isHovered ? chartColors.charcoal : 'white'}
                strokeWidth={isHovered ? 3 : 2}
                style={{ transition: 'all 0.2s' }}
              />
              <text
                y={node.size / 2 + 14}
                textAnchor="middle"
                fontSize={10}
                fontWeight={isHovered ? 600 : 400}
                fill={isDimmed ? chartColors.gray : chartColors.charcoal}
                fontFamily="system-ui, sans-serif"
                style={{ pointerEvents: 'none' }}
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{ marginTop: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '11px' }}>
        {['Hub', 'Healthcare', 'Technology', 'Finance'].map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: groupColors[i], 
              borderRadius: '50%' 
            }} />
            <span style={{ color: chartColors.charcoalLight }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForceGraph;
