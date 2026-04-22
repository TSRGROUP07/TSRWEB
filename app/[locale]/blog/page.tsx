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



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/admin/blogs");
        if (response.ok) {
          const data = await response.json();
          // Filter only published ones for public view
          const publishedPosts = data.filter((p: any) => p.published);
          setPosts(publishedPosts);
        }
      } catch (error) {
        console.error("Bloglar yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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
