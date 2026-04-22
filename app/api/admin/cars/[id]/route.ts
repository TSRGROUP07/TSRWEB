import { NextRequest, NextResponse } from "next/server";
import { logActivity } from "@/lib/activityLog";
import { getSupabaseById, updateInSupabaseCollection, deleteFromSupabaseCollection } from "@/lib/supabase-db";

const TABLE_NAME = "cars";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const car = await getSupabaseById(TABLE_NAME, params.id);
    if (!car) {
      return NextResponse.json({ error: "Araç bulunamadı" }, { status: 404 });
    }
    return NextResponse.json(car);
  } catch (error: any) {
    console.error("Car Detail GET error:", error);
    return NextResponse.json(
      { error: "Araç detayları alınamadı" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    // id'yi data'dan kaldır (PK değiştirilemez)
    const { id, ...updateData } = data;
    
    const updatedCar = await updateInSupabaseCollection(TABLE_NAME, params.id, {
      ...updateData,
      updatedAt: new Date().toISOString()
    });

    // Activity log
    try {
      await logActivity("update", "car", {
        entityId: params.id,
        details: { name: updatedCar.name },
      });
    } catch (logError) {
      console.warn("Activity log error:", logError);
    }

    return NextResponse.json(updatedCar);
  } catch (error: any) {
    console.error("Car PUT error:", error);
    return NextResponse.json(
      { error: "Araç güncellenemedi" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteFromSupabaseCollection(TABLE_NAME, params.id);

    // Activity log
    try {
      await logActivity("delete", "car", {
        entityId: params.id,
      });
    } catch (logError) {
      console.warn("Activity log error:", logError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Car DELETE error:", error);
    return NextResponse.json(
      { error: "Araç silinemedi" },
      { status: 500 }
    );
  }
}
