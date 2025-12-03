"use client";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface ModelRegistryProps {
  width?: number;
  height?: number;
}

const ModelRegistry: React.FC<ModelRegistryProps> = ({ width = 800, height = 500 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 80, right: 40, bottom: 40, left: 120 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Model version history data
    const models = [
      {
        name: 'fraud-detector',
        versions: [
          { version: 'v1.0', date: new Date('2024-01-15'), status: 'archived', accuracy: 0.89 },
          { version: 'v1.1', date: new Date('2024-03-20'), status: 'archived', accuracy: 0.91 },
          { version: 'v1.2', date: new Date('2024-06-10'), status: 'staging', accuracy: 0.93 },
          { version: 'v2.0', date: new Date('2024-09-05'), status: 'production', accuracy: 0.95 },
        ]
      },
      {
        name: 'churn-predictor',
        versions: [
          { version: 'v1.0', date: new Date('2024-02-01'), status: 'archived', accuracy: 0.82 },
          { version: 'v2.0', date: new Date('2024-05-15'), status: 'production', accuracy: 0.87 },
          { version: 'v2.1', date: new Date('2024-10-01'), status: 'staging', accuracy: 0.89 },
        ]
      },
      {
        name: 'recommender',
        versions: [
          { version: 'v1.0', date: new Date('2024-04-01'), status: 'archived', accuracy: 0.75 },
          { version: 'v1.1', date: new Date('2024-07-20'), status: 'archived', accuracy: 0.78 },
          { version: 'v2.0', date: new Date('2024-11-01'), status: 'production', accuracy: 0.84 },
        ]
      }
    ];

    const statusColors: Record<string, string> = {
      production: chartColors.green,
      staging: chartColors.orange,
      archived: chartColors.gray
    };

    // Time scale
    const allDates = models.flatMap(m => m.versions.map(v => v.date));
    const xScale = d3.scaleTime()
      .domain([d3.min(allDates)!, new Date()])
      .range([0, w]);

    // Model scale
    const yScale = d3.scaleBand()
      .domain(models.map(m => m.name))
      .range([0, h])
      .padding(0.4);

    // Draw timeline axis
    g.append('g')
      .attr('transform', `translate(0,${h})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(d3.timeFormat('%b %Y') as any))
      .selectAll('text')
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray);

    // Draw model lanes
    models.forEach(model => {
      const y = yScale(model.name)!;
      const laneHeight = yScale.bandwidth();

      // Lane background
      g.append('rect')
        .attr('x', 0)
        .attr('y', y)
        .attr('width', w)
        .attr('height', laneHeight)
        .attr('fill', chartColors.background)
        .attr('rx', 4);

      // Model name
      g.append('text')
        .attr('x', -10)
        .attr('y', y + laneHeight / 2)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '12px')
        .attr('font-weight', 600)
        .attr('fill', chartColors.charcoal)
        .text(model.name);

      // Draw version timeline
      const sortedVersions = [...model.versions].sort((a, b) => a.date.getTime() - b.date.getTime());
      
      // Connection line
      if (sortedVersions.length > 1) {
        g.append('line')
          .attr('x1', xScale(sortedVersions[0].date))
          .attr('x2', xScale(sortedVersions[sortedVersions.length - 1].date))
          .attr('y1', y + laneHeight / 2)
          .attr('y2', y + laneHeight / 2)
          .attr('stroke', chartColors.gray)
          .attr('stroke-width', 2)
          .attr('stroke-opacity', 0.3);
      }

      // Version nodes
      sortedVersions.forEach((version, i) => {
        const cx = xScale(version.date);
        const cy = y + laneHeight / 2;
        const isProduction = version.status === 'production';

        // Node circle
        g.append('circle')
          .attr('cx', cx)
          .attr('cy', cy)
          .attr('r', isProduction ? 16 : 12)
          .attr('fill', statusColors[version.status])
          .attr('stroke', '#fff')
          .attr('stroke-width', 3);

        // Version label
        g.append('text')
          .attr('x', cx)
          .attr('y', cy + 28)
          .attr('text-anchor', 'middle')
          .attr('font-size', '9px')
          .attr('font-weight', 500)
          .attr('fill', chartColors.charcoalLight)
          .text(version.version);

        // Accuracy label
        g.append('text')
          .attr('x', cx)
          .attr('y', cy)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('font-size', '8px')
          .attr('font-weight', 700)
          .attr('fill', '#fff')
          .text(`${(version.accuracy * 100).toFixed(0)}%`);

        // Production badge
        if (isProduction) {
          g.append('text')
            .attr('x', cx)
            .attr('y', cy - 24)
            .attr('text-anchor', 'middle')
            .attr('font-size', '8px')
            .attr('font-weight', 700)
            .attr('fill', chartColors.green)
            .text('LIVE');
        }

        // Rollback arrow for archived versions
        if (version.status === 'archived' && i < sortedVersions.length - 1) {
          const nextCx = xScale(sortedVersions[i + 1].date);
          g.append('line')
            .attr('x1', cx + 14)
            .attr('x2', nextCx - 14)
            .attr('y1', cy)
            .attr('y2', cy)
            .attr('stroke', chartColors.gray)
            .attr('stroke-width', 2)
            .attr('marker-end', 'url(#arrow)');
        }
      });
    });

    // Arrow marker definition
    svg.append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 9)
      .attr('refY', 5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto-start-reverse')
      .append('path')
      .attr('d', 'M 0 0 L 10 5 L 0 10 z')
      .attr('fill', chartColors.gray);

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 28)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 700)
      .attr('fill', chartColors.charcoal)
      .text('Model Registry Timeline');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 48)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.gray)
      .text('Version history with deployments and rollbacks');

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top - 20})`);

    const legendItems = [
      { status: 'production', label: 'Production' },
      { status: 'staging', label: 'Staging' },
      { status: 'archived', label: 'Archived' }
    ];

    legendItems.forEach((item, i) => {
      const lx = i * 100;
      legend.append('circle')
        .attr('cx', lx)
        .attr('cy', -5)
        .attr('r', 6)
        .attr('fill', statusColors[item.status]);
      legend.append('text')
        .attr('x', lx + 12)
        .attr('y', -2)
        .attr('font-size', '10px')
        .attr('fill', chartColors.charcoalLight)
        .text(item.label);
    });

  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default ModelRegistry;
