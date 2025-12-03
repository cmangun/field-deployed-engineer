"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// RAG Pipeline - Pfizer-specific default data
const defaultData = {
  sections: [
    {
      id: 'ingestion',
      name: 'SharePoint Ingestion',
      phase: 'Phase 1',
      components: [
        { id: 'docs', name: 'Brand Assets', icon: '📄', desc: 'Templates, approved content' },
        { id: 'loader', name: 'Graph API Loader', icon: '⟳', desc: 'Microsoft Graph' },
        { id: 'chunker', name: 'Section Chunker', icon: '▤', desc: 'Preserves claims' },
      ]
    },
    {
      id: 'embedding',
      name: 'Azure Embeddings',
      phase: 'Phase 2',
      components: [
        { id: 'embedder', name: 'text-embedding-3', icon: '◈', desc: 'Azure OpenAI' },
        { id: 'vectordb', name: 'Cognitive Search', icon: '⬡', desc: 'Azure AI Search' },
        { id: 'metadata', name: 'Brand Filters', icon: '☰', desc: 'Region, Therapeutic' },
      ]
    },
    {
      id: 'retrieval',
      name: 'MLR-Aware Retrieval',
      phase: 'Phase 3',
      components: [
        { id: 'query-embed', name: 'Query + Context', icon: '◇', desc: 'User intent' },
        { id: 'search', name: 'Hybrid Search', icon: '⟐', desc: 'Semantic + Keyword' },
        { id: 'rerank', name: 'Compliance Filter', icon: '↕', desc: 'Approved only' },
      ]
    },
    {
      id: 'generation',
      name: 'Guarded Generation',
      phase: 'Phase 4',
      components: [
        { id: 'context', name: 'Prompt Template', icon: '⊞', desc: 'Brand voice' },
        { id: 'llm', name: 'GPT-4 Turbo', icon: '★', desc: 'Azure OpenAI' },
        { id: 'response', name: 'Draft + Citations', icon: '◉', desc: 'Traceable output' },
      ]
    },
  ],
  metrics: [
    { name: 'Relevance', value: 0.91, desc: 'Retrieved doc relevance' },
    { name: 'Faithfulness', value: 0.96, desc: 'Citations verified' },
    { name: 'Latency', value: '280ms', desc: 'p95 response time' },
    { name: 'Recall@5', value: 0.82, desc: 'Relevant in top 5' },
  ]
};

interface RAGPipelineProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const RAGPipeline: React.FC<RAGPipelineProps> = ({
  data = defaultData,
  width = 1100,
  height = 700,
  title = "RAG Pipeline Architecture"
}) => {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  // Layout constants
  const padding = { x: 60, y: 50 };
  const headerHeight = 60;
  const headerGap = 50; // Space between headers and first component row
  const userQueryHeight = 40;
  
  const sectionCount = data.sections.length;
  const sectionGap = 48;
  const innerWidth = width - padding.x * 2;
  const sectionWidth = (innerWidth - (sectionCount - 1) * sectionGap) / sectionCount;
  const componentWidth = sectionWidth - 16;
  const componentHeight = 85;
  
  // Calculate component gap to fill available vertical space
  const numRows = 3;
  const availableHeight = height - padding.y * 2 - headerHeight - headerGap - userQueryHeight;
  const totalComponentHeight = numRows * componentHeight;
  const componentGap = Math.max(40, (availableHeight - totalComponentHeight) / (numRows - 1));

  // Vertical offset to start content area (after headers)
  const contentStartY = padding.y + headerHeight + headerGap + userQueryHeight;

  // Build component position map
  const componentPositions: Record<string, { x: number; y: number; section: number; row: number }> = {};
  data.sections.forEach((section, sIdx) => {
    const sectionX = padding.x + sIdx * (sectionWidth + sectionGap);
    section.components.forEach((comp, cIdx) => {
      componentPositions[comp.id] = {
        x: sectionX + (sectionWidth - componentWidth) / 2,
        y: contentStartY + cIdx * (componentHeight + componentGap),
        section: sIdx,
        row: cIdx
      };
    });
  });

  // Define explicit flows for clarity
  const flows = [
    // Phase 1: Vertical ingestion flow
    { from: 'docs', to: 'loader', type: 'vertical' },
    { from: 'loader', to: 'chunker', type: 'vertical' },
    
    // Phase 1 → Phase 2: Cross-phase
    { from: 'chunker', to: 'embedder', type: 'horizontal' },
    
    // Phase 2: Vertical embedding flow
    { from: 'embedder', to: 'vectordb', type: 'vertical' },
    { from: 'embedder', to: 'metadata', type: 'vertical-split' },
    
    // Phase 2 → Phase 3: Cross-phase feeds into search
    { from: 'vectordb', to: 'search', type: 'horizontal', style: 'dashed' },
    { from: 'metadata', to: 'search', type: 'horizontal', style: 'dashed' },
    
    // Phase 3: Query flow
    { from: 'query-embed', to: 'search', type: 'vertical' },
    { from: 'search', to: 'rerank', type: 'vertical' },
    
    // Phase 3 → Phase 4: Cross-phase
    { from: 'rerank', to: 'context', type: 'horizontal' },
    
    // Phase 4: Generation flow
    { from: 'context', to: 'llm', type: 'vertical' },
    { from: 'llm', to: 'response', type: 'vertical' },
  ];

  // Generate path for a flow
  const generatePath = (flow: typeof flows[0]): string => {
    const from = componentPositions[flow.from];
    const to = componentPositions[flow.to];
    if (!from || !to) return '';

    const fromCenterX = from.x + componentWidth / 2;
    const fromBottom = from.y + componentHeight;
    const fromRight = from.x + componentWidth;
    const fromCenterY = from.y + componentHeight / 2;
    
    const toCenterX = to.x + componentWidth / 2;
    const toTop = to.y;
    const toLeft = to.x;
    const toCenterY = to.y + componentHeight / 2;

    if (flow.type === 'vertical') {
      return `M ${fromCenterX} ${fromBottom} L ${toCenterX} ${toTop}`;
    }
    
    if (flow.type === 'vertical-split') {
      const midY = fromBottom + (toTop - fromBottom) / 2;
      return `M ${fromCenterX} ${fromBottom} L ${fromCenterX} ${midY} L ${toCenterX} ${midY} L ${toCenterX} ${toTop}`;
    }
    
    if (flow.type === 'horizontal') {
      const gapMid = fromRight + sectionGap / 2;
      if (Math.abs(fromCenterY - toCenterY) < 5) {
        return `M ${fromRight} ${fromCenterY} L ${toLeft} ${toCenterY}`;
      } else {
        return `M ${fromRight} ${fromCenterY} C ${gapMid} ${fromCenterY}, ${gapMid} ${toCenterY}, ${toLeft} ${toCenterY}`;
      }
    }

    return '';
  };

  // Header Y position
  const headerY = padding.y;

  return (
    <div style={{ width: '100%' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        style={{ 
          maxWidth: '100%', 
          height: 'auto', 
          backgroundColor: chartColors.background, 
          borderRadius: '12px',
          display: 'block'
        }}
        onMouseLeave={() => setHoveredComponent(null)}
      >
        <defs>
          <marker id="rag-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={chartColors.charcoal} />
          </marker>
        </defs>

        {/* Section headers */}
        {data.sections.map((section, i) => {
          const sectionX = padding.x + i * (sectionWidth + sectionGap);
          return (
            <g key={section.id}>
              <rect
                x={sectionX}
                y={headerY}
                width={sectionWidth}
                height={headerHeight}
                rx={12}
                fill={chartColors.light}
                stroke={chartColors.gray}
                strokeWidth={1}
              />
              <text
                x={sectionX + sectionWidth / 2}
                y={headerY + 26}
                textAnchor="middle"
                fontSize={14}
                fontWeight={600}
                fill={chartColors.charcoal}
              >
                {section.name}
              </text>
              <text
                x={sectionX + sectionWidth / 2}
                y={headerY + 46}
                textAnchor="middle"
                fontSize={12}
                fill={chartColors.gray}
              >
                {section.phase}
              </text>
            </g>
          );
        })}

        {/* User Query indicator above Phase 3 */}
        {(() => {
          const queryPos = componentPositions['query-embed'];
          if (!queryPos) return null;
          const badgeX = queryPos.x + componentWidth / 2;
          const badgeY = headerY + headerHeight + 20;
          return (
            <g>
              <rect
                x={badgeX - 60}
                y={badgeY}
                width={120}
                height={34}
                rx={17}
                fill={chartColors.charcoal}
              />
              <text
                x={badgeX}
                y={badgeY + 22}
                textAnchor="middle"
                fontSize={13}
                fontWeight={600}
                fill="white"
              >
                User Query
              </text>
              <line
                x1={badgeX}
                y1={badgeY + 34}
                x2={badgeX}
                y2={queryPos.y - 8}
                stroke={chartColors.charcoal}
                strokeWidth={1.5}
                strokeDasharray="5,4"
                markerEnd="url(#rag-arrow)"
              />
            </g>
          );
        })()}

        {/* Connection arrows */}
        {flows.map((flow, i) => {
          const isDashed = flow.style === 'dashed';
          return (
            <path
              key={i}
              d={generatePath(flow)}
              fill="none"
              stroke={chartColors.charcoal}
              strokeWidth={1.5}
              strokeOpacity={isDashed ? 0.5 : 0.7}
              strokeDasharray={isDashed ? '6,4' : 'none'}
              markerEnd="url(#rag-arrow)"
            />
          );
        })}

        {/* Component boxes */}
        {data.sections.map((section) => (
          section.components.map((comp) => {
            const pos = componentPositions[comp.id];
            const isHovered = hoveredComponent === comp.id;

            return (
              <g
                key={comp.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onMouseEnter={() => setHoveredComponent(comp.id)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  width={componentWidth}
                  height={componentHeight}
                  rx={12}
                  fill="white"
                  stroke={isHovered ? chartColors.charcoal : chartColors.light}
                  strokeWidth={isHovered ? 2 : 1}
                  style={{ 
                    transition: 'all 0.2s',
                    filter: isHovered ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))' : 'none'
                  }}
                />
                <text x={20} y={38} fontSize={24}>{comp.icon}</text>
                <text
                  x={56}
                  y={36}
                  fontSize={15}
                  fontWeight={600}
                  fill={chartColors.charcoal}
                >
                  {comp.name}
                </text>
                <text
                  x={56}
                  y={58}
                  fontSize={13}
                  fill={chartColors.gray}
                >
                  {comp.desc}
                </text>
              </g>
            );
          })
        ))}
      </svg>

      {/* Metrics row */}
      <div style={{ 
        marginTop: '24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px'
      }}>
        {data.metrics.map((metric, i) => (
          <div
            key={i}
            style={{
              padding: '18px 20px',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: `1px solid ${chartColors.light}`
            }}
          >
            <div style={{ fontSize: '12px', color: chartColors.gray, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {metric.name}
            </div>
            <div style={{ fontSize: '26px', fontWeight: 700, color: chartColors.charcoal }}>
              {typeof metric.value === 'number' ? `${(metric.value * 100).toFixed(0)}%` : metric.value}
            </div>
            <div style={{ fontSize: '11px', color: chartColors.gray, marginTop: '4px' }}>
              {metric.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ 
        marginTop: '20px', 
        display: 'flex', 
        gap: '32px',
        fontSize: '12px',
        justifyContent: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="28" height="14">
            <line x1="0" y1="7" x2="28" y2="7" stroke={chartColors.charcoal} strokeWidth="1.5" />
            <polygon points="24,4 28,7 24,10" fill={chartColors.charcoal} />
          </svg>
          <span style={{ color: chartColors.gray }}>Data Flow</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="28" height="14">
            <line x1="0" y1="7" x2="28" y2="7" stroke={chartColors.charcoal} strokeWidth="1.5" strokeDasharray="5,3" strokeOpacity="0.5" />
            <polygon points="24,4 28,7 24,10" fill={chartColors.charcoal} fillOpacity="0.5" />
          </svg>
          <span style={{ color: chartColors.gray }}>Query-time Retrieval</span>
        </div>
      </div>
    </div>
  );
};

export default RAGPipeline;
