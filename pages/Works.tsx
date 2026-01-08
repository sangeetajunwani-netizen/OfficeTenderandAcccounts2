
import React, { useState, useMemo, useEffect } from 'react';
import { Tender, TenderStatus, FundSource } from '../types.ts';
import { getTenderInsight } from '../services/geminiService.ts';
import { getAll, saveItem, deleteItem, STORES } from '../services/dbService.ts';

const Works: React.FC = () => {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const stored = await getAll<Tender>(STORES.TENDERS);
      setTenders(stored || []);
    } catch (err) { console.error(err); } finally { setIsLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  if (isLoading) return <div className="p-12 text-center text-slate-400">Loading Tenders...</div>;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
       <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Works Registry</h2>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md">+ Add Tender</button>
       </div>

       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold">
                <th className="px-6 py-4">Scheme Info</th>
                <th className="px-6 py-4">Fund Source</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tenders.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 text-sm">{t.schemeName}</p>
                    <p className="text-[10px] text-slate-400">Code: {t.schemeCode}</p>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-indigo-600">{t.fundName}</td>
                  <td className="px-6 py-4"><span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold">{t.status}</span></td>
                  <td className="px-6 py-4 text-sm font-bold">${t.tenderAmount.toLocaleString()}</td>
                </tr>
              ))}
              {tenders.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-20 text-center text-slate-400">No records found.</td></tr>
              )}
            </tbody>
          </table>
       </div>
    </div>
  );
};

export default Works;
