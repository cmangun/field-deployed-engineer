"use client";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface SHAPPlotProps {
  width?: number;
  height?: number;
}

const SHAPPlot: React.FC<SHAPPlotProps> = ({ width = 800, height = 500 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 60, right: 140, bottom: 40, left: 140 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // SHAP values data - feature importance with beeswarm
    const features = [
      { name: 'credit_score', importance: 0.42, values: generateBeeswarm(0.42) },
      { name: 'debt_to_income', importance: 0.28, values: generateBeeswarm(0.28) },
      { name: 'loan_amount', importance: 0.15, values: generateBeeswarm(0.15) },
      { name: 'employment_years', importance: 0.08, values: generateBeeswarm(0.08) },
      { name: 'num_accounts', importance: 0.04, values: generateBeeswarm(0.04) },
      { name: 'age', importance: 0.02, values: generateBeeswarm(0.02) },
      { name: 'income', importance: 0.01, values: generateBeeswarm(0.01) },
    ].sort((a, b) => b.importance - a.importance);

    function generateBeeswarm(importance: number) {
      const n = 80;
      const points = [];
      for (let i = 0; i < n; i++) {
        const shapValue = (Math.random() - 0.5) * importance * 2;
        const featureValue = Math.random(); // Normalized feature value
        points.push({ shap: shapValue, feature: featureValue });
      }
      return points;
    }

    // Scales
    const maxShap = d3.max(features.flatMap(f => f.values.map(v => Math.abs(v.shap))))!;
    const xScale = d3.scaleLinear()
      .domain([-maxShap * 1.2, maxShap * 1.2])
      .range([0, w]);

    const yScale = d3.scaleBand()
      .domain(features.map(f => f.name))
      .range([0, h])
      .padding(0.3);

    const colorScale = d3.scaleSequential(d3.interpolateRdBu)
      .domain([1, 0]); // Reversed for red=high, blue=low

    // Zero line
    g.append('line')
      .attr('x1', xScale(0))
      .attr('x2', xScale(0))
      .attr('y1', 0)
      .attr('y2', h)
      .attr('stroke', chartColors.gray)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4');

    // Draw beeswarm for each feature
    features.forEach((feature) => {
      const cy = yScale(feature.name)! + yScale.bandwidth() / 2;
      
      // Sort and jitter points to avoid overlap
      const sortedPoints = [...feature.values].sort((a, b) => a.shap - b.shap);
      const positions: { x: number; y: number; shap: number; feature: number }[] = [];
      
      sortedPoints.forEach((point, i) => {
        const x = xScale(point.shap);
        let y = cy;
        
        // Simple jittering
        const jitter = (i % 5 - 2) * 3;
        y += jitter;
        
        positions.push({ x, y, shap: point.shap, feature: point.feature });
      });

      g.selectAll(`.dot-${feature.name}`)
        .data(positions)
        .enter()
        .append('circle')
        .attr('class', `dot-${feature.name}`)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 3)
        .attr('fill', d => colorScale(d.feature))
        .attr('opacity', 0.7);
    });

    // Y-axis (feature names)
    g.append('g')
      .selectAll('text')
      .data(features)
      .enter()
      .append('text')
      .attr('x', -10)
      .attr('y', d => yScale(d.name)! + yScale.bandwidth() / 2)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '11px')
      .attr('fill', chartColors.charcoal)
      .text(d => d.name);

    // X-axis
    g.append('g')
      .attr('transform', `translate(0,${h})`)
      .call(d3.axisBottom(xScale).ticks(7))
      .selectAll('text')
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray);

    // X-axis label
    g.append('text')
      .attr('x', w / 2)
      .attr('y', h + 35)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.charcoal)
      .text('SHAP Value (impact on model output)');

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 28)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 700)
      .attr('fill', chartColors.charcoal)
      .text('SHAP Feature Importance');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 48)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.gray)
      .text('XGBoost Loan Default Prediction Model');

    // Color legend
    const legendWidth = 20;
    const legendHeight = 120;
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 30}, ${margin.top + 60})`);

    const defs = svg.append('defs');
    const gradientId = 'shap-gradient';
    const gradient = defs.append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', d3.interpolateRdBu(0));
    gradient.append('stop')
      .attr('offset', '50%')
      .attr('stop-color', d3.interpolateRdBu(0.5));
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', d3.interpolateRdBu(1));

    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('fill', `url(#${gradientId})`)
      .attr('rx', 4);

    legend.append('text')
      .attr('x', legendWidth / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Feature');

    legend.append('text')
      .attr('x', legendWidth / 2)
      .attr('y', -1)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Value');

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

    // Annotations
    const annotations = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top + 220})`);

    annotations.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray)
      .text('← Decreases');

    annotations.append('text')
      .attr('x', 0)
      .attr('y', 15)
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray)
      .text('   default risk');

    annotations.append('text')
      .attr('x', 0)
      .attr('y', 40)
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray)
      .text('→ Increases');

    annotations.append('text')
      .attr('x', 0)
      .attr('y', 55)
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray)
      .text('   default risk');

  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default SHAPPlot;
