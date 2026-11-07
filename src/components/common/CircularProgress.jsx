import React from 'react';

export default function CircularProgress({ value = 0, size = 56, strokeWidth = 5, showText = true }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  let strokeColor = '#10b981'; // emerald
  if (value < 50) strokeColor = '#f43f5e'; // rose
  else if (value < 70) strokeColor = '#f59e0b'; // amber
  else if (value < 85) strokeColor = '#6366f1'; // violet

  return (
    <div
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--border-color)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Dynamic Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.3s ease'
          }}
        />
      </svg>
      {showText && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span
            style={{
              fontSize: size <= 48 ? '0.72rem' : '0.875rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1
            }}
          >
            {value}%
          </span>
          {size > 54 && (
            <span style={{ fontSize: '0.55rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Match
            </span>
          )}
        </div>
      )}
    </div>
  );
}
