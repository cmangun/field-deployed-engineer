"use client";
import React, { useState, useMemo, useCallback } from 'react';
import { chartColors } from './colors';

// Sample hierarchical data - can be replaced with props
const defaultData = {
  name: "Healthcare Services",
  children: [
    {
      name: "Long Term Care",
      children: [
        {
          name: "Institutional",
          children: [
            { name: "SNF", value: 4500 },
            { name: "ICF", value: 3200 },
            { name: "RCF", value: 2800 },
            { name: "Nursing Home", value: 5100 },
            { name: "Rehab Center", value: 2400 },
          ]
        },
        {
          name: "Non-Institutional",
          children: [
            { name: "Adult Day Care", value: 1800 },
            { name: "Hospice", value: 2200 },
            { name: "Home Health", value: 3800 },
          ]
        }
      ]
    },
    {
      name: "Outpatient Care",
      children: [
        {
          name: "Traditional",
          children: [
            { name: "Medical Practice", value: 8500 },
            { name: "Emergency Room", value: 6200 },
            { name: "Hospital Ambulatory", value: 4800 },
          ]
        },
        {
          name: "Non-Traditional",
          children: [
            { name: "Urgent Care", value: 3500 },
            { name: "Surgery Center", value: 4200 },
            { name: "Imaging Center", value: 2900 },
            { name: "Lab Services", value: 3100 },
          ]
        }
      ]
    },
    {
      name: "Hospitals",
      children: [
        {
          name: "By Type",
          children: [
            { name: "General Acute", value: 12000 },
            { name: "Specialty", value: 5500 },
            { name: "Psychiatric", value: 2800 },
            { name: "Rehabilitation", value: 2200 },
          ]
        },
        {
          name: "By Ownership",
          children: [
            { name: "Government", value: 4500 },
            { name: "Non-Profit", value: 8200 },
            { name: "For-Profit", value: 6800 },
          ]
        }
      ]
    }
  ]
};

// Color palette for icicle segments
const icicleColors = [
  chartColors.primary, // teal
  chartColors.cyan, // teal light
  chartColors.dark, // charcoal
  chartColors.muted, // charcoal light
  chartColors.teal, // orange
  chartColors.navy, // indigo
  chartColors.navy, // purple
  chartColors.cyan, // pink
];

interface DataNode {
  name: string;
  value?: number;
  children?: DataNode[];
}

interface HierarchyNode {
  data: DataNode;
  value: number;
  depth: number;
  height: number;
  parent: HierarchyNode | null;
  children?: HierarchyNode[];
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  target?: { x0: number; x1: number; y0: number; y1: number };
}

// Build hierarchy from data
function buildHierarchy(data: DataNode, parent: HierarchyNode | null = null, depth: number = 0): HierarchyNode {
  const node: HierarchyNode = {
    data,
    value: 0,
    depth,
    height: 0,
    parent,
    x0: 0,
    x1: 0,
    y0: 0,
    y1: 0,
  };

  if (data.children && data.children.length > 0) {
    node.children = data.children.map(child => buildHierarchy(child, node, depth + 1));
    node.value = node.children.reduce((sum, child) => sum + child.value, 0);
    node.height = 1 + Math.max(...node.children.map(c => c.height));
  } else {
    node.value = data.value || 0;
    node.height = 0;
  }

  return node;
}

// Compute partition layout
function partition(root: HierarchyNode, width: number, height: number): HierarchyNode {
  const totalDepth = root.height + 1;
  const dx = width / totalDepth;

  function layoutNode(node: HierarchyNode, x0: number, x1: number, y0: number) {
    node.x0 = x0;
    node.x1 = x1;
    node.y0 = y0;
    node.y1 = y0 + dx;

    if (node.children && node.children.length > 0) {
      let currentX = x0;
      const scale = (x1 - x0) / node.value;
      
      node.children.forEach(child => {
        const childWidth = child.value * scale;
        layoutNode(child, currentX, currentX + childWidth, node.y1);
        currentX += childWidth;
      });
    }
  }

  layoutNode(root, 0, height, 0);
  return root;
}

// Get all descendants
function getDescendants(node: HierarchyNode): HierarchyNode[] {
  const result: HierarchyNode[] = [node];
  if (node.children) {
    node.children.forEach(child => {
      result.push(...getDescendants(child));
    });
  }
  return result;
}

// Get ancestors path
function getAncestors(node: HierarchyNode): HierarchyNode[] {
  const result: HierarchyNode[] = [];
  let current: HierarchyNode | null = node;
  while (current) {
    result.unshift(current);
    current = current.parent;
  }
  return result;
}

// Get root color for a node
function getRootColor(node: HierarchyNode): string {
  let current = node;
  while (current.depth > 1 && current.parent) {
    current = current.parent;
  }
  if (current.depth === 0) return chartColors.light;
  
  // Find index among siblings at depth 1
  const root = current.parent;
  if (root && root.children) {
    const index = root.children.indexOf(current);
    return icicleColors[index % icicleColors.length];
  }
  return icicleColors[0];
}

interface ZoomableIcicleProps {
  data?: DataNode;
  width?: number;
  height?: number;
  title?: string;
}

const ZoomableIcicle: React.FC<ZoomableIcicleProps> = ({
  data = defaultData,
  width = 928,
  height = 600,
  title = "Zoomable Icicle Chart"
}) => {
  const [focus, setFocus] = useState<HierarchyNode | null>(null);
  const [transition, setTransition] = useState(false);

  // Build and layout hierarchy
  const root = useMemo(() => {
    const hierarchy = buildHierarchy(data);
    return partition(hierarchy, width, height);
  }, [data, width, height]);

  // Initialize focus to root
  const currentFocus = focus || root;

  // Get all nodes
  const nodes = useMemo(() => getDescendants(root), [root]);

  // Calculate target positions based on focus
  const getTargetPosition = useCallback((node: HierarchyNode) => {
    const p = currentFocus;
    return {
      x0: (node.x0 - p.x0) / (p.x1 - p.x0) * height,
      x1: (node.x1 - p.x0) / (p.x1 - p.x0) * height,
      y0: node.y0 - p.y0,
      y1: node.y1 - p.y0,
    };
  }, [currentFocus, height]);

  // Handle click
  const handleClick = useCallback((node: HierarchyNode) => {
    setTransition(true);
    if (focus === node) {
      setFocus(node.parent);
    } else {
      setFocus(node);
    }
    setTimeout(() => setTransition(false), 750);
  }, [focus]);

  // Format number
  const formatNumber = (n: number) => n.toLocaleString();

  // Check if label is visible
  const labelVisible = (target: { x0: number; x1: number; y0: number; y1: number }) => {
    return target.y1 <= width && target.y0 >= 0 && target.x1 - target.x0 > 16;
  };

  // Calculate rect height
  const rectHeight = (target: { x0: number; x1: number }) => {
    const h = target.x1 - target.x0;
    return Math.max(0, h - Math.min(1, h / 2));
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Breadcrumb */}
      {focus && focus !== root && (
        <div style={{ 
          marginBottom: '12px', 
          fontSize: '12px', 
          color: chartColors.charcoalLight,
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          {getAncestors(focus).map((ancestor, i, arr) => (
            <React.Fragment key={i}>
              <span 
                onClick={() => setFocus(ancestor === root ? null : ancestor)}
                style={{ 
                  cursor: 'pointer',
                  color: i === arr.length - 1 ? chartColors.teal : chartColors.charcoalLight,
                  fontWeight: i === arr.length - 1 ? 600 : 400,
                }}
              >
                {ancestor.data.name}
              </span>
              {i < arr.length - 1 && <span style={{ color: chartColors.gray }}>/</span>}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* SVG Chart */}
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
        }}
      >
        {nodes.map((node, i) => {
          const target = getTargetPosition(node);
          const color = getRootColor(node);
          const isVisible = target.y1 > 0 && target.y0 < width;
          
          if (!isVisible) return null;

          return (
            <g
              key={i}
              transform={`translate(${target.y0}, ${target.x0})`}
              style={{
                transition: transition ? 'transform 0.75s ease-in-out' : 'none',
              }}
            >
              <rect
                width={Math.max(0, target.y1 - target.y0 - 1)}
                height={rectHeight(target)}
                fill={node.depth === 0 ? chartColors.light : color}
                fillOpacity={0.7 + (node.depth * 0.05)}
                stroke="white"
                strokeWidth={0.5}
                style={{ 
                  cursor: 'pointer',
                  transition: transition ? 'all 0.75s ease-in-out' : 'none',
                }}
                onClick={() => handleClick(node)}
              >
                <title>{`${getAncestors(node).map(n => n.data.name).join(' / ')}\nValue: ${formatNumber(node.value)}`}</title>
              </rect>
              
              {labelVisible(target) && (
                <text
                  x={4}
                  y={13}
                  fontSize={10}
                  fill={node.depth === 0 ? chartColors.charcoal : 'white'}
                  style={{ 
                    pointerEvents: 'none',
                    userSelect: 'none',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    transition: transition ? 'opacity 0.75s ease-in-out' : 'none',
                  }}
                >
                  <tspan>{node.data.name}</tspan>
                  <tspan fillOpacity={0.7}> {formatNumber(node.value)}</tspan>
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{ 
        marginTop: '16px', 
        display: 'flex', 
        gap: '16px', 
        flexWrap: 'wrap',
        fontSize: '11px'
      }}>
        {root.children?.map((child, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: icicleColors[i % icicleColors.length],
              borderRadius: '2px'
            }} />
            <span style={{ color: chartColors.charcoalLight }}>{child.data.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZoomableIcicle;
