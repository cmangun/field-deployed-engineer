"use client";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface ConfusionMatrixProps {
  width?: number;
  height?: number;
}

const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({ width = 800, height = 500 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 80, right: 160, bottom: 80, left: 100 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Multi-class confusion matrix data
    const classes = ['Cat', 'Dog', 'Bird', 'Fish'];
    const matrix = [
      [892, 45, 12, 8],    // Cat predictions
      [38, 876, 23, 15],   // Dog predictions
      [8, 21, 912, 18],    // Bird predictions
      [5, 12, 14, 928]     // Fish predictions
    ];

    // Calculate totals for percentages
    const rowTotals = matrix.map(row => row.reduce((a, b) => a + b, 0));
    const total = rowTotals.reduce((a, b) => a + b, 0);

    // Scales
    const xScale = d3.scaleBand()
      .domain(classes)
      .range([0, w])
      .padding(0.05);

    const yScale = d3.scaleBand()
      .domain(classes)
      .range([0, h])
      .padding(0.05);

    const maxVal = d3.max(matrix.flat())!;
    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, maxVal]);

    // Draw cells
    classes.forEach((actualClass, i) => {
      classes.forEach((predictedClass, j) => {
        const value = matrix[i][j];
        const percentage = (value / rowTotals[i]) * 100;
        const isDiagonal = i === j;

        // Cell background
        g.append('rect')
          .attr('x', xScale(predictedClass)!)
          .attr('y', yScale(actualClass)!)
          .attr('width', xScale.bandwidth())
          .attr('height', yScale.bandwidth())
          .attr('fill', isDiagonal ? colorScale(value) : colorScale(value * 0.5))
          .attr('stroke', isDiagonal ? chartColors.teal : '#fff')
          .attr('stroke-width', isDiagonal ? 3 : 1)
          .attr('rx', 4);

        // Value
        g.append('text')
          .attr('x', xScale(predictedClass)! + xScale.bandwidth() / 2)
          .attr('y', yScale(actualClass)! + yScale.bandwidth() / 2 - 8)
          .attr('text-anchor', 'middle')
          .attr('font-size', '16px')
          .attr('font-weight', 700)
          .attr('fill', value > maxVal * 0.5 ? '#fff' : chartColors.charcoal)
          .text(value);

        // Percentage
        g.append('text')
          .attr('x', xScale(predictedClass)! + xScale.bandwidth() / 2)
          .attr('y', yScale(actualClass)! + yScale.bandwidth() / 2 + 12)
          .attr('text-anchor', 'middle')
          .attr('font-size', '11px')
          .attr('fill', value > maxVal * 0.5 ? 'rgba(255,255,255,0.8)' : chartColors.gray)
          .text(`${percentage.toFixed(1)}%`);
      });
    });

    // X-axis labels (Predicted)
    g.append('g')
      .selectAll('text')
      .data(classes)
      .enter()
      .append('text')
      .attr('x', d => xScale(d)! + xScale.bandwidth() / 2)
      .attr('y', h + 25)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 500)
      .attr('fill', chartColors.charcoal)
      .text(d => d);

    // Y-axis labels (Actual)
    g.append('g')
      .selectAll('text')
      .data(classes)
      .enter()
      .append('text')
      .attr('x', -15)
      .attr('y', d => yScale(d)! + yScale.bandwidth() / 2)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 500)
      .attr('fill', chartColors.charcoal)
      .text(d => d);

    // Axis labels
    g.append('text')
      .attr('x', w / 2)
      .attr('y', h + 55)
      .attr('text-anchor', 'middle')
      .attr('font-size', '13px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Predicted Class');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -h / 2)
      .attr('y', -65)
      .attr('text-anchor', 'middle')
      .attr('font-size', '13px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Actual Class');

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 28)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 700)
      .attr('fill', chartColors.charcoal)
      .text('Confusion Matrix Heatmap');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 48)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.gray)
      .text(`Multi-class Classification • n=${total.toLocaleString()} samples`);

    // Metrics sidebar
    const metrics = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top})`);

    // Calculate per-class metrics
    const calculateMetrics = (classIdx: number) => {
      const tp = matrix[classIdx][classIdx];
      const fp = classes.reduce((sum, _, i) => sum + (i !== classIdx ? matrix[i][classIdx] : 0), 0);
      const fn = classes.reduce((sum, _, j) => sum + (j !== classIdx ? matrix[classIdx][j] : 0), 0);
      const precision = tp / (tp + fp);
      const recall = tp / (tp + fn);
      const f1 = 2 * (precision * recall) / (precision + recall);
      return { precision, recall, f1 };
    };

    metrics.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Per-Class Metrics');

    classes.forEach((cls, i) => {
      const m = calculateMetrics(i);
      const y = 28 + i * 55;
      
      metrics.append('text')
        .attr('x', 0)
        .attr('y', y)
        .attr('font-size', '11px')
        .attr('font-weight', 600)
        .attr('fill', chartColors.charcoal)
        .text(cls);

      const metricItems = [
        { label: 'Prec', value: m.precision },
        { label: 'Rec', value: m.recall },
        { label: 'F1', value: m.f1 }
      ];

      metricItems.forEach((item, j) => {
        metrics.append('text')
          .attr('x', 0)
          .attr('y', y + 15 + j * 12)
          .attr('font-size', '9px')
          .attr('fill', chartColors.gray)
          .text(item.label);
        metrics.append('text')
          .attr('x', 30)
          .attr('y', y + 15 + j * 12)
          .attr('font-size', '9px')
          .attr('font-weight', 600)
          .attr('fill', item.value > 0.9 ? chartColors.teal : chartColors.charcoal)
          .text((item.value * 100).toFixed(1) + '%');
      });
    });

    // Overall accuracy
    const accuracy = classes.reduce((sum, _, i) => sum + matrix[i][i], 0) / total;
    
    metrics.append('text')
      .attr('x', 0)
      .attr('y', 260)
      .attr('font-size', '11px')
      .attr('fill', chartColors.gray)
      .text('Overall Accuracy');
    
    metrics.append('text')
      .attr('x', 0)
      .attr('y', 278)
      .attr('font-size', '16px')
      .attr('font-weight', 700)
      .attr('fill', chartColors.teal)
      .text((accuracy * 100).toFixed(1) + '%');

  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default ConfusionMatrix;
