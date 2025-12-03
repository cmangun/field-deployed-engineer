"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Security Posture Dashboard data
const defaultData = {
  overallScore: 78,
  trend: '+5',
  lastScan: '2 hours ago',
  summary: {
    critical: 3,
    high: 12,
    medium: 45,
    low: 128,
    total: 188,
  },
  categories: [
    {
      id: 'infra',
      name: 'Infrastructure',
      icon: '🏗️',
      score: 82,
      findings: { critical: 1, high: 3, medium: 12, low: 34 },
      items: [
        { name: 'Exposed S3 bucket with PII data', severity: 'critical', age: 3, status: 'open' },
        { name: 'Security group allows 0.0.0.0/0 on port 22', severity: 'high', age: 7, status: 'in-progress' },
        { name: 'EBS volumes not encrypted', severity: 'medium', age: 14, status: 'open' },
      ],
    },
    {
      id: 'identity',
      name: 'Identity & Access',
      icon: '🔐',
      score: 71,
      findings: { critical: 1, high: 4, medium: 15, low: 42 },
      items: [
        { name: 'Service account with admin privileges', severity: 'critical', age: 1, status: 'open' },
        { name: '15 users without MFA enabled', severity: 'high', age: 12, status: 'in-progress' },
        { name: 'Stale API keys (>90 days)', severity: 'high', age: 5, status: 'open' },
      ],
    },
    {
      id: 'application',
      name: 'Application Security',
      icon: '📱',
      score: 85,
      findings: { critical: 0, high: 2, medium: 8, low: 25 },
      items: [
        { name: 'SQL injection vulnerability in /api/search', severity: 'high', age: 2, status: 'in-progress' },
        { name: 'Missing CSRF protection on forms', severity: 'high', age: 6, status: 'open' },
        { name: 'Outdated TLS 1.1 still supported', severity: 'medium', age: 21, status: 'open' },
      ],
    },
    {
      id: 'data',
      name: 'Data Protection',
      icon: '🗄️',
      score: 74,
      findings: { critical: 1, high: 2, medium: 6, low: 18 },
      items: [
        { name: 'PII data in logs without masking', severity: 'critical', age: 5, status: 'open' },
        { name: 'Backup encryption key rotation overdue', severity: 'high', age: 8, status: 'in-progress' },
        { name: 'DLP policy gaps in email gateway', severity: 'medium', age: 15, status: 'open' },
      ],
    },
    {
      id: 'compliance',
      name: 'Compliance',
      icon: '📋',
      score: 79,
      findings: { critical: 0, high: 1, medium: 4, low: 9 },
      items: [
        { name: 'SOC2 control gap: Incident response', severity: 'high', age: 10, status: 'in-progress' },
        { name: 'GDPR consent records incomplete', severity: 'medium', age: 30, status: 'open' },
        { name: 'Annual pen test overdue by 45 days', severity: 'medium', age: 45, status: 'open' },
      ],
    },
  ],
  mttr: {
    critical: 2.5,
    high: 8.2,
    medium: 21.5,
    low: 45.0,
    targets: { critical: 1, high: 7, medium: 30, low: 90 },
  },
  trends: [
    { week: 'W1', critical: 5, high: 18, medium: 52, low: 145 },
    { week: 'W2', critical: 4, high: 16, medium: 50, low: 140 },
    { week: 'W3', critical: 4, high: 14, medium: 48, low: 135 },
    { week: 'W4', critical: 3, high: 12, medium: 45, low: 128 },
  ],
};

const severityConfig: Record<string, { color: string; bg: string }> = {
  critical: { color: chartColors.dark, bg: chartColors.light },
  high: { color: chartColors.secondary, bg: chartColors.light },
  medium: { color: chartColors.secondary, bg: chartColors.light },
  low: { color: chartColors.primary, bg: chartColors.light },
};

interface SecurityPostureProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const SecurityPosture: React.FC<SecurityPostureProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Security Posture Dashboard"
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'findings' | 'trends'>('overview');

  const getScoreColor = (score: number) => {
    if (score >= 80) return chartColors.primary;
    if (score >= 60) return chartColors.secondary;
    return chartColors.dark;
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Severity Summary */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {Object.entries(data.summary).filter(([k]) => k !== 'total').map(([severity, count]) => (
          <div key={severity} style={{
            flex: 1,
            padding: '10px',
            backgroundColor: severityConfig[severity].bg,
            borderRadius: '8px',
            textAlign: 'center',
            borderLeft: `4px solid ${severityConfig[severity].color}`
          }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: severityConfig[severity].color }}>
              {count}
            </div>
            <div style={{ fontSize: '9px', color: severityConfig[severity].color, textTransform: 'capitalize' }}>
              {severity}
            </div>
          </div>
        ))}
      </div>

      {viewMode === 'overview' && (
        <>
          {/* Category Scores */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
              SECURITY DOMAINS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
              {data.categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                  style={{
                    padding: '12px',
                    backgroundColor: selectedCategory === cat.id ? `${getScoreColor(cat.score)}15` : 'white',
                    borderRadius: '10px',
                    border: `2px solid ${selectedCategory === cat.id ? getScoreColor(cat.score) : chartColors.light}`,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>{cat.icon}</div>
                  <div style={{ fontSize: '9px', color: chartColors.gray, marginBottom: '4px' }}>{cat.name}</div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: getScoreColor(cat.score)
                  }}>
                    {cat.score}
                  </div>
                  <div style={{ fontSize: '10px', color: getScoreColor(cat.score), fontWeight: 600 }}>
                    {getScoreGrade(cat.score)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Category Details */}
          {selectedCategory && (
            <div style={{
              padding: '12px',
              backgroundColor: chartColors.background,
              borderRadius: '8px',
              border: `1px solid ${chartColors.light}`
            }}>
              {(() => {
                const cat = data.categories.find(c => c.id === selectedCategory);
                if (!cat) return null;
                return (
                  <>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal, marginBottom: '8px' }}>
                      {cat.icon} {cat.name} - Top Findings
                    </div>
                    {cat.items.map((item, i) => {
                      const sev = severityConfig[item.severity];
                      return (
                        <div key={i} style={{
                          padding: '8px',
                          backgroundColor: 'white',
                          borderRadius: '6px',
                          marginBottom: '6px',
                          borderLeft: `3px solid ${sev.color}`
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ fontSize: '10px', color: chartColors.charcoal }}>{item.name}</div>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <span style={{
                                padding: '2px 6px',
                                backgroundColor: sev.bg,
                                color: sev.color,
                                borderRadius: '4px',
                                fontSize: '8px',
                                fontWeight: 600,
                                textTransform: 'uppercase'
                              }}>
                                {item.severity}
                              </span>
                              <span style={{
                                padding: '2px 6px',
                                backgroundColor: item.status === 'in-progress' ? chartColors.light : chartColors.light,
                                color: item.status === 'in-progress' ? chartColors.primary : chartColors.gray,
                                borderRadius: '4px',
                                fontSize: '8px'
                              }}>
                                {item.status}
                              </span>
                            </div>
                          </div>
                          <div style={{ fontSize: '9px', color: chartColors.gray, marginTop: '4px' }}>
                            Open for {item.age} days
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              })()}
            </div>
          )}

          {/* MTTR */}
          {!selectedCategory && (
            <div style={{
              padding: '12px',
              backgroundColor: chartColors.background,
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
                MEAN TIME TO REMEDIATE (MTTR)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {Object.entries(data.mttr).filter(([k]) => k !== 'targets').map(([severity, days]) => {
                  const target = data.mttr.targets[severity as keyof typeof data.mttr.targets];
                  const isOnTarget = (days as number) <= target;
                  return (
                    <div key={severity} style={{ textAlign: 'center' }}>
                      <div style={{ 
                        fontSize: '20px', 
                        fontWeight: 700, 
                        color: isOnTarget ? chartColors.primary : chartColors.dark 
                      }}>
                        {days}d
                      </div>
                      <div style={{ fontSize: '9px', color: chartColors.gray, textTransform: 'capitalize' }}>
                        {severity}
                      </div>
                      <div style={{ fontSize: '8px', color: isOnTarget ? chartColors.primary : chartColors.dark }}>
                        Target: {target}d {isOnTarget ? '✓' : '✗'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {viewMode === 'findings' && (
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '8px' }}>
            ALL CRITICAL & HIGH FINDINGS
          </div>
          {data.categories.flatMap(cat => 
            cat.items.filter(i => i.severity === 'critical' || i.severity === 'high').map((item, i) => ({
              ...item,
              category: cat.name,
              categoryIcon: cat.icon
            }))
          ).sort((a, b) => {
            if (a.severity === 'critical' && b.severity !== 'critical') return -1;
            if (b.severity === 'critical' && a.severity !== 'critical') return 1;
            return a.age - b.age;
          }).map((item, i) => {
            const sev = severityConfig[item.severity];
            return (
              <div key={i} style={{
                padding: '10px',
                backgroundColor: sev.bg,
                borderRadius: '8px',
                marginBottom: '6px',
                borderLeft: `4px solid ${sev.color}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>{item.name}</div>
                    <div style={{ fontSize: '9px', color: chartColors.gray, marginTop: '2px' }}>
                      {item.categoryIcon} {item.category} • Open {item.age} days
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{
                      padding: '3px 8px',
                      backgroundColor: sev.color,
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '9px',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      {item.severity}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'trends' && (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
            FINDING TRENDS (Last 4 Weeks)
          </div>
          <svg width={width - 80} height={180}>
            {/* Stacked bars */}
            {data.trends.map((week, i) => {
              const barWidth = ((width - 80) / data.trends.length) - 20;
              const x = i * ((width - 80) / data.trends.length) + 30;
              const total = week.critical + week.high + week.medium + week.low;
              const maxTotal = Math.max(...data.trends.map(w => w.critical + w.high + w.medium + w.low));
              const scale = 150 / maxTotal;
              
              let y = 160;
              
              return (
                <g key={week.week}>
                  {/* Low */}
                  <rect x={x} y={y - week.low * scale} width={barWidth} height={week.low * scale} fill={severityConfig.low.color} rx={2} />
                  {/* Medium */}
                  <rect x={x} y={y - (week.low + week.medium) * scale} width={barWidth} height={week.medium * scale} fill={severityConfig.medium.color} rx={2} />
                  {/* High */}
                  <rect x={x} y={y - (week.low + week.medium + week.high) * scale} width={barWidth} height={week.high * scale} fill={severityConfig.high.color} rx={2} />
                  {/* Critical */}
                  <rect x={x} y={y - total * scale} width={barWidth} height={week.critical * scale} fill={severityConfig.critical.color} rx={2} />
                  
                  <text x={x + barWidth / 2} y={175} textAnchor="middle" fontSize={10} fill={chartColors.gray}>{week.week}</text>
                </g>
              );
            })}
          </svg>
          
          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px' }}>
            {Object.entries(severityConfig).map(([sev, config]) => (
              <div key={sev} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: config.color, borderRadius: '2px' }} />
                <span style={{ fontSize: '9px', color: chartColors.gray, textTransform: 'capitalize' }}>{sev}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityPosture;
