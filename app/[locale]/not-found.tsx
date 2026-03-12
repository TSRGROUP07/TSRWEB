import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center bg-[#b7b1ad]">
      <div>
        <h1 className="text-6xl font-bold text-[#2e3c3a] mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4 text-white">Sayfa Bulunamadı</h2>
        <p className="text-white/80 mb-8 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] hover:from-[#3a4d4a] hover:via-[#2e3c3a] hover:to-[#3a4d4a] text-white px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          <Home className="h-5 w-5" />
          <span>Ana Sayfaya Dön</span>
        </Link>
      </div>
    </div>
  );
}
