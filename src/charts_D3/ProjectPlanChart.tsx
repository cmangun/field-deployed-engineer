// src/charts_D3/ProjectPlanChart.tsx
// ═══════════════════════════════════════════════════════════════════════════════
// PROJECT PLAN CHART — 6-Phase Execution Roadmap
// Displays structured project phases with goals, tasks, and deliverables
// ═══════════════════════════════════════════════════════════════════════════════

"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface Task {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
}

interface Phase {
  id: string;
  number: number;
  title: string;
  goal: string;
  tasks: Task[];
}

interface ProjectPlanData {
  title?: string;
  subtitle?: string;
  phases: Phase[];
}

interface ProjectPlanChartProps {
  data: ProjectPlanData;
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════════

const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#fafafa',
    borderRadius: '12px',
    padding: '24px',
    maxHeight: '600px',
    overflowY: 'auto' as const,
  },
  header: {
    marginBottom: '24px',
    borderBottom: `2px solid ${chartColors.charcoal}`,
    paddingBottom: '16px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    color: chartColors.charcoal,
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    color: chartColors.gray,
    marginTop: '4px',
  },
  phaseContainer: {
    marginBottom: '20px',
  },
  phaseHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: chartColors.charcoal,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  phaseNumber: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    color: chartColors.charcoal,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '14px',
    flexShrink: 0,
  },
  phaseTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#fff',
    flex: 1,
  },
  phaseGoal: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.8)',
    marginTop: '4px',
    fontWeight: 400,
  },
  expandIcon: {
    color: '#fff',
    fontSize: '18px',
    transition: 'transform 0.2s ease',
  },
  taskList: {
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '0 0 8px 8px',
    border: `1px solid ${chartColors.light}`,
    borderTop: 'none',
  },
  task: {
    padding: '12px 0',
    borderBottom: `1px solid ${chartColors.light}`,
  },
  taskLast: {
    padding: '12px 0',
    borderBottom: 'none',
  },
  taskHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  taskNumber: {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    backgroundColor: chartColors.light,
    color: chartColors.charcoal,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: '11px',
    flexShrink: 0,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: chartColors.charcoal,
    marginBottom: '4px',
  },
  taskDescription: {
    fontSize: '13px',
    color: chartColors.gray,
    lineHeight: 1.5,
  },
  bulletList: {
    margin: '8px 0 0 0',
    padding: '0 0 0 20px',
    listStyle: 'none',
  },
  bullet: {
    fontSize: '12px',
    color: chartColors.gray,
    lineHeight: 1.6,
    position: 'relative' as const,
    paddingLeft: '12px',
    marginBottom: '4px',
  },
  bulletDot: {
    position: 'absolute' as const,
    left: 0,
    top: '8px',
    width: '4px',
    height: '4px',
    backgroundColor: chartColors.gray,
    borderRadius: '50%',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const ProjectPlanChart: React.FC<ProjectPlanChartProps> = ({ data }) => {
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(['phase-1']));

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => {
      const next = new Set(prev);
      if (next.has(phaseId)) {
        next.delete(phaseId);
      } else {
        next.add(phaseId);
      }
      return next;
    });
  };

  if (!data?.phases?.length) {
    return <div style={styles.container}>No project plan data available</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>{data.title || 'Project Execution Plan'}</h3>
        {data.subtitle && <p style={styles.subtitle}>{data.subtitle}</p>}
      </div>

      {data.phases.map((phase) => {
        const isExpanded = expandedPhases.has(phase.id);
        return (
          <div key={phase.id} style={styles.phaseContainer}>
            <div
              style={{
                ...styles.phaseHeader,
                borderRadius: isExpanded ? '8px 8px 0 0' : '8px',
              }}
              onClick={() => togglePhase(phase.id)}
            >
              <div style={styles.phaseNumber}>{phase.number}</div>
              <div style={{ flex: 1 }}>
                <div style={styles.phaseTitle}>{phase.title}</div>
                <div style={styles.phaseGoal}>{phase.goal}</div>
              </div>
              <span
                style={{
                  ...styles.expandIcon,
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                ▼
              </span>
            </div>

            {isExpanded && (
              <div style={styles.taskList}>
                {phase.tasks.map((task, idx) => (
                  <div
                    key={task.id}
                    style={idx === phase.tasks.length - 1 ? styles.taskLast : styles.task}
                  >
                    <div style={styles.taskHeader}>
                      <div style={styles.taskNumber}>{task.id}</div>
                      <div style={styles.taskContent}>
                        <div style={styles.taskTitle}>{task.title}</div>
                        <div style={styles.taskDescription}>{task.description}</div>
                        {task.bullets && task.bullets.length > 0 && (
                          <ul style={styles.bulletList}>
                            {task.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} style={styles.bullet}>
                                <span style={styles.bulletDot} />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProjectPlanChart;
