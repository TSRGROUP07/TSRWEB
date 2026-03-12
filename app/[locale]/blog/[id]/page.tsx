"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Clock, Eye, BookOpen, MessageSquare, Phone, Mail, Send, ArrowRight } from "lucide-react";
import Image from "next/image";
import SocialShare from "@/components/SocialShare";
import StructuredData from "@/components/StructuredData";
import { getBlogPostSchema } from "@/lib/seo";

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  category: string;
  createdAt: string;
  updatedAt?: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Statik blog içeriği (API yerine)
  const staticBlog = (id: string): Blog | null => {
    const match = STATIC_BLOGS.find((b) => b.id === id);
    if (!match) return null;
    return {
      ...match,
      createdAt: match.createdAt,
      updatedAt: match.createdAt,
    };
  };

  const STATIC_BLOGS: Blog[] = [
    {
      id: "yabancilar-vatandaslik",
      title: "Yabancılar Türkiye'de Nasıl T.C. Vatandaşı Olabilir?",
      excerpt: "Yatırım yoluyla vatandaşlıkta gayrimenkul alımı öne çıkıyor; 400.000 USD ve 3 yıl satmama şerhi gibi koşullar var.",
      image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&h=800&fit=crop",
      category: "Blog",
      createdAt: "2026-01-21",
      content: `
        <p>Türkiye'de vatandaşlık edinmenin birden fazla yolu vardır. En çok merak edilen yöntemlerden biri yatırım yoluyla vatandaşlıktır. Bu yöntemde, özellikle gayrimenkul alımı öne çıkar.</p>
        <p><strong>Başlıca yollar</strong></p>
        <ul>
          <li>Evlilik yoluyla (belirli süre ve koşullar)</li>
          <li>Uzun süreli ikamet + istisnai şartlar</li>
          <li>Yatırım yoluyla vatandaşlık</li>
          <li>Doğum/soy bağı gibi özel durumlar</li>
        </ul>
        <p><strong>Yatırım yoluyla vatandaşlık (gayrimenkul)</strong><br/>Genel çerçevede; en az 400.000 USD değerinde (veya karşılığı döviz) gayrimenkul edinimi ve en az 3 yıl satmama şerhi gibi koşullar bulunur. Bu eşik ve kurallar resmi düzenlemelerle tanımlanır.</p>
        <p><strong>Süreç genel akışı</strong></p>
        <ol>
          <li>Uygun taşınmaz(lar)ın seçimi ve hukuki/teknik kontrol</li>
          <li>Tapu işlemleri + değerleme + uygunluk süreçleri</li>
          <li>İlgili kurum onayları ve başvuru dosyasının hazırlanması</li>
          <li>Vatandaşlık başvurusu ve değerlendirme</li>
        </ol>
        <p><strong>TSR Notu:</strong> Vatandaşlık hedefi olan alımlarda "uygunluk" detayları kritik olduğu için; ilan fiyatından önce tapu uygunluğu, değerleme, şerh ve ödeme kanalı doğru kurulmalı.</p>
      `,
    },
    {
      id: "ikamet-izni-nasil-alinir",
      title: "İkametgâh (İkamet İzni) Nasıl Alınır?",
      excerpt: "e-İkamet üzerinden online başvuru, randevu ve evrak teslimi temel adımlardır; türüne göre belge listesi değişir.",
      image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=800&fit=crop",
      category: "Blog",
      createdAt: "2026-01-21",
      content: `
        <p>Türkiye'de ikamet izni başvuruları genellikle Göç İdaresi'nin e-İkamet sistemi üzerinden yapılır.</p>
        <p><strong>Temel adımlar</strong></p>
        <ol>
          <li>e-İkamet üzerinden online başvuru (ilk başvuru/uzatma/geçiş)</li>
          <li>Sistemden randevu alınması</li>
          <li>Randevu gününde il göç idaresine evrak teslimi</li>
          <li>Değerlendirme ve kart basımı/teslim</li>
        </ol>
        <p><strong>Sık istenen belgeler (türe göre değişir)</strong></p>
        <ul>
          <li>Pasaport/kimlik fotokopileri</li>
          <li>Adres ve konaklama belgesi (kira kontratı, tapu vb.)</li>
          <li>Sağlık sigortası (bazı türlerde)</li>
          <li>Biyometrik fotoğraf</li>
          <li>Harç/ödeme dekontları (duruma göre)</li>
        </ul>
        <p><strong>Önemli:</strong> Belgeler ve şartlar ikamet türüne göre değişir; en sağlıklısı başvuruyu e-İkamet ekranındaki güncel yönlendirmeye göre yürütmektir.</p>
        <p><strong>TSR Notu:</strong> Satın alma sonrası ikamet hedefi olan müşterilerde; adres/kontrat düzeni ve randevu planı baştan kurgulanırsa süreç çok daha hızlı ilerler.</p>
      `,
    },
    {
      id: "kisa-donem-kiralama-farklari",
      title: "Kısa Dönem Kiralama: Uzun Döneme Kıyasla Farkları ve Faydaları",
      excerpt: "Dinamik fiyatlandırma ve esnek nakit akışı sağlar; izin belgesi ve mevzuat gereklilikleri takip edilmelidir.",
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&h=800&fit=crop",
      category: "Blog",
      createdAt: "2026-01-21",
      content: `
        <p>Kısa dönem kiralama; doğru yönetildiğinde gelir optimizasyonu sağlar. Uzun dönem kiralamaya göre daha "aktif yönetim" ister, ama doğru stratejiyle avantajları büyüktür.</p>
        <p><strong>Kısa dönem kiralamanın avantajları</strong></p>
        <ul>
          <li>Dinamik fiyatlandırma: Sezon/hafta sonu/etkinliğe göre fiyat artırma</li>
          <li>Nakit akışı esnekliği: Aylık değil, günlük/haftalık gelir</li>
          <li>Mülkün kontrolü: Daireyi ihtiyaç halinde bloklama/kişisel kullanım</li>
          <li>Bakım standardı: Düzenli temizlik ve denetimle mülkün korunması</li>
        </ul>
        <p><strong>Dikkat edilmesi gerekenler (Türkiye'de düzenleme)</strong><br/>Turizm amaçlı kısa süreli kiralama izin belgesi ve yerel mevzuat yükümlülükleri takip edilmelidir.</p>
        <p><strong>TSR Notu:</strong> SMART TSR gibi araçlarla doluluk, ADR, komisyon ve giderleri şeffaf göstererek yatırımcı güvenini artırabilirsiniz.</p>
      `,
    },
    {
      id: "yabanci-yatirimci-hatalari",
      title: "Yabancı Alıcıların Türkiye'de Yatırım Yaparken Yaptığı Hatalar",
      excerpt: "Tapu uygunluğu ve değerleme kontrolü yapılmadan kapora verilmesi en yaygın hatalardan biridir.",
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb512?w=1200&h=800&fit=crop",
      category: "Blog",
      createdAt: "2026-01-21",
      content: `
        <p>Yabancı yatırımcılarda en sık sorun, "fiyat odaklı" karar verip uygunluk ve süreç maliyetlerini ikinci plana atmak.</p>
        <p><strong>En yaygın hatalar</strong></p>
        <ul>
          <li>Değerleme/tapu uygunluğu kontrol edilmeden kapora verilmesi</li>
          <li>Ödemeyi doğru kanal ile getirmeden ilerlemek</li>
          <li>Lokasyon seçimini tek kritere bağlamak</li>
          <li>Kira getirisi hesabında gider ve boş günleri eksik hesaplamak</li>
          <li>Sözleşme detaylarını netleştirmemek</li>
        </ul>
        <p><strong>Doğru yaklaşım:</strong> Kontrol listesi, net yatırım hedefi ve şeffaf toplam maliyet tablosu.</p>
      `,
    },
    {
      id: "turkiye-neden-gayrimenkul-gozdesi",
      title: "Türkiye Neden Küresel Gayrimenkul Yatırımcılarının Gözdesi Oldu?",
      excerpt: "Stratejik konum, turizm dinamikleri ve geniş ürün yelpazesi yabancı yatırımcıyı çekiyor.",
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=800&fit=crop",
      category: "Blog",
      createdAt: "2026-01-21",
      content: `
        <p>Türkiye; stratejik konumu, turizm gücü ve geniş ürün yelpazesiyle yatırımcıların radarında.</p>
        <p><strong>Öne çıkan nedenler</strong>: turizm hareketliliği, vatandaşlık imkânı, farklı bütçelere uygun pazar, altyapı yatırımları, yabancı sermaye ilgisi.</p>
        <p><strong>TSR Notu:</strong> Doğru lokasyon + strateji + yönetim üçlüsü kritik.</p>
      `,
    },
    {
      id: "turkiye-yasam-maliyeti",
      title: "Türkiye'de Genel Yaşam Maliyeti",
      excerpt: "Konut, gıda, ulaşım, sağlık ve sosyal yaşam kalemleri kur/enflasyonla birlikte toplam maliyeti belirler.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
      category: "Blog",
      createdAt: "2026-01-21",
      content: `
        <p>Yaşam maliyeti şehir, yaşam tarzı ve makro göstergelere göre değişir. TÜFE verileri düzenli yayımlanır.</p>
        <p><strong>Ana kalemler:</strong> Konut, gıda, ulaşım, sağlık, eğitim, sosyal yaşam.</p>
        <p><strong>Pratik öneri:</strong> Bekar/çift/aile senaryoları ile maliyet tablosu karar sürecini hızlandırır.</p>
      `,
    },
    {
      id: "alanya-yasam-rehberi",
      title: "Alanya Yaşam Rehberi: Ulaşım, Çevre Yolu, Sahil Yolu ve Pratik Bilgiler",
      excerpt: "Kompakt şehir yapısı, sahil ve çevre yolu alternatifleri ve toplu taşıma hatları günlük yaşamı kolaylaştırır.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
      category: "Blog",
      createdAt: "2026-01-21",
      content: `
        <p>Alanya'da kompakt yapı ve ulaşım alternatifleri günlük yaşamı kolaylaştırır.</p>
        <p><strong>Şehir içi ulaşım</strong>: halk otobüsleri ve belediye hatları merkez–Oba–Kestel–Mahmutlar arasında yaygın.</p>
        <p><strong>Çevre yolu & sahil yolu</strong>: sahil yolu turistik-pratik, çevre yolu yoğun saatlerde akıcı.</p>
        <p><strong>TSR Notu:</strong> "5 dakikalık yaşam haritası" satış hızını artırır.</p>
      `,
    },
    {
      id: "alanyada-yapilacaklar",
      title: "Alanya'da Yapılacaklar Listesi",
      excerpt: "Kale, teleferik, Dim Çayı, sahil yürüyüşleri ve su sporları popüler aktiviteler arasında.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3f?w=1200&h=800&fit=crop",
      category: "Blog",
      createdAt: "2026-01-21",
      content: `
        <p>Alanya hem tatil hem yaşam için güçlü bir destinasyon.</p>
        <p><strong>Doğa & manzara</strong>: Alanya Kalesi, teleferik, Dim Çayı, kanyon/şelale rotaları.</p>
        <p><strong>Deniz & plaj</strong>: Kleopatra Plajı, Oba/Kestel hattı, su sporları.</p>
        <p><strong>Şehir yaşamı</strong>: Yerel pazarlar, sahil yürüyüşleri, kafe–restoran rotaları.</p>
      `,
    },
    {
      id: "turkiye-ticari-alan-talep-artisi",
      title: "Türkiye'de Ticari Alanlara Talep Artışı",
      excerpt: "Turizm, perakende ve e-ticaret kaynaklı lojistik ihtiyacı ticari gayrimenkulde talebi artırıyor.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
      category: "Blog",
      createdAt: "2026-01-21",
      content: `
        <p>Ticari gayrimenkulde 2025 raporları yatırım hacminde artışa işaret ediyor.</p>
        <p><strong>Talebi artıran faktörler</strong>: turizm/hizmet ekonomisi, perakende lokasyonları, e-ticaret lojistiği, esnek ofis modelleri.</p>
        <p><strong>TSR Notu:</strong> Kiracı profili + sözleşme + lokasyon akışı (yaya trafiği/erişim) her şeydir.</p>
      `,
    },
  ];

  useEffect(() => {
    if (params.id) {
      const data = staticBlog(params.id as string);
      setBlog(data);
      
      // İlgili blogları yükle (mevcut blog hariç)
      if (data) {
        const related = STATIC_BLOGS
          .filter((b) => b.id !== data.id)
          .slice(0, 4);
        setRelatedBlogs(related);
      }
      
      setLoading(false);
    }
  }, [params.id]);

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      alert("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    try {
      // Burada API çağrısı yapılabilir
      console.log("Blog talep formu submit:", { formData, blogId: blog?.id });
      
      // Simüle edilmiş başarı
      setFormSubmitted(true);
      
      // Formu temizle
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
        setFormSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Form submit error:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#b7b1ad] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e3c3a] mx-auto mb-4"></div>
          <p className="text-white">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#b7b1ad] flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Blog yazısı bulunamadı</h1>
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-[#2e3c3a] hover:bg-[#3a4d4a] text-white rounded-lg transition-colors mt-4"
          >
            Blog'a Dön
          </Link>
        </div>
      </div>
    );
  }

  // Structured Data için blog schema oluştur
  const blogSchema = blog
    ? getBlogPostSchema({
        title: blog.title,
        description: blog.excerpt || blog.content?.substring(0, 160) || "",
        image: blog.image,
        url: `/blog/${blog.id}`,
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt || blog.createdAt,
      })
    : null;

  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      {blogSchema && <StructuredData data={blogSchema} />}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-white/80 mb-6">
          <Link href="/" className="hover:text-white">Ana Sayfa</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-white line-clamp-1">{blog.title}</span>
        </nav>

        {/* Main Content - İki Kolonlu Tasarım */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sol Kolon - İçerik */}
          <div className="lg:col-span-2 space-y-6">
            {/* Başlık ve Meta Bilgiler */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2e3c3a] mb-4 leading-tight">
                {blog.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#2e3c3a]/70 mb-4 pb-4 border-b border-[#2e3c3a]/20">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <span>{blog.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{Math.floor(Math.random() * 500) + 100} görüntülenme</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{Math.floor(Math.random() * 10) + 3} dk okuma</span>
                </div>
              </div>

              {/* Aksiyon Butonları */}
              <div className="flex flex-wrap gap-3">
                <SocialShare
                  url={`/blog/${blog.id}`}
                  title={blog.title}
                  description={blog.excerpt || ""}
                  className="!bg-[#2e3c3a] hover:!bg-[#3a4d4a] !text-white"
                />
              </div>
            </div>

            {/* Ana Görsel */}
            {blog.image && (
              <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-white/20 shadow-xl group">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            )}

            {/* Excerpt */}
            {blog.excerpt && (
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-white/40">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-6 w-6 text-[#2e3c3a] mt-1 flex-shrink-0" />
                  <p className="text-lg text-[#2e3c3a] leading-relaxed italic">
                    {blog.excerpt}
                  </p>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-10">
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:!text-[#2e3c3a] prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8
                  prose-h1:!text-[#2e3c3a] prose-h1:text-3xl prose-h2:!text-[#2e3c3a] prose-h2:text-2xl prose-h3:!text-[#2e3c3a] prose-h3:text-xl
                  prose-p:!text-[#2e3c3a] prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base
                  prose-strong:!text-[#2e3c3a] prose-strong:font-bold
                  prose-ul:!text-[#2e3c3a] prose-ul:mb-4 prose-ul:pl-6
                  prose-ol:!text-[#2e3c3a] prose-ol:mb-4 prose-ol:pl-6
                  prose-li:!text-[#2e3c3a] prose-li:mb-2 prose-li:leading-relaxed
                  prose-a:!text-[#3a4d4a] prose-a:no-underline hover:prose-a:underline prose-a:font-semibold
                  prose-blockquote:!border-[#2e3c3a] prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:!text-[#2e3c3a]
                  prose-code:!text-[#2e3c3a] prose-code:bg-[#2e3c3a]/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                  prose-pre:!bg-[#2e3c3a] prose-pre:!text-white
                  [&>*]:!text-[#2e3c3a] [&_p]:!text-[#2e3c3a] [&_span]:!text-[#2e3c3a] [&_div]:!text-[#2e3c3a]"
                style={{ color: '#2e3c3a' }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>

          {/* Sağ Kolon - Sidebar */}
          <div className="space-y-6">
            {/* Blog'a Dön Butonu */}
            <Link
              href="/blog"
              className="block w-full px-6 py-3 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white rounded-xl transition-all shadow-lg hover:shadow-xl text-center font-semibold flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Blog'a Dön</span>
            </Link>

            {/* İletişim Formu */}
            <div id="request-form" className="bg-white rounded-2xl shadow-xl p-6 border border-white/40 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#4f271b] p-3 rounded-xl">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2e3c3a]">Sorularınız mı var?</h3>
                  <p className="text-sm text-[#2e3c3a]/70 mt-1">Size en kısa sürede dönüş yapalım</p>
                </div>
              </div>
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-center">
                  <p className="font-semibold">Talebiniz başarıyla oluşturuldu!</p>
                  <p className="text-sm mt-1">En kısa sürede size dönüş yapacağız.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2e3c3a] focus:border-[#2e3c3a] text-[#2e3c3a] placeholder-gray-500"
                      placeholder="Adınız"
                    />
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2e3c3a] focus:border-[#2e3c3a] text-[#2e3c3a] placeholder-gray-500"
                      placeholder="Soyadınız"
                    />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2e3c3a] focus:border-[#2e3c3a] text-[#2e3c3a] placeholder-gray-500"
                    placeholder="E-posta"
                  />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2e3c3a] focus:border-[#2e3c3a] text-[#2e3c3a] placeholder-gray-500"
                    placeholder="Telefon (Opsiyonel)"
                  />
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2e3c3a] focus:border-[#2e3c3a] text-[#2e3c3a] placeholder-gray-500 resize-none"
                    placeholder="Mesajınız..."
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white py-3 rounded-lg hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] transition-all flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl"
                  >
                    <Send className="h-5 w-5" />
                    <span>Gönder</span>
                  </button>
                </form>
              )}
            </div>

            {/* Hızlı İletişim */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-white/40">
              <h3 className="text-lg font-bold text-[#2e3c3a] mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Hızlı İletişim
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+905303330097"
                  className="block w-full bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] hover:from-[#3a4d4a] hover:to-[#2e3c3a] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>Hemen Ara</span>
                </a>
                <a
                  href="mailto:info@tsrgroup.com"
                  className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Mail className="h-5 w-5" />
                  <span>E-posta Gönder</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* İlgili Blog Yazıları */}
        {relatedBlogs.length > 0 && (
          <div className="mt-12">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">İlgili Blog Yazıları</h2>
              <p className="text-white/80 text-lg">
                Bu yazıya benzer, ilginizi çekebilecek diğer blog yazılarını keşfedin
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  href={`/blog/${relatedBlog.id}`}
                  className="block group"
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-white/20 hover:border-white/40 h-full flex flex-col">
                    {/* Image */}
                    {relatedBlog.image && (
                      <div className="relative h-48 bg-gray-200 overflow-hidden">
                        <Image
                          src={relatedBlog.image}
                          alt={relatedBlog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white text-xs font-bold rounded-full">
                            {relatedBlog.category}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="mb-2">
                        <div className="text-xs text-[#2e3c3a]/70 mb-2">
                          {new Date(relatedBlog.createdAt).toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                        <h3 className="text-lg font-bold text-[#2e3c3a] mb-2 line-clamp-2 group-hover:text-[#3a4d4a] transition-colors">
                          {relatedBlog.title}
                        </h3>
                        {relatedBlog.excerpt && (
                          <p className="text-sm text-[#2e3c3a]/70 line-clamp-2 mb-4">
                            {relatedBlog.excerpt}
                          </p>
                        )}
                      </div>
                      <div className="mt-auto">
                        <span className="inline-flex items-center space-x-2 text-[#3a4d4a] font-semibold text-sm group-hover:text-[#2e3c3a] transition-colors">
                          <span>Devamını Oku</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
