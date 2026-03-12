import { NextRequest, NextResponse } from "next/server";
import { getActivityLogs } from "@/lib/activityLog";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action") || undefined;
    const entity = searchParams.get("entity") || undefined;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : 100;
    const offset = searchParams.get("offset")
      ? parseInt(searchParams.get("offset")!)
      : 0;

    const logs = await getActivityLogs({
      action,
      entity,
      limit,
      offset,
    });

    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json(
      { error: "Loglar yüklenemedi" },
      { status: 500 }
    );
  }
}












