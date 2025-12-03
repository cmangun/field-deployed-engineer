"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Decision Tree data
const defaultData = {
  title: 'Build vs Buy: ML Platform Decision',
  question: 'Should we build a custom ML platform or buy an existing solution?',
  criteria: [
    { name: 'Time to Market', weight: 25 },
    { name: 'Total Cost (3yr)', weight: 30 },
    { name: 'Customization', weight: 20 },
    { name: 'Maintenance Burden', weight: 15 },
    { name: 'Team Expertise', weight: 10 },
  ],
  options: [
    {
      id: 'build',
      name: 'Build Custom',
      icon: '🔧',
      color: chartColors.navy,
      scores: { 'Time to Market': 3, 'Total Cost (3yr)': 4, 'Customization': 9, 'Maintenance Burden': 3, 'Team Expertise': 4 },
      pros: ['Full control', 'No vendor lock-in', 'Tailored to needs'],
      cons: ['12-18 month timeline', '3-5 FTE ongoing', 'Technical debt risk'],
      costs: { initial: 850000, annual: 420000, threeYear: 2110000 },
    },
    {
      id: 'buy-saas',
      name: 'Buy SaaS (Databricks)',
      icon: '☁️',
      color: chartColors.primary,
      scores: { 'Time to Market': 8, 'Total Cost (3yr)': 6, 'Customization': 6, 'Maintenance Burden': 8, 'Team Expertise': 7 },
      pros: ['2-4 week deployment', 'Managed infrastructure', 'Regular updates'],
      cons: ['$180K/yr license', 'Limited customization', 'Data egress costs'],
      costs: { initial: 50000, annual: 180000, threeYear: 590000 },
    },
    {
      id: 'hybrid',
      name: 'Hybrid Approach',
      icon: '🔀',
      color: chartColors.secondary,
      scores: { 'Time to Market': 6, 'Total Cost (3yr)': 5, 'Customization': 7, 'Maintenance Burden': 5, 'Team Expertise': 6 },
      pros: ['Best of both', 'Phased rollout', 'Flexibility'],
      cons: ['Integration complexity', 'Multiple vendors', 'Higher coordination'],
      costs: { initial: 280000, annual: 290000, threeYear: 1150000 },
    },
  ],
  recommendation: 'buy-saas',
  decisionFactors: [
    { factor: 'Current team size', value: '2 ML engineers', implication: 'Limited capacity for custom build' },
    { factor: 'Go-live deadline', value: 'Q2 2027', implication: '6 months - favors buying' },
    { factor: 'Budget approved', value: '$600K (3yr)', implication: 'Aligns with SaaS option' },
    { factor: 'Regulatory requirements', value: 'SOC2, HIPAA', implication: 'SaaS vendor already certified' },
  ],
};

interface DecisionTreeProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const DecisionTree: React.FC<DecisionTreeProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Decision Analysis"
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCosts, setShowCosts] = useState(false);

  // Calculate weighted scores
  const calculateScore = (option: typeof data.options[0]) => {
    return data.criteria.reduce((total, criterion) => {
      const score = option.scores[criterion.name as keyof typeof option.scores] || 0;
      return total + (score * criterion.weight / 100);
    }, 0);
  };

  const optionScores = data.options.map(opt => ({
    ...opt,
    totalScore: calculateScore(opt)
  })).sort((a, b) => b.totalScore - a.totalScore);

  const maxScore = Math.max(...optionScores.map(o => o.totalScore));
  const recommended = optionScores.find(o => o.id === data.recommendation);

  return (
    <div style={{ width: '100%' }}>
      {/* Toggle */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => setShowCosts(false)}
          style={{
            padding: '6px 14px',
            fontSize: '11px',
            backgroundColor: !showCosts ? chartColors.charcoal : 'white',
            color: !showCosts ? 'white' : chartColors.charcoal,
            border: `1px solid ${chartColors.light}`,
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Weighted Scores
        </button>
        <button
          onClick={() => setShowCosts(true)}
          style={{
            padding: '6px 14px',
            fontSize: '11px',
            backgroundColor: showCosts ? chartColors.charcoal : 'white',
            color: showCosts ? 'white' : chartColors.charcoal,
            border: `1px solid ${chartColors.light}`,
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Cost Analysis
        </button>
      </div>

      {!showCosts ? (
        <>
          {/* Criteria Weights */}
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: chartColors.background,
            borderRadius: '10px'
          }}>
            {data.criteria.map((c, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: chartColors.charcoal }}>{c.weight}%</div>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>{c.name}</div>
              </div>
            ))}
          </div>

          {/* Options Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
            {optionScores.map((option) => {
              const isRecommended = option.id === data.recommendation;
              const isSelected = selectedOption === option.id;
              
              return (
                <div
                  key={option.id}
                  onClick={() => setSelectedOption(isSelected ? null : option.id)}
                  style={{
                    padding: '16px',
                    backgroundColor: isSelected ? `${option.color}10` : 'white',
                    borderRadius: '12px',
                    border: `2px solid ${isSelected ? option.color : chartColors.light}`,
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.15s'
                  }}
                >
                  {isRecommended && (
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '10px',
                      padding: '2px 8px',
                      backgroundColor: chartColors.primary,
                      color: 'white',
                      fontSize: '9px',
                      fontWeight: 700,
                      borderRadius: '10px'
                    }}>
                      RECOMMENDED
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{option.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: chartColors.charcoal }}>{option.name}</span>
                  </div>

                  {/* Score Bar */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '10px', color: chartColors.gray }}>Weighted Score</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: option.color }}>
                        {option.totalScore.toFixed(1)} / 10
                      </span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: chartColors.light, borderRadius: '4px' }}>
                      <div style={{
                        height: '100%',
                        width: `${(option.totalScore / 10) * 100}%`,
                        backgroundColor: option.color,
                        borderRadius: '4px'
                      }} />
                    </div>
                  </div>

                  {/* Criteria Breakdown */}
                  {isSelected && (
                    <div style={{ marginBottom: '12px' }}>
                      {data.criteria.map((criterion, i) => {
                        const score = option.scores[criterion.name as keyof typeof option.scores] || 0;
                        return (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '9px', color: chartColors.gray, width: '80px' }}>{criterion.name}</span>
                            <div style={{ flex: 1, height: '4px', backgroundColor: chartColors.light, borderRadius: '2px' }}>
                              <div style={{
                                height: '100%',
                                width: `${(score / 10) * 100}%`,
                                backgroundColor: option.color,
                                borderRadius: '2px'
                              }} />
                            </div>
                            <span style={{ fontSize: '9px', fontWeight: 600, color: chartColors.charcoal, width: '16px' }}>{score}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Pros/Cons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <div style={{ fontSize: '9px', fontWeight: 600, color: chartColors.primary, marginBottom: '4px' }}>Pros</div>
                      {option.pros.map((pro, i) => (
                        <div key={i} style={{ fontSize: '9px', color: chartColors.charcoalLight }}>+ {pro}</div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: '9px', fontWeight: 600, color: chartColors.dark, marginBottom: '4px' }}>Cons</div>
                      {option.cons.map((con, i) => (
                        <div key={i} style={{ fontSize: '9px', color: chartColors.charcoalLight }}>- {con}</div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Cost Analysis View */
        <div style={{ marginBottom: '16px' }}>
          {/* Cost Comparison Chart */}
          <div style={{ 
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: `1px solid ${chartColors.light}`,
            marginBottom: '12px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              3-Year Total Cost of Ownership
            </div>
            
            {data.options.map((option, i) => {
              const maxCost = Math.max(...data.options.map(o => o.costs.threeYear));
              return (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '16px' }}>{option.icon}</span>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>{option.name}</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: option.color }}>
                      ${(option.costs.threeYear / 1000000).toFixed(2)}M
                    </span>
                  </div>
                  <div style={{ display: 'flex', height: '24px', borderRadius: '6px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${(option.costs.initial / option.costs.threeYear) * (option.costs.threeYear / maxCost) * 100}%`,
                        backgroundColor: option.color,
                        opacity: 1
                      }} 
                    />
                    <div 
                      style={{ 
                        width: `${((option.costs.annual * 3) / option.costs.threeYear) * (option.costs.threeYear / maxCost) * 100}%`,
                        backgroundColor: option.color,
                        opacity: 0.5
                      }} 
                    />
                    <div style={{ flex: 1, backgroundColor: chartColors.light }} />
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                    <span style={{ fontSize: '9px', color: chartColors.gray }}>
                      Initial: ${(option.costs.initial / 1000).toFixed(0)}K
                    </span>
                    <span style={{ fontSize: '9px', color: chartColors.gray }}>
                      Annual: ${(option.costs.annual / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              );
            })}
            
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: chartColors.charcoal }} />
                <span style={{ fontSize: '9px', color: chartColors.gray }}>Initial Investment</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: chartColors.charcoal, opacity: 0.5 }} />
                <span style={{ fontSize: '9px', color: chartColors.gray }}>Ongoing (3yr)</span>
              </div>
            </div>
          </div>

          {/* Savings Callout */}
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
                💰 Potential Savings with SaaS vs Build
              </div>
              <div style={{ fontSize: '10px', color: chartColors.navy }}>
                Over 3-year period
              </div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: chartColors.primary }}>
              ${((data.options[0].costs.threeYear - data.options[1].costs.threeYear) / 1000000).toFixed(2)}M
            </div>
          </div>
        </div>
      )}

      {/* Decision Factors */}
      <div style={{ 
        padding: '12px',
        backgroundColor: chartColors.background,
        borderRadius: '10px',
        border: `1px solid ${chartColors.light}`
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '10px' }}>
          Key Decision Factors
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {data.decisionFactors.map((factor, i) => (
            <div key={i} style={{ 
              padding: '8px',
              backgroundColor: 'white',
              borderRadius: '6px',
              border: `1px solid ${chartColors.light}`
            }}>
              <div style={{ fontSize: '9px', color: chartColors.gray }}>{factor.factor}</div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>{factor.value}</div>
              <div style={{ fontSize: '9px', color: chartColors.primary }}>→ {factor.implication}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DecisionTree;
