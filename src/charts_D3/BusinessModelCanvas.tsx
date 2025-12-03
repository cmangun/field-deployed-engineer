"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Business Model Canvas data
const defaultData = {
  company: 'DataFlow AI',
  tagline: 'Enterprise ML Platform',
  blocks: {
    keyPartners: {
      title: 'Key Partners',
      icon: '🤝',
      color: chartColors.navy,
      items: [
        { text: 'Cloud providers (AWS, GCP, Azure)', type: 'partner' },
        { text: 'Data labeling services', type: 'partner' },
        { text: 'System integrators', type: 'partner' },
        { text: 'Academic research labs', type: 'partner' },
      ]
    },
    keyActivities: {
      title: 'Key Activities',
      icon: '⚙️',
      color: chartColors.navy,
      items: [
        { text: 'Platform development', type: 'activity' },
        { text: 'ML model optimization', type: 'activity' },
        { text: 'Customer success', type: 'activity' },
        { text: 'Security & compliance', type: 'activity' },
      ]
    },
    keyResources: {
      title: 'Key Resources',
      icon: '🔑',
      color: chartColors.cyan,
      items: [
        { text: 'Engineering team (45)', type: 'resource' },
        { text: 'Proprietary ML models', type: 'resource' },
        { text: 'GPU compute clusters', type: 'resource' },
        { text: 'Customer data moats', type: 'resource' },
      ]
    },
    valuePropositions: {
      title: 'Value Propositions',
      icon: '💎',
      color: chartColors.primary,
      items: [
        { text: '10x faster model deployment', type: 'value', highlight: true },
        { text: 'No-code ML for analysts', type: 'value', highlight: true },
        { text: 'Enterprise-grade security', type: 'value' },
        { text: 'Unified data lineage', type: 'value' },
      ]
    },
    customerRelationships: {
      title: 'Customer Relationships',
      icon: '💬',
      color: chartColors.primary,
      items: [
        { text: 'Dedicated CSM for Enterprise', type: 'relationship' },
        { text: 'Self-serve for SMB', type: 'relationship' },
        { text: 'Community forums', type: 'relationship' },
        { text: '24/7 technical support', type: 'relationship' },
      ]
    },
    channels: {
      title: 'Channels',
      icon: '📢',
      color: chartColors.secondary,
      items: [
        { text: 'Direct sales (Enterprise)', type: 'channel' },
        { text: 'Product-led growth', type: 'channel' },
        { text: 'Partner marketplace', type: 'channel' },
        { text: 'Conference presence', type: 'channel' },
      ]
    },
    customerSegments: {
      title: 'Customer Segments',
      icon: '👥',
      color: chartColors.dark,
      items: [
        { text: 'Enterprise (Fortune 500)', type: 'segment', highlight: true },
        { text: 'Mid-market tech companies', type: 'segment' },
        { text: 'Financial services', type: 'segment' },
        { text: 'Healthcare / Life Sciences', type: 'segment' },
      ]
    },
    costStructure: {
      title: 'Cost Structure',
      icon: '💸',
      color: chartColors.muted,
      items: [
        { text: 'Cloud infrastructure (42%)', type: 'cost', metric: 42 },
        { text: 'R&D / Engineering (35%)', type: 'cost', metric: 35 },
        { text: 'Sales & Marketing (15%)', type: 'cost', metric: 15 },
        { text: 'G&A (8%)', type: 'cost', metric: 8 },
      ]
    },
    revenueStreams: {
      title: 'Revenue Streams',
      icon: '💰',
      color: chartColors.primary,
      items: [
        { text: 'Platform subscription (70%)', type: 'revenue', metric: 70 },
        { text: 'Professional services (20%)', type: 'revenue', metric: 20 },
        { text: 'Training & certification (10%)', type: 'revenue', metric: 10 },
      ]
    },
  },
  metrics: {
    arr: '$24M',
    customers: 156,
    nrr: '125%',
    runway: '18 mo',
  }
};

interface BusinessModelCanvasProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const BusinessModelCanvas: React.FC<BusinessModelCanvasProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Business Model Canvas"
}) => {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  const blocks = data.blocks;

  const renderBlock = (key: string, block: typeof blocks.keyPartners, style: React.CSSProperties) => {
    const isHovered = hoveredBlock === key;
    const isSelected = selectedBlock === key;
    
    return (
      <div
        key={key}
        onMouseEnter={() => setHoveredBlock(key)}
        onMouseLeave={() => setHoveredBlock(null)}
        onClick={() => setSelectedBlock(isSelected ? null : key)}
        style={{
          ...style,
          backgroundColor: isSelected ? `${block.color}15` : isHovered ? `${block.color}08` : 'white',
          border: `2px solid ${isSelected ? block.color : chartColors.light}`,
          borderRadius: '8px',
          padding: '10px',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px' }}>{block.icon}</span>
          <span style={{ 
            fontSize: '10px', 
            fontWeight: 600, 
            color: block.color,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {block.title}
          </span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {block.items.map((item, i) => (
            <div 
              key={i}
              style={{
                fontSize: '9px',
                color: chartColors.charcoal,
                padding: '4px 6px',
                backgroundColor: item.highlight ? `${block.color}20` : chartColors.background,
                borderRadius: '4px',
                borderLeft: item.highlight ? `2px solid ${block.color}` : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{item.text}</span>
              {item.metric && (
                <span style={{ 
                  fontWeight: 600, 
                  color: block.color,
                  fontSize: '9px'
                }}>
                  {item.metric}%
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Canvas Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        gap: '8px',
        height: height - 80,
      }}>
        {/* Row 1-2: Key Partners */}
        {renderBlock('keyPartners', blocks.keyPartners, {
          gridColumn: '1',
          gridRow: '1 / 3',
        })}
        
        {/* Row 1: Key Activities */}
        {renderBlock('keyActivities', blocks.keyActivities, {
          gridColumn: '2',
          gridRow: '1',
        })}
        
        {/* Row 2: Key Resources */}
        {renderBlock('keyResources', blocks.keyResources, {
          gridColumn: '2',
          gridRow: '2',
        })}
        
        {/* Row 1-2: Value Propositions (center) */}
        {renderBlock('valuePropositions', blocks.valuePropositions, {
          gridColumn: '3',
          gridRow: '1 / 3',
        })}
        
        {/* Row 1: Customer Relationships */}
        {renderBlock('customerRelationships', blocks.customerRelationships, {
          gridColumn: '4',
          gridRow: '1',
        })}
        
        {/* Row 2: Channels */}
        {renderBlock('channels', blocks.channels, {
          gridColumn: '4',
          gridRow: '2',
        })}
        
        {/* Row 1-2: Customer Segments */}
        {renderBlock('customerSegments', blocks.customerSegments, {
          gridColumn: '5',
          gridRow: '1 / 3',
        })}
        
        {/* Row 3-4: Cost Structure */}
        {renderBlock('costStructure', blocks.costStructure, {
          gridColumn: '1 / 3',
          gridRow: '3 / 5',
        })}
        
        {/* Row 3-4: Revenue Streams */}
        {renderBlock('revenueStreams', blocks.revenueStreams, {
          gridColumn: '4 / 6',
          gridRow: '3 / 5',
        })}
        
        {/* Center bottom - Company logo/name placeholder */}
        <div style={{
          gridColumn: '3',
          gridRow: '3 / 5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: chartColors.background,
          borderRadius: '8px',
          border: `2px dashed ${chartColors.light}`,
        }}>
          <div style={{ fontSize: '24px', marginBottom: '4px' }}>🚀</div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: chartColors.charcoal }}>{data.company}</div>
          <div style={{ fontSize: '9px', color: chartColors.gray }}>{data.tagline}</div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        justifyContent: 'center',
        gap: '16px',
        fontSize: '9px',
        color: chartColors.gray
      }}>
        <span>Click any block to highlight • Highlighted items show strategic priorities</span>
      </div>
    </div>
  );
};

export default BusinessModelCanvas;
