"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Sample CI/CD pipeline data
const defaultData = {
  pipelines: [
    {
      id: 'main-1234',
      branch: 'main',
      commit: 'feat: Add user authentication flow',
      author: 'Sarah Chen',
      avatar: 'SC',
      status: 'success' as const,
      startedAt: '2 min ago',
      duration: '4m 32s',
      stages: [
        { name: 'Build', status: 'success' as const, duration: '1m 12s' },
        { name: 'Test', status: 'success' as const, duration: '2m 05s' },
        { name: 'Security', status: 'success' as const, duration: '45s' },
        { name: 'Deploy', status: 'success' as const, duration: '30s' },
      ]
    },
    {
      id: 'main-1233',
      branch: 'main',
      commit: 'fix: Resolve memory leak in WebSocket handler',
      author: 'Mike Johnson',
      avatar: 'MJ',
      status: 'running' as const,
      startedAt: '5 min ago',
      duration: '3m 15s',
      stages: [
        { name: 'Build', status: 'success' as const, duration: '1m 08s' },
        { name: 'Test', status: 'success' as const, duration: '1m 52s' },
        { name: 'Security', status: 'running' as const, duration: '15s' },
        { name: 'Deploy', status: 'pending' as const, duration: '-' },
      ]
    },
    {
      id: 'feature-auth-42',
      branch: 'feature/oauth-integration',
      commit: 'Add OAuth2 provider configuration',
      author: 'Alex Rivera',
      avatar: 'AR',
      status: 'failed' as const,
      startedAt: '12 min ago',
      duration: '2m 48s',
      stages: [
        { name: 'Build', status: 'success' as const, duration: '1m 15s' },
        { name: 'Test', status: 'failed' as const, duration: '1m 33s', error: '3 tests failed' },
        { name: 'Security', status: 'skipped' as const, duration: '-' },
        { name: 'Deploy', status: 'skipped' as const, duration: '-' },
      ]
    },
    {
      id: 'main-1232',
      branch: 'main',
      commit: 'chore: Update dependencies',
      author: 'Sarah Chen',
      avatar: 'SC',
      status: 'success' as const,
      startedAt: '45 min ago',
      duration: '4m 18s',
      stages: [
        { name: 'Build', status: 'success' as const, duration: '1m 22s' },
        { name: 'Test', status: 'success' as const, duration: '1m 48s' },
        { name: 'Security', status: 'success' as const, duration: '38s' },
        { name: 'Deploy', status: 'success' as const, duration: '30s' },
      ]
    },
  ],
  stats: {
    successRate: 87.5,
    avgDuration: '4m 12s',
    deploysToday: 12,
    failedToday: 2,
  },
  // Last 7 days deployment frequency
  deployHistory: [
    { day: 'Mon', success: 8, failed: 1 },
    { day: 'Tue', success: 12, failed: 2 },
    { day: 'Wed', success: 6, failed: 0 },
    { day: 'Thu', success: 15, failed: 3 },
    { day: 'Fri', success: 10, failed: 1 },
    { day: 'Sat', success: 2, failed: 0 },
    { day: 'Sun', success: 3, failed: 1 },
  ]
};

const statusConfig = {
  success: { color: chartColors.primary, bgColor: chartColors.light, label: 'Success', icon: '✓' },
  running: { color: chartColors.navy, bgColor: chartColors.light, label: 'Running', icon: '◐' },
  failed: { color: chartColors.dark, bgColor: chartColors.light, label: 'Failed', icon: '✕' },
  pending: { color: chartColors.gray, bgColor: chartColors.background, label: 'Pending', icon: '○' },
  skipped: { color: chartColors.gray, bgColor: chartColors.background, label: 'Skipped', icon: '–' },
};

interface CICDPipelineProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const CICDPipeline: React.FC<CICDPipelineProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "CI/CD Pipeline Status"
}) => {
  const [expandedPipeline, setExpandedPipeline] = useState<string | null>(data.pipelines[0].id);
  const [hoveredStage, setHoveredStage] = useState<{ pipelineId: string; stageName: string } | null>(null);

  // Chart dimensions for deploy history
  const chartWidth = 200;
  const chartHeight = 80;
  const barWidth = (chartWidth / data.deployHistory.length) * 0.7;
  const barGap = (chartWidth / data.deployHistory.length) * 0.3;
  const maxDeploys = Math.max(...data.deployHistory.map(d => d.success + d.failed));

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '20px' }}>
        {/* Pipeline List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.pipelines.map((pipeline) => {
            const status = statusConfig[pipeline.status];
            const isExpanded = expandedPipeline === pipeline.id;
            
            return (
              <div
                key={pipeline.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  border: `1px solid ${isExpanded ? status.color : chartColors.light}`,
                  overflow: 'hidden',
                  transition: 'all 0.2s'
                }}
              >
                {/* Pipeline Header */}
                <div
                  onClick={() => setExpandedPipeline(isExpanded ? null : pipeline.id)}
                  style={{
                    padding: '14px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: isExpanded ? status.bgColor : 'white'
                  }}
                >
                  {/* Status Icon */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: status.color,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 700
                  }}>
                    {pipeline.status === 'running' ? (
                      <span style={{ animation: 'spin 1s linear infinite' }}>◐</span>
                    ) : status.icon}
                  </div>
                  
                  {/* Pipeline Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>
                        {pipeline.branch}
                      </span>
                      <span style={{ fontSize: '10px', color: chartColors.gray }}>#{pipeline.id}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: chartColors.charcoalLight, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {pipeline.commit}
                    </div>
                  </div>
                  
                  {/* Author & Time */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      backgroundColor: chartColors.navy,
                      color: 'white',
                      fontSize: '9px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: 'auto',
                      marginBottom: '2px'
                    }}>
                      {pipeline.avatar}
                    </div>
                    <div style={{ fontSize: '10px', color: chartColors.gray }}>{pipeline.startedAt}</div>
                  </div>
                  
                  {/* Duration */}
                  <div style={{ textAlign: 'right', minWidth: '60px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>{pipeline.duration}</div>
                    <div style={{ fontSize: '10px', color: chartColors.gray }}>duration</div>
                  </div>
                </div>
                
                {/* Expanded Stage View */}
                {isExpanded && (
                  <div style={{ padding: '16px', borderTop: `1px solid ${chartColors.light}`, backgroundColor: chartColors.background }}>
                    {/* Stage Progress */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                      {pipeline.stages.map((stage, i) => {
                        const stageStatus = statusConfig[stage.status];
                        const isHovered = hoveredStage?.pipelineId === pipeline.id && hoveredStage?.stageName === stage.name;
                        
                        return (
                          <React.Fragment key={stage.name}>
                            <div
                              onMouseEnter={() => setHoveredStage({ pipelineId: pipeline.id, stageName: stage.name })}
                              onMouseLeave={() => setHoveredStage(null)}
                              style={{
                                flex: 1,
                                height: '8px',
                                backgroundColor: stageStatus.color,
                                borderRadius: '4px',
                                opacity: stage.status === 'pending' || stage.status === 'skipped' ? 0.3 : 1,
                                position: 'relative',
                                cursor: 'pointer',
                                transform: isHovered ? 'scaleY(1.5)' : 'scaleY(1)',
                                transition: 'transform 0.2s'
                              }}
                            >
                              {stage.status === 'running' && (
                                <div style={{
                                  position: 'absolute',
                                  left: 0,
                                  top: 0,
                                  height: '100%',
                                  width: '50%',
                                  backgroundColor: 'white',
                                  opacity: 0.3,
                                  borderRadius: '4px',
                                  animation: 'pulse 1.5s ease-in-out infinite'
                                }} />
                              )}
                            </div>
                            {i < pipeline.stages.length - 1 && (
                              <div style={{ width: '8px', height: '2px', backgroundColor: chartColors.secondary }} />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                    
                    {/* Stage Details */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                      {pipeline.stages.map((stage) => {
                        const stageStatus = statusConfig[stage.status];
                        const isHovered = hoveredStage?.pipelineId === pipeline.id && hoveredStage?.stageName === stage.name;
                        
                        return (
                          <div
                            key={stage.name}
                            onMouseEnter={() => setHoveredStage({ pipelineId: pipeline.id, stageName: stage.name })}
                            onMouseLeave={() => setHoveredStage(null)}
                            style={{
                              padding: '10px',
                              backgroundColor: isHovered ? stageStatus.bgColor : 'white',
                              borderRadius: '8px',
                              border: `1px solid ${isHovered ? stageStatus.color : chartColors.light}`,
                              transition: 'all 0.2s'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                              <span style={{ color: stageStatus.color, fontSize: '12px' }}>{stageStatus.icon}</span>
                              <span style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>{stage.name}</span>
                            </div>
                            <div style={{ fontSize: '10px', color: chartColors.gray }}>{stage.duration}</div>
                            {stage.error && (
                              <div style={{ fontSize: '9px', color: chartColors.dark, marginTop: '4px' }}>{stage.error}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Deploy Frequency Chart */}
          <div style={{ 
            padding: '16px', 
            backgroundColor: 'white', 
            borderRadius: '10px',
            border: `1px solid ${chartColors.light}`
          }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '12px' }}>
              Deployments (Last 7 Days)
            </div>
            <svg width={chartWidth} height={chartHeight} style={{ display: 'block' }}>
              {data.deployHistory.map((day, i) => {
                const x = i * (barWidth + barGap) + barGap / 2;
                const successHeight = (day.success / maxDeploys) * (chartHeight - 20);
                const failedHeight = (day.failed / maxDeploys) * (chartHeight - 20);
                
                return (
                  <g key={i}>
                    {/* Success bar */}
                    <rect
                      x={x}
                      y={chartHeight - 20 - successHeight}
                      width={barWidth}
                      height={successHeight}
                      fill={chartColors.primary}
                      rx={3}
                    />
                    {/* Failed bar (stacked) */}
                    <rect
                      x={x}
                      y={chartHeight - 20 - successHeight - failedHeight}
                      width={barWidth}
                      height={failedHeight}
                      fill={chartColors.dark}
                      rx={3}
                    />
                    {/* Day label */}
                    <text
                      x={x + barWidth / 2}
                      y={chartHeight - 5}
                      textAnchor="middle"
                      fontSize={9}
                      fill={chartColors.gray}
                    >
                      {day.day}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px', fontSize: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: chartColors.primary, borderRadius: '2px' }} />
                <span style={{ color: chartColors.gray }}>Success</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: chartColors.dark, borderRadius: '2px' }} />
                <span style={{ color: chartColors.gray }}>Failed</span>
              </div>
            </div>
          </div>

          {/* Stage Legend */}
          <div style={{ 
            padding: '16px', 
            backgroundColor: 'white', 
            borderRadius: '10px',
            border: `1px solid ${chartColors.light}`
          }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '12px' }}>
              Pipeline Stages
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Build', 'Test', 'Security', 'Deploy'].map((stage, i) => (
                <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ 
                    width: '20px', 
                    height: '20px', 
                    borderRadius: '50%',
                    backgroundColor: chartColors.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 600,
                    color: chartColors.charcoalLight
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: '11px', color: chartColors.charcoalLight }}>{stage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ 
            padding: '16px', 
            backgroundColor: 'white', 
            borderRadius: '10px',
            border: `1px solid ${chartColors.light}`
          }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '12px' }}>
              Quick Actions
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button style={{
                padding: '10px',
                backgroundColor: chartColors.navy,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 500,
                cursor: 'pointer'
              }}>
                🚀 Trigger Deploy
              </button>
              <button style={{
                padding: '10px',
                backgroundColor: chartColors.light,
                color: chartColors.charcoalLight,
                border: 'none',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 500,
                cursor: 'pointer'
              }}>
                ↻ Retry Failed
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default CICDPipeline;
