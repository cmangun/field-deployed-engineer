// Chart color palette - Refined Neumorphic Design System
// Based on ClusterMonitor reference (GPU Utilization card style)

export const chartColors = {
  // Neumorphic Base (matches body background)
  background: '#e4e4e4',
  white: '#ffffff',
  cardBg: '#e4e4e4',
  
  // Text hierarchy - WCAG AA compliant
  primary: '#1a1a1a',
  dark: '#222',
  secondary: '#333',
  tertiary: '#444',
  muted: '#555',
  disabled: '#666',
  subtle: '#666',
  
  // UI Elements
  border: '#d0d0d0',
  tagBg: '#e0e0e0',
  tagText: '#444',
  barBg: '#d8d8d8',
  barFill: '#555',
  barWarning: '#444',
  
  // Semantic mappings (grayscale)
  charcoal: '#222',
  charcoalLight: '#444',
  gray: '#555',
  grayLight: '#666',
  light: '#e0e0e0',
  ice: '#e8e8e8',
  
  // Legacy compatibility
  cobalt: '#333',
  sky: '#555',
  slate: '#555',
  steel: '#444',
  periwinkle: '#555',
  teal: '#444',
  navy: '#222',
  cyan: '#555',
  accent: '#333',
  
  // Status colors (grayscale)
  green: '#444',
  red: '#222',
  orange: '#555',
  indigo: '#333',
  purple: '#555',
  pink: '#666',
};

// Ordered palette for sequential use
export const healthcarePalette = [
  '#333',
  '#444',
  '#555',
  '#666',
  '#777',
  '#888',
  '#999',
  '#aaa',
];

export const chartSequence = [
  '#222',
  '#444',
  '#555',
  '#666',
  '#777',
  '#888',
  '#999',
  '#aaa',
];

export const bluePalette = chartSequence;

export const grayscaleGradient = [
  '#333',
  '#555',
  '#777',
  '#999',
  '#bbb',
];

// Typography settings - MINIMUM 10pt (13px) for all text
export const chartTypography = {
  fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontSize: {
    // Minimum readable sizes (no font smaller than 13px/10pt)
    xs: 13,      // Was 12 - now 10pt minimum
    sm: 14,      // 10.5pt
    md: 16,      // 12pt - body text
    lg: 18,      // 13.5pt - subheadings
    xl: 20,      // 15pt - headings
    xxl: 24,     // 18pt - titles
    xxxl: 28,    // 21pt - large titles
    hero: 48,    // 36pt - hero metrics
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Icon sizes - minimum 30x30px
export const chartIconSizes = {
  sm: 30,      // Minimum size
  md: 36,      // Default
  lg: 42,      // Large
  xl: 48,      // Extra large
};

export const chartTextColors = {
  primary: '#1a1a1a',
  secondary: '#333',
  tertiary: '#444',
  muted: '#555',
  subtle: '#666',
  light: '#888',
};

export const neumorphicShadows = {
  raised: '8px 8px 20px #c2c2c2, -8px -8px 20px #ffffff',
  raisedSm: '4px 4px 10px #c2c2c2, -4px -4px 10px #ffffff',
  inset: 'inset 3px 3px 6px #c2c2c2, inset -3px -3px 6px #ffffff',
  insetSm: 'inset 2px 2px 5px #c2c2c2, inset -2px -2px 5px #ffffff',
};

export const neumorphicBg = '#e4e4e4';

/**
 * WCAG Contrast Color Utility
 * Automatically determines whether black or white text provides better contrast
 * against a given background color, based on WCAG contrast algorithms.
 * 
 * @param bgColor - Background color in hex format (e.g., '#333333' or '333333')
 * @param darkText - Text color to use on light backgrounds (default: '#222')
 * @param lightText - Text color to use on dark backgrounds (default: '#fff')
 * @returns The appropriate text color for WCAG AA compliance
 * 
 * @example
 * // In D3 chart:
 * .attr('fill', d => getContrastColor(d.color))
 * 
 * // With custom colors:
 * getContrastColor('#1a1a1a', '#333', '#f0f0f0')
 */
export function getContrastColor(
  bgColor: string,
  darkText: string = '#222',
  lightText: string = '#fff'
): string {
  // Remove # if present
  const hex = bgColor.replace('#', '');
  
  // Handle shorthand hex (e.g., '333' -> '333333')
  const fullHex = hex.length === 3 
    ? hex.split('').map(c => c + c).join('') 
    : hex;
  
  // Parse RGB values
  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);
  
  // Calculate relative luminance (WCAG formula)
  // https://www.w3.org/WAI/GL/wiki/Relative_luminance
  const toLinear = (c: number): number => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 
      ? sRGB / 12.92 
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  };
  
  const luminance = 
    0.2126 * toLinear(r) + 
    0.7152 * toLinear(g) + 
    0.0722 * toLinear(b);
  
  // Use 0.179 threshold (WCAG recommended midpoint)
  // Lower luminance = darker background = use light text
  return luminance > 0.179 ? darkText : lightText;
}

/**
 * Batch contrast color calculation for an array of background colors
 * Useful for generating text colors for chart legends, cells, etc.
 * 
 * @param bgColors - Array of hex color strings
 * @returns Array of corresponding text colors
 */
export function getContrastColors(bgColors: string[]): string[] {
  return bgColors.map(bg => getContrastColor(bg));
}

/**
 * Check if a background color is considered "dark" (needs light text)
 * 
 * @param bgColor - Background color in hex format
 * @returns true if background is dark, false if light
 */
export function isDarkBackground(bgColor: string): boolean {
  return getContrastColor(bgColor) === '#fff';
}
