
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: string;
  trendUp?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color, trend, trendUp }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-white shadow-md`}>
          <i className={`fa-solid ${icon} text-lg`}></i>
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      </div>
    </div>
  );
};

export default DashboardCard;
