
import React, { useState, useEffect } from 'react';
import { Transaction, Category } from '../types.ts';
import { getFinancialHealthSummary } from '../services/geminiService.ts';
import { getAll, saveItem, deleteItem, STORES } from '../services/dbService.ts';

const Accounts: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [aiSummary, setAiSummary] = useState<string>('Analyzing...');
  const [loadingAi, setLoadingAi] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [showTransModal, setShowTransModal] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const [transForm, setTransForm] = useState<Partial<Transaction>>({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 0,
    type: 'expense',
    category: 'General'
  });

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [storedTrans, storedCats] = await Promise.all([
        getAll<Transaction>(STORES.TRANSACTIONS),
        getAll<Category>(STORES.CATEGORIES)
      ]);
      setCategories(storedCats);
      setTransactions(storedTrans);
    } catch (err) {
      console.error("DB Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      const fetchSummary = async () => {
        setLoadingAi(true);
        const summary = await getFinancialHealthSummary(transactions);
        setAiSummary(summary);
        setLoadingAi(false);
      };
      fetchSummary();
    }
  }, [transactions.length]);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Accounts Ledger</h2>
        <div className="flex w-full sm:w-auto gap-2">
          <button onClick={() => setShowCatModal(true)} className="flex-1 sm:flex-none bg-white border border-slate-200 px-4 py-2 rounded-lg font-medium text-sm">
            Categories
          </button>
          <button onClick={() => setShowTransModal(true)} className="flex-1 sm:flex-none bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-md">
            + Transaction
          </button>
        </div>
      </div>

      <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1">
            <p className="text-indigo-200 uppercase text-[10px] font-bold mb-1">Total Net Balance</p>
            <h3 className="text-3xl font-bold">
              ${(transactions.filter(t => t.type === 'income').reduce((s,t) => s + t.amount, 0) - 
                 transactions.filter(t => t.type === 'expense').reduce((s,t) => s + t.amount, 0)).toLocaleString()}
            </h3>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-white/10 md:w-1/3">
             <p className="text-[10px] font-bold text-indigo-200 mb-1">AI INSIGHT</p>
             <p className="text-xs italic text-indigo-50 leading-relaxed">{aiSummary}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 text-sm">
                <td className="px-6 py-4 text-slate-500">{t.date}</td>
                <td className="px-6 py-4 font-medium">{t.description}</td>
                <td className={`px-6 py-4 font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>{t.type.toUpperCase()}</td>
                <td className="px-6 py-4 text-right font-bold">${t.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accounts;
