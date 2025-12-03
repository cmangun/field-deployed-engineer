"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Event-Driven Architecture data
const defaultData = {
  producers: [
    { id: 'web-app', name: 'Web App', icon: '⬡', events: ['user.signup', 'order.created', 'cart.updated'] },
    { id: 'mobile-app', name: 'Mobile App', icon: '⬡', events: ['user.login', 'order.created', 'location.updated'] },
    { id: 'iot-devices', name: 'IoT Devices', icon: '⬡', events: ['sensor.reading', 'device.status'] },
    { id: 'external-api', name: 'External APIs', icon: '⬡', events: ['payment.completed', 'shipping.updated'] },
  ],
  broker: {
    name: 'Apache Kafka',
    topics: [
      { name: 'user-events', partitions: 6, retention: '7d', throughput: '5K/s' },
      { name: 'order-events', partitions: 12, retention: '30d', throughput: '2K/s' },
      { name: 'inventory-events', partitions: 4, retention: '14d', throughput: '1K/s' },
      { name: 'analytics-events', partitions: 8, retention: '90d', throughput: '10K/s' },
    ]
  },
  consumers: [
    { id: 'order-service', name: 'Order Service', icon: '▢', consumes: ['order-events', 'inventory-events'], group: 'order-consumer-group' },
    { id: 'notification-service', name: 'Notification Service', icon: '▢', consumes: ['user-events', 'order-events'], group: 'notification-consumer-group' },
    { id: 'analytics-service', name: 'Analytics Service', icon: '▢', consumes: ['analytics-events', 'user-events'], group: 'analytics-consumer-group' },
    { id: 'search-indexer', name: 'Search Indexer', icon: '▢', consumes: ['inventory-events', 'order-events'], group: 'search-consumer-group' },
    { id: 'data-warehouse', name: 'Data Warehouse', icon: '▢', consumes: ['analytics-events'], group: 'dw-consumer-group' },
  ],
  schemaRegistry: {
    name: 'Schema Registry',
    schemas: 24,
    format: 'Avro'
  }
};

interface EventDrivenArchitectureProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const EventDrivenArchitecture: React.FC<EventDrivenArchitectureProps> = ({
  data = defaultData,
  width = 800,
  height = 620,
  title = "Event-Driven Architecture"
}) => {
  const [hoveredProducer, setHoveredProducer] = useState<string | null>(null);
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);
  const [hoveredConsumer, setHoveredConsumer] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const margin = { top: 70, right: 40, bottom: 60, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Layout calculations - more space between elements
  const producerWidth = 130;
  const topicWidth = 150;
  const consumerWidth = 140;
  const columnGap = 80;

  const producerX = 0;
  const brokerX = producerWidth + columnGap;
  const consumerX = brokerX + topicWidth + columnGap;

  const producerHeight = (innerHeight - 40) / data.producers.length;
  const topicHeight = (innerHeight - 60) / data.broker.topics.length;
  const consumerHeight = (innerHeight - 40) / data.consumers.length;

  // Get connections for highlighting
  const getTopicConnections = (topicName: string) => {
    const consumers = data.consumers.filter(c => c.consumes.includes(topicName));
    return consumers.map(c => c.id);
  };

  // Generate curved path
  const generatePath = (x1: number, y1: number, x2: number, y2: number) => {
    const midX = (x1 + x2) / 2;
    return `M${x1},${y1} C${midX},${y1} ${midX},${y2} ${x2},${y2}`;
  };

  return (
    <div style={{ width: '100%' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', backgroundColor: 'transparent', borderRadius: '12px' }}
      >
        <defs>
          <marker id="arrow-eda" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={chartColors.gray} />
          </marker>
          <marker id="arrow-active" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={chartColors.teal} />
          </marker>
          <linearGradient id="kafka-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={chartColors.dark} />
            <stop offset="100%" stopColor={chartColors.dark} />
          </linearGradient>
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Column Labels */}
          <text x={producerX + producerWidth / 2} y={-35} textAnchor="middle" fontSize={14} fontWeight={600} fill={chartColors.charcoalLight}>
            Producers
          </text>
          <text x={brokerX + topicWidth / 2} y={-35} textAnchor="middle" fontSize={14} fontWeight={600} fill={chartColors.charcoalLight}>
            Message Broker
          </text>
          <text x={consumerX + consumerWidth / 2} y={-35} textAnchor="middle" fontSize={14} fontWeight={600} fill={chartColors.charcoalLight}>
            Consumers
          </text>

          {/* Kafka Broker Background */}
          <rect
            x={brokerX - 15}
            y={-15}
            width={topicWidth + 30}
            height={innerHeight + 30}
            rx={12}
            fill="url(#kafka-gradient)"
            opacity={0.05}
          />
          <text x={brokerX + topicWidth / 2} y={-5} textAnchor="middle" fontSize={13} fill={chartColors.charcoal} fontWeight={500}>
            Apache Kafka
          </text>

          {/* Producer to Topic Connections */}
          {data.producers.map((producer, pIdx) => {
            const py = pIdx * producerHeight + 45;
            return data.broker.topics.map((topic, tIdx) => {
              const ty = tIdx * topicHeight + (topicHeight - 16) / 2 + 10;
              const isActive = selectedTopic === topic.name || hoveredProducer === producer.id;
              
              return (
                <path
                  key={`${producer.id}-${topic.name}`}
                  d={generatePath(producerX + producerWidth, py, brokerX, ty)}
                  fill="none"
                  stroke={isActive ? chartColors.teal : chartColors.secondary}
                  strokeWidth={isActive ? 2 : 1}
                  strokeOpacity={isActive ? 0.8 : 0.3}
                  markerEnd={isActive ? 'url(#arrow-active)' : 'url(#arrow-eda)'}
                />
              );
            });
          })}

          {/* Topic to Consumer Connections */}
          {data.broker.topics.map((topic, tIdx) => {
            const ty = tIdx * topicHeight + (topicHeight - 16) / 2 + 10;
            return data.consumers.filter(c => c.consumes.includes(topic.name)).map((consumer) => {
              const cIdx = data.consumers.indexOf(consumer);
              const cy = cIdx * consumerHeight + 43;
              const isActive = selectedTopic === topic.name || hoveredTopic === topic.name || hoveredConsumer === consumer.id;
              
              return (
                <path
                  key={`${topic.name}-${consumer.id}`}
                  d={generatePath(brokerX + topicWidth, ty, consumerX, cy)}
                  fill="none"
                  stroke={isActive ? chartColors.orange : chartColors.secondary}
                  strokeWidth={isActive ? 2 : 1}
                  strokeOpacity={isActive ? 0.8 : 0.3}
                  markerEnd={isActive ? 'url(#arrow-active)' : 'url(#arrow-eda)'}
                />
              );
            });
          })}

          {/* Producers */}
          {data.producers.map((producer, i) => {
            const y = i * producerHeight + 10;
            const isHovered = hoveredProducer === producer.id;
            
            return (
              <g
                key={producer.id}
                transform={`translate(${producerX}, ${y})`}
                onMouseEnter={() => setHoveredProducer(producer.id)}
                onMouseLeave={() => setHoveredProducer(null)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  width={producerWidth}
                  height={70}
                  rx={10}
                  fill="white"
                  stroke={isHovered ? chartColors.teal : chartColors.light}
                  strokeWidth={isHovered ? 2 : 1}
                />
                <text x={100} y={30} fontSize={20} fill={chartColors.gray}>{producer.icon}</text>
                <text x={16} y={30} fontSize={14} fontWeight={600} fill={chartColors.charcoal}>
                  {producer.name}
                </text>
                <text x={16} y={52} fontSize={13} fill={chartColors.gray}>
                  {producer.events.length} event types
                </text>
              </g>
            );
          })}

          {/* Topics */}
          {data.broker.topics.map((topic, i) => {
            const y = i * topicHeight + 10;
            const isHovered = hoveredTopic === topic.name;
            const isSelected = selectedTopic === topic.name;
            
            return (
              <g
                key={topic.name}
                transform={`translate(${brokerX}, ${y})`}
                onMouseEnter={() => setHoveredTopic(topic.name)}
                onMouseLeave={() => setHoveredTopic(null)}
                onClick={() => setSelectedTopic(isSelected ? null : topic.name)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  width={topicWidth}
                  height={topicHeight - 16}
                  rx={8}
                  fill={isSelected ? chartColors.charcoal : (isHovered ? chartColors.light : 'white')}
                  stroke={isSelected ? chartColors.charcoal : (isHovered ? chartColors.orange : chartColors.light)}
                  strokeWidth={isSelected || isHovered ? 2 : 1}
                />
                <text x={14} y={24} fontSize={14} fontWeight={600} fill={isSelected ? 'white' : chartColors.charcoal}>
                  {topic.name}
                </text>
                <text x={14} y={44} fontSize={13} fill={isSelected ? chartColors.secondary : chartColors.gray}>
                  {topic.partitions}p • {topic.retention} • {topic.throughput}
                </text>
                
                {/* Partition visualization */}
                <g transform={`translate(14, ${topicHeight - 36})`}>
                  {Array.from({ length: Math.min(topic.partitions, 6) }).map((_, j) => (
                    <rect
                      key={j}
                      x={j * 20}
                      y={0}
                      width={16}
                      height={8}
                      rx={2}
                      fill={isSelected ? chartColors.teal : chartColors.orange}
                      opacity={0.6 + (j * 0.06)}
                    />
                  ))}
                  {topic.partitions > 6 && (
                    <text x={6 * 20 + 6} y={7} fontSize={13} fill={isSelected ? chartColors.secondary : chartColors.gray}>+{topic.partitions - 6}</text>
                  )}
                </g>
              </g>
            );
          })}

          {/* Consumers */}
          {data.consumers.map((consumer, i) => {
            const y = i * consumerHeight + 8;
            const isHovered = hoveredConsumer === consumer.id;
            const isActive = selectedTopic ? consumer.consumes.includes(selectedTopic) : false;
            
            return (
              <g
                key={consumer.id}
                transform={`translate(${consumerX}, ${y})`}
                onMouseEnter={() => setHoveredConsumer(consumer.id)}
                onMouseLeave={() => setHoveredConsumer(null)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  width={consumerWidth}
                  height={70}
                  rx={10}
                  fill={isActive ? chartColors.light : 'white'}
                  stroke={isHovered ? chartColors.orange : (isActive ? chartColors.primary : chartColors.light)}
                  strokeWidth={isHovered || isActive ? 2 : 1}
                />
                <text x={110} y={28} fontSize={18} fill={chartColors.gray}>{consumer.icon}</text>
                <text x={14} y={28} fontSize={13} fontWeight={600} fill={chartColors.charcoal}>
                  {consumer.name}
                </text>
                <text x={14} y={48} fontSize={13} fill={chartColors.gray}>
                  {consumer.consumes.length} topics
                </text>
                <text x={14} y={64} fontSize={13} fill={chartColors.muted} fontStyle="italic">
                  {consumer.group.slice(0, 16)}...
                </text>
              </g>
            );
          })}

          {/* Schema Registry */}
          <g transform={`translate(${brokerX + topicWidth / 2 - 60}, ${innerHeight + 5})`}>
            <rect
              width={120}
              height={28}
              rx={4}
              fill={chartColors.navy}
              fillOpacity={0.1}
              stroke={chartColors.navy}
            />
            <text x={60} y={18} textAnchor="middle" fontSize={13} fontWeight={500} fill={chartColors.navy}>
              Schema Registry ({data.schemaRegistry.schemas})
            </text>
          </g>
        </g>
      </svg>

      {/* Legend */}
      <div style={{ 
        marginTop: '16px', 
        display: 'flex', 
        gap: '24px',
        fontSize: '14px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '3px', backgroundColor: chartColors.teal }} />
          <span style={{ color: chartColors.charcoalLight }}>Produce</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '3px', backgroundColor: chartColors.orange }} />
          <span style={{ color: chartColors.charcoalLight }}>Consume</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '18px', height: '8px', backgroundColor: chartColors.orange, opacity: 0.6, borderRadius: '2px' }} />
          <span style={{ color: chartColors.charcoalLight }}>Partition</span>
        </div>
        <div style={{ marginLeft: 'auto', color: chartColors.gray, fontSize: '13px' }}>
          Click topic to trace flow
        </div>
      </div>

      {/* Tech Stack */}
      <div style={{ 
        marginTop: '16px',
        padding: '14px 20px',
        backgroundColor: 'rgba(0,0,0,0.03)',
        borderRadius: '10px',
        fontSize: '14px',
        color: chartColors.charcoalLight
      }}>
        <strong style={{ color: chartColors.secondary }}>Tech Stack:</strong>
        <span style={{ marginLeft: '12px' }}>
          Apache Kafka • Confluent Schema Registry • Avro • Kafka Connect • ksqlDB • Kafka Streams
        </span>
      </div>
    </div>
  );
};

export default EventDrivenArchitecture;
