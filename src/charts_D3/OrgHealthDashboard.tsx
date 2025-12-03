"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Org Health Dashboard data
const defaultData = {
  asOfDate: 'Nov 2024',
  headcount: {
    total: 245,
    fullTime: 228,
    contractors: 17,
    openRoles: 18,
    trend: [{ month: 'Jun', count: 210 }, { month: 'Jul', count: 218 }, { month: 'Aug', count: 225 }, { month: 'Sep', count: 232 }, { month: 'Oct', count: 238 }, { month: 'Nov', count: 245 }],
  },
  attrition: {
    monthly: 1.8,
    annual: 18.5,
    voluntary: 14.2,
    involuntary: 4.3,
    regrettable: 8.5,
    benchmark: 15,
  },
  engagement: {
    enps: 42,
    participation: 89,
    trend: [{ month: 'Q1', score: 38 }, { month: 'Q2', score: 35 }, { month: 'Q3', score: 40 }, { month: 'Q4', score: 42 }],
  },
  dei: {
    gender: { male: 58, female: 39, nonBinary: 3 },
    leadership: { male: 62, female: 35, nonBinary: 3 },
    ethnicity: [
      { group: 'White', percent: 48 },
      { group: 'Asian', percent: 28 },
      { group: 'Hispanic', percent: 12 },
      { group: 'Black', percent: 8 },
      { group: 'Other', percent: 4 },
    ],
  },
  departments: [
    { name: 'Engineering', headcount: 95, attrition: 15, enps: 48, openRoles: 8 },
    { name: 'Product', headcount: 28, attrition: 12, enps: 52, openRoles: 3 },
    { name: 'Sales', headcount: 42, attrition: 22, enps: 38, openRoles: 4 },
    { name: 'Marketing', headcount: 24, attrition: 18, enps: 45, openRoles: 2 },
    { name: 'Operations', headcount: 32, attrition: 14, enps: 40, openRoles: 1 },
    { name: 'Finance', headcount: 14, attrition: 8, enps: 55, openRoles: 0 },
    { name: 'HR', headcount: 10, attrition: 10, enps: 50, openRoles: 0 },
  ],
  tenure: [
    { range: '<1 year', count: 68, percent: 28 },
    { range: '1-2 years', count: 72, percent: 29 },
    { range: '2-3 years', count: 52, percent: 21 },
    { range: '3-5 years', count: 38, percent: 16 },
    { range: '5+ years', count: 15, percent: 6 },
  ],
};

interface OrgHealthDashboardProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const OrgHealthDashboard: React.FC<OrgHealthDashboardProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Org Health Dashboard"
}) => {
  const [viewMode, setViewMode] = useState<'overview' | 'departments' | 'dei'>('overview');

  const getEnpsColor = (score: number) => {
    if (score >= 50) return chartColors.primary;
    if (score >= 30) return chartColors.secondary;
    return chartColors.dark;
  };

  const getAttritionColor = (rate: number) => {
    if (rate <= 12) return chartColors.primary;
    if (rate <= 18) return chartColors.secondary;
    return chartColors.dark;
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.primary }}>{data.headcount.total}</div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>Total Headcount</div>
          <div style={{ fontSize: '8px', color: chartColors.gray, marginTop: '2px' }}>+{data.headcount.openRoles} open</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: `${getAttritionColor(data.attrition.annual)}15`, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: getAttritionColor(data.attrition.annual) }}>{data.attrition.annual}%</div>
          <div style={{ fontSize: '9px', color: chartColors.charcoalLight }}>Annual Attrition</div>
          <div style={{ fontSize: '8px', color: chartColors.gray, marginTop: '2px' }}>vs {data.attrition.benchmark}% benchmark</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: `${getEnpsColor(data.engagement.enps)}15`, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: getEnpsColor(data.engagement.enps) }}>{data.engagement.enps}</div>
          <div style={{ fontSize: '9px', color: chartColors.charcoalLight }}>eNPS Score</div>
          <div style={{ fontSize: '8px', color: chartColors.gray, marginTop: '2px' }}>{data.engagement.participation}% participation</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.primary }}>{data.dei.gender.female}%</div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>Women</div>
          <div style={{ fontSize: '8px', color: chartColors.gray, marginTop: '2px' }}>{data.dei.leadership.female}% in leadership</div>
        </div>
      </div>

      {viewMode === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Headcount Trend */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              HEADCOUNT TREND
            </div>
            <svg width="100%" height={100} viewBox="0 0 280 100">
              {(() => {
                const counts = data.headcount.trend.map(p => p.count);
                const minCount = Math.min(...counts);
                const maxCount = Math.max(...counts);
                const range = maxCount - minCount || 1;
                
                return (
                  <>
                    <path
                      d={data.headcount.trend.map((point, i) => {
                        const x = 20 + (i / (data.headcount.trend.length - 1)) * 240;
                        const y = 80 - ((point.count - minCount) / range) * 60;
                        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke={chartColors.teal}
                      strokeWidth={2}
                    />
                    {data.headcount.trend.map((point, i) => {
                      const x = 20 + (i / (data.headcount.trend.length - 1)) * 240;
                      const y = 80 - ((point.count - minCount) / range) * 60;
                      return (
                        <g key={point.month}>
                          <circle cx={x} cy={y} r={4} fill={chartColors.teal} />
                          <text x={x} y={95} textAnchor="middle" fontSize={8} fill={chartColors.gray}>{point.month}</text>
                        </g>
                      );
                    })}
                  </>
                );
              })()}
            </svg>
          </div>

          {/* Attrition Breakdown */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              ATTRITION BREAKDOWN
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              <div style={{ padding: '10px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: chartColors.dark }}>{data.attrition.voluntary}%</div>
                <div style={{ fontSize: '9px', color: chartColors.dark }}>Voluntary</div>
              </div>
              <div style={{ padding: '10px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: chartColors.secondary }}>{data.attrition.involuntary}%</div>
                <div style={{ fontSize: '9px', color: chartColors.dark }}>Involuntary</div>
              </div>
              <div style={{ padding: '10px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center', gridColumn: 'span 2' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: chartColors.dark }}>{data.attrition.regrettable}%</div>
                <div style={{ fontSize: '9px', color: chartColors.dark }}>Regrettable Attrition</div>
              </div>
            </div>
          </div>

          {/* Tenure Distribution */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              TENURE DISTRIBUTION
            </div>
            {data.tenure.map((t) => (
              <div key={t.range} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '2px' }}>
                  <span style={{ color: chartColors.charcoal }}>{t.range}</span>
                  <span style={{ color: chartColors.gray }}>{t.count} ({t.percent}%)</span>
                </div>
                <div style={{ height: '6px', backgroundColor: chartColors.light, borderRadius: '3px' }}>
                  <div style={{ width: `${t.percent}%`, height: '100%', backgroundColor: chartColors.teal, borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </div>

          {/* eNPS Trend */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              eNPS TREND
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {data.engagement.trend.map((q) => (
                <div key={q.month} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: `${getEnpsColor(q.score)}15`,
                    border: `3px solid ${getEnpsColor(q.score)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 4px'
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: getEnpsColor(q.score) }}>{q.score}</span>
                  </div>
                  <div style={{ fontSize: '9px', color: chartColors.gray }}>{q.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'departments' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, overflow: 'hidden' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr repeat(4, 1fr)',
            gap: '1px',
            backgroundColor: chartColors.light,
            fontSize: '10px'
          }}>
            {/* Header */}
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600 }}>Department</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Headcount</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Attrition</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>eNPS</div>
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600, textAlign: 'center' }}>Open Roles</div>
            
            {/* Rows */}
            {data.departments.sort((a, b) => b.headcount - a.headcount).map((dept, i) => (
              <React.Fragment key={dept.name}>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, fontWeight: 500 }}>
                  {dept.name}
                </div>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, textAlign: 'center', fontWeight: 600 }}>
                  {dept.headcount}
                </div>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, textAlign: 'center' }}>
                  <span style={{
                    padding: '2px 6px',
                    backgroundColor: `${getAttritionColor(dept.attrition)}15`,
                    color: getAttritionColor(dept.attrition),
                    borderRadius: '4px',
                    fontWeight: 600
                  }}>
                    {dept.attrition}%
                  </span>
                </div>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, textAlign: 'center' }}>
                  <span style={{
                    padding: '2px 6px',
                    backgroundColor: `${getEnpsColor(dept.enps)}15`,
                    color: getEnpsColor(dept.enps),
                    borderRadius: '4px',
                    fontWeight: 600
                  }}>
                    {dept.enps}
                  </span>
                </div>
                <div style={{ padding: '10px', backgroundColor: i % 2 === 0 ? 'white' : chartColors.background, textAlign: 'center', fontWeight: 600, color: dept.openRoles > 0 ? chartColors.primary : chartColors.gray }}>
                  {dept.openRoles}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'dei' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Gender */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              GENDER DISTRIBUTION
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              {Object.entries(data.dei.gender).map(([key, value]) => (
                <div key={key} style={{
                  flex: value,
                  height: '32px',
                  backgroundColor: key === 'male' ? chartColors.primary : key === 'female' ? chartColors.cyan : chartColors.navy,
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 600
                }}>
                  {value}%
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '9px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: chartColors.primary, borderRadius: '2px' }} />
                <span>Male</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: chartColors.cyan, borderRadius: '2px' }} />
                <span>Female</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: chartColors.navy, borderRadius: '2px' }} />
                <span>Non-Binary</span>
              </div>
            </div>
          </div>

          {/* Leadership Gender */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              LEADERSHIP GENDER
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              {Object.entries(data.dei.leadership).map(([key, value]) => (
                <div key={key} style={{
                  flex: value,
                  height: '32px',
                  backgroundColor: key === 'male' ? chartColors.primary : key === 'female' ? chartColors.cyan : chartColors.navy,
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 600
                }}>
                  {value}%
                </div>
              ))}
            </div>
            <div style={{ fontSize: '9px', color: chartColors.gray, textAlign: 'center' }}>
              Gap: {data.dei.gender.female - data.dei.leadership.female}% fewer women in leadership
            </div>
          </div>

          {/* Ethnicity */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px', gridColumn: 'span 2' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              ETHNICITY DISTRIBUTION
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {data.dei.ethnicity.map((e, i) => {
                const colors = [chartColors.primary, chartColors.primary, chartColors.secondary, chartColors.navy, chartColors.muted];
                return (
                  <div key={e.group} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{
                      height: `${e.percent * 2}px`,
                      minHeight: '20px',
                      backgroundColor: colors[i],
                      borderRadius: '4px 4px 0 0',
                      marginBottom: '4px'
                    }} />
                    <div style={{ fontSize: '12px', fontWeight: 700, color: chartColors.charcoal }}>{e.percent}%</div>
                    <div style={{ fontSize: '8px', color: chartColors.gray }}>{e.group}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgHealthDashboard;
