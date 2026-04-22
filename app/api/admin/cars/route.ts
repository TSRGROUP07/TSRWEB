import { NextRequest, NextResponse } from "next/server";
import { logActivity } from "@/lib/activityLog";
import { getSupabaseCollection, addToSupabaseCollection } from "@/lib/supabase-db";

const TABLE_NAME = "cars";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = searchParams.get("limit");

    const cars = await getSupabaseCollection(TABLE_NAME, {
      limit: limit ? parseInt(limit) : undefined,
      filters: category ? [{ column: 'category', operator: 'eq', value: category }] : undefined,
      order: { column: 'created_at', ascending: false }
    });

    return NextResponse.json(cars);
  } catch (error: any) {
    console.error("Cars GET error:", error);
    return NextResponse.json(
      { error: "Araçlar yüklenemedi", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const car = await request.json();

    const newCar = {
      ...car,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Supabase'a kaydet
    const savedCar = await addToSupabaseCollection(TABLE_NAME, newCar);

    // Activity log
    try {
      await logActivity("create", "car", {
        entityId: savedCar.id,
        details: { name: savedCar.name, category: savedCar.category },
      });
    } catch (logError) {
      console.warn("Activity log error:", logError);
    }

    return NextResponse.json(savedCar, { status: 201 });
  } catch (error: any) {
    console.error("Car POST error:", error);
    return NextResponse.json(
      { error: "Araç eklenemedi", details: error.message },
      { status: 500 }
    );
  }
}
