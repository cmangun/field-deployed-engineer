"use client";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface GradientFlowProps {
  width?: number;
  height?: number;
}

const GradientFlow: React.FC<GradientFlowProps> = ({ width = 800, height = 500 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 60, right: 120, bottom: 80, left: 100 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Layer names for a typical deep network
    const layers = [
      'Input', 'Conv1', 'Conv2', 'Conv3', 'Conv4', 
      'Pool', 'FC1', 'FC2', 'Output'
    ];

    // Simulated gradient magnitudes over training epochs
    const epochs = d3.range(0, 100, 5);
    
    // Generate data showing gradient flow (some layers might have vanishing/exploding)
    const generateGradients = (layer: string): number[] => {
      const baseMultiplier = layers.indexOf(layer) === 0 ? 0.8 :
                             layers.indexOf(layer) < 3 ? 1.0 :
                             layers.indexOf(layer) < 5 ? 0.6 :
                             layers.indexOf(layer) < 7 ? 0.3 : 0.15;
      
      return epochs.map(epoch => {
        // Gradients generally decrease with depth, improve with training
        const improvement = 1 + (epoch / 100) * 0.5;
        const noise = 0.8 + Math.random() * 0.4;
        return Math.max(0.001, baseMultiplier * improvement * noise * 
          Math.exp(-layers.indexOf(layer) * 0.15));
      });
    };

    const data = layers.map(layer => ({
      layer,
      values: generateGradients(layer)
    }));

    // Scales
    const xScale = d3.scaleBand()
      .domain(layers)
      .range([0, w])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, epochs.length - 1])
      .range([0, h]);

    // Color scale for gradient magnitude (log scale)
    const allValues = data.flatMap(d => d.values);
    const colorScale = d3.scaleSequential(d3.interpolateRdYlGn)
      .domain([Math.log10(d3.min(allValues)!), Math.log10(d3.max(allValues)!)]);

    // Draw heatmap cells
    data.forEach((layerData) => {
      layerData.values.forEach((value, epochIdx) => {
        g.append('rect')
          .attr('x', xScale(layerData.layer)!)
          .attr('y', yScale(epochIdx))
          .attr('width', xScale.bandwidth())
          .attr('height', h / epochs.length + 1)
          .attr('fill', colorScale(Math.log10(value)))
          .attr('stroke', '#fff')
          .attr('stroke-width', 0.5);
      });
    });

    // Add warning indicators for vanishing gradients
    data.forEach((layerData, layerIdx) => {
      const avgGradient = d3.mean(layerData.values)!;
      if (avgGradient < 0.2) {
        g.append('text')
          .attr('x', xScale(layerData.layer)! + xScale.bandwidth() / 2)
          .attr('y', -10)
          .attr('text-anchor', 'middle')
          .attr('font-size', '16px')
          .attr('fill', chartColors.red)
          .text('⚠');
      }
    });

    // X-axis (Layers)
    g.append('g')
      .attr('transform', `translate(0,${h})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end')
      .attr('dx', '-0.5em')
      .attr('dy', '0.5em')
      .attr('font-size', '11px')
      .attr('fill', chartColors.charcoalLight);

    // Y-axis (Epochs)
    const yAxisScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, h]);

    g.append('g')
      .call(d3.axisLeft(yAxisScale).ticks(5))
      .selectAll('text')
      .attr('font-size', '11px')
      .attr('fill', chartColors.charcoalLight);

    // Axis labels
    g.append('text')
      .attr('x', w / 2)
      .attr('y', h + 60)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Network Layer (Input → Output)');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -h / 2)
      .attr('y', -60)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Training Epoch');

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 700)
      .attr('fill', chartColors.charcoal)
      .text('Gradient Flow Diagram');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 48)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.gray)
      .text('Layer-by-layer gradient magnitude over training');

    // Color legend
    const legendWidth = 20;
    const legendHeight = 150;
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 30}, ${margin.top + 50})`);

    const defs = svg.append('defs');
    const gradientId = 'gradient-flow-legend';
    const gradient = defs.append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '100%')
      .attr('y2', '0%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', d3.interpolateRdYlGn(0));
    gradient.append('stop')
      .attr('offset', '50%')
      .attr('stop-color', d3.interpolateRdYlGn(0.5));
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', d3.interpolateRdYlGn(1));

    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('fill', `url(#${gradientId})`);

    legend.append('text')
      .attr('x', legendWidth + 8)
      .attr('y', 10)
      .attr('font-size', '10px')
      .attr('fill', chartColors.charcoalLight)
      .text('High');

    legend.append('text')
      .attr('x', legendWidth + 8)
      .attr('y', legendHeight / 2 + 4)
      .attr('font-size', '10px')
      .attr('fill', chartColors.charcoalLight)
      .text('Medium');

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
      .text('Gradient');

    // Warning legend
    const warningLegend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 30}, ${margin.top + 220})`);

    warningLegend.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '16px')
      .attr('fill', chartColors.red)
      .text('⚠');

    warningLegend.append('text')
      .attr('x', 24)
      .attr('y', 4)
      .attr('font-size', '10px')
      .attr('fill', chartColors.charcoalLight)
      .text('Vanishing');

  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default GradientFlow;
