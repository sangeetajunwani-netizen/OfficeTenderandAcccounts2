
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import DashboardCard from '../components/DashboardCard.tsx';

const data = [
  { name: 'Jan', income: 4000, expenses: 2400 },
  { name: 'Feb', income: 3000, expenses: 1398 },
  { name: 'Mar', income: 2000, expenses: 9800 },
  { name: 'Apr', income: 2780, expenses: 3908 },
  { name: 'May', income: 1890, expenses: 4800 },
  { name: 'Jun', income: 2390, expenses: 3800 },
];

const fundData = [
  { name: 'XVFC-Tied', amount: 1250000, awarded: 850000, pending: 400000 },
  { name: 'XVFC-Untied', amount: 980000, awarded: 420000, pending: 560000 },
  { name: 'SFC-TIED', amount: 750000, awarded: 300000, pending: 450000 },
  { name: 'SFC-UNTIED', amount: 620000, awarded: 120000, pending: 500000 },
  { name: 'APAS-25-26', amount: 2100000, awarded: 0, pending: 2100000 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Executive Summary</h2>
          <p className="text-slate-500">Welcome back. Here's your financial overview.</p>
        </div>
        <button className="w-full md:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
          <i className="fa-solid fa-download mr-2"></i> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <DashboardCard 
          title="Total Fund" 
          value="$1,240k" 
          icon="fa-vault" 
          color="bg-blue-600"
          trend="8.2%"
          trendUp={true}
        />
        <DashboardCard 
          title="Monthly Exp" 
          value="$84.2k" 
          icon="fa-money-bill-transfer" 
          color="bg-amber-500"
          trend="2.4%"
          trendUp={false}
        />
        <DashboardCard 
          title="Active Tenders" 
          value="14" 
          icon="fa-file-signature" 
          color="bg-indigo-600"
        />
        <DashboardCard 
          title="Awarded" 
          value="$3.2M" 
          icon="fa-handshake" 
          color="bg-emerald-600"
          trend="12.5%"
          trendUp={true}
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Fundwise Status</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {fundData.map((fund) => (
              <div key={fund.name} className="p-4 rounded-xl border border-slate-100 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">{fund.name}</span>
                </div>
                <div className="mb-2">
                  <p className="text-lg font-bold text-slate-800">${(fund.amount / 1000).toFixed(0)}k</p>
                </div>
                <div className="space-y-1">
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${(fund.awarded / fund.amount) * 100}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-500">Awarded</span>
                    <span className="font-bold text-emerald-600">${(fund.awarded / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
