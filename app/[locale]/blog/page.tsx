"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SkeletonLoader from "@/components/SkeletonLoader";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  author: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");

  // Tek kategori: Blog
  const categories = ["Tümü", "Blog"];

  // Statik blog verisi (API olmadan)
  const staticPosts: BlogPost[] = [
    {
      id: "yabancilar-vatandaslik",
      title: "Yabancılar Türkiye’de Nasıl T.C. Vatandaşı Olabilir?",
      excerpt: "Yatırım yoluyla vatandaşlıkta gayrimenkul alımı öne çıkıyor; 400.000 USD ve 3 yıl satmama şerhi gibi koşullar var.",
      image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&h=800&fit=crop",
      date: "21 Ocak 2026",
      category: "Blog",
      author: "TSR GROUP",
    },
    {
      id: "ikamet-izni-nasil-alinir",
      title: "İkametgâh (İkamet İzni) Nasıl Alınır?",
      excerpt: "e-İkamet üzerinden online başvuru, randevu ve evrak teslimi temel adımlardır; türüne göre belge listesi değişir.",
      image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=800&fit=crop",
      date: "21 Ocak 2026",
      category: "Blog",
      author: "TSR GROUP",
    },
    {
      id: "kisa-donem-kiralama-farklari",
      title: "Kısa Dönem Kiralama: Uzun Döneme Kıyasla Farkları ve Faydaları",
      excerpt: "Dinamik fiyatlandırma ve esnek nakit akışı sağlar; izin belgesi ve mevzuat gereklilikleri takip edilmelidir.",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=800&fit=crop",
      date: "21 Ocak 2026",
      category: "Blog",
      author: "TSR GROUP",
    },
    {
      id: "yabanci-yatirimci-hatalari",
      title: "Yabancı Alıcıların Türkiye'de Yatırım Yaparken Yaptığı Hatalar",
      excerpt: "Tapu uygunluğu ve değerleme kontrolü yapılmadan kapora verilmesi en yaygın hatalardan biridir.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=800&fit=crop",
      date: "21 Ocak 2026",
      category: "Blog",
      author: "TSR GROUP",
    },
    {
      id: "turkiye-neden-gayrimenkul-gozdesi",
      title: "Türkiye Neden Küresel Gayrimenkul Yatırımcılarının Gözdesi Oldu?",
      excerpt: "Stratejik konum, turizm dinamikleri ve geniş ürün yelpazesi yabancı yatırımcıyı çekiyor.",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=800&fit=crop",
      date: "21 Ocak 2026",
      category: "Blog",
      author: "TSR GROUP",
    },
    {
      id: "turkiye-yasam-maliyeti",
      title: "Türkiye'de Genel Yaşam Maliyeti",
      excerpt: "Konut, gıda, ulaşım, sağlık ve sosyal yaşam kalemleri kur/enflasyonla birlikte toplam maliyeti belirler.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop",
      date: "21 Ocak 2026",
      category: "Blog",
      author: "TSR GROUP",
    },
    {
      id: "alanya-yasam-rehberi",
      title: "Alanya Yaşam Rehberi: Ulaşım, Çevre Yolu, Sahil Yolu ve Pratik Bilgiler",
      excerpt: "Kompakt şehir yapısı, sahil ve çevre yolu alternatifleri ve toplu taşıma hatları günlük yaşamı kolaylaştırır.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
      date: "21 Ocak 2026",
      category: "Blog",
      author: "TSR GROUP",
    },
    {
      id: "alanyada-yapilacaklar",
      title: "Alanya'da Yapılacaklar Listesi",
      excerpt: "Kale, teleferik, Dim Çayı, sahil yürüyüşleri ve su sporları popüler aktiviteler arasında.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      date: "21 Ocak 2026",
      category: "Blog",
      author: "TSR GROUP",
    },
    {
      id: "turkiye-ticari-alan-talep-artisi",
      title: "Türkiye’de Ticari Alanlara Talep Artışı",
      excerpt: "Turizm, perakende ve e-ticaret kaynaklı lojistik ihtiyacı ticari gayrimenkulde talebi artırıyor.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
      date: "21 Ocak 2026",
      category: "Blog",
      author: "TSR GROUP",
    },
  ];

  useEffect(() => {
    setPosts(staticPosts);
    setLoading(false);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tümü" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pb-12" style={{ background: '#b7b1ad', backgroundAttachment: 'fixed' }}>
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden mb-12">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop"
          alt="Blog ve Haberler"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/15 border border-white/30 rounded-full shadow-2xl">
                <Search className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
                Blog ve Haberler
              </h1>
              <p className="text-lg sm:text-xl md:text-xl text-white/90 max-w-2xl leading-relaxed drop-shadow-xl">
                Emlak sektörü, yatırım ipuçları ve dekorasyon önerileri hakkında güncel bilgiler.
              </p>
              {/* Search Bar */}
              <div className="relative max-w-xl">
                <input
                  type="text"
                  placeholder="Yazı ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border-2 border-white/30 bg-white/90 text-[#2e3c3a] placeholder-gray-500 focus:border-[#2e3c3a] focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]/20 pl-14 transition-all shadow-lg"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#2e3c3a]/70 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${selectedCategory === category
                ? "bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white shadow-xl scale-105"
                : "bg-white border border-white/60 text-[#2e3c3a] hover:border-[#2e3c3a] hover:shadow-md"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Guides / Özel Sayfalar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Citizenship Card */}
          <Link href="/vatandaslik" className="group relative h-64 rounded-2xl overflow-hidden shadow-2xl transition-all hover:scale-[1.02]">
            <Image
              src="https://images.unsplash.com/photo-1527838832700-50592524d785?w=1200&auto=format&fit=crop"
              alt="Vatandaşlık Rehberi"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="bg-[#EDC370] text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">ÖZEL SAYFA</div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#EDC370] transition-colors">Yatırım Yoluyla Vatandaşlık</h3>
              <p className="text-white/80 line-clamp-2">400.000$ alt limiti, uygunluk hesaplayıcı ve adım adım başvuru süreci.</p>
            </div>
          </Link>

          {/* Holiday Homes Card */}
          <Link href="/tatil-evleri" className="group relative h-64 rounded-2xl overflow-hidden shadow-2xl transition-all hover:scale-[1.02]">
            <Image
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop"
              alt="Tatil Evleri"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="bg-[#EDC370] text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">VİTRİN</div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#EDC370] transition-colors">Tatil Evleri (Holiday Homes)</h3>
              <p className="text-white/80 line-clamp-2">İngiliz yatırımcılar için özel seçilmiş, yüksek kira getirili eşyalı daireler.</p>
            </div>
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group">
                <article className="bg-white border border-white/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full hover:border-[#2e3c3a]/40">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white uppercase tracking-wider shadow-lg">
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-xs text-[#2e3c3a]/70 mb-4 space-x-2">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>
                    <h2 className="text-xl font-bold text-[#2e3c3a] mb-3 group-hover:text-[#3a4d4a] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-[#2e3c3a]/80 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t border-[#2e3c3a]/15 flex items-center justify-between">
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white px-6 py-2.5 rounded-xl transition-all font-semibold text-sm shadow-lg hover:shadow-xl group"
                      >
                        <span>Devamını Oku</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sonuç Bulunamadı</h3>
            <p className="text-white/80 mb-6">
              &quot;{searchTerm}&quot; araması için herhangi bir yazı bulunamadı.
            </p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedCategory("Tümü"); }}
              className="px-6 py-3 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
