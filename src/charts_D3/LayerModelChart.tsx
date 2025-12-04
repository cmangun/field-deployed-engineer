// src/charts_D3/LayerModelChart.tsx
// ═══════════════════════════════════════════════════════════════════════════════
// LAYER MODEL CHART — Architecture Stack Visualization
// Displays a 7-layer architecture model with expandable details
// ═══════════════════════════════════════════════════════════════════════════════

"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface Layer {
  id: string;
  number: number;
  title: string;
  bullets: string[];
  whyItExists: string;
}

interface LayerModelData {
  title?: string;
  subtitle?: string;
  layers: Layer[];
}

interface LayerModelChartProps {
  data: LayerModelData;
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════════

const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#fafafa',
    borderRadius: '12px',
    padding: '24px',
    maxHeight: '650px',
    overflowY: 'auto' as const,
  },
  header: {
    marginBottom: '20px',
    borderBottom: `2px solid ${chartColors.charcoal}`,
    paddingBottom: '16px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    color: chartColors.charcoal,
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    color: chartColors.gray,
    marginTop: '6px',
    lineHeight: 1.5,
  },
  layerContainer: {
    marginBottom: '12px',
  },
  layerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    backgroundColor: chartColors.charcoal,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  layerNumber: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    color: chartColors.charcoal,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '16px',
    flexShrink: 0,
  },
  layerTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#fff',
    flex: 1,
  },
  expandIcon: {
    color: '#fff',
    fontSize: '16px',
    transition: 'transform 0.2s ease',
  },
  layerContent: {
    padding: '16px 20px',
    backgroundColor: '#fff',
    borderRadius: '0 0 8px 8px',
    border: `1px solid ${chartColors.light}`,
    borderTop: 'none',
  },
  bulletList: {
    margin: '0 0 16px 0',
    padding: '0 0 0 20px',
    listStyle: 'none',
  },
  bullet: {
    fontSize: '13px',
    color: chartColors.charcoal,
    lineHeight: 1.6,
    position: 'relative' as const,
    paddingLeft: '14px',
    marginBottom: '6px',
  },
  bulletDot: {
    position: 'absolute' as const,
    left: 0,
    top: '8px',
    width: '5px',
    height: '5px',
    backgroundColor: chartColors.gray,
    borderRadius: '50%',
  },
  whySection: {
    backgroundColor: 'rgba(13, 148, 136, 0.08)',
    borderRadius: '6px',
    padding: '12px 14px',
    borderLeft: '3px solid #0d9488',
  },
  whyLabel: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#0d9488',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginBottom: '4px',
  },
  whyText: {
    fontSize: '13px',
    color: chartColors.charcoal,
    lineHeight: 1.55,
    margin: 0,
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const LayerModelChart: React.FC<LayerModelChartProps> = ({ data }) => {
  const [expandedLayers, setExpandedLayers] = useState<Set<string>>(new Set(['layer-1']));

  const toggleLayer = (layerId: string) => {
    setExpandedLayers(prev => {
      const next = new Set(prev);
      if (next.has(layerId)) {
        next.delete(layerId);
      } else {
        next.add(layerId);
      }
      return next;
    });
  };

  if (!data?.layers?.length) {
    return <div style={styles.container}>No layer model data available</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>{data.title || 'Layer Model'}</h3>
        {data.subtitle && <p style={styles.subtitle}>{data.subtitle}</p>}
      </div>

      {data.layers.map((layer) => {
        const isExpanded = expandedLayers.has(layer.id);
        return (
          <div key={layer.id} style={styles.layerContainer}>
            <div
              style={{
                ...styles.layerHeader,
                borderRadius: isExpanded ? '8px 8px 0 0' : '8px',
              }}
              onClick={() => toggleLayer(layer.id)}
            >
              <div style={styles.layerNumber}>{layer.number}</div>
              <div style={styles.layerTitle}>{layer.title}</div>
              <span
                style={{
                  ...styles.expandIcon,
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                ▼
              </span>
            </div>

            {isExpanded && (
              <div style={styles.layerContent}>
                <ul style={styles.bulletList}>
                  {layer.bullets.map((bullet, idx) => (
                    <li key={idx} style={styles.bullet}>
                      <span style={styles.bulletDot} />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div style={styles.whySection}>
                  <div style={styles.whyLabel}>Why it exists</div>
                  <p style={styles.whyText}>{layer.whyItExists}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LayerModelChart;
