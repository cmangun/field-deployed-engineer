"use client";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface TokenProbabilityProps {
  width?: number;
  height?: number;
}

const TokenProbability: React.FC<TokenProbabilityProps> = ({ width = 800, height = 500 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 80, right: 40, bottom: 60, left: 60 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Token data with log probabilities
    const tokens = [
      { token: 'The', logProb: -0.12, cumLogProb: -0.12 },
      { token: 'quick', logProb: -1.85, cumLogProb: -1.97 },
      { token: 'brown', logProb: -0.45, cumLogProb: -2.42 },
      { token: 'fox', logProb: -0.23, cumLogProb: -2.65 },
      { token: 'jumps', logProb: -2.31, cumLogProb: -4.96 },
      { token: 'over', logProb: -0.08, cumLogProb: -5.04 },
      { token: 'the', logProb: -0.05, cumLogProb: -5.09 },
      { token: 'lazy', logProb: -1.42, cumLogProb: -6.51 },
      { token: 'dog', logProb: -0.18, cumLogProb: -6.69 },
      { token: '.', logProb: -0.02, cumLogProb: -6.71 }
    ];

    // Calculate perplexity
    const avgLogProb = tokens.reduce((sum, t) => sum + t.logProb, 0) / tokens.length;
    const perplexity = Math.exp(-avgLogProb);

    // Scales
    const xScale = d3.scaleBand()
      .domain(tokens.map(t => t.token))
      .range([0, w])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([d3.min(tokens, t => t.logProb)! * 1.2, 0])
      .range([h, 0]);

    // Color scale (more negative = lower probability = red)
    const colorScale = d3.scaleSequential(d3.interpolateRdYlGn)
      .domain([-3, 0]);

    // Draw bars
    g.selectAll('.token-bar')
      .data(tokens)
      .enter()
      .append('rect')
      .attr('class', 'token-bar')
      .attr('x', d => xScale(d.token)!)
      .attr('y', d => yScale(0))
      .attr('width', xScale.bandwidth())
      .attr('height', d => yScale(d.logProb) - yScale(0))
      .attr('fill', d => colorScale(d.logProb))
      .attr('rx', 4);

    // Token labels
    g.selectAll('.token-label')
      .data(tokens)
      .enter()
      .append('text')
      .attr('class', 'token-label')
      .attr('x', d => xScale(d.token)! + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.logProb) + 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', 600)
      .attr('fill', d => d.logProb < -1.5 ? '#fff' : chartColors.charcoal)
      .text(d => d.token);

    // Probability values
    g.selectAll('.prob-label')
      .data(tokens)
      .enter()
      .append('text')
      .attr('class', 'prob-label')
      .attr('x', d => xScale(d.token)! + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.logProb) + 38)
      .attr('text-anchor', 'middle')
      .attr('font-size', '9px')
      .attr('fill', d => d.logProb < -1.5 ? 'rgba(255,255,255,0.8)' : chartColors.gray)
      .text(d => `${(Math.exp(d.logProb) * 100).toFixed(1)}%`);

    // Zero line
    g.append('line')
      .attr('x1', 0)
      .attr('x2', w)
      .attr('y1', yScale(0))
      .attr('y2', yScale(0))
      .attr('stroke', chartColors.charcoal)
      .attr('stroke-width', 1);

    // Y-axis
    g.append('g')
      .call(d3.axisLeft(yScale).ticks(5))
      .selectAll('text')
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray);

    // Y-axis label
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -h / 2)
      .attr('y', -45)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.charcoal)
      .text('Log Probability');

    // Low probability tokens annotation
    const lowProbTokens = tokens.filter(t => t.logProb < -1.5);
    lowProbTokens.forEach(t => {
      const x = xScale(t.token)! + xScale.bandwidth() / 2;
      g.append('text')
        .attr('x', x)
        .attr('y', yScale(t.logProb) - 8)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('fill', chartColors.red)
        .text('⚠');
    });

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 28)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 700)
      .attr('fill', chartColors.charcoal)
      .text('Token Probability Waterfall');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 48)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.gray)
      .text('Per-token log probabilities in LLM generation');

    // Stats panel
    const stats = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top - 20})`);

    stats.append('rect')
      .attr('x', 0)
      .attr('y', -35)
      .attr('width', 180)
      .attr('height', 30)
      .attr('fill', chartColors.charcoal)
      .attr('rx', 4);

    stats.append('text')
      .attr('x', 10)
      .attr('y', -15)
      .attr('font-size', '11px')
      .attr('fill', '#fff')
      .text(`Perplexity: ${perplexity.toFixed(2)}`);

    stats.append('text')
      .attr('x', 100)
      .attr('y', -15)
      .attr('font-size', '11px')
      .attr('fill', '#fff')
      .text(`Tokens: ${tokens.length}`);

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 160}, ${margin.top - 35})`);

    legend.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray)
      .text('Probability:');

    const legendColors = [
      { label: 'High', color: colorScale(0) },
      { label: 'Med', color: colorScale(-1.5) },
      { label: 'Low', color: colorScale(-3) }
    ];

    legendColors.forEach((item, i) => {
      legend.append('rect')
        .attr('x', 60 + i * 30)
        .attr('y', -10)
        .attr('width', 24)
        .attr('height', 16)
        .attr('fill', item.color)
        .attr('rx', 2);
      legend.append('text')
        .attr('x', 60 + i * 30 + 12)
        .attr('y', 18)
        .attr('text-anchor', 'middle')
        .attr('font-size', '8px')
        .attr('fill', chartColors.gray)
        .text(item.label);
    });

    // Explanation note
    svg.append('text')
      .attr('x', margin.left)
      .attr('y', height - 15)
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray)
      .text('⚠ Low probability tokens may indicate hallucination or uncertainty');

  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default TokenProbability;
