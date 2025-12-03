"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample technology radar data
const defaultData = {
  quadrants: [
    { name: 'Languages & Frameworks', color: chartColors.teal },
    { name: 'Tools & Infrastructure', color: chartColors.orange },
    { name: 'Platforms & Services', color: chartColors.indigo },
    { name: 'Techniques & Practices', color: chartColors.purple },
  ],
  rings: [
    { name: 'Adopt', description: 'Proven, default choice' },
    { name: 'Trial', description: 'Worth pursuing, manage risk' },
    { name: 'Assess', description: 'Worth exploring, understand impact' },
    { name: 'Hold', description: 'Proceed with caution' },
  ],
  items: [
    // Languages & Frameworks (Q0)
    { name: 'TypeScript', quadrant: 0, ring: 0, moved: 0 },
    { name: 'React', quadrant: 0, ring: 0, moved: 0 },
    { name: 'Next.js', quadrant: 0, ring: 0, moved: 0 },
    { name: 'Python', quadrant: 0, ring: 0, moved: 0 },
    { name: 'FastAPI', quadrant: 0, ring: 0, moved: 1 },
    { name: 'Rust', quadrant: 0, ring: 1, moved: 1 },
    { name: 'Svelte', quadrant: 0, ring: 1, moved: 0 },
    { name: 'HTMX', quadrant: 0, ring: 2, moved: 1 },
    { name: 'Bun', quadrant: 0, ring: 2, moved: 0 },
    
    // Tools & Infrastructure (Q1)
    { name: 'Docker', quadrant: 1, ring: 0, moved: 0 },
    { name: 'Kubernetes', quadrant: 1, ring: 0, moved: 0 },
    { name: 'Terraform', quadrant: 1, ring: 0, moved: 0 },
    { name: 'GitHub Actions', quadrant: 1, ring: 0, moved: 0 },
    { name: 'Pulumi', quadrant: 1, ring: 1, moved: 1 },
    { name: 'Dagger', quadrant: 1, ring: 2, moved: 1 },
    { name: 'Nix', quadrant: 1, ring: 2, moved: 0 },
    { name: 'Jenkins', quadrant: 1, ring: 3, moved: -1 },
    
    // Platforms & Services (Q2)
    { name: 'AWS', quadrant: 2, ring: 0, moved: 0 },
    { name: 'Vercel', quadrant: 2, ring: 0, moved: 0 },
    { name: 'Snowflake', quadrant: 2, ring: 0, moved: 0 },
    { name: 'Databricks', quadrant: 2, ring: 1, moved: 1 },
    { name: 'Supabase', quadrant: 2, ring: 1, moved: 1 },
    { name: 'PlanetScale', quadrant: 2, ring: 1, moved: 0 },
    { name: 'Cloudflare Workers', quadrant: 2, ring: 1, moved: 1 },
    { name: 'Railway', quadrant: 2, ring: 2, moved: 0 },
    
    // Techniques & Practices (Q3)
    { name: 'RAG', quadrant: 3, ring: 0, moved: 1 },
    { name: 'Feature Flags', quadrant: 3, ring: 0, moved: 0 },
    { name: 'Trunk-based Dev', quadrant: 3, ring: 0, moved: 0 },
    { name: 'LLM Fine-tuning', quadrant: 3, ring: 1, moved: 1 },
    { name: 'AI Agents', quadrant: 3, ring: 1, moved: 1 },
    { name: 'Platform Engineering', quadrant: 3, ring: 1, moved: 0 },
    { name: 'Prompt Engineering', quadrant: 3, ring: 1, moved: 0 },
    { name: 'Model Quantization', quadrant: 3, ring: 2, moved: 1 },
  ]
};

interface TechRadarProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const TechRadar: React.FC<TechRadarProps> = ({
  data = defaultData,
  width = 700,
  height = 700,
  title = "Technology Radar"
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedQuadrant, setSelectedQuadrant] = useState<number | null>(null);

  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) * 0.42;

  // Ring radii (outer edge of each ring)
  const ringRadii = [
    maxRadius * 0.28,  // Adopt
    maxRadius * 0.52,  // Trial
    maxRadius * 0.76,  // Assess
    maxRadius * 1.0,   // Hold
  ];

  // Calculate item positions with deterministic placement
  const getItemPosition = (item: typeof data.items[0], index: number) => {
    const quadrantAngle = (Math.PI / 2) * item.quadrant;
    const ringInner = item.ring === 0 ? 0 : ringRadii[item.ring - 1];
    const ringOuter = ringRadii[item.ring];
    
    // Distribute items within quadrant and ring
    const itemsInSameArea = data.items.filter(
      i => i.quadrant === item.quadrant && i.ring === item.ring
    );
    const indexInArea = itemsInSameArea.indexOf(item);
    const totalInArea = itemsInSameArea.length;
    
    // Angle within quadrant (with padding from edges)
    const angleSpread = (Math.PI / 2) * 0.8;
    const angleStart = quadrantAngle + (Math.PI / 2) * 0.1;
    const angle = angleStart + (angleSpread / (totalInArea + 1)) * (indexInArea + 1);
    
    // Radius within ring (slight variation)
    const ringMid = (ringInner + ringOuter) / 2;
    const ringVariation = (ringOuter - ringInner) * 0.3;
    const radius = ringMid + (indexInArea % 2 === 0 ? ringVariation * 0.5 : -ringVariation * 0.3);
    
    return {
      x: centerX + Math.cos(angle - Math.PI / 2) * radius,
      y: centerY + Math.sin(angle - Math.PI / 2) * radius
    };
  };

  const getMovedIndicator = (moved: number) => {
    if (moved > 0) return { symbol: '▲', color: chartColors.teal };
    if (moved < 0) return { symbol: '▼', color: chartColors.dark };
    return null;
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Radar SVG */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          style={{ maxWidth: '100%', height: 'auto' }}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {/* Rings */}
          {ringRadii.map((radius, i) => (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke={chartColors.light}
              strokeWidth={1}
            />
          ))}

          {/* Ring labels */}
          {data.rings.map((ring, i) => (
            <text
              key={i}
              x={centerX + 8}
              y={centerY - (i === 0 ? ringRadii[0] / 2 : (ringRadii[i] + ringRadii[i - 1]) / 2)}
              fontSize={10}
              fontWeight={600}
              fill={chartColors.charcoalLight}
            >
              {ring.name}
            </text>
          ))}

          {/* Quadrant lines */}
          <line x1={centerX} y1={centerY - maxRadius} x2={centerX} y2={centerY + maxRadius} stroke={chartColors.secondary} strokeWidth={1} />
          <line x1={centerX - maxRadius} y1={centerY} x2={centerX + maxRadius} y2={centerY} stroke={chartColors.secondary} strokeWidth={1} />

          {/* Quadrant backgrounds (subtle) */}
          {data.quadrants.map((q, i) => {
            const startAngle = (i * Math.PI / 2) - Math.PI / 2;
            const endAngle = startAngle + Math.PI / 2;
            const isSelected = selectedQuadrant === null || selectedQuadrant === i;
            
            const x1 = centerX + Math.cos(startAngle) * maxRadius;
            const y1 = centerY + Math.sin(startAngle) * maxRadius;
            const x2 = centerX + Math.cos(endAngle) * maxRadius;
            const y2 = centerY + Math.sin(endAngle) * maxRadius;
            
            return (
              <path
                key={i}
                d={`M${centerX},${centerY} L${x1},${y1} A${maxRadius},${maxRadius} 0 0,1 ${x2},${y2} Z`}
                fill={q.color}
                fillOpacity={isSelected ? 0.08 : 0.02}
                stroke="none"
                onClick={() => setSelectedQuadrant(selectedQuadrant === i ? null : i)}
                style={{ cursor: 'pointer' }}
              />
            );
          })}

          {/* Quadrant labels */}
          {data.quadrants.map((q, i) => {
            const angle = (i * Math.PI / 2) + Math.PI / 4 - Math.PI / 2;
            const labelRadius = maxRadius + 20;
            const x = centerX + Math.cos(angle) * labelRadius * 0.7;
            const y = centerY + Math.sin(angle) * labelRadius * 0.7;
            
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill={q.color}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedQuadrant(selectedQuadrant === i ? null : i)}
              >
                {q.name}
              </text>
            );
          })}

          {/* Items */}
          {data.items.map((item, i) => {
            const pos = getItemPosition(item, i);
            const isHovered = hoveredItem === item.name;
            const isVisible = selectedQuadrant === null || selectedQuadrant === item.quadrant;
            const color = data.quadrants[item.quadrant].color;
            const moved = getMovedIndicator(item.moved);
            
            return (
              <g
                key={i}
                transform={`translate(${pos.x}, ${pos.y})`}
                onMouseEnter={() => setHoveredItem(item.name)}
                style={{ cursor: 'pointer', opacity: isVisible ? 1 : 0.15 }}
              >
                <circle
                  r={isHovered ? 8 : 6}
                  fill={color}
                  stroke="white"
                  strokeWidth={2}
                  style={{ transition: 'all 0.2s' }}
                />
                {moved && (
                  <text
                    x={10}
                    y={-2}
                    fontSize={8}
                    fill={moved.color}
                    fontWeight={700}
                  >
                    {moved.symbol}
                  </text>
                )}
                {isHovered && (
                  <text
                    y={-14}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={600}
                    fill={chartColors.charcoal}
                  >
                    {item.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend / Item List */}
        <div style={{ minWidth: '200px', fontSize: '11px' }}>
          {data.quadrants.map((q, qIdx) => {
            if (selectedQuadrant !== null && selectedQuadrant !== qIdx) return null;
            
            const quadrantItems = data.items.filter(i => i.quadrant === qIdx);
            
            return (
              <div key={qIdx} style={{ marginBottom: '16px' }}>
                <div style={{ 
                  fontWeight: 600, 
                  color: q.color, 
                  marginBottom: '8px',
                  paddingBottom: '4px',
                  borderBottom: `2px solid ${q.color}`
                }}>
                  {q.name}
                </div>
                {data.rings.map((ring, rIdx) => {
                  const ringItems = quadrantItems.filter(i => i.ring === rIdx);
                  if (ringItems.length === 0) return null;
                  
                  return (
                    <div key={rIdx} style={{ marginBottom: '8px' }}>
                      <div style={{ fontSize: '10px', color: chartColors.gray, marginBottom: '4px' }}>
                        {ring.name}
                      </div>
                      {ringItems.map((item, i) => {
                        const moved = getMovedIndicator(item.moved);
                        return (
                          <div
                            key={i}
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '4px',
                              padding: '2px 0',
                              color: hoveredItem === item.name ? chartColors.charcoal : chartColors.charcoalLight,
                              fontWeight: hoveredItem === item.name ? 600 : 400
                            }}
                            onMouseEnter={() => setHoveredItem(item.name)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <span style={{ color: q.color }}>●</span>
                            {item.name}
                            {moved && (
                              <span style={{ color: moved.color, fontSize: '9px' }}>{moved.symbol}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Ring Legend */}
      <div style={{ 
        marginTop: '16px', 
        display: 'flex', 
        gap: '24px',
        fontSize: '10px',
        padding: '12px',
        backgroundColor: chartColors.background,
        borderRadius: '8px'
      }}>
        {data.rings.map((ring, i) => (
          <div key={i}>
            <span style={{ fontWeight: 600, color: chartColors.charcoal }}>{ring.name}:</span>
            <span style={{ marginLeft: '4px', color: chartColors.gray }}>{ring.description}</span>
          </div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
          <span><span style={{ color: chartColors.teal }}>▲</span> Moved in</span>
          <span><span style={{ color: chartColors.dark }}>▼</span> Moved out</span>
        </div>
      </div>
    </div>
  );
};

export default TechRadar;
