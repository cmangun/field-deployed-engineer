"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Simple 5-stage RAG Pipeline data structure
interface RAGStage {
  id: string;
  name: string;
  icon: string;
  desc: string;
}

interface RAGPipelineData {
  sections: {
    id: string;
    name: string;
    color?: string;
    components: RAGStage[];
  }[];
  flows?: { from: string; to: string }[];
  metrics?: { name: string; value: number | string; desc: string }[];
}

// Default data for 5-stage pipeline
const defaultData: RAGPipelineData = {
  sections: [
    { id: 'ingestion', name: 'Ingest', components: [{ id: 'ingest', name: 'Ingest', icon: '📄', desc: 'Ingest approved assets, templates, and claims from systems of record.' }] },
    { id: 'indexing', name: 'Index', components: [{ id: 'index', name: 'Index', icon: '⬡', desc: 'Chunk, embed, and index content with claims-aware metadata.' }] },
    { id: 'retrieval', name: 'Retrieve', components: [{ id: 'retrieve', name: 'Retrieve', icon: '◇', desc: 'Hybrid semantic + keyword retrieval with brand and region filters.' }] },
    { id: 'generation', name: 'Generate', components: [{ id: 'generate', name: 'Generate', icon: '★', desc: 'LLM drafts content with explicit citations and claim references.' }] },
    { id: 'review', name: 'Review', components: [{ id: 'review', name: 'Review', icon: '✓', desc: 'Producers and MLR reviewers inspect, edit, and approve drafts.' }] },
  ],
  flows: [
    { from: 'ingest', to: 'index' },
    { from: 'index', to: 'retrieve' },
    { from: 'retrieve', to: 'generate' },
    { from: 'generate', to: 'review' },
  ],
  metrics: [
    { name: 'Relevance', value: 0.91, desc: 'Retrieved doc relevance' },
    { name: 'Faithfulness', value: 0.96, desc: 'Citations verified' },
    { name: 'Latency', value: '280ms', desc: 'p95 response time' },
    { name: 'Recall@5', value: 0.82, desc: 'Relevant in top 5' },
  ]
};

interface RAGPipelineProps {
  data?: RAGPipelineData;
  width?: number;
  height?: number;
  title?: string;
}

const RAGPipeline: React.FC<RAGPipelineProps> = ({
  data = defaultData,
  width = 1000,
  height = 380,
  title = "RAG Pipeline Architecture"
}) => {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  const stages = data.sections.map(s => ({
    id: s.components[0]?.id || s.id,
    name: s.name,
    icon: s.components[0]?.icon || '•',
    desc: s.components[0]?.desc || '',
  }));

  const stageCount = stages.length;
  const padding = { x: 40, y: 30 };
  const stageGap = 24;
  const innerWidth = width - padding.x * 2;
  const stageWidth = (innerWidth - (stageCount - 1) * stageGap) / stageCount;
  const stageHeight = 120;
  const arrowY = padding.y + stageHeight / 2;

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
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker id="rag-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={chartColors.charcoal} />
          </marker>
        </defs>

        {/* Stage boxes */}
        {stages.map((stage, i) => {
          const x = padding.x + i * (stageWidth + stageGap);
          const y = padding.y;
          const isHovered = hoveredStage === stage.id;

          return (
            <g
              key={stage.id}
              onMouseEnter={() => setHoveredStage(stage.id)}
              onMouseLeave={() => setHoveredStage(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Card */}
              <rect
                x={x}
                y={y}
                width={stageWidth}
                height={stageHeight}
                rx={14}
                fill="white"
                stroke={isHovered ? chartColors.charcoal : chartColors.light}
                strokeWidth={isHovered ? 2 : 1}
                style={{ 
                  transition: 'all 0.2s',
                  filter: isHovered ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' : 'none'
                }}
              />
              
              {/* Icon */}
              <text
                x={x + stageWidth / 2}
                y={y + 40}
                textAnchor="middle"
                fontSize={28}
              >
                {stage.icon}
              </text>
              
              {/* Name */}
              <text
                x={x + stageWidth / 2}
                y={y + 75}
                textAnchor="middle"
                fontSize={16}
                fontWeight={600}
                fill={chartColors.charcoal}
              >
                {stage.name}
              </text>
              
              {/* Description - only on hover */}
              {isHovered && (
                <foreignObject x={x + 8} y={y + 88} width={stageWidth - 16} height={28}>
                  <div style={{
                    fontSize: '11px',
                    color: chartColors.gray,
                    textAlign: 'center',
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical' as const,
                  }}>
                    {stage.desc}
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}

        {/* Arrows between stages */}
        {stages.slice(0, -1).map((stage, i) => {
          const x1 = padding.x + i * (stageWidth + stageGap) + stageWidth;
          const x2 = padding.x + (i + 1) * (stageWidth + stageGap);
          
          return (
            <line
              key={`arrow-${i}`}
              x1={x1 + 4}
              y1={arrowY}
              x2={x2 - 4}
              y2={arrowY}
              stroke={chartColors.charcoal}
              strokeWidth={2}
              markerEnd="url(#rag-arrow)"
            />
          );
        })}

        {/* Flow label */}
        <text
          x={width / 2}
          y={padding.y + stageHeight + 30}
          textAnchor="middle"
          fontSize={12}
          fill={chartColors.gray}
          fontStyle="italic"
        >
          Ingestion → Indexing → Retrieval → Response
        </text>
      </svg>

      {/* Metrics row */}
      {data.metrics && data.metrics.length > 0 && (
        <div style={{ 
          marginTop: '20px',
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(data.metrics.length, 4)}, 1fr)`,
          gap: '16px'
        }}>
          {data.metrics.map((metric, i) => (
            <div
              key={i}
              style={{
                padding: '16px 18px',
                backgroundColor: 'white',
                borderRadius: '12px',
                border: `1px solid ${chartColors.light}`
              }}
            >
              <div style={{ fontSize: '11px', color: chartColors.gray, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {metric.name}
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.charcoal }}>
                {typeof metric.value === 'number' ? `${(metric.value * 100).toFixed(0)}%` : metric.value}
              </div>
              <div style={{ fontSize: '11px', color: chartColors.gray, marginTop: '4px' }}>
                {metric.desc}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RAGPipeline;
