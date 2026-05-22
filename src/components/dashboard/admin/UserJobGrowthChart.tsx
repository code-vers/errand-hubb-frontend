import React from "react";
import { GrowthData } from "@/types/dashboard";

interface UserJobGrowthChartProps {
  data: GrowthData[];
  title?: string;
  subtitle?: string;
}

const UserJobGrowthChart: React.FC<UserJobGrowthChartProps> = ({
  data,
  title = "User & Job Growth",
  subtitle = "Last 6 months",
}) => {
  const maxValue = Math.max(...data.map((item) => item.value));
  const yAxisLabels = [1600, 1200, 800, 400, 0];

  const getBarHeight = (value: number): string => {
    return `${(value / maxValue) * 100}%`;
  };

  return (
    <div className='bg-white rounded-xl p-6 shadow-sm border border-border'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-lg font-semibold text-foreground'>{title}</h2>
        <span className='text-sm text-muted'>{subtitle}</span>
      </div>

      <div className='h-48 relative flex items-end space-x-6 pl-8'>
        {/* Y-axis labels */}
        <div className='absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted py-2'>
          {yAxisLabels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>

        {/* Bars */}
        {data.map((item, index) => (
          <div
            key={index}
            className='w-4 bg-primary rounded-t-sm transition-all duration-300 hover:opacity-80'
            style={{ height: getBarHeight(item.value) }}
            title={`${item.month}: ${item.value}`}
          />
        ))}
      </div>

      <div className='flex justify-between pl-8 pr-2 mt-2 text-xs text-muted'>
        {data.map((item, index) => (
          <span key={index}>{item.month}</span>
        ))}
      </div>
    </div>
  );
};

export default UserJobGrowthChart;
