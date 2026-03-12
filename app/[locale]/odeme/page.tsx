"use client";

import { useState } from "react";
import Image from "next/image";
import { CreditCard, Lock, CheckCircle, Search, Instagram, Youtube, Send, Music } from "lucide-react";

export default function OdemePage() {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    amount: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#b7b1ad] text-white flex items-center justify-center">
        <div className="bg-[#4f271b]/60 backdrop-blur-md border border-[#2d2825]/30 rounded-xl shadow-xl p-12 text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-[#2e3c3a] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-white">Ödeme Başarılı!</h2>
          <p className="text-white/80 mb-6">
            Ödemeniz başarıyla tamamlandı. İşlem numaranız: #123456
          </p>
          <button
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                cardNumber: "",
                cardName: "",
                expiryDate: "",
                cvv: "",
                amount: "",
              });
            }}
            className="px-6 py-3 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Yeni Ödeme
          </button>
        </div>
      </div>
    );
  }

  const handleSearch = () => {
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleViewPayment = () => {
    const paymentForm = document.getElementById("payment-form");
    if (paymentForm) {
      paymentForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden mt-8 mb-8 rounded-2xl mx-4">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&h=1080&fit=crop&q=90"
            alt="Online Ödeme"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20"></div>
        </div>

        <div className="absolute top-6 right-6 z-30 flex flex-col gap-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
            <Instagram className="h-6 w-6" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
            <Youtube className="h-6 w-6" />
          </a>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
            <Send className="h-6 w-6" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
            <Music className="h-6 w-6" />
          </a>
        </div>

        <div className="relative z-20 container mx-auto px-6 lg:px-12 h-full flex items-center">
          <div className="w-full max-w-4xl">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
                  Online Ödeme
                </h1>
                <p className="text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                  Güvenli ve hızlı online ödeme sistemi ile işlemlerinizi kolayca tamamlayın.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleSearch}
                  className="bg-white hover:bg-white/95 text-[#2e3c3a] px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-lg cursor-pointer"
                >
                  <Search className="h-6 w-6" />
                  <span>Ödeme Yap</span>
                </button>
                <button 
                  onClick={handleViewPayment}
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 text-lg cursor-pointer"
                >
                  <span>Formu Doldur</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 pb-12 max-w-2xl">
        {/* Search Bar */}
        <div id="search-bar" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] border border-[#2e3c3a] rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <input
                type="text"
                placeholder="Ödeme bilgisi ara..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/50"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div id="payment-form" className="bg-[#4f271b]/60 backdrop-blur-md border border-[#2d2825]/30 rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <Lock className="h-8 w-8 text-[#2e3c3a] mr-2" />
            <span className="text-lg font-semibold text-white">Güvenli Ödeme</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Ödeme Tutarı (₺)
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-[#4f271b]/40 border border-[#2d2825]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] text-white placeholder-white/40"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Kart Numarası
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cardNumber: e.target.value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim(),
                    })
                  }
                  required
                  maxLength={19}
                  className="w-full pl-12 pr-4 py-3 bg-[#4f271b]/40 border border-[#2d2825]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] text-white placeholder-white/40"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Kart Sahibi Adı
              </label>
              <input
                type="text"
                value={formData.cardName}
                onChange={(e) =>
                  setFormData({ ...formData, cardName: e.target.value.toUpperCase() })
                }
                required
                className="w-full px-4 py-3 bg-[#4f271b]/40 border border-[#2d2825]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] text-white placeholder-white/40"
                placeholder="AD SOYAD"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Son Kullanma Tarihi
                </label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expiryDate: e.target.value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").substring(0, 5),
                    })
                  }
                  required
                  maxLength={5}
                  className="w-full px-4 py-3 bg-[#4f271b]/40 border border-[#2d2825]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] text-white placeholder-white/40"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cvv: e.target.value.replace(/\D/g, "").substring(0, 3),
                    })
                  }
                  required
                  maxLength={3}
                  className="w-full px-4 py-3 bg-[#4f271b]/40 border border-[#2d2825]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] text-white placeholder-white/40"
                  placeholder="123"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "İşleniyor..." : "Ödemeyi Tamamla"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/60">
            <p>256-bit SSL şifreleme ile korunmaktadır</p>
          </div>
        </div>
      </div>
    </div>
  );
}
