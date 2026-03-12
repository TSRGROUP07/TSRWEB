"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  image: string;
  category: string;
}

export default function BlogCards() {
  const t = useTranslations('blog');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState(t('categories.all'));
  const [loading, setLoading] = useState(true);
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>([]);

  const categories = [t('categories.all')];

  // Statik blog listesi (API yokken)
  const staticPosts: BlogPost[] = [
    {
      id: "yabancilar-vatandaslik",
      title: t('posts.citizenship.title'),
      date: t('posts.citizenship.date'),
      image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&h=800&fit=crop",
      category: t('categories.all'),
    },
    {
      id: "ikamet-izni-nasil-alinir",
      title: t('posts.residency.title'),
      date: t('posts.residency.date'),
      image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=800&fit=crop",
      category: t('categories.all'),
    },
    {
      id: "kisa-donem-kiralama-farklari",
      title: t('posts.shortTerm.title'),
      date: t('posts.shortTerm.date'),
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&h=800&fit=crop",
      category: t('categories.all'),
    },
  ];

  useEffect(() => {
    // API kapalıyken statik listeyi kullan
    setAllBlogPosts(staticPosts);
    setLoading(false);
  }, [t]);

  // Aktif kategoriye göre blogları filtrele
  const filteredPosts = allBlogPosts.filter(
    (post) => post.category === activeCategory
  );

  // Tek kategori: Blog. İlk 3 kaydı göster.
  const blogPosts = filteredPosts.slice(0, 3);

  const nextSlide = () => {
    if (blogPosts.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % blogPosts.length);
    }
  };

  const prevSlide = () => {
    if (blogPosts.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
    }
  };

  return (
    <section className="py-12 lg:py-16" style={{ background: '#b7b1ad' }}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 animate-slide-up">
          <div className="flex space-x-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-xl font-bold transition-all relative pb-2 ${activeCategory === category
                  ? "text-[#2e3c3a]"
                  : "text-white/70 hover:text-[#2e3c3a]"
                  }`}
              >
                {category}
                {activeCategory === category && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-full"></span>
                )}
              </button>
            ))}
          </div>
          <Link
            href="/blog"
            prefetch={true}
            className="flex items-center space-x-2 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] px-6 py-3 rounded-xl text-white font-semibold transition-all group shadow-lg hover:shadow-xl"
          >
            <span>{t('seeAll')}</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Cards Carousel */}
        <div className="relative overflow-visible">
          {/* Navigation Arrows */}
          {blogPosts.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-gradient-to-r hover:from-[#2e3c3a] hover:via-[#3a4d4a] hover:to-[#2e3c3a] border-2 border-white/30 hover:border-white/50 rounded-full transition-all shadow-2xl hover:shadow-[0_0_30px_rgba(46,60,58,0.5)] hover:scale-110 group flex items-center justify-center"
                aria-label={t('prev')}
              >
                <ChevronLeft className="h-6 w-6 text-white group-hover:text-white transition-colors" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-gradient-to-r hover:from-[#2e3c3a] hover:via-[#3a4d4a] hover:to-[#2e3c3a] border-2 border-white/30 hover:border-white/50 rounded-full transition-all shadow-2xl hover:shadow-[0_0_30px_rgba(46,60,58,0.5)] hover:scale-110 group flex items-center justify-center"
                aria-label={t('next')}
              >
                <ChevronRight className="h-6 w-6 text-white group-hover:text-white transition-colors" />
              </button>
            </>
          )}

          {/* Cards Container - Carousel */}
          <div className="overflow-hidden px-4 md:px-16">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {loading ? (
                <div className="w-full flex-shrink-0 text-center py-12">
                  <p className="text-white">{t('loading')}</p>
                </div>
              ) : blogPosts.length > 0 ? (
                blogPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="w-full flex-shrink-0 px-2 md:px-6"
                  >
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl max-w-4xl mx-auto group">
                      {/* Image */}
                      <div className="relative h-64 sm:h-80 lg:h-96 w-full bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] overflow-hidden">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                            priority={index === currentIndex && index === 0}
                            loading={index === currentIndex ? "eager" : "lazy"}
                            quality={85}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="absolute inset-0 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] flex items-center justify-center"><span class="text-sm text-white font-semibold">${t('imageError')}</span></div>`;
                              }
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] flex items-center justify-center">
                            <span className="text-sm text-white font-semibold">{t('noImage')}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6 lg:p-8">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm text-white/70 font-semibold uppercase tracking-wider">{post.date}</p>
                          <span className="px-3 py-1 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white text-xs font-bold rounded-full">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold mb-6 line-clamp-2 text-white leading-tight group-hover:text-white/90 transition-colors">
                          {post.title}
                        </h3>
                        <Link
                          href={`/blog/${post.id}`}
                          prefetch={true}
                          className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white px-6 py-3 rounded-xl transition-all font-semibold group text-sm shadow-lg hover:shadow-xl"
                        >
                          <span>{t('readMore')}</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex-shrink-0 text-center py-12">
                  <p className="text-white">{t('noPosts')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Carousel Indicators */}
          {blogPosts.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {blogPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${index === currentIndex
                    ? "w-8 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a]"
                    : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

