import React from "react";
import { WeeklyActivity } from "@/types/dashboard";

interface WeeklyErrandActivityProps {
  data: WeeklyActivity[];
  title?: string;
  subtitle?: string;
}

const WeeklyErrandActivity: React.FC<WeeklyErrandActivityProps> = ({
  data,
  title = "Weekly Errand Activity",
  subtitle = "This week",
}) => {
  const yAxisLabels = [320, 240, 160, 80, 0];

  const maxValue = Math.max(...data.map((item) => item.value));
  const minValue = Math.min(...data.map((item) => item.value));

  const generateSmoothPath = (): string => {
    if (data.length === 0) return "";

    const width = 100;
    const height = 100;
    const padding = 5;
    const usableHeight = height - 2 * padding;

    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * width;
      const normalizedValue =
        maxValue === minValue
          ? 0.5
          : (item.value - minValue) / (maxValue - minValue);
      const y = height - padding - (normalizedValue * usableHeight + padding);
      return `${x},${y}`;
    });

    return points.join(" ");
  };

  return (
    <div className='bg-white rounded-xl p-6 shadow-sm border border-border'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-lg font-semibold text-foreground'>{title}</h2>
        <span className='text-sm text-muted'>{subtitle}</span>
      </div>

      <div className='h-48 relative pl-8 pt-2'>
        {/* Y-axis labels */}
        <div className='absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted py-2'>
          {yAxisLabels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>

        {/* Line Chart SVG */}
        <svg
          className='w-full h-full overflow-visible'
          preserveAspectRatio='none'
          viewBox='0 0 100 100'>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y, index) => (
            <line
              key={index}
              x1='0'
              y1={y}
              x2='100'
              y2={y}
              stroke='#e5e7eb'
              strokeWidth='0.5'
              strokeDasharray='2,2'
            />
          ))}

          {/* Line path */}
          <polyline
            fill='none'
            points={generateSmoothPath()}
            stroke='var(--color-primary)'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          {/* Area under the line */}
          <polygon
            fill='url(#gradient)'
            points={`${generateSmoothPath()} 100,100 100,0 0,0`}
            opacity='0.1'
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
              <stop
                offset='0%'
                stopColor='var(--color-primary)'
                stopOpacity='0.3'
              />
              <stop
                offset='100%'
                stopColor='var(--color-primary)'
                stopOpacity='0'
              />
            </linearGradient>
          </defs>

          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const normalizedValue =
              maxValue === minValue
                ? 0.5
                : (item.value - minValue) / (maxValue - minValue);
            const y = 95 - (normalizedValue * 90 + 5);

            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r='2.5'
                  fill='var(--color-primary)'
                  className='hover:r-3 transition-all duration-200'
                />
                <title>{`${item.day}: ${item.value}`}</title>
              </g>
            );
          })}
        </svg>
      </div>

      <div className='flex justify-between pl-8 pr-2 mt-2 text-xs text-muted'>
        {data.map((item, index) => (
          <span key={index}>{item.day}</span>
        ))}
      </div>
    </div>
  );
};

export default WeeklyErrandActivity;
