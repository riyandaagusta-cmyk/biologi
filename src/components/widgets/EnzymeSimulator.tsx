import React, { useState } from 'react';
import { Activity, ShieldAlert, Sparkles, Sliders } from 'lucide-react';
import { soundManager } from '../../utils/sound';

export const EnzymeSimulator: React.FC = () => {
  const [substrateConc, setSubstrateConc] = useState<number>(40);
  const [inhibitorType, setInhibitorType] = useState<'none' | 'competitive' | 'noncompetitive'>('none');
  const [temperature, setTemperature] = useState<number>(37); // Celsius
  const [pH, setPH] = useState<number>(7.0);
  const [theoryModel, setTheoryModel] = useState<'lock_key' | 'induced_fit'>('induced_fit');

  // Compute Vmax & Km based on inhibitor
  // Competitive: Vmax stays same, Km increases (needs more substrate)
  // Noncompetitive: Vmax drops, Km stays same
  const baseVmax = 100;
  const baseKm = 20;

  let currentVmax = baseVmax;
  let currentKm = baseKm;

  if (inhibitorType === 'competitive') {
    currentKm = baseKm * 3.2; // Apparent Km increases
  } else if (inhibitorType === 'noncompetitive') {
    currentVmax = baseVmax * 0.42; // Vmax decreases
  }

  // Temp factor: peaks at 37-40C, denatures above 55C
  const tempFactor = temperature > 60 ? 0 : Math.max(0, 1 - Math.pow(temperature - 38, 2) / 350);
  // pH factor: optimal at pH 7 for this enzyme model
  const phFactor = Math.max(0, 1 - Math.pow(pH - 7.0, 2) / 10);

  // Michaelis-Menten Velocity: V = (Vmax * [S]) / (Km + [S])
  const velocity = Math.round(
    ((currentVmax * substrateConc) / (currentKm + substrateConc)) * tempFactor * phFactor
  );

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-5 my-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
            Enzyme Kinetics & Molecular Simulation
          </span>
          <h3 className="text-lg font-bold text-white">Simulator Kinetika Enzim & Karakteristik Inhibitor</h3>
        </div>
        <div className="flex items-center gap-2 p-1 bg-slate-950/80 border border-slate-800 rounded-lg">
          <button
            onClick={() => {
              soundManager.playClick();
              setTheoryModel('induced_fit');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              theoryModel === 'induced_fit' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Induced Fit (Koshland)
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setTheoryModel('lock_key');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              theoryModel === 'lock_key' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Lock & Key (Fischer)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Molecule Canvas & Curve */}
        <div className="lg:col-span-7 space-y-4">
          {/* Reaction Rate Curve (SVG Michaelis-Menten) */}
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-mono text-slate-400">Kurva Kinetika Michaelis-Menten</span>
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <span className="text-emerald-400">● Tanpa Inhibitor</span>
                {inhibitorType !== 'none' && (
                  <span className={inhibitorType === 'competitive' ? 'text-amber-400' : 'text-rose-400'}>
                    ▲ {inhibitorType === 'competitive' ? 'Inhibitor Kompetitif' : 'Inhibitor Nonkompetitif'}
                  </span>
                )}
              </div>
            </div>

            {/* SVG Graph */}
            <div className="relative h-44 w-full">
              <svg className="w-full h-full" viewBox="0 0 320 160">
                {/* Axes */}
                <line x1="30" y1="130" x2="310" y2="130" stroke="#334155" strokeWidth="1.5" />
                <line x1="30" y1="15" x2="30" y2="130" stroke="#334155" strokeWidth="1.5" />
                
                {/* Axis Labels */}
                <text x="310" y="145" fill="#64748b" fontSize="9" textAnchor="end">[S] Konsentrasi Substrat</text>
                <text x="25" y="12" fill="#64748b" fontSize="9" textAnchor="start">Kecepatan Reaksi (V)</text>

                {/* Theoretical Base Curve (without inhibitor) */}
                <path
                  d="M 30 130 Q 70 50, 160 38 T 310 32"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  opacity={inhibitorType !== 'none' ? 0.4 : 0.9}
                />

                {/* Active Dynamic Curve */}
                {inhibitorType === 'none' ? (
                  <path
                    d="M 30 130 Q 70 50, 160 38 T 310 32"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />
                ) : inhibitorType === 'competitive' ? (
                  /* Competitive: Reaches same Vmax eventually, but slower curve */
                  <path
                    d="M 30 130 Q 120 110, 210 65 T 310 35"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                  />
                ) : (
                  /* Noncompetitive: Plateaus lower (Vmax reduced) */
                  <path
                    d="M 30 130 Q 80 95, 170 85 T 310 82"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="3"
                  />
                )}

                {/* Current Operating Point */}
                <circle
                  cx={30 + (substrateConc / 100) * 270}
                  cy={130 - (velocity / 100) * 110}
                  r="6"
                  className="fill-cyan-400 stroke-slate-900"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Readout stats */}
            <div className="grid grid-cols-3 gap-2 mt-2 text-center pt-2 border-t border-slate-900">
              <div className="p-1.5 bg-slate-900/60 rounded">
                <span className="text-[10px] text-slate-400 block">Laju Aktual (V)</span>
                <span className="text-base font-mono font-bold text-cyan-400">{velocity} μmol/s</span>
              </div>
              <div className="p-1.5 bg-slate-900/60 rounded">
                <span className="text-[10px] text-slate-400 block">Vmax Terlihat</span>
                <span className="text-base font-mono font-bold text-emerald-400">{Math.round(currentVmax * tempFactor * phFactor)}</span>
              </div>
              <div className="p-1.5 bg-slate-900/60 rounded">
                <span className="text-[10px] text-slate-400 block">Afinitas (Km)</span>
                <span className="text-base font-mono font-bold text-purple-400">{Math.round(currentKm)} mM</span>
              </div>
            </div>
          </div>

          {/* Molecular Active Site Diagram */}
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-white block mb-0.5">
                Model Kerja: {theoryModel === 'induced_fit' ? 'Ketepatan Induksi (Induced Fit)' : 'Kunci & Gembok (Lock & Key)'}
              </span>
              <p className="text-slate-400 text-[11px]">
                {theoryModel === 'induced_fit'
                  ? 'Sisi aktif enzim bersifat lentur (fleksibel) dan menyesuaikan konformasi saat substrat mendekat.'
                  : 'Sisi aktif enzim berbentuk rigid (kaku) seperti lubang gembok yang presisi dengan anak kuncinya.'}
              </p>
            </div>
            <div className="text-2xl select-none pl-3 border-l border-slate-800">
              {theoryModel === 'induced_fit' ? '🧩 ⇄ 🔬' : '🔒 ⇄ 🔑'}
            </div>
          </div>
        </div>

        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-800">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-semibold text-slate-200">Kontrol Variabel Enzimatik</h4>
          </div>

          {/* Inhibitor Selector */}
          <div>
            <span className="text-xs text-slate-300 block mb-1.5">Tipe Inhibitor:</span>
            <div className="space-y-1.5">
              {[
                { id: 'none', label: 'Tanpa Inhibitor (Normal)', desc: 'Laju reaksi maksimal sesuai kinetika baku.' },
                { id: 'competitive', label: 'Inhibitor Kompetitif', desc: 'Bersaing di sisi aktif. Dapat diatasi dengan menambah substrat!' },
                { id: 'noncompetitive', label: 'Inhibitor Nonkompetitif', desc: 'Menempel di sisi alosterik. Vmax turun permanen!' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    soundManager.playClick();
                    setInhibitorType(opt.id as 'none' | 'competitive' | 'noncompetitive');
                  }}
                  className={`w-full text-left p-2 rounded-lg border transition-all text-xs ${
                    inhibitorType === opt.id
                      ? 'border-cyan-500 bg-cyan-950/30 text-white ring-1 ring-cyan-500/50'
                      : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  <div className="font-semibold text-slate-200">{opt.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Substrate Concentration */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Konsentrasi Substrat [S]</span>
              <span className="font-mono text-cyan-400 font-semibold">{substrateConc} mM</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={substrateConc}
              onChange={(e) => setSubstrateConc(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            {inhibitorType === 'competitive' && substrateConc > 80 && (
              <span className="text-[10px] text-emerald-400 block mt-1 font-mono">
                ✓ Substrat berlebih berhasil mengatasi inhibitor kompetitif!
              </span>
            )}
          </div>

          {/* Temperature */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Suhu Reaksi</span>
              <span className="font-mono text-amber-400 font-semibold">{temperature}°C</span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            {temperature > 55 && (
              <span className="text-[10px] text-rose-400 block mt-1 font-semibold">
                ⚠️ PERINGATAN: Denaturasi Termal! Apoenzim rusak permanen di atas 55°C.
              </span>
            )}
          </div>

          {/* pH */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">pH Lingkungan (Asam - Netral - Basa)</span>
              <span className="font-mono text-purple-400 font-semibold">pH {pH.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="14"
              step="0.5"
              value={pH}
              onChange={(e) => setPH(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
