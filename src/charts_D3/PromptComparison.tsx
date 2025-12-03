"use client";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface PromptComparisonProps {
  width?: number;
  height?: number;
}

const PromptComparison: React.FC<PromptComparisonProps> = ({ width = 800, height = 500 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 60, right: 40, bottom: 40, left: 40 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Prompt comparison data
    const prompts = [
      {
        name: 'Zero-shot',
        template: 'Classify the sentiment: "{text}"',
        accuracy: 0.72,
        latency: 45,
        tokens: 12,
        cost: 0.0001
      },
      {
        name: 'Few-shot (3)',
        template: 'Examples:\n1. "Great!" → Positive\n2. "Bad" → Negative\n3. "Ok" → Neutral\n\nClassify: "{text}"',
        accuracy: 0.85,
        latency: 120,
        tokens: 65,
        cost: 0.0005
      },
      {
        name: 'CoT',
        template: 'Let\'s think step by step about the sentiment in "{text}". First, identify key words...',
        accuracy: 0.89,
        latency: 280,
        tokens: 150,
        cost: 0.0012
      },
      {
        name: 'Structured',
        template: 'Analyze sentiment. Output JSON:\n{"sentiment": "positive|negative|neutral", "confidence": 0-1}\nText: "{text}"',
        accuracy: 0.87,
        latency: 95,
        tokens: 45,
        cost: 0.0004
      }
    ];

    const cardWidth = (w - 30) / 4;
    const cardHeight = h - 40;

    // Draw prompt cards
    prompts.forEach((prompt, i) => {
      const x = i * (cardWidth + 10);
      const cardG = g.append('g')
        .attr('transform', `translate(${x}, 0)`);

      // Card background
      cardG.append('rect')
        .attr('width', cardWidth)
        .attr('height', cardHeight)
        .attr('fill', '#fff')
        .attr('stroke', prompt.accuracy === Math.max(...prompts.map(p => p.accuracy)) ? chartColors.teal : chartColors.light)
        .attr('stroke-width', prompt.accuracy === Math.max(...prompts.map(p => p.accuracy)) ? 3 : 1)
        .attr('rx', 8);

      // Header
      cardG.append('rect')
        .attr('width', cardWidth)
        .attr('height', 40)
        .attr('fill', chartColors.charcoal)
        .attr('rx', 8);

      cardG.append('rect')
        .attr('y', 32)
        .attr('width', cardWidth)
        .attr('height', 8)
        .attr('fill', chartColors.charcoal);

      cardG.append('text')
        .attr('x', cardWidth / 2)
        .attr('y', 26)
        .attr('text-anchor', 'middle')
        .attr('font-size', '13px')
        .attr('font-weight', 600)
        .attr('fill', '#fff')
        .text(prompt.name);

      // Accuracy score (large)
      cardG.append('text')
        .attr('x', cardWidth / 2)
        .attr('y', 90)
        .attr('text-anchor', 'middle')
        .attr('font-size', '32px')
        .attr('font-weight', 700)
        .attr('fill', chartColors.teal)
        .text(`${(prompt.accuracy * 100).toFixed(0)}%`);

      cardG.append('text')
        .attr('x', cardWidth / 2)
        .attr('y', 110)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('fill', chartColors.gray)
        .text('Accuracy');

      // Metrics
      const metricsY = 140;
      const metrics = [
        { label: 'Latency', value: `${prompt.latency}ms`, color: prompt.latency < 100 ? chartColors.green : chartColors.orange },
        { label: 'Tokens', value: prompt.tokens.toString(), color: chartColors.charcoalLight },
        { label: 'Cost', value: `$${prompt.cost.toFixed(4)}`, color: prompt.cost < 0.0005 ? chartColors.green : chartColors.orange }
      ];

      metrics.forEach((metric, j) => {
        const my = metricsY + j * 45;
        cardG.append('text')
          .attr('x', 15)
          .attr('y', my)
          .attr('font-size', '10px')
          .attr('fill', chartColors.gray)
          .text(metric.label);
        cardG.append('text')
          .attr('x', cardWidth - 15)
          .attr('y', my)
          .attr('text-anchor', 'end')
          .attr('font-size', '12px')
          .attr('font-weight', 600)
          .attr('fill', metric.color)
          .text(metric.value);
        
        // Divider
        if (j < metrics.length - 1) {
          cardG.append('line')
            .attr('x1', 15)
            .attr('x2', cardWidth - 15)
            .attr('y1', my + 18)
            .attr('y2', my + 18)
            .attr('stroke', chartColors.light);
        }
      });

      // Template preview
      const templateY = 290;
      cardG.append('rect')
        .attr('x', 10)
        .attr('y', templateY)
        .attr('width', cardWidth - 20)
        .attr('height', 70)
        .attr('fill', chartColors.background)
        .attr('rx', 4);

      // Truncate and wrap template text
      const templateLines = prompt.template.split('\n').slice(0, 3);
      templateLines.forEach((line, lineIdx) => {
        const truncated = line.length > 20 ? line.substring(0, 20) + '...' : line;
        cardG.append('text')
          .attr('x', 18)
          .attr('y', templateY + 20 + lineIdx * 14)
          .attr('font-size', '8px')
          .attr('font-family', 'monospace')
          .attr('fill', chartColors.charcoalLight)
          .text(truncated);
      });

      // Best badge
      if (prompt.accuracy === Math.max(...prompts.map(p => p.accuracy))) {
        cardG.append('rect')
          .attr('x', cardWidth / 2 - 25)
          .attr('y', cardHeight - 25)
          .attr('width', 50)
          .attr('height', 20)
          .attr('fill', chartColors.teal)
          .attr('rx', 10);
        cardG.append('text')
          .attr('x', cardWidth / 2)
          .attr('y', cardHeight - 11)
          .attr('text-anchor', 'middle')
          .attr('font-size', '9px')
          .attr('font-weight', 600)
          .attr('fill', '#fff')
          .text('BEST');
      }
    });

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 28)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 700)
      .attr('fill', chartColors.charcoal)
      .text('Prompt Template Comparison');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 48)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.gray)
      .text('Sentiment classification task • GPT-4 • n=1000 samples');

  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default PromptComparison;
