"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Customer Journey Map data
const defaultData = {
  persona: {
    name: 'Sarah Chen',
    role: 'Data Science Manager',
    company: 'Mid-size FinTech',
    avatar: '👩‍💼',
  },
  goal: 'Deploy ML models to production faster with less DevOps overhead',
  stages: [
    {
      id: 'awareness',
      name: 'Awareness',
      icon: '👀',
      color: chartColors.navy,
      duration: '2-4 weeks',
      touchpoints: [
        { channel: 'LinkedIn Ad', type: 'paid' },
        { channel: 'Tech blog article', type: 'organic' },
        { channel: 'Peer recommendation', type: 'referral' },
      ],
      actions: [
        'Reads "MLOps best practices" blog post',
        'Sees retargeting ad on LinkedIn',
        'Colleague mentions platform in Slack',
      ],
      thoughts: [
        '"Our deployment process is too slow"',
        '"I wonder if there\'s a better way"',
        '"Maybe I should look into MLOps tools"',
      ],
      emotions: { score: 3, label: 'Frustrated' },
      painPoints: ['Manual deployment takes 2+ weeks', 'No visibility into model drift'],
      opportunities: ['SEO for "MLOps platform comparison"', 'Case studies from FinTech peers'],
    },
    {
      id: 'consideration',
      name: 'Consideration',
      icon: '🔍',
      color: chartColors.navy,
      duration: '1-2 weeks',
      touchpoints: [
        { channel: 'Product website', type: 'owned' },
        { channel: 'G2/Gartner reviews', type: 'earned' },
        { channel: 'Competitor comparison', type: 'organic' },
      ],
      actions: [
        'Visits website, watches demo video',
        'Reads G2 reviews (4.7 stars)',
        'Downloads comparison whitepaper',
      ],
      thoughts: [
        '"This looks promising, but is it secure?"',
        '"How does it compare to Sagemaker?"',
        '"I need to justify the cost to my VP"',
      ],
      emotions: { score: 4, label: 'Curious' },
      painPoints: ['Unclear pricing model', 'Security/compliance questions'],
      opportunities: ['ROI calculator tool', 'SOC2/HIPAA badges prominent'],
    },
    {
      id: 'decision',
      name: 'Decision',
      icon: '✅',
      color: chartColors.primary,
      duration: '2-3 weeks',
      touchpoints: [
        { channel: 'Sales demo call', type: 'sales' },
        { channel: 'Free trial', type: 'product' },
        { channel: 'Technical POC', type: 'product' },
      ],
      actions: [
        'Schedules demo with sales rep',
        'Starts 14-day free trial',
        'Runs POC with real dataset',
      ],
      thoughts: [
        '"The trial is going well"',
        '"My team likes the UI"',
        '"Need to get procurement involved"',
      ],
      emotions: { score: 5, label: 'Optimistic' },
      painPoints: ['Long procurement process', 'Need IT security approval'],
      opportunities: ['Streamlined security questionnaire', 'Pre-filled procurement docs'],
    },
    {
      id: 'purchase',
      name: 'Purchase',
      icon: '💳',
      color: chartColors.primary,
      duration: '1-2 weeks',
      touchpoints: [
        { channel: 'Contract negotiation', type: 'sales' },
        { channel: 'Legal review', type: 'sales' },
        { channel: 'Payment processing', type: 'finance' },
      ],
      actions: [
        'Negotiates annual contract',
        'Legal approves MSA',
        'Signs and pays invoice',
      ],
      thoughts: [
        '"Finally got budget approval!"',
        '"Hope onboarding is smooth"',
        '"Excited to get started"',
      ],
      emotions: { score: 5, label: 'Excited' },
      painPoints: ['Complex contract terms', 'Unclear SLAs'],
      opportunities: ['Simplified contract options', 'Clear onboarding timeline'],
    },
    {
      id: 'onboarding',
      name: 'Onboarding',
      icon: '🚀',
      color: chartColors.secondary,
      duration: '2-4 weeks',
      touchpoints: [
        { channel: 'Kickoff call', type: 'cs' },
        { channel: 'Documentation', type: 'product' },
        { channel: 'Slack community', type: 'community' },
      ],
      actions: [
        'Attends kickoff with CSM',
        'Completes setup wizard',
        'Deploys first model to staging',
      ],
      thoughts: [
        '"This is easier than expected"',
        '"Documentation is helpful"',
        '"Support team is responsive"',
      ],
      emotions: { score: 4, label: 'Hopeful' },
      painPoints: ['SSO integration complexity', 'Data migration questions'],
      opportunities: ['Interactive onboarding checklist', 'Office hours for new users'],
    },
    {
      id: 'retention',
      name: 'Retention',
      icon: '🔄',
      color: chartColors.cyan,
      duration: 'Ongoing',
      touchpoints: [
        { channel: 'QBRs', type: 'cs' },
        { channel: 'Product updates', type: 'product' },
        { channel: 'User conference', type: 'events' },
      ],
      actions: [
        'Expands to 3 more teams',
        'Attends annual user conference',
        'Submits feature requests',
      ],
      thoughts: [
        '"This has become essential"',
        '"ROI is clear to leadership"',
        '"Want to try new features"',
      ],
      emotions: { score: 5, label: 'Satisfied' },
      painPoints: ['Feature requests in backlog', 'Wants more integrations'],
      opportunities: ['Power user program', 'Customer advisory board'],
    },
    {
      id: 'advocacy',
      name: 'Advocacy',
      icon: '📣',
      color: chartColors.cyan,
      duration: 'Ongoing',
      touchpoints: [
        { channel: 'Case study', type: 'marketing' },
        { channel: 'Referral program', type: 'sales' },
        { channel: 'Speaking opportunity', type: 'events' },
      ],
      actions: [
        'Agrees to case study',
        'Refers 2 other companies',
        'Speaks at industry conference',
      ],
      thoughts: [
        '"Happy to share our success"',
        '"Want to help others"',
        '"Good for my personal brand"',
      ],
      emotions: { score: 5, label: 'Proud' },
      painPoints: ['Time commitment for case study'],
      opportunities: ['Referral incentives', 'Co-marketing opportunities'],
    },
  ],
};

const emotionColors: Record<number, string> = {
  1: chartColors.dark,
  2: chartColors.secondary,
  3: chartColors.secondary,
  4: chartColors.cyan,
  5: chartColors.primary,
};

interface CustomerJourneyMapProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const CustomerJourneyMap: React.FC<CustomerJourneyMapProps> = ({
  data = defaultData,
  width = 800,
  height = 600,
  title = "Customer Journey Map"
}) => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'detail'>('overview');

  const stageWidth = (width - 60) / data.stages.length;

  return (
    <div style={{ width: '100%' }}>
      {/* Goal Banner */}
      <div style={{
        padding: '12px 16px',
        backgroundColor: chartColors.light,
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '13px',
        color: chartColors.navy,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <strong>Goal:</strong> {data.goal}
      </div>

      {/* Journey Stages */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {data.stages.map((stage, i) => {
          const isSvgIcon = stage.icon.endsWith('.svg');
          return (
            <div
              key={stage.id}
              onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
              style={{
                flex: 1,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {/* Stage Header */}
              <div style={{
                padding: '16px 12px',
                backgroundColor: selectedStage === stage.id ? stage.color : `${stage.color}15`,
                borderRadius: '8px 8px 0 0',
                textAlign: 'center',
                borderBottom: `3px solid ${stage.color}`
              }}>
                {isSvgIcon ? (
                  <img 
                    src={stage.icon} 
                    alt={stage.name}
                    style={{ 
                      width: '28px', 
                      height: '28px', 
                      marginBottom: '6px',
                      filter: selectedStage === stage.id ? 'brightness(0) invert(1)' : 'none'
                    }} 
                  />
                ) : (
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>{stage.icon}</div>
                )}
                <div style={{ 
                  fontSize: '11px', 
                  fontWeight: 600, 
                  color: selectedStage === stage.id ? 'white' : stage.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {stage.name}
                </div>
                <div style={{ 
                  fontSize: '10px', 
                  color: selectedStage === stage.id ? 'rgba(255,255,255,0.8)' : chartColors.gray,
                  marginTop: '4px'
                }}>
                  {stage.duration}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Emotion Line */}
      <div style={{ marginBottom: '20px', position: 'relative' }}>
        <div style={{ 
          fontSize: '11px', 
          color: chartColors.gray, 
          marginBottom: '8px',
          fontWeight: 600,
          letterSpacing: '0.5px'
        }}>
          EMOTIONAL JOURNEY
        </div>
        <svg width={width - 60} height={150}>
          {/* Grid lines */}
          {[1, 2, 3, 4, 5].map((level) => (
            <line
              key={level}
              x1={0}
              y1={140 - level * 25}
              x2={width - 60}
              y2={140 - level * 25}
              stroke={chartColors.light}
              strokeWidth={1}
            />
          ))}
          
          {/* Emotion path */}
          <path
            d={data.stages.map((stage, i) => {
              const x = i * stageWidth + stageWidth / 2;
              const y = 140 - stage.emotions.score * 25;
              return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
            }).join(' ')}
            fill="none"
            stroke={chartColors.teal}
            strokeWidth={2.5}
          />
          
          {/* Emotion dots */}
          {data.stages.map((stage, i) => {
            const x = i * stageWidth + stageWidth / 2;
            const y = 140 - stage.emotions.score * 25;
            return (
              <g key={stage.id}>
                <circle
                  cx={x}
                  cy={y}
                  r={7}
                  fill={emotionColors[stage.emotions.score]}
                  stroke="white"
                  strokeWidth={2}
                />
                <text
                  x={x}
                  y={y + 22}
                  textAnchor="middle"
                  fontSize={9}
                  fill={chartColors.gray}
                >
                  {stage.emotions.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail Rows */}
      {viewMode === 'overview' ? (
        <>
          {/* Touchpoints Row */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', color: chartColors.gray, fontWeight: 600, marginBottom: '8px', letterSpacing: '0.5px' }}>
              TOUCHPOINTS
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {data.stages.map((stage) => (
                <div key={stage.id} style={{ flex: 1 }}>
                  {stage.touchpoints.slice(0, 2).map((tp, i) => (
                    <div key={i} style={{
                      padding: '8px 10px',
                      backgroundColor: chartColors.background,
                      borderRadius: '6px',
                      fontSize: '11px',
                      marginBottom: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: stage.color,
                        flexShrink: 0
                      }} />
                      {tp.channel}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Pain Points Row */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', color: chartColors.gray, fontWeight: 600, marginBottom: '8px', letterSpacing: '0.5px' }}>
              PAIN POINTS
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {data.stages.map((stage) => (
                <div key={stage.id} style={{ flex: 1 }}>
                  {stage.painPoints.slice(0, 1).map((pain, i) => (
                    <div key={i} style={{
                      padding: '8px 10px',
                      backgroundColor: chartColors.light,
                      borderRadius: '6px',
                      fontSize: '11px',
                      color: chartColors.dark,
                      borderLeft: `3px solid ${chartColors.dark}`
                    }}>
                      {pain}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Opportunities Row */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '11px', color: chartColors.gray, fontWeight: 600, marginBottom: '8px', letterSpacing: '0.5px' }}>
              OPPORTUNITIES
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {data.stages.map((stage) => (
                <div key={stage.id} style={{ flex: 1 }}>
                  {stage.opportunities.slice(0, 1).map((opp, i) => (
                    <div key={i} style={{
                      padding: '8px 10px',
                      backgroundColor: `${chartColors.primary}10`,
                      borderRadius: '6px',
                      fontSize: '11px',
                      color: chartColors.primary,
                      borderLeft: `3px solid ${chartColors.primary}`
                    }}>
                      {opp}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Detail View - Selected Stage */
        selectedStage ? (
          (() => {
            const stage = data.stages.find(s => s.id === selectedStage);
            if (!stage) return null;
            
            return (
              <div style={{
                padding: '12px',
                backgroundColor: `${stage.color}08`,
                borderRadius: '8px',
                border: `1px solid ${stage.color}30`
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {/* Actions */}
                  <div>
                    <div style={{ fontSize: '9px', fontWeight: 600, color: stage.color, marginBottom: '6px' }}>
                      ACTIONS
                    </div>
                    {stage.actions.map((action, i) => (
                      <div key={i} style={{ fontSize: '9px', color: chartColors.charcoal, marginBottom: '4px' }}>
                        • {action}
                      </div>
                    ))}
                  </div>
                  
                  {/* Thoughts */}
                  <div>
                    <div style={{ fontSize: '9px', fontWeight: 600, color: stage.color, marginBottom: '6px' }}>
                      THOUGHTS
                    </div>
                    {stage.thoughts.map((thought, i) => (
                      <div key={i} style={{ 
                        fontSize: '9px', 
                        color: chartColors.charcoal, 
                        marginBottom: '4px',
                        fontStyle: 'italic'
                      }}>
                        {thought}
                      </div>
                    ))}
                  </div>
                  
                  {/* Touchpoints */}
                  <div>
                    <div style={{ fontSize: '9px', fontWeight: 600, color: stage.color, marginBottom: '6px' }}>
                      TOUCHPOINTS
                    </div>
                    {stage.touchpoints.map((tp, i) => (
                      <div key={i} style={{
                        padding: '4px 6px',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        fontSize: '9px',
                        marginBottom: '4px',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}>
                        <span>{tp.channel}</span>
                        <span style={{ 
                          fontSize: '8px', 
                          color: chartColors.gray,
                          textTransform: 'uppercase'
                        }}>
                          {tp.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
          <div style={{ 
            padding: '24px', 
            textAlign: 'center', 
            color: chartColors.gray,
            fontSize: '11px',
            backgroundColor: chartColors.background,
            borderRadius: '8px'
          }}>
            Click a stage above to see detailed view
          </div>
        )
      )}
    </div>
  );
};

export default CustomerJourneyMap;
