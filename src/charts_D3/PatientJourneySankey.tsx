"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Patient Journey Sankey data
const defaultData = {
  drugName: 'NEXAGEN™',
  indication: 'NSCLC',
  totalPatients: 10000,
  stages: [
    { id: 'diagnosis', name: 'Diagnosis', x: 0 },
    { id: 'treatment', name: 'Treatment Selection', x: 1 },
    { id: 'therapy', name: 'Therapy', x: 2 },
    { id: 'response', name: 'Response', x: 3 },
    { id: 'outcome', name: 'Outcome (12mo)', x: 4 },
  ],
  nodes: [
    // Diagnosis
    { id: 'stage-iiib', name: 'Stage IIIB', stage: 'diagnosis', value: 3500, color: chartColors.navy },
    { id: 'stage-iv', name: 'Stage IV', stage: 'diagnosis', value: 6500, color: chartColors.navy },
    // Treatment Selection
    { id: 'first-line', name: '1L Therapy', stage: 'treatment', value: 7200, color: chartColors.primary },
    { id: 'second-line', name: '2L+ Therapy', stage: 'treatment', value: 2400, color: chartColors.cyan },
    { id: 'palliative', name: 'Palliative Only', stage: 'treatment', value: 400, color: chartColors.secondary },
    // Therapy
    { id: 'nexagen-mono', name: 'NEXAGEN Mono', stage: 'therapy', value: 2800, color: chartColors.primary },
    { id: 'nexagen-combo', name: 'NEXAGEN + Chemo', stage: 'therapy', value: 3200, color: chartColors.primary },
    { id: 'competitor-a', name: 'Competitor A', stage: 'therapy', value: 2100, color: chartColors.secondary },
    { id: 'competitor-b', name: 'Competitor B', stage: 'therapy', value: 1500, color: chartColors.secondary },
    { id: 'palliative-care', name: 'Palliative Care', stage: 'therapy', value: 400, color: chartColors.secondary },
    // Response
    { id: 'complete-response', name: 'Complete Response', stage: 'response', value: 1200, color: chartColors.primary },
    { id: 'partial-response', name: 'Partial Response', stage: 'response', value: 4100, color: chartColors.cyan },
    { id: 'stable-disease', name: 'Stable Disease', stage: 'response', value: 2800, color: chartColors.secondary },
    { id: 'progression', name: 'Progression', stage: 'response', value: 1500, color: chartColors.dark },
    { id: 'discontinued', name: 'Discontinued', stage: 'response', value: 400, color: chartColors.secondary },
    // Outcome
    { id: 'remission', name: 'Remission', stage: 'outcome', value: 3800, color: chartColors.primary },
    { id: 'maintenance', name: 'On Maintenance', stage: 'outcome', value: 2900, color: chartColors.primary },
    { id: 'switched', name: 'Switched Therapy', stage: 'outcome', value: 1800, color: chartColors.secondary },
    { id: 'deceased', name: 'Deceased', stage: 'outcome', value: 1500, color: chartColors.muted },
  ],
  links: [
    // Diagnosis → Treatment
    { source: 'stage-iiib', target: 'first-line', value: 2800 },
    { source: 'stage-iiib', target: 'second-line', value: 600 },
    { source: 'stage-iiib', target: 'palliative', value: 100 },
    { source: 'stage-iv', target: 'first-line', value: 4400 },
    { source: 'stage-iv', target: 'second-line', value: 1800 },
    { source: 'stage-iv', target: 'palliative', value: 300 },
    // Treatment → Therapy
    { source: 'first-line', target: 'nexagen-mono', value: 2200 },
    { source: 'first-line', target: 'nexagen-combo', value: 2800 },
    { source: 'first-line', target: 'competitor-a', value: 1400 },
    { source: 'first-line', target: 'competitor-b', value: 800 },
    { source: 'second-line', target: 'nexagen-mono', value: 600 },
    { source: 'second-line', target: 'nexagen-combo', value: 400 },
    { source: 'second-line', target: 'competitor-a', value: 700 },
    { source: 'second-line', target: 'competitor-b', value: 700 },
    { source: 'palliative', target: 'palliative-care', value: 400 },
    // Therapy → Response
    { source: 'nexagen-mono', target: 'complete-response', value: 560 },
    { source: 'nexagen-mono', target: 'partial-response', value: 1260 },
    { source: 'nexagen-mono', target: 'stable-disease', value: 700 },
    { source: 'nexagen-mono', target: 'progression', value: 280 },
    { source: 'nexagen-combo', target: 'complete-response', value: 640 },
    { source: 'nexagen-combo', target: 'partial-response', value: 1600 },
    { source: 'nexagen-combo', target: 'stable-disease', value: 640 },
    { source: 'nexagen-combo', target: 'progression', value: 320 },
    { source: 'competitor-a', target: 'partial-response', value: 840 },
    { source: 'competitor-a', target: 'stable-disease', value: 840 },
    { source: 'competitor-a', target: 'progression', value: 420 },
    { source: 'competitor-b', target: 'partial-response', value: 400 },
    { source: 'competitor-b', target: 'stable-disease', value: 620 },
    { source: 'competitor-b', target: 'progression', value: 480 },
    { source: 'palliative-care', target: 'discontinued', value: 400 },
    // Response → Outcome
    { source: 'complete-response', target: 'remission', value: 1080 },
    { source: 'complete-response', target: 'maintenance', value: 120 },
    { source: 'partial-response', target: 'remission', value: 1640 },
    { source: 'partial-response', target: 'maintenance', value: 2050 },
    { source: 'partial-response', target: 'switched', value: 410 },
    { source: 'stable-disease', target: 'maintenance', value: 730 },
    { source: 'stable-disease', target: 'switched', value: 1120 },
    { source: 'stable-disease', target: 'deceased', value: 950 },
    { source: 'progression', target: 'switched', value: 270 },
    { source: 'progression', target: 'deceased', value: 550 },
    { source: 'remission', target: 'remission', value: 1080 },
    { source: 'discontinued', target: 'deceased', value: 400 },
  ],
  highlights: {
    nexagenShare: 60,
    responseRate: 78,
    survivalRate: 85,
  }
};

interface PatientJourneySankeyProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const PatientJourneySankey: React.FC<PatientJourneySankeyProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Patient Journey Flow"
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const margin = { top: 60, right: 30, bottom: 50, left: 30 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Calculate node positions
  const stageWidth = innerWidth / (data.stages.length);
  const nodeWidth = 24;
  const nodePadding = 12;

  // Group nodes by stage and calculate y positions
  const nodesByStage = data.stages.map(stage => {
    const stageNodes = data.nodes.filter(n => n.stage === stage.id);
    const totalValue = stageNodes.reduce((sum, n) => sum + n.value, 0);
    let currentY = 0;
    
    return stageNodes.map(node => {
      const nodeHeight = (node.value / data.totalPatients) * (innerHeight - nodePadding * (stageNodes.length - 1));
      const y = currentY;
      currentY += nodeHeight + nodePadding;
      return {
        ...node,
        x: stage.x * stageWidth + (stageWidth - nodeWidth) / 2,
        y,
        height: nodeHeight,
        width: nodeWidth,
      };
    });
  }).flat();

  // Create node lookup
  const nodeLookup = Object.fromEntries(nodesByStage.map(n => [n.id, n]));

  // Generate link paths
  const generateLinkPath = (link: typeof data.links[0]) => {
    const source = nodeLookup[link.source];
    const target = nodeLookup[link.target];
    if (!source || !target) return '';

    const sourceX = source.x + source.width;
    const targetX = target.x;
    const sourceY = source.y + source.height / 2;
    const targetY = target.y + target.height / 2;
    
    const curvature = 0.5;
    const xi = (targetX - sourceX) * curvature;
    
    return `M${sourceX},${sourceY} C${sourceX + xi},${sourceY} ${targetX - xi},${targetY} ${targetX},${targetY}`;
  };

  // Get link thickness
  const getLinkThickness = (value: number) => {
    return Math.max(2, (value / data.totalPatients) * innerHeight * 0.8);
  };

  return (
    <div style={{ width: '100%' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: chartColors.background, borderRadius: '12px' }}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Stage headers */}
          {data.stages.map((stage, i) => (
            <g key={stage.id}>
              <text
                x={i * stageWidth + stageWidth / 2}
                y={-30}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill={chartColors.charcoal}
              >
                {stage.name}
              </text>
              <line
                x1={i * stageWidth + stageWidth / 2}
                y1={-18}
                x2={i * stageWidth + stageWidth / 2}
                y2={-8}
                stroke={chartColors.secondary}
                strokeWidth={1}
              />
            </g>
          ))}

          {/* Links */}
          {data.links.map((link, i) => {
            const source = nodeLookup[link.source];
            const target = nodeLookup[link.target];
            if (!source || !target || source.id === target.id) return null;
            
            const isHighlighted = hoveredNode === link.source || hoveredNode === link.target;
            const isNexagen = link.source.includes('nexagen') || link.target.includes('nexagen');
            
            return (
              <path
                key={i}
                d={generateLinkPath(link)}
                fill="none"
                stroke={isNexagen ? chartColors.primary : chartColors.secondary}
                strokeWidth={getLinkThickness(link.value)}
                strokeOpacity={isHighlighted ? 0.8 : (hoveredNode ? 0.1 : 0.3)}
                style={{ transition: 'all 0.2s' }}
              />
            );
          })}

          {/* Nodes */}
          {nodesByStage.map((node) => {
            const isHovered = hoveredNode === node.id;
            const isNexagen = node.id.includes('nexagen');
            
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.width}
                  height={node.height}
                  rx={4}
                  fill={node.color}
                  stroke={isHovered ? chartColors.charcoal : 'none'}
                  strokeWidth={2}
                />
                
                {/* Node label */}
                {node.height > 25 && (
                  <text
                    x={node.x + node.width + 8}
                    y={node.y + node.height / 2 + 4}
                    fontSize={9}
                    fontWeight={isNexagen ? 600 : 400}
                    fill={chartColors.charcoal}
                  >
                    {node.name}
                  </text>
                )}
                
                {/* Value tooltip on hover */}
                {isHovered && (
                  <g>
                    <rect
                      x={node.x - 35}
                      y={node.y + node.height / 2 - 12}
                      width={30}
                      height={20}
                      rx={4}
                      fill={chartColors.charcoal}
                    />
                    <text
                      x={node.x - 20}
                      y={node.y + node.height / 2 + 2}
                      textAnchor="middle"
                      fontSize={9}
                      fontWeight={600}
                      fill="white"
                    >
                      {(node.value / 1000).toFixed(1)}K
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Flow arrows between stages */}
          {data.stages.slice(0, -1).map((stage, i) => (
            <g key={i}>
              <polygon
                points={`${(i + 1) * stageWidth - 15},${innerHeight / 2 - 6} ${(i + 1) * stageWidth - 5},${innerHeight / 2} ${(i + 1) * stageWidth - 15},${innerHeight / 2 + 6}`}
                fill={chartColors.secondary}
              />
            </g>
          ))}
        </g>
      </svg>

      {/* Legend */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        gap: '16px',
        fontSize: '10px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: chartColors.primary }} />
          <span style={{ color: chartColors.charcoalLight }}>NEXAGEN</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: chartColors.secondary }} />
          <span style={{ color: chartColors.charcoalLight }}>Competitors</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: chartColors.navy }} />
          <span style={{ color: chartColors.charcoalLight }}>Diagnosis Stage</span>
        </div>
        <div style={{ marginLeft: 'auto', color: chartColors.gray }}>
          Hover node to highlight flow
        </div>
      </div>
    </div>
  );
};

export default PatientJourneySankey;
