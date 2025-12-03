"use client";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface FeatureDriftProps {
  width?: number;
  height?: number;
}

const FeatureDrift: React.FC<FeatureDriftProps> = ({ width = 800, height = 500 }) => {
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

    // Feature drift data over time
    const dates = d3.range(30).map(i => {
      const date = new Date();
      date.setDate(date.getDate() - (30 - i));
      return date;
    });

    const features = [
      { name: 'age', baseline: 0, driftValues: generateDrift(0.1, false) },
      { name: 'income', baseline: 0, driftValues: generateDrift(0.15, false) },
      { name: 'credit_score', baseline: 0, driftValues: generateDrift(0.25, true) }, // Drifting!
      { name: 'loan_amount', baseline: 0, driftValues: generateDrift(0.12, false) },
      { name: 'employment_years', baseline: 0, driftValues: generateDrift(0.35, true) }, // Drifting!
    ];

    function generateDrift(volatility: number, isDrifting: boolean): number[] {
      const values = [];
      let value = 0;
      for (let i = 0; i < 30; i++) {
        if (isDrifting && i > 15) {
          // Start drifting after day 15
          value += volatility * 0.08 + (Math.random() - 0.3) * volatility;
        } else {
          value += (Math.random() - 0.5) * volatility * 0.3;
        }
        values.push(value);
      }
      return values;
    }

    // PSI threshold (Population Stability Index)
    const psiThreshold = 0.25;

    // Scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(dates) as [Date, Date])
      .range([0, w]);

    const allValues = features.flatMap(f => f.driftValues);
    const yScale = d3.scaleLinear()
      .domain([d3.min(allValues)! - 0.1, d3.max(allValues)! + 0.1])
      .range([h, 0]);

    const colorScale = d3.scaleOrdinal<string>()
      .domain(features.map(f => f.name))
      .range([chartColors.teal, chartColors.purple, chartColors.red, chartColors.indigo, chartColors.orange]);

    // Threshold zones
    g.append('rect')
      .attr('x', 0)
      .attr('y', yScale(psiThreshold))
      .attr('width', w)
      .attr('height', yScale(-psiThreshold) - yScale(psiThreshold))
      .attr('fill', chartColors.green)
      .attr('opacity', 0.1);

    g.append('line')
      .attr('x1', 0)
      .attr('x2', w)
      .attr('y1', yScale(psiThreshold))
      .attr('y2', yScale(psiThreshold))
      .attr('stroke', chartColors.red)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '6,4');

    g.append('line')
      .attr('x1', 0)
      .attr('x2', w)
      .attr('y1', yScale(-psiThreshold))
      .attr('y2', yScale(-psiThreshold))
      .attr('stroke', chartColors.red)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '6,4');

    g.append('text')
      .attr('x', w - 5)
      .attr('y', yScale(psiThreshold) - 5)
      .attr('text-anchor', 'end')
      .attr('font-size', '9px')
      .attr('fill', chartColors.red)
      .text('Drift Threshold');

    // Draw lines for each feature
    const line = d3.line<number>()
      .x((d, i) => xScale(dates[i]))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);

    features.forEach(feature => {
      const isDrifting = Math.abs(feature.driftValues[feature.driftValues.length - 1]) > psiThreshold;
      
      g.append('path')
        .datum(feature.driftValues)
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', colorScale(feature.name))
        .attr('stroke-width', isDrifting ? 3 : 2)
        .attr('opacity', isDrifting ? 1 : 0.6);

      // End point marker
      const lastValue = feature.driftValues[feature.driftValues.length - 1];
      g.append('circle')
        .attr('cx', xScale(dates[dates.length - 1]))
        .attr('cy', yScale(lastValue))
        .attr('r', isDrifting ? 6 : 4)
        .attr('fill', colorScale(feature.name))
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);

      // Alert icon for drifting features
      if (isDrifting) {
        g.append('text')
          .attr('x', xScale(dates[dates.length - 1]) + 12)
          .attr('y', yScale(lastValue) + 4)
          .attr('font-size', '14px')
          .attr('fill', chartColors.red)
          .text('⚠');
      }
    });

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${h})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(d3.timeFormat('%b %d') as any))
      .selectAll('text')
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray);

    g.append('g')
      .call(d3.axisLeft(yScale).ticks(5))
      .selectAll('text')
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray);

    // Axis labels
    g.append('text')
      .attr('x', w / 2)
      .attr('y', h + 45)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.charcoal)
      .text('Date');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -h / 2)
      .attr('y', -55)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.charcoal)
      .text('Distribution Shift (PSI)');

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 28)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 700)
      .attr('fill', chartColors.charcoal)
      .text('Feature Drift Monitor');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 48)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.gray)
      .text('Production data vs. training baseline • PSI metric');

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top})`);

    legend.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Features');

    features.forEach((feature, i) => {
      const isDrifting = Math.abs(feature.driftValues[feature.driftValues.length - 1]) > psiThreshold;
      const ly = 25 + i * 28;
      
      legend.append('line')
        .attr('x1', 0)
        .attr('x2', 20)
        .attr('y1', ly)
        .attr('y2', ly)
        .attr('stroke', colorScale(feature.name))
        .attr('stroke-width', 2);
      
      legend.append('text')
        .attr('x', 28)
        .attr('y', ly + 4)
        .attr('font-size', '11px')
        .attr('fill', isDrifting ? chartColors.red : chartColors.charcoalLight)
        .attr('font-weight', isDrifting ? 600 : 400)
        .text(feature.name);

      if (isDrifting) {
        legend.append('text')
          .attr('x', 130)
          .attr('y', ly + 4)
          .attr('font-size', '10px')
          .attr('fill', chartColors.red)
          .text('DRIFT');
      }
    });

    // Action items
    const actions = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top + 180})`);

    actions.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '11px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Recommended');

    actions.append('text')
      .attr('x', 0)
      .attr('y', 18)
      .attr('font-size', '10px')
      .attr('fill', chartColors.orange)
      .text('→ Investigate drift');

    actions.append('text')
      .attr('x', 0)
      .attr('y', 34)
      .attr('font-size', '10px')
      .attr('fill', chartColors.orange)
      .text('→ Consider retraining');

  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default FeatureDrift;
