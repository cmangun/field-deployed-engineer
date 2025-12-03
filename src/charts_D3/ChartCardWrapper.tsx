/**
 * ChartCardWrapper - Wraps D3 charts with neo-skeuomorphic soft UI
 * 
 * Provides the insight, next step, owner, impact, and status footer
 * that transforms raw charts into executive-ready visualizations.
 */

"use client";
import React from 'react';
import { ChartCard } from '@/data/caseStudies/chartData';

interface ChartCardWrapperProps {
  chartData: ChartCard;
  children: React.ReactNode; // The actual chart component
  className?: string;
}

const statusColors: Record<string, string> = {
  'Approved': 'approved',
  'Draft': 'draft',
  'In Review': 'in-review'
};

const ChartCardWrapper: React.FC<ChartCardWrapperProps> = ({
  chartData,
  children,
  className = ''
}) => {
  const { 
    name, 
    description, 
    insight, 
    next_step, 
    owner, 
    impact, 
    status 
  } = chartData;

  return (
    <div className={`chart-card ${className}`}>
      {/* Header */}
      <div className="chart-card__header">
        <h4 className="chart-card__title">{name}</h4>
        <p className="chart-card__description">{description}</p>
      </div>

      {/* Chart Region */}
      <div className="chart-card__chart">
        {children}
      </div>

      {/* Footer Panel */}
      <div className="chart-card__footer">
        {/* Insight */}
        <div className="chart-card__insight">
          <span className="chart-card__insight-label">Insight</span>
          <p className="chart-card__insight-text">{insight}</p>
        </div>

        {/* Next Step */}
        <div className="chart-card__next-step">
          <span className="chart-card__next-step-label">Next Step</span>
          <div className="chart-card__next-step-box">
            <div className="chart-card__recommendation">
              <p className="chart-card__recommendation-text">{next_step}</p>
              <div className="chart-card__next-step-meta">
                <span className="chart-pill chart-pill--stakeholder">{owner}</span>
                <span className="chart-pill chart-pill--impact">Impact: {impact}</span>
              </div>
            </div>
            <div className="chart-card__next-step-action">
              <button 
                className={`chart-pill chart-pill--status ${statusColors[status] || ''}`}
                style={{ cursor: 'default' }}
              >
                {status}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartCardWrapper;

/**
 * Inline styles version (no SCSS required)
 * Use this if SCSS isn't available
 */
export const ChartCardWrapperInline: React.FC<ChartCardWrapperProps> = ({
  chartData,
  children,
  className = ''
}) => {
  const { 
    name, 
    description, 
    insight, 
    next_step, 
    owner, 
    impact, 
    status 
  } = chartData;

  const statusBgColors: Record<string, string> = {
    'Approved': 'linear-gradient(145deg, #059669, #047857)',
    'Draft': 'linear-gradient(145deg, #f59e0b, #d97706)',
    'In Review': 'linear-gradient(145deg, #3b82f6, #2563eb)'
  };

  return (
    <div 
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        position: 'relative',
        padding: '26px 28px',
        borderRadius: '22px',
        background: 'linear-gradient(145deg, #ffffff, #f7f7f8)',
        boxShadow: '-10px -10px 30px rgba(255, 255, 255, 0.85), 18px 18px 40px rgba(15, 15, 15, 0.10)',
        border: '1px solid rgba(255, 255, 255, 0.9)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h4 style={{ 
          margin: 0, 
          fontSize: '24px', 
          lineHeight: 1.25, 
          fontWeight: 600, 
          color: '#111111' 
        }}>
          {name}
        </h4>
        <p style={{ 
          margin: 0, 
          fontSize: '14px', 
          lineHeight: 1.6, 
          fontWeight: 400, 
          color: '#555555',
          maxWidth: '640px'
        }}>
          {description}
        </p>
      </div>

      {/* Chart Region */}
      <div style={{ marginTop: '8px' }}>
        {children}
      </div>

      {/* Footer Panel */}
      <div style={{
        marginTop: '20px',
        padding: '18px 20px',
        borderRadius: '18px',
        background: 'linear-gradient(145deg, #f7f7f8, #f0f1f4)',
        boxShadow: 'inset -4px -4px 12px rgba(255, 255, 255, 0.8), inset 4px 4px 16px rgba(15, 15, 15, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {/* Insight */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{
            fontSize: '11px',
            lineHeight: 1.2,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#a0a0aa'
          }}>
            Insight
          </span>
          <p style={{
            margin: 0,
            fontSize: '13px',
            lineHeight: 1.5,
            fontWeight: 400,
            color: '#444444'
          }}>
            {insight}
          </p>
        </div>

        {/* Next Step */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{
            fontSize: '11px',
            lineHeight: 1.2,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#a0a0aa'
          }}>
            Next Step
          </span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '14px 18px',
            borderRadius: '14px',
            background: 'linear-gradient(145deg, #ffffff, #f5f5f7)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            boxShadow: '-4px -4px 10px rgba(255, 255, 255, 0.9), 4px 4px 14px rgba(15, 15, 15, 0.10)'
          }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{
                margin: 0,
                fontSize: '14px',
                lineHeight: 1.5,
                fontWeight: 600,
                color: '#111111'
              }}>
                {next_step}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: 1.2,
                  borderColor: 'rgba(0, 0, 0, 0.06)',
                  background: 'linear-gradient(145deg, #ffffff, #f5f5f7)',
                  color: '#444444',
                  boxShadow: '-2px -2px 6px rgba(255, 255, 255, 0.9), 2px 2px 6px rgba(0, 0, 0, 0.08)'
                }}>
                  {owner}
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 500,
                  lineHeight: 1.2,
                  border: '1px solid rgba(0, 0, 0, 0.7)',
                  background: 'linear-gradient(145deg, #111111, #1b1b1b)',
                  color: '#ffffff',
                  boxShadow: '-2px -2px 5px rgba(255, 255, 255, 0.25), 2px 2px 7px rgba(0, 0, 0, 0.40)'
                }}>
                  Impact: {impact}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
                background: statusBgColors[status] || statusBgColors['Draft'],
                color: '#ffffff'
              }}>
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
