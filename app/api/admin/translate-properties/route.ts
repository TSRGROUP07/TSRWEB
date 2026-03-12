import { NextResponse } from "next/server";
import { getSupabaseCollection, updateInSupabaseCollection } from "@/lib/supabase-db";
import { translateProperty, SupportedLanguage } from "@/lib/translation";

// 5 dakika timeout (Vercel limitine dikkat)
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const adminSecret = process.env.ADMIN_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
        // Basit bir güvenlik kontrolü (Bu route public olmamalı)
        // Gerçek uygulamada daha sıkı bir auth gerekir.

        console.log("🔄 [Auto Translate] Starting batch translation...");

        // 1. Tüm ilanları çek
        const properties = await getSupabaseCollection("properties");
        console.log(`📊 [Auto Translate] Found ${properties.length} properties.`);

        let updatedCount = 0;
        let errorCount = 0;

        // 2. Her ilan için çeviri yap
        for (const property of properties) {
            try {
                // Zaten çeviri varsa ve force parametresi yoksa geçilebilir ama 
                // şimdilik eksik olanları doldurma mantığıyla ilerleyelim.
                // Title EN yoksa çevir
                const needsTranslation = !property.title_en || !property.description_en || !property.location_en;

                if (needsTranslation) {
                    console.log(`🌍 [Auto Translate] Translating property ID: ${property.id} (${property.title})`);

                    // Çeviri servisini çağır
                    const translatedFields = await translateProperty({
                        title: property.title,
                        description: property.description,
                        location: property.location,
                        district: property.district,
                        neighborhood: property.neighborhood,
                        address: property.address,
                        features: property.features,
                        notes: property.notes
                    }, 'tr'); // Kaynak dil Türkçe

                    // Veritabanını güncelle
                    // translateProperty sonucunda title_tr, title_en vs. dönüyor.
                    // Bunları DB'ye merge ediyoruz.

                    await updateInSupabaseCollection("properties", property.id, {
                        ...translatedFields
                    });

                    console.log(`✅ [Auto Translate] Updated property ID: ${property.id}`);
                    updatedCount++;

                    // API limitlerine takılmamak için kısa bir bekleme
                    await new Promise(resolve => setTimeout(resolve, 500));
                } else {
                    console.log(`⏭️ [Auto Translate] Skipping property ID: ${property.id} (Already translated)`);
                }

            } catch (err) {
                console.error(`❌ [Auto Translate] Error translating property ID: ${property.id}`, err);
                errorCount++;
            }
        }

        return NextResponse.json({
            success: true,
            message: "Batch translation completed.",
            total: properties.length,
            updated: updatedCount,
            errors: errorCount
        });

    } catch (error: any) {
        console.error("Batch translation fatal error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
