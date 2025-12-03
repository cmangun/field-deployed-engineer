"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Risk Register data
const defaultData = {
  lastUpdated: 'Nov 15, 2024',
  overallRiskScore: 67,
  riskAppetite: 'Moderate',
  summary: {
    critical: 2,
    high: 5,
    medium: 12,
    low: 8,
  },
  risks: [
    {
      id: 'R001',
      title: 'Key Person Dependency - CTO',
      category: 'Operational',
      probability: 3,
      impact: 5,
      score: 15,
      status: 'open',
      owner: 'CEO',
      mitigation: 'Cross-training program, documentation initiative',
      mitigationStatus: 'in-progress',
      trend: 'stable',
      dueDate: '2024-12-31',
    },
    {
      id: 'R002',
      title: 'Data Breach / Security Incident',
      category: 'Security',
      probability: 2,
      impact: 5,
      score: 10,
      status: 'open',
      owner: 'CISO',
      mitigation: 'SOC2 certification, pen testing, security training',
      mitigationStatus: 'in-progress',
      trend: 'improving',
      dueDate: '2024-11-30',
    },
    {
      id: 'R003',
      title: 'Runway < 12 Months',
      category: 'Financial',
      probability: 2,
      impact: 5,
      score: 10,
      status: 'open',
      owner: 'CFO',
      mitigation: 'Series B prep, expense reduction plan',
      mitigationStatus: 'planned',
      trend: 'stable',
      dueDate: '2025-03-31',
    },
    {
      id: 'R004',
      title: 'Major Customer Churn (>10% ARR)',
      category: 'Commercial',
      probability: 3,
      impact: 4,
      score: 12,
      status: 'open',
      owner: 'CRO',
      mitigation: 'Customer success program, QBRs, health scoring',
      mitigationStatus: 'in-progress',
      trend: 'improving',
      dueDate: '2024-12-15',
    },
    {
      id: 'R005',
      title: 'Platform Outage (>4 hours)',
      category: 'Technical',
      probability: 2,
      impact: 4,
      score: 8,
      status: 'open',
      owner: 'CTO',
      mitigation: 'Multi-region failover, chaos engineering',
      mitigationStatus: 'in-progress',
      trend: 'improving',
      dueDate: '2025-01-15',
    },
    {
      id: 'R006',
      title: 'Regulatory Compliance Gap (GDPR/CCPA)',
      category: 'Compliance',
      probability: 3,
      impact: 3,
      score: 9,
      status: 'open',
      owner: 'Legal',
      mitigation: 'Privacy audit, DPA templates, consent management',
      mitigationStatus: 'completed',
      trend: 'stable',
      dueDate: '2024-10-31',
    },
    {
      id: 'R007',
      title: 'Competitive Disruption (New Entrant)',
      category: 'Strategic',
      probability: 4,
      impact: 3,
      score: 12,
      status: 'open',
      owner: 'CEO',
      mitigation: 'Product differentiation, patent filing, moat building',
      mitigationStatus: 'in-progress',
      trend: 'worsening',
      dueDate: '2025-06-30',
    },
    {
      id: 'R008',
      title: 'Talent Attrition (Engineering)',
      category: 'Operational',
      probability: 3,
      impact: 3,
      score: 9,
      status: 'open',
      owner: 'CHRO',
      mitigation: 'Retention bonuses, career paths, culture initiatives',
      mitigationStatus: 'in-progress',
      trend: 'stable',
      dueDate: '2024-12-31',
    },
  ],
  categories: ['Strategic', 'Financial', 'Operational', 'Technical', 'Security', 'Compliance', 'Commercial'],
};

const severityConfig: Record<string, { color: string; bg: string; label: string }> = {
  critical: { color: chartColors.dark, bg: chartColors.light, label: 'Critical' },
  high: { color: chartColors.secondary, bg: chartColors.light, label: 'High' },
  medium: { color: chartColors.secondary, bg: chartColors.light, label: 'Medium' },
  low: { color: chartColors.primary, bg: chartColors.light, label: 'Low' },
};

const getScoreSeverity = (score: number): string => {
  if (score >= 15) return 'critical';
  if (score >= 10) return 'high';
  if (score >= 5) return 'medium';
  return 'low';
};

const trendConfig: Record<string, { icon: string; color: string }> = {
  improving: { icon: '↓', color: chartColors.primary },
  stable: { icon: '→', color: chartColors.secondary },
  worsening: { icon: '↑', color: chartColors.dark },
};

interface RiskRegisterProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const RiskRegister: React.FC<RiskRegisterProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Risk Register"
}) => {
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'matrix' | 'list' | 'categories'>('matrix');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const filteredRisks = filterCategory 
    ? data.risks.filter(r => r.category === filterCategory)
    : data.risks;

  return (
    <div style={{ width: '100%' }}>
      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {Object.entries(data.summary).map(([severity, count]) => {
          const config = severityConfig[severity];
          return (
            <div key={severity} style={{
              flex: 1,
              padding: '10px',
              backgroundColor: config.bg,
              borderRadius: '8px',
              textAlign: 'center',
              borderLeft: `4px solid ${config.color}`
            }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: config.color }}>{count}</div>
              <div style={{ fontSize: '9px', color: config.color }}>{config.label}</div>
            </div>
          );
        })}
      </div>

      {viewMode === 'matrix' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
            PROBABILITY × IMPACT MATRIX
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            {/* Y-axis label */}
            <div style={{ 
              writingMode: 'vertical-rl', 
              textOrientation: 'mixed', 
              transform: 'rotate(180deg)',
              fontSize: '10px',
              color: chartColors.gray,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              PROBABILITY →
            </div>
            
            {/* Matrix grid */}
            <div style={{ flex: 1 }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(5, 1fr)', 
                gridTemplateRows: 'repeat(5, 1fr)',
                gap: '2px',
                aspectRatio: '1'
              }}>
                {[5, 4, 3, 2, 1].map((prob) => (
                  [1, 2, 3, 4, 5].map((impact) => {
                    const score = prob * impact;
                    const severity = getScoreSeverity(score);
                    const config = severityConfig[severity];
                    const risksInCell = data.risks.filter(r => r.probability === prob && r.impact === impact);
                    
                    return (
                      <div
                        key={`${prob}-${impact}`}
                        style={{
                          backgroundColor: config.bg,
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          position: 'relative',
                          minHeight: '50px',
                          border: risksInCell.length > 0 ? `2px solid ${config.color}` : 'none'
                        }}
                      >
                        <span style={{ fontSize: '10px', color: config.color, fontWeight: 600 }}>{score}</span>
                        {risksInCell.length > 0 && (
                          <div style={{
                            position: 'absolute',
                            top: '2px',
                            right: '2px',
                            width: '16px',
                            height: '16px',
                            backgroundColor: config.color,
                            color: 'white',
                            borderRadius: '50%',
                            fontSize: '9px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {risksInCell.length}
                          </div>
                        )}
                      </div>
                    );
                  })
                ))}
              </div>
              
              {/* X-axis label */}
              <div style={{ textAlign: 'center', fontSize: '10px', color: chartColors.gray, marginTop: '8px' }}>
                IMPACT →
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px' }}>
            {Object.entries(severityConfig).map(([sev, config]) => (
              <div key={sev} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: config.bg, border: `1px solid ${config.color}`, borderRadius: '2px' }} />
                <span style={{ fontSize: '9px', color: chartColors.gray }}>{config.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'list' && (
        <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
          {filteredRisks.sort((a, b) => b.score - a.score).map((risk) => {
            const severity = getScoreSeverity(risk.score);
            const config = severityConfig[severity];
            const trend = trendConfig[risk.trend];
            const isSelected = selectedRisk === risk.id;
            
            return (
              <div
                key={risk.id}
                onClick={() => setSelectedRisk(isSelected ? null : risk.id)}
                style={{
                  padding: '12px',
                  backgroundColor: isSelected ? chartColors.background : 'white',
                  borderRadius: '10px',
                  border: `2px solid ${isSelected ? config.color : chartColors.light}`,
                  marginBottom: '8px',
                  cursor: 'pointer',
                  borderLeft: `4px solid ${config.color}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '9px', color: chartColors.gray, fontFamily: 'monospace' }}>{risk.id}</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>{risk.title}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', fontSize: '9px' }}>
                      <span style={{ padding: '2px 6px', backgroundColor: chartColors.light, borderRadius: '4px', color: chartColors.gray }}>{risk.category}</span>
                      <span style={{ color: chartColors.gray }}>Owner: {risk.owner}</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: trend.color }}>{trend.icon}</span>
                    <div style={{
                      padding: '4px 10px',
                      backgroundColor: config.bg,
                      color: config.color,
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 700
                    }}>
                      {risk.score}
                    </div>
                  </div>
                </div>
                
                {isSelected && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${chartColors.light}` }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
                      <div>
                        <div style={{ fontSize: '9px', color: chartColors.gray }}>Probability</div>
                        <div style={{ fontSize: '14px', fontWeight: 600 }}>{risk.probability}/5</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '9px', color: chartColors.gray }}>Impact</div>
                        <div style={{ fontSize: '14px', fontWeight: 600 }}>{risk.impact}/5</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '9px', color: chartColors.gray }}>Due Date</div>
                        <div style={{ fontSize: '14px', fontWeight: 600 }}>{risk.dueDate}</div>
                      </div>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ fontSize: '9px', color: chartColors.gray, marginBottom: '4px' }}>Mitigation Plan</div>
                      <div style={{ fontSize: '10px', color: chartColors.charcoal }}>{risk.mitigation}</div>
                    </div>
                    <div style={{
                      display: 'inline-block',
                      padding: '3px 8px',
                      backgroundColor: risk.mitigationStatus === 'completed' ? chartColors.light : risk.mitigationStatus === 'in-progress' ? chartColors.light : chartColors.light,
                      color: risk.mitigationStatus === 'completed' ? chartColors.navy : risk.mitigationStatus === 'in-progress' ? chartColors.primary : chartColors.gray,
                      borderRadius: '4px',
                      fontSize: '9px',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      {risk.mitigationStatus}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'categories' && (
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
            RISKS BY CATEGORY
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {data.categories.map((cat) => {
              const catRisks = data.risks.filter(r => r.category === cat);
              const avgScore = catRisks.length > 0 
                ? Math.round(catRisks.reduce((sum, r) => sum + r.score, 0) / catRisks.length)
                : 0;
              const severity = getScoreSeverity(avgScore);
              const config = severityConfig[severity];
              
              return (
                <div
                  key={cat}
                  onClick={() => setFilterCategory(filterCategory === cat ? null : cat)}
                  style={{
                    padding: '12px',
                    backgroundColor: filterCategory === cat ? `${config.color}10` : 'white',
                    borderRadius: '10px',
                    border: `2px solid ${filterCategory === cat ? config.color : chartColors.light}`,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>{cat}</div>
                      <div style={{ fontSize: '10px', color: chartColors.gray }}>{catRisks.length} risks</div>
                    </div>
                    <div style={{
                      padding: '6px 12px',
                      backgroundColor: config.bg,
                      color: config.color,
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 700
                    }}>
                      {avgScore}
                    </div>
                  </div>
                  
                  {/* Mini breakdown */}
                  <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                    {['critical', 'high', 'medium', 'low'].map((sev) => {
                      const count = catRisks.filter(r => getScoreSeverity(r.score) === sev).length;
                      if (count === 0) return null;
                      return (
                        <span key={sev} style={{
                          padding: '2px 6px',
                          backgroundColor: severityConfig[sev].bg,
                          color: severityConfig[sev].color,
                          borderRadius: '4px',
                          fontSize: '9px',
                          fontWeight: 600
                        }}>
                          {count}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskRegister;
