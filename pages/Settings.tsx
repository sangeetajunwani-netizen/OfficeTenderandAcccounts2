
import React, { useState } from 'react';
import { exportData, importData } from '../services/dbService';

const Settings: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [activeInstruction, setActiveInstruction] = useState<'exe' | 'apk' | 'pwa' | null>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setMsg(null);
    try {
      await importData(file);
      setMsg({ type: 'success', text: 'Database restored successfully! Please refresh to see changes.' });
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to restore database. Invalid file format.' });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-20">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-database text-xl"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Database & Backups</h2>
            <p className="text-slate-500 text-sm">Manage your local data storage and security exports.</p>
          </div>
        </div>

        {msg && (
          <div className={`p-4 mb-6 rounded-xl border ${msg.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'} flex items-center gap-3`}>
            <i className={`fa-solid ${msg.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
            <span className="text-sm font-medium">{msg.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 space-y-4">
            <h3 className="font-bold text-slate-800">Export Backup</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Download a full snapshot of your current database including all tenders, accounts, and history.
            </p>
            <button 
              onClick={exportData}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-file-export"></i>
              Export Current DB
            </button>
          </div>

          <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 space-y-4">
            <h3 className="font-bold text-slate-800">Restore Database</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Upload a backup file. <span className="text-red-500 font-bold">Warning:</span> Overwrites current data.
            </p>
            <label className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer relative">
              {isImporting ? (
                <i className="fa-solid fa-circle-notch fa-spin"></i>
              ) : (
                <>
                  <i className="fa-solid fa-file-import"></i>
                  Import & Restore
                </>
              )}
              <input 
                type="file" 
                accept=".json" 
                className="hidden" 
                onChange={handleImport}
                disabled={isImporting}
              />
            </label>
          </div>
        </div>
      </div>

      {/* App Packaging Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-laptop-code text-xl"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Installation Center</h2>
            <p className="text-slate-500 text-sm">Deploy Nexus as a native application on any device.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveInstruction(activeInstruction === 'pwa' ? null : 'pwa')}
            className={`p-4 rounded-xl border text-left transition-all ${activeInstruction === 'pwa' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:bg-slate-50'}`}
          >
            <i className="fa-brands fa-chrome text-2xl text-orange-500 mb-2"></i>
            <h4 className="font-bold text-slate-800">Android (Chrome)</h4>
            <p className="text-[10px] text-slate-500 uppercase font-bold">Recommended</p>
          </button>

          <button 
            onClick={() => setActiveInstruction(activeInstruction === 'exe' ? null : 'exe')}
            className={`p-4 rounded-xl border text-left transition-all ${activeInstruction === 'exe' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:bg-slate-50'}`}
          >
            <i className="fa-brands fa-windows text-2xl text-blue-500 mb-2"></i>
            <h4 className="font-bold text-slate-800">Windows (.exe)</h4>
            <p className="text-[10px] text-slate-500 uppercase font-bold">Desktop Native</p>
          </button>
          
          <button 
            onClick={() => setActiveInstruction(activeInstruction === 'apk' ? null : 'apk')}
            className={`p-4 rounded-xl border text-left transition-all ${activeInstruction === 'apk' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-100 hover:bg-slate-50'}`}
          >
            <i className="fa-brands fa-android text-2xl text-emerald-500 mb-2"></i>
            <h4 className="font-bold text-slate-800">Android (.apk)</h4>
            <p className="text-[10px] text-slate-500 uppercase font-bold">Developer Build</p>
          </button>
        </div>

        {activeInstruction === 'pwa' && (
          <div className="mt-6 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-4 animate-fadeIn">
            <h4 className="font-bold text-indigo-900">Chrome Android Installation Steps:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 flex flex-col items-center text-center">
                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mb-3">1</span>
                <p className="text-xs text-slate-700 font-medium">Tap the <b>three dots</b> ⋮ in Chrome's top right corner.</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 flex flex-col items-center text-center">
                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mb-3">2</span>
                <p className="text-xs text-slate-700 font-medium">Select <b>"Install app"</b> or <b>"Add to Home screen"</b>.</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 flex flex-col items-center text-center">
                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mb-3">3</span>
                <p className="text-xs text-slate-700 font-medium">Click <b>"Install"</b> in the popup. It's now on your phone!</p>
              </div>
            </div>
          </div>
        )}

        {activeInstruction === 'exe' && (
          <div className="mt-6 p-6 bg-slate-900 rounded-xl text-slate-300 font-mono text-xs overflow-x-auto space-y-4 animate-fadeIn">
            <p className="text-indigo-400 font-bold">// Windows Build Instructions (Electron)</p>
            <p>1. Install Electron: <span className="text-white">npm install --save-dev electron</span></p>
            <p>2. Create <span className="text-white">main.js</span> with loadFile('index.html')</p>
            <p>3. Add build script to package.json: <span className="text-emerald-400">"build:exe": "electron-builder"</span></p>
            <p>4. Run build command to generate the .exe installer.</p>
          </div>
        )}

        {activeInstruction === 'apk' && (
          <div className="mt-6 p-6 bg-slate-900 rounded-xl text-slate-300 font-mono text-xs overflow-x-auto space-y-4 animate-fadeIn">
            <p className="text-emerald-400 font-bold">// Android Build Instructions (Capacitor)</p>
            <p>1. Install Capacitor: <span className="text-white">npm install @capacitor/core @capacitor/cli</span></p>
            <p>2. Initialize: <span className="text-white">npx cap init</span></p>
            <p>3. Add Android platform: <span className="text-white">npx cap add android</span></p>
            <p>4. Open in Android Studio: <span className="text-white">npx cap open android</span></p>
            <p>5. Build -> Build Bundle/APK -> Build APK.</p>
          </div>
        )}
      </div>

      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex gap-4">
        <div className="text-amber-500">
          <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-amber-900 text-sm">Security & Storage Note</h4>
          <p className="text-xs text-amber-800 leading-relaxed">
            This app uses **IndexedDB**. Data is specific to this browser/device. 
            Backup daily to ensure your records are safe across devices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
