import React, { useState } from 'react';
import { GitBranch, ChevronRight, ChevronLeft, Eye, RefreshCw } from 'lucide-react';
import { soundManager } from '../../utils/sound';

export const CellDivisionVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mitosis' | 'meiosis' | 'gametogenesis'>('mitosis');
  const [mitosisStage, setMitosisStage] = useState<number>(1); // 0: Profase, 1: Metafase, 2: Anafase, 3: Telofase

  const STAGES = [
    {
      name: 'Profase',
      sub: 'Kondensasi & Benang Spindel',
      desc: 'Benang kromatin memendek dan menebal menjadi kromosom ganda. Nukleolus dan membran inti menghilang. Sentriol bergerak ke kutub yang berlawanan dan membentuk benang spindel.',
      schematic: 'Kromosom tersebar bebas di tengah sitoplasma, spindel terbentuk di dua kutub.',
      diagramType: 'prophase',
      badge: 'Tahap Awal',
    },
    {
      name: 'Metafase',
      sub: 'Bidang Pembelahan (Ekuator)',
      desc: 'Kromosom berjajar rapi dalam satu baris lurus di pelat ekuator sel (bidang metafase). Sentromer melekat pada benang kinetokor gelendong. Ini adalah waktu terbaik mengamati jumlah dan bentuk kromosom (kariotipe)!',
      schematic: 'Kromosom berjejer di garis tengah vertikal (bidang ekuator).',
      diagramType: 'metaphase',
      badge: 'Analisis Kariotipe',
    },
    {
      name: 'Anafase',
      sub: 'Pemisahan Kromatid Saudara',
      desc: 'Sentromer membelah menjadi dua. Kromatid saudara memisah dan ditarik oleh pemendekan benang spindel menuju dua kutub yang berlawanan. Pada anafase terbentuk kromosom anak independen.',
      schematic: 'Dua kelompok kromatid ditarik menjauh ke arah kutub atas dan kutub bawah.',
      diagramType: 'anaphase',
      badge: 'Pemisahan Kromatid',
    },
    {
      name: 'Telofase & Sitokinesis',
      sub: 'Rekonstitusi Inti & Pembelahan Sel',
      desc: 'Kromosom telah sampai di kutub masing-masing dan mulai mengendur kembali menjadi kromatin halus. Membran inti dan nukleolus terbentuk kembali. Terjadi pelekukan membran (invaginasi) sitokinesis menghasilkan 2 sel anakan diploid (2n) identik.',
      schematic: 'Terbentuk dua sel anakan terpisah dengan membran inti masing-masing.',
      diagramType: 'telophase',
      badge: '2 Sel Anak Identik',
    },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-5 my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
            Cellular Reproduction & Karyology
          </span>
          <h3 className="text-lg font-bold text-white">Visualisator Pembelahan Sel & Gametogenesis</h3>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 border border-slate-800 rounded-lg">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('mitosis');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'mitosis' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tahapan Mitosis
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('meiosis');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'meiosis' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Meiosis (Pindah Silang)
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('gametogenesis');
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'gametogenesis' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sperma vs Ovum
          </button>
        </div>
      </div>

      {activeTab === 'mitosis' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Schematic SVG Stage Render */}
          <div className="lg:col-span-6 p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-3">
              <span className="font-mono">Fase {mitosisStage + 1} dari 4</span>
              <span className="text-cyan-400 font-semibold">{STAGES[mitosisStage].badge}</span>
            </div>

            {/* SVG Visual of Cell */}
            <div className="w-64 h-64 relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Cell Membrane */}
                {mitosisStage === 3 ? (
                  /* Telophase pinch / cleavage furrow */
                  <path
                    d="M 60 40 C 90 60, 90 140, 60 160 C 20 150, 20 50, 60 40 M 140 40 C 110 60, 110 140, 140 160 C 180 150, 180 50, 140 40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />
                ) : (
                  <ellipse cx="100" cy="100" rx="85" ry="85" fill="#0f172a" stroke="#06b6d4" strokeWidth="2.5" />
                )}

                {/* Spindle Fibers & Centrosomes */}
                {mitosisStage === 0 && (
                  <>
                    <circle cx="45" cy="50" r="5" fill="#f59e0b" />
                    <circle cx="155" cy="150" r="5" fill="#f59e0b" />
                    {/* Chromosomes dispersed */}
                    <g transform="translate(85, 75) rotate(20)">
                      <line x1="-12" y1="-12" x2="12" y2="12" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
                      <line x1="12" y1="-12" x2="-12" y2="12" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
                    </g>
                    <g transform="translate(115, 115) rotate(-30)">
                      <line x1="-12" y1="-12" x2="12" y2="12" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
                      <line x1="12" y1="-12" x2="-12" y2="12" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
                    </g>
                  </>
                )}

                {mitosisStage === 1 && (
                  <>
                    {/* Metaphase: Spindle poles top and bottom */}
                    <circle cx="100" cy="25" r="4" fill="#f59e0b" />
                    <circle cx="100" cy="175" r="4" fill="#f59e0b" />
                    {/* Spindle lines to center */}
                    <line x1="100" y1="25" x2="60" y2="100" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="100" y1="25" x2="100" y2="100" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="100" y1="25" x2="140" y2="100" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="100" y1="175" x2="60" y2="100" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="100" y1="175" x2="100" y2="100" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="100" y1="175" x2="140" y2="100" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />

                    {/* Chromosomes lined up at equator plane */}
                    <line x1="30" y1="100" x2="170" y2="100" stroke="#475569" strokeWidth="1" strokeDasharray="4 3" />
                    {/* Chromosome 1 */}
                    <g transform="translate(60, 100)">
                      <line x1="-8" y1="-14" x2="8" y2="14" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" />
                      <line x1="8" y1="-14" x2="-8" y2="14" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" />
                    </g>
                    {/* Chromosome 2 */}
                    <g transform="translate(100, 100)">
                      <line x1="-8" y1="-14" x2="8" y2="14" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
                      <line x1="8" y1="-14" x2="-8" y2="14" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
                    </g>
                    {/* Chromosome 3 */}
                    <g transform="translate(140, 100)">
                      <line x1="-8" y1="-14" x2="8" y2="14" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
                      <line x1="8" y1="-14" x2="-8" y2="14" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
                    </g>
                  </>
                )}

                {mitosisStage === 2 && (
                  <>
                    {/* Anaphase: Chromatids separating */}
                    <circle cx="100" cy="20" r="4" fill="#f59e0b" />
                    <circle cx="100" cy="180" r="4" fill="#f59e0b" />
                    {/* Top migrating V-shapes */}
                    <path d="M 60 70 L 68 55 L 76 70" fill="none" stroke="#ec4899" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M 92 70 L 100 55 L 108 70" fill="none" stroke="#a855f7" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M 124 70 L 132 55 L 140 70" fill="none" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" />
                    {/* Bottom migrating V-shapes */}
                    <path d="M 60 130 L 68 145 L 76 130" fill="none" stroke="#ec4899" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M 92 130 L 100 145 L 108 130" fill="none" stroke="#a855f7" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M 124 130 L 132 145 L 140 130" fill="none" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" />
                  </>
                )}

                {mitosisStage === 3 && (
                  <>
                    {/* Telophase: 2 nuclei forming */}
                    <circle cx="55" cy="100" r="24" fill="#1e293b" stroke="#334155" strokeWidth="1" strokeDasharray="3 2" />
                    <circle cx="145" cy="100" r="24" fill="#1e293b" stroke="#334155" strokeWidth="1" strokeDasharray="3 2" />
                    <text x="55" y="103" fill="#34d399" fontSize="9" textAnchor="middle">2n Diploid</text>
                    <text x="145" y="103" fill="#34d399" fontSize="9" textAnchor="middle">2n Diploid</text>
                  </>
                )}
              </svg>
            </div>

            {/* Stepper buttons */}
            <div className="flex items-center gap-3 mt-4">
              <button
                disabled={mitosisStage === 0}
                onClick={() => {
                  soundManager.playClick();
                  setMitosisStage((p) => Math.max(0, p - 1));
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800"
              >
                <ChevronLeft className="w-3.5 h-3.5 inline mr-1" /> Sebelumnya
              </button>
              <div className="flex items-center gap-1.5">
                {STAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      soundManager.playClick();
                      setMitosisStage(i);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      mitosisStage === i ? 'bg-cyan-400 ring-2 ring-cyan-400/40 w-5' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
              <button
                disabled={mitosisStage === STAGES.length - 1}
                onClick={() => {
                  soundManager.playClick();
                  setMitosisStage((p) => Math.min(STAGES.length - 1, p + 1));
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800"
              >
                Selanjutnya <ChevronRight className="w-3.5 h-3.5 inline ml-1" />
              </button>
            </div>
          </div>

          {/* Stage Details */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 bg-slate-950/60 border border-cyan-500/20 rounded-xl">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                Tahap {mitosisStage + 1}: {STAGES[mitosisStage].sub}
              </span>
              <h4 className="text-xl font-bold text-white mb-2">{STAGES[mitosisStage].name}</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{STAGES[mitosisStage].desc}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                <span className="text-slate-400 block mb-1">Status Ploidi Sel:</span>
                <span className="font-mono text-emerald-400 font-bold text-sm">2n (Diploid)</span>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                <span className="text-slate-400 block mb-1">Tujuan Biologis:</span>
                <span className="text-slate-200 font-medium">Regenerasi & Pertumbuhan Somatis</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'meiosis' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
            <span className="text-xs font-mono text-purple-400 block mb-2 uppercase">Peristiwa Krusial: Pindah Silang (Crossing Over) di Profase I</span>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Profase I Meiosis memiliki 5 sub-tahap yang disingkat <strong className="text-purple-300">LE-ZI-PA-DI-DI</strong> (Leptoten, Zigoten, Pakiten, Diploten, Diakinesis).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="font-bold text-white block mb-1">1. Zigoten</span>
                <p className="text-slate-400">Kromosom homolog berpasangan membentuk bivalen melalui proses sinapsis.</p>
              </div>
              <div className="p-3 bg-slate-900 border border-purple-500/40 rounded-lg bg-purple-950/20">
                <span className="font-bold text-purple-300 block mb-1">2. Pakiten (Krusial)</span>
                <p className="text-slate-300">Kromosom mengganda menjadi tetrad. Terjadi pertukaran segmen gen (pindah silang) di kiasmata!</p>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="font-bold text-white block mb-1">3. Diploten & Diakinesis</span>
                <p className="text-slate-400">Kromosom homolog mulai merenggang, membran inti melebur, benang spindel terbentuk penuh.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'gametogenesis' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950/80 border border-cyan-500/30 rounded-xl">
            <h4 className="text-sm font-bold text-cyan-400 mb-2">Spermatogenesis (Tubulus Seminiferus)</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2 bg-slate-900/60 rounded">Spermatogonium (2n) → Mitosis</div>
              <div className="p-2 bg-slate-900/60 rounded">Spermatosit Primer (2n) → Meiosis I</div>
              <div className="p-2 bg-slate-900/60 rounded">2 Spermatosit Sekunder (n) → Meiosis II</div>
              <div className="p-2 bg-slate-900/60 rounded">4 Spermatid (n) → Differensiasi</div>
              <div className="p-2.5 bg-cyan-950/40 border border-cyan-500/30 rounded text-cyan-300 font-bold">
                Hasil: 4 Spermatozoa Fungsional (Haploid, n)
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 border border-rose-500/30 rounded-xl">
            <h4 className="text-sm font-bold text-rose-400 mb-2">Oogenesis (Ovarium Wanita)</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2 bg-slate-900/60 rounded">Oogonium (2n) → Mitosis</div>
              <div className="p-2 bg-slate-900/60 rounded">Oosit Primer (2n) → Meiosis I (Asimetris)</div>
              <div className="p-2 bg-slate-900/60 rounded">1 Oosit Sekunder (n) + 1 Polosit Primer (n)</div>
              <div className="p-2 bg-slate-900/60 rounded">1 Ootid (n) + 3 Polosit (Badan Polar terdegenerasi)</div>
              <div className="p-2.5 bg-rose-950/40 border border-rose-500/30 rounded text-rose-300 font-bold">
                Hasil: HANYA 1 Sel Telur (Ovum) Matang & 3 Badan Polar Mati
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
