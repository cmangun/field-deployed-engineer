"use client";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface NeuralScalingProps {
  width?: number;
  height?: number;
}

const NeuralScaling: React.FC<NeuralScalingProps> = ({ width = 800, height = 500 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 60, right: 180, bottom: 60, left: 80 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scaling law data (log-log relationship)
    const computeData = [
      { flops: 1e17, loss: 4.2 },
      { flops: 1e18, loss: 3.5 },
      { flops: 1e19, loss: 2.9 },
      { flops: 1e20, loss: 2.5 },
      { flops: 1e21, loss: 2.2 },
      { flops: 1e22, loss: 1.95 },
      { flops: 1e23, loss: 1.75 },
      { flops: 1e24, loss: 1.58 },
    ];

    const parameterData = [
      { params: 1e7, loss: 4.5 },
      { params: 1e8, loss: 3.8 },
      { params: 1e9, loss: 3.1 },
      { params: 1e10, loss: 2.6 },
      { params: 1e11, loss: 2.2 },
      { params: 1e12, loss: 1.9 },
    ];

    // Add model markers
    const models = [
      { name: 'GPT-2', flops: 1.5e19, params: 1.5e9, loss: 2.85 },
      { name: 'GPT-3', flops: 3.1e23, params: 175e9, loss: 1.62 },
      { name: 'LLaMA', flops: 2.1e23, params: 65e9, loss: 1.72 },
      { name: 'Claude', flops: 1e24, params: 137e9, loss: 1.55 },
    ];

    // Scales (log-log)
    const xScaleCompute = d3.scaleLog()
      .domain([1e17, 1e25])
      .range([0, w]);

    const yScale = d3.scaleLinear()
      .domain([1.4, 4.5])
      .range([h, 0]);

    // Grid lines
    [2, 2.5, 3, 3.5, 4].forEach(v => {
      g.append('line')
        .attr('x1', 0)
        .attr('x2', w)
        .attr('y1', yScale(v))
        .attr('y2', yScale(v))
        .attr('stroke', chartColors.light)
        .attr('stroke-dasharray', '2,2');
    });

    // Scaling law trendline (power law)
    const trendlineData = d3.range(17, 25, 0.5).map(exp => ({
      flops: Math.pow(10, exp),
      loss: 5.5 * Math.pow(Math.pow(10, exp), -0.05) // Chinchilla-like scaling
    }));

    const trendline = d3.line<{ flops: number; loss: number }>()
      .x(d => xScaleCompute(d.flops))
      .y(d => yScale(d.loss))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(trendlineData)
      .attr('d', trendline)
      .attr('fill', 'none')
      .attr('stroke', chartColors.teal)
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '8,4');

    // Confidence band
    const bandUpper = trendlineData.map(d => ({ ...d, loss: d.loss * 1.1 }));
    const bandLower = trendlineData.map(d => ({ ...d, loss: d.loss * 0.9 }));

    const area = d3.area<{ flops: number; loss: number }>()
      .x(d => xScaleCompute(d.flops))
      .y0((d, i) => yScale(bandLower[i].loss))
      .y1((d, i) => yScale(bandUpper[i].loss))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(trendlineData)
      .attr('d', area)
      .attr('fill', chartColors.teal)
      .attr('opacity', 0.1);

    // Data points
    g.selectAll('.compute-point')
      .data(computeData)
      .enter()
      .append('circle')
      .attr('cx', d => xScaleCompute(d.flops))
      .attr('cy', d => yScale(d.loss))
      .attr('r', 5)
      .attr('fill', chartColors.teal)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Model markers
    models.forEach(model => {
      g.append('circle')
        .attr('cx', xScaleCompute(model.flops))
        .attr('cy', yScale(model.loss))
        .attr('r', 10)
        .attr('fill', chartColors.purple)
        .attr('stroke', '#fff')
        .attr('stroke-width', 3);

      g.append('text')
        .attr('x', xScaleCompute(model.flops))
        .attr('y', yScale(model.loss) - 18)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('font-weight', 600)
        .attr('fill', chartColors.purple)
        .text(model.name);
    });

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${h})`)
      .call(d3.axisBottom(xScaleCompute)
        .tickValues([1e18, 1e20, 1e22, 1e24])
        .tickFormat(d => `10^${Math.log10(+d).toFixed(0)}`))
      .selectAll('text')
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray);

    g.append('g')
      .call(d3.axisLeft(yScale).ticks(6))
      .selectAll('text')
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray);

    // Axis labels
    g.append('text')
      .attr('x', w / 2)
      .attr('y', h + 45)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Training Compute (FLOPs)');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -h / 2)
      .attr('y', -55)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Test Loss');

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 28)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 700)
      .attr('fill', chartColors.charcoal)
      .text('Neural Scaling Laws');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 48)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.gray)
      .text('Performance vs. Compute (Chinchilla-optimal scaling)');

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top + 20})`);

    legend.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Scaling Relationship');

    legend.append('line')
      .attr('x1', 0)
      .attr('x2', 24)
      .attr('y1', 25)
      .attr('y2', 25)
      .attr('stroke', chartColors.teal)
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '8,4');

    legend.append('text')
      .attr('x', 32)
      .attr('y', 29)
      .attr('font-size', '10px')
      .attr('fill', chartColors.charcoalLight)
      .text('L ∝ C^(-α)');

    legend.append('circle')
      .attr('cx', 8)
      .attr('cy', 55)
      .attr('r', 5)
      .attr('fill', chartColors.teal);

    legend.append('text')
      .attr('x', 32)
      .attr('y', 59)
      .attr('font-size', '10px')
      .attr('fill', chartColors.charcoalLight)
      .text('Training runs');

    legend.append('circle')
      .attr('cx', 8)
      .attr('cy', 80)
      .attr('r', 8)
      .attr('fill', chartColors.purple);

    legend.append('text')
      .attr('x', 32)
      .attr('y', 84)
      .attr('font-size', '10px')
      .attr('fill', chartColors.charcoalLight)
      .text('Major models');

    // Formula
    const formula = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top + 150})`);

    formula.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 140)
      .attr('height', 50)
      .attr('fill', chartColors.light)
      .attr('rx', 4);

    formula.append('text')
      .attr('x', 10)
      .attr('y', 20)
      .attr('font-size', '10px')
      .attr('fill', chartColors.charcoal)
      .text('α = 0.05');

    formula.append('text')
      .attr('x', 10)
      .attr('y', 38)
      .attr('font-size', '10px')
      .attr('fill', chartColors.charcoal)
      .text('R² = 0.994');

  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default NeuralScaling;
