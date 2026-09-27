import React, { useState } from 'react';
import { Dna, ArrowRight, Play, RotateCcw, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/sound';

// Genetic code codon dictionary
const CODON_TABLE: Record<string, { aa: string; fullName: string; property: string }> = {
  AUG: { aa: 'Met', fullName: 'Metionin (START)', property: 'Start / Nonpolar' },
  UUU: { aa: 'Phe', fullName: 'Fenilalanin', property: 'Aromatik' },
  UUC: { aa: 'Phe', fullName: 'Fenilalanin', property: 'Aromatik' },
  UUA: { aa: 'Leu', fullName: 'Leusin', property: 'Alifatik' },
  UUG: { aa: 'Leu', fullName: 'Leusin', property: 'Alifatik' },
  UCU: { aa: 'Ser', fullName: 'Serin', property: 'Polar netral' },
  UCC: { aa: 'Ser', fullName: 'Serin', property: 'Polar netral' },
  UCA: { aa: 'Ser', fullName: 'Serin', property: 'Polar netral' },
  UCG: { aa: 'Ser', fullName: 'Serin', property: 'Polar netral' },
  UAU: { aa: 'Tyr', fullName: 'Tirosin', property: 'Aromatik' },
  UAC: { aa: 'Tyr', fullName: 'Tirosin', property: 'Aromatik' },
  UGU: { aa: 'Cys', fullName: 'Sistein', property: 'Polar (gugus SH)' },
  UGC: { aa: 'Cys', fullName: 'Sistein', property: 'Polar (gugus SH)' },
  UGG: { aa: 'Trp', fullName: 'Triptofan', property: 'Aromatik' },
  CCU: { aa: 'Pro', fullName: 'Prolin', property: 'Siklik' },
  CCC: { aa: 'Pro', fullName: 'Prolin', property: 'Siklik' },
  CCA: { aa: 'Pro', fullName: 'Prolin', property: 'Siklik' },
  CCG: { aa: 'Pro', fullName: 'Prolin', property: 'Siklik' },
  CAU: { aa: 'His', fullName: 'Histidin', property: 'Basa positif' },
  CAC: { aa: 'His', fullName: 'Histidin', property: 'Basa positif' },
  CAA: { aa: 'Gln', fullName: 'Glutamin', property: 'Polar netral' },
  CAG: { aa: 'Gln', fullName: 'Glutamin', property: 'Polar netral' },
  CGU: { aa: 'Arg', fullName: 'Arginin', property: 'Basa positif' },
  CGC: { aa: 'Arg', fullName: 'Arginin', property: 'Basa positif' },
  CGA: { aa: 'Arg', fullName: 'Arginin', property: 'Basa positif' },
  CGG: { aa: 'Arg', fullName: 'Arginin', property: 'Basa positif' },
  AUU: { aa: 'Ile', fullName: 'Isoleusin', property: 'Alifatik' },
  AUC: { aa: 'Ile', fullName: 'Isoleusin', property: 'Alifatik' },
  AUA: { aa: 'Ile', fullName: 'Isoleusin', property: 'Alifatik' },
  ACU: { aa: 'Thr', fullName: 'Treonin', property: 'Polar netral' },
  ACC: { aa: 'Thr', fullName: 'Treonin', property: 'Polar netral' },
  ACA: { aa: 'Thr', fullName: 'Treonin', property: 'Polar netral' },
  ACG: { aa: 'Thr', fullName: 'Treonin', property: 'Polar netral' },
  AAU: { aa: 'Asn', fullName: 'Asparagin', property: 'Polar netral' },
  AAC: { aa: 'Asn', fullName: 'Asparagin', property: 'Polar netral' },
  AAA: { aa: 'Lys', fullName: 'Lisin', property: 'Basa positif' },
  AAG: { aa: 'Lys', fullName: 'Lisin', property: 'Basa positif' },
  GUU: { aa: 'Val', fullName: 'Valin', property: 'Alifatik' },
  GUC: { aa: 'Val', fullName: 'Valin', property: 'Alifatik' },
  GUA: { aa: 'Val', fullName: 'Valin', property: 'Alifatik' },
  GUG: { aa: 'Val', fullName: 'Valin', property: 'Alifatik' },
  GCU: { aa: 'Ala', fullName: 'Alanin', property: 'Alifatik' },
  GCC: { aa: 'Ala', fullName: 'Alanin', property: 'Alifatik' },
  GCA: { aa: 'Ala', fullName: 'Alanin', property: 'Alifatik' },
  GCG: { aa: 'Ala', fullName: 'Alanin', property: 'Alifatik' },
  GAU: { aa: 'Asp', fullName: 'Asam Aspartat', property: 'Asam negatif' },
  GAC: { aa: 'Asp', fullName: 'Asam Aspartat', property: 'Asam negatif' },
  GAA: { aa: 'Glu', fullName: 'Asam Glutamat', property: 'Asam negatif' },
  GAG: { aa: 'Glu', fullName: 'Asam Glutamat', property: 'Asam negatif' },
  GGU: { aa: 'Gly', fullName: 'Glisin', property: 'Paling sederhana' },
  GGC: { aa: 'Gly', fullName: 'Glisin', property: 'Paling sederhana' },
  GGA: { aa: 'Gly', fullName: 'Glisin', property: 'Paling sederhana' },
  GGG: { aa: 'Gly', fullName: 'Glisin', property: 'Paling sederhana' },
  // Stop codons
  UAA: { aa: 'STOP', fullName: 'Ochre (Stop Codon)', property: 'Terminator' },
  UAG: { aa: 'STOP', fullName: 'Amber (Stop Codon)', property: 'Terminator' },
  UGA: { aa: 'STOP', fullName: 'Opal (Stop Codon)', property: 'Terminator' },
};

const PRESETS = [
  {
    name: 'Rantai Polipeptida Standar',
    antisense: 'TAC CCG CTA TTT ACT', // Transcribes to: AUG GGC GAU AAA UGA
  },
  {
    name: 'Hemoglobin Normal (HbA)',
    antisense: 'TAC CTT CTC TGA ACT', // AUG GAA GAG ACU UGA (Glu-Glu-Thr)
  },
  {
    name: 'Hemoglobin Sel Sabit (HbS)',
    antisense: 'TAC CAT CTC TGA ACT', // AUG GUA GAG ACU UGA (Val-Glu-Thr) -> mutasi titik!
  },
];

export const CodonTranslator: React.FC = () => {
  const [dnaAntisense, setDnaAntisense] = useState<string>(PRESETS[0].antisense);
  const [highlightTriplet, setHighlightTriplet] = useState<number | null>(null);

  // Clean and parse input into triplets
  const cleanDNA = dnaAntisense.toUpperCase().replace(/[^ATCG]/g, '');
  const triplets: string[] = [];
  for (let i = 0; i < cleanDNA.length; i += 3) {
    if (i + 3 <= cleanDNA.length) {
      triplets.push(cleanDNA.slice(i, i + 3));
    }
  }

  // Transcribe to mRNA: A->U, T->A, C->G, G->C
  const transcribeTriplet = (triplet: string) => {
    return triplet
      .split('')
      .map((base) => {
        if (base === 'T') return 'A';
        if (base === 'A') return 'U';
        if (base === 'C') return 'G';
        if (base === 'G') return 'C';
        return '?';
      })
      .join('');
  };

  const mrnaCodons = triplets.map(transcribeTriplet);

  // Antikodons tRNA: A->U, U->A, C->G, G->C
  const getAnticodon = (codon: string) => {
    return codon
      .split('')
      .map((base) => {
        if (base === 'A') return 'U';
        if (base === 'U') return 'A';
        if (base === 'C') return 'G';
        if (base === 'G') return 'C';
        return '?';
      })
      .join('');
  };

  // Translate to Amino Acids
  const aminoAcids = mrnaCodons.map((codon) => {
    return CODON_TABLE[codon] || { aa: '???', fullName: 'Tidak Diketahui', property: '-' };
  });

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-5 my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
        <div>
          <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block mb-1">
            Dogma Sentral Biologi Molekuler
          </span>
          <h3 className="text-lg font-bold text-white">Simulator Transkripsi & Translasi Kodon</h3>
        </div>
        {/* Preset selector */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                soundManager.playClick();
                setDnaAntisense(p.antisense);
                setHighlightTriplet(null);
              }}
              className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                dnaAntisense === p.antisense
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input DNA Antisense */}
      <div className="mb-4">
        <label className="text-xs text-slate-300 font-medium block mb-1.5 flex items-center justify-between">
          <span>DNA Cetakan / Antisense (3' → 5'):</span>
          <span className="text-[11px] font-mono text-slate-400">Hanya gunakan huruf A, T, C, G</span>
        </label>
        <input
          type="text"
          value={dnaAntisense}
          onChange={(e) => setDnaAntisense(e.target.value.toUpperCase())}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 font-mono text-emerald-400 text-sm tracking-widest focus:outline-none focus:border-purple-500"
          placeholder="Contoh: TAC CCG CTA ACT"
        />
      </div>

      {/* Step-by-Step Flow Visualization */}
      <div className="space-y-4">
        {/* Stage 1: Transkripsi (Nukleus) */}
        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-cyan-400">1. Transkripsi di Inti Sel (Nukleus) oleh RNA Polimerase</span>
            <span className="text-[11px] text-slate-400">3' DNA Antisense → 5' mRNA</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {triplets.map((trip, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHighlightTriplet(idx)}
                onMouseLeave={() => setHighlightTriplet(null)}
                className={`p-2 rounded-lg border text-center transition-all min-w-[70px] ${
                  highlightTriplet === idx
                    ? 'border-purple-500 bg-purple-950/40 scale-105'
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <div className="text-[10px] text-slate-400 font-mono">DNA (3'→5')</div>
                <div className="text-sm font-mono font-bold text-emerald-400">{trip}</div>
                <div className="text-xs text-slate-600 my-0.5">↓ cetak</div>
                <div className="text-[10px] text-slate-400 font-mono">mRNA (5'→3')</div>
                <div className="text-sm font-mono font-bold text-cyan-300">{mrnaCodons[idx]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stage 2: Translasi (Ribosom) */}
        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-purple-400">2. Translasi di Ribosom oleh tRNA (Antikodon → Asam Amino)</span>
            <span className="text-[11px] text-slate-400">Kodon mRNA dibaca oleh tRNA</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {mrnaCodons.map((codon, idx) => {
              const aa = aminoAcids[idx];
              const isStop = aa.aa === 'STOP';
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHighlightTriplet(idx)}
                  onMouseLeave={() => setHighlightTriplet(null)}
                  className={`p-2.5 rounded-lg border text-center transition-all min-w-[90px] ${
                    isStop
                      ? 'border-rose-500/50 bg-rose-950/30'
                      : highlightTriplet === idx
                      ? 'border-purple-400 bg-purple-950/50 scale-105'
                      : 'border-slate-800 bg-slate-900/60'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 font-mono">Kodon: {codon}</div>
                  <div className="text-[10px] text-purple-300 font-mono">Anti: {getAnticodon(codon)}</div>
                  <div className="my-1 border-t border-slate-800" />
                  <div className={`text-base font-bold ${isStop ? 'text-rose-400 font-mono' : 'text-emerald-300'}`}>
                    {aa.aa}
                  </div>
                  <div className="text-[10px] text-slate-300 truncate max-w-[85px] mt-0.5" title={aa.fullName}>
                    {aa.fullName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage 3: Polypeptide Chain Summary */}
        <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-emerald-400 font-semibold block mb-0.5">Rantai Polipeptida / Protein Terbentuk:</span>
            <div className="flex items-center gap-1.5 flex-wrap font-mono font-medium text-slate-200">
              {aminoAcids.map((aa, i) => (
                <React.Fragment key={i}>
                  <span className={`px-2 py-0.5 rounded ${aa.aa === 'STOP' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-emerald-300'}`}>
                    {aa.aa}
                  </span>
                  {i < aminoAcids.length - 1 && <span className="text-slate-500">—</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="text-[11px] text-slate-400 max-w-sm">
            <span className="text-white font-semibold block">Kunci Penentu Asam Amino:</span>
            Asam amino selalu ditentukan dari urutan <strong className="text-cyan-300">KODON mRNA</strong>, bukan dari tRNA dan bukan dari antisense!
          </div>
        </div>
      </div>
    </div>
  );
};
