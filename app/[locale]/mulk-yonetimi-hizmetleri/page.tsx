"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Home,
  Scale,
  Wrench,
  Key,
  FileText,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Building2,
  Users,
  Calculator,
  MessageSquare,
  X,
  Send
} from "lucide-react";

export default function MulkYonetimiHizmetleriPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    {
      icon: Home,
      title: "Kira Takibi",
      description: "Dijital kira takibi ile ödemelerinizi otomatik takip edin, gecikmeleri anında görün.",
      color: "#EDC370",
      image: "/assets/mulk-yonetimi/kira_takibi.png"
    },
    {
      icon: Scale,
      title: "Hukuki Süreçler",
      description: "Kira sözleşmeleri, hukuki uyumluluk ve yasal süreçlerde profesyonel destek.",
      color: "#EDC370",
      image: "/assets/mulk-yonetimi/hukuki_surecler.png"
    },
    {
      icon: Wrench,
      title: "Bakım Onarım",
      description: "Mülkünüzün bakım ve onarım işlemlerini profesyonel ekibimizle yönetin.",
      color: "#EDC370",
      image: "/assets/mulk-yonetimi/bakim_onarim.png"
    },
    {
      icon: Key,
      title: "Kiralama Yönetimi",
      description: "Kiracı bulma, sözleşme yönetimi ve kiralama süreçlerinde tam destek.",
      color: "#EDC370",
      image: "/assets/mulk-yonetimi/kiralama_yonetimi.png"
    }
  ];

  const features = [
    {
      icon: Smartphone,
      title: "Dijital Kira Takibi",
      description: "Mobil uygulama ile kira ödemelerinizi takip edin, otomatik hatırlatmalar alın."
    },
    {
      icon: FileText,
      title: "Dijital Makbuz",
      description: "Tüm kira ödemeleri otomatik olarak makbuz haline dönüştürülür."
    },
    {
      icon: AlertCircle,
      title: "Gecikme Takibi",
      description: "Geciken ödemeler anında tespit edilir ve size bildirilir."
    },
    {
      icon: TrendingUp,
      title: "Gelir Raporları",
      description: "Vergi beyannamesi için gelir raporlarını kolayca çıkarın."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    setIsSubmitting(true);

    try {
      const messageData = {
        type: "mulk_yonetimi",
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        message: formData.message,
        status: "new",
      };

      const response = await fetch("/api/admin/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Mesaj gönderilemedi");
      }

      const result = await response.json();
      console.log("✅ Mesaj başarıyla gönderildi! Message ID:", result.message?.id);

      setFormSubmitted(true);
      setIsSubmitting(false);

      setTimeout(() => {
        setFormSubmitted(false);
        setIsFormOpen(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 3000);
    } catch (error: any) {
      console.error("Form gönderim hatası:", error);
      alert(`Bir hata oluştu: ${error?.message || "Lütfen tekrar deneyin."}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-40 overflow-hidden text-white">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/mulk-yonetimi/hero.png"
            alt="Mülk Yönetimi Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#2e3c3a] via-transparent to-black/40"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
              Mülk Yönetimi Hizmetleri
            </h1>
            <p className="text-xl md:text-2xl text-[#EDC370] font-semibold mb-8 leading-relaxed">
              Yatırımcıya Nasıl Zaman Kazandırır?
            </p>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Profesyonel mülk yönetimi ile kira takibi, hukuki süreçler ve bakım onarım işlemlerinizi tek platformdan yönetin.
            </p>
          </div>
        </div>
      </section>

      {/* Ana Hizmetler */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2e3c3a] mb-4">
              Hizmetlerimiz
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kiradaki eviniz için iş çok, çözüm tek.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  {/* Görsel */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    {/* İkon Overlay */}
                    <div className="absolute top-4 left-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: service.color }}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    {/* Başlık Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg drop-shadow-lg">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  {/* Açıklama */}
                  <div className="p-6">
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kira Takibi Detayları */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#2e3c3a] mb-4">
                Kira Takibi İçin Hangi Uygulamalar Daha Verimli?
              </h2>
            </div>

            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Kira gelirinin düzenli ve sorunsuz şekilde takibi hem bireysel ev sahipleri hem de portföy yöneten yatırımcılar için oldukça önemlidir. İşte bu noktada, profesyonel kira takibi sağlayan dijital uygulamalar devreye girer.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Kira takibi uygulamaları sadece ödeme tarihini hatırlamaktan ibaret değildir. Gelir-gider dengesi oluşturmak, gecikmeleri tespit etmek, kira artış dönemlerini yönetmek ve hukuki süreçlere hazırlıklı olmak için güçlü bir altyapı gerekir. Manuel yöntemler bu detayları gözden kaçırabilirken, dijital kira takip uygulamaları tüm süreci otomatikleştirerek kullanıcıya zaman ve kontrol kazandırır.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-[#2e3c3a] flex items-center justify-center flex-shrink-0">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-[#2e3c3a] mb-2">
                              {feature.title}
                            </h3>
                            <p className="text-gray-600">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <h3 className="text-2xl font-bold text-[#2e3c3a] mt-8 mb-4">
                  Kira Takibini Kolaylaştıran Dijital Özellikler
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Teknoloji destekli yöntemlerle kira takibini manuel işlerden kurtarıp dijital ortama taşımak mümkündür. Kiracıya ödeme tarihinden önce otomatik hatırlatma mesajları gönderilmesi, gecikmeleri büyük ölçüde önler. Aynı zamanda ev sahibine de bildirim gelir, böylece iki taraf da süreçten haberdar olur.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Geciken ödemeler sistem üzerinde anında görünür hale gelir. Böylece ev sahibi sadece gecikmeyi değil, hangi kiracının ne kadar süredir ödemediğini de görebilir. Bu sayede hukuki süreçler için gerekli belgeler hızlıca hazırlanabilir.
                </p>

                <div className="bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] rounded-xl p-8 text-white mt-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Smart TSR ile Kiranız Güvende, Süreçleriniz Kontrol Altında
                  </h3>
                  <p className="text-lg leading-relaxed mb-4">
                    Smart TSR, gayrimenkul sahiplerinin tüm kira yönetim sürecini dijitalleştirerek profesyonel bir düzene kavuşturur. Otomatik kira takibi, gecikme raporları, dijital makbuz üretimi, sözleşme yenileme takibi gibi tüm işlemleri sizin yerinize sistematik biçimde yürütür.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Sadece tahsilat değil; kiracı iletişimi, yasal uyumluluk ve zaman yönetimi gibi detayları da kapsayan bu profesyonel hizmet, mülk sahiplerine hem zaman kazandırır hem de kira gelirini düzenli hale getirir. Profesyonel kira takibi, doğru araçlarla ve doğru ortaklarla yapılır. Smart TSR ile kontrol sizde, yük bizde.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diğer Hizmetler */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#2e3c3a] mb-4">
                Diğer Hizmetlerimiz
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-[#2e3c3a] mb-4">
                  Kiracı Evden Çıkarken Hasar ve Zarar Tespitini Nasıl Yapabilirsiniz?
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Kiracı çıkışında profesyonel hasar tespiti yapılır. Detaylı raporlama ile mülkünüzün durumu kayıt altına alınır.
                </p>
                <button
                  onClick={() => {
                    setFormData({ ...formData, message: "Kiracı Evden Çıkarken Hasar ve Zarar Tespiti hakkında bilgi almak istiyorum." });
                    setIsFormOpen(true);
                  }}
                  className="inline-flex items-center gap-2 text-[#2e3c3a] font-semibold hover:text-[#3a4d4a] transition-colors"
                >
                  Daha Fazla Bilgi
                  <span>→</span>
                </button>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-[#2e3c3a] mb-4">
                  TC'de Nasıl Vatandaşlık Alınır?
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Türkiye Cumhuriyeti vatandaşlık başvuru süreçleri ve gerekli belgeler hakkında profesyonel danışmanlık hizmeti.
                </p>
                <button
                  onClick={() => {
                    setFormData({ ...formData, message: "TC'de nasıl vatandaşlık alınır hakkında bilgi almak istiyorum." });
                    setIsFormOpen(true);
                  }}
                  className="inline-flex items-center gap-2 text-[#2e3c3a] font-semibold hover:text-[#3a4d4a] transition-colors"
                >
                  Daha Fazla Bilgi
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2e3c3a] to-[#3a4d4a] text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Mülk Yönetiminde Farkı Görün!
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Profesyonel ekibimizle mülk yönetimi süreçlerinizi kolaylaştırın.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-[#EDC370] to-[#E5B85C] hover:from-[#E5B85C] hover:to-[#EDC370] text-[#2e3c3a] px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Hemen İletişime Geçin
            </button>
          </div>
        </div>
      </section>

      {/* Form Modal */}
      {isFormOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999]"
            onClick={() => setIsFormOpen(false)}
          />
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#2e3c3a]">
                  İletişim Formu
                </h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-center">
                  <p className="font-semibold">Mesajınız başarıyla gönderildi!</p>
                  <p className="text-sm mt-1">En kısa sürede size dönüş yapacağız.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adınız Soyadınız
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a]"
                      placeholder="+90 5XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mesajınız
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white py-3 rounded-lg font-semibold hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Gönderiliyor...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Gönder</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
