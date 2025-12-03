"use client";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface ROCComparisonProps {
  width?: number;
  height?: number;
}

const ROCComparison: React.FC<ROCComparisonProps> = ({ width = 800, height = 500 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 60, right: 180, bottom: 60, left: 70 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Model data with ROC curves
    const models = [
      { 
        name: 'XGBoost', 
        auc: 0.94, 
        color: chartColors.teal,
        curve: generateROCCurve(0.94)
      },
      { 
        name: 'Random Forest', 
        auc: 0.89, 
        color: chartColors.purple,
        curve: generateROCCurve(0.89)
      },
      { 
        name: 'Logistic Regression', 
        auc: 0.82, 
        color: chartColors.orange,
        curve: generateROCCurve(0.82)
      },
      { 
        name: 'Neural Network', 
        auc: 0.91, 
        color: chartColors.indigo,
        curve: generateROCCurve(0.91)
      }
    ];

    function generateROCCurve(auc: number): { fpr: number; tpr: number }[] {
      const points = [];
      const n = 50;
      // Use beta distribution-like curve based on AUC
      const power = 1 / (2 - auc * 1.5);
      for (let i = 0; i <= n; i++) {
        const fpr = i / n;
        // Simulate ROC curve shape
        const tpr = Math.min(1, Math.pow(fpr, power) + (auc - 0.5) * (1 - fpr) * 1.5);
        points.push({ fpr, tpr: Math.min(1, Math.max(fpr, tpr)) });
      }
      return points;
    }

    // Scales
    const xScale = d3.scaleLinear().domain([0, 1]).range([0, w]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([h, 0]);

    // Grid lines
    const gridLines = [0.2, 0.4, 0.6, 0.8];
    gridLines.forEach(v => {
      g.append('line')
        .attr('x1', xScale(v))
        .attr('x2', xScale(v))
        .attr('y1', 0)
        .attr('y2', h)
        .attr('stroke', chartColors.light)
        .attr('stroke-dasharray', '2,2');
      g.append('line')
        .attr('x1', 0)
        .attr('x2', w)
        .attr('y1', yScale(v))
        .attr('y2', yScale(v))
        .attr('stroke', chartColors.light)
        .attr('stroke-dasharray', '2,2');
    });

    // Diagonal (random classifier)
    g.append('line')
      .attr('x1', 0)
      .attr('x2', w)
      .attr('y1', h)
      .attr('y2', 0)
      .attr('stroke', chartColors.gray)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '6,4');

    g.append('text')
      .attr('x', w - 80)
      .attr('y', yScale(0.88))
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray)
      .attr('transform', `rotate(-45, ${w - 80}, ${yScale(0.88)})`)
      .text('Random (AUC = 0.5)');

    // Draw ROC curves
    const line = d3.line<{ fpr: number; tpr: number }>()
      .x(d => xScale(d.fpr))
      .y(d => yScale(d.tpr))
      .curve(d3.curveMonotoneX);

    models.forEach(model => {
      g.append('path')
        .datum(model.curve)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', model.color)
        .attr('stroke-width', 2.5)
        .attr('opacity', 0.9);

      // Fill area under curve
      const area = d3.area<{ fpr: number; tpr: number }>()
        .x(d => xScale(d.fpr))
        .y0(h)
        .y1(d => yScale(d.tpr))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(model.curve)
        .attr('d', area)
        .attr('fill', model.color)
        .attr('opacity', 0.05);
    });

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${h})`)
      .call(d3.axisBottom(xScale).ticks(5))
      .selectAll('text')
      .attr('font-size', '11px')
      .attr('fill', chartColors.charcoalLight);

    g.append('g')
      .call(d3.axisLeft(yScale).ticks(5))
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
      .text('False Positive Rate');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -h / 2)
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('True Positive Rate');

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 28)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 700)
      .attr('fill', chartColors.charcoal)
      .text('ROC Curve Comparison');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 48)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.gray)
      .text('Binary classification • Test set (n=10,000)');

    // Legend with AUC values
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top + 30})`);

    legend.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Models (AUC)');

    const sortedModels = [...models].sort((a, b) => b.auc - a.auc);
    sortedModels.forEach((model, i) => {
      const ly = 25 + i * 28;
      legend.append('line')
        .attr('x1', 0)
        .attr('x2', 24)
        .attr('y1', ly)
        .attr('y2', ly)
        .attr('stroke', model.color)
        .attr('stroke-width', 3);
      legend.append('text')
        .attr('x', 32)
        .attr('y', ly + 4)
        .attr('font-size', '11px')
        .attr('fill', chartColors.charcoalLight)
        .text(`${model.name}`);
      legend.append('text')
        .attr('x', 140)
        .attr('y', ly + 4)
        .attr('font-size', '11px')
        .attr('font-weight', 600)
        .attr('fill', model.color)
        .text(model.auc.toFixed(2));
    });

    // Best threshold annotation
    const bestModel = sortedModels[0];
    const bestPoint = bestModel.curve[Math.floor(bestModel.curve.length * 0.3)];
    
    g.append('circle')
      .attr('cx', xScale(bestPoint.fpr))
      .attr('cy', yScale(bestPoint.tpr))
      .attr('r', 6)
      .attr('fill', bestModel.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    g.append('text')
      .attr('x', xScale(bestPoint.fpr) + 10)
      .attr('y', yScale(bestPoint.tpr) - 10)
      .attr('font-size', '10px')
      .attr('fill', chartColors.charcoal)
      .text(`Optimal threshold: ${bestPoint.fpr.toFixed(2)}`);

  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default ROCComparison;
