// Konten statis situs yang tidak masuk skema CMS (docs/DATABASE.md). Fakta organisasi mengacu ke dokumen resmi P3RI.
export const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/about', label: 'Tentang' },
  { href: '/program', label: 'Program' },
  { href: '/membership', label: 'Keanggotaan' },
  { href: '/blog', label: 'Artikel' },
  { href: '/sumber-daya', label: 'Sumber Daya' },
  { href: '/contact', label: 'Kontak' },
] as const

export const LEGAL = {
  authority: 'Menteri Hukum dan Hak Asasi Manusia RI',
  authorityShort: 'Kemenkumham RI',
  date: '9 Oktober 2017',
  number: 'AHU-0014361.AH.01.07 Tahun 2017',
}

export const ADDRESS = {
  // seo.ts memakai lines[0..1] sebagai streetAddress dan lines[2] sebagai locality.
  lines: ['Arkadia Green Park, Tower G, Level 8', 'Jl. TB Simatupang Kav. 88, Kebagusan, Pasar Minggu', 'Jakarta Selatan', 'DKI Jakarta 12520'],
  postalCode: '12520',
  maps: 'https://www.google.com/maps/search/?api=1&query=Arkadia+Green+Park+Tower+G+Jl.+TB+Simatupang+Kav.+88+Jakarta+Selatan',
}

/** Tiga cincin logo: informasi (merah), rekod (hijau), kearsipan (perak). */
export const FIELDS = [
  { name: 'Informasi', color: 'red', description: 'Nilai dan makna yang lahir dari data dan dokumen yang terkelola.' },
  { name: 'Rekod', color: 'green', description: 'Bukti kegiatan organisasi yang harus dapat dipercaya, utuh, dan dapat digunakan.' },
  { name: 'Kearsipan', color: 'silver', description: 'Pelestarian dan akses jangka panjang terhadap memori organisasi dan bangsa.' },
] as const

export const ROLES = [
  {
    n: '01',
    title: 'Pengembangan kompetensi',
    description: 'Program pelatihan berjenjang bagi pengelola rekod — dari pengenalan dasar hingga praktik lanjutan sesuai standar internasional.',
  },
  { n: '02', title: 'Standar & kode etik', description: 'Mengembangkan standar kompetensi dan kode etik profesi sebagai acuan bersama.' },
  { n: '03', title: 'Advokasi anggota', description: 'Menyuarakan kepentingan profesi kepada regulator, organisasi, dan publik.' },
  { n: '04', title: 'Jejaring lintas lembaga', description: 'Menghubungkan praktisi, akademisi, dan pemerhati dari sektor publik, swasta, dan pendidikan.' },
] as const

export const PROGRAMS = [
  {
    n: '01',
    name: 'Coffee Talk',
    format: 'Diskusi santai',
    description: 'Bincang ringan namun bernas seputar pengelolaan rekod dan arsip, perkembangan regulasi, teknologi, dan praktik terkini di lapangan.',
  },
  {
    n: '02',
    name: 'Klinik',
    format: 'Pendampingan',
    description: 'Sesi bermodel coaching bagi profesional untuk menggali potensi dan merumuskan solusi atas persoalan pengelolaan rekod yang dihadapi.',
  },
  {
    n: '03',
    name: 'Workshop',
    format: 'Lokakarya',
    description: 'Penguatan keahlian yang menghubungkan teori dengan praktik — peserta pulang membawa keterampilan yang langsung dapat diterapkan.',
  },
  {
    n: '04',
    name: 'Seminar',
    format: 'Forum ilmiah',
    description: 'Paparan ahli dan akademisi mengenai landasan teori dan praktik pengelolaan rekod, terbuka bagi kalangan kampus dan profesional.',
  },
] as const

export const MEMBER_TYPES = [
  { name: 'Praktisi', color: 'red', description: 'Profesional yang bertugas mengelola rekod dan arsip di organisasinya — swasta, BUMN, pemerintahan, lembaga negara, nirlaba, maupun pendidikan.' },
  { name: 'Akademisi', color: 'green', description: 'Dosen, peneliti, dan mahasiswa yang menekuni bidang rekod, informasi, dan kearsipan.' },
  { name: 'Pemerhati', color: 'silver', description: 'Individu yang memiliki perhatian dan kepedulian terhadap tata kelola rekod dan arsip.' },
  { name: 'Anggota Kehormatan', color: 'amber', description: 'Ditetapkan oleh pengurus bagi individu terpilih atas kontribusinya terhadap profesi.' },
] as const

export const MEMBER_BENEFITS = [
  { title: 'Akses program', description: 'Prioritas mengikuti Coffee Talk, Klinik, Workshop, dan Seminar P3RI.' },
  { title: 'Jejaring profesi', description: 'Terhubung dengan pengelola rekod lintas sektor dan lembaga di seluruh Indonesia.' },
  { title: 'Pengakuan profesi', description: 'Menjadi bagian dari organisasi profesi yang berbadan hukum dan diakui negara.' },
  { title: 'Advokasi', description: 'Didampingi organisasi dalam isu-isu yang menyangkut kepentingan profesi.' },
] as const

export const JOIN_STEPS = [
  { title: 'Pastikan kriteria', description: 'Warga negara Indonesia yang memenuhi salah satu jenis keanggotaan: Praktisi, Akademisi, atau Pemerhati.' },
  { title: 'Ajukan pendaftaran', description: 'Sampaikan data diri dan alamat email aktif melalui kanal pendaftaran di halaman ini.' },
  { title: 'Verifikasi pengurus', description: 'Pengurus meninjau data dan menghubungi Anda melalui email untuk langkah selanjutnya.' },
  { title: 'Resmi menjadi anggota', description: 'Keanggotaan berlaku dua tahun sejak ditetapkan dan dapat diperpanjang.' },
] as const

export const TIMELINE = [
  { date: '19 Juli 2017', title: 'Pertemuan pendiri', description: 'Praktisi dan akademisi pengelolaan rekod berkumpul di Jakarta, difasilitasi Kantor Arsip Universitas Indonesia, dan menyepakati perlunya wadah profesi.' },
  { date: '9 Oktober 2017', title: 'Pengesahan badan hukum', description: `Kemenkumham RI mengesahkan P3RI sebagai badan hukum perkumpulan, Nomor ${'AHU-0014361.AH.01.07 Tahun 2017'}.` },
  { date: '2018 – kini', title: 'Program berjalan', description: 'Coffee Talk, Klinik, Workshop, dan Seminar diselenggarakan bersama kampus, lembaga, dan komunitas profesi.' },
] as const

export const MISSION = [
  'Menyelenggarakan berbagai program pelatihan berjenjang untuk profesi pengelola rekod.',
  'Mengembangkan standar kompetensi dan kode etik profesi pengelola rekod.',
  'Membentuk jaringan antar pengelola rekod sebagai media berbagi pengetahuan dan pengalaman.',
  'Memberikan advokasi bagi anggota.',
] as const

export const VISION = 'Memajukan dan mengembangkan profesi pengelola rekod di Indonesia.'

export const TESTIMONIALS = [
  {
    quote:
      'Kehadiran P3RI semakin kontekstual untuk mewadahi berbagai profesi pengelola data. Di era digital, pengelolaan koleksi data sudah semakin melebur ke dalam catatan informasi digital atau rekod apa pun bentuk asalnya.',
    name: 'Priatna',
    role: 'TEMPO Data Science',
  },
  {
    quote:
      'Bagaimana bila "informasi adalah mata uang organisasi"? P3RI adalah organisasi profesi yang telah lama mengimplementasikan ungkapan tersebut. Manajemen rekod sama pentingnya dengan produk atau layanan yang disediakan organisasi.',
    name: 'Muhammad Rosyihan Hendrawan',
    role: 'Dosen Ilmu Perpustakaan, Universitas Brawijaya',
  },
  {
    quote:
      'P3RI mengisi celah yang selama ini kosong: tempat diskusi praktisi pengelola rekod dalam arti luas, topiknya kekinian, terbuka bagi pengelola dari berbagai jenis organisasi dan model bisnis.',
    name: 'Hendro Wicaksono',
    role: 'Analis Data dan Informasi, Kemendikbud RI',
  },
] as const

export const STATS = [
  { value: '2017', label: 'Berbadan hukum sejak' },
  { value: '4', label: 'Program rutin' },
  { value: '4', label: 'Jenis keanggotaan' },
  { value: '2 tahun', label: 'Periode keanggotaan' },
] as const

export const COLOR_CLASS = {
  red: 'bg-brand-red',
  green: 'bg-brand-green',
  silver: 'bg-brand-silver',
  amber: 'bg-brand-amber',
} as const

// ---------- Konten wawasan (ditambahkan 6 Sep 2026 atas permintaan owner). Bersifat pengantar, bukan nasihat hukum. ----------

export const PARTNERS = [
  'Kantor Arsip Universitas Indonesia',
  'Fakultas Ilmu Administrasi Universitas Brawijaya',
  'Sekolah Vokasi Universitas Gadjah Mada',
  'STIH Indonesia Jentera',
  'Daniel S. Lev Law Library',
] as const

export const INSIGHTS = [
  {
    key: 'indonesia',
    color: 'red',
    title: 'Di Indonesia',
    lead: 'Kerangka hukum kearsipan dan pelindungan data yang mengikat organisasi publik maupun swasta.',
    items: [
      { label: 'UU No. 43 Tahun 2009', text: 'Kearsipan — dasar pengelolaan arsip dinamis dan statis, penyusutan, dan peran ANRI.' },
      { label: 'UU No. 8 Tahun 1997', text: 'Dokumen Perusahaan — kewajiban dan jangka waktu penyimpanan dokumen bagi perusahaan.' },
      { label: 'UU No. 27 Tahun 2022', text: 'Pelindungan Data Pribadi — rekod yang memuat data pribadi tunduk pada prinsip pembatasan dan retensi.' },
      { label: 'Perpres No. 95 Tahun 2018', text: 'Sistem Pemerintahan Berbasis Elektronik — arsip elektronik menjadi bagian tata kelola digital instansi.' },
    ],
  },
  {
    key: 'dunia',
    color: 'green',
    title: 'Di dunia',
    lead: 'Standar internasional yang menjadi rujukan profesi pengelola rekod dan informasi.',
    items: [
      { label: 'ISO 15489-1', text: 'Konsep dan prinsip manajemen rekod — rekod harus autentik, andal, utuh, dan dapat digunakan.' },
      { label: 'ISO 30301', text: 'Sistem manajemen untuk rekod — pendekatan manajemen terpadu ala ISO 9001 untuk rekod.' },
      { label: 'ISO/IEC 27001', text: 'Sistem manajemen keamanan informasi — kerabat dekat manajemen rekod di ranah keamanan.' },
      { label: 'ISO 14721 (OAIS)', text: 'Model rujukan preservasi digital jangka panjang untuk arsip elektronik.' },
    ],
  },
  {
    key: 'keamanan',
    color: 'silver',
    title: 'Keamanan informasi',
    lead: 'Rekod yang aman adalah rekod yang terlindungi sepanjang daur hidupnya — fisik maupun digital.',
    items: [
      { label: 'Klasifikasi akses', text: 'Tentukan siapa boleh melihat, mengubah, dan memusnahkan setiap kelompok rekod.' },
      { label: 'Retensi terkendali', text: 'Jadwal retensi yang jelas mencegah penumpukan sekaligus pemusnahan yang gegabah.' },
      { label: 'Jejak audit', text: 'Setiap tindakan atas rekod terekam: siapa, kapan, apa — dasar akuntabilitas.' },
      { label: 'Preservasi & pemulihan', text: 'Format terbuka, cadangan berlapis, dan rencana pemulihan bencana untuk arsip vital.' },
    ],
  },
] as const

export const LIFECYCLE = [
  { n: '01', name: 'Penciptaan', color: 'red', description: 'Rekod lahir saat kegiatan berlangsung — surat, kontrak, notulen, email, data sistem.', practice: 'Tangkap sejak awal dengan metadata yang cukup.' },
  { n: '02', name: 'Penggunaan', color: 'green', description: 'Rekod aktif dipakai untuk mendukung keputusan dan bukti pelaksanaan kegiatan.', practice: 'Kendalikan akses dan versi.' },
  { n: '03', name: 'Pemeliharaan', color: 'silver', description: 'Rekod inaktif disimpan dengan aman — fisik di ruang simpan, digital di repositori terkelola.', practice: 'Jaga keutuhan dan keterbacaan format.' },
  { n: '04', name: 'Penyusutan', color: 'amber', description: 'Rekod dimusnahkan sesuai jadwal retensi, atau diserahkan sebagai arsip statis bernilai permanen.', practice: 'Dokumentasikan setiap pemusnahan dan penyerahan.' },
] as const

export const GLOSSARY_SHORT = [
  { term: 'Dokumen', definition: 'Informasi yang direkam dalam medium apa pun — belum tentu bernilai bukti.' },
  { term: 'Rekod', definition: 'Dokumen yang dibuat atau diterima sebagai bukti kegiatan organisasi dan wajib dikelola.' },
  { term: 'Arsip', definition: 'Rekod yang dipelihara karena nilai gunanya — dinamis (masih dipakai) atau statis (bernilai permanen).' },
] as const

export const GLOSSARY = [
  ...GLOSSARY_SHORT,
  { term: 'Arsip dinamis', definition: 'Arsip yang masih digunakan langsung dalam kegiatan pencipta arsip; terbagi menjadi arsip aktif, inaktif, dan vital.' },
  { term: 'Arsip statis', definition: 'Arsip bernilai guna kesejarahan yang telah habis masa retensinya dan diserahkan ke lembaga kearsipan.' },
  { term: 'Arsip vital', definition: 'Arsip yang keberadaannya menjadi syarat dasar kelangsungan operasional organisasi dan tidak dapat diperbarui bila hilang.' },
  { term: 'Jadwal Retensi Arsip (JRA)', definition: 'Daftar yang memuat jangka waktu simpan arsip dan keterangan nasib akhirnya: musnah atau permanen.' },
  { term: 'Penyusutan', definition: 'Pengurangan jumlah arsip melalui pemindahan, pemusnahan, atau penyerahan sesuai JRA.' },
  { term: 'Metadata', definition: 'Data tentang rekod — pembuat, tanggal, konteks, klasifikasi — yang menjaga rekod tetap bermakna dan dapat ditemukan.' },
  { term: 'Tata kelola informasi', definition: 'Kerangka kebijakan, peran, dan proses untuk mengelola informasi sebagai aset organisasi secara menyeluruh.' },
  { term: 'Preservasi digital', definition: 'Upaya menjaga agar rekod elektronik tetap dapat diakses dan dipercaya walau teknologi berganti.' },
  { term: 'Autentisitas', definition: 'Sifat rekod yang terbukti sesuai dengan yang dimaksud, dibuat oleh pihak yang berwenang, pada waktu yang dinyatakan.' },
  { term: 'LSP P3', definition: 'Lembaga Sertifikasi Profesi Pihak Ketiga: lembaga independen berlisensi BNSP yang dibentuk asosiasi industri atau profesi untuk melayani uji kompetensi masyarakat umum.' },
] as const

export const REGULATIONS = [
  { label: 'UU No. 43 Tahun 2009', title: 'Kearsipan', summary: 'Landasan penyelenggaraan kearsipan nasional: arsip dinamis dan statis, penyusutan, sistem informasi kearsipan, serta kewenangan Arsip Nasional RI (ANRI).', href: 'https://peraturan.bpk.go.id/Search?keywords=Undang-Undang+Nomor+43+Tahun+2009+Kearsipan' },
  { label: 'PP No. 28 Tahun 2012', title: 'Pelaksanaan UU Kearsipan', summary: 'Aturan teknis pengelolaan arsip dinamis, arsip statis, pembinaan, dan sumber daya kearsipan.', href: 'https://peraturan.bpk.go.id/Search?keywords=Peraturan+Pemerintah+Nomor+28+Tahun+2012+Kearsipan' },
  { label: 'UU No. 8 Tahun 1997', title: 'Dokumen Perusahaan', summary: 'Kewajiban perusahaan menyimpan dokumen keuangan dan dokumen lain, jangka waktu simpan, serta pengalihan ke media lain.', href: 'https://peraturan.bpk.go.id/Search?keywords=Undang-Undang+Nomor+8+Tahun+1997+Dokumen+Perusahaan' },
  { label: 'UU No. 14 Tahun 2008', title: 'Keterbukaan Informasi Publik', summary: 'Hak publik atas informasi badan publik — menuntut rekod yang tertata agar dapat dilayani tepat waktu.', href: 'https://peraturan.bpk.go.id/Search?keywords=Undang-Undang+Nomor+14+Tahun+2008+Keterbukaan+Informasi+Publik' },
  { label: 'UU No. 27 Tahun 2022', title: 'Pelindungan Data Pribadi', summary: 'Prinsip pembatasan tujuan, retensi, dan penghapusan data pribadi — berdampak langsung pada jadwal retensi rekod.', href: 'https://peraturan.bpk.go.id/Search?keywords=Undang-Undang+Nomor+27+Tahun+2022+Pelindungan+Data+Pribadi' },
  { label: 'UU ITE (No. 11/2008 jo. perubahannya)', title: 'Informasi dan Transaksi Elektronik', summary: 'Kedudukan informasi dan dokumen elektronik sebagai alat bukti yang sah.', href: 'https://peraturan.bpk.go.id/Search?keywords=Undang-Undang+Informasi+dan+Transaksi+Elektronik' },
  { label: 'Perpres No. 95 Tahun 2018', title: 'Sistem Pemerintahan Berbasis Elektronik', summary: 'Tata kelola layanan pemerintahan digital, termasuk pengelolaan arsip elektronik instansi.', href: 'https://peraturan.bpk.go.id/Search?keywords=Peraturan+Presiden+Nomor+95+Tahun+2018+SPBE' },
] as const

export const STANDARDS = [
  { label: 'ISO 15489-1:2016', title: 'Information and documentation — Records management: concepts and principles', summary: 'Rujukan utama profesi: karakteristik rekod (autentik, andal, utuh, dapat digunakan) dan proses pengelolaannya.', href: 'https://www.iso.org/search.html?q=ISO%2015489-1' },
  { label: 'ISO 30300 / 30301', title: 'Management systems for records', summary: 'Kerangka sistem manajemen rekod yang dapat diaudit dan disertifikasi, sejalan dengan standar sistem manajemen ISO lain.', href: 'https://www.iso.org/search.html?q=ISO%2030301' },
  { label: 'ISO 23081', title: 'Metadata for records', summary: 'Prinsip dan skema metadata agar rekod tetap bermakna, dapat ditemukan, dan terbukti autentik.', href: 'https://www.iso.org/search.html?q=ISO%2023081' },
  { label: 'ISO 16175', title: 'Processes and functional requirements for software for managing records', summary: 'Persyaratan fungsional sistem manajemen rekod elektronik.', href: 'https://www.iso.org/search.html?q=ISO%2016175' },
  { label: 'ISO 14721 (OAIS)', title: 'Open Archival Information System', summary: 'Model rujukan arsip digital untuk preservasi jangka panjang.', href: 'https://www.iso.org/search.html?q=ISO%2014721' },
  { label: 'ISO/IEC 27001', title: 'Information security management systems', summary: 'Kendali keamanan informasi — klasifikasi, akses, kriptografi, kelangsungan usaha — yang melindungi rekod.', href: 'https://www.iso.org/search.html?q=ISO%2FIEC%2027001' },
] as const

export const SECURITY_PRACTICES = {
  fisik: [
    'Ruang simpan dengan kontrol suhu dan kelembapan, bebas hama, dan jauh dari sumber air',
    'Kontrol akses ruang arsip: kunci, daftar peminjaman, dan pencatatan keluar-masuk',
    'Perlindungan dari kebakaran dan banjir; arsip vital disalin dan disimpan terpisah',
    'Pemusnahan terdokumentasi dengan berita acara, bukan sekadar dibuang',
  ],
  digital: [
    'Hak akses berbasis peran dan jejak audit setiap perubahan',
    'Cadangan berlapis (salinan di lokasi berbeda) yang rutin diuji pemulihannya',
    'Format berumur panjang dan terbuka, misalnya PDF/A untuk dokumen akhir',
    'Enkripsi untuk data sensitif serta retensi dan penghapusan yang dijadwalkan',
  ],
} as const

export const ORGANIZATIONS = [
  { name: 'Arsip Nasional Republik Indonesia (ANRI)', role: 'Lembaga kearsipan nasional, pembina kearsipan, dan penerbit pedoman teknis.', href: 'https://www.anri.go.id' },
  { name: 'International Council on Archives (ICA)', role: 'Asosiasi arsiparis dan lembaga arsip dunia.', href: 'https://www.ica.org' },
  { name: 'ARMA International', role: 'Asosiasi profesi manajemen rekod dan tata kelola informasi.', href: 'https://www.arma.org' },
  { name: 'AIIM', role: 'Asosiasi manajemen informasi cerdas; sertifikasi dan riset praktik industri.', href: 'https://www.aiim.org' },
] as const

export const PROGRAM_DETAILS = [
  {
    slug: 'coffee-talk',
    name: 'Coffee Talk',
    format: 'Diskusi santai · daring/luring · ±90 menit',
    audience: 'Terbuka untuk umum — praktisi, akademisi, mahasiswa, dan siapa pun yang tertarik pada rekod dan arsip.',
    description: 'Bincang ringan namun bernas seputar pengelolaan rekod dan arsip, perkembangan regulasi, teknologi, dan praktik terkini di lapangan. Narasumber berbagi pengalaman nyata, peserta bebas bertanya.',
    topics: ['Bedah profesi Document Controller', 'Records Management Roadmap untuk sektor publik', 'Information governance dan keamanan data', 'Arsip musik populer Indonesia', 'Soft skill pengelola rekod'],
    how: 'Pantau agenda di situs ini dan media sosial P3RI, lalu daftar melalui tautan yang tersedia. Gratis untuk anggota; sebagian sesi terbuka untuk umum.',
  },
  {
    slug: 'klinik',
    name: 'Klinik',
    format: 'Pendampingan · kelompok kecil · sesi terjadwal',
    audience: 'Profesional dan tim pengelola rekod yang menghadapi persoalan konkret di organisasinya.',
    description: 'Sesi bermodel coaching: peserta membawa kasus nyata — penataan arsip inaktif, penyusunan jadwal retensi, migrasi ke sistem elektronik — dan dipandu merumuskan solusi yang sesuai konteksnya.',
    topics: ['Menyusun klasifikasi dan jadwal retensi arsip', 'Penataan arsip inaktif dan pemusnahan', 'Persiapan implementasi e-office / sistem arsip elektronik', 'Kepatuhan rekod terhadap UU PDP'],
    how: 'Ajukan kebutuhan melalui halaman kontak dengan subjek "Klinik". Pengurus akan menjadwalkan sesi dan menghubungkan dengan pendamping yang sesuai.',
  },
  {
    slug: 'workshop',
    name: 'Workshop',
    format: 'Lokakarya · praktik langsung · setengah hingga dua hari',
    audience: 'Staf dan pimpinan unit yang ingin menguasai keterampilan teknis pengelolaan rekod.',
    description: 'Penguatan keahlian yang menghubungkan teori dengan praktik. Peserta bekerja dengan studi kasus, templat, dan alat bantu, sehingga pulang membawa keterampilan yang langsung dapat diterapkan.',
    topics: ['Dasar-dasar manajemen rekod berbasis ISO 15489', 'Menyusun kebijakan dan prosedur kearsipan', 'Digitalisasi dan preservasi arsip', 'Tata kelola informasi untuk organisasi'],
    how: 'Workshop diselenggarakan berkala dan dapat diadakan khusus (in-house) untuk instansi. Hubungi pengurus untuk kebutuhan in-house.',
  },
  {
    slug: 'seminar',
    name: 'Seminar',
    format: 'Forum ilmiah · terbuka · bersama kampus dan lembaga',
    audience: 'Akademisi, mahasiswa, profesional, dan pemangku kepentingan kebijakan.',
    description: 'Paparan ahli dan akademisi mengenai landasan teori dan praktik pengelolaan rekod. Menjadi ruang temu antara dunia kampus, regulator, dan praktisi.',
    topics: ['Peran profesional rekod dan arsip di era Revolusi Industri 4.0', 'Standardisasi manajemen rekod dan tata kelola korporasi', 'Rekod digital dan regulasinya'],
    how: 'Seminar biasanya diselenggarakan bersama perguruan tinggi atau lembaga mitra. Ajak P3RI berkolaborasi melalui halaman Kontak.',
  },
] as const

export const FAQ_HOME = [
  { q: 'Apa bedanya rekod dan arsip?', a: 'Rekod adalah dokumen yang dibuat atau diterima sebagai bukti kegiatan organisasi dan wajib dikelola. Arsip adalah rekod yang dipelihara karena nilai gunanya — masih dipakai (dinamis) atau bernilai permanen (statis). Dalam praktik Indonesia, istilah "arsip" mencakup keduanya.' },
  { q: 'Siapa saja yang bisa menjadi anggota P3RI?', a: 'Seluruh warga negara Indonesia — praktisi pengelola rekod di organisasi mana pun, akademisi dan mahasiswa bidang terkait, serta pemerhati. Anggota Kehormatan ditetapkan oleh pengurus.' },
  { q: 'Berapa lama periode keanggotaan?', a: 'Dua tahun sejak ditetapkan dan dapat diperpanjang.' },
  { q: 'Apakah kegiatan P3RI hanya untuk anggota?', a: 'Sebagian besar Coffee Talk dan Seminar terbuka untuk umum. Klinik dan Workshop tertentu diprioritaskan bagi anggota atau diselenggarakan khusus untuk instansi.' },
  { q: 'Bagaimana mengundang P3RI sebagai narasumber atau mitra kegiatan?', a: 'Kirimkan pesan melalui halaman Kontak dengan menyebutkan bentuk kegiatan, waktu, dan peserta yang dituju. Pengurus akan menindaklanjuti melalui email.' },
  { q: 'Apa itu LSP P3?', a: 'LSP P3 (Lembaga Sertifikasi Profesi Pihak Ketiga) adalah lembaga sertifikasi profesi yang independen, dibentuk oleh asosiasi industri atau asosiasi profesi, dan berlisensi BNSP. LSP P3 melayani uji kompetensi bagi masyarakat umum — termasuk pengelola dokumen, rekod, dan arsip — sehingga siapa pun dapat membuktikan kompetensinya dengan sertifikat yang diakui secara nasional.' },
  { q: 'Apakah P3RI berbadan hukum?', a: 'Ya. P3RI disahkan sebagai badan hukum perkumpulan oleh Menteri Hukum dan HAM RI pada 9 Oktober 2017, Nomor AHU-0014361.AH.01.07 Tahun 2017.' },
] as const

export const FAQ_MEMBERSHIP = [
  { q: 'Apa syarat menjadi anggota?', a: 'Warga negara Indonesia yang memenuhi salah satu kriteria: Praktisi (bekerja mengelola rekod/arsip), Akademisi (dosen, peneliti, mahasiswa bidang terkait), atau Pemerhati.' },
  { q: 'Bagaimana proses setelah mengajukan pendaftaran?', a: 'Pengurus memverifikasi data dan menghubungi Anda melalui email. Informasi lanjutan tentang keanggotaan disampaikan pada tahap tersebut.' },
  { q: 'Apakah keanggotaan bisa atas nama instansi?', a: 'Keanggotaan bersifat perorangan. Instansi yang ingin bekerja sama — misalnya workshop in-house — dapat menghubungi pengurus melalui halaman Kontak.' },
  { q: 'Bagaimana memperpanjang keanggotaan?', a: 'Menjelang akhir periode dua tahun, pengurus akan menghubungi anggota untuk perpanjangan.' },
  { q: 'Bagaimana jika ingin mengubah atau menghapus data saya?', a: 'Kirimkan permintaan ke email sekretariat. Sesuai UU Pelindungan Data Pribadi, data Anda hanya digunakan untuk keperluan keanggotaan dan tidak dibagikan ke pihak ketiga.' },
] as const

export const MEMBER_RIGHTS = [
  'Mengikuti program P3RI dengan prioritas bagi anggota',
  'Mendapat informasi kegiatan, publikasi, dan peluang jejaring',
  'Mengajukan aspirasi dan memperoleh advokasi terkait profesi',
  'Berpartisipasi dalam forum organisasi sesuai ketentuan',
] as const

export const MEMBER_DUTIES = [
  'Menjunjung kode etik dan nama baik profesi serta organisasi',
  'Berpartisipasi aktif dalam kegiatan dan berbagi pengetahuan',
  'Memperbarui data keanggotaan bila terjadi perubahan',
  'Mematuhi anggaran dasar dan anggaran rumah tangga P3RI',
] as const

export const VALUES = [
  { title: 'Integritas', description: 'Rekod adalah bukti; pengelolanya harus dapat dipercaya. Kami menjunjung kejujuran dan kerahasiaan.' },
  { title: 'Kompetensi', description: 'Profesi yang terus belajar — mengikuti standar, regulasi, dan teknologi yang berkembang.' },
  { title: 'Kolaborasi', description: 'Lintas sektor dan lembaga: praktisi, akademisi, regulator, dan komunitas saling menguatkan.' },
  { title: 'Akuntabilitas', description: 'Setiap keputusan atas rekod harus dapat dipertanggungjawabkan kepada organisasi dan publik.' },
] as const

export const COLLAB_TYPES = [
  { title: 'Narasumber', description: 'Pengurus atau anggota ahli sebagai pembicara seminar, kuliah tamu, atau diskusi panel.' },
  { title: 'Workshop in-house', description: 'Pelatihan khusus untuk tim kearsipan atau unit tata usaha di instansi Anda.' },
  { title: 'Klinik untuk tim', description: 'Pendampingan terjadwal atas persoalan pengelolaan rekod yang sedang dihadapi.' },
  { title: 'Kolaborasi akademik', description: 'Seminar bersama, riset, magang, dan pengembangan kurikulum bidang rekod.' },
] as const

export const PROGRAM_LABEL: Record<string, string> = {
  'coffee-talk': 'Coffee Talk',
  klinik: 'Klinik',
  workshop: 'Workshop',
  seminar: 'Seminar',
  lainnya: 'Kegiatan',
}

// ---------- Insight tambahan (permintaan owner) ----------

export const SOCIAL_CHANNELS = [
  { key: 'instagram', name: 'Instagram', handle: '@id_p3ri', description: 'Poster agenda, dokumentasi kegiatan, dan kabar singkat organisasi.' },
  { key: 'youtube', name: 'YouTube', handle: '@id_p3ri', description: 'Rekaman Coffee Talk, seminar, dan materi pembelajaran pengelolaan rekod.' },
] as const

export const MYTHS = [
  { myth: 'Arsip hanya urusan tumpukan kertas lama.', fact: 'Rekod lahir setiap hari — email, kontrak, notulen, data sistem — dan sebagian besar kini berbentuk elektronik. Mengelolanya berarti mengelola bukti kegiatan organisasi hari ini.' },
  { myth: 'Kalau sudah digital, tidak perlu jadwal retensi.', fact: 'Penyimpanan tanpa batas menambah biaya, memperluas risiko kebocoran, dan bertentangan dengan prinsip pembatasan penyimpanan dalam UU Pelindungan Data Pribadi.' },
  { myth: 'Cadangan (backup) sama dengan preservasi digital.', fact: 'Cadangan melindungi dari kehilangan hari ini. Preservasi memastikan berkas masih terbaca, bermakna, dan terbukti asli puluhan tahun lagi meski format dan perangkat lunak berganti.' },
  { myth: 'Email bukan rekod organisasi.', fact: 'Yang menentukan adalah isi dan konteksnya, bukan mediumnya. Keputusan bisnis yang diambil lewat email adalah rekod yang harus ditangkap dan dikelola.' },
  { myth: 'Menghapus berkas berarti data sudah musnah.', fact: 'Pemusnahan rekod memerlukan prosedur, persetujuan, berita acara, dan metode yang memastikan data tidak dapat dipulihkan — untuk kertas maupun digital.' },
  { myth: 'Pengelola rekod hanya dibutuhkan instansi pemerintah.', fact: 'UU Dokumen Perusahaan dan UU PDP mengikat sektor swasta. Auditor, regulator, dan pengadilan meminta bukti yang terkelola — apa pun jenis organisasinya.' },
] as const

export const SELF_CHECK = [
  'Setiap unit memiliki daftar jenis rekod yang dihasilkannya (skema klasifikasi).',
  'Ada jadwal retensi tertulis yang disetujui pimpinan dan benar-benar dijalankan.',
  'Pemusnahan rekod selalu disertai berita acara dan persetujuan.',
  'Rekod elektronik tersimpan di repositori terkelola, bukan hanya di laptop atau email pribadi.',
  'Hak akses rekod diatur berdasarkan peran, bukan dibagi bebas.',
  'Cadangan data diuji pemulihannya minimal sekali setahun.',
  'Ada petugas atau unit yang jelas bertanggung jawab atas rekod organisasi.',
  'Rekod yang memuat data pribadi punya dasar pemrosesan dan batas waktu simpan.',
] as const

export const KEY_DATES = [
  { date: '18 Mei', name: 'Hari Kearsipan Nasional', note: 'Peringatan kearsipan di Indonesia, dipelopori Arsip Nasional RI.' },
  { date: '9 Juni', name: 'Hari Arsip Internasional', note: 'Ditetapkan International Council on Archives (ICA), memperingati berdirinya ICA pada 1948.' },
  { date: 'April', name: 'Bulan Manajemen Rekod & Informasi', note: 'Records and Information Management Month yang dirayakan komunitas ARMA di berbagai negara.' },
  { date: '28 September', name: 'Hari Internasional Akses Universal terhadap Informasi', note: 'Ditetapkan UNESCO; menegaskan hak publik atas informasi yang terkelola dengan baik.' },
  { date: 'Kamis pertama November', name: 'Hari Preservasi Digital Sedunia', note: 'World Digital Preservation Day oleh Digital Preservation Coalition.' },
] as const

export const MILESTONES = [
  { year: '1892', title: 'Landsarchief berdiri di Batavia', description: 'Lembaga arsip pemerintah kolonial yang menjadi cikal bakal Arsip Nasional Republik Indonesia.' },
  { year: '1971', title: 'UU No. 7 Tahun 1971', description: 'Ketentuan-ketentuan Pokok Kearsipan — undang-undang kearsipan pertama Republik Indonesia.' },
  { year: '2009', title: 'UU No. 43 Tahun 2009', description: 'Undang-undang Kearsipan yang berlaku hingga kini: arsip dinamis, arsip statis, penyusutan, dan sistem kearsipan nasional.' },
  { year: '2012', title: 'PP No. 28 Tahun 2012', description: 'Peraturan pelaksana UU Kearsipan.' },
  { year: '2017', title: 'P3RI berbadan hukum', description: 'Perkumpulan Profesi Pengelola Rekod Indonesia disahkan Kemenkumham RI.' },
  { year: '2018', title: 'Perpres SPBE', description: 'Sistem Pemerintahan Berbasis Elektronik menempatkan arsip elektronik dalam tata kelola digital instansi.' },
  { year: '2022', title: 'UU Pelindungan Data Pribadi', description: 'Prinsip pembatasan tujuan dan retensi data pribadi mengikat pengelolaan rekod di semua sektor.' },
] as const

export const CAREER_PATHS = [
  { title: 'Arsiparis', sector: 'Instansi pemerintah & lembaga negara', description: 'Jabatan fungsional yang mengelola arsip dinamis dan statis sesuai UU Kearsipan dan pedoman ANRI.' },
  { title: 'Records officer / Document controller', sector: 'Korporasi, migas, konstruksi, manufaktur', description: 'Mengendalikan dokumen proyek dan rekod perusahaan agar terkendali versi, akses, dan retensinya.' },
  { title: 'Analis tata kelola informasi & kepatuhan', sector: 'Keuangan, telekomunikasi, kesehatan', description: 'Menyelaraskan rekod dengan regulasi: UU PDP, ketentuan sektor, dan audit.' },
  { title: 'Spesialis preservasi & aset digital', sector: 'Lembaga arsip, perpustakaan, media', description: 'Menjaga rekod elektronik tetap dapat diakses dan dipercaya dalam jangka panjang.' },
  { title: 'Akademisi & peneliti kearsipan', sector: 'Perguruan tinggi', description: 'Mengembangkan keilmuan, kurikulum, dan riset bidang rekod dan informasi.' },
] as const

export const CERTIFICATIONS = [
  { name: 'Sertifikasi kompetensi kearsipan', by: 'BNSP melalui LSP bidang kearsipan, termasuk LSP P3 (Indonesia)' },
  { name: 'Information Governance Professional (IGP)', by: 'ARMA International' },
  { name: 'Certified Records Manager (CRM)', by: 'Institute of Certified Records Managers' },
  { name: 'Certified Information Professional (CIP)', by: 'AIIM' },
] as const

/** Jenis Lembaga Sertifikasi Profesi berlisensi BNSP. P3 disorot karena terbuka untuk masyarakat umum. */
export const LSP_TYPES = [
  { code: 'LSP P1', name: 'Pihak pertama', description: 'Dibentuk lembaga pendidikan, pelatihan, atau industri untuk menguji kompetensi peserta didik atau SDM internalnya sendiri.' },
  { code: 'LSP P2', name: 'Pihak kedua', description: 'Dibentuk industri atau instansi untuk menguji kompetensi SDM internal serta pemasok dan jejaring kerjanya.' },
  { code: 'LSP P3', name: 'Pihak ketiga', description: 'Lembaga independen yang dibentuk asosiasi industri atau asosiasi profesi untuk melayani uji kompetensi bagi masyarakat umum — termasuk pengelola dokumen, rekod, dan arsip.' },
] as const
