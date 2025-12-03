"use client";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface LossLandscapeProps {
  width?: number;
  height?: number;
}

const LossLandscape: React.FC<LossLandscapeProps> = ({ width = 800, height = 500 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 60, right: 40, bottom: 60, left: 60 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Generate 3D loss surface data
    const gridSize = 50;
    const data: { x: number; y: number; z: number }[] = [];
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i / gridSize) * 4 - 2;
        const y = (j / gridSize) * 4 - 2;
        // Complex loss landscape with local minima
        const z = Math.sin(x * 2) * Math.cos(y * 2) * 0.5 + 
                  Math.exp(-((x - 0.5) ** 2 + (y - 0.5) ** 2) * 2) * -0.8 +
                  Math.exp(-((x + 1) ** 2 + (y + 1) ** 2) * 3) * -0.4 +
                  (x ** 2 + y ** 2) * 0.1;
        data.push({ x, y, z });
      }
    }

    // Isometric projection
    const angle = Math.PI / 6;
    const scale = Math.min(w, h) / 6;

    const project = (x: number, y: number, z: number) => ({
      px: w / 2 + (x - y) * Math.cos(angle) * scale,
      py: h / 2 + (x + y) * Math.sin(angle) * scale - z * scale * 1.5
    });

    // Color scale for loss values
    const zExtent = d3.extent(data, d => d.z) as [number, number];
    const colorScale = d3.scaleSequential(d3.interpolateViridis)
      .domain([zExtent[1], zExtent[0]]);

    // Sort by depth for proper rendering
    const sortedData = [...data].sort((a, b) => (a.x + a.y) - (b.x + b.y));

    // Draw surface points
    sortedData.forEach(d => {
      const { px, py } = project(d.x, d.y, d.z);
      g.append('circle')
        .attr('cx', px)
        .attr('cy', py)
        .attr('r', 3)
        .attr('fill', colorScale(d.z))
        .attr('opacity', 0.7);
    });

    // Find and mark global minimum
    const globalMin = data.reduce((min, d) => d.z < min.z ? d : min, data[0]);
    const { px: minPx, py: minPy } = project(globalMin.x, globalMin.y, globalMin.z);
    
    g.append('circle')
      .attr('cx', minPx)
      .attr('cy', minPy)
      .attr('r', 10)
      .attr('fill', 'none')
      .attr('stroke', chartColors.orange)
      .attr('stroke-width', 3);
    
    g.append('text')
      .attr('x', minPx + 15)
      .attr('y', minPy)
      .attr('fill', chartColors.orange)
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .text('Global Minimum');

    // Find and mark local minima
    const localMinima = [
      { x: -1, y: -1, label: 'Local Min 1' },
      { x: 0.3, y: 0.3, label: 'Local Min 2' }
    ];

    localMinima.forEach(lm => {
      const point = data.find(d => 
        Math.abs(d.x - lm.x) < 0.1 && Math.abs(d.y - lm.y) < 0.1
      );
      if (point) {
        const { px, py } = project(point.x, point.y, point.z);
        g.append('circle')
          .attr('cx', px)
          .attr('cy', py)
          .attr('r', 8)
          .attr('fill', 'none')
          .attr('stroke', chartColors.purple)
          .attr('stroke-width', 2)
          .attr('stroke-dasharray', '4,2');
      }
    });

    // Optimization trajectory
    const trajectory = [
      { x: -1.8, y: 1.8 },
      { x: -1.2, y: 1.2 },
      { x: -0.6, y: 0.8 },
      { x: -0.2, y: 0.4 },
      { x: 0.2, y: 0.2 },
      { x: 0.5, y: 0.5 }
    ];

    const trajectoryPoints = trajectory.map(t => {
      const point = data.find(d => 
        Math.abs(d.x - t.x) < 0.15 && Math.abs(d.y - t.y) < 0.15
      );
      return point ? project(point.x, point.y, point.z) : null;
    }).filter(Boolean) as { px: number; py: number }[];

    const line = d3.line<{ px: number; py: number }>()
      .x(d => d.px)
      .y(d => d.py)
      .curve(d3.curveCatmullRom);

    g.append('path')
      .datum(trajectoryPoints)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', chartColors.teal)
      .attr('stroke-width', 3)
      .attr('stroke-dasharray', '8,4');

    // Arrow at end
    if (trajectoryPoints.length >= 2) {
      const last = trajectoryPoints[trajectoryPoints.length - 1];
      g.append('circle')
        .attr('cx', last.px)
        .attr('cy', last.py)
        .attr('r', 6)
        .attr('fill', chartColors.teal);
    }

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 700)
      .attr('fill', chartColors.charcoal)
      .text('Loss Landscape Visualization');

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 180}, ${margin.top})`);

    const legendItems = [
      { color: chartColors.orange, label: 'Global Minimum', dash: '' },
      { color: chartColors.purple, label: 'Local Minima', dash: '4,2' },
      { color: chartColors.teal, label: 'Optimization Path', dash: '8,4' }
    ];

    legendItems.forEach((item, i) => {
      const ly = i * 22;
      legend.append('line')
        .attr('x1', 0)
        .attr('x2', 24)
        .attr('y1', ly)
        .attr('y2', ly)
        .attr('stroke', item.color)
        .attr('stroke-width', 3)
        .attr('stroke-dasharray', item.dash);
      legend.append('text')
        .attr('x', 30)
        .attr('y', ly + 4)
        .attr('font-size', '11px')
        .attr('fill', chartColors.charcoalLight)
        .text(item.label);
    });

    // Color scale legend
    const gradientId = 'loss-gradient';
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '100%')
      .attr('y2', '0%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorScale(zExtent[0]));
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorScale(zExtent[1]));

    const colorLegend = svg.append('g')
      .attr('transform', `translate(${margin.left + 20}, ${margin.top + 20})`);

    colorLegend.append('rect')
      .attr('width', 16)
      .attr('height', 100)
      .attr('fill', `url(#${gradientId})`);

    colorLegend.append('text')
      .attr('x', 22)
      .attr('y', 8)
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray)
      .text('High Loss');

    colorLegend.append('text')
      .attr('x', 22)
      .attr('y', 98)
      .attr('font-size', '10px')
      .attr('fill', chartColors.gray)
      .text('Low Loss');

  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default LossLandscape;
