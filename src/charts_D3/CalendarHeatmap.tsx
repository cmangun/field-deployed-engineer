"use client";
import React, { useState, useMemo } from 'react';
import { chartColors } from './colors';

// Static sample calendar data for a year (deterministic - no Math.random)
const defaultData = [
  // January
  { date: '2024-01-01', value: 0 }, { date: '2024-01-02', value: 45 }, { date: '2024-01-03', value: 52 },
  { date: '2024-01-04', value: 48 }, { date: '2024-01-05', value: 55 }, { date: '2024-01-06', value: 25 },
  { date: '2024-01-07', value: 18 }, { date: '2024-01-08', value: 62 }, { date: '2024-01-09', value: 58 },
  { date: '2024-01-10', value: 45 }, { date: '2024-01-11', value: 52 }, { date: '2024-01-12', value: 30 },
  { date: '2024-01-13', value: 22 }, { date: '2024-01-14', value: 15 }, { date: '2024-01-15', value: 68 },
  { date: '2024-01-16', value: 72 }, { date: '2024-01-17', value: 65 }, { date: '2024-01-18', value: 58 },
  { date: '2024-01-19', value: 42 }, { date: '2024-01-20', value: 28 }, { date: '2024-01-21', value: 20 },
  { date: '2024-01-22', value: 55 }, { date: '2024-01-23', value: 48 }, { date: '2024-01-24', value: 62 },
  { date: '2024-01-25', value: 70 }, { date: '2024-01-26', value: 35 }, { date: '2024-01-27', value: 25 },
  { date: '2024-01-28', value: 18 }, { date: '2024-01-29', value: 58 }, { date: '2024-01-30', value: 52 },
  { date: '2024-01-31', value: 48 },
  // February
  { date: '2024-02-01', value: 55 }, { date: '2024-02-02', value: 42 }, { date: '2024-02-03', value: 28 },
  { date: '2024-02-04', value: 22 }, { date: '2024-02-05', value: 65 }, { date: '2024-02-06', value: 58 },
  { date: '2024-02-07', value: 72 }, { date: '2024-02-08', value: 68 }, { date: '2024-02-09', value: 45 },
  { date: '2024-02-10', value: 30 }, { date: '2024-02-11', value: 20 }, { date: '2024-02-12', value: 62 },
  { date: '2024-02-13', value: 55 }, { date: '2024-02-14', value: 78 }, { date: '2024-02-15', value: 70 },
  { date: '2024-02-16', value: 48 }, { date: '2024-02-17', value: 32 }, { date: '2024-02-18', value: 25 },
  { date: '2024-02-19', value: 58 }, { date: '2024-02-20', value: 65 }, { date: '2024-02-21', value: 52 },
  { date: '2024-02-22', value: 48 }, { date: '2024-02-23', value: 42 }, { date: '2024-02-24', value: 28 },
  { date: '2024-02-25', value: 22 }, { date: '2024-02-26', value: 55 }, { date: '2024-02-27', value: 62 },
  { date: '2024-02-28', value: 58 }, { date: '2024-02-29', value: 45 },
  // March
  { date: '2024-03-01', value: 52 }, { date: '2024-03-02', value: 35 }, { date: '2024-03-03', value: 25 },
  { date: '2024-03-04', value: 68 }, { date: '2024-03-05', value: 72 }, { date: '2024-03-06', value: 65 },
  { date: '2024-03-07', value: 58 }, { date: '2024-03-08', value: 48 }, { date: '2024-03-09', value: 32 },
  { date: '2024-03-10', value: 22 }, { date: '2024-03-11', value: 62 }, { date: '2024-03-12', value: 55 },
  { date: '2024-03-13', value: 48 }, { date: '2024-03-14', value: 75 }, { date: '2024-03-15', value: 42 },
  { date: '2024-03-16', value: 30 }, { date: '2024-03-17', value: 20 }, { date: '2024-03-18', value: 58 },
  { date: '2024-03-19', value: 65 }, { date: '2024-03-20', value: 52 }, { date: '2024-03-21', value: 48 },
  { date: '2024-03-22', value: 42 }, { date: '2024-03-23', value: 28 }, { date: '2024-03-24', value: 18 },
  { date: '2024-03-25', value: 62 }, { date: '2024-03-26', value: 70 }, { date: '2024-03-27', value: 55 },
  { date: '2024-03-28', value: 48 }, { date: '2024-03-29', value: 35 }, { date: '2024-03-30', value: 25 },
  { date: '2024-03-31', value: 22 },
  // April
  { date: '2024-04-01', value: 58 }, { date: '2024-04-02', value: 65 }, { date: '2024-04-03', value: 72 },
  { date: '2024-04-04', value: 68 }, { date: '2024-04-05', value: 45 }, { date: '2024-04-06', value: 30 },
  { date: '2024-04-07', value: 22 }, { date: '2024-04-08', value: 55 }, { date: '2024-04-09', value: 62 },
  { date: '2024-04-10', value: 48 }, { date: '2024-04-11', value: 52 }, { date: '2024-04-12', value: 38 },
  { date: '2024-04-13', value: 28 }, { date: '2024-04-14', value: 20 }, { date: '2024-04-15', value: 70 },
  { date: '2024-04-16', value: 65 }, { date: '2024-04-17', value: 58 }, { date: '2024-04-18', value: 52 },
  { date: '2024-04-19', value: 42 }, { date: '2024-04-20', value: 32 }, { date: '2024-04-21', value: 25 },
  { date: '2024-04-22', value: 62 }, { date: '2024-04-23', value: 55 }, { date: '2024-04-24', value: 48 },
  { date: '2024-04-25', value: 72 }, { date: '2024-04-26', value: 40 }, { date: '2024-04-27', value: 28 },
  { date: '2024-04-28', value: 22 }, { date: '2024-04-29', value: 58 }, { date: '2024-04-30', value: 65 },
  // May
  { date: '2024-05-01', value: 52 }, { date: '2024-05-02', value: 48 }, { date: '2024-05-03', value: 42 },
  { date: '2024-05-04', value: 30 }, { date: '2024-05-05', value: 22 }, { date: '2024-05-06', value: 68 },
  { date: '2024-05-07', value: 72 }, { date: '2024-05-08', value: 65 }, { date: '2024-05-09', value: 58 },
  { date: '2024-05-10', value: 45 }, { date: '2024-05-11', value: 32 }, { date: '2024-05-12', value: 25 },
  { date: '2024-05-13', value: 62 }, { date: '2024-05-14', value: 55 }, { date: '2024-05-15', value: 48 },
  { date: '2024-05-16', value: 75 }, { date: '2024-05-17', value: 42 }, { date: '2024-05-18', value: 30 },
  { date: '2024-05-19', value: 20 }, { date: '2024-05-20', value: 58 }, { date: '2024-05-21', value: 65 },
  { date: '2024-05-22', value: 52 }, { date: '2024-05-23', value: 48 }, { date: '2024-05-24', value: 38 },
  { date: '2024-05-25', value: 28 }, { date: '2024-05-26', value: 18 }, { date: '2024-05-27', value: 0 },
  { date: '2024-05-28', value: 70 }, { date: '2024-05-29', value: 55 }, { date: '2024-05-30', value: 48 },
  { date: '2024-05-31', value: 42 },
  // June
  { date: '2024-06-01', value: 30 }, { date: '2024-06-02', value: 22 }, { date: '2024-06-03', value: 58 },
  { date: '2024-06-04', value: 65 }, { date: '2024-06-05', value: 72 }, { date: '2024-06-06', value: 68 },
  { date: '2024-06-07', value: 45 }, { date: '2024-06-08', value: 32 }, { date: '2024-06-09', value: 25 },
  { date: '2024-06-10', value: 55 }, { date: '2024-06-11', value: 62 }, { date: '2024-06-12', value: 48 },
  { date: '2024-06-13', value: 52 }, { date: '2024-06-14', value: 40 }, { date: '2024-06-15', value: 28 },
  { date: '2024-06-16', value: 20 }, { date: '2024-06-17', value: 70 }, { date: '2024-06-18', value: 65 },
  { date: '2024-06-19', value: 58 }, { date: '2024-06-20', value: 52 }, { date: '2024-06-21', value: 42 },
  { date: '2024-06-22', value: 32 }, { date: '2024-06-23', value: 25 }, { date: '2024-06-24', value: 62 },
  { date: '2024-06-25', value: 55 }, { date: '2024-06-26', value: 48 }, { date: '2024-06-27', value: 72 },
  { date: '2024-06-28', value: 38 }, { date: '2024-06-29', value: 28 }, { date: '2024-06-30', value: 22 },
  // July
  { date: '2024-07-01', value: 58 }, { date: '2024-07-02', value: 65 }, { date: '2024-07-03', value: 52 },
  { date: '2024-07-04', value: 0 }, { date: '2024-07-05', value: 42 }, { date: '2024-07-06', value: 30 },
  { date: '2024-07-07', value: 22 }, { date: '2024-07-08', value: 68 }, { date: '2024-07-09', value: 72 },
  { date: '2024-07-10', value: 65 }, { date: '2024-07-11', value: 58 }, { date: '2024-07-12', value: 45 },
  { date: '2024-07-13', value: 32 }, { date: '2024-07-14', value: 25 }, { date: '2024-07-15', value: 62 },
  { date: '2024-07-16', value: 55 }, { date: '2024-07-17', value: 48 }, { date: '2024-07-18', value: 75 },
  { date: '2024-07-19', value: 42 }, { date: '2024-07-20', value: 30 }, { date: '2024-07-21', value: 20 },
  { date: '2024-07-22', value: 58 }, { date: '2024-07-23', value: 65 }, { date: '2024-07-24', value: 52 },
  { date: '2024-07-25', value: 48 }, { date: '2024-07-26', value: 38 }, { date: '2024-07-27', value: 28 },
  { date: '2024-07-28', value: 18 }, { date: '2024-07-29', value: 70 }, { date: '2024-07-30', value: 55 },
  { date: '2024-07-31', value: 48 },
  // August
  { date: '2024-08-01', value: 52 }, { date: '2024-08-02', value: 42 }, { date: '2024-08-03', value: 30 },
  { date: '2024-08-04', value: 22 }, { date: '2024-08-05', value: 58 }, { date: '2024-08-06', value: 65 },
  { date: '2024-08-07', value: 72 }, { date: '2024-08-08', value: 68 }, { date: '2024-08-09', value: 45 },
  { date: '2024-08-10', value: 32 }, { date: '2024-08-11', value: 25 }, { date: '2024-08-12', value: 55 },
  { date: '2024-08-13', value: 62 }, { date: '2024-08-14', value: 48 }, { date: '2024-08-15', value: 52 },
  { date: '2024-08-16', value: 40 }, { date: '2024-08-17', value: 28 }, { date: '2024-08-18', value: 20 },
  { date: '2024-08-19', value: 70 }, { date: '2024-08-20', value: 65 }, { date: '2024-08-21', value: 58 },
  { date: '2024-08-22', value: 52 }, { date: '2024-08-23', value: 42 }, { date: '2024-08-24', value: 32 },
  { date: '2024-08-25', value: 25 }, { date: '2024-08-26', value: 62 }, { date: '2024-08-27', value: 55 },
  { date: '2024-08-28', value: 48 }, { date: '2024-08-29', value: 72 }, { date: '2024-08-30', value: 38 },
  { date: '2024-08-31', value: 28 },
  // September
  { date: '2024-09-01', value: 22 }, { date: '2024-09-02', value: 0 }, { date: '2024-09-03', value: 65 },
  { date: '2024-09-04', value: 52 }, { date: '2024-09-05', value: 48 }, { date: '2024-09-06', value: 42 },
  { date: '2024-09-07', value: 30 }, { date: '2024-09-08', value: 22 }, { date: '2024-09-09', value: 68 },
  { date: '2024-09-10', value: 72 }, { date: '2024-09-11', value: 65 }, { date: '2024-09-12', value: 58 },
  { date: '2024-09-13', value: 45 }, { date: '2024-09-14', value: 32 }, { date: '2024-09-15', value: 25 },
  { date: '2024-09-16', value: 62 }, { date: '2024-09-17', value: 55 }, { date: '2024-09-18', value: 48 },
  { date: '2024-09-19', value: 75 }, { date: '2024-09-20', value: 42 }, { date: '2024-09-21', value: 30 },
  { date: '2024-09-22', value: 20 }, { date: '2024-09-23', value: 58 }, { date: '2024-09-24', value: 65 },
  { date: '2024-09-25', value: 52 }, { date: '2024-09-26', value: 48 }, { date: '2024-09-27', value: 38 },
  { date: '2024-09-28', value: 28 }, { date: '2024-09-29', value: 18 }, { date: '2024-09-30', value: 70 },
  // October (Q4 - higher values)
  { date: '2024-10-01', value: 75 }, { date: '2024-10-02', value: 82 }, { date: '2024-10-03', value: 78 },
  { date: '2024-10-04', value: 68 }, { date: '2024-10-05', value: 45 }, { date: '2024-10-06', value: 35 },
  { date: '2024-10-07', value: 80 }, { date: '2024-10-08', value: 85 }, { date: '2024-10-09', value: 78 },
  { date: '2024-10-10', value: 72 }, { date: '2024-10-11', value: 65 }, { date: '2024-10-12', value: 42 },
  { date: '2024-10-13', value: 32 }, { date: '2024-10-14', value: 82 }, { date: '2024-10-15', value: 88 },
  { date: '2024-10-16', value: 75 }, { date: '2024-10-17', value: 70 }, { date: '2024-10-18', value: 62 },
  { date: '2024-10-19', value: 48 }, { date: '2024-10-20', value: 38 }, { date: '2024-10-21', value: 78 },
  { date: '2024-10-22', value: 85 }, { date: '2024-10-23', value: 80 }, { date: '2024-10-24', value: 72 },
  { date: '2024-10-25', value: 68 }, { date: '2024-10-26', value: 45 }, { date: '2024-10-27', value: 35 },
  { date: '2024-10-28', value: 82 }, { date: '2024-10-29', value: 88 }, { date: '2024-10-30', value: 75 },
  { date: '2024-10-31', value: 70 },
  // November (Q4 - higher values)
  { date: '2024-11-01', value: 78 }, { date: '2024-11-02', value: 48 }, { date: '2024-11-03', value: 38 },
  { date: '2024-11-04', value: 85 }, { date: '2024-11-05', value: 90 }, { date: '2024-11-06', value: 82 },
  { date: '2024-11-07', value: 75 }, { date: '2024-11-08', value: 68 }, { date: '2024-11-09', value: 45 },
  { date: '2024-11-10', value: 35 }, { date: '2024-11-11', value: 80 }, { date: '2024-11-12', value: 88 },
  { date: '2024-11-13', value: 82 }, { date: '2024-11-14', value: 75 }, { date: '2024-11-15', value: 70 },
  { date: '2024-11-16', value: 48 }, { date: '2024-11-17', value: 38 }, { date: '2024-11-18', value: 85 },
  { date: '2024-11-19', value: 92 }, { date: '2024-11-20', value: 85 }, { date: '2024-11-21', value: 78 },
  { date: '2024-11-22', value: 72 }, { date: '2024-11-23', value: 45 }, { date: '2024-11-24', value: 35 },
  { date: '2024-11-25', value: 82 }, { date: '2024-11-26', value: 88 }, { date: '2024-11-27', value: 75 },
  { date: '2024-11-28', value: 0 }, { date: '2024-11-29', value: 55 }, { date: '2024-11-30', value: 42 },
  // December (Q4 - higher values)
  { date: '2024-12-01', value: 35 }, { date: '2024-12-02', value: 85 }, { date: '2024-12-03', value: 90 },
  { date: '2024-12-04', value: 82 }, { date: '2024-12-05', value: 78 }, { date: '2024-12-06', value: 70 },
  { date: '2024-12-07', value: 48 }, { date: '2024-12-08', value: 38 }, { date: '2024-12-09', value: 88 },
  { date: '2024-12-10', value: 92 }, { date: '2024-12-11', value: 85 }, { date: '2024-12-12', value: 80 },
  { date: '2024-12-13', value: 72 }, { date: '2024-12-14', value: 45 }, { date: '2024-12-15', value: 35 },
  { date: '2024-12-16', value: 82 }, { date: '2024-12-17', value: 88 }, { date: '2024-12-18', value: 78 },
  { date: '2024-12-19', value: 72 }, { date: '2024-12-20', value: 65 }, { date: '2024-12-21', value: 42 },
  { date: '2024-12-22', value: 32 }, { date: '2024-12-23', value: 75 }, { date: '2024-12-24', value: 55 },
  { date: '2024-12-25', value: 0 }, { date: '2024-12-26', value: 62 }, { date: '2024-12-27', value: 70 },
  { date: '2024-12-28', value: 48 }, { date: '2024-12-29', value: 38 }, { date: '2024-12-30', value: 78 },
  { date: '2024-12-31', value: 65 },
];

interface CalendarHeatmapProps {
  data?: { date: string; value: number }[];
  width?: number;
  height?: number;
  title?: string;
  colorScheme?: 'teal' | 'orange' | 'purple';
}

const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({
  data = defaultData,
  width = 700,
  height = 180,
  title = "Calendar Heatmap",
  colorScheme = 'teal'
}) => {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  const cellSize = 12;
  const cellGap = 2;
  const monthLabelHeight = 20;
  const dayLabelWidth = 25;

  // Color scales
  const colorScales = {
    teal: [chartColors.light, chartColors.light, chartColors.light, chartColors.cyan, chartColors.primary, chartColors.dark],
    orange: [chartColors.light, chartColors.light, chartColors.cyan, chartColors.secondary, chartColors.secondary, chartColors.secondary],
    purple: [chartColors.light, chartColors.light, chartColors.teal, chartColors.teal, chartColors.muted, chartColors.navy],
  };

  const colors = colorScales[colorScheme];

  // Process data into weeks
  const { weeks, months, maxValue, minValue } = useMemo(() => {
    const dataMap = new Map(data.map(d => [d.date, d.value]));
    const values = data.map(d => d.value).filter(v => v > 0);
    const max = Math.max(...values);
    const min = Math.min(...values);

    const weeks: { date: string; value: number; dayOfWeek: number }[][] = [];
    const months: { name: string; x: number }[] = [];
    
    // Find first day
    const dates = data.map(d => new Date(d.date)).sort((a, b) => a.getTime() - b.getTime());
    if (dates.length === 0) return { weeks: [], months: [], maxValue: 0, minValue: 0 };

    const firstDate = dates[0];
    const lastDate = dates[dates.length - 1];
    
    let currentWeek: typeof weeks[0] = [];
    let currentMonth = -1;
    
    // Pad first week
    const firstDayOfWeek = firstDate.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({ date: '', value: -1, dayOfWeek: i });
    }

    for (let d = new Date(firstDate); d <= lastDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const dayOfWeek = d.getDay();
      const month = d.getMonth();

      // Track month labels
      if (month !== currentMonth) {
        currentMonth = month;
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        months.push({ name: monthNames[month], x: weeks.length * (cellSize + cellGap) });
      }

      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentWeek.push({
        date: dateStr,
        value: dataMap.get(dateStr) ?? 0,
        dayOfWeek
      });
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return { weeks, months, maxValue: max, minValue: min };
  }, [data]);

  // Get color for value
  const getColor = (value: number): string => {
    if (value < 0) return 'transparent'; // Empty cell
    if (value === 0) return '#eee';
    
    const ratio = (value - minValue) / (maxValue - minValue);
    const index = Math.min(colors.length - 1, Math.floor(ratio * colors.length));
    return colors[index];
  };

  // Get tooltip data
  const getTooltipData = () => {
    if (!hoveredDate) return null;
    const item = data.find(d => d.date === hoveredDate);
    if (!item) return null;
    
    const date = new Date(hoveredDate);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return {
      formatted: `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
      value: item.value
    };
  };

  const tooltipData = getTooltipData();
  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <div style={{ width: '100%' }}>
      {/* SVG */}
      <svg
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto' }}
        onMouseLeave={() => setHoveredDate(null)}
      >
        {/* Month labels */}
        {months.map((month, i) => (
          <text
            key={i}
            x={dayLabelWidth + month.x}
            y={12}
            fontSize={10}
            fill={chartColors.charcoalLight}
          >
            {month.name}
          </text>
        ))}

        {/* Day labels */}
        {dayLabels.map((day, i) => (
          <text
            key={i}
            x={0}
            y={monthLabelHeight + i * (cellSize + cellGap) + cellSize / 2 + 3}
            fontSize={9}
            fill={chartColors.gray}
          >
            {day}
          </text>
        ))}

        {/* Calendar cells */}
        <g transform={`translate(${dayLabelWidth}, ${monthLabelHeight})`}>
          {weeks.map((week, weekIndex) => (
            <g key={weekIndex} transform={`translate(${weekIndex * (cellSize + cellGap)}, 0)`}>
              {week.map((day, dayIndex) => (
                <rect
                  key={dayIndex}
                  x={0}
                  y={day.dayOfWeek * (cellSize + cellGap)}
                  width={cellSize}
                  height={cellSize}
                  fill={getColor(day.value)}
                  rx={2}
                  stroke={hoveredDate === day.date ? chartColors.charcoal : 'transparent'}
                  strokeWidth={hoveredDate === day.date ? 2 : 0}
                  onMouseEnter={() => day.date && setHoveredDate(day.date)}
                  style={{ cursor: day.date ? 'pointer' : 'default' }}
                >
                  <title>{day.date ? `${day.date}: ${day.value}` : ''}</title>
                </rect>
              ))}
            </g>
          ))}
        </g>
      </svg>

      {/* Legend */}
      <div style={{ 
        marginTop: '12px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        fontSize: '11px'
      }}>
        <span style={{ color: chartColors.gray }}>Less</span>
        {colors.map((color, i) => (
          <div
            key={i}
            style={{
              width: cellSize,
              height: cellSize,
              backgroundColor: color,
              borderRadius: '2px'
            }}
          />
        ))}
        <span style={{ color: chartColors.gray }}>More</span>
        
        {tooltipData && (
          <div style={{ 
            marginLeft: 'auto', 
            padding: '4px 8px', 
            backgroundColor: chartColors.background, 
            borderRadius: '4px' 
          }}>
            <span style={{ fontWeight: 500 }}>{tooltipData.formatted}</span>
            <span style={{ marginLeft: '8px', fontWeight: 600, color: chartColors.teal }}>
              {tooltipData.value}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarHeatmap;
