"use client";
import React, { useState } from 'react';
import { chartColors } from './colors';

// Campaign Performance data
const defaultData = {
  dateRange: 'Q4 2024',
  totalSpend: 485000,
  totalLeads: 3420,
  totalMQLs: 892,
  overallCAC: 544,
  channels: [
    {
      id: 'paid_search',
      name: 'Paid Search',
      icon: '🔍',
      spend: 145000,
      impressions: 2850000,
      clicks: 42500,
      leads: 1250,
      mqls: 312,
      sqlRate: 28,
      cpl: 116,
      cac: 465,
      roas: 3.2,
      trend: 'up',
    },
    {
      id: 'paid_social',
      name: 'Paid Social',
      icon: '📱',
      spend: 98000,
      impressions: 4200000,
      clicks: 38500,
      leads: 680,
      mqls: 156,
      sqlRate: 22,
      cpl: 144,
      cac: 628,
      roas: 2.1,
      trend: 'stable',
    },
    {
      id: 'display',
      name: 'Display Ads',
      icon: '🖼️',
      spend: 62000,
      impressions: 8500000,
      clicks: 21200,
      leads: 420,
      mqls: 84,
      sqlRate: 18,
      cpl: 148,
      cac: 738,
      roas: 1.4,
      trend: 'down',
    },
    {
      id: 'content',
      name: 'Content/SEO',
      icon: '📝',
      spend: 85000,
      impressions: 1200000,
      clicks: 185000,
      leads: 620,
      mqls: 186,
      sqlRate: 32,
      cpl: 137,
      cac: 457,
      roas: 4.1,
      trend: 'up',
    },
    {
      id: 'email',
      name: 'Email',
      icon: '📧',
      spend: 35000,
      impressions: 450000,
      clicks: 52000,
      leads: 280,
      mqls: 98,
      sqlRate: 38,
      cpl: 125,
      cac: 357,
      roas: 5.2,
      trend: 'up',
    },
    {
      id: 'events',
      name: 'Events',
      icon: '🎪',
      spend: 60000,
      impressions: 15000,
      clicks: 8500,
      leads: 170,
      mqls: 56,
      sqlRate: 42,
      cpl: 353,
      cac: 1071,
      roas: 2.8,
      trend: 'stable',
    },
  ],
  weeklyTrend: [
    { week: 'W1', spend: 38500, leads: 265, mqls: 68 },
    { week: 'W2', spend: 42000, leads: 285, mqls: 74 },
    { week: 'W3', spend: 35800, leads: 248, mqls: 62 },
    { week: 'W4', spend: 44200, leads: 312, mqls: 82 },
    { week: 'W5', spend: 41500, leads: 295, mqls: 76 },
    { week: 'W6', spend: 48000, leads: 342, mqls: 92 },
  ],
  topCampaigns: [
    { name: 'ML Platform Demo Request', channel: 'Paid Search', spend: 28500, leads: 245, cpl: 116, conversion: 32 },
    { name: 'Data Engineering Guide', channel: 'Content', spend: 12000, leads: 185, cpl: 65, conversion: 28 },
    { name: 'AI Summit Webinar', channel: 'Email', spend: 8500, leads: 142, cpl: 60, conversion: 35 },
    { name: 'LinkedIn Decision Makers', channel: 'Paid Social', spend: 32000, leads: 128, cpl: 250, conversion: 18 },
  ],
};

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

const formatNumber = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
};

interface CampaignPerformanceProps {
  data?: typeof defaultData;
  width?: number;
  height?: number;
  title?: string;
}

const CampaignPerformance: React.FC<CampaignPerformanceProps> = ({
  data = defaultData,
  width = 700,
  height = 520,
  title = "Campaign Performance"
}) => {
  const [viewMode, setViewMode] = useState<'overview' | 'channels' | 'campaigns'>('overview');
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'spend' | 'leads' | 'cac' | 'roas'>('spend');

  const sortedChannels = [...data.channels].sort((a, b) => {
    if (sortBy === 'cac') return a[sortBy] - b[sortBy];
    if (sortBy === 'roas') return b[sortBy] - a[sortBy];
    return b[sortBy] - a[sortBy];
  });

  const chartWidth = width - 100;

  return (
    <div style={{ width: '100%' }}>
      {/* Summary Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.dark }}>{formatCurrency(data.totalSpend)}</div>
          <div style={{ fontSize: '9px', color: chartColors.dark }}>Total Spend</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>{formatNumber(data.totalLeads)}</div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>Total Leads</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.primary }}>{formatNumber(data.totalMQLs)}</div>
          <div style={{ fontSize: '9px', color: chartColors.navy }}>MQLs</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: chartColors.light, borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: chartColors.secondary }}>{formatCurrency(data.overallCAC)}</div>
          <div style={{ fontSize: '9px', color: chartColors.dark }}>Blended CAC</div>
        </div>
      </div>

      {viewMode === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Spend by Channel */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              SPEND BY CHANNEL
            </div>
            {data.channels.map((channel) => {
              const percent = (channel.spend / data.totalSpend) * 100;
              return (
                <div key={channel.id} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>{channel.icon}</span>
                      <span style={{ color: chartColors.charcoal }}>{channel.name}</span>
                    </span>
                    <span style={{ fontWeight: 600 }}>{formatCurrency(channel.spend)} ({percent.toFixed(0)}%)</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: chartColors.light, borderRadius: '3px' }}>
                    <div style={{
                      width: `${percent}%`,
                      height: '100%',
                      backgroundColor: channel.trend === 'up' ? chartColors.primary : channel.trend === 'down' ? chartColors.dark : chartColors.secondary,
                      borderRadius: '3px'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Weekly Trend */}
          <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
              WEEKLY TREND
            </div>
            <svg width={chartWidth / 2 - 32} height={150}>
              {/* Bars for spend */}
              {data.weeklyTrend.map((week, i) => {
                const barWidth = (chartWidth / 2 - 60) / data.weeklyTrend.length - 4;
                const x = 20 + i * (barWidth + 4);
                const maxSpend = Math.max(...data.weeklyTrend.map(w => w.spend));
                const barHeight = (week.spend / maxSpend) * 100;
                
                return (
                  <g key={week.week}>
                    <rect
                      x={x}
                      y={120 - barHeight}
                      width={barWidth}
                      height={barHeight}
                      fill={chartColors.teal}
                      opacity={0.7}
                      rx={3}
                    />
                    <text x={x + barWidth / 2} y={135} textAnchor="middle" fontSize={8} fill={chartColors.gray}>
                      {week.week}
                    </text>
                    <text x={x + barWidth / 2} y={115 - barHeight} textAnchor="middle" fontSize={8} fill={chartColors.charcoal}>
                      {formatCurrency(week.spend)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {viewMode === 'channels' && (
        <div>
          {/* Sort buttons */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '10px', color: chartColors.gray }}>Sort by:</span>
            {(['spend', 'leads', 'cac', 'roas'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                style={{
                  padding: '3px 8px',
                  fontSize: '9px',
                  backgroundColor: sortBy === key ? chartColors.charcoal : 'white',
                  color: sortBy === key ? 'white' : chartColors.charcoal,
                  border: `1px solid ${chartColors.light}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textTransform: 'uppercase'
                }}
              >
                {key}
              </button>
            ))}
          </div>

          <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
            {sortedChannels.map((channel) => (
              <div
                key={channel.id}
                onClick={() => setSelectedChannel(selectedChannel === channel.id ? null : channel.id)}
                style={{
                  padding: '12px',
                  backgroundColor: selectedChannel === channel.id ? chartColors.background : 'white',
                  borderRadius: '10px',
                  border: `1px solid ${selectedChannel === channel.id ? chartColors.teal : chartColors.light}`,
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>{channel.icon}</span>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.charcoal }}>{channel.name}</div>
                      <div style={{ fontSize: '9px', color: chartColors.gray }}>
                        {formatNumber(channel.impressions)} impressions • {formatNumber(channel.clicks)} clicks
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: chartColors.charcoal }}>{formatCurrency(channel.spend)}</div>
                      <div style={{ fontSize: '9px', color: chartColors.gray }}>spend</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: chartColors.primary }}>{channel.leads}</div>
                      <div style={{ fontSize: '9px', color: chartColors.gray }}>leads</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: channel.cac < 500 ? chartColors.primary : channel.cac < 700 ? chartColors.secondary : chartColors.dark }}>
                        {formatCurrency(channel.cac)}
                      </div>
                      <div style={{ fontSize: '9px', color: chartColors.gray }}>CAC</div>
                    </div>
                    <div style={{
                      padding: '6px 10px',
                      backgroundColor: channel.roas >= 3 ? chartColors.light : channel.roas >= 2 ? chartColors.light : chartColors.light,
                      color: channel.roas >= 3 ? chartColors.navy : channel.roas >= 2 ? chartColors.dark : chartColors.dark,
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 700
                    }}>
                      {channel.roas}x
                    </div>
                    <span style={{
                      fontSize: '14px',
                      color: channel.trend === 'up' ? chartColors.primary : channel.trend === 'down' ? chartColors.dark : chartColors.secondary
                    }}>
                      {channel.trend === 'up' ? '↑' : channel.trend === 'down' ? '↓' : '→'}
                    </span>
                  </div>
                </div>

                {selectedChannel === channel.id && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${chartColors.light}` }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', fontSize: '10px' }}>
                      <div>
                        <div style={{ color: chartColors.gray }}>CTR</div>
                        <div style={{ fontWeight: 600 }}>{((channel.clicks / channel.impressions) * 100).toFixed(2)}%</div>
                      </div>
                      <div>
                        <div style={{ color: chartColors.gray }}>CPL</div>
                        <div style={{ fontWeight: 600 }}>{formatCurrency(channel.cpl)}</div>
                      </div>
                      <div>
                        <div style={{ color: chartColors.gray }}>MQLs</div>
                        <div style={{ fontWeight: 600 }}>{channel.mqls}</div>
                      </div>
                      <div>
                        <div style={{ color: chartColors.gray }}>SQL Rate</div>
                        <div style={{ fontWeight: 600 }}>{channel.sqlRate}%</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'campaigns' && (
        <div style={{ backgroundColor: 'white', borderRadius: '10px', border: `1px solid ${chartColors.light}`, padding: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoalLight, marginBottom: '12px' }}>
            TOP CAMPAIGNS
          </div>
          {data.topCampaigns.map((campaign, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: i % 2 === 0 ? chartColors.background : 'white',
              borderRadius: '8px',
              marginBottom: '4px'
            }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: chartColors.charcoal }}>{campaign.name}</div>
                <div style={{ fontSize: '9px', color: chartColors.gray }}>{campaign.channel}</div>
              </div>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600 }}>{formatCurrency(campaign.spend)}</div>
                  <div style={{ fontSize: '8px', color: chartColors.gray }}>spend</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: chartColors.primary }}>{campaign.leads}</div>
                  <div style={{ fontSize: '8px', color: chartColors.gray }}>leads</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600 }}>{formatCurrency(campaign.cpl)}</div>
                  <div style={{ fontSize: '8px', color: chartColors.gray }}>CPL</div>
                </div>
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: campaign.conversion >= 30 ? chartColors.light : chartColors.light,
                  color: campaign.conversion >= 30 ? chartColors.navy : chartColors.dark,
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 600
                }}>
                  {campaign.conversion}% conv
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignPerformance;
