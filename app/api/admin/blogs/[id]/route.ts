import { NextRequest, NextResponse } from "next/server";
import { logActivity } from "@/lib/activityLog";
import { getSupabaseById, updateInSupabaseCollection, deleteFromSupabaseCollection } from "@/lib/supabase-db";

const TABLE_NAME = "blogs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);
    const blog = await getSupabaseById(TABLE_NAME, id);

    if (!blog) {
      return NextResponse.json(
        { error: "Blog bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error: any) {
    console.error("Blog GET error:", error);
    return NextResponse.json(
      { error: "Blog yüklenemedi", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);
    const updateData = await request.json();

    // Önce mevcut blog'u kontrol et
    const existing = await getSupabaseById(TABLE_NAME, id);
    if (!existing) {
      return NextResponse.json(
        { error: "Blog bulunamadı" },
        { status: 404 }
      );
    }

    // Supabase'da güncelle
    const updated = await updateInSupabaseCollection(TABLE_NAME, id, {
      ...updateData,
      updatedAt: new Date().toISOString()
    });

    // Activity log
    try {
      await logActivity("update", "blog", {
        entityId: id,
        details: { title: updated.title, published: updated.published },
      });
    } catch (logError) {
      console.warn("Activity log error:", logError);
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Blog PUT error:", error);
    return NextResponse.json(
      { error: "Blog güncellenemedi", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);

    // Önce mevcut blog'u kontrol et
    const existing = await getSupabaseById(TABLE_NAME, id);
    if (!existing) {
      return NextResponse.json(
        { error: "Blog bulunamadı" },
        { status: 404 }
      );
    }

    // Supabase'dan sil
    await deleteFromSupabaseCollection(TABLE_NAME, id);

    // Activity log
    try {
      await logActivity("delete", "blog", {
        entityId: id,
      });
    } catch (logError) {
      console.warn("Activity log error:", logError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Blog DELETE error:", error);
    return NextResponse.json(
      { error: "Blog silinemedi", details: error.message },
      { status: 500 }
    );
  }
}

