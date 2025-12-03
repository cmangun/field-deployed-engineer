"use client";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface LearningCurveProps {
  width?: number;
  height?: number;
}

const LearningCurve: React.FC<LearningCurveProps> = ({ width = 800, height = 500 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 60, right: 160, bottom: 60, left: 70 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Generate learning curve data
    const sampleSizes = [100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000];
    
    const trainScores = sampleSizes.map((n, i) => {
      const base = 0.99 - (i * 0.008); // Slight decrease with more data (regularization effect)
      return { samples: n, score: base + (Math.random() - 0.5) * 0.01 };
    });

    const valScores = sampleSizes.map((n, i) => {
      const base = 0.65 + Math.log10(n / 100) * 0.12; // Logarithmic improvement
      return { samples: n, score: Math.min(0.92, base + (Math.random() - 0.5) * 0.02) };
    });

    // Scales
    const xScale = d3.scaleLog()
      .domain([100, 50000])
      .range([0, w]);

    const yScale = d3.scaleLinear()
      .domain([0.6, 1.0])
      .range([h, 0]);

    // Grid lines
    [0.7, 0.8, 0.9].forEach(v => {
      g.append('line')
        .attr('x1', 0)
        .attr('x2', w)
        .attr('y1', yScale(v))
        .attr('y2', yScale(v))
        .attr('stroke', chartColors.light)
        .attr('stroke-dasharray', '2,2');
    });

    // Confidence bands
    const trainBandUpper = trainScores.map(d => ({ samples: d.samples, score: d.score + 0.01 }));
    const trainBandLower = trainScores.map(d => ({ samples: d.samples, score: d.score - 0.01 }));
    const valBandUpper = valScores.map(d => ({ samples: d.samples, score: d.score + 0.03 }));
    const valBandLower = valScores.map(d => ({ samples: d.samples, score: d.score - 0.03 }));

    const area = d3.area<{ samples: number; score: number }>()
      .x(d => xScale(d.samples))
      .y0((d, i) => yScale(trainBandLower[i].score))
      .y1((d, i) => yScale(trainBandUpper[i].score))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(trainScores)
      .attr('d', area)
      .attr('fill', chartColors.orange)
      .attr('opacity', 0.15);

    const valArea = d3.area<{ samples: number; score: number }>()
      .x(d => xScale(d.samples))
      .y0((d, i) => yScale(valBandLower[i].score))
      .y1((d, i) => yScale(valBandUpper[i].score))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(valScores)
      .attr('d', valArea)
      .attr('fill', chartColors.teal)
      .attr('opacity', 0.15);

    // Lines
    const line = d3.line<{ samples: number; score: number }>()
      .x(d => xScale(d.samples))
      .y(d => yScale(d.score))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(trainScores)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', chartColors.orange)
      .attr('stroke-width', 2.5);

    g.append('path')
      .datum(valScores)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', chartColors.teal)
      .attr('stroke-width', 2.5);

    // Points
    g.selectAll('.train-point')
      .data(trainScores)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.samples))
      .attr('cy', d => yScale(d.score))
      .attr('r', 5)
      .attr('fill', chartColors.orange)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    g.selectAll('.val-point')
      .data(valScores)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.samples))
      .attr('cy', d => yScale(d.score))
      .attr('r', 5)
      .attr('fill', chartColors.teal)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Gap annotation
    const lastTrain = trainScores[trainScores.length - 1];
    const lastVal = valScores[valScores.length - 1];
    const gap = lastTrain.score - lastVal.score;

    g.append('line')
      .attr('x1', xScale(50000) + 15)
      .attr('x2', xScale(50000) + 15)
      .attr('y1', yScale(lastTrain.score))
      .attr('y2', yScale(lastVal.score))
      .attr('stroke', chartColors.purple)
      .attr('stroke-width', 2);

    g.append('text')
      .attr('x', xScale(50000) + 25)
      .attr('y', yScale((lastTrain.score + lastVal.score) / 2))
      .attr('font-size', '10px')
      .attr('fill', chartColors.purple)
      .attr('dominant-baseline', 'middle')
      .text(`Gap: ${(gap * 100).toFixed(1)}%`);

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${h})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(d => d3.format('.0s')(+d)))
      .selectAll('text')
      .attr('font-size', '11px')
      .attr('fill', chartColors.charcoalLight);

    g.append('g')
      .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `${(+d * 100).toFixed(0)}%`))
      .selectAll('text')
      .attr('font-size', '11px')
      .attr('fill', chartColors.charcoalLight);

    // Axis labels
    g.append('text')
      .attr('x', w / 2)
      .attr('y', h + 45)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Training Set Size');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -h / 2)
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Accuracy Score');

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 28)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 700)
      .attr('fill', chartColors.charcoal)
      .text('Learning Curve');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 48)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.gray)
      .text('Training vs Validation Performance over Sample Size');

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top + 30})`);

    const legendItems = [
      { label: 'Training Score', color: chartColors.orange },
      { label: 'Validation Score', color: chartColors.teal }
    ];

    legendItems.forEach((item, i) => {
      const ly = i * 28;
      legend.append('line')
        .attr('x1', 0)
        .attr('x2', 24)
        .attr('y1', ly)
        .attr('y2', ly)
        .attr('stroke', item.color)
        .attr('stroke-width', 3);
      legend.append('circle')
        .attr('cx', 12)
        .attr('cy', ly)
        .attr('r', 4)
        .attr('fill', item.color);
      legend.append('text')
        .attr('x', 32)
        .attr('y', ly + 4)
        .attr('font-size', '11px')
        .attr('fill', chartColors.charcoalLight)
        .text(item.label);
    });

    // Insights
    const insights = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top + 120})`);

    insights.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '11px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Diagnosis');

    const diagItems = [
      { label: 'High Bias', status: false },
      { label: 'High Variance', status: gap > 0.05 },
      { label: 'More Data Helps', status: true }
    ];

    diagItems.forEach((item, i) => {
      insights.append('text')
        .attr('x', 0)
        .attr('y', 22 + i * 18)
        .attr('font-size', '10px')
        .attr('fill', item.status ? chartColors.orange : chartColors.gray)
        .text(`${item.status ? '●' : '○'} ${item.label}`);
    });

  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default LearningCurve;
