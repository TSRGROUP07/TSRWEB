import { NextRequest, NextResponse } from "next/server";
import { logActivity } from "@/lib/activityLog";
import { getSupabaseCollection, addToSupabaseCollection } from "@/lib/supabase-db";

const TABLE_NAME = "blogs";

export async function GET(request: NextRequest) {
  try {
    const blogs = await getSupabaseCollection(TABLE_NAME);
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = searchParams.get("limit");

    let filtered = blogs || [];

    // Kategori filtresi
    if (category) {
      filtered = filtered.filter((blog: any) => blog.category === category);
    }

    // Limit varsa uygula
    if (limit) {
      filtered = filtered.slice(0, parseInt(limit));
    }

    return NextResponse.json(filtered);
  } catch (error: any) {
    console.error("Blogs GET error:", error);
    return NextResponse.json(
      { error: "Bloglar yüklenemedi", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const blog = await request.json();

    const newBlog = {
      ...blog,
      createdAt: blog.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Supabase'a kaydet
    const savedBlog = await addToSupabaseCollection(TABLE_NAME, newBlog);

    // Activity log
    try {
      await logActivity("create", "blog", {
        entityId: savedBlog.id,
        details: { title: savedBlog.title, published: savedBlog.published },
      });
    } catch (logError) {
      console.warn("Activity log error:", logError);
    }

    return NextResponse.json(savedBlog, { status: 201 });
  } catch (error: any) {
    console.error("Blog POST error:", error);
    return NextResponse.json(
      { error: "Blog eklenemedi", details: error.message },
      { status: 500 }
    );
  }
}

