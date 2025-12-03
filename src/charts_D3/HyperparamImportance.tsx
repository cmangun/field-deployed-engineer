"use client";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface HyperparamImportanceProps {
  width?: number;
  height?: number;
}

const HyperparamImportance: React.FC<HyperparamImportanceProps> = ({ width = 800, height = 500 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 60, right: 40, bottom: 40, left: 160 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Hyperparameter importance data (ANOVA/fANOVA decomposition)
    const data = [
      { param: 'learning_rate', importance: 0.42, range: '1e-5 to 1e-2', optimal: '3e-4' },
      { param: 'batch_size', importance: 0.18, range: '16 to 256', optimal: '64' },
      { param: 'hidden_dim', importance: 0.15, range: '128 to 1024', optimal: '512' },
      { param: 'num_layers', importance: 0.10, range: '2 to 12', optimal: '6' },
      { param: 'dropout', importance: 0.08, range: '0.0 to 0.5', optimal: '0.2' },
      { param: 'weight_decay', importance: 0.04, range: '0 to 1e-3', optimal: '1e-5' },
      { param: 'warmup_steps', importance: 0.02, range: '0 to 5000', optimal: '1000' },
      { param: 'activation', importance: 0.01, range: 'relu, gelu, swish', optimal: 'gelu' },
    ].sort((a, b) => b.importance - a.importance);

    // Scales
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.importance)! * 1.1])
      .range([0, w]);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.param))
      .range([0, h])
      .padding(0.3);

    // Color scale based on importance
    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(data, d => d.importance)!]);

    // Draw bars
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', d => yScale(d.param)!)
      .attr('width', d => xScale(d.importance))
      .attr('height', yScale.bandwidth())
      .attr('fill', d => colorScale(d.importance))
      .attr('rx', 4);

    // Importance percentage labels
    g.selectAll('.importance-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'importance-label')
      .attr('x', d => xScale(d.importance) + 8)
      .attr('y', d => yScale(d.param)! + yScale.bandwidth() / 2)
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text(d => `${(d.importance * 100).toFixed(0)}%`);

    // Parameter labels (Y-axis)
    g.append('g')
      .selectAll('.param-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'param-label')
      .attr('x', -10)
      .attr('y', d => yScale(d.param)! + yScale.bandwidth() / 2)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.charcoal)
      .text(d => d.param);

    // Optimal values (right side)
    g.selectAll('.optimal-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'optimal-label')
      .attr('x', w - 10)
      .attr('y', d => yScale(d.param)! + yScale.bandwidth() / 2)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '10px')
      .attr('fill', chartColors.teal)
      .text(d => `optimal: ${d.optimal}`);

    // X-axis
    g.append('g')
      .attr('transform', `translate(0,${h})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(d => `${(+d * 100).toFixed(0)}%`))
      .selectAll('text')
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray);

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 28)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 700)
      .attr('fill', chartColors.charcoal)
      .text('Hyperparameter Importance Plot');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 48)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.gray)
      .text('fANOVA decomposition from 200 trials • Objective: Validation Accuracy');

    // Summary stats
    const cumulativeImportance = data.slice(0, 3).reduce((sum, d) => sum + d.importance, 0);
    
    svg.append('text')
      .attr('x', margin.left)
      .attr('y', height - 12)
      .attr('font-size', '11px')
      .attr('fill', chartColors.charcoalLight)
      .text(`Top 3 hyperparameters explain ${(cumulativeImportance * 100).toFixed(0)}% of variance`);

    // Interaction pairs (if applicable)
    const interactionNote = svg.append('g')
      .attr('transform', `translate(${width - 200}, ${height - 20})`);

    interactionNote.append('text')
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray)
      .text('Interaction: lr × batch_size: 3%');

  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default HyperparamImportance;
