"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Model Card data (following Google's Model Card framework)
const defaultData = {
  model: {
    name: 'ChurnPredictor-v2.3',
    version: '2.3.0',
    type: 'Binary Classification',
    framework: 'XGBoost',
    lastUpdated: '2024-11-15',
    owner: 'ML Platform Team',
    status: 'Production',
  },
  intendedUse: {
    primaryUse: 'Predict customer churn probability for proactive retention campaigns',
    users: ['Marketing Analytics', 'Customer Success', 'Product'],
    outOfScope: [
      'Individual customer credit decisions',
      'Automated account termination',
      'Use without human review for high-stakes decisions',
    ],
  },
  performance: {
    metrics: [
      { name: 'AUC-ROC', value: 0.89, target: 0.85, status: 'pass' },
      { name: 'Precision', value: 0.82, target: 0.80, status: 'pass' },
      { name: 'Recall', value: 0.76, target: 0.75, status: 'pass' },
      { name: 'F1 Score', value: 0.79, target: 0.77, status: 'pass' },
      { name: 'Accuracy', value: 0.84, target: 0.80, status: 'pass' },
    ],
    slices: [
      { name: 'Enterprise', auc: 0.91, samples: 12500 },
      { name: 'SMB', auc: 0.87, samples: 45200 },
      { name: 'Startup', auc: 0.85, samples: 8300 },
      { name: 'New (<6mo)', auc: 0.82, samples: 15600 },
      { name: 'Mature (>2yr)', auc: 0.92, samples: 22400 },
    ],
  },
  fairness: {
    protectedAttributes: ['company_size', 'industry', 'geography'],
    metrics: [
      { group: 'Large Enterprise', fpr: 0.12, fnr: 0.18, samples: 8500 },
      { group: 'Mid-Market', fpr: 0.14, fnr: 0.21, samples: 24300 },
      { group: 'Small Business', fpr: 0.15, fnr: 0.24, samples: 33200 },
    ],
    findings: [
      { severity: 'low', text: 'Slightly higher FNR for small businesses (24% vs 18%)' },
      { severity: 'info', text: 'No significant geographic bias detected' },
    ],
  },
  training: {
    dataSize: '156,000 customers',
    dateRange: 'Jan 2022 - Oct 2024',
    features: 47,
    targetVariable: 'churned_within_90_days',
    samplingStrategy: 'Stratified by segment',
    trainTestSplit: '80/20',
  },
  features: [
    { name: 'days_since_last_login', importance: 0.18, category: 'engagement' },
    { name: 'support_tickets_90d', importance: 0.14, category: 'support' },
    { name: 'feature_adoption_score', importance: 0.12, category: 'engagement' },
    { name: 'contract_remaining_days', importance: 0.11, category: 'contract' },
    { name: 'nps_score', importance: 0.09, category: 'sentiment' },
    { name: 'monthly_active_users', importance: 0.08, category: 'usage' },
    { name: 'payment_failures_6mo', importance: 0.07, category: 'billing' },
    { name: 'competitor_mentions', importance: 0.06, category: 'sentiment' },
  ],
  limitations: [
    'Model performance degrades for customers with <30 days history',
    'Does not account for macroeconomic factors (e.g., recession)',
    'Requires retraining quarterly to maintain accuracy',
    'Limited data on enterprise segment may affect predictions',
  ],
  ethicalConsiderations: [
    'Predictions should not be used to discriminate in service quality',
    'Human review required before any retention offer decisions',
    'Customers have right to explanation under GDPR',
  ],
  deployment: {
    endpoint: 'ml-api.internal/v2/churn-predict',
    latency: '45ms p99',
    throughput: '1,200 req/s',
    monitoring: 'Datadog + custom drift detection',
  },
};

interface ModelCardProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const ModelCard: React.FC<ModelCardProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "ML Model Card"
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'fairness' | 'features'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'performance', label: 'Performance' },
    { id: 'fairness', label: 'Fairness' },
    { id: 'features', label: 'Features' },
  ];

  // Section header style
  const sectionHeader = {
    fontSize: '11px',
    fontWeight: 700,
    color: chartColors.charcoal,
    marginBottom: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  };

  // Card style
  const cardStyle = {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    border: `1px solid ${chartColors.light}`,
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '20px', 
        borderBottom: `1px solid ${chartColors.light}`, 
        paddingBottom: '12px' 
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            style={{
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: activeTab === tab.id ? 600 : 500,
              backgroundColor: activeTab === tab.id ? chartColors.charcoal : 'transparent',
              color: activeTab === tab.id ? 'white' : chartColors.gray,
              border: activeTab === tab.id ? 'none' : `1px solid ${chartColors.light}`,
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ minHeight: height - 120 }}>
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Intended Use */}
            <div style={cardStyle}>
              <div style={sectionHeader}>Intended Use</div>
              <div style={{ fontSize: '13px', color: chartColors.charcoal, marginBottom: '12px', lineHeight: 1.5 }}>
                {data.intendedUse.primaryUse}
              </div>
              <div style={{ fontSize: '12px', color: chartColors.gray }}>
                <strong style={{ color: chartColors.charcoal }}>Users:</strong> {data.intendedUse.users.join(', ')}
              </div>
            </div>

            {/* Out of Scope */}
            <div style={cardStyle}>
              <div style={sectionHeader}>Out of Scope</div>
              {data.intendedUse.outOfScope.map((item, i) => (
                <div key={i} style={{ 
                  fontSize: '12px', 
                  color: chartColors.charcoal, 
                  marginBottom: '8px',
                  paddingLeft: '16px',
                  position: 'relative'
                }}>
                  <span style={{ position: 'absolute', left: 0, color: chartColors.gray }}>•</span>
                  {item}
                </div>
              ))}
            </div>

            {/* Training Data */}
            <div style={cardStyle}>
              <div style={sectionHeader}>Training Data</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: chartColors.gray, marginBottom: '4px' }}>Dataset Size</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: chartColors.charcoal }}>{data.training.dataSize}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: chartColors.gray, marginBottom: '4px' }}>Date Range</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: chartColors.charcoal }}>{data.training.dateRange}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: chartColors.gray, marginBottom: '4px' }}>Features</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: chartColors.charcoal }}>{data.training.features}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: chartColors.gray, marginBottom: '4px' }}>Train/Test Split</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: chartColors.charcoal }}>{data.training.trainTestSplit}</div>
                </div>
              </div>
            </div>

            {/* Deployment */}
            <div style={cardStyle}>
              <div style={sectionHeader}>Deployment</div>
              <div style={{ 
                fontSize: '12px', 
                fontFamily: 'monospace', 
                color: chartColors.charcoal, 
                marginBottom: '16px',
                padding: '10px 12px',
                backgroundColor: chartColors.background,
                borderRadius: '6px'
              }}>
                {data.deployment.endpoint}
              </div>
              <div style={{ display: 'flex', gap: '32px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: chartColors.gray, marginBottom: '4px' }}>Latency</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: chartColors.charcoal }}>{data.deployment.latency}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: chartColors.gray, marginBottom: '4px' }}>Throughput</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: chartColors.charcoal }}>{data.deployment.throughput}</div>
                </div>
              </div>
            </div>

            {/* Limitations */}
            <div style={{ ...cardStyle, gridColumn: '1 / -1', backgroundColor: chartColors.background }}>
              <div style={sectionHeader}>Limitations</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {data.limitations.map((limit, i) => (
                  <div key={i} style={{ 
                    fontSize: '12px', 
                    color: chartColors.charcoal,
                    paddingLeft: '16px',
                    position: 'relative',
                    lineHeight: 1.5
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: chartColors.gray }}>•</span>
                    {limit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div>
            {/* Metrics */}
            <div style={{ marginBottom: '24px' }}>
              <div style={sectionHeader}>Model Metrics</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {data.performance.metrics.map((metric) => (
                  <div key={metric.name} style={{
                    flex: 1,
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    border: `1px solid ${chartColors.light}`,
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '32px', fontWeight: 700, color: chartColors.charcoal }}>
                      {(metric.value * 100).toFixed(0)}%
                    </div>
                    <div style={{ fontSize: '12px', color: chartColors.charcoal, fontWeight: 600, marginTop: '4px' }}>{metric.name}</div>
                    <div style={{ fontSize: '11px', color: chartColors.gray, marginTop: '2px' }}>Target: {(metric.target * 100).toFixed(0)}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance by Slice */}
            <div>
              <div style={sectionHeader}>Performance by Segment</div>
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                border: `1px solid ${chartColors.light}`,
                padding: '16px'
              }}>
                {data.performance.slices.map((slice, i) => (
                  <div key={slice.name} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '12px 0',
                    borderBottom: i < data.performance.slices.length - 1 ? `1px solid ${chartColors.light}` : 'none'
                  }}>
                    <div style={{ width: '120px', fontSize: '13px', fontWeight: 600, color: chartColors.charcoal }}>{slice.name}</div>
                    <div style={{ flex: 1, position: 'relative', height: '24px', backgroundColor: chartColors.background, borderRadius: '6px' }}>
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: `${slice.auc * 100}%`,
                        backgroundColor: chartColors.charcoal,
                        borderRadius: '6px',
                        opacity: 0.7 + (slice.auc - 0.8) * 1.5
                      }} />
                      <span style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: chartColors.charcoal
                      }}>
                        {(slice.auc * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div style={{ width: '100px', fontSize: '12px', color: chartColors.gray, textAlign: 'right' }}>
                      n={slice.samples.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fairness' && (
          <div>
            {/* Protected Attributes */}
            <div style={{
              ...cardStyle,
              marginBottom: '16px'
            }}>
              <div style={sectionHeader}>Protected Attributes Evaluated</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {data.fairness.protectedAttributes.map((attr) => (
                  <span key={attr} style={{
                    padding: '8px 14px',
                    backgroundColor: chartColors.background,
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                    color: chartColors.charcoal
                  }}>
                    {attr}
                  </span>
                ))}
              </div>
            </div>

            {/* Fairness Metrics Table */}
            <div style={{ marginBottom: '16px' }}>
              <div style={sectionHeader}>Error Rates by Group</div>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                border: `1px solid ${chartColors.light}`,
                overflow: 'hidden'
              }}>
                {/* Header */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
                  backgroundColor: chartColors.background,
                  padding: '12px 16px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: chartColors.charcoal,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  <div>Group</div>
                  <div style={{ textAlign: 'center' }}>FPR</div>
                  <div style={{ textAlign: 'center' }}>FNR</div>
                  <div style={{ textAlign: 'center' }}>Samples</div>
                </div>
                
                {/* Rows */}
                {data.fairness.metrics.map((row, i) => (
                  <div key={row.group} style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
                    padding: '14px 16px',
                    borderTop: `1px solid ${chartColors.light}`,
                    fontSize: '13px'
                  }}>
                    <div style={{ color: chartColors.charcoal, fontWeight: 500 }}>{row.group}</div>
                    <div style={{ textAlign: 'center', color: chartColors.charcoal }}>{(row.fpr * 100).toFixed(0)}%</div>
                    <div style={{ textAlign: 'center', color: chartColors.charcoal }}>{(row.fnr * 100).toFixed(0)}%</div>
                    <div style={{ textAlign: 'center', color: chartColors.gray }}>{row.samples.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Findings */}
            <div>
              <div style={sectionHeader}>Audit Findings</div>
              {data.fairness.findings.map((finding, i) => (
                <div key={i} style={{
                  padding: '14px 16px',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  border: `1px solid ${chartColors.light}`,
                  marginBottom: '10px',
                  borderLeft: `4px solid ${chartColors.charcoal}`,
                  fontSize: '13px',
                  color: chartColors.charcoal,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: 600, 
                    textTransform: 'uppercase',
                    color: chartColors.gray,
                    backgroundColor: chartColors.background,
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}>
                    {finding.severity}
                  </span>
                  {finding.text}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div>
            <div style={sectionHeader}>Top Feature Importance</div>
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              border: `1px solid ${chartColors.light}`,
              padding: '8px'
            }}>
              {data.features.map((feature, i) => (
                <div key={feature.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '14px 12px',
                  backgroundColor: i % 2 === 0 ? chartColors.background : 'white',
                  borderRadius: '8px',
                }}>
                  <div style={{ 
                    width: '28px', 
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px', 
                    fontWeight: 600,
                    color: chartColors.gray,
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    border: `1px solid ${chartColors.light}`
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontFamily: 'monospace', color: chartColors.charcoal, fontWeight: 500 }}>
                      {feature.name}
                    </div>
                    <div style={{ fontSize: '11px', color: chartColors.gray, textTransform: 'capitalize', marginTop: '2px' }}>
                      {feature.category}
                    </div>
                  </div>
                  <div style={{ width: '160px', position: 'relative', height: '20px', backgroundColor: chartColors.light, borderRadius: '10px' }}>
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                      width: `${feature.importance * 100 * 5}%`,
                      backgroundColor: chartColors.charcoal,
                      borderRadius: '10px',
                      opacity: 0.6 + feature.importance * 2
                    }} />
                  </div>
                  <div style={{ width: '50px', fontSize: '14px', fontWeight: 600, textAlign: 'right', color: chartColors.charcoal }}>
                    {(feature.importance * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelCard;
