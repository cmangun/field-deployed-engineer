"use client";
import React, { useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// NEUMORPHIC TOKENS — Aligned with _chart-card.scss
// Single source of truth for soft UI styling
// ═══════════════════════════════════════════════════════════════════════════════
const neumorphic = {
  // Card surface
  card: {
    background: 'linear-gradient(225deg, #dadada, #ffffff)',
    borderRadius: '12px',
    boxShadow: '-5px 5px 20px #c6c6c6, 5px -5px 20px #ffffff',
  },
  // Inset (pressed) surface
  inset: {
    background: 'linear-gradient(225deg, #e6e6e6, #f0f0f0)',
    boxShadow: 'inset -3px 3px 10px #c6c6c6, inset 3px -3px 10px #ffffff',
  },
  // Button extruded
  buttonExtruded: {
    background: 'linear-gradient(225deg, #ffffff, #e8e8eb)',
    boxShadow: '-3px 3px 10px #c6c6c6, 3px -3px 10px #ffffff',
  },
  // Button pressed
  buttonPressed: {
    background: 'linear-gradient(225deg, #e0e0e3, #f5f5f7)',
    boxShadow: 'inset 3px 3px 6px #d1d1d4, inset -3px -3px 6px #ffffff',
  },
  // Content well
  contentWell: {
    background: '#fafafa',
    borderRadius: '12px',
    border: '1px solid #e8e8e8',
    boxShadow: 'inset 2px 2px 8px rgba(0,0,0,0.03), inset -2px -2px 8px rgba(255,255,255,0.8)',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// TYPOGRAPHY TOKENS — Consistent text styling
// ═══════════════════════════════════════════════════════════════════════════════
const typography = {
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#111111',
    lineHeight: 1.25,
  },
  subtitle: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#5a5a5a',
  },
  description: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#555555',
    lineHeight: 1.6,
  },
} as const;

interface CollapsibleChartProps {
  title: string;
  subtitle?: string;
  description?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const CollapsibleChart: React.FC<CollapsibleChartProps> = ({
  title,
  subtitle,
  description,
  children,
  defaultExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div style={{
      ...neumorphic.card,
      overflow: 'hidden',
      transition: 'all 0.3s ease',
    }}>
      {/* Header Bar - Always Visible */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 28px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          gap: '20px',
        }}
      >
        {/* Title & Description */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            marginBottom: isExpanded ? '6px' : (description ? '8px' : 0),
          }}>
            <h3 style={{
              margin: 0,
              ...typography.title,
              transition: 'font-size 0.3s ease',
            }}>
              {title}
            </h3>
            {subtitle && (
              <span style={typography.subtitle}>
                {subtitle}
              </span>
            )}
          </div>
          
          {/* Description - shown when collapsed */}
          {!isExpanded && description && (
            <p style={{
              margin: 0,
              ...typography.description,
              maxWidth: '60%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
            }}>
              {description}
            </p>
          )}
        </div>

        {/* Toggle Button — Neumorphic */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            border: 'none',
            ...(isExpanded ? neumorphic.buttonPressed : neumorphic.buttonExtruded),
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.25s ease',
            flexShrink: 0,
          }}
        >
          <span style={{
            fontSize: '24px',
            fontWeight: 300,
            color: isExpanded ? '#888' : '#444',
            transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease, color 0.3s ease',
            lineHeight: 1,
          }}>
            +
          </span>
        </button>
      </div>

      {/* Expandable Content */}
      <div style={{
        maxHeight: isExpanded ? '4000px' : '0',
        opacity: isExpanded ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.5s ease, opacity 0.3s ease',
        padding: isExpanded ? '0 28px 28px 28px' : '0 28px',
      }}>
        <div style={{
          ...neumorphic.contentWell,
          padding: '24px',
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleChart;
