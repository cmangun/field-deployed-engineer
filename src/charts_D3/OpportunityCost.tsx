"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Opportunity Cost Calculator data
const defaultData = {
  title: 'Engineering Resource Allocation',
  scenario: 'Q1 2027 Sprint Planning',
  totalCapacity: 12, // engineers
  sprintWeeks: 6,
  hourlyRate: 175, // $/hour
  options: [
    {
      id: 'feature-a',
      name: 'AI Recommendations',
      icon: '🤖',
      color: chartColors.navy,
      engineers: 4,
      weeks: 6,
      projectedRevenue: 2400000,
      probability: 0.7,
      riskLevel: 'medium',
      dependencies: ['ML Platform', 'Data Pipeline'],
      outcomes: {
        best: { revenue: 3200000, probability: 0.2 },
        likely: { revenue: 2400000, probability: 0.5 },
        worst: { revenue: 800000, probability: 0.3 },
      }
    },
    {
      id: 'feature-b',
      name: 'Checkout Optimization',
      icon: '🛒',
      color: chartColors.primary,
      engineers: 3,
      weeks: 4,
      projectedRevenue: 1800000,
      probability: 0.85,
      riskLevel: 'low',
      dependencies: ['Payment API'],
      outcomes: {
        best: { revenue: 2200000, probability: 0.3 },
        likely: { revenue: 1800000, probability: 0.55 },
        worst: { revenue: 1400000, probability: 0.15 },
      }
    },
    {
      id: 'feature-c',
      name: 'Mobile App Redesign',
      icon: '📱',
      color: chartColors.secondary,
      engineers: 5,
      weeks: 6,
      projectedRevenue: 3000000,
      probability: 0.6,
      riskLevel: 'high',
      dependencies: ['Design System', 'iOS SDK', 'Android SDK'],
      outcomes: {
        best: { revenue: 4500000, probability: 0.15 },
        likely: { revenue: 3000000, probability: 0.45 },
        worst: { revenue: 1000000, probability: 0.4 },
      }
    },
    {
      id: 'tech-debt',
      name: 'Technical Debt',
      icon: '🔧',
      color: chartColors.dark,
      engineers: 2,
      weeks: 6,
      projectedRevenue: 0,
      costAvoidance: 480000,
      probability: 0.95,
      riskLevel: 'low',
      dependencies: [],
      outcomes: {
        best: { revenue: 600000, probability: 0.4 },
        likely: { revenue: 480000, probability: 0.5 },
        worst: { revenue: 300000, probability: 0.1 },
      }
    },
  ],
  constraints: {
    maxEngineers: 12,
    budgetCap: 800000,
    mustInclude: ['tech-debt'],
  }
};

interface OpportunityCostProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const OpportunityCost: React.FC<OpportunityCostProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Opportunity Cost Analysis"
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['feature-b', 'tech-debt']);
  const [viewMode, setViewMode] = useState<'allocation' | 'outcomes'>('allocation');

  const toggleOption = (id: string) => {
    if (data.constraints.mustInclude.includes(id)) return; // Can't deselect required
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter(o => o !== id));
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  // Calculate totals
  const selectedProjects = data.options.filter(o => selectedOptions.includes(o.id));
  const totalEngineers = selectedProjects.reduce((sum, p) => sum + p.engineers, 0);
  const totalCost = selectedProjects.reduce((sum, p) => sum + (p.engineers * data.sprintWeeks * 40 * data.hourlyRate), 0);
  const totalExpectedValue = selectedProjects.reduce((sum, p) => {
    const ev = (p.outcomes.best.revenue * p.outcomes.best.probability) +
               (p.outcomes.likely.revenue * p.outcomes.likely.probability) +
               (p.outcomes.worst.revenue * p.outcomes.worst.probability);
    return sum + ev;
  }, 0);

  // Calculate opportunity cost (what we're giving up)
  const unselectedProjects = data.options.filter(o => !selectedOptions.includes(o.id));
  const opportunityCost = unselectedProjects.reduce((sum, p) => {
    const ev = (p.outcomes.best.revenue * p.outcomes.best.probability) +
               (p.outcomes.likely.revenue * p.outcomes.likely.probability) +
               (p.outcomes.worst.revenue * p.outcomes.worst.probability);
    return sum + ev;
  }, 0);

  const isOverCapacity = totalEngineers > data.totalCapacity;
  const isOverBudget = totalCost > data.constraints.budgetCap;

  return (
    <div style={{ width: '100%' }}>
      {/* Capacity Bar */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>
            Engineering Capacity
          </span>
          <span style={{ 
            fontSize: '11px', 
            fontWeight: 600, 
            color: isOverCapacity ? chartColors.dark : chartColors.primary 
          }}>
            {totalEngineers} / {data.totalCapacity} engineers {isOverCapacity && '⚠️ Over capacity!'}
          </span>
        </div>
        <div style={{ height: '24px', backgroundColor: chartColors.light, borderRadius: '12px', overflow: 'hidden', display: 'flex' }}>
          {selectedProjects.map((project, i) => (
            <div
              key={project.id}
              style={{
                width: `${(project.engineers / data.totalCapacity) * 100}%`,
                height: '100%',
                backgroundColor: project.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: 'white',
                fontWeight: 600,
                borderRight: i < selectedProjects.length - 1 ? '2px solid white' : 'none'
              }}
            >
              {project.engineers}
            </div>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '16px' }}>
        <div style={{ 
          padding: '12px', 
          backgroundColor: isOverBudget ? chartColors.light : chartColors.light, 
          borderRadius: '10px', 
          textAlign: 'center' 
        }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: isOverBudget ? chartColors.dark : chartColors.primary }}>
            ${(totalCost / 1000).toFixed(0)}K
          </div>
          <div style={{ fontSize: '9px', color: isOverBudget ? chartColors.dark : chartColors.navy }}>
            Sprint Cost {isOverBudget && '(over!)'}
          </div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>
            ${(totalExpectedValue / 1000000).toFixed(1)}M
          </div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>Expected Value</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.secondary }}>
            ${(opportunityCost / 1000000).toFixed(1)}M
          </div>
          <div style={{ fontSize: '9px', color: chartColors.dark }}>Opportunity Cost</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.navy }}>
            {((totalExpectedValue / totalCost) || 0).toFixed(1)}x
          </div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>ROI Multiple</div>
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {data.options.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          const isRequired = data.constraints.mustInclude.includes(option.id);
          const ev = (option.outcomes.best.revenue * option.outcomes.best.probability) +
                     (option.outcomes.likely.revenue * option.outcomes.likely.probability) +
                     (option.outcomes.worst.revenue * option.outcomes.worst.probability);
          const cost = option.engineers * data.sprintWeeks * 40 * data.hourlyRate;
          
          return (
            <div
              key={option.id}
              onClick={() => toggleOption(option.id)}
              style={{
                padding: '14px',
                backgroundColor: isSelected ? `${option.color}08` : 'white',
                borderRadius: '12px',
                border: `2px solid ${isSelected ? option.color : chartColors.light}`,
                cursor: isRequired ? 'not-allowed' : 'pointer',
                opacity: isRequired && !isSelected ? 0.6 : 1,
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{option.icon}</span>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>{option.name}</div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>
                      {option.engineers} engineers • {option.weeks} weeks
                    </div>
                  </div>
                </div>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '4px',
                  backgroundColor: isSelected ? option.color : chartColors.light,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px'
                }}>
                  {isSelected && '✓'}
                </div>
              </div>

              {viewMode === 'allocation' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>Cost</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: chartColors.charcoal }}>
                      ${(cost / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>Expected Value</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: option.color }}>
                      ${(ev / 1000000).toFixed(2)}M
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>Success Prob.</div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>
                      {(option.probability * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>Risk</div>
                    <div style={{ 
                      fontSize: '10px', 
                      fontWeight: 600, 
                      color: option.riskLevel === 'high' ? chartColors.dark : option.riskLevel === 'medium' ? chartColors.secondary : chartColors.primary 
                    }}>
                      {option.riskLevel.toUpperCase()}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '9px', color: chartColors.gray, marginBottom: '6px' }}>Outcome Distribution</div>
                  {(['best', 'likely', 'worst'] as const).map((outcome) => {
                    const data = option.outcomes[outcome];
                    return (
                      <div key={outcome} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ 
                          fontSize: '9px', 
                          width: '40px',
                          color: outcome === 'best' ? chartColors.primary : outcome === 'worst' ? chartColors.dark : chartColors.gray 
                        }}>
                          {outcome}
                        </span>
                        <div style={{ flex: 1, height: '8px', backgroundColor: chartColors.light, borderRadius: '4px' }}>
                          <div style={{
                            height: '100%',
                            width: `${data.probability * 100}%`,
                            backgroundColor: outcome === 'best' ? chartColors.primary : outcome === 'worst' ? chartColors.dark : option.color,
                            borderRadius: '4px'
                          }} />
                        </div>
                        <span style={{ fontSize: '9px', color: chartColors.charcoal, width: '50px' }}>
                          ${(data.revenue / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {isRequired && (
                <div style={{ 
                  marginTop: '8px', 
                  fontSize: '9px', 
                  color: chartColors.navy,
                  fontWeight: 600 
                }}>
                  🔒 Required
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Recommendation */}
      <div style={{ 
        padding: '12px 16px',
        backgroundColor: chartColors.light,
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.navy }}>
            💡 Optimal Allocation Insight
          </div>
          <div style={{ fontSize: '10px', color: chartColors.navy }}>
            {isOverCapacity 
              ? 'Over capacity - deselect a project to fit constraints'
              : `Current selection captures ${((totalExpectedValue / (totalExpectedValue + opportunityCost)) * 100).toFixed(0)}% of total value`
            }
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>Net Expected Value</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: chartColors.navy }}>
            ${((totalExpectedValue - totalCost) / 1000000).toFixed(2)}M
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCost;
