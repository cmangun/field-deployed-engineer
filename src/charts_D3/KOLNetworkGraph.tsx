"use client";
import React, { useState, useEffect } from 'react';
import { chartColors } from './colors';

// KOL Network Graph data
const defaultData = {
  drugName: 'NEXAGEN™',
  indication: 'NSCLC',
  kols: [
    { id: 'kol1', name: 'Dr. Sarah Chen', institution: 'MD Anderson', tier: 1, specialty: 'Thoracic Oncology', influence: 98, engaged: true, speakerBureau: true, publications: 45, trials: 12 },
    { id: 'kol2', name: 'Dr. James Miller', institution: 'Memorial Sloan Kettering', tier: 1, specialty: 'Lung Cancer', influence: 95, engaged: true, speakerBureau: true, publications: 52, trials: 15 },
    { id: 'kol3', name: 'Dr. Emily Rodriguez', institution: 'Dana-Farber', tier: 1, specialty: 'Immuno-Oncology', influence: 92, engaged: true, speakerBureau: false, publications: 38, trials: 9 },
    { id: 'kol4', name: 'Dr. Michael Park', institution: 'Mayo Clinic', tier: 2, specialty: 'Medical Oncology', influence: 85, engaged: true, speakerBureau: true, publications: 28, trials: 6 },
    { id: 'kol5', name: 'Dr. Lisa Thompson', institution: 'Johns Hopkins', tier: 2, specialty: 'Pulmonology', influence: 82, engaged: false, speakerBureau: false, publications: 31, trials: 7 },
    { id: 'kol6', name: 'Dr. David Kim', institution: 'Stanford', tier: 2, specialty: 'Thoracic Oncology', influence: 78, engaged: true, speakerBureau: true, publications: 22, trials: 5 },
    { id: 'kol7', name: 'Dr. Rachel Green', institution: 'UCLA', tier: 2, specialty: 'Medical Oncology', influence: 75, engaged: false, speakerBureau: false, publications: 19, trials: 4 },
    { id: 'kol8', name: 'Dr. Robert Wilson', institution: 'Cleveland Clinic', tier: 3, specialty: 'Lung Cancer', influence: 68, engaged: true, speakerBureau: false, publications: 15, trials: 3 },
    { id: 'kol9', name: 'Dr. Amanda Lee', institution: 'UCSF', tier: 3, specialty: 'Immuno-Oncology', influence: 65, engaged: false, speakerBureau: false, publications: 12, trials: 2 },
    { id: 'kol10', name: 'Dr. Chris Brown', institution: 'Northwestern', tier: 3, specialty: 'Medical Oncology', influence: 62, engaged: true, speakerBureau: false, publications: 10, trials: 2 },
    { id: 'kol11', name: 'Dr. Jennifer Wu', institution: 'Penn Medicine', tier: 3, specialty: 'Thoracic Oncology', influence: 58, engaged: false, speakerBureau: false, publications: 8, trials: 1 },
    { id: 'kol12', name: 'Dr. Mark Davis', institution: 'Duke', tier: 3, specialty: 'Pulmonology', influence: 55, engaged: true, speakerBureau: false, publications: 6, trials: 1 },
  ],
  connections: [
    { source: 'kol1', target: 'kol2', strength: 'strong', type: 'co-author' },
    { source: 'kol1', target: 'kol3', strength: 'strong', type: 'co-investigator' },
    { source: 'kol1', target: 'kol4', strength: 'medium', type: 'mentor' },
    { source: 'kol2', target: 'kol3', strength: 'strong', type: 'co-author' },
    { source: 'kol2', target: 'kol5', strength: 'medium', type: 'colleague' },
    { source: 'kol3', target: 'kol6', strength: 'medium', type: 'co-investigator' },
    { source: 'kol4', target: 'kol8', strength: 'medium', type: 'mentor' },
    { source: 'kol4', target: 'kol10', strength: 'weak', type: 'colleague' },
    { source: 'kol5', target: 'kol7', strength: 'medium', type: 'colleague' },
    { source: 'kol5', target: 'kol9', strength: 'weak', type: 'co-author' },
    { source: 'kol6', target: 'kol7', strength: 'strong', type: 'colleague' },
    { source: 'kol6', target: 'kol11', strength: 'weak', type: 'mentor' },
    { source: 'kol8', target: 'kol10', strength: 'medium', type: 'colleague' },
    { source: 'kol9', target: 'kol11', strength: 'weak', type: 'colleague' },
    { source: 'kol10', target: 'kol12', strength: 'medium', type: 'co-author' },
  ],
  summary: {
    totalKOLs: 12,
    engaged: 8,
    speakerBureau: 4,
    tier1: 3,
    tier2: 4,
    tier3: 5,
  }
};

const tierConfig = {
  1: { radius: 28, color: chartColors.primary, label: 'National' },
  2: { radius: 22, color: chartColors.primary, label: 'Regional' },
  3: { radius: 16, color: chartColors.navy, label: 'Local' },
};

interface KOLNetworkGraphProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const KOLNetworkGraph: React.FC<KOLNetworkGraphProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "KOL Network Map"
}) => {
  const [selectedKOL, setSelectedKOL] = useState<string | null>(null);
  const [hoveredKOL, setHoveredKOL] = useState<string | null>(null);
  const [filterEngaged, setFilterEngaged] = useState(false);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});

  const margin = { top: 40, right: 30, bottom: 40, left: 30 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const centerX = innerWidth / 2;
  const centerY = innerHeight / 2;

  // Initialize positions using force-directed layout simulation
  useEffect(() => {
    const newPositions: Record<string, { x: number; y: number }> = {};
    
    // Position by tier in concentric circles
    const tierGroups: Record<number, typeof data.kols> = { 1: [], 2: [], 3: [] };
    data.kols.forEach(kol => tierGroups[kol.tier].push(kol));
    
    Object.entries(tierGroups).forEach(([tier, kols]) => {
      const tierNum = parseInt(tier);
      const radius = tierNum === 1 ? 60 : tierNum === 2 ? 140 : 200;
      kols.forEach((kol, i) => {
        const angle = (i / kols.length) * 2 * Math.PI - Math.PI / 2;
        newPositions[kol.id] = {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
        };
      });
    });
    
    setPositions(newPositions);
  }, [data.kols, centerX, centerY]);

  // Get connected KOLs
  const getConnectedKOLs = (kolId: string) => {
    const connected = new Set<string>();
    connected.add(kolId);
    data.connections.forEach(conn => {
      if (conn.source === kolId) connected.add(conn.target);
      if (conn.target === kolId) connected.add(conn.source);
    });
    return connected;
  };

  const connectedKOLs = selectedKOL ? getConnectedKOLs(selectedKOL) : null;

  // Filter KOLs
  const filteredKOLs = filterEngaged ? data.kols.filter(k => k.engaged) : data.kols;
  const filteredConnections = filterEngaged 
    ? data.connections.filter(c => 
        filteredKOLs.some(k => k.id === c.source) && 
        filteredKOLs.some(k => k.id === c.target)
      )
    : data.connections;

  return (
    <div style={{ width: '100%' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: chartColors.background, borderRadius: '12px' }}
      >
        <defs>
          <filter id="kol-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15"/>
          </filter>
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Tier rings */}
          {[200, 140, 60].map((radius, i) => (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke={chartColors.light}
              strokeDasharray="4,4"
            />
          ))}

          {/* Connections */}
          {filteredConnections.map((conn, i) => {
            const source = positions[conn.source];
            const target = positions[conn.target];
            if (!source || !target) return null;
            
            const isActive = !connectedKOLs || 
              (connectedKOLs.has(conn.source) && connectedKOLs.has(conn.target));
            
            const strokeWidth = conn.strength === 'strong' ? 3 : conn.strength === 'medium' ? 2 : 1;
            
            return (
              <line
                key={i}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={isActive ? chartColors.secondary : chartColors.light}
                strokeWidth={strokeWidth}
                strokeOpacity={isActive ? 0.6 : 0.2}
                strokeDasharray={conn.strength === 'weak' ? '4,4' : 'none'}
              />
            );
          })}

          {/* KOL Nodes */}
          {filteredKOLs.map((kol) => {
            const pos = positions[kol.id];
            if (!pos) return null;
            
            const config = tierConfig[kol.tier as keyof typeof tierConfig];
            const isSelected = selectedKOL === kol.id;
            const isHovered = hoveredKOL === kol.id;
            const isActive = !connectedKOLs || connectedKOLs.has(kol.id);
            
            return (
              <g
                key={kol.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={() => setSelectedKOL(isSelected ? null : kol.id)}
                onMouseEnter={() => setHoveredKOL(kol.id)}
                onMouseLeave={() => setHoveredKOL(null)}
                style={{ cursor: 'pointer', opacity: isActive ? 1 : 0.3 }}
              >
                {/* Engagement ring */}
                {kol.engaged && (
                  <circle
                    r={config.radius + 4}
                    fill="none"
                    stroke={chartColors.primary}
                    strokeWidth={2}
                  />
                )}
                
                {/* Node */}
                <circle
                  r={config.radius}
                  fill={isSelected || isHovered ? config.color : 'white'}
                  stroke={config.color}
                  strokeWidth={2}
                  filter="url(#kol-shadow)"
                />
                
                {/* Speaker badge */}
                {kol.speakerBureau && (
                  <g transform={`translate(${config.radius - 4}, ${-config.radius + 4})`}>
                    <circle r={8} fill={chartColors.secondary} />
                    <text x={0} y={3} textAnchor="middle" fontSize={10} fill="white">🎤</text>
                  </g>
                )}
                
                {/* Influence score */}
                <text
                  y={4}
                  textAnchor="middle"
                  fontSize={10}
                  fontWeight={700}
                  fill={isSelected || isHovered ? 'white' : config.color}
                >
                  {kol.influence}
                </text>
                
                {/* Name label on hover */}
                {(isHovered || isSelected) && (
                  <g transform={`translate(0, ${config.radius + 16})`}>
                    <rect
                      x={-50}
                      y={-10}
                      width={100}
                      height={20}
                      rx={4}
                      fill={chartColors.charcoal}
                    />
                    <text
                      textAnchor="middle"
                      fontSize={8}
                      fontWeight={500}
                      fill="white"
                      y={3}
                    >
                      {kol.name.split(' ').slice(1).join(' ')}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Tier Labels */}
          <text x={centerX} y={centerY - 45} textAnchor="middle" fontSize={9} fill={chartColors.gray}>Tier 1</text>
          <text x={centerX} y={centerY - 125} textAnchor="middle" fontSize={9} fill={chartColors.gray}>Tier 2</text>
          <text x={centerX} y={centerY - 185} textAnchor="middle" fontSize={9} fill={chartColors.gray}>Tier 3</text>
        </g>
      </svg>

      {/* Selected KOL Details */}
      {selectedKOL && (
        <div style={{
          marginTop: '16px',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '10px',
          border: `1px solid ${chartColors.light}`
        }}>
          {(() => {
            const kol = data.kols.find(k => k.id === selectedKOL);
            if (!kol) return null;
            const config = tierConfig[kol.tier as keyof typeof tierConfig];
            
            return (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: chartColors.charcoal }}>{kol.name}</span>
                    <span style={{
                      fontSize: '9px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: config.color,
                      color: 'white'
                    }}>
                      Tier {kol.tier}
                    </span>
                    {kol.engaged && (
                      <span style={{ fontSize: '9px', color: chartColors.primary }}>✓ Engaged</span>
                    )}
                    {kol.speakerBureau && (
                      <span style={{ fontSize: '9px', color: chartColors.secondary }}>🎤 Speaker</span>
                    )}
                  </div>
                  <div style={{ fontSize: '11px', color: chartColors.gray }}>
                    {kol.institution} • {kol.specialty}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: config.color }}>{kol.influence}</div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>Influence</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: chartColors.charcoal }}>{kol.publications}</div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>Publications</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: chartColors.charcoal }}>{kol.trials}</div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>Trials</div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Legend */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        gap: '16px',
        fontSize: '10px',
        flexWrap: 'wrap'
      }}>
        {Object.entries(tierConfig).map(([tier, config]) => (
          <div key={tier} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: config.radius * 0.7, height: config.radius * 0.7, borderRadius: '50%', backgroundColor: config.color }} />
            <span style={{ color: chartColors.charcoalLight }}>Tier {tier} ({config.label})</span>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: `2px solid ${chartColors.primary}` }} />
          <span style={{ color: chartColors.charcoalLight }}>Engaged</span>
        </div>
        <div style={{ marginLeft: 'auto', color: chartColors.gray }}>
          Click KOL for details
        </div>
      </div>
    </div>
  );
};

export default KOLNetworkGraph;
