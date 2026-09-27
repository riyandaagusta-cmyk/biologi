import React, { useState, useEffect } from 'react';
import { Sun, Beaker, Thermometer, Play, Pause, RotateCcw, Flame } from 'lucide-react';
import { soundManager } from '../../utils/sound';

export const IngenhouszSimulator: React.FC = () => {
  const [lightIntensity, setLightIntensity] = useState<number>(75);
  const [nahco3, setNahco3] = useState<number>(20); // g/L
  const [temperature, setTemperature] = useState<number>(28); // Celsius
  const [lightFilter, setLightFilter] = useState<'white' | 'red' | 'blue' | 'green'>('white');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [accumulatedO2, setAccumulatedO2] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'ingenhousz' | 'aerob_atp'>('ingenhousz');

  // Calculate bubble rate based on biological factors
  // Optimal temp ~ 30C, green light has lowest absorption, red & blue highest
  const filterMultiplier = lightFilter === 'white' ? 1.0 : lightFilter === 'green' ? 0.2 : 1.25;
  const tempFactor = Math.max(0, 1 - Math.pow(temperature - 30, 2) / 400); // peak at 30C, denatures > 45C
  const ratePerMin = Math.round(
    isRunning ? (lightIntensity / 100) * (0.3 + (nahco3 / 50) * 0.7) * filterMultiplier * tempFactor * 45 : 0
  );

  useEffect(() => {
    if (!isRunning || ratePerMin === 0) return;
    const interval = setInterval(() => {
      setAccumulatedO2((prev) => +(prev + (ratePerMin / 60) * 0.05).toFixed(2));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, ratePerMin]);

  const resetSim = () => {
    soundManager.playClick();
    setAccumulatedO2(0);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-5 my-6">
      {/* Mode Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
            Virtual Bio-Lab Simulation
          </span>
          <h3 className="text-lg font-bold text-white">
            {viewMode === 'ingenhousz' ? 'Percobaan Ingenhousz (Hydrilla verticillata)' : 'Kalkulator Energi Respirasi Aerob (ATP)'}
          </h3>
        </div>
        <div className="flex items-center gap-2 p-1 bg-slate-950/80 border border-slate-800 rounded-lg">
          <button
            onClick={() => {
              soundManager.playClick();
              setViewMode('ingenhousz');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'ingenhousz' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Percobaan Ingenhousz
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setViewMode('aerob_atp');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'aerob_atp' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Siklus ATP Aerob
          </button>
        </div>
      </div>

      {viewMode === 'ingenhousz' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Visual Tank & Inverted Tube */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-950/70 border border-slate-800 rounded-xl relative overflow-hidden min-h-[340px]">
            {/* Ambient Light tint */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                backgroundColor:
                  lightFilter === 'red'
                    ? 'rgba(239, 68, 68, 0.15)'
                    : lightFilter === 'blue'
                    ? 'rgba(59, 130, 246, 0.15)'
                    : lightFilter === 'green'
                    ? 'rgba(34, 197, 94, 0.15)'
                    : 'rgba(255, 255, 255, 0.08)',
                opacity: lightIntensity / 100,
              }}
            />

            {/* Test Tube Assembly Schematic */}
            <div className="relative w-48 h-64 flex flex-col items-center">
              {/* Beaker Outline */}
              <div className="absolute inset-x-2 bottom-0 h-52 border-2 border-cyan-500/40 rounded-b-2xl bg-cyan-950/20">
                {/* Water Level */}
                <div className="absolute inset-x-0 bottom-0 h-44 bg-cyan-500/10 border-t border-cyan-400/30"></div>
              </div>

              {/* Inverted Funnel & Test Tube */}
              <div className="relative z-10 w-24 h-56 flex flex-col items-center justify-end">
                {/* Inverted test tube (top closed, bottom open) */}
                <div className="w-9 h-36 border-2 border-emerald-400/60 rounded-t-lg bg-emerald-950/40 relative flex flex-col justify-between overflow-hidden">
                  {/* Accumulated Gas Cap */}
                  <div
                    className="w-full bg-emerald-400/20 border-b border-emerald-400/50 flex items-center justify-center transition-all duration-300"
                    style={{ height: `${Math.min(90, 8 + accumulatedO2 * 8)}%` }}
                  >
                    <span className="text-[10px] font-mono text-emerald-300 font-bold">O₂ Gas</span>
                  </div>

                  {/* Rising Bubbles */}
                  {isRunning && ratePerMin > 0 && (
                    <div className="absolute inset-0 pointer-events-none flex justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-200 animate-ping absolute bottom-4 opacity-80" />
                      <div className="w-2 h-2 rounded-full bg-cyan-100 animate-bounce absolute bottom-12 opacity-75" />
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse absolute bottom-20 opacity-90" />
                    </div>
                  )}
                </div>

                {/* Inverted Funnel Dome */}
                <div className="w-20 h-10 border-t-2 border-x-2 border-emerald-400/50 rounded-t-full bg-emerald-950/30 flex items-center justify-center -mt-1">
                  {/* Hydrilla plant sprigs */}
                  <div className="text-emerald-400 text-lg select-none">🌿 🌿</div>
                </div>
              </div>
            </div>

            {/* Live Telemetry Display */}
            <div className="w-full mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="text-[11px] font-mono text-slate-400 block">Laju Gelembung</span>
                <span className="text-lg font-mono font-bold text-emerald-400">{ratePerMin}</span>
                <span className="text-[10px] text-slate-500 ml-1">gelembung/menit</span>
              </div>
              <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="text-[11px] font-mono text-slate-400 block">Volume Gas O₂</span>
                <span className="text-lg font-mono font-bold text-cyan-400">{accumulatedO2}</span>
                <span className="text-[10px] text-slate-500 ml-1">mL terakumulasi</span>
              </div>
            </div>
          </div>

          {/* Interactive Lab Controls */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-sm font-semibold text-slate-200">Parameter Variabel Eksperimen</h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    isRunning ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  }`}
                  title={isRunning ? 'Jeda' : 'Mulai'}
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={resetSim}
                  className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
                  title="Reset Akumulasi O2"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Light Intensity Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Sun className="w-3.5 h-3.5 text-amber-400" /> Intensitas Cahaya (Luks)
                </span>
                <span className="font-mono text-amber-400 font-semibold">{lightIntensity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={lightIntensity}
                onChange={(e) => setLightIntensity(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* NaHCO3 Concentration */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Beaker className="w-3.5 h-3.5 text-cyan-400" /> Konsentrasi NaHCO₃ (Sumber CO₂)
                </span>
                <span className="font-mono text-cyan-400 font-semibold">{nahco3} g/L</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={nahco3}
                onChange={(e) => setNahco3(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* Water Temperature Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Thermometer className="w-3.5 h-3.5 text-rose-400" /> Suhu Air Lingkungan
                </span>
                <span className="font-mono text-rose-400 font-semibold">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>

            {/* Light Spectrum Filter */}
            <div>
              <span className="text-xs text-slate-300 block mb-2">Filter Spektrum Warna Cahaya:</span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'white', label: 'Polikromatik (Putih)', color: 'border-slate-500' },
                  { id: 'red', label: 'Merah (680 nm)', color: 'border-rose-500' },
                  { id: 'blue', label: 'Biru (450 nm)', color: 'border-blue-500' },
                  { id: 'green', label: 'Hijau (550 nm)', color: 'border-emerald-500' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundManager.playClick();
                      setLightFilter(item.id as 'white' | 'red' | 'blue' | 'green');
                    }}
                    className={`py-1.5 px-2 rounded text-[11px] font-medium border text-center transition-all ${
                      lightFilter === item.id
                        ? `${item.color} bg-slate-800 text-white shadow-sm ring-1 ring-emerald-500/50`
                        : 'border-slate-800 text-slate-400 hover:bg-slate-800/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scientific Explanation Box */}
            <div className="p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-lg text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-emerald-400 block mb-1">Analisis Ilmiah ATS:</span>
              Cahaya merah & biru diserap maksimal oleh klorofil a dan b. Cahaya hijau dipantulkan sehingga laju fotosintesis turun drastis! Penambahan NaHCO₃ mempercepat laju karena melepaskan gas CO₂ terlarut sebagai substrat fiksasi Siklus Calvin.
            </div>
          </div>
        </div>
      ) : (
        /* Respirasi Aerob ATP Calculator & Diagram */
        <div className="space-y-4">
          <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
            <span className="text-xs font-mono text-cyan-400 block mb-2 uppercase">Akuntansi Energi 1 Molekul Glukosa (C₆H₁₂O₆)</span>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="text-xs font-bold text-white block">1. Glikolisis</span>
                <span className="text-[11px] text-slate-400 block mt-1">Sitoplasma</span>
                <div className="mt-2 text-xs font-mono text-emerald-400 space-y-0.5">
                  <p>+ 2 ATP (langsung)</p>
                  <p>+ 2 NADH</p>
                </div>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="text-xs font-bold text-white block">2. Dekarboksilasi</span>
                <span className="text-[11px] text-slate-400 block mt-1">Matriks Mitokondria</span>
                <div className="mt-2 text-xs font-mono text-cyan-400 space-y-0.5">
                  <p>+ 2 NADH</p>
                  <p>+ 2 CO₂</p>
                </div>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="text-xs font-bold text-white block">3. Siklus Krebs</span>
                <span className="text-[11px] text-slate-400 block mt-1">Matriks Mitokondria</span>
                <div className="mt-2 text-xs font-mono text-purple-400 space-y-0.5">
                  <p>+ 2 ATP (langsung)</p>
                  <p>+ 6 NADH</p>
                  <p>+ 2 FADH₂ + 4 CO₂</p>
                </div>
              </div>
              <div className="p-3 bg-slate-900 border border-emerald-500/40 rounded-lg bg-emerald-950/20">
                <span className="text-xs font-bold text-emerald-300 block">4. Transpor Elektron</span>
                <span className="text-[11px] text-slate-400 block mt-1">Krista Mitokondria</span>
                <div className="mt-2 text-xs font-mono text-emerald-300 font-bold space-y-0.5">
                  <p>10 NADH → 30/34 ATP</p>
                  <p>2 FADH₂ → 4 ATP</p>
                  <p>Akseptor: O₂ → 6 H₂O</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900/90 border border-slate-800 rounded-lg flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-400 block">Total ATP Bersih per 1 Glukosa:</span>
                <span className="text-xl font-mono font-bold text-emerald-400">36 atau 38 ATP</span>
                <span className="text-xs text-slate-500 ml-2">(Tergantung sistem ulang-alik malat-aspartat / gliserol-fosfat)</span>
              </div>
              <div className="text-xs text-slate-300 bg-slate-950 px-3 py-2 rounded border border-slate-800">
                <Flame className="w-3.5 h-3.5 text-amber-400 inline mr-1" />
                Respirasi Anaerob (Fermentasi) HANYA menghasilkan <strong className="text-amber-400">2 ATP</strong> murni dari glikolisis!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
