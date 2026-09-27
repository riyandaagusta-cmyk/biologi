import { BiologyModule, Question, Badge } from '../types/biology';

export const BADGES: Badge[] = [
  {
    id: 'first_blood',
    title: 'First Synthesis',
    description: 'Menyelesaikan kuis pertama kali di Cyber-Lab.',
    iconName: 'Zap',
    category: 'Quiz',
  },
  {
    id: 'enzyme_expert',
    title: 'Enzyme Specialist',
    description: 'Menyelesaikan Modul & Kuis Enzim dengan skor sempurna atau memahami teori kerja enzim.',
    iconName: 'Activity',
    category: 'Module',
  },
  {
    id: 'atp_powerhouse',
    title: 'ATP Powerhouse',
    description: 'Menguasai seluruh tahapan respirasi aerob & fermentasi metabolisme sel.',
    iconName: 'BatteryCharging',
    category: 'Module',
  },
  {
    id: 'genetic_codecracker',
    title: 'Genetic Codecracker',
    description: 'Mampu menerjemahkan kodon transkripsi dan translasi sintesis protein.',
    iconName: 'Dna',
    category: 'Module',
  },
  {
    id: 'mitosis_master',
    title: 'Chromosome Navigator',
    description: 'Menguasai tahapan pembelahan mitosis, meiosis, dan gametogenesis.',
    iconName: 'GitBranch',
    category: 'Module',
  },
  {
    id: 'mendel_successor',
    title: 'Mendel Successor',
    description: 'Menguasai kalkulasi persilangan monohibrid, dihibrid, dan rumus gamet 2^n.',
    iconName: 'Sparkles',
    category: 'Module',
  },
  {
    id: 'boss_slayer',
    title: 'ATS Boss Slayer',
    description: 'Menyelesaikan Simulator Boss Battle ATS dengan skor minimal 80%.',
    iconName: 'ShieldAlert',
    category: 'Quiz',
  },
  {
    id: 'ats_man1metro_master',
    title: 'MAN 1 Metro Champion',
    description: 'Menyelesaikan Simulasi Penuh 50 Soal Kisi-Kisi ATS MAN 1 Metro.',
    iconName: 'Crown',
    category: 'Mastery',
  },
  {
    id: 'perfect_score',
    title: 'Bio-Perfectionist',
    description: 'Mencapai skor 100% pada salah satu kuis tanpa kehilangan nyawa (HP).',
    iconName: 'Award',
    category: 'Quiz',
  },
  {
    id: 'streak_3',
    title: 'Lab Regular',
    description: 'Menjaga streak belajar selama minimal 3 hari berturut-turut.',
    iconName: 'Flame',
    category: 'Streak',
  },
];

export const BIOLOGY_MODULES: BiologyModule[] = [
  {
    id: 'modul-1',
    number: 1,
    title: 'Metabolisme Sel',
    tagline: 'Anabolisme, Katabolisme, Respirasi Aerob, & Fotosintesis (Kisi-kisi No 1, 2, 14-25)',
    durationMinutes: 25,
    iconName: 'Cpu',
    summary: 'Mempelajari perombakan senyawa kompleks menjadi sederhana (katabolisme) dan pembentukan senyawa organik dari molekul sederhana (anabolisme), respirasi aerob, fermentasi, serta fotosintesis.',
    widgetType: 'ingenhousz',
    sections: [
      {
        id: 'meta-1',
        title: '1. Anabolisme vs Katabolisme (Kisi-kisi No 1, 2)',
        content: [
          'Metabolisme merupakan seluruh rangkaian reaksi kimia yang terjadi di dalam sel hidup. Terbagi menjadi 2 proses utama:',
          '1. Anabolisme: Proses penyusunan (sintesis) senyawa sederhana menjadi senyawa organik kompleks. Bersifat endergonik (memerlukan masukan energi, seperti foton atau ATP). Contoh: Fotosintesis dan Kemosintesis.',
          '2. Katabolisme: Proses pembongkaran / perombakan molekul organik kompleks menjadi molekul sederhana. Bersifat eksergonik (menghasilkan / membebaskan energi dalam bentuk ATP). Contoh: Respirasi aerob dan fermentasi.'
        ],
        keyPoints: [
          'Anabolisme = Menyusun molekul sederhana jadi kompleks, butuh energi (endergonik).',
          'Katabolisme = Mengurai molekul kompleks jadi sederhana, hasilkan energi (eksergonik).'
        ]
      },
      {
        id: 'meta-2',
        title: '2. Respirasi Aerob 4 Tahap & Rincian Siklus Krebs (Kisi-kisi No 14, 15, 16, 17, 18)',
        content: [
          'Respirasi aerob berlangsung dalam 4 tahapan berurutan:',
          '1. Glikolisis (di Sitosol/Sitoplasma): Memecah 1 Glukosa (6C) menjadi 2 Asam Piruvat (3C), menghasilkan 2 NADH dan 2 ATP.',
          '2. Dekarboksilasi Oksidatif (di Matriks Mitokondria): Mengubah 2 Asam Piruvat menjadi 2 Asetil-KoA (2C) dengan melepaskan 2 CO2 dan 2 NADH.',
          '3. Siklus Krebs / Asam Sitrat (di Matriks Mitokondria): Asetil-KoA (2C) masuk siklus dan bereaksi dengan Asam Oksaloasetat (4C) membentuk Asam Sitrat (6C). Hasil akhir siklus Krebs per molekul glukosa: 2 ATP, 2 FADH2, 4 CO2, dan 6 NADH!',
          '4. Sistem Transpor Elektron & Kemiosmosis (di Krista/Membran Dalam Mitokondria): Mentransfer elektron dari NADH dan FADH2 ke Oksigen (akseptor elektron terakhir) membentuk H2O dan menghasilkan 32-34 ATP.'
        ],
        tableData: {
          headers: ['Tahap Respirasi', 'Lokasi Seluler', 'Substrat Utama', 'Hasil Akhir per Glukosa'],
          rows: [
            ['Glikolisis', 'Sitoplasma / Sitosol', '1 Glukosa (6C)', '2 Asam Piruvat + 2 NADH + 2 ATP'],
            ['Dekarboksilasi Oksidatif', 'Matriks Mitokondria', '2 Asam Piruvat (3C)', '2 Asetil-KoA + 2 CO2 + 2 NADH'],
            ['Siklus Krebs', 'Matriks Mitokondria', '2 Asetil-KoA (2C)', '2 ATP + 2 FADH2 + 4 CO2 + 6 NADH'],
            ['Transpor Elektron', 'Krista Mitokondria', '10 NADH + 2 FADH2 + O2', '32/34 ATP + 6 H2O']
          ]
        }
      },
      {
        id: 'meta-3',
        title: '3. Respirasi Anaerob & Fermentasi Asam Laktat (Kisi-kisi No 19, 20)',
        content: [
          'Jika suplai oksigen minim saat berolahraga berat, sel otot beralih ke respirasi anaerob (fermentasi asam laktat).',
          'Asam piruvat hasil glikolisis direduksi oleh NADH langsung menjadi Asam Laktat. Penumpukan asam laktat di otot menyebabkan elastisitas otot berkurang, memicu kelelahan dan rasa pegal.',
          'Pada respirasi anaerob, jumlah ATP yang dihasilkan HANYA 2 ATP per molekul glukosa (berasal murni dari tahap glikolisis).'
        ]
      },
      {
        id: 'meta-4',
        title: '4. Fotosintesis & Percobaan Ingenhousz (Kisi-kisi No 21, 22, 23, 24, 25)',
        content: [
          'Fotosintesis terjadi di kloroplas dengan dua tahapan utama:',
          '1. Reaksi Terang (di Membran Tilakoid / Grana): Memerlukan cahaya matahari dan molekul air. Terjadi fotolisis air (pemecahan H2O) melepaskan gas Oksigen (O2) serta menghasilkan energi kimia ATP dan NADPH.',
          '2. Reaksi Gelap / Siklus Calvin (di Stroma Kloroplas): Menggunakan ATP dan NADPH dari reaksi terang untuk memfiksasi gas CO2 dengan bantuan enzim Rubisco dan molekul RuBP, lalu direduksi menjadi glukosa (karbohidrat).',
          'Percobaan Jan Ingenhousz: Menggunakan tanaman air Hydrilla verticillata dalam corong kaca terbalik. Terbentuknya gelembung udara pada tabung reaksi membuktikan bahwa fotosintesis melepaskan gas Oksigen (O2) sebagai hasil samping fotolisis air.'
        ]
      }
    ]
  },
  {
    id: 'modul-2',
    number: 2,
    title: 'Enzim Sebagai Biokatalisator',
    tagline: 'Komponen, Cara Kerja, Inhibitor, & Faktor Suhu/pH (Kisi-kisi No 3-13)',
    durationMinutes: 20,
    iconName: 'Zap',
    summary: 'Menganalisis peran enzim sebagai biokatalisator organik yang menurunkan energi aktivasi, komponen holoenzim, sifat spesifisitas, mekanisme kerja, serta pengaruh inhibitor.',
    widgetType: 'enzyme',
    sections: [
      {
        id: 'enz-1',
        title: '1. Komponen Enzim Lengkap (Holoenzim) (Kisi-kisi No 3, 5, 6)',
        content: [
          'Enzim utuh yang aktif secara katalitik dinamakan HOLOENZIM. Holoenzim tersusun atas:',
          '- Apoenzim: Komponen protein murni, memiliki sisi aktif, dan bersifat termolabil (rusak oleh suhu tinggi).',
          '- Kofaktor: Komponen nonprotein pembantu enzim. Bila berupa ion logam anorganik (seperti Fe2+, Cu2+, Mg2+, Zn2+) disebut Kofaktor. Bila berupa molekul organik kompleks (seperti vitamin B, NAD, FAD) disebut Koenzim.'
        ]
      },
      {
        id: 'enz-2',
        title: '2. Fungsi Biokatalisator & Energi Aktivasi (Kisi-kisi No 4, 7, 8)',
        content: [
          'Fungsi utama enzim sebagai biokatalisator adalah mempercepat laju reaksi kimia metabolisme dengan cara menurunkan energi aktivasi (Ea) yang diperlukan untuk memulai reaksi, tanpa enzim itu sendiri ikut habis bereaksi.',
          'Sifat spesifik enzim: Enzim hanya mengenali dan mengkatalisis satu jenis substrat spesifik (one enzyme, one substrate) karena kesesuaian bentuk spasial sisi aktifnya.'
        ]
      },
      {
        id: 'enz-3',
        title: '3. Inhibitor Kompetitif vs Nonkompetitif (Kisi-kisi No 9, 10)',
        content: [
          'Inhibitor adalah senyawa yang menghambat kerja katalitik enzim:',
          '- Inhibitor Kompetitif: Memiliki struktur molekul yang mirip dengan substrat dan bersaing merebut SISI AKTIF enzim. Dapat diatasi dengan meningkatkan konsentrasi substrat.',
          '- Inhibitor Nonkompetitif: Berikatan pada sisi lain di luar sisi aktif enzim yang disebut SISI ALOSTERIK. Ikatan ini mengubah konformasi bentuk sisi aktif enzim sehingga substrat tidak dapat terikat.'
        ]
      },
      {
        id: 'enz-4',
        title: '4. Faktor Suhu Optimum & Teori Kerja (Kisi-kisi No 11, 12, 13)',
        content: [
          'Suhu Optimum: Aktivitas enzim meningkat seiring kenaikan suhu hingga mencapai puncak suhu optimum (pada tubuh manusia ~37°C-40°C). Di atas suhu optimum, enzim mengalami denaturasi.',
          'Faktor utama yang mempengaruhi kerja enzim: Suhu, pH, konsentrasi enzim, dan konsentrasi substrat (volume wadah bukan faktor utama).',
          'Teori Kerja Enzim: Teori Gembok-Kunci (Lock and Key) menyatakan sisi aktif enzim kaku, sedangkan Teori Ketepatan Induksi (Induced Fit) menyatakan sisi aktif enzim lentur menyesuaikan substrat.'
        ]
      }
    ]
  },
  {
    id: 'modul-3',
    number: 3,
    title: 'Substansi Materi Genetik & Sintesis Protein',
    tagline: 'DNA, RNA, Kromosom, Transkripsi, Translasi (Kisi-kisi No 26-34)',
    durationMinutes: 25,
    iconName: 'Dna',
    summary: 'Menganalisis struktur DNA & RNA, gonosom vs autosom, bentuk kromosom metasentris/akrosentris, gen letal, serta tahapan sintesis protein dan pembacaan kodon.',
    widgetType: 'codon',
    sections: [
      {
        id: 'gen-1',
        title: '1. Struktur Materi Genetik & Gonosom (Kisi-kisi No 26, 27, 29)',
        content: [
          'DNA merupakan polimer untai ganda berpilin (double helix) dengan gula deoksiribosa dan basa Timin, sedangkan RNA beruntai tunggal dengan gula ribosa dan basa Urasil.',
          'Kromosom yang berperan dalam menentukan jenis kelamin individu disebut GONOSOM (kromosom seks: XX untuk betina/wanita, XY untuk jantan/pria), sedangkan kromosom penentu sifat tubuh disebut AUTOSOM.',
          'Karakteristik gen sebagai substansi hereditas: Terletak di dalam lokus kromosom, tersusun atas untaian nukleotida, berfungsi mengatur sifat metabolik serta mampu menduplikasi diri saat pembelahan sel.'
        ]
      },
      {
        id: 'gen-2',
        title: '2. Bentuk Kromosom & Genotip Letal (Kisi-kisi No 28, 30)',
        content: [
          'Berdasarkan letak sentromernya:',
          '- Metasentris: Sentromer tepat berada di tengah membagi kedua lengan kromosom sama panjang (membentuk huruf V).',
          '- Akrosentris: Sentromer berada sangat dekat dengan salah satu ujung kromosom sehingga satu lengan sangat panjang dan satu lengan sangat pendek (membentuk huruf J).',
          'Gen Letal: Gen yang menyebabkan kematian individu ketika berada dalam kondisi HOMOZIGOT (baik homozigot dominan seperti tikus kuning / ayam redep, maupun homozigot resesif seperti jagung albino tanpa klorofil).'
        ]
      },
      {
        id: 'gen-3',
        title: '3. Tahapan Sintesis Protein & Penentuan Asam Amino (Kisi-kisi No 31, 32, 33, 34)',
        content: [
          'Urutan proses sintesis protein secara tepat:',
          '1) Heliks DNA membuka pilinan di dalam nukleus.',
          '2) Enzim RNA polimerase melakukan transkripsi mencetak rantai mRNA (kodon) dari DNA antisense di nukleus.',
          '3) mRNA matang bergerak keluar dari nukleus menuju ribosom di sitoplasma.',
          '4) Molekul tRNA membawa asam amino spesifik sesuai antikodonnya berpasangan dengan kodon mRNA.',
          '5) Asam amino dirangkai dengan ikatan peptida membentuk rantai polipeptida (protein).',
          'Aturan basa transkripsi: Jika DNA sense 5\'-ATG-3\', maka DNA antisense adalah 3\'-TAC-5\', dan mRNA adalah 5\'-AUG-3\' (mRNA identik dengan DNA sense dengan mengubah basa T menjadi U!). Asam amino selalu ditentukan oleh KODON pada mRNA.'
        ]
      }
    ]
  },
  {
    id: 'modul-4',
    number: 4,
    title: 'Pembelahan Sel & Gametogenesis',
    tagline: 'Mitosis, Meiosis, Siklus Sel, Spermatogenesis, Oogenesis (Kisi-kisi No 35-42)',
    durationMinutes: 20,
    iconName: 'GitMerge',
    summary: 'Menganalisis tahap pembelahan mitosis ketika kromosom teramati jelas, perbandingan mitosis dan meiosis, spermatogenesis, oogenesis, serta replikasi DNA siklus sel.',
    widgetType: 'cell_cycle',
    sections: [
      {
        id: 'cel-1',
        title: '1. Tahapan Mitosis & Pengamatan Kromosom (Kisi-kisi No 35, 37, 38, 40)',
        content: [
          'Metafase adalah tahap mitosis di mana kromosom berkondensasi secara maksimal dan berjejer rapi di bidang ekuator (pelat pembelahan). Ini adalah saat TERBAIK untuk menghitung dan mengamati morfologi kromosom secara jelas (analisis kariotipe).',
          'Anafase ditandai dengan pemisahan kromatid saudara yang ditarik oleh benang spindel menuju kutub sel yang berlawanan.'
        ]
      },
      {
        id: 'cel-2',
        title: '2. Mitosis vs Meiosis & Replikasi Siklus Sel (Kisi-kisi No 36, 41)',
        content: [
          'Mitosis: Terjadi pada sel tubuh (somatis), 1 kali pembelahan, menghasilkan 2 sel anakan diploid (2n) identik.',
          'Meiosis: Terjadi pada organ reproduksi (germinal), 2 kali pembelahan, menghasilkan 4 sel anakan haploid (n) dengan variasi genetik.',
          'Replikasi DNA terjadi secara eksklusif pada FASE S (Sintesis) dari Interfase dalam siklus sel.'
        ]
      },
      {
        id: 'cel-3',
        title: '3. Spermatogenesis & Oogenesis (Kisi-kisi No 39, 42)',
        content: [
          'Spermatogenesis: Spermatosit primer (2n) mengalami pembelahan Meiosis I menghasilkan 2 spermatosit sekunder (n). Lalu Meiosis II menghasilkan 4 spermatid (n) yang berkembang menjadi 4 sperma fungsional.',
          'Oogenesis: Oogonium (2n) membelah secara mitosis menghasilkan oosit primer (2n). Oosit primer mengalami Meiosis I asimetris menghasilkan 1 oosit sekunder dan 1 badan polar pertama.'
        ]
      }
    ]
  },
  {
    id: 'modul-5',
    number: 5,
    title: 'Pewarisan Sifat (Hukum Mendel)',
    tagline: 'Kacang Ercis, Monohibrid, Intermediat, Rumus Gamet 2^n (Kisi-kisi No 43-50)',
    durationMinutes: 25,
    iconName: 'Network',
    summary: 'Mempelajari alasan pemilihan kacang ercis oleh Mendel, persilangan monohibrid dominan dan intermediat, rumus jumlah macam gamet 2^n, genotipe vs fenotipe, dan rasio keturunan F2.',
    widgetType: 'punnett',
    sections: [
      {
        id: 'men-1',
        title: '1. Alasan Mendel Memilih Pisum sativum (Kisi-kisi No 43)',
        content: [
          'Pertimbangan Mendel memilih tanaman kacang ercis:',
          '1. Mudah disilangkan dan dapat melakukan penyerbukan sendiri.',
          '2. Daur hidupnya pendek (cepat menghasilkan keturunan).',
          '3. Menghasilkan banyak keturunan dalam sekali panen.',
          '4. Memiliki pasangan sifat beda yang mencolok dan kontras (bukan masa hidup panjang!).'
        ]
      },
      {
        id: 'men-2',
        title: '2. Persilangan Monohibrid Dominan & Intermediat (Kisi-kisi No 44, 45, 48, 50)',
        content: [
          'Persilangan Monohibrid Dominan Penuh (BB x bb):',
          '- Perbandingan genotipe F2: 1 BB : 2 Bb : 1 bb (1 : 2 : 1).',
          '- Perbandingan fenotipe F2: 3 Dominan : 1 Resesif (3 : 1).',
          'Persilangan Monohibrid Intermediat (MM x mm):',
          '- Fenotipe F2: 1 Merah : 2 Merah Muda : 1 Putih (1 : 2 : 1).',
          'Sifat resesif adalah sifat yang tidak muncul / tertutupi pada keturunan F1 heterozigot.'
        ]
      },
      {
        id: 'men-3',
        title: '3. Rumus Jumlah Gamet 2^n & Istilah Genotipe (Kisi-kisi No 46, 47, 49)',
        content: [
          'Jumlah macam gamet ditentukan oleh rumus 2^n, di mana n adalah jumlah pasangan alel HETEROZIGOT.',
          'Contoh: Genotipe AaBb memiliki 2 pasangan heterozigot (Aa dan Bb), maka n = 2 -> 2^2 = 4 macam gamet (AB, Ab, aB, ab).',
          'Genotipe adalah susunan genetik atau kombinasi alel suatu individu yang tidak dapat diamati secara langsung dari luar. Fenotipe adalah sifat fisik yang dapat diamati dari luar.'
        ]
      }
    ]
  }
];

// Exact 50 Questions aligned with MAN 1 Metro Kisi-Kisi PDF
export const QUESTION_BANK: Question[] = [
  // Kisi-kisi No 1
  {
    id: 'kisi-1',
    kisiKisiNumber: 1,
    moduleId: 'modul-1',
    moduleTitle: 'Metabolisme Sel',
    question: 'Istilah yang tepat untuk proses penyusunan senyawa-senyawa sederhana menjadi senyawa organik yang lebih kompleks di dalam sel hidup adalah...',
    options: ['Katabolisme', 'Anabolisme', 'Fermentasi', 'Glikolisis', 'Respirasi seluler'],
    correctAnswer: 1,
    explanation: 'Anabolisme adalah proses biosintesis atau penyusunan molekul sederhana menjadi molekul kompleks yang membutuhkan energi (bersifat endergonik).',
    difficulty: 'Mudah',
    keyConcept: 'Definisi Anabolisme'
  },
  // Kisi-kisi No 2
  {
    id: 'kisi-2',
    kisiKisiNumber: 2,
    moduleId: 'modul-1',
    moduleTitle: 'Metabolisme Sel',
    question: 'Berdasarkan kebutuhan energi dan karakteristik reaksinya, metabolisme dibedakan menjadi dua jenis, yaitu...',
    options: [
      'Glikolisis yang eksergonik dan Siklus Krebs yang endergonik',
      'Katabolisme yang membebaskan energi (eksergonik) dan Anabolisme yang memerlukan energi (endergonik)',
      'Respirasi aerob yang membutuhkan cahaya dan anaerob yang tanpa cahaya',
      'Reaksi terang yang eksergonik dan reaksi gelap yang tidak melibatkan energi',
      'Fermentasi alkohol dan fermentasi asam laktat'
    ],
    correctAnswer: 1,
    explanation: 'Katabolisme merupakan reaksi perombakan senyawa kompleks yang bersifat eksergonik (menghasilkan energi), sedangkan anabolisme adalah reaksi penyusunan yang bersifat endergonik (memerlukan energi).',
    difficulty: 'Mudah',
    keyConcept: 'Dua Jenis Metabolisme'
  },
  // Kisi-kisi No 3
  {
    id: 'kisi-3',
    kisiKisiNumber: 3,
    moduleId: 'modul-2',
    moduleTitle: 'Enzim',
    question: 'Istilah untuk molekul enzim lengkap dan aktif yang tersusun atas komponen protein dan komponen nonprotein adalah...',
    options: ['Apoenzim', 'Koenzim', 'Kofaktor', 'Holoenzim', 'Gugus prostetik'],
    correctAnswer: 3,
    explanation: 'Holoenzim adalah bentuk enzim utuh dan aktif yang terdiri dari apoenzim (protein) dan kofaktor/koenzim (nonprotein).',
    difficulty: 'Mudah',
    keyConcept: 'Holoenzim'
  },
  // Kisi-kisi No 4
  {
    id: 'kisi-4',
    kisiKisiNumber: 4,
    moduleId: 'modul-2',
    moduleTitle: 'Enzim',
    question: 'Fungsi utama enzim sebagai biokatalisator dalam proses metabolisme seluler adalah...',
    options: [
      'Menyediakan energi panas tambahan untuk mempercepat reaksi',
      'Mempercepat laju reaksi dengan menurunkan energi aktivasi tanpa ikut habis bereaksi',
      'Mengubah struktur akhir produk reaksi kimia agar lebih stabil',
      'Meningkatkan nilai perubahan energi bebas Gibbs (ΔG)',
      'Menghentikan reaksi yang tidak menguntungkan sel'
    ],
    correctAnswer: 1,
    explanation: 'Enzim bertindak mempercepat laju reaksi kimia dengan cara menurunkan batas energi aktivasi (Ea) yang dibutuhkan untuk memulai reaksi, tanpa mengubah kesetimbangan reaksi.',
    difficulty: 'Mudah',
    keyConcept: 'Fungsi Biokatalisator'
  },
  // Kisi-kisi No 5
  {
    id: 'kisi-5',
    kisiKisiNumber: 5,
    moduleId: 'modul-2',
    moduleTitle: 'Enzim',
    question: 'Komponen nonprotein anorganik berupa ion-ion logam seperti Fe2+, Zn2+, and Mg2+ yang membantu kerja katalitik enzim disebut...',
    options: ['Koenzim', 'Apoenzim', 'Kofaktor', 'Gugus alosterik', 'Substrat'],
    correctAnswer: 2,
    explanation: 'Komponen nonprotein anorganik dari enzim adalah kofaktor (ion logam), sedangkan bila molekul organik kompleks disebut koenzim (turunan vitamin).',
    difficulty: 'Mudah',
    keyConcept: 'Kofaktor Anorganik'
  },
  // Kisi-kisi No 6
  {
    id: 'kisi-6',
    kisiKisiNumber: 6,
    moduleId: 'modul-2',
    moduleTitle: 'Enzim',
    question: 'Nama kesatuan enzim fungsional yang tersusun dari apoenzim yang terikat dengan komponen nonprotein dinamakan...',
    options: ['Holoenzim', 'Koenzim', 'Katalisator bebas', 'Isoenzim', 'Zimogen'],
    correctAnswer: 0,
    explanation: 'Kesatuan apoenzim (protein) dan komponen nonprotein menghasilkan holoenzim yang memiliki aktivitas katalisis sempurna.',
    difficulty: 'Mudah',
    keyConcept: 'Struktur Holoenzim'
  },
  // Kisi-kisi No 7
  {
    id: 'kisi-7',
    kisiKisiNumber: 7,
    moduleId: 'modul-2',
    moduleTitle: 'Enzim',
    question: 'Jika disajikan grafik energi potensial reaksi kimia dengan dan tanpa enzim, pengaruh keberadaan enzim terhadap energi aktivasi dan kecepatan reaksi adalah...',
    options: [
      'Energi aktivasi dinaikkan sehingga kecepatan reaksi meningkat',
      'Energi aktivasi diturunkan sehingga kecepatan reaksi meningkat pesat',
      'Energi aktivasi dan kecepatan reaksi keduanya diturunkan',
      'Energi aktivasi tetap, kecepatan reaksi bertambah karena suhu naik',
      'Energi aktivasi dihilangkan total menjadi 0'
    ],
    correctAnswer: 1,
    explanation: 'Enzim menurunkan bukit energi aktivasi (Ea). Dengan Ea yang lebih rendah, lebih banyak molekul substrat mencapai keadaan transisi sehingga kecepatan reaksi meningkat signifikan.',
    difficulty: 'Sedang',
    keyConcept: 'Grafik Energi Aktivasi'
  },
  // Kisi-kisi No 8
  {
    id: 'kisi-8',
    kisiKisiNumber: 8,
    moduleId: 'modul-2',
    moduleTitle: 'Enzim',
    question: 'Enzim memiliki sifat spesifik dalam mengenali substrat tertentu. Makna dari sifat spesifik ini adalah...',
    options: [
      'Satu enzim dapat mempercepat semua jenis reaksi kimia di dalam sel',
      'Satu enzim hanya dapat mengkatalisis satu jenis reaksi atau substrat tertentu yang cocok',
      'Enzim hanya bekerja pada suhu dan tekanan yang sangat ekstrem',
      'Enzim dapat mengubah bentuk substrat menjadi jenis enzim baru',
      'Enzim tidak dipengaruhi oleh konsentrasi molekul di sekitarnya'
    ],
    correctAnswer: 1,
    explanation: 'Sifat spesifisitas enzim berarti bahwa bentuk sisi aktif enzim hanya dapat berinteraksi secara pas dengan substrat tertentu yang memiliki struktur molekul sesuai.',
    difficulty: 'Mudah',
    keyConcept: 'Spesifisitas Enzim'
  },
  // Kisi-kisi No 9
  {
    id: 'kisi-9',
    kisiKisiNumber: 9,
    moduleId: 'modul-2',
    moduleTitle: 'Enzim',
    question: 'Zat kimia yang dapat menghambat atau menghentikan perlekatan antara enzim dengan molekul substrat disebut...',
    options: ['Aktivator', 'Inhibitor', 'Katalisator', 'Koenzim', 'Promotor'],
    correctAnswer: 1,
    explanation: 'Inhibitor adalah molekul penghambat yang menurunkan aktivitas katalisis enzim dengan mengganggu ikatan antara enzim dan substrat.',
    difficulty: 'Mudah',
    keyConcept: 'Definisi Inhibitor'
  },
  // Kisi-kisi No 10
  {
    id: 'kisi-10',
    kisiKisiNumber: 10,
    moduleId: 'modul-2',
    moduleTitle: 'Enzim',
    question: 'Inhibitor nonkompetitif berbeda dengan inhibitor kompetitif karena inhibitor nonkompetitif berikatan pada enzim pada bagian...',
    options: [
      'Sisi aktif enzim dan bersaing langsung dengan substrat',
      'Sisi alosterik (di luar sisi aktif) sehingga mengubah konformasi sisi aktif enzim',
      'Ujung rantai DNA seluler',
      'Molekul air di dalam sitoplasma',
      'Gugus prostetik secara kovalen permanen'
    ],
    correctAnswer: 1,
    explanation: 'Inhibitor nonkompetitif menempel pada sisi alosterik (sisi selain sisi aktif), menyebabkan perubahan konformasi tiga dimensi sisi aktif sehingga substrat tidak dapat berikatan.',
    difficulty: 'Sedang',
    keyConcept: 'Inhibitor Nonkompetitif & Sisi Alosterik'
  },
  // Kisi-kisi No 11
  {
    id: 'kisi-11',
    kisiKisiNumber: 11,
    moduleId: 'modul-2',
    moduleTitle: 'Enzim',
    question: 'Berikut ini faktor yang BUKAN merupakan faktor utama yang mempengaruhi aktivitas enzim adalah...',
    options: [
      'Suhu lingkungan reaksi',
      'Derajat keasaman (pH)',
      'Konsentrasi enzim dan konsentrasi substrat',
      'Volume wadah tempat reaksi berlangsung',
      'Keberadaan zat inhibitor'
    ],
    correctAnswer: 3,
    explanation: 'Faktor utama yang mempengaruhi kerja enzim adalah suhu, pH, konsentrasi enzim, konsentrasi substrat, dan inhibitor. Volume wadah tidak mempengaruhi kecepatan kinetika enzim secara intrinsik.',
    difficulty: 'Mudah',
    keyConcept: 'Faktor Pengaruh Aktivitas Enzim'
  },
  // Kisi-kisi No 12
  {
    id: 'kisi-12',
    kisiKisiNumber: 12,
    moduleId: 'modul-2',
    moduleTitle: 'Enzim',
    question: 'Berdasarkan grafik hubungan aktivitas enzim manusia terhadap suhu, enzim bekerja paling optimal pada rentang suhu...',
    options: ['0°C - 10°C', '20°C - 25°C', '37°C - 40°C', '60°C - 70°C', '90°C - 100°C'],
    correctAnswer: 2,
    explanation: 'Suhu optimum kerja enzim pada tubuh manusia umumnya berkisar antara 37°C hingga 40°C. Di atas suhu tersebut enzim akan terdenaturasi.',
    difficulty: 'Mudah',
    keyConcept: 'Suhu Optimum Enzim'
  },
  // Kisi-kisi No 13
  {
    id: 'kisi-13',
    kisiKisiNumber: 13,
    moduleId: 'modul-2',
    moduleTitle: 'Enzim',
    question: 'Jika disajikan gambar mekanisme kerja di mana bentuk sisi aktif enzim berubah secara fleksibel mengikuti bentuk substrat saat berikatan, teori tersebut adalah...',
    options: [
      'Teori Gembok dan Kunci (Lock and Key Theory)',
      'Teori Ketepatan Induksi (Induced Fit Theory)',
      'Teori Reduksi Oksidasi',
      'Teori Kemiosmosis Mitokondria',
      'Teori Spontaneus Dinamis'
    ],
    correctAnswer: 1,
    explanation: 'Teori Induced Fit (Ketepatan Induksi) dikemukakan oleh Koshland: sisi aktif enzim bersifat lentur/fleksibel dan menyesuaikan bentuk konformasinya ketika substrat mendekat.',
    difficulty: 'Sedang',
    keyConcept: 'Teori Induced Fit'
  },
  // Kisi-kisi No 14
  {
    id: 'kisi-14',
    kisiKisiNumber: 14,
    moduleId: 'modul-1',
    moduleTitle: 'Metabolisme Sel',
    question: 'Tahap respirasi aerob yang secara spesifik mengubah asam piruvat menjadi asetil-KoA adalah...',
    options: [
      'Glikolisis',
      'Dekarboksilasi Oksidatif',
      'Siklus Krebs',
      'Sistem Transpor Elektron',
      'Fermentasi asam laktat'
    ],
    correctAnswer: 1,
    explanation: 'Dekarboksilasi Oksidatif (reaksi antara/transisi) terjadi di matriks mitokondria, mengubah 2 asam piruvat (3C) menjadi 2 asetil-KoA (2C) dengan melepaskan 2 CO2 dan menghasilkan 2 NADH.',
    difficulty: 'Mudah',
    keyConcept: 'Dekarboksilasi Oksidatif'
  },
  // Kisi-kisi No 15
  {
    id: 'kisi-15',
    kisiKisiNumber: 15,
    moduleId: 'modul-1',
    moduleTitle: 'Metabolisme Sel',
    question: 'Lokasi berlangsungnya Siklus Krebs di dalam sel eukariotik adalah...',
    options: [
      'Sitosol / sitoplasma',
      'Membran luar mitokondria',
      'Matriks mitokondria',
      'Krista (membran dalam) mitokondria',
      'Stroma kloroplas'
    ],
    correctAnswer: 2,
    explanation: 'Siklus Krebs (siklus asam sitrat) berlangsung di dalam Matriks Mitokondria.',
    difficulty: 'Mudah',
    keyConcept: 'Lokasi Siklus Krebs'
  },
  // Kisi-kisi No 16
  {
    id: 'kisi-16',
    kisiKisiNumber: 16,
    moduleId: 'modul-1',
    moduleTitle: 'Metabolisme Sel',
    question: 'Pada awal siklus Krebs, asetil-KoA (2C) akan mengalami perubahan yaitu...',
    options: [
      'Dipecah langsung menjadi 2 molekul CO2 bebas',
      'Bergabung dengan asam oksaloasetat (4C) membentuk asam sitrat (6C)',
      'Direduksi oleh FADH2 menjadi asam piruvat',
      'Diubah menjadi asam laktat oleh enzim dehidrogenase',
      'Bereaksi dengan oksigen membentuk air'
    ],
    correctAnswer: 1,
    explanation: 'Awal siklus Krebs dimulai saat Asetil-KoA (2C) berikatan dengan asam oksaloasetat (4C) dikatalisis oleh enzim sitrat sintase untuk membentuk molekul asam sitrat (6C).',
    difficulty: 'Sedang',
    keyConcept: 'Reaksi Awal Siklus Krebs'
  },
  // Kisi-kisi No 17
  {
    id: 'kisi-17',
    kisiKisiNumber: 17,
    moduleId: 'modul-1',
    moduleTitle: 'Metabolisme Sel',
    question: 'Urutan tahapan respirasi aerob seluler yang tepat secara berurutan adalah...',
    options: [
      'Glikolisis → Siklus Krebs → Dekarboksilasi Oksidatif → Transpor Elektron',
      'Glikolisis → Dekarboksilasi Oksidatif → Siklus Krebs → Transpor Elektron',
      'Dekarboksilasi Oksidatif → Glikolisis → Siklus Krebs → Transpor Elektron',
      'Siklus Krebs → Glikolisis → Transpor Elektron → Dekarboksilasi Oksidatif',
      'Transpor Elektron → Glikolisis → Dekarboksilasi Oksidatif → Siklus Krebs'
    ],
    correctAnswer: 1,
    explanation: 'Urutan tahapan respirasi aerob yang benar: 1) Glikolisis, 2) Dekarboksilasi Oksidatif, 3) Siklus Krebs, 4) Sistem Transpor Elektron.',
    difficulty: 'Mudah',
    keyConcept: 'Urutan Tahapan Respirasi Aerob'
  },
  // Kisi-kisi No 18
  {
    id: 'kisi-18',
    kisiKisiNumber: 18,
    moduleId: 'modul-1',
    moduleTitle: 'Metabolisme Sel',
    question: 'Hasil akhir siklus Krebs dari perombakan 1 molekul glukosa (2 putaran siklus dari 2 asetil-KoA) adalah...',
    options: [
      '2 ATP, 2 FADH2, 4 CO2, dan 6 NADH',
      '4 ATP, 2 FADH2, 2 CO2, dan 2 NADH',
      '1 ATP, 1 FADH2, 2 CO2, dan 3 NADH',
      '2 ATP, 10 NADH, 6 H2O, dan 2 CO2',
      '34 ATP, 6 H2O, dan 0 CO2'
    ],
    correctAnswer: 0,
    explanation: 'Dari 1 molekul glukosa dihasilkan 2 asetil-KoA, sehingga siklus Krebs berputar 2 kali dan menghasilkan total: 2 ATP, 2 FADH2, 4 CO2, dan 6 NADH.',
    difficulty: 'Sedang',
    keyConcept: 'Hasil Akhir Siklus Krebs'
  },
  // Kisi-kisi No 19
  {
    id: 'kisi-19',
    kisiKisiNumber: 19,
    moduleId: 'modul-1',
    moduleTitle: 'Metabolisme Sel',
    question: 'Fenomena kelelahan dan rasa pegal pada otot setelah melakukan aktivitas fisik berat berhubungan dengan respirasi anaerob karena...',
    options: [
      'Otot kekurangan glukosa sehingga asam piruvat berubah menjadi alkohol',
      'Oksigen terbatas sehingga asam piruvat direduksi menjadi asam laktat yang menumpuk di jaringan otot',
      'Mitokondria otot melepaskan racun sianida',
      'Kadar gas CO2 di dalam sel otot habis terpakai',
      'Terjadi penumpukan molekul ATP yang berlebihan di sitoplasma'
    ],
    correctAnswer: 1,
    explanation: 'Saat kebutuhan oksigen melampaui pasokan, sel otot melakukan respirasi anaerob. Asam piruvat direduksi menjadi asam laktat yang tertimbun di otot dan menyebabkan kelelahan.',
    difficulty: 'Sedang',
    keyConcept: 'Kelelahan Otot & Asam Laktat'
  },
  // Kisi-kisi No 20
  {
    id: 'kisi-20',
    kisiKisiNumber: 20,
    moduleId: 'modul-1',
    moduleTitle: 'Metabolisme Sel',
    question: 'Jumlah ATP bersih yang dihasilkan pada proses respirasi anaerob (fermentasi) per 1 molekul glukosa adalah...',
    options: ['2 ATP', '4 ATP', '32 ATP', '36 ATP', '38 ATP'],
    correctAnswer: 0,
    explanation: 'Respirasi anaerob hanya menghasilkan 2 ATP bersih per molekul glukosa yang berasal dari tahap glikolisis murni.',
    difficulty: 'Mudah',
    keyConcept: 'Jumlah ATP Respirasi Anaerob'
  },
  // Kisi-kisi No 21
  {
    id: 'kisi-21',
    kisiKisiNumber: 21,
    moduleId: 'modul-1',
    moduleTitle: 'Metabolisme Sel',
    question: 'Proses yang terjadi pada reaksi gelap (Siklus Calvin) fotosintesis berdasarkan tempat dan tahapan reaksinya adalah...',
    options: [
      'Berlangsung di grana, melibatkan fotolisis air dan pelepasan oksigen',
      'Berlangsung di stroma, melibatkan fiksasi CO2 oleh RuBP, reduksi PGA menjadi PGAL, dan regenerasi RuBP',
      'Berlangsung di tilakoid, menghasilkan ATP dan NADPH',
      'Berlangsung di membran luar kloroplas, menghasilkan klorofil a',
      'Berlangsung di sitoplasma, memecah glukosa menjadi asam piruvat'
    ],
    correctAnswer: 1,
    explanation: 'Reaksi gelap (Siklus Calvin) berlangsung di STROMA kloroplas, terdiri atas tahap fiksasi CO2 oleh RuBP dengan bantuan enzim Rubisco, reduksi PGA menjadi PGAL, dan regenerasi RuBP menghasilkan glukosa.',
    difficulty: 'Sedang',
    keyConcept: 'Reaksi Gelap Siklus Calvin'
  },
  // Kisi-kisi No 22
  {
    id: 'kisi-22',
    kisiKisiNumber: 22,
    moduleId: 'modul-1',
    moduleTitle: 'Metabolisme Sel',
    question: 'Pada percobaan Ingenhousz menggunakan tanaman air Hydrilla verticillata, penyebab terbentuknya gelembung gas di ujung tabung reaksi adalah...',
    options: [
      'Pelepasan gas nitrogen dari penguraian air oleh klorofil',
      'Pelepasan gas oksigen (O2) yang dihasilkan dari fotolisis air selama reaksi terang fotosintesis',
      'Pelepasan gas karbon dioksida hasil pernapasan tanaman Hydrilla',
      'Penguapan air akibat kenaikan suhu di bawah sinar matahari',
      'Gas hidrogen yang terbentuk dari reduksi NADPH'
    ],
    correctAnswer: 1,
    explanation: 'Percobaan Ingenhousz membuktikan fotosintesis menghasilkan gas Oksigen (O2), yang bersumber dari fotolisis molekul air (H2O) saat reaksi terang.',
    difficulty: 'Sedang',
    keyConcept: 'Percobaan Ingenhousz & Gas O2'
  },
  // Kisi-kisi No 23
  {
    id: 'kisi-23',
    kisiKisiNumber: 23,
    moduleId: 'modul-1',
    moduleTitle: 'Metabolisme Sel',
    question: 'Peristiwa yang berlangsung secara spesifik pada reaksi terang fotosintesis adalah...',
    options: [
      'Fiksasi gas CO2 oleh ribulosa bifosfat (RuBP)',
      'Fotolisis air menghasilkan elektron, H+, dan melepaskan O2 serta fotofosforilasi menghasilkan ATP dan NADPH',
      'Pembentukan glukosa dari senyawa PGAL di stroma',
      'Regenerasi RuBP dari sisa molekul PGAL',
      'Perombakan glukosa menjadi energi kimia'
    ],
    correctAnswer: 1,
    explanation: 'Reaksi terang memanfaatkan foton untuk fotolisis air melepaskan O2, serta memproduksi ATP dan NADPH sebagai sumber energi bagi reaksi gelap.',
    difficulty: 'Sedang',
    keyConcept: 'Peristiwa Reaksi Terang'
  },
  // Kisi-kisi No 24
  {
    id: 'kisi-24',
    kisiKisiNumber: 24,
    moduleId: 'modul-1',
    moduleTitle: 'Metabolisme Sel',
    question: 'Bagian kloroplas berupa cairan kental tempat berlangsungnya reaksi gelap (Siklus Calvin) dinamakan...',
    options: ['Tilakoid', 'Grana', 'Stroma', 'Membran luar', 'Lamel matriks'],
    correctAnswer: 2,
    explanation: 'Reaksi gelap fotosintesis berlangsung di STROMA (matriks cairan di dalam kloroplas).',
    difficulty: 'Mudah',
    keyConcept: 'Bagian Kloroplas Reaksi Gelap'
  },
  // Kisi-kisi No 25
  {
    id: 'kisi-25',
    kisiKisiNumber: 25,
    moduleId: 'modul-1',
    moduleTitle: 'Metabolisme Sel',
    question: 'Jika pada gambar struktur kloroplas ditunjukkan tumpukan cakram tilakoid (grana), proses yang berlangsung pada bagian tersebut adalah...',
    options: [
      'Reaksi terang (penangkapan foton cahaya dan fotolisis air)',
      'Fiksasi CO2 oleh enzim Rubisco',
      'Siklus Calvin menghasilkan karbohidrat',
      'Penyimpanan cadangan amilum',
      'Respirasi seluler dekarboksilasi'
    ],
    correctAnswer: 0,
    explanation: 'Tilakoid/Grana mengandung pigmen klorofil dan fotosistem yang menjadi tempat berlangsungnya reaksi terang fotosintesis.',
    difficulty: 'Mudah',
    keyConcept: 'Fungsi Grana / Tilakoid'
  },
  // Kisi-kisi No 26
  {
    id: 'kisi-26',
    kisiKisiNumber: 26,
    moduleId: 'modul-3',
    moduleTitle: 'Substansi Genetik',
    question: 'Berdasarkan karakteristik strukturalnya, molekul materi genetik DNA memiliki ciri khas yang membedakannya dari RNA, yaitu...',
    options: [
      'Memiliki rantai tunggal pendek dengan gula ribosa dan basa urasil',
      'Memiliki rantai ganda berpilin (double helix) dengan gula deoksiribosa dan basa timin',
      'Hanya ditemukan di dalam sitoplasma dan ribosom',
      'Tidak memiliki gugus fosfat pada nukleotidanya',
      'Kadar dan komposisinya selalu berubah-ubah sesuai sintesis protein'
    ],
    correctAnswer: 1,
    explanation: 'DNA berbentuk rantai ganda berpilin (double helix), mengandung gula pentosa deoksiribosa, serta basa pirimidin berupa Timin (berpasangan dengan Adenin).',
    difficulty: 'Mudah',
    keyConcept: 'Struktur DNA vs RNA'
  },
  // Kisi-kisi No 27
  {
    id: 'kisi-27',
    kisiKisiNumber: 27,
    moduleId: 'modul-3',
    moduleTitle: 'Substansi Genetik',
    question: 'Jenis kromosom yang secara khusus berperan dalam menentukan jenis kelamin suatu organisme disebut...',
    options: ['Autosom', 'Gonosom', 'Sentrosom', 'Nukleosom', 'Kromonema'],
    correctAnswer: 1,
    explanation: 'Gonosom adalah kromosom kelamin (kromosom seks X dan Y), sedangkan autosom adalah kromosom tubuh.',
    difficulty: 'Mudah',
    keyConcept: 'Gonosom vs Autosom'
  },
  // Kisi-kisi No 28
  {
    id: 'kisi-28',
    kisiKisiNumber: 28,
    moduleId: 'modul-3',
    moduleTitle: 'Substansi Genetik',
    question: 'Kromosom yang memiliki sentromer tepat di tengah membagi lengan sama panjang disebut kromosom metasentris, sedangkan kromosom yang sentromernya terletak sangat dekat dengan salah satu ujung sehingga satu lengan sangat pendek disebut...',
    options: ['Submetasentris', 'Akrosentris', 'Telosentris', 'Polisentris', 'Asentris'],
    correctAnswer: 1,
    explanation: 'Akrosentris memiliki sentromer dekat dengan ujung lengan membentuk huruf J, sedangkan telosentris sentromernya tepat di ujung membentuk huruf I.',
    difficulty: 'Mudah',
    keyConcept: 'Morfologi Bentuk Kromosom'
  },
  // Kisi-kisi No 29
  {
    id: 'kisi-29',
    kisiKisiNumber: 29,
    moduleId: 'modul-3',
    moduleTitle: 'Substansi Genetik',
    question: 'Pernyataan berikut yang BENAR mengenai sifat dan karakteristik gen sebagai substansi hereditas adalah...',
    options: [
      'Gen adalah protein utuh yang membungkus kromosom tubuh',
      'Gen menempati lokus spesifik pada kromosom dan mengandung kode informasi genetik berupa urutan basa nitrogen',
      'Gen hanya dapat diwariskan dari pihak induk jantan saja',
      'Gen tidak dapat mengalami penggandaan saat sel membelah',
      'Gen selalu aktif mengekspresikan protein tanpa regulasi'
    ],
    correctAnswer: 1,
    explanation: 'Gen adalah unit hereditas yang menempati lokus tertentu pada kromosom, tersusun atas urutan basa nukleotida yang mengodekan rantai polipeptida/sifat organisme.',
    difficulty: 'Sedang',
    keyConcept: 'Karakteristik Gen'
  },
  // Kisi-kisi No 30
  {
    id: 'kisi-30',
    kisiKisiNumber: 30,
    moduleId: 'modul-3',
    moduleTitle: 'Substansi Genetik',
    question: 'Kondisi genotipe yang menyebabkan gen letal menimbulkan kematian pada suatu individu umumnya terjadi pada keadaan...',
    options: [
      'Heterozigot dominan maupun heterozigot resesif',
      'Homozigot (baik homozigot dominan maupun homozigot resesif)',
      'Hanya saat sel berada dalam kondisi triploid',
      'Hemizigot pada semua kromosom tubuh',
      'Kondisi poliploidi kromosom'
    ],
    correctAnswer: 1,
    explanation: 'Gen letal menimbulkan kematian dalam kondisi HOMOZIGOT: letal dominan (mati dalam homozigot dominan) atau letal resesif (mati dalam homozigot resesif). Dalam kondisi heterozigot individu biasanya hidup (subletal atau carrier).',
    difficulty: 'Sedang',
    keyConcept: 'Kondisi Genotipe Gen Letal'
  },
  // Kisi-kisi No 31
  {
    id: 'kisi-31',
    kisiKisiNumber: 31,
    moduleId: 'modul-3',
    moduleTitle: 'Substansi Genetik',
    question: 'Perhatikan tahapan sintesis protein berikut:\n(1) mRNA keluar dari nukleus menuju ribosom\n(2) Pilinan heliks ganda DNA dibuka oleh RNA polimerase\n(3) Terbentuk rantai polipeptida asam amino\n(4) Pencetakan mRNA oleh rantai DNA antisense di nukleus\n(5) tRNA membawa asam amino sesuai kodon mRNA di ribosom\nUrutan proses sintesis protein yang tepat adalah...',
    options: [
      '(2) → (4) → (1) → (5) → (3)',
      '(1) → (2) → (4) → (5) → (3)',
      '(4) → (2) → (1) → (3) → (5)',
      '(2) → (1) → (4) → (3) → (5)',
      '(5) → (4) → (2) → (1) → (3)'
    ],
    correctAnswer: 0,
    explanation: 'Urutan sintesis protein: (2) DNA dibuka → (4) Transkripsi mencetak mRNA → (1) mRNA menuju ribosom → (5) tRNA mencocokkan asam amino → (3) Polipeptida terbentuk.',
    difficulty: 'Sedang',
    keyConcept: 'Urutan Tahapan Sintesis Protein'
  },
  // Kisi-kisi No 32
  {
    id: 'kisi-32',
    kisiKisiNumber: 32,
    moduleId: 'modul-3',
    moduleTitle: 'Substansi Genetik',
    question: 'Tempat berlangsungnya proses transkripsi sintesis protein di dalam sel eukariotik adalah...',
    options: ['Ribosom', 'Retikulum Endoplasma Kasar', 'Inti Sel (Nukleus)', 'Badan Golgi', 'Sentrosom'],
    correctAnswer: 2,
    explanation: 'Transkripsi (pencetakan mRNA dari template DNA) berlangsung di dalam Inti Sel (Nukleus). Translasi berlangsung di Ribosom.',
    difficulty: 'Mudah',
    keyConcept: 'Lokasi Transkripsi'
  },
  // Kisi-kisi No 33
  {
    id: 'kisi-33',
    kisiKisiNumber: 33,
    moduleId: 'modul-3',
    moduleTitle: 'Substansi Genetik',
    question: 'Jika rantai DNA sense memiliki urutan basa: 5\'- ATG - CGA - TCT - 3\', maka urutan basa nitrogen pada rantai mRNA hasil transkripsi adalah...',
    options: [
      '5\'- TAC - GCT - AGA - 3\'',
      '5\'- UAC - GCU - AGA - 3\'',
      '5\'- AUG - CGA - UCU - 3\'',
      '5\'- AUC - CGU - UCU - 3\'',
      '5\'- UAG - CGA - UCU - 3\''
    ],
    correctAnswer: 2,
    explanation: 'DNA sense memiliki urutan basa yang identik dengan mRNA (kodon), dengan satu-satunya perbedaan adalah basa Timin (T) pada DNA diganti menjadi Urasil (U) pada mRNA. Maka 5\'-ATG-CGA-TCT-3\' menjadi 5\'-AUG-CGA-UCU-3\'.',
    difficulty: 'Sedang',
    keyConcept: 'Pasangan Basa DNA Sense ke mRNA'
  },
  // Kisi-kisi No 34
  {
    id: 'kisi-34',
    kisiKisiNumber: 34,
    moduleId: 'modul-3',
    moduleTitle: 'Substansi Genetik',
    question: 'Diberikan rantai DNA antisense: 3\'- TAC - GAA - TGA - ACT - 5\'. Diketahui kode asam amino: AUG = Metionin, CUU = Leusin, ACU = Treonin, UGA = Stop. Rangkaian asam amino yang terbentuk adalah...',
    options: [
      'Metionin - Leusin - Treonin',
      'Metionin - Valin - Glisin',
      'Leusin - Metionin - Treonin',
      'Treonin - Leusin - Metionin',
      'Hanya menghasilkan Metionin saja'
    ],
    correctAnswer: 0,
    explanation: 'DNA antisense 3\'-TAC-GAA-TGA-ACT-5\' ditranskripsi menjadi mRNA: 5\'-AUG-CUU-ACU-UGA-3\'. Kodon AUG = Metionin, CUU = Leusin, ACU = Treonin, UGA = Stop. Maka asam aminonya: Metionin - Leusin - Treonin.',
    difficulty: 'HOTS',
    keyConcept: 'Penentuan Asam Amino dari Kodon'
  },
  // Kisi-kisi No 35
  {
    id: 'kisi-35',
    kisiKisiNumber: 35,
    moduleId: 'modul-4',
    moduleTitle: 'Pembelahan Sel',
    question: 'Tahap pembelahan mitosis ketika kromosom mengalami kondensasi maksimal dan berjejer rapi di bidang ekuator sehingga dapat diamati dan dihitung dengan paling jelas adalah...',
    options: ['Profase', 'Metafase', 'Anafase', 'Telofase', 'Interfase'],
    correctAnswer: 1,
    explanation: 'Metafase adalah waktu terbaik untuk mengamati morfologi kromosom (kariotipe) karena kromosom berada di pelat ekuator dengan ketebalan maksimal.',
    difficulty: 'Mudah',
    keyConcept: 'Metafase & Pengamatan Kromosom'
  },
  // Kisi-kisi No 36
  {
    id: 'kisi-36',
    kisiKisiNumber: 36,
    moduleId: 'modul-4',
    moduleTitle: 'Pembelahan Sel',
    question: 'Pernyataan berikut yang TIDAK TEPAT dalam membedakan mitosis dan meiosis adalah...',
    options: [
      'Mitosis terjadi pada sel tubuh (somatis), sedangkan meiosis pada sel germinal kelamin',
      'Mitosis menghasilkan 2 sel anakan diploid (2n), sedangkan meiosis menghasilkan 4 sel anakan haploid (n)',
      'Pada mitosis terjadi pembelahan reduksi kromosom, sedangkan pada meiosis tidak terjadi reduksi',
      'Meiosis melibatkan peristiwa pindah silang (crossing over) pada profase I, sedangkan mitosis tidak',
      'Mitosis bertujuan untuk pertumbuhan dan regenerasi jaringan'
    ],
    correctAnswer: 2,
    explanation: 'Pernyataan yang TIDAK tepat adalah opsi C, karena pembelahan reduksi justru terjadi pada MEIOSIS (2n → n), sedangkan mitosis mempertahankan jumlah kromosom (2n → 2n).',
    difficulty: 'Sedang',
    keyConcept: 'Perbandingan Mitosis vs Meiosis'
  },
  // Kisi-kisi No 37
  {
    id: 'kisi-37',
    kisiKisiNumber: 37,
    moduleId: 'modul-4',
    moduleTitle: 'Pembelahan Sel',
    question: 'Ciri visual visual kromosom di mana kromatid saudara telah terpisah di sentromer dan ditarik oleh benang gelendong menuju ke dua kutub yang berlawanan menunjukkan fase...',
    options: ['Profase', 'Metafase', 'Anafase', 'Telofase', 'Sitokinesis'],
    correctAnswer: 2,
    explanation: 'Pemisahan kromatid saudara menuju kutub berlawanan adalah ciri visual khas fase ANAFASE mitosis.',
    difficulty: 'Mudah',
    keyConcept: 'Ciri Visual Anafase'
  },
  // Kisi-kisi No 38
  {
    id: 'kisi-38',
    kisiKisiNumber: 38,
    moduleId: 'modul-4',
    moduleTitle: 'Pembelahan Sel',
    question: 'Jika disajikan gambar sel di mana membran inti mulai terbentuk kembali, kromosom mengendur menjadi benang kromatin, dan terbentuk lekukan sitokinesis menghasilkan dua sel anak, fase tersebut adalah...',
    options: ['Profase', 'Metafase', 'Anafase', 'Telofase', 'Fase S'],
    correctAnswer: 3,
    explanation: 'Pembentukan kembali membran inti dan terjadinya sitokinesis adalah peristiwa pada tahap TELOFASE.',
    difficulty: 'Mudah',
    keyConcept: 'Identifikasi Gambar Telofase'
  },
  // Kisi-kisi No 39
  {
    id: 'kisi-39',
    kisiKisiNumber: 39,
    moduleId: 'modul-4',
    moduleTitle: 'Pembelahan Sel',
    question: 'Pada proses spermatogenesis, tahap sel yang mengalami pembelahan MEIOSIS I secara tepat adalah...',
    options: [
      'Spermatogonium membelah menjadi spermatosit primer',
      'Spermatosit primer (2n) membelah menjadi dua spermatosit sekunder (n)',
      'Spermatosit sekunder membelah menjadi spermatid',
      'Spermatid berdiferensiasi menjadi spermatozoa',
      'Spermatozoa mengalami pematangan di epididimis'
    ],
    correctAnswer: 1,
    explanation: 'Pembelahan Meiosis I terjadi saat Spermatosit Primer (2n) membelah reduksi menghasilkan 2 Spermatosit Sekunder (n).',
    difficulty: 'Sedang',
    keyConcept: 'Tahap Meiosis I Spermatogenesis'
  },
  // Kisi-kisi No 40
  {
    id: 'kisi-40',
    kisiKisiNumber: 40,
    moduleId: 'modul-4',
    moduleTitle: 'Pembelahan Sel',
    question: 'Jika pada gambar pembelahan sel ditunjukkan pasangan kromosom homolog saling berhadapan di bidang ekuator dengan benang spindel terikat pada sentromernya, peristiwa ini terjadi pada...',
    options: [
      'Metafase Mitosis',
      'Metafase I Meiosis',
      'Metafase II Meiosis',
      'Anafase I Meiosis',
      'Profase I Meiosis'
    ],
    correctAnswer: 1,
    explanation: 'Berjejernya pasangan KROMOSOM HOMOLOG (tetrad) dalam dua baris di bidang pembelahan terjadi pada Metafase I Meiosis. Pada metafase mitosis kromosom berjejer dalam satu baris tunggal.',
    difficulty: 'HOTS',
    keyConcept: 'Posisi Kromosom Metafase I Meiosis'
  },
  // Kisi-kisi No 41
  {
    id: 'kisi-41',
    kisiKisiNumber: 41,
    moduleId: 'modul-4',
    moduleTitle: 'Pembelahan Sel',
    question: 'Berdasarkan diagram siklus sel eukariotik, fase terjadinya replikasi atau penggandaan materi genetik DNA adalah...',
    options: [
      'Fase G1 (Gap 1)',
      'Fase S (Sintesis) dari Interfase',
      'Fase G2 (Gap 2)',
      'Fase M (Mitotik)',
      'Fase Sitokinesis'
    ],
    correctAnswer: 1,
    explanation: 'Replikasi DNA dan duplikasi kromosom berlangsung secara eksklusif pada FASE S (Sintesis) Interfase.',
    difficulty: 'Mudah',
    keyConcept: 'Fase Replikasi DNA Siklus Sel'
  },
  // Kisi-kisi No 42
  {
    id: 'kisi-42',
    kisiKisiNumber: 42,
    moduleId: 'modul-4',
    moduleTitle: 'Pembelahan Sel',
    question: 'Berdasarkan tahapan pembentukannya pada oogenesis, sel oosit primer (2n) dihasilkan langsung dari pembelahan...',
    options: [
      'Mitosis dari sel induk oogonium (2n)',
      'Meiosis I dari sel oosit sekunder',
      'Fertilisasi ovum oleh sperma',
      'Diferensiasi badan polar pertama',
      'Meiosis II dari ootid'
    ],
    correctAnswer: 0,
    explanation: 'Oosit primer (2n) terbentuk dari pembelahan mitosis dan pertumbuhan sel induk telur (oogonium 2n) di ovarium.',
    difficulty: 'Sedang',
    keyConcept: 'Pembentukan Oosit Primer Oogenesis'
  },
  // Kisi-kisi No 43
  {
    id: 'kisi-43',
    kisiKisiNumber: 43,
    moduleId: 'modul-5',
    moduleTitle: 'Pewarisan Sifat',
    question: 'Berikut ini yang BUKAN merupakan alasan Mendel memilih tanaman kacang ercis (Pisum sativum) sebagai objek penelitian genetika adalah...',
    options: [
      'Mudah disilangkan dan dapat melakukan penyerbukan sendiri',
      'Memiliki daur hidup yang relatif pendek / cepat menghasilkan keturunan',
      'Memiliki waktu hidup bertahun-tahun sebelum menghasilkan biji pertama kali',
      'Menghasilkan banyak keturunan dalam sekali perkawinan',
      'Memiliki variasi pasangan sifat beda yang mencolok dan kontras'
    ],
    correctAnswer: 2,
    explanation: 'Kacang ercis dipilih justru karena cepat menghasilkan keturunan (daur hidup singkat), bukan karena memiliki masa hidup bertahun-tahun.',
    difficulty: 'Mudah',
    keyConcept: 'Alasan Pemilihan Pisum sativum'
  },
  // Kisi-kisi No 44
  {
    id: 'kisi-44',
    kisiKisiNumber: 44,
    moduleId: 'modul-5',
    moduleTitle: 'Pewarisan Sifat',
    question: 'Pada persilangan monohibrid dominan penuh antara tanaman berbiji bulat (BB) dengan berbiji kerut (bb), perbandingan fenotipe keturunan F2 yang dihasilkan adalah...',
    options: ['1 : 2 : 1', '3 : 1', '9 : 3 : 3 : 1', '15 : 1', '9 : 7'],
    correctAnswer: 1,
    explanation: 'Pada persilangan monohibrid dominan penuh Bb x Bb, perbandingan fenotipe F2 adalah 3 Bulat : 1 Kerut (rasio 3 : 1). Rasio genotipenya adalah 1 BB : 2 Bb : 1 bb (1 : 2 : 1).',
    difficulty: 'Mudah',
    keyConcept: 'Rasio Fenotipe F2 Monohibrid'
  },
  // Kisi-kisi No 45
  {
    id: 'kisi-45',
    kisiKisiNumber: 45,
    moduleId: 'modul-5',
    moduleTitle: 'Pewarisan Sifat',
    question: 'Tanaman bunga merah (MM) disilangkan dengan bunga putih (mm) menghasilkan F1 seluruhnya bunga merah muda (Mm/intermediat). Jika F1 disilangkan sesamanya dan menghasilkan 80 tanaman F2, maka jumlah tanaman yang berfenotipe merah muda adalah...',
    options: ['20 tanaman', '40 tanaman', '60 tanaman', '80 tanaman', '10 tanaman'],
    correctAnswer: 1,
    explanation: 'Rasio fenotipe F2 intermediat adalah 1 Merah : 2 Merah Muda : 1 Putih. Proporsi merah muda = 2/4 = 1/2. Jumlah tanaman merah muda = 1/2 x 80 = 40 tanaman.',
    difficulty: 'Sedang',
    keyConcept: 'Kalkulasi Keturunan Intermediat'
  },
  // Kisi-kisi No 46
  {
    id: 'kisi-46',
    kisiKisiNumber: 46,
    moduleId: 'modul-5',
    moduleTitle: 'Pewarisan Sifat',
    question: 'Suatu individu memiliki genotipe AaBbCcDD. Berdasarkan jumlah pasangan gen heterozigotnya, jumlah macam gamet yang dapat dibentuk adalah...',
    options: ['4 macam gamet', '8 macam gamet', '16 macam gamet', '32 macam gamet', '6 macam gamet'],
    correctAnswer: 1,
    explanation: 'Rumus jumlah macam gamet adalah 2^n, di mana n adalah jumlah pasangan gen heterozigot. Pada AaBbCcDD: Aa, Bb, Cc heterozigot (n = 3), sedangkan DD homozigot. Maka 2^3 = 8 macam gamet.',
    difficulty: 'Sedang',
    keyConcept: 'Rumus Macam Gamet 2^n'
  },
  // Kisi-kisi No 47
  {
    id: 'kisi-47',
    kisiKisiNumber: 47,
    moduleId: 'modul-5',
    moduleTitle: 'Pewarisan Sifat',
    question: 'Persilangan yang mengamati dua sifat beda sekaligus (misalnya bentuk biji dan warna biji) disebut persilangan...',
    options: ['Monohibrid', 'Dihibrid', 'Trihibrid', 'Test cross', 'Resiprok'],
    correctAnswer: 1,
    explanation: 'Persilangan dengan satu sifat beda disebut monohibrid, sedangkan persilangan dengan dua sifat beda disebut dihibrid.',
    difficulty: 'Mudah',
    keyConcept: 'Jenis Persilangan Dihibrid'
  },
  // Kisi-kisi No 48
  {
    id: 'kisi-48',
    kisiKisiNumber: 48,
    moduleId: 'modul-5',
    moduleTitle: 'Pewarisan Sifat',
    question: 'Tanaman berbunga ungu disilangkan dengan tanaman berbunga putih menghasilkan F1 yang seluruhnya berbunga ungu. Sifat yang bersifat resesif pada persilangan tersebut adalah...',
    options: ['Bunga ungu', 'Bunga putih', 'Bunga merah muda', 'Bunga belang', 'Tidak ada yang resesif'],
    correctAnswer: 1,
    explanation: 'Sifat resesif adalah sifat yang tertutupi oleh sifat dominan pada F1. Karena semua F1 berbunga ungu, maka ungu adalah sifat dominan dan putih adalah sifat resesif.',
    difficulty: 'Mudah',
    keyConcept: 'Penentuan Sifat Resesif'
  },
  // Kisi-kisi No 49
  {
    id: 'kisi-49',
    kisiKisiNumber: 49,
    moduleId: 'modul-5',
    moduleTitle: 'Pewarisan Sifat',
    question: 'Istilah untuk susunan atau komposisi gen suatu individu yang tidak dapat diamati secara langsung dari luar adalah...',
    options: ['Fenotipe', 'Genotipe', 'Kariotipe', 'Alelopati', 'Mutasi'],
    correctAnswer: 1,
    explanation: 'Genotipe adalah susunan genetik yang tidak tampak dari luar (disimbolkan dengan huruf seperti AA, Aa, aa). Sifat yang dapat diamati dari luar disebut fenotipe.',
    difficulty: 'Mudah',
    keyConcept: 'Istilah Genotipe'
  },
  // Kisi-kisi No 50
  {
    id: 'kisi-50',
    kisiKisiNumber: 50,
    moduleId: 'modul-5',
    moduleTitle: 'Pewarisan Sifat',
    question: 'Pada persilangan monohibrid antara parental heterozigot (Aa × Aa), perbandingan GENOTIPE keturunan F2 yang dihasilkan adalah...',
    options: ['3 : 1', '1 : 2 : 1 (1 AA : 2 Aa : 1 aa)', '9 : 3 : 3 : 1', '1 : 1', '1 : 3'],
    correctAnswer: 1,
    explanation: 'Persilangan Aa x Aa menghasilkan perbandingan genotipe: 1 AA : 2 Aa : 1 aa (1 : 2 : 1). Perbandingan fenotipenya adalah 3 dominan : 1 resesif.',
    difficulty: 'Mudah',
    keyConcept: 'Perbandingan Genotipe F2'
  }
];
