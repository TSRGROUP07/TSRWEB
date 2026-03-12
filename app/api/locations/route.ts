import { NextResponse } from "next/server";
import { getSupabaseCollection } from "@/lib/supabase-db";

export const revalidate = 86400; // Cache for 24 hours as locations don't change often

export async function GET() {
    try {
        // Only fetch the location column
        // Note: getSupabaseCollection currently fetches with select('*'). 
        // For even better performance, we could modify getSupabaseCollection to accept columns.
        // But for now, fetching '*' and extracting on server is still better than client.
        const properties = await getSupabaseCollection("properties");

        const locations = new Set<string>();
        if (Array.isArray(properties)) {
            properties.forEach((property: any) => {
                if (property.location) {
                    const parts = property.location.split(",").map((p: string) => p.trim());
                    parts.forEach((part: string) => {
                        if (part.length > 0) {
                            locations.add(part);
                        }
                    });
                }
            });
        }

        const sortedLocations = Array.from(locations).sort();

        return NextResponse.json(sortedLocations, {
            headers: {
                'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
            }
        });
    } catch (error: any) {
        console.error("Locations GET error:", error);
        return NextResponse.json([], { status: 500 });
    }
}
