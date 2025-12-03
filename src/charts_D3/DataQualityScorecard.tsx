"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample data quality scorecard
const defaultData = {
  overall: 87,
  dimensions: [
    { name: 'Completeness', score: 94, target: 95, trend: 'up' as const },
    { name: 'Accuracy', score: 88, target: 90, trend: 'up' as const },
    { name: 'Consistency', score: 82, target: 85, trend: 'down' as const },
    { name: 'Timeliness', score: 91, target: 90, trend: 'stable' as const },
    { name: 'Uniqueness', score: 78, target: 80, trend: 'up' as const },
    { name: 'Validity', score: 85, target: 88, trend: 'stable' as const },
  ],
  issues: [
    { severity: 'critical', count: 3, description: 'Missing primary keys' },
    { severity: 'warning', count: 12, description: 'Inconsistent date formats' },
    { severity: 'info', count: 28, description: 'Optional fields empty' },
  ]
};

interface DataQualityScorecardProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const DataQualityScorecard: React.FC<DataQualityScorecardProps> = ({
  data = defaultData,
  width = 700,
  height = 380,
  title = "Data Quality Scorecard"
}) => {
  const [hoveredDimension, setHoveredDimension] = useState<number | null>(null);

  const getScoreColor = (score: number, target: number) => {
    if (score >= target) return chartColors.teal;
    if (score >= target - 5) return chartColors.orange;
    return chartColors.dark;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return chartColors.teal;
      case 'down': return chartColors.dark;
      default: return chartColors.gray;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return chartColors.dark;
      case 'warning': return chartColors.orange;
      default: return chartColors.gray;
    }
  };

  const overallColor = data.overall >= 85 ? chartColors.teal : 
                       data.overall >= 70 ? chartColors.orange : chartColors.dark;

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      

      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '24px' }}>
        {/* Overall Score */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          backgroundColor: chartColors.background,
          borderRadius: '12px'
        }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%',
            border: `8px solid ${overallColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white'
          }}>
            <span style={{ fontSize: '32px', fontWeight: 700, color: overallColor }}>
              {data.overall}
            </span>
          </div>
          <div style={{ marginTop: '12px', fontSize: '14px', fontWeight: 600, color: chartColors.charcoal }}>
            Overall Score
          </div>
          <div style={{ fontSize: '11px', color: chartColors.gray }}>
            {data.overall >= 85 ? 'Excellent' : data.overall >= 70 ? 'Good' : 'Needs Improvement'}
          </div>
        </div>

        {/* Dimensions */}
        <div>
          {data.dimensions.map((dim, i) => {
            const isHovered = hoveredDimension === i;
            const color = getScoreColor(dim.score, dim.target);
            const progressWidth = `${dim.score}%`;
            
            return (
              <div 
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr 80px',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 12px',
                  marginBottom: '8px',
                  backgroundColor: isHovered ? chartColors.background : 'transparent',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={() => setHoveredDimension(i)}
                onMouseLeave={() => setHoveredDimension(null)}
              >
                <span style={{ 
                  fontSize: '12px', 
                  fontWeight: isHovered ? 600 : 400,
                  color: isHovered ? chartColors.charcoal : chartColors.charcoalLight
                }}>
                  {dim.name}
                </span>
                
                <div style={{ position: 'relative', height: '20px' }}>
                  {/* Background bar */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '8px',
                    top: '6px',
                    backgroundColor: chartColors.light,
                    borderRadius: '4px'
                  }} />
                  
                  {/* Progress bar */}
                  <div style={{
                    position: 'absolute',
                    width: progressWidth,
                    height: '8px',
                    top: '6px',
                    backgroundColor: color,
                    borderRadius: '4px',
                    transition: 'width 0.3s'
                  }} />
                  
                  {/* Target marker */}
                  <div style={{
                    position: 'absolute',
                    left: `${dim.target}%`,
                    top: '2px',
                    width: '2px',
                    height: '16px',
                    backgroundColor: chartColors.charcoal
                  }} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: 600,
                    color
                  }}>
                    {dim.score}%
                  </span>
                  <span style={{ 
                    fontSize: '12px',
                    color: getTrendColor(dim.trend)
                  }}>
                    {getTrendIcon(dim.trend)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Issues Summary */}
      <div style={{ 
        marginTop: '20px',
        padding: '16px',
        backgroundColor: chartColors.background,
        borderRadius: '12px'
      }}>
        <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '12px', color: chartColors.charcoal }}>
          Active Issues
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          {data.issues.map((issue, i) => (
            <div 
              key={i}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '8px',
                borderLeft: `4px solid ${getSeverityColor(issue.severity)}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ 
                  fontSize: '20px', 
                  fontWeight: 700,
                  color: getSeverityColor(issue.severity)
                }}>
                  {issue.count}
                </span>
                <span style={{ 
                  fontSize: '10px', 
                  textTransform: 'uppercase',
                  color: getSeverityColor(issue.severity),
                  fontWeight: 600
                }}>
                  {issue.severity}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: chartColors.gray }}>
                {issue.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        gap: '20px',
        fontSize: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '2px', height: '12px', backgroundColor: chartColors.charcoal }} />
          <span style={{ color: chartColors.gray }}>Target</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: chartColors.teal }}>↑</span>
          <span style={{ color: chartColors.gray }}>Improving</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: chartColors.dark }}>↓</span>
          <span style={{ color: chartColors.gray }}>Declining</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: chartColors.gray }}>→</span>
          <span style={{ color: chartColors.gray }}>Stable</span>
        </div>
      </div>
    </div>
  );
};

export default DataQualityScorecard;
