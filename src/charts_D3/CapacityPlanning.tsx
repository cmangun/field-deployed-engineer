"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Capacity Planning data
const defaultData = {
  environment: 'Production',
  lastUpdated: '5 min ago',
  forecastDays: 90,
  resources: [
    {
      id: 'cpu',
      name: 'CPU',
      icon: '🔲',
      unit: 'cores',
      current: 68,
      allocated: 256,
      limit: 320,
      trend: [55, 58, 62, 65, 68, 70, 73, 76, 79, 82, 85, 88],
      forecast: [68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112],
      threshold: { warning: 70, critical: 85 },
      costPerUnit: 0.048,
    },
    {
      id: 'memory',
      name: 'Memory',
      icon: '💾',
      unit: 'GB',
      current: 78,
      allocated: 512,
      limit: 640,
      trend: [65, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88],
      forecast: [78, 81, 84, 87, 90, 93, 96, 99, 102, 105, 108, 111],
      threshold: { warning: 75, critical: 90 },
      costPerUnit: 0.005,
    },
    {
      id: 'storage',
      name: 'Storage',
      icon: '💿',
      unit: 'TB',
      current: 42,
      allocated: 10,
      limit: 20,
      trend: [32, 34, 35, 37, 38, 39, 40, 41, 42, 43, 44, 45],
      forecast: [42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64],
      threshold: { warning: 60, critical: 80 },
      costPerUnit: 0.023,
    },
    {
      id: 'network',
      name: 'Network',
      icon: '🌐',
      unit: 'Gbps',
      current: 35,
      allocated: 10,
      limit: 25,
      trend: [25, 27, 28, 30, 31, 32, 33, 34, 35, 36, 37, 38],
      forecast: [35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68],
      threshold: { warning: 60, critical: 80 },
      costPerUnit: 0.09,
    },
    {
      id: 'pods',
      name: 'K8s Pods',
      icon: '📦',
      unit: 'pods',
      current: 145,
      allocated: 200,
      limit: 250,
      trend: [120, 125, 128, 132, 136, 139, 142, 145, 148, 151, 154, 157],
      forecast: [145, 152, 159, 166, 173, 180, 187, 194, 201, 208, 215, 222],
      threshold: { warning: 70, critical: 85 },
      costPerUnit: 0,
    },
  ],
  recommendations: [
    { resource: 'CPU', action: 'Scale Up', urgency: 'medium', daysUntilThreshold: 45, additionalUnits: 64 },
    { resource: 'Memory', action: 'Scale Up', urgency: 'high', daysUntilThreshold: 28, additionalUnits: 128 },
    { resource: 'Storage', action: 'Monitor', urgency: 'low', daysUntilThreshold: 90, additionalUnits: 0 },
    { resource: 'Network', action: 'Scale Up', urgency: 'critical', daysUntilThreshold: 14, additionalUnits: 10 },
  ],
  costProjection: {
    current: 12450,
    projected: 18200,
    optimized: 15800,
  },
};

const getUtilizationColor = (percent: number, thresholds: { warning: number; critical: number }) => {
  if (percent >= thresholds.critical) return chartColors.dark;
  if (percent >= thresholds.warning) return chartColors.secondary;
  return chartColors.primary;
};

const urgencyConfig: Record<string, { color: string; bg: string }> = {
  critical: { color: chartColors.dark, bg: chartColors.light },
  high: { color: chartColors.secondary, bg: chartColors.light },
  medium: { color: chartColors.secondary, bg: chartColors.light },
  low: { color: chartColors.primary, bg: chartColors.light },
};

interface CapacityPlanningProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const CapacityPlanning: React.FC<CapacityPlanningProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Capacity Planning"
}) => {
  const [selectedResource, setSelectedResource] = useState<string | null>('cpu');
  const [viewMode, setViewMode] = useState<'overview' | 'forecast' | 'recommendations'>('overview');

  const chartWidth = width - 120;

  return (
    <div style={{ width: '100%' }}>
      {/* Resource Cards */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto' }}>
        {data.resources.map((resource) => {
          const utilizationPercent = (resource.current / resource.limit) * 100;
          const color = getUtilizationColor(utilizationPercent, resource.threshold);
          const isSelected = selectedResource === resource.id;
          
          return (
            <div
              key={resource.id}
              onClick={() => setSelectedResource(isSelected ? null : resource.id)}
              style={{
                minWidth: '110px',
                padding: '12px',
                backgroundColor: isSelected ? `${color}10` : 'white',
                borderRadius: '10px',
                border: `2px solid ${isSelected ? color : chartColors.light}`,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span style={{ fontSize: '16px' }}>{resource.icon}</span>
                <span style={{ fontSize: '10px', fontWeight: 600, color: chartColors.charcoal }}>{resource.name}</span>
              </div>
              
              <div style={{ fontSize: '20px', fontWeight: 700, color }}>{Math.round(utilizationPercent)}%</div>
              <div style={{ fontSize: '9px', color: chartColors.gray }}>
                {resource.current} / {resource.limit} {resource.unit}
              </div>
              
              {/* Mini progress bar */}
              <div style={{ marginTop: '8px', height: '4px', backgroundColor: chartColors.light, borderRadius: '2px' }}>
                <div style={{
                  width: `${utilizationPercent}%`,
                  height: '100%',
                  backgroundColor: color,
                  borderRadius: '2px'
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {viewMode === 'overview' && selectedResource && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
          {(() => {
            const resource = data.resources.find(r => r.id === selectedResource);
            if (!resource) return null;
            
            const utilizationPercent = (resource.current / resource.limit) * 100;
            const color = getUtilizationColor(utilizationPercent, resource.threshold);
            const maxVal = Math.max(...resource.trend, ...resource.forecast);
            
            return (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: chartColors.charcoal }}>
                    {resource.icon} {resource.name} Utilization
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '10px' }}>
                    <div>
                      <span style={{ color: chartColors.gray }}>Allocated: </span>
                      <span style={{ fontWeight: 600 }}>{resource.allocated} {resource.unit}</span>
                    </div>
                    <div>
                      <span style={{ color: chartColors.gray }}>Limit: </span>
                      <span style={{ fontWeight: 600 }}>{resource.limit} {resource.unit}</span>
                    </div>
                    {resource.costPerUnit > 0 && (
                      <div>
                        <span style={{ color: chartColors.gray }}>Cost: </span>
                        <span style={{ fontWeight: 600 }}>${resource.costPerUnit}/{resource.unit}/hr</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Utilization Chart */}
                <svg width={chartWidth} height={150}>
                  {/* Threshold lines */}
                  <line
                    x1={40}
                    y1={130 - (resource.threshold.warning / 100) * 120}
                    x2={chartWidth}
                    y2={130 - (resource.threshold.warning / 100) * 120}
                    stroke={chartColors.secondary}
                    strokeDasharray="4,4"
                    strokeWidth={1}
                  />
                  <line
                    x1={40}
                    y1={130 - (resource.threshold.critical / 100) * 120}
                    x2={chartWidth}
                    y2={130 - (resource.threshold.critical / 100) * 120}
                    stroke={chartColors.dark}
                    strokeDasharray="4,4"
                    strokeWidth={1}
                  />
                  
                  {/* Historical trend */}
                  <path
                    d={resource.trend.map((v, i) => {
                      const x = 40 + (i / (resource.trend.length - 1)) * (chartWidth / 2 - 60);
                      const y = 130 - (v / maxVal) * 100;
                      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke={chartColors.teal}
                    strokeWidth={2}
                  />
                  
                  {/* Forecast */}
                  <path
                    d={resource.forecast.map((v, i) => {
                      const x = (chartWidth / 2) + (i / (resource.forecast.length - 1)) * (chartWidth / 2 - 40);
                      const y = 130 - (v / maxVal) * 100;
                      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                    strokeDasharray="6,3"
                  />
                  
                  {/* Current marker */}
                  <circle
                    cx={chartWidth / 2}
                    cy={130 - (resource.current / maxVal) * 100}
                    r={6}
                    fill={chartColors.teal}
                    stroke="white"
                    strokeWidth={2}
                  />
                  
                  {/* Labels */}
                  <text x={40} y={145} fontSize={9} fill={chartColors.gray}>-12w</text>
                  <text x={chartWidth / 2} y={145} fontSize={9} fill={chartColors.charcoal} fontWeight={600}>Now</text>
                  <text x={chartWidth - 20} y={145} fontSize={9} fill={chartColors.gray}>+12w</text>
                  
                  {/* Y-axis */}
                  <text x={35} y={15} textAnchor="end" fontSize={8} fill={chartColors.gray}>100%</text>
                  <text x={35} y={130} textAnchor="end" fontSize={8} fill={chartColors.gray}>0%</text>
                </svg>
                
                {/* Legend */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '9px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '16px', height: '2px', backgroundColor: chartColors.teal }} />
                    <span style={{ color: chartColors.gray }}>Historical</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '16px', height: '2px', backgroundColor: color, borderStyle: 'dashed' }} />
                    <span style={{ color: chartColors.gray }}>Forecast</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '16px', height: '2px', backgroundColor: chartColors.secondary, borderStyle: 'dashed' }} />
                    <span style={{ color: chartColors.gray }}>Warning ({resource.threshold.warning}%)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '16px', height: '2px', backgroundColor: chartColors.dark, borderStyle: 'dashed' }} />
                    <span style={{ color: chartColors.gray }}>Critical ({resource.threshold.critical}%)</span>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {viewMode === 'forecast' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {data.resources.map((resource) => {
            const currentPercent = (resource.current / resource.limit) * 100;
            const forecastEnd = resource.forecast[resource.forecast.length - 1];
            const forecastPercent = (forecastEnd / resource.limit) * 100;
            const color = getUtilizationColor(forecastPercent, resource.threshold);
            
            return (
              <div key={resource.id} style={{
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '10px',
                border: `1px solid ${forecastPercent >= resource.threshold.warning ? color : chartColors.light}`,
                borderLeft: `4px solid ${color}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>
                      {resource.icon} {resource.name}
                    </div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>
                      {data.forecastDays}-day projection
                    </div>
                  </div>
                  <div style={{
                    padding: '4px 8px',
                    backgroundColor: `${color}20`,
                    color: color,
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {Math.round(forecastPercent)}%
                  </div>
                </div>
                
                {/* Comparison */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>Current</div>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: chartColors.teal }}>{resource.current}</div>
                    <div style={{ fontSize: '8px', color: chartColors.gray }}>{resource.unit}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>Projected</div>
                    <div style={{ fontSize: '16px', fontWeight: 600, color }}>
                      {forecastEnd}
                      <span style={{ fontSize: '10px', marginLeft: '4px' }}>
                        (+{Math.round(((forecastEnd - resource.current) / resource.current) * 100)}%)
                      </span>
                    </div>
                    <div style={{ fontSize: '8px', color: chartColors.gray }}>{resource.unit}</div>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div style={{ position: 'relative', height: '8px', backgroundColor: chartColors.light, borderRadius: '4px' }}>
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    width: `${currentPercent}%`,
                    height: '100%',
                    backgroundColor: chartColors.teal,
                    borderRadius: '4px 0 0 4px'
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: `${currentPercent}%`,
                    width: `${forecastPercent - currentPercent}%`,
                    height: '100%',
                    backgroundColor: `${color}60`,
                    borderRadius: '0 4px 4px 0',
                    borderLeft: '2px dashed white'
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'recommendations' && (
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
            SCALING RECOMMENDATIONS
          </div>
          
          {data.recommendations.sort((a, b) => {
            const order = { critical: 0, high: 1, medium: 2, low: 3 };
            return order[a.urgency as keyof typeof order] - order[b.urgency as keyof typeof order];
          }).map((rec, i) => {
            const config = urgencyConfig[rec.urgency];
            return (
              <div key={i} style={{
                padding: '12px',
                backgroundColor: config.bg,
                borderRadius: '10px',
                marginBottom: '8px',
                borderLeft: `4px solid ${config.color}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>{rec.resource}</span>
                      <span style={{
                        padding: '2px 8px',
                        backgroundColor: config.color,
                        color: 'white',
                        borderRadius: '4px',
                        fontSize: '9px',
                        fontWeight: 600,
                        textTransform: 'uppercase'
                      }}>
                        {rec.urgency}
                      </span>
                    </div>
                    <div style={{ fontSize: '10px', color: chartColors.charcoalLight }}>
                      {rec.action} • {rec.daysUntilThreshold} days until threshold
                    </div>
                  </div>
                  {rec.additionalUnits > 0 && (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: config.color }}>+{rec.additionalUnits}</div>
                      <div style={{ fontSize: '9px', color: chartColors.gray }}>units needed</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* Cost Projection */}
          <div style={{
            marginTop: '16px',
            padding: '16px',
            backgroundColor: chartColors.background,
            borderRadius: '10px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              MONTHLY COST PROJECTION
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.charcoal }}>${data.costProjection.current.toLocaleString()}</div>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>Current</div>
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.dark }}>${data.costProjection.projected.toLocaleString()}</div>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>If Scaled (Projected)</div>
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>${data.costProjection.optimized.toLocaleString()}</div>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>Optimized Option</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CapacityPlanning;
