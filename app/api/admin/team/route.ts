import { NextRequest, NextResponse } from "next/server";
import { getSupabaseCollection, addToSupabaseCollection } from "@/lib/supabase-db";
import { getSupabaseAdmin } from "@/lib/supabase";

const TABLE_NAME = "team_members";

// GET - Ekip üyelerini getir
export async function GET() {
  try {
    const members = await getSupabaseCollection(TABLE_NAME);

    // Veritabanı boşsa varsayılanları dön
    if (!members || members.length === 0) {
      const defaultTeam = [
        { name: "Ulaş Özel", title: "General Manager", image: "/TSREKİP/4.jpeg", order: 1 },
        { name: "Aybüke Karahan", title: "Sales Manager", image: "/TSREKİP/5.jpeg", order: 2 },
        { name: "Atakan Acar", title: "Sales Manager", image: "/TSREKİP/6.jpeg", order: 3 },
        { name: "İbrahim Yılmaz", title: "Portfolio Manager", image: "/TSREKİP/2.jpeg", order: 4 },
        { name: "Erhan Uysal", title: "After Sales Manager", image: "/TSREKİP/3.jpeg", order: 5 },
        { name: "Duygu Kaya", title: "Office Assistant", image: "/TSREKİP/1.jpeg", order: 6 },
      ];
      return NextResponse.json(defaultTeam);
    }

    // Order'a göre sırala
    const sorted = [...members].sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    return NextResponse.json(sorted);
  } catch (error: any) {
    console.error("Team members fetch error:", error);
    return NextResponse.json({ error: "Ekip üyeleri yüklenemedi" }, { status: 500 });
  }
}

// POST - Ekip üyelerini kaydet
export async function POST(request: NextRequest) {
  try {
    const members = await request.json();
    const supabaseAdmin = getSupabaseAdmin();

    // Mevcut olanları sil ve yenileri ekle
    await supabaseAdmin.from(TABLE_NAME).delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Yenileri ekle
    for (const member of members) {
      const { id, ...memberData } = member;
      await addToSupabaseCollection(TABLE_NAME, memberData);
    }

    return NextResponse.json({ success: true, message: "Ekip üyeleri başarıyla kaydedildi" });
  } catch (error: any) {
    console.error("Ekip üyeleri kaydedilemedi:", error);
    return NextResponse.json({ error: "Ekip üyeleri kaydedilemedi" }, { status: 500 });
  }
}
