"use client";
import React, { useState, useMemo } from 'react';
import { chartColors } from './colors';

// Sample hierarchical data
const defaultData = {
  name: "Portfolio",
  children: [
    {
      name: "Healthcare",
      children: [
        { name: "Pfizer", value: 8500 },
        { name: "Abbott", value: 6200 },
        { name: "Medtronic", value: 4800 },
        { name: "Sanofi", value: 3900 },
      ]
    },
    {
      name: "Technology",
      children: [
        { name: "Google", value: 7200 },
        { name: "Microsoft", value: 5800 },
        { name: "Apple", value: 4500 },
      ]
    },
    {
      name: "Finance",
      children: [
        { name: "JPMorgan", value: 4200 },
        { name: "Goldman", value: 3800 },
        { name: "Visa", value: 3200 },
        { name: "Stripe", value: 2800 },
      ]
    },
    {
      name: "Retail",
      children: [
        { name: "Amazon", value: 5500 },
        { name: "Walmart", value: 3200 },
      ]
    }
  ]
};

interface TreeNode {
  name: string;
  value?: number;
  children?: TreeNode[];
}

interface LayoutNode {
  data: TreeNode;
  value: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  depth: number;
  parent?: LayoutNode;
  children?: LayoutNode[];
}

// Sum values recursively
function sumValues(node: TreeNode): number {
  if (node.value !== undefined) return node.value;
  if (node.children) {
    return node.children.reduce((sum, child) => sum + sumValues(child), 0);
  }
  return 0;
}

// Squarify treemap algorithm (simplified)
function squarify(
  nodes: LayoutNode[],
  x: number,
  y: number,
  width: number,
  height: number
) {
  if (nodes.length === 0) return;

  const total = nodes.reduce((sum, n) => sum + n.value, 0);
  let currentX = x;
  let currentY = y;

  // Simple slice-and-dice for now (alternates horizontal/vertical)
  const isHorizontal = width > height;

  nodes.forEach(node => {
    const ratio = node.value / total;
    
    if (isHorizontal) {
      const nodeWidth = width * ratio;
      node.x0 = currentX;
      node.y0 = y;
      node.x1 = currentX + nodeWidth;
      node.y1 = y + height;
      currentX += nodeWidth;
    } else {
      const nodeHeight = height * ratio;
      node.x0 = x;
      node.y0 = currentY;
      node.x1 = x + width;
      node.y1 = currentY + nodeHeight;
      currentY += nodeHeight;
    }

    // Recursively layout children
    if (node.children && node.children.length > 0) {
      const padding = 2;
      squarify(
        node.children,
        node.x0 + padding,
        node.y0 + padding + 18, // Leave space for label
        node.x1 - node.x0 - padding * 2,
        node.y1 - node.y0 - padding * 2 - 18
      );
    }
  });
}

// Build layout tree
function buildLayoutTree(node: TreeNode, depth: number = 0, parent?: LayoutNode): LayoutNode {
  const layoutNode: LayoutNode = {
    data: node,
    value: sumValues(node),
    x0: 0, y0: 0, x1: 0, y1: 0,
    depth,
    parent
  };

  if (node.children) {
    layoutNode.children = node.children.map(child => 
      buildLayoutTree(child, depth + 1, layoutNode)
    );
  }

  return layoutNode;
}

// Get all nodes flat
function flattenTree(node: LayoutNode): LayoutNode[] {
  const result = [node];
  if (node.children) {
    node.children.forEach(child => {
      result.push(...flattenTree(child));
    });
  }
  return result;
}

const treemapColors = [
  '#c8c8c8',  // Healthcare - light gray
  '#a8a8a8',  // Technology - medium gray
  '#888888',  // Finance - darker gray
  '#686868',  // Retail - dark gray
  '#585858',
  '#484848',
];

interface ZoomableTreemapProps {
  data?: TreeNode;
  width?: number;
  height?: number;
  title?: string;
}

const ZoomableTreemap: React.FC<ZoomableTreemapProps> = ({
  data = defaultData,
  width = 700,
  height = 450,
  title = "Zoomable Treemap"
}) => {
  const [focus, setFocus] = useState<LayoutNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Build and layout tree
  const root = useMemo(() => {
    const tree = buildLayoutTree(data);
    squarify([tree], 0, 0, width, height);
    return tree;
  }, [data, width, height]);

  // Get visible nodes based on focus
  const visibleNodes = useMemo(() => {
    const currentFocus = focus || root;
    const allNodes = flattenTree(currentFocus);
    
    // Re-layout based on focus
    if (focus) {
      squarify([focus], 0, 0, width, height);
    }
    
    return allNodes.filter(n => 
      n.x1 - n.x0 > 1 && n.y1 - n.y0 > 1
    );
  }, [focus, root, width, height]);

  const getNodeColor = (node: LayoutNode): string => {
    // Find root-level parent
    let current = node;
    while (current.parent && current.parent.parent) {
      current = current.parent;
    }
    
    const rootChildren = root.children || [];
    const index = rootChildren.indexOf(current);
    return treemapColors[index % treemapColors.length];
  };

  const handleClick = (node: LayoutNode) => {
    if (node.children && node.children.length > 0) {
      if (focus === node) {
        setFocus(node.parent || null);
      } else {
        setFocus(node);
      }
    }
  };

  const formatNumber = (n: number) => n.toLocaleString();

  // Get breadcrumb path
  const getBreadcrumb = (): LayoutNode[] => {
    if (!focus) return [root];
    const path: LayoutNode[] = [];
    let current: LayoutNode | undefined = focus;
    while (current) {
      path.unshift(current);
      current = current.parent;
    }
    return path;
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '8px', fontSize: '12px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {getBreadcrumb().map((node, i, arr) => (
          <React.Fragment key={i}>
            <span
              onClick={() => setFocus(node === root ? null : node)}
              style={{
                cursor: 'pointer',
                color: i === arr.length - 1 ? chartColors.teal : chartColors.charcoalLight,
                fontWeight: i === arr.length - 1 ? 600 : 400,
              }}
            >
              {node.data.name}
            </span>
            {i < arr.length - 1 && <span style={{ color: chartColors.gray }}>/</span>}
          </React.Fragment>
        ))}
      </div>

      {/* SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: chartColors.background, borderRadius: '8px' }}
      >
        {visibleNodes.map((node, i) => {
          const nodeWidth = node.x1 - node.x0;
          const nodeHeight = node.y1 - node.y0;
          const isHovered = hoveredNode === node.data.name;
          const hasChildren = node.children && node.children.length > 0;
          const color = getNodeColor(node);

          // Only show leaf nodes or current depth + 1
          const shouldShowFill = !hasChildren || node.depth <= (focus?.depth || 0) + 1;

          return (
            <g
              key={i}
              onClick={() => handleClick(node)}
              onMouseEnter={() => setHoveredNode(node.data.name)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: hasChildren ? 'pointer' : 'default' }}
            >
              <rect
                x={node.x0}
                y={node.y0}
                width={nodeWidth}
                height={nodeHeight}
                fill={shouldShowFill ? color : 'transparent'}
                fillOpacity={hasChildren ? 0.4 : (isHovered ? 1 : 0.85)}
                stroke={isHovered ? '#333' : color}
                strokeWidth={isHovered ? 2 : 1}
                rx={2}
              >
                <title>{`${node.data.name}: ${formatNumber(node.value)}`}</title>
              </rect>

              {/* Label */}
              {nodeWidth > 40 && nodeHeight > 20 && (
                <text
                  x={node.x0 + 4}
                  y={node.y0 + 14}
                  fontSize={hasChildren ? 13 : 12}
                  fontWeight={hasChildren ? 600 : 500}
                  fill="#222"
                  fontFamily="system-ui, sans-serif"
                  style={{ pointerEvents: 'none' }}
                >
                  {node.data.name}
                </text>
              )}

              {/* Value for leaf nodes */}
              {!hasChildren && nodeWidth > 50 && nodeHeight > 35 && (
                <text
                  x={node.x0 + 4}
                  y={node.y0 + 28}
                  fontSize={11}
                  fill="#333"
                  fontFamily="system-ui, sans-serif"
                  style={{ pointerEvents: 'none' }}
                >
                  {formatNumber(node.value)}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{ marginTop: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '11px' }}>
        {(root.children || []).map((child, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: treemapColors[i % treemapColors.length], 
              borderRadius: '2px' 
            }} />
            <span style={{ color: chartColors.charcoalLight }}>{child.data.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZoomableTreemap;
