"use client";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface FairnessMetricsProps {
  width?: number;
  height?: number;
}

const FairnessMetrics: React.FC<FairnessMetricsProps> = ({ width = 800, height = 500 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 80, right: 40, bottom: 60, left: 140 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Fairness metrics across demographic groups
    const metrics = ['Accuracy', 'TPR (Recall)', 'FPR', 'Precision', 'Selection Rate'];
    const groups = [
      { name: 'Group A', values: [0.92, 0.88, 0.08, 0.90, 0.45] },
      { name: 'Group B', values: [0.89, 0.82, 0.12, 0.86, 0.38] },
      { name: 'Group C', values: [0.91, 0.85, 0.10, 0.88, 0.42] },
      { name: 'Overall', values: [0.91, 0.85, 0.10, 0.88, 0.42] }
    ];

    // Fairness thresholds (80% rule / 4/5ths rule)
    const fairnessThreshold = 0.8;

    // Scales
    const xScale = d3.scaleBand()
      .domain(metrics)
      .range([0, w])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([h, 0]);

    const groupColorScale = d3.scaleOrdinal<string>()
      .domain(groups.map(g => g.name))
      .range([chartColors.teal, chartColors.purple, chartColors.orange, chartColors.gray]);

    // Inner scale for grouped bars
    const groupScale = d3.scaleBand()
      .domain(groups.map(g => g.name))
      .range([0, xScale.bandwidth()])
      .padding(0.1);

    // Draw grid lines
    [0.2, 0.4, 0.6, 0.8, 1.0].forEach(v => {
      g.append('line')
        .attr('x1', 0)
        .attr('x2', w)
        .attr('y1', yScale(v))
        .attr('y2', yScale(v))
        .attr('stroke', chartColors.light)
        .attr('stroke-dasharray', v === 0.8 ? 'none' : '2,2');
    });

    // 80% threshold line
    g.append('line')
      .attr('x1', 0)
      .attr('x2', w)
      .attr('y1', yScale(fairnessThreshold))
      .attr('y2', yScale(fairnessThreshold))
      .attr('stroke', chartColors.red)
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '6,4');

    g.append('text')
      .attr('x', w - 5)
      .attr('y', yScale(fairnessThreshold) - 5)
      .attr('text-anchor', 'end')
      .attr('font-size', '9px')
      .attr('fill', chartColors.red)
      .text('80% Fairness Threshold');

    // Draw grouped bars
    metrics.forEach((metric, metricIdx) => {
      const metricX = xScale(metric)!;
      
      groups.forEach((group, groupIdx) => {
        const value = group.values[metricIdx];
        const baseValue = groups.find(g => g.name === 'Overall')!.values[metricIdx];
        const ratio = value / baseValue;
        const isFair = ratio >= fairnessThreshold;

        g.append('rect')
          .attr('x', metricX + groupScale(group.name)!)
          .attr('y', yScale(value))
          .attr('width', groupScale.bandwidth())
          .attr('height', h - yScale(value))
          .attr('fill', groupColorScale(group.name))
          .attr('opacity', group.name === 'Overall' ? 0.5 : 0.85)
          .attr('rx', 2);

        // Warning indicator for unfair metrics
        if (!isFair && group.name !== 'Overall') {
          g.append('text')
            .attr('x', metricX + groupScale(group.name)! + groupScale.bandwidth() / 2)
            .attr('y', yScale(value) - 5)
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .attr('fill', chartColors.red)
            .text('⚠');
        }
      });
    });

    // X-axis
    g.append('g')
      .attr('transform', `translate(0,${h})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('font-size', '10px')
      .attr('fill', chartColors.charcoalLight)
      .attr('transform', 'rotate(-20)')
      .attr('text-anchor', 'end');

    // Y-axis
    g.append('g')
      .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `${(+d * 100).toFixed(0)}%`))
      .selectAll('text')
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray);

    // Y-axis label
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -h / 2)
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.charcoal)
      .text('Metric Value');

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 28)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 700)
      .attr('fill', chartColors.charcoal)
      .text('Fairness Metric Comparison');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 48)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.gray)
      .text('Multiple metrics across protected groups • 80% (4/5ths) rule');

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top - 25})`);

    groups.forEach((group, i) => {
      const lx = i * 100;
      legend.append('rect')
        .attr('x', lx)
        .attr('y', -10)
        .attr('width', 16)
        .attr('height', 12)
        .attr('fill', groupColorScale(group.name))
        .attr('opacity', group.name === 'Overall' ? 0.5 : 0.85)
        .attr('rx', 2);
      legend.append('text')
        .attr('x', lx + 22)
        .attr('y', 0)
        .attr('font-size', '10px')
        .attr('fill', chartColors.charcoalLight)
        .text(group.name);
    });

    // Disparity summary
    const disparity = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${height - 20})`);

    const minTPR = Math.min(...groups.filter(g => g.name !== 'Overall').map(g => g.values[1]));
    const maxTPR = Math.max(...groups.filter(g => g.name !== 'Overall').map(g => g.values[1]));
    const disparityRatio = (minTPR / maxTPR * 100).toFixed(1);

    disparity.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '11px')
      .attr('fill', chartColors.charcoalLight)
      .text(`TPR Disparity Ratio: ${disparityRatio}% `);

    disparity.append('text')
      .attr('x', 160)
      .attr('y', 0)
      .attr('font-size', '11px')
      .attr('fill', +disparityRatio >= 80 ? chartColors.green : chartColors.red)
      .attr('font-weight', 600)
      .text(+disparityRatio >= 80 ? '✓ FAIR' : '✗ UNFAIR');

  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default FairnessMetrics;
