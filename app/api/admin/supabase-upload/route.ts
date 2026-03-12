import { NextRequest, NextResponse } from "next/server";
import { uploadToSupabaseStorage } from "@/lib/supabase-storage";
import crypto from "crypto";

// Admin authentication kontrolü
function checkAdminAuth(request: NextRequest): boolean {
    // Development'ta ve local testlerde esnek olalım
    if (process.env.NODE_ENV === "development") return true;

    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) return true;

    const cookies = request.headers.get("cookie");
    if (cookies && cookies.includes("admin_token=")) return true;

    return false;
}

export async function POST(request: NextRequest) {
    try {
        if (!checkAdminAuth(request)) {
            return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
        }

        const formData = await request.formData();
        const files = formData.getAll("file") as File[];
        const type = formData.get("type") as string || "properties";

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
        }

        const uploadResults = [];

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const timestamp = Date.now();
            const randomString = crypto.randomBytes(4).toString('hex');
            const ext = file.name.split(".").pop() || "jpg";
            const safeName = `${timestamp}-${randomString}.${ext}`;
            const filePath = `${type}/${safeName}`;

            try {
                const publicUrl = await uploadToSupabaseStorage(buffer, filePath);
                uploadResults.push({
                    success: true,
                    url: publicUrl,
                    filename: file.name,
                    filePath: filePath
                });
            } catch (uploadError: any) {
                console.error(`File upload failed for ${file.name}:`, uploadError);
                uploadResults.push({
                    success: false,
                    error: uploadError.message,
                    filename: file.name
                });
            }
        }

        return NextResponse.json({
            success: true,
            results: uploadResults,
            // Geriye dönük uyumluluk için tekil url (eğer bir tane yüklendiyse)
            url: uploadResults.find(r => r.success)?.url
        });

    } catch (error: any) {
        console.error("Supabase upload route error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
