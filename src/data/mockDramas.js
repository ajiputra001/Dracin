export const DRAMA_CATEGORIES = [
  { id: "all", label: "Semua" },
  { id: "trending", label: "🔥 Trending" },
  { id: "vip", label: "⭐ VIP Gratis" },
  { id: "melolo", label: "📌 Melolo Special" },
  { id: "romance", label: "💖 Romantis" },
  { id: "ceo", label: "💼 CEO & Balas Dendam" },
  { id: "timetravel", label: "⏳ Time Travel" },
  { id: "action", label: "⚡ Action & Silat" },
];

export const SAMPLE_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylikes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
];

export const MOCK_DRAMAS = [
  {
    id: "dr-01",
    title: "Cinta Tersembunyi Sang CEO",
    titleOriginal: "Hidden Love of the Billionaire",
    provider: "DramaBox",
    category: "ceo",
    tags: ["Trending", "CEO", "VIP Free", "Romantis"],
    isVipFree: true,
    rating: "4.9",
    views: "1.2M",
    episodesCount: 85,
    poster: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    synopsis: "Setelah dikhianati oleh tunangannya dan keluarga angkatnya, Lin Xuan menemukan bahwa miliarder terdingin di kota sebenarnya telah mencintainya secara rahasia selama 10 tahun.",
    cast: ["Lin Xuan", "Gu Yanchen", "Zhang Wei"],
    episodes: Array.from({ length: 85 }, (_, i) => ({
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
      duration: "02:15",
      isVip: i > 5,
      videoUrl: SAMPLE_VIDEOS[i % SAMPLE_VIDEOS.length]
    }))
  },
  {
    id: "dr-02",
    title: "Kembalinya Sang Ratu Silat",
    titleOriginal: "Return of the Martial Empress",
    provider: "Melolo",
    category: "melolo",
    tags: ["Melolo", "Action", "Time Travel", "VIP Free"],
    isVipFree: true,
    rating: "4.8",
    views: "980K",
    episodesCount: 60,
    poster: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    synopsis: "Legenda silat kuno bertransmigrasi ke tubuh seorang gadis biasa di zaman modern. Dengan keahlian beladirinya yang tiada tanding, dia membalas dendam pada bos jahat.",
    cast: ["Ye Xi", "Mo Tian", "Su Chen"],
    episodes: Array.from({ length: 60 }, (_, i) => ({
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
      duration: "02:30",
      isVip: i > 3,
      videoUrl: SAMPLE_VIDEOS[(i + 1) % SAMPLE_VIDEOS.length]
    }))
  },
  {
    id: "dr-03",
    title: "Pernikahan Kontrak 100 Hari",
    titleOriginal: "100 Days Contract Marriage",
    provider: "DramaBox",
    category: "romance",
    tags: ["Romantis", "Drama", "Pernikahan"],
    isVipFree: true,
    rating: "4.7",
    views: "2.4M",
    episodesCount: 72,
    poster: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200&auto=format&fit=crop",
    year: "2025",
    synopsis: "Demi menyelamatkan toko bunga neneknya, An An menandatangani kontrak pernikahan 100 hari dengan pewaris grup terbesar. Namun perasaan dingin itu perlahan berubah.",
    cast: ["An An", "Lu Chen", "Bai Ning"],
    episodes: Array.from({ length: 72 }, (_, i) => ({
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
      duration: "01:50",
      isVip: i > 5,
      videoUrl: SAMPLE_VIDEOS[(i + 2) % SAMPLE_VIDEOS.length]
    }))
  },
  {
    id: "dr-04",
    title: "Tuan Muda Penyamar Kaya",
    titleOriginal: "The Undercover Heir",
    provider: "Melolo",
    category: "melolo",
    tags: ["Melolo", "CEO", "Comedy", "VIP Free"],
    isVipFree: true,
    rating: "4.9",
    views: "3.1M",
    episodesCount: 90,
    poster: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    synopsis: "Dianggap miskin oleh mertua dan dipaksa cerai, dia akhirnya membuka identitas aslinya sebagai pemilik tunggal konglomerat nomor 1 di negara itu.",
    cast: ["Chen Fan", "Mu Xue", "Zhao Long"],
    episodes: Array.from({ length: 90 }, (_, i) => ({
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
      duration: "02:00",
      isVip: i > 2,
      videoUrl: SAMPLE_VIDEOS[(i + 3) % SAMPLE_VIDEOS.length]
    }))
  },
  {
    id: "dr-05",
    title: "Putri Mahkota Terjatuh dari Langit",
    titleOriginal: "Crown Princess Transmigration",
    provider: "DramaBox",
    category: "timetravel",
    tags: ["Time Travel", "Kerajaan", "Romantis"],
    isVipFree: true,
    rating: "4.8",
    views: "1.5M",
    episodesCount: 65,
    poster: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    synopsis: "Putri mahkota dinasti Ming mendadak terlempar ke rumah dokter muda di tahun 2026. Bisakah dia beradaptasi dengan teknologi modern dan cinta barunya?",
    cast: ["Li Rou", "Dr. Han", "Xiao Yu"],
    episodes: Array.from({ length: 65 }, (_, i) => ({
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
      duration: "02:10",
      isVip: i > 4,
      videoUrl: SAMPLE_VIDEOS[(i + 4) % SAMPLE_VIDEOS.length]
    }))
  },
  {
    id: "dr-06",
    title: "Naga Penguasa Kota",
    titleOriginal: "Lord of the Dragon Clan",
    provider: "Melolo",
    category: "action",
    tags: ["Action", "Naga", "Melolo", "VIP Free"],
    isVipFree: true,
    rating: "4.9",
    views: "4.5M",
    episodesCount: 100,
    poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    year: "2026",
    synopsis: "Dikhianati 5 tahun lalu di medan perang, sang jenderal naga kembali untuk menghancurkan musuh-musuhnya dan melindungi putri kecilnya yang ditinggalkan.",
    cast: ["Ye Dragon", "Su Qing", "Commander Biao"],
    episodes: Array.from({ length: 100 }, (_, i) => ({
      episodeNumber: i + 1,
      title: `Episode ${i + 1}`,
      duration: "02:20",
      isVip: i > 3,
      videoUrl: SAMPLE_VIDEOS[(i + 5) % SAMPLE_VIDEOS.length]
    }))
  }
];
