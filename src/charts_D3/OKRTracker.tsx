"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// OKR Tracker data
const defaultData = {
  period: 'Q4 2024',
  company: 'DataFlow AI',
  overallProgress: 72,
  objectives: [
    {
      id: 'obj-1',
      title: 'Accelerate Enterprise Revenue Growth',
      owner: 'Sarah Chen',
      ownerRole: 'CRO',
      icon: '💰',
      color: chartColors.primary,
      confidence: 85,
      keyResults: [
        { id: 'kr-1-1', title: 'Achieve $8M in new ARR', current: 6.2, target: 8, unit: '$M', status: 'on-track' },
        { id: 'kr-1-2', title: 'Close 12 Enterprise deals (>$100K)', current: 9, target: 12, unit: 'deals', status: 'on-track' },
        { id: 'kr-1-3', title: 'Reduce sales cycle to 45 days', current: 52, target: 45, unit: 'days', status: 'at-risk', inverse: true },
        { id: 'kr-1-4', title: 'Expand NRR to 125%', current: 118, target: 125, unit: '%', status: 'behind' },
      ],
    },
    {
      id: 'obj-2',
      title: 'Launch Self-Serve Product Tier',
      owner: 'Mike Johnson',
      ownerRole: 'CPO',
      icon: '🚀',
      color: chartColors.navy,
      confidence: 70,
      keyResults: [
        { id: 'kr-2-1', title: 'Ship PLG onboarding flow', current: 100, target: 100, unit: '%', status: 'complete' },
        { id: 'kr-2-2', title: 'Acquire 500 self-serve signups', current: 342, target: 500, unit: 'signups', status: 'on-track' },
        { id: 'kr-2-3', title: 'Convert 10% to paid', current: 6.8, target: 10, unit: '%', status: 'at-risk' },
        { id: 'kr-2-4', title: 'Achieve <2min time-to-value', current: 3.2, target: 2, unit: 'min', status: 'behind', inverse: true },
      ],
    },
    {
      id: 'obj-3',
      title: 'Scale Platform Reliability',
      owner: 'David Park',
      ownerRole: 'CTO',
      icon: '⚡',
      color: chartColors.primary,
      confidence: 90,
      keyResults: [
        { id: 'kr-3-1', title: 'Maintain 99.95% uptime', current: 99.97, target: 99.95, unit: '%', status: 'complete' },
        { id: 'kr-3-2', title: 'Reduce p99 latency to <100ms', current: 87, target: 100, unit: 'ms', status: 'complete', inverse: true },
        { id: 'kr-3-3', title: 'Zero Sev-1 incidents', current: 1, target: 0, unit: 'incidents', status: 'at-risk', inverse: true },
        { id: 'kr-3-4', title: 'Achieve SOC2 Type II cert', current: 85, target: 100, unit: '%', status: 'on-track' },
      ],
    },
    {
      id: 'obj-4',
      title: 'Build World-Class Team',
      owner: 'Lisa Wong',
      ownerRole: 'CHRO',
      icon: '👥',
      color: chartColors.secondary,
      confidence: 75,
      keyResults: [
        { id: 'kr-4-1', title: 'Hire 15 engineers', current: 11, target: 15, unit: 'hires', status: 'on-track' },
        { id: 'kr-4-2', title: 'Achieve eNPS >50', current: 42, target: 50, unit: 'score', status: 'at-risk' },
        { id: 'kr-4-3', title: 'Reduce attrition to <10%', current: 12, target: 10, unit: '%', status: 'at-risk', inverse: true },
        { id: 'kr-4-4', title: 'Complete 100% manager training', current: 78, target: 100, unit: '%', status: 'on-track' },
      ],
    },
  ],
};

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  'complete': { color: chartColors.primary, bg: chartColors.light, label: 'Complete' },
  'on-track': { color: chartColors.primary, bg: chartColors.light, label: 'On Track' },
  'at-risk': { color: chartColors.secondary, bg: chartColors.light, label: 'At Risk' },
  'behind': { color: chartColors.dark, bg: chartColors.light, label: 'Behind' },
};

interface OKRTrackerProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const OKRTracker: React.FC<OKRTrackerProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "OKR Tracker"
}) => {
  const [expandedObjective, setExpandedObjective] = useState<string | null>(data.objectives[0].id);
  const [viewMode, setViewMode] = useState<'progress' | 'confidence'>('progress');

  const calculateProgress = (kr: typeof data.objectives[0]['keyResults'][0]) => {
    if (kr.inverse) {
      // For inverse metrics (lower is better), calculate differently
      const improvement = (kr.target - kr.current) / kr.target;
      return Math.max(0, Math.min(100, 100 - (improvement * 100)));
    }
    return Math.min(100, (kr.current / kr.target) * 100);
  };

  const getObjectiveProgress = (obj: typeof data.objectives[0]) => {
    const total = obj.keyResults.reduce((sum, kr) => sum + calculateProgress(kr), 0);
    return Math.round(total / obj.keyResults.length);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Status Summary */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = data.objectives.flatMap(o => o.keyResults).filter(kr => kr.status === status).length;
          return (
            <div key={status} style={{
              flex: 1,
              padding: '8px',
              backgroundColor: config.bg,
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: config.color }}>{count}</div>
              <div style={{ fontSize: '9px', color: config.color }}>{config.label}</div>
            </div>
          );
        })}
      </div>

      {/* Objectives */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.objectives.map((obj) => {
          const isExpanded = expandedObjective === obj.id;
          const progress = getObjectiveProgress(obj);
          
          return (
            <div
              key={obj.id}
              style={{
                borderRadius: '10px',
                border: `2px solid ${isExpanded ? obj.color : chartColors.light}`,
                overflow: 'hidden',
                transition: 'all 0.15s'
              }}
            >
              {/* Objective Header */}
              <div
                onClick={() => setExpandedObjective(isExpanded ? null : obj.id)}
                style={{
                  padding: '12px',
                  backgroundColor: isExpanded ? `${obj.color}10` : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <span style={{ fontSize: '20px' }}>{obj.icon}</span>
                
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>
                    {obj.title}
                  </div>
                  <div style={{ fontSize: '10px', color: chartColors.gray }}>
                    {obj.owner} • {obj.ownerRole}
                  </div>
                </div>

                {viewMode === 'progress' ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '80px', height: '8px', backgroundColor: chartColors.light, borderRadius: '4px' }}>
                      <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: obj.color,
                        borderRadius: '4px',
                        transition: 'width 0.3s'
                      }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: obj.color, width: '36px' }}>
                      {progress}%
                    </span>
                  </div>
                ) : (
                  <div style={{
                    padding: '4px 10px',
                    backgroundColor: obj.confidence >= 80 ? chartColors.light : obj.confidence >= 60 ? chartColors.light : chartColors.light,
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: obj.confidence >= 80 ? chartColors.navy : obj.confidence >= 60 ? chartColors.dark : chartColors.dark
                  }}>
                    {obj.confidence}% confident
                  </div>
                )}

                <span style={{ 
                  fontSize: '12px', 
                  color: chartColors.gray,
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }}>
                  ▼
                </span>
              </div>

              {/* Key Results */}
              {isExpanded && (
                <div style={{ padding: '0 12px 12px' }}>
                  {obj.keyResults.map((kr, i) => {
                    const krProgress = calculateProgress(kr);
                    const status = statusConfig[kr.status];
                    
                    return (
                      <div
                        key={kr.id}
                        style={{
                          padding: '10px',
                          backgroundColor: chartColors.background,
                          borderRadius: '6px',
                          marginTop: '8px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1 }}>
                            <span style={{ 
                              fontSize: '10px', 
                              color: chartColors.gray,
                              backgroundColor: chartColors.light,
                              padding: '2px 6px',
                              borderRadius: '4px'
                            }}>
                              KR{i + 1}
                            </span>
                            <span style={{ fontSize: '11px', color: chartColors.charcoal }}>
                              {kr.title}
                            </span>
                          </div>
                          
                          <span style={{
                            padding: '2px 8px',
                            backgroundColor: status.bg,
                            color: status.color,
                            borderRadius: '4px',
                            fontSize: '9px',
                            fontWeight: 600
                          }}>
                            {status.label}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ flex: 1, height: '6px', backgroundColor: chartColors.light, borderRadius: '3px' }}>
                            <div style={{
                              width: `${krProgress}%`,
                              height: '100%',
                              backgroundColor: status.color,
                              borderRadius: '3px'
                            }} />
                          </div>
                          
                          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal, minWidth: '100px', textAlign: 'right' }}>
                            {kr.current}{kr.unit !== '%' ? kr.unit : '%'} / {kr.target}{kr.unit !== '%' ? kr.unit : '%'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
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
        {Object.entries(statusConfig).map(([status, config]) => (
          <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: config.color }} />
            <span>{config.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OKRTracker;
