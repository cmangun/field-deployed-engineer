"use client";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface AttentionHeatmapProps {
  width?: number;
  height?: number;
}

const AttentionHeatmap: React.FC<AttentionHeatmapProps> = ({ width = 800, height = 500 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 80, right: 140, bottom: 40, left: 100 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Sample tokens for a sentence
    const tokens = ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog'];
    
    // Simulated attention weights (query tokens attend to key tokens)
    const generateAttention = (): number[][] => {
      const n = tokens.length;
      const attention: number[][] = [];
      
      for (let i = 0; i < n; i++) {
        const row: number[] = [];
        for (let j = 0; j < n; j++) {
          // Create realistic attention patterns
          let weight = Math.random() * 0.2;
          
          // Self-attention (diagonal)
          if (i === j) weight += 0.3;
          
          // Adjacent tokens get some attention
          if (Math.abs(i - j) === 1) weight += 0.15;
          
          // Specific semantic relationships
          if (tokens[i] === 'fox' && tokens[j] === 'quick') weight += 0.4;
          if (tokens[i] === 'fox' && tokens[j] === 'brown') weight += 0.35;
          if (tokens[i] === 'jumps' && tokens[j] === 'fox') weight += 0.45;
          if (tokens[i] === 'dog' && tokens[j] === 'lazy') weight += 0.5;
          if (tokens[i] === 'over' && tokens[j] === 'jumps') weight += 0.3;
          
          row.push(Math.min(1, weight));
        }
        // Normalize row (softmax-like)
        const sum = row.reduce((a, b) => a + b, 0);
        attention.push(row.map(v => v / sum));
      }
      return attention;
    };

    const attentionData = generateAttention();

    // Scales
    const xScale = d3.scaleBand()
      .domain(tokens)
      .range([0, w])
      .padding(0.05);

    const yScale = d3.scaleBand()
      .domain(tokens)
      .range([0, h])
      .padding(0.05);

    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(attentionData.flat())!]);

    // Draw cells
    tokens.forEach((queryToken, i) => {
      tokens.forEach((keyToken, j) => {
        const value = attentionData[i][j];
        
        g.append('rect')
          .attr('x', xScale(keyToken)!)
          .attr('y', yScale(queryToken)!)
          .attr('width', xScale.bandwidth())
          .attr('height', yScale.bandwidth())
          .attr('fill', colorScale(value))
          .attr('stroke', '#fff')
          .attr('stroke-width', 1)
          .attr('rx', 2);

        // Show value for significant attention
        if (value > 0.15) {
          g.append('text')
            .attr('x', xScale(keyToken)! + xScale.bandwidth() / 2)
            .attr('y', yScale(queryToken)! + yScale.bandwidth() / 2)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('font-size', '10px')
            .attr('fill', value > 0.25 ? '#fff' : chartColors.charcoal)
            .attr('font-weight', value > 0.2 ? 600 : 400)
            .text((value * 100).toFixed(0) + '%');
        }
      });
    });

    // X-axis (Key tokens)
    g.append('g')
      .selectAll('text')
      .data(tokens)
      .enter()
      .append('text')
      .attr('x', d => xScale(d)! + xScale.bandwidth() / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('fill', chartColors.charcoalLight)
      .text(d => d);

    // Y-axis (Query tokens)
    g.append('g')
      .selectAll('text')
      .data(tokens)
      .enter()
      .append('text')
      .attr('x', -10)
      .attr('y', d => yScale(d)! + yScale.bandwidth() / 2)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '11px')
      .attr('fill', chartColors.charcoalLight)
      .text(d => d);

    // Axis labels
    g.append('text')
      .attr('x', w / 2)
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Key Tokens (attending to)');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -h / 2)
      .attr('y', -70)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Query Tokens');

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 28)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 700)
      .attr('fill', chartColors.charcoal)
      .text('Attention Heatmap');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 48)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.gray)
      .text('Self-Attention Layer 6, Head 3');

    // Color legend
    const legendWidth = 20;
    const legendHeight = 150;
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 40}, ${margin.top + 40})`);

    const defs = svg.append('defs');
    const gradientId = 'attention-gradient';
    const gradient = defs.append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '100%')
      .attr('y2', '0%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', d3.interpolateBlues(0));
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', d3.interpolateBlues(1));

    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('fill', `url(#${gradientId})`)
      .attr('rx', 4);

    legend.append('text')
      .attr('x', legendWidth + 8)
      .attr('y', 10)
      .attr('font-size', '10px')
      .attr('fill', chartColors.charcoalLight)
      .text('High');

    legend.append('text')
      .attr('x', legendWidth + 8)
      .attr('y', legendHeight)
      .attr('font-size', '10px')
      .attr('fill', chartColors.charcoalLight)
      .text('Low');

    legend.append('text')
      .attr('x', legendWidth / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Attention');

    // Insights
    const insights = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 30}, ${margin.top + 220})`);

    const insightItems = [
      { label: 'fox → quick', desc: 'Modifier' },
      { label: 'dog → lazy', desc: 'Modifier' },
      { label: 'jumps → fox', desc: 'Subject' }
    ];

    insights.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '11px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Key Patterns');

    insightItems.forEach((item, i) => {
      insights.append('text')
        .attr('x', 0)
        .attr('y', 20 + i * 18)
        .attr('font-size', '10px')
        .attr('fill', chartColors.indigo)
        .text(item.label);
      insights.append('text')
        .attr('x', 65)
        .attr('y', 20 + i * 18)
        .attr('font-size', '9px')
        .attr('fill', chartColors.gray)
        .text(item.desc);
    });

  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default AttentionHeatmap;
