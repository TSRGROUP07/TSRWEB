import { NextRequest, NextResponse } from "next/server";
import { logActivity } from "@/lib/activityLog";
import { getSupabaseCollection, addToSupabaseCollection, updateInSupabaseCollection, deleteFromSupabaseCollection, getSupabaseById } from "@/lib/supabase-db";

const TABLE_NAME = "site_images";

// Admin authentication kontrolü
function checkAdminAuth(request: NextRequest): boolean {
  if (process.env.NODE_ENV === "development") return true;
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) return true;
  const cookies = request.headers.get("cookie");
  if (cookies && cookies.includes("admin_token=")) return true;
  return false;
}

export async function GET(request: NextRequest) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }
    const images = await getSupabaseCollection(TABLE_NAME);
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // Kategori filtresi varsa filtrele
    if (category && images) {
      const filtered = images.filter((img: any) => img.category === category);
      return NextResponse.json(filtered);
    }

    return NextResponse.json(images || []);
  } catch (error: any) {
    console.error("Images GET error:", error);
    return NextResponse.json(
      { error: "Resimler yüklenemedi", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }
    const image = await request.json();

    // Supabase'a kaydet
    const savedImage = await addToSupabaseCollection(TABLE_NAME, image);

    // Activity log
    try {
      await logActivity("upload", "image", {
        entityId: savedImage.id,
        details: { title: savedImage.title, category: savedImage.category },
      });
    } catch (logError) {
      console.warn("Activity log error:", logError);
    }

    return NextResponse.json(savedImage, { status: 201 });
  } catch (error: any) {
    console.error("Image POST error:", error);
    return NextResponse.json(
      { error: "Resim eklenemedi", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }
    const { id, ...updateData } = await request.json();

    // Önce mevcut image'i kontrol et
    const existing = await getSupabaseById(TABLE_NAME, id.toString());
    if (!existing) {
      return NextResponse.json(
        { error: "Resim bulunamadı" },
        { status: 404 }
      );
    }

    // Supabase'da güncelle
    const updated = await updateInSupabaseCollection(TABLE_NAME, id.toString(), updateData);

    // Activity log
    try {
      await logActivity("update", "image", {
        entityId: id,
        details: updateData,
      });
    } catch (logError) {
      console.warn("Activity log error:", logError);
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Image PUT error:", error);
    return NextResponse.json(
      { error: "Resim güncellenemedi", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!checkAdminAuth(request)) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID gerekli" },
        { status: 400 }
      );
    }

    // Önce mevcut image'i kontrol et
    const existing = await getSupabaseById(TABLE_NAME, id);
    if (!existing) {
      return NextResponse.json(
        { error: "Resim bulunamadı" },
        { status: 404 }
      );
    }

    // Supabase'dan sil
    await deleteFromSupabaseCollection(TABLE_NAME, id);

    // Activity log
    try {
      await logActivity("delete", "image", {
        entityId: id,
      });
    } catch (logError) {
      console.warn("Activity log error:", logError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Image DELETE error:", error);
    return NextResponse.json(
      { error: "Resim silinemedi", details: error.message },
      { status: 500 }
    );
  }
}

