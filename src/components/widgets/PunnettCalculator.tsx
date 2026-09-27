import React, { useState } from 'react';
import { Calculator, Sparkles, Check, RefreshCw } from 'lucide-react';
import { soundManager } from '../../utils/sound';

export const PunnettCalculator: React.FC = () => {
  const [parent1, setParent1] = useState<string>('AaBb');
  const [parent2, setParent2] = useState<string>('AaBb');
  const [selectedTraitType, setSelectedTraitType] = useState<'monohibrid' | 'dihibrid'>('dihibrid');

  // Gamete calculation logic for AaBb
  const getHeterozygousCount = (genotype: string) => {
    let count = 0;
    const clean = genotype.trim();
    // Check pairs like Aa, Bb, Cc
    if (clean.length === 2) {
      if (clean[0].toUpperCase() === clean[1].toUpperCase() && clean[0] !== clean[1]) count++;
    } else if (clean.length === 4) {
      const p1 = clean.slice(0, 2);
      const p2 = clean.slice(2, 4);
      if (p1[0].toUpperCase() === p1[1].toUpperCase() && p1[0] !== p1[1]) count++;
      if (p2[0].toUpperCase() === p2[1].toUpperCase() && p2[0] !== p2[1]) count++;
    }
    return count;
  };

  const getGametes = (genotype: string): string[] => {
    const clean = genotype.trim();
    if (clean.length === 2) {
      // Monohybrid
      return clean[0] === clean[1] ? [clean[0]] : [clean[0], clean[1]];
    }
    if (clean.length === 4) {
      // Dihybrid: A/a + B/b
      const aLocus = clean[0] === clean[1] ? [clean[0]] : [clean[0], clean[1]];
      const bLocus = clean[2] === clean[3] ? [clean[2]] : [clean[2], clean[3]];
      const gametes: string[] = [];
      aLocus.forEach((a) => {
        bLocus.forEach((b) => {
          gametes.push(`${a}${b}`);
        });
      });
      return gametes;
    }
    return ['A'];
  };

  const gametes1 = getGametes(parent1);
  const gametes2 = getGametes(parent2);

  const n1 = getHeterozygousCount(parent1);
  const n2 = getHeterozygousCount(parent2);

  // Combine gametes into 4x4 or 2x2 grid
  const combineGametes = (g1: string, g2: string) => {
    if (g1.length === 1 && g2.length === 1) {
      // Monohybrid: e.g. A + a -> Aa (keep upper case first)
      const sorted = [g1, g2].sort();
      return sorted[0] === sorted[0].toUpperCase() ? `${sorted[0]}${sorted[1]}` : `${sorted[1]}${sorted[0]}`;
    }
    // Dihybrid: AB + ab -> AaBb
    const a1 = g1[0];
    const b1 = g1[1];
    const a2 = g2[0];
    const b2 = g2[1];
    const aPair = [a1, a2].sort((x, y) => (x < y ? -1 : 1)).join('');
    const bPair = [b1, b2].sort((x, y) => (x < y ? -1 : 1)).join('');
    return `${aPair}${bPair}`;
  };

  const getPhenotypeDihybrid = (zygote: string) => {
    // A_B_: Bulat Kuning (9)
    // A_bb: Bulat Hijau (3)
    // aaB_: Kerut Kuning (3)
    // aabb: Kerut Hijau (1)
    const hasA = zygote.includes('A');
    const hasB = zygote.includes('B');
    if (hasA && hasB) return { name: 'Bulat Kuning', color: 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' };
    if (hasA && !hasB) return { name: 'Bulat Hijau', color: 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300' };
    if (!hasA && hasB) return { name: 'Kerut Kuning', color: 'bg-amber-950/40 border-amber-500/50 text-amber-300' };
    return { name: 'Kerut Hijau', color: 'bg-rose-950/40 border-rose-500/50 text-rose-300' };
  };

  const setPreset = (type: 'monohibrid' | 'dihibrid', p1: string, p2: string) => {
    soundManager.playClick();
    setSelectedTraitType(type);
    setParent1(p1);
    setParent2(p2);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-5 my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
            Classical Genetics Engine
          </span>
          <h3 className="text-lg font-bold text-white">Kalkulator Rumus Gamet (2^n) & Papan Catur Punnett</h3>
        </div>
        {/* Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setPreset('dihibrid', 'AaBb', 'AaBb')}
            className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
              parent1 === 'AaBb' && parent2 === 'AaBb'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Dihibrid F2 (AaBb × AaBb)
          </button>
          <button
            onClick={() => setPreset('monohibrid', 'Aa', 'Aa')}
            className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
              parent1 === 'Aa' && parent2 === 'Aa'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Monohibrid F2 (Aa × Aa)
          </button>
          <button
            onClick={() => setPreset('dihibrid', 'AaBb', 'aabb')}
            className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors ${
              parent1 === 'AaBb' && parent2 === 'aabb'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Uji Silang / Test Cross (AaBb × aabb)
          </button>
        </div>
      </div>

      {/* Gamete Calculation formula (2^n) Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-400">Parental 1 (Induk Betina):</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">{parent1}</span>
          </div>
          <div className="text-xs text-slate-300">
            Heterozigot (n) = <span className="text-emerald-400 font-bold">{n1}</span> → Rumus 2^{n1} ={' '}
            <span className="text-emerald-400 font-bold">{gametes1.length} macam gamet</span>
          </div>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {gametes1.map((g, i) => (
              <span key={i} className="px-2 py-0.5 bg-slate-900 border border-slate-700 text-xs font-mono text-white rounded">
                {g}
              </span>
            ))}
          </div>
        </div>

        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-400">Parental 2 (Induk Jantan):</span>
            <span className="text-xs font-mono text-cyan-400 font-bold">{parent2}</span>
          </div>
          <div className="text-xs text-slate-300">
            Heterozigot (n) = <span className="text-cyan-400 font-bold">{n2}</span> → Rumus 2^{n2} ={' '}
            <span className="text-cyan-400 font-bold">{gametes2.length} macam gamet</span>
          </div>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {gametes2.map((g, i) => (
              <span key={i} className="px-2 py-0.5 bg-slate-900 border border-slate-700 text-xs font-mono text-white rounded">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Punnett Square Table Grid */}
      <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl overflow-x-auto">
        <span className="text-xs font-mono text-slate-400 block mb-3">
          Tabel Persilangan Punnett ({gametes1.length} × {gametes2.length} = {gametes1.length * gametes2.length} Kemungkinan Zigot)
        </span>

        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="p-2 border border-slate-800 bg-slate-900 text-xs font-mono text-slate-500">♀ \ ♂</th>
              {gametes2.map((g2, idx) => (
                <th key={idx} className="p-2 border border-slate-800 bg-slate-900 text-xs font-mono text-cyan-400">
                  {g2}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gametes1.map((g1, rowIdx) => (
              <tr key={rowIdx}>
                <td className="p-2 border border-slate-800 bg-slate-900 text-xs font-mono text-emerald-400 font-bold">
                  {g1}
                </td>
                {gametes2.map((g2, colIdx) => {
                  const zygote = combineGametes(g1, g2);
                  const pheno = getPhenotypeDihybrid(zygote);
                  return (
                    <td key={colIdx} className={`p-2 border border-slate-800 ${pheno.color} transition-all`}>
                      <div className="font-mono text-xs font-bold text-white">{zygote}</div>
                      {parent1.length === 4 && <div className="text-[10px] opacity-80 mt-0.5">{pheno.name}</div>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Ratios */}
      <div className="mt-4 p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-emerald-400 font-semibold block mb-0.5">Rasio Fenotipe F2 Dihibrid Klasik Mendel:</span>
          <span className="text-slate-200 font-mono text-sm font-bold">
            9 Bulat Kuning : 3 Bulat Hijau : 3 Kerut Kuning : 1 Kerut Hijau (9 : 3 : 3 : 1)
          </span>
        </div>
        <div className="text-[11px] text-slate-400">
          Total 16 kombinasi. Sesuai dengan Hukum Mendel II (Asortasi Bebas).
        </div>
      </div>
    </div>
  );
};
