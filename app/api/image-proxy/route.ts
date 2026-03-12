import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { createDriveClientFromServiceAccount } from "@/lib/google-drive";
import sharp from "sharp";

// Simple LRU cache for processed images (memory)
const imageCache = new Map<string, { buffer: Buffer; contentType: string; timestamp: number }>();
const MAX_CACHE_SIZE = 100; // Cache last 100 images
const CACHE_TTL = 3600000; // 1 hour in milliseconds

function cleanCache() {
    const now = Date.now();
    const entries = Array.from(imageCache.entries());

    // Remove expired entries
    for (const [key, value] of entries) {
        if (now - value.timestamp > CACHE_TTL) {
            imageCache.delete(key);
        }
    }

    // If still too large, remove oldest entries
    if (imageCache.size > MAX_CACHE_SIZE) {
        const sortedEntries = entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
        const toRemove = sortedEntries.slice(0, imageCache.size - MAX_CACHE_SIZE);
        toRemove.forEach(([key]) => imageCache.delete(key));
    }
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const fileId = searchParams.get("id");
    const width = searchParams.get("w") ? parseInt(searchParams.get("w")!) : null;
    const format = searchParams.get("format") || "jpeg"; // webp, jpeg, avif

    if (!fileId) {
        return new NextResponse("File ID required", { status: 400 });
    }

    // Generate cache key
    const cacheKey = `${fileId}_${width || "original"}_${format}`;

    // Check cache first
    const cached = imageCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
        const headers = new Headers();
        headers.set("Content-Type", cached.contentType);
        headers.set("Cache-Control", "public, max-age=31536000, immutable");
        headers.set("X-Cache", "HIT");
        return new NextResponse(new Uint8Array(cached.buffer), { status: 200, headers });
    }

    try {
        let serviceAccount: any = null;

        const envSa = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT;
        if (envSa) {
            try {
                let jsonString = envSa.trim();
                if (jsonString.startsWith('"') && jsonString.endsWith('"')) {
                    jsonString = jsonString.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, "\n");
                }
                serviceAccount = JSON.parse(jsonString);
            } catch (e: any) {
                console.warn("⚠️ GOOGLE_DRIVE_SERVICE_ACCOUNT parse edilemedi:", e?.message);
            }
        }

        if (!serviceAccount) {
            const preferredPath = join(process.cwd(), "google-drive-service-account.json");
            if (existsSync(preferredPath)) {
                const serviceAccountFile = readFileSync(preferredPath, "utf8");
                serviceAccount = JSON.parse(serviceAccountFile);
            }
        }

        if (!serviceAccount) {
            const fallbackPath = join(process.cwd(), "service-account.json");
            if (existsSync(fallbackPath)) {
                const serviceAccountFile = readFileSync(fallbackPath, "utf8");
                serviceAccount = JSON.parse(serviceAccountFile);
            }
        }

        if (!serviceAccount) {
            return new NextResponse("Google Drive service account config missing", { status: 500 });
        }

        const driveClient = createDriveClientFromServiceAccount(serviceAccount);

        const response = await driveClient.files.get(
            { fileId, alt: "media", supportsAllDrives: true },
            { responseType: "arraybuffer" }
        );

        let imageBuffer = Buffer.from(response.data as any);
        let contentType = response.headers["content-type"] || "image/jpeg";

        // Process image if needed
        if (contentType.startsWith("image/") || contentType === "application/octet-stream") {
            const sharpInstance = sharp(imageBuffer);

            // Resize if width is specified
            if (width) {
                sharpInstance.resize(width, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                });
            }

            // Convert to specified format
            if (format === "webp") {
                imageBuffer = await sharpInstance.webp({ quality: 85 }).toBuffer();
                contentType = "image/webp";
            } else if (format === "avif") {
                imageBuffer = await sharpInstance.avif({ quality: 80 }).toBuffer();
                contentType = "image/avif";
            } else {
                imageBuffer = await sharpInstance.jpeg({ quality: 85, progressive: true }).toBuffer();
                contentType = "image/jpeg";
            }
        }

        // Store in cache
        cleanCache();
        imageCache.set(cacheKey, {
            buffer: imageBuffer,
            contentType,
            timestamp: Date.now()
        });

        const headers = new Headers();
        headers.set("Content-Type", contentType);
        headers.set("Cache-Control", "public, max-age=31536000, immutable");
        headers.set("CDN-Cache-Control", "public, max-age=31536000");
        headers.set("Vercel-CDN-Cache-Control", "public, max-age=31536000");
        headers.set("X-Cache", "MISS");

        return new NextResponse(new Uint8Array(imageBuffer), {
            status: 200,
            headers,
        });

    } catch (error: any) {
        console.error("Image proxy error:", {
            fileId,
            message: error?.message,
            status: error?.response?.status,
        });

        // Return a transparent 1x1 pixel as fallback
        const fallbackBuffer = Buffer.from(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
            'base64'
        );

        const headers = new Headers();
        headers.set("Content-Type", "image/png");
        headers.set("Cache-Control", "public, max-age=300");
        return new NextResponse(new Uint8Array(fallbackBuffer), { status: 200, headers });
    }
}
