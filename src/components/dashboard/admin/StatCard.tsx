import React from "react";
import { StatCardData } from "@/types/dashboard";
import {
  Users,
  Briefcase,
  TrendingUp,
  Pause,
  FileText,
  CheckCircle,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface StatCardProps {
  data: StatCardData;
}

const StatCard: React.FC<StatCardProps> = ({ data }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "users":
        return Users;
      case "briefcase":
        return Briefcase;
      case "trending-up":
        return TrendingUp;
      case "pause":
        return Pause;
      case "file-lines":
        return FileText;
      case "circle-check":
        return CheckCircle;
      default:
        return BarChart3;
    }
  };

  const Icon = getIcon(data.icon);

  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-US");
  };

  const getTrendColor = (direction: "up" | "down"): string => {
    return direction === "up" ? "text-green-600" : "text-red-600";
  };

  const TrendIcon =
    data.trend.direction === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <div className='bg-white rounded-xl p-5 shadow-sm border border-border flex flex-col justify-between '>
      <div
        className={`w-16 h-16 py-8 rounded-lg ${data.iconBgColor} flex items-center justify-center ${data.iconColor} mb-2`}>
        <Icon size={28} />
      </div>
      <div>
        <p className='text-xs  text-text-secondary my-1'>{data.label}</p>
        <p className={`text-[18px] font-bold ${data.valueColor}`}>
          {formatNumber(data.value)}
        </p>
      </div>
      <p
        className={`text-xs mt-1 ${getTrendColor(data.trend.direction)} font-medium flex items-center`}>
        <TrendIcon size={14} className='mr-1' />
        {data.trend.direction === "up" ? "+" : "-"}
        {data.trend.percentage}%
        <span className='text-muted  font-normal ml-1'>
          {data.trend.comparisonText}
        </span>
      </p>
    </div>
  );
};

export default StatCard;
