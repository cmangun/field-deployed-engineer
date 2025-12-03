"use client";
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { chartColors } from './colors';

interface EmbeddingProjectorProps {
  width?: number;
  height?: number;
}

const EmbeddingProjector: React.FC<EmbeddingProjectorProps> = ({ width = 800, height = 500 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 60, right: 160, bottom: 60, left: 60 };
    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Cluster definitions with semantic groupings
    const clusters = [
      { id: 'animals', label: 'Animals', color: chartColors.teal, center: { x: 0.25, y: 0.3 } },
      { id: 'vehicles', label: 'Vehicles', color: chartColors.orange, center: { x: 0.75, y: 0.35 } },
      { id: 'food', label: 'Food', color: chartColors.purple, center: { x: 0.3, y: 0.75 } },
      { id: 'tech', label: 'Technology', color: chartColors.indigo, center: { x: 0.7, y: 0.7 } },
    ];

    // Generate points for each cluster
    const generateClusterPoints = (cluster: typeof clusters[0], count: number) => {
      const points = [];
      const words: Record<string, string[]> = {
        animals: ['dog', 'cat', 'lion', 'tiger', 'bird', 'fish', 'horse', 'elephant', 'mouse', 'rabbit'],
        vehicles: ['car', 'truck', 'plane', 'train', 'bike', 'boat', 'bus', 'helicopter', 'motorcycle'],
        food: ['apple', 'pizza', 'bread', 'cheese', 'pasta', 'salad', 'burger', 'sushi', 'cake'],
        tech: ['computer', 'phone', 'tablet', 'laptop', 'server', 'robot', 'drone', 'camera', 'printer']
      };
      
      const clusterWords = words[cluster.id] || [];
      
      for (let i = 0; i < Math.min(count, clusterWords.length); i++) {
        const angle = (i / count) * Math.PI * 2;
        const radius = 0.08 + Math.random() * 0.08;
        points.push({
          x: cluster.center.x + Math.cos(angle) * radius + (Math.random() - 0.5) * 0.04,
          y: cluster.center.y + Math.sin(angle) * radius + (Math.random() - 0.5) * 0.04,
          label: clusterWords[i],
          cluster: cluster.id,
          color: cluster.color
        });
      }
      return points;
    };

    const allPoints = clusters.flatMap(c => generateClusterPoints(c, 9));

    // Scales
    const xScale = d3.scaleLinear().domain([0, 1]).range([0, w]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([h, 0]);

    // Draw cluster boundaries (convex hulls)
    clusters.forEach(cluster => {
      const clusterPoints = allPoints.filter(p => p.cluster === cluster.id);
      if (clusterPoints.length >= 3) {
        const hullPoints = d3.polygonHull(clusterPoints.map(p => [xScale(p.x), yScale(p.y)]));
        if (hullPoints) {
          g.append('path')
            .attr('d', `M${hullPoints.join('L')}Z`)
            .attr('fill', cluster.color)
            .attr('fill-opacity', 0.1)
            .attr('stroke', cluster.color)
            .attr('stroke-opacity', 0.3)
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '4,4');
        }
      }
    });

    // Draw points
    g.selectAll('.embedding-point')
      .data(allPoints)
      .enter()
      .append('circle')
      .attr('class', 'embedding-point')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 8)
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('opacity', 0.85);

    // Draw labels
    g.selectAll('.embedding-label')
      .data(allPoints)
      .enter()
      .append('text')
      .attr('class', 'embedding-label')
      .attr('x', d => xScale(d.x))
      .attr('y', d => yScale(d.y) - 12)
      .attr('text-anchor', 'middle')
      .attr('font-size', '9px')
      .attr('fill', chartColors.charcoalLight)
      .text(d => d.label);

    // Draw inter-cluster relationships
    const relationships = [
      { from: 'dog', to: 'cat', strength: 0.8 },
      { from: 'car', to: 'truck', strength: 0.75 },
      { from: 'phone', to: 'tablet', strength: 0.85 },
      { from: 'pizza', to: 'burger', strength: 0.7 }
    ];

    relationships.forEach(rel => {
      const fromPoint = allPoints.find(p => p.label === rel.from);
      const toPoint = allPoints.find(p => p.label === rel.to);
      if (fromPoint && toPoint) {
        g.append('line')
          .attr('x1', xScale(fromPoint.x))
          .attr('y1', yScale(fromPoint.y))
          .attr('x2', xScale(toPoint.x))
          .attr('y2', yScale(toPoint.y))
          .attr('stroke', chartColors.gray)
          .attr('stroke-width', rel.strength * 2)
          .attr('stroke-opacity', 0.4)
          .attr('stroke-dasharray', '2,2');
      }
    });

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${h})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(() => ''))
      .selectAll('line, path')
      .attr('stroke', chartColors.light);

    g.append('g')
      .call(d3.axisLeft(yScale).ticks(5).tickFormat(() => ''))
      .selectAll('line, path')
      .attr('stroke', chartColors.light);

    // Axis labels
    g.append('text')
      .attr('x', w / 2)
      .attr('y', h + 35)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.gray)
      .text('t-SNE Dimension 1');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -h / 2)
      .attr('y', -35)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.gray)
      .text('t-SNE Dimension 2');

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 28)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 700)
      .attr('fill', chartColors.charcoal)
      .text('Embedding Projector (t-SNE)');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 46)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', chartColors.gray)
      .text('Word2Vec embeddings • 300 dimensions → 2D projection');

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top + 20})`);

    legend.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Clusters');

    clusters.forEach((cluster, i) => {
      const ly = 25 + i * 28;
      legend.append('circle')
        .attr('cx', 8)
        .attr('cy', ly)
        .attr('r', 8)
        .attr('fill', cluster.color)
        .attr('opacity', 0.85);
      legend.append('text')
        .attr('x', 24)
        .attr('y', ly + 4)
        .attr('font-size', '11px')
        .attr('fill', chartColors.charcoalLight)
        .text(cluster.label);
    });

    // Stats
    const stats = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top + 160})`);

    stats.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '12px')
      .attr('font-weight', 600)
      .attr('fill', chartColors.charcoal)
      .text('Statistics');

    const statItems = [
      { label: 'Perplexity', value: '30' },
      { label: 'Iterations', value: '1000' },
      { label: 'Points', value: allPoints.length.toString() }
    ];

    statItems.forEach((item, i) => {
      stats.append('text')
        .attr('x', 0)
        .attr('y', 22 + i * 18)
        .attr('font-size', '10px')
        .attr('fill', chartColors.gray)
        .text(item.label);
      stats.append('text')
        .attr('x', 70)
        .attr('y', 22 + i * 18)
        .attr('font-size', '10px')
        .attr('font-weight', 600)
        .attr('fill', chartColors.charcoal)
        .text(item.value);
    });

  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default EmbeddingProjector;
