import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env manually
const loadEnv = () => {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            console.log("Loading .env.local from", envPath);
            const envConfig = fs.readFileSync(envPath, 'utf8');
            envConfig.split('\n').forEach(line => {
                // Simple parser: KEY=VALUE
                const match = line.match(/^([^=]+)=(.*)$/);
                if (match) {
                    const key = match[1].trim();
                    // Remove quotes if present
                    let value = match[2].trim();
                    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                        value = value.slice(1, -1);
                    }
                    process.env[key] = value;
                }
            });
        } else {
            console.log("No .env.local found at", envPath);
        }
    } catch (e) {
        console.error("Error loading env:", e);
    }
};

loadEnv();

async function main() {
    console.log("Importing database helpers...");
    try {
        // Dynamic import to ensure process.env is set before module initialization
        const { getSupabaseCollection, updateInSupabaseCollection } = await import("@/lib/supabase-db");

        console.log("Checking site_videos...");
        const videos = await getSupabaseCollection("site_videos");

        if (!videos || videos.length === 0) {
            console.log("No videos found or error fetching collection.");
            return;
        }

        console.log(`Found ${videos.length} videos.`);

        const heroVideo = videos.find((v: any) => v.type === "hero");
        if (heroVideo) {
            console.log("Current Hero Video:", heroVideo);
            // Check for YouTube or Vimeo patterns
            if (heroVideo.url.includes("youtube") || heroVideo.url.includes("youtu.be")) {
                console.log("Hero video is YouTube. Updating to GitHub Raw URL...");
                const githubUrl = "https://raw.githubusercontent.com/eraybaysl/tsr-web/main/public/videos/ALANYA%20CASTLE%20PROMOTION%20VIDEO%20DRONE%20%23alanya%20%23drone%20%23promotion.mp4";

                const result = await updateInSupabaseCollection("site_videos", heroVideo.id, { url: githubUrl });
                console.log("Update complete:", result);
            } else {
                console.log("Hero video is NOT YouTube. No change needed.");
            }
        } else {
            console.log("No 'hero' type video found in DB.");
        }
    } catch (err) {
        console.error("Error in main execution:", err);
    }
}

main();
