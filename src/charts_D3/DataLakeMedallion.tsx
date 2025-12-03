"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Data Lake Medallion Architecture
const defaultData = {
  sources: [
    { id: 'databases', name: 'Databases', icon: '🗄️', type: 'structured', format: 'SQL' },
    { id: 'apis', name: 'APIs', icon: '🔗', type: 'semi-structured', format: 'JSON' },
    { id: 'files', name: 'File Systems', icon: '📁', type: 'unstructured', format: 'CSV/Parquet' },
    { id: 'streaming', name: 'Streaming', icon: '📡', type: 'real-time', format: 'Avro' },
    { id: 'logs', name: 'Application Logs', icon: '📋', type: 'semi-structured', format: 'JSON' },
  ],
  zones: [
    {
      id: 'bronze',
      name: 'Bronze',
      subtitle: 'Raw Zone',
      color: chartColors.navy,      // Healthcare navy instead of bronze
      description: 'Raw, immutable data as-is from sources',
      characteristics: ['No transformations', 'Schema on read', 'Full history retained', 'Append-only'],
      tables: ['raw_orders', 'raw_users', 'raw_events', 'raw_logs'],
      storage: 'Delta Lake',
      retention: 'Indefinite',
      access: 'Data Engineers'
    },
    {
      id: 'silver',
      name: 'Silver',
      subtitle: 'Cleansed Zone',
      color: chartColors.primary,   // Healthcare primary instead of silver
      description: 'Cleaned, validated, deduplicated data',
      characteristics: ['Schema enforced', 'Data quality checks', 'Deduplication', 'Type casting'],
      tables: ['clean_orders', 'clean_users', 'clean_events'],
      storage: 'Delta Lake',
      retention: '2 years',
      access: 'Data Engineers, Analysts'
    },
    {
      id: 'gold',
      name: 'Gold',
      subtitle: 'Curated Zone',
      color: chartColors.cyan,      // Healthcare cyan instead of gold
      description: 'Business-level aggregates and features',
      characteristics: ['Business logic applied', 'Aggregations', 'Feature engineering', 'Optimized for queries'],
      tables: ['dim_customers', 'fct_orders', 'agg_daily_sales', 'ml_features'],
      storage: 'Delta Lake',
      retention: '5 years',
      access: 'Analysts, Data Scientists, BI Tools'
    }
  ],
  consumers: [
    { id: 'bi', name: 'BI Dashboards', icon: '📊', zone: 'gold' },
    { id: 'ml', name: 'ML Models', icon: '🤖', zone: 'gold' },
    { id: 'analytics', name: 'Ad-hoc Analytics', icon: '🔍', zone: 'silver' },
    { id: 'reports', name: 'Reports', icon: '📈', zone: 'gold' },
  ],
  governance: {
    catalog: 'Unity Catalog',
    quality: 'Great Expectations',
    lineage: 'OpenLineage'
  }
};

interface DataLakeMedallionProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const DataLakeMedallion: React.FC<DataLakeMedallionProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Data Lake Medallion Architecture"
}) => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [hoveredSource, setHoveredSource] = useState<string | null>(null);

  const margin = { top: 50, right: 30, bottom: 30, left: 30 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Layout
  const sourceWidth = 90;
  const zoneWidth = 130;
  const consumerWidth = 100;
  const zoneHeight = innerHeight - 40;
  const gap = 25;

  const sourceX = 0;
  const zoneStartX = sourceWidth + gap + 20;
  const consumerX = zoneStartX + (zoneWidth + gap) * 3 + 10;

  return (
    <div style={{ width: '100%' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: chartColors.background, borderRadius: '12px' }}
      >
        <defs>
          <marker id="arrow-lake" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={chartColors.gray} />
          </marker>
          {data.zones.map(zone => (
            <linearGradient key={zone.id} id={`gradient-${zone.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={zone.color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={zone.color} stopOpacity={0.05} />
            </linearGradient>
          ))}
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Sources Label */}
          <text x={sourceX + sourceWidth / 2} y={-25} textAnchor="middle" fontSize={11} fontWeight={600} fill={chartColors.charcoalLight}>
            Data Sources
          </text>

          {/* Consumers Label */}
          <text x={consumerX + consumerWidth / 2} y={-25} textAnchor="middle" fontSize={11} fontWeight={600} fill={chartColors.charcoalLight}>
            Consumers
          </text>

          {/* Sources */}
          {data.sources.map((source, i) => {
            const y = (i * (zoneHeight / data.sources.length)) + 20;
            const isHovered = hoveredSource === source.id;
            
            return (
              <g
                key={source.id}
                transform={`translate(${sourceX}, ${y})`}
                onMouseEnter={() => setHoveredSource(source.id)}
                onMouseLeave={() => setHoveredSource(null)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  width={sourceWidth}
                  height={45}
                  rx={8}
                  fill="white"
                  stroke={isHovered ? chartColors.teal : chartColors.light}
                  strokeWidth={isHovered ? 2 : 1}
                />
                <text x={12} y={18} fontSize={14}>{source.icon}</text>
                <text x={32} y={17} fontSize={9} fontWeight={600} fill={chartColors.charcoal}>
                  {source.name}
                </text>
                <text x={12} y={32} fontSize={7} fill={chartColors.gray}>
                  {source.type}
                </text>
                <text x={12} y={40} fontSize={7} fill={chartColors.gray}>
                  {source.format}
                </text>
              </g>
            );
          })}

          {/* Zone Connections (Source to Bronze) */}
          {data.sources.map((source, i) => {
            const sy = (i * (zoneHeight / data.sources.length)) + 42;
            const ey = zoneHeight / 2;
            
            return (
              <path
                key={`conn-${source.id}`}
                d={`M${sourceX + sourceWidth},${sy} L${zoneStartX - 5},${ey}`}
                fill="none"
                stroke={hoveredSource === source.id ? chartColors.teal : chartColors.secondary}
                strokeWidth={hoveredSource === source.id ? 2 : 1}
                strokeOpacity={0.5}
                markerEnd="url(#arrow-lake)"
              />
            );
          })}

          {/* Zones */}
          {data.zones.map((zone, i) => {
            const x = zoneStartX + i * (zoneWidth + gap);
            const isSelected = selectedZone === zone.id;
            
            return (
              <g
                key={zone.id}
                transform={`translate(${x}, 0)`}
                onClick={() => setSelectedZone(isSelected ? null : zone.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Zone Background */}
                <rect
                  width={zoneWidth}
                  height={zoneHeight}
                  rx={12}
                  fill={`url(#gradient-${zone.id})`}
                  stroke={zone.color}
                  strokeWidth={isSelected ? 3 : 2}
                  strokeOpacity={isSelected ? 1 : 0.6}
                />
                
                {/* Zone Header */}
                <rect
                  x={0}
                  y={0}
                  width={zoneWidth}
                  height={36}
                  rx={12}
                  fill={zone.color}
                />
                <rect
                  x={0}
                  y={18}
                  width={zoneWidth}
                  height={18}
                  fill={zone.color}
                />
                <text x={zoneWidth / 2} y={16} textAnchor="middle" fontSize={12} fontWeight={700} fill={zone.id === 'gold' ? chartColors.charcoal : 'white'}>
                  {zone.name}
                </text>
                <text x={zoneWidth / 2} y={30} textAnchor="middle" fontSize={9} fill={zone.id === 'gold' ? chartColors.charcoalLight : 'rgba(255,255,255,0.8)'}>
                  {zone.subtitle}
                </text>

                {/* Zone Content */}
                <text x={10} y={55} fontSize={8} fill={chartColors.charcoal} fontWeight={500}>
                  Characteristics:
                </text>
                {zone.characteristics.slice(0, 4).map((char, j) => (
                  <text key={j} x={10} y={68 + j * 12} fontSize={7} fill={chartColors.charcoalLight}>
                    • {char}
                  </text>
                ))}

                <text x={10} y={125} fontSize={8} fill={chartColors.charcoal} fontWeight={500}>
                  Sample Tables:
                </text>
                {zone.tables.slice(0, 4).map((table, j) => (
                  <text key={j} x={10} y={138 + j * 11} fontSize={7} fill={chartColors.gray} fontFamily="monospace">
                    {table}
                  </text>
                ))}

                {/* Zone Footer */}
                <line x1={10} x2={zoneWidth - 10} y1={zoneHeight - 50} y2={zoneHeight - 50} stroke={zone.color} strokeOpacity={0.3} />
                <text x={10} y={zoneHeight - 35} fontSize={7} fill={chartColors.gray}>
                  Storage: {zone.storage}
                </text>
                <text x={10} y={zoneHeight - 23} fontSize={7} fill={chartColors.gray}>
                  Retention: {zone.retention}
                </text>
                <text x={10} y={zoneHeight - 11} fontSize={7} fill={chartColors.gray}>
                  Access: {zone.access.split(',')[0]}
                </text>
              </g>
            );
          })}

          {/* Inter-zone arrows */}
          {[0, 1].map(i => {
            const x1 = zoneStartX + (i + 1) * (zoneWidth + gap) - gap;
            const x2 = zoneStartX + (i + 1) * (zoneWidth + gap);
            const y = zoneHeight / 2;
            
            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y}
                  x2={x2 - 5}
                  y2={y}
                  stroke={chartColors.charcoal}
                  strokeWidth={2}
                  markerEnd="url(#arrow-lake)"
                />
                <text x={(x1 + x2) / 2} y={y - 8} textAnchor="middle" fontSize={7} fill={chartColors.gray}>
                  {i === 0 ? 'Clean & Validate' : 'Aggregate & Enrich'}
                </text>
              </g>
            );
          })}

          {/* Gold to Consumers */}
          {data.consumers.map((consumer, i) => {
            const cy = (i * (zoneHeight / data.consumers.length)) + 40;
            const goldX = zoneStartX + 2 * (zoneWidth + gap) + zoneWidth;
            const gy = zoneHeight / 2;
            
            return (
              <path
                key={consumer.id}
                d={`M${goldX},${gy} L${consumerX - 5},${cy}`}
                fill="none"
                stroke={chartColors.secondary}
                strokeWidth={1}
                strokeOpacity={0.5}
                markerEnd="url(#arrow-lake)"
              />
            );
          })}

          {/* Consumers */}
          {data.consumers.map((consumer, i) => {
            const y = (i * (zoneHeight / data.consumers.length)) + 20;
            
            return (
              <g key={consumer.id} transform={`translate(${consumerX}, ${y})`}>
                <rect
                  width={consumerWidth}
                  height={40}
                  rx={8}
                  fill="white"
                  stroke={chartColors.light}
                />
                <text x={12} y={17} fontSize={14}>{consumer.icon}</text>
                <text x={35} y={17} fontSize={9} fontWeight={500} fill={chartColors.charcoal}>
                  {consumer.name}
                </text>
                <text x={12} y={30} fontSize={7} fill={chartColors.gray}>
                  from {consumer.zone}
                </text>
              </g>
            );
          })}

          {/* Governance Bar */}
          <g transform={`translate(${zoneStartX}, ${zoneHeight + 10})`}>
            <rect
              width={(zoneWidth + gap) * 3 - gap}
              height={24}
              rx={4}
              fill={chartColors.navy}
              fillOpacity={0.1}
              stroke={chartColors.navy}
              strokeDasharray="4,2"
            />
            <text x={10} y={16} fontSize={9} fill={chartColors.navy} fontWeight={500}>
              🔒 Governance: {data.governance.catalog} • {data.governance.quality} • {data.governance.lineage}
            </text>
          </g>
        </g>
      </svg>

      {/* Zone Details Panel */}
      {selectedZone && (
        <div style={{ 
          marginTop: '16px',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '10px',
          border: `2px solid ${data.zones.find(z => z.id === selectedZone)?.color}`,
        }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '8px' }}>
                {data.zones.find(z => z.id === selectedZone)?.name} Zone Details
              </div>
              <p style={{ fontSize: '11px', color: chartColors.charcoalLight, margin: 0 }}>
                {data.zones.find(z => z.id === selectedZone)?.description}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: data.zones.find(z => z.id === selectedZone)?.color }}>
                  {data.zones.find(z => z.id === selectedZone)?.tables.length}
                </div>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>Tables</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>
                  {data.zones.find(z => z.id === selectedZone)?.retention}
                </div>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>Retention</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tech Stack */}
      <div style={{ 
        marginTop: '12px',
        padding: '12px',
        backgroundColor: chartColors.light,
        borderRadius: '8px',
        fontSize: '10px',
        color: chartColors.charcoalLight
      }}>
        <strong style={{ color: chartColors.primary }}>Tech Stack:</strong>
        <span style={{ marginLeft: '8px' }}>
          Databricks • Delta Lake • Apache Spark • Unity Catalog • Great Expectations • dbt • Airflow
        </span>
      </div>
    </div>
  );
};

export default DataLakeMedallion;
