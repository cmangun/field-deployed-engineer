"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// ML Experiment Tracker data
const defaultData = {
  projectName: 'Churn Prediction Model',
  totalRuns: 156,
  bestRun: 'run-142',
  experiments: [
    {
      id: 'run-142',
      name: 'XGBoost + Feature Engineering v3',
      status: 'completed',
      startedAt: '2024-11-15 14:32',
      duration: '2h 15m',
      author: 'Sarah Chen',
      tags: ['production-candidate', 'feature-eng', 'xgboost'],
      params: {
        model: 'XGBoost',
        n_estimators: 500,
        max_depth: 8,
        learning_rate: 0.05,
        subsample: 0.8,
        colsample_bytree: 0.8,
        features: 47,
      },
      metrics: {
        auc_roc: 0.892,
        precision: 0.823,
        recall: 0.761,
        f1: 0.791,
        accuracy: 0.847,
        log_loss: 0.312,
      },
      best: true,
    },
    {
      id: 'run-141',
      name: 'LightGBM Baseline',
      status: 'completed',
      startedAt: '2024-11-15 12:18',
      duration: '1h 42m',
      author: 'Mike Johnson',
      tags: ['baseline', 'lightgbm'],
      params: {
        model: 'LightGBM',
        n_estimators: 400,
        max_depth: 6,
        learning_rate: 0.1,
        subsample: 0.9,
        colsample_bytree: 0.9,
        features: 35,
      },
      metrics: {
        auc_roc: 0.871,
        precision: 0.798,
        recall: 0.742,
        f1: 0.769,
        accuracy: 0.831,
        log_loss: 0.345,
      },
      best: false,
    },
    {
      id: 'run-140',
      name: 'Neural Network Experiment',
      status: 'completed',
      startedAt: '2024-11-14 16:45',
      duration: '4h 30m',
      author: 'David Park',
      tags: ['deep-learning', 'experimental'],
      params: {
        model: 'MLP',
        hidden_layers: '128-64-32',
        dropout: 0.3,
        learning_rate: 0.001,
        batch_size: 256,
        epochs: 100,
        features: 47,
      },
      metrics: {
        auc_roc: 0.856,
        precision: 0.782,
        recall: 0.758,
        f1: 0.770,
        accuracy: 0.822,
        log_loss: 0.378,
      },
      best: false,
    },
    {
      id: 'run-139',
      name: 'Random Forest + SMOTE',
      status: 'completed',
      startedAt: '2024-11-14 10:22',
      duration: '3h 12m',
      author: 'Sarah Chen',
      tags: ['imbalanced', 'random-forest'],
      params: {
        model: 'RandomForest',
        n_estimators: 300,
        max_depth: 10,
        min_samples_split: 5,
        smote: true,
        features: 35,
      },
      metrics: {
        auc_roc: 0.845,
        precision: 0.756,
        recall: 0.812,
        f1: 0.783,
        accuracy: 0.815,
        log_loss: 0.402,
      },
      best: false,
    },
    {
      id: 'run-138',
      name: 'Logistic Regression Baseline',
      status: 'completed',
      startedAt: '2024-11-13 09:15',
      duration: '25m',
      author: 'Mike Johnson',
      tags: ['baseline', 'interpretable'],
      params: {
        model: 'LogisticRegression',
        regularization: 'L2',
        C: 1.0,
        solver: 'lbfgs',
        features: 20,
      },
      metrics: {
        auc_roc: 0.782,
        precision: 0.712,
        recall: 0.698,
        f1: 0.705,
        accuracy: 0.768,
        log_loss: 0.485,
      },
      best: false,
    },
    {
      id: 'run-143',
      name: 'Hyperparameter Sweep',
      status: 'running',
      startedAt: '2024-11-16 08:00',
      duration: '6h 22m (running)',
      author: 'Sarah Chen',
      tags: ['hyperopt', 'sweep'],
      params: {
        model: 'XGBoost',
        n_estimators: '100-1000',
        max_depth: '4-12',
        learning_rate: '0.01-0.3',
        sweep_trials: 50,
        features: 47,
      },
      metrics: {
        auc_roc: 0.887,
        precision: null,
        recall: null,
        f1: null,
        accuracy: null,
        log_loss: null,
      },
      best: false,
      progress: 72,
    },
  ],
  comparisonMetrics: ['auc_roc', 'precision', 'recall', 'f1'],
};

const statusConfig: Record<string, { color: string; bg: string; icon: string }> = {
  completed: { color: chartColors.primary, bg: chartColors.light, icon: '✓' },
  running: { color: chartColors.navy, bg: chartColors.light, icon: '⟳' },
  failed: { color: chartColors.dark, bg: chartColors.light, icon: '✗' },
  queued: { color: chartColors.secondary, bg: chartColors.light, icon: '⏳' },
};

interface MLExperimentTrackerProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const MLExperimentTracker: React.FC<MLExperimentTrackerProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "ML Experiment Tracker"
}) => {
  const [selectedRuns, setSelectedRuns] = useState<string[]>([data.bestRun]);
  const [viewMode, setViewMode] = useState<'list' | 'compare' | 'chart'>('list');
  const [sortBy, setSortBy] = useState<string>('auc_roc');

  const toggleRunSelection = (runId: string) => {
    if (selectedRuns.includes(runId)) {
      setSelectedRuns(selectedRuns.filter(r => r !== runId));
    } else if (selectedRuns.length < 4) {
      setSelectedRuns([...selectedRuns, runId]);
    }
  };

  const sortedExperiments = [...data.experiments].sort((a, b) => {
    const aVal = a.metrics[sortBy as keyof typeof a.metrics] || 0;
    const bVal = b.metrics[sortBy as keyof typeof b.metrics] || 0;
    return (bVal as number) - (aVal as number);
  });

  const getMetricColor = (metric: string, value: number, allValues: number[]) => {
    const max = Math.max(...allValues.filter(v => v !== null));
    const min = Math.min(...allValues.filter(v => v !== null));
    const range = max - min;
    const normalized = range > 0 ? (value - min) / range : 0.5;
    
    if (metric === 'log_loss') {
      // Lower is better for log_loss
      if (normalized <= 0.33) return chartColors.primary;
      if (normalized <= 0.66) return chartColors.secondary;
      return chartColors.dark;
    }
    // Higher is better for other metrics
    if (normalized >= 0.66) return chartColors.primary;
    if (normalized >= 0.33) return chartColors.secondary;
    return chartColors.dark;
  };

  const selectedExperiments = data.experiments.filter(e => selectedRuns.includes(e.id));

  return (
    <div style={{ width: '100%' }}>
      {/* Sort Controls */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
        <span style={{ fontSize: '10px', color: chartColors.gray }}>Sort by:</span>
        {data.comparisonMetrics.map((metric) => (
          <button
            key={metric}
            onClick={() => setSortBy(metric)}
            style={{
              padding: '3px 8px',
              fontSize: '9px',
              backgroundColor: sortBy === metric ? chartColors.light : 'white',
              color: sortBy === metric ? chartColors.primary : chartColors.gray,
              border: `1px solid ${sortBy === metric ? chartColors.primary : chartColors.light}`,
              borderRadius: '4px',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            {metric.replace('_', ' ')}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '9px', color: chartColors.gray }}>
          {selectedRuns.length}/4 selected for comparison
        </span>
      </div>

      {viewMode === 'list' && (
        <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
          {sortedExperiments.map((exp) => {
            const status = statusConfig[exp.status];
            const isSelected = selectedRuns.includes(exp.id);
            
            return (
              <div
                key={exp.id}
                onClick={() => toggleRunSelection(exp.id)}
                style={{
                  padding: '12px',
                  backgroundColor: isSelected ? chartColors.light : 'white',
                  borderRadius: '10px',
                  border: `2px solid ${exp.best ? chartColors.primary : isSelected ? chartColors.teal : chartColors.light}`,
                  marginBottom: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  position: 'relative'
                }}
              >
                {exp.best && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '12px',
                    padding: '2px 8px',
                    backgroundColor: chartColors.primary,
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '9px',
                    fontWeight: 600
                  }}>
                    🏆 BEST
                  </div>
                )}
                
                {/* Run Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        padding: '2px 6px',
                        backgroundColor: status.bg,
                        color: status.color,
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 600
                      }}>
                        {status.icon} {exp.status}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>{exp.name}</span>
                    </div>
                    <div style={{ fontSize: '9px', color: chartColors.gray, marginTop: '4px' }}>
                      {exp.id} • {exp.author} • {exp.startedAt} • {exp.duration}
                    </div>
                  </div>
                  
                  {/* Primary Metric */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.teal }}>
                      {exp.metrics.auc_roc?.toFixed(3) || '—'}
                    </div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>AUC-ROC</div>
                  </div>
                </div>
                
                {/* Tags */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  {exp.tags.map((tag) => (
                    <span key={tag} style={{
                      padding: '2px 6px',
                      backgroundColor: chartColors.light,
                      color: chartColors.charcoalLight,
                      borderRadius: '4px',
                      fontSize: '9px'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Metrics Row */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  {Object.entries(exp.metrics).filter(([k]) => k !== 'auc_roc').map(([metric, value]) => {
                    const allValues = data.experiments.map(e => e.metrics[metric as keyof typeof e.metrics] as number);
                    return (
                      <div key={metric} style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: value !== null ? getMetricColor(metric, value as number, allValues) : chartColors.gray
                        }}>
                          {value !== null ? (value as number).toFixed(3) : '—'}
                        </div>
                        <div style={{ fontSize: '8px', color: chartColors.gray, textTransform: 'uppercase' }}>
                          {metric.replace('_', ' ')}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Progress bar for running experiments */}
                {exp.progress && (
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '2px' }}>
                      <span style={{ color: chartColors.gray }}>Progress</span>
                      <span style={{ color: chartColors.navy, fontWeight: 600 }}>{exp.progress}%</span>
                    </div>
                    <div style={{ height: '4px', backgroundColor: chartColors.light, borderRadius: '2px' }}>
                      <div style={{
                        width: `${exp.progress}%`,
                        height: '100%',
                        backgroundColor: chartColors.navy,
                        borderRadius: '2px'
                      }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'compare' && selectedExperiments.length > 0 && (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: `1px solid ${chartColors.light}`, overflow: 'hidden' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, padding: '12px' }}>
            SIDE-BY-SIDE COMPARISON
          </div>
          
          {/* Metrics Comparison */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `120px repeat(${selectedExperiments.length}, 1fr)`,
            gap: '1px',
            backgroundColor: chartColors.light,
            fontSize: '10px'
          }}>
            {/* Header */}
            <div style={{ padding: '8px', backgroundColor: chartColors.background, fontWeight: 600 }}>Metric</div>
            {selectedExperiments.map((exp) => (
              <div key={exp.id} style={{ padding: '8px', backgroundColor: exp.best ? chartColors.light : chartColors.background, fontWeight: 600, textAlign: 'center' }}>
                {exp.name.split(' ')[0]}
                {exp.best && ' 🏆'}
              </div>
            ))}
            
            {/* Metrics Rows */}
            {['auc_roc', 'precision', 'recall', 'f1', 'accuracy', 'log_loss'].map((metric) => {
              const values = selectedExperiments.map(e => e.metrics[metric as keyof typeof e.metrics] as number);
              const best = metric === 'log_loss' ? Math.min(...values.filter(v => v !== null)) : Math.max(...values.filter(v => v !== null));
              
              return (
                <React.Fragment key={metric}>
                  <div style={{ padding: '10px 8px', backgroundColor: 'white', textTransform: 'uppercase', color: chartColors.gray }}>
                    {metric.replace('_', ' ')}
                  </div>
                  {selectedExperiments.map((exp) => {
                    const value = exp.metrics[metric as keyof typeof exp.metrics];
                    const isBest = value === best;
                    return (
                      <div key={exp.id} style={{
                        padding: '10px 8px',
                        backgroundColor: isBest ? chartColors.light : 'white',
                        textAlign: 'center',
                        fontWeight: isBest ? 700 : 400,
                        color: isBest ? chartColors.primary : chartColors.charcoal
                      }}>
                        {value !== null ? (value as number).toFixed(3) : '—'}
                        {isBest && ' ★'}
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
            
            {/* Params Section */}
            <div style={{ padding: '8px', backgroundColor: chartColors.background, fontWeight: 600, gridColumn: `span ${selectedExperiments.length + 1}` }}>
              Parameters
            </div>
            
            {['model', 'n_estimators', 'max_depth', 'learning_rate', 'features'].map((param) => (
              <React.Fragment key={param}>
                <div style={{ padding: '10px 8px', backgroundColor: 'white', color: chartColors.gray }}>
                  {param.replace('_', ' ')}
                </div>
                {selectedExperiments.map((exp) => {
                  const value = exp.params[param as keyof typeof exp.params];
                  return (
                    <div key={exp.id} style={{ padding: '10px 8px', backgroundColor: 'white', textAlign: 'center' }}>
                      {value !== undefined ? String(value) : '—'}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'chart' && (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
            METRIC COMPARISON CHART
          </div>
          
          {/* Bar Chart */}
          <svg width={width - 80} height={280}>
            {data.comparisonMetrics.map((metric, metricIndex) => {
              const barHeight = 16;
              const groupHeight = selectedExperiments.length * (barHeight + 4) + 20;
              const y = metricIndex * groupHeight + 30;
              
              return (
                <g key={metric}>
                  {/* Metric Label */}
                  <text x={0} y={y} fontSize={10} fill={chartColors.charcoalLight} fontWeight={600}>
                    {metric.replace('_', ' ').toUpperCase()}
                  </text>
                  
                  {/* Bars */}
                  {selectedExperiments.map((exp, expIndex) => {
                    const value = exp.metrics[metric as keyof typeof exp.metrics] as number;
                    const maxVal = Math.max(...selectedExperiments.map(e => e.metrics[metric as keyof typeof e.metrics] as number || 0));
                    const barWidth = value ? (value / maxVal) * (width - 200) : 0;
                    const barY = y + 8 + expIndex * (barHeight + 4);
                    const colors = [chartColors.primary, chartColors.navy, chartColors.secondary, chartColors.dark];
                    
                    return (
                      <g key={exp.id}>
                        <rect
                          x={80}
                          y={barY}
                          width={barWidth}
                          height={barHeight}
                          fill={colors[expIndex % colors.length]}
                          rx={3}
                        />
                        <text x={85 + barWidth} y={barY + 12} fontSize={10} fill={chartColors.charcoal} fontWeight={600}>
                          {value?.toFixed(3) || '—'}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
          
          {/* Legend */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px', justifyContent: 'center' }}>
            {selectedExperiments.map((exp, i) => {
              const colors = [chartColors.primary, chartColors.navy, chartColors.secondary, chartColors.dark];
              return (
                <div key={exp.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: colors[i % colors.length], borderRadius: '3px' }} />
                  <span style={{ fontSize: '10px', color: chartColors.charcoal }}>{exp.name.split(' ')[0]}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === 'compare' && selectedExperiments.length === 0 && (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          backgroundColor: chartColors.background,
          borderRadius: '8px',
          color: chartColors.gray
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
          <div style={{ fontSize: '12px' }}>Select runs from the list to compare</div>
        </div>
      )}
    </div>
  );
};

export default MLExperimentTracker;
