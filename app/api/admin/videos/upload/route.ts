import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { addToSupabaseCollection, updateInSupabaseCollection, getSupabaseCollection } from "@/lib/supabase-db";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const type = formData.get("type") as string || "hero";
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;

        if (!file) {
            return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const fileExt = file.name.split(".").pop();
        const fileName = `${type}_${timestamp}.${fileExt}`;

        // Upload to Supabase Storage
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("videos")
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: true,
            });

        if (uploadError) {
            console.error("Supabase upload error:", uploadError);
            throw new Error(`Upload hatası: ${uploadError.message}`);
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from("videos")
            .getPublicUrl(fileName);

        // Check if hero video already exists
        const existingVideos = await getSupabaseCollection("site_videos");
        const heroVideo = (existingVideos || []).find((v: any) => v.type === type);

        if (heroVideo) {
            // Delete old file from storage if exists
            if (heroVideo.url && heroVideo.url.includes("supabase")) {
                const oldFileName = heroVideo.url.split("/").pop();
                if (oldFileName) {
                    await supabase.storage.from("videos").remove([oldFileName]);
                }
            }

            // Update database record
            await updateInSupabaseCollection("site_videos", heroVideo.id, {
                url: publicUrl,
                title,
                description,
                updatedAt: new Date().toISOString(),
            });
        } else {
            // Create new database record
            await addToSupabaseCollection("site_videos", {
                type,
                url: publicUrl,
                title,
                description,
                createdAt: new Date().toISOString(),
            });
        }

        return NextResponse.json({
            success: true,
            url: publicUrl,
            message: "Video başarıyla yüklendi",
        });

    } catch (error: any) {
        console.error("Video upload error:", error);
        return NextResponse.json(
            { error: "Video yüklenemedi", details: error.message },
            { status: 500 }
        );
    }
}
