import React, { useState } from 'react';
import { 
  Baby, Sparkles, BookOpen, ToggleLeft, ToggleRight, ArrowRight, 
  HelpCircle, CheckCircle2, XCircle, Heart, Zap, Cpu, Dna, GitMerge, Network
} from 'lucide-react';
import { soundManager } from '../utils/sound';

interface FundamentalTopic {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  babyAnalogy: {
    hook: string;
    story: string[];
    punchline: string;
  };
  formalBiology: {
    scientificConcept: string;
    keyTerms: { term: string; meaning: string }[];
    atsExamTip: string;
  };
  miniQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const FUNDAMENTAL_TOPICS: FundamentalTopic[] = [
  {
    id: 'metabolisme',
    icon: <Cpu className="w-6 h-6 text-emerald-400" />,
    title: '1. Metabolisme: Anabolisme vs Katabolisme',
    subtitle: 'Numpuk Balok Lego vs Ngehancurin Istana Lego',
    babyAnalogy: {
      hook: 'Bayangin kamu lagi main Lego di lantai kamar!',
      story: [
        '🧱 Anabolisme itu kayak kamu rajin numpuk balok-balok Lego kecil jadi istana megah. Kamu butuh tenaga, keringetan, dan capek (energi masuk = endergonik). Contoh aslinya: Tumbuhan masak glukosa lewat fotosintesis!',
        '💥 Katabolisme itu pas adik kamu yang masih balita lari terus nendang istana Lego kamu sampai hancur berkeping-keping! Pas hancur, bunyi BRUAAK dan keluar koin permen energi (melepas energi = eksergonik). Koin permen inilah yang kita sebut ATP!',
        '🍞 Respirasi Aerob (Pake Oksigen) itu kayak kompor gas elpiji nyala biru bersih: 1 piring nasi diolah rapi dapet 36-38 permen ATP.',
        '🏃 Fermentasi / Pegel Otot: Pas kamu lari sprint dikejar angsa galak, napas kamu gak kekejar (tanpa oksigen)! Otot panik bikin Asam Laktat darurat. Permen yang didapet cuma 2 ATP doang, plus betis kamu besoknya pegel kayak dicor semen!'
      ],
      punchline: 'Anabolisme = Nyusun (butuh energi). Katabolisme = Ngancurin (dapet energi ATP). Fermentasi otot = Asam laktat bikin pegel!'
    },
    formalBiology: {
      scientificConcept: 'Metabolisme terbagi atas Katabolisme (eksergonik, katabolik memecah makromolekul menghasilkan ATP) dan Anabolisme (endergonik, biosintesis molekul kompleks membutuhkan ATP/NADPH).',
      keyTerms: [
        { term: 'Katabolisme', meaning: 'Penguraian senyawa kompleks jadi sederhana (Glikolisis, Siklus Krebs).' },
        { term: 'Anabolisme', meaning: 'Penyusunan senyawa sederhana jadi kompleks (Fotosintesis).' },
        { term: 'Asam Laktat', meaning: 'Produk fermentasi anaerob di otot saat hipoksia yang memicu kelelahan.' }
      ],
      atsExamTip: 'Soal No 1, 2, 19, 20: Ingat bahwa fermentasi asam laktat TIDAK menghasilkan CO2 dan HANYA menghasilkan 2 ATP!'
    },
    miniQuiz: {
      question: 'Adik kamu ngehancurin balok Lego sampe dapet koin energi ATP. Di biologi proses ngancurin ini namanya...',
      options: ['Anabolisme', 'Katabolisme', 'Fotosintesis', 'Transkripsi'],
      correctIndex: 1,
      explanation: 'Betul! Katabolisme = memecah molekul kompleks menjadi sederhana sambil membebaskan energi (eksergonik).'
    }
  },
  {
    id: 'enzim',
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: '2. Enzim: Si Gunting & Pembuka Botol Ajaib',
    subtitle: 'Pacar Pengertian vs Orang Ketiga yang Nikung',
    babyAnalogy: {
      hook: 'Kamu mau buka tutup toples permen yang keras banget sampai nangis!',
      story: [
        '✂️ Energi Aktivasi itu rasa capek dan ngeden kamu pas berusaha buka toples. Tiba-tiba kakak kamu (Enzim) datang dan langsung "CEKLEK" ngebukain dengan gampang tanpa minta imbalan. Enzim nurunin rasa capek (energi aktivasi) biar reaksi jalan kilat!',
        '🤖 Holoenzim itu Robot Transformer utuh: Badannya empuk dari protein (Apoenzim) yang kalau kena demam panas langsung lumer/rusak (denaturasi). Biar sakti, dia pasang helm besi ion logam (Kofaktor).',
        '💔 Inhibitor Kompetitif (Orang Ketiga): Pacar kamu itu Sisi Aktif. Ada orang ketiga yang mukanya mirip kamu mau nikung duduk di sebelah pacar kamu. Cara ngusirnya? Kamu bawa 100 kembaran kamu (tambah konsentrasi substrat), si orang ketiga langsung kalah jumlah dan kabur!',
        '🔨 Inhibitor Nonkompetitif (Pengecut dari Belakang): Orang jahat ini gak ngerebut kursi, tapi nendang kursi pacar kamu dari belakang (Sisi Alosterik). Kursinya bengkok rusak! Mau kamu bawa 1.000 kembaran kamu pun, pacar kamu udah gak bisa duduk lagi (Vmax turun permanen)!'
      ],
      punchline: 'Enzim nurunin energi aktivasi. Kompetitif = mirip substrat (bisa diusir pake banyak substrat). Nonkompetitif = nempel di sisi alosterik (rusak permanen)!'
    },
    formalBiology: {
      scientificConcept: 'Enzim adalah biokatalisator organik yang menurunkan energi aktivasi reaksi tanpa mengubah kesetimbangan. Terdiri dari apoenzim (termolabil) dan kofaktor/koenzim.',
      keyTerms: [
        { term: 'Apoenzim', meaning: 'Bagian protein enzim yang memiliki sisi aktif katalitik.' },
        { term: 'Inhibitor Kompetitif', meaning: 'Meniru substrat dan berebut sisi aktif; teratasi dengan menambah [S].' },
        { term: 'Sisi Alosterik', meaning: 'Sisi di luar sisi aktif tempat inhibitor nonkompetitif berikatan.' }
      ],
      atsExamTip: 'Soal No 4, 7, 9, 10: Hambatan kompetitif BISA dinetralkan dengan menambah substrat, nonkompetitif TIDAK BISA!'
    },
    miniQuiz: {
      question: 'Kalau ada inhibitor nonkompetitif nempel di sisi alosterik, apa yang terjadi sama enzim?',
      options: [
        'Enzim makin cepet 10 kali lipat',
        'Bentuk sisi aktifnya peyot/berubah sehingga substrat gak bisa nempel',
        'Inhibitornya bisa diusir dengan nambah sedikit gula',
        'Apoenzim berubah jadi klorofil'
      ],
      correctIndex: 1,
      explanation: 'Tepat! Pengikatan pada sisi alosterik mengubah konformasi spasial 3D sisi aktif enzim secara permanen.'
    }
  },
  {
    id: 'genetika',
    icon: <Dna className="w-6 h-6 text-purple-400" />,
    title: '3. DNA & Sintesis Protein: Resep Masakan Tuan Krab',
    subtitle: 'Brankas Rahasia, Kertas Contekan, dan Kurir GoFood',
    babyAnalogy: {
      hook: 'Tuan Krab punya Kitab Resep Rahasia Krabby Patty yang gak boleh keluar brankas!',
      story: [
        '🔐 DNA itu Kitab Resep Asli di dalam brankas besi (Nukleus/Inti Sel). Bentuknya dua tali berpilin (Double Helix). Karena sangat berharga, DNA haram keluar dari nukleus nanti dicolong Plankton!',
        '📝 Transkripsi (Nulis Contekan): Koki nyatet resep rahasia di selembar kertas kecil namanya mRNA (Kodon). Aturannya: Huruf T (Timin) diganti jadi U (Urasil). Kertas contekan ini yang boleh keluar dari brankas jalan-jalan ke dapur!',
        '🍳 Translasi di Dapur (Ribosom): Kertas mRNA dibaca tiap 3 huruf (triplet kodon). Misalnya dibaca "AUG" artinya ambil sosis!',
        '🛵 tRNA itu Kurir GoFood: Kurir datang bawa gandengan bahan makanan (Asam Amino) yang pas sama pesanan 3 huruf tadi. Bahan-bahan dirangkai berjejer jadi sosis bakar jumbo yaitu Protein fungsional tubuh!'
      ],
      punchline: 'DNA (resep di brankas) → Transkripsi di nukleus → mRNA (kertas contekan) → Translasi di ribosom dibantu kurir tRNA → Jadi Protein!'
    },
    formalBiology: {
      scientificConcept: 'Dogma Sentral Biologi Molekuler: Replikasi DNA → Transkripsi (pencetakan mRNA oleh RNA polimerase di nukleus) → Translasi (pembacaan kodon mRNA oleh tRNA menjadi rantai polipeptida di ribosom).',
      keyTerms: [
        { term: 'DNA Sense vs Antisense', meaning: 'Antisense (3\'→5\') adalah template cetakan mRNA (5\'→3\').' },
        { term: 'Kodon AUG', meaning: 'Start codon yang mengawali translasi dan mengode asam amino Metionin.' },
        { term: 'Metasentris', meaning: 'Sentromer di tengah (huruf V). Akrosentris = sentromer dekat ujung (huruf J).' }
      ],
      atsExamTip: 'Soal No 31-34: Penentuan asam amino SELALU dilihat dari urutan KODON pada mRNA, bukan dari tRNA!'
    },
    miniQuiz: {
      question: 'Proses mencetak kertas contekan mRNA dari cetakan DNA di dalam nukleus disebut...',
      options: ['Translasi', 'Transkripsi', 'Replikasi', 'Fermentasi'],
      correctIndex: 1,
      explanation: 'Benar! Transkripsi adalah proses penyalinan kode DNA cetakan menjadi rantai mRNA di dalam inti sel.'
    }
  },
  {
    id: 'pembelahan',
    icon: <GitMerge className="w-6 h-6 text-cyan-400" />,
    title: '4. Pembelahan Sel: Mesin Fotocopy vs Pabrik Bibit',
    subtitle: 'Fotocopy KTP Identik vs Pembagian Warisan Meiosis',
    babyAnalogy: {
      hook: 'Lutut kamu lecet berdarah abis jatuh dari sepeda, kok bisa mulus lagi?',
      story: [
        '🖨️ Mitosis = Tukang Fotocopy KTP! Sel kulit kamu yang masih utuh masuk ke mesin fotocopy, keluar 2 lembar sel baru yang fotokopiannya 100% kembar identik (2n jadi 2n). Tujuannya buat nambal luka dan bikin badan kamu tambah tinggi.',
        '📸 Metafase = Momen Mau Foto KTP! Semua kromosom berjejer lurus di garis tengah (bidang ekuator) dengan baju paling rapi dan tebal. Makanya Pak Dokter kalau mau ngitung kromosom (kariotipe) selalu ngefoto pas tahap Metafase ini!',
        '🏹 Anafase = Ditarik ke Kanan dan Kiri! Kromatid kembar dipisah ditarik tali gelendong ke kutub atas dan bawah.',
        '👶 Meiosis = Bikin Bibit Bayi (Sperma & Sel Telur)! Warisan kromosom dibagi dua (2n jadi n). Kenapa? Biar pas sperma (n) ketemu sel telur (n), bayinya jadi normal (2n). Kalau gak dibagi dua, bayinya bisa jadi monster berkromosom 4n!'
      ],
      punchline: 'Mitosis = Fotocopy sel tubuh identik (2n → 2n). Metafase = Baris di tengah paling jelas difoto. Meiosis = Bikin sel kelamin separuh (2n → n).'
    },
    formalBiology: {
      scientificConcept: 'Mitosis membelah sel somatis menghasilkan 2 sel anakan identik diploid (2n). Meiosis adalah pembelahan reduksi di sel gonad menghasilkan 4 sel anak haploid (n) dengan rekombinasi genetik.',
      keyTerms: [
        { term: 'Metafase', meaning: 'Kromosom berkondensasi maksimal dan berjejer di pelat ekuator.' },
        { term: 'Anafase', meaning: 'Pemisahan kromatid saudara menuju kutub berlawanan.' },
        { term: 'Pakiten', meaning: 'Subfase Profase I Meiosis tempat terjadinya pindah silang (crossing over).' }
      ],
      atsExamTip: 'Soal No 35, 36, 37: Waktu terbaik mengamati jumlah kromosom selalu saat METAFASE!'
    },
    miniQuiz: {
      question: 'Kapan waktu terbaik buat dokter ngitung dan ngefoto bentuk kromosom secara paling jelas?',
      options: ['Saat Profase awal', 'Saat Metafase (berjejer di ekuator)', 'Saat Telofase akhir', 'Saat sel lagi tidur'],
      correctIndex: 1,
      explanation: 'Hebat! Pada Metafase, kromosom menebal maksimal dan berjejer rapi di pelat pembelahan (ekuator).'
    }
  },
  {
    id: 'mendel',
    icon: <Network className="w-6 h-6 text-rose-400" />,
    title: '5. Hukum Mendel: Lempar Koin Genetika & Kacang Ercis',
    subtitle: 'Kenapa Kacang Ercis Gak Rewel & Rumus Koin 2^n',
    babyAnalogy: {
      hook: 'Kenapa Mbah Mendel dulu eksperimennya milih kacang ercis, bukan milih gajah atau pohon kelapa?',
      story: [
        '🌱 Kacang Ercis itu Tanaman Paling Gak Rewel! Dia cepet panen, anaknya buanyaaak sekali berbuah, bisa kawin sendiri, dan sifatnya tegas gak labil: kalau gak pohon tinggi ya cebol, kalau gak bunga ungu ya putih, gak ada yang abu-abu galau!',
        '🪙 Rumus Gamet 2^n itu kayak Lempar Koin Bolak-Balik: "n" itu jumlah huruf yang belang (heterozigot, ada huruf besar dan kecil).',
        '🎲 Kalau gen kamu "AABB" (gak ada yang belang, n = 0) → 2^0 = 1 macam gamet doang (AB).',
        '🎲 Kalau gen kamu "AaBb" (ada 2 yang belang: Aa dan Bb, jadi n = 2) → 2^2 = 4 macam gamet (AB, Ab, aB, ab). Gampang banget kan?!',
        '🎭 Genotipe vs Fenotipe: Genotipe itu resep rahasia di dalem DNA (huruf AaBb). Fenotipe itu tampang fisik kamu yang keliatan di kaca (rambut keriting, kulit sawo matang, bunga merah)!'
      ],
      punchline: 'Rumus gamet = 2^n (n = pasang huruf heterozigot). Ercis dipilih karena cepet panen & sifatnya kontras!'
    },
    formalBiology: {
      scientificConcept: 'Hukum Mendel I (Segregasi bebas alel saat anafase I) dan Hukum Mendel II (Asortasi bebas saat pembentukan gamet dihibrid). Jumlah variasi gamet dihitung dengan 2^n.',
      keyTerms: [
        { term: 'Heterozigot', meaning: 'Pasangan alel berbeda (Aa, Bb, Cc) yang menjadi nilai n pada rumus 2^n.' },
        { term: 'Monohibrid Intermediat', meaning: 'Sifat kodominan menghasilkan rasio fenotipe 1:2:1 pada F2.' },
        { term: 'Dihibrid F2', meaning: 'Persilangan AaBb x AaBb menghasilkan rasio fenotipe klasik 9:3:3:1.' }
      ],
      atsExamTip: 'Soal No 43, 44, 46: Menghitung macam gamet hitung saja pasangan yang heterozigot (Aa, Bb, dll) lalu pangkatkan 2^n!'
    },
    miniQuiz: {
      question: 'Kalau suatu individu punya genotipe AaBbCCDd, berapa jumlah macam gamet yang bisa dibikin?',
      options: ['4 macam', '8 macam (karena ada 3 heterozigot: Aa, Bb, Dd -> 2^3)', '16 macam', '6 macam'],
      correctIndex: 1,
      explanation: 'Pintar! Yang heterozigot ada 3 pasang (Aa, Bb, Dd; CC homozigot). Rumus 2^3 = 8 macam gamet!'
    }
  }
];

export const FundamentalTab: React.FC = () => {
  const [activeTopicId, setActiveTopicId] = useState<string>('metabolisme');
  const [mode, setMode] = useState<'baby' | 'formal'>('baby');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});

  const activeTopic = FUNDAMENTAL_TOPICS.find((t) => t.id === activeTopicId) || FUNDAMENTAL_TOPICS[0];

  const handleSelectQuizOption = (topicId: string, optionIdx: number) => {
    soundManager.playClick();
    setQuizAnswers((prev) => ({ ...prev, [topicId]: optionIdx }));
    const topic = FUNDAMENTAL_TOPICS.find((t) => t.id === topicId);
    if (topic && optionIdx === topic.miniQuiz.correctIndex) {
      soundManager.playCorrect();
    } else {
      soundManager.playWrong();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="cyber-panel-accent rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                <Baby className="w-3.5 h-3.5" /> FITUR FUNDAMENTAL: BAHASA BAYI
              </span>
              <span className="text-xs font-mono text-emerald-400">BIOLOGI YTTA 😜</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Konsep Dasar Biologi Kelas XII (Dijelasin Bahasa Bayi)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Gak pake bahasa alien ribet! Pahami logika dasar 5 materi kisi-kisi ATS pakai analogi super receh, nempel di kepala, dan anti-lupa.
            </p>
          </div>

          {/* Mode Switcher Toggle */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-950/80 border border-slate-800 rounded-xl shrink-0">
            <button
              onClick={() => {
                soundManager.playClick();
                setMode('baby');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'baby'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Baby className="w-3.5 h-3.5" />
              <span>Bahasa Bayi 👶</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setMode('formal');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'formal'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Bahasa Guru 🔬</span>
            </button>
          </div>
        </div>
      </div>

      {/* Topic Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {FUNDAMENTAL_TOPICS.map((topic) => {
          const isActive = topic.id === activeTopicId;
          return (
            <button
              key={topic.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTopicId(topic.id);
              }}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-900 border-amber-500 shadow-md shadow-amber-500/10 ring-1 ring-amber-500/50'
                  : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  {topic.icon}
                </div>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </div>
              <div className="text-xs font-bold text-white line-clamp-1">{topic.title.split(':')[1] || topic.title}</div>
              <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{topic.subtitle}</div>
            </button>
          );
        })}
      </div>

      {/* Active Topic Card */}
      <div className="cyber-panel rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                {mode === 'baby' ? '🍼 MODE BAHASA BAYI (ELI5)' : '🔬 MODE BAHASA ILMIAH RESMI'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {activeTopic.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-medium">
              {activeTopic.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                setMode(mode === 'baby' ? 'formal' : 'baby');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 transition-colors"
            >
              <span>Ganti ke {mode === 'baby' ? 'Bahasa Guru 🔬' : 'Bahasa Bayi 👶'}</span>
            </button>
          </div>
        </div>

        {/* Content Section: Baby Mode vs Formal Biology */}
        {mode === 'baby' ? (
          <div className="space-y-4">
            <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-2xl space-y-3">
              <div className="text-xs font-bold font-mono text-amber-400 flex items-center gap-2">
                <span>👶 ANALOGI BAYI:</span>
                <span className="text-slate-200 font-semibold">{activeTopic.babyAnalogy.hook}</span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeTopic.babyAnalogy.story.map((paragraph, idx) => (
                  <p key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Punchline summary */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded-xl text-xs sm:text-sm text-amber-300 font-bold flex items-center gap-2">
                <span>💡 KESIMPULAN BAYI:</span>
                <span>{activeTopic.babyAnalogy.punchline}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-emerald-400 font-bold block">KONSEP RESMI BIOLOGI:</span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {activeTopic.formalBiology.scientificConcept}
                </p>
              </div>

              {/* Key terms definitions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {activeTopic.formalBiology.keyTerms.map((term, tIdx) => (
                  <div key={tIdx} className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-cyan-400 block">{term.term}</span>
                    <span className="text-[11px] text-slate-300 leading-relaxed block">{term.meaning}</span>
                  </div>
                ))}
              </div>

              {/* Exam Tip */}
              <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-xl text-xs text-purple-200">
                <strong className="text-purple-300 block mb-0.5">Bocoran Kisi-Kisi ATS:</strong>
                {activeTopic.formalBiology.atsExamTip}
              </div>
            </div>
          </div>
        )}

        {/* Mini Quiz Cek Pemahaman Bayi */}
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" /> TEKA-TEKI CEK PEMAHAMAN BAYI
            </span>
            <span className="text-[10px] text-slate-500 font-mono">1 Pertanyaan Cepat</span>
          </div>

          <h4 className="text-sm sm:text-base font-bold text-white">
            {activeTopic.miniQuiz.question}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {activeTopic.miniQuiz.options.map((opt, optIdx) => {
              const selected = quizAnswers[activeTopic.id] === optIdx;
              const isSubmitted = quizAnswers[activeTopic.id] !== undefined && quizAnswers[activeTopic.id] !== null;
              const isCorrect = optIdx === activeTopic.miniQuiz.correctIndex;

              let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white';
              if (isSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500';
                } else if (selected && !isCorrect) {
                  btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-300 ring-1 ring-rose-500';
                } else {
                  btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectQuizOption(activeTopic.id, optIdx)}
                  className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                  {isSubmitted && selected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Explanation if answered */}
          {quizAnswers[activeTopic.id] !== undefined && quizAnswers[activeTopic.id] !== null && (
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed animate-in fade-in duration-200">
              <strong className="text-white">Penjelasan: </strong>
              {activeTopic.miniQuiz.explanation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
