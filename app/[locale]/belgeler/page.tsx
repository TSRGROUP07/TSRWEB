"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { FileText, Download, CheckCircle, Shield, Search, Instagram, Youtube, Send, Music } from "lucide-react";

const documents = [
  {
    title: "Şirket Kuruluş Belgesi",
    type: "PDF",
    size: "2.5 MB",
    date: "15.01.2020",
    verified: true,
  },
  {
    title: "Ticaret Sicil Gazetesi",
    type: "PDF",
    size: "1.8 MB",
    date: "20.02.2020",
    verified: true,
  },
  {
    title: "Vergi Levhası",
    type: "PDF",
    size: "1.2 MB",
    date: "10.03.2020",
    verified: true,
  },
  {
    title: "Yetki Belgesi",
    type: "PDF",
    size: "950 KB",
    date: "05.04.2020",
    verified: true,
  },
  {
    title: "ISO 9001 Sertifikası",
    type: "PDF",
    size: "3.1 MB",
    date: "12.06.2021",
    verified: true,
  },
  {
    title: "Güvenlik Sertifikası",
    type: "PDF",
    size: "2.3 MB",
    date: "08.08.2022",
    verified: true,
  },
];

export default function BelgelerPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      searchBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleViewDocuments = () => {
    const documentsGrid = document.getElementById("documents-grid");
    if (documentsGrid) {
      documentsGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const filteredDocuments = useMemo(() => {
    if (!searchTerm) return documents;
    const term = searchTerm.toLowerCase();
    return documents.filter(doc => doc.title.toLowerCase().includes(term));
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#b7b1ad] text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden mt-8 mb-8 rounded-2xl mx-4">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop&q=90"
            alt="Şirket Belgeleri"
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
                  Şirket Belgeleri
                </h1>
                <p className="text-xl md:text-2xl text-white/95 font-medium max-w-2xl leading-relaxed">
                  Tüm şirket belgelerimiz doğrulanmış ve güncel durumdadır.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleSearch}
                  className="bg-white hover:bg-white/95 text-[#2e3c3a] px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-2xl text-lg cursor-pointer"
                >
                  <Search className="h-6 w-6" />
                  <span>Belge Ara</span>
                </button>
                <button 
                  onClick={handleViewDocuments}
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 text-lg cursor-pointer"
                >
                  <span>Belgeleri Gör</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 pb-12">
        {/* Search Bar */}
        <div id="search-bar" className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] border border-[#2e3c3a] rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Belge adı ara..."
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

        <div className="bg-[#4f271b]/60 backdrop-blur-md border border-[#2d2825]/30 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-2 text-[#2e3c3a] mb-4">
            <CheckCircle className="h-6 w-6" />
            <span className="font-semibold text-white">Tüm Belgeler Doğrulanmış</span>
          </div>
          <p className="text-white/90">
            TSR GROUP olarak şeffaflık ve güvenilirlik ilkelerimiz doğrultusunda,
            tüm şirket belgelerimiz kamuya açıktır ve düzenli olarak güncellenmektedir.
          </p>
        </div>

        <div id="documents-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc, index) => (
            <div
              key={index}
              className="bg-[#4f271b]/60 backdrop-blur-md border border-[#2d2825]/30 rounded-xl shadow-lg p-6 hover:shadow-xl hover:bg-[#4f271b]/70 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] w-12 h-12 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                {doc.verified && (
                  <CheckCircle className="h-6 w-6 text-[#2e3c3a]" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{doc.title}</h3>
              <div className="space-y-2 text-sm text-white/90 mb-4">
                <div className="flex items-center">
                  <span className="font-medium mr-2">Tip:</span>
                  <span>{doc.type}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Boyut:</span>
                  <span>{doc.size}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Tarih:</span>
                  <span>{doc.date}</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white py-3 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                <Download className="h-5 w-5" />
                <span>İndir</span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] border border-[#2e3c3a]/50 rounded-xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Belge Doğrulama
          </h2>
          <p className="text-white/80 mb-4">
            Belgelerimizin doğruluğunu kontrol etmek için aşağıdaki bilgileri kullanabilirsiniz:
          </p>
          <ul className="space-y-2 text-white/90">
            <li>• Ticaret Sicil No: 123456-7</li>
            <li>• Vergi Dairesi: Kadıköy Vergi Dairesi</li>
            <li>• Vergi No: 1234567890</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
