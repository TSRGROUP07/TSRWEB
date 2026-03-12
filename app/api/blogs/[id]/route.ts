import { NextRequest, NextResponse } from "next/server";

// Aynı statik listeyi burada da tanımlıyoruz
const BLOGS = [
  {
    id: "yabancilar-vatandaslik",
    title: "Yabancılar Türkiye’de Nasıl T.C. Vatandaşı Olabilir?",
    category: "Blog",
    createdAt: "2026-01-21",
    excerpt: "Yatırım yoluyla vatandaşlıkta gayrimenkul alımı öne çıkıyor; 400.000 USD ve 3 yıl satmama şerhi gibi koşullar var.",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&h=800&fit=crop",
    content: `
      <p>Türkiye’de vatandaşlık edinmenin birden fazla yolu vardır. En çok merak edilen yöntemlerden biri yatırım yoluyla vatandaşlıktır. Bu yöntemde, özellikle gayrimenkul alımı öne çıkar.</p>
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
      <p><strong>TSR Notu:</strong> Vatandaşlık hedefi olan alımlarda “uygunluk” detayları kritik olduğu için; ilan fiyatından önce tapu uygunluğu, değerleme, şerh ve ödeme kanalı doğru kurulmalı.</p>
    `,
  },
  {
    id: "ikamet-izni-nasil-alinir",
    title: "İkametgâh (İkamet İzni) Nasıl Alınır?",
    category: "Blog",
    createdAt: "2026-01-21",
    excerpt: "e-İkamet üzerinden online başvuru, randevu ve evrak teslimi temel adımlardır; türüne göre belge listesi değişir.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=800&fit=crop",
    content: `
      <p>Türkiye’de ikamet izni başvuruları genellikle Göç İdaresi’nin e-İkamet sistemi üzerinden yapılır.</p>
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
    category: "Blog",
    createdAt: "2026-01-21",
    excerpt: "Dinamik fiyatlandırma ve esnek nakit akışı sağlar; izin belgesi ve mevzuat gereklilikleri takip edilmelidir.",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=800&fit=crop",
    content: `
      <p>Kısa dönem kiralama; doğru yönetildiğinde gelir optimizasyonu sağlar. Uzun dönem kiralamaya göre daha “aktif yönetim” ister, ama doğru stratejiyle avantajları büyüktür.</p>
      <p><strong>Kısa dönem kiralamanın avantajları</strong></p>
      <ul>
        <li>Dinamik fiyatlandırma: Sezon/hafta sonu/etkinliğe göre fiyat artırma</li>
        <li>Nakit akışı esnekliği: Aylık değil, günlük/haftalık gelir</li>
        <li>Mülkün kontrolü: Daireyi ihtiyaç halinde bloklama/kişisel kullanım</li>
        <li>Bakım standardı: Düzenli temizlik ve denetimle mülkün korunması</li>
      </ul>
      <p><strong>Dikkat edilmesi gerekenler (Türkiye’de düzenleme tarafı)</strong><br/>Konutların turizm amaçlı kısa süreli kiralanmasına ilişkin izin belgesi gibi yükümlülükler ve süre/uygulama detayları mevzuatta yer alır; uygulamada güncel şartlar il/kurum süreçlerine göre takip edilmelidir.</p>
      <p><strong>TSR Notu:</strong> SMART TSR gibi hesaplama araçlarıyla; doluluk, ADR, komisyon ve giderleri şeffaf göstererek yatırımcı güvenini artırabilirsiniz.</p>
    `,
  },
  {
    id: "yabanci-yatirimci-hatalari",
    title: "Yabancı Alıcıların Türkiye'de Yatırım Yaparken Yaptığı Hatalar",
    category: "Blog",
    createdAt: "2026-01-21",
    excerpt: "Tapu uygunluğu ve değerleme kontrolü yapılmadan kapora verilmesi en yaygın hatalardan biridir.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=800&fit=crop",
    content: `
      <p>Yabancı yatırımcılarda en sık sorun, “fiyat odaklı” karar verip uygunluk ve süreç maliyetlerini ikinci plana atmak oluyor.</p>
      <p><strong>En yaygın hatalar</strong></p>
      <ul>
        <li>Değerleme/tapu uygunluğu kontrol edilmeden kapora verilmesi</li>
        <li>Ödemeyi “doğru kanal” ile getirmeden ilerlemek (bankacılık/transfer planı)</li>
        <li>Lokasyon seçimini tek kritere bağlamak</li>
        <li>Kira getirisi hesabında boş gün, aidat, bakım, vergi/komisyonları eksik hesaplamak</li>
        <li>Sözleşme detaylarını netleştirmemek</li>
      </ul>
      <p><strong>Doğru yaklaşım</strong></p>
      <ul>
        <li>Satın alma öncesi kontrol listesi (tapu, iskan, yönetim planı, aidat, kiralama potansiyeli)</li>
        <li>Net yatırım hedefi: oturum / vatandaşlık / kira geliri / değer artışı</li>
        <li>Şeffaf “toplam maliyet” tablosu</li>
      </ul>
      <p><strong>TSR Notu:</strong> “Şeffaf hesap + süreç yönetimi” yabancı yatırımcıda en çok güven yaratan şeydir.</p>
    `,
  },
  {
    id: "turkiye-neden-gayrimenkul-gozdesi",
    title: "Türkiye Neden Küresel Gayrimenkul Yatırımcılarının Gözdesi Oldu?",
    category: "Blog",
    createdAt: "2026-01-21",
    excerpt: "Stratejik konum, turizm dinamikleri ve geniş ürün yelpazesi yabancı yatırımcıyı çekiyor.",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=800&fit=crop",
    content: `
      <p>Türkiye; Avrupa, Orta Doğu ve Asya arasında stratejik konumu, güçlü turizm dinamikleri ve geniş emlak ürün çeşitliliğiyle yatırımcıların radarında.</p>
      <p><strong>Öne çıkan nedenler</strong></p>
      <ul>
        <li>Turizm ve sezon hareketliliği</li>
        <li>Yatırım yoluyla vatandaşlık seçeneği</li>
        <li>Farklı bütçelere uygun pazar</li>
        <li>Büyük altyapı ve şehirleşme dinamikleri</li>
        <li>Yabancı sermaye akımlarına bağlı talep</li>
      </ul>
      <p><strong>TSR Notu:</strong> “Doğru lokasyon + doğru strateji + doğru yönetim” üçlüsü kritik.</p>
    `,
  },
  {
    id: "turkiye-yasam-maliyeti",
    title: "Türkiye'de Genel Yaşam Maliyeti",
    category: "Blog",
    createdAt: "2026-01-21",
    excerpt: "Konut, gıda, ulaşım, sağlık ve sosyal yaşam kalemleri kur/enflasyonla birlikte toplam maliyeti belirler.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop",
    content: `
      <p>Yaşam maliyeti; şehir, yaşam tarzı ve döviz kuru / enflasyon gibi makro göstergelere göre değişir. TÜİK TÜFE verileri düzenli yayımlanır.</p>
      <p><strong>Ana kalemler</strong></p>
      <ul>
        <li>Konut: kira/aidat/elektrik-su-internet</li>
        <li>Gıda ve market</li>
        <li>Ulaşım</li>
        <li>Sağlık ve eğitim</li>
        <li>Sosyal yaşam</li>
      </ul>
      <p><strong>Yatırımcı için pratik öneri:</strong> Bekar/çift/aile senaryoları ile yaşam maliyeti tablosu karar sürecini hızlandırır.</p>
    `,
  },
  {
    id: "alanya-yasam-rehberi",
    title: "Alanya Yaşam Rehberi: Ulaşım, Çevre Yolu, Sahil Yolu ve Pratik Bilgiler",
    category: "Blog",
    createdAt: "2026-01-21",
    excerpt: "Kompakt şehir yapısı, sahil ve çevre yolu alternatifleri ve toplu taşıma hatları günlük yaşamı kolaylaştırır.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop",
    content: `
      <p>Alanya’da günlük yaşamın en önemli avantajlarından biri kompakt yapı ve ulaşım alternatifleridir.</p>
      <p><strong>Şehir içi ulaşım</strong><br/>Özel halk otobüsleri ve belediye hatları merkez–Oba–Kestel–Mahmutlar arasında yaygındır.</p>
      <p><strong>Çevre yolu & sahil yolu</strong><br/>Sahil yolu turistik ve pratik, çevre yolu yoğun saatlerde daha akıcıdır.</p>
      <p><strong>TSR Notu:</strong> Müşteriye ev gösteriminde “5 dakikalık yaşam haritası” (market, okul, sahil, ulaşım) satış hızını artırır.</p>
    `,
  },
  {
    id: "alanyada-yapilacaklar",
    title: "Alanya'da Yapılacaklar Listesi",
    category: "Blog",
    createdAt: "2026-01-21",
    excerpt: "Kale, teleferik, Dim Çayı, sahil yürüyüşleri ve su sporları popüler aktiviteler arasında.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    content: `
      <p>Alanya, hem tatil hem yaşam için güçlü bir destinasyon.</p>
      <p><strong>Doğa & manzara</strong><br/>Alanya Kalesi, teleferik, Dim Çayı, kanyon/şelale rotaları.</p>
      <p><strong>Deniz & plaj</strong><br/>Kleopatra Plajı, Oba/Kestel hattı, su sporları.</p>
      <p><strong>Şehir yaşamı</strong><br/>Yerel pazarlar, sahil yürüyüşleri, kafe–restoran rotaları.</p>
    `,
  },
  {
    id: "turkiye-ticari-alan-talep-artisi",
    title: "Türkiye’de Ticari Alanlara Talep Artışı",
    category: "Blog",
    createdAt: "2026-01-21",
    excerpt: "Turizm, perakende ve e-ticaret kaynaklı lojistik ihtiyacı ticari gayrimenkulde talebi artırıyor.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    content: `
      <p>Ticari gayrimenkul; ofis, mağaza, depo/lojistik gibi segmentlere ayrılır. 2025’te ticari yatırım hacminde artış raporlanıyor.</p>
      <p><strong>Talebi artıran faktörler</strong></p>
      <ul>
        <li>Turizm ve hizmet ekonomisinin genişlemesi</li>
        <li>Perakende lokasyonlarının değerlenmesi</li>
        <li>E-ticaret ve lojistik ihtiyacı</li>
        <li>Yeni iş modelleri (esnek ofis vb.)</li>
      </ul>
      <p><strong>TSR Notu:</strong> Kiracı profili + sözleşme + lokasyon akışı (yaya trafiği/erişim) her şeydir.</p>
    `,
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);
    const blog = BLOGS.find((b) => b.id === id);

    if (!blog) {
      return NextResponse.json(
        { error: "Blog bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error: any) {
    console.error("Blog GET error:", error);
    return NextResponse.json(
      { error: "Blog yüklenemedi", details: error.message },
      { status: 500 }
    );
  }
}












