import { NextRequest, NextResponse } from "next/server";
import { getSupabaseCollection } from "@/lib/supabase-db";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const blogs = await getSupabaseCollection("blogs");
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = searchParams.get("limit");

    let filtered = blogs || [];

    if (category) {
      filtered = filtered.filter((blog: any) => blog.category === category);
    }

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












