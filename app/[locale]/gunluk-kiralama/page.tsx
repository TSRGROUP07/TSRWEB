"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GunlukKiralamaPage() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch the target page before navigating
    router.prefetch("/gunluk-kiralama/kiralamak");
    // Small delay for better UX, then navigate
    const timer = setTimeout(() => {
      router.push("/gunluk-kiralama/kiralamak");
    }, 100);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#b7b1ad] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e3c3a] mx-auto mb-4"></div>
        <p className="text-white/80">Yönlendiriliyor...</p>
      </div>
    </div>
  );
}
