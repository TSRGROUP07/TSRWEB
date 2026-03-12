import { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Emlak İlanları",
  description: "Yetkili emlak ilanları, 3D turlar ve detaylı bilgiler. Satılık ve kiralık daireler, villalar, rezidanslar ve ticari emlak seçenekleri. TSR GROUP güvencesiyle.",
  keywords: [
    "emlak",
    "satılık daire",
    "kiralık daire",
    "gayrimenkul",
    "TSR GROUP",
    "villa",
    "rezidans",
    "ticari emlak",
    "3D tur",
    "emlak ilanları",
  ],
  url: "/emlak",
});




