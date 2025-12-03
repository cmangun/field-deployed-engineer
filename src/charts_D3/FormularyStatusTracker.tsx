"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Formulary Status Tracker data
const defaultData = {
  drugName: 'NEXAGEN™',
  asOfDate: 'November 2026',
  totalLives: 285000000,
  coveredLives: 228000000,
  payers: [
    {
      id: 'cvs-caremark',
      name: 'CVS Caremark',
      type: 'PBM',
      lives: 75000000,
      status: 'preferred',
      tier: 'T2',
      paRequired: false,
      stepTherapy: false,
      effectiveDate: 'Oct 2026',
      notes: 'Preferred brand, no restrictions'
    },
    {
      id: 'express-scripts',
      name: 'Express Scripts',
      type: 'PBM',
      lives: 70000000,
      status: 'covered',
      tier: 'T3',
      paRequired: true,
      stepTherapy: false,
      effectiveDate: 'Nov 2026',
      notes: 'PA required, 2L+ only'
    },
    {
      id: 'optumrx',
      name: 'OptumRx',
      type: 'PBM',
      lives: 65000000,
      status: 'preferred',
      tier: 'T2',
      paRequired: false,
      stepTherapy: false,
      effectiveDate: 'Oct 2026',
      notes: 'No restrictions'
    },
    {
      id: 'medicare-cms',
      name: 'Medicare Part B',
      type: 'Government',
      lives: 45000000,
      status: 'covered',
      tier: 'Buy & Bill',
      paRequired: false,
      stepTherapy: false,
      effectiveDate: 'Oct 2026',
      notes: 'J-code approved'
    },
    {
      id: 'aetna',
      name: 'Aetna',
      type: 'Commercial',
      lives: 23000000,
      status: 'restricted',
      tier: 'T4',
      paRequired: true,
      stepTherapy: true,
      effectiveDate: 'Dec 2026',
      notes: 'Step through Competitor A'
    },
    {
      id: 'cigna',
      name: 'Cigna',
      type: 'Commercial',
      lives: 18000000,
      status: 'pending',
      tier: 'TBD',
      paRequired: null,
      stepTherapy: null,
      effectiveDate: 'Q1 2027',
      notes: 'P&T review scheduled'
    },
    {
      id: 'anthem',
      name: 'Anthem BCBS',
      type: 'Commercial',
      lives: 22000000,
      status: 'covered',
      tier: 'T3',
      paRequired: true,
      stepTherapy: false,
      effectiveDate: 'Nov 2026',
      notes: 'PA for PD-L1 >50%'
    },
    {
      id: 'humana',
      name: 'Humana',
      type: 'Commercial',
      lives: 17000000,
      status: 'not-covered',
      tier: 'NC',
      paRequired: null,
      stepTherapy: null,
      effectiveDate: 'N/A',
      notes: 'Competitor exclusive'
    },
    {
      id: 'medicaid',
      name: 'State Medicaid (Avg)',
      type: 'Government',
      lives: 35000000,
      status: 'covered',
      tier: 'PDL',
      paRequired: true,
      stepTherapy: false,
      effectiveDate: 'Varies',
      notes: '42 states approved'
    },
    {
      id: 'va',
      name: 'VA/DoD',
      type: 'Government',
      lives: 15000000,
      status: 'preferred',
      tier: 'National',
      paRequired: false,
      stepTherapy: false,
      effectiveDate: 'Oct 2026',
      notes: 'Federal contract'
    },
  ],
  statusSummary: {
    preferred: { lives: 155000000, count: 3 },
    covered: { lives: 125000000, count: 4 },
    restricted: { lives: 23000000, count: 1 },
    pending: { lives: 18000000, count: 1 },
    notCovered: { lives: 17000000, count: 1 },
  }
};

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  'preferred': { color: chartColors.primary, bg: chartColors.light, label: 'Preferred' },
  'covered': { color: chartColors.primary, bg: chartColors.light, label: 'Covered' },
  'restricted': { color: chartColors.secondary, bg: chartColors.light, label: 'Restricted' },
  'pending': { color: chartColors.navy, bg: chartColors.light, label: 'Pending' },
  'not-covered': { color: chartColors.dark, bg: chartColors.light, label: 'Not Covered' },
};

interface FormularyStatusTrackerProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const FormularyStatusTracker: React.FC<FormularyStatusTrackerProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Formulary Status Tracker"
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [hoveredPayer, setHoveredPayer] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'lives' | 'status'>('lives');

  // Sort payers
  const sortedPayers = [...data.payers].sort((a, b) => {
    if (sortBy === 'lives') return b.lives - a.lives;
    const statusOrder = ['preferred', 'covered', 'restricted', 'pending', 'not-covered'];
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });

  // Filter by selected status
  const filteredPayers = selectedStatus 
    ? sortedPayers.filter(p => p.status === selectedStatus)
    : sortedPayers;

  // Calculate coverage percentage
  const coveragePercent = Math.round((data.coveredLives / data.totalLives) * 100);

  return (
    <div style={{ width: '100%' }}>
      {/* Status Summary Bar */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          height: '32px', 
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          border: `1px solid ${chartColors.light}`
        }}>
          {Object.entries(data.statusSummary).map(([status, info]) => {
            const width = (info.lives / data.totalLives) * 100;
            const isSelected = selectedStatus === status;
            return (
              <div
                key={status}
                onClick={() => setSelectedStatus(isSelected ? null : status)}
                style={{
                  width: `${width}%`,
                  backgroundColor: statusConfig[status]?.color || chartColors.secondary,
                  opacity: selectedStatus && !isSelected ? 0.3 : 1,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'opacity 0.2s'
                }}
              >
                {width > 10 && (
                  <span style={{ fontSize: '10px', fontWeight: 600, color: 'white' }}>
                    {Math.round(width)}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Status Legend */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
          {Object.entries(statusConfig).map(([status, config]) => {
            const info = data.statusSummary[status as keyof typeof data.statusSummary];
            const isSelected = selectedStatus === status;
            return (
              <div
                key={status}
                onClick={() => setSelectedStatus(isSelected ? null : status)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  backgroundColor: isSelected ? config.bg : 'transparent',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border: isSelected ? `1px solid ${config.color}` : '1px solid transparent'
                }}
              >
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: config.color }} />
                <span style={{ fontSize: '10px', color: chartColors.charcoalLight }}>
                  {config.label} ({info?.count || 0})
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sort Controls */}
      <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <button
          onClick={() => setSortBy('lives')}
          style={{
            padding: '4px 10px',
            fontSize: '10px',
            backgroundColor: sortBy === 'lives' ? chartColors.charcoal : 'white',
            color: sortBy === 'lives' ? 'white' : chartColors.charcoal,
            border: `1px solid ${chartColors.light}`,
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Sort by Lives
        </button>
        <button
          onClick={() => setSortBy('status')}
          style={{
            padding: '4px 10px',
            fontSize: '10px',
            backgroundColor: sortBy === 'status' ? chartColors.charcoal : 'white',
            color: sortBy === 'status' ? 'white' : chartColors.charcoal,
            border: `1px solid ${chartColors.light}`,
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Sort by Status
        </button>
      </div>

      {/* Payer Table */}
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '10px',
        border: `1px solid ${chartColors.light}`,
        overflow: 'hidden',
        maxHeight: '280px',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '140px 80px 60px 50px 50px 60px 1fr',
          gap: '8px',
          padding: '10px 12px',
          backgroundColor: chartColors.background,
          borderBottom: `1px solid ${chartColors.light}`,
          fontSize: '9px',
          fontWeight: 600,
          color: chartColors.charcoalLight,
          position: 'sticky',
          top: 0
        }}>
          <span>Payer</span>
          <span>Lives</span>
          <span>Status</span>
          <span>Tier</span>
          <span>PA</span>
          <span>Step</span>
          <span>Notes</span>
        </div>

        {/* Rows */}
        {filteredPayers.map((payer) => {
          const isHovered = hoveredPayer === payer.id;
          const config = statusConfig[payer.status];
          
          return (
            <div
              key={payer.id}
              onMouseEnter={() => setHoveredPayer(payer.id)}
              onMouseLeave={() => setHoveredPayer(null)}
              style={{ 
                display: 'grid',
                gridTemplateColumns: '140px 80px 60px 50px 50px 60px 1fr',
                gap: '8px',
                padding: '10px 12px',
                borderBottom: `1px solid ${chartColors.light}`,
                backgroundColor: isHovered ? chartColors.background : 'white',
                cursor: 'pointer',
                transition: 'background-color 0.15s'
              }}
            >
              {/* Payer Name */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>
                  {payer.name}
                </div>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>{payer.type}</div>
              </div>
              
              {/* Lives */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    height: '6px', 
                    backgroundColor: chartColors.light,
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${(payer.lives / 75000000) * 100}%`,
                      backgroundColor: config.color,
                      borderRadius: '3px'
                    }} />
                  </div>
                  <div style={{ fontSize: '9px', color: chartColors.gray, marginTop: '2px' }}>
                    {(payer.lives / 1000000).toFixed(0)}M
                  </div>
                </div>
              </div>
              
              {/* Status */}
              <div>
                <span style={{
                  fontSize: '8px',
                  fontWeight: 600,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: config.bg,
                  color: config.color
                }}>
                  {config.label}
                </span>
              </div>
              
              {/* Tier */}
              <div style={{ fontSize: '10px', color: chartColors.charcoal }}>
                {payer.tier}
              </div>
              
              {/* PA */}
              <div style={{ fontSize: '10px' }}>
                {payer.paRequired === null ? (
                  <span style={{ color: chartColors.secondary }}>—</span>
                ) : payer.paRequired ? (
                  <span style={{ color: chartColors.secondary }}>Yes</span>
                ) : (
                  <span style={{ color: chartColors.primary }}>No</span>
                )}
              </div>
              
              {/* Step Therapy */}
              <div style={{ fontSize: '10px' }}>
                {payer.stepTherapy === null ? (
                  <span style={{ color: chartColors.secondary }}>—</span>
                ) : payer.stepTherapy ? (
                  <span style={{ color: chartColors.dark }}>Yes</span>
                ) : (
                  <span style={{ color: chartColors.primary }}>No</span>
                )}
              </div>
              
              {/* Notes */}
              <div style={{ fontSize: '9px', color: chartColors.gray }}>
                {payer.notes}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Summary */}
      <div style={{ 
        marginTop: '12px',
        display: 'flex',
        gap: '16px',
        fontSize: '10px',
        color: chartColors.charcoalLight
      }}>
        <span>PA = Prior Authorization</span>
        <span>Step = Step Therapy Required</span>
        <span>PDL = Preferred Drug List</span>
        <span style={{ marginLeft: 'auto', color: chartColors.gray }}>
          {selectedStatus ? `Showing ${filteredPayers.length} payers` : `${data.payers.length} payers total`}
        </span>
      </div>
    </div>
  );
};

export default FormularyStatusTracker;
