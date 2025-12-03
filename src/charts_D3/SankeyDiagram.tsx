"use client";
import React, { useState, useMemo } from 'react';
import { chartColors } from './colors';

// Sample data
const defaultData = {
  nodes: [
    { id: "Revenue", group: 0 },
    { id: "Product Sales", group: 1 },
    { id: "Services", group: 1 },
    { id: "Licensing", group: 1 },
    { id: "Enterprise", group: 2 },
    { id: "SMB", group: 2 },
    { id: "Consumer", group: 2 },
    { id: "Consulting", group: 2 },
    { id: "Support", group: 2 },
    { id: "SaaS", group: 2 },
    { id: "Perpetual", group: 2 },
  ],
  links: [
    { source: "Revenue", target: "Product Sales", value: 45 },
    { source: "Revenue", target: "Services", value: 30 },
    { source: "Revenue", target: "Licensing", value: 25 },
    { source: "Product Sales", target: "Enterprise", value: 25 },
    { source: "Product Sales", target: "SMB", value: 12 },
    { source: "Product Sales", target: "Consumer", value: 8 },
    { source: "Services", target: "Consulting", value: 18 },
    { source: "Services", target: "Support", value: 12 },
    { source: "Licensing", target: "SaaS", value: 18 },
    { source: "Licensing", target: "Perpetual", value: 7 },
  ]
};

interface SankeyNode {
  id: string;
  group: number;
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
  value?: number;
  sourceLinks?: SankeyLink[];
  targetLinks?: SankeyLink[];
}

interface SankeyLink {
  source: SankeyNode;
  target: SankeyNode;
  value: number;
  y0?: number;
  y1?: number;
  width?: number;
}

interface SankeyData {
  nodes: { id: string; group: number }[];
  links: { source: string; target: string; value: number }[];
}

// Compute Sankey layout
function computeSankey(
  data: SankeyData,
  width: number,
  height: number,
  nodePadding: number = 10,
  nodeWidth: number = 20
) {
  const nodes: Map<string, SankeyNode> = new Map();
  
  // Create nodes
  data.nodes.forEach(n => {
    nodes.set(n.id, { 
      ...n, 
      value: 0, 
      sourceLinks: [], 
      targetLinks: [] 
    });
  });

  // Create links
  const links: SankeyLink[] = data.links.map(l => ({
    source: nodes.get(l.source)!,
    target: nodes.get(l.target)!,
    value: l.value
  }));

  // Connect links to nodes
  links.forEach(link => {
    link.source.sourceLinks!.push(link);
    link.target.targetLinks!.push(link);
  });

  // Calculate node values
  nodes.forEach(node => {
    const sourceSum = node.sourceLinks!.reduce((sum, l) => sum + l.value, 0);
    const targetSum = node.targetLinks!.reduce((sum, l) => sum + l.value, 0);
    node.value = Math.max(sourceSum, targetSum);
  });

  // Group nodes by depth (column)
  const nodeArray = Array.from(nodes.values());
  const depths = new Map<string, number>();
  
  // BFS to assign depths
  const queue = nodeArray.filter(n => n.targetLinks!.length === 0);
  queue.forEach(n => depths.set(n.id, 0));
  
  while (queue.length > 0) {
    const node = queue.shift()!;
    const depth = depths.get(node.id)!;
    node.sourceLinks!.forEach(link => {
      const targetDepth = depths.get(link.target.id);
      if (targetDepth === undefined || targetDepth < depth + 1) {
        depths.set(link.target.id, depth + 1);
        if (!queue.includes(link.target)) {
          queue.push(link.target);
        }
      }
    });
  }

  // Position nodes
  const maxDepth = Math.max(...Array.from(depths.values()));
  const columnWidth = (width - nodeWidth) / Math.max(maxDepth, 1);

  // Group by depth
  const columns: SankeyNode[][] = [];
  for (let i = 0; i <= maxDepth; i++) {
    columns.push([]);
  }
  nodeArray.forEach(node => {
    const depth = depths.get(node.id) || 0;
    columns[depth].push(node);
  });

  // Position each column
  columns.forEach((column, depth) => {
    const totalValue = column.reduce((sum, n) => sum + (n.value || 0), 0);
    const availableHeight = height - (column.length - 1) * nodePadding;
    const scale = availableHeight / totalValue;

    let y = 0;
    column.forEach(node => {
      const nodeHeight = (node.value || 0) * scale;
      node.x0 = depth * columnWidth;
      node.x1 = node.x0 + nodeWidth;
      node.y0 = y;
      node.y1 = y + nodeHeight;
      y += nodeHeight + nodePadding;
    });
  });

  // Position links
  links.forEach(link => {
    const sourceNode = link.source;
    const targetNode = link.target;
    
    // Calculate vertical positions
    const sourceY = sourceNode.y0! + (sourceNode.y1! - sourceNode.y0!) / 2;
    const targetY = targetNode.y0! + (targetNode.y1! - targetNode.y0!) / 2;
    
    link.y0 = sourceY;
    link.y1 = targetY;
    link.width = Math.max(1, link.value * ((height - (columns[0].length - 1) * nodePadding) / 
      columns[0].reduce((sum, n) => sum + (n.value || 0), 0)));
  });

  return { nodes: nodeArray, links };
}

// Generate curved path for link
function linkPath(link: SankeyLink, nodeWidth: number): string {
  const x0 = (link.source.x1 || 0);
  const x1 = (link.target.x0 || 0);
  const xi = (x0 + x1) / 2;
  const y0 = link.y0 || 0;
  const y1 = link.y1 || 0;
  
  return `M${x0},${y0}
          C${xi},${y0} ${xi},${y1} ${x1},${y1}`;
}

const sankeyColors = [
  chartColors.teal,
  chartColors.tealLight,
  chartColors.charcoal,
  chartColors.orange,
  chartColors.navy,
  chartColors.navy,
];

interface SankeyDiagramProps {
  data?: SankeyData;
  width?: number;
  height?: number;
  title?: string;
}

const SankeyDiagram: React.FC<SankeyDiagramProps> = ({
  data = defaultData,
  width = 700,
  height = 400,
  title = "Sankey Diagram"
}: {
  data?: SankeyData;
  width?: number;
  height?: number;
  title?: string;
  }) => {
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const { nodes, links } = useMemo(() => 
    computeSankey(data, innerWidth, innerHeight), 
    [data, innerWidth, innerHeight]
  );

  const getNodeColor = (node: SankeyNode) => {
    return sankeyColors[node.group % sankeyColors.length];
  };

  const formatNumber = (n: number) => n.toLocaleString();

  return (
    <div style={{ width: '100%' }}>
      

      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: 'white', borderRadius: '8px' }}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Links */}
          {links.map((link, i) => {
            const isHighlighted = hoveredLink === i || 
              hoveredNode === link.source.id || 
              hoveredNode === link.target.id;
            
            return (
              <path
                key={i}
                d={linkPath(link, 20)}
                fill="none"
                stroke={getNodeColor(link.source)}
                strokeWidth={link.width}
                strokeOpacity={isHighlighted ? 0.7 : 0.3}
                onMouseEnter={() => setHoveredLink(i)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{ cursor: 'pointer', transition: 'stroke-opacity 0.2s' }}
              >
                <title>{`${link.source.id} → ${link.target.id}: ${formatNumber(link.value)}`}</title>
              </path>
            );
          })}

          {/* Nodes */}
          {nodes.map((node, i) => {
            const isHighlighted = hoveredNode === node.id;
            
            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={node.x0}
                  y={node.y0}
                  width={(node.x1 || 0) - (node.x0 || 0)}
                  height={(node.y1 || 0) - (node.y0 || 0)}
                  fill={getNodeColor(node)}
                  fillOpacity={isHighlighted ? 1 : 0.9}
                  stroke={isHighlighted ? chartColors.charcoal : 'none'}
                  strokeWidth={2}
                  rx={2}
                >
                  <title>{`${node.id}: ${formatNumber(node.value || 0)}`}</title>
                </rect>
                <text
                  x={(node.x1 || 0) + 6}
                  y={((node.y0 || 0) + (node.y1 || 0)) / 2}
                  dy="0.35em"
                  fontSize={11}
                  fill={chartColors.charcoal}
                  fontFamily="system-ui, sans-serif"
                  fontWeight={isHighlighted ? 600 : 400}
                >
                  {node.id}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Legend */}
      <div style={{ marginTop: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '11px' }}>
        {['Source', 'Category', 'Segment'].map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: sankeyColors[i], borderRadius: '2px' }} />
            <span style={{ color: chartColors.charcoalLight }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SankeyDiagram;
