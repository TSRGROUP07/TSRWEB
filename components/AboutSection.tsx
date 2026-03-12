"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AboutSection() {
  const [imageUrl, setImageUrl] = useState<string>("/ŞH.png");

  // API çağrısı devre dışı - direkt görsel kullanılıyor
  // useEffect(() => {
  //   const fetchAboutImage = async () => {
  //     try {
  //       const response = await fetch("/api/page-images/about");
  //       const data = await response.json();
  //       if (data.image) {
  //         setImageUrl(data.image);
  //       }
  //     } catch (error) {
  //       console.error("Görsel yüklenemedi:", error);
  //     }
  //   };

  //   fetchAboutImage();
  // }, []);

  return (
    <section className="relative py-8 lg:py-12" style={{ background: '#b7b1ad' }}>
      {/* Bölüm kaldırıldı - Şirket Hakkında bölümü kurumsal sayfanın altına taşındı */}
    </section>
  );
}

