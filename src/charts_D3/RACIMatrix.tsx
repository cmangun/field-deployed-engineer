"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// RACI Matrix data
const defaultData = {
  project: 'Product Launch v2.0',
  lastUpdated: 'Nov 15, 2024',
  workstreams: [
    { id: 'ws1', name: 'Product Development', category: 'Engineering' },
    { id: 'ws2', name: 'QA & Testing', category: 'Engineering' },
    { id: 'ws3', name: 'Infrastructure Setup', category: 'Engineering' },
    { id: 'ws4', name: 'Marketing Campaign', category: 'Go-to-Market' },
    { id: 'ws5', name: 'Sales Enablement', category: 'Go-to-Market' },
    { id: 'ws6', name: 'Customer Success Prep', category: 'Go-to-Market' },
    { id: 'ws7', name: 'Legal & Compliance', category: 'Operations' },
    { id: 'ws8', name: 'Finance & Pricing', category: 'Operations' },
    { id: 'ws9', name: 'Documentation', category: 'Support' },
    { id: 'ws10', name: 'Training Materials', category: 'Support' },
  ],
  stakeholders: [
    { id: 'p1', name: 'Sarah Chen', role: 'Product Manager', team: 'Product', initials: 'SC' },
    { id: 'p2', name: 'Mike Johnson', role: 'Engineering Lead', team: 'Engineering', initials: 'MJ' },
    { id: 'p3', name: 'Lisa Wong', role: 'Marketing Director', team: 'Marketing', initials: 'LW' },
    { id: 'p4', name: 'David Park', role: 'CTO', team: 'Executive', initials: 'DP' },
    { id: 'p5', name: 'Alex Kim', role: 'Sales Lead', team: 'Sales', initials: 'AK' },
    { id: 'p6', name: 'Emma Davis', role: 'CS Manager', team: 'Success', initials: 'ED' },
    { id: 'p7', name: 'James Lee', role: 'Legal Counsel', team: 'Legal', initials: 'JL' },
    { id: 'p8', name: 'Rachel Green', role: 'Finance Lead', team: 'Finance', initials: 'RG' },
  ],
  assignments: {
    'ws1-p1': 'A', 'ws1-p2': 'R', 'ws1-p4': 'C',
    'ws2-p1': 'I', 'ws2-p2': 'A', 'ws2-p4': 'I',
    'ws3-p2': 'R', 'ws3-p4': 'A',
    'ws4-p1': 'C', 'ws4-p3': 'R', 'ws4-p4': 'A', 'ws4-p5': 'C',
    'ws5-p1': 'C', 'ws5-p3': 'C', 'ws5-p5': 'R', 'ws5-p4': 'A',
    'ws6-p1': 'C', 'ws6-p5': 'C', 'ws6-p6': 'R', 'ws6-p4': 'A',
    'ws7-p1': 'I', 'ws7-p4': 'A', 'ws7-p7': 'R',
    'ws8-p1': 'C', 'ws8-p4': 'A', 'ws8-p8': 'R',
    'ws9-p1': 'A', 'ws9-p2': 'C', 'ws9-p6': 'R',
    'ws10-p1': 'C', 'ws10-p3': 'I', 'ws10-p5': 'C', 'ws10-p6': 'R', 'ws10-p4': 'A',
  } as Record<string, string>,
};

const raciConfig: Record<string, { color: string; bg: string; label: string; description: string }> = {
  R: { color: chartColors.primary, bg: chartColors.light, label: 'Responsible', description: 'Does the work' },
  A: { color: chartColors.navy, bg: chartColors.light, label: 'Accountable', description: 'Owns the outcome' },
  C: { color: chartColors.secondary, bg: chartColors.light, label: 'Consulted', description: 'Provides input' },
  I: { color: chartColors.muted, bg: chartColors.light, label: 'Informed', description: 'Kept in the loop' },
};

interface RACIMatrixProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const RACIMatrix: React.FC<RACIMatrixProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "RACI Matrix"
}) => {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'matrix' | 'byPerson' | 'summary'>('matrix');

  const getAssignment = (wsId: string, pId: string) => {
    return data.assignments[`${wsId}-${pId}`] || null;
  };

  const filteredWorkstreams = data.workstreams;
  const filteredStakeholders = filterRole 
    ? data.stakeholders.filter(s => data.workstreams.some(ws => {
        const assignment = getAssignment(ws.id, s.id);
        return assignment === filterRole;
      }))
    : data.stakeholders;

  return (
    <div style={{ width: '100%' }}>
      {/* Legend & Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {Object.entries(raciConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setFilterRole(filterRole === key ? null : key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                backgroundColor: filterRole === key ? config.color : config.bg,
                color: filterRole === key ? 'white' : config.color,
                border: `1px solid ${config.color}`,
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '10px'
              }}
            >
              <span style={{ fontWeight: 700 }}>{key}</span>
              <span>{config.label}</span>
            </button>
          ))}
        </div>
        
        <div style={{ fontSize: '10px', color: chartColors.gray }}>
          {Object.keys(data.assignments).length} assignments
        </div>
      </div>

      {viewMode === 'matrix' && (
        <div style={{ overflowX: 'auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `180px repeat(${filteredStakeholders.length}, 1fr)`,
            gap: '1px',
            backgroundColor: chartColors.light,
            borderRadius: '8px',
            overflow: 'hidden',
            fontSize: '10px',
            minWidth: `${180 + filteredStakeholders.length * 70}px`
          }}>
            {/* Header row */}
            <div style={{ padding: '10px', backgroundColor: chartColors.background, fontWeight: 600 }}>
              Workstream
            </div>
            {filteredStakeholders.map((person) => (
              <div key={person.id} style={{
                padding: '8px 4px',
                backgroundColor: chartColors.background,
                textAlign: 'center',
                minWidth: '60px'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: chartColors.teal,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 4px',
                  fontSize: '9px',
                  fontWeight: 600
                }}>
                  {person.initials}
                </div>
                <div style={{ fontSize: '8px', color: chartColors.gray }}>{person.role.split(' ')[0]}</div>
              </div>
            ))}
            
            {/* Data rows */}
            {filteredWorkstreams.map((ws, wsIndex) => (
              <React.Fragment key={ws.id}>
                <div style={{
                  padding: '10px',
                  backgroundColor: 'white',
                  borderTop: wsIndex > 0 && data.workstreams[wsIndex - 1]?.category !== ws.category ? `2px solid ${chartColors.light}` : 'none'
                }}>
                  <div style={{ fontWeight: 500 }}>{ws.name}</div>
                  <div style={{ fontSize: '8px', color: chartColors.gray }}>{ws.category}</div>
                </div>
                {filteredStakeholders.map((person) => {
                  const assignment = getAssignment(ws.id, person.id);
                  const config = assignment ? raciConfig[assignment] : null;
                  const cellKey = `${ws.id}-${person.id}`;
                  const isSelected = selectedCell === cellKey;
                  
                  return (
                    <div
                      key={cellKey}
                      onClick={() => setSelectedCell(isSelected ? null : cellKey)}
                      style={{
                        padding: '8px',
                        backgroundColor: isSelected ? chartColors.light : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        minWidth: '60px'
                      }}
                    >
                      {assignment && config && (
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          backgroundColor: config.bg,
                          color: config.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '12px',
                          border: `2px solid ${config.color}`
                        }}>
                          {assignment}
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'byPerson' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxHeight: '380px', overflowY: 'auto' }}>
          {data.stakeholders.map((person) => {
            const personAssignments = data.workstreams.map(ws => ({
              ws,
              role: getAssignment(ws.id, person.id)
            })).filter(a => a.role);
            
            return (
              <div key={person.id} style={{
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '10px',
                border: `1px solid ${chartColors.light}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: chartColors.teal,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600
                  }}>
                    {person.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>{person.name}</div>
                    <div style={{ fontSize: '9px', color: chartColors.gray }}>{person.role}</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                  {Object.entries(raciConfig).map(([key, config]) => {
                    const count = personAssignments.filter(a => a.role === key).length;
                    if (count === 0) return null;
                    return (
                      <span key={key} style={{
                        padding: '2px 8px',
                        backgroundColor: config.bg,
                        color: config.color,
                        borderRadius: '4px',
                        fontSize: '9px',
                        fontWeight: 600
                      }}>
                        {key}: {count}
                      </span>
                    );
                  })}
                </div>
                
                <div style={{ fontSize: '9px' }}>
                  {personAssignments.slice(0, 4).map((a, i) => {
                    const config = raciConfig[a.role!];
                    return (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 0',
                        borderTop: i > 0 ? `1px solid ${chartColors.light}` : 'none'
                      }}>
                        <span style={{
                          width: '18px',
                          height: '18px',
                          backgroundColor: config.bg,
                          color: config.color,
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '10px'
                        }}>
                          {a.role}
                        </span>
                        <span style={{ color: chartColors.charcoal }}>{a.ws.name}</span>
                      </div>
                    );
                  })}
                  {personAssignments.length > 4 && (
                    <div style={{ color: chartColors.gray, paddingTop: '4px' }}>
                      +{personAssignments.length - 4} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'summary' && (
        <div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
            RESPONSIBILITY DISTRIBUTION
          </div>
          
          {/* By Role Type */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
            {Object.entries(raciConfig).map(([key, config]) => {
              const count = Object.values(data.assignments).filter(v => v === key).length;
              const percentage = Math.round((count / Object.keys(data.assignments).length) * 100);
              
              return (
                <div key={key} style={{
                  padding: '16px',
                  backgroundColor: config.bg,
                  borderRadius: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: config.color }}>{count}</div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: config.color }}>{config.label}</div>
                  <div style={{ fontSize: '9px', color: config.color }}>{config.description}</div>
                  <div style={{
                    marginTop: '8px',
                    height: '4px',
                    backgroundColor: `${config.color}30`,
                    borderRadius: '2px'
                  }}>
                    <div style={{
                      width: `${percentage}%`,
                      height: '100%',
                      backgroundColor: config.color,
                      borderRadius: '2px'
                    }} />
                  </div>
                  <div style={{ fontSize: '9px', color: config.color, marginTop: '4px' }}>{percentage}%</div>
                </div>
              );
            })}
          </div>
          
          {/* Coverage Issues */}
          <div style={{
            padding: '12px',
            backgroundColor: chartColors.light,
            borderRadius: '10px',
            border: `1px solid ${chartColors.secondary}`
          }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.dark, marginBottom: '8px' }}>
              ⚠️ ATTENTION NEEDED
            </div>
            <div style={{ fontSize: '10px', color: chartColors.dark }}>
              {data.workstreams.filter(ws => 
                !Object.entries(data.assignments).some(([k, v]) => k.startsWith(ws.id) && v === 'A')
              ).length > 0 && (
                <div style={{ marginBottom: '4px' }}>
                  • {data.workstreams.filter(ws => 
                    !Object.entries(data.assignments).some(([k, v]) => k.startsWith(ws.id) && v === 'A')
                  ).length} workstream(s) missing Accountable owner
                </div>
              )}
              {data.workstreams.filter(ws => 
                !Object.entries(data.assignments).some(([k, v]) => k.startsWith(ws.id) && v === 'R')
              ).length > 0 && (
                <div style={{ marginBottom: '4px' }}>
                  • {data.workstreams.filter(ws => 
                    !Object.entries(data.assignments).some(([k, v]) => k.startsWith(ws.id) && v === 'R')
                  ).length} workstream(s) missing Responsible party
                </div>
              )}
              {data.stakeholders.filter(p => 
                Object.entries(data.assignments).filter(([k, v]) => k.includes(p.id) && v === 'A').length > 3
              ).length > 0 && (
                <div>
                  • {data.stakeholders.filter(p => 
                    Object.entries(data.assignments).filter(([k, v]) => k.includes(p.id) && v === 'A').length > 3
                  ).map(p => p.name).join(', ')} may be overloaded (4+ Accountable)
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RACIMatrix;
