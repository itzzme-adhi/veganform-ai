import React, { useState } from 'react';

export interface RadarPoint {
  label: string;
  angle: number; // in degrees, 0 = top
}

export interface RadarSeries {
  id: string;
  name: string;
  color: string;
  fillColor?: string;
  strokeDash?: string;
  strokeWidth?: number;
  values: number[]; // 0 to 100 corresponding to axes
  glow?: boolean;
}

interface RadarChartProps {
  axes?: string[];
  series: RadarSeries[];
  size?: number;
  title?: string;
  legend?: boolean;
}

const DEFAULT_AXES = ['Mastication', 'Moisture Retention', 'Shear Tensile', 'Volatile Umami', 'Thermal Stability'];

export const RadarChart: React.FC<RadarChartProps> = ({
  axes = DEFAULT_AXES,
  series,
  size = 240,
  title,
  legend = true
}) => {
  const [hoveredAxis, setHoveredAxis] = useState<number | null>(null);

  const center = size / 2;
  const radius = size * 0.38;
  const numAxes = axes.length;

  // Compute coordinate for an axis at given percentage (0-100)
  const getCoordinates = (index: number, value: number) => {
    // 0 index is at top (-90 degrees)
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = (radius * Math.max(0, Math.min(100, value))) / 100;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Label coordinates (positioned slightly outside the outer ring)
  const getLabelCoordinates = (index: number) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = radius + 22;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Generate polygon points string for a series
  const getPolygonPoints = (values: number[]) => {
    return values
      .map((val, idx) => {
        const { x, y } = getCoordinates(idx, val);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  // Ring levels: 25%, 50%, 75%, 100%
  const levels = [25, 50, 75, 100];

  return (
    <div className="flex flex-col items-center select-none w-full">
      {title && (
        <span className="font-mono text-xs text-[#8da396] mb-2">{title}</span>
      )}
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <radialGradient id="radarGridGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00f5a0" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0a0f0d" stopOpacity="0" />
            </radialGradient>
            <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background circular ambient glow */}
          <circle cx={center} cy={center} r={radius * 1.15} fill="url(#radarGridGlow)" />

          {/* Concentric grid polygons */}
          {levels.map((level) => {
            const points = axes
              .map((_, idx) => {
                const { x, y } = getCoordinates(idx, level);
                return `${x.toFixed(1)},${y.toFixed(1)}`;
              })
              .join(' ');
            return (
              <polygon
                key={level}
                points={points}
                fill="none"
                stroke="#1f382b"
                strokeWidth={level === 100 ? '1.5' : '1'}
                strokeDasharray={level === 100 ? undefined : '2 2'}
                className="opacity-70"
              />
            );
          })}

          {/* Radial axis lines from center to outer ring */}
          {axes.map((_, idx) => {
            const { x, y } = getCoordinates(idx, 100);
            return (
              <line
                key={idx}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#1f382b"
                strokeWidth="1"
                className={hoveredAxis === idx ? 'stroke-[#00f5a0]/60' : ''}
              />
            );
          })}

          {/* Series Polygons */}
          {series.map((s) => {
            const points = getPolygonPoints(s.values);
            return (
              <g key={s.id} className="transition-all duration-500">
                <polygon
                  points={points}
                  fill={s.fillColor || `${s.color}22`}
                  stroke={s.color}
                  strokeWidth={s.strokeWidth || 2}
                  strokeDasharray={s.strokeDash}
                  style={s.glow ? { filter: 'drop-shadow(0 0 6px rgba(0, 245, 160, 0.65))' } : undefined}
                />
                {/* Dots at vertices */}
                {s.values.map((val, idx) => {
                  const { x, y } = getCoordinates(idx, val);
                  return (
                    <circle
                      key={idx}
                      cx={x}
                      cy={y}
                      r={s.glow ? 3.5 : 2.5}
                      fill={s.color}
                      style={s.glow ? { filter: 'drop-shadow(0 0 4px #00f5a0)' } : undefined}
                      className="cursor-pointer hover:r-5 transition-all"
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Axis Labels */}
          {axes.map((axis, idx) => {
            const { x, y } = getLabelCoordinates(idx);
            // Text anchor calculation based on position relative to center
            let textAnchor: 'middle' | 'start' | 'end' = 'middle';
            if (x > center + 10) textAnchor = 'start';
            else if (x < center - 10) textAnchor = 'end';

            const isHovered = hoveredAxis === idx;

            return (
              <text
                key={axis}
                x={x}
                y={y + 4}
                textAnchor={textAnchor}
                className={`font-mono text-[9px] font-semibold tracking-wider transition-colors cursor-pointer select-none ${
                  isHovered ? 'fill-[#00f5a0] text-shadow' : 'fill-[#8da396]'
                }`}
                onMouseEnter={() => setHoveredAxis(idx)}
                onMouseLeave={() => setHoveredAxis(null)}
              >
                {axis}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      {legend && series.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-[#1f382b]/60 w-full mt-2 font-mono text-[11px]">
          {series.map((s) => (
            <div key={s.id} className="flex items-center gap-1.5">
              <span
                className="w-3 h-1.5 rounded-full"
                style={{
                  backgroundColor: s.color,
                  boxShadow: s.glow ? `0 0 6px ${s.color}` : undefined
                }}
              />
              <span className={s.glow ? 'text-white font-medium' : 'text-[#8da396]'}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
