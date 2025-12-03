"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Competitive Matrix data
const defaultData = {
  title: 'ML Platform Market',
  axes: {
    x: { label: 'Completeness of Vision', min: 0, max: 100 },
    y: { label: 'Ability to Execute', min: 0, max: 100 },
  },
  quadrants: [
    { name: 'Leaders', x: 'right', y: 'top', color: chartColors.primary },
    { name: 'Challengers', x: 'left', y: 'top', color: chartColors.navy },
    { name: 'Visionaries', x: 'right', y: 'bottom', color: chartColors.secondary },
    { name: 'Niche Players', x: 'left', y: 'bottom', color: chartColors.muted },
  ],
  companies: [
    { name: 'DataFlow AI', x: 72, y: 68, size: 45, isUs: true, growth: 'fast', founded: 2021 },
    { name: 'AWS SageMaker', x: 85, y: 92, size: 100, isUs: false, growth: 'stable', founded: 2017 },
    { name: 'Databricks', x: 88, y: 85, size: 85, isUs: false, growth: 'fast', founded: 2013 },
    { name: 'Google Vertex', x: 82, y: 88, size: 90, isUs: false, growth: 'stable', founded: 2021 },
    { name: 'Azure ML', x: 78, y: 90, size: 95, isUs: false, growth: 'stable', founded: 2018 },
    { name: 'Dataiku', x: 75, y: 72, size: 55, isUs: false, growth: 'moderate', founded: 2013 },
    { name: 'H2O.ai', x: 68, y: 58, size: 40, isUs: false, growth: 'moderate', founded: 2012 },
    { name: 'MLflow', x: 55, y: 45, size: 35, isUs: false, growth: 'fast', founded: 2018 },
    { name: 'Weights & Biases', x: 62, y: 55, size: 38, isUs: false, growth: 'fast', founded: 2017 },
    { name: 'Neptune.ai', x: 48, y: 42, size: 25, isUs: false, growth: 'moderate', founded: 2017 },
    { name: 'Comet ML', x: 52, y: 48, size: 28, isUs: false, growth: 'moderate', founded: 2017 },
    { name: 'Domino Data', x: 65, y: 62, size: 42, isUs: false, growth: 'stable', founded: 2013 },
  ],
  dimensions: [
    { id: 'ease', name: 'Ease of Use', us: 85, competitor: 65 },
    { id: 'scale', name: 'Scalability', us: 75, competitor: 90 },
    { id: 'price', name: 'Pricing', us: 80, competitor: 55 },
    { id: 'support', name: 'Support', us: 90, competitor: 70 },
    { id: 'integration', name: 'Integrations', us: 70, competitor: 85 },
    { id: 'innovation', name: 'Innovation', us: 88, competitor: 75 },
  ],
};

interface CompetitiveMatrixProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const CompetitiveMatrix: React.FC<CompetitiveMatrixProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Competitive Landscape"
}) => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'matrix' | 'comparison' | 'details'>('matrix');
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);

  const chartSize = 340;
  const padding = 40;

  const getQuadrant = (x: number, y: number) => {
    if (x >= 50 && y >= 50) return 'Leaders';
    if (x < 50 && y >= 50) return 'Challengers';
    if (x >= 50 && y < 50) return 'Visionaries';
    return 'Niche Players';
  };

  const getQuadrantColor = (quadrant: string) => {
    return data.quadrants.find(q => q.name === quadrant)?.color || chartColors.muted;
  };

  return (
    <div style={{ width: '100%' }}>
      {viewMode === 'matrix' && (
        <div style={{ display: 'flex', gap: '16px' }}>
          {/* Matrix Chart */}
          <div style={{ position: 'relative' }}>
            <svg width={chartSize + padding * 2} height={chartSize + padding * 2}>
              {/* Quadrant backgrounds */}
              {data.quadrants.map((q) => {
                const x = q.x === 'right' ? chartSize / 2 + padding : padding;
                const y = q.y === 'top' ? padding : chartSize / 2 + padding;
                return (
                  <rect
                    key={q.name}
                    x={x}
                    y={y}
                    width={chartSize / 2}
                    height={chartSize / 2}
                    fill={`${q.color}10`}
                  />
                );
              })}
              
              {/* Grid lines */}
              <line x1={padding} y1={chartSize / 2 + padding} x2={chartSize + padding} y2={chartSize / 2 + padding} stroke={chartColors.light} strokeWidth={2} />
              <line x1={chartSize / 2 + padding} y1={padding} x2={chartSize / 2 + padding} y2={chartSize + padding} stroke={chartColors.light} strokeWidth={2} />
              
              {/* Axis labels */}
              <text x={chartSize / 2 + padding} y={chartSize + padding + 30} textAnchor="middle" fontSize={10} fill={chartColors.gray}>
                {data.axes.x.label} →
              </text>
              <text 
                x={15} 
                y={chartSize / 2 + padding} 
                textAnchor="middle" 
                fontSize={10} 
                fill={chartColors.gray}
                transform={`rotate(-90, 15, ${chartSize / 2 + padding})`}
              >
                {data.axes.y.label} →
              </text>
              
              {/* Quadrant labels */}
              {data.quadrants.map((q) => {
                const x = q.x === 'right' ? chartSize * 0.75 + padding : chartSize * 0.25 + padding;
                const y = q.y === 'top' ? padding + 20 : chartSize + padding - 10;
                return (
                  <text key={q.name} x={x} y={y} textAnchor="middle" fontSize={9} fill={q.color} fontWeight={600}>
                    {q.name}
                  </text>
                );
              })}
              
              {/* Company bubbles */}
              {data.companies.map((company) => {
                const cx = padding + (company.x / 100) * chartSize;
                const cy = padding + chartSize - (company.y / 100) * chartSize;
                const r = Math.sqrt(company.size) * 2.5;
                const isHovered = hoveredCompany === company.name;
                const isSelected = selectedCompany === company.name;
                const quadrant = getQuadrant(company.x, company.y);
                
                return (
                  <g
                    key={company.name}
                    onClick={() => setSelectedCompany(isSelected ? null : company.name)}
                    onMouseEnter={() => setHoveredCompany(company.name)}
                    onMouseLeave={() => setHoveredCompany(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={r + (isHovered || isSelected ? 3 : 0)}
                      fill={company.isUs ? chartColors.teal : getQuadrantColor(quadrant)}
                      opacity={isHovered || isSelected ? 1 : 0.7}
                      stroke={company.isUs ? chartColors.charcoal : 'white'}
                      strokeWidth={company.isUs ? 3 : 2}
                    />
                    {(isHovered || isSelected || company.isUs) && (
                      <text
                        x={cx}
                        y={cy - r - 6}
                        textAnchor="middle"
                        fontSize={9}
                        fill={chartColors.charcoal}
                        fontWeight={company.isUs ? 700 : 500}
                      >
                        {company.name}
                      </text>
                    )}
                    {company.isUs && (
                      <text x={cx} y={cy + 3} textAnchor="middle" fontSize={8} fill="white" fontWeight={700}>
                        US
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
          
          {/* Legend / Selected Details */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
              QUADRANTS
            </div>
            {data.quadrants.map((q) => {
              const count = data.companies.filter(c => getQuadrant(c.x, c.y) === q.name).length;
              return (
                <div key={q.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px',
                  marginBottom: '4px',
                  borderRadius: '6px',
                  backgroundColor: `${q.color}10`
                }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: q.color, borderRadius: '50%' }} />
                  <span style={{ fontSize: '10px', color: chartColors.charcoal, flex: 1 }}>{q.name}</span>
                  <span style={{ fontSize: '10px', color: chartColors.gray }}>{count}</span>
                </div>
              );
            })}
            
            {selectedCompany && (
              <div style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: chartColors.background,
                borderRadius: '8px',
                border: `1px solid ${chartColors.light}`
              }}>
                {(() => {
                  const company = data.companies.find(c => c.name === selectedCompany);
                  if (!company) return null;
                  const quadrant = getQuadrant(company.x, company.y);
                  return (
                    <>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '8px' }}>
                        {company.name} {company.isUs && '⭐'}
                      </div>
                      <div style={{ fontSize: '10px', color: chartColors.gray, marginBottom: '8px' }}>
                        <span style={{
                          padding: '2px 6px',
                          backgroundColor: `${getQuadrantColor(quadrant)}20`,
                          color: getQuadrantColor(quadrant),
                          borderRadius: '4px',
                          fontWeight: 600
                        }}>
                          {quadrant}
                        </span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '10px' }}>
                        <div>
                          <div style={{ color: chartColors.gray }}>Vision</div>
                          <div style={{ fontWeight: 600 }}>{company.x}/100</div>
                        </div>
                        <div>
                          <div style={{ color: chartColors.gray }}>Execution</div>
                          <div style={{ fontWeight: 600 }}>{company.y}/100</div>
                        </div>
                        <div>
                          <div style={{ color: chartColors.gray }}>Growth</div>
                          <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{company.growth}</div>
                        </div>
                        <div>
                          <div style={{ color: chartColors.gray }}>Founded</div>
                          <div style={{ fontWeight: 600 }}>{company.founded}</div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}

      {viewMode === 'comparison' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '16px' }}>
            HEAD-TO-HEAD: DATAFLOW AI VS MARKET AVERAGE
          </div>
          
          {data.dimensions.map((dim) => (
            <div key={dim.id} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '6px' }}>
                <span style={{ color: chartColors.charcoal, fontWeight: 500 }}>{dim.name}</span>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ color: chartColors.teal, fontWeight: 600 }}>Us: {dim.us}</span>
                  <span style={{ color: chartColors.gray }}>Avg: {dim.competitor}</span>
                </div>
              </div>
              <div style={{ position: 'relative', height: '12px', backgroundColor: chartColors.light, borderRadius: '6px' }}>
                {/* Competitor bar */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: `${dim.competitor}%`,
                  height: '100%',
                  backgroundColor: chartColors.secondary,
                  borderRadius: '6px'
                }} />
                {/* Our bar */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: `${dim.us}%`,
                  height: '100%',
                  backgroundColor: chartColors.teal,
                  borderRadius: '6px',
                  opacity: 0.9
                }} />
                {/* Delta indicator */}
                {dim.us > dim.competitor && (
                  <div style={{
                    position: 'absolute',
                    left: `${dim.competitor}%`,
                    top: '-2px',
                    width: `${dim.us - dim.competitor}%`,
                    height: '16px',
                    borderRight: `2px solid ${chartColors.teal}`,
                    borderTop: `2px solid ${chartColors.teal}`,
                    borderBottom: `2px solid ${chartColors.teal}`,
                    borderRadius: '0 4px 4px 0'
                  }} />
                )}
              </div>
              <div style={{ 
                fontSize: '9px', 
                color: dim.us > dim.competitor ? chartColors.primary : chartColors.dark,
                textAlign: 'right',
                marginTop: '2px'
              }}>
                {dim.us > dim.competitor ? '+' : ''}{dim.us - dim.competitor} pts
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'details' && (
        <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr',
            gap: '1px',
            backgroundColor: chartColors.light,
            borderRadius: '8px',
            overflow: 'hidden',
            fontSize: '10px'
          }}>
            {/* Header */}
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600 }}>Company</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Quadrant</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Vision</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Execution</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Growth</div>
            
            {/* Rows */}
            {data.companies.sort((a, b) => (b.x + b.y) - (a.x + a.y)).map((company) => {
              const quadrant = getQuadrant(company.x, company.y);
              return (
                <React.Fragment key={company.name}>
                  <div style={{ 
                    padding: '10px', 
                    backgroundColor: company.isUs ? chartColors.light : 'white',
                    fontWeight: company.isUs ? 600 : 400,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: company.isUs ? chartColors.teal : getQuadrantColor(quadrant)
                    }} />
                    {company.name} {company.isUs && '⭐'}
                  </div>
                  <div style={{ 
                    padding: '10px', 
                    backgroundColor: company.isUs ? chartColors.light : 'white',
                    textAlign: 'center'
                  }}>
                    <span style={{
                      padding: '2px 6px',
                      backgroundColor: `${getQuadrantColor(quadrant)}20`,
                      color: getQuadrantColor(quadrant),
                      borderRadius: '4px',
                      fontSize: '9px'
                    }}>
                      {quadrant}
                    </span>
                  </div>
                  <div style={{ padding: '10px', backgroundColor: company.isUs ? chartColors.light : 'white', textAlign: 'center', fontWeight: 600 }}>
                    {company.x}
                  </div>
                  <div style={{ padding: '10px', backgroundColor: company.isUs ? chartColors.light : 'white', textAlign: 'center', fontWeight: 600 }}>
                    {company.y}
                  </div>
                  <div style={{ 
                    padding: '10px', 
                    backgroundColor: company.isUs ? chartColors.light : 'white', 
                    textAlign: 'center',
                    color: company.growth === 'fast' ? chartColors.primary : company.growth === 'moderate' ? chartColors.secondary : chartColors.gray,
                    textTransform: 'capitalize'
                  }}>
                    {company.growth}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitiveMatrix;
