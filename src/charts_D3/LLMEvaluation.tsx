"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// LLM Evaluation Dashboard data
const defaultData = {
  evaluationName: 'Q4 Model Selection',
  useCase: 'Customer Support Chatbot',
  testSetSize: 2500,
  models: [
    {
      id: 'gpt-4o',
      name: 'GPT-4o',
      provider: 'OpenAI',
      color: '#333',
      metrics: {
        accuracy: 94.2,
        relevance: 91.8,
        coherence: 96.1,
        safety: 98.5,
        latencyP50: 420,
        latencyP99: 1250,
        costPer1k: 2.50,
        tokensPerSec: 85,
      },
      strengths: ['Best accuracy', 'Excellent safety'],
      weaknesses: ['Highest cost', 'Slower latency'],
    },
    {
      id: 'claude-3-opus',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      color: '#555',
      metrics: {
        accuracy: 93.8,
        relevance: 93.2,
        coherence: 95.4,
        safety: 99.1,
        latencyP50: 380,
        latencyP99: 980,
        costPer1k: 1.50,
        tokensPerSec: 92,
      },
      strengths: ['Best safety score', 'Best relevance'],
      weaknesses: ['Slightly lower accuracy'],
    },
    {
      id: 'claude-3-sonnet',
      name: 'Claude 3.5 Sonnet',
      provider: 'Anthropic',
      color: '#222',
      metrics: {
        accuracy: 92.1,
        relevance: 90.5,
        coherence: 94.2,
        safety: 98.8,
        latencyP50: 180,
        latencyP99: 450,
        costPer1k: 0.30,
        tokensPerSec: 145,
      },
      strengths: ['Best value', 'Fast latency'],
      weaknesses: ['Lower accuracy than Opus'],
      recommended: true,
    },
    {
      id: 'gemini-pro',
      name: 'Gemini 1.5 Pro',
      provider: 'Google',
      color: '#666',
      metrics: {
        accuracy: 91.5,
        relevance: 89.8,
        coherence: 93.1,
        safety: 97.2,
        latencyP50: 320,
        latencyP99: 890,
        costPer1k: 0.35,
        tokensPerSec: 110,
      },
      strengths: ['Good multimodal', 'Large context'],
      weaknesses: ['Lower safety score', 'Inconsistent'],
    },
    {
      id: 'llama-3-70b',
      name: 'Llama 3 70B',
      provider: 'Meta (Self-hosted)',
      color: '#888',
      metrics: {
        accuracy: 88.4,
        relevance: 86.2,
        coherence: 90.5,
        safety: 94.1,
        latencyP50: 150,
        latencyP99: 380,
        costPer1k: 0.08,
        tokensPerSec: 165,
      },
      strengths: ['Lowest cost', 'Fastest', 'Self-hosted'],
      weaknesses: ['Lower accuracy', 'Safety concerns'],
    },
  ],
  categories: [
    { id: 'accuracy', name: 'Accuracy', description: 'Factual correctness', weight: 30, icon: '🎯' },
    { id: 'relevance', name: 'Relevance', description: 'Answer appropriateness', weight: 25, icon: '📍' },
    { id: 'coherence', name: 'Coherence', description: 'Logical flow', weight: 15, icon: '🔗' },
    { id: 'safety', name: 'Safety', description: 'Harmful content prevention', weight: 20, icon: '🛡️' },
    { id: 'latency', name: 'Latency', description: 'Response speed', weight: 5, icon: '⚡' },
    { id: 'cost', name: 'Cost', description: 'Price efficiency', weight: 5, icon: '💰' },
  ],
  testCategories: [
    { name: 'General Q&A', gpt4o: 95, claudeOpus: 94, claudeSonnet: 92, gemini: 91, llama: 87 },
    { name: 'Technical Support', gpt4o: 93, claudeOpus: 95, claudeSonnet: 91, gemini: 89, llama: 85 },
    { name: 'Billing Inquiries', gpt4o: 96, claudeOpus: 94, claudeSonnet: 93, gemini: 92, llama: 90 },
    { name: 'Complaint Handling', gpt4o: 91, claudeOpus: 93, claudeSonnet: 89, gemini: 88, llama: 82 },
    { name: 'Product Recommendations', gpt4o: 94, claudeOpus: 92, claudeSonnet: 91, gemini: 93, llama: 86 },
  ],
};

interface LLMEvaluationProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
  }

const LLMEvaluation: React.FC<LLMEvaluationProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "LLM Evaluation Dashboard"
}) => {
  const [selectedModel, setSelectedModel] = useState<string | null>('claude-3-sonnet');
  const [viewMode, setViewMode] = useState<'comparison' | 'categories' | 'cost'>('comparison');

  const getScoreColor = (score: number) => {
    if (score >= 95) return chartColors.primary;
    if (score >= 90) return chartColors.cyan;
    if (score >= 85) return chartColors.secondary;
    return chartColors.dark;
  };

  const calculateWeightedScore = (model: typeof data.models[0]) => {
    const m = model.metrics;
    // Normalize latency and cost (lower is better)
    const latencyScore = Math.max(0, 100 - (m.latencyP50 / 5));
    const costScore = Math.max(0, 100 - (m.costPer1k * 20));
    
    return (
      (m.accuracy * 0.30) +
      (m.relevance * 0.25) +
      (m.coherence * 0.15) +
      (m.safety * 0.20) +
      (latencyScore * 0.05) +
      (costScore * 0.05)
    ).toFixed(1);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Model Cards */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto' }}>
        {data.models.map((model) => {
          const isSelected = selectedModel === model.id;
          const weightedScore = calculateWeightedScore(model);
          
          return (
            <div
              key={model.id}
              onClick={() => setSelectedModel(isSelected ? null : model.id)}
              style={{
                minWidth: '140px',
                padding: '16px',
                backgroundColor: isSelected ? '#f0f0f0' : 'white',
                borderRadius: '10px',
                border: isSelected ? '2px solid #333' : '2px solid #e0e0e0',
                cursor: 'pointer',
                transition: 'all 0.15s',
                position: 'relative'
              }}
            >
              {model.recommended && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  padding: '4px 8px',
                  backgroundColor: '#333',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}>
                  RECOMMENDED
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <div style={{ 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%', 
                  backgroundColor: model.color 
                }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>{model.name}</div>
                  <div style={{ fontSize: '11px', color: '#888' }}>{model.provider}</div>
                </div>
              </div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#333' }}>{weightedScore}</div>
              <div style={{ fontSize: '12px', color: '#888' }}>Weighted Score</div>
            </div>
          );
        })}
      </div>

      {viewMode === 'comparison' && (
        <>
          {/* Metrics Comparison */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#555', marginBottom: '12px', letterSpacing: '0.5px' }}>
              QUALITY METRICS COMPARISON
            </div>
            {['accuracy', 'relevance', 'coherence', 'safety'].map((metric) => (
              <div key={metric} style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '14px', color: '#555', marginBottom: '4px', textTransform: 'capitalize' }}>
                  {metric}
                </div>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {data.models.map((model) => {
                    const value = model.metrics[metric as keyof typeof model.metrics] as number;
                    const isSelected = selectedModel === model.id;
                    return (
                      <div key={model.id} style={{ flex: 1 }}>
                        <div style={{
                          height: '28px',
                          backgroundColor: '#e4e4e4',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          position: 'relative'
                        }}>
                          <div style={{
                            width: `${value}%`,
                            height: '100%',
                            backgroundColor: isSelected ? model.color : '#888',
                            borderRadius: '4px',
                            transition: 'all 0.2s'
                          }} />
                          <span style={{
                            position: 'absolute',
                            right: '6px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: value > 50 ? 'white' : '#333'
                          }}>
                            {value}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Model Details */}
          {selectedModel && (
            <div style={{
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              {(() => {
                const model = data.models.find(m => m.id === selectedModel);
                if (!model) return null;
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                        ✓ STRENGTHS
                      </div>
                      {model.strengths.map((s, i) => (
                        <div key={i} style={{ fontSize: '14px', color: '#444', marginBottom: '4px' }}>
                          • {s}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                        ✗ WEAKNESSES
                      </div>
                      {model.weaknesses.map((w, i) => (
                        <div key={i} style={{ fontSize: '14px', color: '#444', marginBottom: '4px' }}>
                          • {w}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </>
      )}

      {viewMode === 'categories' && (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#555', padding: '12px', letterSpacing: '0.5px' }}>
            PERFORMANCE BY TEST CATEGORY
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr repeat(5, 1fr)',
            gap: '1px',
            backgroundColor: '#e0e0e0',
            fontSize: '13px'
          }}>
            {/* Header */}
            <div style={{ padding: '10px', backgroundColor: '#f5f5f5', fontWeight: 600 }}>Category</div>
            {data.models.map((m) => (
              <div key={m.id} style={{ padding: '10px', backgroundColor: '#f5f5f5', fontWeight: 600, textAlign: 'center' }}>
                {m.name.split(' ')[0]}
              </div>
            ))}
            
            {/* Rows */}
            {data.testCategories.map((cat) => (
              <React.Fragment key={cat.name}>
                <div style={{ padding: '12px 10px', backgroundColor: 'white', fontSize: '13px' }}>{cat.name}</div>
                <div style={{ padding: '12px 10px', backgroundColor: 'white', textAlign: 'center', color: '#333', fontWeight: 600, fontSize: '13px' }}>{cat.gpt4o}%</div>
                <div style={{ padding: '12px 10px', backgroundColor: 'white', textAlign: 'center', color: '#333', fontWeight: 600, fontSize: '13px' }}>{cat.claudeOpus}%</div>
                <div style={{ padding: '12px 10px', backgroundColor: 'white', textAlign: 'center', color: '#333', fontWeight: 600, fontSize: '13px' }}>{cat.claudeSonnet}%</div>
                <div style={{ padding: '12px 10px', backgroundColor: 'white', textAlign: 'center', color: '#333', fontWeight: 600, fontSize: '13px' }}>{cat.gemini}%</div>
                <div style={{ padding: '12px 10px', backgroundColor: 'white', textAlign: 'center', color: '#333', fontWeight: 600, fontSize: '13px' }}>{cat.llama}%</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'cost' && (
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#555', marginBottom: '12px', letterSpacing: '0.5px' }}>
            COST & LATENCY ANALYSIS
          </div>
          
          {data.models.map((model) => {
            const isSelected = selectedModel === model.id;
            return (
              <div
                key={model.id}
                onClick={() => setSelectedModel(isSelected ? null : model.id)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr 1fr 1fr 1fr',
                  gap: '12px',
                  padding: '14px',
                  backgroundColor: isSelected ? '#f0f0f0' : 'white',
                  borderRadius: '8px',
                  border: isSelected ? '2px solid #333' : '1px solid #e0e0e0',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ 
                    width: '10px', 
                    height: '10px', 
                    borderRadius: '50%', 
                    backgroundColor: model.color 
                  }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{model.name}</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>{model.provider}</div>
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#333' }}>${model.metrics.costPer1k.toFixed(2)}</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>per 1K tokens</div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#333' }}>{model.metrics.latencyP50}ms</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>p50 latency</div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#555' }}>{model.metrics.latencyP99}ms</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>p99 latency</div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#333' }}>{model.metrics.tokensPerSec}</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>tokens/sec</div>
                </div>
              </div>
            );
          })}
          
          {/* Cost projection */}
          <div style={{
            padding: '16px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            marginTop: '12px',
            fontSize: '13px'
          }}>
            <div style={{ fontWeight: 600, color: '#333', marginBottom: '8px' }}>💡 COST PROJECTION (1M requests/month)</div>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {data.models.map((m) => (
                <div key={m.id}>
                  <span style={{ color: '#666' }}>{m.name.split(' ')[0]}: </span>
                  <span style={{ fontWeight: 600, color: '#333' }}>${(m.metrics.costPer1k * 1000).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LLMEvaluation;
