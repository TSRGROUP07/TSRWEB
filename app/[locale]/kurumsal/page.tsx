import Image from "next/image";
import { Shield, Star, Headphones, Handshake, Calendar, Award, CheckCircle, Target, TrendingUp, Phone, Mail, MapPin, Send } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { useTranslations } from 'next-intl';

export const metadata = createMetadata({
  title: "Hakkımızda - TSR GROUP Alanya",
  description: "TSR GROUP hakkında bilgi edinin. Alanya'da güvenilir emlak ve yatırım danışmanlığı, inşaat kalitesi ve vizyonumuz.",
  url: "/kurumsal",
});

export default function KurumsalPage() {
  const t = useTranslations('corporatePage');
  const tContact = useTranslations('contactPage');

  const values = [
    {
      icon: Shield,
      title: t('values.trust.title'),
      description: t('values.trust.desc'),
    },
    {
      icon: Star,
      title: t('values.quality.title'),
      description: t('values.quality.desc'),
    },
    {
      icon: Headphones,
      title: t('values.customer.title'),
      description: t('values.customer.desc'),
    },
    {
      icon: Handshake,
      title: t('values.professionalism.title'),
      description: t('values.professionalism.desc'),
    },
  ];

  const careerTimeline = [
    {
      year: "2014",
      title: t('career.2014.title'),
      description: t('career.2014.desc'),
    },
    {
      year: "2015",
      title: t('career.2015.title'),
      description: t('career.2015.desc'),
    },
    {
      year: "2020",
      title: t('career.2020.title'),
      description: t('career.2020.desc'),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hakkımızda Section - Anchor için */}
      <section id="hakkimizda" className="sr-only"></section>

      {/* Hero Section - Full Width Image with Overlay */}
      <div className="relative h-[90vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/kuru1.png"
            alt={t('heroTitle')}
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight drop-shadow-2xl">
              {t('heroTitle')}
            </h1>
            <button className="px-8 py-4 bg-white text-[#2e3c3a] rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-2xl transform hover:scale-105">
              {t('heroBtn')}
            </button>
          </div>
        </div>
      </div>

      {/* Journey and Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
              {/* Vertical Timeline Line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#EDC370] transform -translate-x-1/2">
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#EDC370] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#EDC370] rounded-full"></div>
                <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#EDC370] rounded-full"></div>
              </div>

              {/* Left Block - Journey */}
              <div className="pr-0 md:pr-12">
                <h2 className="text-4xl font-bold text-[#2e3c3a] mb-6">
                  {t('journeyTitle')}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('journeyDesc')}
                </p>
              </div>

              {/* Right Block - Vision */}
              <div className="pl-0 md:pl-12">
                <h2 className="text-4xl font-bold text-[#2e3c3a] mb-6">
                  {t('visionTitle')}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('visionDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Dark Green Background */}
      <section className="py-20 bg-gradient-to-br from-[#2e3c3a] to-[#3a4d4a]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-5xl font-bold text-center mb-16 text-white">
            {t('valuesTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/20">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-white/90 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-[#2e3c3a]">
              {t('principlesTitle')}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#2e3c3a] via-[#EDC370] to-[#3a4d4a] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-[#EDC370]">
              <div className="bg-gradient-to-br from-[#EDC370] to-[#E5B85C] w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-[#2e3c3a]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2e3c3a] mb-4">{t('principles.one.title')}</h3>
              <p className="text-lg font-semibold text-[#EDC370] mb-3 italic">{t('principles.one.quote')}</p>
              <p className="text-gray-700 leading-relaxed">
                {t('principles.one.desc')}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-[#EDC370]">
              <div className="bg-gradient-to-br from-[#EDC370] to-[#E5B85C] w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-[#2e3c3a]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2e3c3a] mb-4">{t('principles.two.title')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t('principles.two.desc')}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-[#EDC370]">
              <div className="bg-gradient-to-br from-[#EDC370] to-[#E5B85C] w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-[#2e3c3a]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2e3c3a] mb-4">{t('principles.three.title')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t('principles.three.desc')}
              </p>
            </div>
          </div>

          {/* Çalışma Yaklaşımımız */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-10 border-l-4 border-[#EDC370] max-w-4xl mx-auto">
            <div className="flex items-start gap-6">
              <div className="bg-gradient-to-br from-[#EDC370] to-[#E5B85C] w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-[#2e3c3a]" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#2e3c3a] mb-4">{t('approachTitle')}</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('approachDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kurucumuz - Uğur Taşar */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-[#2e3c3a]">
              {t('founderTitle')}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] mx-auto rounded-full mb-8"></div>

            <p className="text-xl text-gray-800 max-w-4xl mx-auto leading-relaxed">
              {t('founderDesc')}
            </p>
          </div>

          {/* Kariyer Yolculuğu */}
          <div className="mb-16 max-w-5xl mx-auto">
            <h3 className="text-4xl font-bold text-[#2e3c3a] mb-12 text-center">{t('careerTitle')}</h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2e3c3a] via-[#EDC370] via-[#3a4d4a] to-[#2e3c3a] hidden md:block"></div>

              <div className="space-y-12">
                {careerTimeline.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-[#EDC370] to-[#E5B85C] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border-4 border-white">
                      <Calendar className="h-8 w-8 text-[#2e3c3a]" />
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 bg-white rounded-2xl shadow-lg p-8 ${index % 2 === 0 ? "md:mr-auto md:max-w-[calc(50%-4rem)]" : "md:ml-auto md:max-w-[calc(50%-4rem)]"
                      }`}>
                      <div className="text-5xl font-bold text-[#2e3c3a] mb-3">{item.year}</div>
                      <h4 className="text-2xl font-bold text-[#3a4d4a] mb-3">{item.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sektörde Güven ve Liderlik */}
          <div className="bg-gradient-to-br from-[#2e3c3a] to-[#3a4d4a] rounded-2xl shadow-2xl p-10 text-white max-w-4xl mx-auto">
            <div className="flex items-start gap-6">
              <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4">{t('leadershipTitle')}</h3>
                <p className="text-lg text-white/95 leading-relaxed">
                  {t('leadershipDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ekibimiz Bölümü */}
      <section id="ekip" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Başlık */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="relative inline-block mb-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2e3c3a] relative z-10 leading-tight">
                {t('teamTitle')}
              </h2>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] rounded-full"></div>
            </div>
            <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
              {t('teamDesc')}
            </p>
          </div>

          {/* Ekip Üyeleri Grid - 3 Üstte 3 Altta */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[
              {
                id: 4,
                name: "Ulaş Özel",
                title: "General Manager",
                image: "/TSREKİP/4.jpeg",
              },
              {
                id: 5,
                name: "Aybüke Karahan",
                title: "Sales Manager",
                image: "/TSREKİP/5.jpeg",
              },
              {
                id: 6,
                name: "Atakan Acar",
                title: "Sales Manager",
                image: "/TSREKİP/6.jpeg",
              },
              {
                id: 2,
                name: "İbrahim Yılmaz",
                title: "Portfolio Manager",
                image: "/TSREKİP/2.jpeg",
              },
              {
                id: 3,
                name: "Erhan Uysal",
                title: "After Sales Manager",
                image: "/TSREKİP/3.jpeg",
              },
              {
                id: 1,
                name: "Duygu Kaya",
                title: "Office Assistant",
                image: "/TSREKİP/1.jpeg",
              },
            ].map((member, index) => (
              <div
                key={member.id}
                className="group relative animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300 shadow-sm">
                  {/* Fotoğraf */}
                  <div className="relative w-full h-[312px] lg:h-[336px] overflow-hidden bg-gray-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* İsim ve Unvan */}
                  <div className="p-4 lg:p-5 text-center bg-white">
                    <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-1 group-hover:text-[#2e3c3a] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-sm lg:text-base font-medium">
                      {member.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Şirket Hakkında Bölümü */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Sol Taraf - Şirket Görseli */}
              <div className="relative">
                <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto group">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-[#2e3c3a]/50 transition-all border-2 border-gray-200">
                    <Image
                      src="/ŞH.png"
                      alt="Kalitenin Yeşil İmzası"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      priority
                    />
                    {/* Overlay - Modern gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2e3c3a]/20 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Sağ Taraf - Şirket Bilgileri */}
              <div className="space-y-6">
                <div className="relative inline-block mb-8">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2e3c3a] relative z-10 leading-tight">
                    {t('aboutCompanyTitle')}
                  </h2>
                  <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] rounded-full"></div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:bg-gray-100 transition-all duration-300">
                    <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                      {t('aboutCompany.p1')}
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:bg-gray-100 transition-all duration-300">
                    <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                      {t('aboutCompany.p2')}
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:bg-gray-100 transition-all duration-300">
                    <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                      {t('aboutCompany.p3')}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] border border-gray-200 rounded-xl p-6 shadow-xl">
                    <p className="text-lg md:text-xl text-white leading-relaxed font-semibold">
                      {t('aboutCompany.p4')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yorumlar Bölümü */}
      <section id="yorumlar" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2e3c3a] mb-4">
                {t('testimonialsTitle')}
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] mx-auto rounded-full mb-4"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('testimonialsDesc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Ahmet Yılmaz",
                  location: "Alanya",
                  rating: 5,
                  comment: "TSR GROUP ile çalışmak harika bir deneyimdi. Profesyonel ekibi ve kaliteli hizmeti sayesinde hayalimdeki evi buldum. Herkese tavsiye ederim!",
                  date: "2024"
                },
                {
                  name: "Maria Schmidt",
                  location: "Almanya",
                  rating: 5,
                  comment: "Alanya'da yatırım yapmak istiyordum ve TSR GROUP bana mükemmel bir rehberlik sağladı. Tüm süreç çok profesyonel ve şeffaftı.",
                  date: "2024"
                },
                {
                  name: "Mehmet Demir",
                  location: "İstanbul",
                  rating: 5,
                  comment: "Uzaktan emlak almak zor olabilir ama TSR GROUP'un dijital platformu ve destek ekibi sayesinde hiç sorun yaşamadım. Teşekkürler!",
                  date: "2024"
                },
                {
                  name: "Sarah Johnson",
                  location: "İngiltere",
                  rating: 5,
                  comment: "Yazlık ev arayışımda TSR GROUP'un ekibi bana çok yardımcı oldu. Hem Türkçe hem İngilizce hizmet vermeleri harika bir avantaj.",
                  date: "2024"
                },
                {
                  name: "Ali Kaya",
                  location: "Ankara",
                  rating: 5,
                  comment: "Kiralama sürecinde TSR GROUP'un hızlı ve etkili çözümleri sayesinde hiç sorun yaşamadım. Çok memnun kaldım.",
                  date: "2024"
                },
                {
                  name: "Emma Brown",
                  location: "Kanada",
                  rating: 5,
                  comment: "Alanya'da emlak yatırımı yapmak istiyordum. TSR GROUP'un uzman ekibi sayesinde en iyi seçeneği buldum. Çok teşekkürler!",
                  date: "2024"
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed italic">
                    "{testimonial.comment}"
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location} • {testimonial.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* İletişim Bölümü */}
      <section id="iletisim" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2e3c3a] mb-4">
                {t('contactTitle')}
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#2e3c3a] to-[#3a4d4a] mx-auto rounded-full mb-4"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('contactDesc')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* İletişim Bilgileri */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#4f271b] p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{tContact('address')}</h3>
                      <p className="text-gray-700 whitespace-pre-line">
                        {tContact('addressText')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#4f271b] p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{tContact('phone')}</h3>
                      <a href="tel:+905303330097" className="text-gray-700 hover:text-[#4f271b] transition-colors">
                        +90 530 333 00 97
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#4f271b] p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{tContact('email')}</h3>
                      <a href="mailto:info@tsremlak.com" className="text-gray-700 hover:text-[#4f271b] transition-colors">
                        info@tsremlak.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* İletişim Formu */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{tContact('formTitle')}</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {tContact('nameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f271b]"
                      placeholder={tContact('namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {tContact('emailLabel')}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f271b]"
                      placeholder={tContact('emailPlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {tContact('phoneLabel')}
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f271b]"
                      placeholder={tContact('phonePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {tContact('messageLabel')}
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f271b] resize-none"
                      placeholder={tContact('messagePlaceholder')}
                    ></textarea>
                  </div>

                  {/* KVKK Onay */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 w-5 h-5 text-[#4f271b] border-gray-300 rounded focus:ring-[#4f271b] focus:ring-2"
                      />
                      <span className="text-sm text-gray-700">
                        <a href="/kvkk" target="_blank" className="text-[#4f271b] hover:underline font-medium">
                          Kişisel Verilerin Korunması Kanunu (KVKK)
                        </a> kapsamında kişisel verilerimin işlenmesine ve iletişim bilgilerime ulaşılmasına izin veriyorum. *
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white py-3 rounded-lg hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] transition-all flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl"
                  >
                    <Send className="h-5 w-5" />
                    <span>{tContact('submitBtn')}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
